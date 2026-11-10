import type { PlanKey, Status } from './plans';

export type ProductModule = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  availableFrom: PlanKey;
  status: Status;
  accessNoteKey?: string;
};

// Exact module list/access tiers from PRD §5.
export const modules: readonly ProductModule[] = [
  { id: 'overview', titleKey: 'modules.overview.title', descriptionKey: 'modules.overview.description', availableFrom: 'free', status: 'confirmed', accessNoteKey: 'modules.overview.access' },
  { id: 'treasury', titleKey: 'modules.treasury.title', descriptionKey: 'modules.treasury.description', availableFrom: 'starter', status: 'confirmed' },
  { id: 'invoices', titleKey: 'modules.invoices.title', descriptionKey: 'modules.invoices.description', availableFrom: 'starter', status: 'confirmed' },
  { id: 'clients', titleKey: 'modules.clients.title', descriptionKey: 'modules.clients.description', availableFrom: 'free', status: 'confirmed', accessNoteKey: 'modules.clients.access' },
  { id: 'collections', titleKey: 'modules.collections.title', descriptionKey: 'modules.collections.description', availableFrom: 'starter', status: 'confirmed', accessNoteKey: 'modules.collections.access' },
  { id: 'risk', titleKey: 'modules.risk.title', descriptionKey: 'modules.risk.description', availableFrom: 'business', status: 'confirmed' },
  { id: 'forecasts', titleKey: 'modules.forecasts.title', descriptionKey: 'modules.forecasts.description', availableFrom: 'business', status: 'confirmed' },
  { id: 'payments', titleKey: 'modules.payments.title', descriptionKey: 'modules.payments.description', availableFrom: 'starter', status: 'confirmed' },
  { id: 'automations', titleKey: 'modules.automations.title', descriptionKey: 'modules.automations.description', availableFrom: 'starter', status: 'confirmed', accessNoteKey: 'modules.automations.access' },
  { id: 'events', titleKey: 'modules.events.title', descriptionKey: 'modules.events.description', availableFrom: 'business', status: 'toValidate' },
];
