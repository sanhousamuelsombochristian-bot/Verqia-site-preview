import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { AccentWord } from '@/components/ui/AccentWord';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { MockDashboard } from './MockDashboard';
import { AmbientPulse } from '@/components/ui/AmbientPulse';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import { media } from '@/config/media';

export function Hero() {
  const t = useTranslations('home.hero');
  return <section id="home-hero" className="home-hero" aria-labelledby="home-title">
    <div className="home-hero__inner">
      <Reveal className="home-hero__copy">
        <SectionLabel>{t('eyebrow')}</SectionLabel>
        <h1 id="home-title"><span>{t('titleLine1')}</span><span>{t('titleLine2')}</span><span><AccentWord>{t('titleAccent')}</AccentWord></span></h1>
        <p className="home-hero__subtitle">{t('subtitle')}</p>
        <div className="home-hero__actions">
          <Button href="/produit">{t('primaryCta')}</Button>
          <Button href="/produit/demonstration" variant="secondary">{t('secondaryCta')}</Button>
        </div>
        <p className="home-hero__microcopy">{t('microcopy')}</p>
      </Reveal>
      <Reveal className="home-hero__visual-wrap" delay={0.12}>
        <AmbientPulse />
        <p className="home-hero__annotation">{t('annotation')}</p>
        <svg className="home-hero__annotation-arrow" viewBox="0 0 140 80" fill="none" aria-hidden="true"><path d="M4 11C50 10 90 23 113 58M113 58l-3-22M113 58l-22-8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <ParallaxLayer>{media.heroImage.src ? <MediaFrame src={media.heroImage.src} alt={t('imageAlt')} priority /> : <MockDashboard />}</ParallaxLayer>
      </Reveal>
    </div>
    <div className="home-hero__corner" aria-hidden="true" />
  </section>;
}
