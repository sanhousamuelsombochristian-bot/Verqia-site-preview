import type { ReactNode } from 'react';

type ToastProps = { title: string; children?: ReactNode; tone?: 'success' | 'error' | 'info'; dismissLabel?: string; onDismiss?: () => void };

export function Toast({ title, children, tone = 'info', dismissLabel, onDismiss }: ToastProps) {
  return <div className={`toast toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'} aria-live={tone === 'error' ? 'assertive' : 'polite'}>
    <div><strong>{title}</strong>{children && <div className="toast__body">{children}</div>}</div>
    {onDismiss && <button type="button" className="toast__dismiss" onClick={onDismiss} aria-label={dismissLabel ?? title}>×</button>}
  </div>;
}
