import type { Metadata } from 'next';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and correction-reporting status for Best of Pigeon Forge.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <TrustPage eyebrow="Contact" title="Contact Best of Pigeon Forge" intro="A public direct contact method has not yet been configured for this site.">
      <section><h2>Current contact status</h2><p>We will publish a safe, monitored contact method here after it has been configured. We are not listing a placeholder email address, phone number, mailing address, or contact form that cannot be reliably monitored.</p></section>
      <section><h2>Corrections</h2><p>The same direct contact method will accept correction reports once it is available. A useful report should include the page URL, the statement at issue, and an authoritative source supporting the requested correction. Please do not send sensitive personal information.</p></section>
    </TrustPage>
  );
}
