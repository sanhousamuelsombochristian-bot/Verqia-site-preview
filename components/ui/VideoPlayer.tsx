'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ToComplete } from './ToComplete';

type VideoPlayerProps = {
  src: string | null;
  mobileSrc?: string | null;
  poster: string | null;
  label: string;
  captionsFr: string | null;
  captionsEn: string | null;
};

export function VideoPlayer({ src, mobileSrc, poster, label, captionsFr, captionsEn }: VideoPlayerProps) {
  const t = useTranslations('common');
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  if (!src) return <div className="media-frame media-frame--empty" aria-label={label}><span>{label}</span><ToComplete /></div>;

  return <div className={`video-player${playingSrc && mobileSrc && playingSrc === mobileSrc ? ' video-player--portrait' : ''}`}>
    {playingSrc ? <video key={playingSrc} controls autoPlay playsInline preload="none" poster={poster ?? undefined} aria-label={label}>
      <source src={playingSrc} type="video/mp4" />
      {captionsFr && <track kind="subtitles" src={captionsFr} srcLang="fr" label={t('frenchCaptions')} />}
      {captionsEn && <track kind="subtitles" src={captionsEn} srcLang="en" label={t('englishCaptions')} />}
    </video> : <button type="button" className="video-player__play" onClick={() => {
      const usePortrait = Boolean(mobileSrc && window.matchMedia('(max-width: 680px)').matches);
      setPlayingSrc(usePortrait ? mobileSrc! : src);
    }} aria-label={label}>
      {poster && <Image src={poster} alt="" fill sizes="(max-width: 680px) 92vw, 1200px" />}
      <span className="video-player__button"><Play aria-hidden="true" fill="currentColor" size={18} /></span>
    </button>}
  </div>;
}
