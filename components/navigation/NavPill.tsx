'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { mainNav, type DirectNavKey, type NavMenuKey } from '@/config/nav';
import { NavIndicator } from './NavIndicator';

const MegaMenu = dynamic(() => import('./MegaMenu'), { loading: () => null });

function routeActive(pathname: string): NavMenuKey | DirectNavKey | null {
  if (pathname === '/ressources/faq' || pathname.startsWith('/ressources/faq/')) return 'faq';
  if (pathname.startsWith('/tarifs')) return 'offers';
  if (pathname.startsWith('/produit/moteur-decisionnel')) return 'engine';
  if (pathname.startsWith('/produit')) return 'product';
  if (pathname.startsWith('/solutions')) return 'solutions';
  if (pathname.startsWith('/a-propos')) return 'about';
  return null;
}

const trackedSections: Record<string, readonly [string, NavMenuKey | DirectNavKey][]> = {
  '/': [['home-title', 'product'], ['home-solution-title', 'product'], ['home-engine-title', 'engine']],
  '/produit': [['product-hub-title', 'product'], ['journey-title', 'offers']],
  '/produit/modules': [['modules-title', 'product']],
  '/produit/moteur-decisionnel': [['decision-title', 'engine'], ['decision-demo-title', 'engine']],
  '/tarifs': [['pricing-title', 'offers'], ['comparison-title', 'offers'], ['pricing-faq-title', 'faq']],
  '/ressources/faq': [],
};

export function NavPill({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [openState, setOpenState] = useState<{ path: string; key: NavMenuKey | null }>({ path: pathname, key: null });
  const [hoverState, setHoverState] = useState<{ path: string; key: NavMenuKey | DirectNavKey } | null>(null);
  const [observedState, setObservedState] = useState<{ path: string; key: NavMenuKey | DirectNavKey } | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef(new Map<NavMenuKey, HTMLButtonElement>());
  const openKey = openState.path === pathname ? openState.key : null;
  const hoverKey = hoverState?.path === pathname ? hoverState.key : null;
  const observedKey = observedState?.path === pathname ? observedState.key : null;
  const setOpenKey = useCallback((key: NavMenuKey | null) => setOpenState({ path: pathname, key }), [pathname]);
  const setHoverKey = useCallback((key: NavMenuKey | DirectNavKey | null) => setHoverState(key ? { path: pathname, key } : null), [pathname]);
  const activeKey = observedKey ?? routeActive(pathname);
  const indicatorKey = hoverKey ?? openKey ?? activeKey;

  const sections = useMemo(() => trackedSections[pathname] ?? [], [pathname]);

  useEffect(() => {
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const elements = sections.flatMap(([id]) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const match = sections.find(([id]) => visible.target.id === id);
      if (match) setObservedState({ path: pathname, key: match[1] });
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.2, 0.5, 0.8] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname, sections]);

  useEffect(() => {
    if (!openKey) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      const key = openKey;
      setOpenKey(null);
      setHoverKey(null);
      triggerRefs.current.get(key)?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpenKey(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openKey, setOpenKey, setHoverKey]);

  const clearTimer = () => {
    if (timers.current) clearTimeout(timers.current);
    timers.current = null;
  };
  const scheduleOpen = (key: NavMenuKey) => {
    clearTimer();
    timers.current = setTimeout(() => { setOpenKey(key); setHoverKey(key); }, 120);
  };
  const scheduleClose = () => {
    clearTimer();
    timers.current = setTimeout(() => {
      const panel = openKey ? document.getElementById(`nav-panel-${openKey}`) : null;
      if (!panel?.contains(document.activeElement)) {
        setOpenKey(null);
        setHoverKey(null);
      }
    }, 120);
  };

  return <nav ref={rootRef} className={`nav-pill${compact ? ' nav-pill--compact' : ''}`} aria-label={t('primary')} onPointerLeave={(event) => { if (event.pointerType === 'mouse') scheduleClose(); }}>
    {mainNav.map((item) => {
      if (!('panel' in item)) {
        const active = indicatorKey === item.key;
        return <Link key={item.key} className={`nav-link${activeKey === item.key ? ' is-active' : ''}`} href={item.href} aria-current={activeKey === item.key ? 'location' : undefined} onPointerEnter={(event) => { if (event.pointerType === 'mouse') { clearTimer(); setOpenKey(null); setHoverKey(item.key); } }} onFocus={() => { setOpenKey(null); setHoverKey(item.key); }} onBlur={() => setHoverKey(null)}>
          <NavIndicator active={active} reducedMotion={Boolean(reduceMotion)} /><span className="nav-link__label">{t(item.key)}</span>
        </Link>;
      }
      const open = openKey === item.panel;
      const active = activeKey === item.key;
      const showIndicator = indicatorKey === item.key;
      const panelId = `nav-panel-${item.key}`;
      return <div className="nav-pill__item" key={item.key} onPointerEnter={(event) => { if (event.pointerType === 'mouse') scheduleOpen(item.panel); }} onPointerLeave={(event) => { if (event.pointerType === 'mouse') scheduleClose(); }} onFocus={() => setHoverKey(item.key)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoverKey(null); }}>
        <button ref={(node) => { if (node) triggerRefs.current.set(item.key, node); else triggerRefs.current.delete(item.key); }} className={`nav-link nav-link--trigger${active ? ' is-active' : ''}`} type="button" aria-expanded={open} aria-controls={panelId} aria-current={active ? 'location' : undefined} aria-label={open ? t('closeSubmenu', { label: t(item.key) }) : t('openSubmenu', { label: t(item.key) })} onClick={() => { clearTimer(); setOpenKey(open ? null : item.panel); setHoverKey(item.key); }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpenKey(item.panel); setTimeout(() => document.querySelector<HTMLElement>(`#${panelId} a[href]`)?.focus(), 0); } }}>
          <NavIndicator active={showIndicator} reducedMotion={Boolean(reduceMotion)} /><span className="nav-link__label">{t(item.key)}</span><ChevronDown size={14} aria-hidden="true" className={open ? 'nav-chevron is-open' : 'nav-chevron'} />
        </button>
        <div id={panelId} className={`nav-pill__panel${open ? ' is-open' : ''}`} hidden={!open}>
          {open && <MegaMenu type={item.panel} onNavigate={() => { setOpenKey(null); setHoverKey(null); }} />}
        </div>
      </div>;
    })}
  </nav>;
}
