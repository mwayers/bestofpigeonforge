// Rendering-time placeholder scrubber. Generator scaffolds left tokens like "Content placeholder...",
// "Address placeholder", "$XX", "I-XX". We never invent facts: anything containing a token is dropped.
const TOKEN_PATTERNS: RegExp[] = [
  /placeholder/i,
  /\$XX\b/,
  /\bXXX?\b/,
  /\bI-XX\b/,
  /\bX hours?\b/,
  /\bMonth XX\b/i,
  /^\s*(?:Tip|FAQ|Answer|Pro|Con)\s+\d+\s*[.?]?\s*$/i,
  /\bTBD\b/,
  /lorem ipsum/i,
];

export function hasPlaceholderToken(value: string): boolean {
  return TOKEN_PATTERNS.some((p) => p.test(value));
}

function isEmpty(v: unknown): boolean {
  if (v === undefined || v === null || v === '') return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object') return Object.keys(v as object).length === 0;
  return false;
}

function containsToken(v: unknown): boolean {
  if (typeof v === 'string') return hasPlaceholderToken(v);
  if (Array.isArray(v)) return v.some(containsToken);
  if (v && typeof v === 'object') return Object.values(v as Record<string, unknown>).some(containsToken);
  return false;
}

// Keys whose loss makes an object meaningless (drop the whole object, e.g. an FAQ with a placeholder answer).
const ESSENTIAL_KEYS = new Set(['answer', 'question', 'content', 'heading', 'name', 'definition', 'title']);

function scrub(v: unknown): unknown {
  if (typeof v === 'string') return hasPlaceholderToken(v) ? undefined : v;
  if (Array.isArray(v)) {
    return v
      .filter((item) => {
        if (typeof item === 'string') return !hasPlaceholderToken(item);
        if (item && typeof item === 'object') {
          const rec = item as Record<string, unknown>;
          return !Object.entries(rec).some(([k, val]) => ESSENTIAL_KEYS.has(k) && containsToken(val));
        }
        return true;
      })
      .map(scrub)
      .filter((item) => !isEmpty(item));
  }
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      const s = scrub(val);
      if (s !== undefined) out[k] = s;
    }
    return out;
  }
  return v;
}

/** Return a copy with placeholder strings/blocks removed. Required string fields fall back to ''. */
export function scrubPlaceholders<T>(record: T, fallbacks: Partial<Record<keyof T, string>> = {}): T {
  const out = scrub(record) as Record<string, unknown>;
  const src = record as unknown as Record<string, unknown>;
  for (const [k, v] of Object.entries(src)) {
    if (typeof v === 'string' && out[k] === undefined) {
      const fb = (fallbacks as Record<string, string | undefined>)[k];
      out[k] = fb && !hasPlaceholderToken(fb) ? fb : '';
    }
    if (Array.isArray(v) && out[k] === undefined) out[k] = [];
  }
  return out as T;
}
