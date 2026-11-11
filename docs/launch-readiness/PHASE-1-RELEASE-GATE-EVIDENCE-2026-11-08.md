# VERQIA — preuves locales de renforcement des gates de release

**Date :** 2026-11-08  
**Statut :** **NO-GO Production maintenu**  
**Portée :** corrections locales, réversibles et non destructives. Aucun déploiement, DNS, domaine, service externe, authentification, base de données, collecte de données ou contenu juridique n'a été modifié.

## Contrôles ajoutés

1. `npm run build` commence désormais par `scripts/check-production-readiness.mjs`.
   - Sur Vercel, `VERCEL_ENV=production` déclenche obligatoirement le contrôle ; cette valeur a priorité sur toute cible locale.
   - En local/Preview, le contrôle reste non bloquant par défaut ; `VERQIA_BUILD_TARGET=production` ou `npm run check:production` reproduit le gate Production sans publication.
2. Un build Production est bloqué si `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true`.
3. Le gate Production exécute `check-placeholders.mjs --production` indépendamment de l'indexation.
4. Le gate bloque également si `publicContactEnabled` reste codé à `false` : D-017 ne peut donc plus être simulée par de simples variables d'environnement alors que le contact de droits ne serait pas affiché.
5. Le contrôle des éléments `status: 'toValidate'` couvre `config/plans.ts`, `config/simulations.ts` et `config/modules.ts`.
6. Les assets contrôlés correspondent aux deux assets effectivement rendus par `Brand.tsx` : symbole V et mot-symbole VERQIA. Les variantes onyx, ronde et portrait non rendus ne sont plus exigés par ce gate.
7. `LEGAL_REVIEW_APPROVED=true` est remplacé par une référence datée obligatoire, `LEGAL_REVIEW_REFERENCE`. Cette référence reste une preuve à vérifier humainement ; elle n'est pas une approbation juridique automatique.
8. `check-rendered-placeholders.mjs` vérifie désormais les contenus juridiques source FR/EN pour chaque build Production : document de travail, corps vides et placeholders. Il ne dépend plus de fichiers HTML statiques absents des routes dynamiques.

## Vérifications exécutées

| Vérification | Résultat |
|---|---|
| `npm run typecheck` | succès |
| `npm run lint` | succès |
| `npm test` | succès — 19/19 tests, dont 3 tests de gate de release ajoutés |
| `npm run build` local/Preview | succès — 50 routes générées, indexation désactivée |
| `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true npm run build` local/Preview | succès — la revue tarifaire reste strictement limitée à ce périmètre |
| Requête locale `/fr/tarifs` sur l'artefact de revue | le montant configuré `11 900 FCFA / mois` est rendu |
| Requête locale `/robots.txt` | `Disallow: /` lorsque l'indexation est désactivée |
| `npm run check:production` | échec attendu : 32 prérequis Production manquent |
| `VERQIA_BUILD_TARGET=production NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true npm run build` | échec attendu : flag tarifaire explicitement refusé, sans exécuter Next build |
| `VERQIA_BUILD_TARGET=production node scripts/check-rendered-placeholders.mjs` | échec attendu : 22 contenus juridiques incomplets (FR/EN) détectés |
| `npx playwright test --list` | 12 scénarios publics listés ; non exécutés sans navigateur épinglé disponible |
| `npx playwright test --config=playwright.pricing-review.config.ts --list` | 2 scénarios de revue tarifaire listés ; non exécutés sans navigateur épinglé disponible |

## Ajustements complémentaires

- `.env.example` décrit les variables de release, leurs limites Preview/Production et ne contient aucune donnée réelle ou secret.
- Les scripts Playwright utilisent maintenant un lanceur Node multiplateforme, compatible Windows, macOS/Linux et CI. Il construit l'artefact avant de démarrer le serveur ; aucune installation automatique de navigateur n'est ajoutée.
- `robots.txt` retourne `Disallow: /` lorsque l'indexation est désactivée. Avec indexation autorisée et domaine officiel, `Host` utilise uniquement le nom d'hôte.
- Les liens `hreflang` deviennent absolus uniquement lorsqu'un domaine HTTPS officiel est fourni. Aucun domaine n'a été inventé.
- Les images HTTPS explicitement configurées sont servies sans passer par l'optimiseur Next, ce qui évite une erreur de `remotePatterns` tout en limitant les valeurs à `/public` ou HTTPS dans le gate.
- `@types/node` est déplacé dans `devDependencies` et `tsconfig.tsbuildinfo` est ignoré.

## Blocages restant ouverts

Les corrections ne ferment aucune validation métier, juridique ou de production :

- identité légale, coordonnées officielles, hébergeur, RCCM/immatriculation et domaine HTTPS ;
- décision D-017 concernant l'affichage de contacts publics et du contact de droits ;
- rédaction et revue par un professionnel du droit des textes juridiques incomplets ;
- validation/retrait des scénarios et du module `events` marqués `toValidate` ;
- CSP et HSTS, qui nécessitent un domaine HTTPS approuvé et un inventaire final de ressources ;
- exécution E2E complète après installation contrôlée de la version de navigateur Playwright attendue ;
- avertissement `metadataBase` : laissé ouvert volontairement, car aucune URL officielle ne peut être inventée.

**Conclusion :** les contrôles de release sont renforcés et la production est maintenant bloquée de manière explicite par le processus de build. Le statut reste **NO-GO Production**.
