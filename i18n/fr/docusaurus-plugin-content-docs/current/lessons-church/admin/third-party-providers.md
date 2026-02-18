---
title: "Fournisseurs tiers"
---

# Fournisseurs tiers

<div class="article-intro">

Lessons.church prend en charge les fournisseurs de programmes d'enseignement externes grâce au format Open Lesson Format. Cela signifie que vous pouvez importer du contenu d'autres organisations et le rendre disponible aux côtés de la bibliothèque intégrée, offrant aux églises l'accès à des programmes d'enseignement provenant de multiples sources en un seul endroit.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Disposer des autorisations d'administrateur pour Lessons.church (voir la [vue d'ensemble de l'administration](./index.md))
- Obtenir l'URL du flux auprès du fournisseur externe que vous souhaitez connecter

</div>

## Ajouter un fournisseur

1. Naviguez vers l'espace **Admin**.
2. Ouvrez la page **Third-Party**.
3. Cliquez sur **Add Provider** (ou le bouton équivalent pour ajouter une nouvelle connexion).
4. Saisissez l'**URL du flux** du fournisseur. C'est l'URL où le fournisseur publie ses données de programme d'enseignement au format Open Lesson Format.
5. Enregistrez la connexion.

Une fois enregistré, Lessons.church importera le contenu du fournisseur. Ses programmes, études et leçons apparaîtront dans la bibliothèque de programmes d'enseignement aux côtés de votre propre contenu.

## Gérer les fournisseurs

Depuis la page **Third-Party**, vous pouvez voir tous les fournisseurs connectés. Pour chaque fournisseur, vous pouvez :

- **Consulter** le contenu importé pour confirmer qu'il a été correctement récupéré.
- **Mettre à jour** l'URL du flux si le fournisseur change son point de terminaison.
- **Supprimer** un fournisseur si vous ne souhaitez plus inclure son contenu.

## Qu'est-ce que le format Open Lesson Format ?

Le format Open Lesson Format est un schéma standardisé qui décrit le contenu de programmes d'enseignement -- programmes, études, leçons, lieux, sections et actions -- de manière structurée. Toute organisation qui publie son contenu en utilisant ce format peut être ajoutée comme fournisseur dans Lessons.church.

Si vous êtes un fournisseur de contenu intéressé à rendre votre programme d'enseignement disponible via Lessons.church, vous pouvez trouver la documentation complète du schéma dans le dépôt [Open Lesson Schema](https://github.com/LiveChurchSolutions/LessonsScreen).

## Pourquoi utiliser des fournisseurs tiers ?

- **Plus de choix pour les églises** -- Les églises peuvent parcourir une plus grande variété de programmes d'enseignement sans quitter la plateforme.
- **Tout au même endroit** -- Les bénévoles et les coordinateurs n'ont pas besoin de visiter plusieurs sites web pour trouver et planifier des leçons.
- **Configuration facile** -- L'ajout d'un fournisseur ne nécessite qu'une URL de flux. Aucune saisie manuelle de données ni téléversement de fichiers n'est nécessaire.

:::info
Le contenu tiers est géré par le fournisseur externe. Si vous remarquez du contenu manquant ou obsolète d'un fournisseur, le problème devra peut-être être résolu de leur côté.
:::

:::tip
Pour la configuration des fournisseurs externes au niveau de l'église (et non au niveau administrateur), consultez la page [Fournisseurs externes](../browsing/external-providers.md) dans la section Parcourir le contenu.
:::
