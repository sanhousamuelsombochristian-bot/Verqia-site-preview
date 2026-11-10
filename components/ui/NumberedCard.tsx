import type { ReactNode } from 'react';
export function NumberedCard({ number, total, title, children }: { number: number; total: number; title: string; children: ReactNode }) {
  const fmt = (n: number) => String(n).padStart(2, '0');
  return <article className="numbered-card"><p className="numbered-card__index">{fmt(number)} / {fmt(total)}</p><h3>{title}</h3><div>{children}</div></article>;
}
