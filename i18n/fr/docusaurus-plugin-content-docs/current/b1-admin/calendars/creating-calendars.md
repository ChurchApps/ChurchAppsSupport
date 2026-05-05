---
title: "Création de calendriers"
---

# Création de calendriers

<div class="article-intro">

La création d'un calendrier dans B1 Admin vous permet de construire une vue organisée des événements en connectant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe au sein de leurs groupes, et votre calendrier affiche ces événements en un seul endroit. Même un administrateur de domaine ne peut pas ajouter ou modifier des événements directement dans la section calendrier, sauf s'il est responsable du groupe auquel appartiennent les événements.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous avez besoin d'un accès administratif à la section Calendriers dans B1 Admin

</div>

## Création d'un nouveau calendrier

1. Dans B1 Admin, naviguez vers **Site Web**, puis vers la section **Calendriers**.
2. Cliquez sur **Ajouter un calendrier**.
3. Saisissez un **nom** pour votre calendrier (par exemple, "Événements du ministère des jeunes" ou "Calendrier principal de l'église").
4. Ajoutez une **description** facultative pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détails du calendrier

Après avoir créé un calendrier, cliquez dessus pour ouvrir la page de détails. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Une vue du calendrier montrant les événements extraits des groupes connectés.
- **Colonne de droite** -- La liste des groupes associés. C'est ici que vous gérez les groupes inclus dans ce calendrier.

## Connexion des groupes

Les groupes ayant des événements dans le calendrier apparaissent automatiquement dans la liste des groupes sur le côté droit de la page de détails.

1. Cliquez sur **Ajouter** dans la section des groupes pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans le menu déroulant.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **des événements spécifiques**.
4. Cliquez sur **Enregistrer**.

:::tip
Connecter des groupes à votre calendrier est un moyen puissant d'agréger automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), celui-ci peut être intégré à votre calendrier à l'échelle de l'église sans aucun travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un calendrier unique qui extrait des événements de nombreux groupes dans votre église, consultez [Calendrier organisé](curated-calendar) pour une approche rationalisée.
:::

## Activation de l'inscription aux événements

Vous pouvez activer l'inscription pour tout événement du calendrier afin que les membres puissent s'inscrire via le site Web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximum d'inscriptions. Laissez vide pour illimité.
   - **Ouverture des inscriptions** -- La date et l'heure auxquelles l'inscription devient disponible.
   - **Fermeture des inscriptions** -- La date et l'heure auxquelles l'inscription se termine.
   - **Étiquettes** -- Libellés séparés par des virgules (par exemple, "jeunes, retraite, évb") pour aider à catégoriser les événements avec inscription.
4. Enregistrez l'événement.

Une fois l'inscription activée, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consulteront l'événement sur le [site Web B1](../../b1-church/events/registering) ou [l'application mobile B1](../../b1-mobile/events/registering).

### Gestion des inscriptions

Pour consulter et gérer les inscriptions pour vos événements :

1. Naviguez vers la page **Inscriptions** dans B1 Admin.
2. Vous verrez un tableau de tous les événements avec inscription activée, affichant le titre de l'événement, la date, le nombre d'inscriptions actuel par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des inscriptions, y compris les noms, le nombre de membres, le statut et la date d'inscription.
4. Depuis la page de détails, vous pouvez :
   - **Annuler** les inscriptions individuelles
   - **Supprimer** les inscriptions de façon permanente
   - **Exporter** toutes les inscriptions au format CSV

:::tip
Utilisez la barre de progression de capacité pour surveiller la rapidité avec laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement est à pleine capacité ou la dépasse.
:::

## Prochaines étapes

- [Calendrier organisé](curated-calendar) -- Créez un calendrier qui extrait des données de plusieurs groupes
- [Guide d'inscription aux événements](../guides/event-registration) -- Guide étape par étape pour configurer l'inscription aux événements
- [Présentation des calendriers](./) -- Retour à la présentation des calendriers
