# VERQIA — fondations du site

Projet Next.js App Router, TypeScript strict, Tailwind CSS, Motion, Lenis, next-intl, next-themes, lucide-react et Zod. Le site est pré-rendu/statique à ce stade : aucune route API, action serveur, base de données ou collecte de formulaire.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir `/fr` ou `/en`. Le kit de composants est disponible à `/fr/_kit` et `/en/_kit` (utilisation d'un segment `%5Fkit` dans l'arborescence Next pour conserver le préfixe d'URL `_`).

## Vérifications

```bash
npm run typecheck
npm test
npm run check:placeholders
NODE_ENV=production npm run check:placeholders
npm run build
```

Le contrôle de production doit échouer tant que domaine, identité et adresse légales, immatriculation et au moins un canal de contact ne sont pas fournis. Le logo par défaut utilise le symbole V livré dans `public/media/brand/` ; un chemin local différent peut être défini via `NEXT_PUBLIC_LOGO_PATH`.

## Références et statut

Les sources reçues sont conservées sous `docs_PRD.md`, `docs_TRD.md`, `docs_DESIGN_SYSTEM.md`, `docs_PROMPTS_MASTER.md` et `CLAUDE.md`. Les textes de navigation et de pied de page, citations, modules et scénarios sont renseignés à partir du PRD. Les pages de contenu restent volontairement des squelettes jusqu’aux étapes suivantes.

Les tests E2E Playwright sont définis dans `tests/e2e/`. Après installation des dépendances système Chromium sur une machine compatible, exécuter `npx playwright install --with-deps chromium` puis `npm run test:e2e`.
