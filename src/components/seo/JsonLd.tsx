import { SITE } from '@/data/content';
import { DEFAULT_DESCRIPTION, SITE_URL } from '@/lib/seo/site';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo_mark.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [SITE.githubUrl],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@type': 'Organization', name: SITE.name },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/get-app`,
    'query-input': 'required name=search_term_string',
  },
};

const software = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  applicationCategory: 'SecurityApplication',
  applicationSubCategory: 'Privacy',
  operatingSystem: 'Android, Windows',
  softwareVersion: SITE.version,
  description: DEFAULT_DESCRIPTION,
  downloadUrl: SITE.downloadUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  author: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.githubUrl,
  },
  isAccessibleForFree: true,
  featureList:
    'EXIF and GPS removal, face blur, license plate detection, secret scanning, on-device processing, no cloud upload',
};

export function JsonLd() {
  const payload = [organization, website, software];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
