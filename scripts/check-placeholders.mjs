import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const production = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
const required = [
  ['NEXT_PUBLIC_SITE_URL', 'Domaine / URL officielle'],
  ['NEXT_PUBLIC_LEGAL_IDENTITY', 'Raison sociale'],
  ['NEXT_PUBLIC_LEGAL_FORM', 'Forme juridique'],
  ['NEXT_PUBLIC_LEGAL_ADDRESS', 'Siège social / adresse légale'],
  ['NEXT_PUBLIC_RCCM', 'Numéro RCCM'],
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
if (process.env.LEGAL_REVIEW_APPROVED?.trim().toLowerCase() !== 'true') missing.push('Validation des textes par un professionnel du droit (LEGAL_REVIEW_APPROVED=true)');
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configuredSiteUrl) {
  try { if (new URL(configuredSiteUrl).protocol !== 'https:') missing.push('URL officielle du site en HTTPS'); }
  catch { missing.push('URL officielle invalide (attendu : https://…)'); }
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
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_COMMERCE_SRC', 'Image — commerce et distribution'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_PROFESSIONAL_SERVICES_SRC', 'Image — cabinets et services professionnels'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_STARTUPS_SRC', 'Image — startups'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_SMES_SRC', 'Image — PME'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_B2B_SRC', 'Image — entreprises B2B'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_WHOLESALERS_SRC', 'Image — grossistes et supermarchés'],
  ['NEXT_PUBLIC_MEDIA_AUDIENCE_LARGE_ORGANIZATIONS_SRC', 'Image — grandes organisations'],
];
for (const [key, label, defaultValue] of mediaRequired) {
  const value = process.env[key]?.trim() || defaultValue;
  if (!value) { missing.push(label); continue; }
  if (value.startsWith('/')) {
    if (!existsSync(join(process.cwd(), 'public', value.replace(/^\//, '')))) missing.push(`${label} (fichier introuvable dans public/)`);
  } else if (!/^https:\/\//i.test(value)) missing.push(`${label} (utiliser un chemin /public ou une URL HTTPS)`);
}
const configuredLogo = process.env.NEXT_PUBLIC_LOGO_PATH?.trim() || '/media/brand/Verqia-logo.png';
if (configuredLogo.startsWith('/')) {
  if (!existsSync(join(process.cwd(), 'public', configuredLogo.replace(/^\//, '')))) missing.push('Logo lime (fichier introuvable dans public/)');
} else if (!/^https:\/\//i.test(configuredLogo)) missing.push('Logo lime (utiliser un chemin /public ou une URL HTTPS)');
const brandAssets = [
  ['NEXT_PUBLIC_LOGO_ONYX_PATH', 'Logo officiel — version onyx'],
  ['NEXT_PUBLIC_LOGO_ROUND_ICON_PATH', 'Icône officielle ronde'],
  ['NEXT_PUBLIC_FOUNDER_PHOTO', 'Portrait authentique du fondateur'],
];
for (const [key, label] of brandAssets) {
  const value = process.env[key]?.trim();
  if (!value) { missing.push(label); continue; }
  if (value.startsWith('/')) {
    if (!existsSync(join(process.cwd(), 'public', value.replace(/^\//, '')))) missing.push(`${label} (fichier introuvable dans public/)`);
  } else if (!/^https:\/\//i.test(value)) missing.push(`${label} (utiliser un chemin /public ou une URL HTTPS)`);
}

const planSource = readFileSync(join(process.cwd(), 'config/plans.ts'), 'utf8');
const unvalidatedPlanValues = [...planSource.matchAll(/\btoValidate\s*\(/g)].length;
if (unvalidatedPlanValues > 0) {
  missing.push(`${unvalidatedPlanValues} prix ou quotas « À valider » dans config/plans.ts`);
}
const channels = ['NEXT_PUBLIC_WHATSAPP', 'NEXT_PUBLIC_CONTACT_EMAIL', 'NEXT_PUBLIC_CALENDLY'];
if (!channels.some((key) => process.env[key]?.trim())) missing.push('Au moins un canal public de contact');
if (missing.length) {
  console.log(`Valeurs manquantes (${missing.length}):\n${missing.map((item) => `- ${item}`).join('\n')}`);
  if (production) process.exitCode = 1;
  else console.log('Mode préproduction : échec réservé à --production / NODE_ENV=production.');
} else console.log('Contrôle des placeholders réussi.');
