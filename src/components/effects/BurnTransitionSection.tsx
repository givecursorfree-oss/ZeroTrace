'use client';

import { useRef } from 'react';
import { BurnPlus } from './BurnPlus';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './BurnTransitionSection.module.css';

/**
 * Sticky scroll runway for Framer Burn+ transform-on-scroll.
 * Burns through a texture to reveal the page below.
 */
export function BurnTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={styles.fallback} aria-hidden="true" />;
  }

  return (
    <section ref={sectionRef} className={styles.runway} aria-hidden="true">
      <div className={styles.sticky}>
        <BurnPlus sectionRef={sectionRef} mode="scroll" />
      </div>
    </section>
  );
}
