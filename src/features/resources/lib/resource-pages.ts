export const SITE_ORIGIN = 'https://surgepix.ai';
export const RESOURCE_BASE_PATH = '';

export type ResourceLocaleConfig<Locale extends string = string> = {
  locale: Locale;
  label: string;
  hasOwnUrl: boolean;
  bcp47Prefixes: readonly string[];
};

export type ResourcePageDefinition<Slug extends string = string, Locale extends string = string> = {
  slug: Slug;
  defaultLocale: Locale;
  locales: readonly ResourceLocaleConfig<Locale>[];
  sitemap?: {
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    lastModified?: string;
  };
};

export const awesomePptPromptsResource = {
  slug: 'awesome-ppt-prompts',
  defaultLocale: 'en',
  locales: [
    { locale: 'en', label: 'English', hasOwnUrl: false, bcp47Prefixes: ['en'] },
    { locale: 'zh', label: '中文', hasOwnUrl: true, bcp47Prefixes: ['zh'] },
    { locale: 'zh-Hant', label: '繁體中文', hasOwnUrl: true, bcp47Prefixes: ['zh-Hant', 'zh-HK', 'zh-TW', 'zh-MO'] },
    { locale: 'ja', label: '日本語', hasOwnUrl: true, bcp47Prefixes: ['ja'] },
    { locale: 'ko', label: '한국어', hasOwnUrl: true, bcp47Prefixes: ['ko'] },
    { locale: 'th', label: 'ไทย', hasOwnUrl: true, bcp47Prefixes: ['th'] },
    { locale: 'id', label: 'Bahasa Indonesia', hasOwnUrl: true, bcp47Prefixes: ['id'] },
    { locale: 'vi', label: 'Tieng Viet', hasOwnUrl: true, bcp47Prefixes: ['vi'] },
    { locale: 'de', label: 'Deutsch', hasOwnUrl: true, bcp47Prefixes: ['de'] },
    { locale: 'fr', label: 'Français', hasOwnUrl: true, bcp47Prefixes: ['fr'] },
    { locale: 'es', label: 'Español', hasOwnUrl: true, bcp47Prefixes: ['es'] },
    { locale: 'tr', label: 'Türkçe', hasOwnUrl: true, bcp47Prefixes: ['tr'] },
    { locale: 'pl', label: 'Polski', hasOwnUrl: true, bcp47Prefixes: ['pl'] },
  ],
  sitemap: {
    changeFrequency: 'weekly',
    priority: 0.9,
    lastModified: '2026-07-28',
  },
} as const satisfies ResourcePageDefinition<'awesome-ppt-prompts', 'en' | 'zh' | 'zh-Hant' | 'ja' | 'ko' | 'th' | 'id' | 'vi' | 'de' | 'fr' | 'es' | 'tr' | 'pl'>;

export const RESOURCE_PAGE_REGISTRY = {
  [awesomePptPromptsResource.slug]: awesomePptPromptsResource,
} as const;

export type ResourcePageSlug = keyof typeof RESOURCE_PAGE_REGISTRY;

export function getResourcePageDefinition<TSlug extends ResourcePageSlug>(slug: TSlug) {
  return RESOURCE_PAGE_REGISTRY[slug];
}

export function getOwnUrlLocales<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
): Locale[] {
  return page.locales.filter(locale => locale.hasOwnUrl).map(locale => locale.locale);
}

export function getLocaleLabelMap<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
): Record<Locale, string> {
  return Object.fromEntries(page.locales.map(locale => [locale.locale, locale.label])) as Record<Locale, string>;
}

export function resolvePreferredLocale<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
  input?: string | null,
): Locale {
  if (!input) {
    return page.defaultLocale;
  }

  const normalized = input.toLowerCase();
  const matched = page.locales.find(locale =>
    locale.bcp47Prefixes.some(prefix => normalized === prefix || normalized.startsWith(`${prefix}-`)),
  );

  return matched?.locale ?? page.defaultLocale;
}

export function resolvePageLocale<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
  input?: string | null,
): Locale {
  const preferredLocale = resolvePreferredLocale(page, input);
  const matched = page.locales.find(locale => locale.locale === preferredLocale);

  return matched?.hasOwnUrl ? preferredLocale : page.defaultLocale;
}

export function buildResourceAppPath<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
  locale: Locale,
): string {
  const matched = page.locales.find(item => item.locale === locale);

  return matched?.hasOwnUrl ? `/${locale}/${page.slug}` : `/${page.slug}`;
}

export function buildResourcePath<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
  locale: Locale,
): string {
  return `${RESOURCE_BASE_PATH}${buildResourceAppPath(page, locale)}`;
}

export function buildResourceAlternates<Locale extends string>(
  page: ResourcePageDefinition<string, Locale>,
): Record<string, string> {
  return {
    'x-default': `${SITE_ORIGIN}${buildResourcePath(page, page.defaultLocale)}`,
    ...Object.fromEntries(
      page.locales.map(locale => [locale.locale, `${SITE_ORIGIN}${buildResourcePath(page, locale.locale)}`]),
    ),
  };
}

export function buildResourceSitemapEntries() {
  return Object.values(RESOURCE_PAGE_REGISTRY).flatMap(page => {
    const localeCandidates = [page.defaultLocale, ...getOwnUrlLocales(page)];
    const uniquePaths = Array.from(new Set(localeCandidates.map(locale => buildResourcePath(page, locale))));

    return uniquePaths.map(path => ({
      url: `${SITE_ORIGIN}${path}`,
      changeFrequency: page.sitemap?.changeFrequency,
      priority: page.sitemap?.priority,
      lastModified: page.sitemap?.lastModified,
    }));
  });
}

export function getAllOwnUrlResourceLocales(): string[] {
  return Array.from(
    new Set(
      Object.values(RESOURCE_PAGE_REGISTRY).flatMap(page => getOwnUrlLocales(page)),
    ),
  );
}

export function isSupportedOwnUrlResourceLocale(locale: string): boolean {
  return getAllOwnUrlResourceLocales().includes(locale);
}