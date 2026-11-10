'use client';
import { useTranslations } from 'next-intl';
import { Audiences } from './Audiences';
import { Simulations } from './Simulations';
import { EditorialQuote } from '@/components/ui/EditorialQuote';

export function Solutions() {
  const t = useTranslations('solutionsPage');
  return <main id="main-content" className="solutions-page">
    <section className="solutions-hero" aria-labelledby="solutions-title"><div className="home-section__inner"><p className="solutions-hero__eyebrow">{t('eyebrow')}</p><h1 id="solutions-title">{t('title')}</h1><p className="solutions-hero__description">{t('description')}</p></div></section>
    <section className="solutions-audiences" aria-labelledby="audiences-title"><div className="home-section__inner"><h2 id="audiences-title">{t('audiencesTitle')}</h2><Audiences /></div></section>
    <div className="solutions-quote"><div className="home-section__inner"><EditorialQuote id={3} /></div></div>
    <Simulations />
  </main>;
}
