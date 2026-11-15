---
title: "Campus"
description: "Configurez les campus dans B1 Admin pour suivre le site auquel appartient chaque personne et chaque groupe, puis filtrez les personnes, les présences et les données démographiques par lieu."
---

# Campus

<div class="article-intro">

Si votre église se réunit à plus d'un endroit, les **campus** vous permettent de suivre le site auquel appartient chaque personne et chaque groupe. Une fois configurés, les campus apparaissent comme option dans les fiches de personnes, dans la configuration des présences et dans le tableau de bord des données démographiques. Les églises multisites peuvent filtrer, rechercher et produire des rapports par campus dans toute l'application B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation **Modifier les paramètres de l'église** pour gérer les campus. Voir [Rôles et autorisations](./roles-permissions.md).

</div>

## Ouvrir les paramètres des campus {#opening-campus-settings}

Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Paramètres > Paramètres**, puis cliquez sur **Campus** dans la liste de gauche pour atteindre la section **Campus**. Vous pouvez aussi y accéder directement à l'adresse **/settings/campuses**. Vous verrez la liste de tous les campus configurés, avec leur nom, leur emplacement et leur fuseau horaire.

## Ajouter un campus {#adding-a-campus}

1. Cliquez sur **Ajouter un campus**.
2. Renseignez les détails du campus :
   - **Nom** *(obligatoire)* — le nom affiché dans toute l'application B1 Admin (par exemple, « Campus principal » ou « Campus nord »).
   - **Adresse** et **Adresse, ligne 2** — l'adresse postale du campus (affichée à titre informatif ; elle ne remplace pas l'adresse principale de votre église dans les Paramètres de l'église).
   - **Ville / Province / Code postal** — l'emplacement du campus.
   - **Fuseau horaire** — le fuseau horaire IANA de ce campus (par exemple, *America/Chicago*). Les [horaires de pointage](../attendance/setup.md#setting-a-check-in-schedule) des services de ce campus s'ouvrent et se ferment selon ce fuseau. S'il est réglé sur **Aucun**, c'est le [fuseau horaire](./church-settings.md#time-zone) de votre église qui est utilisé. Utile lorsque les campus se trouvent dans des fuseaux horaires différents.
   - **Site web** — une URL facultative pour la présence web propre à ce campus.
3. Cliquez sur **Enregistrer**.

La liste affiche le **nom**, l'**emplacement** (ville et province) et le **fuseau horaire** de chaque campus, et l'élément **Campus** de la liste de gauche indique combien de lieux vous avez.

## Modifier un campus {#editing-a-campus}

Cliquez sur n'importe quelle ligne de campus dans la liste pour ouvrir son éditeur dans le panneau à droite. Modifiez les champs puis cliquez sur **Enregistrer**, ou sur **Annuler** pour fermer l'éditeur sans enregistrer.

## Supprimer un campus {#deleting-a-campus}

Ouvrez un campus pour le modifier et cliquez sur **Supprimer**. Une confirmation vous sera demandée. Supprimer un campus ne retire pas les personnes qui lui sont rattachées : leur champ campus devient simplement vide.

## Rattacher des personnes à un campus {#assigning-people-to-a-campus}

Après avoir créé les campus, le personnel peut rattacher une personne à un campus depuis son profil :

1. Ouvrez la fiche d'une personne dans **Personnes**.
2. Cliquez sur **Modifier**.
3. Choisissez le campus dans la liste déroulante **Campus**.
4. Cliquez sur **Enregistrer**.

Vous pouvez aussi mettre à jour le campus en lot depuis la page Personnes. Sélectionnez plusieurs personnes, utilisez **Modification en lot**, puis définissez le champ Campus pour tout le monde à la fois.

## Filtrer par campus {#filtering-by-campus}

Une fois les campus configurés, vous pouvez filtrer par campus dans toute l'application B1 Admin :

- **Recherche de personnes** — ajoutez une condition Campus dans la recherche avancée, ou chargez une [liste enregistrée](../people/lists.md) limitée à un campus.
- **Données démographiques** — le [tableau de bord des données démographiques](../people/demographics.md) affiche un graphique en anneau par campus dès qu'au moins une personne y est rattachée.
- **Configuration des présences** — chaque horaire de service dans les présences peut être associé à un campus.

:::tip
Les églises à un seul lieu n'ont pas besoin de configurer les campus. Toutes les fonctions liées aux campus sont facultatives : s'il n'existe aucun campus, les champs et graphiques correspondants n'apparaissent tout simplement pas.
:::

## Articles connexes {#related-articles}

- [Paramètres de l'église](./church-settings.md) — l'adresse principale de votre église et son image de marque (distincte des adresses des campus)
- [Données démographiques](../people/demographics.md) — le graphique de répartition par campus
- [Configuration des présences](../attendance/setup.md) — associer les horaires de service à un campus
- [Modification en lot](../people/bulk-editing.md) — rattacher un campus à plusieurs personnes à la fois
