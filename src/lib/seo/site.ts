import { SITE } from '@/data/content';

/** Canonical production URL — set `NEXT_PUBLIC_SITE_URL` in deployment (e.g. Vercel). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zerotrace.app'
).replace(/\/$/, '');

export const SEO_KEYWORDS = [
  'ZeroTrace',
  'file sanitizer',
  'metadata remover',
  'EXIF remover',
  'GPS photo privacy',
  'on-device privacy',
  'Android APK',
  'open source privacy app',
  'strip metadata',
  'blur faces before sharing',
] as const;

export const DEFAULT_DESCRIPTION =
  'ZeroTrace is a privacy-first file sanitizer for Android and Windows. Remove EXIF metadata, GPS, faces, license plates, and leaked secrets before you share — 100% on-device, open source.';

export const SITE_AUTHOR = {
  name: SITE.name,
  url: SITE_URL,
} as const;
