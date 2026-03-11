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
  title: 'Best of Pigeon Forge — Your Complete Travel Guide',
  description: 'Discover the best things to do in Pigeon Forge, TN. Indoor activities, family fun, romantic getaways, and must-see attractions in the Smoky Mountains.',
  openGraph: {
    title: 'Best of Pigeon Forge — Your Complete Travel Guide',
    description: 'Your ultimate guide to Pigeon Forge, TN attractions, itineraries, and travel tips.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
};

const categories = [
  { label: 'Indoor Activities', emoji: '🏛️', href: '/activities/indoor-activities-pigeon-forge' },
  { label: 'With Toddlers', emoji: '👶', href: '/activities/things-to-do-pigeon-forge-with-toddlers' },
  { label: 'With Teens', emoji: '🎮', href: '/activities/things-to-do-pigeon-forge-teens' },
  { label: 'Rainy Day', emoji: '🌧️', href: '/activities/things-to-do-pigeon-forge-rainy-day' },
  { label: 'Free Things', emoji: '🆓', href: '/activities/free-things-to-do-pigeon-forge' },
  { label: 'Romantic', emoji: '💑', href: '/activities/romantic-things-to-do-pigeon-forge' },
  { label: 'Winter', emoji: '❄️', href: '/activities/things-to-do-pigeon-forge-winter' },
  { label: 'Outdoor', emoji: '🏔️', href: '/activities/outdoor-activities-pigeon-forge' },
];

export default function HomePage() {
  const pfs = attractions.find((a) => a.isFeaturedPFS)!;
  const topAttractions = attractions.filter((a) => !a.isFeaturedPFS && a.rating >= 4.5).slice(0, 6);
  const featuredItineraries = itineraryPages.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B4332] via-[#166534] to-[#14532d] text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🏔️ Pigeon Forge & Smoky Mountains Travel Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Your Guide to the<br />
            <span className="text-amber-300">Best of Pigeon Forge</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Curated attractions, family itineraries, and insider tips for the Smoky Mountains&apos; most popular destination.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/activities" className="bg-[#D97706] hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Browse Activities
            </Link>
            <Link href="/itineraries" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-white/20">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Featured: Pigeon Forge Snow */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">⭐ Featured Experience</h2>
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-full">Editor&apos;s Pick</span>
        </div>
        <div className="bg-gradient-to-r from-[#1B4332] to-[#166534] text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-6xl">❄️</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1 bg-[#D97706] text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                Only Indoor Snow in the Smokies
              </div>
              <h3 className="text-2xl font-bold mb-2">{pfs.name}</h3>
              <p className="text-white/80 text-sm mb-4">{pfs.shortDesc}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {pfs.highlights.slice(0, 3).map((h, i) => (
                  <span key={i} className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-lg">❄ {h}</span>
                ))}
              </div>
              <a
                href={pfs.bookingUrl || pfs.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                Book Now — {pfs.priceRange}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Browse by Interest</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1B4332] hover:shadow-sm transition-all text-center group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#1B4332]">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top-Rated Attractions */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Top-Rated Attractions</h2>
            <Link href="/activities/best-attractions-pigeon-forge" className="text-sm text-[#1B4332] font-medium hover:underline">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAttractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex gap-3 items-start hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#1B4332]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                  {attraction.category === 'snow' ? '❄️' :
                   attraction.category === 'theme-park' ? '🎢' :
                   attraction.category === 'water' ? '🌊' :
                   attraction.category === 'food' ? '🍽️' :
                   attraction.category === 'shows' ? '🎭' :
                   attraction.category === 'escape-room' ? '🔐' :
                   attraction.category === 'mini-golf' ? '⛳' :
                   attraction.category === 'coaster' ? '🎠' :
                   attraction.category === 'outdoor' ? '🏔️' : '🏛️'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{attraction.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{attraction.shortDesc}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[#D97706] text-xs">{'★'.repeat(Math.round(attraction.rating))}</span>
                    <span className="text-xs text-gray-400">{attraction.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Itineraries */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Popular Itineraries</h2>
          <Link href="/itineraries" className="text-sm text-[#1B4332] font-medium hover:underline">
            All itineraries →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredItineraries.map((itin) => (
            <Link
              key={itin.slug}
              href={`/itineraries/${itin.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B4332] transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] font-semibold px-2 py-0.5 rounded-full">
                  {itin.duration}
                </span>
                <span className="text-xs text-gray-400">
                  {itin.season === 'any' ? '📅 Year-Round' :
                   itin.season === 'winter' ? '❄️ Winter' :
                   itin.season === 'summer' ? '☀️ Summer' :
                   itin.season === 'spring' ? '🌸 Spring' : '🍂 Fall'}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#1B4332] transition-colors text-sm">{itin.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{itin.audience}</p>
              <div className="mt-3 text-xs font-medium text-[#1B4332]">
                Budget: ${itin.budgetEstimate.low}–${itin.budgetEstimate.high}/person
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Compare section */}
      <section className="bg-[#1B4332]/5 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Compare & Decide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { slug: 'pigeon-forge-vs-gatlinburg', label: 'Pigeon Forge vs Gatlinburg' },
              { slug: 'pigeon-forge-snow-vs-ober-mountain', label: 'PF Snow vs Ober Mountain' },
              { slug: 'dollywood-vs-the-island', label: 'Dollywood vs The Island' },
            ].map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#1B4332] hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#1B4332]"
              >
                ⚖️ {comp.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
