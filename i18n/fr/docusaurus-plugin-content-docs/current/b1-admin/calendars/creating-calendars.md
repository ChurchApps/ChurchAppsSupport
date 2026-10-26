---
title: "Créer des calendriers"
---

# Créer des calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de composer une vue personnalisée des événements en reliant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe au sein de leurs groupes, et votre calendrier affiche ces événements au même endroit. Les administrateurs disposant d'un accès en modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe non administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous devez disposer d'un accès administrateur à la section Calendriers de B1 Admin

</div>

## Créer un nouveau calendrier

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, et cliquez sur **Calendriers**.
2. Cliquez sur **Ajouter un calendrier** en haut de la page. Le formulaire de nouveau calendrier s'ouvre sous la liste des calendriers.
3. Saisissez un **nom** pour votre calendrier (par exemple, « Événements du ministère jeunesse » ou « Calendrier principal de l'église »).
4. Ajoutez une **description** facultative pour aider votre équipe à comprendre à quoi sert ce calendrier.
5. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

## La page de détail du calendrier

Après avoir créé un calendrier, cliquez sur **Gérer les événements** sur sa ligne pour ouvrir la page de détail. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Le nom du calendrier avec ses actions (**Nouvel événement**, **Modifier**, **Importer .ics** et **Imprimer**), suivi de la liste **Groupes dans le calendrier** qui indique les groupes inclus dans ce calendrier. Cliquez sur **Retirer** à côté d'un groupe pour le retirer du calendrier.
- **Zone principale** -- La vue **Événements du calendrier** qui affiche les événements provenant des groupes reliés, avec les boutons **S'abonner** et **Ajouter un groupe** au-dessus.

## Relier des groupes

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste **Groupes dans le calendrier** à gauche de la page de détail.

1. Cliquez sur **Ajouter un groupe** au-dessus du calendrier pour associer un groupe à votre calendrier.
2. Sélectionnez le groupe dans la liste déroulante. La liste comprend tous les groupes de votre église, et pas seulement ceux auxquels vous appartenez.
3. Choisissez d'inclure **tous les événements** de ce groupe ou seulement **certains événements**.
4. Cliquez sur **Enregistrer**.

Chaque événement n'apparaît qu'une seule fois dans le calendrier. Si vous ajoutez un groupe entier, les événements que vous aviez déjà ajoutés un à un sont intégrés à l'entrée du groupe, et choisir des événements précis d'un groupe déjà présent dans le calendrier n'ajoute rien de nouveau. Seuls les groupes ajoutés dans leur intégralité sont listés sous **Groupes dans le calendrier**.

### Importer un fichier .ics

Cliquez sur **Importer .ics** pour importer des événements depuis un autre calendrier. Choisissez le **Groupe** auquel les événements doivent appartenir, puis cliquez sur **Choisir le fichier .ics** ou collez le contenu du fichier, et cliquez sur **Importer**. Les événements sont créés dans ce groupe, et le groupe est ajouté au calendrier d'où provient l'importation, de sorte que les événements apparaissent immédiatement.

### Retirer un événement du calendrier

Cliquez sur un événement du calendrier, puis cliquez sur **Retirer du calendrier**. Cela ne retire l'événement que de ce calendrier -- l'événement lui-même reste dans son groupe. Si l'événement figure dans le calendrier parce que son groupe entier a été ajouté, le retirer supprime tous les événements de ce groupe du calendrier (les événements restent dans le groupe). Pour supprimer définitivement un événement, supprimez-le depuis le [calendrier du groupe](../groups/group-calendar.md).

:::tip
Relier des groupes à votre calendrier est un moyen efficace de regrouper automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), il peut apparaître dans le calendrier de toute l'église sans aucun travail supplémentaire de votre part.
:::

:::info
Si vous voulez créer un calendrier unique qui reprend les événements de nombreux groupes de votre église, consultez [Calendrier personnalisé](curated-calendar) pour une approche simplifiée.
:::

## Ajouter et modifier des événements {#adding-and-editing-events}

Cliquez sur **Nouvel événement** sur la page de détail du calendrier pour ajouter un événement, ou cliquez sur un événement du calendrier puis sur **Modifier** pour le changer. Le formulaire **Nouvel événement** / **Modifier l'événement** comporte les champs suivants :

