'use client';

import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type CSSProperties,
  type TransitionEvent,
} from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { PRELOADER_DONE_EVENT, PRELOADER_STORAGE_KEY } from '@/lib/preloader';
import { loadFramerVendor } from '@/lib/loadFramerVendor';
import { SiteDisclaimer } from '@/components/legal/SiteDisclaimer';
import { BRAND, SITE } from '@/data/content';
import styles from './AnimationPreloader.module.css';

const COUNTER_DURATION = 2.8;
/** Counter + variant hold + circle exit */
const LOADER_PLAY_MS = 4800;

type AnimationLoaderProps = {
  brandName?: string;
  counterDuration?: number;
  background?: string;
  textColor?: string;
  transition?: {
    delay?: number;
    duration?: number;
    ease?: number[];
    type?: string;
  };
  style?: CSSProperties;
};

function finishPreloader(setPhase: (phase: 'loading' | 'exiting' | 'done') => void) {
  window.localStorage.setItem(PRELOADER_STORAGE_KEY, '1');
  window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
  document.body.style.overflow = '';
  setPhase('exiting');
}

function PreloaderLogo() {
  return (
    <ProtectedImage
      src={BRAND.full}
      alt=""
      width={360}
      height={160}
      priority
      sizes="(max-width: 480px) 240px, 360px"
      className={styles.brandLogo}
    />
  );
}

function PreloaderFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <PreloaderLogo />
      <p className={styles.fallbackBrand}>{SITE.name}</p>
      <div className={styles.fallbackTrack}>
        <div className={styles.fallbackBar} />
      </div>
      <p className={styles.fallbackPercent}>Loading</p>
    </div>
  );
}

/** Framer Animation loader — https://framer.com/m/Animation-loader-eHagKV.js */
export function AnimationPreloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');
  const [AnimationLoader, setAnimationLoader] = useState<ComponentType<AnimationLoaderProps> | null>(
    null,
  );
  const [loaderReady, setLoaderReady] = useState(false);
  const [vendorFailed, setVendorFailed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('done');
      window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      return;
    }

    if (window.localStorage.getItem(PRELOADER_STORAGE_KEY) === '1') {
      setPhase('done');
      window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      return;
    }

    document.body.style.overflow = 'hidden';

    let cancelled = false;

    loadFramerVendor(() => import('@/framer/vendor/AnimationLoader.js'))
      .then((component) => {
        if (cancelled) return;
        if (component) {
          setAnimationLoader(() => component);
        } else {
          setVendorFailed(true);
          window.setTimeout(() => finishPreloader(setPhase), LOADER_PLAY_MS);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVendorFailed(true);
          window.setTimeout(() => finishPreloader(setPhase), LOADER_PLAY_MS);
        }
      });

    return () => {
      cancelled = true;
      document.body.style.overflow = '';
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!AnimationLoader) {
      setLoaderReady(false);
      return;
    }

    const frame = requestAnimationFrame(() => setLoaderReady(true));
    return () => cancelAnimationFrame(frame);
  }, [AnimationLoader]);

  useEffect(() => {
    if (phase !== 'loading' || !loaderReady) return;

    const timer = window.setTimeout(() => finishPreloader(setPhase), LOADER_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase, loaderReady]);

  useEffect(() => {
    if (phase !== 'loading' || !vendorFailed) return;

    const timer = window.setTimeout(() => finishPreloader(setPhase), LOADER_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase, vendorFailed]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = window.setTimeout(() => setPhase('done'), 750);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleSkip = useCallback(() => {
    finishPreloader(setPhase);
  }, []);

  const handleFadeEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget || event.propertyName !== 'opacity') return;
      if (phase === 'exiting') {
        setPhase('done');
      }
    },
    [phase],
  );

  if (phase === 'done') return null;

  return (
    <div
      className={[styles.overlay, phase === 'exiting' ? styles.exiting : ''].join(' ')}
      onTransitionEnd={handleFadeEnd}
      role="status"
      aria-live="polite"
      aria-label="Loading ZeroTrace"
    >
      {phase === 'loading' ? (
        <button type="button" className={styles.skip} onClick={handleSkip}>
          Skip
        </button>
      ) : null}

      <SiteDisclaimer variant="preloader" />

      <div className={styles.loaderStage} aria-hidden={phase === 'exiting'}>
        {AnimationLoader && !vendorFailed ? (
          <div className={styles.loaderScale}>
            <div className={styles.loaderInner}>
              <PreloaderLogo />
              <AnimationLoader
                brandName={SITE.name}
                counterDuration={COUNTER_DURATION}
                background="#050505"
                textColor="#f5f2eb"
                transition={{
                  delay: 0,
                  duration: COUNTER_DURATION,
                  ease: [0.12, 0.23, 0.5, 1],
                  type: 'tween',
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        ) : (
          <PreloaderFallback />
        )}
      </div>
    </div>
  );
}
