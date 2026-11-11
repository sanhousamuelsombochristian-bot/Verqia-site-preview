# 01 — PRD : site VERQIA (multi-pages)

> **Rôle** : définir CE QUE contient et fait le site. La technique est dans `02_TRD`, le visuel dans `03_DESIGN_SYSTEM`, les prompts dans `04_PROMPTS_MASTER`, la méthode de l'agent dans `06_DIRECTIVE` (CLAUDE.md).
> **Version** : 08/11/2026, révisée. Le projet passe d'une landing d'une seule page à un **site vitrine de 7 pages**, sans backend dans cette phase.
> **Règle** : rien n'est inventé. Tout ce qui manque est marqué **À COMPLÉTER** ou **À VALIDER**.

---

## 1. Positionnement

| Élément | Valeur |
|---|---|
| Marque | **VERQIA** (produit : VERQIA PILOT) |
| Catégorie | Plateforme SaaS de pilotage financier, de suivi des créances et de gestion intelligente des encaissements |
| Promesse | **Voyez vos créances. Sachez quoi traiter ensuite.** |
| Signature | La maîtrise financière. L'intelligence décisionnelle. Le contrôle opérationnel. |
| Ambiance | FinTech premium, éditorial, sobre, élégant (inspiré de WebCrew : serif + annotations manuscrites) |
| Modèle de site | Grands sites de produit (type OpenAI, Anthropic) : barre de navigation arrondie, pages distinctes composées de sections |
| Cible | Transversale, tous secteurs : TPE, PME, startups, cabinets, commerces, supermarchés, grossistes, entreprises B2B, grandes organisations. Segmentation par **volume, besoins et complexité**, pas par secteur |
| Marché | Côte d'Ivoire, Afrique francophone, international B2B |
| Devise | FCFA (XOF) |
| Langues | FR (principale) + EN |
| Ce que VERQIA n'est pas | Un simple logiciel de facturation, un logiciel comptable, une banque |

**Objectif du site** : faire découvrir VERQIA, faire comprendre sa valeur, puis amener le visiteur à **créer un compte FREE**, choisir **STARTER ou BUSINESS**, ou **demander un pilote, une démonstration ou un devis ENTERPRISE**.

Parcours commercial : **Visiteur → FREE → STARTER → BUSINESS → ENTERPRISE**.

## 2. Périmètre de cette phase

| Inclus | Exclu (phase 2 : application) |
|---|---|
| Navigation, pages, sections, animations, défilement fluide | Backend, API, base de données |
| Vidéos et images (emplacements prêts) | Formulaire avec envoi de données |
| Liens vers WhatsApp, e-mail, Calendly (quand fournis) | Création de compte, connexion, paiement |
| Bascule FR/EN et clair/sombre | Tableaux de bord réels, organisations |
| Démos interactives en **données fictives** | Statistiques d'usage réelles |

**Comportement des boutons d'inscription** : « Créer mon compte gratuitement », « Choisir Starter », « Passer à Business » pointent vers `NEXT_PUBLIC_SIGNUP_URL` s'il existe, sinon vers la page **Contact**. Aucun lien mort.

## 3. Les quatre formules

| | **FREE** | **STARTER** | **BUSINESS** | **ENTERPRISE** |
|---|---|---|---|---|
| Rôle | Acquisition | Offre d'entrée payante | Offre principale | Haut de gamme |
| Prix mensuel | 0 FCFA | **11 900 FCFA** | 24 900 FCFA ⚑ | Sur devis |
| Prix annuel | Gratuit | 119 000 FCFA ⚑ | 249 000 FCFA ⚑ | Sur devis |
| Utilisateurs | 1 | 2 ⚑ | 10 ⚑ | Personnalisé |
| Factures | 5 au total | 100 / mois ⚑ | 1 000 / mois ⚑ | Personnalisé |
| Clients | 5 au total | 100 ⚑ | 1 000 ⚑ | Personnalisé |
| Tableau de bord | Démonstration | Essentiel | Avancé | Personnalisé |
| Gestion opérationnelle des factures | Non | Oui | Oui | Oui |
| Suivi des paiements | Non | Essentiel | Avancé | Avancé |
| Recouvrement | Non | Basique (manuel) | Intelligent | Personnalisé |
| Prévisions | Non | Non | Oui | Avancées |
| Analyse du risque client | Non | Non | Oui | Avancée |
| **Moteur décisionnel** | Non | Non | **Oui** | **Oui** |
| Automatisations | Non | Limitées | Avancées | Sur mesure |
| Multisite / multi-entités | Non | Non | Option | Oui |
| Accompagnement | — | — | — | Prioritaire |

