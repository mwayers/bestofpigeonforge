import Link from 'next/link';
import type { Metadata } from 'next';
import attractionsData from '@/data/attractions.json';
import activityPagesData from '@/data/activity-pages.json';
import itineraryPagesData from '@/data/itinerary-pages.json';
import type { Attraction, ActivityListPage, ItineraryPage } from '@/lib/types';

const attractions = attractionsData as Attraction[];
const activityPages = activityPagesData as ActivityListPage[];
const itineraryPages = itineraryPagesData as ItineraryPage[];

export const metadata: Metadata = {
  title: 'Best Things to Do in Pigeon Forge, TN | Best of Pigeon Forge',
  description:
    'Plan a better Pigeon Forge trip with curated attraction guides, family itineraries, destination comparisons, costs, rainy day ideas, and Smoky Mountain travel tips.',
  alternates: { canonical: 'https://www.bestofpigeonforge.com' },
  openGraph: {
    title: 'Best Things to Do in Pigeon Forge, TN',
    description: 'Curated Pigeon Forge attractions, itineraries, comparisons, and travel planning tools.',
    images: [{ url: 'https://www.bestofpigeonforge.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Best of Pigeon Forge',
  url: 'https://www.bestofpigeonforge.com',
  about: {
    '@type': 'TouristDestination',
    name: 'Pigeon Forge, Tennessee',
    description: 'A Smoky Mountains vacation destination known for Dollywood, family attractions, dinner shows, mountain activities, and indoor experiences.',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.bestofpigeonforge.com/activities?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best of Pigeon Forge',
  url: 'https://www.bestofpigeonforge.com',
  logo: 'https://www.bestofpigeonforge.com/og-default.jpg',
  sameAs: ['https://www.bestofpigeonforge.com'],
};

const homeItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Pigeon Forge trip planning guides',
  itemListElement: [
    { name: 'Things to Do in Pigeon Forge with Kids', url: 'https://www.bestofpigeonforge.com/activities/things-to-do-pigeon-forge-with-kids' },
    { name: 'Pigeon Forge vs Gatlinburg', url: 'https://www.bestofpigeonforge.com/compare/pigeon-forge-vs-gatlinburg' },
    { name: '3-Day Pigeon Forge Family Itinerary', url: 'https://www.bestofpigeonforge.com/itineraries/3-day-pigeon-forge-family' },
    { name: 'Free Things to Do in Pigeon Forge', url: 'https://www.bestofpigeonforge.com/activities/free-things-to-do-pigeon-forge' },
    { name: 'Pigeon Forge Snow Review', url: 'https://www.bestofpigeonforge.com/pigeon-forge-snow-review' },
  ].map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })),
};

const categories = [
  { label: 'Indoor', detail: 'rain-proof picks', emoji: '🏛️', href: '/activities/indoor-activities-pigeon-forge' },
  { label: 'Kids', detail: 'family favorites', emoji: '🎒', href: '/activities/things-to-do-pigeon-forge-with-kids' },
  { label: 'Toddlers', detail: 'under-5 friendly', emoji: '👶', href: '/activities/things-to-do-pigeon-forge-with-toddlers' },
  { label: 'Free', detail: 'budget stretchers', emoji: '🆓', href: '/activities/free-things-to-do-pigeon-forge' },
  { label: 'Couples', detail: 'date-night ideas', emoji: '💑', href: '/activities/romantic-things-to-do-pigeon-forge' },
  { label: 'Winter', detail: 'cold-weather fun', emoji: '❄️', href: '/activities/things-to-do-pigeon-forge-winter' },
];

const comparisonLinks = [
  { slug: 'pigeon-forge-vs-gatlinburg', label: 'Pigeon Forge vs Gatlinburg' },
  { slug: 'pigeon-forge-vs-orlando', label: 'Pigeon Forge vs Orlando' },
  { slug: 'pigeon-forge-vs-myrtle-beach', label: 'Pigeon Forge vs Myrtle Beach' },
  { slug: 'pigeon-forge-vs-gatlinburg-for-couples', label: 'PF vs Gatlinburg for Couples' },
  { slug: 'pigeon-forge-snow-vs-ober-mountain', label: 'PF Snow vs Ober Mountain' },
  { slug: 'dollywood-vs-the-island', label: 'Dollywood vs The Island' },
];

const planningStats = [
  { value: activityPages.length, label: 'activity guides' },
  { value: itineraryPages.length, label: 'ready-made itineraries' },
  { value: attractions.length, label: 'attractions tracked' },
];

function attractionIcon(category: Attraction['category']) {
  return category === 'snow' ? '❄️' :
    category === 'theme-park' ? '🎢' :
    category === 'water' ? '🌊' :
    category === 'food' ? '🍽️' :
    category === 'shows' ? '🎭' :
    category === 'escape-room' ? '🔐' :
    category === 'mini-golf' ? '⛳' :
    category === 'coaster' ? '🎠' :
    category === 'outdoor' ? '🏔️' : '🎟️';
}

