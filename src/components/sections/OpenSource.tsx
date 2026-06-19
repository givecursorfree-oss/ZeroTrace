import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SECTION_LEADS, SITE } from '../../data/content';
import { GsapScrollReveal } from '../gsap/GsapScrollReveal';
import { Container } from '../layout/Container';
import styles from './OpenSource.module.css';

export function OpenSource() {
  return (
    <section className={styles.section} id="open-source" aria-labelledby="open-source-heading">
      <Container>
        <GsapScrollReveal>
          <div className={styles.card}>
            <div>
              <p className={styles.eyebrow}>Open source</p>
              <h2 id="open-source-heading" className={styles.heading}>
                A native app you can verify
              </h2>
              <p className={styles.lead}>{SECTION_LEADS.openSource}</p>
            </div>
            <div className={styles.actions}>
              <Link href={SITE.getAppPath} className="btn-primary gap-2 px-6 py-3">
                Get the app
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary gap-2 px-6 py-3"
              >
                Source on GitHub
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </GsapScrollReveal>
      </Container>
    </section>
  );
}
