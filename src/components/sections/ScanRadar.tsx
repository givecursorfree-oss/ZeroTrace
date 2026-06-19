import { SECTION_LEADS } from '@/data/content';
import { GsapScrollReveal } from '@/components/gsap/GsapScrollReveal';
import { Container } from '@/components/layout/Container';
import { ScanRadarLoader } from './ScanRadarLoader';
import styles from './ScanRadar.module.css';

/** Live scan preview — CSS radar animation (no Rive). */
export function ScanRadar() {
  return (
    <section className={styles.section} id="live-scan" aria-labelledby="live-scan-heading">
      <Container>
        <div className={styles.grid}>
          <GsapScrollReveal blur={12} y={32}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>On-device scan</p>
              <h2 id="live-scan-heading" className={styles.heading}>
                See risks before you share
              </h2>
              <p className={styles.lead}>{SECTION_LEADS.liveScan}</p>
              <ul className={styles.list}>
                <li>GPS and EXIF in photos</li>
                <li>Hidden PDF and archive metadata</li>
                <li>Faces, plates, and exposed secrets</li>
              </ul>
            </div>
          </GsapScrollReveal>

          <GsapScrollReveal delay={0.1} blur={10} y={24}>
            <div className={styles.radarAside}>
              <p className={styles.radarHint}>Live scan</p>
              <ScanRadarLoader />
            </div>
          </GsapScrollReveal>
        </div>
      </Container>
    </section>
  );
}