⚑ = **proposition de travail, à valider** (badge « À valider » tant que non confirmée). **Retenus définitivement : FREE à 0 FCFA, 5 factures et 5 clients, STARTER à 11 900 FCFA/mois, ENTERPRISE sur devis.**

**Politique annuelle (proposition)** : deux mois offerts. Starter 119 000 FCFA au lieu de 142 800 ; Business 249 000 FCFA au lieu de 298 800.

**FREE n'est pas une version miniature de VERQIA** : c'est une porte d'entrée. Ni suivi réel des échéances, ni paiements, ni recouvrement, ni analyse du risque, ni prévisions, ni moteur décisionnel, ni automatisations, ni rapports avancés. Ne jamais la présenter comme un outil de gestion opérationnelle.

### Points encore ouverts (valeurs par défaut appliquées)

| Point | Choix par défaut | Alternatives |
|---|---|---|
| Prix Business | 24 900 FCFA/mois (badge « À valider ») | 19 900 ou 29 900 |
| Quota gratuit | 5 factures et 5 clients **au total**, sans renouvellement | 5 par mois |
| Suggestions de mise à niveau | Bandeaux dans les modules verrouillés + fenêtre douce au clic | Comparaison des offres dans les modules verrouillés |

Tout vit dans `config/plans.ts` : les changer ne demande aucune modification de composant.

## 4. Moteur décisionnel

Quatre décisions, chacune **explicable et traçable** :

| Décision | Sens |
|---|---|
| **PROCÉDER** | Autoriser ou poursuivre une opération |
| **DIFFÉRER** | Reporter une opération |
| **SUSPENDRE** | Interrompre temporairement une opération |
| **DÉROGATION** | Appliquer une autorisation exceptionnelle encadrée |

Accès complet : **Business et Enterprise uniquement**.

## 5. Modules

Vue d'ensemble · Trésorerie · Factures · Clients · Recouvrement · Risque · Prévisions · Paiements · Automatisations · Événements.

Disponibilité affichée (⚑ = à confirmer) : Vue d'ensemble (FREE : démo) · Trésorerie (Starter) · Factures (Starter) · Clients (FREE limité, Starter) · Recouvrement (Starter basique, Business intelligent) · Risque (Business) · Prévisions (Business) · Paiements (Starter) · Automatisations (Starter limitées, Business avancées) · Événements (Business ⚑).

## 6. Architecture du site : 7 pages

### 6.1 Barre de navigation (forme arrondie, légère)

| Élément | Détail |
|---|---|
| Entrées principales (5) | **Produit ▾ · Solutions · Tarifs · Ressources ▾ · À propos** |
| Menu déroulant « Produit » | Modules · Moteur décisionnel · Démonstration |
| Menu déroulant « Ressources » | FAQ · Programme pilote · Guides (**À COMPLÉTER**, masqué tant que vide) |
| Bouton à droite | **Demander un pilote** (pilule + rond flèche), toujours visible, mène à Contact |
| Contrôles | Sélecteur FR/EN · bascule clair/sombre |
| Logo | Emplacement réservé (« Logo à fournir ») ; au défilement, se réduit en icône ronde |
| Mobile | Menu plein écran ouvert d'un geste, sous-menus en accordéon, fermeture `Esc` |
| Règle | La barre ne dépasse jamais 5 entrées + 1 bouton ; toute nouvelle page va dans un sous-menu ou le pied de page |

### 6.2 Plan des pages

