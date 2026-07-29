import PptPromptsPageDigitalArchive from '@/features/ppt-prompts/components/ppt-prompts-page-digital-archive';
import {
  buildPptPromptsMetadata,
  buildPptPromptsPath,
  getPptPromptsPageData,
} from '@/features/ppt-prompts/lib/ppt-prompts-locales';
import { buildPptPromptsJsonLd } from '@/features/ppt-prompts/lib/ppt-prompts-jsonld';

export const metadata = await buildPptPromptsMetadata('en');

export default async function Page() {
  const data = await getPptPromptsPageData('en');
  const jsonLd = buildPptPromptsJsonLd({
    locale: 'en',
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
      <PptPromptsPageDigitalArchive data={data} pagePath={buildPptPromptsPath('en')} />
    </>
  );
}
