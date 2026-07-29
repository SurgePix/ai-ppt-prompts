import type { Metadata } from 'next';
import { z } from 'zod';
import pptPrompts from '@/data/ppt-prompts.json';
import slideSpeakPrompts from '@/data/ppt-prompts-slidespeak.json';
import registryPrompts from '@/data/ppt-prompts-registry.json';
import pptDe from '@/data/locales/ppt-prompts/de.json';
import pptEs from '@/data/locales/ppt-prompts/es.json';
import pptFr from '@/data/locales/ppt-prompts/fr.json';
import pptId from '@/data/locales/ppt-prompts/id.json';
import pptJa from '@/data/locales/ppt-prompts/ja.json';
import pptKo from '@/data/locales/ppt-prompts/ko.json';
import pptPl from '@/data/locales/ppt-prompts/pl.json';
import pptTh from '@/data/locales/ppt-prompts/th.json';
import pptTr from '@/data/locales/ppt-prompts/tr.json';
import pptVi from '@/data/locales/ppt-prompts/vi.json';
import pptZh from '@/data/locales/ppt-prompts/zh.json';
import pptZhHant from '@/data/locales/ppt-prompts/zh-Hant.json';
import {
  awesomePptPromptsResource,
} from '@/features/resources/lib/resource-pages';
import { buildResourceMetadata } from '@/features/resources/lib/resource-seo';
import {
  buildPptPromptsPath,
  PPT_PROMPT_LOCALE_CONFIGS,
  SUPPORTED_PPT_PROMPT_LOCALES,
  type PptPromptPageLocale,
  type SupportedPptPromptLocale,
} from './ppt-prompts-routing';
import {
  PRESENTATION_STYLES,
  PRESENTATION_USE_CASES,
  type BasePptPrompt,
  type LocalizedPptPrompt,
  type PptPromptsPageCopy,
  type PptPromptsPageData,
  type PptPromptsTranslation,
  type RelatedResourceItem,
  type ToolItem,
} from './ppt-prompts-types';

export { buildPptPromptsPath, SUPPORTED_PPT_PROMPT_LOCALES } from './ppt-prompts-routing';

const PREFERRED_LOCALE_SET = new Set(PPT_PROMPT_LOCALE_CONFIGS.map(locale => locale.locale));

const modelSlugMap: Record<string, string> = {
  'gpt-image-2': 'GPT-Image-2',
  'chatgpt-o3': 'ChatGPT o3',
  'chatgpt-o4-mini': 'ChatGPT o4-mini',
  'claude-3-7-sonnet': 'Claude 3.7 Sonnet',
  'gemini-2-5-pro': 'Gemini 2.5 Pro',
  'gamma-app-ai': 'Gamma.app AI',
  'canva-ai': 'Canva AI',
};

const baseCopy: PptPromptsPageCopy = {
  title: 'AI PPT Prompt Library',
  subtitle: 'Browse 100+ curated AI prompts for PowerPoint and presentations — each with a real slide preview, use-case and visual-style filters, and copy-ready text to generate professional decks in seconds.',
  subtitleMetaTemplate: '{count} curated prompts · Reddit · X · GitHub',
  discordCta: 'Join Discord for more free resources',
  guideTitle: 'Presenting Tomorrow? The 3-Step Rescue',
  step1: 'Open Surgepix.ai',
  step2: 'Click Presentation',
  step3: 'Paste one prompt below',
  learnBtn: 'PPT Writing Tips',
  generateBtn: 'Try Surgepix',
  searchButtonLabel: 'Search',
  currentLocale: 'Current',
  allUseCases: 'All Use Cases',
  allStyles: 'All Styles',
  searchPlaceholder: 'Search prompts, authors, use cases or styles...',
  resultCountTemplate: '{shown} / {total} prompts',
  noResults: 'No prompts found. Try adjusting your search or filters.',
  copy: 'Copy',
  copied: 'Copied!',
  generate: 'Generate',
  sourceAriaLabel: 'View source',
  loadMore: 'Load 3 more rows',
  loadingMore: 'More prompts available below',
  noPreview: 'No preview',
  toolsTitle: 'Free Tools - Ready to Use',
  toolsSubtitle: 'No registration needed - powerful image processing and design tools',
  createEditVisualsTagline: 'Create & Edit Visuals with AI',
  contactUs: 'Contact Us',
  footer: 'Community-curated presentation prompts',
};

