import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PilotProgram } from '@/components/sections/resources/PilotProgram';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('pilotPage'); return localizedMetadata(locale, '/ressources/pilote', t('title'), t('description')); }
export default async function PilotPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('pilotPage'); const resources = await getTranslations('resourcesPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: resources('title'), path: '/ressources' }, { name: t('title'), path: '/ressources/pilote' }]} /><PilotProgram /></>; }
