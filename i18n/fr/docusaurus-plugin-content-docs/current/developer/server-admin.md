---
title: "Administration du serveur"
---

# Administration du serveur

<div class="article-intro">

Les fonctionnalités d'administration du serveur dans ChurchApps ne sont disponibles que pour les utilisateurs disposant de la permission **Server.Admin**. Ces outils sont utilisés pour les opérations de plateforme, le support et le dépannage dans toutes les églises du système.

</div>

:::warning Accès restreint
Les fonctionnalités décrites sur cette page nécessitent la permission **Server.Admin** et ne sont pas disponibles pour les administrateurs d'église réguliers. Elles sont destinées uniquement aux opérateurs de plateforme et au personnel de support.
:::

## Accès à l'administration du serveur

Les utilisateurs disposant de la permission Server.Admin peuvent accéder au panneau d'administration du serveur à partir de B1 Admin :

1. Connectez-vous à [admin.b1.church](https://admin.b1.church)
2. Ouvrez le [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), développez **Settings**, et cliquez sur **Server Admin**. (Vous pouvez aussi aller directement à `admin.b1.church/admin`.)
3. Le panneau Server Admin contient des sections pour Churches, Users, Impersonate User, Background Jobs, Commons, Usage Trends, Translation Lookups, Server Health, et Database Migrations

## Usurpation d'utilisateur

La fonctionnalité d'usurpation permet aux administrateurs serveur de se connecter en tant qu'un autre utilisateur à des fins de support et de dépannage. C'est utile pour enquêter sur les problèmes signalés par l'utilisateur ou aider les églises à configurer leurs systèmes.

### Comment usurper un utilisateur

1. Ouvrez la section **Impersonate User** du panneau Server Admin
2. Entrez le nom ou l'adresse email de l'utilisateur dans le champ de recherche
3. Cliquez sur **Search** ou appuyez sur Entrée
4. Dans les résultats de recherche, cliquez sur l'utilisateur que vous souhaitez usurper
5. Confirmez l'usurpation dans la boîte de dialogue qui apparaît
6. Vous serez connecté en tant que cet utilisateur et redirigé vers son compte

### Notes importantes

- L'usurpation crée une nouvelle session avec les permissions et l'accès à l'église de l'utilisateur cible
- Votre session d'administration d'origine se termine quand vous usurpez un autre utilisateur
- Toutes les actions prises lors de l'usurpation sont enregistrées dans la piste d'audit
- Pour revenir à votre compte d'administration, déconnectez-vous et reconnectez-vous avec vos identifiants
- N'utilisez l'usurpation que lorsque c'est nécessaire à des fins de support et informez toujours les utilisateurs quand vous accédez à leurs comptes pour le support

### Point de terminaison API

La fonctionnalité d'usurpation est soutenue par le point de terminaison `/users/:userId/impersonate` dans l'API d'adhésion. Voir [Membership Endpoints](/docs/developer/api/endpoints/membership#users) pour les détails techniques.

### Considérations de sécurité

- L'usurpation nécessite la permission Server.Admin - cette permission doit être accordée avec parcimonie et uniquement aux opérateurs de plateforme de confiance
- Tous les événements d'usurpation sont enregistrés avec l'ID d'utilisateur d'administration et l'ID d'utilisateur cible
- Les églises ne sont pas notifiées quand l'usurpation se produit, donc établissez une politique claire pour le moment et la façon dont cette fonctionnalité doit être utilisée
- Envisagez de documenter les événements d'usurpation dans votre système de ticket de support pour l'accountability

## Modération des Commons

Commons est la file d'attente de modération partagée pour le contenu soumis par l'utilisateur sur tous les produits — les chansons WorshipCommons, les leçons Lessons.church, les modèles FreeShow, et les modèles du constructeur de sites Web B1 passent tous par la même file d'attente au lieu d'outils d'examen distincts par produit.

### Accès à Commons

1. Accédez à l'onglet **Commons** du panneau Server Admin.
2. Vous verrez trois sous-onglets : **Queue**, **Reports**, et **Assets**.

Un rôle **music editor** limité peut aussi voir l'onglet Queue, mais est bloqué par l'approbation des soumissions qui modifient les droits ou la licence d'une chanson.

### File d'attente

La file d'attente énumère chaque soumission en attente sur tous les produits, filtrables par produit et type d'actif. Chaque ligne montre si la soumission est un nouvel actif, une édition par son auteur d'origine, ou une édition par un tiers, ainsi que le dossier d'approbation du soumettant et combien de temps la soumission attend (signalée une fois qu'elle dépasse 72 heures).

Cliquez sur **Review** pour ouvrir un tiroir avec des diffs au niveau des champs, des aperçus de fichiers, et un aperçu intégré en lecture seule de l'article. Utilisez les raccourcis clavier **a**/**r** pour approuver ou rejeter, et **j**/**k** pour passer à la soumission suivante ou précédente sans quitter le tiroir. Rejeter nécessite de sélectionner une raison (par exemple qualité, doublure, licence, ccli, ia, ou hors sujet) et une note.

### Rapports

L'onglet Rapports gère les droits d'auteur et les rapports de politique/qualité déposés contre les actifs déjà publiés, divisés en files d'attente Copyright et Policy & Other distinctes plus un historique Resolved. Réclamez un rapport pour commencer à le traiter, puis résolvez-le avec une résolution (maintenue, rejetée, ou doublure) et une action (aucune, annulation de publication, ou suppression).

### Actifs

L'onglet Assets est un navigateur interrogeable du contenu publié avec actions pour **Feature** un actif (le met en évidence sur la page d'accueil du produit), **Unpublish**/**Republish** it, ou **Remove** it (avec une raison de droits d'auteur ou de politique).

Pour les chansons spécifiquement, c'est aussi ici qu'une chanson devient **Sunday-ready** et admissible à apparaître dans la recherche de chansons B1 Admin d'une église : un reviewer ouvre l'actif et marque chaque clé publiée comme **Listened** une fois qu'il l'a écoutée et confirmé que le score, les accords, et les slides sont tous présents. Une chanson ne devient Sunday-ready qu'une fois chaque clé cochée.

:::info
La modération Commons est réservée au personnel — les églises individuelles ne voient jamais cette file d'attente. L'endroit où l'administration B1 d'une église individuelle touche les données Commons est la section « WorshipCommons — free » de la [recherche de chansons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), qui ne présente que les chansons qui ont déjà traversé ce processus d'examen.
:::

Voir la page [architecture Content Commons](/docs/developer/architecture/commons) pour le modèle de données sous-jacent et le cycle de vie de la soumission.

## Approbation d'email de groupe

Les églises ne peuvent pas envoyer d'email rédigé par l'église (email de groupe, suivis de formulaire, emails de workflow, et invitations de compte) tant qu'un administrateur serveur ne les approuve pas. Cela empêche les églises auto-enregistrées d'utiliser l'adresse d'envoi ChurchApps partagée pour le spam.

1. Ouvrez l'onglet **Churches** du panneau Server Admin.
2. Chaque église affiche une puce **Group Email** : **Approved** (vert) ou **Not approved** (outlined).
3. Cliquez sur la puce et confirmez pour approuver l'église, ou pour révoquer une approbation.

Le personnel d'église demande l'approbation avec le bouton **Request review** dans la boîte de dialogue Send Email de B1 Admin. La demande est envoyée par email à l'adresse de support et énumère le nom, l'ID, la date d'enregistrement, l'emplacement de l'église, et qui a demandé. Une église peut envoyer une demande par semaine. Voir [limites d'email rédigé par l'église](/docs/developer/architecture/notifications#church-authored-email-limits) pour l'allocation quotidienne et la pause automatique sur les rebonds et les plaintes.

## Migrations de base de données

Les déploiements ne modifient pas la base de données. Les bases de données hébergées n'acceptent que les connexions de l'intérieur du réseau de l'Api, donc après une version qui ajoute une migration, un administrateur serveur l'applique à partir de l'onglet **Database Migrations**. (Les installations Docker auto-hébergées exécutent toujours les migrations automatiquement quand le conteneur Api démarre.)

L'onglet affiche l'environnement actuel et une ligne par module (membership, attendance, giving, et ainsi de suite) avec son statut, le nombre de migrations appliquées et en attente, et la dernière appliquée.

- **Run Pending Migrations** applique chaque migration en attente, un module à la fois, dans l'ordre. Il s'arrête au premier échec et affiche ce qui a été appliqué pour chaque module.
- Un module marqué **No history** a une base de données qui précède le suivi des migrations. Il n'est jamais exécuté automatiquement, car cela rejuerait les anciennes migrations de données sur des tableaux en direct. Cliquez sur **Check Schema** sur ce module à la place. L'Api compare les tableaux, colonnes, et index que chaque migration crée avec la base de données en direct et marque chaque migration **Already applied**, **Missing**, **Partly applied**, ou **Data only**. Rien n'est changé par la vérification.
- Dans les résultats de vérification, **Record as Already Applied** écrit les migrations détectées dans l'historique de migration sans les exécuter (après une confirmation). Tout jusqu'à la dernière migration **Already applied** est enregistré, y compris les migrations **Data only** dans cette plage ; les migrations **Missing** restent en attente et peuvent ensuite être exécutées normalement avec **Run Pending Migrations**.
- Une migration **Partly applied** bloque l'enregistrement. Si la migration est sûre à exécuter à nouveau (lisez-la d'abord), cochez **Re-run** afin qu'elle reste en attente et s'exécute à nouveau du haut.

Le panneau Server Admin et l'CLI (`yarn migrate:up`) utilisent le même migrateur Kysely et la table `kysely_migration`, donc ils s'accordent toujours sur ce qui a été appliqué. Les points de terminaison de soutien sont `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, et `POST .../:module/baseline`, tous Server.Admin uniquement.

## Pages connexes

- [Authentification & Permissions](/docs/developer/api/endpoints/authentication) — Modèle de permission et authentification JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API de gestion des utilisateurs et des églises
- [Audit Log](/docs/b1-admin/reports/audit-log) — Afficher les journaux d'activité pour une église
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modèle d'actif partagé et cycle de vie de modération
