import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const steps = [
  { key: 'centralize', number: '01' },
  { key: 'identify', number: '02' },
  { key: 'prioritize', number: '03' },
  { key: 'organize', number: '04' },
  { key: 'follow', number: '05' },
  { key: 'record', number: '06' },
  { key: 'observe', number: '07' },
] as const;

export function ProductWorkflow() {
  const t = useTranslations('productWorkflow');

  return <section className="product-workflow section-paper" aria-labelledby="product-workflow-title">
    <div className="home-section__inner">
      <SectionLabel>{t('eyebrow')}</SectionLabel>
      <Reveal className="product-workflow__heading">
        <h2 id="product-workflow-title">{t('title')}</h2>
        <p>{t('intro')}</p>
      </Reveal>
      <p className="product-workflow__status" role="note">{t('statusNote')}</p>
      <ol className="product-workflow__steps">
        {steps.map((step, index) => <li className="product-workflow__step" key={step.key}>
          <Reveal className="product-workflow__card" delay={index * 0.035}>
            <span className="product-workflow__number">{step.number}</span>
            <div><h3>{t(`steps.${step.key}.title`)}</h3><p>{t(`steps.${step.key}.body`)}</p></div>
          </Reveal>
        </li>)}
      </ol>
      <Reveal className="product-workflow__difference">
        <h3>{t('differentiationTitle')}</h3>
        <p>{t('differentiationBody')}</p>
      </Reveal>
      <p className="product-workflow__limits">{t('limitations')}</p>
    </div>
  </section>;
}
