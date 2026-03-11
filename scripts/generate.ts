/**
 * pSEO Content Generation Pipeline
 * Usage: npx ts-node --project tsconfig.scripts.json scripts/generate.ts [--type activity|itinerary|comparison] [--limit 10] [--dry-run]
 */
import * as fs from "fs";
import * as path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  activitySeeds,
  itinerarySeeds,
  comparisonSeeds,
} from "./seeds";
import {
  buildActivityPrompt,
  buildItineraryPrompt,
  buildComparisonPrompt,
  activityResponseSchema,
  itineraryResponseSchema,
  comparisonResponseSchema,
} from "./prompts";
import {
  validateActivity,
  validateItinerary,
  validateComparison,
} from "./validate";

// ─── Config ──────────────────────────────────────────────────────────────────

const API_KEY = "REDACTED";
const MODEL = "gemini-2.0-flash";
const RATE_LIMIT_MS = 500;
const RETRY_DELAY_MS = 3000;

const DATA_DIR = path.join(__dirname, "..", "data");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity-pages.json");
const ITINERARY_FILE = path.join(DATA_DIR, "itinerary-pages.json");
const COMPARISON_FILE = path.join(DATA_DIR, "comparison-pages.json");

type PageType = "activity" | "itinerary" | "comparison";

// ─── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs(): { type: PageType | "all"; limit: number; dryRun: boolean } {
  const args = process.argv.slice(2);

  let type: PageType | "all" = "all";
  let limit = 999;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--type" || arg === "-t") {
      const val = args[i + 1];
      if (val === "activity" || val === "itinerary" || val === "comparison") {
        type = val;
        i++;
      }
    } else if (arg.startsWith("--type=")) {
      const val = arg.split("=")[1];
      if (val === "activity" || val === "itinerary" || val === "comparison") {
        type = val as PageType;
      }
    } else if (arg === "--limit" || arg === "-l") {
      limit = parseInt(args[i + 1] || "999", 10);
      i++;
    } else if (arg.startsWith("--limit=")) {
      limit = parseInt(arg.split("=")[1], 10);
    } else if (arg === "--dry-run") {
      dryRun = true;
    }
  }

  return { type, limit, dryRun };
}

// ─── File Helpers ────────────────────────────────────────────────────────────

function loadJsonFile<T>(filePath: string): T[] {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    console.error(`Failed to load ${filePath}`);
    return [];
  }
}

function appendToJsonFile(filePath: string, item: unknown): void {
  const existing = loadJsonFile<unknown>(filePath);
  existing.push(item);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
}

function getExistingSlugs(filePath: string): Set<string> {
  const items = loadJsonFile<{ slug: string }>(filePath);
  return new Set(items.map((i) => i.slug));
}

// ─── Gemini Helpers ───────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(
  genAI: GoogleGenerativeAI,
  prompt: string,
  schema: unknown
): Promise<unknown | null> {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseSchema: schema as any,
    },
  });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("  Gemini call failed:", (err as Error).message);
    return null;
  }
}

async function callGeminiWithRetry(
  genAI: GoogleGenerativeAI,
  prompt: string,
  schema: unknown
): Promise<unknown | null> {
  const result = await callGemini(genAI, prompt, schema);
  if (result !== null) return result;

  console.log(`  Retrying in ${RETRY_DELAY_MS / 1000}s...`);
  await sleep(RETRY_DELAY_MS);
  return callGemini(genAI, prompt, schema);
}

// ─── Generation Functions ─────────────────────────────────────────────────────

