---
title: "Campus"
---

# Campus

<div class="article-intro">

Si votre église se réunit à plus d'un endroit, les **Campus** vous permettent de suivre quel site chaque personne et groupe appartient. Une fois configurés, les campus apparaissent comme option sur les profils de personne, dans la configuration de la participation, et dans le tableau de bord Démographie. Les églises multi-sites peuvent filtrer, rechercher et rapporter par campus dans toute B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Éditer les Paramètres de l'Église** pour gérer les campus. Voir [Rôles et Permissions](./roles-permissions.md).

</div>

## Ouverture des Paramètres du Campus

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche), choisissez **Paramètres**, et sélectionnez **Campus** dans la navigation Paramètres. Vous verrez une liste de tous les campus configurés avec leur nom, emplacement et fuseau horaire.

## Ajout d'un Campus

1. Cliquez sur **Ajouter un Campus** (ou le bouton **+** si aucun campus n'existe encore).
2. Remplissez les détails du campus :
   - **Nom** *(requis)* — le nom d'affichage affiché dans toute B1 Admin (par exemple, "Campus Principal" ou "Campus Nord").
   - **Adresse** — l'adresse de la rue du campus (utilisée pour l'affichage informatif ; pas la même que l'adresse de votre église principale dans les Paramètres de l'Église).
   - **Ville / État / Code Postal** — l'emplacement du campus.
   - **Fuseau Horaire** — le fuseau horaire IANA pour ce campus (par exemple, *America/Chicago*). Utile lorsque les campus sont dans différents fuseaux horaires.
   - **Site Web** — une URL facultative pour la présence web propre de ce campus.
3. Cliquez sur **Enregistrer**.

## Édition d'un Campus

Cliquez sur n'importe quelle ligne de campus dans la liste pour ouvrir son éditeur dans le panneau à droite. Mettez à jour les champs et cliquez sur **Enregistrer**.

## Suppression d'un Campus

Ouvrez un campus pour édition et cliquez sur **Supprimer**. On vous demandera de confirmer. Supprimer un campus ne supprime pas les personnes qui y sont assignées — leur champ campus devient simplement vide.

## Assignation de Personnes à un Campus

Après la création des campus, le personnel peut assigner une personne à un campus à partir de son profil :

1. Ouvrez un dossier de personne dans **Personnes**.
2. Cliquez sur **Éditer**.
3. Choisissez le campus dans la liste déroulante **Campus**.
4. Cliquez sur **Enregistrer**.

Vous pouvez aussi mettre à jour le campus en masse à partir de la page Personnes. Sélectionnez plusieurs personnes, utilisez **Édition en Masse**, et réglez le champ Campus pour tout le monde à la fois.

## Filtrage par Campus

Une fois les campus configurés, vous pouvez filtrer dans B1 Admin par campus :

- **Recherche Personnes** — ajouter une condition Campus dans la recherche avancée, ou charger une [Liste Enregistrée](../people/lists.md) limitée à un campus.
- **Démographie** — le [tableau de bord Démographie](../people/demographics.md) affiche un graphique en anneau Campus lorsqu'au moins une personne a un campus assigné.
- **Configuration de la Participation** — chaque heure de service dans Participation peut être liée à un campus.
