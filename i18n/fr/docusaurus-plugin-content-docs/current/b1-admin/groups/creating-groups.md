---
title: "Créer des groupes"
description: "Créez un nouveau groupe dans B1 Admin, de la sélection d'une catégorie et de son nom jusqu'à la configuration de la politique d'adhésion, des étiquettes, des messages et des paramètres de présence."
---

# Créer des groupes

<div class="article-intro">

Créer un groupe dans B1 Admin est simple. Vous allez créer une catégorie, nommer votre groupe, puis configurer ses paramètres. Les groupes vous aident à organiser votre église en unités significatives comme les petits groupes, les comités et les classes.

</div>

## Vidéo de formation

<YouTube id="uG93pXVreNo" title="Créer des groupes et ajouter des membres dans B1" next="Demandes d'adhésion aux groupes et calendriers de groupe dans B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les groupes. Voir [Rôles et autorisations](../people/roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Décidez d'une structure de catégories pour vos groupes (par exemple « Petits groupes », « Ministères », « Comités »). Les catégories aident à garder les groupes liés organisés.

</div>

## Ajouter un nouveau groupe

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes**, et cliquez sur **Groupes**.
2. Cliquez sur **Ajouter un groupe** dans l'en-tête de la page. Un formulaire **Nouveau groupe** s'ouvre sous la liste. Saisissez un **nom de catégorie**. Les catégories vous aident à regrouper les groupes liés (par exemple « Petits groupes », « Ministères » ou « Comités »). Si une catégorie existe déjà, vous pouvez la sélectionner dans la liste.
3. Saisissez le **nom** du groupe.
4. Cliquez sur **Ajouter**. Votre nouveau groupe apparaîtra dans la liste, avec sa catégorie affichée sous son nom.

## Configurer les paramètres du groupe

Une fois votre groupe créé, vous pouvez compléter les détails :

1. Cliquez sur le **nom du groupe** dans la liste pour l'ouvrir.
2. Cliquez sur le bouton **Modifier** à gauche de la page du groupe, sous les détails du groupe.
3. Configurez les options suivantes :
   - **Description** -- Un bref résumé de l'objet du groupe. Elle est visible par les membres.
   - **Horaires de rencontre** -- Quand le groupe se réunit habituellement (par exemple « Les mercredis à 19 h »).
   - **Politique d'adhésion** -- Choisissez qui peut rejoindre ce groupe :
     - **Ouvert** -- Tout le monde peut rejoindre immédiatement, sans approbation
     - **Sur demande** -- Les personnes doivent soumettre une demande d'adhésion qui doit être approuvée (voir [Demandes d'adhésion aux groupes](./group-join-requests.md))
     - **Fermé** -- Les membres doivent être ajoutés manuellement par les responsables ou les administrateurs
   - **Étiquettes** -- Attribuez une ou plusieurs étiquettes descriptives au groupe (par exemple « En personne », « En ligne », « Nouveaux membres bienvenus »). Les étiquettes sont des mots-clés libres que vous définissez ; cochez toutes celles qui s'appliquent. Les étiquettes peuvent servir à filtrer les groupes dans l'élément Répertoire des groupes du site web.
   - **Groupe confidentiel** -- Masque ce groupe et sa liste des pages publiques, du chercheur de groupes et des non-membres. Utilisez cette option pour les groupes sensibles, comme les ministères de rétablissement ou de conseil ; seuls les membres du groupe et le personnel de l'église peuvent le voir.
   - **Discussions** -- Active ou désactive le fil de clavardage du groupe, où tout membre peut publier. Activé par défaut.
   - **Annonces** -- Active un second fil de clavardage réservé aux responsables -- les membres peuvent lire et réagir, mais seuls les responsables peuvent publier. Activé par défaut.
   - **Suivi des présences** -- Activez cette option si vous voulez enregistrer les [présences](../attendance/tracking-attendance.md) de ce groupe.
   - **Horaires de service** -- Associez le groupe à des horaires de service précis de l'église, le cas échéant. Voir [Configuration des présences](../attendance/setup.md) pour plus de détails sur les horaires de service.
4. Cliquez sur **Enregistrer** pour appliquer vos modifications.

:::tip
Une description claire et un horaire de rencontre aident les membres à savoir à quoi s'attendre lorsqu'ils rejoignent un groupe.
:::

:::info
Désactiver à la fois les Discussions et les Annonces retire complètement l'onglet Messages du groupe dans le portail des membres. Désactiver une seule option masque son onglet ; les membres sont redirigés vers le fil encore activé. Les messages existants sont conservés dans tous les cas -- les interrupteurs ne contrôlent que la publication de nouveaux messages.
:::

## Dupliquer un groupe

Vous démarrez une nouvelle session d'un cours ou d'un ministère récurrent ? Plutôt que de ressaisir tous les paramètres, dupliquez un groupe existant :

1. Ouvrez le groupe et cliquez sur **Dupliquer** (sous le bouton **Modifier**, à gauche de la page du groupe).
2. Confirmez la duplication.

La copie reprend les paramètres de l'original -- catégorie, description, horaire et lieu de rencontre, politique d'adhésion, étiquettes et campus -- mais **pas** ses membres. Le nouveau groupe porte le nom de l'original auquel « (Copie) » est ajouté ; renommez-le depuis les paramètres du groupe.

## Archiver un groupe

Lorsqu'un groupe n'est plus actif mais que vous voulez conserver son historique au lieu de le supprimer :

1. Ouvrez le groupe et cliquez sur **Modifier** pour modifier ses paramètres.
2. Cliquez sur **Archiver** et confirmez.

Les groupes archivés disparaissent de la liste principale des groupes. Pour en retrouver un, cliquez sur le bouton **Afficher les archivés** à côté des boutons de catégories en haut de la page Groupes, puis cliquez sur **Restaurer** à côté du groupe pour le rétablir.

:::info
Archiver un groupe ne supprime pas ses membres, son historique de présences ni ses événements de calendrier -- cela masque seulement le groupe de la liste par défaut jusqu'à ce que vous le restauriez.
:::

## Et ensuite

Après avoir créé et configuré votre groupe, vous êtes prêt à :

- **Ajouter des membres** -- Recherchez des personnes et ajoutez-les au groupe. Utilisez l'icône en forme d'étoile (**Nommer responsable**) pour désigner les responsables du groupe. Voir [Membres du groupe](./group-members.md).
- **Configurer un calendrier** -- Créez des événements et des rencontres récurrentes pour le groupe. Voir [Calendrier du groupe](./group-calendar.md).
- **Communiquer** -- Envoyez des messages à tous les membres du groupe directement depuis la page du groupe.
- **Exporter les données** -- Cliquez sur **Exporter** au-dessus de la liste des membres du groupe pour la télécharger.

:::info
Chaque groupe appartient à une catégorie, et la page principale des Groupes vous permet de filtrer la liste par catégorie. Vous pouvez toujours réorganiser ou renommer les catégories à mesure que votre église grandit.
:::
