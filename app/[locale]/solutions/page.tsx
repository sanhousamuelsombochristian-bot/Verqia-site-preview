import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Solutions } from '@/components/sections/solutions/Solutions';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('solutionsPage'); return localizedMetadata(locale, '/solutions', t('title'), t('description')); }
export default async function SolutionsPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('solutionsPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/solutions' }]} /><Solutions /></>; }
