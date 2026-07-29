const MAIN_SITE_HOSTS = ['surgepix.ai'];

type UtmOptions = {
  campaign?: string;
  content?: string;
};

/**
 * Appends UTM attribution params to links that point at the SurgePix main site
 * so referral traffic from this resource hub is measurable in the main site's
 * analytics. Non-main-site or relative URLs are returned unchanged.
 */
export function withUtm(url: string, { campaign = 'ppt-prompts', content }: UtmOptions = {}): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const isMainSite = MAIN_SITE_HOSTS.some(
    host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
  );
  if (!isMainSite) {
    return url;
  }

  parsed.searchParams.set('utm_source', 'resources');
  parsed.searchParams.set('utm_medium', 'referral');
  parsed.searchParams.set('utm_campaign', campaign);
  if (content) {
    parsed.searchParams.set('utm_content', content);
  }

  return parsed.toString();
}
