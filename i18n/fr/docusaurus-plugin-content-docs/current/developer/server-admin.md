---
title: "Administration du serveur"
---

# Administration du serveur

<div class="article-intro">

Les fonctionnalités d'administration serveur de ChurchApps ne sont accessibles qu'aux utilisateurs disposant de la permission **Server.Admin**. Ces outils servent aux opérations de la plateforme, au support et au dépannage pour toutes les églises du système.

</div>

:::warning Accès restreint
Les fonctionnalités décrites sur cette page nécessitent la permission **Server.Admin** et ne sont pas disponibles pour les administrateurs d'église ordinaires. Elles sont destinées uniquement aux opérateurs de la plateforme et au personnel de support.
:::

## Accéder à l'administration serveur

Les utilisateurs disposant de la permission Server.Admin peuvent accéder au panneau d'administration serveur depuis B1 Admin :

1. Connectez-vous à [admin.b1.church](https://admin.b1.church)
2. Ouvrez le [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), développez **Settings** (Paramètres), puis cliquez sur **Server Admin**. (Vous pouvez aussi accéder directement à `admin.b1.church/admin`.)
3. Le panneau Server Admin présente ses sections sur le côté gauche, en trois groupes : **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends) et **System** (Translation Lookups, Server Health, Database Migrations)

## Usurpation d'identité d'un utilisateur

La fonction d'usurpation permet aux administrateurs serveur de se connecter en tant qu'un autre utilisateur, à des fins de support et de dépannage. Elle est utile pour enquêter sur les problèmes signalés par les utilisateurs ou pour aider les églises à configurer leurs systèmes.

### Comment usurper l'identité d'un utilisateur

1. Ouvrez la section **Impersonate User** du panneau Server Admin
2. Saisissez le nom ou l'adresse e-mail de l'utilisateur dans le champ de recherche
3. Cliquez sur **Search** ou appuyez sur Entrée
4. Dans les résultats de recherche, cliquez sur l'utilisateur dont vous voulez usurper l'identité
5. Confirmez l'usurpation dans la boîte de dialogue qui s'affiche
6. Vous serez connecté en tant que cet utilisateur et redirigé vers son compte

### Remarques importantes

- L'usurpation crée une nouvelle session avec les permissions et l'accès aux églises de l'utilisateur ciblé
- Votre session administrateur d'origine prend fin lorsque vous usurpez l'identité d'un autre utilisateur
- Toutes les actions effectuées pendant l'usurpation sont consignées dans le journal d'audit
- Pour revenir à votre compte administrateur, déconnectez-vous puis reconnectez-vous avec vos identifiants
- N'utilisez l'usurpation que lorsque c'est nécessaire pour le support, et informez toujours les utilisateurs lorsque vous accédez à leur compte à des fins de support

### Point de terminaison API

