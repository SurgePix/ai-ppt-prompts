import type { MetadataRoute } from 'next';
import { buildResourceSitemapEntries } from '@/features/resources/lib/resource-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildResourceSitemapEntries().map(entry => ({
    url: entry.url,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined,
  }));
}