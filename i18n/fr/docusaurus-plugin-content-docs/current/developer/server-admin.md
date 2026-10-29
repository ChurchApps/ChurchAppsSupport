---
title: "Administration du serveur"
---

# Administration du serveur

<div class="article-intro">

Les fonctionnalités d'administration du serveur de ChurchApps ne sont accessibles qu'aux utilisateurs disposant de l'autorisation **Server.Admin**. Ces outils servent aux opérations de la plateforme, au soutien et au dépannage pour toutes les églises du système.

</div>

:::warning Accès restreint
Les fonctionnalités décrites sur cette page exigent l'autorisation **Server.Admin** et ne sont pas accessibles aux administrateurs ordinaires des églises. Elles sont destinées uniquement aux opérateurs de la plateforme et au personnel de soutien.
:::

## Accéder à l'administration du serveur

Les utilisateurs disposant de l'autorisation Server.Admin peuvent accéder au panneau d'administration du serveur depuis B1 Admin :

1. Connectez-vous à [admin.b1.church](https://admin.b1.church)
2. Ouvrez le [menu Accès rapide](../b1-admin/introduction.md#getting-around-with-the-jump-menu), développez **Paramètres**, et cliquez sur **Administration du serveur**. (Vous pouvez aussi aller directement à `admin.b1.church/admin`.)
3. Le panneau d'administration du serveur liste ses sections sur le côté gauche, en trois groupes : **Répertoire** (Églises, Utilisateurs, Se faire passer pour un utilisateur), **Opérations** (Tâches en arrière-plan, Commons, Tendances d'utilisation) et **Système** (Recherches de traduction, Santé du serveur, Migrations de base de données)

## Réinitialiser la connexion en deux étapes

Si un utilisateur a activé la [connexion en deux étapes](../b1-admin/profile/managing-profile.md#two-factor-sign-in) et a perdu à la fois son téléphone et ses codes de secours, un administrateur du serveur peut la désactiver :

1. Ouvrez la section **Utilisateurs** du panneau d'administration du serveur et recherchez l'utilisateur.
2. Les utilisateurs ayant la connexion en deux étapes affichent un badge **Connexion en deux étapes activée**. Cliquez sur **Réinitialiser 2FA** à côté.
3. Confirmez l'invite. Ne le faites qu'après avoir confirmé à qui vous parlez.

L'utilisateur peut alors se connecter avec son seul mot de passe et configurer à nouveau la connexion en deux étapes depuis son profil. Les réinitialisations sont inscrites dans le journal d'audit sous le nom `mfa_reset`. Le point de terminaison est `POST /membership/users/mfa/reset/:userId` et exige Server.Admin.

## Se faire passer pour un utilisateur

La fonctionnalité d'usurpation permet aux administrateurs du serveur de se connecter en tant qu'un autre utilisateur à des fins de soutien et de dépannage. C'est utile pour examiner les problèmes signalés par les utilisateurs ou aider les églises à configurer leurs systèmes.

### Comment se faire passer pour un utilisateur

1. Ouvrez la section **Se faire passer pour un utilisateur** du panneau d'administration du serveur
2. Saisissez le nom ou l'e-mail de l'utilisateur dans le champ de recherche
3. Cliquez sur **Rechercher** ou appuyez sur Entrée
4. Dans les résultats de recherche, cliquez sur l'utilisateur dont vous voulez prendre l'identité
5. Confirmez l'usurpation dans la boîte de dialogue qui apparaît
6. Vous serez connecté en tant que cet utilisateur et redirigé vers son compte

### Remarques importantes

- L'usurpation crée une nouvelle session avec les autorisations et l'accès aux églises de l'utilisateur cible
- Votre session d'administrateur d'origine prend fin lorsque vous vous faites passer pour un autre utilisateur
- Toutes les actions effectuées pendant l'usurpation sont consignées dans la piste d'audit
- Pour revenir à votre compte d'administrateur, déconnectez-vous et reconnectez-vous avec vos identifiants
- N'utilisez l'usurpation que lorsque cela est nécessaire à des fins de soutien, et informez toujours les utilisateurs lorsque vous accédez à leur compte pour un soutien

### Point de terminaison de l'API

La fonctionnalité d'usurpation repose sur le point de terminaison `/users/:userId/impersonate` de l'API Membership. Consultez [Points de terminaison Membership](/docs/developer/api/endpoints/membership#users) pour les détails techniques.

### Considérations de sécurité

- L'usurpation exige l'autorisation Server.Admin -- cette autorisation doit être accordée avec parcimonie et seulement à des opérateurs de plateforme de confiance
- Tous les événements d'usurpation sont consignés avec l'ID de l'administrateur et l'ID de l'utilisateur ciblé
- Les églises ne sont pas avisées lorsqu'une usurpation se produit ; établissez donc des politiques claires sur le moment et la manière d'utiliser cette fonctionnalité
- Envisagez de consigner les événements d'usurpation dans votre système de tickets de soutien pour en assurer la traçabilité

## Modération de Commons

Commons est la file de modération partagée pour le contenu soumis par les utilisateurs à travers les produits -- les chants de WorshipCommons, les leçons de Lessons.church, les gabarits de FreeShow et les gabarits du constructeur de site web de B1 passent tous par la même file au lieu d'outils d'examen distincts par produit.

### Accéder à Commons

1. Accédez à l'onglet **Commons** du panneau d'administration du serveur.
2. Vous verrez trois sous-onglets : **File**, **Signalements** et **Ressources**.

Un rôle limité de **éditeur de musique** peut aussi voir l'onglet File, mais il ne peut pas approuver les soumissions qui modifient les droits ou la licence d'un chant.

### File

La file liste chaque soumission en attente de tous les produits, filtrable par produit et par type de ressource. Chaque ligne indique si la soumission est une nouvelle ressource, une modification par son auteur d'origine ou une modification par un tiers, ainsi que le bilan d'approbation de l'auteur de la soumission et le temps d'attente de la soumission (signalé une fois qu'elle dépasse 72 heures).

Cliquez sur **Examiner** pour ouvrir un tiroir avec les différences champ par champ, les aperçus de fichiers et un aperçu intégré en lecture seule de l'élément. Utilisez les raccourcis clavier **a** / **r** pour approuver ou rejeter, et **j** / **k** pour passer à la soumission suivante ou précédente sans quitter le tiroir. Le rejet exige de choisir une raison (par exemple qualité, doublon, licence, ccli, ia ou hors sujet) ainsi qu'une note.

### Signalements

L'onglet Signalements traite les signalements de droits d'auteur et de politique/qualité déposés contre des ressources déjà publiées, répartis entre les files séparées Droits d'auteur et Politique et autres, ainsi qu'un historique des signalements résolus. Réclamez un signalement pour commencer à le traiter, puis résolvez-le avec une résolution (maintenu, rejeté ou doublon) et une action (aucune, dépublier ou retirer).

### Ressources

L'onglet Ressources est un navigateur consultable du contenu publié, avec des actions pour **Mettre en vedette** une ressource (la met en évidence sur la page d'accueil du produit), **Dépublier**/**Republier** et **Retirer** (avec une raison de droits d'auteur ou de politique).

Pour les chants en particulier, c'est aussi là qu'un chant devient **prêt pour le dimanche** et admissible à figurer dans la recherche de chants de B1 Admin d'une église : un réviseur ouvre la ressource et marque chaque tonalité publiée comme **Écouté** une fois qu'il l'a écoutée en entier et confirmé que la partition, les accords et les diapositives sont tous présents. Un chant ne devient prêt pour le dimanche qu'une fois chaque tonalité cochée.

:::info
La modération de Commons est réservée au personnel -- les églises individuelles ne voient jamais cette file. Le seul endroit où B1 Admin d'une église touche aux données de Commons est la section « WorshipCommons -- gratuit » de la [recherche de chants](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), qui ne montre que les chants ayant déjà passé ce processus d'examen.
:::

Consultez la page [Architecture de Content Commons](/docs/developer/architecture/commons) pour le modèle de données sous-jacent et le cycle de vie des soumissions.

## Approbation de l'e-mail de groupe

Les églises ne peuvent pas envoyer d'e-mail rédigé par l'église (e-mail de groupe, suivis de formulaires, e-mails de flux de travail et invitations de comptes) tant qu'un administrateur du serveur ne l'a pas approuvé. Cela empêche les églises inscrites par des robots d'utiliser l'adresse d'envoi partagée de ChurchApps pour envoyer du pourriel.

1. Ouvrez l'onglet **Églises** du panneau d'administration du serveur.
2. Chaque église affiche une pastille **E-mail de groupe** : **Approuvé** (vert) ou **Non approuvé** (contour seulement).
3. Cliquez sur la pastille et confirmez pour approuver l'église, ou pour révoquer une approbation.

Le personnel des églises demande l'approbation avec le bouton **Demander un examen** de la boîte de dialogue Envoyer un e-mail de B1 Admin. La demande est envoyée par e-mail à l'adresse de soutien et indique le nom de l'église, son ID, sa date d'inscription, son emplacement et la personne qui l'a demandée. Une église peut envoyer une demande par semaine. Consultez [Limites des e-mails rédigés par l'église](/docs/developer/architecture/notifications#church-authored-email-limits) pour le quota quotidien et la pause automatique en cas de rejets ou de plaintes.

## Migrations de base de données

Le flux de travail **Deploy Prod** applique lui-même les migrations en attente. Les bases de données hébergées n'acceptent les connexions que depuis le réseau de l'Api, de sorte qu'un exécuteur GitHub ne peut pas les joindre ; à la place, juste après `serverless deploy`, le flux de travail invoque la fonction Lambda `migrate` de l'Api (`api-Prod-migrate`), qui exécute les migrations en attente de chaque module avec le même exécuteur que cet onglet, et fait échouer le déploiement si un module provoque une erreur ou est refusé. **Rollback Prod** ne rétablit que le code de la Lambda ; les migrations déjà appliquées restent appliquées. L'onglet **Migrations de base de données** sert à consulter l'état, à lancer toute migration qu'un déploiement n'a pas exécutée (par exemple sur l'environnement de démonstration, dont le déploiement ne migre pas) et à établir une base de référence pour les modules sans historique.

L'onglet affiche l'environnement actuel et une ligne par module (membership, attendance, giving, etc.) avec son état, le nombre de migrations appliquées et en attente, et la dernière migration appliquée.

- **Exécuter les migrations en attente** applique toutes les migrations en attente, un module à la fois, dans l'ordre. Il s'arrête à la première erreur et affiche ce qui a été appliqué pour chaque module.
- Un module marqué **Aucun historique** possède une base de données antérieure au suivi des migrations. Il n'est jamais exécuté automatiquement, car cela rejouerait d'anciennes migrations de données sur des tables en production. Cliquez plutôt sur **Vérifier le schéma** pour ce module. L'Api compare les tables, colonnes et index que crée chaque migration avec la base de données en production, et marque chaque migration **Déjà appliquée**, **Manquante**, **Partiellement appliquée** ou **Données seulement**. La vérification ne modifie rien.
- Dans les résultats de la vérification, **Enregistrer comme déjà appliquées** inscrit les migrations détectées dans l'historique des migrations sans les exécuter (après une confirmation). Tout ce qui précède la dernière migration **Déjà appliquée** est enregistré, y compris les migrations **Données seulement** de cette plage ; les migrations **Manquantes** restent en attente et peuvent alors être exécutées normalement avec **Exécuter les migrations en attente**.
- Une migration **Partiellement appliquée** bloque l'enregistrement. Si la migration peut être réexécutée sans danger (lisez-la d'abord), cochez **Réexécuter** pour qu'elle reste en attente et s'exécute de nouveau depuis le début.

Le panneau d'administration du serveur et la CLI (`yarn migrate:up`) utilisent le même migrateur Kysely et la même table `kysely_migration`, de sorte qu'ils s'accordent toujours sur ce qui a été appliqué. Les points de terminaison sous-jacents sont `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` et `POST .../:module/baseline`, tous réservés à Server.Admin.

## Pages connexes

- [Authentification et autorisations](/docs/developer/api/endpoints/authentication) — modèle d'autorisations et authentification JWT
- [Points de terminaison Membership](/docs/developer/api/endpoints/membership) — API de gestion des utilisateurs et des églises
- [Journal d'audit](/docs/b1-admin/reports/audit-log) — consulter l'activité d'une église
- [Architecture de Content Commons](/docs/developer/architecture/commons) — modèle de ressource partagée et cycle de vie de la modération
