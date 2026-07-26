import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import pages from '../data/activity-pages.json';
import comparisons from '../data/comparison-pages.json';
import staticApprovals from '../data/static-page-approvals.json';

const root = join(__dirname, '..');
const activityRenderer = readFileSync(join(root, 'components/ActivityListPage.tsx'), 'utf8');
const activityRoute = readFileSync(join(root, 'app/activities/[slug]/page.tsx'), 'utf8');
const comparisonRenderer = readFileSync(join(root, 'components/ComparisonPage.tsx'), 'utf8');
const comparisonRoute = readFileSync(join(root, 'app/compare/[slug]/page.tsx'), 'utf8');
const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');

assert.doesNotMatch(activityRenderer, /ActivityCard|FeaturedCTA|getRelatedItineraries|itinerary-pages|TripCostCalculatorCTA/);
assert.match(activityRenderer, /Connected ownership disclosure/);
assert.match(activityRenderer, /page\.options/);
assert.match(activityRenderer, /page\.plans/);
assert.match(activityRenderer, /page\.decisionTree/);
assert.doesNotMatch(activityRoute, /articleSchema|speakableSchema/);
assert.doesNotMatch(comparisonRoute, /articleSchema|speakableSchema/);
assert.doesNotMatch(comparisonRenderer, /TripCostCalculatorCTA/);
assert.match(comparisonRenderer, /Location and transport orientation/);
assert.match(sitemap, /static-page-approvals\.json/);
assert.ok(Array.isArray(staticApprovals) && staticApprovals.length > 0);

const bySlug = new Map(pages.map((p) => [p.slug, p]));
const indoor = bySlug.get('indoor-activities-pigeon-forge') as any;
const kids = bySlug.get('things-to-do-pigeon-forge-with-kids') as any;
const rainy = bySlug.get('things-to-do-pigeon-forge-rainy-day') as any;
assert.ok(indoor.options.length >= 8, 'indoor matrix needs at least eight source-backed candidates');
assert.equal(new Set(indoor.options.map((o: any) => o.id)).size, indoor.options.length);
assert.deepEqual(kids.ageBands, ['1–4', '5–8', '9–12', 'Teens']);
assert.ok(kids.options.every((o: any) => o.ageBandFit && o.limitation));
assert.ok(kids.plans.length >= 2 && kids.plans.every((p: any) => p.fallback));
assert.deepEqual(rainy.plans.map((p: any) => p.duration), ['2 hours', 'Half day', 'Full day']);
assert.ok(rainy.plans.every((p: any) => p.fallback));
assert.ok(rainy.decisionTree.length >= 3);
for (const page of [indoor, kids, rainy]) {
  assert.ok(page.options.some((o: any) => /Pigeon Forge Snow/.test(o.name)));
  assert.ok(page.options.some((o: any) => /Community Center|Bowling Center|Wear Farm|Junior Ranger/.test(o.name)));
  assert.ok(page.contextualLinks.every((link: any) => link.route.startsWith('/')));
}
const comparison = comparisons.find((p) => p.slug === 'pigeon-forge-vs-gatlinburg') as any;
assert.ok(comparison.locationOrientation.length >= 3);
assert.doesNotMatch(JSON.stringify(comparison.locationOrientation), /\b\d+(?:\.\d+)?\s*(?:mi|mile|minutes?)\b/i);
console.log('independent-review blocker regression tests passed');
