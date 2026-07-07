---
title: "Création de calendriers"
---

# Création de calendriers

<div class="article-intro">

La création d'un calendrier dans B1 Admin vous permet de construire une vue sélectionnée des événements en connectant un ou plusieurs groupes. Les événements sont gérés par les leaders des groupes au sein de leurs groupes, et votre calendrier affiche ces événements en un seul endroit. Même un administrateur de domaine ne peut pas ajouter ou modifier directement les événements dans la section calendrier à moins qu'il soit leader du groupe auquel les événements appartiennent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous voulez inclure les événements dans votre calendrier
- Vous avez besoin d'un accès administratif à la section Calendriers dans B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, allez à **Site**, puis à la section **Calendriers**.
2. Cliquez sur **Ajouter un calendrier**.
3. Entrez un **nom** pour votre calendrier (par exemple, « Événements du ministère jeunesse » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** optionnelle pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détail du calendrier

Après la création d'un calendrier, cliquez dessus pour ouvrir la page de détail. Cette page a deux zones principales :

- **Colonne de gauche** -- Une vue du calendrier affichant les événements extraits des groupes connectés.
- **Colonne de droite** -- La liste des groupes associés. C'est ici que vous gérez les groupes inclus dans ce calendrier.

## Connexion de groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste des groupes sur le côté droit de la page de détail.

1. Cliquez sur **Ajouter** dans la section des groupes pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **des événements spécifiques**.
4. Cliquez sur **Enregistrer**.

:::tip
Connecter des groupes à votre calendrier est un moyen puissant d'agréger automatiquement les événements. Lorsqu'un leader de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), il peut être intégré à votre calendrier global de l'église sans aucun effort supplémentaire.
:::

:::info
Si vous souhaitez créer un seul calendrier qui récupère les événements de nombreux groupes dans votre église, consultez [Calendrier curé](curated-calendar) pour une approche rationalisée.
:::

## Activation de l'enregistrement aux événements

Vous pouvez activer l'enregistrement pour n'importe quel événement du calendrier afin que les membres puissent s'inscrire via le site B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, basculez **Enregistrement** pour l'activer.
3. Configurez les paramètres d'enregistrement :
   - **Capacité** (optionnel) -- Définissez un nombre maximum d'enregistrements. Laissez vide pour illimité.
   - **L'enregistrement s'ouvre** -- La date et l'heure auxquelles l'enregistrement devient disponible.
   - **L'enregistrement se ferme** -- La date et l'heure auxquelles l'enregistrement se ferme.
   - **Étiquettes** -- Étiquettes séparées par des virgules (par exemple, « jeunesse, retraite, vbs ») pour aider à catégoriser les événements enregistrables.
   - **Questions d'enregistrement** -- Joignez éventuellement un [formulaire](../forms/creating-forms.md) afin que les personnes inscrites répondent à des questions supplémentaires (restrictions alimentaires, taille du t-shirt, contact d'urgence, etc.) dans le cadre de l'inscription. Choisissez **Aucun** pour ignorer les questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permettez aux personnes inscrites supplémentaires de rejoindre une liste d'attente au lieu d'être refusées. Consultez [Enregistrements payants](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir des **Types d'assistants** avec prix, des **Sélections** optionnelles (compléments), et des **Codes de réduction**, avec le paiement collecté via le prestataire de dons de votre église. Consultez [Enregistrements payants](paid-registrations) pour la procédure complète.

Une fois l'enregistrement activé, les membres verront un bouton **S'enregistrer pour cet événement** lorsqu'ils verront l'événement sur le [site B1](../../b1-church/events/registering) ou l'[application B1 Mobile](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les personnes inscrites voient une étape **Questions** lors de l'enregistrement et leurs réponses sont enregistrées avec leur enregistrement.

:::info
Les questions d'enregistrement ne fonctionnent que avec des formulaires qui ne sont **pas** marqués comme Restreints. Un formulaire restreint est ignoré automatiquement lors de l'enregistrement plutôt que d'être affiché, donc utilisez un formulaire non restreint lors de l'ajout de questions à un événement.
:::

### Gestion des enregistrements

Pour afficher et gérer les enregistrements de vos événements :

1. Allez à la page **Enregistrements** dans B1 Admin.
2. Vous verrez un tableau de tous les événements avec enregistrement activé, affichant le titre de l'événement, la date, le nombre d'enregistrements actuel par rapport à la capacité et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des enregistrements, y compris les noms, le nombre de membres, les types d'assistants, le statut de paiement et la date d'enregistrement.
4. À partir de la page de détail, vous pouvez :
   - **Ajouter un assistant** -- Enregistrer manuellement quelqu'un qui s'est inscrit hors ligne ou par téléphone.
   - **Annuler** les enregistrements individuels
   - **Supprimer** les enregistrements définitivement
   - **Promouvoir** les enregistrements en liste d'attente quand une place se libère
   - **Exporter en CSV** -- Télécharger tous les enregistrements, y compris les types d'assistants, les sélections, les montants de paiement et les réponses aux questions

Si l'événement a des questions d'enregistrement attachées, la page de détail affiche également un filtre **Seules les questions sans réponse** pour trouver rapidement les personnes inscrites qui n'ont pas encore soumis de réponses, et un bouton **Afficher les réponses** sur chaque enregistrement avec réponse pour voir leurs réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, des comptages par type et une boîte de dialogue de détails des paiements -- consultez [Enregistrements payants](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de capacité pour surveiller la rapidité avec laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement est à capacité ou au-dessus.
:::

## Prochaines étapes

- [Calendrier curé](curated-calendar) -- Créer un calendrier qui récupère à partir de plusieurs groupes
- [Enregistrements payants](paid-registrations) -- Types d'assistants, sélections de compléments, codes de réduction, paiements et listes d'attente
- [Guide d'enregistrement aux événements](../guides/event-registration) -- Guide étape par étape pour configurer l'enregistrement aux événements
- [Aperçu des calendriers](./) -- Retour à l'aperçu des calendriers
