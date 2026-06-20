import { OBJECTION_COUNTERS, SITE } from '../../data/content';

import { SiteDisclaimer } from '../legal/SiteDisclaimer';

import { GsapScrollReveal } from '../gsap/GsapScrollReveal';

import { Container } from '../layout/Container';

import styles from './Privacy.module.css';

export function Privacy() {
  return (
    <section className={styles.privacy} id="privacy">
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <GsapScrollReveal blur={12} y={28}>
            <h2 className={styles.heading}>Your files never leave your device</h2>
          </GsapScrollReveal>

          <GsapScrollReveal delay={0.08} blur={8} y={20}>
            <blockquote className={styles.quote}>
              ZeroTrace scans, fixes, and exports locally. Review the verification report before
              you share sensitive work.
            </blockquote>
          </GsapScrollReveal>

          <GsapScrollReveal delay={0.16} blur={6} y={12}>
            <div className={styles.links}>
              <a href={SITE.privacyUrl} className={styles.policyLink}>
                Read privacy policy
              </a>
              <a href={SITE.termsUrl} className={styles.policyLink}>
                Terms of use
              </a>
            </div>
            <SiteDisclaimer variant="compact" showLinks={false} />
          </GsapScrollReveal>
        </div>

        <GsapScrollReveal delay={0.1} blur={8} y={20}>
          <div className={styles.objections}>
            {OBJECTION_COUNTERS.map((item) => (
              <article key={item.question} className={styles.objectionCard}>
                <h3 className={styles.objectionQ}>{item.question}</h3>
                <p className={styles.objectionA}>{item.answer}</p>
              </article>
            ))}
          </div>
        </GsapScrollReveal>
      </Container>
    </section>
  );
}
