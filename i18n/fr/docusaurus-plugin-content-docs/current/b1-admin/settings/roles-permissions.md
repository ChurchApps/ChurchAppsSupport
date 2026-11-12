---
title: "Rôles et autorisations"
description: "Configurez les rôles dans B1 Admin pour contrôler ce que le personnel et les bénévoles peuvent voir et modifier, des dons et présences aux personnes et groupes."
---

# Rôles et autorisations

<div class="article-intro">

Les rôles vous permettent de contrôler ce à quoi les différents utilisateurs ont accès dans votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de l'équipe, chacun avec son propre niveau d'accès afin de protéger vos données.

</div>

## Vidéo de formation {#training-video}

<YouTube id="ZzCIkinVMnE" title="Rôles, autorisations et inviter votre équipe dans B1" next="Configurer les services et les présences dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'accès Administrateur du domaine ou d'un rôle autorisé à gérer les rôles
- Ayez une liste des membres de votre équipe et des domaines auxquels ils ont besoin d'accéder
- Consultez les catégories d'autorisations disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles {#accessing-roles}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles actuellement définis pour votre église. La colonne **Membres** indique combien d'utilisateurs se trouvent dans chaque rôle, et la ligne **(Tout le monde)** indique **Tous les utilisateurs**.

## Créer un rôle {#creating-a-role}

Cliquez sur **Ajouter un rôle** en haut de la page Rôles. Le menu propose :

- **Ajouter un rôle personnalisé** -- Ouvre un formulaire **Modifier le rôle** au-dessus de la liste. Saisissez un **nom de rôle** et cliquez sur **Enregistrer**. Le nouveau rôle commence sans aucune autorisation.
- **Ajouter le rôle « Comptabilité »**, **Ajouter le rôle « Personnel de l'église »**, **Ajouter le rôle « Administrateur du contenu »** et **Ajouter le rôle « Administrateur des leçons »** -- Des rôles prêts à l'emploi, avec un ensemble cohérent d'autorisations déjà cochées. B1 vous demande de confirmer, puis crée le rôle. Vous pouvez ensuite modifier ses autorisations comme pour tout autre rôle.

## Renommer ou supprimer un rôle {#renaming-or-deleting-a-role}

Survolez la ligne d'un rôle et cliquez sur **Modifier**. Dans le formulaire **Modifier le rôle**, changez le **nom du rôle** et cliquez sur **Enregistrer**, ou cliquez sur **Supprimer** et confirmez pour retirer le rôle. Le rôle **Administrateurs du domaine** ne peut pas être supprimé.

## Comprendre la page d'un rôle {#understanding-a-roles-page}

Cliquez sur le nom d'un rôle pour ouvrir sa page. Elle comporte deux panneaux :

- **Membres** (à gauche) -- Les personnes du rôle, avec leur nom et leur courriel.
- **Modifier les autorisations** (à droite) -- Les autorisations que vous pouvez accorder au rôle.

La ligne **(Tout le monde)** ouvre une page pour les autorisations qui s'appliquent à chaque utilisateur de votre église ; elle n'a pas de liste de membres.

## Ajouter des utilisateurs à un rôle {#adding-users-to-a-role}

1. Ouvrez le rôle et cliquez sur **Ajouter** dans le panneau **Membres**. Un formulaire **Ajouter à** pour ce rôle s'ouvre.
2. Saisissez un nom ou un courriel dans la zone de recherche et cliquez sur le bouton de recherche.
3. Cliquez sur le bouton d'ajout à côté de la personne. Elle est ajoutée au rôle immédiatement, et B1 vous propose de lui envoyer un courriel d'invitation pour qu'elle puisse se connecter.
4. Si la personne ne figure pas encore dans votre église, cliquez sur **Créer un nouvel utilisateur** sous les résultats de recherche, saisissez son **prénom**, son **nom** et son **courriel**, puis cliquez sur **Enregistrer**.

Pour modifier le nom ou le courriel d'un membre, cliquez sur l'icône de modification dans sa ligne.

## Retirer des utilisateurs d'un rôle {#removing-users-from-a-role}

1. Ouvrez le rôle contenant l'utilisateur à retirer.
2. Repérez la personne dans la liste **Membres**.
3. Cliquez sur l'icône de suppression dans sa ligne et confirmez.

Votre église doit toujours avoir au moins un administrateur du domaine ; le dernier membre des **Administrateurs du domaine** ne peut donc pas être retiré.

## Configurer les autorisations {#configuring-permissions}

Chaque rôle peut se voir accorder l'accès à des domaines précis de B1 Admin. Dans le panneau **Modifier les autorisations**, les autorisations sont regroupées en sections que vous pouvez développer, comme **Présences**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez dans la zone **Filtrer les autorisations** pour n'afficher que celles qui correspondent.

