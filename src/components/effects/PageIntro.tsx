'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './PageIntro.module.css';

const INTRO_SEEN_KEY = 'zerotrace:intro-seen';

/** Brief parchment fade on first visit — no WebGL, no burn. */
export function PageIntro() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'idle' | 'fade' | 'done'>('idle');

  useEffect(() => {
    if (reducedMotion || window.localStorage.getItem(INTRO_SEEN_KEY) === '1') {
      setPhase('done');
      return;
    }

    setPhase('fade');
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(INTRO_SEEN_KEY, '1');
      setPhase('done');
    }, 700);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  if (phase === 'done') return null;

  return (
    <div
      className={[styles.layer, phase === 'fade' ? styles.fadeOut : ''].join(' ')}
      aria-hidden="true"
    />
  );
}
