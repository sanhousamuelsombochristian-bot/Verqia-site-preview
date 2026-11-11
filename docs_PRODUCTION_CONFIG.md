# Préparation de la mise en production VERQIA

Ne jamais renseigner des valeurs inventées. Ces variables ne doivent être configurées qu’avec les informations publiques validées. Les valeurs commençant par `/` doivent désigner un fichier placé sous `public/`; les URL distantes doivent être en HTTPS.

## Décisions et vérifications préalables (08/11/2026)

- **Hébergement provisoire retenu : Vercel**, sous réserve de revue DPA/sous-traitants/transferts par un conseil ivoirien. La configuration `vercel.json` fixe l’exécution des Vercel Functions en `cpt1` (Cape Town) pour éviter la région par défaut US quand une Function s’exécute. Ce réglage ne garantit pas une résidence complète : CDN et fichiers statiques sont distribués mondialement, et journaux, déploiement, support ou sous-traitants peuvent relever d’autres lieux de traitement. Pour un site commercial, Vercel indique que l’offre Hobby est réservée à l’usage personnel non commercial : prévoir Pro ou Enterprise. Aucun compte, abonnement ou déploiement n’a été créé par l’assistant.
- **Domaine** : `verqia.com` ressort comme enregistré au contrôle RDAP; il n’est pas enregistrable normalement par nous. `verqia.ci` n’a pas de résultat dans la recherche publique NIC.CI; disponibilité possible seulement, à confirmer à la commande auprès d’un registrar accrédité. Aucun domaine n’est acheté/réservé. Ne renseigner ni `NEXT_PUBLIC_SITE_URL` ni redirection `www` avant contrôle de propriété, achat et configuration DNS/TLS.
- **E-mails** : `contact@verqia.com` et `confidentialite@verqia.com` restent des noms proposés, non des boîtes actives. Ne pas les publier/configurer avant contrôle du domaine, création des boîtes et test d’envoi/réception.
- **Marque et portrait** : ne pas qualifier de logo officiel un fichier sans confirmation du titulaire. Les variantes onyx et icône ronde, ainsi qu’un portrait authentique du fondateur, restent à valider/fournir; aucune image ne doit être inventée.

## Indexation et feu vert

- Indexation désactivée par défaut. Laisser `VERQIA_INDEXING_ENABLED` absent ou `false` pour une préproduction/test : les pages portent `noindex,nofollow`, la sitemap est vide et `robots.txt` n’annonce pas de sitemap.
- N’activer `VERQIA_INDEXING_ENABLED=true` qu’après acquisition/contrôle du domaine et feu vert complet. La commande `npm run build` exécute `scripts/check-indexing.mjs`; si l’indexation est demandée, le build échoue tant que `check-placeholders` détecte des champs d’identité/contact, médias ou actifs de marque obligatoires manquants, ou que `LEGAL_REVIEW_APPROVED` n’est pas `true`. Les prix et quotas configurés dans `config/plans.ts` sont acceptés pour cette version. Après compilation, `scripts/check-rendered-placeholders.mjs` bloque aussi les marqueurs provisoires visibles dans une page publique FR/EN. La page technique `/_kit` est exclue du scan public. Au dernier contrôle préproduction, 34 exigences restent manquantes; l’indexation demeure bloquée.
- Le logo lime original fourni avec le projet est utilisé par défaut (`public/media/brand/Verqia-logo.png`); le contrôle vérifie sa présence. Les variantes onyx et icône ronde, le portrait authentique du fondateur et les médias de profils restent requis pour le feu vert. Leur présence ne prouve pas leur authenticité : une personne responsable doit confirmer tout nouvel actif.

## Domaine, identité et contact

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LEGAL_IDENTITY`
- `NEXT_PUBLIC_LEGAL_FORM`
- `NEXT_PUBLIC_LEGAL_ADDRESS`
- `NEXT_PUBLIC_RCCM`
- `NEXT_PUBLIC_SHARE_CAPITAL` (ou une confirmation explicite « non applicable »)
- `NEXT_PUBLIC_TAX_ID`
- `NEXT_PUBLIC_LEGAL_REPRESENTATIVE`
- `NEXT_PUBLIC_PUBLICATION_DIRECTOR`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL`
- `NEXT_PUBLIC_HOSTING_PROVIDER`, `NEXT_PUBLIC_HOSTING_ADDRESS`, `NEXT_PUBLIC_HOSTING_CONTACT`
- Au moins un canal utilisable : `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_CONTACT_EMAIL` ou `NEXT_PUBLIC_CALENDLY`.
- `LEGAL_REVIEW_APPROVED=true` seulement après validation juridique réelle des pages.

Le numéro RCCM, le numéro de compte contribuable, la forme juridique et les autres éléments doivent être vérifiés par l’entreprise et son conseil. Le garde-fou ne remplace pas cette validation.

## Médias obligatoires selon le contrôle actuel

- Les quatre vidéos fournies par l’utilisateur sont disponibles par défaut dans `public/media/brand-motion/`; la configuration choisit une variante blanche pour l’accueil et une variante standard pour le produit, avec version portrait sur mobile. Les sources par défaut sont vérifiées par le garde-fou. Pour remplacer une source : `NEXT_PUBLIC_MEDIA_HOME_RECAP_SRC` / `NEXT_PUBLIC_MEDIA_HOME_RECAP_MOBILE_SRC` et `NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_SRC` / `NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_MOBILE_SRC`.
- Affiches et pistes de sous-titres à fournir avant le feu vert public : `NEXT_PUBLIC_MEDIA_HOME_RECAP_POSTER`, `NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_FR`, `NEXT_PUBLIC_MEDIA_HOME_RECAP_CAPTIONS_EN`, `NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_POSTER`, `NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_FR`, `NEXT_PUBLIC_MEDIA_PRODUCT_DETAIL_CAPTIONS_EN`.
- Une image par profil : `NEXT_PUBLIC_MEDIA_AUDIENCE_COMMERCE_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_PROFESSIONAL_SERVICES_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_STARTUPS_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_SMES_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_B2B_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_WHOLESALERS_SRC`, `NEXT_PUBLIC_MEDIA_AUDIENCE_LARGE_ORGANIZATIONS_SRC`.
- Médias optionnels : `NEXT_PUBLIC_MEDIA_PRICING_SHORT_*`, `NEXT_PUBLIC_MEDIA_FOUNDER_*`, `NEXT_PUBLIC_MEDIA_HERO_IMAGE_SRC`.
- Le logo lime utilise le fichier original fourni par défaut; `NEXT_PUBLIC_LOGO_PATH` ne sert qu’à le remplacer. Requis pour le feu vert d’indexation : `NEXT_PUBLIC_LOGO_ONYX_PATH`, `NEXT_PUBLIC_LOGO_ROUND_ICON_PATH` et `NEXT_PUBLIC_FOUNDER_PHOTO`. Fournir les fichiers authentiques; chemins locaux sous `public/` ou URL HTTPS.

Après configuration, exécuter `npm run check:placeholders` avec les variables de production chargées, puis lint, typecheck, tests, build, audit des liens, accessibilité et performance. Le garde-fou bloque notamment si un fichier local configuré n’existe pas.
