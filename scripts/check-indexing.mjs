import { spawnSync } from 'node:child_process';

const indexingRequested = process.env.VERQIA_INDEXING_ENABLED?.trim().toLowerCase() === 'true';

if (!indexingRequested) {
  console.log('Indexation désactivée (VERQIA_INDEXING_ENABLED n’est pas true).');
  process.exit(0);
}

console.log('Indexation demandée : vérification obligatoire de la préparation production.');
const result = spawnSync(process.execPath, ['scripts/check-placeholders.mjs', '--production'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  console.error(`Impossible d’exécuter le contrôle production : ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
