import assert from 'node:assert/strict';
import { approvedRelatedRouteForSlug, relatedRouteForSlug } from '../lib/contentRoutes';

assert.equal(
  relatedRouteForSlug('dollywood-vs-the-island'),
  '/compare/dollywood-vs-the-island',
  'cross-family comparison links should use the compare route',
);
assert.equal(
  relatedRouteForSlug('3-day-pigeon-forge-family'),
  '/itineraries/3-day-pigeon-forge-family',
  'itinerary links should use the itineraries route',
);
assert.equal(
  relatedRouteForSlug('indoor-activities-pigeon-forge'),
  '/activities/indoor-activities-pigeon-forge',
  'activity links should use the activities route',
);
assert.equal(relatedRouteForSlug('not-a-real-page'), undefined, 'unknown slugs should not create links');
assert.equal(
  approvedRelatedRouteForSlug('pigeon-forge-vs-gatlinburg', new Set()),
  undefined,
  'unapproved related routes should not create links',
);
assert.equal(
  approvedRelatedRouteForSlug('pigeon-forge-vs-gatlinburg', new Set(['/compare/pigeon-forge-vs-gatlinburg'])),
  '/compare/pigeon-forge-vs-gatlinburg',
  'approved related routes should resolve',
);
assert.equal(
  relatedRouteForSlug('pigeon-forge-vs-myrtle-beach'),
  undefined,
  'slugs present in multiple route families should not create ambiguous links',
);

console.log('content route tests passed');
