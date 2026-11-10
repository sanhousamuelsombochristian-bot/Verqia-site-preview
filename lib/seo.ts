import type { Metadata } from 'next';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';

const languagePath = (locale: string, path: string) => `/${locale}${path === '/' ? '' : path}`;

export function localizedMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const canonicalPath = languagePath(locale, path);
  const imagePath = `/${locale}/opengraph-image`;
  const languages = Object.fromEntries([...routing.locales.map((language) => [language, languagePath(language, path)]), ['x-default', languagePath('fr', path)]]);
  const absoluteUrl = site.domain ? new URL(canonicalPath, site.domain).toString() : undefined;
  const absoluteImage = site.domain ? new URL(imagePath, site.domain).toString() : undefined;
  return {
    title, description,
    alternates: { canonical: absoluteUrl ?? canonicalPath, languages },
    openGraph: { title, description, type: 'website', siteName: 'VERQIA', locale: locale === 'fr' ? 'fr_CI' : 'en_US', ...(absoluteUrl ? { url: absoluteUrl } : {}), ...(absoluteImage ? { images: [{ url: absoluteImage, width: 1200, height: 630, alt: 'VERQIA' }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(absoluteImage ? { images: [absoluteImage] } : {}) },
  };
}
