import Link from 'next/link';
import type { Metadata } from 'next';
import comparisonPagesData from '@/data/comparison-pages.json';
import type { ComparisonPage } from '@/lib/types';

const comparisonPages = comparisonPagesData as ComparisonPage[];

export const metadata: Metadata = {
  title: 'Pigeon Forge Comparisons — Which Should You Choose?',
  description: "Side-by-side comparisons of Pigeon Forge attractions and destinations to help you decide what's right for your trip.",
};

export default function CompareIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Attractions & Destinations</h1>
      <p className="text-gray-600 mb-8">Side-by-side breakdowns to help you choose what&apos;s right for your trip.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisonPages.map((page) => (
          <Link
            key={page.slug}
            href={`/compare/${page.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1B4332] transition-all group"
          >
            <div className="text-2xl mb-2">⚖️</div>
            <h2 className="font-bold text-gray-900 mb-1 group-hover:text-[#1B4332] transition-colors text-sm">{page.title}</h2>
            <p className="text-xs text-gray-500 line-clamp-2">{page.intro}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-medium text-white bg-[#1B4332] px-2 py-0.5 rounded">{page.subjectA.name}</span>
              <span className="text-xs text-gray-400">vs</span>
              <span className="text-xs font-medium text-white bg-[#D97706] px-2 py-0.5 rounded">{page.subjectB.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
