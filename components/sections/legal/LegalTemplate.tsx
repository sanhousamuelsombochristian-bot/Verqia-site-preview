import { useLocale, useTranslations } from 'next-intl';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { CookiePreferencesButton } from '@/components/layout/CookiePreferencesButton';
import { plans, type PlanKey, type Value } from '@/config/plans';
import { site } from '@/config/site';
import { publicCommercialOfferEnabled } from '@/lib/launch-scope';
export type LegalSlug = 'mentions-legales' | 'confidentialite' | 'cgu' | 'cgv' | 'cookies';
const pages: Record<LegalSlug, { fields: readonly string[]; sections: readonly string[] }> = {
  'mentions-legales': { fields: ['companyName','legalForm','registeredOffice','rccm','capital','taxId','legalRepresentative','contactEmail','contactPhone','publicationDirector','hostName','hostAddress','hostContact'], sections: ['publisher','hosting','intellectualProperty','law'] },
  confidentialite: { fields: ['controller','purposes','dataCategories','recipients','retention','rightsContact','transferCountries','processors'], sections: ['data','purpose','recipients','retention','electronicArchive','transfers','rights'] },
  cgu: { fields: ['companyName','legalForm','contactEmail','contactPhone','serviceScope','accessRules','responsibility','data','applicableLaw','courts'], sections: ['service','access','responsibility','data','law'] },
  cgv: { fields: ['companyName','legalForm','registeredOffice','rccm','capital','taxId','contactEmail','contactPhone','taxStatus','payment','termination','responsibility','data','applicableLaw','courts'], sections: ['service','offers','payment','termination','responsibility','data','law'] },
  cookies: { fields: ['controller','cookieTypes','cookiePurposes','cookieDuration','consentMethod','contactEmail'], sections: ['purpose','types','duration','choices'] },
};
const configuredLegalFields: Record<string, string | null> = {
  companyName: site.legalIdentity, legalForm: site.legalForm, registeredOffice: site.legalAddress,
  rccm: site.rccm, capital: site.shareCapital, taxId: site.taxId, legalRepresentative: site.legalRepresentative,
  contactEmail: site.email, contactPhone: site.contactPhone, publicationDirector: site.publicationDirector,
  hostName: site.hostingProvider, hostAddress: site.hostingAddress, hostContact: site.hostingContact,
  controller: site.legalIdentity, rightsContact: site.privacyContactEmail,
};
const priceKeys: readonly PlanKey[] = ['free','starter','business','enterprise'];
const number = (amount: number, locale: string) => new Intl.NumberFormat(locale === 'fr' ? 'fr-CI' : 'en-US', { maximumFractionDigits: 0 }).format(amount);
function PriceValue({ value, suffix, locale }: { value: Value<number>; suffix: string; locale: string }) {
  return <span>{number(value.value, locale)} {suffix}</span>;
}
function CgvPrices({ locale }: { locale: string }) {
  const t = useTranslations('legalPage');
  const pricing = useTranslations('pricingPage');
  return <section className="legal-prices" aria-labelledby="legal-prices-title"><h2 id="legal-prices-title">{t('pricesTitle')}</h2><p>{t('pricesNote')}</p><div className="legal-prices__wrap"><table><caption>{t('pricesCaption')}</caption><thead><tr><th scope="col">{t('plan')}</th><th scope="col">{t('monthly')}</th><th scope="col">{t('annual')}</th></tr></thead><tbody>{priceKeys.map((key) => {
    if (key === 'enterprise') return <tr key={key}><th scope="row">{pricing(`plans.${key}.name`)}</th><td colSpan={2}>{t('quote')}</td></tr>;
    const data = plans[key];
    return <tr key={key}><th scope="row">{pricing(`plans.${key}.name`)}</th><td><PriceValue value={data.monthly} suffix={t('priceMonth')} locale={locale} /></td><td><PriceValue value={data.annual} suffix={t('priceYear')} locale={locale} /></td></tr>;
  })}</tbody></table></div></section>;
}
export function LegalTemplate({ slug }: { slug: LegalSlug }) {
  const t = useTranslations('legalPage');
  const locale = useLocale();
  const config = pages[slug];
  const availableFields = config.fields.flatMap((key) => {
    const value = configuredLegalFields[key];
    return value ? [{ key, value }] : [];
  });
  return <main id="main-content" className="legal-page"><BreadcrumbJsonLd locale={locale} items={[{ name: t(`pages.${slug}.title`), path: `/legal/${slug}` }]} /><div className="home-section__inner legal-page__inner"><header className="legal-page__header"><p>{t('eyebrow')}</p><h1>{t(`pages.${slug}.title`)}</h1><p className="legal-page__intro">{t(`pages.${slug}.intro`)}</p><p className="legal-page__review">{t('reviewNotice')}</p></header>{slug === 'cookies' && <CookiePreferencesButton />}<p className="legal-page__bank-note">{t('bankNotice')}</p>{availableFields.length > 0 && <section aria-labelledby="legal-fields-title"><h2 id="legal-fields-title">{t('fieldsTitle')}</h2><dl className="legal-fields">{availableFields.map(({ key, value }) => <div key={key}><dt>{t(`fields.${key}`)}</dt><dd>{value}</dd></div>)}</dl></section>}{slug === 'cgv' && publicCommercialOfferEnabled && <CgvPrices locale={locale} />}<div className="legal-sections">{config.sections.map((key, index) => <section key={key} aria-labelledby={`legal-section-${key}`}><span>{String(index+1).padStart(2,'0')}</span><h2 id={`legal-section-${key}`}>{t(`sections.${slug}.${key}.title`)}</h2><p>{t(`sections.${slug}.${key}.body`)}</p></section>)}</div></div></main>;
}