const defaultRelatedResources: RelatedResourceItem[] = [
  {
    icon: '🎨',
    title: 'GPT-Image-2 Prompt Library',
    description: '350+ curated AI image generation prompts',
    href: 'https://surgepix.ai/resources/gpt-image-2-prompts',
    external: true,
  },
  {
    icon: '⚡',
    title: 'SurgePix AI — Create & Edit Visuals',
    description: 'Generate presentations, images and more with AI',
    href: 'https://surgepix.ai/',
    external: true,
  },
];

const defaultTools: ToolItem[] = [
  { text: 'PDF to JPG', href: 'https://surgepix.ai/tools/operation?type=1' },
  { text: 'PNG to JPG', href: 'https://surgepix.ai/tools/operation?type=2' },
  { text: 'JPG to PDF', href: 'https://surgepix.ai/tools/operation?type=3' },
  { text: 'HEIC to PDF', href: 'https://surgepix.ai/tools/operation?type=12' },
  { text: 'HEIC to PNG', href: 'https://surgepix.ai/tools/operation?type=13' },
  { text: 'Image Resizer', href: 'https://surgepix.ai/tools/operation?type=4' },
  { text: 'YouTube Banner', href: 'https://surgepix.ai/tools/operation?type=5' },
  { text: 'AI Hairstyle', href: 'https://surgepix.ai/tools/operation?type=6' },
  { text: 'Bar Graph Maker', href: 'https://surgepix.ai/tools/operation?type=9' },
  { text: 'Pie Chart Maker', href: 'https://surgepix.ai/tools/operation?type=10' },
  { text: 'Venn Diagram', href: 'https://surgepix.ai/tools/operation?type=11' },
  { text: "Father's Day 2026", href: 'https://surgepix.ai/tools/operation?type=7' },
];

const inferModelFromImagePath = (imagePath?: string) => {
  if (!imagePath) {
    return null;
  }

  const fileName = imagePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  const matchedSlug = fileName.match(/^ppt-\d+-(.+)$/)?.[1];

  if (!matchedSlug) {
    return null;
  }

  return modelSlugMap[matchedSlug] ?? null;
};

const presentationUseCaseSchema = z.enum(PRESENTATION_USE_CASES);
const presentationStyleSchema = z.enum(PRESENTATION_STYLES);

const presentationPromptFacetSchema = z.object({
  category: presentationUseCaseSchema,
  style: presentationStyleSchema,
  useCases: z.array(presentationUseCaseSchema).min(1).max(3),
  styles: z.array(presentationStyleSchema).min(1).max(3),
  tags: z.array(z.string()),
}).passthrough().superRefine((prompt, context) => {
  if (new Set(prompt.useCases).size !== prompt.useCases.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['useCases'],
      message: 'PPT useCases must not contain duplicates.',
    });
  }
  if (new Set(prompt.styles).size !== prompt.styles.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['styles'],
      message: 'PPT styles must not contain duplicates.',
    });
  }
  if (prompt.category !== prompt.useCases[0]) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['category'],
      message: 'PPT category must mirror the first useCases value.',
    });
  }
  if (prompt.style !== prompt.styles[0]) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['style'],
      message: 'PPT style must mirror the first styles value.',
    });
  }

  const actualFacetTags = prompt.tags.filter(tag => (
    tag.startsWith('use_case:') || tag.startsWith('style:')
  ));
  const expectedFacetTags = [
    ...prompt.useCases.map(value => `use_case:${value}`),
    ...prompt.styles.map(value => `style:${value}`),
  ];
  if (JSON.stringify(actualFacetTags) !== JSON.stringify(expectedFacetTags)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['tags'],
      message: 'PPT facet tags must exactly project useCases and styles.',
    });
  }
});

