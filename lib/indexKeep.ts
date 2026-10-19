import keepList from '../data/index-keep-list.json';

// Prune 2026-10-19: only these dynamic paths are indexable and listed in the sitemap.
// Everything else stays live (200) but gets noindex,follow. Revert = set PRUNE_ENABLED false or delete this list check.
export const PRUNE_ENABLED = true;
const KEEP = new Set<string>(keepList as string[]);
const STATIC_PATHS = new Set(['/', '/activities', '/itineraries', '/compare', '/tools', '/about', '/contact', '/privacy-policy', '/terms']);

export function isIndexablePath(path: string): boolean {
  if (!PRUNE_ENABLED) return true;
  if (STATIC_PATHS.has(path) || path.startsWith('/tools')) return true;
  return KEEP.has(path);
}

