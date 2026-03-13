import Link from 'next/link';
import type { ItineraryPage as ItineraryPageType, Attraction } from '@/lib/types';
import FAQAccordion from './FAQAccordion';
import Breadcrumb from './Breadcrumb';

const seasonEmoji: Record<string, string> = {
  any: '📅',
  winter: '❄️',
  summer: '☀️',
  fall: '🍂',
  spring: '🌸',
};

const seasonLabel: Record<string, string> = {
  any: 'Year-Round',
  winter: 'Winter',
  summer: 'Summer',
  fall: 'Fall',
  spring: 'Spring',
};

interface TimeSlot {
  activity: string;
  attractionId?: string;
  tip: string;
}

interface ItineraryPageProps {
  page: ItineraryPageType;
  attractionsMap: Record<string, Attraction>;
}

export default function ItineraryPage({ page, attractionsMap }: ItineraryPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Itineraries', href: '/itineraries' },
        { label: page.title },
      ]} />

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1 bg-[#1B4332]/10 text-[#1B4332] text-xs font-semibold px-3 py-1 rounded-full">
            <span aria-hidden="true">{seasonEmoji[page.season]}</span>
            {seasonLabel[page.season] ?? page.season}
          </span>
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
            <span aria-hidden="true">🕐</span> {page.duration}
          </span>
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            <span aria-hidden="true">👥</span> {page.audience}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{page.h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
      </header>

      {/* Budget Estimate */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-center gap-4">
        <span className="text-3xl" aria-hidden="true">💰</span>
        <div>
          <div className="text-sm font-medium text-gray-500">Estimated Budget Per Person</div>
          <div className="text-xl font-bold text-[#1B4332]">
            ${page.budgetEstimate.low} – ${page.budgetEstimate.high}
          </div>
        </div>
      </div>

      {/* Day-by-day itinerary */}
      <section className="mb-10 space-y-6" aria-labelledby="itinerary-heading">
        <h2 id="itinerary-heading" className="sr-only">Day-by-Day Itinerary</h2>
        {page.days.map((day) => {
          const slots: Array<{ label: string; emoji: string; slot: TimeSlot }> = [
            { label: 'Morning', emoji: '🌅', slot: day.morning },
            { label: 'Afternoon', emoji: '☀️', slot: day.afternoon },
            { label: 'Evening', emoji: '🌙', slot: day.evening },
          ];

          return (
            <div key={day.day} className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-[#1B4332] text-white px-5 py-3">
                <h2 className="font-bold text-lg">Day {day.day}: {day.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {slots.map(({ label, emoji, slot }) => {
                  const attraction = slot.attractionId ? attractionsMap[slot.attractionId] : null;
                  return (
                    <div key={label} className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0 pt-0.5">
                          <span aria-hidden="true">{emoji}</span> {label}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm mb-1">
                            {attraction ? (
                              <span className="text-[#1B4332] font-semibold">{attraction.name}</span>
                            ) : (
                              slot.activity
                            )}
                          </div>
                          {attraction && slot.activity !== attraction.name && (
                            <div className="text-xs text-gray-600 mb-1">{slot.activity}</div>
                          )}
                          <div className="text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1 inline-block">
                            <span aria-hidden="true">💡</span> {slot.tip}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Pro Tips */}
      {page.proTips.length > 0 && (
        <section className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6" aria-labelledby="pro-tips-heading">
          <h2 id="pro-tips-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span aria-hidden="true">💡</span> Pro Tips for This Trip
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

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="mb-10" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>
      )}

      {/* Related itineraries */}
      {page.relatedSlugs.length > 0 && (
        <section className="border-t border-gray-200 pt-8" aria-labelledby="related-itineraries-heading">
          <h2 id="related-itineraries-heading" className="text-lg font-bold text-gray-900 mb-3">Related Itineraries</h2>
          <div className="flex flex-wrap gap-2">
            {page.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/itineraries/${slug}`}
                className="bg-[#1B4332]/5 hover:bg-[#1B4332]/10 text-[#1B4332] text-sm px-3 py-1.5 rounded-lg transition-colors"
              >
                {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Activity Guides */}
      {(page as any).relatedActivitySlugs?.length > 0 && (
        <section className="border-t border-gray-200 pt-8 mt-4" aria-labelledby="related-activities-heading">
          <h2 id="related-activities-heading" className="text-lg font-bold text-gray-900 mb-3">Related Activity Guides</h2>
          <div className="flex flex-wrap gap-2">
            {(page as any).relatedActivitySlugs.map((slug: string) => (
              <Link
                key={slug}
                href={`/activities/${slug}`}
                className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-sm px-3 py-1.5 rounded-lg transition-colors"
              >
                {slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
