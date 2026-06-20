import { FEATURES, SECTION_LEADS } from '../../data/content';
import { RIVE } from '../../data/rive';
import { GsapScrollReveal } from '../gsap/GsapScrollReveal';
import { GsapStaggerReveal } from '../gsap/GsapStaggerReveal';
import { Container } from '../layout/Container';
import { RiveStage } from '../rive/RiveStage';
import { FeatureIcon } from './FeatureIcon';
import styles from './Features.module.css';

const BURST_HEIGHT = 400;

export function Features() {
  return (
    <section className={styles.section} id="features">
      <Container>
        <div className={styles.hero}>
          <GsapScrollReveal blur={12} y={28}>
            <header className={styles.headerCopy}>
              <h2 className={styles.heading}>What ZeroTrace finds</h2>
              <p className={styles.lead}>{SECTION_LEADS.features}</p>
            </header>
          </GsapScrollReveal>

          <GsapScrollReveal delay={0.08} blur={10} y={24}>
            <div className={styles.burstZone} aria-hidden="true">
              <div className={styles.burstGlow} />
              <RiveStage
                src={RIVE.scanBurst}
                ariaLabel="Animation highlighting detected privacy risks"
                minHeight={BURST_HEIGHT}
                fit="cover"
                interactive={false}
                className={styles.burst}
              />
            </div>
          </GsapScrollReveal>
        </div>

        <GsapStaggerReveal stagger={0.07} blur={8}>
          <div className={styles.grid}>
            {FEATURES.map((feature) => (
              <article key={feature.id} data-stagger className={styles.tile}>
                <FeatureIcon id={feature.id} className={styles.icon} />
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.desc}>{feature.description}</p>
              </article>
            ))}
          </div>
        </GsapStaggerReveal>
      </Container>
    </section>
  );
}
