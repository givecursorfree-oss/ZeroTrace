import { BEFORE_AFTER_EXAMPLE } from '@/data/content';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { Container } from '@/components/layout/Container';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import styles from './BeforeAfter.module.css';

export function BeforeAfter() {
  const { before, after, slider } = BEFORE_AFTER_EXAMPLE;

  return (
    <section className={styles.section} id="proof" aria-labelledby="proof-heading">
      <Container>
        <GsapScrollReveal blur={12} y={28}>
          <header className={styles.header}>
            <h2 id="proof-heading" className={styles.heading}>
              {BEFORE_AFTER_EXAMPLE.heading}
            </h2>
            <p className={styles.lead}>{BEFORE_AFTER_EXAMPLE.lead}</p>
          </header>
        </GsapScrollReveal>

        <div className={styles.layout}>
          <GsapScrollReveal delay={0.06} blur={10} y={22}>
            <BeforeAfterSlider
              beforeSrc={slider.beforeSrc}
              afterSrc={slider.afterSrc}
              beforeAlt={slider.beforeAlt}
              afterAlt={slider.afterAlt}
              fileName={BEFORE_AFTER_EXAMPLE.fileName}
            />
          </GsapScrollReveal>

          <div className={styles.metaColumn}>
            <GsapScrollReveal delay={0.1} blur={8} y={18}>
              <article className={[styles.panel, styles.panelBefore].join(' ')}>
                <div className={styles.panelHead}>
                  <span className={styles.panelTitle}>{before.label}</span>
                  <span className={[styles.badge, styles.badgeRisk].join(' ')}>{before.status}</span>
                </div>
                <dl className={styles.metaList}>
                  {before.fields.map((field) => (
                    <div
                      key={field.key}
                      className={[styles.metaRow, field.risk ? styles.metaRowRisk : ''].join(' ')}
                    >
                      <dt>{field.key}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </GsapScrollReveal>

            <GsapScrollReveal delay={0.14} blur={8} y={18}>
              <article className={[styles.panel, styles.panelAfter].join(' ')}>
                <div className={styles.panelHead}>
                  <span className={styles.panelTitle}>{after.label}</span>
                  <span className={[styles.badge, styles.badgeSafe].join(' ')}>{after.status}</span>
                </div>
                <dl className={styles.metaList}>
                  {after.fields.map((field) => (
                    <div
                      key={field.key}
                      className={[
                        styles.metaRow,
                        'stripped' in field && field.stripped ? styles.metaRowStripped : '',
                      ].join(' ')}
                    >
                      <dt>{field.key}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </GsapScrollReveal>
          </div>
        </div>

        <GsapScrollReveal delay={0.16} blur={6} y={12}>
          <p className={styles.footnote}>{BEFORE_AFTER_EXAMPLE.footnote}</p>
        </GsapScrollReveal>
      </Container>
    </section>
  );
}
