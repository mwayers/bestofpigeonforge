import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '@/components/TrustPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn what Best of Pigeon Forge is, how the independent planning guide works, and the limits of its travel information.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <TrustPage eyebrow="About this guide" title="About Best of Pigeon Forge" intro="Best of Pigeon Forge is an independent planning guide designed to help visitors compare options and prepare for a trip to Pigeon Forge and the surrounding Smoky Mountains area.">
      <section><h2>What independent means here</h2><p>The site is not an official publication of the City of Pigeon Forge, a tourism authority, the national park, or any attraction. Independence does not mean the site is free of commercial interests. Our <Link className="font-bold underline" href="/commercial-disclosure">commercial and ownership disclosure</Link> explains those interests.</p></section>
      <section><h2>What we publish</h2><p>We publish planning guides, comparisons, itineraries, and tools. They are starting points, not guarantees. Hours, prices, policies, road conditions, accessibility details, and availability can change, so visitors should confirm time-sensitive information with the relevant official source before acting.</p></section>
      <section><h2>How to evaluate our work</h2><p>Our <Link className="font-bold underline" href="/editorial-standards">editorial standards</Link> describe our sourcing and review process. Our <Link className="font-bold underline" href="/corrections-policy">corrections policy</Link> explains how we handle errors.</p></section>
    </TrustPage>
  );
}