const parsedBasePrompts = z.array(presentationPromptFacetSchema).parse([
  ...(pptPrompts as BasePptPrompt[]),
  ...(slideSpeakPrompts as BasePptPrompt[]),
  ...(registryPrompts as BasePptPrompt[]),
]) as BasePptPrompt[];

const basePrompts: LocalizedPptPrompt[] = parsedBasePrompts.map(prompt => ({
  ...prompt,
  model: inferModelFromImagePath(prompt.images[0]) ?? prompt.model ?? '',
  title: prompt.title ?? prompt.tags[0] ?? prompt.category,
  description: prompt.description ?? prompt.prompt,
  useCases: prompt.useCases,
  styles: prompt.styles,
}));

const baseCategoryLabels = Object.fromEntries(
  Array.from(new Set(basePrompts.flatMap(prompt => prompt.useCases))).map(category => [category, category]),
) as Record<string, string>;

const baseStyleLabels = Object.fromEntries(
  Array.from(new Set(basePrompts.flatMap(prompt => prompt.styles))).map(style => [style, style]),
) as Record<string, string>;

const categoryKeyMap: Record<string, string> = {
  all: 'All',
  business_pitch: 'Business Pitch',
  tech_product: 'Tech / Product',
  education: 'Education',
  marketing: 'Marketing',
  report_analysis: 'Report / Analysis',
  creative_design: 'Creative / Design',
  business_strategy: 'Business / Strategy',
  events: 'Events',
  finance: 'Finance',
};

const toolKeyMap: Record<string, string> = {
  pdf_to_jpg: 'https://surgepix.ai/tools/operation?type=1',
  png_to_jpg: 'https://surgepix.ai/tools/operation?type=2',
  jpg_to_pdf: 'https://surgepix.ai/tools/operation?type=3',
  heic_to_pdf: 'https://surgepix.ai/tools/operation?type=12',
  heic_to_png: 'https://surgepix.ai/tools/operation?type=13',
  image_resizer: 'https://surgepix.ai/tools/operation?type=4',
  youtube_banner: 'https://surgepix.ai/tools/operation?type=5',
  ai_hairstyle: 'https://surgepix.ai/tools/operation?type=6',
  bar_graph_maker: 'https://surgepix.ai/tools/operation?type=9',
  pie_chart_maker: 'https://surgepix.ai/tools/operation?type=10',
  venn_diagram: 'https://surgepix.ai/tools/operation?type=11',
  fathers_day: 'https://surgepix.ai/tools/operation?type=7',
};

const relatedResourceKeyMap = {
  gpt: 'https://surgepix.ai/resources/gpt-image-2-prompts',
  surgepix: 'https://surgepix.ai/',
} as const;

const normalizeTemplatePlaceholders = (value?: string) =>
  value
    ?.replace(/25\+?(?=\s)/, '{count}')
    ?.replaceAll('{{count}}', '{shown}')
    .replaceAll('{{shown}}', '{shown}')
    .replaceAll('{{total}}', '{total}')
    .replaceAll('{{promptCount}}', '{count}')
    .replaceAll('{{count }}', '{shown}')
    .replaceAll('{{ total}}', '{total}');

const translationSchema: z.ZodType<PptPromptsTranslation> = z.object({
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).partial().optional(),
  ui: z.record(z.string(), z.string()).optional(),
  categories: z.record(z.string(), z.string()).optional(),
  prompts: z.record(
    z.string(),
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).partial(),
  ).optional(),
  relatedResources: z.record(
    z.string(),
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).partial(),
  ).optional(),
  tools: z.record(z.string(), z.string()).optional(),
}).strict();

