---
title: "Administration du serveur"
---

# Administration du serveur

<div class="article-intro">

Les fonctionnalités d'administration du serveur dans ChurchApps ne sont disponibles que pour les utilisateurs disposant de la permission **Server.Admin**. Ces outils sont utilisés pour les opérations de plateforme, le support et le dépannage dans toutes les églises du système.

</div>

:::warning Accès restreint
Les fonctionnalités décrites sur cette page nécessitent une permission **Server.Admin** et ne sont pas disponibles pour les administrateurs d'église réguliers. Elles sont destinées aux opérateurs de plateforme et au personnel de support uniquement.
:::

## Accès à l'administration du serveur

Les utilisateurs disposant de la permission Server.Admin peuvent accéder au panneau d'administration du serveur à partir de B1 Admin :

1. Connectez-vous à [admin.b1.church](https://admin.b1.church)
2. Ouvrez **Paramètres**, puis cliquez sur **Administration du serveur** dans le menu Paramètres. (Vous pouvez également aller directement à `admin.b1.church/admin`.)
3. Le panneau d'administration du serveur comporte des sections pour Églises, Utilisateurs, Usurper l'identité de l'utilisateur, Tâches en arrière-plan, Commons, Tendances d'utilisation, Recherches de traduction, Santé du serveur et Migrations de base de données

## Usurpation d'identité de l'utilisateur

La fonctionnalité d'usurpation d'identité permet aux administrateurs du serveur de se connecter en tant qu'autre utilisateur à des fins de support et de dépannage. Cela est utile lors de l'investigation de problèmes signalés par les utilisateurs ou lors de l'aide aux églises pour configurer leurs systèmes.

### Comment usurper l'identité d'un utilisateur

1. Ouvrez la section **Usurper l'identité de l'utilisateur** du panneau d'administration du serveur
2. Entrez le nom ou l'adresse e-mail de l'utilisateur dans le champ de recherche
3. Cliquez sur **Rechercher** ou appuyez sur Entrée
4. Dans les résultats de la recherche, cliquez sur l'utilisateur dont vous souhaitez usurper l'identité
5. Confirmez l'usurpation d'identité dans la boîte de dialogue qui apparaît
6. Vous serez connecté en tant que cet utilisateur et redirigé vers son compte

### Notes importantes

- L'usurpation d'identité crée une nouvelle session avec les permissions et l'accès à l'église de l'utilisateur cible
- Votre session d'administrateur d'origine se termine lorsque vous usurpez l'identité d'un autre utilisateur
- Toutes les actions effectuées lors de l'usurpation d'identité sont enregistrées dans la piste d'audit
- Pour revenir à votre compte d'administrateur, déconnectez-vous et reconnectez-vous avec vos identifiants
- Utilisez l'usurpation d'identité uniquement quand cela est nécessaire à des fins de support et informez toujours les utilisateurs lors de l'accès à leurs comptes pour le support

### Point de terminaison API

La fonctionnalité d'usurpation d'identité est soutenue par le point de terminaison `/users/:userId/impersonate` dans l'API Membership. Voir [Points de terminaison Membership](/docs/developer/api/endpoints/membership#users) pour les détails techniques.

### Considérations de sécurité

- L'usurpation d'identité nécessite une permission Server.Admin — cette permission doit être accordée parcimonieusement et uniquement aux opérateurs de plateforme de confiance
- Tous les événements d'usurpation d'identité sont enregistrés avec l'ID d'utilisateur administrateur et l'ID d'utilisateur cible
- Les églises ne sont pas notifiées lorsque l'usurpation d'identité se produit, alors établissez des politiques claires quant à la date et à la manière d'utiliser cette fonctionnalité
- Envisagez de documenter les événements d'usurpation d'identité dans votre système de tickets de support pour la responsabilité

## Modération Commons

Commons est la file d'attente de modération partagée pour le contenu soumis par les utilisateurs dans les produits — les chansons WorshipCommons, les leçons Lessons.church, les modèles FreeShow et les modèles du générateur de sites web B1 transitent tous par la même file d'attente au lieu de d'outils d'examen séparés par produit.

### Accès à Commons

1. Accédez à l'onglet **Commons** dans le panneau d'administration du serveur.
2. Vous verrez trois sous-onglets : **File d'attente**, **Rapports** et **Ressources**.

Un rôle d'**éditeur musical** limité peut également voir l'onglet File d'attente, mais est bloqué de l'approbation des soumissions qui changent les droits ou les licences d'une chanson.

### File d'attente

La File d'attente répertorie chaque soumission en attente dans tous les produits, filtrables par produit et type de ressource. Chaque ligne indique si la soumission est une nouvelle ressource, une édition par son auteur original ou une édition par un tiers, ainsi que l'antécédent d'approbation du soumetteur et le temps d'attente de la soumission (signalé une fois qu'il dépasse 72 heures).

Cliquez sur **Examiner** pour ouvrir un tiroir avec des diffs au niveau des champs, des aperçus de fichiers et un aperçu intégré en lecture seule de l'élément. Utilisez les raccourcis clavier **a**/**r** pour approuver ou rejeter, et **j**/**k** pour passer à la soumission suivante ou précédente sans quitter le tiroir. Le rejet nécessite de sélectionner une raison (par exemple qualité, doublon, licence, ccli, ia ou hors sujet) et une note.

### Rapports

L'onglet Rapports gère les rapports de droits d'auteur et de politique/qualité déposés contre des ressources déjà publiées, divisés en files d'attente Copyright et Policy & Other distinctes plus un historique Resolved. Réclamez un rapport pour commencer à le traiter, puis résolvez-le avec une résolution (acceptée, rejetée ou doublon) et une action (aucune, dépublier ou supprimer).

### Ressources

L'onglet Ressources est un navigateur consultable du contenu publié avec des actions pour **Mettre en avant** une ressource (la met en évidence sur la page d'accueil du produit), la **Dépublier**/**Republier** ou la **Supprimer** (avec une raison de droits d'auteur ou de politique).

Pour les chansons en particulier, c'est aussi là qu'une chanson devient **prête pour le dimanche** et éligible pour apparaître dans la recherche de chansons de B1 Admin d'une église : un examinateur ouvre la ressource et marque chaque clé publiée comme **Écoutée** une fois qu'il l'a écoutée et confirmé que la partition, les accords et les diapositives sont tous présents. Une chanson ne devient prête pour le dimanche qu'une fois que chaque clé est cochée.

:::info
La modération Commons est réservée au personnel — les églises individuelles ne voient jamais cette file d'attente. Le seul endroit où l'administrateur B1 Admin d'une église individuelle touche aux données Commons est la section « WorshipCommons — gratuit » de la [recherche de chansons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), qui ne fait apparaître que les chansons qui ont déjà traversé ce processus d'examen.
:::

Voir la page [Architecture de Content Commons](/docs/developer/architecture/commons) pour le modèle de données sous-jacent et le cycle de vie de la soumission.

## Approbation des e-mails de groupe

Les églises ne peuvent pas envoyer d'e-mail écrit par l'église (e-mail de groupe, suites de formulaires, e-mails de flux de travail et invitations de compte) tant qu'un administrateur du serveur ne les approuve pas. Cela empêche les églises enregistrées par bot d'utiliser l'adresse d'envoi ChurchApps partagée pour le spam.

1. Ouvrez l'onglet **Églises** dans le panneau d'administration du serveur.
2. Chaque église affiche une puce **E-mail de groupe** : **Approuvé** (vert) ou **Non approuvé** (surligné).
3. Cliquez sur la puce et confirmez pour approuver l'église, ou pour révoquer une approbation.

Le personnel de l'église demande l'approbation avec le bouton **Demander un examen** dans la boîte de dialogue Envoyer un e-mail de B1 Admin. La demande est envoyée par e-mail à l'adresse de support et répertorie le nom, l'ID, la date d'enregistrement, l'emplacement de l'église et qui a demandé. Une église peut envoyer une demande par semaine. Voir [Limites des e-mails rédigés par l'église](/docs/developer/architecture/notifications#church-authored-email-limits) pour l'allocation quotidienne et la mise en pause automatique sur les rebonds et les plaintes.

## Migrations de base de données

Les déploiements ne changent pas la base de données. Les bases de données hébergées n'acceptent les connexions que de l'intérieur du réseau Api, donc après une version qui ajoute une migration, un administrateur du serveur l'applique à partir de l'onglet **Migrations de base de données**. (Les installations Docker auto-hébergées exécutent toujours les migrations automatiquement au démarrage du conteneur Api.)

L'onglet affiche l'environnement actuel et une ligne par module (adhésion, présence, dons, etc.) avec son statut, le nombre de migrations appliquées et en attente, et la dernière appliquée.

- **Exécuter les migrations en attente** applique chaque migration en attente, un module à la fois, dans l'ordre. Elle s'arrête au premier échec et montre ce qui a été appliqué pour chaque module.
- Un module marqué **Pas d'historique** a une base de données antérieure au suivi des migrations. Elle n'est jamais exécutée automatiquement, car cela rejouerait les anciennes migrations de données sur les tables en direct. Cliquez plutôt sur **Vérifier le schéma** sur ce module. L'Api compare les tables, les colonnes et les index que chaque migration crée avec la base de données en direct et marque chaque migration **Déjà appliquée**, **Manquante**, **Partiellement appliquée** ou **Données uniquement**. Rien n'est changé par la vérification.
- Dans les résultats de la vérification, **Enregistrer comme Déjà appliquée** écrit les migrations détectées dans l'historique des migrations sans les exécuter. Les manquantes restent en attente et peuvent alors être exécutées normalement.
- Une migration **Partiellement appliquée** bloque l'enregistrement. Si la migration est sûre à exécuter à nouveau (lisez-la d'abord), cochez **Réexécuter** afin qu'elle reste en attente et s'exécute à nouveau du début.

Le panneau d'administration du serveur et la CLI (`yarn migrate:up`) utilisent le même migrateur Kysely et la table `kysely_migration`, donc ils s'accordent toujours sur ce qui a été appliqué. Les points de terminaison de soutien sont `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` et `POST .../:module/baseline`, tous Server.Admin uniquement.

## Pages connexes

- [Authentification et permissions](/docs/developer/api/endpoints/authentication) — Modèle de permission et authentification JWT
- [Points de terminaison Membership](/docs/developer/api/endpoints/membership) — API de gestion des utilisateurs et des églises
- [Journal d'audit](/docs/b1-admin/reports/audit-log) — Afficher les journaux d'activité pour une église
- [Architecture de Content Commons](/docs/developer/architecture/commons) — Modèle de ressource partagée et cycle de vie de modération
