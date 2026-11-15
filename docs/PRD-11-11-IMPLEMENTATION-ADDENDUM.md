# PRD 11/11 — Addendum d'implémentation

**Date :** 11/11/2026
**Périmètre :** site public VERQIA / VERQIA PILOT, branches `preview` et `feat/verqia-package-11-11`.
**Statut :** conceptuel, informatif, sans service opérationnel.

## 1. Règles qui prévalent

1. Ce document complète le package 11/11. En cas de contradiction, il prévaut sur l'ancien PRD daté du 08/11 et sur les prompts historiques.
2. `messages/fr.json` et `messages/en.json` sont la seule source de texte visible. Les deux dictionnaires restent strictement alignés.
3. `lib/launch-scope.ts` reste default-deny :
   - `publicContactEnabled = false` ;
   - `publicCommercialOfferEnabled` n'est vrai que si `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true`, en local/Preview uniquement.
4. Aucun backend, formulaire, WhatsApp, e-mail, Calendly, paiement, demande de démo/devis ou promesse de traitement n'est activé tant que des valeurs réelles et approuvées ne sont pas fournies.
5. Les tarifs ne doivent jamais être visibles ou activés automatiquement en Production.
6. Un statut `toValidate` ne devient jamais `verified` sans preuve documentaire.

## 2. Écarts corrigés par le package 11/11

### Authentification et dépendances

- Routes `/connexion`, `/inscription`, `/mot-de-passe-oublie`, `/reinitialiser-mot-de-passe` supprimées ; elles doivent répondre 404.
- Composants `components/auth`, client `lib/supabase-browser.ts`, styles `styles/auth.css` et documentation d'installation Auth supprimés.
- `@supabase/supabase-js` retiré de `package.json` et du lockfile.
- Variables Supabase retirées de `.env.example` ; clés i18n `auth`, `nav.login` et `nav.signup` retirées.
- CSS `.mobile-menu__auth` et tests/E2E d'authentification retirés ou adaptés au 404.

### À propos

- Le mot du fondateur reprend mot pour mot le texte approuvé, avec la signature `Le Fondateur de VERQIA` (FR) / `The Founder of VERQIA` (EN).
- Aucun nom, portrait, photo, biographie, parcours, diplôme, ville ou pays n'est rendu.
- Aucun cadre « photo à compléter » ni `ToComplete` public pour le fondateur.
- `founderName`, `founderPhotoPath` et `signupUrl` retirés de `config/site.ts`.
- Assets de portrait et d'équipe non rendus supprimés de `public/media/about/`.
- Partenaires, équipe, témoignages et résultats clients ne sont plus rendus. Le marquee partenaires et son CSS ont été retirés.

### Interactions et accessibilité

- `HeroRotate` : 4 bénéfices, rotation toutes les 2 800 ms, opacity + y 8 → 0, sortie y -8, durée 0,35 s, ease `[0.22, 1, 0.36, 1]`. `aria-hidden` sur le mot animé, résumé complet pour lecteur d'écran. Reduced-motion : mot statique, aucun intervalle.
- `DecisionDemo` : phase d'analyse de 900 ms, `aria-live="polite"`, clavier Arrow/Home/End, décision immédiate avec reduced-motion, badge « Données fictives ».
- `GuidedRelance` : 4 bulles fictives aux délais 0/1200/2400/3600 ms, `aria-live`, bouton Rejouer, aucun double timer, toutes les bulles visibles avec reduced-motion, aucun envoi réel.
- `Demo` : les fonctionnalités verrouillées ouvrent `UpgradeModal` (dialog accessible, focus trap, Esc, backdrop, Lenis stop/start, CTA `?source=demo-locked`).
- `Faq` : filtres `all/scope/plans/demo`, `aria-pressed`, compteur recalculé, accordéon `aria-expanded`/`aria-controls`, un seul panneau ouvert.
- `PilotProgram` : onglets `tablist`/`tab`/`tabpanel`, `aria-selected`, flèches, Home/End, panneau animé 0,3 s, aucune animation avec reduced-motion. Aucun CTA contact si aucun canal validé.
- `Solutions` : CTA interne avec `?source=solutions`. `Audiences` : 7 profils, ratio 4/3, alternative i18n quand une image existe, fallback neutre sinon.
- `Simulations` : badges « Simulation illustrative, pas un résultat client », aucun compteur animé, chiffres lus depuis la configuration, format FCFA.
- `Modules` : les 10 modules restent lus depuis `config/modules.ts`; l'étiquette « À valider » est affichée pour `status: 'toValidate'`.

### CTA et motion

- `lib/cta.ts` ajoute une source stable aux liens internes sans jamais rendre `source` comme attribut DOM.
- `Button.tsx` accepte une prop `source`.
- Sources branchées au minimum : `hero`, `header`, `header-mobile`, `final-cta`, `demo`, `demo-locked`, `pricing`, `pilot`, `solutions`.
- `config/motion.ts` centralise reveal, hero, HeroRotate, panneaux, sheet mobile, DecisionDemo, GuidedRelance, stepper Pilote et bascule prix.
- Lenis : une seule instance, `lerp: 0.055`, `wheelMultiplier: 0.82`, désactivée avec `prefers-reduced-motion`.
- Transition de page : opacité 0,82 → 1, y 4 → 0, 0,2 s ease-out, désactivée avec reduced-motion.
- Aucun marquee, tilt 3D, typewriter, autoplay sonore ni boucle non nécessaire.

## 3. Exclusions volontaires

- Aucune identité personnelle, aucun portrait et aucune biographie du fondateur.
- Aucun partenaire, aucune équipe, aucun témoignage, aucun résultat client.
- Aucun canal de contact public, aucun formulaire, aucune demande de démo ou de devis.
- Aucune authentification, aucun espace utilisateur, aucun paiement.
- Aucune donnée réelle : les démonstrations, relances et simulations restent fictives ou illustratives.
- Aucune promesse de disponibilité, de date de lancement ou de pilote opérationnel.

## 4. Statut conceptuel

VERQIA PILOT est présenté comme un périmètre envisagé en phase de validation du besoin. Les écrans, modules, scénarios et messages sont conceptuels. Aucune fonctionnalité n'est présentée comme opérationnelle.

## 5. Blocage Production

La Production reste bloquée tant que les éléments suivants ne sont pas fournis ou approuvés :

- identité légale complète et coordonnées de contact réelles ;
- revue juridique datée ;
- décision explicite sur l'ouverture des contacts publics et de l'offre commerciale ;
- médias obligatoires et sous-titres ;
- preuve documentaire pour tout statut `toValidate`.

`npm run check:production` et `npm run build` avec `VERQIA_BUILD_TARGET=production` doivent rester bloquants tant que ces éléments manquent.

## 6. Traçabilité

L'évidence d'implémentation, les commandes exécutées, les résultats et les limites sont consignés dans `docs/launch-readiness/PACKAGE-11-11-IMPLEMENTATION-EVIDENCE.md`.
