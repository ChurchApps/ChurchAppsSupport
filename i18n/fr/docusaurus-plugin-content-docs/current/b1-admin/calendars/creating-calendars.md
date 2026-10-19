---
title: "Créer des calendriers"
---

# Créer des calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de bâtir une vue personnalisée des événements en reliant un ou plusieurs groupes. Les événements sont gérés par les responsables de chaque groupe, et votre calendrier affiche ces événements à un seul endroit. Les administrateurs disposant d'un accès en modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe qui ne sont pas administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous avez besoin d'un accès administrateur à la section Calendriers de B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, puis cliquez sur **Calendriers**.
2. Cliquez sur **Ajouter un calendrier** en haut de la page. Le formulaire de nouveau calendrier s'ouvre sous la liste des calendriers.
3. Saisissez un **nom** pour votre calendrier (par exemple, « Événements du ministère jeunesse » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** facultative pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détail du calendrier

Après avoir créé un calendrier, cliquez sur **Gérer les événements** sur sa ligne pour ouvrir la page de détail. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Le nom du calendrier accompagné de ses actions (**Nouvel événement**, **Modifier**, **Importer .ics** et **Imprimer**), suivi de la liste **Groupes dans le calendrier** qui indique les groupes inclus dans ce calendrier. Cliquez sur **Retirer** à côté d'un groupe pour le retirer du calendrier.
- **Zone principale** -- La vue **Événements du calendrier** qui présente les événements provenant des groupes reliés, avec les boutons **S'abonner** et **Ajouter un groupe** au-dessus.

## Relier des groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste **Groupes dans le calendrier**, sur le côté gauche de la page de détail.

1. Cliquez sur **Ajouter un groupe** au-dessus du calendrier pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **des événements précis**.
4. Cliquez sur **Enregistrer**.

:::tip
Relier des groupes à votre calendrier est un moyen efficace de regrouper automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), celui-ci peut alimenter le calendrier de toute l'église sans aucun effort supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un seul calendrier qui regroupe les événements de nombreux groupes de votre église, consultez [Calendrier personnalisé](curated-calendar) pour une méthode simplifiée.
:::

## Ajouter et modifier des événements {#adding-and-editing-events}

Cliquez sur **Nouvel événement** sur la page de détail du calendrier pour ajouter un événement, ou cliquez sur un événement du calendrier puis sur **Modifier** pour le changer. Le formulaire **Nouvel événement** / **Modifier l'événement** comprend les champs suivants :

