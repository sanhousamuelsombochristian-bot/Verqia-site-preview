
**Règles de structure** : une page = un fichier `page.tsx` qui assemble des sections ; une section = un composant dans `components/sections/` ; aucune section ne contient de texte en dur.

## 4. Routage et i18n

| Sujet | Règle |
|---|---|
| Langues | `/fr` (par défaut) et `/en` ; redirection depuis `/` selon la langue du navigateur |
| Routes | Segments en français pour les deux langues dans cette phase (`/en/produit`), sauf décision contraire ; chemins listés dans `config/nav.ts` |
| Navigation | Générée **uniquement** depuis `config/nav.ts` : ajouter une page = une ligne dans ce fichier |
| `hreflang` / `canonical` | Générés par page via `generateMetadata` |
| Pages absentes | Une entrée du menu dont la page n'est pas prête est masquée (drapeau `ready: false` dans `nav.ts`) |
| 404 | Page `not-found` sobre avec liens vers Accueil et Tarifs |

### 4.1 `config/nav.ts` (structure, brief 09)

Le brief 09 remplace l'ancienne navigation S01 : quatre entrées dans l'ordre Produit ▾, Offres ▾, Moteur décisionnel ▾, FAQ; CTA « Découvrir gratuitement » vers la page de démonstration existante. Les panneaux lisent `config/modules.ts`, `config/plans.ts` et les traductions FR/EN. `productNav` et `resourceNav` restent les sources des liens secondaires.

```ts
export const mainNav = [
  { key: 'product', href: '/produit', panel: 'product', ready: true },
  { key: 'offers', href: '/tarifs', panel: 'offers', ready: true },
  { key: 'engine', href: '/produit/moteur-decisionnel', panel: 'engine', ready: true },
  { key: 'faq', href: '/ressources/faq', ready: true },
] as const;
export const navCta = { key: 'discoverFree', href: '/produit/demonstration' } as const;
```

### 4.2 Navigation arrondie (composants)

| Composant | Détail technique |
|---|---|
| `Header` | Enveloppe serveur réservant sa hauteur; îlot interactif `HeaderBehavior` |
| `NavPill` | Pilule à 4 entrées; `useScroll`/`useMotionValueEvent`, observation des sections et indicateur `layoutId`; défilement haut/bas selon le brief 09 |
| `MegaMenu` | Panneaux Produit/Offres/Moteur chargés avec `next/dynamic`, liens config-driven; disclosure claviers et clic, ouverture hover temporisée à 120 ms |
| `MobileSheet` | Feuille plein écran en portal, accordéons, piège de focus, Esc/retour arrière, `aria-modal`, fermeture Lenis et restauration du focus |
| CTA principal | « Découvrir gratuitement » → `/produit/demonstration`; sur mobile, libellé compact dans la barre et CTA pleine largeur dans la feuille |
| `NavIndicator` | Pastille Motion `layoutId`; active route/section via IntersectionObserver; retirée avec `prefers-reduced-motion` |
| Contrôles | FR/EN (conserve le hash), thème clair/sombre; uniquement dans actions desktop ou pied de feuille mobile |

Les cibles restent ≥44 px. Le menu mobile masque `StickyMobileCta`, `WhatsAppButton` et le bouton retour haut; aucune coordonnée, aucun logo ni aucune offre n'est inventé.

## 6. Configuration centrale

### 6.1 `config/plans.ts`
Seule source des formules, prix et quotas (inchangée dans son principe). Chaque valeur porte un statut `'confirmed' | 'toValidate'`.

