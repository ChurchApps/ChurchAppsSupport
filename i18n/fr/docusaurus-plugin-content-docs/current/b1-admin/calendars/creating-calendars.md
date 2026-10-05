---
title: "Créer des calendriers"
---

# Créer des calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de créer une vue organisée des événements en connectant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe au sein de leurs groupes, et votre calendrier affiche ces événements en un seul endroit. Les administrateurs ayant accès à la modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe non-administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous devez avoir accès administratif à la section Calendriers dans B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, et cliquez sur **Calendriers**.
2. Cliquez sur **Ajouter un calendrier**.
3. Entrez un **nom** pour votre calendrier (par exemple, « Événements du ministère des jeunes » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** optionnelle pour aider votre équipe à comprendre l'objectif de ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page des détails du calendrier

Après avoir créé un calendrier, cliquez dessus pour ouvrir la page des détails. Cette page comporte deux zones principales :

- **Colonne de gauche** – Une vue du calendrier montrant les événements provenant des groupes connectés.
- **Colonne de droite** – La liste des groupes associés. C'est ici que vous gérez les groupes inclus dans ce calendrier.

## Connecter des groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste des groupes sur le côté droit de la page des détails.

1. Cliquez sur **Ajouter** dans la section groupes pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **des événements spécifiques**.
4. Cliquez sur **Enregistrer**.

:::tip
Connecter des groupes à votre calendrier est un moyen puissant d'agréger automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), il peut circuler vers votre calendrier au niveau de l'église sans aucun travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un calendrier unique qui récupère les événements de nombreux groupes dans votre église, consultez [Calendrier organisé](curated-calendar) pour une approche rationalisée.
:::

## Activation de l'enregistrement aux événements

Vous pouvez activer l'enregistrement pour tout événement de calendrier afin que les membres puissent s'inscrire via le site Web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez l'option **Enregistrement**.
3. Configurez les paramètres d'enregistrement :
   - **Capacité** (optionnelle) – Définissez un nombre maximal d'enregistrements. Laissez vide pour illimité.
   - **L'enregistrement commence** – La date et l'heure auxquelles l'enregistrement devient disponible.
   - **L'enregistrement se termine** – La date et l'heure auxquelles l'enregistrement se termine.
   - **Étiquettes** – Libellés séparés par des virgules (par exemple, « jeunes, retraite, vbs ») pour aider à catégoriser les événements enregistrables.
   - **Questions d'enregistrement** – Joignez éventuellement un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.) dans le cadre de leur inscription. Choisissez **Aucun** pour ignorer les questions.
   - **Activer la liste d'attente** – Quand l'événement est complet, laissez les inscrits supplémentaires rejoindre une liste d'attente au lieu d'être refusés. Voir [Enregistrements payants](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir les **types de participants** avec prix, les **sélections** optionnelles (modules complémentaires) et les **codes de réduction**, avec paiement collecté par le fournisseur de dons de votre église. Voir [Enregistrements payants](paid-registrations) pour la procédure complète.

Une fois l'enregistrement activé, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils afficheront l'événement sur le [site Web B1](../../b1-church/events/registering) ou l'[application mobile B1](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'enregistrement et leurs réponses sont enregistrées avec leur enregistrement.

:::info
Les questions d'enregistrement ne fonctionnent que avec des formulaires qui ne sont **pas** marqués comme Restreints. Un formulaire restreint est automatiquement ignoré lors de l'enregistrement au lieu d'être affiché, utilisez donc un formulaire non restreint lorsque vous joignez des questions à un événement.
:::

### Gestion des enregistrements

Pour afficher et gérer les enregistrements de vos événements :

1. Dans le menu Accès rapide, choisissez **Calendriers > Enregistrements**.
2. Vous verrez un tableau de tous les événements avec enregistrement activé, montrant le titre de l'événement, la date, le nombre d'enregistrements actuel par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des enregistrements, y compris les noms, le nombre de membres, les types de participants, le statut de paiement, et la date d'enregistrement.
4. À partir de la page de détails, vous pouvez :
   - **Ajouter un participant** – Enregistrer manuellement quelqu'un qui s'est inscrit hors ligne ou par téléphone.
   - **Annuler** des enregistrements individuels
   - **Supprimer** les enregistrements définitivement
   - **Promouvoir** les enregistrements en liste d'attente quand une place se libère
   - **Exporter CSV** – Télécharger tous les enregistrements, y compris les types de participants, les sélections, les montants des paiements, et les réponses aux questions

Si l'événement a des questions d'enregistrement jointes, la page de détails affiche également un filtre **Seulement les questions sans réponse** pour trouver rapidement les inscrits qui n'ont pas soumis de réponses, et un bouton **Voir les réponses** sur chaque enregistrement répondu pour voir ses réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, des comptages par type, et une boîte de dialogue de détails des paiements -- voir [Enregistrements payants](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de la capacité pour surveiller la vitesse à laquelle les événements se remplissent. La barre devient rouge quand un événement est à capacité ou dépasse la capacité.
:::

## Étapes suivantes

- [Calendrier organisé](curated-calendar) – Créer un calendrier qui tire de plusieurs groupes
- [Enregistrements payants](paid-registrations) – Types de participants, sélections de modules complémentaires, codes de réduction, paiements, et listes d'attente
- [Guide d'enregistrement aux événements](../guides/event-registration) – Guide étape par étape pour configurer l'enregistrement aux événements
- [Aperçu des calendriers](./) – Revenir à l'aperçu des calendriers