- **Groupe** -- Le groupe auquel appartient l'événement. Si votre église a des modèles d'événements, vous pouvez aussi choisir un **Modèle** pour remplir le formulaire.
- **Titre**
- **Photo de l'événement** -- Cliquez sur **Ajouter une photo** (ou sur la case photo vide) pour choisir ou téléverser une image, recadrée au format large 16:9. Cliquez sur **Changer la photo** pour la remplacer. La photo s'affiche en haut de la page de l'événement sur votre site Web, ainsi que dans sa vignette lorsqu'un élément Calendrier affiche les **Événements à venir** (voir [Afficher les événements sur votre site Web](#showing-events-on-your-website)).
- **Description** -- Affichée sur la page de l'événement de votre site Web. Le texte en gras, les listes et les liens sont pris en charge.
- **Début** et **Fin**, **Répétition** et **Visibilité** (**Public** ou **Privé**).
- **Étiquettes** -- Des libellés séparés par des virgules, comme `jeunes, étudiants`. Un élément Calendrier de votre site Web peut être configuré pour n'afficher que les événements portant une certaine étiquette. Il s'agit du même champ **Étiquettes** que celui des paramètres d'inscription de l'événement.
- **Qui peut voir les notes** et **Qui peut publier des notes** -- Les personnes qui peuvent lire et ajouter des notes à l'événement (voir [Notes d'événement](#event-notes)). Choisissez **Personnel uniquement** (par défaut), **Responsables de groupe** (les responsables du groupe de l'événement) ou **Membres du groupe** (toutes les personnes du groupe de l'événement, y compris ses responsables).
- **Salles** et **Ressources** -- Réservez l'espace et le matériel pour l'événement. Voir [Salles, ressources et planification](rooms-resources).

Cliquez sur **Enregistrer**. Si l'événement se répète, B1 vous demande de confirmer, car l'enregistrement met à jour chaque occurrence de la série.

### Notes d'événement {#event-notes}

Chaque événement dispose de son propre fil de notes pour la planification et le suivi. Cliquez sur un événement dans la page de détail du calendrier ; la fenêtre affiche les détails de l'événement, ses rappels, et ses **Notes** en dessous. Saisissez une note et publiez-la pour l'ajouter au fil.

Le personnel autorisé à modifier le contenu ou à administrer les calendriers peut toujours lire et publier des notes d'événement. Les paramètres **Qui peut voir les notes** et **Qui peut publier des notes** de l'événement déterminent si les responsables ou les membres du groupe de l'événement peuvent également le faire.

### Afficher les événements sur votre site Web {#showing-events-on-your-website}

Pour placer un calendrier sur votre site Web, ajoutez un élément **Calendrier** à une page et choisissez ce calendrier. L'élément peut afficher un calendrier mensuel ou une grille de vignettes d'événements à venir, et peut être limité aux événements portant une seule étiquette. Les visiteurs qui cliquent sur un événement ouvrent sa propre page. Voir [Utiliser l'élément Calendrier](../website/page-editor.md#using-the-calendar-element).

## Activer l'inscription aux événements {#enabling-event-registration}

Vous pouvez activer l'inscription pour n'importe quel événement de calendrier afin que les membres puissent s'inscrire via le site Web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximal d'inscriptions. Laissez vide pour un nombre illimité.
   - **Ouverture des inscriptions** -- La date et l'heure à partir desquelles l'inscription devient disponible.
   - **Fermeture des inscriptions** -- La date et l'heure de fermeture des inscriptions.
   - **Étiquettes** -- Libellés séparés par des virgules (par exemple, « jeunes, retraite, VBS ») pour aider à classer les événements auxquels on peut s'inscrire.
   - **Questions d'inscription** -- Vous pouvez facultativement joindre un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (régime alimentaire, taille de t-shirt, contact d'urgence, etc.) lors de leur inscription. Choisissez **Aucun** pour ne pas poser de questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permet aux inscrits supplémentaires de rejoindre une liste d'attente au lieu d'être refusés. Voir [Inscriptions payantes](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir des **Types de participants** tarifés, des **Options** facultatives (suppléments) et des **Codes de réduction**, avec un paiement collecté par le fournisseur de dons de votre église. Voir [Inscriptions payantes](paid-registrations) pour le guide complet.

Une fois l'inscription activée, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consulteront l'événement sur le [site Web B1](../../b1-church/events/registering) ou l'[application mobile B1](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'inscription, et leurs réponses sont enregistrées avec leur inscription.

:::info
Les questions d'inscription ne fonctionnent qu'avec les formulaires qui **ne** sont **pas** marqués comme Restreints. Un formulaire restreint est ignoré automatiquement pendant l'inscription au lieu d'être affiché ; utilisez donc un formulaire non restreint lorsque vous joignez des questions à un événement.
:::

### Gérer les inscriptions

Pour consulter et gérer les inscriptions à vos événements :

1. Dans le menu Sauter, choisissez **Calendriers > Inscriptions**.
2. Un tableau présente tous les événements pour lesquels l'inscription est activée, avec le titre de l'événement, la date, le nombre d'inscriptions actuel par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des inscriptions, y compris les noms, le nombre de membres, les types de participants, l'état du paiement et la date d'inscription.
4. Depuis la page de détail, vous pouvez :
   - **Ajouter un participant** -- Inscrire manuellement une personne qui s'est inscrite hors ligne ou par téléphone.
   - **Annuler** des inscriptions individuelles
   - **Supprimer** des inscriptions définitivement
   - **Promouvoir** des inscriptions en liste d'attente lorsqu'une place se libère
   - **Exporter en CSV** -- Télécharger toutes les inscriptions, y compris les types de participants, les options, les montants payés et les réponses aux questions

Si l'événement comporte des questions d'inscription, la page de détail affiche aussi un filtre **Questions sans réponse uniquement** pour repérer rapidement les inscrits qui n'ont pas encore répondu, ainsi qu'un bouton **Voir les réponses** sur chaque inscription ayant répondu, afin de consulter leurs réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, les totaux par type et une fenêtre de détail des paiements -- voir [Inscriptions payantes](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de la capacité pour suivre la vitesse à laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement atteint ou dépasse sa capacité.
:::

## Étapes suivantes

- [Calendrier personnalisé](curated-calendar) -- Créer un calendrier qui puise dans plusieurs groupes
- [Inscriptions payantes](paid-registrations) -- Types de participants, options, codes de réduction, paiements et listes d'attente
- [Guide d'inscription aux événements](../guides/event-registration) -- Guide pas à pas pour configurer l'inscription aux événements
- [Vue d'ensemble des calendriers](./) -- Revenir à la vue d'ensemble des calendriers
