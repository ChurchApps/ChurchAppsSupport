---
title: "Administration du serveur"
---

# Administration du serveur

<div class="article-intro">

Les fonctions d'administration du serveur de ChurchApps ne sont accessibles qu'aux utilisateurs disposant de l'autorisation **Server.Admin**. Ces outils servent aux opérations de la plateforme, au soutien et au dépannage pour toutes les églises du système.

</div>

:::warning Accès restreint
Les fonctions décrites sur cette page exigent l'autorisation **Server.Admin** et ne sont pas accessibles aux administrateurs d'église ordinaires. Elles sont destinées uniquement aux opérateurs de la plateforme et au personnel de soutien.
:::

## Accéder à l'administration du serveur

Les utilisateurs disposant de l'autorisation Server.Admin peuvent accéder au panneau d'administration du serveur depuis B1 Admin :

1. Connectez-vous à [admin.b1.church](https://admin.b1.church)
2. Ouvrez le [menu de navigation rapide](../b1-admin/introduction.md#getting-around-with-the-jump-menu), développez **Paramètres**, puis cliquez sur **Administration du serveur**. (Vous pouvez aussi aller directement à `admin.b1.church/admin`.)
3. Le panneau d'administration du serveur liste ses sections à gauche, en trois groupes : **Répertoire** (Églises, Utilisateurs, Se faire passer pour un utilisateur), **Opérations** (Tâches en arrière-plan, Commons, Tendances d'utilisation) et **Système** (Recherches de traduction, Santé du serveur, Migrations de base de données)

## Réinitialiser la connexion à deux facteurs

Si un utilisateur a activé la [connexion à deux facteurs](../b1-admin/profile/managing-profile.md#two-factor-sign-in) et a perdu à la fois son téléphone et ses codes de secours, un administrateur du serveur peut la désactiver :

1. Ouvrez la section **Utilisateurs** du panneau d'administration du serveur et recherchez l'utilisateur.
2. Les utilisateurs dotés de la connexion à deux facteurs affichent un badge **Deux facteurs activé**. Cliquez sur **Réinitialiser 2FA** à côté.
3. Confirmez l'invite. Ne le faites qu'après avoir confirmé l'identité de la personne avec qui vous communiquez.

L'utilisateur peut alors se connecter avec son seul mot de passe et configurer à nouveau la connexion à deux facteurs depuis son profil. Les réinitialisations sont consignées dans le journal d'audit sous `mfa_reset`. Le point de terminaison est `POST /membership/users/mfa/reset/:userId` et exige Server.Admin.

## Se faire passer pour un utilisateur

La fonction de substitution permet aux administrateurs du serveur de se connecter sous l'identité d'un autre utilisateur à des fins de soutien et de dépannage. C'est utile pour enquêter sur les problèmes signalés par les utilisateurs ou pour aider les églises à configurer leurs systèmes.

### Comment se faire passer pour un utilisateur

1. Ouvrez la section **Se faire passer pour un utilisateur** du panneau d'administration du serveur
2. Saisissez le nom ou l'adresse courriel de l'utilisateur dans le champ de recherche
3. Cliquez sur **Rechercher** ou appuyez sur Entrée
4. Dans les résultats de recherche, cliquez sur l'utilisateur à substituer
5. Confirmez la substitution dans la boîte de dialogue qui s'affiche
6. Vous serez connecté sous ce compte et redirigé vers son espace

### Remarques importantes

- La substitution crée une nouvelle session avec les autorisations et l'accès aux églises de l'utilisateur ciblé
- Votre session d'administrateur d'origine prend fin lorsque vous vous faites passer pour un autre utilisateur
- Toutes les actions effectuées pendant la substitution sont consignées dans la piste d'audit
- Pour revenir à votre compte d'administrateur, déconnectez-vous puis reconnectez-vous avec vos identifiants
- N'utilisez la substitution que lorsque c'est nécessaire à des fins de soutien, et informez toujours les utilisateurs lorsque vous accédez à leur compte pour le soutien

### Point de terminaison de l'API

La fonction de substitution repose sur le point de terminaison `/users/:userId/impersonate` de l'API Membership. Voir [Points de terminaison Membership](/docs/developer/api/endpoints/membership#users) pour les détails techniques.

### Considérations de sécurité

- La substitution exige l'autorisation Server.Admin — cette autorisation doit être accordée avec parcimonie et seulement à des opérateurs de plateforme de confiance
- Tous les événements de substitution sont consignés avec l'identifiant de l'administrateur et celui de l'utilisateur ciblé
- Les églises ne sont pas avisées lorsqu'une substitution a lieu ; établissez donc des règles claires sur le moment et la façon d'utiliser cette fonction
- Envisagez de consigner les événements de substitution dans votre système de tickets de soutien pour en garder la trace

## Modération de Commons

Commons est la file de modération partagée pour le contenu soumis par les utilisateurs, à travers les produits : les chants de WorshipCommons, les leçons de Lessons.church, les modèles FreeShow et les modèles du générateur de site web de B1 passent tous par la même file, au lieu d'outils de révision distincts pour chaque produit.

### Accéder à Commons

1. Ouvrez l'onglet **Commons** du panneau d'administration du serveur.
2. Vous verrez trois sous-onglets : **File**, **Signalements** et **Ressources**.

Un rôle limité de **éditeur musical** peut aussi voir l'onglet File, mais ne peut pas approuver les soumissions qui modifient les droits ou la licence d'un chant.

### File

La file liste toutes les soumissions en attente de tous les produits, filtrables par produit et par type de ressource. Chaque ligne indique s'il s'agit d'une nouvelle ressource, d'une modification par son auteur initial ou d'une modification par un tiers, ainsi que les antécédents d'approbation de la personne qui a soumis et le temps d'attente de la soumission (signalé une fois qu'elle dépasse 72 heures).

Cliquez sur **Examiner** pour ouvrir un tiroir avec les différences champ par champ, les aperçus de fichiers et un aperçu intégré en lecture seule de l'élément. Utilisez les raccourcis clavier **a** / **r** pour approuver ou rejeter, et **j** / **k** pour passer à la soumission suivante ou précédente sans quitter le tiroir. Pour rejeter, il faut choisir un motif (par exemple qualité, doublon, licence, ccli, ia ou hors sujet) et ajouter une note.

### Signalements

L'onglet Signalements gère les signalements de droits d'auteur et de politique ou de qualité déposés contre des ressources déjà publiées, répartis entre les files séparées Droits d'auteur et Politique et autres, plus un historique des signalements réglés. Prenez en charge un signalement pour commencer à le traiter, puis réglez-le avec une résolution (maintenu, rejeté ou doublon) et une action (aucune, dépublier ou retirer).

### Ressources

L'onglet Ressources est un répertoire consultable des contenus publiés, avec des actions pour **Mettre en vedette** une ressource (la met en valeur sur la page d'accueil du produit), **Dépublier**/**Republier** ou **Retirer** (avec un motif de droits d'auteur ou de politique).

Pour les chants en particulier, c'est aussi ici qu'un chant devient **prêt pour le dimanche** et admissible à apparaître dans la recherche de chants de B1 Admin d'une église : un réviseur ouvre la ressource et marque chaque tonalité publiée comme **Écouté** une fois qu'il l'a écoutée en entier et qu'il a confirmé que la partition, les accords et les diapositives sont tous présents. Un chant ne devient prêt pour le dimanche que lorsque chaque tonalité est cochée.

:::info
La modération de Commons est réservée au personnel — les églises individuelles ne voient jamais cette file. Le seul endroit où le B1 Admin d'une église touche aux données de Commons est la section « WorshipCommons — gratuit » de la [recherche de chants](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), qui n'affiche que les chants déjà passés par ce processus de révision.
:::

Voir la page [Architecture de Commons pour le contenu](/docs/developer/architecture/commons) pour le modèle de données sous-jacent et le cycle de vie des soumissions.

## Approbation des courriels de groupe

Les églises ne peuvent pas envoyer de courriels rédigés par l'église (courriels de groupe, suivis de formulaires, courriels de flux de travail et invitations de comptes) tant qu'un administrateur du serveur ne les a pas approuvées. Cela empêche les églises inscrites par des robots d'utiliser l'adresse d'envoi partagée de ChurchApps pour le pourriel.

1. Ouvrez l'onglet **Églises** du panneau d'administration du serveur.
2. Chaque église affiche une pastille **Courriel de groupe** : **Approuvée** (verte) ou **Non approuvée** (contour seulement).
3. Cliquez sur la pastille et confirmez pour approuver l'église, ou pour révoquer une approbation.

Le personnel des églises demande l'approbation avec le bouton **Demander un examen** de la boîte de dialogue Envoyer un courriel de B1 Admin. La demande est envoyée par courriel à l'adresse de soutien et indique le nom de l'église, son identifiant, sa date d'inscription, son emplacement et la personne qui a fait la demande. Une église peut envoyer une seule demande par semaine. Voir [Limites des courriels rédigés par l'église](/docs/developer/architecture/notifications#church-authored-email-limits) pour l'allocation quotidienne et la suspension automatique en cas de rebonds et de plaintes.

## Migrations de base de données {#database-migrations}

Le flux de travail **Deploy Prod** applique lui-même les migrations en attente. Les bases de données hébergées n'acceptent les connexions que depuis le réseau de l'API ; un exécuteur GitHub ne peut donc pas les atteindre. À la place, juste après `serverless deploy`, le flux de travail invoque la fonction Lambda `migrate` de l'API (`api-Prod-migrate`), qui exécute les migrations en attente de chaque module avec le même exécuteur que cet onglet, et fait échouer le déploiement si un module est en erreur ou refuse. **Rollback Prod** ne revient que sur le code Lambda ; les migrations appliquées restent appliquées. L'onglet **Migrations de base de données** sert à vérifier l'état, à lancer ce qu'un déploiement n'a pas fait (par exemple sur l'environnement de démonstration, dont le déploiement ne migre pas), et à établir une base de référence pour les modules sans historique. (Les installations Docker auto-hébergées exécutent toujours les migrations automatiquement au démarrage du conteneur de l'API.)

L'onglet affiche l'environnement actuel et une ligne par module (membership, attendance, giving, etc.) avec son état, le nombre de migrations appliquées et en attente, et la dernière appliquée.

- **Exécuter les migrations en attente** applique chaque migration en attente, un module à la fois, dans l'ordre. Il s'arrête à la première erreur et affiche ce qui a été appliqué pour chaque module.
- Un module marqué **Aucun historique** possède une base de données antérieure au suivi des migrations. Il n'est jamais exécuté automatiquement, car cela rejouerait d'anciennes migrations de données sur des tables en service. Cliquez plutôt sur **Vérifier le schéma** pour ce module. L'API compare les tables, colonnes et index que crée chaque migration avec la base de données en service, et marque chaque migration comme **Déjà appliquée**, **Manquante**, **Partiellement appliquée** ou **Données seulement**. La vérification ne modifie rien.
- Dans les résultats de vérification, **Enregistrer comme déjà appliquées** inscrit les migrations détectées dans l'historique des migrations sans les exécuter (après confirmation). Tout ce qui précède la dernière migration **Déjà appliquée** est enregistré, y compris les migrations **Données seulement** de cette plage ; les migrations **Manquantes** restent en attente et peuvent ensuite être exécutées normalement avec **Exécuter les migrations en attente**.
- Une migration **Partiellement appliquée** bloque l'enregistrement. Si la migration peut être rejouée sans risque (lisez-la d'abord), cochez **Rejouer** pour qu'elle reste en attente et s'exécute de nouveau depuis le début.

Le panneau d'administration du serveur et la CLI (`yarn migrate:up`) utilisent le même migrateur Kysely et la même table `kysely_migration`, de sorte qu'ils s'accordent toujours sur ce qui a été appliqué. Les points de terminaison sous-jacents sont `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` et `POST .../:module/baseline`, tous réservés à Server.Admin.

## Pages connexes

- [Authentification et autorisations](/docs/developer/api/endpoints/authentication) — modèle d'autorisations et authentification JWT
- [Points de terminaison Membership](/docs/developer/api/endpoints/membership) — API de gestion des utilisateurs et des églises
- [Journal d'audit](/docs/b1-admin/reports/audit-log) — consulter l'activité d'une église
- [Architecture de Commons pour le contenu](/docs/developer/architecture/commons) — modèle de ressources partagées et cycle de modération
