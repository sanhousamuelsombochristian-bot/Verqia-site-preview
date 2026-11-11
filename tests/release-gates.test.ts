import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const runGate = (overrides: Record<string, string | undefined>) => spawnSync(
  process.execPath,
  ['scripts/check-production-readiness.mjs'],
  {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      VERCEL_ENV: '',
      VERQIA_BUILD_TARGET: '',
      NEXT_PUBLIC_LOCAL_PRICING_REVIEW: '',
      ...overrides,
    },
  },
);

const output = (result: ReturnType<typeof runGate>) => `${result.stdout}\n${result.stderr}`;

describe('production release gate', () => {
  it('does not apply production-only requirements to a local or Preview build', () => {
    const result = runGate({});
    expect(result.status).toBe(0);
    expect(output(result)).toContain('Gate de production ignoré');
  });

  it('rejects the local pricing-review flag in a Production build', () => {
    const result = runGate({ VERQIA_BUILD_TARGET: 'production', NEXT_PUBLIC_LOCAL_PRICING_REVIEW: 'true' });
    expect(result.status).toBe(1);
    expect(output(result)).toContain('NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true est réservé');
  });

  it('runs the mandatory placeholder gate for a Production build', () => {
    const result = runGate({ VERQIA_BUILD_TARGET: 'production' });
    expect(result.status).toBe(1);
    expect(output(result)).toContain('Build Production détecté');
    expect(output(result)).toContain('Valeurs manquantes');
  });
});
