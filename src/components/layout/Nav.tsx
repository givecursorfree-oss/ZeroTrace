'use client';

import { SITE } from '@/data/content';
import { LogoMark } from '@/components/ui/LogoMark';
import { useScrollNav } from '@/hooks/useScrollNav';
import styles from './Nav.module.css';

export function Nav() {
  const scrolled = useScrollNav();

  return (
    <header className={[styles.nav, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="ZeroTrace home">
          <LogoMark size={24} className={styles.mark} priority />
          <span>{SITE.name}</span>
        </a>
        <nav aria-label="Primary">
          <ul className={styles.links}>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
            <li>
              <a href="#download">Download APK</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
