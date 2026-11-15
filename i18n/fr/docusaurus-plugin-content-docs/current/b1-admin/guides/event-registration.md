---
title: "Guide : Configurer l'inscription aux événements"
description: "Configurez un formulaire d'inscription à un événement dans B1 Admin pour recueillir les coordonnées des participants et les paiements facultatifs, l'intégrer à votre site web et suivre les inscriptions."
---

# Configurer l'inscription aux événements

<div class="article-intro">

Créez un formulaire d'inscription à un événement, recueillez les renseignements des participants et les paiements facultatifs, intégrez-le à votre site web et gérez les soumissions au fur et à mesure qu'elles arrivent. Au terme de ce guide, vous disposerez d'une page d'inscription partageable pour n'importe quel événement de votre église.

</div>

:::info
**Deux façons de gérer l'inscription aux événements :** ce guide traite de **l'inscription par formulaire** -- un formulaire Autonome avec son propre lien public, des questions personnalisées et un champ de paiement facultatif. Pour un événement inscrit à votre calendrier, vous pouvez plutôt utiliser l'**inscription aux événements** intégrée au calendrier -- voir [Création de calendriers](../calendars/creating-calendars.md#enabling-event-registration). Elle permet aux membres de s'inscrire directement depuis [B1.church ou l'application B1](../../b1-church/events/registering.md), avec une capacité, des dates d'ouverture et de fermeture, une liste d'attente, des questions d'inscription facultatives tirées d'un formulaire, et des types de participants avec prix (voir [Inscriptions payantes](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès administrateur
- Pour recueillir des paiements : [Stripe doit être configuré](../donations/online-giving-setup.md) au préalable

</div>

## Étape 1 : Créer un formulaire Autonome {#step-1-create-a-stand-alone-form}

Les formulaires Autonomes ont leur propre adresse web publique que n'importe qui peut consulter -- parfait pour l'inscription à un événement.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md) pour :

1. Dans le [menu Jump](../introduction.md#getting-around-with-the-jump-menu), choisissez **Personnes > Formulaires** et cliquez sur **Ajouter un formulaire**
2. Nommez-le d'après l'événement (par exemple « Inscription à la retraite des hommes », « Inscription au VBS »)
3. Dans **Associer à**, choisissez **Autonome** -- cela donne à votre formulaire sa propre adresse web publique
4. Cliquez sur **Enregistrer**

## Étape 2 : Ajouter des questions {#step-2-add-questions}

Construisez les champs dont vous avez besoin pour recueillir les renseignements des participants.

Suivez le guide [Créer des formulaires](../forms/creating-forms.md#adding-questions) pour ajouter vos questions :

1. Ouvrez le formulaire, allez dans l'onglet **Questions** et cliquez sur **Ajouter une question** pour chaque renseignement dont vous avez besoin : nom, courriel, téléphone, restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.
2. Utilisez **Choix multiple** pour des options comme les préférences de repas ou le choix de sessions
3. Pour recueillir des frais, ajoutez une question de type **Paiement** et choisissez son **Fonds** et son **Montant**

:::warning
Le type de champ Paiement exige que Stripe soit configuré. Si vous n'avez pas encore configuré les dons en ligne, consultez la [Configuration des dons en ligne](../donations/online-giving-setup.md) avant d'ajouter des champs de paiement.
:::

## Étape 3 : Configurer les paramètres du formulaire {#step-3-configure-form-settings}

Contrôlez quand et comment votre formulaire d'inscription est disponible. Suivez la section [Configurer les propriétés du formulaire](../forms/creating-forms.md#configuring-form-properties) pour :

1. Cliquer sur **Modifier le formulaire** et, si l'inscription ne doit être ouverte que pendant une période limitée, régler **Définir une période de disponibilité du formulaire** sur **Oui**, puis choisir les dates de début et de fin
2. Copier l'**adresse web publique** affichée à gauche de la page du formulaire -- vous pouvez la partager directement. Cliquez sur **Code QR** à côté du formulaire dans la liste des Formulaires pour télécharger un code QR destiné aux feuillets et aux diapositives
3. Dans l'onglet **Membres du formulaire**, ajoutez des personnes comme **Administrateur** ou **Consultation seulement** pour vous aider à gérer les soumissions, et activez **Notification par courriel** pour toute personne qui doit recevoir un courriel à chaque nouvelle inscription

## Étape 4 : Intégrer le formulaire à votre site web {#step-4-embed-on-your-website}

Rendez le formulaire d'inscription facile à trouver en l'ajoutant au site web de votre église.

Suivez le guide [Éditeur de pages](../website/page-editor.md) pour :

1. Ouvrir une page dans l'éditeur de votre site web B1 et cliquer sur **Ajouter du contenu**
2. Glisser l'élément **Formulaire** dans une section et choisir votre formulaire d'inscription

:::tip
Partagez aussi l'adresse web autonome par courriel, sur les réseaux sociaux et dans les feuillets de l'église -- plus le formulaire est visible, plus il y aura d'inscriptions.
:::

## Étape 5 : Gérer les soumissions {#step-5-manage-submissions}

Suivez les inscriptions au fur et à mesure qu'elles arrivent et exportez les données lorsque vous en avez besoin.

Suivez le guide [Gérer les soumissions](../forms/managing-submissions.md) pour :

1. Examiner les réponses au fur et à mesure qu'elles arrivent dans l'onglet **Soumissions du formulaire**
2. Cliquer sur **Exporter** pour télécharger un CSV destiné aux tableurs, au suivi du nombre de participants ou au partage avec les coordonnateurs de l'événement

## Terminé ! {#youre-done}

Votre inscription à l'événement est en ligne. Partagez le lien, intégrez-le à votre site web et suivez les inscriptions depuis B1 Admin. Une fois l'événement terminé, exportez la liste finale pour vos registres.

## Articles connexes {#related-articles}

- [Créer des formulaires](../forms/creating-forms.md) — créez des formulaires avec différents types de champs
- [Gérer les soumissions](../forms/managing-submissions.md) — examinez et exportez les réponses aux formulaires
- [Éditeur de pages](../website/page-editor.md) — intégrez des formulaires à votre site web
- [Configuration des dons en ligne](../donations/online-giving-setup.md) — requise pour les champs de paiement
