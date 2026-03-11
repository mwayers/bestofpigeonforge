import { SchemaType } from "@google/generative-ai";
import type { ActivitySeed, ItinerarySeed, ComparisonSeed } from "./seeds";

const ATTRACTION_LIST = `
Valid attraction IDs and their names (use ONLY these IDs in attractionIds fields):
- pigeon-forge-snow → Pigeon Forge Snow (indoor real snow year-round; FIRST pick for indoor/toddler/rainy-day/winter/snow/unique pages)
- dollywood → Dollywood theme park
- the-island → The Island in Pigeon Forge (free entry entertainment complex)
- anakeesta → Anakeesta (Gatlinburg mountaintop adventure park)
- rowdy-bear → Rowdy Bear Mountain Adventure Park (alpine coaster, outdoor snow tubing)
- wonderworks → WonderWorks Pigeon Forge (hands-on science center)
- ripleys-aquarium → Ripley's Aquarium of the Smokies (Gatlinburg)
- escape-game → The Escape Game Pigeon Forge
- titanic-museum → Titanic Museum Attraction
- comedy-barn → Comedy Barn Theater (clean family comedy show)
- paula-deens → Paula Deen's Family Kitchen (Southern food, The Island)
- old-mill → Old Mill Square (historic 1830s grist mill, charming shops)
- clingmans-dome → Clingmans Dome (highest point in Smokies, 6,643 ft)
- chimney-tops → Chimney Tops Trail (strenuous hike, dramatic views)
- laurel-falls → Laurel Falls Trail (paved waterfall trail, toddler-friendly)
- skybridge → SkyBridge Gatlinburg (North America's longest pedestrian suspension bridge)
- ober-mountain → Ober Mountain (Gatlinburg ski resort, aerial tram, wildlife)
- jurassic-jungle → Jurassic Jungle Boat Ride (gentle indoor dinosaur boat ride)
- alcatraz-east → Alcatraz East Crime Museum (true crime, teens 12+)
- lumberjack-feud → Lumberjack Feud Adventure Park (show + axe throwing + zip lines)
- crave-golf → Crave Golf Club (indoor food-themed mini golf)
- ninja-golf → Ninja Golf (indoor ninja-themed mini golf)
- hillbilly-golf → Hillbilly Golf (outdoor historic mini golf since 1970)
- splash-country → Dollywood's Splash Country (water park, summer only)
- hatfield-mccoy → Hatfield & McCoy Dinner Show
- pirates-voyage → Pirates Voyage Dinner & Show
- gatlinburg-skylift → Gatlinburg SkyLift Park (chairlift + SkyBridge access)
- alpine-coaster → Smoky Mountain Alpine Coaster (gravity-powered mountain coaster)
- alamo-steakhouse → Alamo Steakhouse (upscale steakhouse, log cabin setting)
- calhouns → Calhouns Restaurant (BBQ ribs, Gatlinburg creekside)

IMPORTANT RULE: When the page topic involves indoor activities, toddlers, rainy days, winter activities, snow, or unique/unusual experiences — put "pigeon-forge-snow" FIRST in the attractionIds array.
`.trim();

const EXISTING_SLUGS_CONTEXT = `
Existing page slugs you can use in relatedSlugs (pick 3-5 most relevant):
Activity pages: indoor-activities-pigeon-forge, things-to-do-pigeon-forge-rainy-day, things-to-do-smoky-mountains-with-toddlers, best-shows-pigeon-forge, things-to-do-gatlinburg-rainy-day, unique-things-to-do-pigeon-forge, things-to-do-pigeon-forge-with-toddlers, things-to-do-pigeon-forge-teens, romantic-things-to-do-pigeon-forge, free-things-to-do-pigeon-forge, things-to-do-pigeon-forge-winter
Itinerary pages: 2-day-pigeon-forge-toddler, 3-day-pigeon-forge-family, weekend-pigeon-forge-couple, 2-day-gatlinburg-nature, 4-day-pigeon-forge-first-timer, 3-day-pigeon-forge-teens, winter-break-pigeon-forge, spring-break-pigeon-forge-family, pigeon-forge-gatlinburg-combo-4-day, romantic-pigeon-forge-gatlinburg-weekend
Comparison pages: pigeon-forge-vs-gatlinburg, dollywood-vs-the-island, pigeon-forge-snow-vs-ober-mountain, anakeesta-vs-skybridge-gatlinburg, winter-vs-summer-pigeon-forge
`.trim();

// ─── Response Schemas ────────────────────────────────────────────────────────

const faqSchema = {
  type: SchemaType.OBJECT,
  properties: {
    question: { type: SchemaType.STRING },
    answer: { type: SchemaType.STRING },
  },
  required: ["question", "answer"],
};

