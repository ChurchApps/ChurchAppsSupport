---
title: "Rôles et autorisations"
---

# Rôles et autorisations

<div class="article-intro">

Les rôles vous permettent de contrôler ce que les différents utilisateurs peuvent accéder dans votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de l'équipe, chacun avec son propre niveau d'accès afin de protéger vos données.

</div>

## Vidéo de formation

<YouTube id="ZzCIkinVMnE" title="Rôles, autorisations et invitation de votre équipe dans B1" next="Configurer les services et les présences dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'accès **Administrateur de domaine** ou d'un rôle autorisé à gérer les rôles
- Ayez une liste des membres de l'équipe et des domaines auxquels ils ont besoin d'accéder
- Examinez les catégories d'autorisations disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles actuellement définis pour votre église. La colonne **Membres** indique combien d'utilisateurs se trouvent dans chaque rôle, et la ligne **(Tout le monde)** affiche **Tous les utilisateurs**.

## Comprendre la page Rôles

La page Rôles est divisée en deux panneaux :

- **Côté gauche** -- Affiche la liste des membres assignés au rôle sélectionné.
- **Côté droit** -- Affiche les paramètres d'autorisations que vous pouvez configurer pour ce rôle.

Cliquez sur le nom d'un rôle pour consulter et gérer ses membres et ses autorisations.

## Ajouter des utilisateurs à un rôle

1. Sélectionnez le rôle auquel vous voulez ajouter des membres.
2. Utilisez le **champ de recherche** à gauche pour trouver la personne à ajouter.
3. Sélectionnez la personne dans les résultats de recherche.
4. Elle sera immédiatement ajoutée au rôle.

## Retirer des utilisateurs d'un rôle

1. Sélectionnez le rôle qui contient l'utilisateur à retirer.
2. Repérez la personne dans la liste des membres, à gauche.
3. Cliquez sur le **bouton de retrait** à côté de son nom.

## Configurer les autorisations

Chaque rôle peut se voir accorder l'accès à des domaines précis de B1 Admin. Dans le panneau **Modifier les autorisations**, les autorisations sont regroupées en sections que vous pouvez développer, comme **Présences**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez du texte dans la zone **Filtrer les autorisations** pour n'afficher que les autorisations correspondantes.

Cochez ou décochez une autorisation pour l'accorder ou la retirer au rôle. Chaque en-tête de section indique combien d'autorisations le rôle possède, par exemple **2 sur 5**, et ce compte se met à jour à mesure que vous cochez et décochez les cases.

### Autorisations relatives aux dons

La section **Dons** comporte les autorisations suivantes :

- **Voir les résumés de dons** -- voir la section Dons, y compris les pages Résumé, Lots, Fonds, Campagnes et Reçus de dons.
- **Voir les dons** -- voir les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** -- contrôle total : ajouter, modifier et supprimer des dons et des lots, et [fermer et rouvrir les lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir les dons** -- ajouter des lots et saisir, modifier ou supprimer des dons, mais seulement dans les lots encore ouverts. Une personne qui ne dispose que de cette autorisation ne peut pas supprimer de lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.
- **Modifier les paramètres** -- gérer les paramètres de dons.

Une personne qui a **Saisir les dons** sans **Voir les résumés de dons** ne voit que la page **Lots** sous **Dons**. Donnez à un rôle d'équipe de comptage à la fois **Saisir les dons** et **Voir les dons**, afin qu'il puisse ouvrir un lot et voir les dons qu'il a saisis. Voir [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes uniquement {#people-names-only}

La section **Personnes et groupes** comprend **Voir les noms des personnes uniquement**. Utilisez-la pour les bénévoles qui ont besoin de rechercher des personnes par nom -- par exemple, pour choisir quelqu'un dans une zone de recherche -- sans accès au répertoire complet. Avec cette seule autorisation, une personne :

- Peut rechercher des personnes par nom et voir la liste des personnes ajoutées récemment, mais ne voit que le nom, la photo et le statut de membre de chacune
- Ne peut pas rechercher par courriel, voir les coordonnées ni ouvrir le répertoire **Personnes**

Associez **Voir les noms des personnes uniquement** à **Voir les présences** ou **Modifier les présences** pour les bénévoles qui prennent les présences en classe. **Personnes** dans leur menu ouvre alors **Groupes**, où ils peuvent ouvrir la liste **Tous les groupes** et voir les noms des membres et les séances de chaque classe. Avec **Modifier les présences**, ils peuvent aussi [enregistrer les présences](../attendance/recording-attendance.md) et ajouter des visiteurs en recherchant leur nom. Les noms ne sont pas des liens vers les fiches des personnes, et les groupes confidentiels restent masqués, sauf si le bénévole en est membre.

B1 Admin masque les liens et les boutons qui exigent des autorisations qu'un rôle ne possède pas. Par exemple, la liste **Tous les groupes** n'est accessible qu'aux personnes qui peuvent modifier les groupes, voir les membres des groupes ou voir les personnes, ou qui ont **Voir les noms des personnes uniquement** avec **Voir les présences** ou **Modifier les présences** (les autres sont renvoyées au tableau de bord). La configuration des présences n'apparaît qu'avec **Modifier les services**. Le bouton **Courriel** d'un groupe n'apparaît que pour les personnes ayant **Modifier les membres du groupe** (l'autorisation nécessaire pour envoyer des courriels de groupe). L'impression de la liste d'un groupe exige **Voir les membres du groupe** ou le fait de diriger ce groupe. La suppression d'un événement de calendrier exige **Modifier le contenu** (ou le retrait de votre propre demande en attente).

### Comptes des bornes de pointage {#check-in-kiosk-accounts}

Le compte qui se connecte à une borne [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) a besoin de l'autorisation **Pointage** dans la section **Présences** (ou **Modifier les présences**). Avec **Pointage** seul, la borne peut rechercher des familles par nom ou par téléphone, les pointer et les dépointer, et indiquer qui peut venir chercher un enfant, sans accès au répertoire des personnes.

Le pointage n'est plus accordé par la ligne **(Tout le monde)**. Le fait d'appartenir à un rôle disposant d'autres autorisations ne permet pas à quelqu'un de faire fonctionner la borne ; ajoutez **Pointage** à un rôle tel que « Bénévoles au pointage » et placez-y les comptes des bornes.

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de votre compte ChurchApps. Leurs autorisations ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles précis comme « Trésorier » avec un accès aux **Dons** seulement, « Équipe de comptage » avec **Saisir les dons** et **Voir les dons**, ou « Bénévole au pointage » avec un accès aux **Présences** seulement. Cela respecte le principe du moindre privilège et protège vos données. Voir [Sécurité des données](./data-security.md) pour en savoir plus sur la façon dont ChurchApps protège vos renseignements.
:::
