import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: {
    default: 'Best of Pigeon Forge , Your Complete Travel Guide',
    template: '%s | Best of Pigeon Forge',
  },
  description: 'Discover the best things to do in Pigeon Forge, TN. Attractions, itineraries, comparisons, costs, and insider tips for families, couples, and first-time visitors.',
  metadataBase: new URL('https://www.bestofpigeonforge.com'),
};

export const viewport: Viewport = {
  themeColor: '#244f3a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JB96J39NZ5" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JB96J39NZ5');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-[oklch(0.985_0.025_84)] font-sans text-[oklch(0.24_0.075_155)] antialiased">
        <header className="sticky top-0 z-50 border-b border-[oklch(0.82_0.045_84)] bg-[oklch(0.985_0.025_84_/_0.88)] backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
            <Link href="/" className="group flex items-center gap-3 font-black tracking-tight text-[oklch(0.24_0.075_155)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[oklch(0.43_0.13_154)] text-lg text-[oklch(0.98_0.025_84)] shadow-sm transition group-hover:-rotate-6">🏔️</span>
              <span className="leading-none">
                <span className="block text-base md:text-lg">Best of</span>
                <span className="block text-sm text-[oklch(0.48_0.08_150)] md:text-base">Pigeon Forge</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-black text-[oklch(0.35_0.065_150)] md:flex">
              <Link href="/activities" className="hover:text-[oklch(0.58_0.12_74)]">Activities</Link>
              <Link href="/itineraries" className="hover:text-[oklch(0.58_0.12_74)]">Itineraries</Link>
              <Link href="/compare" className="hover:text-[oklch(0.58_0.12_74)]">Compare</Link>
              <Link href="/tools" className="hover:text-[oklch(0.58_0.12_74)]">Tools</Link>
              <a href="https://pigeonforgesnow.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[oklch(0.78_0.16_78)] px-4 py-2 text-xs font-black text-[oklch(0.22_0.08_80)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[oklch(0.84_0.14_82)]">
                Book Snow ❄️
              </a>
            </nav>
            <nav className="flex items-center gap-3 text-xs font-black text-[oklch(0.35_0.065_150)] md:hidden">
              <Link href="/activities">Activities</Link>
              <Link href="/itineraries">Trips</Link>
              <Link href="/compare">Compare</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-[oklch(0.33_0.08_155)] bg-[oklch(0.20_0.075_155)] text-[oklch(0.965_0.025_84)]">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
            <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
              <div>
                <div className="text-3xl font-black tracking-tight">Best of Pigeon Forge</div>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[oklch(0.82_0.03_86)]">Independent trip planning guide for families, couples, groups, rainy days, budgets, and Smoky Mountain first-timers.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <h3 className="mb-3 text-sm font-black text-[oklch(0.82_0.15_82)]">Activities</h3>
                  <ul className="space-y-2 text-sm text-[oklch(0.82_0.03_86)]">
                    <li><Link href="/activities/indoor-activities-pigeon-forge" className="hover:text-white">Indoor Activities</Link></li>
                    <li><Link href="/activities/things-to-do-pigeon-forge-with-kids" className="hover:text-white">With Kids</Link></li>
                    <li><Link href="/activities/things-to-do-pigeon-forge-rainy-day" className="hover:text-white">Rainy Day</Link></li>
                    <li><Link href="/activities/free-things-to-do-pigeon-forge" className="hover:text-white">Free Things</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-black text-[oklch(0.82_0.15_82)]">Itineraries</h3>
                  <ul className="space-y-2 text-sm text-[oklch(0.82_0.03_86)]">
                    <li><Link href="/itineraries/2-day-pigeon-forge-toddler" className="hover:text-white">2-Day Toddler</Link></li>
                    <li><Link href="/itineraries/3-day-pigeon-forge-family" className="hover:text-white">3-Day Family</Link></li>
                    <li><Link href="/itineraries/weekend-pigeon-forge-couple" className="hover:text-white">Couples Weekend</Link></li>
                    <li><Link href="/itineraries/pigeon-forge-budget-weekend" className="hover:text-white">Budget Weekend</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-black text-[oklch(0.82_0.15_82)]">Compare</h3>
                  <ul className="space-y-2 text-sm text-[oklch(0.82_0.03_86)]">
                    <li><Link href="/compare/pigeon-forge-vs-gatlinburg" className="hover:text-white">PF vs Gatlinburg</Link></li>
                    <li><Link href="/compare/pigeon-forge-snow-vs-ober-mountain" className="hover:text-white">Snow vs Ober</Link></li>
                    <li><Link href="/compare/dollywood-vs-the-island" className="hover:text-white">Dollywood vs Island</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-black text-[oklch(0.82_0.15_82)]">Featured</h3>
                  <ul className="space-y-2 text-sm text-[oklch(0.82_0.03_86)]">
                    <li><a href="https://pigeonforgesnow.com" target="_blank" rel="noopener noreferrer" className="font-black text-[oklch(0.84_0.14_82)] hover:text-white">Pigeon Forge Snow</a></li>
                    <li><Link href="/tools" className="hover:text-white">Planning Tools</Link></li>
                    <li><Link href="/best-time-to-visit-pigeon-forge" className="hover:text-white">Best Time to Visit</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-[oklch(0.95_0.02_84_/_0.18)] pt-5 text-xs text-[oklch(0.72_0.03_86)]">
              © {new Date().getFullYear()} Best of Pigeon Forge. Independent travel guide. Not affiliated with any attraction.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
