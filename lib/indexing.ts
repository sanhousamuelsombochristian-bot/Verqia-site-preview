import { site } from '@/config/site';

const configuredDomain = site.domain;
let hasHttpsDomain = false;
if (configuredDomain) {
  try {
    hasHttpsDomain = new URL(configuredDomain).protocol === 'https:';
  } catch {
    hasHttpsDomain = false;
  }
}

// Indexing is opt-in and the build script verifies production readiness before honoring it.
export const indexingEnabled =
  process.env.VERQIA_INDEXING_ENABLED?.trim().toLowerCase() === 'true' && hasHttpsDomain;
