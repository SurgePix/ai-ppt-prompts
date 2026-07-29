import { SITE_ORIGIN } from '@/features/resources/lib/resource-pages';
import { buildPptPromptsPath, type PptPromptPageLocale } from './ppt-prompts-routing';
import type { LocalizedPptPrompt } from './ppt-prompts-types';
import { PPT_PROMPT_FAQ } from './ppt-prompts-faq';

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'SurgePix',
  url: `${SITE_ORIGIN}/`,
  logo: 'https://ui-cos.tate-a-tate.com/surgepix-resources/surgepix-brand/logo%20x%204.png',
  sameAs: [
    'https://surgepix.ai/',
    'https://x.com/surgepix_AI',
    'https://discord.gg/wC5XeHN6fR',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_ORIGIN}/`,
  name: 'SurgePix',
  publisher: { '@id': ORGANIZATION_ID },
};

type BuildPptPromptsJsonLdInput = {
  locale: PptPromptPageLocale;
  title: string;
  description: string;
  prompts: LocalizedPptPrompt[];
};

export function buildPptPromptsJsonLd({
  locale,
  title,
  description,
  prompts,
}: BuildPptPromptsJsonLdInput): Record<string, unknown> {
  const pageUrl = `${SITE_ORIGIN}${buildPptPromptsPath(locale)}`;

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SurgePix', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE_ORIGIN}/resources` },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  };

  const itemList = {
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: prompts.length,
    itemListElement: prompts.slice(0, 100).map((prompt, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prompt.title,
    })),
  };

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    mainEntity: itemList,
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: PPT_PROMPT_FAQ.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, breadcrumb, collectionPage, faqPage],
  };
}
