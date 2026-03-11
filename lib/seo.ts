import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestofpigeonforge.com';

export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle || title,
      description,
      url,
      siteName: 'Best of Pigeon Forge',
      images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Best of Pigeon Forge' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle || title,
      description,
      images: ['/og-default.jpg'],
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function touristAttractionSchema(name: string, description: string, address: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pigeon Forge',
      addressRegion: 'TN',
      addressCountry: 'US',
    },
    url,
  };
}

export const BASE = BASE_URL;
