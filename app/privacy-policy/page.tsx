import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy information for visitors to Best of Pigeon Forge.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <TrustPage eyebrow="Legal" title="Privacy Policy" intro="This policy explains the limited information this website may collect and how visitors can make informed choices. Effective July 26, 2026.">
      <section><h2>Information collected automatically</h2><p>The site uses Google Analytics to collect usage information such as pages viewed, approximate location derived from network information, device and browser details, and referral information. Analytics technologies may use cookies or similar identifiers. We use this information to understand site performance and improve content.</p></section>
      <section><h2>Information you provide</h2><p>The site does not currently provide a public contact form or account system. If a direct contact method is configured later, this policy should be updated to explain what information is collected and how it is handled. Do not send sensitive personal information.</p></section>
      <section><h2>External links</h2><p>Links may lead to attractions, booking services, or other third-party sites. Those services have their own privacy practices, and this policy does not control them.</p></section>
      <section><h2>Your choices</h2><p>You can limit cookies through your browser settings or use available browser privacy controls. Blocking analytics technologies may not prevent the basic site from working.</p></section>
      <section><h2>Policy changes and questions</h2><p>We may update this policy when site practices change. The effective date above identifies this version. See the <Link className="font-bold underline" href="/contact">contact page</Link> for the current availability of a direct contact method.</p></section>
    </TrustPage>
  );
}
