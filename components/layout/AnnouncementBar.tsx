'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations('announcement');
  if (!visible) return null;
  return <aside className="announcement-bar" aria-label={t('label')}>
    <p>{t('offer')}</p>
    <Link href="/produit">{t('cta')}</Link>
    <button type="button" onClick={() => setVisible(false)} aria-label={t('close')}><X size={16} aria-hidden="true" /></button>
  </aside>;
}
