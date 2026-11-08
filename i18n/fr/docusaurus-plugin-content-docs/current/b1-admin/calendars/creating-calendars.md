---
title: "Créer des calendriers"
description: "Créez un calendrier dans B1 Admin, associez des groupes ou importez des fichiers .ics, et gérez ses événements, inscriptions et notes depuis un seul endroit."
---

# Créer des calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de composer une vue personnalisée des événements en associant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe dans leurs groupes respectifs, et votre calendrier affiche ces événements à un seul endroit. Les administrateurs disposant d'un accès en modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe qui ne sont pas administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

## Vidéo de formation

<YouTube id="Ko3kgsCSLFs" title="Créer des calendriers, des événements et des réservations de salles dans B1" next="Inscriptions aux événements et événements payants dans B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous devez disposer d'un accès administrateur à la section Calendriers de B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, puis cliquez sur **Calendriers**.
2. Cliquez sur **Ajouter un calendrier** en haut de la page. Le formulaire de nouveau calendrier s'ouvre sous la liste des calendriers.
3. Saisissez un **nom** pour votre calendrier (par exemple, « Événements du ministère des jeunes » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** facultative pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détail du calendrier

Une fois le calendrier créé, cliquez sur **Gérer les événements** sur sa ligne pour ouvrir la page de détail. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Le nom du calendrier avec ses actions (**Nouvel événement**, **Modifier**, **Importer .ics** et **Imprimer**), suivi de la liste **Groupes dans le calendrier** qui indique les groupes inclus dans ce calendrier. Cliquez sur **Retirer** à côté d'un groupe pour le retirer du calendrier.
- **Zone principale** -- La vue **Événements du calendrier** affichant les événements provenant des groupes associés, avec les boutons **S'abonner** et **Ajouter un groupe** au-dessus.

## Associer des groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste **Groupes dans le calendrier**, sur la gauche de la page de détail.

1. Cliquez sur **Ajouter un groupe** au-dessus du calendrier pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante. La liste comprend tous les groupes de votre église, et pas seulement ceux dont vous êtes membre.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **certains événements** précis.
4. Cliquez sur **Enregistrer**.

Chaque événement n'apparaît qu'une seule fois dans le calendrier. Si vous ajoutez un groupe entier, les événements de ce groupe que vous aviez déjà ajoutés un par un sont intégrés à l'entrée du groupe, et choisir des événements précis d'un groupe déjà présent dans le calendrier n'ajoute rien de nouveau. Seuls les groupes ajoutés en entier figurent dans la liste **Groupes dans le calendrier**.

### Importer un fichier .ics

Cliquez sur **Importer .ics** pour importer des événements depuis un autre calendrier. Choisissez le **groupe** auquel les événements doivent appartenir, puis cliquez sur **Choisir un fichier .ics** ou collez le contenu du fichier, et cliquez sur **Importer**. Les événements sont créés dans ce groupe, et le groupe est ajouté au calendrier d'où vous avez importé, de sorte que les événements y apparaissent immédiatement.

### Retirer un événement du calendrier

Cliquez sur un événement du calendrier, puis cliquez sur **Retirer du calendrier**. Cette action retire seulement l'événement de ce calendrier : l'événement reste dans son groupe. Si l'événement figure dans le calendrier parce que tout son groupe a été ajouté, le retirer supprime de ce calendrier tous les événements de ce groupe (les événements restent dans le groupe). Pour supprimer définitivement un événement, supprimez-le depuis le [calendrier du groupe](../groups/group-calendar.md).

:::tip
Associer des groupes à votre calendrier est un moyen efficace de regrouper automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), celui-ci peut apparaître dans le calendrier de toute l'église sans aucun travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un calendrier unique qui regroupe les événements de nombreux groupes de votre église, consultez [Calendrier personnalisé](./curated-calendar.md) pour une méthode simplifiée.
:::

## Ajouter et modifier des événements {#adding-and-editing-events}

Cliquez sur **Nouvel événement** sur la page de détail du calendrier pour ajouter un événement, ou cliquez sur un événement du calendrier puis sur **Modifier** pour le changer. Le formulaire **Nouvel événement** / **Modifier l'événement** comporte les champs suivants :

