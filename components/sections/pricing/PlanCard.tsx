'use client';
import { useTranslations } from 'next-intl';
import { LockKeyhole } from 'lucide-react';
import { plans, type PlanKey, type Value } from '@/config/plans';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { calculateAnnualSavings, calculateFreeMonths } from '@/lib/pricing';

type Billing = 'monthly' | 'annual';
const localeFor = (locale: string) => locale === 'fr' ? 'fr-CI' : 'en-US';
const formatNumber = (value: number, locale: string) => new Intl.NumberFormat(localeFor(locale), { maximumFractionDigits: 0 }).format(value);

function QuotaValue({ value, unit, locale }: { value: Value<number>; unit: string; locale: string }) {
  return <span className="pricing-quota__value">{formatNumber(value.value, locale)} {unit}</span>;
}

export function PlanCard({ planKey, billing, locale }: { planKey: PlanKey; billing: Billing; locale: string }) {
  const t = useTranslations('pricingPage');
  const featureKeys = ['workspace', 'quotas', 'dashboard'] as const;
  const canContact = Boolean(site.email || site.whatsapp || site.calendly);
  if (planKey === 'enterprise') return <article id="plan-enterprise" className="pricing-card" aria-labelledby="plan-title-enterprise">
    <p className="pricing-card__role">{t('plans.enterprise.role')}</p><h3 id="plan-title-enterprise">{t('plans.enterprise.name')}</h3>
    <p className="pricing-card__description">{t('plans.enterprise.description')}</p><div className="pricing-card__price"><strong>{t('quote')}</strong></div>
    <dl className="pricing-card__quotas"><div><dt>{t('users')}</dt><dd>{t('custom')}</dd></div><div><dt>{t('invoices')}</dt><dd>{t('custom')}</dd></div><div><dt>{t('clients')}</dt><dd>{t('custom')}</dd></div></dl>
    <ul className="pricing-card__features">{featureKeys.map((key) => <li key={key}>{t(`plans.enterprise.features.${key}`)}</li>)}</ul>
    {canContact && <Button href="/contact" className="pricing-card__cta" variant="secondary">{t('plans.enterprise.cta')}</Button>}
  </article>;

  const data = plans[planKey];
  const price = data[billing];
  const savings = billing === 'annual' ? calculateAnnualSavings(data.monthly.value, data.annual.value) : 0;
  const freeMonths = billing === 'annual' ? calculateFreeMonths(data.monthly.value, data.annual.value) : 0;
  const priceText = `${formatNumber(price.value, locale)} ${t(billing === 'monthly' ? 'pricePerMonth' : 'perYear')}`;
  return <article id={`plan-${planKey}`} className={`pricing-card${planKey === 'business' ? ' pricing-card--featured' : ''}`} aria-labelledby={`plan-title-${planKey}`}>
    {planKey === 'business' && <span className="pricing-card__ribbon">{t('recommended')}</span>}
    <p className="pricing-card__role">{t(`plans.${planKey}.role`)}</p><h3 id={`plan-title-${planKey}`}>{t(`plans.${planKey}.name`)}</h3>
    <p className="pricing-card__description">{t(`plans.${planKey}.description`)}</p>
    <div className="pricing-card__price"><strong key={billing} className="pricing-price-value" aria-live="polite" aria-atomic="true">{priceText}</strong></div>
    {freeMonths > 0 && <p className="pricing-card__saving">{t('savings', { amount: formatNumber(savings, locale), months: freeMonths })}</p>}
    <dl className="pricing-card__quotas">
      <div><dt>{t('users')}</dt><dd><QuotaValue value={data.users} unit={t('usersUnit')} locale={locale} /></dd></div>
      <div><dt>{t('invoices')}</dt><dd><QuotaValue value={data.invoices} unit={t(data.quotaMode === 'total' ? 'total' : 'quotaPerMonth')} locale={locale} /></dd></div>
      <div><dt>{t('clients')}</dt><dd><QuotaValue value={data.clients} unit={t(data.quotaMode === 'total' ? 'total' : 'clientsUnit')} locale={locale} /></dd></div>
    </dl>
    <ul className="pricing-card__features">{featureKeys.map((key) => <li key={key}>{t(`plans.${planKey}.features.${key}`)}</li>)}</ul>
    <p className="pricing-card__locked"><LockKeyhole size={15} aria-hidden="true" /><span>{t(`plans.${planKey}.locked`)}</span><b>{t(`plans.${planKey}.upgrade`)}</b></p>
    {(planKey === 'free' || canContact) && <Button href={planKey === 'free' ? '/produit/demonstration' : '/contact'} className="pricing-card__cta" variant={planKey === 'business' ? 'primary' : 'secondary'}>{t(`plans.${planKey}.cta`)}</Button>}
  </article>;
}
