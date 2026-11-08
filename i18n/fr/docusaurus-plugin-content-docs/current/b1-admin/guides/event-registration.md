---
title: "Guide : Configurer l'inscription à un événement"
description: "Configurez un formulaire d'inscription à un événement dans B1 Admin pour recueillir les coordonnées des participants et les paiements facultatifs, l'intégrer à votre site web d'église et suivre les inscriptions."
---

# Configurer l'inscription à un événement

<div class="article-intro">

Créez un formulaire d'inscription à un événement, recueillez les informations des participants et les paiements facultatifs, intégrez-le à votre site web d'église et gérez les soumissions au fur et à mesure qu'elles arrivent. Au terme de ce guide, vous disposerez d'une page d'inscription partageable pour n'importe quel événement de votre église.

</div>

:::info
**Deux façons de gérer l'inscription à un événement :** Ce guide porte sur l'**inscription par formulaire**, qui vous donne un contrôle total sur les champs personnalisés et la collecte des paiements. Pour les événements plus simples, où il suffit de savoir qui participe, utilisez l'**inscription native aux événements** intégrée au calendrier -- consultez [Créer des calendriers](../calendars/creating-calendars.md#enabling-event-registration) pour les instructions de configuration. L'inscription native permet aux membres de s'inscrire directement depuis [B1.church ou l'application B1](../../b1-church/events/registering.md), avec un suivi des places disponibles, des périodes d'inscription et des confirmations par courriel.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès administrateur
- Pour recueillir des paiements : [Stripe doit être configuré](../donations/online-giving-setup.md) au préalable

</div>

## Étape 1 : Créer un formulaire autonome

Les formulaires autonomes ont leur propre URL publique, accessible à tous -- parfait pour les inscriptions à un événement.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md) pour :

1. Accéder à Formulaires et cliquer sur Ajouter un formulaire
2. Choisir le type « Autonome » -- cela donne à votre formulaire sa propre URL publique
3. Le nommer d'après l'événement (par exemple, « Inscription à la retraite des hommes », « Inscription à l'École biblique de vacances »)

## Étape 2 : Ajouter des questions

Créez les champs dont vous avez besoin pour recueillir les informations des inscrits.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md#adding-questions) pour ajouter vos questions :

1. Allez dans l'onglet Questions et ajoutez les champs correspondant aux informations recherchées : nom, courriel, téléphone, restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.
2. Utilisez Choix multiples pour les options telles que les préférences de repas ou les choix de sessions

:::warning
Le type de champ Paiement nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Étape 3 : Configurer les paramètres du formulaire

Définissez à quel moment et de quelle manière votre formulaire d'inscription est disponible.

1. Définissez les dates de disponibilité si l'inscription ne doit être ouverte que pendant une durée limitée
2. Copiez l'URL publique -- vous pouvez la partager directement
3. Ajoutez des membres du formulaire avec les rôles Admin ou Lecture seule pour vous aider à gérer les soumissions

## Étape 4 : Intégrer à votre site web

Facilitez la découverte du formulaire d'inscription en l'ajoutant à votre site web d'église.

Suivez le guide [Gérer les pages](../website/managing-pages.md) pour :

1. Dans l'éditeur de votre site web B1, ajouter une nouvelle section à une page et sélectionner l'élément Formulaire
2. Choisir votre formulaire d'inscription dans la liste

:::tip
Partagez aussi l'URL autonome par courriel, sur les réseaux sociaux et dans les bulletins de l'église -- plus il y a d'endroits où le formulaire est visible, plus vous recevrez d'inscriptions.
:::

## Étape 5 : Gérer les soumissions

Suivez les inscriptions au fur et à mesure et exportez les données lorsque vous en avez besoin.

Suivez le guide [Gérer les soumissions](../forms/managing-submissions.md) pour :

1. Consulter les réponses au fur et à mesure qu'elles arrivent dans l'onglet Soumissions
2. Exporter au format CSV pour les tableurs, le suivi du nombre de participants ou le partage avec les coordonnateurs d'événements

## Vous avez terminé !

Votre inscription à l'événement est en ligne. Partagez le lien, intégrez-le à votre site web et suivez les inscriptions depuis B1 Admin. Une fois l'événement terminé, exportez la liste finale pour vos archives.

## Articles connexes

- [Créer des formulaires](../forms/creating-forms.md) -- créer des formulaires avec différents types de champs
- [Gérer les soumissions](../forms/managing-submissions.md) -- consulter et exporter les réponses aux formulaires
- [Gérer les pages](../website/managing-pages.md) -- intégrer des formulaires à votre site web
- [Configuration des dons en ligne](../donations/online-giving-setup.md) -- requis pour les champs de paiement
