import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { indexingEnabled } from '@/lib/indexing';

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled || !site.domain) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  const origin = new URL(site.domain);
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', origin).toString(),
    host: origin.hostname,
  };
}
