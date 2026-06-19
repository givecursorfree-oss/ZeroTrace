/** Runtime stubs for Framer code components outside Framer canvas. */
import { useEffect, useState } from 'react';

export const ControlType = {
  Boolean: 'boolean',
  Number: 'number',
  Color: 'color',
  String: 'string',
  Enum: 'enum',
  Object: 'object',
  File: 'file',
  Font: 'font',
  Transition: 'transition',
  ScrollSectionRef: 'scrollSectionRef',
  ChangeHandler: 'changeHandler',
  ResponsiveImage: 'responsiveImage',
  Array: 'array',
} as const;

export const RenderTarget = {
  canvas: 'canvas',
  current: () => 'preview' as const,
};

export function addPropertyControls(_component: unknown, _controls: unknown): void {
  // No-op outside Framer.
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/** Framer canvas detection — always false on the marketing site. */
export function useIsStaticRenderer(): boolean {
  return false;
}
