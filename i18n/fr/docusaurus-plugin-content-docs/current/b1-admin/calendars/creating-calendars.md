---
title: "Création de calendriers"
description: "Créez un calendrier dans B1 Admin, reliez des groupes ou importez des fichiers .ics, et gérez ses événements, ses inscriptions et ses notes depuis un seul endroit."
---

# Création de calendriers

<div class="article-intro">

Créer un calendrier dans B1 Admin vous permet de bâtir une vue organisée des événements en reliant un ou plusieurs groupes. Les événements sont gérés par les responsables de groupe au sein de leurs groupes, et votre calendrier affiche ces événements à un seul endroit. Les administrateurs disposant de l'accès en modification peuvent ajouter ou modifier des événements pour n'importe quel groupe. Les responsables de groupe qui ne sont pas administrateurs ne peuvent gérer que les événements des groupes qu'ils dirigent.

</div>

## Vidéo de formation {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Créer des calendriers, des événements et des réservations de salles dans B1" next="Inscriptions aux événements et événements payants dans B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les [groupes](../groups/creating-groups.md) dont vous souhaitez inclure les événements dans votre calendrier
- Vous devez disposer de l'autorisation **Modifier le contenu**

</div>

## Créer un nouveau calendrier {#creating-a-new-calendar}

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers** et cliquez sur **Calendriers**.
2. Cliquez sur **Ajouter un calendrier** en haut de la page. Le formulaire de nouveau calendrier s'ouvre sous la liste des calendriers.
3. Saisissez un **Nom du calendrier** (par exemple « Événements du ministère jeunesse » ou « Calendrier principal de l'église »).
4. Cliquez sur **Créer** pour enregistrer votre nouveau calendrier.

Pour renommer ou supprimer un calendrier plus tard, passez la souris sur sa ligne dans la page Calendriers et cliquez sur **Modifier** (ou cliquez sur **Modifier** sur la page de détail du calendrier).

## La page de détail du calendrier {#the-calendar-detail-page}

Après avoir créé un calendrier, cliquez sur son nom (ou passez la souris sur sa ligne et cliquez sur **Gérer les événements**) pour ouvrir la page de détail. Cette page comporte deux zones principales :

- **Colonne de gauche** -- Le nom du calendrier avec ses actions (**Nouvel événement**, **Modifier**, **Importer .ics** et **Imprimer**), un lien vers les approbations en attente éventuelles, et la liste **Groupes dans le calendrier** indiquant quels groupes sont inclus dans ce calendrier. Cliquez sur **Retirer** à côté d'un groupe pour le retirer du calendrier.
- **Zone principale** -- La vue **Événements du calendrier** affiche les événements provenant des groupes reliés, avec les boutons **S'abonner** et **Ajouter un groupe** au-dessus. Utilisez **Aujourd'hui**, **Précédent**, **Suivant** et les vues **Mois**, **Semaine**, **Jour** et **Agenda** pour vous déplacer. Chaque événement est dessiné dans la couleur de son groupe. Les couleurs sont choisies automatiquement, et un groupe conserve la même couleur sur chaque calendrier.

Cliquez sur **Imprimer** pour obtenir un mois imprimable. L'impression commence par le logo de fond clair de votre église (tiré de [Apparence](../website/appearance.md), si vous en avez défini un), le nom de l'église et le nom du calendrier. Les noms d'événements passent à la ligne au lieu d'être coupés, et les couleurs des groupes sont conservées.

## Relier des groupes {#connecting-groups}

Les groupes qui ont des événements dans le calendrier apparaissent automatiquement dans la liste **Groupes dans le calendrier**, à gauche de la page de détail.

1. Cliquez sur **Ajouter un groupe** au-dessus du calendrier pour associer un groupe à votre calendrier.
2. Choisissez le groupe dans **Sélectionner un groupe**. La liste comprend chaque groupe de votre église, et pas seulement ceux dont vous faites partie.
3. Choisissez **Ajouter tous les événements du groupe**, ou **Ajouter des événements précis** puis cliquez sur chaque événement souhaité dans le petit calendrier qui apparaît.
4. Cliquez sur **Enregistrer**.

Chaque événement n'apparaît qu'une seule fois dans le calendrier. Si vous ajoutez un groupe entier, les événements de ce groupe que vous aviez déjà ajoutés un à un sont intégrés à l'entrée du groupe, et choisir des événements précis d'un groupe déjà présent dans le calendrier n'ajoute rien de nouveau. Seuls les groupes ajoutés en entier sont listés sous **Groupes dans le calendrier**.

### Importer un fichier .ics {#importing-an-ics-file}

Cliquez sur **Importer .ics** pour importer des événements d'un autre calendrier. Choisissez le **Groupe** auquel les événements doivent appartenir, puis cliquez sur **Choisir un fichier .ics** ou collez le contenu du fichier, et cliquez sur **Importer**. Les événements sont créés dans ce groupe, et le groupe est ajouté au calendrier à partir duquel vous avez importé, de sorte que les événements y apparaissent immédiatement.

### Retirer un événement du calendrier {#removing-an-event-from-the-calendar}

Cliquez sur un événement du calendrier, puis cliquez sur **Retirer du calendrier**. Cela retire seulement l'événement de ce calendrier -- l'événement lui-même reste dans son groupe. Si l'événement figure dans le calendrier parce que son groupe entier a été ajouté, le retirer retire tous les événements de ce groupe de ce calendrier (les événements restent tout de même dans le groupe). Pour supprimer définitivement un événement, supprimez-le depuis le [calendrier du groupe](../groups/group-calendar.md).

:::tip
Relier des groupes à votre calendrier est un moyen efficace de regrouper automatiquement les événements. Lorsqu'un responsable de groupe ajoute un événement à son [groupe](../groups/creating-groups.md), celui-ci peut alimenter le calendrier de toute l'église sans aucun travail supplémentaire de votre part.
:::

:::info
Si vous souhaitez créer un calendrier unique qui regroupe les événements de nombreux groupes de votre église, consultez [Calendrier organisé](./curated-calendar.md) pour une approche simplifiée.
:::

## Ajouter et modifier des événements {#adding-and-editing-events}

Cliquez sur **Nouvel événement** sur la page de détail du calendrier pour ajouter un événement, ou cliquez sur un événement du calendrier puis sur **Modifier** pour le changer. Le formulaire **Nouvel événement** / **Modifier l'événement** comporte les champs suivants :

- **Groupe** -- Le groupe auquel appartient l'événement. Si votre église a des modèles d'événements, vous pouvez aussi choisir un **Modèle** pour remplir le formulaire.
- **Titre**
- **Photo de l'événement** -- Cliquez sur **Ajouter une photo** (ou sur la case photo vide) pour choisir ou télécharger une image, recadrée au format large 16:9. Cliquez sur **Changer la photo** pour la remplacer. La photo est affichée en haut de la page de l'événement sur votre site web, et comme vignette lorsqu'un élément Calendrier affiche les **Événements à venir** (voir [Afficher les événements sur votre site web](#showing-events-on-your-website)).
- **Description** -- Affichée sur la page de l'événement sur votre site web. Le texte en gras, les listes et les liens sont pris en charge.
- **Début** et **Fin**, **Répétition** et **Visibilité** (**Publique** ou **Privée**).
- **Étiquettes** -- Libellés séparés par des virgules, comme `youth, students`. Un élément Calendrier sur votre site web peut être configuré pour n'afficher que les événements portant une certaine étiquette. Il s'agit du même champ **Étiquettes** que celui des paramètres d'inscription de l'événement.
- **Qui peut voir les notes** et **Qui peut publier des notes** -- Qui peut lire et ajouter des notes à l'événement (voir [Notes d'événement](#event-notes)). Choisissez **Personnel seulement** (par défaut), **Responsables du groupe** (les responsables du groupe de l'événement) ou **Membres du groupe** (toutes les personnes du groupe de l'événement, y compris ses responsables).
- **Salles** et **Ressources** -- Réservez l'espace et l'équipement pour l'événement. Voir [Salles, ressources et planification](./rooms-resources.md). Une fois une salle choisie, vous pouvez aussi ajouter un temps de préparation et de rangement ou une fenêtre de réservation personnalisée -- voir [Réserver une salle ou une ressource](./availability.md#booking-a-room-or-resource).
- **Rappels** -- Développez cette section pour envoyer des rappels avant l'événement. Voir [Rappels d'événements](./event-reminders.md).

