import Link from 'next/link';
import type { ComparisonPage as ComparisonPageType } from '@/lib/types';
import FAQAccordion from './FAQAccordion';
import Breadcrumb from './Breadcrumb';

interface ComparisonPageProps {
  page: ComparisonPageType;
}

export default function ComparisonPage({ page }: ComparisonPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: page.title },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{page.h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
      </header>

      {/* Side-by-side pros/cons */}
      <section className="mb-10" aria-labelledby="comparison-heading">
        <h2 id="comparison-heading" className="text-xl font-bold text-gray-900 mb-4">Head-to-Head Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject A */}
          <div className="border border-[#1B4332]/30 rounded-2xl overflow-hidden">
            <div className="bg-[#1B4332] text-white px-5 py-3">
              <h3 className="font-bold text-lg">{page.subjectA.name}</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Pros</h4>
                <ul className="space-y-1.5">
                  {page.subjectA.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">&#10003;</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-600 mb-2">Cons</h4>
                <ul className="space-y-1.5">
                  {page.subjectA.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true">&#10007;</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1B4332]/5 rounded-xl p-3">
                <h4 className="text-xs font-bold text-[#1B4332] mb-1">Best For</h4>
                <p className="text-xs text-gray-600">{page.subjectA.bestFor}</p>
              </div>
            </div>
          </div>

          {/* Subject B */}
          <div className="border border-[#D97706]/30 rounded-2xl overflow-hidden">
            <div className="bg-[#D97706] text-white px-5 py-3">
              <h3 className="font-bold text-lg">{page.subjectB.name}</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">Pros</h4>
                <ul className="space-y-1.5">
                  {page.subjectB.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">&#10003;</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-600 mb-2">Cons</h4>
                <ul className="space-y-1.5">
                  {page.subjectB.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true">&#10007;</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#D97706]/5 rounded-xl p-3">
                <h4 className="text-xs font-bold text-[#D97706] mb-1">Best For</h4>
                <p className="text-xs text-gray-600">{page.subjectB.bestFor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature table */}
      {page.featureTable.length > 0 && (
        <section className="mb-10" aria-labelledby="feature-table-heading">
          <h2 id="feature-table-heading" className="text-xl font-bold text-gray-900 mb-4">Feature Breakdown</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 w-1/3">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1B4332] w-1/3">{page.subjectA.name}</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#D97706] w-1/3">{page.subjectB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {page.featureTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-3 font-medium text-gray-700">{row.feature}</td>
                    <td className="px-4 py-3 text-gray-600">{row.a}</td>
                    <td className="px-4 py-3 text-gray-600">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Verdict */}
      <section className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6" aria-labelledby="verdict-heading">
        <h2 id="verdict-heading" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span aria-hidden="true">&#9878;</span> Our Verdict
        </h2>
        <p className="text-gray-700 leading-relaxed">{page.verdict}</p>
      </section>

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="mb-10" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <FAQAccordion faqs={page.faqs} />
        </section>
      )}

      {/* Related comparisons */}
      {page.relatedSlugs.length > 0 && (
        <section className="border-t border-gray-200 pt-8" aria-labelledby="related-comparisons-heading">
          <h2 id="related-comparisons-heading" className="text-lg font-bold text-gray-900 mb-3">Related Comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {page.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="bg-[#1B4332]/5 hover:bg-[#1B4332]/10 text-[#1B4332] text-sm px-3 py-1.5 rounded-lg transition-colors"
              >
                {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
