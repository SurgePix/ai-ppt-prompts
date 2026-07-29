'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Detects whether the page is currently scrolling.
 * Returns `isScrolling: true` during active scroll, `false` when idle.
 *
 * Uses requestAnimationFrame-based detection with a 150ms debounce
 * to avoid excessive state updates. The idle timeout is configurable.
 */
export function useScrollState(idleTimeoutMs = 150) {
  const [isScrolling, setIsScrolling] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    if (Math.abs(currentY - lastScrollYRef.current) < 1) {
      return;
    }

    lastScrollYRef.current = currentY;

    if (!isScrolling) {
      setIsScrolling(true);
    }

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setIsScrolling(false);
      timeoutIdRef.current = null;
    }, idleTimeoutMs);
  }, [isScrolling, idleTimeoutMs]);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current) {
        return;
      }
      rafIdRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [handleScroll]);

  return isScrolling;
}