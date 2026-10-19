import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Corrections Policy',
  description: 'How to report an error and how Best of Pigeon Forge reviews and corrects published information.',
  alternates: { canonical: '/corrections-policy' },
};

export default function CorrectionsPolicyPage() {
  return (
    <TrustPage eyebrow="Accountability" title="Corrections Policy" intro="We want readers to be able to flag inaccurate, outdated, unclear, or insufficiently disclosed information.">
      <section><h2>How to report an issue</h2><p>Email <a className="font-bold underline" href="mailto:hello@bestofpigeonforge.com">hello@bestofpigeonforge.com</a> or use the instructions on our <Link className="font-bold underline" href="/contact">contact page</Link>. Include the page URL, the statement at issue, why it may be wrong, and a primary source when available. Do not send sensitive personal information.</p></section>
      <section><h2>How we review reports</h2><p>We compare the report with relevant sources and consider whether the information was accurate as of its stated verification date. A report does not guarantee a change, but material factual issues should be investigated and addressed.</p></section>
      <section><h2>What happens after review</h2><p>Minor spelling or formatting fixes may be made without a notice. When a material factual statement or recommendation changes because the earlier version was wrong or misleading, the page should be corrected and an explanatory correction note should be added when practical. If a claim cannot be verified, it may be qualified or removed while review continues.</p></section>
    </TrustPage>
  );
}
