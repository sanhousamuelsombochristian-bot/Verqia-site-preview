import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';
export function PilotProgram() {
  const t = useTranslations('pilotPage');
  const steps = ['contact', 'scope', 'explore'] as const;
  const canContact = Boolean(site.email || site.whatsapp || site.calendly);
  return <main id="main-content" className="pilot-page"><section className="pilot-hero" aria-labelledby="pilot-title"><div className="home-section__inner"><p className="pilot-page__eyebrow">{t('eyebrow')}</p><h1 id="pilot-title">{t('title')}</h1><p className="pilot-page__description">{t('description')}</p><p className="pilot-page__terms">{t('offerStatus')} {t('terms')}</p><div className="pilot-steps">{steps.map((key,index)=><article className="pilot-step" key={key}><span>{String(index+1).padStart(2,'0')}</span><h2>{t(`steps.${key}.title`)}</h2><p>{t(`steps.${key}.description`)}</p></article>)}</div>{canContact && <div className="pilot-page__response"><Button href="/contact">{t('cta')}</Button></div>}</div></section></main>;
}
