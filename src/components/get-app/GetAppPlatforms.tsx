'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GET_APP_PAGE, SITE } from '@/data/content';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { loadFramerVendor } from '@/lib/loadFramerVendor';
import type { RealismButtonProps } from '@/framer/vendor/RealismButton';
import { AndroidIcon, WindowsIcon } from './PlatformIcons';
import styles from '@/app/get-app/get-app.module.css';

const REALISM_FONT = 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif';

const COMING_SOON_PROPS: RealismButtonProps = {
  text: 'Coming soon',
  buttonHeight: 52,
  radius: 999,
  borderSize: 2,
  fontFamily: REALISM_FONT,
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: -0.2,
  textColor: '#E8E8E8',
  hoverTextColor: '#E8E8E8',
  normalColor1: '#6B6B6B',
  normalColor2: '#1A1A1A',
  hoverColor1: '#4A4A4A',
  hoverColor2: '#141414',
  blueColor: '#3A3A3A',
  lightColor: 'rgba(255,255,255,0.08)',
  hoverLightColor: 'rgba(255,255,255,0.12)',
  glowSize: 10,
  glowOpacity: 0.12,
  speed: 2.4,
  hoverScale: 1,
  fullWidth: true,
  disabled: true,
};

function ComingSoonFallback() {
  return (
    <button type="button" className={styles.comingSoonFallback} disabled>
      Coming soon
    </button>
  );
}

function RealismComingSoonButton() {
  const reducedMotion = usePrefersReducedMotion();
  const [RealismButton, setRealismButton] = useState<ComponentType<RealismButtonProps> | null>(
    null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setFailed(true);
      return;
    }

    let cancelled = false;

    loadFramerVendor(() => import('@/framer/vendor/RealismButton.js'))
      .then((component) => {
        if (cancelled) return;
        if (component) {
          setRealismButton(() => component);
        } else {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  if (failed || !RealismButton) {
    return <ComingSoonFallback />;
  }

  return (
    <div className={styles.realismWrap}>
      <RealismButton {...COMING_SOON_PROPS} />
    </div>
  );
}

export function GetAppPlatforms() {
  const android = GET_APP_PAGE.platforms.find((p) => p.id === 'android');
  const windows = GET_APP_PAGE.platforms.find((p) => p.id === 'windows');

  if (!android || !windows) return null;

  return (
    <div className={styles.platformGrid}>
      <article className={styles.platformCard}>
        <div className={styles.platformHead}>
          <span className={styles.platformIconShell} data-platform="android">
            <AndroidIcon className={styles.platformIcon} />
          </span>
          <div>
            <h2 className={styles.platformName}>{android.name}</h2>
            <p className={styles.platformDetail}>{android.detail}</p>
          </div>
        </div>
        <a
          href={SITE.downloadUrl}
          className={styles.downloadBtn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download ZeroTrace APK from GitHub Releases"
        >
          {android.cta}
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </article>

      <article className={[styles.platformCard, styles.platformCardSoon].join(' ')}>
        <div className={styles.platformHead}>
          <span className={styles.platformIconShell} data-platform="windows">
            <WindowsIcon className={styles.platformIcon} />
          </span>
          <div>
            <div className={styles.platformTitleRow}>
              <h2 className={styles.platformName}>{windows.name}</h2>
              <span className={styles.soonBadge}>Coming soon</span>
            </div>
            <p className={styles.platformDetail}>{windows.detail}</p>
          </div>
        </div>
        <RealismComingSoonButton />
      </article>
    </div>
  );
}
