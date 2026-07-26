import activityPagesData from '../data/activity-pages.json';
import itineraryPagesData from '../data/itinerary-pages.json';
import comparisonPagesData from '../data/comparison-pages.json';
import curationPagesData from '../data/curation-pages.json';
import personaPagesData from '../data/persona-pages.json';
import costPagesData from '../data/cost-pages.json';
import distancePagesData from '../data/distance-pages.json';
import holidayPagesData from '../data/holiday-pages.json';
import tipsPagesData from '../data/tips-pages.json';
import reviewPagesData from '../data/review-pages.json';
import glossaryPagesData from '../data/glossary-pages.json';
import eventPagesData from '../data/event-pages.json';
import { approvedRoutes } from './editorialApprovals';

const routeCandidates = new Map<string, Set<string>>();

function register(records: { slug: string }[], prefix: string) {
  for (const record of records) {
    const routes = routeCandidates.get(record.slug) ?? new Set<string>();
    routes.add(`${prefix}/${record.slug}`);
    routeCandidates.set(record.slug, routes);
  }
}

register(activityPagesData, '/activities');
register(itineraryPagesData, '/itineraries');
register(comparisonPagesData, '/compare');
register(
  [
    ...curationPagesData,
    ...personaPagesData,
    ...costPagesData,
    ...distancePagesData,
    ...holidayPagesData,
    ...tipsPagesData,
    ...reviewPagesData,
    ...glossaryPagesData,
    ...eventPagesData,
  ],
  '',
);

export function relatedRouteForSlug(slug: string): string | undefined {
  const routes = routeCandidates.get(slug);
  if (!routes || routes.size !== 1) return undefined;
  return Array.from(routes)[0];
}

export function approvedRelatedRouteForSlug(
  slug: string,
  approvals: ReadonlySet<string> = approvedRoutes,
): string | undefined {
  const route = relatedRouteForSlug(slug);
  return route && approvals.has(route) ? route : undefined;
}
