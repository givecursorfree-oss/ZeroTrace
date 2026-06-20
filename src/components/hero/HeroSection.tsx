'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowRightCircle, Fingerprint, LockKeyhole } from 'lucide-react';
import { HERO_COPY, SITE } from '@/data/content';
import { BetaBadge } from '@/components/ui/BetaBadge';
import { BackgroundVideo } from './BackgroundVideo';
import { HeroNavbar } from './HeroNavbar';
import { fadeUp } from './animations';

const heroIconClass =
  'relative -top-[0.12em] mx-0.5 inline h-[1.05em] w-[1.05em] shrink-0 align-middle text-[var(--color-midnight-ink)] sm:mx-1';

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-[var(--color-parchment-white)]">
      <BackgroundVideo />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[var(--color-parchment-white)]/55"
        aria-hidden="true"
      />

      <HeroNavbar />

      <div
        className="page-gutter relative z-10 mx-auto w-full max-w-[var(--page-max-width)] pb-12 sm:pb-16"
        style={{ paddingTop: 'clamp(40px, 8vw, 96px)' }}
      >
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-3"
          variants={fadeUp}
          custom={0}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'visible'}
        >
          <BetaBadge />
          <span className="text-sm text-[var(--color-driftwood)]">{HERO_COPY.eyebrow}</span>
        </motion.div>

        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <motion.h1
              className="display-headline w-full max-w-3xl text-[clamp(2rem,6.2vw,3.25rem)] leading-[1.06] tracking-[-0.02em] text-[var(--color-midnight-ink)]"
              variants={fadeUp}
              custom={1}
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? false : 'visible'}
            >
              <span className="block">
                Share
                <ArrowRightCircle strokeWidth={1.75} className={heroIconClass} aria-hidden="true" />
                {' '}
                files with zero
                <Fingerprint strokeWidth={1.75} className={heroIconClass} aria-hidden="true" />
                {' '}
                trace
              </span>
              <span className="block">
                on your device
                <LockKeyhole strokeWidth={1.75} className={heroIconClass} aria-hidden="true" />
              </span>
            </motion.h1>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              variants={fadeUp}
              custom={3}
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? false : 'visible'}
            >
              <motion.a
                href={SITE.getAppPath}
                className="btn-primary w-full justify-center gap-2 px-6 py-3 sm:w-auto"
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span>Get the app</span>
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </motion.a>
              <a href="#how-it-works" className="btn-secondary w-full justify-center px-5 py-3 sm:w-auto">
                How it works
              </a>
            </motion.div>
          </div>

          <motion.p
            className="max-w-md text-base leading-relaxed text-[var(--color-driftwood)] md:text-lg"
            variants={fadeUp}
            custom={2}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? false : 'visible'}
          >
            {HERO_COPY.subhead}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
