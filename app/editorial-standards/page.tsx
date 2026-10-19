import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Editorial Standards',
  description: 'How Best of Pigeon Forge researches, checks, labels, updates, and corrects travel planning content.',
  alternates: { canonical: '/editorial-standards' },
};

export default function EditorialStandardsPage() {
  return (
    <TrustPage eyebrow="How we work" title="Editorial Standards" intro="Our goal is useful, accurate planning information with clear limits, visible sourcing, and honest treatment of commercial interests.">
      <section><h2>Sources and verification</h2><p>For facts that can change, we prefer primary sources such as official attraction, government, transit, and park websites. Reliable secondary sources may provide context. Material facts should be checked against the cited source, and published guides should show a last verified or checked date when a real review occurred.</p><p>A verification date records when information was checked. It does not promise that the information remains current after that date. Readers should confirm live details such as hours, prices, closures, ticket rules, age or height restrictions, and accessibility arrangements directly with the operator.</p></section>
      <section><h2>Recommendations and comparisons</h2><p>Recommendations should explain the criteria used and include relevant limitations. We do not treat an unsupported rating, popularity claim, or superlative as evidence. Editorial content should not promise an experience or imply first-hand testing unless that testing actually occurred.</p></section>
      <section><h2>Editorial content and advertising</h2><p>Advertising, sponsored placements, affiliate links, and other paid commercial material should be clearly labeled and distinguishable from editorial content. A commercial relationship should not determine an editorial conclusion. Relevant conflicts should be disclosed near the recommendation and on our <Link className="font-bold underline" href="/commercial-disclosure">disclosure page</Link>.</p></section>
      <section><h2>Automation and review</h2><p>Tools, structured data, or automated systems may assist research, organization, and drafting. Automation is not a substitute for source checking and editorial review. We do not knowingly publish fabricated experience, credentials, quotations, or testimonials.</p></section>
      <section><h2>Updates and corrections</h2><p>Pages may be reviewed when sources change, readers flag an issue, or an editorial audit identifies a problem. We explain error reporting and material updates in our <Link className="font-bold underline" href="/corrections-policy">corrections policy</Link>.</p></section>
    </TrustPage>
  );
}
