---
title: "Créer des groupes"
---

# Créer des groupes

<div class="article-intro">

Créer un groupe dans B1 Admin est simple. Vous configurez une catégorie, nommez votre groupe, et configurez ensuite ses paramètres. Les groupes vous aident à organiser votre église en unités significatives comme les petits groupes, les comités et les classes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer les groupes. Voir [Roles & Permissions](../people/roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Décidez d'une structure de catégories pour vos groupes (par exemple, « Small Groups », « Ministries », « Committees »). Les catégories aident à garder les groupes associés organisés.

</div>

## Ajouter un nouveau groupe

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **People**, et cliquez sur **Groups**.
2. Cliquez sur **Add Group** et entrez un **Category Name**. Les catégories vous aident à organiser les groupes associés ensemble (par exemple, « Small Groups », « Ministries » ou « Committees »). Si une catégorie existe déjà, vous pouvez la sélectionner dans la liste.
3. Entrez le **Group Name**.
4. Cliquez sur **Add**. Votre nouveau groupe apparaîtra dans la liste sous la catégorie choisie.

## Configurer les paramètres du groupe

Une fois votre groupe créé, vous pouvez remplir d'autres détails :

1. Cliquez sur le **nom du groupe** dans la liste pour l'ouvrir.
2. Cliquez sur l'**icône crayon** pour modifier les paramètres du groupe.
3. Configurez les options suivantes :
   - **Description** -- Un bref résumé du groupe. C'est visible pour les membres.
   - **Meeting Times** -- Quand le groupe se réunit généralement (par exemple, « Wednesdays at 7 PM »).
   - **Join Policy** -- Choisissez qui peut rejoindre ce groupe :
     - **Open** -- N'importe qui peut rejoindre immédiatement sans approbation
     - **Request** -- Les gens doivent soumettre une demande d'adhésion qui nécessite approbation (voir [Group Join Requests](./group-join-requests.md))
     - **Closed** -- Les membres doivent être ajoutés manuellement par les leaders ou les administrateurs
   - **Labels** -- Assignez un ou plusieurs labels descriptifs au groupe (par exemple, « In-Person », « Online », « New Members Welcome »). Les labels sont des tags libres que vous définissez ; cochez tous ceux qui s'appliquent. Les labels peuvent être utilisés pour filtrer les groupes dans l'élément Groups Browser du site web.
   - **Confidential group** -- Cachez ce groupe et sa liste des pages publiques, du groupe finder et des non-membres. Utilisez ceci pour les groupes sensibles comme les ministères de récupération ou de conseil ; seuls les membres du groupe et le personnel de l'église peuvent le voir.
   - **Discussions** -- Active ou désactive le fil de chat du groupe, où n'importe quel membre peut poster. Activé par défaut.
   - **Announcements** -- Active un deuxième fil de chat, leader uniquement -- les membres peuvent lire et réagir, mais seuls les leaders peuvent poster. Activé par défaut.
   - **Attendance Tracking** -- Activez ceci si vous voulez enregistrer l'[attendance](../attendance/tracking-attendance.md) pour ce groupe.
   - **Service Times** -- Associez le groupe à des heures de service d'église spécifiques si applicable. Voir [Attendance Setup](../attendance/setup.md) pour plus de détails sur les heures de service.
4. Cliquez sur **Save** pour appliquer vos modifications.

:::tip
Ajouter une description claire et une heure de réunion aide les membres à savoir à quoi s'attendre quand ils rejoignent un groupe.
:::

:::info
Si vous désactivez à la fois Discussions et Announcements, l'onglet Messages est supprimé du groupe entièrement dans le portail des membres. Si vous désactivez juste un seul, son onglet est caché ; les membres sont déplacés vers le fil qui est toujours activé. Les messages existants sont conservés de toute façon -- les bascules contrôlent juste la nouvelle publication.
:::

## Dupliquer un groupe

Vous lancez une nouvelle session d'une classe ou d'un ministère récurrent ? Au lieu de réentrer tous les paramètres, dupliquez un groupe existant :

1. Ouvrez le groupe et cliquez sur l'**icône duplicate** dans la bannière du groupe (à côté de Edit).
2. Confirmez la duplication.

La copie reprend les paramètres de l'original -- catégorie, description, heure/lieu de réunion, politique d'adhésion, labels et campus -- mais **pas** ses membres. Le nouveau groupe est nommé d'après l'original avec « (Copy) » ajouté ; renommez-le depuis les paramètres du groupe.

## Archiver un groupe

Quand un groupe n'est plus actif mais que vous voulez conserver son historique au lieu de le supprimer :

1. Ouvrez le groupe et cliquez sur l'**icône crayon** pour modifier ses paramètres.
2. Cliquez sur **Archive** et confirmez.

Les groupes archivés disparaissent de la liste principale des groupes. Pour en trouver un à nouveau, activez la bascule **Show archived** en haut de la page Groups, puis cliquez sur **Restore** à côté du groupe pour le ramener.

:::info
Archiver un groupe ne supprime pas ses membres, son historique d'attendance ou ses événements de calendrier -- il cache juste le groupe de la liste par défaut jusqu'à ce que vous le restauriez.
:::

## Prochaines étapes

Après avoir créé et configuré votre groupe, vous êtes prêt à :

- **Ajouter des membres** -- Recherchez des personnes et ajoutez-les au groupe. Utilisez l'icône de clé verte pour désigner les leaders de groupe. Voir [Group Members](./group-members.md).
- **Configurer un calendrier** -- Créez des événements et des réunions récurrentes pour le groupe. Voir [Group Calendar](./group-calendar.md).
- **Communiquer** -- Envoyez des messages à tous les membres du groupe directement depuis la page du groupe.
- **Exporter les données** -- Cliquez sur l'icône de téléchargement pour exporter la liste des membres de votre groupe.

:::info
Tous vos groupes d'église sont organisés par catégories sur la page principale des groupes. Vous pouvez toujours réorganiser ou renommer les catégories à mesure que votre église grandit.
:::
