'use client';

import { ensureRiveRuntime } from '@/lib/rive/configureRuntime';

ensureRiveRuntime();

/** Configure local Rive WASM before any canvas component mounts. */
export function RiveRuntimeInit() {
  ensureRiveRuntime();
  return null;
}
