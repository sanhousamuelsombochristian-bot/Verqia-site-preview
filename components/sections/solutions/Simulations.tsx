'use client';
import { useLocale, useTranslations } from 'next-intl';
import { simulations } from '@/config/simulations';
import { Badge } from '@/components/ui/Badge';

export function Simulations() {
  const t = useTranslations('solutionsPage.simulations');
  const locale = useLocale() === 'fr' ? 'fr-CI' : 'en-US';
  const number = (value: number, fraction = 0) => new Intl.NumberFormat(locale, { maximumFractionDigits: fraction }).format(value);
  return <section className="simulations-section" aria-labelledby="simulations-title">
    <div className="home-section__inner">
      <div className="simulations-section__heading"><div><p>{t('eyebrow')}</p><h2 id="simulations-title">{t('title')}</h2></div></div>
      <div className="simulations-grid">{simulations.map((simulation) => <article className="simulation-card" key={simulation.id}>
        <Badge>{t('illustrativeLabel')}</Badge><h3>{t(`scenarios.${simulation.id}.title`)}</h3><p className="simulation-card__tagline">{t(`scenarios.${simulation.id}.context`)}</p>
        <dl className="simulation-card__metrics"><div><dt>{t('overdue')}</dt><dd><span>{number(simulation.overdueBefore)}</span><span aria-hidden="true">→</span><strong>{number(simulation.overdueAfter)}</strong></dd></div><div><dt>{t('followUp')}</dt><dd className="simulation-card__reduction">−{number(simulation.followUpTimeReductionPercent)}%</dd></div><div><dt>{t('amount')}</dt><dd>{number(simulation.amountXofMillions, 1)} <small>{t('millions')}</small></dd></div></dl>
        <p className="simulation-card__duration">{t('duration', { weeks: simulation.durationWeeks })}</p>
        <p className="simulation-card__warning">{t('illustrativeDisclaimer')}</p>
      </article>)}</div>
    </div>
  </section>;
}
