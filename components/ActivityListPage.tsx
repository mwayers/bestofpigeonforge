import Link from 'next/link';
import type { ActivityListPage as ActivityListPageType, Attraction, BodySection } from '@/lib/types';
import FAQAccordion from './FAQAccordion';
import Breadcrumb from './Breadcrumb';
import RainyDayPlannerCTA from './RainyDayPlannerCTA';
import { isEditoriallyApproved } from '@/lib/editorialApprovals';

interface Props {
  page: ActivityListPageType;
  attractions: Attraction[];
  hasPFS: boolean;
  pfsAttraction?: Attraction;
}

const alwaysAllowed = new Set(['/activities', '/tools/rainy-day-indoor-planner']);
const linkIsReleased = (route: string) => alwaysAllowed.has(route) || isEditoriallyApproved(route);

export default function ActivityListPage({ page }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Activities', href: '/activities' }, { label: page.title }]} />
      <header className="mb-8">
        <div className="inline-block bg-[#1B4332]/10 text-[#1B4332] text-xs font-semibold px-3 py-1 rounded-full mb-3">{page.audience}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{page.h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{page.intro}</p>
      </header>

      {JSON.stringify(page).includes('Pigeon Forge Snow') && <aside className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><strong>Connected ownership disclosure:</strong> Pigeon Forge Snow is under common ownership with this site. Its inclusion is based on the same official-source criteria and limitations shown for every option, not on legacy ratings, prices or promotional placement.</aside>}

      {page.methodology && <section className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-5"><h2 className="font-bold text-gray-900">How this utility works</h2><p className="mt-2 text-sm leading-6 text-gray-700">{page.methodology}</p></section>}

      {!!page.options?.length && <section className="mb-10" aria-labelledby="options-heading">
        <h2 id="options-heading" className="text-2xl font-bold mb-4">Source-backed option matrix</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200"><table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-50"><tr>{['Option', 'Type and location', 'Verified evidence', 'Restrictions or checks', 'Use when', 'Choose something else if'].map(h => <th key={h} className="text-left p-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">{page.options.map(option => <tr key={option.id} className="align-top">
            <td className="p-3 font-semibold">{option.name}{option.connectedOwnership && <p className="mt-2 rounded bg-amber-50 p-2 text-xs font-normal text-amber-900"><strong>Connected ownership disclosure:</strong> Pigeon Forge Snow is under common ownership with this site. It is evaluated using the same published source criteria as every option.</p>}</td>
            <td className="p-3">{option.type}<br/><span className="text-gray-500">{option.location}</span></td><td className="p-3">{option.evidence}</td><td className="p-3">{option.restrictions}</td><td className="p-3">{option.bestUse}</td><td className="p-3">{option.limitation}</td>
          </tr>)}</tbody>
        </table></div>
      </section>}

      {!!page.ageBands?.length && <section className="mb-10"><h2 className="text-2xl font-bold mb-4">Age-band scorecard</h2><div className="grid gap-4 md:grid-cols-2">{page.ageBands.map(band => <div key={band} className="rounded-xl border p-4"><h3 className="font-bold">Ages {band}</h3><ul className="mt-2 space-y-2 text-sm">{page.options?.map(o => <li key={o.id}><strong>{o.name}:</strong> {o.ageBandFit?.[band] ?? 'No source-backed band-specific fit assigned.'} <span className="text-gray-600">Limit: {o.limitation}</span></li>)}</ul></div>)}</div></section>}

      {!!page.plans?.length && <section className="mb-10"><h2 className="text-2xl font-bold mb-4">Practical plans with fallbacks</h2><div className="grid gap-4 md:grid-cols-3">{page.plans.map(plan => <article key={plan.title} className="rounded-xl border p-5"><p className="text-xs font-semibold text-[#1B4332]">{plan.duration}</p><h3 className="font-bold mt-1">{plan.title}</h3><ol className="list-decimal pl-5 mt-3 space-y-2 text-sm">{plan.steps.map(step => <li key={step}>{step}</li>)}</ol><p className="mt-4 bg-gray-50 p-3 text-sm"><strong>Fallback:</strong> {plan.fallback}</p></article>)}</div></section>}

      {!!page.decisionTree?.length && <section className="mb-10 rounded-2xl border p-6"><h2 className="text-xl font-bold">Fallback decision tree</h2><ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-700">{page.decisionTree.map(step => <li key={step}>{step}</li>)}</ol></section>}

      {page.bodySections && <section className="mb-10 space-y-8">{page.bodySections.map((section: BodySection) => <div key={section.heading}><h2 className="text-xl font-bold mb-3">{section.heading}</h2><p className="text-gray-700 leading-relaxed">{section.content}</p></div>)}</section>}
      {page.slug.includes('rainy-day') && <RainyDayPlannerCTA />}
      {!!page.proTips.length && <section className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6"><h2 className="text-xl font-bold mb-4">Checks before departure</h2><ol className="list-decimal pl-5 space-y-2 text-sm">{page.proTips.map(t => <li key={t}>{t}</li>)}</ol></section>}
      {!!page.faqs.length && <section className="mb-10"><h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2><FAQAccordion faqs={page.faqs} /></section>}
      {page.verifiedDate && page.sources && <section className="mb-10 rounded-2xl border bg-gray-50 p-6"><h2 className="text-xl font-bold">Official sources</h2><p className="text-sm text-gray-600 my-3">Last verified: <time dateTime={page.verifiedDate}>{page.verifiedDate}</time>. Verify volatile rules and operating status directly before departure.</p><ul className="space-y-2">{page.sources.map(s => <li key={s.url}><a className="underline text-[#1B4332]" href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul></section>}
      {!!page.contextualLinks?.filter(l => linkIsReleased(l.route)).length && <nav className="border-t pt-8" aria-label="Approved related guides"><h2 className="font-bold mb-3">Approved next steps</h2><div className="flex flex-wrap gap-2">{page.contextualLinks.filter(l => linkIsReleased(l.route)).map(l => <Link key={l.route} href={l.route} className="rounded-lg bg-[#1B4332]/5 px-3 py-2 text-sm text-[#1B4332]">{l.label}</Link>)}</div></nav>}
    </div>
  );
}
