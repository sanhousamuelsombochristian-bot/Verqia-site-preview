# VERQIA PILOT — activation de l’authentification

## État actuel

Les routes localisées `/connexion`, `/inscription`, `/mot-de-passe-oublie` et `/reinitialiser-mot-de-passe` sont intégrées à l’interface et utilisent Supabase Auth quand il est configuré. Sans les deux variables publiques ci-dessous, les formulaires ne transmettent rien et affichent clairement que l’authentification est indisponible. Les flux réels n’ont pas été validés sur un projet Supabase; ne pas présenter cette préversion comme une authentification opérationnelle.

## Variables d’environnement

Créer un `.env.local` à partir de `.env.example` et renseigner :

- `NEXT_PUBLIC_SUPABASE_URL` — URL du projet Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — clé publique `anon`/publishable du projet, utilisée par le SDK navigateur.

Ne jamais mettre une clé `service_role`, un secret OAuth ou un mot de passe dans une variable `NEXT_PUBLIC_*`, dans le dépôt, ni dans le navigateur. La clé publique n’est acceptable côté client qu’avec les politiques RLS correctement définies et aucun privilège de service. Le projet ne contient pas de backend privilégié.

## Configuration Supabase

1. Créer un projet Supabase et activer le fournisseur e-mail/mot de passe.
2. Dans **Authentication → URL Configuration**, définir le Site URL réel et ajouter les URL de rappel utilisées en développement et en préproduction. Les retours de l’application sont `/{locale}/connexion` et `/{locale}/reinitialiser-mot-de-passe` sur l’origine du site. Autoriser uniquement les origines/domaines contrôlés.
3. Configurer les e-mails de confirmation et de récupération avec les URL de redirection du projet. Tester délivrabilité, expiration et utilisation unique des liens.
4. Pour Google, activer le provider dans **Authentication → Providers** et saisir le Client ID/secret dans Supabase. Le secret reste uniquement dans le tableau de bord Supabase.
5. Pour Microsoft, activer Azure dans Supabase (provider `azure`), renseigner les identifiants côté Supabase et utiliser l’URL de callback fournie par Supabase dans l’enregistrement Microsoft. Valider les claims e-mail et les comptes personnels/professionnels voulus.
6. Ajouter les URL exactes de préproduction/production et de développement à l’allowlist de redirection Supabase. Vérifier chaque flux sur le domaine de destination avant de l’activer.
7. Définir les tables et politiques RLS avant de stocker ou lire des données métier. Les pages actuelles créent un compte Auth et ajoutent prénom, nom et entreprise aux métadonnées utilisateur; elles ne créent pas d’espace de travail ni d’abonnement.

## À tester avant activation

- Connexion e-mail, compte inexistant, mauvais mot de passe, compte désactivé et perte réseau.
- Inscription, e-mail de confirmation, doublon et lien expiré.
- Connexion Google et Microsoft avec chaque type de compte visé.
- Récupération, lien expiré, changement de mot de passe et connexion après changement.
- Persistance avec et sans « Garder ma session ouverte »; déconnexion; navigation clavier/mobile.
- Règles anti-abus, CAPTCHA/rate limits, redirections et journaux; configuration RLS et confidentialité des métadonnées.

Aucun parcours protégé ni page d’application, paiement, abonnement, récupération d’identité côté serveur ou mesure d’analytics n’est créé par cette intégration. Revoir la politique de confidentialité et les conditions avec un conseil ivoirien avant l’ouverture au public.
