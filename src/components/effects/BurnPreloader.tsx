'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './BurnPreloader.module.css';

const PRELOADER_SEEN_KEY = 'zerotrace:preloader-seen';

const BurnPlusPreloaderInner = dynamic(
  () =>
    import('./BurnPlusPreloaderInner').then((m) => ({
      default: m.BurnPlusPreloaderInner,
    })),
  { ssr: false },
);

function finishPreloader(setPhase: (p: 'loading' | 'exiting' | 'done') => void) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PRELOADER_SEEN_KEY, '1');
    window.dispatchEvent(new CustomEvent('preloader:done'));
  }
  setPhase('exiting');
}

export function BurnPreloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');

  useEffect(() => {
    if (reducedMotion) {
      setPhase('done');
      window.dispatchEvent(new CustomEvent('preloader:done'));
      return;
    }

    if (window.localStorage.getItem(PRELOADER_SEEN_KEY) === '1') {
      setPhase('done');
      window.dispatchEvent(new CustomEvent('preloader:done'));
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== 'loading') return;
    const fallback = window.setTimeout(() => finishPreloader(setPhase), 4500);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    if (reducedMotion) return;
    document.body.style.overflow = phase === 'loading' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase, reducedMotion]);

  const handleBurnComplete = useCallback(() => {
    finishPreloader(setPhase);
  }, []);

  const handleSkip = useCallback(() => {
    finishPreloader(setPhase);
  }, []);

  const handleFadeEnd = useCallback(() => {
    if (phase === 'exiting') {
      setPhase('done');
    }
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={[styles.overlay, phase === 'exiting' ? styles.exiting : ''].join(' ')}
      onTransitionEnd={handleFadeEnd}
    >
      {phase === 'loading' ? (
        <button type="button" className={styles.skip} onClick={handleSkip}>
          Skip intro
        </button>
      ) : null}
      <div className={styles.burnLayer} aria-hidden="true">
        <BurnPlusPreloaderInner onAnimationComplete={handleBurnComplete} />
      </div>
    </div>
  );
}
