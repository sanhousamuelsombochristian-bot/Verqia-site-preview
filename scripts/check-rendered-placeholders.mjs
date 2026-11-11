import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isProductionBuild } from './release-mode.mjs';

if (!isProductionBuild) {
  console.log('Contrôle des contenus de lancement ignoré : build local ou Preview.');
  process.exit(0);
}

const placeholder = /À\s*COMPLÉTER|TO\s+COMPLETE|À\s*VALIDER|TO\s+VALIDATE/i;
const workingDocument = /DOCUMENT\s+DE\s+TRAVAIL|WORKING\s+DOCUMENT/i;
const failures = [];
let scanned = 0;

for (const locale of ['fr', 'en']) {
  const messages = JSON.parse(readFileSync(join(process.cwd(), 'messages', `${locale}.json`), 'utf8'));
  const legalPage = messages.legalPage;

  if (!legalPage || typeof legalPage !== 'object') {
    failures.push(`${locale}: bloc legalPage absent`);
    continue;
  }

  scanned += 1;
  if (typeof legalPage.eyebrow !== 'string' || !legalPage.eyebrow.trim()) {
    failures.push(`${locale}: legalPage.eyebrow est vide`);
  } else if (workingDocument.test(legalPage.eyebrow)) {
    failures.push(`${locale}: legalPage.eyebrow contient « ${legalPage.eyebrow} »`);
  }

  const sections = legalPage.sections;
  if (!sections || typeof sections !== 'object') {
    failures.push(`${locale}: legalPage.sections absent`);
    continue;
  }

  for (const [slug, pageSections] of Object.entries(sections)) {
    if (!pageSections || typeof pageSections !== 'object') {
      failures.push(`${locale}: legalPage.sections.${slug} est invalide`);
      continue;
    }

    for (const [key, section] of Object.entries(pageSections)) {
      scanned += 1;
      const body = section && typeof section === 'object' ? section.body : undefined;
      if (typeof body !== 'string' || !body.trim()) {
        failures.push(`${locale}: legalPage.sections.${slug}.${key}.body est vide`);
      } else if (placeholder.test(body)) {
        failures.push(`${locale}: legalPage.sections.${slug}.${key}.body contient un placeholder`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Production bloquée : ${failures.length} contenu(s) juridique(s) incomplet(s) parmi ${scanned} vérifié(s) :\n${failures.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Contrôle des contenus juridiques réussi (${scanned} contenu(s) vérifié(s)).`);
