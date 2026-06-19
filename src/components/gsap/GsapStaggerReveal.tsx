'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SCROLL_READY_EVENT } from '@/lib/scroll';
import styles from './GsapStaggerReveal.module.css';

interface GsapStaggerRevealProps {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
  blur?: number;
  y?: number;
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.visualViewport?.height ?? window.innerHeight;
  return rect.top < vh * 0.94 && rect.bottom > 0;
}

/** Staggered blur scroll reveal — Lenis-safe. */
export function GsapStaggerReveal({
  children,
  className,
  childSelector = '[data-stagger]',
  stagger = 0.1,
  blur = 8,
  y = 20,
}: GsapStaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = gsap.utils.toArray<HTMLElement>(childSelector, el);
      if (!targets.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1, filter: 'none', clearProps: 'all' });
        return;
      }

      gsap.set(targets, {
        opacity: 0,
        y,
        scale: 0.98,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(targets, { filter: 'none', clearProps: 'filter' });
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
    { scope: ref, dependencies: [childSelector, stagger, blur, y] },
  );

  return (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
