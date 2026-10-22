---
title: "Lieux d'implantation"
---

# Lieux d'implantation {#campuses}

<div class="article-intro">

Si votre église se réunit dans plus d'un lieu, les **lieux d'implantation** vous permettent de suivre à quel site appartient chaque personne et chaque groupe. Une fois configurés, les lieux d'implantation apparaissent comme option sur les fiches de personnes, dans la configuration de la présence et dans le tableau de bord Démographie. Les églises multi-sites peuvent filtrer, rechercher et établir des rapports par lieu d'implantation dans toute B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation **Modifier les paramètres de l'église** pour gérer les lieux d'implantation. Voir [Rôles et permissions](./roles-permissions.md).

</div>

## Accéder aux paramètres des lieux d'implantation {#opening-campus-settings}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, puis cliquez sur **Lieux d'implantation** dans la liste de gauche pour atteindre la section **Lieux d'implantation**. Vous pouvez aussi y accéder directement à l'adresse **/settings/campuses**. Vous verrez la liste de tous les lieux d'implantation configurés, avec leur nom, leur emplacement et leur fuseau horaire.

## Ajouter un lieu d'implantation {#adding-a-campus}

1. Cliquez sur **Ajouter un lieu d'implantation**.
2. Renseignez les détails du lieu :
   - **Nom** *(obligatoire)* : le nom affiché dans toute B1 Admin (par exemple, « Campus principal » ou « Campus Nord »).
   - **Adresse** : l'adresse postale du lieu (à titre informatif ; ce n'est pas l'adresse principale de votre église, qui figure dans les Paramètres de l'église).
   - **Ville / Région / Code postal** : l'emplacement du lieu.
   - **Fuseau horaire** : le fuseau horaire IANA de ce lieu (par exemple, *America/Chicago*). Les [horaires d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) des services de ce lieu s'ouvrent et se ferment selon ce fuseau. S'il est réglé sur **Aucun**, le [fuseau horaire](./church-settings.md#time-zone) de votre église est utilisé à la place. Utile lorsque les lieux se trouvent dans des fuseaux horaires différents.
   - **Site web** : une URL facultative pour la présence web propre à ce lieu.
3. Cliquez sur **Enregistrer**.

## Modifier un lieu d'implantation {#editing-a-campus}

Cliquez sur n'importe quelle ligne de lieu dans la liste pour ouvrir son éditeur dans le panneau de droite. Mettez à jour les champs puis cliquez sur **Enregistrer**.

## Supprimer un lieu d'implantation {#deleting-a-campus}

Ouvrez un lieu pour le modifier et cliquez sur **Supprimer**. Une confirmation vous sera demandée. La suppression d'un lieu n'efface pas les personnes qui y sont rattachées : leur champ de lieu devient simplement vide.

## Attribuer des personnes à un lieu d'implantation {#assigning-people-to-a-campus}

Après avoir créé les lieux, le personnel peut attribuer une personne à un lieu depuis son profil :

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Cliquez sur **Modifier**.
3. Choisissez le lieu dans la liste déroulante **Lieu d'implantation**.
4. Cliquez sur **Enregistrer**.

Vous pouvez aussi mettre à jour le lieu en lot depuis la page Personnes. Sélectionnez plusieurs personnes, utilisez **Modification groupée**, puis définissez le champ Lieu d'implantation pour tout le monde à la fois.

## Filtrer par lieu d'implantation {#filtering-by-campus}

Une fois les lieux configurés, vous pouvez filtrer B1 Admin par lieu :

- **Recherche de personnes** : ajoutez une condition Lieu d'implantation dans la recherche avancée, ou chargez une [liste enregistrée](../people/lists.md) limitée à un lieu.
- **Démographie** : le [tableau de bord Démographie](../people/demographics.md) affiche un graphique en anneau Lieu d'implantation dès qu'au moins une personne a un lieu attribué.
- **Configuration de la présence** : chaque horaire de service dans la Présence peut être lié à un lieu.

:::tip
Les églises à site unique n'ont pas besoin de configurer des lieux d'implantation. Toutes les fonctionnalités liées aux lieux sont facultatives : si aucun lieu n'existe, les champs et graphiques correspondants n'apparaissent tout simplement pas.
:::

## Articles connexes {#related-articles}

- [Paramètres de l'église](./church-settings.md) : l'adresse principale de votre église et son image de marque (distincte des adresses des lieux)
- [Démographie](../people/demographics.md) : le graphique de répartition par lieu d'implantation
- [Configuration de la présence](../attendance/setup.md) : lier les horaires de service à un lieu
- [Modification groupée](../people/bulk-editing.md) : attribuer un lieu à plusieurs personnes à la fois
