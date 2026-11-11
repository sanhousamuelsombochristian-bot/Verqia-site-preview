import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { site } from '@/config/site';

export function Brand({ compact = false, footer = false }: { compact?: boolean; footer?: boolean }) {
  const t = useTranslations('nav');
  const wordmarkSizes = footer
    ? '(max-width: 600px) 100px, 132px'
    : '(max-width: 600px) 90px, 112px';

  return <Link className={`brand${compact ? ' brand--compact' : ''}${footer ? ' brand--footer' : ''}`} href="/" aria-label={t('brandName')}>
    <span className="brand__symbol" aria-hidden="true">
      <Image src={site.logoSymbolPath} alt="" width={48} height={44} sizes={footer ? '(max-width: 600px) 32px, 42px' : '(max-width: 600px) 28px, 36px'} priority={!footer} unoptimized={site.logoSymbolPath.startsWith('https://')} />
    </span>
    <Image className="brand__wordmark" src={site.logoWordmarkPath} alt="" width={210} height={44} sizes={wordmarkSizes} priority={!footer} />
  </Link>;
}
