export interface Attraction {
  id: string;
  name: string;
  slug: string;
  category: "snow" | "theme-park" | "indoor" | "outdoor" | "food" | "shows" | "mini-golf" | "coaster" | "escape-room" | "water";
  tags: string[];
  ageRange: string;
  priceRange: "$" | "$$" | "$$$";
  rating: number;
  shortDesc: string;
  highlights: string[];
  address: string;
  website: string;
  bookingUrl?: string;
  isFeaturedPFS: boolean;
  imageAlt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ActivityListPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  audience: string;
  intro: string;
  filterTags: string[];
  attractionIds: string[];
  proTips: string[];
  faqs: FAQ[];
  nearbyFood: string[];
  relatedSlugs: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: { activity: string; attractionId?: string; tip: string };
  afternoon: { activity: string; attractionId?: string; tip: string };
  evening: { activity: string; attractionId?: string; tip: string };
}

export interface ItineraryPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  audience: string;
  duration: string;
  season: "any" | "winter" | "summer" | "fall" | "spring";
  intro: string;
  days: ItineraryDay[];
  budgetEstimate: { low: number; high: number };
  proTips: string[];
  faqs: FAQ[];
  relatedSlugs: string[];
}

export interface ComparisonPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  subjectA: { name: string; pros: string[]; cons: string[]; bestFor: string };
  subjectB: { name: string; pros: string[]; cons: string[]; bestFor: string };
  verdict: string;
  featureTable: { feature: string; a: string; b: string }[];
  faqs: FAQ[];
  relatedSlugs: string[];
}
