# VERQIA — audit ciblé des bibliothèques visuelles

_Date de revue : 8 novembre 2026._

## Décision d’intégration

Le projet dispose déjà de **Motion**, **Lenis**, **Tailwind CSS**, **Lucide** et Next.js App Router. Pour l’enrichissement institutionnel, aucune nouvelle dépendance n’a été ajoutée : les effets de révélation réutilisent Motion, le carrousel d’équipe repose sur le défilement horizontal natif, et le bandeau de partenaires utilise une animation CSS désactivée sous `prefers-reduced-motion`.

Ce choix évite de dupliquer Motion, réduit le JavaScript initial et garde les carrousels utilisables au clavier et par glissement tactile.

## Ressources examinées

| Ressource | Licence / mode d’usage vérifié | Pertinence VERQIA | Décision actuelle |
| --- | --- | --- | --- |
| [Magic UI](https://github.com/magicuidesign/magicui) | MIT, composants à copier/adopter | Marquee ou révélations sobres | **Veille** : Tailwind et Next compatibles, mais Motion existant couvre le besoin présent. |
| [React Bits](https://github.com/DavidHDev/react-bits) | MIT + Commons Clause, selon le dépôt | Micro-interactions et fonds | **Non intégré** : conditions moins simples qu’une licence MIT pure et effets potentiellement trop expressifs pour le système actuel. |
| [Aceternity UI](https://ui.aceternity.com/licence) | Composants source à copier ; conditions spécifiques et interdiction de redistribution comme bibliothèque concurrente | Compositions marketing | **Non intégré** : vérifier composant par composant au moment d’un besoin précis ; aucun composant n’était nécessaire à cette évolution. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | MIT, composants à copier | Révélations et transitions | **Non intégré** : le projet utilise déjà Motion (`LazyMotion`, `domAnimation`, `m`). |
| [Embla Carousel](https://www.embla-carousel.com/) | MIT, carrousel léger | Carrousels avec inertie et swipe | **Non intégré** : le scroll-snap natif suffit au carrousel d’équipe actuel. Embla reste l’option à privilégier si pagination, boucle interactive ou drag avancé deviennent nécessaires. |
| [Rive React](https://rive.app/docs/runtimes/getting-started) | Runtime MIT | Illustration interactive vectorielle | **Non intégré** : aucun fichier `.riv` validé n’a été fourni. Ne pas ajouter le runtime avant l’existence d’une animation et de ses droits d’utilisation. |

## Composants ajoutés sans nouvelle dépendance

- `components/sections/about/TeamCarousel.tsx` : carrousel d’équipe accessible au clavier (flèches et boutons), scroll-snap tactile, mouvement respectueux de `prefers-reduced-motion`.
- `components/sections/about/Founder.tsx` : sections institutionnelles, mots du fondateur, vision, mission, valeurs, bandeau de partenaires clairement fictif et zone transparente pour les témoignages à valider.
- `config/about.ts` : référentiel unique des cartes d’équipe, valeurs et identités graphiques de démonstration.
- `styles/about-institutional.css` : styles limités aux nouvelles sections, transitions de transform/opacity uniquement pour les interactions.

## Critères pour une future intégration

1. Le composant doit couvrir un besoin non satisfait par Motion/CSS/HTML existants.
2. Licence et conditions de redistribution validées par l’équipe responsable.
3. Pas de bibliothèque installée pour un seul effet copiable et léger.
4. Animation désactivable via `prefers-reduced-motion`, utilisable sans pointeur précis et sans présentation trompeuse de fonctionnalités produit.
5. Actif média, portrait, logo ou animation validé avant publication.
