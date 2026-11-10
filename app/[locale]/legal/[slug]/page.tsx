import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalTemplate, type LegalSlug } from '@/components/sections/legal/LegalTemplate';
const legalSlugs: readonly LegalSlug[] = ['mentions-legales', 'confidentialite', 'cgu', 'cgv', 'cookies'];
type PageProps = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return legalSlugs.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale, slug } = await params; if (!legalSlugs.includes(slug as LegalSlug)) notFound(); setRequestLocale(locale); const t = await getTranslations('legalPage'); return { title: t(`pages.${slug}.title`), description: t(`pages.${slug}.intro`) }; }
export default async function LegalPage({ params }: PageProps) { const { locale, slug } = await params; if (!legalSlugs.includes(slug as LegalSlug)) notFound(); setRequestLocale(locale); return <LegalTemplate slug={slug as LegalSlug} />; }
