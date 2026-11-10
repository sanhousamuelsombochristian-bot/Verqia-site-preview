'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowRight, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navCta } from '@/config/nav';
import { Brand } from './Brand';
import { NavPill } from './NavPill';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import { MobileSheet } from './MobileSheet';

type CompactState = { pathname: string; compact: boolean };

export function HeaderBehavior() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [compactState, setCompactState] = useState<CompactState>({ pathname, compact: false });
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLElement | null>(null);
  const focusWithinRef = useRef(false);
  const desiredCompactRef = useRef(false);
  const compact = compactState.pathname === pathname && compactState.compact;
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const updateCompact = useCallback((next: boolean, route = pathname) => {
    desiredCompactRef.current = next;
    const visibleCompact = next && !focusWithinRef.current;
    setCompactState((current) => current.pathname === route && current.compact === visibleCompact
      ? current
      : { pathname: route, compact: visibleCompact });
  }, [pathname]);

  // Compare the real bottom edge of the page hero with the sticky header boundary.
  // This avoids guessed scroll offsets and works in both scroll directions.
  const evaluateBoundary = useCallback(() => {
    const boundary = boundaryRef.current;
    const stage = stageRef.current;
    if (!boundary || !stage) return;
    const header = stage.parentElement;
    const headerBottom = header?.getBoundingClientRect().bottom ?? stage.getBoundingClientRect().bottom;
    // The header must stay expanded at the top of a freshly rendered route.
    // This also prevents a transient layout measurement during hydration from
    // replacing the desktop navigation with the compact control.
    if (window.scrollY <= 1) {
      updateCompact(false, pathname);
      return;
    }
    const shouldCompact = boundary.getBoundingClientRect().bottom <= headerBottom + 1;
    updateCompact(shouldCompact, pathname);
  }, [pathname, updateCompact]);

  useMotionValueEvent(scrollY, 'change', evaluateBoundary);

  useEffect(() => {
    const main = document.getElementById('main-content');
    const boundary = document.getElementById('home-hero')
      ?? main?.querySelector<HTMLElement>(':scope > section:first-of-type')
      ?? main?.querySelector<HTMLElement>('h1')
      ?? null;
    boundaryRef.current = boundary;
    evaluateBoundary();

    if (!boundary || !('ResizeObserver' in window)) return () => { boundaryRef.current = null; };
    const resizeObserver = new ResizeObserver(evaluateBoundary);
    resizeObserver.observe(boundary);
    if (stageRef.current) resizeObserver.observe(stageRef.current);
    return () => {
      resizeObserver.disconnect();
      boundaryRef.current = null;
    };
  }, [pathname, evaluateBoundary]);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    focusWithinRef.current = false;
    updateCompact(desiredCompactRef.current);
  };
  const handleFocus = () => {
    // Keep expanded controls stable while keyboard users traverse them.
    // Focus on the compact menu trigger does not expand the capsule.
    focusWithinRef.current = !compact;
  };
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 330, damping: 31, mass: 0.9 };

  return <>
    <div ref={stageRef} className="site-header__stage" onFocusCapture={handleFocus} onBlurCapture={handleBlur}>
      <m.div layout className={`site-header__capsule${compact ? ' site-header__capsule--compact' : ''}`} transition={{ layout: transition }}>
        <AnimatePresence mode="wait" initial={false}>
          {compact ? <m.div key="compact" className="site-header__compact-content" initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 3 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <Brand compact />
            <ThemeToggle />
            <button ref={menuTriggerRef} type="button" className="header-menu-button" aria-label={t('menuOpen')} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(true)}><Menu aria-hidden="true" /></button>
          </m.div> : <m.div key="expanded" className="site-header__expanded-content" initial={reduceMotion ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <Brand />
            <div className="site-header__desktop"><NavPill /></div>
            <div className="site-header__actions">
              <Link className="header-cta" href={navCta.href}><span>{t(navCta.key)}</span><span className="header-cta__arrow" aria-hidden="true"><ArrowRight size={17} /></span></Link>
              <LangSwitch />
              <ThemeToggle />
            </div>
            <div className="site-header__mobile-actions">
              <Link className="header-cta header-cta--compact" href={navCta.href}><span>{t('discoverFreeShort')}</span><span className="header-cta__arrow" aria-hidden="true"><ArrowRight size={15} /></span></Link>
              <button ref={menuTriggerRef} type="button" className="header-menu-button" aria-label={t('menuOpen')} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(true)}><Menu aria-hidden="true" /></button>
            </div>
          </m.div>}
        </AnimatePresence>
      </m.div>
    </div>
    <MobileSheet open={mobileOpen} onClose={closeMobileMenu} triggerRef={menuTriggerRef} />
  </>;
}
