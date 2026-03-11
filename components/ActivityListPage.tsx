import Link from 'next/link';
import type { ActivityListPage as ActivityListPageType, Attraction } from '@/lib/types';
import ActivityCard from './ActivityCard';
import FeaturedCTA from './FeaturedCTA';
import FAQAccordion from './FAQAccordion';
import Breadcrumb from './Breadcrumb';

interface ActivityListPageProps {
  page: ActivityListPageType;
  attractions: Attraction[];
  hasPFS: boolean;
  pfsAttraction?: Attraction;
}

export default function ActivityListPage({ page, attractions, hasPFS, pfsAttraction }: ActivityListPageProps) {
  const nonPFSAttractions = attractions.filter((a) => !a.isFeaturedPFS);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Activities', href: '/activities' },
        { label: page.title },
      ]} />

      <header className="mb-8">
        <div className="inline-block bg-[#1B4332]/10 text-[#1B4332] text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {page.audience}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{page.h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
      </header>

      {/* Featured CTA for Pigeon Forge Snow */}
      {hasPFS && pfsAttraction && (
        <FeaturedCTA attraction={pfsAttraction} />
      )}

      {/* Activity Grid */}
      <section className="mb-10" aria-labelledby="top-picks-heading">
        <h2 id="top-picks-heading" className="text-xl font-bold text-gray-900 mb-4">
          {hasPFS ? 'More Top Picks' : 'Top Picks'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonPFSAttractions.map((attraction) => (
            <ActivityCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </section>

      {/* Pro Tips */}
      {page.proTips.length > 0 && (
        <section className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6" aria-labelledby="pro-tips-heading">
          <h2 id="pro-tips-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span aria-hidden="true">💡</span> Pro Tips
          </h2>
          <ol className="space-y-2">
            {page.proTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#D97706] font-bold flex-shrink-0">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Nearby Food */}
      {page.nearbyFood.length > 0 && (
        <section className="mb-10" aria-labelledby="nearby-food-heading">
          <h2 id="nearby-food-heading" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span aria-hidden="true">🍽️</span> Where to Eat Nearby
          </h2>
          <div className="flex flex-wrap gap-2">
            {page.nearbyFood.map((restaurant, i) => (
              <span key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700">
                {restaurant}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="mb-10" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>
      )}

      {/* Related Pages */}
      {page.relatedSlugs.length > 0 && (
        <section className="border-t border-gray-200 pt-8" aria-labelledby="related-guides-heading">
          <h2 id="related-guides-heading" className="text-lg font-bold text-gray-900 mb-3">Related Guides</h2>
          <div className="flex flex-wrap gap-2">
            {page.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/activities/${slug}`}
                className="bg-[#1B4332]/5 hover:bg-[#1B4332]/10 text-[#1B4332] text-sm px-3 py-1.5 rounded-lg transition-colors"
              >
                {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
