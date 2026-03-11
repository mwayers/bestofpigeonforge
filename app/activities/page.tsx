import Link from 'next/link';
import type { Metadata } from 'next';
import activityPagesData from '@/data/activity-pages.json';
import type { ActivityListPage } from '@/lib/types';

const activityPages = activityPagesData as ActivityListPage[];

export const metadata: Metadata = {
  title: 'Things to Do in Pigeon Forge — All Activity Guides',
  description: 'Find the perfect Pigeon Forge activities for your trip. Browse guides for families, toddlers, teens, rainy days, budget trips, and more.',
};

export default function ActivitiesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Things to Do in Pigeon Forge</h1>
      <p className="text-gray-600 mb-8">Curated activity guides for every type of visitor and every type of day.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activityPages.map((page) => (
          <Link
            key={page.slug}
            href={`/activities/${page.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B4332] transition-all group"
          >
            <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] font-semibold px-2 py-0.5 rounded-full mb-2 inline-block">
              {page.audience}
            </span>
            <h2 className="font-bold text-gray-900 text-sm mt-2 mb-1 group-hover:text-[#1B4332] transition-colors leading-snug">
              {page.h1}
            </h2>
            <p className="text-xs text-gray-500 line-clamp-2">{page.intro}</p>
            <div className="mt-3 text-xs text-[#1B4332] font-medium">
              {page.attractionIds.length} attractions →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
