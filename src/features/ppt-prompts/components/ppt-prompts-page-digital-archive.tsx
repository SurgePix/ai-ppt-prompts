'use client';

import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './navbar';
import { Hero } from './hero';
import { PptPromptsShowcase } from './ppt-prompts-showcase';
import { QAndA } from './q-and-a';
import { Footer } from './footer';
import type { LocalizedPptPrompt } from '@/features/ppt-prompts/lib/ppt-prompts-types';
import { useResourceLocaleController } from '@/features/resources/lib/use-resource-locale-controller';
import {
  PPT_PROMPT_LOCALE_CONFIGS,
  PPT_PROMPT_LOCALE_LABELS,
  PREFERRED_PPT_PROMPT_LOCALE_COOKIE_KEY,
  PREFERRED_PPT_PROMPT_LOCALE_STORAGE_KEY,
  resolvePreferredPptPromptLocale,
  resolvePptPromptPageLocale,
  buildPptPromptsAppPath,
  type PreferredPptPromptLocale,
  type PptPromptPageLocale,
} from '@/features/ppt-prompts/lib/ppt-prompts-routing';

interface PptPromptsPageDigitalArchiveProps {
  data: {
    prompts: LocalizedPptPrompt[];
    locale: string;
    copy?: Record<string, any>;
    categoryLabels?: Record<string, string>;
    styleLabels?: Record<string, string>;
  };
  pagePath?: string;
}

export default function PptPromptsPageDigitalArchive({ data, pagePath = '/awesome-ppt-prompts' }: PptPromptsPageDigitalArchiveProps) {
  const [isLoading, setIsLoading] = useState(false);

  const currentLocale = (data.locale as PptPromptPageLocale) ?? 'en';
  const { preferredLocale, switchLocale } = useResourceLocaleController<PreferredPptPromptLocale, PptPromptPageLocale>({
    currentLocale,
    defaultLocale: 'en',
    pagePath,
    storageKey: PREFERRED_PPT_PROMPT_LOCALE_STORAGE_KEY,
    cookieKey: PREFERRED_PPT_PROMPT_LOCALE_COOKIE_KEY,
    resolvePreferredLocale: resolvePreferredPptPromptLocale,
    resolvePageLocale: resolvePptPromptPageLocale,
    buildAppPath: buildPptPromptsAppPath,
  });

  const localeOptions = PPT_PROMPT_LOCALE_CONFIGS.map((c) => ({
    value: c.locale as PreferredPptPromptLocale,
    label: PPT_PROMPT_LOCALE_LABELS[c.locale as PreferredPptPromptLocale] ?? c.locale,
  }));
  const currentLocaleLabel = PPT_PROMPT_LOCALE_LABELS[preferredLocale] ?? preferredLocale;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white bg-black">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Convert existing prompts to showcase format
  const showcasePrompts = data.prompts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description || '',
    category: Array.isArray(p.useCases) && p.useCases.length > 0 ? p.useCases[0] : 'General',
    style: Array.isArray(p.styles) && p.styles.length > 0 ? p.styles[0] : 'General',
    tags: Array.isArray(p.tags) ? p.tags : [],
    prompt: p.prompt,
    images: Array.isArray(p.images) ? p.images : [],
    useCases: Array.isArray(p.useCases) ? p.useCases : [],
    styles: Array.isArray(p.styles) ? p.styles : [],
  }));

  return (
    <div className="relative w-full min-h-screen bg-black">
      <Navbar
        localeOptions={localeOptions}
        currentLocale={preferredLocale}
        currentLocaleLabel={currentLocaleLabel}
        onSwitchLocale={(locale) => switchLocale(locale as PreferredPptPromptLocale)}
        labels={{
          library: data.copy?.navLibrary,
          useCases: data.copy?.navUseCases,
          styles: data.copy?.navStyles,
          star: data.copy?.navStar,
        }}
      />
      <Hero
        generateLabel={data.copy?.generateBtn ?? 'Generate PPT'}
        learnLabel={data.copy?.learnBtn ?? 'Learn More'}
        description={data.copy?.subtitle}
      />
      <PptPromptsShowcase
        prompts={showcasePrompts}
        copy={data.copy}
        categoryLabels={data.categoryLabels}
        styleLabels={data.styleLabels}
      />
      <QAndA />
      <Footer
        copy={data.copy}
        relatedResources={(data as any).relatedResources ?? []}
        tools={(data as any).tools ?? []}
        pagePath={pagePath}
      />
    </div>
  );
}