| Page | Route | Contenu |
|---|---|---|
| **Accueil** | `/` | Hero · vidéo récapitulative · Problème · Solution · aperçu du moteur · citation · appel à l'action final |
| **Produit** | `/produit` (hub) | Vidéo détaillée · parcours FREE → ENTERPRISE · liens vers les 3 sous-pages |
| ↳ Modules | `/produit/modules` | Les 10 modules avec formule d'accès |
| ↳ Moteur décisionnel | `/produit/moteur-decisionnel` | 4 décisions · démo en données fictives |
| ↳ Démonstration | `/produit/demonstration` | Découvrir VERQIA gratuitement · aperçu · fenêtre de mise à niveau |
| **Solutions** | `/solutions` | 7 profils d'entreprise · simulations illustratives |
| **Tarifs** | `/tarifs` | 4 formules · bascule mensuel/annuel · tableau comparatif · FAQ tarifaire · vidéo courte |
| **Ressources** | `/ressources` (hub) | Liens vers FAQ, Programme pilote, Guides |
| ↳ FAQ | `/ressources/faq` | 7 questions |
| ↳ Programme pilote | `/ressources/pilote` | Offre pilote à confirmer, comment ça se passe |
| **À propos** | `/a-propos` | Mot du fondateur · vision · couverture géographique (À COMPLÉTER) |
| **Contact** | `/contact` | Demander un pilote, une démonstration ou un devis (liens, pas de formulaire) |

Toutes les routes existent en `/fr/...` et `/en/...`.

### 6.3 Pied de page (commun à toutes les pages)

Logo (emplacement réservé) · signature · colonnes **Produit / Offres / Entreprise / Légal** · **Sécurité et confiance** (`/securite`, gabarit à compléter) · Mentions légales · Politique de confidentialité · CGU · CGV · Politique de cookies · Gérer mes cookies · coordonnées (affichées seulement si renseignées) · mention « VERQIA n'est pas une banque ou un établissement financier. »

### 6.4 Page Sécurité et confiance (pied de page uniquement)

Gabarit : protection des données, hébergement, accès et rôles dans une organisation, journalisation des décisions. **Aucune certification, norme ou engagement non fourni** : chaque point non confirmé porte la pastille **À COMPLÉTER**.

## 7. Contenu des pages

### 7.1 Accueil

| # | Section | Contenu (définitif sauf mention) |
|---|---|---|
| A1 | **Hero** | Surtitre **PILOTAGE FINANCIER INTELLIGENT** · H1 **Voyez vos créances. Sachez quoi traiter ensuite.** · sous-titre · CTA « Découvrir gratuitement VERQIA » + « Explorer la démonstration » · microtexte · aperçu d'interface en **données fictives étiquetées** |
| A2 | **Vidéo récapitulative** | Juste sous le hero : vidéo de présentation de VERQIA PILOT (voir section 8) |
| A3 | Problème | « Vos informations financières ne devraient pas être dispersées. » · 3 cartes · citation 1 |
| A4 | Solution | « Une vision plus claire. Des décisions mieux structurées. » · Centraliser, Comprendre, Anticiper, Décider |
| A5 | Aperçu du moteur | Accroche courte + lien vers `/produit/moteur-decisionnel` · mention « Business et Enterprise » |
| A6 | CTA final | « Prêt à voir où en sont vos créances ? » · boutons : « Demander un pilote » (vers Contact) et « Découvrir gratuitement » · mention « Offre pilote gratuite de 30 jours : à confirmer. » |

**Sous-titre du hero** : « VERQIA centralise vos factures, vos échéances et vos informations clients pour vous donner une meilleure visibilité sur vos encaissements, identifier les situations à risque et organiser vos décisions financières. »

**Microtexte du hero** : « Commencez gratuitement avec 5 factures et 5 clients. Passez à une formule supérieure lorsque vos besoins évoluent. »

**Texte du problème** : « Entre les factures, les échéances, les paiements, les relances et les informations clients, les entreprises doivent souvent jongler avec plusieurs fichiers et outils. Cette dispersion rend difficile l'identification des priorités et la compréhension de ce qui doit être traité en premier. VERQIA rassemble ces informations dans un environnement structuré. »

**Cartes du problème** : 01 Manque de visibilité sur les créances · 02 Difficulté à prioriser les relances · 03 Manque d'anticipation des encaissements.

**Bénéfices** : 1. *Centraliser* : retrouver factures, clients et échéances dans un espace unique. 2. *Comprendre* : analyser les encaissements et les situations à risque. 3. *Anticiper* : visualiser les échéances et les prévisions. 4. *Décider* : organiser les actions grâce au moteur décisionnel VERQIA.

### 7.2 Produit

