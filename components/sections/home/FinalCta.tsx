import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCta() {
  const t = useTranslations('home.finalCta');
  return <section className="home-final-cta section-paper" aria-labelledby="home-final-title">
    <Reveal className="home-section__inner home-final-cta__layout">
      <h2 id="home-final-title">{t('title')}</h2>
      <div className="home-final-cta__card">
        <p>{t('pilotOffer')}</p>
        <div>
          <Button href="/produit">{t('pilotCta')}</Button>
          <Button href="/produit/demonstration" variant="secondary">{t('freeCta')}</Button>
        </div>
      </div>
    </Reveal>
  </section>;
}
