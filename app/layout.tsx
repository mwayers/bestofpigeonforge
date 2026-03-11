import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Best of Pigeon Forge — Your Complete Travel Guide',
    template: '%s | Best of Pigeon Forge',
  },
  description: 'Discover the best things to do in Pigeon Forge, TN. Attractions, itineraries, and insider tips for families, couples, and first-time visitors.',
  metadataBase: new URL('https://bestofpigeonforge.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
        <header className="bg-[#1B4332] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight hover:text-amber-300 transition-colors">
              🏔️ Best of Pigeon Forge
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/activities" className="hover:text-amber-300 transition-colors">Activities</Link>
              <Link href="/itineraries" className="hover:text-amber-300 transition-colors">Itineraries</Link>
              <Link href="/compare" className="hover:text-amber-300 transition-colors">Compare</Link>
              <Link href="/tools" className="hover:text-amber-300 transition-colors">Tools</Link>
              <a
                href="https://pigeonforgesnow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D97706] hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold"
              >
                Book PF Snow ❄️
              </a>
            </nav>
            {/* Mobile nav - simplified */}
            <nav className="md:hidden flex items-center gap-3 text-xs">
              <Link href="/activities" className="hover:text-amber-300">Activities</Link>
              <Link href="/itineraries" className="hover:text-amber-300">Trips</Link>
              <Link href="/compare" className="hover:text-amber-300">Compare</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#1B4332] text-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-amber-300 mb-3 text-sm">Activities</h3>
                <ul className="space-y-1 text-sm text-white/70">
                  <li><Link href="/activities/indoor-activities-pigeon-forge" className="hover:text-white transition-colors">Indoor Activities</Link></li>
                  <li><Link href="/activities/things-to-do-pigeon-forge-with-toddlers" className="hover:text-white transition-colors">With Toddlers</Link></li>
                  <li><Link href="/activities/things-to-do-pigeon-forge-rainy-day" className="hover:text-white transition-colors">Rainy Day</Link></li>
                  <li><Link href="/activities/free-things-to-do-pigeon-forge" className="hover:text-white transition-colors">Free Things</Link></li>
                  <li><Link href="/activities/things-to-do-pigeon-forge-winter" className="hover:text-white transition-colors">Winter</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-amber-300 mb-3 text-sm">Itineraries</h3>
                <ul className="space-y-1 text-sm text-white/70">
                  <li><Link href="/itineraries/2-day-pigeon-forge-toddler" className="hover:text-white transition-colors">2-Day with Toddler</Link></li>
                  <li><Link href="/itineraries/3-day-pigeon-forge-family" className="hover:text-white transition-colors">3-Day Family</Link></li>
                  <li><Link href="/itineraries/weekend-pigeon-forge-couple" className="hover:text-white transition-colors">Romantic Weekend</Link></li>
                  <li><Link href="/itineraries/pigeon-forge-winter-getaway" className="hover:text-white transition-colors">Winter Getaway</Link></li>
                  <li><Link href="/itineraries/pigeon-forge-budget-weekend" className="hover:text-white transition-colors">Budget Weekend</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-amber-300 mb-3 text-sm">Compare</h3>
                <ul className="space-y-1 text-sm text-white/70">
                  <li><Link href="/compare/pigeon-forge-vs-gatlinburg" className="hover:text-white transition-colors">PF vs Gatlinburg</Link></li>
                  <li><Link href="/compare/pigeon-forge-snow-vs-ober-mountain" className="hover:text-white transition-colors">PF Snow vs Ober</Link></li>
                  <li><Link href="/compare/dollywood-vs-the-island" className="hover:text-white transition-colors">Dollywood vs The Island</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-amber-300 mb-3 text-sm">Featured</h3>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>
                    <a href="https://pigeonforgesnow.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors font-medium">
                      ❄️ Pigeon Forge Snow
                    </a>
                  </li>
                  <li><Link href="/tools" className="hover:text-white transition-colors">Planning Tools</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4 text-center text-xs text-white/50">
              © {new Date().getFullYear()} Best of Pigeon Forge. Independent travel guide. Not affiliated with any attraction.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
