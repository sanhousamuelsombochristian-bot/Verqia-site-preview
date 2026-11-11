'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { mobileNav, navCta } from '@/config/nav';
import { getLenis } from '@/lib/smooth-scroll';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import { Brand } from './Brand';

const MegaMenu = dynamic(() => import('./MegaMenu'), { loading: () => null });
const HISTORY_KEY = '__verqiaMobileMenu';

export function MobileSheet({ open, onClose, triggerRef }: { open: boolean; onClose: () => void; triggerRef: RefObject<HTMLButtonElement | null> }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const wasOpen = useRef(false);
  const poppedByHistory = useRef(false);

  useEffect(() => {
    if (!open) return;
    poppedByHistory.current = false;
    // Lenis.stop() locks the root scroller. Avoid body overflow:hidden: combined
    // with the root lock it changes the sticky header's containing scrollport.
    document.documentElement.dataset.mobileNavOpen = 'true';
    getLenis()?.stop();
    const state = typeof history.state === 'object' && history.state ? history.state : {};
    history.pushState({ ...state, [HISTORY_KEY]: true }, '', window.location.href);
    const focusFirst = window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus());
    const onPopState = () => { poppedByHistory.current = true; onClose(); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeFromUi(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((element) => element.tabIndex >= 0 && !element.closest('[hidden], [aria-hidden="true"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    function closeFromUi() {
      if ((history.state as Record<string, unknown> | null)?.[HISTORY_KEY]) history.back();
      else onClose();
    }
    window.addEventListener('popstate', onPopState);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFirst);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('keydown', onKeyDown);
      delete document.documentElement.dataset.mobileNavOpen;
      getLenis()?.start();
      if (!poppedByHistory.current && (history.state as Record<string, unknown> | null)?.[HISTORY_KEY]) history.back();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) wasOpen.current = true;
    else if (wasOpen.current) { triggerRef.current?.focus(); wasOpen.current = false; }
  }, [open, triggerRef]);

  const closeFromUi = () => {
    if ((history.state as Record<string, unknown> | null)?.[HISTORY_KEY]) history.back();
    else onClose();
  };
  const closeForNavigation = () => {
    const state = typeof history.state === 'object' && history.state ? { ...history.state } : {};
    delete state[HISTORY_KEY];
    history.replaceState(state, '', window.location.href);
    onClose();
  };

  if (typeof document === 'undefined' || !open) return <div id="mobile-menu" hidden aria-hidden="true" />;
  return createPortal(<div className="mobile-menu-backdrop" aria-hidden="false" onMouseDown={(event) => { if (event.target === event.currentTarget) closeFromUi(); }}>
    <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('primary')} ref={dialogRef}>
      <div className="mobile-menu__top"><Brand /><button type="button" className="header-icon-button" onClick={closeFromUi} aria-label={t('menuClose')}><X aria-hidden="true" /></button></div>
      <nav aria-label={t('primary')} className="mobile-menu__nav">
        {mobileNav.map((item) => 'panel' in item ? <section className="mobile-menu__group" key={item.key}>
          <h2><button type="button" aria-expanded={expanded === item.key} aria-controls={`mobile-${item.key}`} onClick={() => setExpanded(expanded === item.key ? null : item.key)}>{t(item.key)}<ChevronDown aria-hidden="true" className={expanded === item.key ? 'nav-chevron is-open' : 'nav-chevron'} /></button></h2>
          <div id={`mobile-${item.key}`} className="mobile-menu__panel" hidden={expanded !== item.key}>
            {expanded === item.key && <MegaMenu type={item.panel} mode="mobile" onNavigate={closeForNavigation} />}
          </div>
        </section> : <Link className="mobile-menu__direct" key={item.key} href={item.href} aria-current={pathname === item.href ? 'location' : undefined} onClick={closeForNavigation}>{t(item.key)}</Link>)}
      </nav>
      <div className="mobile-menu__cta"><Link className="header-cta" href={navCta.mobileHref} onClick={closeForNavigation}><span>{t(navCta.key)}</span><span className="header-cta__arrow" aria-hidden="true"><ArrowRight size={17} /></span></Link></div>
      <div className="mobile-menu__controls"><LangSwitch onLocaleChange={closeForNavigation} /><ThemeToggle /></div>
    </div>
  </div>, document.body);
}