```ts
type Status = 'confirmed' | 'toValidate';
type Value<T> = { value: T; status: Status };

export const plans = {
  free:       { monthly: {value: 0, status:'confirmed'}, annual: {value: 0, status:'confirmed'},
                users: {value: 1, status:'confirmed'}, invoices: {value: 5, status:'confirmed'}, clients: {value: 5, status:'confirmed'},
                quotaMode: 'total' },
  starter:    { monthly: {value: 11900, status:'confirmed'}, annual: {value: 119000, status:'toValidate'},
                users: {value: 2, status:'toValidate'}, invoices: {value: 100, status:'toValidate'}, clients: {value: 100, status:'toValidate'} },
  business:   { monthly: {value: 24900, status:'toValidate'}, annual: {value: 249000, status:'toValidate'},
                users: {value: 10, status:'toValidate'}, invoices: {value: 1000, status:'toValidate'}, clients: {value: 1000, status:'toValidate'} },
  enterprise: { monthly: null, annual: null, onQuote: true },
} as const;
```

Le composant `ToValidate` affiche « À valider » tant que `status === 'toValidate'`. Les cartes d'offres, le tableau comparatif, la FAQ tarifaire et le parcours Produit lisent ce fichier.

### 6.2 `config/site.ts`
`whatsapp`, `email`, `calendly`, `domain`, `city`, `legalAddress`, `legalIdentity`, `registrationNumber`, `logoPath`, `founderPhotoPath`, `signupUrl` : chacun `null` tant que non fourni. Variables d'environnement équivalentes (`NEXT_PUBLIC_*`). Aucun bouton n'est rendu si sa valeur est `null` (jamais de lien mort).

### 6.3 `config/media.ts` (nouveau)

```ts
export type VideoAsset = {
  src: string | null;          // URL ou chemin ; null = « Vidéo à fournir »
  poster: string | null;       // image de couverture
  captionsFr: string | null;   // sous-titres .vtt
  captionsEn: string | null;
  durationLabel?: string;
};
export type ImageAsset = { src: string | null; alt: { fr: string; en: string } };

export const media = {
  homeRecap:     { src: null, poster: null, captionsFr: null, captionsEn: null } as VideoAsset,
  productDetail: { src: null, poster: null, captionsFr: null, captionsEn: null } as VideoAsset,
  pricingShort:  { src: null, poster: null, captionsFr: null, captionsEn: null } as VideoAsset,
  founder:       { src: null, poster: null, captionsFr: null, captionsEn: null } as VideoAsset,
  heroImage:     { src: null, alt: { fr: 'À COMPLÉTER', en: 'TO COMPLETE' } } as ImageAsset,
  dividers:      [] as ImageAsset[],
  audiences:     {} as Record<string, ImageAsset>, // clé = profil (7)
};
```

Tant que `src` est `null`, `MediaFrame` affiche un cadre « Vidéo à fournir » / « Image à fournir ». Le texte alternatif de chaque image est obligatoire (FR et EN).

### 6.4 `config/simulations.ts` (nouveau)
Les 3 scénarios illustratifs (Distribution et grossiste ; Services B2B ; PME du BTP) avec leurs chiffres du brief, la durée simulée, et le statut `toValidate`. Le composant `Simulations` affiche **toujours** l'étiquette « Simulation illustrative, pas un résultat client » et le badge « À valider ». Aucun bloc d'indicateurs agrégés sans cette étiquette.

### 6.5 `config/motion.ts`
Réglages du défilement et des apparitions : voir `06`. Valeurs de départ : `scroll.lerp: 0.08`, `scroll.wheelMultiplier: 0.9`, `reveal.amount: 0.35`, `reveal.once: true`, durée 0.7 s. Tout se règle à cet endroit.

## 7. Gestion de « À COMPLÉTER »

| Règle | Implémentation |
|---|---|
| Visible en préproduction | Composant `ToComplete` : pastille « À COMPLÉTER » à l'emplacement de la donnée |
| Jamais de lien mort | Si `whatsapp`, `calendly`, `email` ou `signupUrl` est `null` : bouton masqué, ou renvoi vers `/contact` pour l'inscription |
| Médias manquants | Cadre « À fournir » en préproduction ; masqué en production si le média est optionnel (vidéo Tarifs, vidéo fondateur) |
| Garde-fou avant publication | `scripts/check-placeholders.mjs` échoue au build de production s'il reste une coordonnée obligatoire à `null`, une pastille « À COMPLÉTER » ou un média obligatoire manquant ; commande : `npm run check:placeholders` |
| Badges « À valider » | Affichés tant qu'une valeur est `toValidate` ; `NEXT_PUBLIC_SHOW_VALIDATION_BADGES` (vrai par défaut) |
| Page Contact | Obligatoire : au moins **un** canal renseigné (WhatsApp, e-mail ou Calendly), sinon le garde-fou échoue |

