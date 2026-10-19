import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..');
const routes = [
  'about',
  'editorial-standards',
  'corrections-policy',
  'contact',
  'privacy-policy',
  'terms',
  'commercial-disclosure',
];

for (const route of routes) {
  const source = readFileSync(join(root, 'app', route, 'page.tsx'), 'utf8');
  assert.match(source, /export const metadata/, `${route} must export metadata`);
  assert.match(source, /<TrustPage/, `${route} must use the trust page layout`);
}

const trustPage = readFileSync(join(root, 'components', 'TrustPage.tsx'), 'utf8');
assert.match(trustPage, /<h1/, 'trust page layout must render an h1');

const layout = readFileSync(join(root, 'app', 'layout.tsx'), 'utf8');
for (const route of routes) {
  assert.ok(layout.includes(`href="/${route}"`), `footer must link to /${route}`);
}

const sitemap = readFileSync(join(root, 'app', 'sitemap.ts'), 'utf8');
for (const route of routes) {
  assert.ok(sitemap.includes(`\${BASE}/${route}`), `sitemap must include /${route}`);
}

const disclosure = readFileSync(join(root, 'app', 'commercial-disclosure', 'page.tsx'), 'utf8');
assert.match(disclosure, /independent planning guide/i);
assert.match(disclosure, /affiliate/i);
assert.match(disclosure, /advertis/i);

const editorial = readFileSync(join(root, 'app', 'editorial-standards', 'page.tsx'), 'utf8');
assert.match(editorial, /verified|checked/i);
assert.match(editorial, /source/i);

const contact = readFileSync(join(root, 'app', 'contact', 'page.tsx'), 'utf8');
assert.match(contact, /mailto:hello@bestofpigeonforge\.com/);
assert.match(contact, /hello@bestofpigeonforge\.com/);

const activityRenderer = readFileSync(join(root, 'components', 'ActivityListPage.tsx'), 'utf8');
const comparisonRenderer = readFileSync(join(root, 'components', 'ComparisonPage.tsx'), 'utf8');
for (const renderer of [activityRenderer, comparisonRenderer]) {
  assert.match(renderer, /Best of Pigeon Forge Editorial Team/);
  assert.match(renderer, /Alex Woods/);
}

console.log('trust infrastructure tests passed');
