import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AccentWord } from '@/components/ui/AccentWord';
import { ContactChannels } from '@/components/sections/ContactChannels';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  return localizedMetadata(locale, '/contact', t('title'), t('metaDescription'));
}

type ContactPageProps = { params: Promise<{ locale: string }>; searchParams: Promise<{ source?: string | string[] }> };

export default async function ContactPage({ params: routeParams, searchParams }: ContactPageProps) {
  const { locale } = await routeParams;
  setRequestLocale(locale);
  const params = await searchParams;
  const sourceParam = params.source;
  const source = Array.isArray(sourceParam) ? sourceParam[0] ?? null : sourceParam ?? null;
  const t = await getTranslations('contact');

  return <main id="main-content" className="contact-page">
    <BreadcrumbJsonLd locale={locale} items={[{ name: t('title'), path: '/contact' }]} />
    <section className="contact-page__hero" aria-labelledby="contact-heading">
      <div className="contact-page__hero-inner">
        <SectionLabel>{t('eyebrow')}</SectionLabel>
        <h1 id="contact-heading">{t('titleLead')} <AccentWord>{t('titleAccent')}</AccentWord></h1>
      </div>
    </section>
    <section className="contact-page__body" aria-label={t('channelsHeading')}>
      <div className="contact-card">
        <header className="contact-card__head"><h2>{t('channelsHeading')}</h2></header>
        {/* Phase 2 insertion point: a validated contact form will be added here when the backend is introduced. */}
        <ContactChannels source={source} />
      </div>
    </section>
  </main>;
}