**Obligatoires** pour la production : au moins un canal de contact, logo, pages légales complétées, domaine, identité légale. **Optionnels** : vidéo Tarifs, vidéo fondateur, guides, images de séparateurs.

## 8. Vidéos et images

| Sujet | Règle |
|---|---|
| Composant | `VideoPlayer` : `<video controls preload="none" playsInline poster>`, **lecture au clic**, jamais d'autoplay avec son |
| Chargement | La source n'est chargée qu'au clic ; image de couverture via `next/image` |
| Sous-titres | Pistes `<track kind="subtitles">` FR et EN depuis `config/media.ts` ; **À COMPLÉTER** si absentes |
| Formats | MP4 (H.264) en base, WebM en option ; vidéo courte compressée ; poids cible à fixer avec les vidéos réelles (**À COMPLÉTER**) |
| Accessibilité | Bouton de lecture avec libellé, focus visible, transcription proposée si disponible |
| Défilement | Aucune vidéo en boucle automatique ; respect de `prefers-reduced-motion` (pas de lecture automatique de toute façon) |
| Images | `next/image`, AVIF/WebP, `sizes` renseignés, `priority` uniquement pour l'image du hero, texte alternatif obligatoire |
| Dépôt | Vidéos **hors du dépôt Git** (hébergement externe) ; images optimisées dans `public/media/` |

## 9. Défilement fluide et animations

Implémentation Lenis, composant `Reveal` et règles de visibilité : **voir `06_DIRECTIVE`** (sections 5.1 à 5.6), inchangées. Points propres au multi-pages :

- `SmoothScroll` est monté **une seule fois** dans `app/[locale]/layout.tsx`, donc une seule instance Lenis pour tout le site.
- À chaque changement de page, remettre le défilement en haut (`getLenis()?.scrollTo(0, { immediate: true })`) pour éviter de conserver la position de la page précédente.
- Les ancres internes (`#...`) passent par `getLenis()?.scrollTo(cible, { offset: -hauteurHeader })`.
- Ouvrir un menu mobile ou une modale = `stop()`, fermer = `start()`.
- Les transitions entre pages restent **sobres** : pas d'animation de page complète dans cette phase.

## 10. Tokens de design

Voir `03_DESIGN_SYSTEM.md` (palette et polices VERQIA). Rappel : Instrument Serif (titres), Reenie Beanie (annotations, une par écran maximum), Inter (texte, `tabular-nums` pour les chiffres financiers) ; accent lime `#97F201`, jamais en texte sur fond crème (`#3F7A00` à la place).

## 11. Exigences non fonctionnelles

