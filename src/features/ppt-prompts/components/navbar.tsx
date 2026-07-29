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
}

export function Navbar({
  localeOptions = [],
  currentLocale,
  currentLocaleLabel,
  onSwitchLocale,
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

  const LogoSVG = () => (
    <svg
      viewBox="0 0 256 256"
      fill="white"
      className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:scale-110"
    >
      <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" />
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
