---
title: "Lieux d'implantation"
---

# Lieux d'implantation

<div class="article-intro">

Si votre église se réunit à plus d'un endroit, les **Lieux d'implantation** vous permettent de suivre quel site chaque personne et groupe appartient. Une fois configurés, les lieux d'implantation apparaissent comme une option sur les profils des personnes, dans la configuration de la participation, et dans le tableau de bord Données démographiques. Les églises multi-sites peuvent filtrer, rechercher et générer des rapports par lieu d'implantation dans tout B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Modifier les paramètres de l'église** pour gérer les lieux d'implantation. Voir [Rôles et autorisations](./roles-permissions.md).

</div>

## Ouverture des paramètres de lieux d'implantation

Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, et sélectionnez la fiche **Lieux d'implantation**. Vous pouvez également y aller directement à **/settings/campuses**. Vous verrez une liste de tous les lieux d'implantation configurés avec leur nom, emplacement et fuseau horaire.

## Ajout d'un lieu d'implantation

1. Cliquez sur **Ajouter un lieu d'implantation** (ou le bouton **+** s'il n'y a pas encore de lieux d'implantation).
2. Remplissez les détails du lieu d'implantation :
   - **Nom** *(obligatoire)* — le nom d'affichage affiché dans tout B1 Admin (par exemple, « Lieu principal » ou « Lieu Nord »).
   - **Adresse** — l'adresse de rue du lieu d'implantation (utilisée pour l'affichage informatif ; pas la même que votre adresse d'église principale dans Paramètres d'église).
   - **Ville / État / Code postal** — l'emplacement du lieu d'implantation.
   - **Fuseau horaire** — le fuseau horaire IANA pour ce lieu d'implantation (par exemple, *America/Chicago*). Utile lorsque les lieux d'implantation sont dans des fuseaux horaires différents.
   - **Site Web** — une URL facultative pour la propre présence web de ce lieu d'implantation.
3. Cliquez sur **Enregistrer**.

## Modification d'un lieu d'implantation

Cliquez sur n'importe quelle ligne de lieu d'implantation dans la liste pour ouvrir son éditeur dans le panneau à droite. Mettez à jour les champs et cliquez sur **Enregistrer**.

## Suppression d'un lieu d'implantation

Ouvrez un lieu d'implantation pour le modifier et cliquez sur **Supprimer**. Vous serez invité à confirmer. La suppression d'un lieu d'implantation ne supprime pas les personnes qui y sont assignées -- leur champ de lieu d'implantation devient simplement vide.

## Attribution de personnes à un lieu d'implantation

Après avoir créé des lieux d'implantation, le personnel peut assigner une personne à un lieu d'implantation à partir de son profil :

1. Ouvrez le dossier d'une personne dans **Personnes**.
2. Cliquez sur **Modifier**.
3. Choisissez le lieu d'implantation dans la liste déroulante **Lieu d'implantation**.
4. Cliquez sur **Enregistrer**.

Vous pouvez également mettre à jour le lieu d'implantation en masse à partir de la page Personnes. Sélectionnez plusieurs personnes, utilisez **Modification en masse**, et définissez le champ Lieu d'implantation pour tout le monde à la fois.

## Filtrage par lieu d'implantation

Une fois que les lieux d'implantation sont configurés, vous pouvez filtrer dans tout B1 Admin par lieu d'implantation :

- **Recherche de personnes** -- ajoutez une condition de Lieu d'implantation dans la recherche avancée, ou chargez une [Liste enregistrée](../people/lists.md) limitée à un lieu d'implantation.
- **Données démographiques** -- le [tableau de bord Données démographiques](../people/demographics.md) affiche un diagramme circulaire de Lieu d'implantation lorsqu'au moins une personne a un lieu d'implantation assigné.
- **Configuration de la participation** -- chaque heure de service en Participation peut être liée à un lieu d'implantation.

:::tip
Les églises d'un seul endroit n'ont pas besoin de configurer les lieux d'implantation. Toutes les fonctionnalités des lieux d'implantation sont facultatives -- s'il n'existe aucun lieu d'implantation, les champs et diagrammes de lieux d'implantation ne s'affichent simplement pas.
:::

## Articles connexes

- [Paramètres d'église](./church-settings.md) — l'adresse principale de votre église et la marque (distincte des adresses des lieux d'implantation)
- [Données démographiques](../people/demographics.md) — le diagramme de répartition du Lieu d'implantation
- [Configuration de la participation](../attendance/setup.md) -- associer les heures de service à un lieu d'implantation
- [Modification en masse](../people/bulk-editing.md) — assigner un lieu d'implantation à de nombreuses personnes à la fois

