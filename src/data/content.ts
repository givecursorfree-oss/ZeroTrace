/** ZeroTrace copy — plain language, conversion-focused. */
export const SITE = {
  name: 'ZeroTrace',
  tagline: 'Share files. Leave zero trace.',
  description:
    'Scan photos and documents on your phone or PC. Remove hidden data before you send.',
  version: '1.0.0',
  versionLabel: 'Beta',
  platforms: 'Android and Windows',
  apkMeta: 'Android arm64 beta for Windows and Android. No account required.',
  downloadUrl: 'https://github.com/devzeromax/ZeroTrace/releases',
  windowsDownloadUrl: 'https://github.com/devzeromax/ZeroTrace/releases',
  getAppPath: '/get-app',
  releaseNotesUrl: 'https://github.com/devzeromax/ZeroTrace/releases',
  githubUrl: 'https://github.com/devzeromax/ZeroTrace',
  githubRepo: 'devzeromax/ZeroTrace',
  privacyUrl: '/privacy',
  termsUrl: '/terms',
} as const;

/** Brand assets — mark for light UI; full lockup for dark panels (official: dist/logo full.png). */
export const BRAND = {
  mark: '/logo_mark.png',
  full: '/logo_full.png',
  fullAlt: 'ZeroTrace — Share files. Leave zero trace.',
} as const;

/** Plain-language legal copy — honest beta posture, not formal compliance claims. */
export const LEGAL = {
  preloaderNote:
    'Beta open-source software. Loading does not collect your files or personal data.',
  ctaDisclaimer:
    'Beta software. Verify sanitized exports before sharing sensitive files. Not legal or compliance advice.',
  footerDisclaimer:
    'ZeroTrace is volunteer-maintained open-source software in beta. Automated scans are not guaranteed complete. Review outputs before you share.',
  policyNotice:
    'This page is plain-language guidance from an open-source project. It is not legal advice and does not certify regulatory compliance (GDPR, HIPAA, etc.). When stakes are high, have a qualified professional review your workflow.',
} as const;

export const HERO_COPY = {
  eyebrow: 'Open-source · on-device privacy',
  subhead:
    'Find GPS, EXIF, faces, license plates, and leaked secrets in your files — then export a clean copy with a verification report. Nothing leaves your device.',
  proofLine: 'No server · No account · No analytics',
} as const;

export const STEPS = [
  {
    id: 'detect',
    title: 'Detect privacy risks',
    description:
      'Drop a photo, PDF, or archive. ZeroTrace flags GPS coordinates, camera metadata, faces, plates, QR codes, and exposed API keys before you share.',
    riveLabel: 'Scanning for hidden metadata and security risks',
  },
  {
    id: 'local',
    title: 'Everything stays local',
    description:
      'Processing runs on your hardware. Files are never uploaded, synced to a cloud, or tied to an account. You stay in control.',
    riveLabel: 'Interactive security card showing local-only processing',
  },
  {
    id: 'export',
    title: 'Sanitize and share safely',
    description:
      'Strip risky data, blur faces, and export a clean file plus a report you can verify before sending.',
    riveLabel: 'Securing files before export',
  },
] as const;

export type FeatureWall = 'paper' | 'peach' | 'mint' | 'lavender';
export type FeatureId = 'exif' | 'metadata' | 'secrets' | 'faces' | 'plates' | 'qr';

export const FEATURES: ReadonlyArray<{
  id: FeatureId;
  title: string;
  description: string;
  wall: FeatureWall;
}> = [
  {
    id: 'exif',
    title: 'EXIF and GPS',
    description: 'Strip location, camera model, and timestamps from photos.',
    wall: 'peach',
  },
  {
    id: 'metadata',
    title: 'Hidden metadata',
    description: 'PDF, Office, and ZIP files carry more than you expect.',
    wall: 'paper',
  },
  {
    id: 'secrets',
    title: 'API keys and secrets',
    description: 'Catch tokens in code or config before they leak.',
    wall: 'mint',
  },
  {
    id: 'faces',
    title: 'Faces',
    description: 'Blur faces on device before you export.',
    wall: 'lavender',
  },
  {
    id: 'plates',
    title: 'License plates',
    description: 'Find and redact plates in images.',
    wall: 'paper',
  },
  {
    id: 'qr',
    title: 'QR codes',
    description: 'Flag sensitive URLs or tokens in barcodes.',
    wall: 'mint',
  },
] as const;

export const PRIVACY_FACTS = [
  'No server uploads',
  'No accounts required',
  'No usage analytics',
] as const;

export const SECTION_LEADS = {
  howItWorks: 'Three steps from risky file to safe share — entirely on your device.',
  liveScan:
    'ZeroTrace sweeps each file on your hardware — no upload, no cloud. You get a clear read on what would leak if you hit send.',
  features: 'Built for journalists, lawyers, and anyone who sends sensitive files.',
  openSource:
    'ZeroTrace is a native app for Android and Windows — scanning happens on your device, not in a browser. The project is open source on GitHub for anyone who wants to audit the build.',
  comparison:
    'An honest look at what happens to your files — no marketing spin.',
  beforeAfter:
    'A typical photo export. Location data removed on your device before you send.',
} as const;

