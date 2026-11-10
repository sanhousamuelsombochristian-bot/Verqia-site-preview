import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Security } from '@/components/sections/legal/Security';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('securityPage'); return localizedMetadata(locale, '/securite', t('title'), t('description')); }
export default async function SecurityPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('securityPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/securite' }]} /><Security /></>; }
