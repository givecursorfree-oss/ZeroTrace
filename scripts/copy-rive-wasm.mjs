import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canvasDir = path.join(root, 'node_modules', '@rive-app', 'canvas');
const publicDir = path.join(root, 'public', 'rive');

const files = ['rive.wasm', 'rive_fallback.wasm'];

if (!existsSync(canvasDir)) {
  console.warn('[copy-rive-wasm] @rive-app/canvas not installed — skipping.');
  process.exit(0);
}

mkdirSync(publicDir, { recursive: true });

for (const file of files) {
  copyFileSync(path.join(canvasDir, file), path.join(publicDir, file));
}

console.log('[copy-rive-wasm] Copied Rive WASM binaries to public/rive/');
