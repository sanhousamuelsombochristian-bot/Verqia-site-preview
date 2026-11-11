# VERQIA — Prompts du site (multi-pages)

> **Utilisation** : 1) place `CLAUDE.md` (fichier 06) à la racine du projet ; 2) colle la **section A** une seule fois par conversation ; 3) colle ensuite le prompt de l'étape, dans l'ordre du journal ; 4) coche l'étape ; 5) passe à la suivante.
> **Sources de vérité** : contenu = `01_PRD`, technique = `02_TRD`, visuel = `03_DESIGN_SYSTEM`. Les prompts ne recopient pas les textes : ils renvoient au PRD, qui tranche en cas de doute.
> **Version** : 08/11/2026. Site vitrine de 7 pages, **sans backend** dans cette phase.

## État courant après reprise (08/11/2026)

- Les quatre vidéos exactes fournies sur Drive sont présentes sous `public/media/brand-motion/` et reliées par défaut aux espaces vidéo accueil/produit; le lecteur ne charge le flux qu’au clic et choisit l’orientation mobile. Les sources sont présentes, mais les affiches et pistes de sous-titres restent absentes. Les logos originaux restent sous `public/media/brand/`.
- Les routes FR/EN de connexion, inscription, récupération et réinitialisation sont intégrées et stylées. `@supabase/supabase-js` utilise les variables documentées dans `docs_AUTH_SETUP.md` et `.env.example`; aucun projet Supabase n’a été fourni/configuré, donc aucun compte ou flux OAuth/e-mail n’est actuellement opérationnel. Aucun paiement, abonnement, espace de travail ou fonction métier n’est ajouté.
- Les prix/quotas de `config/plans.ts` sont acceptés pour cette version et marqués `confirmed`; cela ne lève pas les autres exigences du feu vert de publication. La durée et les conditions du pilote, ainsi que tout délai de réponse, ne sont pas annoncés car ils restent à confirmer. Le copy éditorial des pages contact, pilote, sécurité, mentions et tarifs a été nettoyé sans inventer d’identité, de coordonnées, de certification ou de résultat.
- Contrôles exécutés après ces changements : lint, TypeScript, 13 tests unitaires et build Next.js réussis; 50 pages générées, indexation désactivée. Contrôle d’indexation : 33 éléments manquent encore, surtout URL/identité légale, contact, relecture juridique, affiches/sous-titres vidéo, médias de profils, variantes de marque et portrait du fondateur. L’indexation demeure bloquée.
- Vérification HTTP sur 22 routes FR/EN : 200 et un seul `h1` chacune; aucun libellé provisoire dans le HTML visible. Playwright E2E n’a pas pu s’exécuter, Chromium absent dans l’environnement; aucun Lighthouse/axe/performance n’est revendiqué. Le preview de production reste sur le port 3000.

## Journal d'avancement

| Étape | Prompt | Fait |
|---|---|---|
| 1 | P0 — Fondations (projet, tokens, config, composants, défilement fluide) | ☑ |
| 2 | N1 — Navigation arrondie et pied de page | ☑ |
| 3 | C1 — Page Contact | ☑ |
| 4 | H1 — Accueil | ☑ |
| 5 | P1 — Produit (hub) | ☑ |
| 6 | P2 — Modules | ☑ |
| 7 | P3 — Moteur décisionnel | ☑ |
| 8 | P4 — Démonstration | ☑ |
| 9 | T1 — Tarifs | ☑ |
| 10 | S1 — Solutions et simulations | ☑ |
| 11 | R1 — Ressources (FAQ, Programme pilote) | ☑ |
| 12 | A1 — À propos | ☑ |
| 13 | L1 — Sécurité et confiance, pages légales | ☑ |
| 14 | Q1 — SEO, accessibilité, performance, médias, garde-fou | ☐ |

#### Vérification du 08/11/2026

