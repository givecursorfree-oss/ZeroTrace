'use client';

import { BurnPlus } from './BurnPlus';

interface BurnPlusPreloaderInnerProps {
  onAnimationComplete: () => void;
}

export function BurnPlusPreloaderInner({ onAnimationComplete }: BurnPlusPreloaderInnerProps) {
  return <BurnPlus mode="preloader" onAnimationComplete={onAnimationComplete} />;
}
