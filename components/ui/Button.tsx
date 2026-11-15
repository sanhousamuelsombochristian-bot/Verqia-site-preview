import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link as LocaleLink } from '@/i18n/navigation';
import { withSource, type CtaSource } from '@/lib/cta';

type Props = { children: ReactNode; href?: string; variant?: 'primary' | 'secondary'; className?: string; source?: CtaSource } & Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
export function Button({ children, href, variant = 'primary', className = '', source, ...props }: Props) {
  const classes = `button button--${variant} ${className}`;
  const content = <>{children}<span className="button__icon" aria-hidden="true"><ArrowRight size={17} /></span></>;
  const resolvedHref = href && source ? withSource(href, source) : href;
  if (resolvedHref?.startsWith('/')) return <LocaleLink className={classes} href={resolvedHref} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>{content}</LocaleLink>;
  return resolvedHref ? <a className={classes} href={resolvedHref} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>{content}</a>
    : <button className={classes} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>{content}</button>;
}
