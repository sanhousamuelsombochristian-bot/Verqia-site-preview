import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const indexingRequested = process.env.VERQIA_INDEXING_ENABLED?.trim().toLowerCase() === 'true';
if (!indexingRequested) {
  console.log('Contrôle HTML des placeholders ignoré : indexation désactivée.');
  process.exit(0);
}

const appOutput = join(process.cwd(), '.next/server/app');
if (!existsSync(appOutput)) {
  console.error('Sortie Next.js absente : impossible de vérifier les pages avant indexation.');
  process.exit(1);
}

const placeholder = /À\s*COMPLÉTER|TO\s+COMPLETE|À\s*VALIDER|TO\s+VALIDATE/i;
const failures = [];
let scanned = 0;

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(path);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const route = relative(appOutput, path).replaceAll('\\', '/');
    if (!/^(fr|en)(\/|\.html$)/.test(route) || route.includes('/_kit')) continue;
    scanned += 1;
    const html = readFileSync(path, 'utf8');
    const match = html.match(placeholder);
    if (match) failures.push(`${route}: contient « ${match[0]} »`);
  }
}

visit(appOutput);
if (failures.length) {
  console.error(`Indexation bloquée : ${failures.length} page(s) localisée(s) contiennent encore des placeholders :\n${failures.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}
console.log(`Contrôle HTML des placeholders réussi (${scanned} pages localisées vérifiées).`);
