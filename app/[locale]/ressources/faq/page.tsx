import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Faq } from '@/components/sections/resources/Faq';
import { faqKeys } from '@/config/faq';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('faqPage'); return localizedMetadata(locale, '/ressources/faq', t('title'), t('description')); }
export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations('faqPage');
  const resources = await getTranslations('resourcesPage');
  const mainEntity = faqKeys.map((key) => ({ '@type': 'Question', name: t(`items.${key}.question`), acceptedAnswer: { '@type': 'Answer', text: t(`items.${key}.answer`) } }));
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }).replace(/</g, '\\u003c');
  return <><BreadcrumbJsonLd locale={locale} items={[{ name: resources('title'), path: '/ressources' }, { name: t('title'), path: '/ressources/faq' }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /><Faq /></>;
}
