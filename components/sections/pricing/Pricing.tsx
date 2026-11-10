'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import type { PlanKey } from '@/config/plans';
import { media } from '@/config/media';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';
import { PlanCard } from './PlanCard';
import { ComparisonTable } from './ComparisonTable';
import { PricingFaq } from './PricingFaq';

type Billing = 'monthly' | 'annual';
const keys: readonly PlanKey[] = ['free', 'starter', 'business', 'enterprise'];

export function Pricing({ locale }: { locale: string }) {
  const t = useTranslations('pricingPage');
  const [billing, setBilling] = useState<Billing>('monthly');
  const showVideoPlaceholder = process.env.NODE_ENV !== 'production' || media.pricingShort.src !== null;
  const canContact = Boolean(site.email || site.whatsapp || site.calendly);

  if (!publicCommercialOfferEnabled) return <main id="main-content" className="pricing-page">
    <section className="pricing-hero" aria-labelledby="pricing-title"><div className="home-section__inner">
      <p className="pricing-hero__eyebrow">{t('eyebrow')}</p><h1 id="pricing-title">{t('unavailableTitle')}</h1><p className="pricing-hero__description">{t('unavailableDescription')}</p>
    </div></section>
  </main>;

  return <main id="main-content" className="pricing-page">
    <section className="pricing-hero" aria-labelledby="pricing-title"><div className="home-section__inner">
      <p className="pricing-hero__eyebrow">{t('eyebrow')}</p><h1 id="pricing-title">{t('title')}</h1><p className="pricing-hero__description">{t('description')}</p>
      <div className="billing-toggle"><span className={billing === 'monthly' ? 'is-active' : ''}>{t('monthly')}</span><button type="button" role="switch" aria-checked={billing === 'annual'} aria-label={t('billingSwitch')} onClick={() => setBilling((current) => current === 'monthly' ? 'annual' : 'monthly')}><span /></button><span className={billing === 'annual' ? 'is-active' : ''}>{t('annual')}</span><span className="billing-toggle__offer"><Check size={13} aria-hidden="true" />{t('annualOffer')}</span></div>
      <div className="pricing-cards">{keys.map((plan) => <PlanCard key={plan} planKey={plan} billing={billing} locale={locale} />)}</div>
    </div></section>
    <section className="pricing-comparison" aria-labelledby="comparison-title"><div className="home-section__inner"><div className="pricing-section-heading"><p>{t('comparisonEyebrow')}</p><h2 id="comparison-title">{t('comparisonTitle')}</h2></div><ComparisonTable /></div></section>
    <section className="pricing-faq-section" aria-labelledby="pricing-faq-title"><div className="home-section__inner pricing-faq-section__inner"><div className="pricing-section-heading"><p>{t('faqEyebrow')}</p><h2 id="pricing-faq-title">{t('faqTitle')}</h2></div><PricingFaq /></div></section>
    {showVideoPlaceholder && <section className="pricing-video" aria-labelledby="pricing-video-title"><div className="home-section__inner"><div className="pricing-section-heading"><p>{t('videoEyebrow')}</p><h2 id="pricing-video-title">{t('videoTitle')}</h2></div><VideoPlayer src={media.pricingShort.src} poster={media.pricingShort.poster} captionsFr={media.pricingShort.captionsFr} captionsEn={media.pricingShort.captionsEn} label={t('videoLabel')} /><p className="pricing-video__note">{t('videoNote')}</p></div></section>}
    {canContact && <section className="pricing-contact-cta"><div className="home-section__inner"><p>{t('contactText')}</p><Button href="/contact" variant="secondary">{t('contactCta')}</Button></div></section>}
  </main>;
}
