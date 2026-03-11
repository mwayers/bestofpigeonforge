import type { ActivityListPage, ItineraryPage, ComparisonPage } from "../lib/types";

export const VALID_ATTRACTION_IDS = new Set([
  "pigeon-forge-snow",
  "dollywood",
  "the-island",
  "anakeesta",
  "rowdy-bear",
  "wonderworks",
  "ripleys-aquarium",
  "escape-game",
  "titanic-museum",
  "comedy-barn",
  "paula-deens",
  "old-mill",
  "clingmans-dome",
  "chimney-tops",
  "laurel-falls",
  "skybridge",
  "ober-mountain",
  "jurassic-jungle",
  "alcatraz-east",
  "lumberjack-feud",
  "crave-golf",
  "ninja-golf",
  "hillbilly-golf",
  "splash-country",
  "hatfield-mccoy",
  "pirates-voyage",
  "gatlinburg-skylift",
  "alpine-coaster",
  "alamo-steakhouse",
  "calhouns",
]);

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateActivity(
  data: unknown,
  expectedSlug: string
): ValidationResult {
  const errors: string[] = [];
  const d = data as Record<string, unknown>;

  if (!d || typeof d !== "object") {
    return { valid: false, errors: ["Response is not an object"] };
  }

  const required = [
    "slug",
    "title",
    "metaTitle",
    "metaDescription",
    "h1",
    "audience",
    "intro",
    "filterTags",
    "attractionIds",
    "proTips",
    "faqs",
    "nearbyFood",
    "relatedSlugs",
  ];

  for (const field of required) {
    if (!(field in d) || d[field] === undefined || d[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (d.slug !== expectedSlug) {
    errors.push(`Slug mismatch: got "${d.slug}", expected "${expectedSlug}"`);
    d.slug = expectedSlug; // fix it
  }

  if (Array.isArray(d.attractionIds)) {
    const invalid = (d.attractionIds as string[]).filter(
      (id) => !VALID_ATTRACTION_IDS.has(id)
    );
    if (invalid.length > 0) {
      errors.push(`Invalid attractionIds: ${invalid.join(", ")}`);
      // Remove invalid IDs rather than failing entirely
      d.attractionIds = (d.attractionIds as string[]).filter((id) =>
        VALID_ATTRACTION_IDS.has(id)
      );
    }
    if ((d.attractionIds as string[]).length === 0) {
      errors.push("attractionIds is empty after filtering invalid IDs");
    }
  }

  if (Array.isArray(d.faqs)) {
    for (const faq of d.faqs as unknown[]) {
      const f = faq as Record<string, unknown>;
      if (!f.question || !f.answer) {
        errors.push("FAQ missing question or answer");
      }
    }
  }

  const fatal = errors.filter(
    (e) =>
      !e.startsWith("Invalid attractionIds") && !e.startsWith("Slug mismatch")
  );
  return { valid: fatal.length === 0, errors };
}

export function validateItinerary(
  data: unknown,
  expectedSlug: string
): ValidationResult {
  const errors: string[] = [];
  const d = data as Record<string, unknown>;

  if (!d || typeof d !== "object") {
    return { valid: false, errors: ["Response is not an object"] };
  }

  const required = [
    "slug",
    "title",
    "metaTitle",
    "metaDescription",
    "h1",
    "audience",
    "duration",
    "season",
    "intro",
    "days",
    "budgetEstimate",
    "proTips",
    "faqs",
    "relatedSlugs",
  ];

  for (const field of required) {
    if (!(field in d) || d[field] === undefined || d[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (d.slug !== expectedSlug) {
    d.slug = expectedSlug;
  }

  const validSeasons = ["any", "winter", "summer", "fall", "spring"];
  if (!validSeasons.includes(d.season as string)) {
    errors.push(`Invalid season: ${d.season}`);
    d.season = "any";
  }

  if (Array.isArray(d.days)) {
    for (const day of d.days as unknown[]) {
      const dd = day as Record<string, unknown>;
      if (!dd.morning || !dd.afternoon || !dd.evening) {
        errors.push(`Day ${dd.day} missing morning/afternoon/evening`);
      }
      // Validate attractionIds in day slots
      for (const slot of ["morning", "afternoon", "evening"]) {
        const s = dd[slot] as Record<string, unknown> | undefined;
        if (s?.attractionId && !VALID_ATTRACTION_IDS.has(s.attractionId as string)) {
          errors.push(`Invalid attractionId in day ${dd.day} ${slot}: ${s.attractionId}`);
          delete s.attractionId;
        }
      }
    }
  }

  if (d.budgetEstimate && typeof d.budgetEstimate === "object") {
    const be = d.budgetEstimate as Record<string, unknown>;
    if (typeof be.low !== "number" || typeof be.high !== "number") {
      errors.push("budgetEstimate.low and .high must be numbers");
    }
  }

  const fatal = errors.filter(
    (e) => !e.includes("attractionId") && !e.includes("Slug mismatch")
  );
  return { valid: fatal.length === 0, errors };
}

export function validateComparison(
  data: unknown,
  expectedSlug: string
): ValidationResult {
  const errors: string[] = [];
  const d = data as Record<string, unknown>;

  if (!d || typeof d !== "object") {
    return { valid: false, errors: ["Response is not an object"] };
  }

  const required = [
    "slug",
    "title",
    "metaTitle",
    "metaDescription",
    "h1",
    "intro",
    "subjectA",
    "subjectB",
    "verdict",
    "featureTable",
    "faqs",
    "relatedSlugs",
  ];

  for (const field of required) {
    if (!(field in d) || d[field] === undefined || d[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (d.slug !== expectedSlug) {
    d.slug = expectedSlug;
  }

  for (const subject of ["subjectA", "subjectB"]) {
    const s = d[subject] as Record<string, unknown> | undefined;
    if (!s?.name || !Array.isArray(s?.pros) || !Array.isArray(s?.cons) || !s?.bestFor) {
      errors.push(`${subject} missing required fields (name, pros, cons, bestFor)`);
    }
  }

  if (Array.isArray(d.featureTable)) {
    for (const row of d.featureTable as unknown[]) {
      const r = row as Record<string, unknown>;
      if (!r.feature || !r.a || !r.b) {
        errors.push("featureTable row missing feature, a, or b");
      }
    }
  }

  const fatal = errors.filter((e) => !e.includes("Slug mismatch"));
  return { valid: fatal.length === 0, errors };
}
