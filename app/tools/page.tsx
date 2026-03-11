import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pigeon Forge Trip Planning Tools',
  description: 'Free tools to help you plan your Pigeon Forge vacation — budget calculator, attraction finder, weather guide, and packing lists.',
};

const tools = [
  {
    title: 'Rainy Day Backup Plan',
    description: 'Generate an instant indoor itinerary if your outdoor plans get rained out.',
    emoji: '🌧️',
    href: '/activities/things-to-do-pigeon-forge-rainy-day',
    cta: 'See Indoor Options',
  },
  {
    title: 'Budget Trip Planner',
    description: 'Find the best free and cheap activities to stretch your vacation dollars.',
    emoji: '💰',
    href: '/activities/pigeon-forge-on-a-budget',
    cta: 'See Budget Options',
  },
  {
    title: 'Toddler-Friendly Finder',
    description: 'Quick list of all attractions safe and fun for children under 5.',
    emoji: '👶',
    href: '/activities/things-to-do-pigeon-forge-with-toddlers',
    cta: 'Find Toddler Fun',
  },
  {
    title: 'Winter Activity Guide',
    description: 'Everything still open and amazing in the off-season.',
    emoji: '❄️',
    href: '/activities/things-to-do-pigeon-forge-winter',
    cta: 'Plan Winter Trip',
  },
  {
    title: '3-Day Family Itinerary',
    description: 'Our most popular pre-built trip plan for families with kids.',
    emoji: '📋',
    href: '/itineraries/3-day-pigeon-forge-family',
    cta: 'Get the Itinerary',
  },
  {
    title: 'PF vs Gatlinburg Guide',
    description: "Not sure which city to base yourself in? Here's the honest breakdown.",
    emoji: '⚖️',
    href: '/compare/pigeon-forge-vs-gatlinburg',
    cta: 'See Comparison',
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Trip Planning Tools</h1>
      <p className="text-gray-600 mb-8">Quick guides and resources to help you plan the perfect Pigeon Forge trip.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div key={tool.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">{tool.emoji}</div>
            <h2 className="font-bold text-gray-900 mb-1">{tool.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            <Link
              href={tool.href}
              className="inline-block text-sm font-medium text-[#1B4332] border border-[#1B4332] px-3 py-1.5 rounded-lg hover:bg-[#1B4332] hover:text-white transition-colors"
            >
              {tool.cta} →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-[#1B4332] text-white rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">❄️</div>
        <h2 className="text-xl font-bold mb-2">Already in Pigeon Forge?</h2>
        <p className="text-white/80 text-sm mb-4">Don&apos;t miss the #1 unique experience — indoor snow year-round at Pigeon Forge Snow.</p>
        <a
          href="https://pigeonforgesnow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#D97706] hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          Book Pigeon Forge Snow →
        </a>
      </div>
    </div>
  );
}
