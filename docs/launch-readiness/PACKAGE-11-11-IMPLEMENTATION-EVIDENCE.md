# Package 11/11 — Preuve d'implémentation

**Date de vérification :** 15/11/2026
**Branche :** `feat/verqia-package-11-11` (créée depuis `preview`)
**Périmètre :** site public VERQIA / VERQIA PILOT — présentation conceptuelle, sans backend, sans authentification, sans canal de contact public.
**Document de référence :** `docs/PRD-11-11-IMPLEMENTATION-ADDENDUM.md`

## 1. Synthèse

Le package 11/11 est implémenté sur la branche `feat/verqia-package-11-11`. Les changements portent sur :

- la suppression complète de l'authentification et de Supabase (routes, composants, dépendance, variables d'environnement, styles, documentation) ;
- la réécriture du mot du fondateur en texte approuvé, anonyme, sans nom, portrait ni biographie ;
- la suppression des partenaires, de l'équipe, des témoignages, des résultats clients et du marquee associé ;
- l'ajout de l'attribution `source` sur les CTA internes via `lib/cta.ts` et `Button.tsx`, sans rendu de `source` comme attribut DOM ;
- l'ajout des interactions demandées : `HeroRotate`, `GuidedRelance`, `UpgradeModal`, `DecisionDemo` temporisé, FAQ filtrable, onglets du programme pilote, fallback média neutre, badge « À valider » ;
- la centralisation des presets de mouvement dans `config/motion.ts` ;
- la mise à jour des tests unitaires, des tests E2E et de la documentation.

Le comportement par défaut reste **default-deny** : `publicContactEnabled = false` et `publicCommercialOfferEnabled` n'est vrai que si `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` (local/Preview uniquement).

## 2. Variables de périmètre

| Garde-fou | Valeur par défaut | Emplacement |
|---|---|---|
| Contacts publics | `false` | `lib/launch-scope.ts` |
| Offre commerciale publique | `process.env.NEXT_PUBLIC_LOCAL_PRICING_REVIEW === 'true'` | `lib/launch-scope.ts` |
| Indexation | Désactivée sauf `VERQIA_INDEXING_ENABLED=true` | `lib/indexing.ts` / `scripts/check-indexing.mjs` |
| Gate Production | Bloquant si `VERQIA_BUILD_TARGET=production` | `scripts/check-production-readiness.mjs` |

## 3. Commandes et résultats

### 3.1 `npm run typecheck`

```
> verqia-site@0.1.0 typecheck
> tsc --noEmit
```

Résultat : **succès**, aucune erreur TypeScript.

### 3.2 `npm run lint`

```
> verqia-site@0.1.0 lint
> eslint .
```

Résultat : **succès**, aucune erreur ni avertissement.

### 3.3 `npm test`

```
> verqia-site@0.1.0 test
> vitest run

 Test Files  8 passed (8)
      Tests  34 passed (34)
```

Résultat : **34 tests sur 34 passent** (8 fichiers).

Fichiers couverts : `tests/about.test.ts`, `tests/contact-links.test.ts`, `tests/cta.test.ts`, `tests/i18n-parity.test.ts`, `tests/nav.test.ts`, `tests/plans.test.ts`, `tests/pricing.test.ts`, `tests/release-gates.test.ts`.

### 3.4 `npm run build`

```
> node scripts/check-production-readiness.mjs && node scripts/check-indexing.mjs && next build --webpack && node scripts/check-rendered-placeholders.mjs

Gate de production ignoré : build local ou Preview. Définir VERQIA_BUILD_TARGET=production pour vérifier localement.
Indexation désactivée (VERQIA_INDEXING_ENABLED n’est pas true).
✓ Compiled successfully
  Running TypeScript ...
  Finished TypeScript
✓ Generating static pages (42/42)
```

Résultat : **succès**, 42 pages générées, aucune erreur TypeScript.

Routes produites (extrait) : `/[locale]`, `/[locale]/a-propos`, `/[locale]/contact`, `/[locale]/legal/[slug]`, `/[locale]/produit` (+ `demonstration`, `modules`, `moteur-decisionnel`), `/[locale]/ressources` (+ `faq`, `pilote`), `/[locale]/securite`, `/[locale]/solutions`, `/[locale]/tarifs`, `/_not-found`, `robots.txt`, `sitemap.xml`.

Les routes `/connexion`, `/inscription`, `/mot-de-passe-oublie` et `/reinitialiser-mot-de-passe` ne figurent plus dans l'artefact.

### 3.5 `npm run check:placeholders`

```
> verqia-site@0.1.0 check:placeholders
> node scripts/check-placeholders.mjs

Valeurs manquantes (32):
...
Mode préproduction : échec réservé à --production / NODE_ENV=production.
```

Résultat : **32 valeurs manquantes attendues**, sortie avec code 0 hors Production. Le gate reste bloquant en Production via `--production` / `NODE_ENV=production`.

### 3.6 Tests E2E