**Hub `/produit`** : vidéo détaillée en tête · section « De la découverte à la maîtrise » : 01 **FREE** (créer son espace, configurer son entreprise, manipuler 5 factures et 5 clients) · 02 **STARTER** (gérer réellement factures, clients, échéances et paiements) · 03 **BUSINESS** (prévisions, analyse du risque, recouvrement intelligent, moteur décisionnel complet) · 04 **ENTERPRISE** (multisite, utilisateurs et quotas personnalisés, intégrations, accompagnement prioritaire). Chaque étape : « Ce que vous obtenez », quotas lus dans `config/plans.ts`.

**Modules `/produit/modules`** : 10 cartes avec étiquette « Disponible à partir de … ». Accroches : Vue d'ensemble : visualisez votre situation · Trésorerie : comprenez vos flux financiers · Factures : centralisez vos documents et échéances · Clients : consultez les informations et historiques · Recouvrement : organisez vos actions de relance · Risque : identifiez les situations nécessitant une attention particulière · Prévisions : anticipez vos encaissements · Paiements : suivez les opérations enregistrées · Automatisations : structurez les processus récurrents · Événements : conservez une trace des opérations importantes.

**Moteur décisionnel `/produit/moteur-decisionnel`** : titre « Ne vous contentez pas de voir les chiffres. Sachez quoi en faire. » · 4 décisions · texte : le moteur aide à structurer les décisions selon des règles, des informations et des autorisations définies ; chaque décision est explicable et traçable · mention « Accès complet réservé à Business et Enterprise » · démo : 4 factures **fictives** (« Données fictives »), décision et raison au clic · citation 4.

**Démonstration `/produit/demonstration`** : « Découvrez VERQIA avant de vous engager. » · « Créez votre espace, configurez votre entreprise et explorez les premières fonctionnalités de VERQIA gratuitement. Vous disposez de 5 factures et de 5 clients pour découvrir l'environnement. Lorsque vous souhaitez passer à une véritable gestion opérationnelle, choisissez Starter ou Business. » · CTA « Commencer gratuitement » · aperçu en fenêtre de navigateur (données fictives) · fenêtre douce sur fonction verrouillée : « Cette fonctionnalité fait partie de VERQIA Starter… » (bouton « Découvrir Starter »).

### 7.3 Solutions

Titre : « Une solution conçue pour accompagner différents modèles d'entreprise. » · 7 profils : Commerce et distribution · Cabinets et services professionnels · Startups · PME · Entreprises B2B · Grossistes et supermarchés · Grandes organisations. Une image forte par profil (voir section 8).
Texte : « Quelle que soit votre activité, la maîtrise des créances, des échéances et des encaissements reste essentielle à votre organisation. VERQIA adapte son expérience à vos besoins et à votre niveau d'activité. »

**Simulations illustratives** (section à valider) : trois scénarios (Distribution et grossiste ; Services B2B ; PME du BTP) présentés comme **« Simulation illustrative, pas un résultat client »**, avec la durée simulée affichée. Les chiffres du brief du 08/11 sont repris tels quels dans `messages/` : Distribution 32 → 19 factures en retard, −40 % de temps de relance, 8,5 M FCFA, 8 semaines ; Services B2B 18 → 11, −35 %, 5,2 M FCFA, 6 semaines ; BTP 14 → 8, −45 %, 12 M FCFA, 10 semaines. **Interdit** : les appeler « résultats », « clients » ou « études de cas », ou y ajouter le bloc d'indicateurs agrégés (35–45 %, 90–95 %, etc.) sans étiquette de simulation. Badge « À valider » sur la section.

### 7.4 Tarifs

Titre : « Choisissez le niveau de maîtrise adapté à votre entreprise. » · sous-titre : « Découvrez gratuitement VERQIA, commencez à gérer votre activité avec Starter ou exploitez toute la puissance décisionnelle de Business. » · bascule mensuel/annuel · 4 cartes (BUSINESS mise en avant) · tableau comparatif (section 3) · fonctions verrouillées visibles avec cadenas et formule requise · FAQ tarifaire (3 questions : gratuit ? FREE/STARTER ? changer de formule ?) · vidéo courte.
CTA : FREE « Créer mon compte gratuitement » · STARTER « Choisir Starter » · BUSINESS « Passer à Business » · ENTERPRISE « Demander un devis » (vers Contact).

### 7.5 Ressources