async function generateActivities(
  genAI: GoogleGenerativeAI,
  limit: number,
  dryRun: boolean
): Promise<{ generated: number; skipped: number; failed: number }> {
  const existingSlugs = getExistingSlugs(ACTIVITY_FILE);
  const newSeeds = activitySeeds.filter((s) => !existingSlugs.has(s.slug));
  const toGenerate = newSeeds.slice(0, limit);

  console.log(
    `\nActivity pages: ${toGenerate.length} to generate (${existingSlugs.size} already exist, ${newSeeds.length - toGenerate.length} remaining after limit)`
  );

  let generated = 0;
  let failed = 0;
  const skipped = existingSlugs.size;

  for (let i = 0; i < toGenerate.length; i++) {
    const seed = toGenerate[i];
    const prefix = `[${i + 1}/${toGenerate.length}]`;

    if (dryRun) {
      console.log(`${prefix} DRY RUN: ${seed.slug}`);
      console.log(`  Prompt preview: ${buildActivityPrompt(seed).slice(0, 120)}...`);
      generated++;
      continue;
    }

    process.stdout.write(`${prefix} Generating: ${seed.slug}... `);

    const data = await callGeminiWithRetry(
      genAI,
      buildActivityPrompt(seed),
      activityResponseSchema
    );

    if (!data) {
      console.log("FAILED (no response)");
      failed++;
      continue;
    }

    const { valid, errors } = validateActivity(data, seed.slug);

    if (!valid) {
      console.log(`FAILED (validation)`);
      console.error("  Errors:", errors.join("; "));
      failed++;
      continue;
    }

    if (errors.length > 0) {
      console.log(`WARN: ${errors.join("; ")}`);
    }

    appendToJsonFile(ACTIVITY_FILE, data);
    console.log("✓");
    generated++;

    if (i < toGenerate.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return { generated, skipped, failed };
}

async function generateItineraries(
  genAI: GoogleGenerativeAI,
  limit: number,
  dryRun: boolean
): Promise<{ generated: number; skipped: number; failed: number }> {
  const existingSlugs = getExistingSlugs(ITINERARY_FILE);
  const newSeeds = itinerarySeeds.filter((s) => !existingSlugs.has(s.slug));
  const toGenerate = newSeeds.slice(0, limit);

  console.log(
    `\nItinerary pages: ${toGenerate.length} to generate (${existingSlugs.size} already exist, ${newSeeds.length - toGenerate.length} remaining after limit)`
  );

  let generated = 0;
  let failed = 0;
  const skipped = existingSlugs.size;

  for (let i = 0; i < toGenerate.length; i++) {
    const seed = toGenerate[i];
    const prefix = `[${i + 1}/${toGenerate.length}]`;

    if (dryRun) {
      console.log(`${prefix} DRY RUN: ${seed.slug} (${seed.numDays} day${seed.numDays > 1 ? "s" : ""})`);
      console.log(`  Prompt preview: ${buildItineraryPrompt(seed).slice(0, 120)}...`);
      generated++;
      continue;
    }

    process.stdout.write(`${prefix} Generating: ${seed.slug}... `);

    const data = await callGeminiWithRetry(
      genAI,
      buildItineraryPrompt(seed),
      itineraryResponseSchema
    );

    if (!data) {
      console.log("FAILED (no response)");
      failed++;
      continue;
    }

    const { valid, errors } = validateItinerary(data, seed.slug);

    if (!valid) {
      console.log(`FAILED (validation)`);
      console.error("  Errors:", errors.join("; "));
      failed++;
      continue;
    }

    if (errors.length > 0) {
      console.log(`WARN: ${errors.join("; ")}`);
    }

    appendToJsonFile(ITINERARY_FILE, data);
    console.log("✓");
    generated++;

    if (i < toGenerate.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return { generated, skipped, failed };
}

async function generateComparisons(
  genAI: GoogleGenerativeAI,
  limit: number,
  dryRun: boolean
): Promise<{ generated: number; skipped: number; failed: number }> {
  const existingSlugs = getExistingSlugs(COMPARISON_FILE);
  const newSeeds = comparisonSeeds.filter((s) => !existingSlugs.has(s.slug));
  const toGenerate = newSeeds.slice(0, limit);

  console.log(
    `\nComparison pages: ${toGenerate.length} to generate (${existingSlugs.size} already exist, ${newSeeds.length - toGenerate.length} remaining after limit)`
  );

  let generated = 0;
  let failed = 0;
  const skipped = existingSlugs.size;

  for (let i = 0; i < toGenerate.length; i++) {
    const seed = toGenerate[i];
    const prefix = `[${i + 1}/${toGenerate.length}]`;

    if (dryRun) {
      console.log(`${prefix} DRY RUN: ${seed.slug}`);
      console.log(`  ${seed.subjectA} vs ${seed.subjectB}`);
      generated++;
      continue;
    }

    process.stdout.write(`${prefix} Generating: ${seed.slug}... `);

    const data = await callGeminiWithRetry(
      genAI,
      buildComparisonPrompt(seed),
      comparisonResponseSchema
    );

    if (!data) {
      console.log("FAILED (no response)");
      failed++;
      continue;
    }

    const { valid, errors } = validateComparison(data, seed.slug);

    if (!valid) {
      console.log(`FAILED (validation)`);
      console.error("  Errors:", errors.join("; "));
      failed++;
      continue;
    }

    if (errors.length > 0) {
      console.log(`WARN: ${errors.join("; ")}`);
    }

    appendToJsonFile(COMPARISON_FILE, data);
    console.log("✓");
    generated++;

    if (i < toGenerate.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return { generated, skipped, failed };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { type, limit, dryRun } = parseArgs();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  pSEO Content Generator — BestOfPigeonForge.com");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Mode:  ${dryRun ? "DRY RUN (no files written)" : "LIVE"}`);
  console.log(`  Type:  ${type}`);
  console.log(`  Limit: ${limit === 999 ? "unlimited" : limit} per type`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const genAI = new GoogleGenerativeAI(API_KEY);

  const stats = {
    activity: { generated: 0, skipped: 0, failed: 0 },
    itinerary: { generated: 0, skipped: 0, failed: 0 },
    comparison: { generated: 0, skipped: 0, failed: 0 },
  };

  if (type === "activity" || type === "all") {
    stats.activity = await generateActivities(genAI, limit, dryRun);
  }

  if (type === "itinerary" || type === "all") {
    stats.itinerary = await generateItineraries(genAI, limit, dryRun);
  }

  if (type === "comparison" || type === "all") {
    stats.comparison = await generateComparisons(genAI, limit, dryRun);
  }

  const totalGenerated =
    stats.activity.generated + stats.itinerary.generated + stats.comparison.generated;
  const totalFailed =
    stats.activity.failed + stats.itinerary.failed + stats.comparison.failed;

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Summary");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  if (type === "activity" || type === "all") {
    console.log(
      `  Activity pages:    +${stats.activity.generated} generated, ${stats.activity.skipped} already existed, ${stats.activity.failed} failed`
    );
  }
  if (type === "itinerary" || type === "all") {
    console.log(
      `  Itinerary pages:   +${stats.itinerary.generated} generated, ${stats.itinerary.skipped} already existed, ${stats.itinerary.failed} failed`
    );
  }
  if (type === "comparison" || type === "all") {
    console.log(
      `  Comparison pages:  +${stats.comparison.generated} generated, ${stats.comparison.skipped} already existed, ${stats.comparison.failed} failed`
    );
  }

  console.log(`\n  Total: ${totalGenerated} pages ${dryRun ? "would be" : ""} generated, ${totalFailed} failed`);

  if (!dryRun && totalGenerated > 0) {
    console.log("\n  Run `npm run build` to compile all new pages.");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
