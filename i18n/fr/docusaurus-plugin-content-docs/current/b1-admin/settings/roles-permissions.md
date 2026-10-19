---
title: "Rôles et permissions"
---

# Rôles et permissions

<div class="article-intro">

Les rôles vous permettent de contrôler ce que les différents utilisateurs peuvent consulter dans votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de l'équipe, chacun avec son propre niveau d'accès afin de protéger vos données.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès Administrateur de domaine ou d'un rôle disposant de la permission de gérer les rôles
- Ayez une liste des membres de l'équipe et des domaines auxquels ils doivent accéder
- Consultez les catégories de permissions disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles actuellement définis pour votre église.

## Comprendre la page Rôles

La page Rôles est divisée en deux panneaux :

- **Côté gauche** -- Affiche la liste des membres attribués au rôle sélectionné.
- **Côté droit** -- Affiche les paramètres de permission que vous pouvez configurer pour ce rôle.

Cliquez sur le nom d'un rôle pour consulter et gérer ses membres et ses permissions.

## Ajouter des utilisateurs à un rôle

1. Sélectionnez le rôle auquel vous souhaitez ajouter des membres.
2. Utilisez le **champ de recherche** à gauche pour trouver la personne à ajouter.
3. Sélectionnez la personne dans les résultats de recherche.
4. Elle est ajoutée au rôle immédiatement.

## Retirer des utilisateurs d'un rôle

1. Sélectionnez le rôle contenant l'utilisateur à retirer.
2. Repérez la personne dans la liste des membres à gauche.
3. Cliquez sur le **bouton de suppression** à côté de son nom.

## Configurer les permissions

Chaque rôle peut recevoir l'accès à des domaines précis de B1 Admin. Dans le panneau **Modifier les permissions**, les permissions sont regroupées en sections que vous pouvez développer, comme **Présences**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez du texte dans la zone **Filtrer les permissions** pour n'afficher que les permissions correspondantes.

Cochez ou décochez une permission pour l'accorder ou la retirer au rôle.

### Permissions des dons

La section **Dons** comporte les permissions suivantes :

- **Voir les résumés des dons** -- voir la section Dons, y compris les pages Résumé, Lots, Fonds, Campagnes et Relevés de dons.
- **Voir les dons** -- voir les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** -- contrôle total : ajouter, modifier et supprimer des dons et des lots, et [fermer et rouvrir les lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir les dons** -- ajouter des lots et saisir, modifier ou supprimer des dons, mais uniquement dans les lots encore ouverts. Les personnes qui ont seulement cette permission ne peuvent pas supprimer de lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.
- **Modifier les paramètres** -- gérer les paramètres de dons.

Une personne disposant de **Saisir les dons** sans **Voir les résumés des dons** ne voit que la page **Lots** sous **Dons**. Donnez à un rôle d'équipe de comptage à la fois **Saisir les dons** et **Voir les dons** pour qu'il puisse ouvrir un lot et voir les dons qu'il a saisis. Voir [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes uniquement

La section **Personnes et groupes** comprend **Voir uniquement les noms des personnes**. Utilisez-la pour les bénévoles qui doivent retrouver des personnes par leur nom -- par exemple pour sélectionner quelqu'un dans un champ de recherche -- sans accès à l'annuaire complet. Avec cette seule permission, une personne :

- Peut rechercher des personnes par leur nom et voir la liste des personnes ajoutées récemment, mais ne voit que le nom, la photo et le statut d'adhésion de chaque personne
- Ne peut pas rechercher par e-mail, voir les coordonnées ni ouvrir l'annuaire **Personnes**

B1 Admin masque les liens et les boutons qui nécessitent des permissions que le rôle ne possède pas. Par exemple, la liste **Tous les groupes** n'est accessible qu'aux personnes pouvant modifier les groupes, voir les membres des groupes ou voir les personnes (les autres sont renvoyées au Tableau de bord) ; la configuration des présences n'apparaît qu'avec **Voir les présences** ou **Modifier les services** ; le bouton **E-mail** d'un groupe n'apparaît que pour les personnes disposant de **Modifier les membres du groupe** (la permission nécessaire pour envoyer un e-mail de groupe) ; l'impression de la liste d'un groupe nécessite **Voir les membres du groupe** ou la direction de ce groupe ; et la suppression d'un événement de calendrier nécessite **Modifier le contenu** (ou le retrait de votre propre demande en attente).

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de votre compte ChurchApps. Leurs permissions ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles précis comme « Trésorier » avec un accès **Dons** uniquement, « Équipe de comptage » avec **Saisir les dons** et **Voir les dons**, ou « Bénévole à l'enregistrement » avec un accès **Présences** uniquement. Cela respecte le principe du moindre privilège et protège vos données. Voir [Sécurité des données](./data-security.md) pour en savoir plus sur la façon dont ChurchApps protège vos informations.
:::