export const HERO_CENTER_NAV = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Compare', href: '#compare' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Get the app', href: '/get-app' },
] as const;

/** @deprecated Use HERO_CENTER_NAV */
export const HERO_NAV_LINKS = HERO_CENTER_NAV;

export const GET_APP_PAGE = {
  eyebrow: 'Download',
  heading: 'Install ZeroTrace on your device',
  lead:
    'Pick your platform below. Files are scanned locally after install — nothing is uploaded during setup.',
  verifyNote:
    'Verify checksums and read release notes on GitHub before installing beta builds.',
  platforms: [
    {
      id: 'android',
      name: 'Android',
      detail: 'arm64 APK · Beta · No Google Play account required',
      hrefKey: 'downloadUrl' as const,
      cta: 'Download APK',
      comingSoon: false,
    },
    {
      id: 'windows',
      name: 'Windows',
      detail: 'Desktop app for Windows 10 and 11 · In development',
      hrefKey: 'windowsDownloadUrl' as const,
      cta: 'Coming soon',
      comingSoon: true,
    },
  ],
  steps: [
    { title: 'Download', body: 'Install the Android APK today. Windows builds are on the way.' },
    { title: 'Verify', body: 'Match the file hash against the release on GitHub if you handle sensitive work.' },
    { title: 'Scan locally', body: 'Open ZeroTrace, pick a file, and export a clean copy before you share.' },
  ],
} as const;

export const OBJECTION_COUNTERS = [
  {
    question: 'Will my files be uploaded?',
    answer: 'No. Scanning and export run locally on your device.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No sign-up. Install the beta and start scanning on your device.',
  },
  {
    question: 'Can I trust the build?',
    answer: 'Source code is public on GitHub. Check release notes before you install.',
  },
] as const;

export const DEVELOPER_NOTE = {
  heading: 'From the developers',
  quote:
    'We built ZeroTrace because sharing a photo should not leak where you were standing. Everything runs on your phone or PC. We are still in beta, so verify exports before you share sensitive work.',
  name: 'ZeroTrace maintainers',
  role: 'Open-source project',
} as const;

export const BEFORE_AFTER_EXAMPLE = {
  eyebrow: 'Before & after',
  heading: 'GPS stripped before you share',
  lead: SECTION_LEADS.beforeAfter,
  fileName: 'field-photo.jpg',
  slider: {
    beforeSrc: '/before-after/field-photo-before.jpg',
    afterSrc: '/before-after/field-photo-after.jpg',
    beforeAlt: 'Example photo with GPS coordinates embedded in EXIF metadata',
    afterAlt: 'Same photo after ZeroTrace removed location metadata',
  },
  before: {
    label: 'Original export',
    status: 'Risky to send',
    fields: [
      { key: 'GPS latitude', value: '37.7749° N', risk: true },
      { key: 'GPS longitude', value: '122.4194° W', risk: true },
      { key: 'Camera', value: 'iPhone 15 Pro', risk: false },
      { key: 'Captured', value: '2025-03-14 09:41', risk: false },
    ],
  },
  after: {
    label: 'ZeroTrace export',
    status: 'Safe to review',
    fields: [
      { key: 'GPS latitude', value: 'Removed', risk: false, stripped: true },
      { key: 'GPS longitude', value: 'Removed', risk: false, stripped: true },
      { key: 'Camera', value: 'Stripped (optional)', risk: false, stripped: true },
      { key: 'Captured', value: 'Stripped (optional)', risk: false, stripped: true },
    ],
  },
  footnote:
    'Illustrative EXIF fields from a typical photo. Your export report lists exactly what was found and removed.',
} as const;

export type ComparisonColumnId = 'raw' | 'cloud' | 'zerotrace';

export const COMPARISON = {
  eyebrow: 'Honest comparison',
  heading: 'ZeroTrace vs sending raw vs cloud tools',
  lead: SECTION_LEADS.comparison,
  columns: [
    { id: 'raw' as const, label: 'Sending raw' },
    { id: 'cloud' as const, label: 'Cloud redaction' },
    { id: 'zerotrace' as const, label: 'ZeroTrace' },
  ],
  rows: [
    {
      label: 'Files leave your device',
      raw: 'Yes — hidden metadata goes with it',
      cloud: 'Yes — uploaded to a third-party server',
      zerotrace: 'No — processing stays local',
    },
    {
      label: 'Account required',
      raw: 'No',
      cloud: 'Usually yes',
      zerotrace: 'No',
    },
    {
      label: 'GPS / EXIF removal',
      raw: 'No — location often embedded',
      cloud: 'Yes — after upload',
      zerotrace: 'Yes — before you export',
    },
    {
      label: 'You can verify the code',
      raw: 'N/A',
      cloud: 'Rarely — closed source',
      zerotrace: 'Yes — open source on GitHub',
    },
    {
      label: 'Works offline',
      raw: 'N/A',
      cloud: 'No — needs connection',
      zerotrace: 'Yes',
    },
  ],
  disclaimer:
    'Cloud tools vary by vendor. This compares typical SaaS redaction workflows to ZeroTrace’s on-device model.',
} as const;
