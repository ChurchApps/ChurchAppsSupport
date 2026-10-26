---
title: "Créer des groupes"
---

# Créer des groupes

<div class="article-intro">

Créer un groupe dans B1 Admin est simple. Vous allez configurer une catégorie, nommer votre groupe, puis définir ses paramètres. Les groupes vous aident à organiser votre église en unités utiles, comme les petits groupes, les comités et les classes.

</div>

## Vidéo de formation

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de gérer les groupes. Consultez [Rôles et autorisations](../people/roles-permissions.md) si vous ne connaissez pas votre niveau d'accès.
- Décidez d'une structure de catégories pour vos groupes (par exemple, « Petits groupes », « Ministères », « Comités »). Les catégories permettent de garder les groupes apparentés organisés.

</div>

## Ajouter un nouveau groupe

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **People**, puis cliquez sur **Groups**.
2. Cliquez sur **Add Group** dans l'en-tête de la page. Un formulaire **New Group** s'ouvre sous la liste. Saisissez un **Category Name**. Les catégories vous aident à regrouper les groupes apparentés (par exemple, « Petits groupes », « Ministères » ou « Comités »). Si une catégorie existe déjà, vous pouvez la sélectionner dans la liste.
3. Saisissez le **Name** du groupe.
4. Cliquez sur **Add**. Votre nouveau groupe apparaît dans la liste, avec sa catégorie affichée sous son nom.

## Configurer les paramètres du groupe

Une fois le groupe créé, vous pouvez renseigner des informations supplémentaires :

1. Cliquez sur le **nom du groupe** dans la liste pour l'ouvrir.
2. Cliquez sur le bouton **Edit** à gauche de la page du groupe, sous les détails du groupe.
3. Configurez les options suivantes :
   - **Description** -- Un bref résumé de l'objet du groupe. Il est visible par les membres.
   - **Meeting Times** -- Le moment où le groupe se réunit habituellement (par exemple, « Les mercredis à 19 h »).
   - **Join Policy** -- Choisissez qui peut rejoindre ce groupe :
     - **Open** -- Tout le monde peut rejoindre immédiatement, sans approbation
     - **Request** -- Les personnes doivent soumettre une demande d'adhésion qui nécessite une approbation (voir [Demandes d'adhésion aux groupes](./group-join-requests.md))
     - **Closed** -- Les membres doivent être ajoutés manuellement par les responsables ou les administrateurs
   - **Labels** -- Attribuez une ou plusieurs étiquettes descriptives au groupe (par exemple, « En personne », « En ligne », « Nouveaux membres bienvenus »). Les étiquettes sont des mots-clés libres que vous définissez ; cochez toutes celles qui s'appliquent. Les étiquettes peuvent servir à filtrer les groupes dans l'élément de site web Groups Browser.
   - **Confidential group** -- Masque ce groupe et sa liste de membres des pages publiques, du localisateur de groupes et des personnes non membres. Utilisez cette option pour les groupes sensibles, comme les ministères de rétablissement ou de conseil ; seuls les membres du groupe et le personnel de l'église peuvent le voir.
   - **Discussions** -- Active ou désactive le fil de discussion du groupe, où tout membre peut publier. Activé par défaut.
   - **Announcements** -- Active un second fil de discussion réservé aux responsables : les membres peuvent le lire et réagir, mais seuls les responsables peuvent publier. Activé par défaut.
   - **Attendance Tracking** -- Activez cette option si vous voulez enregistrer la [présence](../attendance/tracking-attendance.md) pour ce groupe.
   - **Service Times** -- Associez le groupe à des horaires de culte précis, si cela s'applique. Consultez [Configuration de la présence](../attendance/setup.md) pour plus de détails sur les horaires de culte.
4. Cliquez sur **Save** pour appliquer vos modifications.

:::tip
Ajouter une description claire et un horaire de réunion aide les membres à savoir à quoi s'attendre lorsqu'ils rejoignent un groupe.
:::

:::info
Désactiver à la fois Discussions et Announcements supprime complètement l'onglet Messages du groupe dans le portail des membres. Désactiver une seule option masque son onglet ; les membres sont redirigés vers le fil encore actif. Les messages existants sont conservés dans tous les cas : les boutons à bascule ne contrôlent que la publication de nouveaux messages.
:::

## Dupliquer un groupe

Vous lancez une nouvelle session d'un cours ou d'un ministère récurrent ? Au lieu de ressaisir tous les paramètres, dupliquez un groupe existant :

1. Ouvrez le groupe et cliquez sur **Duplicate** (sous le bouton **Edit**, à gauche de la page du groupe).
2. Confirmez la duplication.

La copie reprend les paramètres de l'original -- catégorie, description, horaire ou lieu de réunion, politique d'adhésion, étiquettes et campus -- mais **pas** ses membres. Le nouveau groupe porte le nom de l'original auquel « (Copy) » est ajouté ; renommez-le depuis les paramètres du groupe.

## Archiver un groupe

Lorsqu'un groupe n'est plus actif mais que vous souhaitez conserver son historique au lieu de le supprimer :

1. Ouvrez le groupe et cliquez sur **Edit** pour modifier ses paramètres.
2. Cliquez sur **Archive**, puis confirmez.

Les groupes archivés disparaissent de la liste principale des groupes. Pour le retrouver, cliquez sur le bouton **Show archived** à côté des boutons de catégories en haut de la page Groups, puis cliquez sur **Restore** à côté du groupe pour le réactiver.

:::info
Archiver un groupe ne supprime pas ses membres, son historique de présence ni ses événements de calendrier : cela masque seulement le groupe de la liste par défaut jusqu'à ce que vous le restauriez.
:::

## Étapes suivantes

Après avoir créé et configuré votre groupe, vous pouvez :

- **Ajouter des membres** -- Recherchez des personnes et ajoutez-les au groupe. Utilisez l'icône étoile (**Make Leader**) pour désigner les responsables du groupe. Consultez [Membres du groupe](./group-members.md).
- **Configurer un calendrier** -- Créez des événements et des réunions récurrentes pour le groupe. Consultez [Calendrier du groupe](./group-calendar.md).
- **Communiquer** -- Envoyez des messages à tous les membres du groupe directement depuis la page du groupe.
- **Exporter les données** -- Cliquez sur **Export** au-dessus de la liste des membres du groupe pour la télécharger.

:::info
Chaque groupe appartient à une catégorie, et la page principale des groupes vous permet de filtrer la liste par catégorie. Vous pouvez toujours réorganiser ou renommer les catégories à mesure que votre église se développe.
:::
