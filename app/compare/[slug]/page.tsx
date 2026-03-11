import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import comparisonPagesData from '@/data/comparison-pages.json';
import type { ComparisonPage } from '@/lib/types';
import ComparisonPageComponent from '@/components/ComparisonPage';
import { buildMetadata, faqSchema, breadcrumbSchema } from '@/lib/seo';

const comparisonPages = comparisonPagesData as ComparisonPage[];

export async function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = comparisonPages.find((p) => p.slug === params.slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${page.slug}`,
  });
}

export default function CompareSlugPage({ params }: { params: { slug: string } }) {
  const page = comparisonPages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const jsonLd = [
    faqSchema(page.faqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare' },
      { name: page.title, url: `/compare/${page.slug}` },
    ]),
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
      <ComparisonPageComponent page={page} />
    </>
  );
}
