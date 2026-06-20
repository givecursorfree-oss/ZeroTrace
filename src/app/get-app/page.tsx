import type { Metadata } from 'next';
import Link from 'next/link';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { ArrowLeft } from 'lucide-react';
import { GetAppPlatforms } from '@/components/get-app/GetAppPlatforms';
import { BRAND, GET_APP_PAGE, LEGAL, SITE } from '@/data/content';
import { createPageMetadata } from '@/lib/seo/metadata';
import styles from './get-app.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Download ZeroTrace APK for Android and Windows',
  description:
    'Download ZeroTrace for Android (arm64 APK). Privacy-first file sanitizer. Strip metadata, blur faces, catch secrets. 100% on-device. Source on GitHub.',
  path: '/get-app',
  keywords: [
    'ZeroTrace download',
    'ZeroTrace APK',
    'Android privacy app download',
    'metadata remover APK',
    'open source file sanitizer',
  ],
});

export default function GetAppPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topInner}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            Back to home
          </Link>
          <span className={styles.versionPill}>
            {SITE.versionLabel} v{SITE.version}
          </span>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="get-app-heading">
        <div className={styles.heroInner}>
          <ProtectedImage
            src={BRAND.full}
            alt={BRAND.fullAlt}
            width={360}
            height={160}
            priority
            sizes="(max-width: 768px) 280px, 360px"
            className={styles.logo}
          />
          <div className={styles.heroCopy}>
            <h1 id="get-app-heading" className={styles.heading}>
              {GET_APP_PAGE.heading}
            </h1>
            <p className={styles.lead}>{GET_APP_PAGE.lead}</p>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <GetAppPlatforms />

        <ol className={styles.steps} aria-label="Install steps">
          {GET_APP_PAGE.steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepIndex} aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.verify}>
          <p>{GET_APP_PAGE.verifyNote}</p>
          <a href={SITE.releaseNotesUrl} target="_blank" rel="noopener noreferrer">
            View releases on GitHub
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-[var(--color-driftwood)]">{LEGAL.ctaDisclaimer}</p>
      </main>

      <footer className={styles.footer}>© 2026 {SITE.name}. Open-source beta software.</footer>
    </div>
  );
}
