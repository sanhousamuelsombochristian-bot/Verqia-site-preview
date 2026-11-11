# VERQIA — exécution du brief pages complètes, cadrée par le périmètre actif

**Date :** 2026-11-08  
**Statut de publication :** **NO-GO Production maintenu**  
**Source de contenu appliquée :** `messages/fr.json` et `messages/en.json` actuels.  
**Source explicitement exclue :** tout PRD historique du 08/11.

## Sauvegarde préalable

La version antérieure a été gelée et validée avant les changements :

- Archive : `/home/user/verqia-site-before-full-page-refresh-2026-11-08.zip`
- SHA-256 : `e8b6c9e367199d670fe122e609c87866078db7949288c6bbb33c400bc1df0e25`
- Manifeste interne vérifié : 218 fichiers source.

Cette sauvegarde ne contient ni dépendances, ni build, ni caches, ni secrets, ni uploads locaux.

## Application des prompts, sans reconstruire le projet

| Prompt | État | Application / garde-fou |
|---|---|---|
| P0 — Fondations | Préservé | Le projet existant, le routage i18n, Motion, Lenis, les composants et les gates n'ont pas été reconstruits. `CLAUDE.md` précise désormais que les messages actuels et les contraintes actives priment sur l'ancien PRD. |
| N1 — Navigation / footer | Renforcé | Les CTA header et mobile conservent une attribution locale via `?source=header` et `?source=header-mobile`. Aucun nouveau canal externe n'est créé. |
| H1 — Accueil | Mis à jour | Ajout de `HeroRotate`, limité aux quatre fonctions déjà présentes dans les messages. Le lecteur d'écran reçoit une phrase statique complète ; reduced-motion affiche un état statique. Les CTA hero/final/engine portent une source. |
| P1 — Produit | Préservé / renforcé | Les cartes de parcours déjà présentes conservent les données de `config/plans.ts`; leurs liens internes portent `?source=produit`. |
| P2 — Modules | Renforcé | Le badge `À valider` suit maintenant `config/modules.ts`, notamment pour `events`; aucune disponibilité opérationnelle n'est annoncée. |
| P3 — Moteur décisionnel | Mis à jour | La démo locale passe par les phases `analyzing` puis `decided` pendant 900 ms, ou immédiatement avec reduced-motion. Clavier flèches/Home/End et `aria-live` sont conservés. Le mot barré reste conditionnel : aucune chaîne vide n'est rendue. |
| P4 — Démonstration | Mis à jour partiellement | Les éléments verrouillés ouvrent maintenant la modale accessible existante, avec focus trap, Escape et Lenis stop/start. Aucun domaine ou envoi n'est ajouté. La relance guidée n'est pas créée : ses quatre messages source (`P-CONV-01`) ne sont pas fournis dans les dictionnaires. |
| T1 — Tarifs | Préservé / renforcé | Les prix restent confinés au flag local/Preview. Le seul CTA autorisé dans la revue tarifaire pointe vers la maquette interne avec `?source=pricing`; aucun contact ou devis n'est introduit. |
| S1 — Solutions | Renforcé | Les emplacements image vides sont maintenant rendus comme cadres de média. Chaque simulation porte son badge illustratif et son statut `À valider` issu de `config/simulations.ts`. |
| R1 — Ressources | Mis à jour | FAQ filtrable par périmètre, formules et démonstration ; la première réponse du filtre devient ouverte. Le pilote devient un vrai tablist clavier (flèches, Home, End, `tabpanel`) sans contact actif. |
| A1 — À propos | Conservé restrictif | Fondateur, partenaires, équipe et témoignages restent retirés de `/a-propos`, conformément à l'autorisation antérieure et à l'absence de consentement de publication. |
| C1 — Contact | Conservé restrictif | Aucun formulaire, CTA de contact ou canal externe n'est activé. La page conserve l'état transparent sans canal. |
| L1 — Sécurité / légal | Conservé | Les gabarits restent non publiables et ne reçoivent aucun texte juridique inventé. Les gates Production continuent à détecter les sections incomplètes. |
| Q1 — QA | Exécuté localement | Typecheck, lint, tests, build, parité i18n et rendu HTTP local vérifiés. Aucun déploiement ni audit intrusif n'a été effectué. |

## Nouvelles clés i18n et parité

Les deux dictionnaires possèdent maintenant **873 clés feuille chacun**. Sont notamment couverts :

- `home.heroRotate.*` ;
- `decisionEngine.demo.analyzing` ;
- `faqPage.filters.*` ;
- `pilotPage.stepperLabel` et `pilotPage.stepPanelLabel` ;
- `common.validate`.

Un test Vitest vérifie désormais la parité complète FR/EN et la présence des clés interactives ajoutées.

## Preuves locales exécutées

| Commande / contrôle | Résultat |
|---|---|
| `npm run typecheck` | succès |
| `npm run lint` | succès |
| `npm test` | succès — **21/21** |
| `npm run build` | succès — **50 routes** générées, indexation inactive |
| Requêtes HTTP locales | **15/15** routes conceptuelles à `200` |
| Accueil HTTP | HeroRotate et CTA `source=hero` présents |
| FAQ HTTP | contrôles de filtre rendus |
| Pilote HTTP | tablist de parcours rendue |
| Moteur HTTP | copie de démo fictive rendue |
| Tarifs HTTP, build par défaut | aucun montant commercial rendu |

## Limites maintenues volontairement

- Les E2E interactifs ne sont pas relancés ici : le navigateur Playwright compatible n'est pas installé dans cet environnement. Les scénarios restent listables, mais aucun résultat E2E n'est revendiqué.
- `metadataBase`, CSP et HSTS restent bloqués par l'absence volontaire de domaine HTTPS officiel et d'inventaire final des ressources.
- Aucune validation juridique, décision D-017, identité légale, prix de Production, contact public, domaine ou autorisation finale n'est fournie par ces changements.

**Conclusion :** l'expérience conceptuelle est enrichie sans changer le statut produit ou juridique. Les garde-fous restent actifs et la Production est toujours bloquée.
