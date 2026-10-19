import keepListData from '../data/index-keep-list.json';

type Entry = { path: string; title: string; hub: string; needsRewrite: boolean; approvedBy?: string };
const keep = keepListData as Entry[];

export type Hub = {
  key: string;
  name: string;
  href: string;
  blurb: string;
  isNewHub?: boolean;
};

// 10 hubs from the 2026-10-19 prune plan. Three are new guide pages under /guides.
export const HUBS: Hub[] = [
  { key: 'Things to Do & Attractions', name: 'Things to Do', href: '/activities/best-attractions-pigeon-forge', blurb: 'The core attraction shortlist, free and cheap ideas, and seasonal picks.' },
  { key: 'Dollywood & Major Attractions', name: 'Dollywood & Major Attractions', href: '/guides/dollywood-and-major-attractions', blurb: 'What Dollywood is, what it costs, and how it stacks up against the big alternatives.', isNewHub: true },
  { key: 'Gatlinburg & the Smokies', name: 'Gatlinburg & the Smokies', href: '/guides/gatlinburg-and-the-smokies', blurb: 'Choosing a base, Gatlinburg day plans, and the national park next door.', isNewHub: true },
  { key: 'Families & Kids', name: 'Families & Kids', href: '/activities/things-to-do-pigeon-forge-with-kids', blurb: 'Plans by age, from toddlers to teens, plus multi-generation trips.' },
  { key: 'Couples & Groups', name: 'Couples & Groups', href: '/guides/couples-and-groups', blurb: 'Romantic trips, honeymoons, bachelorettes, church groups, and big crews.', isNewHub: true },
  { key: 'Rainy Day & Indoor', name: 'Rainy Day & Indoor', href: '/activities/things-to-do-pigeon-forge-rainy-day', blurb: 'Backup plans for when the forecast turns.' },
  { key: 'Food & Restaurants', name: 'Food & Restaurants', href: '/activities/best-restaurants-pigeon-forge', blurb: 'Where to eat in Pigeon Forge.' },
  { key: 'Shows & Dinner Shows', name: 'Shows & Dinner Shows', href: '/activities/best-shows-pigeon-forge', blurb: 'Comedy, music, and dinner shows, with individual reviews.' },
  { key: 'Cabins & Where to Stay', name: 'Cabins & Where to Stay', href: '/activities/best-cabins-pigeon-forge', blurb: 'Cabin picks and what a rental really costs.' },
  { key: 'Trip Planning, Itineraries & Costs', name: 'Trip Planning & Itineraries', href: '/itineraries', blurb: 'When to go, how long to stay, and day-by-day plans.' },
];

export const HUB_PATHS = new Set(HUBS.filter((h) => h.isNewHub).map((h) => h.href));

/** Clean (indexable, approved) keep-list pages for a hub, excluding the hub page itself. */
export function hubSpokes(hub: Hub): { path: string; title: string }[] {
  return keep
    .filter((e) => e.hub.startsWith(hub.key) && !e.needsRewrite && e.approvedBy && e.path !== hub.href)
    .map((e) => ({ path: e.path, title: e.title }));
}

export function hubByHref(href: string): Hub | undefined {
  return HUBS.find((h) => h.href === href);
}

export function approvedKeepEntries(prefix: '/activities/' | '/itineraries/' | '/compare/'): { path: string; title: string; hub: string }[] {
  return keep.filter((e) => e.path.startsWith(prefix) && !e.needsRewrite && e.approvedBy);
}
