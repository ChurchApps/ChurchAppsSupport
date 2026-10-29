---
title: "Rôles et autorisations"
---

# Rôles et autorisations

<div class="article-intro">

Les rôles vous permettent de contrôler ce que les différents utilisateurs peuvent accéder au sein de votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de l'équipe, chacun avec son propre niveau d'accès afin de protéger vos données.

</div>

## Vidéo de formation

<YouTube id="ZzCIkinVMnE" title="Rôles, autorisations et invitation de votre équipe dans B1" next="Configurer les services et la présence dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir l'accès Administrateur de domaine ou un rôle disposant de l'autorisation de gérer les rôles
- Ayez une liste des membres de l'équipe et des secteurs auxquels ils doivent accéder
- Examinez les catégories d'autorisations disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles définis actuellement pour votre église. La colonne **Membres** indique le nombre d'utilisateurs dans chaque rôle, et la ligne **(Tout le monde)** affiche **Tous les utilisateurs**.

## Comprendre la page Rôles

La page Rôles est divisée en deux panneaux :

- **Côté gauche** -- Affiche la liste des membres assignés au rôle sélectionné.
- **Côté droit** -- Affiche les paramètres d'autorisation que vous pouvez configurer pour ce rôle.

Cliquez sur le nom d'un rôle pour voir et gérer ses membres et ses autorisations.

## Ajouter des utilisateurs à un rôle

1. Sélectionnez le rôle auquel vous voulez ajouter des membres.
2. Utilisez le **champ de recherche** à gauche pour trouver la personne que vous voulez ajouter.
3. Sélectionnez la personne dans les résultats de recherche.
4. Elle sera ajoutée au rôle immédiatement.

## Retirer des utilisateurs d'un rôle

1. Sélectionnez le rôle qui contient l'utilisateur que vous voulez retirer.
2. Repérez la personne dans la liste des membres à gauche.
3. Cliquez sur le **bouton de retrait** à côté de son nom.

## Configurer les autorisations

Chaque rôle peut recevoir l'accès à des secteurs précis de B1 Admin. Dans le panneau **Modifier les autorisations**, les autorisations sont regroupées en sections que vous pouvez développer, comme **Présence**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez du texte dans la zone **Filtrer les autorisations** pour n'afficher que les autorisations correspondantes.

Cochez ou décochez une autorisation pour l'accorder ou la retirer au rôle. Chaque titre de section indique combien d'autorisations de cette section le rôle possède, par exemple **2 sur 5**, et ce compte se met à jour à mesure que vous cochez et décochez des cases.

### Autorisations de dons

La section **Dons** comporte ces autorisations :

- **Voir les sommaires de dons** -- voir la section Dons, y compris les pages Sommaire, Lots, Fonds, Campagnes et Relevés de dons.
- **Voir les dons** -- voir les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** -- contrôle complet : ajouter, modifier et supprimer des dons et des lots, et [fermer et rouvrir des lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir les dons** -- ajouter des lots et saisir, modifier ou supprimer des dons, mais uniquement dans les lots encore ouverts. Les personnes qui ont seulement cette autorisation ne peuvent pas supprimer de lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.
- **Modifier les paramètres** -- gérer les paramètres de dons.

Une personne qui a **Saisir les dons** mais pas **Voir les sommaires de dons** ne voit que la page **Lots** sous **Dons**. Donnez à un rôle d'équipe de comptage à la fois **Saisir les dons** et **Voir les dons** pour qu'il puisse ouvrir un lot et voir les dons qu'il a saisis. Consultez [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes uniquement {#people-names-only}

La section **Personnes et groupes** comprend **Voir les noms des personnes uniquement**. Utilisez-la pour les bénévoles qui doivent rechercher des personnes par nom -- par exemple pour choisir quelqu'un dans une zone de recherche -- sans accès au répertoire complet. Avec cette seule autorisation, une personne :

- Peut rechercher des personnes par nom et voir la liste des personnes ajoutées récemment, mais ne voit que le nom, la photo et le statut de membre de chaque personne
- Ne peut pas rechercher par e-mail, voir les coordonnées ni ouvrir le répertoire **Personnes**

Associez **Voir les noms des personnes uniquement** à **Voir la présence** ou **Modifier la présence** pour les bénévoles qui prennent la présence des classes. **Personnes** dans leur menu ouvre alors **Groupes**, où ils peuvent ouvrir la liste **Tous les groupes** et voir les noms des membres et les séances de chaque classe. Avec **Modifier la présence**, ils peuvent aussi [enregistrer la présence](../attendance/recording-attendance.md) et ajouter des visiteurs en recherchant leurs noms. Les noms ne sont pas des liens vers les fiches des personnes, et les groupes confidentiels restent masqués sauf si le bénévole en est membre.

B1 Admin masque les liens et les boutons qui exigent des autorisations qu'un rôle ne possède pas. Par exemple, la liste **Tous les groupes** n'est disponible qu'aux personnes qui peuvent modifier les groupes, voir les membres des groupes ou voir les personnes, ou qui ont **Voir les noms des personnes uniquement** avec **Voir la présence** ou **Modifier la présence** (les autres sont renvoyés au Tableau de bord). Le paramétrage de la présence n'apparaît qu'avec **Voir la présence** ou **Modifier les services**. Le bouton **E-mail** d'un groupe n'apparaît que pour les personnes ayant **Modifier les membres du groupe** (l'autorisation nécessaire pour envoyer de l'e-mail de groupe), l'impression d'une liste de groupe exige **Voir les membres du groupe** ou le fait de diriger ce groupe, et la suppression d'un événement de calendrier exige **Modifier le contenu** (ou le retrait de votre propre demande en attente).

:::warning
Les **administrateurs de domaine** ont un accès complet à tous les secteurs de votre compte ChurchApps. Leurs autorisations ne peuvent pas être modifiées ni restreintes. Utilisez ce rôle uniquement pour vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles précis comme « Trésorier » avec un accès aux **Dons** seulement, « Équipe de comptage » avec **Saisir les dons** et **Voir les dons**, ou « Bénévole d'enregistrement » avec un accès à la **Présence** seulement. Cela respecte le principe du moindre privilège et garde vos données en sécurité. Consultez [Sécurité des données](./data-security.md) pour en savoir plus sur la façon dont ChurchApps protège vos renseignements.
:::
