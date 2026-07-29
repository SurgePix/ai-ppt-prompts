import type { PptPromptPageLocale } from './ppt-prompts-routing';

export type SourcePlatform = 'reddit' | 'x' | 'github';

export const PRESENTATION_USE_CASES = [
  'Business Pitch',
  'Business / Strategy',
  'Product Launch',
  'Sales Proposal',
  'Marketing',
  'Report / Analysis',
  'Finance',
  'Education',
  'Tech / Product',
  'Creative / Design',
  'Events',
] as const;

export const PRESENTATION_STYLES = [
  'Minimal',
  'Modern',
  'Corporate',
  'Tech',
  'Dark',
  'Bold',
  'Elegant',
  'Playful',
  'Warm',
  'Calm',
  'Retro',
  'Editorial',
  'Data Visualization',
  'Academic',
  'Technical',
  'Brand Launch',
] as const;

export type PresentationUseCase = (typeof PRESENTATION_USE_CASES)[number];
export type PresentationStyle = (typeof PRESENTATION_STYLES)[number];
export type PptPromptId = string | number;

export type BasePptPrompt = {
  id: PptPromptId;
  title?: string;
  description?: string;
  prompt: string;
  author: string;
  sourceUrl: string;
  sourcePlatform: SourcePlatform;
  model?: string;
  style: PresentationStyle;
  category: PresentationUseCase;
  useCases: PresentationUseCase[];
  styles: PresentationStyle[];
  tags: string[];
  images: string[];
  metadata?: Record<string, string>;
  autoTagging?: {
    status: 'success' | 'failed';
    model?: string;
    error?: string;
  };
};

export type LocalizedPptPrompt = Omit<BasePptPrompt, 'title' | 'description' | 'useCases' | 'styles'> & {
  title: string;
  description: string;
  useCases: string[];
  styles: string[];
};

export type PptPromptsPageCopy = {
  title: string;
  subtitle: string;
  subtitleMetaTemplate: string;
  discordCta: string;
  guideTitle: string;
  step1: string;
  step2: string;
  step3: string;
  learnBtn: string;
  generateBtn: string;
  searchButtonLabel: string;
  currentLocale: string;
  allUseCases: string;
  allStyles: string;
  searchPlaceholder: string;
  resultCountTemplate: string;
  noResults: string;
  copy: string;
  copied: string;
  generate: string;
  sourceAriaLabel: string;
  loadMore: string;
  loadingMore: string;
  noPreview: string;
  toolsTitle: string;
  toolsSubtitle: string;
  createEditVisualsTagline: string;
  contactUs: string;
  footer: string;
};

export type RelatedResourceItem = {
  icon: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
};

export type ToolItem = {
  text: string;
  href: string;
};

export type PptPromptsPageData = {
  locale: PptPromptPageLocale;
  copy: PptPromptsPageCopy;
  categoryLabels: Record<string, string>;
  styleLabels: Record<string, string>;
  prompts: LocalizedPptPrompt[];
  relatedResources: RelatedResourceItem[];
  tools: ToolItem[];
};

export type PptPromptsTranslation = {
  meta?: {
    title?: string;
    description?: string;
  };
  ui?: Partial<PptPromptsPageCopy>;
  categories?: Record<string, string>;
  styles?: Record<string, string>;
  prompts?: Record<string, {
    title?: string;
    description?: string;
  }>;
  relatedResources?: Record<string, {
    title?: string;
    description?: string;
  }>;
  tools?: Record<string, string>;
};
