import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import itineraryPagesData from '@/data/itinerary-pages.json';
import attractionsData from '@/data/attractions.json';
import type { ItineraryPage, Attraction } from '@/lib/types';
import ItineraryPageComponent from '@/components/ItineraryPage';
import { buildMetadata, faqSchema, breadcrumbSchema, speakableSchema, articleSchema } from '@/lib/seo';

const itineraryPages = itineraryPagesData as ItineraryPage[];
const attractions = attractionsData as Attraction[];

export async function generateStaticParams() {
  return itineraryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = itineraryPages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/itineraries/${page.slug}`,
  });
}

export default function ItinerarySlugPage({ params }: { params: { slug: string } }) {
  const page = itineraryPages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const attractionsMap = Object.fromEntries(attractions.map((a) => [a.id, a]));

  const jsonLd = [
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Itineraries', url: '/itineraries' },
      { name: page.title, url: `/itineraries/${page.slug}` },
    ]),
    speakableSchema(`/itineraries/${page.slug}`),
    articleSchema({
      title: page.title,
      description: page.metaDescription,
      url: `/itineraries/${page.slug}`,
    }),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ItineraryPageComponent page={page} attractionsMap={attractionsMap} />
    </>
  );
}