**FAQ `/ressources/faq`** (7) : 
1. VERQIA est-il gratuit ? « Oui. La formule FREE permet de découvrir la plateforme avec un maximum de 5 factures et 5 clients, sans accès aux fonctionnalités de gestion opérationnelle. »
2. Quelle est la différence entre FREE et STARTER ? « FREE est un espace de découverte. STARTER permet de gérer réellement les factures, les clients, les échéances et les opérations essentielles. »
3. Pourquoi choisir BUSINESS ? « Business donne accès aux fonctionnalités avancées, notamment les prévisions, l'analyse des risques et le moteur décisionnel complet. »
4. VERQIA remplace-t-il un logiciel comptable ? « Non. VERQIA est conçu pour compléter l'organisation financière existante et améliorer le pilotage des créances et des encaissements. »
5. Puis-je changer de formule ? « Oui, selon les conditions d'abonnement et de conservation des données définies par VERQIA. »
6. VERQIA est-il adapté à mon secteur ? « VERQIA s'adresse aux entreprises de différents secteurs. La formule adaptée dépend principalement de vos besoins et de vos volumes. »
7. Puis-je demander une démonstration ? « Oui. Une démonstration peut être demandée auprès de l'équipe VERQIA. »

**Programme pilote `/ressources/pilote`** : pilote gratuit de **30 jours**, délai de réponse cible **24 heures ouvrées**, à présenter comme « **offre pilote à confirmer** », jamais comme un engagement garanti. Bouton vers Contact.

### 7.6 À propos

**Mot du fondateur** (première personne, mot pour mot) : « J'ai imaginé VERQIA à partir d'une conviction simple : une entreprise ne devrait pas avoir à subir le manque de visibilité sur ses créances, ses échéances et ses encaissements. Trop souvent, les informations financières sont dispersées entre plusieurs fichiers et outils. Il devient alors difficile de comprendre rapidement les situations, de savoir quelles actions prioriser et d'anticiper les difficultés. Avec VERQIA, mon ambition est de proposer une plateforme qui rassemble ces informations et aide les entreprises à structurer leur pilotage financier. Je souhaite construire une solution fiable, accessible et intelligente, qui accompagne les entreprises dans leur évolution, quelle que soit leur taille ou leur activité. VERQIA est un projet de long terme : une plateforme pensée pour donner aux entreprises davantage de visibilité, de maîtrise et de confiance dans leurs décisions. »
Signature : **Le Fondateur de VERQIA**. Photo : emplacement réservé. Aucun nom, parcours, diplôme ou expérience ajouté. Citation 5.
**Couverture géographique** : ville, pays, domaine : **À COMPLÉTER**. Aucune ville ni présence inventée.

### 7.7 Contact

Titre : « Demander un pilote, une démonstration ou un devis. »
Trois boutons, **affichés seulement si la coordonnée existe** : WhatsApp · E-mail · Calendly (« Choisir un créneau »). Si aucune n'est renseignée : pastille **À COMPLÉTER** en préproduction, et le site ne se met pas en production (garde-fou).
Réassurance : « Réponse cible sous 24 heures ouvrées » et « Offre pilote gratuite de 30 jours : à confirmer. »
**Pas de formulaire dans cette phase** ; il sera ajouté avec le backend (phase 2), avec les champs : prénom et nom*, entreprise*, rôle*, téléphone/WhatsApp*, e-mail, formule, taille, difficulté, consentement*.

### 7.8 Citations éditoriales (non attribuées, réparties sur le site)

1. « La trésorerie ne se subit pas. Elle se pilote. » (Accueil, après le problème)
2. « Une facture en attente est une information. Une échéance maîtrisée est une décision. » (Produit)
3. « Comprendre ses créances, c'est mieux préparer ses encaissements. » (Solutions)
4. « La bonne décision commence par une information fiable. » (Moteur décisionnel)
5. « Votre entreprise mérite mieux qu'un suivi dispersé. » (À propos)

## 8. Vidéos et images

Les vidéos de présentation (récapitulatif de VERQIA PILOT) et les images fortes existent déjà et seront fournies. Tout est piloté par **`config/media.ts`** ; tant qu'un fichier manque, un cadre « Vidéo à fournir » ou « Image à fournir » s'affiche (pas de lien mort).

