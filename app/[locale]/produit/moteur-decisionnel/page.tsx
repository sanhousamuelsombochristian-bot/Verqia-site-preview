import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DecisionEngine } from '@/components/sections/decision/DecisionEngine';
import { DeferredDecisionDemo } from '@/components/sections/decision/DeferredDecisionDemo';
import { EditorialQuote } from '@/components/ui/EditorialQuote';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('decisionEngine'); return localizedMetadata(locale, '/produit/moteur-decisionnel', t('metadataTitle'), t('explanation')); }
export default async function DecisionPage({ params }: PageProps) { const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('decisionEngine'); const parent = await getTranslations('productHub'); return <><BreadcrumbJsonLd locale={locale} items={[{ name: parent('metadataTitle'), path: '/produit' }, { name: t('metadataTitle'), path: '/produit/moteur-decisionnel' }]} /><main id="main-content" className="decision-page"><DecisionEngine /><DeferredDecisionDemo /><section className="decision-quote section-paper"><div className="home-section__inner"><EditorialQuote id={4} /></div></section></main></>; }
