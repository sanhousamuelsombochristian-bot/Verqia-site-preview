# 03 — Design system : référence observée + palette VERQIA finale

> **Rôle** : tout le visuel (couleurs, polices, formes, composants, mouvement, médias). Partie A = ce qui a été observé sur la référence ; partie B = ce qui est retenu pour VERQIA.
> **Version** : 08/11/2026, révisée pour un **site de 7 pages** (et non plus une page unique).
> **Source de la référence** : 3 captures d'écran + 1 vidéo de défilement (58 s) + résultats de la console du navigateur. Couleurs **mesurées** (au pixel et par la console) ; polices **confirmées par la console** ; rayons, durées et courbes **estimés**.
> Légende : **[MESURÉ]** · **[CONFIRMÉ]** (console) · **[VU]** (visible à l'image) · **[ESTIMÉ]** · **[À CONFIRMER]**

---

# PARTIE A — Référence observée (webcrew.agency)

## 1. Palette [MESURÉ]

| Rôle | Valeur | Où |
|---|---|---|
| Fond sombre principal | `#07120E` (= `theme-color`) ; couleur la plus fréquente de la page : `#101A16` (rgb 16, 26, 22) | Hero, Réalisations, Méthode |
| Fond sombre profond | `#0A1411` | Pied de page, carte du CTA final |
| Vert sombre de texture | `#0C240C` → `#0C3C24` → `#0C5424` | Dégradé marbré du hero |
| Vert moyen du hero | `#0E2116` | Zone centrale du hero |
| **Vert menthe (accent sur fond sombre)** | `#8FF2AA` ; mesure console : `#A2F4B8` | Bouton principal, puces, liens |
| **Vert d'accent sur fond clair** | `#1F9A4E` [CONFIRMÉ] | Mot en italique des titres, soulignés, chiffres d'étapes |
| **Crème (fond clair)** | `#F6F4EE` [CONFIRMÉ] / `#F7F5EF` | Secteurs, étapes, FAQ, témoignages |
| Papier / blanc cassé | `#FFFEFA` [CONFIRMÉ] | Cartes claires |
| Texte sur fond clair | `#101A16` | Titres |
| Pastille / bouton sombre sur fond clair | `#242E29` | Bouton « Parlons de votre projet » |
| Blanc | `#FCFCFC` | Cartes de témoignage, bouton blanc rond |
| Filets | gris-vert très clair (~`#E4E4DC`) [ESTIMÉ] | Séparations, accordéon |

**Principe** : deux univers alternés : **sombre vert-noir + menthe** et **crème + vert forêt**. L'accent change de teinte selon le fond pour rester lisible.

## 2. Typographie [CONFIRMÉ par la console]

| Usage | Police réelle de la référence | Remarque |
|---|---|---|
| Titres (display) | **Instrument Serif** (400, + italique pour le mot d'accent) | Interlettrage serré |
| Annotations manuscrites | **Nothing You Could Do** (400, cursive) | Étiquettes de section, signature |
| Texte courant / boutons | **Instrument Sans** (400, 500, 600, 700) | Certaines graisses chargées à la demande |

**Échelle mesurée (fenêtre de la capture)** : h1 46 px / interligne 43,7 px / −0,92 px d'interlettrage · h2 32 px / 34,56 px / −0,48 px · h3 26 px / 28,6 px · paragraphe 15 px / 23,25 px. Tous en graisse 400. Les titres de la référence sont donc **fins et serrés** : à retenir pour l'élégance.

**Gestes typographiques récurrents** [VU]
- Dernier mot ou dernière ligne du titre en **italique + couleur d'accent**, souvent avec un **trait manuscrit en dessous**.
- Un mot **barré par un trait vert** puis remplacé par la bonne idée en italique vert.
- Étiquette de section : **point vert + texte manuscrit + soulignement tracé à la main**.
- Interlignage de titre serré (≈ 0,95–1,05).

## 3. Mise en page et composants [VU]

**Header (brief 09)** : marque à gauche (logo seulement si fourni et confirmé), pilule flottante centrée avec 4 entrées, pastille active glissante, CTA lime « Découvrir gratuitement » à droite, contrôles FR/EN et thème. Après 80 px, la marque se compacte; en défilement descendant l'en-tête se masque et réapparaît en remontant, sauf focus/menu/ancre. Mobile : CTA compact + feuille plein écran accessible.

**Hero** : fond marbré vert (image ou shader) ; étiquette manuscrite + titre 3 lignes (dernière en italique menthe soulignée) ; avatars + compteur ; bouton menthe pilule + rond sombre ; ordinateur + téléphone avec pastilles en verre ; arrondi crème en bas à gauche.

**Réalisations** (sombre) : maquette dans une fenêtre de navigateur (3 points, pastille d'URL) ; liste 01/02/03 à droite.

**Secteurs** (crème) : un grand conteneur arrondi à bordure fine, découpé en colonnes par des filets ; cellule = icône ligne dans un cercle, titre serif, phrase, lien vert avec flèche.

**Cartes empilées** (« On comprend votre métier », Méthode) : liste verticale 01…05 avec barre verte sur l'étape active ; cartes qui se recouvrent au défilement, numéro serif italique très grand, index « 03 / 05 », ombre douce.

**Conviction** : très grand titre avec mot barré en vert ; carte papier inclinée avec guillemet vert.

**Témoignages** : maçonnerie 3 colonnes de cartes blanches ; phrase clé surlignée au marqueur.

**Fondateur** : photos façon polaroïds inclinées, flèche tracée, signature manuscrite.

**Présence géographique** : timbres-poste dentelés par ville, cachet postal.

**FAQ** : titre à gauche ; accordéon numéroté à droite avec « + ».

**CTA final** : titre à gauche ; carte sombre en verre dépoli à droite.

**Pied de page** : fond `#0A1411`, titres de colonnes en manuscrit vert.

## 4. Inventaire des animations de la référence [VU / DÉDUIT]

Header qui se réduit · cartes empilées (sticky stack) · barre de progression d'étape · marquees à deux pistes · surlignage marqueur · soulignements SVG tracés · carte papier et polaroïds inclinés · carrousel de timbres · accordéon · verre dépoli (`backdrop-filter`) · hero marbré texturé · compteur odomètre · horloges mondiales.

---

# PARTIE B — Design system VERQIA retenu

## 5. Principes (issus de ton brief)

FinTech premium, **éditorial tech minimaliste** : professionnel, sobre, contemporain, élégant. Le design doit rassurer un dirigeant ou un directeur financier. Le site se lit comme celui d'un grand éditeur de produit (type OpenAI, Anthropic) : navigation légère, pages claires, beaucoup d'air.
**À éviter** : interfaces chargées, dégradés excessifs, boucles nombreuses ou voyantes, effets lumineux gratuits. Budget révisé (brief 08, 09/11/2026) : une seule animation ambiante discrète par écran visible; pause onglet masqué et arrêt avec `prefers-reduced-motion`.

## 6. Ce qu'on reprend de WebCrew, ce qu'on adapte, ce qu'on écarte

| Élément WebCrew | Décision | Raison |
|---|---|---|
| Alternance sombre / crème | **Reprendre** | Rythme de lecture |
| Serif à italique d'accent + soulignement tracé | **Reprendre** | Identité éditoriale premium |
| Annotations manuscrites | **Reprendre avec parcimonie** (étiquettes de section, signature, 1 annotation par écran maximum) | Discrétion |
| Boutons pilule + rond flèche | **Reprendre** | Signature d'interface |
| Pilule de navigation centrale | **Reprendre** selon le brief 09 : Produit ▾ · Offres ▾ · Moteur décisionnel ▾ · FAQ | Quatre entrées; CTA principal séparé « Découvrir gratuitement » |
| Méga-menu 4 colonnes | **Écarter** : remplacé par un petit panneau déroulant (2 à 3 liens) | Sobriété |
| Cartes empilées au défilement | **Reprendre** (Solution, Parcours Produit) | Pédagogie progressive |
| Surlignage marqueur | **Reprendre** (mot-clé des citations et des FAQ) | Éditorial |
| Mot barré en vert | **Reprendre une fois** (moteur décisionnel) | Effet marquant sans excès |
| Marquees, compteur odomètre, horloges | **Écarter** | Bruit visuel; aucun chiffre ou horaire réel à animer |
| Pastille ambiante | **Une seule boucle discrète par écran visible** (± 6 px, ≥ 6 s), stoppée si onglet masqué ou réduction des mouvements | Marquer l'identité sans gêner la lecture |
| Hero marbré animé | **Remplacer** par fond onyx statique + grain très léger | Pas de dégradé excessif ni d'effet lumineux |
| Timbres-poste par ville | **Écarter** | Ville et domaine À COMPLÉTER |
| Logos clients, avis, compteurs | **Écarter** | Aucune preuve validée |
| Carte de verre dépoli du CTA final | **Reprendre** (léger) | Mise en avant du CTA |
| Fenêtre de navigateur pour les maquettes | **Reprendre** (Démonstration), URL générique sans domaine inventé | Cadre produit crédible |

## 7. Palette finale

| Rôle | Sombre | Clair (crème) |
|---|---|---|
| Fond | `#1C1C1C` (Onyx) | `#F6F4EE` |
| Fond profond (footer, carte CTA) | `#121212` | `#ECE9E0` |
| Surface | `#262626` (Graphite) | `#FFFFFF` |
| Texte | `#F5F5F5` | `#1C1C1C` |
| Texte atténué | `#A3A3A3` | `#5F5F5F` |
| Filets | `#3A3A3A` | `#E2E2DC` |
| **Accent (fonds, boutons, puces)** | **Lime `#97F201`** | **Lime `#97F201`** |
| Texte sur accent | `#1C1C1C` | `#1C1C1C` |
| **Accent en texte** | Lime `#97F201` | **Lime foncé `#3F7A00`** |
| Anneau de focus | Lime `#97F201` | `#3F7A00` |
| Badge « À valider » | fond `#3A3000`, texte `#FFD54A` | fond `#FFF3C4`, texte `#7A5B00` |
| Badge « À COMPLÉTER » | fond `#3A1F00`, texte `#FFB066` | fond `#FFE6CC`, texte `#8A4500` |
| Badge « Simulation illustrative » | fond `#262626`, texte `#A3A3A3`, bordure pointillée `#6B6B6B` | fond `#F0EEE6`, texte `#5F5F5F`, bordure pointillée `#8A8A8A` |
| Verrouillé (fonction non incluse) | gris `#6B6B6B` + cadenas | gris `#8A8A8A` + cadenas |

Le badge orange « À COMPLÉTER » n'est visible **qu'hors production** ; le jaune « À valider » reste tant que la valeur n'est pas confirmée. Le lime pur n'est **jamais** une couleur de texte sur fond clair.

### Tokens (`styles/tokens.css`)

```css
:root[data-theme="dark"] {
  --bg:#1C1C1C; --bg-deep:#121212; --surface:#262626; --text:#F5F5F5; --muted:#A3A3A3;
  --border:#3A3A3A; --accent:#97F201; --accent-text:#97F201; --on-accent:#1C1C1C; --focus:#97F201;
}
:root[data-theme="light"] {
  --bg:#F6F4EE; --bg-deep:#ECE9E0; --surface:#FFFFFF; --text:#1C1C1C; --muted:#5F5F5F;
  --border:#E2E2DC; --accent:#97F201; --accent-text:#3F7A00; --on-accent:#1C1C1C; --focus:#3F7A00;
}
```

## 8. Typographie finale

| Usage | Police |
|---|---|
| Titres | **Instrument Serif** (régulier + italique), graisse 400 |
| Annotations | **Reenie Beanie** |
| Texte courant et interface | **Inter** |
| Chiffres financiers (prix, quotas, tableaux) | **Inter avec `font-variant-numeric: tabular-nums`** |

Choix assumé : on garde Inter (et non Instrument Sans, utilisée par la référence) pour se distinguer et pour la lisibilité des chiffres. Instrument Sans reste une alternative si tu veux te rapprocher de la référence.

Échelle : H1 `clamp(2.5rem, 6vw, 5rem)` · H2 `clamp(2rem, 4vw, 3.25rem)` · H3 1,5 rem · corps 1 rem / 1,6. Interlignage des titres ≈ 1,0 ; interlettrage des grands titres légèrement négatif (≈ −0,02 em), comme la référence.

## 9. Forme et mouvement

| Élément | Valeur |
|---|---|
| Rayons | cartes 24 px · champs 12 px · boutons et pilule de navigation 999 px |
| Largeur de contenu | 1 200 px ; texte de lecture 720 px |
| Espacement de section | `clamp(4rem, 9vw, 8rem)` |
| Survol | 200–300 ms, `ease-out` |
| Apparition au défilement | 600–700 ms, une seule fois, à 35 % de visibilité, désactivée si `prefers-reduced-motion` |
| Transitions entre pages | Fondu transform/opacity ≤ 200 ms; désactivé si `prefers-reduced-motion` |
| Boucles ambiantes | Au plus une par écran visible; discrète (± 6 px, ≥ 6 s), pause si onglet masqué; arrêt si réduction des mouvements |
| Interdits | scroll-jacking, animations de layout (`width`/`height`/`top`/`left`), lueurs et dégradés multicolores |

### Défilement fluide (Premium Smooth Scrolling)

Défilement Lenis réglable par `NEXT_PUBLIC_SCROLL_PRESET` : `subtle` (`lerp .10`, molette 1.0), `marked` par défaut (`lerp .07`, molette .85), `slow` (`lerp .05`, molette .75). La molette conserve sa commande native; Lenis n'intercepte que son inertie. Défilement tactile natif, ancres accessibles, aucun arrêt forcé sur une section. Arrêt de Lenis sous `prefers-reduced-motion`. Code et règles détaillées : brief 08 et directive `06` alignée.

## 10. Navigation arrondie — brief 09 (prioritaire sur S01 de 04)

- **Ordinateur ≥ 1024 px** : pilule flottante centrée (52–56 px), 70 % surface translucide + flou 16 px avec fond opaque de repli; bordure token translucide; logo/slot à gauche; CTA lime « Découvrir gratuitement » avec rond onyx et flèche à droite; contrôles FR/EN et thème.
- **Entrées dans l'ordre** : Produit ▾ (10 modules depuis `config/modules.ts`), Offres ▾ (quatre plans et prix depuis `config/plans.ts`, avec `À valider`), Moteur décisionnel ▾ (quatre décisions; accès Business et Enterprise), FAQ (lien direct). Menus au clic/clavier et au survol avec temporisation d'environ 120 ms; un seul ouvert; fermeture Esc/clic extérieur/sortie; panneaux dynamiques et accessibles.
- **Défilement** : après 80 px, marque/pilule compactes; vers le bas de >12 px, masquer; en remontant, afficher. Rester visible avec menu ouvert, focus ou ancre en cours. Indicateur Motion `layoutId` synchronisé avec les sections visibles (IntersectionObserver). Liens ancrés avec Lenis, offset de l'en-tête, durée 1,2 s.
- **Mobile/tablette <1024 px** : marque à gauche, CTA compact, menu à droite; feuille plein écran, liens Instrument Serif en cascade ≤60 ms; Produit/Offres/Moteur en accordéon; CTA pleine largeur, langue et thème en bas; focus trap, `aria-modal`, Esc, retour arrière, fermeture sur navigation; page immobilisée via Lenis et composants flottants masqués.
- **Accessibilité et performance** : `aria-expanded`, `aria-controls`, `aria-current="location"`, `:focus-visible`, zones tactiles ≥44 px, section conservée au changement de langue; `prefers-reduced-motion` retire glissement/masquage; transitions transform/opacity ≤250 ms; pas de `will-change` permanent; `useScroll`/`useMotionValueEvent`, méga-menu chargé avec `next/dynamic`.

Le détail faisant autorité est `uploads/09_BRIEF_BARRE_NAVIGATION.md`; ne pas inventer de logo, d'offre ni de coordonnée.

## 11. Modèles de pages

### 11.1 En-tête de page intérieure
Étiquette de section (point accent + texte manuscrit + soulignement tracé) · H1 avec dernier mot en italique accent · sous-titre en Inter, 720 px max · fil d'Ariane discret (alimente `BreadcrumbList`) · fond sombre ou crème selon le tableau ci-dessous.

### 11.2 Rythme sombre / crème par page

| Page | Enchaînement des fonds |
|---|---|
| Accueil | Hero sombre → vidéo sombre → Problème crème → Solution crème (cartes empilées) → Aperçu du moteur sombre → CTA final crème + carte sombre |
| Produit (hub) | En-tête sombre + vidéo → Parcours sombre (cartes empilées) → liens vers sous-pages crème |
| Modules | En-tête crème → grille 5 × 2 crème |
| Moteur décisionnel | En-tête sombre → démo sombre → citation crème |
| Démonstration | En-tête sombre → aperçu en fenêtre de navigateur sombre |
| Solutions | En-tête crème → grand conteneur arrondi crème (7 profils) → Simulations sombre |
| Tarifs | En-tête crème → cartes et tableau crème → FAQ tarifaire crème → vidéo sombre |
| Ressources / FAQ / Pilote | Crème, accordéon à droite |
| À propos | En-tête crème → fondateur crème (polaroïd) → couverture géographique crème |
| Contact | En-tête sombre → carte de canaux crème |
| Pied de page | Toujours `--bg-deep` sombre |

Règle : jamais plus de deux sections de même fond d'affilée sans séparateur (filet, image ou citation éditoriale).

## 12. Vidéos et images

### Lecteur vidéo (`VideoPlayer`)
- Cadre : rayon 24 px, bordure fine, ombre douce, ratio 16/9, image de couverture visible avant lecture.
- Bouton de lecture central : pilule accent + rond sombre avec ▶, libellé accessible « Lire la vidéo ».
- Étiquette de durée en bas à gauche (si connue) ; bouton sous-titres FR/EN quand les pistes existent.
- **Lecture au clic uniquement**, sans lecture automatique avec son, pas de boucle ; la source se charge au clic (`preload="none"`).
- En préproduction, sans fichier : cadre pointillé « Vidéo à fournir » + badge orange « À COMPLÉTER ».

### Images
- Rayon 24 px (ou plein bord pour un séparateur), bordure fine optionnelle, pas de filtre lourd ni de dégradé superposé.
- Séparateurs entre sections : image grand format, hauteur `clamp(240px, 40vw, 480px)`, `object-fit: cover`, texte alternatif FR/EN obligatoire.
- Solutions : une image par profil dans sa cellule, même ratio (4/3) pour les 7.
- Annotation manuscrite autorisée sur une image (une seule par écran), jamais sur un visage ou un texte.
- En préproduction, sans fichier : cadre pointillé « Image à fournir ».

## 13. Composants propres au site multi-pages

| Composant | Spécification visuelle |
|---|---|
| `PlanCard` | Carte 24 px ; BUSINESS mise en avant (bordure accent, étiquette « Offre principale ») ; prix en `tabular-nums` ; badge « À valider » à côté de la valeur concernée |
| `ComparisonTable` | Filets fins, colonne BUSINESS légèrement teintée, lignes verrouillées grisées avec cadenas ; défilement horizontal en mobile |
| `LockedFeature` | Ligne grisée + cadenas + « Disponible avec STARTER/BUSINESS » |
| `Simulations` | 3 cartes sombres, badge « Simulation illustrative, pas un résultat client » en haut de **chaque** carte, durée simulée visible, badge « À valider » ; aucun indicateur agrégé hors de ce cadre |
| `ContactChannels` | Trois grands boutons pilule (WhatsApp, E-mail, Calendly) ; un bouton absent n'est pas rendu ; si aucun n'existe, pastille « À COMPLÉTER » en préproduction |
| `PilotProgram` | Étapes numérotées 01–03 en serif italique accent, mention « Offre pilote à confirmer » toujours visible |
| `Footer` | Titres de colonnes en manuscrit accent ; ligne « Sécurité et confiance » avec les liens légaux ; mention « VERQIA n'est pas une banque… » |
| Page Sécurité | Mise en page de lecture (720 px), chaque point non confirmé avec pastille « À COMPLÉTER » |
| Page 404 | Grand « 404 » serif italique accent, une phrase, boutons vers Accueil et Tarifs |

## 14. Accessibilité visuelle

Contraste AA dans les deux thèmes (vérifier le lime sur onyx et `#3F7A00` sur crème) · focus toujours visible · cibles tactiles ≥ 44 px · jamais d'information portée par la seule couleur (les verrous ont une icône et un texte) · `prefers-reduced-motion` coupe défilement fluide et apparitions · texte alternatif FR/EN pour chaque image.

## 15. Logo

Emplacement réservé (aucun logo définitif créé). Dès réception du logo V officiel : version lime sur fond sombre, version onyx sur fond crème, icône ronde pour l'en-tête réduit et le favicon.

> ⚠️ Inspiration ≠ copie : on reprend les principes, pas les textes, photos, illustrations ni maquettes de WebCrew.