Prérequis local : `npx playwright install chromium` (Chromium Playwright révision 1254, aligné sur la version de `@playwright/test`). Le serveur E2E reconstruit l'artefact avant démarrage (`node scripts/e2e-web-server.mjs`) sur les ports 3100 (suite par défaut) et 3101 (suite pricing-review), avec `NEXT_PUBLIC_LOCAL_PRICING_REVIEW` vide ou `true` selon la suite.

#### Suite par défaut — `npm run test:e2e`

```
Running 12 tests using 2 workers
12 passed (3.2m)
```

Résultat : **12 tests sur 12 passent**. Couverture : 404 des quatre routes d'authentification, portée informative (aucun contact/formulaire), `/a-propos` sans partenaire/équipe/témoignage/portrait, `/ _kit` non public, navigation desktop/mobile clavier, restauration de thème, rendu `prefers-reduced-motion`, bascule de locale et liens légaux du pied de page.

#### Suite pricing-review — `npm run test:e2e:pricing-review`

```
Running 2 tests using 1 worker
2 passed (3.8m)
```

Résultat : **2 tests sur 2 passent**. L'artefact local avec `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` rend les 4 formules existantes, la comparaison, la FAQ tarifs et la bascule mensuel/annuel en FR et EN. La suite par défaut reste, elle, sans offre commerciale publique.

#### Notes d'exécution

- Un test EN de portée informative a dépassé le délai Playwright par défaut de 30 s lors du premier passage complet (huit navigations successives sur le serveur dynamique). Correctif retenu : `timeout: 90_000` dans `playwright.config.ts` et `playwright.pricing-review.config.ts`, et `timeout: 300_000` pour `webServer`. Aucun retry n'a été activé.
- Node émet un avertissement `DEP0190` bénin parce que le lancement de `npm.cmd` sous Windows nécessite `shell: true`.
- Next.js signale l'absence de `metadataBase` et utilise `http://localhost:3100/3101` en local ; cela n'affecte ni les tests ni l'artefact.


## 4. Fichiers créés

| Fichier | Rôle |
|---|---|
| `lib/cta.ts` | Type `CtaSource` et helper `withSource` ; n'altère jamais les liens externes. |
| `components/sections/home/HeroRotate.tsx` | Rotation des 4 bénéfices, aria-hidden sur le mot animé, résumé lecteur d'écran, reduced-motion statique. |
| `components/sections/product/GuidedRelance.tsx` | 4 bulles fictives temporisées, `aria-live`, bouton Rejouer, timers nettoyés. |
| `tests/cta.test.ts` | Attribution, non-fuite de `source` dans le DOM, câblage des CTA, default-deny. |
| `docs/PRD-11-11-IMPLEMENTATION-ADDENDUM.md` | Règles, décisions et exclusions du package 11/11. |
| `docs/launch-readiness/PACKAGE-11-11-IMPLEMENTATION-EVIDENCE.md` | Le présent document. |

## 5. Fichiers modifiés (principaux)

- `components/ui/Button.tsx` : prop `source`, résolution via `withSource`.
- `components/sections/home/Hero.tsx`, `FinalCta.tsx`, `EngineTeaser.tsx` : CTA attribués.
- `components/navigation/HeaderBehavior.tsx`, `MobileSheet.tsx` : CTA header et header mobile attribués.
- `components/sections/product/Demo.tsx`, `UpgradeModal.tsx`, `Modules.tsx` : modale accessible, `?source=demo-locked`, badge « À valider ».
- `components/sections/decision/DecisionDemo.tsx` : analyse 900 ms, clavier, `aria-live`, reduced-motion immédiat.
- `components/sections/resources/Faq.tsx`, `PilotProgram.tsx` : filtres FAQ, onglets accessibles.
- `components/sections/solutions/Solutions.tsx`, `Audiences.tsx` : CTA Solutions, fallback média 4/3.
- `components/sections/about/Founder.tsx`, `config/about.ts`, `styles/about-institutional.css` : mot du fondateur anonyme, aucun partenaire/équipe/témoignage.
- `config/motion.ts` : presets `hero`, `heroRotate`, `panel`, `sheet`, `decision`, `guidedRelance`, `stepper`, `price`, `ambient`, `pageTransition`.
- `config/media.ts` : suppression de l'entrée vidéo du fondateur ; aucun média de fondateur n'est configuré.
- `config/site.ts` : suppression de `founderName`, `founderPhotoPath` et `signupUrl`.
- `lib/launch-scope.ts` : suppression de `publicAuthenticationEnabled`.
- `messages/fr.json`, `messages/en.json` : contenu, clés d'interaction, suppression des clés auth/partenaires/équipe/témoignages.
- `styles/globals.css` : suppression des règles mortes d'authentification, de portrait fondateur, d'équipe et de marquee.
- `tests/*`, `tests/e2e/*` : mise à jour des garanties.
- `CLAUDE.md`, `scripts/e2e-web-server.mjs` : directive 11/11 et démarrage E2E compatible Windows.

## 6. Fichiers supprimés

