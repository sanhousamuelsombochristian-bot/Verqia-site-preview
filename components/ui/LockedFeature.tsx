import { LockKeyhole } from 'lucide-react';
export function LockedFeature({ children, plan }: { children: string; plan: string }) {
  return <p className="locked-feature"><LockKeyhole aria-hidden="true" size={16} /><span>{children}</span><span className="locked-feature__plan">{plan}</span></p>;
}
