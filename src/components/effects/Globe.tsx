import type { CSSProperties } from 'react';
'use client';

import GlobeFramer from '../../framer/vendor/Globe_prod.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './Globe.module.css';

/** Framer Globe - https://framer.com/m/Globe-prod-gCnI.js */
export function Globe() {
  const reducedMotion = usePrefersReducedMotion();

  const style: CSSProperties = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className={styles.root} aria-hidden="true">
      <GlobeFramer
        preview={!reducedMotion}
        speed={0.1}
        smoothing={1}
        density={0.8}
        dotSize={0.4}
        scale={0.9}
        stopOnHover
        rotationDirection="clockwise"
        initialLatitude={42}
        initialLongitude={-15}
        oceanColor="#000000"
        outlineColor="#a59f97"
        dotColor="#777169"
        graticuleColor="#e5e5e5"
        outlineWidth={1}
        gridWidth={1}
        dragSpeed={0.5}
        detail={1}
        drag
        markerConfig={{ markers: [], color: '#777169', size: 0.4 }}
        style={style}
      />
    </div>
  );
}
