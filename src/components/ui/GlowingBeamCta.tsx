'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { loadFramerVendor } from '@/lib/loadFramerVendor';

type GlowingBeamButtonProps = {
  text: string;
  href: string;
  openInNewTab?: boolean;
  variant?: string;
  showIcon?: boolean;
  iconName?: string;
  iconScale?: number;
  iconGap?: number;
  matchTextColor?: boolean;
  colorStyle?: string;
  customColors?: string[];
  font?: Record<string, unknown>;
  sizingAndRadius?: Record<string, number>;
  glowSettings?: Record<string, unknown>;
  particleSettings?: Record<string, unknown>;
  glare?: Record<string, unknown>;
};

type GlowingBeamCtaProps = {
  href: string;
  text?: string;
  className?: string;
  openInNewTab?: boolean;
};

function GlowingBeamFallback({
  href,
  text = 'Get the app',
  className,
  openInNewTab = true,
}: GlowingBeamCtaProps) {
  return (
    <a
      href={href}
      className={`btn-primary inline-flex w-full justify-center gap-3 px-6 py-3 sm:w-auto ${className ?? ''}`}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{text}</span>
      <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}

/** Framer GlowingBeam Button — https://framer.com/m/GlowingBeam-Button-VY59.js */
export function GlowingBeamCta({
  href,
  text = 'Get the app',
  className,
  openInNewTab = true,
}: GlowingBeamCtaProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [FramerGlowingBeamButton, setFramerGlowingBeamButton] =
    useState<ComponentType<GlowingBeamButtonProps> | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;

    loadFramerVendor(() => import('@/framer/vendor/GlowingBeam_Button.js'))
      .then((component) => {
        if (!cancelled && component) {
          setFramerGlowingBeamButton(() => component);
        } else if (!cancelled) {
          setUseFallback(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUseFallback(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  if (reducedMotion || useFallback || !FramerGlowingBeamButton) {
    return (
      <GlowingBeamFallback
        href={href}
        text={text}
        className={className}
        openInNewTab={openInNewTab}
      />
    );
  }

  return (
    <div className={`inline-block w-full max-w-none sm:max-w-[320px] ${className ?? ''}`}>
      <FramerGlowingBeamButton
        text={text}
        href={href}
        openInNewTab={openInNewTab}
        variant="Black"
        showIcon
        iconName="ArrowRight"
        iconScale={1}
        iconGap={10}
        matchTextColor
        colorStyle="Custom"
        customColors={['#0447ff', '#00b3ff', '#ff4704']}
        font={{
          family: 'Inter',
          size: 18,
          weight: 600,
          lineHeight: '1.2em',
          letterSpacing: '0em',
          textAlign: 'center',
          color: '#FFFFFF',
        }}
        sizingAndRadius={{ paddingX: 26, paddingY: 16, radius: 99 }}
        glowSettings={{ style: 'Default', outer: 0.65, inner: 0.45, speed: 1 }}
        particleSettings={{
          speed: 0.9,
          count: 40,
          minSize: 1.2,
          maxSize: 3.5,
          minBlur: 0.4,
          maxBlur: 1.8,
        }}
        glare={{
          withGlare: true,
          playOnce: false,
          color: '#FFFFFF',
          opacity: 0.12,
          angle: -45,
          duration: 650,
        }}
      />
    </div>
  );
}
