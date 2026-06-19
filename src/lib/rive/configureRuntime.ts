import { RuntimeLoader } from '@rive-app/canvas';

let configured = false;

/** Serve WASM from /public/rive — required when CSP blocks unpkg/jsdelivr CDNs. */
export function ensureRiveRuntime() {
  if (configured || typeof window === 'undefined') return;
  RuntimeLoader.setWasmUrl('/rive/rive.wasm');
  RuntimeLoader.setWasmFallbackUrl('/rive/rive_fallback.wasm');
  configured = true;
}
