import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Founder } from '@/components/sections/about/Founder';
import { EditorialQuote } from '@/components/ui/EditorialQuote';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('aboutPage'); return localizedMetadata(locale, '/a-propos', t('title'), t('description')); }
export default async function AboutPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('aboutPage'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/a-propos' }]} /><Founder /><div className="about-quote"><div className="home-section__inner"><EditorialQuote id={5} /></div></div></>; }
