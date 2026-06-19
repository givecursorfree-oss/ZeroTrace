'use client';

import { useEffect, useMemo, useState, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STEPS } from '@/data/content';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { loadFramerVendor } from '@/lib/loadFramerVendor';
import { SCROLL_READY_EVENT } from '@/lib/scroll';
import { HowItWorksStepsFallback } from './HowItWorksStepsFallback';
import { buildPhoneScrollSlides } from './phoneScrollSlides';
import styles from './HowItWorks.module.css';

gsap.registerPlugin(ScrollTrigger);

/** Framer PhoneScrollPro — https://framer.com/m/PhoneScrollPro-UchRHL.js */
export function HowItWorksPhoneScroll() {
  const reducedMotion = usePrefersReducedMotion();
  const slides = useMemo(() => buildPhoneScrollSlides(STEPS), []);
  const [PhoneScrollPro, setPhoneScrollPro] = useState<ElementType | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;

    loadFramerVendor(() => import('@/framer/vendor/PhoneScrollPro.js'))
      .then((component) => {
        if (!cancelled && component) {
          setPhoneScrollPro(() => component);
        } else if (!cancelled) {
          setUseFallback(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUseFallback(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !PhoneScrollPro) return;

    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 350);
    const onScrollReady = () => refresh();
    window.addEventListener(SCROLL_READY_EVENT, onScrollReady);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener(SCROLL_READY_EVENT, onScrollReady);
    };
  }, [reducedMotion, slides.length, PhoneScrollPro]);

  if (reducedMotion || useFallback) {
    return <HowItWorksStepsFallback />;
  }

  if (!PhoneScrollPro) {
    return (
      <div
        className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-parchment-white)] text-sm text-[var(--color-driftwood)]"
        aria-hidden="true"
      >
        Loading steps…
      </div>
    );
  }

  const ScrollComponent = PhoneScrollPro;

  return (
    <div className={styles.scrollWrap}>
      <ScrollComponent
        width="100%"
        height="auto"
        slides={slides}
        phoneWidth={300}
        frameColor="#111111"
        background="#fdfcfc"
        textColor="#000000"
        titleSize={42}
        bodySize={16}
        textMaxWidth={480}
        showCta={false}
        showDots
        dotColor="#777169"
        showProgressBar
        progressBarColor="#000000"
        showAmbientNumber
        tilt
        tiltStrength={10}
        ambientGlow
        glowColor="#186f64"
        glowIntensity={28}
        defaultColorMode="Light"
        demoMode={false}
        style={{ width: '100%' }}
      />
    </div>
  );
}