const cmsTranslationSchema = z.object({
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).partial().optional(),
  ui: z.object({
    hero_title: z.string().optional(),
    hero_subtitle: z.string().optional(),
    hero_badge: z.string().optional(),
    hero_discord: z.string().optional(),
    rescue_title: z.string().optional(),
    rescue_step_1: z.string().optional(),
    rescue_step_2: z.string().optional(),
    rescue_step_3: z.string().optional(),
    search_label: z.string().optional(),
    currentLocale: z.string().optional(),
    search_placeholder: z.string().optional(),
    try_surgepix: z.string().optional(),
    ppt_writing_tips: z.string().optional(),
    filter_count: z.string().optional(),
    all_types: z.string().optional(),
    all_use_cases: z.string().optional(),
    all_models: z.string().optional(),
    all_styles: z.string().optional(),
    card_copy: z.string().optional(),
    card_copied: z.string().optional(),
    card_generate: z.string().optional(),
    expand: z.string().optional(),
    collapse: z.string().optional(),
    more_prompts_hint: z.string().optional(),
    load_more: z.string().optional(),
    footer_section_title: z.string().optional(),
    footer_section_subtitle: z.string().optional(),
    footer_tool_gpt_title: z.string().optional(),
    footer_tool_gpt_desc: z.string().optional(),
    footer_tool_surgepix_title: z.string().optional(),
    footer_tool_surgepix_desc: z.string().optional(),
    footer_tools: z.record(z.string(), z.string()).optional(),
    footer_brand_tagline: z.string().optional(),
    footer_contact: z.string().optional(),
    bottom_bar: z.string().optional(),
  }).partial().optional(),
  categories: z.record(z.string(), z.string()).optional(),
  styles: z.record(z.string(), z.string()).optional(),
  prompts: z.record(
    z.string(),
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).partial(),
  ).optional(),
}).strict();

function normalizeCmsTranslation(raw: z.infer<typeof cmsTranslationSchema>): PptPromptsTranslation {
  const ui = raw.ui;
  const categoryLabels = Object.fromEntries(
    Object.entries(raw.categories ?? {}).map(([key, value]) => [categoryKeyMap[key] ?? key, value]),
  );
  const relatedResources = {
    [relatedResourceKeyMap.gpt]: {
      title: ui?.footer_tool_gpt_title,
      description: ui?.footer_tool_gpt_desc,
    },
    [relatedResourceKeyMap.surgepix]: {
      title: ui?.footer_tool_surgepix_title,
      description: ui?.footer_tool_surgepix_desc,
    },
  };
  const tools = Object.fromEntries(
    Object.entries(ui?.footer_tools ?? {}).flatMap(([key, value]) => {
      const href = toolKeyMap[key];
      return href ? [[href, value]] : [];
    }),
  );

  return {
    meta: raw.meta,
    ui: {
      title: ui?.hero_title,
      subtitle: ui?.hero_subtitle,
      subtitleMetaTemplate: normalizeTemplatePlaceholders(ui?.hero_badge),
      discordCta: ui?.hero_discord,
      guideTitle: ui?.rescue_title,
      step1: ui?.rescue_step_1,
      step2: ui?.rescue_step_2,
      step3: ui?.rescue_step_3,
      learnBtn: ui?.ppt_writing_tips,
      generateBtn: ui?.try_surgepix,
      searchButtonLabel: ui?.search_label,
      currentLocale: ui?.currentLocale,
      allUseCases: ui?.all_use_cases ?? ui?.all_types,
      allStyles: ui?.all_styles ?? ui?.all_models,
      searchPlaceholder: ui?.search_placeholder,
      resultCountTemplate: normalizeTemplatePlaceholders(ui?.filter_count),
      copy: ui?.card_copy,
      copied: ui?.card_copied,
      generate: ui?.card_generate,
      loadMore: ui?.load_more,
      loadingMore: ui?.more_prompts_hint,
      toolsTitle: ui?.footer_section_title,
      toolsSubtitle: ui?.footer_section_subtitle,
      createEditVisualsTagline: ui?.footer_brand_tagline,
      contactUs: ui?.footer_contact,
      footer: ui?.bottom_bar,
    },
    categories: categoryLabels,
    styles: raw.styles,
    prompts: raw.prompts,
    relatedResources,
    tools,
  };
}

