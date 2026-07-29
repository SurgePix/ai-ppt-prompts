import type { Metadata } from 'next';
import {
  buildResourceAlternates,
  buildResourcePath,
  SITE_ORIGIN,
  type ResourcePageDefinition,
} from './resource-pages';

type ResourceMetadataInput<Locale extends string> = {
  page: ResourcePageDefinition<string, Locale>;
  locale: Locale;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

const DEFAULT_OG_IMAGE =
  'https://ui-cos.tate-a-tate.com/surgepix-resources/surgepix-brand/logo%20x%204.png';

export function buildResourceMetadata<Locale extends string>({
  page,
  locale,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
}: ResourceMetadataInput<Locale>): Metadata {
  const canonical = `${SITE_ORIGIN}${buildResourcePath(page, locale)}`;
  const images = [{ url: image, alt: imageAlt ?? title }];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: buildResourceAlternates(page),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'SurgePix',
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@surgepix_AI',
      title,
      description,
      images: [image],
    },
  };
}