**Groupe**, **Titre**, **Début** et **Fin** sont obligatoires, et la fin doit être postérieure au début. Cliquez sur **Enregistrer**. Pour supprimer un événement, ouvrez-le dans l'éditeur et cliquez sur **Supprimer**.

### Modifier une date d'un événement récurrent {#changing-one-date-of-a-recurring-event}

Lorsque vous cliquez sur une date d'un événement récurrent dans le calendrier, puis sur **Modifier**, l'enregistrement ou la suppression vous demande quelles dates modifier :

- **Cette date seulement** -- Seule la date sur laquelle vous avez cliqué. À l'enregistrement, cette date devient un événement ponctuel distinct avec vos modifications, et le reste de la série demeure inchangé. À la suppression, seule cette date est retirée.
- **Cette date et toutes les dates suivantes** -- La série se termine la veille de la date sur laquelle vous avez cliqué. À l'enregistrement, vos modifications démarrent une nouvelle série à partir de cette date ; à la suppression, les dates restantes sont retirées.
- **Toutes les dates** -- La série entière, comme auparavant.

Le formulaire affiche la première date de la série, mais **Cette date seulement** et **Cette date et toutes les dates suivantes** reportent vos modifications d'heure sur la date sur laquelle vous avez cliqué. Une date détachée conserve les salles et ressources de la série, obtient ses propres réservations et ne copie pas les rappels de la série. Si vous ouvrez un événement récurrent sans choisir de date (par exemple depuis **Approbations**), B1 vous demande plutôt de confirmer, car l'enregistrement met à jour chaque date de la série.

