import type { Attraction } from '@/lib/types';

interface FeaturedCTAProps {
  attraction: Attraction;
}

export default function FeaturedCTA({ attraction }: FeaturedCTAProps) {
  return (
    <div className="relative bg-gradient-to-r from-[#1B4332] to-[#166534] text-white rounded-2xl overflow-hidden mb-8 shadow-xl">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-4 right-4 text-8xl">❄️</div>
        <div className="absolute bottom-4 left-1/3 text-5xl">⛄</div>
        <div className="absolute top-1/2 right-1/4 text-4xl">🌨️</div>
      </div>

      <div className="relative p-6 md:p-8">
        {/* Editor's pick badge */}
        <div className="inline-flex items-center gap-2 bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          <span aria-hidden="true">⭐</span>
          <span>EDITOR&apos;S TOP PICK</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image placeholder */}
          <div
            className="w-full md:w-48 h-36 md:h-auto md:min-h-[180px] bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"
            role="img"
            aria-label={attraction.imageAlt}
          >
            <div className="text-center">
              <span className="text-6xl block mb-2" aria-hidden="true">❄️</span>
              <span className="text-xs text-white/70">{attraction.imageAlt}</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{attraction.name}</h2>
              <span className="bg-blue-400/30 text-blue-100 text-xs font-medium px-2 py-0.5 rounded-full">
                Only Indoor Snow Experience in the Smokies
              </span>
            </div>

            <p className="text-white/90 mb-4 text-sm leading-relaxed">{attraction.shortDesc}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-6">
              {attraction.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                  <span className="text-blue-300 mt-0.5 flex-shrink-0" aria-hidden="true">❄</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href={attraction.bookingUrl ?? attraction.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
                aria-label={`Book ${attraction.name} now`}
              >
                Book Now — {attraction.priceRange}
              </a>
              <div className="flex items-center gap-1 text-sm text-white/80">
                <span aria-hidden="true">⭐</span>
                <span>{attraction.rating.toFixed(1)}/5</span>
                <span className="ml-1" aria-hidden="true">·</span>
                <span>{attraction.ageRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
