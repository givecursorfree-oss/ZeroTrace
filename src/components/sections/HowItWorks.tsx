import { SECTION_LEADS } from '@/data/content';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { Container } from '@/components/layout/Container';
import { HowItWorksPhoneScroll } from './how-it-works/HowItWorksPhoneScroll';
import styles from './how-it-works/HowItWorks.module.css';

export function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <Container>
        <GsapScrollReveal>
          <div className={styles.intro}>
            <h2 className={styles.heading}>Scan, sanitize, share on your device</h2>
            <p className={styles.lead}>{SECTION_LEADS.howItWorks}</p>
          </div>
        </GsapScrollReveal>
      </Container>

      <div className={styles.scrollStage} aria-label="How ZeroTrace works in three steps">
        <HowItWorksPhoneScroll />
      </div>
    </section>
  );
}
