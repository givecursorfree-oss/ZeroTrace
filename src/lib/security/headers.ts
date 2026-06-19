/** Shared HTTP security headers for the ZeroTrace marketing site. */
export const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
] as const;

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com https://framerusercontent.com data:",
  "img-src 'self' data: blob: https://framerusercontent.com",
  "media-src 'self' blob: https://d8j0ntlcm91z4.cloudfront.net https://framerusercontent.com",
  "connect-src 'self' https://framerusercontent.com https://raw.githubusercontent.com https://unpkg.com https://cdn.jsdelivr.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** Block bulk scrapers — search engine bots (Googlebot, Bingbot) are intentionally allowed. */
export const BLOCKED_SCRAPER_UA =
  /wget|curl\/|python-requests|scrapy|httpx|go-http-client|java\/|libwww|perl|php\/|gptbot|chatgpt-user|claudebot|anthropic-ai|ccbot|cohere-ai|omgili|bytespider|amazonbot/i;

/** Discourage AI training on marketing mockups without blocking Google image search for logos. */
export const PROTECTED_ASSET_ROBOTS = 'noai, noimageai';
