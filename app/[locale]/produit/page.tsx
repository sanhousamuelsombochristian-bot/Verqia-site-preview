import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductVideo } from '@/components/sections/product/ProductVideo';
import { ProductWorkflow } from '@/components/sections/product/ProductWorkflow';
import { Journey } from '@/components/sections/product/Journey';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('productHub'); return localizedMetadata(locale, '/produit', t('metadataTitle'), t('journeyTitle')); }
export default async function ProductPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('productHub'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('metadataTitle'), path: '/produit' }]} /><main id="main-content" className="product-hub"><ProductVideo /><ProductWorkflow /><Journey /></main></>; }
