import type { Metadata } from 'next';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and correction-reporting status for Best of Pigeon Forge.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <TrustPage eyebrow="Contact" title="Contact Best of Pigeon Forge" intro="Questions, feedback, and correction reports are welcome.">
      <section><h2>Email us</h2><p>Email <a className="font-bold underline" href="mailto:hello@bestofpigeonforge.com">hello@bestofpigeonforge.com</a>. This inbox is monitored for site feedback, factual corrections, and commercial inquiries.</p></section>
      <section><h2>Corrections</h2><p>For a correction report, include the page URL, the statement at issue, and an authoritative source supporting the requested correction. Please do not send sensitive personal information.</p></section>
    </TrustPage>
  );
}
