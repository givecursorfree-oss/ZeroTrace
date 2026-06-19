'use client';

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ensureRiveRuntime } from '@/lib/rive/configureRuntime';
import { LogoMark } from '@/components/ui/LogoMark';

ensureRiveRuntime();

interface RivePlayerInnerProps {
  src: string;
  className?: string;
  ariaLabel: string;
}

export function RivePlayerInner({ src, className, ariaLabel }: RivePlayerInnerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { RiveComponent } = useRive({
    src,
    autoplay: !reducedMotion,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  if (reducedMotion) {
    return (
      <div
        className={className}
        role="img"
        aria-label={ariaLabel}
      >
        <LogoMark size={120} className="mx-auto opacity-90" />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <RiveComponent className="h-full w-full" />
    </div>
  );
}
