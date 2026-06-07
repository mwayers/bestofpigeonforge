import Link from 'next/link';
import TripCostCalculator from './TripCostCalculator';
import { articleSchema, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';

const path = '/tools/pigeon-forge-trip-cost-calculator';

export const metadata = buildMetadata({
  title: 'Pigeon Forge Trip Cost Calculator, Estimate Your Vacation Budget',
  description: 'Use this free Pigeon Forge trip cost calculator to estimate lodging, food, attractions, parking, souvenirs, and a realistic vacation budget.',
  path,
});

const faqs = [
  {
    question: 'How much does a Pigeon Forge trip cost?',
    answer: 'Most families should expect lodging, food, attractions, parking, and extras to be the major budget categories. A weekend can be relatively affordable if you choose budget lodging and free activities, while peak-season cabin trips with multiple paid attractions cost much more.',
  },
  {
    question: 'What is the biggest Pigeon Forge vacation expense?',
    answer: 'Lodging is usually the biggest variable, especially during peak dates, holidays, and fall foliage season. Attractions and dinner shows are the next biggest swing factor for families.',
  },
  {
    question: 'Should I add a cushion to my Pigeon Forge budget?',
    answer: 'Yes. A 10 to 15 percent cushion is smart because snacks, parking, souvenirs, weather changes, and last-minute attractions add up quickly.',
  },
];

const jsonLd = [
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: 'Pigeon Forge Trip Cost Calculator', url: path },
  ]),
  articleSchema({
    title: 'Pigeon Forge Trip Cost Calculator',
    description: 'Estimate lodging, food, attractions, parking, souvenirs, and total vacation cost for a Pigeon Forge trip.',
    url: path,
  }),
  faqSchema(faqs),
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pigeon Forge Trip Cost Calculator',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `https://www.bestofpigeonforge.com${path}`,
  },
];

export default function PigeonForgeTripCostCalculatorPage() {
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
              <span>Trip Cost Calculator</span>
            </nav>
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex rounded-full border border-[oklch(0.76_0.12_78)] bg-[oklch(0.97_0.045_82)] px-4 py-2 text-sm font-black text-[oklch(0.35_0.095_155)] shadow-sm">
                Free Pigeon Forge planning tool
              </div>
              <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[oklch(0.24_0.075_155)] md:text-6xl">
                Pigeon Forge trip cost calculator
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-[oklch(0.39_0.045_135)] md:text-xl">
                Estimate your vacation budget before you book. Adjust travelers, dates, lodging rate, taxes, fees, meals, individual attractions, transportation, souvenirs, and cushion to see a realistic Pigeon Forge trip total.
              </p>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <TripCostCalculator />

          <section className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-black text-[oklch(0.58_0.12_74)]">How to use this estimate</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-[oklch(0.24_0.075_155)]">Treat the total as a planning range, not a receipt</h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-[oklch(0.43_0.045_125)]">
              <p>
                Pigeon Forge budgets swing most on lodging dates, cabin or hotel fees, paid attractions, and how often you eat sit-down meals. Use this calculator to compare specific trip plans quickly, then check current lodging and attraction pricing before final booking.
              </p>
              <p>
                If you are visiting during summer, holidays, spring break, or fall foliage, raise the lodging estimate. If you are planning a rainy-day or winter trip, keep at least one indoor attraction in the budget so weather does not derail the day.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[oklch(0.86_0.045_84)] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black text-[oklch(0.24_0.075_155)]">Related Pigeon Forge planning guides</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ['Budget things to do', '/activities/pigeon-forge-on-a-budget'],
                ['Free things to do', '/activities/free-things-to-do-pigeon-forge'],
                ['3-day family itinerary', '/itineraries/3-day-pigeon-forge-family'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl border border-[oklch(0.86_0.045_84)] bg-[oklch(0.997_0.015_84)] px-4 py-3 text-sm font-black text-[oklch(0.30_0.08_155)] transition hover:-translate-y-0.5 hover:border-[oklch(0.43_0.13_154)]">
                  {label} →
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-black text-[oklch(0.24_0.075_155)]">Pigeon Forge cost FAQs</h2>
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
