'use client';

import Lenis from 'lenis';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { PRELOADER_DONE_EVENT, PRELOADER_STORAGE_KEY } from '@/lib/preloader';
import { SCROLL_READY_EVENT } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

interface LenisProviderProps {
  children: ReactNode;
}

function waitForPreloader(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.localStorage.getItem(PRELOADER_STORAGE_KEY) === '1') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener(PRELOADER_DONE_EVENT, () => resolve(), { once: true });
    window.setTimeout(resolve, 7000);
  });
}

/** Smooth scroll via Lenis, synced to GSAP ScrollTrigger. */
export function LenisProvider({ children }: LenisProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      window.dispatchEvent(new CustomEvent(SCROLL_READY_EVENT));
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      await waitForPreloader();
      if (disposed) return;

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 0.95,
        syncTouch: true,
        syncTouchLerp: 0.085,
        autoRaf: false,
      });
      lenisRef.current = lenis;

      let scrollUpdateQueued = false;
      lenis.on('scroll', () => {
        if (scrollUpdateQueued) return;
        scrollUpdateQueued = true;
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          scrollUpdateQueued = false;
        });
      });

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          const vh = window.visualViewport?.height ?? window.innerHeight;
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: vh,
          };
        },
      });

      const tickerRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerRaf);
      gsap.ticker.lagSmoothing(500, 16);

      let refreshTimer: ReturnType<typeof setTimeout> | undefined;
      const onRefresh = () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
          lenis.resize();
        }, 120);
      };
      ScrollTrigger.addEventListener('refresh', onRefresh);
      ScrollTrigger.refresh();
      window.dispatchEvent(new CustomEvent(SCROLL_READY_EVENT));

      const lateRefresh = window.setTimeout(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new CustomEvent(SCROLL_READY_EVENT));
      }, 400);

      cleanup = () => {
        clearTimeout(refreshTimer);
        window.clearTimeout(lateRefresh);
        gsap.ticker.remove(tickerRaf);
        ScrollTrigger.removeEventListener('refresh', onRefresh);
        ScrollTrigger.scrollerProxy(document.documentElement, {});
        lenis.destroy();
        lenisRef.current = null;
      };

      if (disposed) {
        cleanup();
        cleanup = undefined;
      }
    };

    void boot();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