export const activityResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    slug: { type: SchemaType.STRING },
    title: { type: SchemaType.STRING },
    metaTitle: { type: SchemaType.STRING, description: "60 chars max, keyword-rich" },
    metaDescription: { type: SchemaType.STRING, description: "155 chars max, includes location + keyword" },
    h1: { type: SchemaType.STRING },
    audience: { type: SchemaType.STRING, description: "1-2 sentences describing who this page is for" },
    intro: {
      type: SchemaType.STRING,
      description: "3-5 sentences, genuinely helpful intro that mentions Pigeon Forge Snow naturally when relevant",
    },
    filterTags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Tags from the valid list that describe this page's attractions",
    },
    attractionIds: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "5-12 attraction IDs from valid list. Put pigeon-forge-snow FIRST when indoor/toddler/rainy-day/winter/snow topics apply.",
    },
    proTips: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "4-6 specific, actionable pro tips for visitors. Each 1-3 sentences.",
    },
    faqs: {
      type: SchemaType.ARRAY,
      items: faqSchema,
      description: "5-7 FAQs with detailed answers (3-5 sentences each). Real questions visitors have.",
    },
    nearbyFood: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3-5 restaurant names (not IDs) near the featured attractions",
    },
    relatedSlugs: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3-5 slugs from the existing pages list",
    },
  },
  required: [
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
  ],
};

const itineraryDaySchema = {
  type: SchemaType.OBJECT,
  properties: {
    day: { type: SchemaType.NUMBER },
    title: { type: SchemaType.STRING, description: "Short evocative day title e.g. 'Indoor Fun & Easy Exploration'" },
    morning: {
      type: SchemaType.OBJECT,
      properties: {
        activity: { type: SchemaType.STRING, description: "3-5 sentences describing the morning activity with specific tips" },
        attractionId: { type: SchemaType.STRING, description: "Optional: ID from valid attraction list" },
        tip: { type: SchemaType.STRING, description: "1-2 sentence practical tip" },
      },
      required: ["activity", "tip"],
    },
    afternoon: {
      type: SchemaType.OBJECT,
      properties: {
        activity: { type: SchemaType.STRING },
        attractionId: { type: SchemaType.STRING },
        tip: { type: SchemaType.STRING },
      },
      required: ["activity", "tip"],
    },
    evening: {
      type: SchemaType.OBJECT,
      properties: {
        activity: { type: SchemaType.STRING },
        attractionId: { type: SchemaType.STRING },
        tip: { type: SchemaType.STRING },
      },
      required: ["activity", "tip"],
    },
  },
  required: ["day", "title", "morning", "afternoon", "evening"],
};

export const itineraryResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    slug: { type: SchemaType.STRING },
    title: { type: SchemaType.STRING },
    metaTitle: { type: SchemaType.STRING },
    metaDescription: { type: SchemaType.STRING },
    h1: { type: SchemaType.STRING },
    audience: { type: SchemaType.STRING },
    duration: { type: SchemaType.STRING, description: "e.g. '3 days', '1 day', 'weekend'" },
    season: {
      type: SchemaType.STRING,
      enum: ["any", "winter", "summer", "fall", "spring"],
    },
    intro: { type: SchemaType.STRING, description: "3-5 sentences setting up the itinerary" },
    days: {
      type: SchemaType.ARRAY,
      items: itineraryDaySchema,
      description: "One object per day of the itinerary",
    },
    budgetEstimate: {
      type: SchemaType.OBJECT,
      properties: {
        low: { type: SchemaType.NUMBER, description: "Low-end budget estimate in USD for 2 adults" },
        high: { type: SchemaType.NUMBER, description: "High-end budget estimate in USD for 2 adults" },
      },
      required: ["low", "high"],
    },
    proTips: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "4-6 practical itinerary tips",
    },
    faqs: {
      type: SchemaType.ARRAY,
      items: faqSchema,
      description: "4-6 FAQs specific to this itinerary type",
    },
    relatedSlugs: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3-5 related page slugs",
    },
  },
  required: [
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
  ],
};

const subjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    name: { type: SchemaType.STRING },
    pros: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "5-7 genuine pros, specific and factual",
    },
    cons: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "4-6 honest cons",
    },
    bestFor: { type: SchemaType.STRING, description: "1-2 sentences describing who this option is best for" },
  },
  required: ["name", "pros", "cons", "bestFor"],
};