- Routes : `app/[locale]/connexion/page.tsx`, `app/[locale]/inscription/page.tsx`, `app/[locale]/mot-de-passe-oublie/page.tsx`, `app/[locale]/reinitialiser-mot-de-passe/page.tsx`.
- Composants : `components/auth/AuthForms.tsx`, `components/auth/AuthShell.tsx`, `components/sections/about/TeamCarousel.tsx`.
- Données : `lib/supabase-browser.ts`, `styles/auth.css`, `docs_AUTH_SETUP.md`.
- Médias : `public/media/about/founder-sanhou-sombo-christian-samuel.webp`, `public/media/about/team-demo-01.webp` à `team-demo-06.webp`.

## 7. Décisions

1. **Authentification retirée, pas remplacée.** Aucune route, aucun composant, aucune dépendance Supabase, aucune clé i18n `auth`. Les URLs historiques répondent 404.
2. **Mot du fondateur textuel et anonyme.** Texte approuvé mot pour mot, signature `Le Fondateur de VERQIA` / `The Founder of VERQIA`. Aucun nom, portrait, photo, biographie, parcours, diplôme, ville ou pays.
3. **Contact et offre commerciale default-deny.** Aucune valeur inventée ; les canaux restent masqués jusqu'à approbation.
4. **Tarifs locaux/Preview uniquement.** `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true` reste le seul interrupteur, jamais actif par défaut.
5. **Attribution sans fuite DOM.** `source` sert uniquement à construire l'URL ; il n'est jamais rendu comme attribut.
6. **Contenus exclus volontairement.** Partenaires, équipe, témoignages et résultats clients ne sont pas rendus ; le marquee et son CSS sont supprimés.
7. **Badge « À valider ».** Les statuts `toValidate` restent visibles sans être promus en fonctionnalité vérifiée.
8. **`HeroRotate` conserve le namespace `home.heroRotate`** avec `prefix`, `screenReaderSummary` et `words.*` pour rester compatible avec les tests.

## 8. Sections volontairement inactives

- Authentification, espace utilisateur, paiement.
- Contact public (WhatsApp, e-mail, Calendly), formulaires, demande de démo ou de devis.
- Partenaires, équipe, témoignages, résultats clients, marquee.
- Données réelles : démonstrations, relances et simulations restent fictives ou illustratives.
- Promesse de disponibilité, de date de lancement ou de pilote opérationnel.

## 9. Limites connues

- `scripts/check-rendered-placeholders.mjs` ne contrôle que le bloc `legalPage` ; il ne scanne pas toutes les pages publiques.
- `check:placeholders` signale 32 valeurs manquantes (30 valeurs d'environnement/médias + 2 lignes de statuts `toValidate` couvrant 4 éléments).
- Les E2E s'exécutent sur un artefact local avec `NEXT_PUBLIC_LOCAL_PRICING_REVIEW` vide (sauf suite dédiée).
- Aucun déploiement Preview ou Production n'est déclenché par ce package.

## 10. Blocages « À valider » avant Production

Les 32 valeurs suivantes doivent être fournies ou approuvées :

1. Domaine / URL officielle
2. Raison sociale
3. Forme juridique
4. Siège social / adresse légale
5. Capital social ou confirmation « non applicable »
6. Numéro de compte contribuable / identifiant fiscal
7. Représentant légal
8. E-mail professionnel
9. Téléphone professionnel
10. Directeur de la publication
11. Nom de l'hébergeur
12. Adresse de l'hébergeur
13. Contact de l'hébergeur
14. Contact pour les demandes de droits sur les données
15. Numéro RCCM / immatriculation
16. Référence datée de validation juridique
17. Décision D-017 sur les contacts publics
18. Affiche de la vidéo d'accueil
19. Sous-titres français — vidéo d'accueil
20. Sous-titres anglais — vidéo d'accueil
21. Affiche de la vidéo produit
22. Sous-titres français — vidéo produit
23. Sous-titres anglais — vidéo produit
24. Image — commerce et distribution
25. Image — cabinets et services professionnels
26. Image — startups
27. Image — PME
28. Image — entreprises B2B
29. Image — grossistes et supermarchés
30. Image — grandes organisations
31. 3 éléments « À valider » dans `config/simulations.ts`
32. 1 élément « À valider » dans `config/modules.ts`

Tant que ces éléments ne sont pas clos, `npm run check:production` et un build `VERQIA_BUILD_TARGET=production` doivent rester bloquants.

## 11. Statut Git, Preview et Production

- **Branche de travail :** `feat/verqia-package-11-11`, créée depuis `preview`.
- **Commit :** `feat: complete VERQIA package 11-11` (commit unique du package).
- **Push :** `origin feat/verqia-package-11-11` avec suivi amont (`-u`).
- **Pull request :** cible `preview`, ouverte depuis `feat/verqia-package-11-11`. Aucune fusion automatique.
- **`main` :** non modifiée, non poussée.
- **Production :** non déployée, volontairement bloquée par les 32 valeurs listées en section 10 ; `npm run check:production` sort en code 1.
- **Preview :** aucun déploiement n'est déclenché par les commandes locales. Si un projet Vercel est connecté au dépôt, l'ouverture de la PR vers `preview` peut créer un déploiement Preview ; ce point n'est pas vérifié dans ce document.

