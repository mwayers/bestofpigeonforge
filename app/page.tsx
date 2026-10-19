import Link from 'next/link';
import type { Metadata } from 'next';
import { HUBS, hubSpokes } from '@/lib/hubs';

export const metadata: Metadata = {
  title: 'Plan a Pigeon Forge Trip | Best of Pigeon Forge',
  description: 'Choose Pigeon Forge activities by weather, group, and trip goal using a small set of reviewed planning guides.',
  alternates: { canonical: 'https://www.bestofpigeonforge.com' },
  openGraph: {
    title: 'Plan a Pigeon Forge Trip',
    description: 'Practical routes into indoor, family, rainy-day, and destination-planning guides.',
    images: [{ url: 'https://www.bestofpigeonforge.com/og-default.jpg', width: 1200, height: 630 }],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Best of Pigeon Forge',
  url: 'https://www.bestofpigeonforge.com',
};

const paths = [
  { href: '/activities/indoor-activities-pigeon-forge', label: 'Indoor activities', detail: 'Start here when weather exposure is the main constraint.' },
  { href: '/activities/things-to-do-pigeon-forge-with-kids', label: 'Things to do with kids', detail: 'Compare options for a group traveling with children.' },
  { href: '/activities/things-to-do-pigeon-forge-rainy-day', label: 'Rainy-day options', detail: 'Build a backup plan, then confirm same-day operating status.' },
  { href: '/compare/pigeon-forge-vs-gatlinburg', label: 'Pigeon Forge or Gatlinburg?', detail: 'Choose a base by attraction style, downtown mobility, and park access.' },
];

export default function HomePage() {
  return (
    <main className="bg-[oklch(0.985_0.025_84)] text-[oklch(0.24_0.075_155)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <section className="border-b border-[oklch(0.88_0.055_86)] smoky-grid">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-black text-[oklch(0.52_0.12_74)]">Locally operated Pigeon Forge planning guide</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-[-0.045em] md:text-7xl">Plan around the trip you actually have.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[oklch(0.39_0.045_135)]">Start with your weather, group, and transportation needs. Start with one of the trip guides below. We only feature pages we have reviewed.</p>
          <p className="mt-4 text-sm text-[oklch(0.39_0.045_135)]"><strong>Author:</strong> Best of Pigeon Forge Editorial Team · <strong>Reviewed by:</strong> Alex Woods</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/activities" className="rounded-2xl bg-[oklch(0.43_0.13_154)] px-6 py-3 font-black text-white">Choose an activity guide</Link>
            <Link href="/compare/pigeon-forge-vs-gatlinburg" className="rounded-2xl border border-[oklch(0.55_0.11_154)] bg-white px-6 py-3 font-black">Compare the two towns</Link>
          </div>
        </div>
      </section>


      <section id="start-here" className="mx-auto max-w-6xl px-4 py-14 md:px-6" aria-labelledby="start-here-heading">
        <p className="font-black text-[oklch(0.52_0.12_74)]">Start here</p>
        <h2 id="start-here-heading" className="mt-2 text-3xl font-black">Pick your trip guide</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HUBS.map((hub) => (
            <div key={hub.href} className="flex flex-col rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-5 shadow-sm">
              <Link href={hub.href} className="text-lg font-black leading-tight hover:underline">{hub.name}</Link>
              <p className="mt-2 text-sm leading-6 text-[oklch(0.45_0.04_125)]">{hub.blurb}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {hubSpokes(hub).slice(0, 3).map((s) => (
                  <li key={s.path}><Link href={s.path} className="font-semibold text-[oklch(0.36_0.12_155)] hover:underline">{s.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <p className="font-black text-[oklch(0.52_0.12_74)]">Start with one decision</p>
        <h2 className="mt-2 text-3xl font-black">Four practical planning paths</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {paths.map((path) => (
            <Link key={path.href} href={path.href} className="rounded-3xl border border-[oklch(0.86_0.045_84)] bg-white p-6 shadow-sm hover:border-[oklch(0.55_0.12_155)]">
              <h3 className="text-xl font-black">{path.label}</h3>
              <p className="mt-2 leading-7 text-[oklch(0.45_0.04_125)]">{path.detail}</p>
              <span className="mt-4 inline-block font-black text-[oklch(0.36_0.12_155)]">Open guide →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[oklch(0.84_0.045_84)] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-2xl font-black">How we choose what to show</h2>
            <p className="mt-3 leading-7 text-gray-700">We favor guides that answer a specific visitor decision, state their limits, and rely on official tourism, city, National Park Service, or attraction-operator sources. Draft pages stay out of these guides until they are reviewed.</p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Verification and disclosure</h2>
            <p className="mt-3 leading-7 text-gray-700"><strong>Last verified:</strong> July 26, 2026. A checked date records a source review, not a guarantee that live conditions are unchanged. Confirm hours, prices, closures, and restrictions with the operator.</p>
            <p className="mt-3 text-sm text-gray-700">Read our <Link className="font-bold underline" href="/editorial-standards">editorial standards</Link>, <Link className="font-bold underline" href="/commercial-disclosure">commercial disclosure</Link>, and <Link className="font-bold underline" href="/corrections-policy">corrections policy</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