Cochez ou décochez une autorisation pour l'accorder ou la retirer au rôle. Chaque modification est enregistrée immédiatement ; il n'y a pas de bouton Enregistrer. Notez que **Modifier les paramètres de l'église**, qui ouvre la page Paramètres, se trouve dans la section **Contenu**. Chaque titre de section indique combien de ses autorisations le rôle possède, par exemple **2 sur 5**, et ce compte se met à jour à mesure que vous cochez et décochez les cases.

### Autorisations liées aux dons {#donations-permissions}

La section **Dons** comporte ces autorisations :

- **Voir les sommaires de dons** -- voir la section Dons, y compris les pages Sommaire, Lots, Fonds, Campagnes et Relevés de dons.
- **Voir les dons** -- voir les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** -- contrôle complet : ajouter, modifier et supprimer des dons et des lots, et [fermer et rouvrir les lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir des dons** -- ajouter des lots et saisir, modifier ou supprimer des dons, mais uniquement dans les lots encore ouverts. Les personnes qui ne disposent que de cette autorisation ne peuvent pas supprimer des lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.
- **Modifier les paramètres** -- gérer les paramètres des dons.

Une personne qui dispose de **Saisir des dons** sans **Voir les sommaires de dons** ne voit que la page **Lots**, sous **Dons**. Donnez à une équipe de comptage à la fois **Saisir des dons** et **Voir les dons** afin qu'elle puisse ouvrir un lot et voir les dons qu'elle a saisis. Voir [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes seulement {#people-names-only}

La section **Personnes et groupes** comprend **Voir seulement les noms des personnes**. Utilisez-la pour les bénévoles qui doivent rechercher des personnes par nom -- par exemple, pour choisir quelqu'un dans une zone de recherche -- sans accès au répertoire complet. Avec cette autorisation seule, une personne :

- Peut rechercher des personnes par nom et voir la liste des personnes ajoutées récemment, mais ne voit que le nom, la photo et le statut de membre de chacune
- Ne peut pas rechercher par courriel, voir les coordonnées ni ouvrir le répertoire **Personnes**

Associez **Voir seulement les noms des personnes** à **Voir les présences** ou **Modifier les présences** pour les bénévoles qui prennent les présences en classe. **Personnes** dans leur menu ouvre alors **Groupes**, où ils peuvent ouvrir la liste **Tous les groupes** et voir les noms des membres et les séances de chaque classe. Avec **Modifier les présences**, ils peuvent aussi [enregistrer les présences](../attendance/recording-attendance.md) et ajouter des visiteurs en recherchant leurs noms. Les noms ne sont pas des liens vers les fiches des personnes, et les groupes confidentiels restent masqués sauf si le bénévole en est membre.

B1 Admin masque les liens et les boutons qui exigent des autorisations qu'un rôle ne possède pas. Par exemple, la liste **Tous les groupes** n'est accessible qu'aux personnes pouvant modifier les groupes, voir les membres des groupes ou voir les personnes, ou qui disposent de **Voir seulement les noms des personnes** avec **Voir les présences** ou **Modifier les présences** (les autres sont renvoyées au tableau de bord). La configuration des présences n'apparaît qu'avec **Modifier les services**. Le bouton **Courriel** d'un groupe n'apparaît que pour les personnes disposant de **Modifier les membres du groupe** (l'autorisation nécessaire pour envoyer un courriel de groupe), l'impression d'une liste de membres d'un groupe exige **Voir les membres du groupe** ou la direction de ce groupe, et la suppression d'un événement du calendrier exige **Modifier le contenu** (ou le retrait de votre propre demande en attente).

### Comptes des bornes de pointage {#check-in-kiosk-accounts}

Le compte qui se connecte à une borne [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) doit disposer de l'autorisation **Pointage** dans la section **Présences** (ou **Modifier les présences**). Avec **Pointage** seul, la borne peut rechercher des familles par nom ou par téléphone, pointer les arrivées et les départs, et indiquer qui peut venir chercher un enfant, sans accéder au répertoire des Personnes.

Le pointage n'est plus accordé par la ligne **(Tout le monde)**. Le fait d'appartenir à un rôle comportant d'autres autorisations ne permet pas d'utiliser la borne ; ajoutez **Pointage** à un rôle tel que « Bénévoles du pointage » et placez-y les comptes des bornes.

:::warning
Les **Administrateurs du domaine** ont un accès complet à tous les domaines de votre compte ChurchApps. Leurs autorisations ne peuvent pas être modifiées ni restreintes. Réservez ce rôle à vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles précis, comme « Trésorier » avec seulement l'accès aux **Dons**, « Équipe de comptage » avec **Saisir des dons** et **Voir les dons**, ou « Bénévole du pointage » avec seulement l'accès aux **Présences**. Cela applique le principe du moindre privilège et protège vos données. Voir [Sécurité des données](./data-security.md) pour en savoir plus sur la façon dont ChurchApps protège vos informations.
:::