async function loadTranslation(locale: SupportedPptPromptLocale): Promise<PptPromptsTranslation> {
  const translationMap: Record<SupportedPptPromptLocale, unknown> = {
    de: pptDe,
    es: pptEs,
    fr: pptFr,
    id: pptId,
    ja: pptJa,
    ko: pptKo,
    pl: pptPl,
    th: pptTh,
    tr: pptTr,
    vi: pptVi,
    zh: pptZh,
    'zh-Hant': pptZhHant,
  };
  const parsed = translationMap[locale];

  const normalizedResult = translationSchema.safeParse(parsed);

  const translation = normalizedResult.success
    ? normalizedResult.data
    : normalizeCmsTranslation(cmsTranslationSchema.parse(parsed));
  const missingCategories = Object.keys(baseCategoryLabels).filter(
    category => !translation.categories?.[category]?.trim(),
  );
  const missingStyles = Object.keys(baseStyleLabels).filter(
    style => !translation.styles?.[style]?.trim(),
  );
  if (missingCategories.length > 0 || missingStyles.length > 0) {
    throw new Error(
      `Incomplete PPT Tag translations for ${locale}: ` +
      `useCases=${missingCategories.join(',') || 'complete'}; ` +
      `styles=${missingStyles.join(',') || 'complete'}`,
    );
  }
  return translation;
}

export function isSupportedPptPromptLocale(locale: string): locale is SupportedPptPromptLocale {
  return SUPPORTED_PPT_PROMPT_LOCALES.includes(locale as SupportedPptPromptLocale);
}

export async function getPptPromptsPageData(locale: PptPromptPageLocale): Promise<PptPromptsPageData> {
  if (!PREFERRED_LOCALE_SET.has(locale)) {
    throw new Error(`Unsupported PPT prompts locale: ${locale}`);
  }

  if (locale === 'en') {
    return {
      locale,
      copy: baseCopy,
      categoryLabels: baseCategoryLabels,
      styleLabels: baseStyleLabels,
      prompts: basePrompts,
      relatedResources: defaultRelatedResources,
      tools: defaultTools,
    };
  }

  const translation = await loadTranslation(locale);

  return {
    locale,
    copy: {
      ...baseCopy,
      ...translation.ui,
    },
    categoryLabels: {
      ...baseCategoryLabels,
      ...translation.categories,
    },
    styleLabels: {
      ...baseStyleLabels,
      ...translation.styles,
    },
    prompts: basePrompts.map(prompt => {
      const override = translation.prompts?.[String(prompt.id)];
      return {
        ...prompt,
        title: override?.title ?? prompt.title,
        description: override?.description ?? prompt.description,
      };
    }),
    relatedResources: defaultRelatedResources.map(resource => {
      const override = translation.relatedResources?.[resource.href];
      return {
        ...resource,
        title: override?.title ?? resource.title,
        description: override?.description ?? resource.description,
      };
    }),
    tools: defaultTools.map(tool => ({
      ...tool,
      text: translation.tools?.[tool.href] ?? tool.text,
    })),
  };
}

export async function buildPptPromptsMetadata(locale: PptPromptPageLocale): Promise<Metadata> {
  const translation = locale === 'en' ? {} : await loadTranslation(locale);
  const title = translation.meta?.title ?? 'AI PPT Prompt Library — 100+ PowerPoint & Presentation Prompts | SurgePix';
  const description = translation.meta?.description ?? 'Browse 100+ curated AI PPT prompts for PowerPoint and presentations. Each prompt includes a real slide preview, use-case and visual-style filters, and copy-ready text to generate professional decks in seconds.';

  return buildResourceMetadata({
    page: awesomePptPromptsResource,
    locale,
    title,
    description,
    image:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_042421_41f4fa0b-770c-4545-a416-73a809366e49.png',
    imageAlt: 'AI PPT Prompt Library — SurgePix',
  });
}
