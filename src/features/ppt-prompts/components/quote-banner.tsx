'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useRef, useState, useEffect } from 'react';

export function QuoteBanner() {
  const containerRef = useScrollReveal();
  const bottomOverlayRef = useRef<HTMLImageElement>(null);
  const [offsetProgress, setOffsetProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!bottomOverlayRef.current) return;
      const rect = bottomOverlayRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - rect.bottom / (viewportHeight + rect.height);
      setOffsetProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-start lg:items-start lg:justify-start lg:pt-[25vh] px-4"
      style={{
        backgroundImage:
          'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_042421_41f4fa0b-770c-4545-a416-73a809366e49.png&w=1280&q=85)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Quote */}
      <div className="relative z-10 flex items-center justify-center lg:justify-start pt-20 lg:pt-0">
        <blockquote className="reveal-scale max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
          <p className="font-arsenica text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug lg:leading-tight text-white">
            Art, resilience and vision
            <span className="font-light italic"> are more important than ever.</span>
          </p>
        </blockquote>
      </div>

      {/* Parallax Bottom Overlay */}
      <img
        ref={bottomOverlayRef}
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584854/bottom_bg_liw6lc.png"
        alt="bottom overlay"
        className="absolute -bottom-16 left-0 w-full z-10 pointer-events-none"
        style={{
          transform: `translateY(-${offsetProgress * 80}px)`,
        }}
      />
    </section>
  );
}
