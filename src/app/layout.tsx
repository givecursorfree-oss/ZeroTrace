import type { Metadata, Viewport } from 'next';
import { Figtree, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { AnimationPreloader } from '@/components/effects/AnimationPreloader';
import { LenisProvider } from '@/components/scroll/LenisProvider';
import { SiteProtection } from '@/components/security/SiteProtection';
import { RiveRuntimeInit } from '@/components/rive/RiveRuntimeInit';
import { JsonLd } from '@/components/seo/JsonLd';
import { rootMetadata } from '@/lib/seo/metadata';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-loaded',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
  variable: '--font-figtree',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fdfcfc',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${figtree.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preload" href="/rive/rive.wasm" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/rive/burst-icons8.riv" as="fetch" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className={inter.className}>
        <RiveRuntimeInit />
        <SiteProtection />
        <AnimationPreloader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
