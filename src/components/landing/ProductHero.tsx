'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { HERO_NAV_LINKS, SITE } from '@/data/content';
import { ScrambleLens } from '@/components/effects/ScrambleLens';
import { Logo } from '@/components/hero/Logo';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4';

export function ProductHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-header', { y: -16, opacity: 0, duration: 0.65 })
        .from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.55 }, '-=0.35')
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.2')
        .from('.hero-sub', { y: 28, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('.hero-cta', { y: 22, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.2');

      gsap.to('.hero-scroll-line', {
        y: 6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="liquid-glass-root relative min-h-[100dvh] w-full overflow-hidden"
    >
      <video
        className="protected-asset absolute inset-0 z-0 h-full w-full object-cover"
        data-protected-asset="true"
        draggable={false}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={BG_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/25 to-black/55" />

      <header className="hero-header relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#hero" className="flex items-center gap-2.5 text-white" aria-label="ZeroTrace home">
          <Logo size={28} className="brightness-0 invert" />
          <span className="text-base font-semibold tracking-tight">{SITE.name}</span>
        </a>

        <nav className="liquid-glass hidden items-center gap-1 rounded-xl px-2 py-2 md:flex" aria-label="Primary">
          {HERO_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#how-it-works"
            className="liquid-glass rounded-full px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            How it works
          </a>
          <a
            href="#download"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#192837] transition-colors hover:bg-white/90 active:scale-95"
          >
            Download APK
          </a>
        </div>

        <button
          type="button"
          className="liquid-glass rounded-lg p-2 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </header>

      {menuOpen && (
        <div className="absolute left-4 right-4 top-[76px] z-30 flex flex-col gap-1 rounded-2xl p-4 md:hidden liquid-glass">
          {HERO_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
            <a
              href="#how-it-works"
              className="liquid-glass flex-1 rounded-full py-3 text-center text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="#download"
              className="flex-1 rounded-full bg-white py-3 text-center text-sm font-semibold text-[#192837]"
              onClick={() => setMenuOpen(false)}
            >
              Download APK
            </a>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-88px)] max-w-7xl flex-col justify-end px-6 pb-14 pt-8 sm:px-12 sm:pb-20">
        <div className="max-w-2xl">
          <p className="hero-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7342E2]" aria-hidden="true" />
            On-device privacy scanner
          </p>
          <ScrambleLens
            text={SITE.tagline}
            className="hero-title text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          />
          <p className="hero-sub mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            {SITE.description} Nothing is uploaded. No account required.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#192837] shadow-lg shadow-black/20 transition-transform hover:bg-white/95 active:scale-95 sm:text-base"
            >
              Download APK
            </a>
            <a
              href="#how-it-works"
              className="liquid-glass rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
            >
              See how it works
            </a>
          </div>
        </div>

        <a
          href="#how-it-works"
          className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/80 sm:bottom-8"
          aria-label="Scroll to how it works"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <span className="hero-scroll-line block h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </a>
      </div>
    </section>
  );
}
