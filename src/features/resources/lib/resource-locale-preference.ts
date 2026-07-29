export const RESOURCE_LOCALE_PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getResourceLocaleStorageKey(slug: string): string {
  return `surgepix.resources.${slug}.preferred-locale`;
}

export function getResourceLocaleCookieKey(slug: string): string {
  return `surgepix.resources.${slug}.preferred-locale`;
}

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookie = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null;
}

export function readPersistedLocalePreference(
  storageKey: string,
  cookieKey: string,
): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(storageKey) ?? readCookieValue(cookieKey);
}

export function persistLocalePreference(
  storageKey: string,
  cookieKey: string,
  locale: string,
): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, locale);
  document.cookie = `${cookieKey}=${encodeURIComponent(locale)}; Max-Age=${RESOURCE_LOCALE_PREFERENCE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}