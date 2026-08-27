---
title: "Création de calendriers"
---

# Création de calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de créer une vue curée des événements en connectant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe dans leurs groupes, et votre calendrier affiche ces événements en un seul endroit. Les administrateurs ayant un accès en modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe non-administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous avez besoin d'un accès administratif à la section Calendriers dans B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, naviguez vers **Site web**, puis vers la section **Calendriers**.
2. Cliquez sur **Ajouter un calendrier**.
3. Entrez un **nom** pour votre calendrier (par exemple, « Événements du ministère de la jeunesse » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** optionnelle pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détails du calendrier

Après avoir créé un calendrier, cliquez dessus pour ouvrir la page de détails. Cette page a deux zones principales :

- **Colonne gauche** -- Une vue du calendrier montrant les événements extraits des groupes connectés.
- **Colonne droite** -- La liste des groupes associés. C'est là que vous gérez quels groupes sont inclus dans ce calendrier.

## Connexion de groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste des groupes sur le côté droit de la page de détails.

1. Cliquez sur **Ajouter** dans la section groupes pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante.
3. Choisissez d'inclure **tous les événements** de ce groupe ou uniquement les **événements spécifiques**.
4. Cliquez sur **Enregistrer**.

:::tip
Connecter des groupes à votre calendrier est un moyen puissant d'agréger automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), il peut s'intégrer à votre calendrier à l'échelle de l'église sans travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un calendrier unique qui extrait les événements de nombreux groupes dans votre église, consultez [Calendrier curé](curated-calendar) pour une approche simplifiée.
:::

## Activation de l'enregistrement aux événements

Vous pouvez activer l'enregistrement pour tout événement du calendrier afin que les membres puissent s'inscrire via le site web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Enregistrement**.
3. Configurez les paramètres d'enregistrement :
   - **Capacité** (optionnel) -- Définissez un nombre maximal d'enregistrements. Laissez vide pour illimité.
   - **L'enregistrement s'ouvre** -- La date et l'heure auxquelles l'enregistrement devient disponible.
   - **L'enregistrement ferme** -- La date et l'heure auxquelles l'enregistrement ferme.
   - **Étiquettes** -- Étiquettes séparées par des virgules (par exemple, « jeunesse, retraite, vbs ») pour aider à catégoriser les événements enregistrables.
   - **Questions d'enregistrement** -- Associez éventuellement un [formulaire](../forms/creating-forms.md) afin que les participants répondent à des questions supplémentaires (restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.) dans le cadre de l'inscription. Choisissez **Aucun** pour ignorer les questions.
   - **Activer la liste d'attente** -- Lorsque l'événement se remplit, laissez les participants supplémentaires rejoindre une liste d'attente au lieu d'être rejetés. Consultez [Enregistrements payants](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir les **Types de participants** à prix, les **Sélections** optionnelles (modules complémentaires) et les **Codes de réduction**, avec paiement collecté via le fournisseur de dons de votre église. Consultez [Enregistrements payants](paid-registrations) pour la procédure complète.

Une fois l'enregistrement activé, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils verront l'événement sur le [site web B1](../../b1-church/events/registering) ou l'[application mobile B1](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les participants verront une étape **Questions** lors de l'enregistrement et leurs réponses seront enregistrées avec leur enregistrement.

:::info
Les questions d'enregistrement ne fonctionnent qu'avec les formulaires qui ne sont **pas** marqués comme Restreints. Un formulaire restreint est ignoré automatiquement lors de l'enregistrement plutôt que affiché, donc utilisez un formulaire non restreint lorsque vous attachez des questions à un événement.
:::

### Gestion des enregistrements

Pour afficher et gérer les enregistrements pour vos événements :

1. Naviguez vers la page **Enregistrements** dans B1 Admin.
2. Vous verrez un tableau de tous les événements avec enregistrement activé, affichant le titre de l'événement, la date, le nombre d'enregistrements actuel par rapport à la capacité et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des enregistrements, y compris les noms, le nombre de membres, les types de participants, le statut de paiement et la date d'enregistrement.
4. À partir de la page de détails, vous pouvez :
   - **Ajouter un participant** -- Enregistrez manuellement quelqu'un qui s'est inscrit hors ligne ou par téléphone.
   - **Annuler** les enregistrements individuels
   - **Supprimer** définitivement les enregistrements
   - **Promouvoir** les enregistrements de liste d'attente lorsqu'une place se libère
   - **Exporter CSV** -- Téléchargez tous les enregistrements, y compris les types de participants, les sélections, les montants de paiement et les réponses aux questions

Si l'événement contient des questions d'enregistrement attachées, la page de détails affiche également un filtre **Uniquement les questions sans réponse** pour trouver rapidement les participants qui n'ont pas soumis de réponses, et un bouton **Afficher les réponses** sur chaque enregistrement répondu pour voir ses réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, les décomptes par type et une boîte de dialogue des détails de paiement -- consultez [Enregistrements payants](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de la capacité pour surveiller la rapidité avec laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement atteint ou dépasse la capacité.
:::

## Étapes suivantes

- [Calendrier curé](curated-calendar) -- Créez un calendrier qui extrait les événements de plusieurs groupes
- [Enregistrements payants](paid-registrations) -- Types de participants, sélections de modules complémentaires, codes de réduction, paiements et listes d'attente
- [Guide d'enregistrement aux événements](../guides/event-registration) -- Guide étape par étape pour configurer l'enregistrement aux événements
- [Aperçu des calendriers](./) -- Retour à l'aperçu des calendriers
