---
title: "Campus"
---

# Campus

<div class="article-intro">

Si votre église se réunit à plus d'un endroit, les **Campus** vous permettent de suivre quel site chaque personne et groupe appartient. Une fois configurés, les campus apparaissent comme une option sur les profils des personnes, dans la configuration de la présence et dans le tableau de bord des données démographiques. Les églises multi-sites peuvent filtrer, rechercher et rapporter par campus tout au long de B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Éditer les paramètres de l'église** pour gérer les campus. Voir [Rôles & Autorisations](./roles-permissions.md).

</div>

## Ouverture des paramètres Campus

Dans B1 Admin, allez à **Paramètres** dans la barre latérale gauche et sélectionnez **Campus** dans la navigation des paramètres. Vous verrez une liste de tous les campus configurés avec leur nom, emplacement et fuseau horaire.

## Ajouter un Campus

1. Cliquez sur **Ajouter un Campus** (ou le bouton **+** s'il n'y a pas encore de campus).
2. Remplissez les détails du campus :
   - **Nom** *(obligatoire)* — le nom affiché tout au long de B1 Admin (par exemple, "Campus principal" ou "Campus nord").
   - **Adresse** — l'adresse de rue du campus (utilisée pour l'affichage informatif ; pas la même que votre adresse principale d'église dans Paramètres de l'église).
   - **Ville / État / Code postal** — l'emplacement du campus.
   - **Fuseau horaire** — le fuseau horaire IANA pour ce campus (par exemple, *America/Chicago*). Utile quand les campus sont dans des fuseaux horaires différents.
   - **Site Web** — une URL optionnelle pour la présence Web propre de ce campus.
3. Cliquez sur **Enregistrer**.

## Modification d'un Campus

Cliquez sur n'importe quelle ligne de campus dans la liste pour ouvrir son éditeur dans le panneau à droite. Mettez à jour les champs et cliquez sur **Enregistrer**.

## Suppression d'un Campus

Ouvrez un campus pour la modification et cliquez sur **Supprimer**. Vous serez invité à confirmer. Supprimer un campus ne supprime pas les personnes qui lui sont assignées -- leur champ de campus devient simplement vide.

## Attribution de personnes à un Campus

Après avoir créé des campus, le personnel peut assigner une personne à un campus à partir de son profil :

1. Ouvrez le registre d'une personne dans **Personnes**.
2. Cliquez sur **Modifier**.
3. Choisissez le campus dans la liste déroulante **Campus**.
4. Cliquez sur **Enregistrer**.

Vous pouvez aussi mettre à jour le campus en masse à partir de la page Personnes. Sélectionnez plusieurs personnes, utilisez **Modification en masse** et définissez le champ Campus pour tout le monde à la fois.

## Filtrage par Campus

Une fois les campus configurés, vous pouvez filtrer dans B1 Admin par campus :

- **Recherche de personnes** -- ajoutez une condition Campus dans la recherche avancée, ou chargez une [Liste enregistrée](../people/lists.md) limitée à un campus.
- **Données démographiques** -- le [tableau de bord des données démographiques](../people/demographics.md) affiche un graphique en anneau Campus quand au moins une personne a un campus assigné.
- **Configuration de la présence** -- chaque heure de service dans la présence peut être liée à un campus.

:::tip
Les églises à un seul emplacement n'ont pas besoin de configurer les campus. Toutes les fonctionnalités des campus sont optionnelles -- s'il n'y a pas de campus, les champs et les graphiques des campus simplement n'apparaissent pas.
:::

## Articles connexes

- [Paramètres de l'église](./church-settings.md) -- votre adresse principale d'église et marque (séparée des adresses de campus)
- [Données démographiques](../people/demographics.md) -- le graphique en anneau de répartition de Campus
- [Configuration de la présence](../attendance/setup.md) -- lier les heures de service à un campus
- [Modification en masse](../people/bulk-editing.md) -- assigner un campus à beaucoup de personnes à la fois
