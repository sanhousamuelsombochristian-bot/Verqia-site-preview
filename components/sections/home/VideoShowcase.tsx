import { useTranslations } from 'next-intl';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { media } from '@/config/media';

export function VideoShowcase() {
  const t = useTranslations('home.video');
  return <section className="home-video section-dark" aria-labelledby="home-video-title">
    <div className="home-section__inner">
      <Reveal><SectionLabel>{t('eyebrow')}</SectionLabel><h2 id="home-video-title">{t('title')}</h2></Reveal>
      <Reveal delay={0.1}><VideoPlayer src={media.homeRecap.src} mobileSrc={media.homeRecap.mobileSrc} poster={media.homeRecap.poster} label={t('playLabel')} captionsFr={media.homeRecap.captionsFr} captionsEn={media.homeRecap.captionsEn} /></Reveal>
    </div>
  </section>;
}
