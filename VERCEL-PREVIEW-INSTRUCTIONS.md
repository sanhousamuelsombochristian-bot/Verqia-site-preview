# VERQIA — snapshot Git-ready pour Preview Vercel uniquement

> **Statut : NO-GO Production.** Ce snapshot ne donne aucune autorisation de publication, de domaine, de DNS, d'indexation ou de déploiement Production.

Après extraction, `package.json`, `app/`, `components/` et `public/` sont à la racine du dépôt.

1. Extraire l'archive dans un dépôt Git vide.
2. Commiter et pousser son contenu directement à la racine du dépôt.
3. Dans Vercel, conserver le **Root Directory vide** (la racine du dépôt).
4. Créer/pousser une branche non-production, par exemple `preview`.
5. Déployer uniquement cette branche comme **Preview**. Ne pas utiliser `main` et ne pas promouvoir en Production.
6. Vérifier que `NEXT_PUBLIC_LOCAL_PRICING_REVIEW=true`, si nécessaire pour la revue, n'est définie que pour Preview. Elle est refusée par le build Production.

`VERCEL_ENV=production` déclenche le gate obligatoire de release. Sans identité légale officielle, textes juridiques revus, décision D-017, contenus/médias validés et autorisation finale documentée, le build Production doit et va échouer.

Le snapshot exclut dépendances, sorties de build, caches, uploads locaux, sauvegardes, identifiants et secrets.
