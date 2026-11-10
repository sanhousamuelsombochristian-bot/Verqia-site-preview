import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Pricing } from '@/components/sections/pricing/Pricing';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('pricingPage'); return localizedMetadata(locale, '/tarifs', t('title'), t('description')); }
export default async function PricingPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('pricingPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/tarifs' }]} /><Pricing locale={locale} /></>; }
