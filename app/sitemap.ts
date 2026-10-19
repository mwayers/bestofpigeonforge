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
import staticPageApprovals from '@/data/static-page-approvals.json';

import { isIndexablePath } from '@/lib/indexKeep';
import { HUB_PATHS } from '@/lib/hubs';

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

  const staticApprovalSet = new Set(staticPageApprovals as string[]);
  const staticPages = [
    { path: '/', url: BASE, changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/activities', url: `${BASE}/activities`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/itineraries', url: `${BASE}/itineraries`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/compare', url: `${BASE}/compare`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tools', url: `${BASE}/tools`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/tools/pigeon-forge-trip-cost-calculator', url: `${BASE}/tools/pigeon-forge-trip-cost-calculator`, changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/tools/rainy-day-indoor-planner', url: `${BASE}/tools/rainy-day-indoor-planner`, changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/about', url: `${BASE}/about`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/editorial-standards', url: `${BASE}/editorial-standards`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/corrections-policy', url: `${BASE}/corrections-policy`, changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/contact', url: `${BASE}/contact`, changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/privacy-policy', url: `${BASE}/privacy-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', url: `${BASE}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/commercial-disclosure', url: `${BASE}/commercial-disclosure`, changeFrequency: 'yearly' as const, priority: 0.5 },
  ].filter((page) => staticApprovalSet.has(page.path)).map(({ path: _path, ...page }) => page);

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

  const hubRoutes = Array.from(HUB_PATHS).map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const all = [...staticPages, ...hubRoutes, ...activityRoutes, ...itineraryRoutes, ...comparisonRoutes, ...genericRoutes];
  return all.filter((entry) => isIndexablePath(entry.url.replace(BASE, '') || '/'));
}
