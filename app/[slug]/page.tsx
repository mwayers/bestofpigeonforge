import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import curationPagesData from '@/data/curation-pages.json';
import personaPagesData from '@/data/persona-pages.json';
import costPagesData from '@/data/cost-pages.json';
import distancePagesData from '@/data/distance-pages.json';
import holidayPagesData from '@/data/holiday-pages.json';
import tipsPagesData from '@/data/tips-pages.json';
import reviewPagesData from '@/data/review-pages.json';
import glossaryPagesData from '@/data/glossary-pages.json';
import eventPagesData from '@/data/event-pages.json';
import { buildMetadata, faqSchema, breadcrumbSchema, speakableSchema, articleSchema } from '@/lib/seo';

type FAQ = { question: string; answer: string };
type BodySection = { heading: string; content: string };
type GenericPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  pageType?: string;
  intro: string;
  bodySections?: BodySection[];
  faqs?: FAQ[];
  relatedSlugs?: string[];
  rankedList?: { name: string; description?: string; bestFor?: string; priceRange?: string; highlights?: string[] }[];
  criteria?: string[];
  topPicks?: { name: string; description?: string; why?: string; bestFor?: string }[];
  practicalTips?: string[];
  whatToAvoid?: string[];
  pricingTiers?: { label?: string; price?: string; description?: string }[];
  moneySavingTips?: string[];
  driveStats?: Record<string, string>;
  routeOptions?: { name?: string; description?: string; time?: string }[];
  recommendedStops?: any[];
  eventHighlights?: string[];
  specialActivities?: string[];
  diningOptions?: string[];
  steps?: string[];
  proTips?: string[];
  commonMistakes?: string[];
  rating?: number;
  pros?: string[];
  cons?: string[];
  bestFor?: string[];
  visitTips?: string[];
  definition?: string;
  history?: string;
  keyFacts?: string[];
  whyItMatters?: string;
  eventDetails?: Record<string, string>;
  highlights?: string[];
  schedule?: string[];
};

const pages = [
  ...(curationPagesData as unknown as GenericPage[]),
  ...(personaPagesData as unknown as GenericPage[]),
  ...(costPagesData as unknown as GenericPage[]),
  ...(distancePagesData as unknown as GenericPage[]),
  ...(holidayPagesData as unknown as GenericPage[]),
  ...(tipsPagesData as unknown as GenericPage[]),
  ...(reviewPagesData as unknown as GenericPage[]),
  ...(glossaryPagesData as unknown as GenericPage[]),
  ...(eventPagesData as unknown as GenericPage[]),
];

function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

function titleCase(value = '') {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function itemText(item: any) {
  if (typeof item === 'string') return item;
  if (!item || typeof item !== 'object') return String(item);
  return [item.location, item.name, item.title, item.why, item.description, item.tip]
    .filter(Boolean)
    .join(' , ');
}

function SectionList({ title, items }: { title: string; items?: any[] }) {
  if (!items?.length) return null;
  return (
    <section className="mb-8 bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
            <span className="text-[#D97706] font-bold">✓</span>
            <span>{itemText(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function KeyValueGrid({ title, values }: { title: string; values?: Record<string, string> }) {
  if (!values || Object.keys(values).length === 0) return null;
  return (
    <section className="mb-8 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(values).map(([key, value]) => (
          <div key={key} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{titleCase(key)}</div>
            <div className="text-sm text-gray-800 font-medium">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cards({ title, items }: { title: string; items?: any[] }) {
  if (!items?.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="font-bold text-gray-900">{item.name || item.label || `Option ${index + 1}`}</h3>
              {item.priceRange && <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-full">{item.priceRange}</span>}
              {item.price && <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-full">{item.price}</span>}
            </div>
            {(item.description || item.why || item.bestFor || item.time) && (
              <p className="text-sm text-gray-600 leading-relaxed">{item.description || item.why || item.bestFor || item.time}</p>
            )}
            {Array.isArray(item.highlights) && item.highlights.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-gray-600">
                {item.highlights.map((highlight: any, i: number) => <li key={i}>• {itemText(highlight)}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getPage(params.slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
  });
}

export default function GenericSlugPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();

  const jsonLd = [
    ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: titleCase(page.pageType || 'guide'), url: `/${page.slug}` },
    ]),
    speakableSchema(`/${page.slug}`),
    articleSchema({
      title: page.title,
      description: page.metaDescription,
      url: `/${page.slug}`,
    }),
  ];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#1B4332]">Home</Link>
          <span className="mx-2">/</span>
          <span>{titleCase(page.pageType || 'Guide')}</span>
        </nav>

        <header className="mb-8">
          {page.pageType && (
            <div className="inline-block bg-[#1B4332]/10 text-[#1B4332] text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {titleCase(page.pageType)} Guide
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{page.h1}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
        </header>

        {page.definition && (
          <section className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Definition</h2>
            <p className="text-gray-700 leading-relaxed">{page.definition}</p>
          </section>
        )}

        {typeof page.rating === 'number' && (
          <section className="mb-8 bg-[#1B4332] text-white rounded-2xl p-6">
            <div className="text-sm text-white/70 mb-1">Our Rating</div>
            <div className="text-3xl font-bold text-amber-300">{page.rating}/5</div>
          </section>
        )}

        <Cards title="Top Picks" items={page.rankedList || page.topPicks} />
        <Cards title="Pricing" items={page.pricingTiers} />
        <Cards title="Route Options" items={page.routeOptions} />
        <KeyValueGrid title="Trip Details" values={page.driveStats || page.eventDetails} />

        {page.bodySections?.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </section>
        ))}

        {page.history && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Background</h2>
            <p className="text-gray-700 leading-relaxed">{page.history}</p>
          </section>
        )}
        {page.whyItMatters && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why It Matters</h2>
            <p className="text-gray-700 leading-relaxed">{page.whyItMatters}</p>
          </section>
        )}

        <SectionList title="Key Facts" items={page.keyFacts} />
        <SectionList title="Pros" items={page.pros} />
        <SectionList title="Cons" items={page.cons} />
        <SectionList title="Best For" items={page.bestFor} />
        <SectionList title="Visit Tips" items={page.visitTips} />
        <SectionList title="Criteria" items={page.criteria} />
        <SectionList title="Practical Tips" items={page.practicalTips} />
        <SectionList title="What to Avoid" items={page.whatToAvoid} />
        <SectionList title="Money-Saving Tips" items={page.moneySavingTips} />
        <SectionList title="Recommended Stops" items={page.recommendedStops} />
        <SectionList title="Event Highlights" items={page.eventHighlights || page.highlights} />
        <SectionList title="Special Activities" items={page.specialActivities} />
        <SectionList title="Dining Options" items={page.diningOptions} />
        <SectionList title="Steps" items={page.steps} />
        <SectionList title="Pro Tips" items={page.proTips} />
        <SectionList title="Common Mistakes" items={page.commonMistakes} />
        <SectionList title="Schedule" items={page.schedule} />

        {page.faqs?.length ? (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {page.faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {page.relatedSlugs?.length ? (
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related Guides</h2>
            <div className="flex flex-wrap gap-2">
              {page.relatedSlugs.map((slug) => (
                <Link key={slug} href={`/${slug}`} className="bg-[#1B4332]/5 hover:bg-[#1B4332]/10 text-[#1B4332] text-sm px-3 py-1.5 rounded-lg transition-colors">
                  {titleCase(slug)}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
