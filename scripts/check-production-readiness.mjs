import { spawnSync } from 'node:child_process';
import { isProductionBuild } from './release-mode.mjs';

const productionRequested = isProductionBuild || process.argv.includes('--production');

if (!productionRequested) {
  console.log('Gate de production ignoré : build local ou Preview. Définir VERQIA_BUILD_TARGET=production pour vérifier localement.');
  process.exit(0);
}

let failed = false;
if (process.env.NEXT_PUBLIC_LOCAL_PRICING_REVIEW?.trim().toLowerCase() === 'true') {
  console.error('Production bloquée : NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true est réservé à la revue locale ou Preview autorisée.');
  failed = true;
}

console.log('Build Production détecté : vérification obligatoire des prérequis de lancement.');
const placeholders = spawnSync(process.execPath, ['scripts/check-placeholders.mjs', '--production'], {
  stdio: 'inherit',
  env: process.env,
});

if (placeholders.error) {
  console.error(`Impossible d’exécuter le contrôle des prérequis : ${placeholders.error.message}`);
  failed = true;
} else if ((placeholders.status ?? 1) !== 0) {
  failed = true;
}

if (failed) process.exit(1);
console.log('Gate de production réussi.');
