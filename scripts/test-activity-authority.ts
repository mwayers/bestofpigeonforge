import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import activityPagesData from '../data/activity-pages.json';

type Source = { label: string; url: string };
type AuthorityPage = {
  slug: string;
  verifiedDate?: string;
  sources?: Source[];
  bodySections?: { heading: string; content: string }[];
};

const targetSlugs = [
  'indoor-activities-pigeon-forge',
  'things-to-do-pigeon-forge-with-kids',
  'things-to-do-pigeon-forge-rainy-day',
];
const pages = activityPagesData as AuthorityPage[];

for (const slug of targetSlugs) {
  const page = pages.find((candidate) => candidate.slug === slug);
  assert.ok(page, `missing ${slug}`);
  assert.equal(page.verifiedDate, '2026-07-26', `${slug} must show the source-packet verification date`);
  assert.ok(page.sources && page.sources.length >= 2, `${slug} must include multiple official sources`);
  for (const source of page.sources ?? []) {
    assert.ok(source.label.trim(), `${slug} source needs a label`);
    assert.match(source.url, /^https:\/\//, `${slug} source must use an HTTPS URL`);
  }
  const headings = (page.bodySections ?? []).map((section) => section.heading.toLowerCase()).join(' ');
  assert.match(headings, /choose|decision|plan/, `${slug} needs practical decision guidance`);
  assert.match(headings, /caveat|check|limit|before/, `${slug} needs visible caveats`);
}

const component = fs.readFileSync(path.join(process.cwd(), 'components/ActivityListPage.tsx'), 'utf8');
assert.match(component, /Last verified/);
assert.match(component, /Official sources/);

console.log('activity authority tests passed');
