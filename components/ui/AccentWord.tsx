import type { ReactNode } from 'react';
export function AccentWord({ children }: { children: ReactNode }) {
  return <em className="accent-word">{children}</em>;
}
