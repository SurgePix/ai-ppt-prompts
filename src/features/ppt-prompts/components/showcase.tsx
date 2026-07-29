'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ReactNode } from 'react';

interface ShowcaseProps {
  children?: ReactNode;
}

export function Showcase({ children }: ShowcaseProps) {
  const containerRef = useScrollReveal();

  return (
    <div className="relative z-20 -mt-64 sm:-mt-72 md:-mt-80 lg:-mt-96">
      {/* Transition Cloud Image */}
      <img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584857/top-bg_j88wyu.png"
        alt="transition"
        className="pointer-events-none w-full"
      />

      {/* Showcase Section */}
      <div
        ref={containerRef}
        className="relative -mt-40 sm:-mt-48 md:-mt-56 lg:-mt-64 min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_040223_98d314e9-b8b4-4218-bcbd-18ffc38032ac.png&w=1280&q=85)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dove Image - Absolute positioned */}
        <img
          src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584853/dove_xpaeub.png"
          alt="dove"
          className="absolute right-0 -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 z-20 w-24 sm:w-32 md:w-48 lg:w-64 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center py-32 px-4">
          {children ? (
            children
          ) : (
            <>
              {/* Heading */}
              <h2 className="reveal font-arsenica text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
                Still Frame
              </h2>

              {/* Subtext */}
              <div
                className="reveal mt-6 font-arsenica text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)] text-center"
                style={{ animationDelay: '0.15s' }}
              >
                <p>gave the world beauty</p>
                <p>born from the silence</p>
                <p>of empty studios.</p>
              </div>

              {/* Button */}
              <button
                className="reveal mt-8 rounded-[50%] border border-white/50 bg-transparent px-10 py-4 sm:px-12 sm:py-5 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-inter text-white transition-all hover:border-white hover:bg-white/10 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                style={{ animationDelay: '0.3s' }}
              >
                View Their Archive
              </button>
            </>
          )}
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
