import { site } from '@/config/site';
import { JsonLd } from './JsonLd';

export function HomeJsonLd({ description }: { description: string }) {
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'VERQIA',
    ...(site.domain ? { url: site.domain } : {}),
    ...(site.email ? { email: site.email } : {}),
  };
  const presentation = {
    '@context': 'https://schema.org', '@type': 'WebPage', name: 'VERQIA PILOT', description,
    ...(site.domain ? { url: site.domain } : {}),
  };
  return <><JsonLd data={organization} /><JsonLd data={presentation} /></>;
}