| Domaine | Exigence |
|---|---|
| Performance | Mobile d'abord ; hero < 150 Ko (cible) ; JS minimal ; vidéos chargées au clic ; **aucune animation permanente** ; Lighthouse mobile ≥ 90 (cible) |
| Accessibilité | Lien « Aller au contenu », focus visible, contrastes AA, clavier complet (menus déroulants inclus), `prefers-reduced-motion`, un seul `h1` par page |
| SEO | `generateMetadata` par page et par langue, `canonical`, `hreflang`, Open Graph, `sitemap.ts` (toutes les routes et langues), `robots.ts`, JSON-LD : `Organization` et `SoftwareApplication` (Accueil), `FAQPage` (FAQ), `Offer` (Tarifs), `BreadcrumbList` (sous-pages) |
| Sécurité | Pas de backend ni de secret ; en-têtes de sécurité (CSP adaptée aux vidéos et à l'analytics, `X-Content-Type-Options`, `Referrer-Policy`) ; liens externes avec `rel="noopener noreferrer"` |
| Vie privée | Consentement avant tout suivi non essentiel ; pages légales ; « Gérer mes cookies » dans le pied de page |
| Fiabilité | Aucune donnée fictive sans étiquette « Données fictives » ; aucune simulation sans étiquette « Simulation illustrative » |

## 12. Composants clés (rappel des comportements)

| Composant | Détail |
|---|---|
| `PlanCard` / `ComparisonTable` | Lisent `config/plans.ts` ; bascule mensuel/annuel (`role=switch`) ; économie annuelle calculée ; fonctionnalités verrouillées visibles avec cadenas et formule requise ; tableau défilable horizontalement en mobile |
| `LockedFeature` | Ligne grisée + cadenas + « Disponible avec STARTER/BUSINESS » ; jamais présentée comme active |
| `DecisionDemo` | 4 factures fictives → PROCÉDER / DIFFÉRER / SUSPENDRE / DÉROGATION + raison en langage simple ; état local ; `aria-live` ; étiqueté « Données fictives » ; mention « Business et Enterprise » |
| `EditorialQuote` | Grande citation serif, sans attribution ; 5 emplacements (PRD 7.8) |
| `Stepper` / `NumberedCard` | Pile de cartes pilotée par le défilement (Solution, Parcours Produit) ; version mobile simple ; chaque carte lisible au moins une seconde |
| `Accordion` | `<button aria-expanded aria-controls>` ; une réponse ouverte à la fois |
| `MockDashboard` | Aperçu statique, données fictives étiquetées |
| `ContactChannels` | Boutons WhatsApp / E-mail / Calendly rendus seulement si la valeur existe |
| `UpgradeModal` | Piège de focus, `Esc`, `stop()/start()` Lenis |

## 13. Qualité et tests

| Outil | Usage |
|---|---|
| `tsc --noEmit`, ESLint, Prettier | À chaque étape |
| Vitest | `plans.ts` (valeurs, statuts), `nav.ts` (≤ 5 entrées, aucune route sans page prête), `check-placeholders` |
| Playwright | Parcours : navigation entre toutes les pages, menus déroulants au clavier, bascule FR/EN, bascule clair/sombre, bascule mensuel/annuel, ouverture de la modale de mise à niveau |
| axe, Lighthouse | Accessibilité et performance par page |
| Contrôle manuel | Défilement à la molette **et** au pavé tactile ; mobile 360 px ; lecture vidéo au clic |

## 14. Pour la phase 2 (rappel)

Les formules et quotas seront **contrôlés côté serveur** par l'API, jamais seulement masqués dans l'interface. Le backend sera ajouté sans réécrire le site : routes API Next.js pour le formulaire et l'e-mail, ou serveur dédié (Node.js avec Fastify ou Express) pour l'application. Le formulaire de contact (champs listés dans le PRD 7.7) remplacera alors les boutons de canaux, avec Zod, honeypot, limitation de débit et notification par e-mail.

## 15. Plan de livraison

| Étape | Livrable | Terminé quand |
|---|---|---|
| 0 | Projet, tokens, thèmes, i18n, `config/*`, composants `ui`, `SmoothScroll`, garde-fou | Page vide FR/EN, clair/sombre, défilement fluide actif |
| 1 | Header (NavPill, menus déroulants, mobile), Footer, page Contact | Navigation complète et accessible, canaux de contact |
| 2 | Accueil : Hero, VideoShowcase, Problème, Solution, aperçu du moteur, CTA final | Page d'accueil complète |
| 3 | Produit (hub, Modules, Moteur décisionnel, Démonstration) | Démos interactives en données fictives |
| 4 | Tarifs | Offres exactes, bascule, tableau, FAQ tarifaire |
| 5 | Solutions (profils, images, simulations étiquetées) | Aucune donnée présentée comme réelle |
| 6 | Ressources (FAQ, Programme pilote), À propos | Contenu validé |
| 7 | Sécurité et confiance, pages légales | Gabarits sans clause inventée |
| 8 | SEO, accessibilité, performance, vidéos réelles, garde-fou | Critères du PRD (section 13) cochés |