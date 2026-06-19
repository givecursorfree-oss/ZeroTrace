'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SCROLL_READY_EVENT } from '@/lib/scroll';
import styles from './GsapScrollReveal.module.css';

interface GsapScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.visualViewport?.height ?? window.innerHeight;
  return rect.top < vh * 0.94 && rect.bottom > 0;
}

/** Cinematic scroll reveal — fade, lift, and blur resolve. Lenis-safe. */
export function GsapScrollReveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = 10,
}: GsapScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1, y: 0, filter: 'none', clearProps: 'all' });
        return;
      }

      gsap.set(el, {
        opacity: 0,
        y,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          delay,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(el, { filter: 'none', clearProps: 'filter' });
          },
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            play();
            observer.disconnect();
          }
        },
        { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.12 },
      );

      observer.observe(el);

      const checkNow = () => {
        if (isInViewport(el)) {
          play();
          observer.disconnect();
        }
      };

      requestAnimationFrame(checkNow);
      window.addEventListener(SCROLL_READY_EVENT, checkNow, { once: true });

      return () => {
        observer.disconnect();
        window.removeEventListener(SCROLL_READY_EVENT, checkNow);
      };
    },
    { scope: ref, dependencies: [delay, y, blur] },
  );

  return (
    <div ref={ref} className={[styles.pending, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
