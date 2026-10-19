import assert from 'node:assert/strict';
import {
  classifyContentRecord,
  filterIndexableRecords,
  hasScaffoldContent,
  isIndexableContentRecord,
  robotsForContentRecord,
} from '../lib/contentQuality';

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

test('detects literal and numbered scaffold content', () => {
  assert.equal(hasScaffoldContent({ intro: 'Content placeholder...' }), true);
  assert.equal(hasScaffoldContent({ proTips: ['Tip 1', 'Tip 2'] }), true);
  assert.equal(hasScaffoldContent({ faqs: [{ question: 'FAQ 1?', answer: 'Answer 1' }] }), true);
  assert.equal(hasScaffoldContent({ pricing: '$XX per person' }), true);
  assert.equal(hasScaffoldContent({ route: 'XXX X hours via I-XX' }), true);
});

test('does not flag legitimate numbered travel guidance', () => {
  assert.equal(
    hasScaffoldContent({
      intro: 'Pigeon Forge is a family destination in East Tennessee.',
      proTips: ['Arrive before 10 a.m.', 'Reserve dinner shows in advance.'],
    }),
    false,
  );
});

test('quarantines scaffold and duplicate records', () => {
  assert.equal(classifyContentRecord({ intro: 'Content placeholder...' }, false), 'scaffold');
  assert.equal(classifyContentRecord({ intro: 'Useful verified guide content.' }, true), 'duplicate');
  assert.equal(isIndexableContentRecord({ intro: 'Content placeholder...' }, false), false);
});

test('requires explicit editorial approval for otherwise clean content', () => {
  const record = {
    slug: 'indoor-activities-pigeon-forge',
    intro: 'A locally reviewed guide to indoor attractions.',
    bodySections: [{ heading: 'Best options', content: 'Choose based on age and visit length.' }],
  };
  assert.equal(classifyContentRecord(record, false), 'review');
  assert.equal(isIndexableContentRecord(record, false), false);
  assert.equal(isIndexableContentRecord(record, false, true), true);
});

test('filters scaffold, duplicate, and unapproved records from indexable inventory', () => {
  const records = [
    { slug: 'approved-guide', intro: 'A useful local guide.' },
    { slug: 'unapproved-guide', intro: 'Another useful local guide.' },
    { slug: 'scaffold-guide', intro: 'Content placeholder...' },
    { slug: 'duplicate-guide', intro: 'First record.' },
    { slug: 'duplicate-guide', intro: 'Second record.' },
  ];
  assert.deepEqual(
    filterIndexableRecords(records, new Set(['approved-guide'])).map((record) => record.slug),
    ['approved-guide'],
  );
});

test('returns noindex follow robots for quarantined or unapproved records', () => {
  assert.deepEqual(robotsForContentRecord({ intro: 'FAQ 1?' }, false, false), {
    index: false,
    follow: true,
  });
  assert.deepEqual(robotsForContentRecord({ intro: 'A useful local guide.' }, false, false), {
    index: false,
    follow: true,
  });
  assert.equal(robotsForContentRecord({ intro: 'A useful local guide.' }, false, true), undefined);
});

console.log('content quality tests passed');