Les étapes 4 à 13 sont implémentées en FR/EN. Vérifications exécutées : `npm run lint`, `npm run typecheck`, `npm test` (13/13), `npm run build` (42 routes générées), audit des dépendances de production (0 vulnérabilité), parité des dictionnaires (616 clés FR et EN, aucun écart) et contrôle HTTP des 36 routes localisées (200, exactement un `h1` chacune). Q1 est en cours : metadata localisées/canonical/hreflang, routes sitemap/robots, route d’image Open Graph et JSON-LD sont implémentés. Les pages légales et Sécurité incluent les textes de référence vérifiés, la portée limitée de l’article 40 (documents électroniques, pas toutes les données personnelles) et les placeholders nécessaires; voir `docs_LEGAL_REVIEW.md`. Aucun domaine réel n’étant fourni, la sitemap reste vide, les URL structurées absolues et l’image OG dans les métadonnées sont différées ; Next.js avertit de l’absence de `metadataBase`. Playwright/axe et Lighthouse n’ont pas été exécutés ; Chromium ne démarre pas dans le sandbox (`libnspr4.so` manquant).

Le garde-fou de production échoue tant que manquent URL, identité/mentions légales, contact, validation juridique, médias obligatoires, actifs de marque confirmés, portrait du fondateur ou valeurs de prix/quotas encore « À valider ». L’indexation est désormais opt-in (`VERQIA_INDEXING_ENABLED`, désactivé par défaut) : préproduction avec `noindex,nofollow`, sitemap vide et aucune sitemap annoncée dans `robots.txt`. Build vérifié avec 42 routes; le HTML produit contient `noindex, nofollow`; la demande d’indexation prématurée bloque le build. Le contrôle rapporte actuellement 37 éléments manquants, dont 9 prix/quotas à valider. Après compilation, un scan bloque aussi toute page publique FR/EN contenant encore « À COMPLÉTER »/« TO COMPLETE » ou « À VALIDER »/« TO VALIDATE » (la page technique `/_kit` est exclue). Audit global de reprise : focus trap mobile corrigé pour ignorer les liens des accordéons masqués; `allowedDevOrigins` autorise l’aperçu `*.e2b.app`. Lint, typecheck, 13 tests et build de production 42 routes passent; 36 routes servent HTTP 200 avec un seul `h1` et `noindex`; sitemap vide. Les contrastes des tokens principaux testés dépassent AA (minimum 4.78:1). Aperçu relancé en mode production sur le port 3000. Depuis le brief 08, l’interface de préférences cookies est implémentée avec enregistrement local; aucun script de suivi non essentiel n’est chargé ou activé. Le lien du pied de page pointe vers `/legal/cookies`, avec un bouton de gestion des préférences sur cette page. Cette implémentation doit encore être vérifiée après les dernières modifications et les catégories/durées validées juridiquement.

#### Q1 — bilan du contrôle domaine/hébergement (08/11/2026)

`verqia.com` est déjà enregistré selon RDAP; pas de possibilité d’enregistrement ordinaire et aucun achat/négociation n’a été fait. Le lookup NIC.CI ne trouve pas `verqia.ci`, disponibilité possible à confirmer lors de la commande chez un registrar accrédité; aucune réservation n’a été faite. Vercel est retenu **provisoirement** comme hébergeur initial; `vercel.json` positionne les Vercel Functions en `cpt1` (Cape Town), sans prétendre à la résidence intégrale des données (CDN mondial, journaux et sous-traitants à inventorier). Prévoir Vercel Pro/Enterprise pour un usage commercial, sous réserve d’avis juridique sur le DPA et les transferts. Aucune boîte e-mail n’a été créée : `contact@verqia.com` et `confidentialite@verqia.com` demeurent des noms proposés. Les actifs de marque/portrait restent non confirmés. Q1 reste ouverte; ne pas renseigner le domaine officiel ni `lastLegalUpdate` avant les formalités, médias et relecture réelle des cinq pages.

---

## A. Contexte commun (à coller en premier)

