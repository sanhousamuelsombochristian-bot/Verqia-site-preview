import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Demo } from '@/components/sections/product/Demo';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('demoPage'); return localizedMetadata(locale, '/produit/demonstration', t('title'), t('description')); }
export default async function DemoPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('demoPage'); const parent = await getTranslations('productHub'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: parent('metadataTitle'), path: '/produit' }, { name: t('title'), path: '/produit/demonstration' }]} /><Demo /></>; }
