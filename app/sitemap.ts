import type { MetadataRoute } from 'next';
import activityPagesData from '@/data/activity-pages.json';
import itineraryPagesData from '@/data/itinerary-pages.json';
import comparisonPagesData from '@/data/comparison-pages.json';
import curationPagesData from '@/data/curation-pages.json';
import personaPagesData from '@/data/persona-pages.json';
import costPagesData from '@/data/cost-pages.json';
import distancePagesData from '@/data/distance-pages.json';
import holidayPagesData from '@/data/holiday-pages.json';
import tipsPagesData from '@/data/tips-pages.json';
import reviewPagesData from '@/data/review-pages.json';
import glossaryPagesData from '@/data/glossary-pages.json';
import eventPagesData from '@/data/event-pages.json';
import type { ActivityListPage, ItineraryPage, ComparisonPage } from '@/lib/types';
import { filterIndexableRecords } from '@/lib/contentQuality';
import { approvedSlugsForPrefix } from '@/lib/editorialApprovals';

const BASE = 'https://www.bestofpigeonforge.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const activityPages = filterIndexableRecords(activityPagesData as ActivityListPage[], approvedSlugsForPrefix('/activities'));
  const itineraryPages = filterIndexableRecords(itineraryPagesData as ItineraryPage[], approvedSlugsForPrefix('/itineraries'));
  const comparisonPages = filterIndexableRecords(comparisonPagesData as ComparisonPage[], approvedSlugsForPrefix('/compare'));
  const genericPages = filterIndexableRecords([
    ...(curationPagesData as { slug: string }[]),
    ...(personaPagesData as { slug: string }[]),
    ...(costPagesData as { slug: string }[]),
    ...(distancePagesData as { slug: string }[]),
    ...(holidayPagesData as { slug: string }[]),
    ...(tipsPagesData as { slug: string }[]),
    ...(reviewPagesData as { slug: string }[]),
    ...(glossaryPagesData as { slug: string }[]),
    ...(eventPagesData as { slug: string }[]),
  ], approvedSlugsForPrefix(''));

  const staticPages = [
    { url: BASE, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/activities`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/itineraries`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/compare`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/tools`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/tools/pigeon-forge-trip-cost-calculator`, changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${BASE}/tools/rainy-day-indoor-planner`, changeFrequency: 'monthly' as const, priority: 0.85 },
  ];

  const activityRoutes = activityPages.map((page) => ({
    url: `${BASE}/activities/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const itineraryRoutes = itineraryPages.map((page) => ({
    url: `${BASE}/itineraries/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisonRoutes = comparisonPages.map((page) => ({
    url: `${BASE}/compare/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const genericRoutes = genericPages.map((page) => ({
    url: `${BASE}/${page.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...activityRoutes, ...itineraryRoutes, ...comparisonRoutes, ...genericRoutes];
}
