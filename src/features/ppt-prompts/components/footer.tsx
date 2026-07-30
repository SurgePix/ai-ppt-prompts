'use client';

import type {
  PptPromptsPageCopy,
  RelatedResourceItem,
  ToolItem,
} from '@/features/ppt-prompts/lib/ppt-prompts-types';
import { withUtm } from '@/features/resources/lib/outbound';

interface FooterProps {
  copy?: Partial<PptPromptsPageCopy>;
  relatedResources?: RelatedResourceItem[];
  tools?: ToolItem[];
  pagePath?: string;
  mainSiteUrl?: string;
  githubUrl?: string;
}

const emitGa4Event = (eventName: string, params: Record<string, string>) => {
  if (typeof window === 'undefined') return;
  const gtag = (window as Window & {
    gtag?: (command: 'event', eventName: string, params: Record<string, string>) => void;
  }).gtag;
  gtag?.('event', eventName, params);
};

const toFilterName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const trackCtaClick = (pagePath: string, buttonName: string) =>
  emitGa4Event('cta_click', { page: pagePath, button_name: buttonName });

const trackToolClick = (pagePath: string, toolName: string) =>
  emitGa4Event('tool_click', { page: pagePath, tool_name: toFilterName(toolName) });

export function Footer({
  copy = {},
  relatedResources = [],
  tools = [],
  pagePath = '/awesome-ppt-prompts',
  mainSiteUrl = 'https://surgepix.ai/',
  githubUrl = 'https://github.com/SurgePix/ai-ppt-prompts',
}: FooterProps) {
  return (
    <footer
      className="relative z-40 overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_042421_41f4fa0b-770c-4545-a416-73a809366e49.png&w=1280&q=85)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability over the cinematic sky */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/65" />

      <div className="relative z-10">
        {/* Resources + Tools */}
        {(relatedResources.length > 0 || tools.length > 0) && (
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8">
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] px-5 py-10 backdrop-blur-md md:px-10">
              {copy.toolsTitle && (
                <h2 className="text-center font-arsenica text-2xl sm:text-3xl text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                  {copy.toolsTitle}
                </h2>
              )}
              {copy.toolsSubtitle && (
                <p className="mx-auto mt-3 max-w-2xl text-center font-inter text-sm text-white/60">
                  {copy.toolsSubtitle}
                </p>
              )}

              {relatedResources.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {relatedResources.map((resource) => (
                    <a
                      key={resource.href}
                      href={resource.external ? withUtm(resource.href, { content: 'footer_resource' }) : resource.href}
                      target={resource.external ? '_blank' : undefined}
                      rel={resource.external ? 'noopener noreferrer' : undefined}
                      onClick={
                        resource.href === mainSiteUrl
                          ? () => trackCtaClick(pagePath, resource.title)
                          : undefined
                      }
                      className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-5 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.12]"
                    >
                      <span className="shrink-0 text-2xl">{resource.icon}</span>
                      <div>
                        <p className="mb-1 font-inter font-semibold text-white/95">{resource.title}</p>
                        <p className="font-inter text-sm text-white/60">{resource.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {tools.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {tools.map((tool) => (
                    <a
                      key={tool.href}
                      href={withUtm(tool.href, { content: 'footer_tool' })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackToolClick(pagePath, tool.text)}
                      className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-3 text-center font-inter text-sm font-medium text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.14] hover:text-white"
                    >
                      {tool.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Brand + Contact + Copyright */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="flex flex-col gap-3">
                <a
                  href={withUtm(mainSiteUrl, { content: 'footer_logo' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick(pagePath, 'SurgePix logo')}
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://ui-cos.tate-a-tate.com/surgepix-resources/surgepix-brand/logo%20x%204.png"
                    alt="SurgePix"
                    className="h-8 w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </a>
                {copy.createEditVisualsTagline && (
                  <p className="font-inter text-sm text-white/50">{copy.createEditVisualsTagline}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {copy.contactUs && (
                  <p className="font-inter text-sm font-semibold text-white/85">{copy.contactUs}</p>
                )}
                <a
                  href="https://x.com/surgepix_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm text-white/60 transition-colors hover:text-white"
                >
                  X
                </a>
                <a
                  href="https://discord.gg/wC5XeHN6fR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm text-white/60 transition-colors hover:text-white"
                >
                  Discord
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick(pagePath, 'github_star_footer')}
                  className="font-inter text-sm text-white/60 transition-colors hover:text-white"
                >
                  GitHub
                </a>
                <span className="font-inter text-sm text-white/50">contact@tate-a-tate.com</span>
              </div>
            </div>

            {copy.footer && (
              <div className="mt-8 text-center font-inter text-xs text-white/40">{copy.footer}</div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
