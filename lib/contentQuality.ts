export type ContentQualityClassification = 'scaffold' | 'duplicate' | 'review';

const SCAFFOLD_PATTERNS: RegExp[] = [
  /content placeholder/i,
  /address placeholder/i,
  /\$XX\b/i,
  /\bXXX\s+X\s+hours?\b/i,
  /\bI-XX\b/i,
  /^Tip\s+\d+\.?$/i,
  /^FAQ\s+\d+\??$/i,
  /^Answer\s+\d+\.?$/i,
  /^Pro\s+\d+\.?$/i,
  /^Con\s+\d+\.?$/i,
];

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(collectStrings);
  }
  return [];
}

export function hasScaffoldContent(record: unknown): boolean {
  return collectStrings(record).some((value) => {
    const normalized = value.trim();
    return SCAFFOLD_PATTERNS.some((pattern) => pattern.test(normalized));
  });
}

export function classifyContentRecord(
  record: unknown,
  hasDuplicateSlug: boolean,
): ContentQualityClassification {
  if (hasScaffoldContent(record)) return 'scaffold';
  if (hasDuplicateSlug) return 'duplicate';
  return 'review';
}

export function isIndexableContentRecord(
  record: unknown,
  hasDuplicateSlug: boolean,
  isEditoriallyApproved = false,
): boolean {
  return isEditoriallyApproved && classifyContentRecord(record, hasDuplicateSlug) === 'review';
}

export function filterIndexableRecords<T extends { slug: string }>(
  records: T[],
  approvedSlugs: ReadonlySet<string> = new Set(),
): T[] {
  const slugCounts = new Map<string, number>();
  for (const record of records) {
    slugCounts.set(record.slug, (slugCounts.get(record.slug) ?? 0) + 1);
  }
  return records.filter((record) =>
    isIndexableContentRecord(
      record,
      (slugCounts.get(record.slug) ?? 0) > 1,
      approvedSlugs.has(record.slug),
    ),
  );
}

export function robotsForContentRecord(
  record: unknown,
  hasDuplicateSlug: boolean,
  isEditoriallyApproved = false,
): { index: false; follow: true } | undefined {
  if (isIndexableContentRecord(record, hasDuplicateSlug, isEditoriallyApproved)) return undefined;
  return { index: false, follow: true };
}
