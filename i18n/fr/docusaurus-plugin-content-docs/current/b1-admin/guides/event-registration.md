---
title: "Guide : Mettre en place l'inscription aux événements"
---

# Mettre en place l'inscription aux événements

<div class="article-intro">

Créez un formulaire d'inscription à un événement, recueillez les informations des participants et les paiements optionnels, intégrez-le sur le site web de votre église, et gérez les soumissions au fur et à mesure. À la fin, vous disposerez d'une page d'inscription partageable pour tout événement de votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur
- Pour collecter des paiements : [Stripe doit être configuré](../donations/online-giving-setup.md) au préalable

</div>

## Étape 1 : Créer un formulaire autonome

Les formulaires autonomes ont leur propre URL publique accessible à tous -- parfait pour l'inscription aux événements.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md) pour :

1. Accéder à Formulaires et cliquer sur Ajouter un formulaire
2. Choisir le type « Autonome » -- cela donne à votre formulaire sa propre URL publique
3. Le nommer d'après l'événement (par exemple, « Inscription à la retraite des hommes », « Inscription à l'école biblique de vacances »)

## Étape 2 : Ajouter des questions

Construisez les champs nécessaires pour recueillir les informations des inscrits.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md#ajouter-des-questions) pour ajouter vos questions :

1. Allez dans l'onglet Questions et ajoutez des champs pour les informations dont vous avez besoin : nom, e-mail, téléphone, restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.
2. Utilisez le type Choix multiple pour des options comme les préférences de repas ou la sélection d'ateliers

:::warning
Le type de champ Paiement nécessite que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Étape 3 : Configurer les paramètres du formulaire

Contrôlez quand et comment votre formulaire d'inscription est disponible.

1. Définissez des dates de disponibilité si l'inscription ne doit être ouverte que pour une durée limitée
2. Copiez l'URL publique -- vous pouvez la partager directement
3. Ajoutez des membres au formulaire avec les rôles Administrateur ou Consultation seule pour aider à gérer les soumissions

## Étape 4 : Intégrer sur votre site web

Rendez le formulaire d'inscription facile à trouver en l'ajoutant au site web de votre église.

Suivez le guide [Gestion des pages](../website/managing-pages.md) pour :

1. Dans l'éditeur de votre site web B1, ajouter une nouvelle section à une page et sélectionner l'élément Formulaire
2. Choisir votre formulaire d'inscription dans la liste

:::tip
Partagez également l'URL autonome par e-mail, sur les réseaux sociaux et dans les bulletins de l'église -- plus le formulaire est visible, plus vous recevrez d'inscriptions.
:::

## Étape 5 : Gérer les soumissions

Suivez les inscriptions au fur et à mesure et exportez les données quand vous en avez besoin.

Suivez le guide [Gestion des soumissions](../forms/managing-submissions.md) pour :

1. Consulter les réponses au fur et à mesure dans l'onglet Soumissions
2. Exporter en CSV pour les tableurs, le suivi des effectifs ou le partage avec les coordinateurs d'événements

## C'est terminé !

Votre inscription à l'événement est en ligne. Partagez le lien, intégrez-le sur votre site web et suivez les inscriptions depuis B1 Admin. Lorsque l'événement est terminé, exportez la liste finale pour vos archives.

## Articles connexes

- [Créer des formulaires](../forms/creating-forms.md) — créer des formulaires avec différents types de champs
- [Gestion des soumissions](../forms/managing-submissions.md) — consulter et exporter les réponses aux formulaires
- [Gestion des pages](../website/managing-pages.md) — intégrer des formulaires sur votre site web
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — requis pour les champs de paiement
