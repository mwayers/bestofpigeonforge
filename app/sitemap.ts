import type { MetadataRoute } from 'next';
import activityPagesData from '@/data/activity-pages.json';
import itineraryPagesData from '@/data/itinerary-pages.json';
import comparisonPagesData from '@/data/comparison-pages.json';
import curationPagesData from '@/data/curation-pages.json';
import personaPagesData from '@/data/persona-pages.json';
import costPagesData from '@/data/cost-pages.json';
import distancePagesData from '@/data/distance-pages.json';
import holidayPagesData from '@/data/holiday-pages.json';
import tipsPagesData from '@/data/tips-pages.json';
import reviewPagesData from '@/data/review-pages.json';
import glossaryPagesData from '@/data/glossary-pages.json';
import eventPagesData from '@/data/event-pages.json';
import type { ActivityListPage, ItineraryPage, ComparisonPage } from '@/lib/types';

const BASE = 'https://www.bestofpigeonforge.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const activityPages = activityPagesData as ActivityListPage[];
  const itineraryPages = itineraryPagesData as ItineraryPage[];
  const comparisonPages = comparisonPagesData as ComparisonPage[];
  const genericPages = [
    ...(curationPagesData as { slug: string }[]),
    ...(personaPagesData as { slug: string }[]),
    ...(costPagesData as { slug: string }[]),
    ...(distancePagesData as { slug: string }[]),
    ...(holidayPagesData as { slug: string }[]),
    ...(tipsPagesData as { slug: string }[]),
    ...(reviewPagesData as { slug: string }[]),
    ...(glossaryPagesData as { slug: string }[]),
    ...(eventPagesData as { slug: string }[]),
  ];

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/activities`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/itineraries`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/compare`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const activityRoutes = activityPages.map((page) => ({
    url: `${BASE}/activities/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const itineraryRoutes = itineraryPages.map((page) => ({
    url: `${BASE}/itineraries/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisonRoutes = comparisonPages.map((page) => ({
    url: `${BASE}/compare/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const genericRoutes = genericPages.map((page) => ({
    url: `${BASE}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...activityRoutes, ...itineraryRoutes, ...comparisonRoutes, ...genericRoutes];
}
