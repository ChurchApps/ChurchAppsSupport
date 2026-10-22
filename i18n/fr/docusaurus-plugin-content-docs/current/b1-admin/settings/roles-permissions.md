---
title: "Rôles et permissions"
---

# Rôles et permissions {#roles--permissions}

<div class="article-intro">

Les rôles vous permettent de contrôler ce que les différents utilisateurs peuvent consulter dans votre compte ChurchApps. Vous pouvez créer des rôles personnalisés pour le personnel, les bénévoles et les autres membres de l'équipe, chacun avec son propre niveau d'accès afin de protéger vos données.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un accès Administrateur de domaine ou d'un rôle autorisé à gérer les rôles
- Ayez une liste des membres de l'équipe et des domaines auxquels ils doivent avoir accès
- Consultez les catégories de permissions disponibles ci-dessous pour planifier vos rôles

</div>

## Accéder aux rôles {#accessing-roles}

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Paramètres**.
2. Cliquez sur **Rôles**.
3. La page Rôles affiche tous les rôles actuellement définis pour votre église.

## Comprendre la page des rôles {#understanding-the-roles-page}

La page Rôles est divisée en deux panneaux :

- **Côté gauche** -- Affiche la liste des membres attribués au rôle sélectionné.
- **Côté droit** -- Affiche les paramètres de permission que vous pouvez configurer pour ce rôle.

Cliquez sur le nom d'un rôle pour afficher et gérer ses membres et ses permissions.

## Ajouter des utilisateurs à un rôle {#adding-users-to-a-role}

1. Sélectionnez le rôle auquel vous voulez ajouter des membres.
2. Utilisez le **champ de recherche** à gauche pour trouver la personne que vous souhaitez ajouter.
3. Sélectionnez la personne dans les résultats de recherche.
4. Elle sera ajoutée au rôle immédiatement.

## Retirer des utilisateurs d'un rôle {#removing-users-from-a-role}

1. Sélectionnez le rôle contenant l'utilisateur que vous voulez retirer.
2. Trouvez la personne dans la liste des membres à gauche.
3. Cliquez sur le **bouton de suppression** à côté de son nom.

## Configurer les permissions {#configuring-permissions}

Chaque rôle peut recevoir l'accès à des domaines précis de B1 Admin. Dans le panneau **Modifier les permissions**, les permissions sont regroupées en sections que vous pouvez développer, comme **Présences**, **Contenu**, **Dons**, **Formulaires et plans**, **Leçons**, **Messagerie**, **Personnes et groupes** et **Tâches**. Saisissez du texte dans la case **Filtrer les permissions** pour n'afficher que les permissions correspondantes.

Cochez ou décochez une permission pour l'accorder ou la retirer au rôle.

### Permissions des dons {#donations-permissions}

La section **Dons** comprend ces permissions :

- **Voir les sommaires des dons** -- consulter la section Dons, y compris les pages Sommaire, Lots, Fonds, Campagnes et Relevés de dons.
- **Voir les dons** -- consulter les dons individuels, comme les dons contenus dans un lot.
- **Modifier les dons** -- contrôle total : ajouter, modifier et supprimer des dons et des lots, et [fermer et rouvrir les lots](../donations/batches.md#closing-and-reopening-a-batch).
- **Saisir des dons** -- ajouter des lots et saisir, modifier ou supprimer des dons, mais uniquement dans les lots encore ouverts. Les personnes qui ont seulement cette permission ne peuvent pas supprimer des lots, les fermer ou les rouvrir, ni modifier les dons reçus par les dons en ligne.
- **Modifier les paramètres** -- gérer les paramètres des dons.

Une personne qui a **Saisir des dons** sans **Voir les sommaires des dons** ne voit que la page **Lots** sous **Dons**. Donnez à une équipe de comptage les permissions **Saisir des dons** et **Voir les dons** afin qu'elle puisse ouvrir un lot et voir les dons qu'elle a saisis. Consultez [Qui peut modifier un lot](../donations/batches.md#who-can-change-a-batch) pour plus de détails.

### Noms des personnes uniquement {#people-names-only}

La section **Personnes et groupes** comprend **Voir uniquement les noms des personnes**. Utilisez-la pour les bénévoles qui doivent rechercher des personnes par leur nom -- par exemple pour choisir quelqu'un dans un champ de recherche -- sans accéder au répertoire complet. Avec cette permission seule, une personne :

- Peut rechercher des personnes par nom et voir la liste des personnes ajoutées récemment, mais ne voit que le nom, la photo et le statut d'adhésion de chaque personne
- Ne peut pas rechercher par courriel, voir les coordonnées ni ouvrir le **répertoire** des **personnes**

Associez **Voir uniquement les noms des personnes** à **Voir les présences** ou à **Modifier les présences** pour les bénévoles qui font l'appel des classes. **Personnes** dans leur menu ouvre alors **Groupes**, où ils peuvent ouvrir la liste **Tous les groupes** et voir les noms des membres et les séances de chaque classe. Avec **Modifier les présences**, ils peuvent aussi [enregistrer les présences](../attendance/recording-attendance.md) et ajouter des visiteurs en recherchant leur nom. Les noms ne sont pas des liens vers les fiches des personnes, et les groupes confidentiels restent masqués sauf si le bénévole en est membre.

B1 Admin masque les liens et les boutons qui exigent des permissions qu'un rôle n'a pas. Par exemple, la liste **Tous les groupes** n'est disponible qu'aux personnes qui peuvent modifier les groupes, voir les membres des groupes ou voir les personnes, ou qui ont **Voir uniquement les noms des personnes** avec **Voir les présences** ou **Modifier les présences** (les autres sont renvoyées au Tableau de bord). La configuration des présences n'apparaît qu'avec **Voir les présences** ou **Modifier les services**. Le bouton **Courriel** d'un groupe n'apparaît que pour les personnes ayant **Modifier les membres du groupe** (la permission nécessaire pour envoyer un courriel au groupe). Imprimer la liste d'un groupe exige **Voir les membres du groupe** ou être responsable de ce groupe, et supprimer un événement du calendrier exige **Modifier le contenu** (ou le retrait de votre propre demande en attente).

:::warning
Les **Administrateurs de domaine** ont un accès complet à tous les domaines de votre compte ChurchApps. Leurs permissions ne peuvent être ni modifiées ni restreintes. Réservez ce rôle à vos administrateurs les plus fiables.
:::

:::tip
Créez des rôles précis, comme « Trésorier » avec un accès uniquement aux **Dons**, « Équipe de comptage » avec **Saisir des dons** et **Voir les dons**, ou « Bénévole de l'enregistrement » avec un accès uniquement aux **Présences**. Cela suit le principe du moindre privilège et protège vos données. Consultez [Sécurité des données](./data-security.md) pour en savoir plus sur la façon dont ChurchApps protège vos informations.
:::
