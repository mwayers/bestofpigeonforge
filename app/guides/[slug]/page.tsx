import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { HUBS, hubSpokes } from '@/lib/hubs';

type GuideCopy = {
  slug: string;
  hubKey: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  howToUse: { heading: string; text: string }[];
};

const GUIDES: GuideCopy[] = [
  {
    slug: 'dollywood-and-major-attractions',
    hubKey: 'Dollywood & Major Attractions',
    title: 'Dollywood & Major Attractions Guide',
    metaTitle: 'Dollywood & Major Pigeon Forge Attractions: Planning Guide',
    metaDescription: 'Start here for Dollywood: what the park is, what it costs, insider tips, and how it compares with The Island, Anakeesta, Silver Dollar City and more.',
    intro: [
      'Dollywood is the anchor of most Pigeon Forge trips, and it is usually the biggest single ticket in the budget. Deciding whether to spend a day (or two) there shapes the rest of the itinerary, so it is worth settling that question first.',
      'This guide collects our Dollywood explainers and the head-to-head comparisons visitors ask about most: Dollywood versus The Island, versus Anakeesta, versus other parks in the same family, and versus a winter visit to Pigeon Forge Snow. If you decide to skip the park, we have a plan for that too.',
    ],
    howToUse: [
      { heading: 'New to Dollywood?', text: 'Read the "What is Dollywood" explainer first, then the cost breakdown so you know what a day really runs before you book.' },
      { heading: 'Already going?', text: 'Use the tips-and-tricks guide to plan your day, and check current hours, ticket prices and seasonal events on Dollywood\'s official site before you go. They change by season.' },
      { heading: 'Weighing alternatives?', text: 'The comparisons below set two options side by side so you can pick the one that fits your group, budget and season.' },
    ],
  },
  {
    slug: 'gatlinburg-and-the-smokies',
    hubKey: 'Gatlinburg & the Smokies',
    title: 'Gatlinburg & the Smoky Mountains Guide',
    metaTitle: 'Gatlinburg & the Great Smoky Mountains: Pigeon Forge Visitor Guide',
    metaDescription: 'Pigeon Forge or Gatlinburg? Plan Gatlinburg days, free activities, honeymoons and Smoky Mountains National Park visits from one hub.',
    intro: [
      'Pigeon Forge, Gatlinburg and Sevierville sit along the same corridor into Great Smoky Mountains National Park, and many visitors split their time between them. Gatlinburg is the walkable mountain town at the park entrance; Pigeon Forge is the attraction strip along the Parkway; Sevierville sits further out toward the interstate.',
      'Use this hub to decide where to base yourself, then plan the Gatlinburg and national-park parts of the trip. Every page linked here is one of our maintained guides.',
    ],
    howToUse: [
      { heading: 'Choosing a base', text: 'Start with Pigeon Forge vs Gatlinburg, then the couples version if it is a two-person trip.' },
      { heading: 'Planning a Gatlinburg day', text: 'The free things to do and the activity comparison pages cover what to do in town without overspending.' },
      { heading: 'Heading into the park', text: 'Read the national park comparisons, then check road, trail and parking-tag rules on the National Park Service website before you drive in, because conditions change.' },
    ],
  },
  {
    slug: 'couples-and-groups',
    hubKey: 'Couples & Groups',
    title: 'Pigeon Forge for Couples & Groups',
    metaTitle: 'Pigeon Forge for Couples & Groups: Romantic Trips to Big Crews',
    metaDescription: 'Romantic things to do, honeymoon plans, couples weekends, bachelorette trips, church groups and large-group activities in Pigeon Forge.',
    intro: [
      'A couples getaway and a 20-person church trip need different plans, even in the same town. Pacing, booking lead time, transportation and budget all change with group size.',
      'This hub gathers our guides for two-person trips (romantic ideas, honeymoons, a first trip together and a ready-made weekend) and for groups (bachelorettes, church and youth groups, and large parties). Pick your situation below.',
    ],
    howToUse: [
      { heading: 'Couples', text: 'Start with the romantic things-to-do list, then use the honeymoon or couples-weekend itinerary as a day-by-day template.' },
      { heading: 'Groups', text: 'Large parties should book shows, dinners and attractions early and ask venues directly about group rates and minimum group sizes.' },
      { heading: 'Mixed trips', text: 'If you have couples plus kids or grandparents, see the Families & Kids hub for multi-generation itineraries.' },
    ],
  },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) return {};
  return buildMetadata({ title: guide.metaTitle, description: guide.metaDescription, path: `/guides/${guide.slug}` });
}

export default function GuideHubPage({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);
  if (!guide) notFound();
  const hub = HUBS.find((h) => h.key === guide.hubKey)!;
  const spokes = hubSpokes(hub);
  const path = `/guides/${guide.slug}`;
  const jsonLd = [
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: guide.title, url: path }]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: guide.title,
      url: `https://www.bestofpigeonforge.com${path}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: spokes.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `https://www.bestofpigeonforge.com${s.path}` })),
      },
    },
  ];
  const otherHubs = HUBS.filter((h) => h.key !== hub.key);

  return (
    <main className="bg-gray-50">
      {jsonLd.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <Link href="/" className="text-sm font-bold text-[#1B4332]">← Home</Link>
        <h1 className="mt-5 text-4xl font-black text-gray-900 md:text-5xl">{guide.title}</h1>
        {guide.intro.map((p) => <p key={p} className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">{p}</p>)}

        <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="How to use this guide">
          {guide.howToUse.map((h) => (
            <div key={h.heading} className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-black text-gray-900">{h.heading}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{h.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12" aria-labelledby="more-heading">
          <h2 id="more-heading" className="text-2xl font-black text-gray-900">More in this guide</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {spokes.map((s) => (
              <li key={s.path}>
                <Link href={s.path} className="block rounded-xl border border-gray-200 bg-white p-4 font-bold text-[#1B4332] hover:border-[#1B4332]">{s.title} →</Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className="mt-12 border-t pt-8" aria-label="Other guides">
          <h2 className="font-bold text-gray-900">Other trip guides</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {otherHubs.map((h) => <Link key={h.href} href={h.href} className="rounded-lg bg-[#1B4332]/5 px-3 py-2 text-sm text-[#1B4332]">{h.name}</Link>)}
          </div>
        </nav>
        <p className="mt-8 text-sm text-gray-600">Prices, hours and seasonal schedules change. Confirm details with the operator before you go. See our <Link className="underline" href="/editorial-standards">editorial standards</Link>.</p>
      </section>
    </main>
  );
}
