'use client';

import dynamic from 'next/dynamic';
import styles from '../sections/HeroSection.module.css';

const Globe = dynamic(() => import('./Globe').then((m) => ({ default: m.Globe })), {
  ssr: false,
  loading: () => <div className={styles.globePlaceholder} aria-hidden="true" />,
});

export function HeroVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <Globe />
    </div>
  );
}