| Emplacement | Média | Remarque |
|---|---|---|
| Accueil, sous le hero | Vidéo récapitulative | Lecture au clic, image de couverture |
| Produit, en tête du hub | Vidéo détaillée | Même mécanique |
| Tarifs, en bas | Vidéo courte de réassurance | Optionnelle |
| À propos | Vidéo du fondateur | Seulement si fournie |
| Hero et séparateurs entre sections | Images fortes grand format | `next/image` |
| Solutions | Une image par profil d'entreprise | 7 images |

**Règles vidéo** : pas de lecture automatique avec son ; `preload="none"` et image de couverture ; chargement uniquement au clic ; sous-titres FR/EN (**À COMPLÉTER** tant que non fournis) ; format MP4/WebM compressé, hébergement à décider (**À COMPLÉTER**) ; aucune boucle permanente.

## 9. Défilement et animations

Défilement fluide légèrement ralenti (Lenis), réglé dans `config/motion.ts` ; apparitions au défilement déclenchées à 35 % de visibilité, une seule fois ; coupé si `prefers-reduced-motion`. Les titres du hero démarrent immédiatement. Détails dans la directive `06`.

## 10. Contacts et informations légales (À COMPLÉTER avant publication)

WhatsApp professionnel · E-mail · Calendly · Domaine officiel · Ville · Adresse légale · Identité juridique · Numéro d'immatriculation : **À COMPLÉTER**. Logo officiel V · Photo du fondateur · Vidéos · Images : **À FOURNIR**. Ne jamais inventer de coordonnées.
Pages légales : Mentions légales · Politique de confidentialité · CGU · CGV · Politique de cookies · Sécurité et confiance.

## 11. Règles de fiabilité (non négociables)

1. Jamais de fonctionnalité présentée comme disponible si elle ne l'est pas.
2. Jamais de données fictives présentées comme réelles (toujours « Données fictives »).
3. Jamais de faux témoignage, chiffre de performance, partenariat, certification, nombre de clients. Les simulations sont étiquetées comme telles.
4. Distinguer clairement FREE, STARTER, BUSINESS, ENTERPRISE ; respecter les quotas.
5. Prix en FCFA, mensuel et annuel sans ambiguïté ; badge « À valider » sur tout prix ou quota non confirmé.
6. Contrôle des accès **côté serveur** dans l'application (phase 2).
7. Ne pas présenter VERQIA comme une banque ou un établissement financier.
8. Relances soumises à autorisation et validation humaine ; décisions du moteur explicables et traçables.
9. Toute promesse commerciale doit correspondre à une capacité réellement opérationnelle.
10. Responsive ordinateur, tablette, mobile.

## 12. Règles de mise à niveau dans l'application (phase 2)

Ne jamais bloquer brutalement ; expliquer pourquoi la fonction est indisponible ; afficher la formule requise ; montrer les avantages concrets ; conserver les données lors d'un changement de formule ; ne jamais facturer automatiquement une mise à niveau sans consentement explicite.
Messages types : FREE → « Cette fonctionnalité fait partie de VERQIA Starter… » (« Découvrir Starter ») ; STARTER → « Anticipez vos encaissements avec les analyses avancées de VERQIA Business. » (« Passer à Business ») ; BUSINESS (limites atteintes) → « Votre activité évolue. VERQIA Enterprise vous accompagne… » (« Contacter l'équipe commerciale »).

## 13. Critères d'acceptation

- [ ] Les 7 pages et leurs sous-pages existent, en FR et EN complets, avec les routes de la section 6.2.
- [ ] La barre arrondie compte 5 entrées + le bouton « Demander un pilote » ; les menus déroulants fonctionnent au clavier et au toucher.
- [ ] Le pied de page contient Sécurité et confiance et les pages légales.
- [ ] Les 4 formules et leurs quotas correspondent au tableau de la section 3 ; tout ⚑ porte le badge « À valider ».
- [ ] Les emplacements vidéo et image existent et se remplissent via `config/media.ts`.
- [ ] Aucun contenu inventé ; les simulations sont étiquetées ; chaque « À COMPLÉTER » est visible en préproduction et **bloque la mise en production** (script de contrôle).
- [ ] Aucun bouton ne mène à une coordonnée vide.
- [ ] Mode clair (crème) et sombre complets, contrastes AA.
- [ ] Défilement fluide actif, coupé avec `prefers-reduced-motion`.
- [ ] Lighthouse mobile ≥ 90 (cible).
- [ ] Pages légales présentes (gabarits à compléter).