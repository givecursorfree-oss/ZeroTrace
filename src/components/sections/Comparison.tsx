import { COMPARISON, SITE } from '@/data/content';
import { LogoMark } from '@/components/ui/LogoMark';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { GsapStaggerReveal } from '@/components/gsap/GsapStaggerReveal';
import { Container } from '@/components/layout/Container';
import styles from './Comparison.module.css';

export function Comparison() {
  return (
    <section className={styles.section} id="compare" aria-labelledby="compare-heading">
      <Container>
        <GsapScrollReveal blur={12} y={28}>
          <header className={styles.header}>
            <h2 id="compare-heading" className={styles.heading}>
              {COMPARISON.heading}
            </h2>
            <p className={styles.lead}>{COMPARISON.lead}</p>
          </header>
        </GsapScrollReveal>

        <GsapStaggerReveal stagger={0.05} blur={4} y={12} childSelector="tbody tr">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className={styles.srOnly}>
                Comparison of sending raw files, cloud redaction tools, and ZeroTrace
              </caption>
              <colgroup>
                <col className={styles.colFeature} />
                <col className={styles.colPlain} />
                <col className={styles.colPlain} />
                <col className={styles.colBrand} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className={styles.corner}>
                    What matters
                  </th>
                  {COMPARISON.columns.map((col) =>
                    col.id === 'zerotrace' ? (
                      <th key={col.id} scope="col" className={styles.colHighlight}>
                        <div className={styles.brandHead}>
                          <LogoMark size={36} className={styles.brandLogo} />
                          <span className={styles.brandName}>{SITE.name}</span>
                        </div>
                      </th>
                    ) : (
                      <th key={col.id} scope="col" className={styles.colHead}>
                        {col.label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className={styles.rowLabel}>
                      {row.label}
                    </th>
                    <td>{row.raw}</td>
                    <td>{row.cloud}</td>
                    <td className={styles.cellHighlight}>{row.zerotrace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GsapStaggerReveal>

        <GsapStaggerReveal stagger={0.08} blur={6}>
          <div className={styles.cards}>
            {COMPARISON.columns.map((col) => (
              <article
                key={col.id}
                data-stagger
                className={[
                  styles.card,
                  col.id === 'zerotrace' ? styles.cardHighlight : '',
                ].join(' ')}
              >
                {col.id === 'zerotrace' ? (
                  <div className={styles.brandHead}>
                    <LogoMark size={32} className={styles.brandLogo} />
                    <h3 className={styles.cardTitleBrand}>{SITE.name}</h3>
                  </div>
                ) : (
                  <h3 className={styles.cardTitle}>{col.label}</h3>
                )}
                <ul className={styles.cardList}>
                  {COMPARISON.rows.map((row) => (
                    <li key={row.label}>
                      <span className={styles.cardKey}>{row.label}</span>
                      <span className={styles.cardVal}>{row[col.id]}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </GsapStaggerReveal>

        <GsapScrollReveal delay={0.14} blur={6} y={12}>
          <p className={styles.disclaimer}>{COMPARISON.disclaimer}</p>
        </GsapScrollReveal>
      </Container>
    </section>
  );
}
