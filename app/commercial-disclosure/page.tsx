import type { Metadata } from 'next';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'Commercial and Ownership Disclosure',
  description: 'How ownership interests, advertising, sponsorships, and affiliate links are disclosed on Best of Pigeon Forge.',
  alternates: { canonical: '/commercial-disclosure' },
};

export default function CommercialDisclosurePage() {
  return (
    <TrustPage eyebrow="Transparency" title="Commercial and Ownership Disclosure" intro="Best of Pigeon Forge is an independent planning guide, not an official tourism or attraction website. The guide also has commercial interests that readers should understand.">
      <section><h2>Connected ownership interest</h2><p>Best of Pigeon Forge and Pigeon Forge Snow have connected ownership and commercial interests. The site links to and prominently features Pigeon Forge Snow. Readers should treat those mentions as involving a conflict of interest, not as neutral evidence that the attraction is the best choice for every visitor.</p></section>
      <section><h2>Editorial content versus advertising</h2><p>Editorial guides and comparisons should be based on stated criteria and reliable sources. Advertising, sponsored content, paid placements, and other commercial promotions should be clearly labeled and visually distinguishable from editorial content. Payment or an ownership interest should not be presented as independent editorial proof.</p></section>
      <section><h2>Affiliate links</h2><p>The site does not claim a current affiliate relationship unless a specific page or link says so. If affiliate links are introduced, the relevant content should disclose that the site may earn a commission if a reader completes a qualifying transaction, at no added cost to the reader. Affiliate compensation should not change the price shown by the merchant or guarantee a recommendation.</p></section>
      <section><h2>Reader decisions</h2><p>Commercial relationships can create bias. Compare options, review disclosed criteria, and confirm prices, terms, and availability directly with the provider before purchasing.</p></section>
    </TrustPage>
  );
}
