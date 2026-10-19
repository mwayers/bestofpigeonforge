import staticPageApprovals from '../data/static-page-approvals.json';
import { approvedRoutes } from './editorialApprovals';
import { HUB_PATHS } from './hubs';

// Prune 2026-10-19: indexable = approved static pages + 3 guide hubs + approved (clean) keep-list pages.
// Everything else stays live (200) with noindex,follow. Revert = set PRUNE_ENABLED false.
export const PRUNE_ENABLED = true;
const STATIC_PATHS = new Set<string>(staticPageApprovals as string[]);

export function isIndexablePath(path: string): boolean {
  if (!PRUNE_ENABLED) return true;
  if (STATIC_PATHS.has(path) || HUB_PATHS.has(path)) return true;
  return approvedRoutes.has(path);
}