export const comparisonResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    slug: { type: SchemaType.STRING },
    title: { type: SchemaType.STRING },
    metaTitle: { type: SchemaType.STRING },
    metaDescription: { type: SchemaType.STRING },
    h1: { type: SchemaType.STRING },
    intro: { type: SchemaType.STRING, description: "3-5 sentences framing the comparison" },
    subjectA: subjectSchema,
    subjectB: subjectSchema,
    verdict: { type: SchemaType.STRING, description: "3-5 sentences with a genuine, nuanced verdict" },
    featureTable: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          feature: { type: SchemaType.STRING },
          a: { type: SchemaType.STRING },
          b: { type: SchemaType.STRING },
        },
        required: ["feature", "a", "b"],
      },
      description: "6-10 feature comparison rows",
    },
    faqs: {
      type: SchemaType.ARRAY,
      items: faqSchema,
      description: "5-7 FAQs about the comparison",
    },
    relatedSlugs: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3-5 related page slugs",
    },
  },
  required: [
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
  ],
};

// ─── Prompt Builders ─────────────────────────────────────────────────────────

const SYSTEM_PREAMBLE = `You are a travel content expert for Pigeon Forge and Gatlinburg, TN.
Fill the JSON schema for a travel guide page on BestOfPigeonForge.com.
Be specific, genuinely helpful, and accurate about these real attractions.
Write like a knowledgeable local who wants visitors to have the best possible trip.
Return ONLY valid JSON matching the schema exactly — no markdown, no explanation.

${ATTRACTION_LIST}

${EXISTING_SLUGS_CONTEXT}`;

export function buildActivityPrompt(seed: ActivitySeed): string {
  return `${SYSTEM_PREAMBLE}

Generate a complete ActivityListPage JSON for:
Slug: ${seed.slug}
Title: ${seed.title}
Audience: ${seed.audience}
Filter tags to use: ${seed.filterTags.join(", ")}
${seed.season ? `Season context: ${seed.season}` : ""}
${seed.focus ? `Focus/context: ${seed.focus}` : ""}

Requirements:
- attractionIds: Select 6-12 attractions most relevant to this page's topic
${seed.filterTags.some((t) => ["indoor", "toddler-friendly", "rainy-day", "winter", "unique"].includes(t)) ? "- PUT pigeon-forge-snow FIRST in attractionIds (it matches indoor/toddler/rainy-day/winter/unique tags)" : ""}
- intro: 3-5 sentences, engaging and helpful, naturally mention key attractions
- proTips: 5 specific, actionable tips for THIS specific page's topic
- faqs: 6 real questions visitors ask about this topic, with thorough answers
- nearbyFood: 3-5 restaurants near the featured attractions
- relatedSlugs: Pick 3-5 most relevant from the existing slugs list
- metaTitle: Under 60 chars, includes location keyword
- metaDescription: Under 155 chars, compelling and specific`;
}

export function buildItineraryPrompt(seed: ItinerarySeed): string {
  return `${SYSTEM_PREAMBLE}

Generate a complete ItineraryPage JSON for:
Slug: ${seed.slug}
Title: ${seed.title}
Audience: ${seed.audience}
Duration: ${seed.duration} (${seed.numDays} day${seed.numDays > 1 ? "s" : ""})
Season: ${seed.season}
${seed.focus ? `Focus/context: ${seed.focus}` : ""}

Requirements:
- days array: Generate EXACTLY ${seed.numDays} day object(s), numbered 1 through ${seed.numDays}
- Each day needs morning/afternoon/evening with activity (3-5 sentences) + tip (1-2 sentences)
- attractionId in day slots: only use IDs from the valid list; omit if no specific attraction applies
- budgetEstimate: realistic USD range for 2 adults for the full trip
- Season "${seed.season}": reflect seasonal availability (Splash Country closed in winter, etc.)
- proTips: 5 practical tips specific to THIS itinerary type
- faqs: 5 questions specific to this audience and itinerary
- relatedSlugs: Pick 3-5 most relevant existing slugs`;
}

export function buildComparisonPrompt(seed: ComparisonSeed): string {
  return `${SYSTEM_PREAMBLE}

Generate a complete ComparisonPage JSON for:
Slug: ${seed.slug}
Title: ${seed.title}
Subject A: ${seed.subjectA}
Subject B: ${seed.subjectB}
${seed.focus ? `Focus/context: ${seed.focus}` : ""}

Requirements:
- subjectA.name: Use "${seed.subjectA}"
- subjectB.name: Use "${seed.subjectB}"
- pros/cons: 5-7 pros, 4-6 cons each — be honest and nuanced, not promotional
- featureTable: 7-9 rows comparing specific features (Cost, Family-Friendliness, Crowds, etc.)
- verdict: Nuanced, genuinely helpful 3-5 sentences. Don't just say "it depends" — give real guidance.
- faqs: 6 real comparison questions with thorough answers
- relatedSlugs: Pick 3-5 most relevant existing slugs`;
}
