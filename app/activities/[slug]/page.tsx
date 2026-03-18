import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import activityPagesData from '@/data/activity-pages.json';
import attractionsData from '@/data/attractions.json';
import type { ActivityListPage, Attraction } from '@/lib/types';
import ActivityListPageComponent from '@/components/ActivityListPage';
import { buildMetadata, faqSchema, breadcrumbSchema, speakableSchema, articleSchema } from '@/lib/seo';

const activityPages = activityPagesData as ActivityListPage[];
const attractions = attractionsData as Attraction[];

export async function generateStaticParams() {
  return activityPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = activityPages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/activities/${page.slug}`,
  });
}

export default function ActivityPage({ params }: { params: { slug: string } }) {
  const page = activityPages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const attractionsMap = Object.fromEntries(attractions.map((a) => [a.id, a]));
  const pageAttractions = page.attractionIds
    .map((id) => attractionsMap[id])
    .filter(Boolean) as Attraction[];

  const pfsAttraction = pageAttractions.find((a) => a.isFeaturedPFS);
  const hasPFS = !!pfsAttraction;

  const jsonLd = [
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Activities', url: '/activities' },
      { name: page.title, url: `/activities/${page.slug}` },
    ]),
    speakableSchema(`/activities/${page.slug}`),
    articleSchema({
      title: page.title,
      description: page.metaDescription,
      url: `/activities/${page.slug}`,
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
      <ActivityListPageComponent
        page={page}
        attractions={pageAttractions}
        hasPFS={hasPFS}
        pfsAttraction={pfsAttraction}
      />
    </>
  );
}
