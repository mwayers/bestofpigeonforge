import keepListData from '../data/index-keep-list.json';

// Single source of truth (2026-10-19): data/index-keep-list.json.
// A keep-list entry with approvedBy/approvedAt (and needsRewrite=false) is an editorial approval.
// needsRewrite entries stay noindex until rewritten and approved.
export type EditorialApproval = {
  path: string;
  approvedBy: string;
  approvedAt: string;
};

export type KeepListEntry = {
  path: string;
  title: string;
  hub: string;
  needsRewrite: boolean;
  approvedBy?: string;
  approvedAt?: string;
};

export const keepList = keepListData as KeepListEntry[];

export function buildApprovedRouteSet(approvals: EditorialApproval[]): ReadonlySet<string> {
  const routes = new Set<string>();
  const canonicalPath = /^(?:\/(?:activities|itineraries|compare)\/[a-z0-9]+(?:-[a-z0-9]+)*|\/(?!activities$|itineraries$|compare$)[a-z0-9]+(?:-[a-z0-9]+)*)$/;
  for (const approval of approvals) {
    if (!canonicalPath.test(approval.path)) {
      throw new Error('Editorial approval path must identify one canonical dynamic route');
    }
    if (!approval.approvedBy.trim()) throw new Error('Editorial approval approvedBy is required');
    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(approval.approvedAt);
    if (!dateMatch) throw new Error('Editorial approval approvedAt must be a valid YYYY-MM-DD date');
    const [, yearText, monthText, dayText] = dateMatch;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    if (
      parsed.getUTCFullYear() !== year ||
      parsed.getUTCMonth() !== month - 1 ||
      parsed.getUTCDate() !== day
    ) {
      throw new Error('Editorial approval approvedAt must be a valid YYYY-MM-DD date');
    }
    routes.add(approval.path);
  }
  return routes;
}

export function approvalsFromKeepList(entries: KeepListEntry[]): EditorialApproval[] {
  return entries
    .filter((e) => !e.needsRewrite && e.approvedBy && e.approvedAt)
    .map((e) => ({ path: e.path, approvedBy: e.approvedBy as string, approvedAt: e.approvedAt as string }));
}

export const approvedRoutes = buildApprovedRouteSet(approvalsFromKeepList(keepList));

export function isEditoriallyApproved(path: string): boolean {
  return approvedRoutes.has(path);
}

export function approvedSlugsForPrefix(
  prefix: '' | '/activities' | '/itineraries' | '/compare',
  routes: ReadonlySet<string> = approvedRoutes,
): ReadonlySet<string> {
  const marker = `${prefix}/`;
  const slugs = new Set<string>();
  for (const route of Array.from(routes)) {
    if (!route.startsWith(marker)) continue;
    const slug = route.slice(marker.length);
    if (slug && !slug.includes('/')) slugs.add(slug);
  }
  return slugs;
}
