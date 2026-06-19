import { ShieldCheck, CloudOff, BarChart3 } from 'lucide-react';
import { PRIVACY_FACTS } from '../../data/content';
import { GsapStaggerReveal } from '../gsap/GsapStaggerReveal';
import { Container } from '../layout/Container';
import styles from './TrustBand.module.css';

const TRUST_ICONS = [ShieldCheck, CloudOff, BarChart3] as const;

export function TrustBand() {
  return (
    <section className={styles.band} aria-label="Privacy principles">
      <Container>
        <div className={styles.card}>
          <GsapStaggerReveal className={styles.list} stagger={0.12}>
            {PRIVACY_FACTS.map((fact, index) => {
              const Icon = TRUST_ICONS[index] ?? ShieldCheck;
              return (
                <div key={fact} className={styles.item} data-stagger>
                  <span className={styles.iconWrap} aria-hidden="true">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span>{fact}</span>
                </div>
              );
            })}
          </GsapStaggerReveal>
        </div>
      </Container>
    </section>
  );
}
