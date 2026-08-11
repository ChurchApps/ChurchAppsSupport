---
title: "Campus"
---

# Campus

<div class="article-intro">

Si votre église se réunit à plus d'un emplacement, les **Campus** vous permettent de suivre quel site chaque personne et groupe appartient. Une fois configurés, les campus apparaissent comme une option sur les profils de personnes, dans la configuration de la présence et sur le tableau de bord Données démographiques. Les églises multi-sites peuvent filtrer, rechercher et rapporter par campus tout au long de B1 Admin.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Modifier les paramètres de l'église** pour gérer les campus. Voir [Rôles et permissions](./roles-permissions.md).

</div>

## Ouverture des paramètres de campus

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche), choisissez **Paramètres** et sélectionnez **Campus** dans la navigation des paramètres. Vous verrez une liste de tous les campus configurés avec leur nom, emplacement et fuseau horaire.

## Ajout d'un campus

1. Cliquez sur **Ajouter un campus** (ou le bouton **+** s'il n'existe pas de campus).
2. Remplissez les détails du campus :
   - **Nom** *(requis)* — le nom d'affichage montré dans tout B1 Admin (par exemple, "Campus principal" ou "Campus nord").
   - **Adresse** — l'adresse de rue du campus (utilisée pour l'affichage informatif ; pas la même que votre adresse d'église principale dans les Paramètres de l'église).
   - **Ville / État / Code postal** — l'emplacement du campus.
   - **Fuseau horaire** — le fuseau horaire IANA pour ce campus (par exemple, *America/Chicago*). Utile quand les campus sont dans différents fuseaux horaires.
   - **Site web** — une URL optionnelle pour la présence web propre de ce campus.
3. Cliquez sur **Enregistrer**.

## Modification d'un campus

Cliquez sur n'importe quelle ligne de campus dans la liste pour ouvrir son éditeur dans le panneau à droite. Mettez à jour les champs et cliquez sur **Enregistrer**.

## Suppression d'un campus

Ouvrez un campus pour la modification et cliquez sur **Supprimer**. Vous serez demandé de confirmer. La suppression d'un campus ne supprime pas les personnes qui y sont assignées — leur champ de campus devient simplement vide.

## Assignation des personnes à un campus

Après avoir créé des campus, le personnel peut assigner une personne à un campus depuis son profil :

1. Ouvrez un dossier de personne dans **Personnes**.
2. Cliquez sur **Modifier**.
3. Choisissez le campus dans le menu déroulant **Campus**.
4. Cliquez sur **Enregistrer**.

Vous pouvez aussi mettre à jour le campus en masse depuis la page Personnes. Sélectionnez plusieurs personnes, utilisez **Modification en masse** et définissez le champ Campus pour tout le monde à la fois.

## Filtrage par campus

Une fois les campus configurés, vous pouvez filtrer dans B1 Admin par campus :

- **Recherche de personnes** — ajoutez une condition de campus dans la recherche avancée, ou chargez une [Liste enregistrée](../people/lists.md) limitée à un campus.
- **Données démographiques** — le [tableau de bord Données démographiques](../people/demographics.md) affiche un graphique d'anneau de campus quand au moins une personne a un campus assigné.
- **Configuration de la présence** — chaque heure de service en Présence peut être liée à un campus.

:::tip
Les églises à un seul emplacement n'ont pas besoin de configurer les campus. Toutes les fonctionnalités de campus sont optionnelles — s'il n'existe pas de campus, les champs de campus et les graphiques ne s'affichent tout simplement pas.
:::

## Articles connexes

- [Paramètres de l'église](./church-settings.md) — votre adresse d'église principale et la marque (séparé des adresses de campus)
- [Données démographiques](../people/demographics.md) — le graphique de répartition des campus
- [Configuration de la présence](../attendance/setup.md) — reliez les heures de service à un campus
- [Modification en masse](../people/bulk-editing.md) — assignez un campus à beaucoup de personnes à la fois
