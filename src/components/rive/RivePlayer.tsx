'use client';

import dynamic from 'next/dynamic';

const RivePlayerInner = dynamic(
  () => import('./RivePlayerInner').then((m) => ({ default: m.RivePlayerInner })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full min-h-[200px] w-full animate-pulse rounded-[var(--radius-cardlarge)] bg-[var(--color-warm-sand)]"
        aria-hidden="true"
      />
    ),
  },
);

interface RivePlayerProps {
  src: string;
  className?: string;
  ariaLabel: string;
}

export function RivePlayer({ src, className, ariaLabel }: RivePlayerProps) {
  return <RivePlayerInner src={src} className={className} ariaLabel={ariaLabel} />;
}
