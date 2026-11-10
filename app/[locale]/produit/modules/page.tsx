import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Modules } from '@/components/sections/product/Modules';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('modulesPage'); return localizedMetadata(locale, '/produit/modules', t('title'), t('subtitle')); }
export default async function ModulesPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('modulesPage'); const parent = await getTranslations('productHub'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: parent('metadataTitle'), path: '/produit' }, { name: t('title'), path: '/produit/modules' }]} /><main id="main-content" className="modules-page"><Modules /></main></>; }
