---
title: "Créer des calendriers"
---

# Créer des calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de construire une vue organisée des événements en connectant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe au sein de leurs groupes, et votre calendrier affiche ces événements en un seul endroit. Même un administrateur de domaine ne peut pas ajouter ou modifier directement des événements dans la section calendrier, sauf s'il est responsable du groupe auquel les événements appartiennent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous voulez inclure les événements dans votre calendrier
- Vous avez besoin d'un accès administratif à la section Calendriers dans B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, allez dans **Site web**, puis dans la section **Calendriers**.
2. Cliquez sur **Ajouter un calendrier**.
3. Saisissez un **nom** pour votre calendrier (par exemple, « Événements Ministère Jeunesse » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** facultative pour aider votre équipe à comprendre l'utilité de ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détail du calendrier

Après avoir créé un calendrier, cliquez dessus pour ouvrir la page de détail. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Une vue du calendrier montrant les événements provenant des groupes connectés.
- **Colonne de droite** -- La liste des groupes associés. C'est ici que vous gérez quels groupes sont inclus dans ce calendrier.

## Connecter des groupes

Les groupes dont les événements figurent dans le calendrier apparaissent automatiquement dans la liste des groupes à droite de la page de détail.

1. Cliquez sur **Ajouter** dans la section des groupes pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans le menu déroulant.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement des **événements spécifiques**.
4. Cliquez sur **Enregistrer**.

:::tip
Connecter des groupes à votre calendrier est un moyen puissant d'agréger automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), celui-ci peut être intégré à votre calendrier à l'échelle de l'église sans travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un seul calendrier qui rassemble les événements de nombreux groupes de votre église, consultez [Calendrier organisé](curated-calendar) pour une approche simplifiée.
:::

## Activer l'inscription aux événements

Vous pouvez activer l'inscription pour n'importe quel événement de calendrier afin que les membres puissent s'inscrire via le site web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximal d'inscriptions. Laissez vide pour illimité.
   - **Ouverture des inscriptions** -- La date et l'heure à partir desquelles l'inscription devient disponible.
   - **Fermeture des inscriptions** -- La date et l'heure de fermeture des inscriptions.
   - **Étiquettes** -- Libellés séparés par des virgules (par ex. « jeunesse, retraite, vbs ») pour aider à catégoriser les événements ouverts à l'inscription.
   - **Questions d'inscription** -- Vous pouvez éventuellement attacher un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.) lors de leur inscription. Choisissez **Aucun** pour ne pas poser de questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permettez aux inscrits supplémentaires de rejoindre une liste d'attente plutôt que d'être refusés. Consultez [Inscriptions payantes](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir des **Types de participants** tarifés, des **Sélections** facultatives (options supplémentaires), et des **Codes de réduction**, le paiement étant collecté via le fournisseur de dons de votre église. Consultez [Inscriptions payantes](paid-registrations) pour le guide complet.

Une fois l'inscription activée, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consultent l'événement sur le [site web B1](../../b1-church/events/registering) ou l'[application B1 Mobile](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'inscription et leurs réponses sont enregistrées avec leur inscription.

:::info
Les Questions d'inscription ne fonctionnent qu'avec des formulaires qui ne sont **pas** marqués comme Restreints. Un formulaire restreint est automatiquement ignoré pendant l'inscription plutôt qu'affiché, donc utilisez un formulaire non restreint pour joindre des questions à un événement.
:::

### Gérer les inscriptions

Pour consulter et gérer les inscriptions à vos événements :

1. Accédez à la page **Inscriptions** dans B1 Admin.
2. Vous verrez un tableau de tous les événements avec inscription activée, indiquant le titre de l'événement, la date, le nombre actuel d'inscriptions par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des inscriptions, incluant les noms, le nombre de participants, les types de participants, le statut de paiement, et la date d'inscription.
4. Depuis la page de détail, vous pouvez :
   - **Ajouter un participant** -- Inscrire manuellement une personne qui s'est inscrite hors ligne ou par téléphone.
   - **Annuler** des inscriptions individuelles
   - **Supprimer** des inscriptions définitivement
   - **Promouvoir** des inscriptions en liste d'attente lorsqu'une place se libère
   - **Exporter en CSV** -- Télécharger toutes les inscriptions, y compris les types de participants, les sélections, les montants payés et les réponses aux questions

Si l'événement comporte des Questions d'inscription, la page de détail affiche également un filtre **Questions sans réponse uniquement** pour trouver rapidement les inscrits qui n'ont pas encore soumis de réponses, ainsi qu'un bouton **Voir les réponses** sur chaque inscription ayant répondu pour consulter ses réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, des décomptes par type, et une boîte de dialogue de détail des paiements -- voir [Inscriptions payantes](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de capacité pour surveiller la vitesse à laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement atteint ou dépasse sa capacité.
:::

## Étapes suivantes

- [Calendrier organisé](curated-calendar) -- Créer un calendrier qui rassemble plusieurs groupes
- [Inscriptions payantes](paid-registrations) -- Types de participants, sélections d'options, codes de réduction, paiements et listes d'attente
- [Guide d'inscription aux événements](../guides/event-registration) -- Guide étape par étape pour configurer l'inscription aux événements
- [Vue d'ensemble des calendriers](./) -- Retour à la vue d'ensemble des calendriers