export default function HomePage() {
  const pfs = attractions.find((a) => a.isFeaturedPFS)!;
  const topAttractions = attractions.filter((a) => !a.isFeaturedPFS && a.rating >= 4.5).slice(0, 6);
  const featuredItineraries = itineraryPages.slice(0, 3);

  return (
    <>
      {[websiteSchema, organizationSchema, homeItemListSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="overflow-hidden bg-[oklch(0.985_0.025_84)]">
        <section className="relative border-b border-[oklch(0.88_0.055_86)]">
          <div className="absolute inset-0 smoky-grid" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.08fr_0.92fr] md:px-6 md:py-20 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-5 w-fit rounded-full border border-[oklch(0.76_0.12_78)] bg-[oklch(0.97_0.045_82)] px-4 py-2 text-sm font-bold text-[oklch(0.35_0.095_155)] shadow-sm">
                Independent Smoky Mountains trip guide
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.94] tracking-[-0.055em] text-[oklch(0.24_0.075_155)] md:text-7xl lg:text-8xl">
                Plan Pigeon Forge without guessing.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[oklch(0.39_0.045_135)] md:text-xl">
                Pick the right attractions, avoid the tourist-trap fog, and build a trip that fits your people, weather, budget, and energy level.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/activities" className="rounded-2xl bg-[oklch(0.43_0.13_154)] px-6 py-3.5 text-sm font-black text-[oklch(0.98_0.025_84)] shadow-[0_14px_30px_oklch(0.43_0.13_154_/_0.25)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.36_0.13_154)]">
                  Find things to do
                </Link>
                <Link href="/itineraries" className="rounded-2xl border border-[oklch(0.74_0.07_86)] bg-[oklch(0.995_0.018_84)] px-6 py-3.5 text-sm font-black text-[oklch(0.29_0.07_155)] transition hover:-translate-y-0.5 hover:border-[oklch(0.55_0.11_154)]">
                  Build an itinerary
                </Link>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {planningStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[oklch(0.87_0.045_85)] bg-[oklch(0.995_0.018_84_/_0.78)] p-4 shadow-sm backdrop-blur">
                    <div className="text-2xl font-black text-[oklch(0.28_0.09_155)]">{stat.value}</div>
                    <div className="mt-1 text-xs font-bold uppercase leading-snug tracking-[0.06em] text-[oklch(0.48_0.05_120)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[430px] rounded-[2rem] border border-[oklch(0.82_0.06_82)] bg-[oklch(0.99_0.018_84)] p-4 shadow-[0_30px_70px_oklch(0.32_0.08_130_/_0.22)] md:min-h-[560px]">
              <div className="mountain-poster h-full rounded-[1.5rem] p-5 text-[oklch(0.98_0.025_84)]">
                <div className="flex items-center justify-between text-sm font-black">
                  <span>Smoky Mountain map room</span>
                  <span className="rounded-full bg-[oklch(0.98_0.025_84_/_0.18)] px-3 py-1">live guide</span>
                </div>
                <div className="mt-28 max-w-sm rounded-3xl bg-[oklch(0.18_0.06_155_/_0.78)] p-5 backdrop-blur-md md:mt-44">
                  <div className="text-sm font-black text-[oklch(0.84_0.15_82)]">Start here</div>
                  <div className="mt-2 text-3xl font-black leading-none tracking-tight">The no-regrets Pigeon Forge shortlist</div>
                  <p className="mt-3 text-sm leading-6 text-[oklch(0.92_0.03_86)]">Indoor snow, Dollywood, The Island, dinner shows, mountain drives, and the backup plans that save a rainy vacation day.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="font-black text-[oklch(0.58_0.12_74)]">Browse by trip problem</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.24_0.075_155)] md:text-4xl">Fast paths to the right answer</h2>
            </div>
            <Link href="/activities" className="font-black text-[oklch(0.36_0.12_155)] hover:underline">All activity guides →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group rounded-3xl border border-[oklch(0.86_0.045_84)] bg-[oklch(0.997_0.015_84)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[oklch(0.55_0.12_155)] hover:shadow-xl">
                <span className="text-4xl transition group-hover:scale-110">{cat.emoji}</span>
                <span className="mt-5 block text-lg font-black text-[oklch(0.25_0.07_155)]">{cat.label}</span>
                <span className="mt-1 block text-sm font-semibold text-[oklch(0.52_0.045_125)]">{cat.detail}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="grid overflow-hidden rounded-[2rem] border border-[oklch(0.33_0.1_155)] bg-[oklch(0.24_0.08_155)] text-[oklch(0.985_0.02_84)] shadow-2xl md:grid-cols-[0.75fr_1.25fr]">
            <div className="snow-badge flex min-h-[260px] items-center justify-center p-8">
              <div className="rounded-[2rem] bg-[oklch(0.98_0.025_84_/_0.16)] p-8 text-center backdrop-blur">
                <div className="text-7xl">❄️</div>
                <div className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-[oklch(0.84_0.14_82)]">Featured experience</div>
              </div>
            </div>
            <div className="p-6 md:p-10">
              <div className="mb-3 inline-flex rounded-full bg-[oklch(0.78_0.16_78)] px-3 py-1 text-xs font-black text-[oklch(0.22_0.08_80)]">Only indoor snow in the Smokies</div>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">{pfs.name}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[oklch(0.9_0.025_86)]">{pfs.shortDesc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {pfs.highlights.slice(0, 4).map((highlight) => (
                  <span key={highlight} className="rounded-full border border-[oklch(0.94_0.02_84_/_0.22)] bg-[oklch(0.94_0.02_84_/_0.09)] px-3 py-1 text-sm font-bold">{highlight}</span>
                ))}
              </div>
              <a href={pfs.bookingUrl || pfs.website} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-2xl bg-[oklch(0.78_0.16_78)] px-6 py-3.5 text-sm font-black text-[oklch(0.22_0.08_80)] transition hover:-translate-y-0.5 hover:bg-[oklch(0.84_0.14_82)]">
                Book Pigeon Forge Snow, {pfs.priceRange}
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-black text-[oklch(0.58_0.12_74)]">Ranked attractions</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.24_0.075_155)] md:text-4xl">Start with the proven crowd-pleasers</h2>
            </div>
            <Link href="/best-attractions-pigeon-forge" className="hidden font-black text-[oklch(0.36_0.12_155)] hover:underline md:block">See full list →</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topAttractions.map((attraction, index) => (
              <div key={attraction.id} className="rounded-3xl border border-[oklch(0.86_0.045_84)] bg-[oklch(0.997_0.015_84)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[oklch(0.92_0.055_150)] text-2xl">{attractionIcon(attraction.category)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black uppercase tracking-[0.14em] text-[oklch(0.58_0.12_74)]">#{index + 1} pick</div>
                    <h3 className="mt-1 text-lg font-black leading-tight text-[oklch(0.24_0.075_155)]">{attraction.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[oklch(0.48_0.045_125)]">{attraction.shortDesc}</p>
                    <div className="mt-3 font-black text-[oklch(0.58_0.12_74)]">★ {attraction.rating}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[0.8fr_1.2fr] md:px-6">
          <div>
            <p className="font-black text-[oklch(0.58_0.12_74)]">Done-for-you planning</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.24_0.075_155)] md:text-4xl">Grab an itinerary instead of rebuilding one from scratch</h2>
            <p className="mt-4 text-lg leading-8 text-[oklch(0.43_0.045_125)]">These pages target high-intent searches and give visitors a clear next click instead of a dead-end article.</p>
            <Link href="/itineraries" className="mt-6 inline-flex rounded-2xl bg-[oklch(0.43_0.13_154)] px-6 py-3 text-sm font-black text-[oklch(0.98_0.025_84)]">All itineraries</Link>
          </div>
          <div className="grid gap-4">
            {featuredItineraries.map((itin) => (
              <Link key={itin.slug} href={`/itineraries/${itin.slug}`} className="group rounded-3xl border border-[oklch(0.86_0.045_84)] bg-[oklch(0.997_0.015_84)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[oklch(0.55_0.12_155)] hover:shadow-xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-[oklch(0.58_0.12_74)]">
                  <span>{itin.duration}</span><span>•</span><span>{itin.season === 'any' ? 'Year-round' : itin.season}</span><span>•</span><span>${itin.budgetEstimate.low}–${itin.budgetEstimate.high}/person</span>
                </div>
                <h3 className="mt-2 text-xl font-black text-[oklch(0.24_0.075_155)] group-hover:text-[oklch(0.36_0.12_155)]">{itin.title}</h3>
                <p className="mt-1 text-sm text-[oklch(0.49_0.045_125)]">{itin.audience}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[oklch(0.84_0.045_84)] bg-[oklch(0.93_0.055_150)] py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="font-black text-[oklch(0.36_0.12_155)]">Comparison intent</p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.21_0.07_155)] md:text-4xl">Help visitors decide before they bounce to Reddit</h2>
              </div>
              <Link href="/compare" className="font-black text-[oklch(0.28_0.1_155)] hover:underline">All comparisons →</Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {comparisonLinks.map((comp) => (
                <Link key={comp.slug} href={`/compare/${comp.slug}`} className="rounded-2xl border border-[oklch(0.78_0.05_150)] bg-[oklch(0.99_0.018_84_/_0.82)] px-5 py-4 text-sm font-black text-[oklch(0.25_0.075_155)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[oklch(0.997_0.015_84)]">
                  ⚖️ {comp.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
