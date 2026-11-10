import { BadgeCheck, Lightbulb, Scale, ScanSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { aboutValues, type AboutValueKey } from '@/config/about';
import { site } from '@/config/site';
import { Reveal } from '@/components/ui/Reveal';

const valueIcons: Record<AboutValueKey, typeof ScanSearch> = {
  clarity: ScanSearch,
  reliability: BadgeCheck,
  innovation: Lightbulb,
  mastery: Scale,
};

// The retained public overview intentionally excludes founder, partner, team
// and testimonial sections until their publication authority is separately set.
export function Founder() {
  const t = useTranslations('aboutPage');
  const locationDetails = [
    site.city ? { label: t('city'), value: site.city } : null,
    site.domain ? { label: t('domain'), value: site.domain } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return <main id="main-content" className="about-page">
    <section className="about-hero about-hero--institutional" aria-labelledby="about-title"><div className="home-section__inner">
      <Reveal><p className="about-hero__eyebrow">{t('eyebrow')}</p><h1 id="about-title">{t('title')}</h1><p className="about-hero__description">{t('description')}</p></Reveal>
      <Reveal delay={0.12}><div className="about-hero__visual" aria-hidden="true"><div className="about-hero__orb" /><div className="about-hero__ledger"><span /><span /><span /><i /></div><div className="about-hero__status"><b /><small>{t('heroVisualLabel')}</small></div></div></Reveal>
    </div></section>

    <section className="about-purpose" aria-labelledby="purpose-title"><div className="home-section__inner">
      <Reveal><p className="section-label"><span />{t('purpose.eyebrow')}</p><h2 id="purpose-title">{t('purpose.title')}</h2></Reveal>
      <div className="about-purpose__grid"><Reveal><article><span>{t('purpose.visionLabel')}</span><h3>{t('purpose.vision')}</h3></article></Reveal><Reveal delay={0.08}><article><span>{t('purpose.missionLabel')}</span><h3>{t('purpose.mission')}</h3></article></Reveal></div>
    </div></section>

    <section className="about-values" aria-labelledby="values-title"><div className="home-section__inner"><Reveal><p className="section-label"><span />{t('values.eyebrow')}</p><h2 id="values-title">{t('values.title')}</h2></Reveal><div className="about-values__grid">
      {aboutValues.map(({ key }, index) => { const Icon = valueIcons[key]; return <Reveal key={key} delay={index * 0.06}><article className="about-value-card"><span className="about-value-card__number">{String(index + 1).padStart(2, '0')}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" /><h3>{t(`values.items.${key}.title`)}</h3><p>{t(`values.items.${key}.description`)}</p></article></Reveal>; })}
    </div></div></section>

    {locationDetails.length > 0 && <section className="about-geography" aria-labelledby="geography-title"><div className="home-section__inner"><h2 id="geography-title">{t('geographyTitle')}</h2><dl>{locationDetails.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>}
  </main>;
}
