/** Public Rive assets — each maps to one narrative moment on the page. */
export const RIVE = {
  /** Step 1: scan for risks */
  detect: '/rive/cybersecurity-features.riv',
  /** Step 2: local-only processing */
  local: '/rive/interactive-security-card.riv',
  /** Step 3: secure export */
  export: '/rive/secure-your-files.riv',
  /** Features section accent: threat highlights */
  scanBurst: '/rive/burst-icons8.riv',
  /** Live scan radar — lightweight motion for scan preview */
  scanRadar: '/rive/teste-radar.riv',
  /** Privacy section: on-device security card */
  privacy: '/rive/interactive-security-card.riv',
} as const;

export const STEP_RIVE = [
  { src: RIVE.detect, minHeight: 260, label: 'Scanning for hidden metadata and security risks' },
  { src: RIVE.local, minHeight: 260, label: 'Interactive security card showing local-only processing' },
  { src: RIVE.export, minHeight: 280, label: 'Securing files before export' },
] as const;
