'use client';
import { useEffect, useRef } from 'react';
import { LockKeyhole, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getLenis } from '@/lib/smooth-scroll';

export function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('demoPage.modal');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
    };
  }, [open, onClose]);

  if (!open) return null;
  return <div className="upgrade-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="upgrade-modal" role="dialog" aria-modal="true" aria-labelledby="upgrade-modal-title" aria-describedby="upgrade-modal-description" ref={dialogRef}>
      <button ref={closeRef} type="button" className="upgrade-modal__close" onClick={onClose} aria-label={t('close')}><X aria-hidden="true" /></button>
      <span className="upgrade-modal__lock" aria-hidden="true"><LockKeyhole size={21} /></span>
      <p className="upgrade-modal__eyebrow">{t('eyebrow')}</p>
      <h2 id="upgrade-modal-title">{t('title')}</h2>
      <p id="upgrade-modal-description">{t('description')}</p>
      <Link className="upgrade-modal__cta" href="/tarifs" onClick={onClose}>{t('cta')}<span aria-hidden="true">→</span></Link>
    </div>
  </div>;
}
