import assert from 'node:assert/strict';
import {
  approvedSlugsForPrefix,
  buildApprovedRouteSet,
  isEditoriallyApproved,
} from '../lib/editorialApprovals';

const approvals = buildApprovedRouteSet([
  { path: '/activities/approved-guide', approvedBy: 'Matthew', approvedAt: '2026-07-26' },
]);
assert.equal(approvals.has('/activities/approved-guide'), true);
assert.equal(approvals.has('/compare/approved-guide'), false);
assert.deepEqual(
  Array.from(approvedSlugsForPrefix('/activities', approvals)),
  ['approved-guide'],
);
assert.deepEqual(
  Array.from(approvedSlugsForPrefix('/compare', approvals)),
  [],
);
assert.equal(isEditoriallyApproved('/activities/not-approved-in-production'), false);

assert.throws(
  () => buildApprovedRouteSet([{ path: '', approvedBy: 'Matthew', approvedAt: '2026-07-26' }]),
  /path/i,
);
assert.throws(
  () => buildApprovedRouteSet([{ path: 'guide', approvedBy: 'Matthew', approvedAt: '2026-07-26' }]),
  /path/i,
);
assert.throws(
  () => buildApprovedRouteSet([{ path: '/activities/guide', approvedBy: '', approvedAt: '2026-07-26' }]),
  /approvedBy/i,
);
assert.throws(
  () => buildApprovedRouteSet([{ path: '/activities/guide', approvedBy: 'Matthew', approvedAt: 'not-a-date' }]),
  /approvedAt/i,
);
assert.throws(
  () => buildApprovedRouteSet([{ path: '/activities/guide', approvedBy: 'Matthew', approvedAt: '2026-02-30' }]),
  /approvedAt/i,
);
for (const path of [
  '/activities',
  '/compare',
  '/activities/../guide',
  '/activities/bad slug',
  '/activities/guide?preview=1',
  '/activities/guide#section',
  '/activities/guide%2Fextra',
  '/Activities/Guide',
  '/activities/-guide',
]) {
  assert.throws(
    () => buildApprovedRouteSet([{ path, approvedBy: 'Matthew', approvedAt: '2026-07-26' }]),
    /path/i,
    `expected invalid path to fail: ${path}`,
  );
}

console.log('editorial approval tests passed');
