'use client';

import dynamic from 'next/dynamic';

const BurnTransitionSection = dynamic(
  () =>
    import('@/components/effects/BurnTransitionSection').then((m) => ({
      default: m.BurnTransitionSection,
    })),
  { ssr: false },
);

export function LazyBurnTransition() {
  return <BurnTransitionSection />;
}
