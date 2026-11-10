import { site } from '@/config/site';
import { JsonLd } from './JsonLd';
export type BreadcrumbItem = { name: string; path: string };
export function BreadcrumbJsonLd({ locale, items }: { locale: string; items: readonly BreadcrumbItem[] }) {
  // Google requires absolute URLs. Wait for the real domain instead of inventing one.
  if (!site.domain || items.length === 0) return null;
  const origin = site.domain.endsWith('/') ? site.domain : `${site.domain}/`;
  const elements = [{ name: 'VERQIA', path: `/${locale}` }, ...items].map((item, index) => ({
    '@type': 'ListItem', position: index + 1, name: item.name,
    item: new URL(`/${locale}${item.path === '/' ? '' : item.path}`, origin).toString(),
  }));
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: elements }} />;
}
