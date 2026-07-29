import {
  awesomePptPromptsResource,
  buildResourceAppPath,
  buildResourcePath,
  getLocaleLabelMap,
  getOwnUrlLocales,
  resolvePageLocale,
  resolvePreferredLocale,
} from '@/features/resources/lib/resource-pages';
import {
  getResourceLocaleCookieKey,
  getResourceLocaleStorageKey,
} from '@/features/resources/lib/resource-locale-preference';

export const PREFERRED_PPT_PROMPT_LOCALE_STORAGE_KEY = getResourceLocaleStorageKey(awesomePptPromptsResource.slug);
export const PREFERRED_PPT_PROMPT_LOCALE_COOKIE_KEY = getResourceLocaleCookieKey(awesomePptPromptsResource.slug);

export const PPT_PROMPT_LOCALE_CONFIGS = awesomePptPromptsResource.locales;

type PptPromptLocaleConfig = (typeof PPT_PROMPT_LOCALE_CONFIGS)[number];

export type PreferredPptPromptLocale = PptPromptLocaleConfig['locale'];
export type SupportedPptPromptLocale = Extract<PptPromptLocaleConfig, { hasOwnUrl: true }>['locale'];
export type PptPromptPageLocale = typeof awesomePptPromptsResource.defaultLocale | SupportedPptPromptLocale;

export const SUPPORTED_PPT_PROMPT_LOCALES = getOwnUrlLocales(awesomePptPromptsResource) as SupportedPptPromptLocale[];
export const PPT_PROMPT_LOCALE_LABELS = getLocaleLabelMap(awesomePptPromptsResource) as Record<PreferredPptPromptLocale, string>;

export function buildPptPromptsAppPath(locale: PptPromptPageLocale): string {
  return buildResourceAppPath(awesomePptPromptsResource, locale);
}

export function buildPptPromptsPath(locale: PptPromptPageLocale): string {
  return buildResourcePath(awesomePptPromptsResource, locale);
}

export function resolvePreferredPptPromptLocale(input?: string | null): PreferredPptPromptLocale {
  return resolvePreferredLocale(awesomePptPromptsResource, input);
}

export function resolvePptPromptPageLocale(input?: string | null): PptPromptPageLocale {
  return resolvePageLocale(awesomePptPromptsResource, input) as PptPromptPageLocale;
}

export function isSupportedOwnUrlLocale(locale: string): locale is SupportedPptPromptLocale {
  return SUPPORTED_PPT_PROMPT_LOCALES.includes(locale as SupportedPptPromptLocale);
}