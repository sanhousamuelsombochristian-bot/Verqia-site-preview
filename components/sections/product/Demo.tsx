'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MockDashboard } from '@/components/sections/home/MockDashboard';
import { GuidedRelance } from './GuidedRelance';
import { UpgradeModal } from './UpgradeModal';

const plannedFeatureKeys = ['dueDates', 'payments', 'collections'] as const;

export function Demo() {
  const t = useTranslations('demoPage');
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return <main id="main-content" className="demo-page section-dark">
    <section className="demo-page__intro" aria-labelledby="demo-title">
      <div className="home-section__inner">
        <p className="demo-page__eyebrow">{t('eyebrow')}</p>
        <h1 id="demo-title">{t('title')}</h1>
        <p className="demo-page__description">{t('description')}</p>
        <Button href="/produit" source="demo">{t('cta')}</Button>
      </div>
    </section>
    <section className="demo-preview" aria-labelledby="demo-preview-title">
      <div className="home-section__inner">
        <div className="demo-preview__heading"><h2 id="demo-preview-title">{t('previewTitle')}</h2><Badge>{t('fictional')}</Badge></div>
        <div className="demo-browser"><MockDashboard variant="browser" /></div>
        <p className="demo-preview__note">{t('fictionalNote')}</p>
        <div className="demo-locked" role="group" aria-label={t('lockedLabel')}>
          <h3>{t('lockedLabel')}</h3>
          <p className="demo-locked__hint">{t('lockedHint')}</p>
          <ul>{plannedFeatureKeys.map((key) => <li key={key}>
            <button type="button" className="demo-locked__button" aria-haspopup="dialog" onClick={() => setUpgradeOpen(true)}>
              <Check size={15} aria-hidden="true" /><span>{t(`lockedFeatures.${key}`)}</span>
            </button>
          </li>)}</ul>
        </div>
        <GuidedRelance />
      </div>
    </section>
    <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
  </main>;
}
