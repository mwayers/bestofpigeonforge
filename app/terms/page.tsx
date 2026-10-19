import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of Best of Pigeon Forge travel planning information and tools.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <TrustPage eyebrow="Legal" title="Terms of Use" intro="By using this site, you agree to use its content as general planning information and to verify details that matter to your trip. Effective July 26, 2026.">
      <section><h2>Planning information, not a guarantee</h2><p>Content is provided for general informational purposes. Travel conditions, prices, hours, availability, policies, accessibility, and safety requirements can change. Confirm material details with the relevant operator or public authority before making a purchase or travel decision.</p></section>
      <section><h2>No professional advice</h2><p>The site does not provide legal, medical, financial, or safety advice. You remain responsible for evaluating your group&apos;s needs, risks, and suitability for any activity.</p></section>
      <section><h2>Third-party services</h2><p>The site may link to third-party websites and services. We do not control their content, availability, transactions, or policies. Your dealings with a third party are governed by that party&apos;s terms.</p></section>
      <section><h2>Commercial links</h2><p>Some links or placements may have a commercial purpose. Read our <Link className="font-bold underline" href="/commercial-disclosure">commercial and ownership disclosure</Link> for the current policy and relationship information.</p></section>
      <section><h2>Acceptable use</h2><p>Do not misuse the site, interfere with its operation, attempt unauthorized access, or reproduce substantial portions of its original content in a way that violates applicable law.</p></section>
      <section><h2>Changes</h2><p>These terms may be revised as the site changes. The effective date above identifies this version.</p></section>
    </TrustPage>
  );
}
