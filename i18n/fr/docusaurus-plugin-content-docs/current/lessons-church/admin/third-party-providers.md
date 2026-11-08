---
title: "Fournisseurs tiers"
description: "Ajoutez un flux de programmes au format Open Lesson sur la page Fournisseurs externes de Lessons.church, puis modifiez-le ou supprimez-le afin que votre église puisse planifier ses leçons."
---

# Fournisseurs tiers

<div class="article-intro">

Lessons.church prend en charge les fournisseurs de programmes externes grâce au format Open Lesson. Votre église peut ainsi connecter des programmes proposés par d'autres organisations et les planifier pour vos classes, à côté de la bibliothèque intégrée. Votre équipe dispose ainsi de programmes provenant de plusieurs sources au même endroit.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Connectez-vous à Lessons.church avec un compte autorisé à gérer les plannings des classes de votre église
- Obtenez l'URL du flux auprès du fournisseur externe que vous souhaitez connecter. Ce flux doit renvoyer des leçons au [format Open Lesson](./open-lesson-format.md)

</div>

## Ajouter un fournisseur

1. Cliquez sur **Fournisseurs externes** dans la navigation de Lessons.church. La page **Fournisseurs de leçons externes** s'ouvre.
2. Cliquez sur **Ajouter un fournisseur**. Si vous n'en avez encore ajouté aucun, cliquez plutôt sur **Ajouter le premier fournisseur**.
3. Saisissez un **Nom du fournisseur**. C'est le nom que votre équipe verra lorsqu'elle choisira le fournisseur.
4. Saisissez l'**URL de l'API**. C'est l'adresse à laquelle le fournisseur publie ses programmes au format Open Lesson.
5. Cliquez sur **Enregistrer**.

Le fournisseur n'est ajouté que pour votre église. Il apparaît ensuite comme un choix sous **Fournisseur** lorsque vous [planifiez une leçon](../classrooms/scheduling-lessons.md) pour une classe, et sous **Source** lorsque vous créez un [plan annuel](./managing-year-plans.md).

## Gérer les fournisseurs

La page **Fournisseurs de leçons externes** répertorie tous les fournisseurs ajoutés par votre église. Pour en modifier un :

- **Modifier** -- Cliquez sur l'icône **Modifier le fournisseur** (crayon), modifiez le **Nom du fournisseur** ou l'**URL de l'API**, puis cliquez sur **Enregistrer**.
- **Supprimer** -- Cliquez sur l'icône **Modifier le fournisseur**, puis sur l'icône de suppression (corbeille) et confirmez.

## Qu'est-ce que le format Open Lesson ?

Le format Open Lesson est un schéma normalisé qui décrit le contenu des programmes (programmes, études, leçons, lieux, sections et actions) de manière structurée. Toute organisation qui publie son contenu selon ce format peut être ajoutée comme fournisseur dans Lessons.church.

Si vous êtes un fournisseur de contenu et souhaitez rendre vos programmes disponibles sur Lessons.church, vous trouverez la documentation complète du schéma dans le guide [Format Open Lesson](./open-lesson-format.md).

## Pourquoi utiliser des fournisseurs tiers ?

- **Plus de choix pour les églises** -- Les églises peuvent parcourir une plus grande variété de programmes sans quitter la plateforme.
- **Un seul endroit pour tout** -- Les bénévoles et les coordinateurs n'ont pas besoin de consulter plusieurs sites pour trouver et planifier des leçons.
- **Une configuration simple** -- Ajouter un fournisseur ne demande qu'un nom et une URL de flux. Aucune saisie manuelle de données ni import de fichiers n'est nécessaire.

:::info
Le contenu tiers est géré par le fournisseur externe. Si vous remarquez qu'un contenu d'un fournisseur est manquant ou obsolète, le problème doit peut-être être résolu de son côté.
:::

:::tip
Pour savoir à quoi ressemblent les leçons d'un fournisseur externe une fois planifiées, consultez [Fournisseurs externes](../browsing/external-providers.md) dans la section Consultation.
:::
