import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AccentWord } from '@/components/ui/AccentWord';

const functions = [
  { key: 'centralize', index: '01' },
  { key: 'understand', index: '02' },
  { key: 'anticipate', index: '03' },
  { key: 'decide', index: '04' },
] as const;

export function Solution() {
  const t = useTranslations('home.solution');
  const outcomes = t.raw('outcomes') as string[];

  return <section className="home-solution section-paper" aria-labelledby="home-solution-title">
    <div className="home-section__inner">
      <SectionLabel>{t('eyebrow')}</SectionLabel>
      <Reveal className="home-solution__heading">
        <h2 id="home-solution-title">{t('titleLead')} <AccentWord>{t('titleAccent')}</AccentWord></h2>
        <p>{t('intro')}</p>
      </Reveal>
      <div className="home-solution__layout">
        <ol className="home-solution__index" aria-label={t('indexLabel')}>
          {functions.map((item) => <li key={item.key}><span>{item.index}</span>{t(`benefits.${item.key}.title`)}</li>)}
        </ol>
        <Reveal>
          <div className="home-solution__stack">
            {functions.map((item, index) => <article className="home-solution__card" style={{ '--stack-index': index } as CSSProperties} key={item.key}>
              <span className="home-solution__number">{item.index}</span>
              <div className="home-solution__card-copy">
                <h3>{t(`benefits.${item.key}.title`)}</h3>
                <dl className="home-solution__details">
                  <div><dt>{t('labels.problem')}</dt><dd>{t(`benefits.${item.key}.problem`)}</dd></div>
                  <div><dt>{t('labels.action')}</dt><dd>{t(`benefits.${item.key}.action`)}</dd></div>
                  <div><dt>{t('labels.value')}</dt><dd>{t(`benefits.${item.key}.value`)}</dd></div>
                </dl>
              </div>
            </article>)}
          </div>
        </Reveal>
      </div>
      <Reveal className="home-solution__outcomes">
        <div className="home-solution__outcomes-heading"><h3>{t('outcomesTitle')}</h3><p>{t('outcomesIntro')}</p></div>
        <ul>{outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
      </Reveal>
    </div>
  </section>;
}
