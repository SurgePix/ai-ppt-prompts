'use client';

import { withUtm } from '@/features/resources/lib/outbound';

interface HeroProps {
  generateLabel?: string;
  learnLabel?: string;
  description?: string;
}

export function Hero({
  generateLabel = 'Generate PPT',
  learnLabel = 'Learn More',
  description = 'Browse 100+ curated AI prompts for PowerPoint and presentations — each with a real slide preview, use-case and visual-style filters, and copy-ready text to generate professional decks in seconds.',
}: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_130946_e6793cc7-6b6f-4035-9852-44290b781ae6.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Bottom fade — blends the hero video into the dark archive section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4 pb-24">
        {/* Subtitle */}
        <div
          className="hero-fade-up text-[11px] sm:text-sm font-inter font-medium uppercase tracking-[0.4em] text-white/80"
          style={{ animationDelay: '0.1s' }}
        >
          AI Presentation Prompts
        </div>

        {/* Main Heading — AI PPT Prompt Library */}
        <h1
          className="hero-fade-up mt-4 font-arsenica text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[0.98] tracking-wide text-center drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]"
          style={{ animationDelay: '0.25s' }}
        >
          AI PPT Prompt
          <br />
          <span className="italic text-white/95">Library</span>
        </h1>

        {/* Description */}
        <p
          className="hero-fade-up mt-5 font-inter text-sm sm:text-base max-w-xl text-white/70 leading-relaxed text-center"
          style={{ animationDelay: '0.4s' }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-fade-up mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={{ animationDelay: '0.55s' }}
        >
          <a
            href={withUtm('https://surgepix.ai/', { content: 'hero_generate' })}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-3.5 sm:px-10 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-inter font-medium text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
          >
            {generateLabel}
          </a>
          <a
            href={withUtm('https://surgepix.ai/blog/use-cases/complete-slide-deck-guide', { content: 'hero_learn' })}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 bg-white/5 px-8 py-3.5 sm:px-10 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-inter font-medium text-white/90 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 active:scale-[0.98]"
          >
            {learnLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
