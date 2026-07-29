import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PptPromptsPageDigitalArchive from '@/features/ppt-prompts/components/ppt-prompts-page-digital-archive';
import {
  buildPptPromptsMetadata,
  buildPptPromptsPath,
  getPptPromptsPageData,
  isSupportedPptPromptLocale,
  SUPPORTED_PPT_PROMPT_LOCALES,
} from '@/features/ppt-prompts/lib/ppt-prompts-locales';
import { buildPptPromptsJsonLd } from '@/features/ppt-prompts/lib/ppt-prompts-jsonld';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_PPT_PROMPT_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedPptPromptLocale(locale)) {
    return {};
  }

  return buildPptPromptsMetadata(locale);
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedPptPromptLocale(locale)) {
    notFound();
  }

  const data = await getPptPromptsPageData(locale);
  const jsonLd = buildPptPromptsJsonLd({
    locale,
    title: data.copy?.title ?? 'AI PPT Prompt Library',
    description: data.copy?.subtitle ?? '',
    prompts: data.prompts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PptPromptsPageDigitalArchive data={data} pagePath={buildPptPromptsPath(locale)} />
    </>
  );
}