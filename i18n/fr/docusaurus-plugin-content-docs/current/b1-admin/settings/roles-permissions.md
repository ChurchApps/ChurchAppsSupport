---
title: "Rôles et autorisations"
---

# Rôles et autorisations

<div class="article-intro">

Les rôles vous permettent de contrôler ce que les différents utilisateurs peuvent consulter dans votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de votre équipe, chacun avec son propre niveau d'accès, afin de protéger vos données.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'accès Administrateur de domaine ou d'un rôle autorisé à gérer les rôles
- Dressez la liste des membres de votre équipe et des domaines auxquels ils doivent accéder
- Consultez les catégories d'autorisations disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles définis pour votre église. La colonne **Membres** indique le nombre d'utilisateurs dans chaque rôle, et la ligne **(Tout le monde)** indique **Tous les utilisateurs**.

## Comprendre la page Rôles

La page Rôles est divisée en deux panneaux :

- **Côté gauche** : affiche la liste des membres attribués au rôle sélectionné.
- **Côté droit** : affiche les paramètres d'autorisation que vous pouvez configurer pour ce rôle.

Cliquez sur le nom d'un rôle pour afficher et gérer ses membres et ses autorisations.

## Ajouter des utilisateurs à un rôle

1. Sélectionnez le rôle auquel vous souhaitez ajouter des membres.
2. Utilisez le **champ de recherche** à gauche pour trouver la personne à ajouter.
3. Sélectionnez la personne dans les résultats de recherche.
4. Elle est immédiatement ajoutée au rôle.

## Retirer des utilisateurs d'un rôle

1. Sélectionnez le rôle contenant l'utilisateur à retirer.
2. Repérez la personne dans la liste des membres, à gauche.
3. Cliquez sur le **bouton de suppression** à côté de son nom.

## Configurer les autorisations

Chaque rôle peut recevoir un accès à des domaines spécifiques de B1 Admin. Dans le panneau **Modifier les autorisations**, les autorisations sont regroupées en sections que vous pouvez développer, comme **Présence**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez du texte dans la zone **Filtrer les autorisations** pour n'afficher que les autorisations correspondantes.

Cochez ou décochez une autorisation pour l'accorder ou la retirer au rôle. Chaque titre de section indique combien d'autorisations le rôle possède dans cette section, par exemple **2 sur 5**, et ce compteur se met à jour lorsque vous cochez ou décochez des cases.

### Autorisations Dons

La section **Dons** comprend les autorisations suivantes :

- **Afficher les récapitulatifs des dons** : voir la section Dons, y compris les pages Récapitulatif, Lots, Fonds, Campagnes et Relevés de dons.
- **Afficher les dons** : voir les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** : contrôle total : ajouter, modifier et supprimer des dons et des lots, et [clôturer et rouvrir les lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir des dons** : ajouter des lots et saisir, modifier ou supprimer des dons, mais uniquement dans les lots encore ouverts. Les personnes disposant uniquement de cette autorisation ne peuvent pas supprimer de lots, les clôturer ou les rouvrir, ni modifier les dons reçus via le don en ligne.
- **Modifier les paramètres** : gérer les paramètres des dons.

Une personne disposant de **Saisir des dons** mais pas de **Afficher les récapitulatifs des dons** ne voit que la page **Lots** sous **Dons**. Attribuez à une équipe de comptage à la fois **Saisir des dons** et **Afficher les dons**, afin qu'elle puisse ouvrir un lot et voir les dons qu'elle a saisis. Voir [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes uniquement

La section **Personnes et groupes** comprend l'autorisation **Afficher uniquement les noms des personnes**. Utilisez-la pour les bénévoles qui doivent rechercher des personnes par leur nom, par exemple pour sélectionner quelqu'un dans un champ de recherche, sans accéder à l'annuaire complet. Avec cette seule autorisation, une personne :

- peut rechercher des personnes par nom et voir la liste des personnes récemment ajoutées, mais ne voit que le nom, la photo et le statut de membre de chacune ;
- ne peut pas rechercher par e-mail, voir les coordonnées ni ouvrir l'annuaire **Personnes**.

Associez **Afficher uniquement les noms des personnes** à **Afficher la présence** ou **Modifier la présence** pour les bénévoles qui gèrent la présence aux cours. Le menu **Personnes** de ces bénévoles ouvre alors **Groupes**, où ils peuvent ouvrir la liste **Tous les groupes** et voir les noms des membres de chaque classe ainsi que ses séances. Avec **Modifier la présence**, ils peuvent également [enregistrer la présence](../attendance/recording-attendance.md) et ajouter des visiteurs en recherchant leur nom. Les noms ne sont pas des liens vers les fiches des personnes, et les groupes confidentiels restent masqués, sauf si le bénévole en est membre.

B1 Admin masque les liens et les boutons qui nécessitent des autorisations qu'un rôle ne possède pas. Par exemple, la liste **Tous les groupes** n'est accessible qu'aux personnes pouvant modifier les groupes, afficher les membres d'un groupe ou afficher les personnes, ou qui disposent de **Afficher uniquement les noms des personnes** avec **Afficher la présence** ou **Modifier la présence** (les autres sont renvoyés au Tableau de bord) ; la configuration de la présence n'apparaît qu'avec **Afficher la présence** ou **Modifier les services** ; le bouton **E-mail** d'un groupe n'apparaît que pour les personnes disposant de **Modifier les membres du groupe** (l'autorisation nécessaire pour envoyer un e-mail au groupe) ; l'impression de la liste d'un groupe nécessite **Afficher les membres du groupe** ou la direction de ce groupe ; et la suppression d'un événement de calendrier nécessite **Modifier le contenu** (ou le retrait de votre propre demande en attente).

:::warning
Les **Administrateurs de domaine** disposent d'un accès complet à tous les domaines de votre compte ChurchApps. Leurs autorisations ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles spécifiques, par exemple « Trésorier » avec accès uniquement aux **Dons**, « Équipe de comptage » avec **Saisir des dons** et **Afficher les dons**, ou « Bénévole à l'enregistrement » avec accès uniquement à la **Présence**. Cela respecte le principe du moindre privilège et protège vos données. Voir [Sécurité des données](./data-security.md) pour en savoir plus sur la manière dont ChurchApps protège vos informations.
:::
