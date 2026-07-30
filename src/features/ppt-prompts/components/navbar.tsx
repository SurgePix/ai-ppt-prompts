'use client';

import { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LocaleOption {
  value: string;
  label: string;
}

interface NavbarProps {
  localeOptions?: LocaleOption[];
  currentLocale?: string;
  currentLocaleLabel?: string;
  onSwitchLocale?: (locale: string) => void;
  githubUrl?: string;
}

export function Navbar({
  localeOptions = [],
  currentLocale,
  currentLocaleLabel,
  onSwitchLocale,
  githubUrl = 'https://github.com/SurgePix/ai-ppt-prompts',
}: NavbarProps) {
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false);
  const localeMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLocaleMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!localeMenuRef.current?.contains(event.target as Node)) {
        setIsLocaleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isLocaleMenuOpen]);

  const navigateTo = (target: 'library' | 'useCases' | 'styles') => {
    window.dispatchEvent(new CustomEvent('ppt:navigate', { detail: target }));
  };

  const trackGithubClick = () => {
    const gtag = (window as Window & {
      gtag?: (command: 'event', eventName: string, params: Record<string, string>) => void;
    }).gtag;
    gtag?.('event', 'cta_click', { button_name: 'github_star_nav' });
  };

  const GithubSVG = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-[15px] w-[15px]" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );

  /* SurgePix mark, flattened to a white silhouette with the eyes knocked out —
     the brand gradient reads as mud against the glass pill at this size. */
  const LogoSVG = () => (
    <svg
      viewBox="0 0 34 38"
      fill="white"
      className="h-5 w-auto sm:h-6 transition-transform hover:scale-110"
      aria-label="SurgePix"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8 0.799999C7.51555 0.799999 0.800049 7.70845 0.800049 16.231V36.7197C1.18827 36.783 4.34239 37.2517 6.72446 34.9188C7.87154 33.7945 7.70877 32.7766 8.60493 31.6568C9.70249 30.4652 12.3104 31.3108 13.1455 31.4208C13.1514 31.4224 13.1572 31.4224 13.1631 31.4239C14.0186 31.5806 14.9005 31.662 15.8 31.662C24.0845 31.662 30.8 24.7535 30.8 16.231C30.8 7.70845 24.0845 0.799999 15.8 0.799999ZM20.5598 13.6524V14.8611C20.5598 15.4609 20.0866 15.9477 19.5035 15.9477C18.9205 15.9477 18.4458 15.4609 18.4458 14.8611V13.6524C18.4458 13.0511 18.919 12.5643 19.5035 12.5643C19.7951 12.5643 20.0588 12.6863 20.2507 12.8823C20.4411 13.0797 20.5598 13.351 20.5598 13.6524ZM26.1414 13.6524V14.8611C26.1414 15.4609 25.6683 15.9477 25.0837 15.9477C24.4992 15.9477 24.026 15.4609 24.026 14.8611V13.6524C24.026 13.0511 24.5007 12.5643 25.0837 12.5643C25.3767 12.5643 25.6404 12.6863 25.8323 12.8823C26.0228 13.0797 26.1414 13.351 26.1414 13.6524Z"
      />
    </svg>
  );

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 sm:top-6 z-50" ref={localeMenuRef}>
      <div className="liquid-glass rounded-full px-4 py-2 sm:px-8 sm:py-2.5">
        <div className="flex items-center gap-3 sm:gap-8">
          <button
            type="button"
            onClick={() => navigateTo('library')}
            className="text-[10px] sm:text-xs uppercase font-medium tracking-[0.15em] sm:tracking-[0.2em] text-white/85 hover:text-white transition-colors"
          >
            Library
          </button>
          <button
            type="button"
            onClick={() => navigateTo('useCases')}
            className="hidden sm:inline text-xs uppercase font-medium tracking-[0.2em] text-white/85 hover:text-white transition-colors"
          >
            Use Cases
          </button>
          <LogoSVG />
          <button
            type="button"
            onClick={() => navigateTo('styles')}
            className="hidden sm:inline text-xs uppercase font-medium tracking-[0.2em] text-white/85 hover:text-white transition-colors"
          >
            Styles
          </button>

          {/* GitHub — open-source repo for this prompt library */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGithubClick}
            title="Star on GitHub"
            aria-label="Star this prompt library on GitHub"
            className="flex items-center gap-1.5 text-white/85 transition-colors hover:text-white"
          >
            <GithubSVG />
            <span className="hidden sm:inline text-xs uppercase font-medium tracking-[0.2em]">
              Star
            </span>
          </a>

          {/* Language Switcher Button */}
          {localeOptions.length > 0 && (
            <button
              type="button"
              onClick={() => setIsLocaleMenuOpen((open) => !open)}
              className="flex items-center gap-1 text-[10px] sm:text-xs uppercase font-medium tracking-[0.15em] sm:tracking-[0.2em] text-white/85 hover:text-white transition-colors"
            >
              <Globe size={13} />
              <span className="hidden sm:inline">{currentLocaleLabel}</span>
              <ChevronDown
                size={13}
                className={`transition-transform ${isLocaleMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Language Dropdown — rendered outside the overflow-hidden pill so it isn't clipped.
          Uses manual frosted styling (not the .liquid-glass class) because that class forces
          position:relative, which would break the absolute positioning. */}
      {localeOptions.length > 0 && isLocaleMenuOpen && (
        <div className="absolute right-4 sm:right-8 top-full mt-3 w-40 overflow-hidden rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl shadow-[0_18px_36px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div className="p-1.5">
            {localeOptions.map((option) => {
              const isActive = currentLocale === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setIsLocaleMenuOpen(false);
                    onSwitchLocale?.(option.value);
                  }}
                  className={`flex w-full items-center rounded-xl px-3 py-1.5 text-left text-xs font-inter tracking-wide transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
