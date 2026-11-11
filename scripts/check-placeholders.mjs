import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const production = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
const required = [
  ['NEXT_PUBLIC_SITE_URL', 'Domaine / URL officielle'],
  ['NEXT_PUBLIC_LEGAL_IDENTITY', 'Raison sociale'],
  ['NEXT_PUBLIC_LEGAL_FORM', 'Forme juridique'],
  ['NEXT_PUBLIC_LEGAL_ADDRESS', 'Siège social / adresse légale'],
  ['NEXT_PUBLIC_SHARE_CAPITAL', 'Capital social ou confirmation « non applicable »'],
  ['NEXT_PUBLIC_TAX_ID', 'Numéro de compte contribuable / identifiant fiscal'],
  ['NEXT_PUBLIC_LEGAL_REPRESENTATIVE', 'Représentant légal'],
  ['NEXT_PUBLIC_CONTACT_EMAIL', 'E-mail professionnel'],
  ['NEXT_PUBLIC_CONTACT_PHONE', 'Téléphone professionnel'],
  ['NEXT_PUBLIC_PUBLICATION_DIRECTOR', 'Directeur de la publication'],
  ['NEXT_PUBLIC_HOSTING_PROVIDER', 'Nom de l’hébergeur'],
  ['NEXT_PUBLIC_HOSTING_ADDRESS', 'Adresse de l’hébergeur'],
  ['NEXT_PUBLIC_HOSTING_CONTACT', 'Contact de l’hébergeur'],
  ['NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL', 'Contact pour les demandes de droits sur les données'],
];

const missing = required.filter(([key]) => !process.env[key]?.trim()).map(([, label]) => label);

const registrationNumber = process.env.NEXT_PUBLIC_RCCM?.trim() || process.env.NEXT_PUBLIC_REGISTRATION_NUMBER?.trim();
if (!registrationNumber) missing.push('Numéro RCCM / immatriculation (NEXT_PUBLIC_RCCM ou NEXT_PUBLIC_REGISTRATION_NUMBER)');

const legalReviewReference = process.env.LEGAL_REVIEW_REFERENCE?.trim();
if (!legalReviewReference) missing.push('Référence datée de validation des textes par un professionnel du droit (LEGAL_REVIEW_REFERENCE)');

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configuredSiteUrl) {
  try {
    if (new URL(configuredSiteUrl).protocol !== 'https:') missing.push('URL officielle du site en HTTPS');
  } catch {
    missing.push('URL officielle invalide (attendu : https://…)');
  }
}

// D-017 remains intentionally closed: prevent an operator from satisfying the
// environment checks while the public interface still suppresses legal contacts.
const launchScopeSource = readFileSync(join(process.cwd(), 'lib/launch-scope.ts'), 'utf8');
if (/export\s+const\s+publicContactEnabled\s*=\s*false\b/.test(launchScopeSource)) {
  missing.push('Décision D-017 : les contacts publics sont désactivés ; le contact de droits ne serait pas rendu');
}

const mediaRequired = [
  ['NEXT_PUBLIC_MEDIA_HOME_RECAP_SRC', 'Vidéo récapitulative d’accueil', '/media/brand-motion/VERQIA_PILOT_motion_16x9_blanc.mp4'],
  ['NEXT_PUBLIC_MEDIA_HOME_RECAP_POSTER', 'Affiche de la vidéo d’accueil', null],
  ['NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_FR', 'Sous-titres français — vidéo d’accueil', null],
  ['NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_EN', 'Sous-titres anglais — vidéo d’accueil', null],
  ['NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_SRC', 'Vidéo détaillée du produit', '/media/brand-motion/VERQIA_PILOT_motion_16x9.mp4'],
  ['NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_POSTER', 'Affiche de la vidéo produit', null],
  ['NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_FR', 'Sous-titres français — vidéo produit', null],
  ['NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_EN', 'Sous-titres anglais — vidéo produit', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_COMMERCE_SRC', 'Image — commerce et distribution', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_PROFESSIONAL_SERVICES_SRC', 'Image — cabinets et services professionnels', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_STARTUPS_SRC', 'Image — startups', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_SMES_SRC', 'Image — PME', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_B2B_SRC', 'Image — entreprises B2B', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_WHOLESALERS_SRC', 'Image — grossistes et supermarchés', null],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_LARGE_ORGANIZATIONS_SRC', 'Image — grandes organisations', null],
];

function validateAsset(value, label) {
  if (value.startsWith('/')) {
    if (!existsSync(join(process.cwd(), 'public', value.replace(/^\//, '')))) missing.push(`${label} (fichier introuvable dans public/)`);
  } else if (!/^https:\/\//i.test(value)) {
    missing.push(`${label} (utiliser un chemin /public ou une URL HTTPS)`);
  }
}

for (const [key, label, defaultValue] of mediaRequired) {
  const value = process.env[key]?.trim() || defaultValue;
  if (!value) {
    missing.push(label);
    continue;
  }
  validateAsset(value, label);
}

// Verify the assets rendered by Brand.tsx, not unused historical variants.
const renderedBrandAssets = [
  ['NEXT_PUBLIC_LOGO_SYMBOL_PATH', 'Symbole V de marque', '/media/brand/symbole.png'],
  ['NEXT_PUBLIC_LOGO_WORDMARK_PATH', 'Mot-symbole VERQIA', '/media/brand/verqia-wordmark-lime.png'],
];
for (const [key, label, defaultValue] of renderedBrandAssets) {
  validateAsset(process.env[key]?.trim() || defaultValue, label);
}

const validationSources = ['config/plans.ts', 'config/simulations.ts', 'config/modules.ts'];
for (const sourceFile of validationSources) {
  const source = readFileSync(join(process.cwd(), sourceFile), 'utf8');
  const unvalidated = [...source.matchAll(/\bstatus\s*:\s*['"]toValidate['"]/g)].length;
  if (unvalidated > 0) missing.push(`${unvalidated} élément(s) « À valider » dans ${sourceFile}`);
}

if (missing.length) {
  console.log(`Valeurs manquantes (${missing.length}):\n${missing.map((item) => `- ${item}`).join('\n')}`);
  if (production) process.exitCode = 1;
  else console.log('Mode préproduction : échec réservé à --production / NODE_ENV=production.');
} else {
  console.log('Contrôle des placeholders réussi.');
}
