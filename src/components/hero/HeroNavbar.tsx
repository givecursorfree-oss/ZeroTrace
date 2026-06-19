'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BetaBadge } from '@/components/ui/BetaBadge';
import { LogoMark } from '@/components/ui/LogoMark';
import { HERO_CENTER_NAV, SITE } from '@/data/content';

const sheetEase = [0.22, 1, 0.36, 1] as const;
const sheetExitEase = [0.55, 0, 1, 0.45] as const;

export function HeroNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--color-ash-border)] bg-[var(--color-parchment-white)]/92 backdrop-blur-md">
        <div className="page-gutter mx-auto flex h-14 max-w-[var(--page-max-width)] items-center justify-between gap-3 sm:h-16 sm:gap-4">
          <a
            href="#hero"
            className="inline-flex min-h-[44px] items-center gap-2.5"
            aria-label={`${SITE.name} home`}
          >
            <LogoMark size={34} className="shrink-0 rounded-md" priority />
            <span className="font-wordmark text-sm font-bold tracking-[0.04em] text-[var(--color-midnight-ink)]">
              {SITE.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {HERO_CENTER_NAV.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="btn-ghost rounded-[var(--radius-badges)] px-3 py-2 text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <BetaBadge />
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost gap-1.5 text-sm"
            >
              GitHub
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a href={SITE.getAppPath} className="btn-primary text-sm">
              Get the app
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-ash-border)] lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={20} strokeWidth={1.75} className="text-[var(--color-midnight-ink)]" />
            ) : (
              <Menu size={20} strokeWidth={1.75} className="text-[var(--color-midnight-ink)]" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 flex min-h-[100dvh] flex-col bg-[var(--color-warm-sand)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] lg:hidden"
              style={{
                width: 'min(88vw, 360px)',
                boxShadow: 'var(--shadow-subtle-6)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0, transition: { duration: 0.45, ease: sheetEase } }}
              exit={{ x: '100%', transition: { duration: 0.35, ease: sheetExitEase } }}
              aria-label="Mobile navigation"
            >
              <div className="page-gutter flex items-center justify-between border-b border-[var(--color-ash-border)] py-5">
                <span className="inline-flex items-center gap-2">
                  <LogoMark size={28} className="rounded-md" />
                  <span className="font-wordmark text-sm font-bold tracking-[0.04em]">
                    {SITE.name}
                  </span>
                </span>
                <motion.button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-ash-border)] bg-[var(--color-parchment-white)]"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                >
                  <X size={18} strokeWidth={1.75} />
                </motion.button>
              </div>

              <div className="page-gutter pt-4">
                <BetaBadge />
              </div>

              <nav className="page-gutter flex flex-1 flex-col gap-1 py-4" aria-label="Mobile primary">
                {HERO_CENTER_NAV.map((link, i) => (
                  <motion.a
                    key={link.href + link.label}
                    href={link.href}
                    className="flex min-h-[44px] items-center rounded-[var(--radius-badges)] px-2 text-base font-medium transition-colors hover:bg-black/5"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4 }}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center rounded-[var(--radius-badges)] px-2 text-base font-medium transition-colors hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  GitHub
                </a>
              </nav>

              <div className="page-gutter flex flex-col gap-3 border-t border-[var(--color-ash-border)] py-6">
                <a href={SITE.getAppPath} className="btn-primary w-full py-3.5" onClick={() => setOpen(false)}>
                  Get the app
                </a>
                <a href="#how-it-works" className="btn-secondary w-full py-3.5" onClick={() => setOpen(false)}>
                  How it works
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
