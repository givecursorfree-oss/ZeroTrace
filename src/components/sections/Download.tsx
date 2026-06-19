import { SITE } from '../../data/content';
import { GsapScrollReveal } from '../gsap/GsapScrollReveal';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import styles from './Download.module.css';

export function Download() {
  return (
    <section className={styles.download} id="download">
      <Container>
        <GsapScrollReveal>
          <h2 className={styles.headline}>Download ZeroTrace</h2>
          <p className={styles.lead}>{SITE.apkMeta}</p>
          <p className={styles.platforms}>{SITE.platforms}</p>
        </GsapScrollReveal>
        <GsapScrollReveal delay={0.1}>
          <Button href={SITE.downloadUrl}>Download APK</Button>
        </GsapScrollReveal>
      </Container>
    </section>
  );
}
