import { useTranslations } from 'next-intl';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { media } from '@/config/media';

export function ProductVideo() {
  const t = useTranslations('productHub');
  return <section className="product-video section-dark" aria-labelledby="product-hub-title">
    <div className="home-section__inner">
      <SectionLabel>{t('eyebrow')}</SectionLabel>
      <h1 id="product-hub-title">{t('title')}</h1>
      <VideoPlayer src={media.productDetail.src} mobileSrc={media.productDetail.mobileSrc} poster={media.productDetail.poster} label={t('videoLabel')} captionsFr={media.productDetail.captionsFr} captionsEn={media.productDetail.captionsEn} />
    </div>
  </section>;
}
