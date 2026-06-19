import type { ReactNode, SVGProps } from 'react';

import type { FeatureId } from '../../data/content';
interface FeatureIconProps extends SVGProps<SVGSVGElement> {
  id: FeatureId;
}

const paths: Record<FeatureId, ReactNode> = {
  exif: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  metadata: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M8 8h8M8 12h6M8 16h4" />
    </>
  ),
  secrets: (
    <>
      <path d="M12 15v2M9 9a3 3 0 016 0c0 2-3 2-3 4" />
      <rect x="3" y="3" width="18" height="18" rx="1" />
    </>
  ),
  faces: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  plates: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="1" />
      <path d="M6 12h3M15 12h3" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </>
  ),
};

export function FeatureIcon({ id, ...props }: FeatureIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      {paths[id]}
    </svg>
  );
}
