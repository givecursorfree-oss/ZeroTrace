import Link from 'next/link';
import { LEGAL, SITE } from '@/data/content';
import styles from './SiteDisclaimer.module.css';

type SiteDisclaimerProps = {
  variant: 'compact' | 'footer' | 'preloader' | 'banner';
  showLinks?: boolean;
};

export function SiteDisclaimer({ variant, showLinks = true }: SiteDisclaimerProps) {
  const text =
    variant === 'compact'
      ? LEGAL.ctaDisclaimer
      : variant === 'footer'
        ? LEGAL.footerDisclaimer
        : variant === 'preloader'
          ? LEGAL.preloaderNote
          : LEGAL.policyNotice;

  const className = [styles.disclaimer, styles[variant]].join(' ');

  if (variant === 'banner') {
    return (
      <aside className={className} role="note">
        <strong>Beta · open source</strong>
        <p>{text}</p>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <p className={className}>
        {text}
        {showLinks ? (
          <>
            {' '}
            <Link href={SITE.termsUrl}>Terms</Link>
            {' · '}
            <Link href={SITE.privacyUrl}>Privacy</Link>
          </>
        ) : null}
      </p>
    );
  }

  if (variant === 'footer') {
    return (
      <p className={className}>
        {text}{' '}
        <Link href={SITE.termsUrl}>Terms of use</Link>
        {' · '}
        <Link href={SITE.privacyUrl}>Privacy policy</Link>
      </p>
    );
  }

  return <p className={className}>{text}</p>;
}
