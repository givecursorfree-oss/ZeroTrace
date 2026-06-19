'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SITE } from '@/data/content';
import { fadeUp } from '@/components/hero/animations';
import { GlowingBeamCta } from '@/components/ui/GlowingBeamCta';
import { SiteDisclaimer } from '@/components/legal/SiteDisclaimer';

const CTA_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4';

/** Full-bleed video CTA band above the footer. */
export function VideoCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="get-app"
      className="relative min-h-[min(100dvh,640px)] w-full overflow-hidden bg-[var(--color-warm-sand)]"
      aria-labelledby="video-cta-heading"
    >
      <video
        className="protected-asset absolute inset-0 z-0 h-full w-full object-cover opacity-40"
        data-protected-asset="true"
        draggable={false}
        autoPlay
        muted
        loop
        playsInline
        onError={() => {
          // Ignore CDN playback failures.
        }}
        aria-hidden="true"
      >
        <source src={CTA_VIDEO_URL} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--color-parchment-white)] via-[var(--color-parchment-white)]/80 to-transparent"
        aria-hidden="true"
      />

      <div className="page-gutter relative z-10 mx-auto flex min-h-[min(100dvh,640px)] max-w-[var(--page-max-width)] flex-col justify-end pb-12 pt-20 sm:pb-20 sm:pt-24">
        <motion.div
          className="w-full max-w-xl rounded-[var(--radius-cardlarge)] bg-[var(--color-warm-sand)]/95 p-6 sm:p-8 md:p-10"
          variants={fadeUp}
          custom={0}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-medium text-[var(--color-driftwood)]">{SITE.versionLabel}</p>
          <h2
            id="video-cta-heading"
            className="display-headline mt-2 text-[var(--text-heading-lg)]"
            style={{ letterSpacing: 'var(--tracking-heading-lg)' }}
          >
            Try ZeroTrace on your device
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-driftwood)]">
            {SITE.apkMeta} {SITE.platforms}. Builds and release notes live on GitHub.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <a
              href={SITE.releaseNotesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-midnight-ink)] underline underline-offset-2"
            >
              View releases on GitHub
            </a>
          </div>

          <GlowingBeamCta href={SITE.getAppPath} className="mt-8" openInNewTab={false} />
          <SiteDisclaimer variant="compact" />
        </motion.div>
      </div>
    </section>
  );
}
