import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/features/resources/lib/resource-pages';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_ORIGIN}/resources/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
