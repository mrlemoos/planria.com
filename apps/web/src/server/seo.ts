import type { Metadata, Viewport } from 'next';

import packageJSON from '../../package.json' with { format: 'json' };

import { APP_NAME, APP_URL, APP_VERSION, CONTACT_EMAIL, PRODUCT_DESCRIPTION, SUPPORT_EMAIL } from "./meta";

/**
 * Creates a viewport object with theme colors based on the user's preferred color scheme.
 */
export function createViewport(): Viewport {
  return {
    themeColor: [
      {
        color: '#000',
        media: '(prefers-color-scheme: dark)',
      },
      {
        color: '#fff',
        media: '(prefers-color-scheme: light)',
      },
      {
        color: '#f0f0f0',
        media: '(prefers-color-scheme: no-preference)',
      }
    ]
  }
}

/**
 * Creates metadata for SEO (Search Engine Optimization) purposes.
 * 
 * This function is meant to be run in build time.
 */
export function createMetadata({ openGraph, twitter, noIndex = false, ...metadata }: Partial<Metadata> & { noIndex?: boolean } = {}): Metadata {
  return {
    title: `${APP_NAME} | ${PRODUCT_DESCRIPTION}`,
    description: PRODUCT_DESCRIPTION,
    keywords: [...packageJSON.keywords], // copies the array from the package.json so we always use the same stuff
    metadataBase: new URL(APP_URL),
    twitter: {
      site: `@${APP_NAME}`,
      card: 'summary_large_image',
      title: `${APP_NAME} | ${PRODUCT_DESCRIPTION}`,
      siteId: APP_NAME,
      description: PRODUCT_DESCRIPTION,
      ...twitter,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: APP_URL,
      title: `${APP_NAME} | ${PRODUCT_DESCRIPTION}`,
      siteName: APP_NAME,
      description: PRODUCT_DESCRIPTION,
      alternateLocale: ['en_GB', 'en_CA', 'en_AU'],
      emails: [CONTACT_EMAIL, SUPPORT_EMAIL],
      determiner: 'auto',
      ...openGraph,
    },
    generator: `${APP_NAME} ${APP_VERSION}`,
    ...metadata,
    ...(noIndex ? { robots: 'noindex nofollow' } : {}),
  }
}