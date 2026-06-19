'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ensureRiveRuntime } from '@/lib/rive/configureRuntime';
import type { RiveFitMode } from './RiveStageInner';
import styles from './RiveStage.module.css';

interface RiveStageInnerProps {
  src: string;
  ariaLabel: string;
  className?: string;
  minHeight?: number;
  interactive?: boolean;
  fit?: RiveFitMode;
}

interface RiveStageProps {
  src: string;
  ariaLabel: string;
  className?: string;
  minHeight?: number;
  interactive?: boolean;
  fit?: RiveFitMode;
}

function RiveSkeleton({ minHeight }: { minHeight: number }) {
  return (
    <div
      className={`${styles.stage} ${styles.skeleton}`}
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

/** Lazy-mount Rive canvas — isolated async chunk, no next/dynamic. */
export function RiveStage({
  src,
  ariaLabel,
  className,
  minHeight = 200,
  interactive = true,
  fit = 'contain',
}: RiveStageProps) {
  const [Inner, setInner] = useState<ComponentType<RiveStageInnerProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    ensureRiveRuntime();

    import('./RiveStageInner')
      .then((mod) => {
        if (!cancelled) {
          setInner(() => mod.RiveStageInner);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInner(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Inner) {
    return <RiveSkeleton minHeight={minHeight} />;
  }

  return (
    <Inner
      src={src}
      ariaLabel={ariaLabel}
      className={className}
      minHeight={minHeight}
      interactive={interactive}
      fit={fit}
    />
  );
}
