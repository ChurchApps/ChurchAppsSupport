---
title: "Sécurité des données"
description: "Découvrez comment ChurchApps protège les données de votre église dans B1 Admin, des mots de passe hachés et du HTTPS aux bases de données séparées et aux outils de données RGPD."
---

# Sécurité des données

<div class="article-intro">

Aucun système n'est parfaitement sûr, mais ChurchApps prend la sécurité des données très au sérieux. Cette page explique les mesures prises pour protéger toutes les données saisies dans B1.church Admin et dans les autres produits ChurchApps.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez cette page pour comprendre comment les données de votre église sont protégées
- Configurez les [rôles et autorisations](./roles-permissions.md) pour contrôler qui peut accéder aux informations sensibles
- Familiarisez-vous avec la [politique de confidentialité](https://churchapps.org/privacy)

</div>

## Limiter les données sensibles stockées {#limiting-sensitive-data-stored}

Notre première approche consiste à ne pas stocker plus de données sensibles que nécessaire. Cela signifie que nous ne conservons jamais les coordonnées de carte de crédit ou de compte bancaire utilisées pour les dons. Lorsqu'un utilisateur fait un don depuis B1.church Admin ou B1, les données de la carte ne sont jamais transmises à nos serveurs, seulement à votre passerelle de paiement (Stripe). En cas de violation de données, aucune information de carte ou de compte bancaire ne pourrait donc être compromise.

Nous ne stockons également jamais les mots de passe dans notre système. Tous les mots de passe passent par un algorithme de hachage à sens unique qui détruit une partie des données, rendant impossible la récupération des mots de passe depuis la base de données, même pour nous. Pour vérifier un mot de passe, la valeur saisie doit passer par le même hachage à sens unique et produire le même résultat.

Une fois ces deux sources retirées, la seule donnée sensible restante est une liste de noms et de coordonnées.

:::tip
Comme ChurchApps ne stocke jamais les informations de carte ou de compte bancaire, même dans le pire scénario de violation de données, les coordonnées financières ne seraient pas exposées. Seuls les noms et les coordonnées seraient en jeu.
:::

## Appliquer les bonnes pratiques standard {#using-standard-best-practices}

Nous appliquons les bonnes pratiques de sécurité reconnues par l'industrie, notamment le chiffrement de toutes les données en transit vers et depuis nos serveurs au moyen de HTTPS. Tous les serveurs sont hébergés dans un centre de données physique sécurisé d'Amazon Web Services. Tous les serveurs de bases de données sont placés derrière un pare-feu et sont inaccessibles depuis Internet.

## Séparation des données {#data-segregation}

Les données sont réparties dans différentes bases de données selon leur périmètre. Chacun de nos modules (Membres, Dons, Présences, Messagerie, Travail et Contenu) constitue un silo de données indépendant, avec ses propres bases de données. Si l'un d'eux était compromis, l'utilité des données serait limitée sans que les autres le soient aussi. Par exemple, si l'API ou la base de données des dons était compromise, un acteur malveillant pourrait avoir accès à une liste de dons et de dates (jamais aux données de carte ou de compte bancaire). En revanche, il n'aurait pas accès à l'identité des donateurs ni aux églises concernées, car ces données sont stockées dans la base de données distincte des membres.

:::info
La séparation des données signifie que la compromission d'un système ne donne pas accès à l'ensemble des données de l'église. Chaque API fonctionne indépendamment avec sa propre base de données, ce qui limite l'impact d'une éventuelle violation.
:::

## Accès limité {#limited-access}

L'accès aux serveurs de production est strictement limité aux administrateurs de serveurs qui en ont besoin. Il s'agit actuellement de deux personnes, également membres du conseil d'administration. Les développeurs, les bénévoles et les autres membres du conseil n'ont pas accès aux serveurs de production.

## Politique de confidentialité {#privacy-policy}

Vos données vous appartiennent et ne seront jamais vendues à des tiers. Vous pouvez lire notre politique de confidentialité complète [ici](https://churchapps.org/privacy).

## Conformité au RGPD {#gdpr-compliance}

ChurchApps soutient la conformité au RGPD pour les églises ayant des membres au Royaume-Uni ou dans l'Union européenne. Voici comment nous répondons aux principales exigences :

### Droits des personnes concernées {#data-subject-rights}

ChurchApps fournit des outils pour aider les églises à répondre aux demandes des personnes concernées :

- **Droit d'accès (article 15)** — Les membres peuvent demander une copie de leurs données personnelles en contactant leur église. Les administrateurs peuvent exporter les données de toute personne avec **Exporter les données** sur la fiche de la personne, ou depuis la section **Gestion des données** du formulaire de modification de la personne, dans B1.church Admin.
- **Droit à l'effacement (article 17)** — Les membres peuvent demander eux-mêmes la suppression de leur compte depuis leur page de profil (voir [Examiner les demandes de suppression de compte](../profile/account-deletion.md)), ou en contactant directement leur église. Les administrateurs peuvent aussi anonymiser les données d'une personne dans tous les modules depuis la section **Gestion des données** de la page de détails de la personne. L'anonymisation remplace les informations personnelles par des valeurs génériques tout en conservant les données agrégées (totaux de dons, nombres de présences) nécessaires à la gestion financière de l'église.
- **Droit à la limitation du traitement (article 18)** — Les membres peuvent demander la limitation du traitement en contactant leur église, notamment pour se désabonner des communications.
- **Droit à la portabilité des données (article 20)** — Les administrateurs peuvent exporter les données personnelles dans un format JSON structuré et lisible par machine, pour le compte des membres qui en font la demande.

### Utiliser les outils de gestion des données {#using-the-data-management-tools}

Pour accéder aux outils de données RGPD pour une personne :

1. Allez dans **Personnes** dans B1 Admin et ouvrez la fiche de la personne.
2. Cliquez sur **Modifier** pour passer en mode modification.
3. Faites défiler jusqu'à la section **Gestion des données** (repliée par défaut) et cliquez pour la développer.
4. Utilisez **Exporter les données** pour télécharger un fichier JSON de toutes les données stockées pour cette personne. (Le même lien **Exporter les données** figure aussi parmi les actions sous le nom de la personne, sans ouvrir le formulaire de modification.)
5. Utilisez **Anonymiser** pour remplacer les informations personnelles par des valeurs génériques. Il vous sera demandé de saisir `ANONYMIZE` pour confirmer — cette action est irréversible.

:::warning
L'anonymisation est définitive. Les totaux de dons et les nombres de présences sont conservés à des fins de gestion financière, mais tous les identifiants personnels (nom, courriel, adresse, etc.) sont supprimés et ne peuvent pas être récupérés.
:::

### Traitement des données {#data-processing}

ChurchApps agit en tant que **sous-traitant de données** pour le compte de votre église (le **responsable du traitement**). Notre [accord de traitement des données](https://churchapps.org/terms) définit les responsabilités de chaque partie, notamment le recours à des sous-traitants ultérieurs, les procédures de notification de violation et le traitement des données à la résiliation.

### Transferts internationaux de données {#international-data-transfers}

Les données de ChurchApps sont hébergées sur Amazon Web Services (AWS) aux États-Unis. Les transferts internationaux depuis le Royaume-Uni ou l'UE sont couverts par les clauses contractuelles types (CCT) d'AWS, dans le cadre de l'[addendum sur le traitement des données d'AWS](https://aws.amazon.com/compliance/data-processing-addendum/). L'addendum d'AWS est automatiquement intégré aux conditions de service d'AWS pour tous les clients. Un hébergement dans l'UE n'est pas nécessaire lorsque des mécanismes de transfert appropriés, comme les CCT, sont en place.

Pour plus de détails sur l'évaluation des risques liés aux transferts, voir l'[évaluation des risques de transfert](./transfer-risk-assessment.md).

### Sous-traitants ultérieurs {#sub-processors}

- **Amazon Web Services (AWS)** — Hébergement de l'infrastructure, stockage des données et diffusion de contenu
- **Stripe** — Traitement des paiements des dons (ChurchApps ne stocke aucune donnée de carte)

:::info
Pour tous les détails sur la façon dont nous traitons les données personnelles, consultez notre [politique de confidentialité](https://churchapps.org/privacy) et nos [conditions d'utilisation](https://churchapps.org/terms). Si vous avez des questions sur la conformité au RGPD, écrivez-nous à support@churchapps.org.
:::
