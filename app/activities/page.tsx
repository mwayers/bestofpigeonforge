import Link from 'next/link';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Things to Do in Pigeon Forge | Activity Planning Guides',
  description: 'Choose a reviewed Pigeon Forge activity guide by weather and group needs, with clear criteria and verification notes.',
  path: '/activities',
});

const guides = [
  { href: '/activities/indoor-activities-pigeon-forge', title: 'Indoor activities', question: 'Need options centered on indoor experiences?', use: 'Use when weather exposure or an indoor backup is the main concern.' },
  { href: '/activities/things-to-do-pigeon-forge-with-kids', title: 'Things to do with kids', question: 'Traveling with children?', use: 'Use to compare choices for a family group without assuming one option fits every age.' },
  { href: '/activities/things-to-do-pigeon-forge-rainy-day', title: 'Rainy-day activities', question: 'Did the forecast change?', use: 'Use to make a fallback plan, then check same-day operations directly.' },
];

const jsonLd = [
  breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Activities', url: '/activities' }]),
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Things to Do in Pigeon Forge',
    url: 'https://www.bestofpigeonforge.com/activities',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `https://www.bestofpigeonforge.com${guide.href}` })),
    },
  },
];

export default function ActivitiesIndexPage() {
  return (
    <main className="bg-gray-50">
      {jsonLd.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <Link href="/" className="text-sm font-bold text-[#1B4332]">← Home</Link>
        <h1 className="mt-5 text-4xl font-black text-gray-900 md:text-5xl">Things to Do in Pigeon Forge</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-700">Choose by the problem you need to solve. This hub intentionally links to a short reviewed cohort rather than exposing the full draft inventory.</p>
        <p className="mt-3 text-sm text-gray-600"><strong>Author:</strong> Best of Pigeon Forge Editorial Team · <strong>Reviewed by:</strong> Alex Woods</p>

        <section className="mt-10" aria-labelledby="start-heading">
          <h2 id="start-heading" className="text-2xl font-black text-gray-900">Start here</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-[#1B4332]">
                <p className="text-sm font-bold text-amber-700">{guide.question}</p>
                <h3 className="mt-2 text-xl font-black text-gray-900">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{guide.use}</p>
                <span className="mt-4 inline-block font-bold text-[#1B4332]">Open guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-x-auto" aria-labelledby="matrix-heading">
          <h2 id="matrix-heading" className="text-2xl font-black text-gray-900">Quick decision matrix</h2>
          <table className="mt-5 w-full min-w-[640px] border-collapse overflow-hidden rounded-xl bg-white text-left text-sm">
            <thead className="bg-[#1B4332] text-white"><tr><th className="p-4">Your constraint</th><th className="p-4">Start with</th><th className="p-4">Check before leaving</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-4">Prefer indoor experiences</td><td className="p-4"><Link className="font-bold underline" href="/activities/indoor-activities-pigeon-forge">Indoor guide</Link></td><td className="p-4">Current operating status and ticket rules</td></tr>
              <tr><td className="p-4">Traveling with children</td><td className="p-4"><Link className="font-bold underline" href="/activities/things-to-do-pigeon-forge-with-kids">Kids guide</Link></td><td className="p-4">Operator restrictions for your group</td></tr>
              <tr><td className="p-4">Rain changed the plan</td><td className="p-4"><Link className="font-bold underline" href="/activities/things-to-do-pigeon-forge-rainy-day">Rainy-day guide</Link></td><td className="p-4">Same-day closures and availability</td></tr>
            </tbody>
          </table>
        </section>

        <aside className="mt-12 rounded-2xl border border-sky-200 bg-sky-50 p-6">
          <h2 className="text-xl font-black text-gray-900">How this hub works</h2>
          <p className="mt-3 leading-7 text-gray-700">Links are selected for a distinct planning job, honest limitations, and first-party sourcing. No rating, price, visit-length, accessibility, or parking claim is used here as a shortcut for suitability.</p>
          <p className="mt-3 text-sm text-gray-700"><strong>Last verified:</strong> July 26, 2026. Check volatile details with the official operator before visiting.</p>
          <p className="mt-3 text-sm text-gray-700">See our <Link className="font-bold underline" href="/editorial-standards">editorial standards</Link>, <Link className="font-bold underline" href="/commercial-disclosure">commercial disclosure</Link>, and <Link className="font-bold underline" href="/corrections-policy">corrections policy</Link>.</p>
        </aside>
      </section>
    </main>
  );
}
