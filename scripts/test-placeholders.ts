import assert from 'node:assert/strict';
import { scrubPlaceholders, hasPlaceholderToken } from '../lib/placeholders';
const out = scrubPlaceholders({
  intro: 'Real intro.',
  history: 'Historical background placeholder...',
  faqs: [{ question: 'Q?', answer: 'Booking info placeholder...' }, { question: 'Real?', answer: 'Yes.' }],
  topPicks: [{ name: 'Spot', address: 'Address placeholder', price: '$XX' }],
  driveStats: { miles: 'XXX', primaryRoute: 'I-XX to I-XX', driveTime: 'X hours XX minutes' },
});
assert.equal(out.history, '');
assert.equal(out.faqs.length, 1);
assert.deepEqual(out.topPicks, [{ name: 'Spot' }]);
assert.equal(hasPlaceholderToken(JSON.stringify(out)), false);
assert.equal(hasPlaceholderToken('Open 9 to 5, tickets $45'), false);
console.log('placeholder scrub tests passed');
