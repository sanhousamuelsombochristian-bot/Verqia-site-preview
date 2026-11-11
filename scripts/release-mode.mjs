const value = (input) => input?.trim().toLowerCase() || null;

// Vercel supplies VERCEL_ENV and it always wins over a local override. The
// explicit target exists only to exercise the same gate locally or in CI.
const vercelEnvironment = value(process.env.VERCEL_ENV);
const explicitTarget = value(process.env.VERQIA_BUILD_TARGET);
const nodeTarget = value(process.env.NODE_ENV) === 'production' ? 'production' : null;

export const buildTarget = vercelEnvironment ?? explicitTarget ?? nodeTarget ?? 'preview';
export const isProductionBuild = buildTarget === 'production';
