---
title: "Guide : Configuration de l'enregistrement aux événements"
---

# Configuration de l'enregistrement aux événements

<div class="article-intro">

Créez un formulaire d'enregistrement aux événements, collectez les informations des participants et les paiements optionnels, intégrez-le sur le site de votre église et gérez les soumissions au fur et à mesure. À la fin, vous aurez une page d'enregistrement partageable pour n'importe quel événement d'église.

</div>

:::info
**Deux façons de gérer l'enregistrement aux événements :** Ce guide couvre **l'enregistrement basé sur les formulaires**, qui vous donne un contrôle total sur les champs personnalisés et la collecte de paiements. Pour les événements plus simples où vous avez juste besoin de savoir qui vient, utilisez **l'enregistrement aux événements natif** intégré au calendrier -- voir [Création de calendriers](../calendars/creating-calendars.md#enabling-event-registration) pour les instructions de configuration. L'enregistrement natif permet aux membres de s'inscrire directement sur le [site web B1](../../b1-church/events/registering) et l'[application mobile](../../b1-mobile/events/registering) avec suivi de la capacité, fenêtres de dates et confirmations par e-mail.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur
- Pour collecte des paiements : [Stripe doit être configuré](../donations/online-giving-setup.md) en premier

</div>

## Étape 1 : Créer un formulaire autonome

Les formulaires autonomes ont leur propre URL publique accessible à n'importe qui -- parfait pour l'enregistrement aux événements.

Suivez le guide [Création de formulaires](../forms/creating-forms.md) pour :

1. Allez à Formulaires et cliquez sur Ajouter un formulaire
2. Choisissez le type "Autonome" -- cela donne à votre formulaire sa propre URL publique
3. Nommez-le après l'événement (par exemple, "Enregistrement à la retraite pour hommes", "Inscription à l'école du dimanche")

## Étape 2 : Ajouter des questions

Développez les champs dont vous avez besoin pour collecter auprès des inscrits.

Suivez le guide [Création de formulaires](../forms/creating-forms.md#adding-questions) pour ajouter vos questions :

1. Allez à l'onglet Questions et ajoutez des champs pour les informations dont vous avez besoin : nom, e-mail, téléphone, restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.
2. Utilisez Choix multiples pour les options comme les préférences de repas ou les sélections de session

:::warning
Le type de champ Paiement nécessite Stripe configuré. Si vous n'avez pas encore configuré les dons en ligne, voir [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Étape 3 : Configurer les paramètres du formulaire

Contrôlez quand et comment votre formulaire d'enregistrement est disponible.

1. Définissez les dates de disponibilité si l'enregistrement ne doit être ouvert que pendant une période limitée
2. Copiez l'URL publique -- vous pouvez la partager directement
3. Ajoutez des membres du formulaire avec des rôles Administrateur ou Affichage uniquement pour aider à gérer les soumissions

## Étape 4 : Intégrer sur votre site

Rendez le formulaire d'enregistrement facile à trouver en l'ajoutant à votre site d'église.

Suivez le guide [Gestion des pages](../website/managing-pages.md) pour :

1. Dans votre éditeur de site B1, ajoutez une nouvelle section à une page et sélectionnez l'élément Formulaire
2. Choisissez votre formulaire d'enregistrement dans la liste

:::tip
Partagez l'URL autonome par e-mail, réseaux sociaux et bulletins d'église aussi -- plus on la voit, plus vous aurez d'inscriptions.
:::

## Étape 5 : Gérer les soumissions

Suivez les enregistrements au fur et à mesure qu'ils arrivent et exportez les données lorsque vous en avez besoin.

Suivez le guide [Gestion des soumissions](../forms/managing-submissions.md) pour :

1. Examinez les réponses à mesure qu'elles arrivent sur l'onglet Soumissions
2. Exportez en CSV pour les feuilles de calcul, le suivi du nombre de participants ou le partage avec les coordinateurs d'événements

## Vous avez terminé !

Votre enregistrement aux événements est actif. Partagez le lien, intégrez-le sur votre site et suivez les inscriptions depuis B1 Admin. Lorsque l'événement est terminé, exportez la liste finale pour vos dossiers.

## Articles connexes

- [Création de formulaires](../forms/creating-forms.md) — construisez des formulaires avec différents types de champs
- [Gestion des soumissions](../forms/managing-submissions.md) — examinez et exportez les réponses au formulaire
- [Gestion des pages](../website/managing-pages.md) — intégrez des formulaires sur votre site
- [Configuration des dons en ligne](../donations/online-giving-setup.md) -- requis pour les champs de paiement