- **Groupe** -- Le groupe auquel appartient l'événement. Si votre église dispose de modèles d'événements, vous pouvez aussi choisir un **Modèle** pour remplir le formulaire.
- **Titre**
- **Photo de l'événement** -- Cliquez sur **Ajouter une photo** (ou sur la case photo vide) pour choisir ou téléverser une image, recadrée au format large 16:9. Cliquez sur **Modifier la photo** pour la remplacer. La photo s'affiche en haut de la page de l'événement sur votre site web et comme vignette lorsqu'un élément Calendrier affiche les **Événements à venir** (voir [Afficher les événements sur votre site web](#showing-events-on-your-website)).
- **Description** -- Affichée sur la page de l'événement sur votre site web. Le gras, les listes et les liens sont pris en charge.
- **Début** et **Fin**, **Répétition** et **Visibilité** (**Public** ou **Privé**).
- **Étiquettes** -- Libellés séparés par des virgules, comme `jeunes, étudiants`. Un élément Calendrier de votre site web peut être configuré pour n'afficher que les événements portant une certaine étiquette. Il s'agit du même champ **Étiquettes** que celui des paramètres d'inscription de l'événement.
- **Qui peut voir les notes** et **Qui peut publier des notes** -- Qui peut lire et ajouter des notes à l'événement (voir [Notes d'événement](#event-notes)). Choisissez **Personnel uniquement** (par défaut), **Responsables du groupe** (responsables du groupe de l'événement) ou **Membres du groupe** (toutes les personnes du groupe de l'événement, y compris ses responsables).
- **Salles** et **Ressources** -- Réservez l'espace et le matériel pour l'événement. Consultez [Salles, ressources et planification](rooms-resources).

Cliquez sur **Enregistrer**. Si l'événement se répète, B1 vous demande de confirmer, car l'enregistrement met à jour chaque occurrence de la série.

### Notes d'événement {#event-notes}

Chaque événement dispose de son propre fil de notes pour la planification et le suivi. Cliquez sur un événement sur la page de détail du calendrier ; la boîte de dialogue affiche les détails de l'événement, ses rappels et ses **Notes** en dessous. Saisissez une note et publiez-la pour l'ajouter au fil.

Le personnel autorisé à modifier le contenu ou à administrer les calendriers peut toujours lire et publier les notes d'événement. Les paramètres **Qui peut voir les notes** et **Qui peut publier des notes** de l'événement déterminent si les responsables ou les membres du groupe de l'événement peuvent aussi le faire.

### Afficher les événements sur votre site web {#showing-events-on-your-website}

Pour mettre un calendrier sur votre site web, ajoutez un élément **Calendrier** à une page et choisissez ce calendrier. L'élément peut afficher une grille mensuelle ou une grille de vignettes d'événements à venir, et peut se limiter aux événements portant une seule étiquette. Les visiteurs qui cliquent sur un événement ouvrent sa propre page. Consultez [Utiliser l'élément Calendrier](../website/page-editor.md#using-the-calendar-element).

## Activer l'inscription aux événements {#enabling-event-registration}

Vous pouvez activer l'inscription pour n'importe quel événement du calendrier afin que les membres puissent s'inscrire via le site web B1 ou l'application mobile.

1. Cliquez sur un événement existant ou créez-en un nouveau.
2. Dans l'éditeur d'événement, activez **Inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximal d'inscriptions. Laissez vide pour un nombre illimité.
   - **Ouverture des inscriptions** -- La date et l'heure à partir desquelles l'inscription est disponible.
   - **Fermeture des inscriptions** -- La date et l'heure de fermeture des inscriptions.
   - **Étiquettes** -- Libellés séparés par des virgules (par exemple « jeunes, retraite, VBS ») pour classer les événements auxquels on peut s'inscrire.
   - **Questions d'inscription** -- Vous pouvez facultativement joindre un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (régime alimentaire, taille de t-shirt, contact d'urgence, etc.) lors de leur inscription. Choisissez **Aucun** pour ne pas poser de questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permet aux inscrits supplémentaires de rejoindre une liste d'attente au lieu d'être refusés. Consultez [Inscriptions payantes](paid-registrations#waitlist).
4. Enregistrez l'événement.

Pour les événements payants, la même page de paramètres vous permet de définir des **Types de participants** tarifés, des **Options** facultatives (suppléments) et des **Codes de réduction**, le paiement étant encaissé via le fournisseur de dons de votre église. Consultez [Inscriptions payantes](paid-registrations) pour le guide complet.

Une fois l'inscription activée, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consulteront l'événement sur le [site web B1](../../b1-church/events/registering) ou l'[application mobile B1](../../b1-mobile/events/registering). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'inscription, et leurs réponses sont enregistrées avec leur inscription.

:::info
Les questions d'inscription ne fonctionnent qu'avec les formulaires **qui ne sont pas** marqués comme Restreints. Un formulaire restreint est ignoré automatiquement lors de l'inscription au lieu d'être affiché ; utilisez donc un formulaire non restreint lorsque vous joignez des questions à un événement.
:::

### Gérer les inscriptions

Pour consulter et gérer les inscriptions à vos événements :

1. Dans le menu Accès rapide, choisissez **Calendriers > Inscriptions**.
2. Vous verrez un tableau de tous les événements avec inscription activée, indiquant le titre de l'événement, la date, le nombre d'inscriptions actuel par rapport à la capacité, et les étiquettes.
3. Cliquez sur un événement pour voir la liste complète des inscriptions, y compris les noms, le nombre de membres, les types de participants, le statut de paiement et la date d'inscription.
4. Depuis la page de détail, vous pouvez :
   - **Ajouter un participant** -- Inscrire manuellement une personne qui s'est inscrite hors ligne ou par téléphone.
   - **Annuler** des inscriptions individuelles
   - **Supprimer** définitivement des inscriptions
   - **Promouvoir** des inscriptions en liste d'attente lorsqu'une place se libère
   - **Exporter en CSV** -- Télécharger toutes les inscriptions, y compris les types de participants, les options, les montants payés et les réponses aux questions

Si l'événement comporte des questions d'inscription, la page de détail affiche aussi un filtre **Questions sans réponse uniquement** pour repérer rapidement les inscrits qui n'ont pas encore répondu, et un bouton **Voir les réponses** sur chaque inscription répondue pour consulter leurs réponses. Les événements payants ajoutent une colonne **Type**, une colonne **Payé / Total**, des compteurs par type et une boîte de dialogue de détail des paiements -- consultez [Inscriptions payantes](paid-registrations#the-registration-roster).

:::tip
Utilisez la barre de progression de la capacité pour suivre la vitesse de remplissage des événements. La barre devient rouge lorsqu'un événement atteint ou dépasse sa capacité.
:::

## Et ensuite

- [Calendrier personnalisé](curated-calendar) -- Créer un calendrier qui reprend plusieurs groupes
- [Inscriptions payantes](paid-registrations) -- Types de participants, options, codes de réduction, paiements et listes d'attente
- [Guide d'inscription aux événements](../guides/event-registration) -- Guide pas à pas pour configurer l'inscription aux événements
- [Vue d'ensemble des calendriers](./) -- Retour à la vue d'ensemble des calendriers
