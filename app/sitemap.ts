import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/config/site';
import { indexingEnabled } from '@/lib/indexing';
const paths = [
  '/', '/produit', '/produit/modules', '/produit/moteur-decisionnel', '/produit/demonstration',
  '/solutions', '/tarifs', '/ressources', '/ressources/faq', '/ressources/pilote', '/a-propos',
  '/securite', '/contact', '/legal/mentions-legales', '/legal/confidentialite', '/legal/cgu',
  '/legal/cgv', '/legal/cookies',
] as const;
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled || !site.domain) return [];
  const base = site.domain.endsWith('/') ? site.domain : `${site.domain}/`;
  return paths.flatMap((path) => routing.locales.map((locale) => {
    const localized = `/${locale}${path === '/' ? '' : path}`;
    return {
      url: new URL(localized, base).toString(),
      alternates: { languages: Object.fromEntries(routing.locales.map((language) => [language, new URL(`/${language}${path === '/' ? '' : path}`, base).toString()])) },
    };
  }));
}
