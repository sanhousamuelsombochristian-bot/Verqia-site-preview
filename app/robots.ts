import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { indexingEnabled } from '@/lib/indexing';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, ...(indexingEnabled && site.domain ? { sitemap: new URL('/sitemap.xml', site.domain).toString(), host: site.domain } : {}) };
}
