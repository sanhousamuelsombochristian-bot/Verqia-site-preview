# VERQIA — revue juridique préliminaire (Côte d’Ivoire)

> Note de préparation éditoriale et technique, pas un avis juridique. Faire valider les textes et leur applicabilité par un professionnel du droit ivoirien avant publication.

## Points vérifiés dans les sources officielles consultées

- **Données personnelles** — La loi n° 2013-450 du 19 juin 2013 encadre l’information donnée aux personnes (article 28), leurs droits d’accès et d’opposition, rectification et effacement (articles 29–35), la sécurité et les sous-traitants (articles 39–41), et les transferts vers des pays tiers (article 26). L’article 26 prévoit une autorisation préalable de l’Autorité de protection avant le transfert. Le détail des formalités pour VERQIA et la désignation actuelle de l’autorité doivent être confirmés auprès de l’ARTCI et du conseil juridique. [Texte officiel publié par l’ANSSI](https://anssi.gouv.ci/documents/14/Loi_2013-450_19_juin_2013_relative_%C3%A0_la_protection_des_donn%C3%A9es_%C3%A0_caract%C3%A8re_personnel.pdf) · [Formulaires de l’Autorité de protection](https://www.autoritedeprotection.ci/documents/)
- **Transactions électroniques** — La loi n° 2013-546 du 30 juillet 2013, article 40, prévoit la conservation de documents électroniques pendant dix ans, sous réserve d’un délai légal plus court, avec des conditions d’accessibilité et d’intégrité. Ne pas présenter ce délai comme une durée uniforme de conservation de toutes les données personnelles. [Texte officiel publié par l’ANSSI](https://anssi.gouv.ci/documents/62/Loi-2013-546_Transaction-electronique_MZAt6Qd.pdf)
- **Cybercriminalité** — La loi n° 2013-451 du 19 juin 2013 a été modifiée par la loi n° 2023-593 du 7 juin 2023. [Registre officiel des textes nationaux de l’ANSSI](https://anssi.gouv.ci/reglementations/textes-nationaux/)
- **Société de l’information** — La loi n° 2017-803 du 7 décembre 2017 est référencée dans le même registre de l’ANSSI.
- **Évolution du cadre cybersécurité** — Le registre officiel consulté liste aussi l’ordonnance n° 2024-950 du 30 octobre 2024, qui modifie l’ordonnance n° 2017-500 et abroge l’article 50 de la loi n° 2013-546. La page officielle de l’ANSSI indique que l’agence a été créée par le décret n° 2024-958 du 30 octobre 2024. La référence à une évolution en avril 2025 n’a pas été corroborée dans ces sources : vérifier s’il s’agit d’un autre texte ou d’une date de publication. [Ordonnance et textes officiels](https://anssi.gouv.ci/reglementations/textes-nationaux/) · [Missions de l’ANSSI](https://anssi.gouv.ci/l-anssi/nos-missions/)
- **Informations éditeur / vente en ligne** — L’article 5 de la loi n° 2013-546 énumère notamment la dénomination de l’entreprise, l’adresse complète, l’e-mail, le téléphone, certaines références RCCM/capital/siège et, si assujettie à la TVA, l’identifiant fiscal. Les obligations supplémentaires (forme juridique, représentant légal, directeur de publication, hébergeur, etc.) sont maintenues en champs à compléter et à valider avec le conseil.

## Vérifications Q1 supplémentaires — domaine et hébergement (08/11/2026)

- **Domaine .com** — Le contrôle [RDAP Verisign](https://rdap.verisign.com/com/v1/domain/verqia.com) renvoie un enregistrement actif pour `verqia.com` (création indiquée le 31 janvier 2026, échéance indiquée le 31 janvier 2027). Il n’est donc pas disponible pour un enregistrement ordinaire; toute acquisition nécessiterait une négociation avec son titulaire. Aucun achat n’a été fait.
- **Domaine .ci** — Le [lookup NIC.CI](https://whois.nic.ci/domain/verqia.ci) ne renvoie actuellement aucun résultat. C’est un indice de disponibilité, pas une réservation ni une garantie à la commande; confirmer auprès d’un [registrar accrédité NIC.CI](https://www.nic.ci/). Aucun achat n’a été fait.
- **Hébergement recommandé provisoirement : Vercel** — `vercel.json` configure les Vercel Functions en `cpt1` (Cape Town). La documentation Vercel précise que les fichiers statiques sont servis via un CDN global et que le choix de région des Functions n’affecte pas leur distribution. Le DPA Vercel prévoit des traitements/transferts aux États-Unis et dans d’autres lieux où Vercel ou ses sous-traitants opèrent. La région `cpt1` n’est donc pas une garantie de résidence intégrale, ni une conclusion sur la conformité. Vercel réserve l’offre Hobby à un usage personnel non commercial : prévoir Pro/Enterprise pour le site commercial. Aucun compte, contrat ou déploiement n’a été créé; inventorier les journaux, accès, sous-traitants et flux réels, puis faire valider les formalités/transferts par le conseil ivoirien avant production. [DPA](https://vercel.com/legal/dpa) · [Régions des Functions](https://vercel.com/docs/functions/configuring-functions/region) · [CDN et régions](https://vercel.com/docs/regions) · [Usage commercial et plans](https://vercel.com/docs/limits/fair-use-guidelines)
- **Canaux e-mail** — `contact@verqia.com` et `confidentialite@verqia.com` sont des propositions, pas des boîtes créées. Ne pas les présenter comme contacts actifs avant acquisition/contrôle du domaine, configuration et test réel de réception.
- **Médias de marque** — Aucun média ne doit être qualifié d’officiel sans validation explicite. Les variantes onyx et icône ronde, ainsi qu’un portrait authentique du fondateur, restent à confirmer/fournir; aucune création ne doit être présentée comme photographie réelle.

## Décisions éditoriales appliquées

1. L’indexation est désactivée par défaut (`VERQIA_INDEXING_ENABLED` absent/`false`) : les pages ont `noindex,nofollow`, la sitemap reste vide et `robots.txt` n’annonce pas de sitemap. L’indexation ne peut être demandée qu’avec un HTTPS configuré; la commande de build déclenche alors le contrôle complet des champs, tarifs, médias et de l’approbation juridique.
2. Les documents électroniques concernés par l’article 40 peuvent relever de dix ans, mais la politique de confidentialité ne promet pas dix ans pour chaque donnée personnelle.
2. Le transfert à l’étranger n’est pas supposé : les pays d’hébergement, fournisseurs d’e-mail, sous-traitants et accès distants restent à inventorier.
3. Aucune affirmation sur les mesures techniques, certifications, hébergeur ou transferts réels n’est faite.
4. Une interface de préférences cookies est maintenant présente : elle enregistre localement les choix essentiels, audience et marketing; aucun script de suivi non essentiel n’est chargé et l’interface ne les active pas encore. Le lien de pied de page mène toujours à la politique `/legal/cookies`, où un bouton permet de rouvrir les préférences. Avant production, faire valider les catégories, durées et modalités de consentement/retrait; aucun suivi ne doit être activé avant consentement préalable.
5. Les tarifs de la page CGV sont lus depuis `config/plans.ts`; ceux au statut `toValidate` restent signalés. Le régime de taxe (HT/TTC), paiement, résiliation, responsabilités et tribunal compétent ne sont pas inventés.
6. Les champs raison sociale, forme juridique, siège, RCCM, capital social si applicable, identifiant fiscal, représentant, contacts, directeur de publication et hébergeur restent « À COMPLÉTER ».

## À obtenir / confirmer avant publication

- Dénomination et forme juridique exactes; siège; numéro RCCM; capital social si applicable; identifiant fiscal; représentant légal.
- E-mail et téléphone professionnels; nom du directeur de publication.
- Hébergeur réel (nom, adresse, contact), région d’hébergement, service d’e-mail et autres sous-traitants; flux et transferts hors Côte d’Ivoire.
- Durées par finalité, formalités ARTCI applicables, bases et processus des droits des personnes.
- Cookies/traceurs réellement installés et implémentation du consentement avant tout suivi non essentiel.
- Statut des prix HT/TTC, paiements, résiliation, responsabilité et juridictions applicables, revus par un conseil.
- URL officielle du site et un canal public de contact, nécessaires aussi pour compléter les métadonnées SEO et lever le garde-fou de production.
- Vidéos obligatoires d’accueil et produit, affiches, sous-titres FR/EN et sept images des profils d’entreprise, configurés via `config/media.ts`.
- Validation explicite des documents par un professionnel du droit (`LEGAL_REVIEW_APPROVED=true`) avant toute publication.
