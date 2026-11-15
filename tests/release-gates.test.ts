import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
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

describe('removed authentication scope', () => {
  it('no longer exposes authentication routes or components', () => {
    for (const route of ['connexion', 'inscription', 'mot-de-passe-oublie', 'reinitialiser-mot-de-passe']) {
      expect(existsSync(`app/[locale]/${route}`)).toBe(false);
    }
    expect(existsSync('components/auth')).toBe(false);
    expect(existsSync('lib/supabase-browser.ts')).toBe(false);
    expect(existsSync('styles/auth.css')).toBe(false);
  });

  it('removes Supabase from dependencies and environment examples', () => {
    expect(readFileSync('package.json', 'utf8')).not.toMatch(/supabase/i);
    expect(readFileSync('.env.example', 'utf8')).not.toMatch(/SUPABASE/i);
  });

  it('keeps public contact and offers default-deny', () => {
    const scope = readFileSync('lib/launch-scope.ts', 'utf8');
    expect(scope).toMatch(/publicContactEnabled\s*=\s*false/);
    expect(scope).toMatch(/publicCommercialOfferEnabled\s*=\s*process\.env\.NEXT_PUBLIC_LOCAL_PRICING_REVIEW === 'true'/);
  });
});
