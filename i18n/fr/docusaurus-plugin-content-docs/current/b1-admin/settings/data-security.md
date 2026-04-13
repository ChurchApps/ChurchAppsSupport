---
title: "Sécurité des données"
---

# Sécurité des données

<div class="article-intro">

Bien qu'il n'existe pas de système parfaitement sécurisé, ChurchApps prend la sécurité des données au sérieux. Cette page explique les mesures prises pour protéger toutes les données saisies dans B1.church Admin et les autres produits ChurchApps.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez cette page pour comprendre comment les données de votre église sont protégées
- Configurez les [Rôles et autorisations](./roles-permissions.md) pour contrôler qui peut accéder aux informations sensibles
- Familiarisez-vous avec la [politique de confidentialité](https://churchapps.org/privacy)

</div>

## Limitation des données sensibles stockées

Notre première approche consiste à ne pas stocker plus de données sensibles que nécessaire. Cela signifie ne jamais stocker de numéros de carte bancaire ou de coordonnées de compte bancaire utilisés pour effectuer des dons. Lorsqu'un utilisateur fait un don via B1.church Admin ou B1, les données de carte bancaire ne sont jamais transmises à aucun de nos serveurs, uniquement à votre passerelle de paiement (Stripe). Cela signifie qu'en cas de violation de données, aucune information de carte bancaire ou de compte bancaire ne serait compromise.

Nous ne stockons jamais non plus les mots de passe dans notre système. Tous les mots de passe sont traités par un algorithme de hachage à sens unique dans lequel une partie des données est détruite, rendant impossible pour quiconque de récupérer les mots de passe à partir de la base de données, y compris pour nous. Pour vérifier les mots de passe, la valeur saisie doit passer par le même hachage à sens unique et produire le même résultat.

Après avoir éliminé ces deux sources, les seules données sensibles restantes sont une liste de noms et de coordonnées.

:::tip
Étant donné que ChurchApps ne stocke jamais les informations de carte bancaire ou de compte bancaire, même une violation de données dans le pire des cas n'exposerait pas les données de comptes financiers. Seuls les noms et les coordonnées seraient à risque.
:::

## Utilisation des meilleures pratiques standards

Nous utilisons les meilleures pratiques standards de l'industrie en matière de sécurité, notamment le chiffrement de toutes les données en transit vers et depuis nos serveurs à l'aide du protocole HTTPS. Tous les serveurs sont hébergés dans un centre de données physique sécurisé avec Amazon Web Services. Tous les serveurs de bases de données sont protégés par un pare-feu et sont inaccessibles depuis Internet.

## Séparation des données

Les données sont réparties dans différentes bases de données en fonction de leur portée. Chacune de nos API (Membership, Giving, Attendance, Messaging, Doing et Lessons) constitue un silo de données indépendant avec sa propre base de données. Si l'une d'entre elles est compromise, l'utilité des données est limitée sans que les autres ne soient également compromises. Par exemple, si l'API/base de données Giving était compromise, un acteur malveillant pourrait potentiellement accéder à une liste de dons et de dates (mais jamais aux données de carte/compte bancaire). Cependant, il n'aurait pas accès aux utilisateurs ayant effectué les dons ni aux églises auxquelles ils sont rattachés, car ces données sont stockées dans la base de données Membership séparée.

:::info
La séparation des données signifie que la compromission d'un système ne donne pas accès à toutes les données de l'église. Chaque API fonctionne de manière indépendante avec sa propre base de données, limitant l'impact de toute violation potentielle.
:::

## Accès limité

L'accès aux serveurs de production est strictement limité aux administrateurs de serveurs qui en ont besoin. Actuellement, il s'agit de deux personnes qui sont également membres du conseil d'administration. Les développeurs, les bénévoles et les autres membres du conseil ne sont pas autorisés à accéder aux serveurs de production.

## Politique de confidentialité

Vos données vous appartiennent et ne seront jamais vendues à des tiers. Vous pouvez lire notre politique de confidentialité complète [ici](https://churchapps.org/privacy).

## Conformité au RGPD

ChurchApps accompagne la conformité au RGPD pour les églises ayant des membres au Royaume-Uni ou dans l'Union européenne. Voici comment nous répondons aux exigences clés :

### Droits des personnes concernées

ChurchApps fournit des outils pour aider les églises à répondre aux demandes des personnes concernées :

- **Droit d'accès (Article 15)** — Les membres peuvent télécharger l'ensemble de leurs données personnelles depuis le portail des membres en utilisant le bouton « Télécharger mes données ». Les administrateurs peuvent également exporter les données de n'importe quelle personne depuis la page de détail de la personne.
- **Droit à l'effacement (Article 17)** — Les membres peuvent supprimer leur propre compte depuis le portail des membres. Les administrateurs peuvent anonymiser ou supprimer définitivement les données d'une personne dans tous les modules. L'anonymisation remplace les informations personnelles par des valeurs génériques tout en préservant les enregistrements agrégés (totaux des dons, comptages de présence) nécessaires aux rapports financiers de l'église.
- **Droit à la limitation du traitement (Article 18)** — Les membres peuvent restreindre le traitement de leurs données, y compris se désinscrire des communications.
- **Droit à la portabilité des données (Article 20)** — La fonction d'exportation fournit toutes les données personnelles dans un format JSON structuré et lisible par machine.

### Traitement des données

ChurchApps agit en tant que **sous-traitant** pour le compte de votre église (le **responsable du traitement**). Notre [Accord de traitement des données](https://churchapps.org/terms) décrit les responsabilités de chaque partie, y compris l'utilisation de sous-traitants ultérieurs, les procédures de notification de violation et le traitement des données en cas de résiliation.

### Transferts internationaux de données

Les données de ChurchApps sont hébergées sur Amazon Web Services (AWS) aux États-Unis. Les transferts internationaux de données depuis le Royaume-Uni/l'UE sont couverts par les Clauses Contractuelles Types (SCCs) d'AWS dans le cadre de l'[Addendum au traitement des données AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Un hébergement dans l'UE n'est pas requis lorsque des mécanismes de transfert appropriés tels que les SCCs sont en place.

### Sous-traitants ultérieurs

- **Amazon Web Services (AWS)** — Hébergement de l'infrastructure, stockage des données et diffusion de contenu
- **Stripe** — Traitement des paiements pour les dons (aucune donnée de carte n'est stockée par ChurchApps)

:::info
Pour tous les détails sur la manière dont nous traitons les données personnelles, consultez notre [Politique de confidentialité](https://churchapps.org/privacy) et nos [Conditions d'utilisation](https://churchapps.org/terms). Si vous avez des questions concernant la conformité au RGPD, contactez-nous à support@churchapps.org.
:::
