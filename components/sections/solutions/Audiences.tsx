'use client';
import { useTranslations } from 'next-intl';
import { media } from '@/config/media';
import { MediaFrame } from '@/components/ui/MediaFrame';

const audienceKeys = ['commerce', 'professionalServices', 'startups', 'smes', 'b2b', 'wholesalers', 'largeOrganizations'] as const;
export function Audiences() {
  const t = useTranslations('solutionsPage.audiences');
  return <div className="audiences-grid">{audienceKeys.map((key, index) => {
    const image = media.audiences[key];
    return <article className="audience-card" key={key}>
      {image?.src && <MediaFrame src={image.src} alt={t(`items.${key}`)} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 30vw" />}
      <div className="audience-card__text"><span>{String(index + 1).padStart(2, '0')}</span><h3>{t(`items.${key}`)}</h3></div>
    </article>;
  })}</div>;
}
