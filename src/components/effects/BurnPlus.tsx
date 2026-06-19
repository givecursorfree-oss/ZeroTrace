'use client';

import type { ComponentType, RefObject } from 'react';
import { HERO_VIDEO_URL } from '@/components/hero/BackgroundVideo';
import BurnFramer from '../../framer/vendor/burn-plus/Burn.js';

const Burn = BurnFramer as unknown as ComponentType<Record<string, unknown>>;

const defaultFont = {
  color: '#ffffff',
  size: 128,
  letter: 0,
  line: 1,
  align: 'center' as const,
  justify: 'middle' as const,
  position: { offsetX: 0, offsetY: 0, offsetZ: 0 },
  file: 'preset' as const,
  preset: undefined,
  upload: undefined,
  maxWidthType: false,
  maxWidthFixed: 800,
  maxWidthRel: '100%',
};

const burnAdvance = {
  edgeColor: 'rgba(0, 0, 0, 1)',
  maskColor: 'rgba(253, 252, 252, 1)',
  transparent: true,
  softness: 0.55,
  dispersion: 0.85,
  invertMask: false,
};

const burnAccessibility = {
  enableAria: false,
  compatibility: false,
  reduce: true,
  renderer: 'webgl',
  render: 'always',
};

const scrollBurnProps = {
  type: 'image',
  file: 'default',
  defaultImage: 'arch_dark',
  dark: false,
  fit: 'cover',
  loop: true,
  content: '',
  background: 'transparent',
  font: defaultFont,
  burn: 0.8,
  density: 0.5,
  distortion: 0.28,
  advance: burnAdvance,
  accessibility: burnAccessibility,
};

/** Same hero video as the page — burn ends transparent so the real hero shows through. */
const preloaderBurnProps = {
  type: 'video',
  file: 'url',
  urlVideo: HERO_VIDEO_URL,
  defaultImage: 'arch_dark',
  dark: false,
  fit: 'cover',
  loop: true,
  content: '',
  background: 'transparent',
  font: defaultFont,
  burn: 0,
  density: 0.55,
  distortion: 0.22,
  advance: burnAdvance,
  accessibility: burnAccessibility,
};

interface BurnPlusScrollProps {
  mode: 'scroll';
  sectionRef: RefObject<HTMLElement | null>;
}

interface BurnPlusPreloaderProps {
  mode: 'preloader';
  onAnimationComplete?: () => void;
}

export type BurnPlusProps = BurnPlusScrollProps | BurnPlusPreloaderProps;

/** Framer Burn+ — https://framer.com/m/Burn-YYTn.js */
export function BurnPlus(props: BurnPlusProps) {
  const isPreloader = props.mode === 'preloader';

  return (
    <div className="h-full w-full">
      <Burn
        {...(isPreloader ? preloaderBurnProps : scrollBurnProps)}
        section={isPreloader ? undefined : props.sectionRef}
        animateProp={
          isPreloader
            ? {
                type: 'appear',
                trigger: 'layer',
                replay: false,
                amount: 0,
                custom: {
                  enable: true,
                  burn: 0.88,
                  density: 0.55,
                  distortion: 0.25,
                  edgeColor: 'rgba(0, 0, 0, 1)',
                  maskColor: 'rgba(253, 252, 252, 1)',
                  hardness: 0.5,
                  dispersion: 0.85,
                },
              }
            : {
                type: 'transform',
                trigger: 'section',
                viewport: 'bottom',
                replay: false,
                amount: 0,
                custom: {
                  enable: false,
                  burn: 0.75,
                  density: 0.45,
                  distortion: 0.25,
                  edgeColor: 'rgba(0, 0, 0, 1)',
                  maskColor: 'rgba(253, 252, 252, 1)',
                  hardness: 0.5,
                  dispersion: 0.85,
                },
              }
        }
        transition={
          isPreloader
            ? { type: 'tween', ease: 'easeInOut', duration: 2.4 }
            : { type: 'tween', ease: 'linear', duration: 0 }
        }
        onAnimationComplete={isPreloader ? props.onAnimationComplete : undefined}
        ariaLabel={isPreloader ? 'Loading' : 'Section transition'}
      />
    </div>
  );
}
