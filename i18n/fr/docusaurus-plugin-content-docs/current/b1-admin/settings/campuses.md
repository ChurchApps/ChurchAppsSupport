---
title: "Campus"
---

# Campus

<div class="article-intro">

Si votre église se réunit dans plusieurs lieux, les **Campus** vous permettent de suivre à quel site appartient chaque personne et chaque groupe. Une fois configurés, les campus apparaissent comme option dans les fiches des personnes, dans la configuration de la présence et dans le tableau de bord Demographics. Les églises multi-sites peuvent filtrer, rechercher et établir des rapports par campus dans toute l'interface B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation **Edit Church Settings** pour gérer les campus. Consultez [Rôles et autorisations](./roles-permissions.md).

</div>

## Ouvrir les paramètres des campus

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), choisissez **Settings > Settings**, puis cliquez sur **Campuses** dans la liste de gauche pour atteindre la section **Campuses**. Vous pouvez aussi y accéder directement à l'adresse **/settings/campuses**. Vous verrez la liste de tous les campus configurés avec leur nom, leur emplacement et leur fuseau horaire.

## Ajouter un campus

1. Cliquez sur **Add Campus**.
2. Renseignez les informations du campus :
   - **Name** *(obligatoire)* — le nom affiché partout dans B1 Admin (par exemple « Campus principal » ou « Campus Nord »).
   - **Address** — l'adresse postale du campus (utilisée à titre informatif ; elle n'est pas la même que l'adresse principale de votre église dans les Paramètres de l'église).
   - **City / State / Zip** — l'emplacement du campus.
   - **Time Zone** — le fuseau horaire IANA de ce campus (par exemple *America/Chicago*). Les [horaires de pointage](../attendance/setup.md#setting-a-check-in-schedule) des services de ce campus s'ouvrent et se ferment selon ce fuseau horaire. S'il est défini sur **None**, c'est le [fuseau horaire](./church-settings.md#time-zone) de votre église qui est utilisé à la place. Utile lorsque les campus se trouvent dans des fuseaux horaires différents.
   - **Website** — une URL facultative pour la présence web propre à ce campus.
3. Cliquez sur **Save**.

## Modifier un campus

Cliquez sur n'importe quelle ligne de campus dans la liste pour ouvrir son éditeur dans le panneau à droite. Mettez à jour les champs puis cliquez sur **Save**.

## Supprimer un campus

Ouvrez un campus pour le modifier et cliquez sur **Delete**. Vous devrez confirmer l'action. La suppression d'un campus ne retire pas les personnes qui y sont rattachées : leur champ campus devient simplement vide.

## Affecter des personnes à un campus

Une fois les campus créés, le personnel peut affecter une personne à un campus depuis son profil :

1. Ouvrez la fiche d'une personne dans **People**.
2. Cliquez sur **Edit**.
3. Choisissez le campus dans la liste déroulante **Campus**.
4. Cliquez sur **Save**.

Vous pouvez également mettre à jour le campus en masse depuis la page People. Sélectionnez plusieurs personnes, utilisez **Bulk Edit** et définissez le champ Campus pour tout le monde en une fois.

## Filtrer par campus

Une fois les campus configurés, vous pouvez filtrer dans toute l'interface B1 Admin par campus :

- **Recherche de personnes** — ajoutez une condition Campus dans la recherche avancée, ou chargez une [liste enregistrée](../people/lists.md) limitée à un campus.
- **Demographics** — le [tableau de bord Demographics](../people/demographics.md) affiche un graphique en anneau Campus dès qu'au moins une personne a un campus attribué.
- **Configuration de la présence** — chaque créneau de service dans Attendance peut être rattaché à un campus.

:::tip
Les églises à site unique n'ont pas besoin de configurer des campus. Toutes les fonctionnalités liées aux campus sont facultatives : si aucun campus n'existe, les champs et graphiques liés aux campus n'apparaissent tout simplement pas.
:::

## Articles connexes

- [Paramètres de l'église](./church-settings.md) — l'adresse principale de votre église et son image de marque (distincte des adresses des campus)
- [Demographics](../people/demographics.md) — le graphique de répartition par campus
- [Configuration de la présence](../attendance/setup.md) — rattacher les créneaux de service à un campus
- [Modification en masse](../people/bulk-editing.md) — affecter un campus à plusieurs personnes à la fois
