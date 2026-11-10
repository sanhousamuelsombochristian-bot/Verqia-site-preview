import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

export function EngineTeaser() {
  const t = useTranslations('home.engine');
  return <section className="home-engine section-dark" aria-labelledby="home-engine-title">
    <Reveal className="home-section__inner home-engine__inner">
      <div><SectionLabel>{t('eyebrow')}</SectionLabel><h2 id="home-engine-title">{t('title')}</h2><p>{t('body')}</p>
        <Link className="home-engine__link" href="/produit/moteur-decisionnel">{t('link')}<span aria-hidden="true"><ArrowUpRight size={17} /></span></Link>
      </div>
      <div className="home-engine__access"><span className="home-engine__index">01 / 04</span><p>{t('accessLabel')}</p><div><Badge>{t('business')}</Badge><Badge>{t('enterprise')}</Badge></div></div>
    </Reveal>
  </section>;
}
