import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/content';
import { SiteDisclaimer } from '@/components/legal/SiteDisclaimer';
import { createPageMetadata } from '@/lib/seo/metadata';
import styles from './legal.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'ZeroTrace privacy policy: local-only file scanning, no uploads, no accounts, no analytics. How your data stays on your device.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          Back to {SITE.name}
        </Link>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: June 19, 2026</p>

        <SiteDisclaimer variant="banner" />

        <section className={styles.section}>
          <h2>Summary</h2>
          <p>
            ZeroTrace is privacy-first software. Your files are scanned, sanitized, and exported on
            your device. We do not receive, store, or process your file contents on our servers.
            This policy describes our intent as an open-source project — not a formal data-processing
            agreement.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What we do not collect</h2>
          <ul>
            <li>File contents you scan, edit, or export</li>
            <li>Account credentials (no account is required)</li>
            <li>Contact lists, photos, or device storage outside files you choose to open</li>
            <li>Persistent advertising or behavioral analytics tied to your identity</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Local processing</h2>
          <p>
            All detection, redaction, and export operations run on your phone or computer. Network
            access is used only when you explicitly download updates or visit linked resources (for
            example, this website or the open-source repository).
          </p>
        </section>

        <section className={styles.section}>
          <h2>Website</h2>
          <p>
            This marketing site may log standard web server data (such as IP address, browser type,
            and pages visited) to keep the service secure and measure aggregate traffic. We do not
            sell personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Downloads</h2>
          <p>
            When you download the Android APK or Windows build, your platform provider may record
            download metadata. Verify checksums published in the{' '}
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub releases
            </a>{' '}
            before installing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Open source</h2>
          <p>
            ZeroTrace source code is public. You can review how the app works, build it yourself, and
            report security issues through GitHub.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Children</h2>
          <p>ZeroTrace is not directed at children under 13. We do not knowingly collect data from children.</p>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>
            We may update this policy when the product or legal requirements change. Material updates
            will be reflected on this page with a new &quot;Last updated&quot; date.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            Questions about privacy: open an issue on{' '}
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            or contact the maintainers listed in the repository.
          </p>
        </section>
      </div>
    </main>
  );
}
