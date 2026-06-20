import type { Metadata } from 'next';
import { BRAND, SITE } from '@/data/content';
import { DEFAULT_DESCRIPTION, SEO_KEYWORDS, SITE_URL } from './site';

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  keywords = [...SEO_KEYWORDS],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  const url = `${SITE_URL}${canonicalPath || '/'}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath || '/',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}${BRAND.full}`,
          width: 1200,
          height: 630,
          alt: BRAND.fullAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${BRAND.full}`],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: `${SITE.name} - ${SITE.tagline}`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}${BRAND.full}`,
        width: 1200,
        height: 630,
        alt: BRAND.fullAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.tagline}`,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}${BRAND.full}`],
  },
};
