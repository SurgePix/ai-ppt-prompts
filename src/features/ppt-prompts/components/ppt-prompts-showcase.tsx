'use client';

import { useState, useMemo, useRef, useEffect, ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import type { PptPromptsPageCopy } from '@/features/ppt-prompts/lib/ppt-prompts-types';

interface PromptCard {
  id: string | number;
  title: string;
  description: string;
  category: string;
  style: string;
  tags: string[];
  prompt: string;
  images?: string[];
  useCases?: string[];
  styles?: string[];
}

interface PptPromptsShowcaseProps {
  prompts: PromptCard[];
  children?: ReactNode;
  /* Localised UI strings and taxonomy labels. Filtering still keys off the raw
     English taxonomy values; these only control what gets rendered. */
  copy?: Partial<PptPromptsPageCopy>;
  categoryLabels?: Record<string, string>;
  styleLabels?: Record<string, string>;
}

const escapeSvgText = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildPromptPreviewDataUri = (prompt: PromptCard, styleLabel?: string) => {
  const title = escapeSvgText(prompt.title);
  const category = escapeSvgText(prompt.category);
  const style = escapeSvgText(styleLabel ?? prompt.style);
  const accentColor = '#6f9dff'; // Default accent color
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#1a1a1a"/>
        </linearGradient>
      </defs>
      <rect width="960" height="640" rx="36" fill="url(#bg)"/>
      <rect x="42" y="42" width="876" height="556" rx="30" fill="#1f1f1f"/>
      <rect x="78" y="82" width="220" height="22" rx="11" fill="${accentColor}" fill-opacity="0.2"/>
      <rect x="78" y="128" width="472" height="116" rx="28" fill="${accentColor}" fill-opacity="0.1"/>
      <text x="78" y="180" fill="#ffffff" font-family="Arial, sans-serif" font-size="40" font-weight="700">${title}</text>
      <text x="78" y="228" fill="#cccccc" font-family="Arial, sans-serif" font-size="22">${category}</text>
      <rect x="618" y="128" width="240" height="240" rx="28" fill="${accentColor}" fill-opacity="0.1" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.3"/>
      <circle cx="738" cy="212" r="48" fill="${accentColor}" fill-opacity="0.2"/>
      <rect x="666" y="438" width="192" height="44" rx="22" fill="${accentColor}" fill-opacity="0.15"/>
      <text x="694" y="466" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="700">${style}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function PptPreviewImage({ source, alt }: { source: string; alt: string }) {
  const frameRef = useRef<HTMLImageElement | null>(null);

  return (
    <img
      ref={frameRef}
      src={source}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export function PptPromptsShowcase({
  prompts,
  copy = {},
  categoryLabels = {},
  styleLabels = {},
}: PptPromptsShowcaseProps) {
  const ALL = 'All';
  /* Taxonomy values stay English internally so filtering keeps working; only
     the rendered label is localised. 'All' is a UI string, not a taxonomy value. */
  const labelForCategory = (value: string) =>
    value === ALL ? (copy.allFilter ?? ALL) : (categoryLabels[value] ?? value);
  const labelForStyle = (value: string) =>
    value === ALL ? (copy.allFilter ?? ALL) : (styleLabels[value] ?? value);

  const containerRef = useScrollReveal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showStyles, setShowStyles] = useState(false);

  // Get all categories and styles
  const allCategories = useMemo(() => {
    const cats = new Set(['All']);
    prompts.forEach((p) => {
      const cats_list = p.useCases || [p.category];
      cats_list.forEach(c => cats.add(c));
    });
    return Array.from(cats);
  }, [prompts]);

  const allStyles = useMemo(() => {
    const styles = new Set(['All']);
    prompts.forEach((p) => {
      const styles_list = p.styles || [p.style];
      styles_list.forEach(s => styles.add(s));
    });
    return Array.from(styles);
  }, [prompts]);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const promptCats = p.useCases || [p.category];
      const promptStyles = p.styles || [p.style];
      const matchesCategory = selectedCategory === 'All' || promptCats.includes(selectedCategory);
      const matchesStyle = selectedStyle === 'All' || promptStyles.includes(selectedStyle);
      return matchesSearch && matchesCategory && matchesStyle;
    });
  }, [prompts, searchQuery, selectedCategory, selectedStyle]);

  const copyToClipboard = (text: string, id: string | number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Navbar → filter deep-linking: scroll to the matching section and open it.
  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const target = (event as CustomEvent<string>).detail;
      if (target === 'useCases') setShowCategories(true);
      if (target === 'styles') setShowStyles(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document
            .getElementById(target)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    };
    window.addEventListener('ppt:navigate', handleNavigate);
    return () => window.removeEventListener('ppt:navigate', handleNavigate);
  }, []);

  return (
    <div className="relative z-20">
      {/* Showcase Section */}
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden pb-20"
        style={{
          backgroundImage:
            'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_040223_98d314e9-b8b4-4218-bcbd-18ffc38032ac.png&w=1280&q=85)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Top blend gradient — softens the seam from the hero video into the dark archive */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/25 to-transparent" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-32 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Section Label */}
            <div id="library" className="reveal text-center mb-10 scroll-mt-28">
              <p className="font-inter text-[11px] uppercase tracking-[0.4em] text-white/50 mb-3">{copy.browseKicker ?? 'Browse the PPT prompt library'}</p>
              <h2 className="font-arsenica text-3xl sm:text-4xl md:text-5xl tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
                {copy.browseTitle ?? 'Explore AI PPT Prompts'}
              </h2>
            </div>

            {/* Search and Filter */}
            <div className="reveal mb-12 space-y-4">
              {/* Search Bar */}
              <div className="flex justify-center mb-6">
                <form className="relative w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input
                    type="text"
                    placeholder={copy.searchPlaceholder ?? 'Search prompts...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-[50%] border border-white/30 bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-white/40 backdrop-blur-sm transition-all hover:border-white/50 focus:border-white/70 focus:outline-none"
                  />
                </form>
              </div>

              {/* Category Filter Toggle */}
              <div id="useCases" className="flex justify-center mb-2 scroll-mt-28">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="text-xs sm:text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>{copy.navUseCases ?? 'Use Cases'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
              
              {/* Category Filter */}
              {showCategories && (
                <div className="flex flex-wrap justify-center gap-2 pb-4">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-2 text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        selectedCategory === cat
                          ? 'border border-white/80 bg-white/20 text-white'
                          : 'border border-white/20 bg-transparent text-white/60 hover:text-white/80 hover:border-white/40'
                      }`}
                    >
                      {labelForCategory(cat)}
                    </button>
                  ))}
                </div>
              )}

              {/* Style Filter Toggle */}
              <div id="styles" className="flex justify-center mb-2 scroll-mt-28">
                <button
                  onClick={() => setShowStyles(!showStyles)}
                  className="text-xs sm:text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>{copy.navStyles ?? 'Styles'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showStyles ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
              
              {/* Style Filter */}
              {showStyles && (
                <div className="flex flex-wrap justify-center gap-2">
                  {allStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`rounded-full px-4 py-2 text-xs sm:text-sm uppercase tracking-wide transition-all ${
                        selectedStyle === style
                          ? 'border border-white/80 bg-white/20 text-white'
                          : 'border border-white/20 bg-transparent text-white/60 hover:text-white/80 hover:border-white/40'
                      }`}
                    >
                      {labelForStyle(style)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Results Count */}
            <p className="reveal text-center text-white/60 text-sm mb-8" style={{ animationDelay: '0.15s' }}>
              {(copy.resultCountTemplate ?? 'Showing {shown} of {total} prompts')
                .replace('{shown}', String(filteredPrompts.length))
                .replace('{total}', String(prompts.length))}
            </p>

            {/* Prompts Grid */}
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredPrompts.map((prompt) => {
                  const previewImage = (prompt.images && prompt.images.length > 0)
                    ? prompt.images[0]
                    : buildPromptPreviewDataUri(prompt, prompt.style);
                  const promptCats = prompt.useCases || [prompt.category];
                  const promptStyles = prompt.styles || [prompt.style];

                  return (
                    <div
                      key={prompt.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.1] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                    >
                      {/* Preview Image */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-white/10 to-black/20">
                        <PptPreviewImage source={previewImage} alt={prompt.title} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-arsenica text-xl sm:text-2xl leading-tight text-white mb-2 line-clamp-1">
                          {prompt.title}
                        </h3>
                        <p className="font-inter text-[13px] leading-relaxed text-white/50 mb-4 line-clamp-2 flex-1">
                          {prompt.description}
                        </p>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {promptCats.slice(0, 1).map((cat, idx) => (
                            <span key={`cat-${idx}`} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-inter uppercase tracking-[0.12em] text-white/60">
                              {labelForCategory(cat)}
                            </span>
                          ))}
                          {promptStyles.slice(0, 1).map((s, idx) => (
                            <span key={`style-${idx}`} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-inter uppercase tracking-[0.12em] text-white/60">
                              {labelForStyle(s)}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                          className="mt-auto w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[11px] font-inter uppercase tracking-[0.2em] text-white/90 transition-all hover:border-white/40 hover:bg-white/20 active:scale-[0.98]"
                        >
                          {copiedId === prompt.id ? (copy.copied ?? 'Copied!') : (copy.copy ?? 'Copy Prompt')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="reveal text-center py-12">
                <p className="text-white/60 text-lg">No prompts found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #410C01)',
          }}
        />
      </div>
    </div>
  );
}
