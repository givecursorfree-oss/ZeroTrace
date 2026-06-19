import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/content';
import { SiteDisclaimer } from '@/components/legal/SiteDisclaimer';
import { createPageMetadata } from '@/lib/seo/metadata';
import styles from '../privacy/legal.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Use',
  description:
    'Terms for using ZeroTrace open-source software and this marketing website. Beta software disclaimer included.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          Back to {SITE.name}
        </Link>

        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.updated}>Last updated: June 19, 2026</p>

        <SiteDisclaimer variant="banner" />

        <section className={styles.section}>
          <h2>Agreement</h2>
          <p>
            By downloading, installing, or using ZeroTrace (&quot;the Software&quot;) or browsing this
            website, you accept these informal terms. If you do not agree, do not use the Software.
            These terms are not a substitute for advice from a lawyer in your jurisdiction.
          </p>
        </section>

        <section className={styles.section}>
          <h2>License</h2>
          <p>
            ZeroTrace is distributed as open-source software under the license published in the{' '}
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>
            . Your use of the source code is governed by that license.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Beta software</h2>
          <p>
            ZeroTrace is currently offered as a beta. Features may change, and you may encounter
            bugs. Back up important files before sanitizing or exporting. Test outputs before sharing
            sensitive material.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your responsibilities</h2>
          <ul>
            <li>You are responsible for files you choose to scan, modify, or share.</li>
            <li>You must comply with applicable laws when handling personal or confidential data.</li>
            <li>Review exported files to confirm redactions meet your requirements.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>No warranty</h2>
          <p>
            The Software is provided &quot;as is&quot; without warranty of any kind, to the extent
            permitted by applicable law. We do not guarantee that every risk in a file will be
            detected or removed, or that use of the app satisfies any legal, regulatory, or
            contractual obligation. Automated tools cannot replace human review for high-stakes
            sharing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, the authors and contributors are not liable for
            damages arising from use of the Software, including data loss, disclosure of sensitive
            information, or reliance on scan results.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Third-party services</h2>
          <p>
            Links to external sites (for example GitHub or download mirrors) are provided for
            convenience. We are not responsible for third-party content or policies.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>We may update these terms. Continued use after updates constitutes acceptance.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            Legal or licensing questions: use the issue tracker on{' '}
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
