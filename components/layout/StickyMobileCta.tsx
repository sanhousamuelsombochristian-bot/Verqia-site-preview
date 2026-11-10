'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { publicContactEnabled } from '@/lib/launch-scope';

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const excluded = pathname === '/contact' || pathname.startsWith('/legal/');
  useEffect(() => {
    if (excluded) return;
    const heading = document.querySelector<HTMLElement>('#main-content h1');
    const footer = document.querySelector<HTMLElement>('.site-footer');
    if (!heading || !('IntersectionObserver' in window)) return;
    let pastHero = false;
    let footerVisible = false;
    const update = () => setVisible(pastHero && !footerVisible);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heading) pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      }
      update();
    }, { threshold: 0.05 });
    observer.observe(heading);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname, excluded]);
  if (!publicContactEnabled || !visible || excluded) return null;
  return <div className="sticky-mobile-cta"><Link href="/contact">{t('contactUs')}<ArrowRight size={17} aria-hidden="true" /></Link></div>;
}
