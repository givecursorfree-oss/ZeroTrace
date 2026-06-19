'use client';

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ensureRiveRuntime } from '@/lib/rive/configureRuntime';
import { LogoMark } from '@/components/ui/LogoMark';
import styles from './RiveStage.module.css';

ensureRiveRuntime();

export type RiveFitMode = 'contain' | 'cover';

interface RiveStageInnerProps {
  src: string;
  ariaLabel: string;
  className?: string;
  minHeight?: number;
  interactive?: boolean;
  fit?: RiveFitMode;
}

export function RiveStageInner({
  src,
  ariaLabel,
  className,
  minHeight = 200,
  interactive = true,
  fit = 'contain',
}: RiveStageInnerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  const { RiveComponent, rive } = useRive({
    src,
    autoplay: !reducedMotion,
    layout: new Layout({
      fit: fit === 'cover' ? Fit.Cover : Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoadError: () => setFailed(true),
  });

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (reducedMotion || failed) {
    return (
      <div
        className={[styles.stage, styles.fallback, className].filter(Boolean).join(' ')}
        style={{ minHeight }}
        role="img"
        aria-label={ariaLabel}
      >
        <LogoMark size={96} className={styles.fallbackLogo} />
      </div>
    );
  }

  return (
    <div
      className={[
        styles.stage,
        interactive ? styles.interactive : '',
        fit === 'cover' ? styles.dominant : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ minHeight, height: minHeight }}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={styles.canvas} style={{ minHeight, height: minHeight }}>
        <RiveComponent style={{ width: '100%', height: '100%' }} />
        {!rive && <div className={styles.skeletonInner} aria-hidden="true" />}
      </div>
    </div>
  );
}
