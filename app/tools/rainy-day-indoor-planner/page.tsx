import Link from 'next/link';
import attractionsData from '@/data/attractions.json';
import RainyDayPlanner from './RainyDayPlanner';
import { articleSchema, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';

const path = '/tools/rainy-day-indoor-planner';

export const metadata = buildMetadata({
  title: 'Pigeon Forge Rainy Day Indoor Planner',
  description: 'Build a custom Pigeon Forge rainy day plan with indoor attractions, toddler-friendly stops, teen options, dinner shows, and weatherproof activities.',
  path,
});

const faqs = [
  {
    question: 'What can you do in Pigeon Forge when it rains?',
    answer: 'Pigeon Forge has several indoor rainy-day options including Pigeon Forge Snow, WonderWorks, Titanic Museum, indoor mini golf, escape rooms, dinner shows, restaurants, and shopping complexes.',
  },
  {
    question: 'What is the best indoor activity for kids in Pigeon Forge?',
    answer: 'For families with kids, Pigeon Forge Snow is one of the strongest rainy-day anchors because it is fully indoors, works for a wide age range, and feels unique compared with standard museums or arcades.',
  },
  {
    question: 'Should I leave Pigeon Forge for Gatlinburg on a rainy day?',
    answer: 'It depends on your group and traffic tolerance. Ripley’s Aquarium in Gatlinburg is excellent, but many families prefer staying in Pigeon Forge during bad weather to avoid extra driving and parking friction.',
  },
];

const jsonLd = [
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: 'Rainy Day Indoor Planner', url: path },
  ]),
  articleSchema({
    title: 'Pigeon Forge Rainy Day Indoor Planner',
    description: 'Build a custom rainy-day Pigeon Forge indoor itinerary based on group, budget, time, energy, and location.',
    url: path,
  }),
  faqSchema(faqs),
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pigeon Forge Rainy Day Indoor Planner',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `https://www.bestofpigeonforge.com${path}`,
  },
];

export default function RainyDayIndoorPlannerPage() {
  const rainyAttractions = (attractionsData as any[]).filter((attraction) =>
    attraction.tags?.includes('indoor') || attraction.tags?.includes('rainy-day') || attraction.category === 'shows',
  );

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="bg-[oklch(0.985_0.025_84)]">
        <section className="border-b border-[oklch(0.86_0.045_84)] smoky-grid">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <nav className="mb-6 text-sm font-bold text-[oklch(0.48_0.05_125)]">
              <Link href="/" className="hover:text-[oklch(0.36_0.12_155)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/tools" className="hover:text-[oklch(0.36_0.12_155)]">Tools</Link>
              <span className="mx-2">/</span>
              <span>Rainy Day Indoor Planner</span>
            </nav>
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex rounded-full border border-[oklch(0.76_0.12_78)] bg-[oklch(0.97_0.045_82)] px-4 py-2 text-sm font-black text-[oklch(0.35_0.095_155)] shadow-sm">
                Free Pigeon Forge rainy-day tool
              </div>
              <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[oklch(0.24_0.075_155)] md:text-6xl">
                Rainy-day indoor planner for Pigeon Forge
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-[oklch(0.39_0.045_135)] md:text-xl">
                Don’t let bad weather wreck the trip. Choose your group, time, budget, energy level, and location preference, then get a weatherproof indoor plan built from real Pigeon Forge attractions.
              </p>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <RainyDayPlanner attractions={rainyAttractions} />

          <section className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-black text-[oklch(0.58_0.12_74)]">Why this tool exists</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.24_0.075_155)]">Rain changes the trip faster than almost anything</h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-[oklch(0.43_0.045_125)]">
              <p>
                The mistake most visitors make is waiting until the rain starts, then searching “indoor things to do near me” while everyone is already tired. This planner gives you a backup plan before the day gets messy.
              </p>
              <p>
                For families, the best rainy-day plan usually has one strong anchor attraction, one flexible backup, and one food or show option. That keeps the day from turning into a random string of arcades and parking lots.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-[oklch(0.24_0.075_155)]">Related rainy-day guides</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ['Rainy day activities', '/activities/things-to-do-pigeon-forge-rainy-day'],
                ['Indoor activities', '/activities/indoor-activities-pigeon-forge'],
                ['Trip cost calculator', '/tools/pigeon-forge-trip-cost-calculator'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl border border-[oklch(0.86_0.045_84)] bg-[oklch(0.997_0.015_84)] px-4 py-3 text-sm font-black text-[oklch(0.30_0.08_155)] transition hover:-translate-y-0.5 hover:border-[oklch(0.43_0.13_154)]">
                  {label} →
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-black text-[oklch(0.24_0.075_155)]">Rainy-day Pigeon Forge FAQs</h2>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-black text-[oklch(0.24_0.075_155)]">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-[oklch(0.48_0.045_125)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
