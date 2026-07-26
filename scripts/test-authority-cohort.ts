import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import comparisonPages from '../data/comparison-pages.json';

const root = join(__dirname, '..');
const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');
const activities = readFileSync(join(root, 'app/activities/page.tsx'), 'utf8');
const comparison = comparisonPages.find((page) => page.slug === 'pigeon-forge-vs-gatlinburg') as
  | (typeof comparisonPages[number] & { verifiedDate: string; sources: { name: string; url: string }[] })
  | undefined;

assert.ok(comparison, 'comparison record must exist');
assert.equal(comparison.verifiedDate, '2026-07-26');
assert.ok(comparison.sources.length >= 3, 'comparison must show multiple first-party sources');
assert.ok(comparison.featureTable.some((row) => row.feature === 'Getting around'));
assert.doesNotMatch(JSON.stringify(comparison), /world-class|superior value|vehicle entry fee|6 miles|generally cheaper|best theme park/i);

for (const source of [home, activities]) {
  assert.match(source, /Last verified/i);
  assert.match(source, /How (?:we choose|this hub works)/i);
  assert.match(source, /commercial-disclosure/);
}

for (const route of [
  '/activities/indoor-activities-pigeon-forge',
  '/activities/things-to-do-pigeon-forge-with-kids',
  '/activities/things-to-do-pigeon-forge-rainy-day',
  '/compare/pigeon-forge-vs-gatlinburg',
]) {
  assert.ok(home.includes(route), `homepage must distribute to ${route}`);
  assert.ok(activities.includes(route) || route.startsWith('/compare/'), `activities hub must distribute to ${route}`);
}

assert.doesNotMatch(home, /SearchAction|planningStats|\.rating|priceRange/);
assert.doesNotMatch(activities, /activityPages\.map|articleSchema/);
assert.match(activities, /CollectionPage/);

console.log('authority cohort tests passed');