### Notes d'événement {#event-notes}

Chaque événement possède son propre fil de notes pour la planification et le suivi. Cliquez sur un événement sur la page de détail du calendrier ; la boîte de dialogue affiche les détails de l'événement, ses rappels et ses **Notes** en dessous, avec les boutons **Modifier**, **Gérer les inscriptions** et **Retirer du calendrier**. Saisissez une note et publiez-la pour l'ajouter au fil.

Le personnel autorisé à modifier le contenu ou à administrer les calendriers peut toujours lire et publier des notes d'événement. Les paramètres **Qui peut voir les notes** et **Qui peut publier des notes** de l'événement déterminent si les responsables ou les membres du groupe de l'événement peuvent aussi le faire.

### Afficher les événements sur votre site web {#showing-events-on-your-website}

Pour afficher un calendrier sur votre site web, ajoutez un élément **Calendrier** à une page et choisissez ce calendrier. L'élément peut afficher un calendrier mensuel ou une grille de vignettes d'événements à venir, et peut être limité aux événements portant une étiquette donnée. Les visiteurs qui cliquent sur un événement ouvrent sa propre page d'événement. Voir [Utiliser l'élément Calendrier](../website/page-editor.md#using-the-calendar-element).

## Activer l'inscription aux événements {#enabling-event-registration}

Vous pouvez activer l'inscription pour n'importe quel événement du calendrier afin que les membres puissent s'inscrire via le site web B1 ou l'application mobile.

1. Cliquez sur un événement existant du calendrier (créez-le d'abord si nécessaire) et cliquez sur **Gérer les inscriptions**. La page d'inscription de l'événement s'ouvre. (Le bouton **Activer les inscriptions** de la page **Inscriptions** vous mène à vos calendriers pour choisir un événement.)
2. Cliquez sur **Modifier les paramètres**, puis activez **Activer l'inscription** dans la carte **Paramètres d'inscription**.
3. Configurez les paramètres d'inscription :
   - **Capacité** (facultatif) -- Définissez un nombre maximal d'inscriptions. Laissez vide pour une capacité illimitée.
   - **Ouverture des inscriptions** -- La date et l'heure à partir desquelles les inscriptions deviennent disponibles.
   - **Fermeture des inscriptions** -- La date et l'heure de fermeture des inscriptions.
   - **Étiquettes** -- Libellés séparés par des virgules (par exemple « jeunes, retraite, VBS ») pour aider à catégoriser les événements ouverts aux inscriptions.
   - **Questions d'inscription** -- Vous pouvez facultativement joindre un [formulaire](../forms/creating-forms.md) afin que les inscrits répondent à des questions supplémentaires (restrictions alimentaires, taille de t-shirt, contact d'urgence, etc.) lors de leur inscription. Choisissez **Aucun** pour ne pas poser de questions.
   - **Activer la liste d'attente** -- Lorsque l'événement est complet, permettez aux inscrits supplémentaires de rejoindre une liste d'attente au lieu d'être refusés. Voir [Inscriptions payantes](./paid-registrations.md#waitlist).
4. Cliquez sur **Enregistrer les paramètres**.

Pour les événements payants, la même page de paramètres vous permet de définir des **Types de participants** avec un prix, des **Options** facultatives (suppléments) et des **Codes de réduction**, les paiements étant encaissés par l'intermédiaire de votre fournisseur de dons. Consultez [Inscriptions payantes](./paid-registrations.md) pour le guide complet.

Une fois l'inscription activée, les membres verront un bouton **S'inscrire à cet événement** lorsqu'ils consulteront l'événement sur [B1.church ou dans l'application B1](../../b1-church/events/registering.md). Si vous avez joint un formulaire, les inscrits voient une étape **Questions** pendant l'inscription, et leurs réponses sont enregistrées avec leur inscription.

:::info
Les questions d'inscription ne fonctionnent qu'avec les formulaires qui ne sont **pas** marqués comme Restreint. Un formulaire restreint est automatiquement ignoré lors de l'inscription au lieu d'être affiché ; utilisez donc un formulaire non restreint lorsque vous joignez des questions à un événement.
:::

### Partager le lien d'un événement {#sharing-an-event-link}

Pour inviter des personnes qui ne figurent pas dans la base de données de votre église, partagez la page de l'événement elle-même. Cliquez sur l'événement dans le calendrier puis sur **Partager**, ou cliquez sur **Partager** sur la page d'inscription de l'événement. Une boîte de dialogue affiche le lien de l'événement et un code QR : cliquez sur l'icône de copie pour copier le lien, ou cliquez sur **Télécharger le PNG** pour enregistrer le code QR destiné à un dépliant ou à une diapositive. Toute personne disposant du lien peut voir l'événement, l'ajouter à son calendrier et, lorsque l'inscription est activée, s'inscrire en tant qu'invité avec seulement un nom et un courriel.

Un événement **Privé** reste absent du calendrier de votre site, mais peut tout de même être partagé une fois l'inscription activée. Un événement privé sans inscription n'a pas de page publique et ne dispose donc pas du bouton **Partager**.

Dans l'application B1, les événements du calendrier d'un groupe comportent un lien **Partager** qui ouvre la feuille de partage du téléphone avec le même lien.

### Gérer les inscriptions {#managing-registrations}

Pour consulter et gérer les inscriptions à vos événements :

1. Dans le menu Jump, choisissez **Calendriers > Inscriptions**.
2. Vous verrez un tableau de tous les événements dont l'inscription est activée, avec le titre de l'événement, la date, le nombre d'inscriptions actuel par rapport à la capacité, et les étiquettes. Saisissez dans **Rechercher des événements** pour filtrer le tableau.
3. Cliquez sur le nom d'un événement pour voir la liste complète des inscriptions, avec les colonnes **Nom**, **Membres**, **Type**, **Payé / Total**, **Statut** et **Date**.
4. Depuis la page de détail, vous pouvez :
   - **Ajouter un participant** -- Inscrire manuellement une personne qui s'est inscrite hors ligne ou par téléphone.
   - **Annuler l'inscription** pour certaines inscriptions individuelles (demande une confirmation)
   - **Supprimer** définitivement des inscriptions (demande une confirmation)
   - **Promouvoir** des inscriptions en liste d'attente lorsqu'une place se libère
   - **Exporter en CSV** -- Téléchargez toutes les inscriptions, y compris les types de participants, les options, les montants payés et les réponses aux questions

   Ces actions de ligne sont des icônes à la fin de chaque ligne ; passez la souris sur une icône pour voir son nom.

Si l'événement comporte des questions d'inscription, la page de détail affiche aussi un filtre **Questions sans réponse uniquement** pour trouver rapidement les inscrits qui n'ont pas encore répondu, et un bouton **Voir les réponses** sur chaque inscription répondue pour consulter leurs réponses. Les événements avec des types de participants affichent aussi les totaux par type au-dessus du tableau, et chaque ligne dispose d'une boîte de dialogue **Détails de l'inscription** avec les paiements -- voir [Inscriptions payantes](./paid-registrations.md#the-registration-roster).

La partie gauche de la page de détail indique combien de personnes sont inscrites (l'inscrit principal et toutes les personnes de son inscription), avec une barre de capacité, le nombre éventuel en liste d'attente, les étiquettes de l'événement et ses **Rappels**. Le titre de la carte **Inscriptions** compte plutôt les inscriptions, ce qui est la base des limites de capacité -- ainsi, une famille de quatre personnes correspond à une inscription mais à quatre personnes.

:::tip
Utilisez la barre de progression de la capacité sur la page Inscriptions pour suivre la vitesse à laquelle les événements se remplissent. La barre devient rouge lorsqu'un événement atteint ou dépasse sa capacité.
:::

## Étapes suivantes {#next-steps}

- [Calendrier organisé](./curated-calendar.md) -- Créer un calendrier qui regroupe plusieurs groupes
- [Inscriptions payantes](./paid-registrations.md) -- Types de participants, options supplémentaires, codes de réduction, paiements et listes d'attente
- [Guide d'inscription aux événements](../guides/event-registration.md) -- Guide pas à pas pour configurer les inscriptions aux événements
- [Vue d'ensemble des calendriers](./index.md) -- Revenir à la vue d'ensemble des calendriers
