'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useRef, useState, useEffect } from 'react';
import { PPT_PROMPT_FAQ } from '@/features/ppt-prompts/lib/ppt-prompts-faq';

const QA_DATA = PPT_PROMPT_FAQ;

export function QAndA() {
  const containerRef = useScrollReveal();
  const cloudRef = useRef<HTMLImageElement>(null);
  const [offsetProgress, setOffsetProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cloudRef.current) return;
      const rect = cloudRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - rect.bottom / (viewportHeight + rect.height);
      setOffsetProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftQA = QA_DATA.filter((item) => item.column === 0);
  const rightQA = QA_DATA.filter((item) => item.column === 1);

  return (
    <section ref={containerRef} className="relative bg-[#410C01] overflow-hidden">
      <div
        className="px-4 sm:px-12 md:px-16 lg:px-28 pt-20 sm:pt-24 md:pt-32 lg:pt-32"
        style={{ paddingBottom: '50vh' }}
      >
        {/* Title */}
        <div className="reveal flex items-baseline justify-center gap-1 mb-16 sm:mb-20 md:mb-24">
          <span className="font-arsenica text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            Q
          </span>
          <span className="font-arsenica text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 italic">
            &
          </span>
          <span className="font-arsenica text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            A
          </span>
        </div>

        {/* Q&A Grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-12 md:space-y-16">
            {leftQA.map((item, idx) => (
              <div key={idx} className="reveal" style={{ animationDelay: `${0.12 * (idx + 1)}s` }}>
                <h3 className="font-arsenica text-xs sm:text-sm md:text-base uppercase tracking-wide text-white mb-3">
                  {item.q}
                </h3>
                <p className="font-inter text-[11px] sm:text-sm leading-relaxed text-white/60">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Offset */}
          <div className="space-y-12 md:space-y-16 md:mt-24">
            {rightQA.map((item, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{ animationDelay: `${0.12 * (idx + 4)}s` }}
              >
                <h3 className="font-arsenica text-xs sm:text-sm md:text-base uppercase tracking-wide text-white mb-3">
                  {item.q}
                </h3>
                <p className="font-inter text-[11px] sm:text-sm leading-relaxed text-white/60">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Cloud Overlay */}
      <img
        ref={cloudRef}
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584857/top-bg_j88wyu.png"
        alt="cloud overlay"
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
        style={{
          transform: `translateY(${offsetProgress * 30}px)`,
        }}
      />
    </section>
  );
}
