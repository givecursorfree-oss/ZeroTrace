import { STEPS } from '@/data/content';
import { STEP_MOCKUPS } from '@/data/mockups';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { Container } from '@/components/layout/Container';
import styles from './HowItWorksSteps.module.css';

/** Static step cards for reduced-motion users. */
export function HowItWorksStepsFallback() {
  return (
    <Container>
      <ol className={styles.steps}>
        {STEPS.map((step, index) => {
          const mockup = STEP_MOCKUPS[index];
          return (
            <GsapScrollReveal key={step.id} delay={index * 0.08}>
              <li className={styles.step}>
                <div className={styles.stepGrid}>
                  <div className={styles.copy}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.desc}>{step.description}</p>
                  </div>
                  <div className={styles.mockupShell}>
                    <div className={styles.mockupBezel}>
                      <div className={styles.mockupScreen}>
                        {mockup ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={mockup.src}
                            alt={mockup.alt}
                            className={`${styles.mockupImage} protected-asset`}
                            data-protected-asset="true"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </GsapScrollReveal>
          );
        })}
      </ol>
    </Container>
  );
}
