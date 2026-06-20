'use client';

import { DEVELOPER_NOTE, SITE } from '@/data/content';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { GsapStaggerReveal } from '@/components/gsap/GsapStaggerReveal';
import { GitHubIcon } from '@/components/ui/GitHubIcon';
import styles from './DeveloperNote.module.css';

export function DeveloperNote() {
  return (
    <section
      className={styles.section}
      id="story"
      aria-labelledby="developer-note-heading"
    >
      <div className={styles.inner}>
        <GsapStaggerReveal stagger={0.09} blur={12} y={24}>
          <p data-stagger className={styles.eyebrow}>
            Why we built it
          </p>
          <h2 data-stagger id="developer-note-heading" className={styles.heading}>
            {DEVELOPER_NOTE.heading}
          </h2>
          <p data-stagger className={styles.quote}>
            <span data-stagger className={styles.quoteChunk}>
              We built ZeroTrace because{' '}
              <span className={`${styles.highlight} ${styles.highlightTeal}`}>sharing</span> a photo
              should not{' '}
              <span className={`${styles.highlight} ${styles.highlightAmber}`}>leak</span> where you
              were standing.
            </span>
            <span data-stagger className={styles.quoteChunk}>
              Everything runs on{' '}
              <span className={`${styles.highlight} ${styles.highlightSage}`}>your device</span>.
            </span>
            <span data-stagger className={styles.quoteChunk}>
              We are still in beta. Verify exports before you share sensitive work.
            </span>
          </p>
        </GsapStaggerReveal>

        <GsapScrollReveal delay={0.15} blur={8} y={18}>
          <div className={styles.footer}>
            <div>
              <p className={styles.name}>{DEVELOPER_NOTE.name}</p>
              <p className={styles.role}>{DEVELOPER_NOTE.role}</p>
            </div>
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <span className={styles.ctaIcon} aria-hidden="true">
                <GitHubIcon size={16} />
              </span>
              GitHub
            </a>
          </div>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