Tu es un ingénieur front-end senior et un directeur artistique. Tu construis le site vitrine de **VERQIA** (produit : VERQIA PILOT), plateforme SaaS FinTech premium de pilotage financier, de suivi des créances et de gestion intelligente des encaissements (marché : Côte d'Ivoire, Afrique francophone, international B2B ; devise FCFA). Site **bilingue FR/EN**, de **7 pages** composées de sections, sur le modèle des grands sites de produit (type OpenAI, Anthropic).

### Périmètre de cette phase
**Aucun backend** : ni route API, ni Server Action, ni base de données, ni formulaire avec envoi, ni secret. Tout est statique ou pré-rendu. Les démos interactives utilisent un état local et des **données fictives étiquetées**. Le backend et l'application viendront en phase 2, sans réécrire les pages.

### Sources de vérité
`01_PRD` (contenu, formules, textes mot pour mot) · `02_TRD` (architecture, configuration) · `03_DESIGN_SYSTEM` (visuel) · `CLAUDE.md` (méthode, défilement fluide, qualité). En cas de contradiction, **signale-la** et applique cet ordre. Ne devine pas.

### Stack imposée
Node.js (LTS) + Next.js (App Router) + TypeScript strict + Tailwind CSS + Motion + **Lenis** + `next-intl` + `next-themes` + `lucide-react` + Zod. Vérifie la documentation officielle avant d'installer ; n'écris pas de numéros de version de mémoire. Un composant par section dans `components/sections/`, une page = un `page.tsx` qui assemble des sections. **Aucun texte en dur** : tout vient de `messages/fr.json` et `messages/en.json` (fournis les deux).

### Configuration (sources uniques)
`config/plans.ts` (formules, prix, quotas, statut `confirmed | toValidate`) · `config/modules.ts` · `config/site.ts` (coordonnées, `null` par défaut) · `config/nav.ts` (navigation et pied de page) · `config/media.ts` (vidéos et images) · `config/simulations.ts` · `config/motion.ts` (défilement et apparitions).

### Direction artistique
FinTech premium, éditorial tech minimaliste : sobre, élégant, rassurant. Deux ambiances alternées, **sombre** (onyx) et **crème**, accent **lime** ; rythme par page : tableau 11.2 du design system.
- Titres **Instrument Serif**, dernier mot en italique + accent, parfois souligné d'un trait tracé (SVG) ; annotations **Reenie Beanie** (1 par écran maximum) ; texte **Inter**, chiffres financiers en `tabular-nums`.
- Boutons : pilule + rond contenant une flèche →. Cartes 24 px, filets fins, numérotation « 01 / 04 ».
- **Interdits** : animations permanentes (boucles, marquees, flottaison), dégradés excessifs, lueurs gratuites, interfaces chargées.

### Tokens
Ceux de `03_DESIGN_SYSTEM` section 7 (`styles/tokens.css`). Le lime pur n'est jamais une couleur de texte sur fond crème (utiliser `--accent-text`).

### Défilement fluide et animations
Lenis, une seule instance montée dans le layout de locale, réglée dans `config/motion.ts` ; apparitions au défilement à 35 % de visibilité, une seule fois, 600–700 ms ; titres du hero immédiats ; style `<noscript>` de secours ; tout coupé si `prefers-reduced-motion`. Remise en haut de page à chaque navigation. Détails dans `CLAUDE.md` section 5.

### Règles de fiabilité (non négociables)
1. **Ne rien inventer** : ni chiffre, logo client, témoignage, partenariat, certification, coordonnée, nom, parcours du fondateur.
2. Information manquante → composant `ToComplete` (« À COMPLÉTER »). **Jamais de lien mort** : bouton masqué ou renvoi vers `/contact`.
3. Prix ou quota non confirmé → badge « À valider ».
4. Données de démonstration → « Données fictives ». Scénarios chiffrés → « Simulation illustrative, pas un résultat client ».
5. Fonction non incluse dans une formule → visible, grisée, avec cadenas et formule requise.
6. VERQIA n'est ni une banque, ni un établissement financier.
7. Prix en FCFA, mensuel et annuel sans ambiguïté.

### Exigences techniques
Mobile d'abord (360 px) ; contraste AA ; clavier complet ; `prefers-reduced-motion` ; `next/image` ; peu de JavaScript ; TypeScript strict sans `any` ; une page = un seul `h1`.

### Format de réponse attendu (Claude Code)
1. Une phrase de plan. 2. **Écris les fichiers directement** dans le projet. 3. Clés i18n FR et EN ajoutées. 4. Résumé : fichiers créés ou modifiés, points d'attention, éléments « À COMPLÉTER » rencontrés. Ne réécris pas les fichiers déjà validés. Si tu utilises ChatGPT à la place : donne le code complet de chaque fichier.

---

## PHASE 0 — Fondations

### Étape 1 — P0 · Fondations

**Mission** : Initialiser le projet et poser tout ce que les pages utiliseront.

#### Contenu
- Projet Next.js (App Router, TypeScript, Tailwind) nommé `verqia-site` ; installe `motion`, `lenis`, `next-intl`, `next-themes`, `lucide-react`, `zod`.
- Polices `next/font` : Inter, Instrument Serif (régulier + italique), Reenie Beanie.
- `styles/tokens.css` (clair et sombre via `data-theme`, sans flash) ; routage `/fr` et `/en` ; arborescence des routes de `02_TRD` section 3, avec des pages vides.
- Tous les fichiers `config/*` selon `02_TRD` section 6 : `plans.ts` (valeurs et statuts du PRD section 3), `modules.ts`, `site.ts` (tout à `null`), `nav.ts` (structure de `02_TRD` 4.1), `media.ts` (tout à `null`), `simulations.ts` (3 scénarios, PRD 7.3), `motion.ts`.
- `SmoothScroll` + `lib/smooth-scroll.ts` + CSS Lenis, comme dans `CLAUDE.md` section 5 ; `Reveal`.
- Composants `ui/` : `Button` (pilule + rond flèche), `Badge`, `ToValidate`, `ToComplete`, `SectionLabel`, `AccentWord`, `NumberedCard`, `EditorialQuote` (5 citations du PRD 7.8, sans attribution), `Accordion`, `Stepper`, `LockedFeature`, `MediaFrame`, `VideoPlayer`.
- `scripts/check-placeholders.mjs` (règles de `02_TRD` section 7) et script `npm run check:placeholders`.
- Tests Vitest : `plans.ts`, `nav.ts` (≤ 5 entrées, aucune entrée vers une page non prête).
- Page de test `/fr/_kit` (hors sitemap) montrant chaque composant `ui`.

#### Visuel
Site vide qui s'affiche en FR et EN, clair et sombre, défilement fluide actif.

#### Interactions
Aucune animation permanente.

#### Livrable attendu
Commandes d'installation, arborescence, `layout.tsx`, tokens, i18n, `config/*`, composants `ui`, script de contrôle, tests.

---

## PHASE 1 — Structure du site

### Étape 2 — N1 · Navigation arrondie et pied de page

**Mission** : Construire l'en-tête global et le pied de page, communs à toutes les pages.

#### Contenu
- Navigation : exactement **Produit ▾ · Solutions · Tarifs · Ressources ▾ · À propos**, générée depuis `config/nav.ts` (PRD 6.1). Bouton **« Demander un pilote »** vers `/contact`. Sélecteur FR/EN, bascule clair/sombre.
- Menu Produit : Modules · Moteur décisionnel · Démonstration. Menu Ressources : FAQ · Programme pilote · Guides (masqué, `ready: false`). Chaque lien du panneau : titre + une ligne de description (clés i18n).
- Logo : emplacement réservé (`config/site.logoPath`, sinon cadre « Logo à fournir »).
- Pied de page (PRD 6.3) : signature, colonnes Produit / Offres / Entreprise / Légal, ligne **Sécurité et confiance** + liens légaux + « Gérer mes cookies », coordonnées **seulement si renseignées**, mention « VERQIA n'est pas une banque ou un établissement financier. »

#### Visuel
`03_DESIGN_SYSTEM` sections 10 et 13 : pilule centrale, panneau déroulant arrondi 24 px, bouton accent à droite ; après 80 px de défilement, logo réduit en icône ronde ; pied de page `--bg-deep`.

#### Interactions
Sous-menus ouverts au survol et au clic/Entrée, `aria-expanded`, `Esc` pour fermer, focus visible, `aria-current="page"` ; menu mobile plein écran avec accordéon, piège de focus, `getLenis()?.stop()` à l'ouverture et `start()` à la fermeture ; header collant avec `scroll-padding-top`.

#### Livrable attendu
`Header`, `NavPill`, `MegaMenu`, `MobileSheet`, `NavIndicator`, `Footer`, `LangSwitch`, `ThemeToggle`, clés i18n, tests de navigation au clavier selon le brief 09.

### Étape 3 — C1 · Page Contact

**Mission** : Remplacer le formulaire par des canaux de contact, sans backend.

#### Contenu
- Titre « Demander un pilote, une démonstration ou un devis. » (PRD 7.7).
- `ContactChannels` : boutons **WhatsApp, E-mail, Calendly**, rendus **uniquement** si `config/site` contient la valeur. Si aucun n'est renseigné : pastille « À COMPLÉTER » (préproduction) et le garde-fou échoue en production.
- Réassurance : « Réponse cible sous 24 heures ouvrées » et « Offre pilote gratuite de 30 jours : à confirmer. »
- **Pas de formulaire.** Ajoute en commentaire dans le code où il s'insérera en phase 2.
- Paramètre `?source=` conservé dans les liens sortants (WhatsApp : texte pré-rempli ; e-mail : objet pré-rempli).

#### Visuel
En-tête sombre, carte de canaux crème (rythme du design system 11.2), trois boutons pilule.

#### Interactions
Liens externes en `rel="noopener noreferrer"` avec mention « (nouvel onglet) » ; aucun bouton mort.

#### Livrable attendu
`app/[locale]/contact/page.tsx`, `ContactChannels.tsx`, clés i18n.

---

## PHASE 2 — Accueil et produit

### Étape 4 — H1 · Accueil

**Mission** : Faire comprendre VERQIA en 5 secondes et orienter vers le pilote ou la gratuité.

#### Contenu (PRD 7.1, mot pour mot)
- **A1 Hero** : surtitre, H1 « Voyez vos créances. Sachez quoi traiter ensuite. », sous-titre, CTA « Découvrir gratuitement VERQIA » (`signupUrl`, sinon `/contact`) et « Explorer la démonstration » (`/produit/demonstration`), microtexte, `MockDashboard` étiqueté « Données fictives ».
- **A2 Vidéo récapitulative** (`VideoShowcase`) : `media.homeRecap`, juste sous le hero ; cadre « Vidéo à fournir » tant que `src` est `null`.
- **A3 Problème** : titre, texte, 3 cartes, citation 1.
- **A4 Solution** : 4 bénéfices Centraliser, Comprendre, Anticiper, Décider.
- **A5 Aperçu du moteur** (`EngineTeaser`) : accroche courte, lien vers `/produit/moteur-decisionnel`, mention « Business et Enterprise ».
- **A6 CTA final** : « Prêt à voir où en sont vos créances ? », boutons « Demander un pilote » (`/contact`) et « Découvrir gratuitement ».

#### Visuel
Hero onyx **statique** avec grain très léger (aucun dégradé marqué), maquette ordinateur + téléphone, une annotation manuscrite pivotée avec flèche tracée, arrondi crème en bas à gauche. Image forte `media.heroImage` si fournie. Solution : cartes empilées (colonne gauche : liste 01–04 avec barre accent).

#### Interactions
Apparition échelonnée des lignes du titre (immédiate) ; pile sticky pilotée par le défilement, version mobile simple ; aucune animation en boucle.

#### Livrable attendu
`app/[locale]/page.tsx`, `Hero`, `MockDashboard`, `VideoShowcase`, `Problem`, `Solution`, `EngineTeaser`, `FinalCta`, clés i18n.

### Étape 5 — P1 · Produit (hub)

**Mission** : Présenter le parcours de découverte à maîtrise et aiguiller vers les sous-pages.

#### Contenu (PRD 7.2)
- Vidéo détaillée en tête (`media.productDetail`).
- « De la découverte à la maîtrise » : 01 FREE, 02 STARTER, 03 BUSINESS, 04 ENTERPRISE, chacun avec « Ce que vous obtenez » ; quotas lus dans `config/plans.ts` avec leurs badges « À valider ».
- Trois cartes de liens vers Modules, Moteur décisionnel, Démonstration. Citation 2.

#### Visuel
En-tête sombre + vidéo, parcours sombre en cartes empilées (ligne verticale accent fine à gauche qui se remplit selon le défilement), liens crème.

#### Interactions
Même mécanique de pile que la Solution ; chaque carte reste lisible au moins une seconde de défilement.

#### Livrable attendu
`produit/page.tsx`, `Journey.tsx`, clés i18n.

### Étape 6 — P2 · Modules

**Mission** : Présenter les 10 modules avec leur formule d'accès, sans suggérer qu'ils sont tous disponibles partout.

#### Contenu (PRD 5 et 7.2)
Les 10 modules avec leurs accroches mot pour mot ; étiquette « Disponible à partir de … » lue dans `config/modules.ts` ; « Événements » porte le badge « À valider ».

#### Visuel
Grille 5 × 2 (2 colonnes en mobile), cartes éditoriales, icône `lucide-react`, étiquette de formule en pilule, filets fins ; fond crème.

#### Interactions
Survol discret 200–300 ms ; apparition échelonnée une seule fois.

#### Livrable attendu
`produit/modules/page.tsx`, `Modules.tsx`, clés i18n.

### Étape 7 — P3 · Moteur décisionnel

**Mission** : Présenter le moteur et son accès réservé, avec une démo claire.

#### Contenu (PRD 4 et 7.2)
- Titre « Ne vous contentez pas de voir les chiffres. Sachez quoi en faire. » (mot barré en trait accent sur « voir », puis italique accent : **seul emploi du mot barré sur le site**).
- Quatre décisions PROCÉDER, DIFFÉRER, SUSPENDRE, DÉROGATION avec leur sens ; texte sur l'explicabilité et la traçabilité ; mention « Accès complet réservé à Business et Enterprise ».
- `DecisionDemo` : 4 factures **fictives** (« Données fictives ») ; au clic, la décision et sa raison en langage simple. Citation 4.

#### Visuel
Fond sombre ; quatre cartes de décision ; panneau de démonstration à droite ; vignette active surlignée en accent.

#### Interactions
`useState`, transitions de 200 ms, `aria-live` pour la décision, navigation clavier ; aucune boucle.

#### Livrable attendu
`produit/moteur-decisionnel/page.tsx`, `DecisionEngine.tsx`, `DecisionDemo.tsx`, clés i18n.

### Étape 8 — P4 · Démonstration

**Mission** : Inviter à tester gratuitement sans promettre plus que FREE.

#### Contenu (PRD 7.2, mot pour mot)
Titre, texte (5 factures et 5 clients), CTA « Commencer gratuitement » (`signupUrl`, sinon `/contact`). Aperçu `MockDashboard` « Données fictives » dans une **fenêtre de navigateur** (trois points, pastille d'URL générique **sans domaine inventé**). Au clic sur une fonction verrouillée, `UpgradeModal` : « Cette fonctionnalité fait partie de VERQIA Starter… », bouton « Découvrir Starter » (vers `/tarifs`).

#### Visuel
En-tête et aperçu sur fond sombre.

#### Interactions
Modale accessible : piège de focus, `Esc`, `stop()` / `start()` Lenis.

#### Livrable attendu
`produit/demonstration/page.tsx`, `Demo.tsx`, `UpgradeModal.tsx`, clés i18n.

---

## PHASE 3 — Offres et solutions

### Étape 9 — T1 · Tarifs

**Mission** : Présenter FREE, STARTER, BUSINESS et ENTERPRISE avec prix, quotas, fonctionnalités et verrous, sans ambiguïté.

#### Contenu (PRD 3 et 7.4)
- Titre et sous-titre mot pour mot ; bascule **mensuel / annuel** (deux mois offerts, économie calculée depuis `config/plans.ts`).
- 4 cartes (BUSINESS mise en avant comme « Offre principale ») avec les quotas et fonctionnalités du PRD ; fonctions non incluses en `LockedFeature` ; badges « À valider » exactement là où `config/plans.ts` l'indique.
- CTA : « Créer mon compte gratuitement » · « Choisir Starter » · « Passer à Business » (`signupUrl`, sinon `/contact`) · « Demander un devis » (`/contact`).
- Tableau comparatif complet (lignes du PRD section 3). FAQ tarifaire (3 questions, `Accordion`). Vidéo courte `media.pricingShort` (masquée en production si absente).

#### Visuel
Fond crème ; chiffres en `tabular-nums` ; tableau défilable horizontalement en mobile ; colonne BUSINESS légèrement teintée.

#### Interactions
Bascule accessible (`role="switch"`), prix mis à jour sans rechargement, aucune boucle.

#### Livrable attendu
`tarifs/page.tsx`, `Pricing.tsx`, `PlanCard.tsx`, `ComparisonTable.tsx`, `PricingFaq.tsx`, clés i18n, tests Vitest sur les calculs d'économie.

### Étape 10 — S1 · Solutions et simulations

**Mission** : Montrer que VERQIA est transversal, et présenter des scénarios chiffrés sans les faire passer pour des résultats.

#### Contenu (PRD 7.3)
- Titre et texte mot pour mot ; 7 profils (Commerce et distribution · Cabinets et services professionnels · Startups · PME · Entreprises B2B · Grossistes et supermarchés · Grandes organisations), une image par profil via `media.audiences` (cadre « Image à fournir » sinon). Citation 3.
- `Simulations` : 3 scénarios depuis `config/simulations.ts`. **Chaque carte** porte l'étiquette « Simulation illustrative, pas un résultat client » et la durée simulée ; la section porte le badge « À valider ».
- **Interdits** : les appeler « résultats », « clients » ou « études de cas » ; afficher les indicateurs agrégés (35–45 %, 90–95 %, 33–44 %, 5,2–12 M) hors d'une carte étiquetée « simulation ».

#### Visuel
Grand conteneur arrondi crème découpé en colonnes par des filets (icône ligne dans un cercle, titre serif) ; simulations sur fond sombre.

#### Interactions
Apparition douce au défilement ; aucune animation de compteur.

#### Livrable attendu
`solutions/page.tsx`, `Audiences.tsx`, `Simulations.tsx`, clés i18n.

---

## PHASE 4 — Ressources, à propos, conformité

### Étape 11 — R1 · Ressources (FAQ, Programme pilote)

**Mission** : Lever les objections et expliquer l'offre pilote.

#### Contenu (PRD 7.5, mot pour mot)
- Hub `/ressources` : cartes vers FAQ, Programme pilote, Guides (masqué tant que `ready: false`).
- **FAQ** : les 7 questions et réponses du PRD ; JSON-LD `FAQPage` généré depuis les mêmes données.
- **Programme pilote** : pilote gratuit de 30 jours et délai cible 24 heures ouvrées, présentés comme « **offre pilote à confirmer** », jamais comme un engagement ; trois étapes 01–03 ; bouton vers `/contact`.

#### Visuel
Fond crème ; titre à gauche, accordéon numéroté 01–07 à droite avec « + » qui pivote ; mot-clé de chaque réponse surlignable au marqueur.

#### Interactions
`<button aria-expanded aria-controls>`, hauteur animée, une réponse ouverte à la fois.

#### Livrable attendu
`ressources/page.tsx`, `ressources/faq/page.tsx`, `ressources/pilote/page.tsx`, `Faq.tsx`, `PilotProgram.tsx`, JSON-LD, clés i18n.

### Étape 12 — A1 · À propos

**Mission** : Humaniser le projet sans rien inventer.

#### Contenu (PRD 7.6)
- Titre « Un projet construit autour d'une conviction : mieux comprendre pour mieux décider. »
- Mot du fondateur **mot pour mot**, signature « Le Fondateur de VERQIA », photo : emplacement « Photo à fournir » (`config/site.founderPhotoPath`) ; vidéo `media.founder` seulement si fournie. Citation 5.
- **Couverture géographique** : ville, pays, domaine en `ToComplete` ; **aucune ville ni présence inventée**.
- **Interdit** : tout nom, parcours, diplôme ou expérience ajouté.

#### Visuel
Cadre photo façon polaroïd incliné de −3°, signature manuscrite, une flèche tracée ; fond crème.

#### Interactions
Aucune animation obligatoire.

#### Livrable attendu
`a-propos/page.tsx`, `Founder.tsx`, `Geography.tsx`, clés i18n.

### Étape 13 — L1 · Sécurité et confiance, pages légales

**Mission** : Créer la page Sécurité et les pages légales sous forme de gabarits à compléter.

#### Contenu (PRD 6.4 et 10)
- `/securite` (liée **uniquement** depuis le pied de page) : protection des données, hébergement, accès et rôles dans une organisation, journalisation des décisions. **Aucune certification, norme ou engagement non fourni** : chaque point non confirmé porte « À COMPLÉTER ».
- `legal/[slug]` : Mentions légales · Politique de confidentialité · CGU · CGV · Politique de cookies. Chaque donnée propre à l'entreprise (identité juridique, adresse, immatriculation, hébergeur, contact, durée de conservation, sous-traitants) en pastille « À COMPLÉTER ».
- En-tête : « Gabarit à faire valider par un professionnel du droit avant publication. » Rappeler que VERQIA n'est pas une banque ou un établissement financier.

#### Visuel
Mise en page de lecture : titres serif, corps Inter, largeur 720 px, sommaire cliquable.

#### Interactions
Liens depuis le pied de page ; aucune clause inventée.

#### Livrable attendu
`securite/page.tsx`, `legal/[slug]/page.tsx`, clés i18n.

---

## PHASE 5 — Qualité et mise en ligne

### Étape 14 — Q1 · SEO, accessibilité, performance, médias, garde-fou

**Mission** : Finaliser la qualité avant mise en ligne.

#### Contenu
- **SEO** : `generateMetadata` par page et par langue, `canonical`, `hreflang`, Open Graph et Twitter, `opengraph-image`, `sitemap.ts` (toutes les routes et langues, sans `/_kit`), `robots.ts`, JSON-LD (`Organization` et `SoftwareApplication` sur l'Accueil, `FAQPage`, `Offer` sur Tarifs, `BreadcrumbList` sur les sous-pages).
- **Médias** : branche les vraies vidéos et images dans `config/media.ts` (hébergement vidéo : À COMPLÉTER), sous-titres FR/EN, `next/image` avec `sizes`, texte alternatif obligatoire ; vérifie que rien ne se charge avant le clic sur une vidéo.
- **Analytics** (optionnel) : événements sur les CTA avec `?source=`, **uniquement après consentement**.
- **Accessibilité** : audit clavier de tous les menus, contrastes AA des deux thèmes, `prefers-reduced-motion`, un seul `h1` par page, axe sur chaque page.
- **Performance** : Lighthouse mobile ≥ 90 par page, hero < 150 Ko (cible), défilement testé à la molette **et** au pavé tactile.
- **Garde-fou** : `npm run check:placeholders` doit échouer s'il reste un « À COMPLÉTER » obligatoire, un canal de contact absent ou un média obligatoire manquant ; liste des valeurs `toValidate` restantes.
- **Recette** : checklist reprenant les critères d'acceptation du PRD section 13 ; parcours Playwright (navigation entre toutes les pages, menus au clavier, FR/EN, clair/sombre, mensuel/annuel, modale de mise à niveau).

#### Livrable attendu
Code SEO et analytics, liste des corrections, résultats des audits **réellement exécutés** (ne prétends jamais avoir lancé un test que tu n'as pas lancé), checklist cochable.