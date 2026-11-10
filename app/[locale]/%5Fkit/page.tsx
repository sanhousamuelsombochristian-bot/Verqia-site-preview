import { notFound } from 'next/navigation';
import { KitShowcase } from '@/components/ui/KitShowcase';

// Internal UI reference only. It remains available in local development but is not a public route.
export default function KitPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <KitShowcase />;
}
