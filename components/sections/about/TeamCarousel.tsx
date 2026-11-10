'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { aboutTeam } from '@/config/about';

export function TeamCarousel() {
  const t = useTranslations('aboutPage');
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.max(280, Math.round(track.clientWidth * 0.82)),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return <section className="about-team" aria-labelledby="about-team-title">
    <div className="home-section__inner">
      <header className="about-section-heading">
        <div><p className="section-label"><span />{t('team.eyebrow')}</p><h2 id="about-team-title">{t('team.title')}</h2><p>{t('team.description')}</p></div>
        <div className="about-carousel__actions">
          <button type="button" onClick={() => move(-1)} aria-label={t('team.previous')}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} aria-label={t('team.next')}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </header>
      <p className="about-demo-notice" role="note">{t('team.demoNotice')}</p>
      <div
        className="about-team__track"
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t('team.carouselLabel')}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}
      >
        {aboutTeam.map((member, index) => <article className="about-team-card" key={member.key} aria-label={t('team.cardLabel', { index: index + 1, count: aboutTeam.length })}>
          <Image src={member.image} width={768} height={768} sizes="(max-width: 660px) 82vw, 284px" alt={t(`team.members.${member.key}.imageAlt`)} />
          <div className="about-team-card__body"><span>{String(index + 1).padStart(2, '0')}</span><h3>{t(`team.members.${member.key}.name`)}</h3><strong>{t(`team.members.${member.key}.role`)}</strong><p>{t(`team.members.${member.key}.bio`)}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
