import type { Attraction } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  'snow': 'Snow',
  'theme-park': 'Theme Park',
  'indoor': 'Indoor',
  'outdoor': 'Outdoor',
  'food': 'Dining',
  'shows': 'Show',
  'mini-golf': 'Mini Golf',
  'coaster': 'Coaster',
  'escape-room': 'Escape Room',
  'water': 'Water Park',
};

const categoryColors: Record<string, string> = {
  'snow': 'bg-blue-100 text-blue-800',
  'theme-park': 'bg-purple-100 text-purple-800',
  'indoor': 'bg-gray-100 text-gray-800',
  'outdoor': 'bg-green-100 text-green-800',
  'food': 'bg-orange-100 text-orange-800',
  'shows': 'bg-pink-100 text-pink-800',
  'mini-golf': 'bg-lime-100 text-lime-800',
  'coaster': 'bg-red-100 text-red-800',
  'escape-room': 'bg-indigo-100 text-indigo-800',
  'water': 'bg-cyan-100 text-cyan-800',
};

const categoryEmoji: Record<string, string> = {
  'snow': '❄️',
  'theme-park': '🎢',
  'water': '🌊',
  'food': '🍽️',
  'shows': '🎭',
  'escape-room': '🔐',
  'mini-golf': '⛳',
  'coaster': '🎠',
  'outdoor': '🏔️',
  'indoor': '🏛️',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-[#D97706]' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

interface ActivityCardProps {
  attraction: Attraction;
}

export default function ActivityCard({ attraction }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-[#1B4332]/10 to-[#1B4332]/20 flex items-center justify-center">
        <span className="text-4xl" role="img" aria-label={attraction.imageAlt}>
          {categoryEmoji[attraction.category] ?? '🏛️'}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{attraction.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${categoryColors[attraction.category] ?? 'bg-gray-100 text-gray-800'}`}>
            {categoryLabels[attraction.category] ?? attraction.category}
          </span>
        </div>

        <StarRating rating={attraction.rating} />

        <div className="flex items-center gap-2 mt-1 mb-3">
          <span className="text-sm font-medium text-[#D97706]">{attraction.priceRange}</span>
          <span className="text-gray-300" aria-hidden="true">·</span>
          <span className="text-xs text-gray-500">{attraction.ageRange}</span>
        </div>

        <ul className="space-y-1 flex-1 mb-3">
          {attraction.highlights.slice(0, 3).map((highlight, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
              <span className="text-[#1B4332] mt-0.5" aria-hidden="true">✓</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <a
          href={attraction.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-center text-sm font-medium text-[#1B4332] border border-[#1B4332] rounded-lg py-1.5 hover:bg-[#1B4332] hover:text-white transition-colors"
          aria-label={`Learn more about ${attraction.name}`}
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}
