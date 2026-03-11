import Link from 'next/link';
import type { Metadata } from 'next';
import itineraryPagesData from '@/data/itinerary-pages.json';
import type { ItineraryPage } from '@/lib/types';

const itineraryPages = itineraryPagesData as ItineraryPage[];

export const metadata: Metadata = {
  title: 'Pigeon Forge Itineraries — Day-by-Day Trip Plans',
  description: 'Curated Pigeon Forge itineraries for families, couples, and first-timers. 2-day, 3-day, weekend, and week-long trip plans with budgets.',
};

const seasonEmoji: Record<string, string> = {
  any: '📅',
  winter: '❄️',
  summer: '☀️',
  fall: '🍂',
  spring: '🌸',
};

export default function ItinerariesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pigeon Forge Itineraries</h1>
      <p className="text-gray-600 mb-8">Day-by-day trip plans with budgets for every type of traveler.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itineraryPages.map((itin) => (
          <Link
            key={itin.slug}
            href={`/itineraries/${itin.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B4332] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] font-semibold px-2 py-0.5 rounded-full">
                {itin.duration}
              </span>
              <span className="text-xs text-gray-500">
                {seasonEmoji[itin.season]} {itin.season === 'any' ? 'Any Season' : itin.season.charAt(0).toUpperCase() + itin.season.slice(1)}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#1B4332] transition-colors">{itin.title}</h2>
            <p className="text-xs text-gray-500 mb-2">{itin.audience}</p>
            <div className="text-xs font-medium text-[#D97706]">
              💰 ${itin.budgetEstimate.low}–${itin.budgetEstimate.high}/person
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
