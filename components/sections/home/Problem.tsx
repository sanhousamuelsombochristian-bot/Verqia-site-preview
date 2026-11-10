import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NumberedCard } from '@/components/ui/NumberedCard';
import { EditorialQuote } from '@/components/ui/EditorialQuote';

export function Problem() {
  const t = useTranslations('home.problem');
  const cards = t.raw('cards') as string[];
  return <section className="home-problem section-paper" aria-labelledby="home-problem-title">
    <div className="home-section__inner">
      <SectionLabel>{t('eyebrow')}</SectionLabel>
      <Reveal className="home-problem__intro"><h2 id="home-problem-title">{t('title')}</h2><p>{t('body')}</p></Reveal>
      <div className="home-problem__cards">{cards.map((title, index) => <Reveal delay={index * 0.08} key={title}><NumberedCard number={index + 1} total={cards.length} title={title}><span className="home-problem__card-mark" aria-hidden="true" /></NumberedCard></Reveal>)}</div>
      <div className="home-problem__quote"><EditorialQuote id={1} /></div>
    </div>
  </section>;
}
