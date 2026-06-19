'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import ScrambleTextFramer from '../../framer/vendor/ScrambleLens_prod.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface ScrambleLensProps {
  text: string;
  className?: string;
  color?: string;
  lensColor?: string;
  radius?: number;
  softness?: number;
  churn?: number;
}

function useResponsiveTitleSize() {
  const [fontSize, setFontSize] = useState(36);

  useEffect(() => {
    const mqSm = window.matchMedia('(min-width: 640px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      if (mqLg.matches) setFontSize(60);
      else if (mqSm.matches) setFontSize(48);
      else setFontSize(36);
    };

    update();
    mqSm.addEventListener('change', update);
    mqLg.addEventListener('change', update);
    return () => {
      mqSm.removeEventListener('change', update);
      mqLg.removeEventListener('change', update);
    };
  }, []);

  return fontSize;
}

/** Framer Scramble Lens — https://framer.com/m/Scramble-Lens-QXeE04.js */
export function ScrambleLens({
  text,
  className,
  color = '#ffffff',
  lensColor = '#7342E2',
  radius = 96,
  softness = 52,
  churn = 24,
}: ScrambleLensProps) {
  const reducedMotion = usePrefersReducedMotion();
  const fontSize = useResponsiveTitleSize();

  if (reducedMotion) {
    return (
      <h1 className={className}>
        {text}
      </h1>
    );
  }

  const style: CSSProperties = {
    width: '100%',
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
  };

  return (
    <div className={className} role="heading" aria-level={1}>
      <ScrambleTextFramer
        text={text}
        font={{
          fontFamily: "'Helvetica Now Display Bold', var(--font-inter), sans-serif",
          fontSize,
          fontWeight: 600,
          lineHeight: '1.08em',
        }}
        color={color}
        lensColor={lensColor}
        background="transparent"
        cornerRadius={0}
        padding={0}
        align="left"
        radius={radius}
        softness={softness}
        churn={churn}
        animate={90}
        scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+0123456789"
        style={style}
      />
    </div>
  );
}
