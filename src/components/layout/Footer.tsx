import Link from 'next/link';
import { SiteDisclaimer } from '@/components/legal/SiteDisclaimer';
import { LogoMark } from '@/components/ui/LogoMark';
import { HERO_CENTER_NAV, SITE } from '../../data/content';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink}>
            <LogoMark size={36} className="rounded-md" />
            <span className={styles.wordmark}>{SITE.name}</span>
          </Link>
          <p className={styles.tagline}>{SITE.tagline}</p>
          <p className={styles.meta}>
            {SITE.versionLabel} · v{SITE.version} · {SITE.platforms}
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          {HERO_CENTER_NAV.map((link) => (
            <Link key={link.href + link.label} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.legal}>
          <Link href={SITE.privacyUrl} className={styles.link}>
            Privacy policy
          </Link>
          <Link href={SITE.termsUrl} className={styles.link}>
            Terms of use
          </Link>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </div>
      </div>

      <SiteDisclaimer variant="footer" />

      <p className={styles.copy}>© 2026 {SITE.name}. Open-source beta software.</p>
    </footer>
  );
}
