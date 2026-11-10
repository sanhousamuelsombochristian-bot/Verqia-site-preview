import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResourcesHub } from '@/components/sections/resources/ResourcesHub';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('resourcesPage'); return localizedMetadata(locale, '/ressources', t('title'), t('description')); }
export default async function ResourcesPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('resourcesPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/ressources' }]} /><ResourcesHub /></>; }
