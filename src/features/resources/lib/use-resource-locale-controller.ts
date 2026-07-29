'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  persistLocalePreference,
  readPersistedLocalePreference,
} from './resource-locale-preference';

type ResourceLocaleControllerOptions<PreferredLocale extends string, PageLocale extends PreferredLocale> = {
  currentLocale: PageLocale;
  defaultLocale: PageLocale;
  pagePath: string;
  storageKey: string;
  cookieKey: string;
  resolvePreferredLocale: (input?: string | null) => PreferredLocale;
  resolvePageLocale: (input?: string | null) => PageLocale;
  buildAppPath: (locale: PageLocale) => string;
};

type ResourceLocaleControllerResult<PreferredLocale extends string> = {
  preferredLocale: PreferredLocale;
  isRedirectingLocale: boolean;
  switchLocale: (locale: PreferredLocale) => void;
};

export function useResourceLocaleController<PreferredLocale extends string, PageLocale extends PreferredLocale>({
  currentLocale,
  defaultLocale,
  pagePath,
  storageKey,
  cookieKey,
  resolvePreferredLocale,
  resolvePageLocale,
  buildAppPath,
}: ResourceLocaleControllerOptions<PreferredLocale, PageLocale>): ResourceLocaleControllerResult<PreferredLocale> {
  const router = useRouter();
  const [preferredLocale, setPreferredLocale] = useState<PreferredLocale>(currentLocale);
  const [isRedirectingLocale, setIsRedirectingLocale] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const persistedLocale = readPersistedLocalePreference(storageKey, cookieKey);
    const savedLocale = resolvePreferredLocale(persistedLocale);

    setPreferredLocale(currentLocale !== defaultLocale ? currentLocale : savedLocale);

    if (currentLocale !== defaultLocale) {
      return;
    }

    if (persistedLocale) {
      const savedPageLocale = resolvePageLocale(savedLocale);

      if (savedPageLocale !== defaultLocale) {
        setIsRedirectingLocale(true);
        router.replace(buildAppPath(savedPageLocale));
      }

      return;
    }

    const browserLocale = resolvePreferredLocale(
      window.navigator.languages.find(language => resolvePreferredLocale(language) !== defaultLocale)
        ?? window.navigator.language,
    );

    setPreferredLocale(browserLocale);

    const browserPageLocale = resolvePageLocale(browserLocale);

    if (browserPageLocale !== defaultLocale) {
      setIsRedirectingLocale(true);
      router.replace(buildAppPath(browserPageLocale));
    }
  }, [buildAppPath, cookieKey, currentLocale, defaultLocale, resolvePageLocale, resolvePreferredLocale, router, storageKey]);

  const switchLocale = (locale: PreferredLocale) => {
    persistLocalePreference(storageKey, cookieKey, locale);
    setPreferredLocale(locale);

    const nextPageLocale = resolvePageLocale(locale);
    const nextPath = buildAppPath(nextPageLocale);

    if (nextPath !== pagePath) {
      router.push(nextPath);
    }
  };

  return {
    preferredLocale,
    isRedirectingLocale,
    switchLocale,
  };
}