- **Groupe** -- Le groupe auquel appartient l'événement. Si votre église utilise des modèles d'événements, vous pouvez aussi choisir un **Modèle** pour remplir le formulaire.
- **Titre**
- **Photo de l'événement** -- Cliquez sur **Ajouter une photo** (ou sur la case vide de photo) pour choisir ou téléverser une image, recadrée au format large 16:9. Cliquez sur **Changer la photo** pour la remplacer. La photo s'affiche en haut de la page de l'événement sur votre site web, ainsi que comme vignette lorsqu'un élément Calendrier affiche les **Événements à venir** (voir [Afficher les événements sur votre site web](#showing-events-on-your-website)).
- **Description** -- Affichée sur la page de l'événement sur votre site web. Le texte en gras, les listes et les liens sont pris en charge.
- **Début** et **Fin**, **Répétition** et **Visibilité** (**Public** ou **Privé**).
- **Étiquettes** -- Libellés séparés par des virgules, comme `jeunes, étudiants`. Un élément Calendrier sur votre site web peut être configuré pour n'afficher que les événements portant une certaine étiquette. Il s'agit du même champ **Étiquettes** que celui des paramètres d'inscription de l'événement.
- **Qui peut voir les notes** et **Qui peut publier des notes** -- Qui peut lire et ajouter des notes à l'événement (voir [Notes de l'événement](#event-notes)). Choisissez **Personnel uniquement** (par défaut), **Responsables de groupe** (responsables du groupe de l'événement) ou **Membres du groupe** (toutes les personnes du groupe de l'événement, y compris ses responsables).
- **Salles** et **Ressources** -- Réservez l'espace et le matériel nécessaires à l'événement. Voir [Salles, ressources et planification](./rooms-resources.md).

Cliquez sur **Enregistrer**. Si l'événement se répète, B1 vous demande de confirmer, car l'enregistrement met à jour chaque occurrence de la série.

### Notes de l'événement {#event-notes}

Chaque événement possède son propre fil de notes pour la planification et le suivi. Cliquez sur un événement sur la page de détail du calendrier ; la boîte de dialogue affiche les détails de l'événement, ses rappels, ainsi que ses **Notes** en dessous. Saisissez une note et publiez-la pour l'ajouter au fil.

Le personnel autorisé à modifier le contenu ou à administrer les calendriers peut toujours lire et publier les notes d'un événement. Les paramètres **Qui peut voir les notes** et **Qui peut publier des notes** de l'événement déterminent si les responsables ou les membres du groupe de l'événement peuvent également le faire.

### Afficher les événements sur votre site web {#showing-events-on-your-website}

Pour afficher un calendrier sur votre site web, ajoutez un élément **Calendrier** à une page et choisissez ce calendrier. L'élément peut afficher un calendrier mensuel ou une grille de vignettes d'événements à venir, et peut être limité aux événements portant une seule étiquette. Les visiteurs qui cliquent sur un événement ouvrent sa propre page. Voir [Utiliser l'élément Calendrier](../website/page-editor.md#using-the-calendar-element).

## Activer les inscriptions aux événements {#enabling-event-registration}

Vous pouvez activer les inscriptions pour n'importe quel événement du calendrier afin que les membres puissent s'inscrire via le site web ou l'application mobile B1.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximal d'inscriptions. Laissez vide pour un nombre illimité.
   - **Ouverture des inscriptions** -- La date et l'heure à partir desquelles les inscriptions sont disponibles.
   - **Fermeture des inscriptions** -- La date et l'heure de fin des inscriptions.
   - **Étiquettes** -- Libellés séparés par des virgules (par exemple, « jeunes, retraite, VBS ») pour aider à classer les événements ouverts aux inscriptions.
   - **Questions d'inscription** -- Vous pouvez éventuellement joindre un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (régime alimentaire, taille de t-shirt, contact d'urgence, etc.) lors de leur inscription. Choisissez **Aucun** pour ne pas poser de questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permettez aux personnes supplémentaires de s'inscrire sur une liste d'attente au lieu d'être refusées. Voir [Inscriptions payantes](./paid-registrations.md#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir des **types de participants** avec un prix, des **sélections** facultatives (options supplémentaires) et des **codes de réduction**, le paiement étant encaissé par l'intermédiaire du prestataire de dons de votre église. Voir [Inscriptions payantes](./paid-registrations.md) pour le guide complet.

Une fois les inscriptions activées, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consulteront l'événement sur [B1.church ou dans l'application B1](../../b1-church/events/registering.md). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'inscription, et leurs réponses sont enregistrées avec leur inscription.

:::info
Les questions d'inscription ne fonctionnent qu'avec les formulaires qui ne sont **pas** marqués comme Restreints. Un formulaire restreint est automatiquement ignoré pendant l'inscription au lieu d'être affiché. Utilisez donc un formulaire non restreint lorsque vous joignez des questions à un événement.
:::

### Gérer les inscriptions

Pour consulter et gérer les inscriptions à vos événements :

1. Dans le menu Jump, choisissez **Calendriers > Inscriptions**.
2. Un tableau présente tous les événements pour lesquels les inscriptions sont activées, avec le titre de l'événement, la date, le nombre d'inscriptions actuel par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des inscriptions, y compris les noms, le nombre de membres, les types de participants, le statut de paiement et la date d'inscription.
4. Depuis la page de détail, vous pouvez :
   - **Ajouter un participant** -- Inscrire manuellement une personne qui s'est inscrite hors ligne ou par téléphone.
   - **Annuler** des inscriptions individuelles
   - **Supprimer** définitivement des inscriptions
   - **Promouvoir** des inscriptions en liste d'attente lorsqu'une place se libère
   - **Exporter en CSV** -- Télécharger toutes les inscriptions, y compris les types de participants, les sélections, les montants payés et les réponses aux questions

Si l'événement comporte des questions d'inscription, la page de détail affiche aussi un filtre **Questions sans réponse uniquement** pour repérer rapidement les inscrits qui n'ont pas encore répondu, ainsi qu'un bouton **Voir les réponses** sur chaque inscription ayant reçu des réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, les totaux par type et une boîte de dialogue de détail des paiements. Voir [Inscriptions payantes](./paid-registrations.md#the-registration-roster).

:::tip
Utilisez la barre de progression de la capacité pour suivre la vitesse à laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement atteint ou dépasse sa capacité.
:::

## Étapes suivantes

- [Calendrier personnalisé](./curated-calendar.md) -- Créer un calendrier qui regroupe plusieurs groupes
- [Inscriptions payantes](./paid-registrations.md) -- Types de participants, options supplémentaires, codes de réduction, paiements et listes d'attente
- [Guide d'inscription aux événements](../guides/event-registration.md) -- Guide étape par étape pour configurer les inscriptions aux événements
- [Vue d'ensemble des calendriers](./index.md) -- Retourner à la vue d'ensemble des calendriers