La fonction d'usurpation repose sur le point de terminaison `/users/:userId/impersonate` de l'API Membership. Consultez [Points de terminaison Membership](/docs/developer/api/endpoints/membership#users) pour les détails techniques.

### Considérations de sécurité

- L'usurpation nécessite la permission Server.Admin — cette permission doit être accordée avec parcimonie et uniquement à des opérateurs de plateforme de confiance
- Tous les événements d'usurpation sont consignés avec l'identifiant de l'administrateur et celui de l'utilisateur ciblé
- Les églises ne sont pas averties lorsqu'une usurpation a lieu ; établissez donc des règles claires quant au moment et à la manière d'utiliser cette fonction
- Envisagez de documenter les événements d'usurpation dans votre système de tickets de support afin d'assurer la traçabilité

## Modération des Commons

Commons est la file de modération partagée pour le contenu soumis par les utilisateurs à travers les produits — les chansons de WorshipCommons, les leçons de Lessons.church, les modèles FreeShow et les modèles du constructeur de sites web B1 transitent tous par la même file, au lieu d'outils de révision distincts pour chaque produit.

### Accéder à Commons

1. Accédez à l'onglet **Commons** dans le panneau Server Admin.
2. Vous verrez trois sous-onglets : **Queue** (File d'attente), **Reports** (Signalements) et **Assets** (Ressources).

Un rôle **éditeur musical** limité peut également voir l'onglet Queue, mais il ne peut pas approuver les soumissions qui modifient les droits ou la licence d'une chanson.

### Queue

La file d'attente liste toutes les soumissions en attente, tous produits confondus, filtrables par produit et par type de ressource. Chaque ligne indique si la soumission est une nouvelle ressource, une modification par son auteur initial ou une modification par un tiers, ainsi que le bilan d'approbation de l'auteur de la soumission et le temps d'attente (signalé une fois qu'il dépasse 72 heures).

Cliquez sur **Review** (Examiner) pour ouvrir un tiroir avec les différences champ par champ, les aperçus des fichiers et un aperçu en lecture seule de l'élément. Utilisez les raccourcis clavier **a**/**r** pour approuver ou rejeter, et **j**/**k** pour passer à la soumission suivante ou précédente sans quitter le tiroir. Pour rejeter, vous devez choisir un motif (par exemple qualité, doublon, licence, ccli, ai ou hors sujet) et ajouter une note.

### Reports

L'onglet Reports traite les signalements de droits d'auteur et de politique/qualité déposés contre des ressources déjà publiées, répartis dans les files séparées Copyright et Policy & Other, ainsi que dans un historique Resolved. Prenez en charge un signalement pour commencer à le traiter, puis résolvez-le avec une décision (upheld, dismissed ou duplicate) et une action (none, unpublish ou remove).

### Assets

L'onglet Assets est un navigateur consultable du contenu publié, avec des actions pour **Feature** (mettre en avant) une ressource (elle apparaît alors sur la page d'accueil du produit), **Unpublish**/**Republish** (dépublier/republier) ou **Remove** (supprimer) avec un motif de droits d'auteur ou de politique.

Pour les chansons en particulier, c'est aussi ici qu'une chanson devient **Sunday-ready** (prête pour le dimanche) et peut apparaître dans la recherche de chansons de B1 Admin d'une église : un réviseur ouvre la ressource et marque chaque tonalité publiée comme **Listened** (écoutée) une fois qu'il l'a écoutée en entier et confirmé que la partition, les accords et les diapositives sont tous présents. Une chanson ne devient prête pour le dimanche que lorsque toutes les tonalités sont cochées.

:::info
La modération Commons est réservée au personnel — les églises individuelles ne voient jamais cette file. Le seul endroit où B1 Admin d'une église touche aux données Commons est la section « WorshipCommons — gratuit » de la [recherche de chansons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), qui n'affiche que les chansons déjà passées par ce processus de révision.
:::

Consultez la page [Architecture de Content Commons](/docs/developer/architecture/commons) pour le modèle de données sous-jacent et le cycle de vie des soumissions.

## Approbation de l'e-mail de groupe

Les églises ne peuvent pas envoyer d'e-mails rédigés par l'église (e-mails de groupe, suivis de formulaires, e-mails de workflow et invitations de compte) tant qu'un administrateur serveur ne les a pas approuvées. Cela empêche les églises enregistrées par des robots d'utiliser l'adresse d'envoi partagée de ChurchApps pour envoyer du spam.

1. Ouvrez l'onglet **Churches** (Églises) dans le panneau Server Admin.
2. Chaque église affiche une pastille **Group Email** : **Approved** (vert) ou **Not approved** (contour).
3. Cliquez sur la pastille et confirmez pour approuver l'église, ou pour révoquer une approbation.

Le personnel de l'église demande l'approbation avec le bouton **Request review** (Demander un examen) dans la boîte de dialogue Send Email de B1 Admin. La demande est envoyée par e-mail à l'adresse de support et indique le nom de l'église, son identifiant, sa date d'inscription, son emplacement et la personne qui l'a demandée. Une église ne peut envoyer qu'une demande par semaine. Consultez [Limites des e-mails rédigés par l'église](/docs/developer/architecture/notifications#church-authored-email-limits) pour le quota quotidien et la suspension automatique en cas de rebonds ou de plaintes.

## Migrations de base de données {#database-migrations}

Le workflow **Deploy Prod** applique lui-même les migrations en attente. Les bases de données hébergées n'acceptent les connexions que depuis le réseau de l'Api, de sorte qu'un runner GitHub ne peut pas les atteindre ; à la place, immédiatement après `serverless deploy`, le workflow invoque la fonction Lambda `migrate` de l'Api (`api-Prod-migrate`), qui exécute les migrations en attente de chaque module avec le même runner que cet onglet, et fait échouer le déploiement si un module provoque une erreur ou est refusé. **Rollback Prod** ne restaure que le code de la Lambda ; les migrations déjà appliquées restent appliquées. L'onglet **Database Migrations** sert à vérifier l'état, à exécuter ce qu'un déploiement n'a pas fait (par exemple sur l'environnement de démo, dont le déploiement n'effectue pas de migration), et à initialiser l'historique des modules qui n'en ont pas. (Les installations Docker auto-hébergées exécutent toujours les migrations automatiquement au démarrage du conteneur de l'Api.)

L'onglet affiche l'environnement actuel et une ligne par module (membership, attendance, giving, etc.) avec son état, le nombre de migrations appliquées et en attente, et la dernière migration appliquée.

- **Run Pending Migrations** (Exécuter les migrations en attente) applique toutes les migrations en attente, un module à la fois, dans l'ordre. Il s'arrête à la première erreur et indique ce qui a été appliqué pour chaque module.
- Un module marqué **No history** (Pas d'historique) possède une base de données antérieure au suivi des migrations. Il n'est jamais exécuté automatiquement, car cela rejouerait d'anciennes migrations de données sur des tables en production. Cliquez plutôt sur **Check Schema** (Vérifier le schéma) pour ce module. L'Api compare les tables, colonnes et index créés par chaque migration avec la base de données en production, puis marque chaque migration **Already applied** (Déjà appliquée), **Missing** (Manquante), **Partly applied** (Partiellement appliquée) ou **Data only** (Données uniquement). La vérification ne modifie rien.
- Dans les résultats de vérification, **Record as Already Applied** (Enregistrer comme déjà appliquée) inscrit les migrations détectées dans l'historique des migrations sans les exécuter (après confirmation). Tout ce qui précède la dernière migration **Already applied** est enregistré, y compris les migrations **Data only** de cette plage ; les migrations **Missing** restent en attente et peuvent ensuite être exécutées normalement avec **Run Pending Migrations**.
- Une migration **Partly applied** bloque l'enregistrement. Si la migration peut être réexécutée sans risque (lisez-la d'abord), cochez **Re-run** (Réexécuter) afin qu'elle reste en attente et s'exécute à nouveau depuis le début.

Le panneau Server Admin et la CLI (`yarn migrate:up`) utilisent le même migrateur Kysely et la même table `kysely_migration`, de sorte qu'ils s'accordent toujours sur ce qui a été appliqué. Les points de terminaison sous-jacents sont `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` et `POST .../:module/baseline`, tous réservés à Server.Admin.

## Pages associées

- [Authentification et permissions](/docs/developer/api/endpoints/authentication) — Modèle de permissions et authentification JWT
- [Points de terminaison Membership](/docs/developer/api/endpoints/membership) — API de gestion des utilisateurs et des églises
- [Journal d'audit](/docs/b1-admin/reports/audit-log) — Consulter les journaux d'activité d'une église
- [Architecture de Content Commons](/docs/developer/architecture/commons) — Modèle de ressources partagées et cycle de modération
