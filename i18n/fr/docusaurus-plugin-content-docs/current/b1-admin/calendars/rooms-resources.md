---
title: "Salles, ressources et planification"
description: "Configurez les salles, l'équipement, les blocages et les modèles d'événements dans B1 Admin afin que les groupes puissent demander des réservations et que vous puissiez les approuver pour éviter les doubles réservations."
---

# Salles, ressources et planification

<div class="article-intro">

Les salles et les ressources vous permettent de suivre les espaces et l'équipement réservables de votre église. Lorsqu'un groupe ou une équipe souhaite utiliser une salle ou emprunter une ressource pour un événement, il peut en faire la demande via B1 -- et vous pouvez approuver ou refuser ces demandes pour éviter les doubles réservations.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation **Modifier le contenu**
- Configurez les [groupes](../groups/creating-groups.md) dont les membres soumettront des demandes de réservation

</div>

## Ouvrir Salles et ressources {#opening-rooms--resources}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers** et cliquez sur **Salles et ressources**. La page comporte quatre onglets : **Salles**, **Ressources**, **Blocages** et **Modèles**. Le bouton d'ajout en haut de la page change selon l'onglet sélectionné, et une zone **Rechercher** vous permet de filtrer la liste en cours.

## Salles {#rooms}

Les salles sont des espaces physiques qui peuvent être réservés en même temps que les événements du calendrier -- un sanctuaire, une salle de fraternité, une salle de classe, etc.

### Ajouter une salle {#adding-a-room}

1. Dans l'onglet **Salles**, cliquez sur **Ajouter une salle** en haut de la page.
2. Saisissez un **Nom de la salle**.
3. Vous pouvez éventuellement définir une **Capacité** (nombre maximal de personnes) et une **Description**. Ces deux informations s'affichent à côté de la salle lorsque les personnes choisissent des salles pour un événement.
4. Définissez un **Groupe d'approbation** si les réservations doivent être validées. Les réservations faites par les membres de ce groupe sont approuvées automatiquement ; toutes les autres attendent avec le statut **En attente** jusqu'à leur approbation sur la page [Approbations](./approvals.md), et les membres du groupe reçoivent un courriel au sujet des nouvelles demandes. Laissez sur **Aucune approbation requise** pour approuver automatiquement chaque réservation.
5. Cliquez sur **Enregistrer**.

La liste des salles affiche le **Nom de la salle**, la **Capacité** et le **Groupe d'approbation** de chacune.

### Modifier ou supprimer une salle {#editing-or-deleting-a-room}

Passez la souris sur une salle et cliquez sur **Modifier**, apportez vos changements, puis cliquez sur **Enregistrer**. Utilisez **Supprimer** pour retirer définitivement une salle.

## Ressources {#resources}

Les ressources sont des articles qui peuvent être réservés en même temps qu'un événement -- équipement audiovisuel, projecteurs, chaises, fourgonnette, etc.

### Ajouter une ressource {#adding-a-resource}

1. Cliquez sur l'onglet **Ressources**, puis sur **Ajouter une ressource**.
2. Saisissez un **Nom de la ressource** et, éventuellement, une **Description**.
3. Définissez la **Quantité** que vous possédez (par exemple 3 projecteurs). Chaque événement en réserve un, et B1 vous avertit lorsque plus d'événements simultanés la réservent que vous n'en avez.
4. Définissez un **Groupe d'approbation** si quelqu'un doit valider les prêts de ressources. Cela fonctionne de la même façon que pour les salles.
5. Cliquez sur **Enregistrer**.

Modifiez ou supprimez une ressource de la même façon qu'une salle.

## Blocages {#blockouts}

Les blocages empêchent de réserver des salles ou des ressources pendant certaines périodes -- pour des travaux de rénovation, des périodes réservées ou de l'entretien.

### Ajouter un blocage {#adding-a-blockout}

1. Cliquez sur l'onglet **Blocages**, puis sur **Ajouter un blocage**.
2. Dans **S'applique à**, choisissez une salle, une ressource ou **Toutes les salles et ressources**.
3. Définissez la date et l'heure de **Début** et de **Fin** du blocage.
4. Vous pouvez éventuellement ajouter un **Motif**. Il s'affiche dans le calendrier de [Disponibilité](./availability.md) sous la forme *Bloquée : motif*.
5. Cliquez sur **Enregistrer**.

Les événements qui réservent une salle ou une ressource bloquée affichent un avertissement de conflit dans l'éditeur d'événements.

## Modèles d'événements {#event-templates}

Les modèles vous permettent d'enregistrer une configuration d'événement réutilisable -- titre, description, durée, salles et ressources -- afin que les événements que vous créez souvent soient configurés de la même façon à chaque fois.

### Ajouter un modèle {#adding-a-template}

1. Cliquez sur l'onglet **Modèles**, puis sur **Ajouter un modèle**.
2. Saisissez un **Nom du modèle** (affiché lors du choix d'un modèle).
3. Renseignez le **Titre de l'événement**, la **Description de l'événement** et la **Durée (minutes)** à utiliser pour les nouveaux événements.
4. Vous pouvez éventuellement choisir les **Salles** et les **Ressources** à réserver.
5. Cliquez sur **Enregistrer**.

Lors de la création d'un nouvel événement, choisissez le modèle dans la liste **Modèle** de l'éditeur d'événements pour remplir le titre, la description, les salles et les ressources, et pour définir l'heure de fin à partir de la durée du modèle (définissez d'abord le **Début**). Vous choisissez toujours le **Groupe** de l'événement. La liste **Modèle** n'apparaît qu'une fois qu'au moins un modèle existe.

## Articles connexes {#related-articles}

- [Calendrier de disponibilité](./availability.md) -- voir toutes les réservations d'un coup d'œil et réserver directement des salles ou des ressources
- [Approbations du calendrier](./approvals.md) -- approuver ou refuser les demandes de réservation de salles et de ressources
- [Création de calendriers](./creating-calendars.md) -- configurer les calendriers d'événements
- [Création de groupes](../groups/creating-groups.md) -- configurer les groupes pouvant réserver des salles et des ressources
