import type { ReactNode } from 'react';
export function Stepper({ items }: { items: readonly { title: string; description: ReactNode }[] }) {
  return <ol className="stepper">{items.map((item, i) => <li className="stepper__item" key={`${item.title}-${i}`}><span className="stepper__number">{String(i + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol>;
}
