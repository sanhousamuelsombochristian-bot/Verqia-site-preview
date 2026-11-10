import { useTranslations } from 'next-intl';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AccentWord } from '@/components/ui/AccentWord';

const decisionKeys = ['proceed', 'defer', 'suspend', 'exception'] as const;

export function DecisionEngine() {
  const t = useTranslations('decisionEngine');
  return <section className="decision-intro section-dark" aria-labelledby="decision-title">
    <div className="home-section__inner">
      <SectionLabel>{t('eyebrow')}</SectionLabel>
      <h1 id="decision-title" className="decision-intro__title">
        {t('titleLead')} <AccentWord>{t('titleAccent')}</AccentWord>
      </h1>
      <p className="decision-intro__body">{t('explanation')}</p>
      <div className="decision-cards">{decisionKeys.map((key, index) => <article className="decision-card" key={key}>
        <span className="decision-card__index">0{index + 1} / 04</span>
        <h2>{t(`decisions.${key}.title`)}</h2>
        <p>{t(`decisions.${key}.meaning`)}</p>
      </article>)}</div>
      <p className="decision-intro__access">{t('accessLabel')} <strong>{t('business')}</strong> {t('and')} <strong>{t('enterprise')}</strong>.</p>
    </div>
  </section>;
}
