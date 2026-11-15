---
title: "Calendrier de disponibilité"
description: "Configurez les salles et l'équipement réservables dans B1 Admin, puis réservez-les sur le calendrier, ajoutez des marges de préparation et de rangement, et gérez les réservations récurrentes ou soumises à approbation."
---

# Calendrier de disponibilité

<div class="article-intro">

Le Calendrier de disponibilité vous offre une vue d'ensemble de toutes les réservations de salles et de ressources de votre église. Depuis cette page, vous pouvez voir ce qui est planifié, repérer les conflits avant qu'ils ne surviennent et réserver directement une salle ou une ressource pour n'importe quel événement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez au moins une [salle ou ressource](./rooms-resources.md) dans la section Salles et ressources
- Vous devez disposer de l'autorisation **Modifier le contenu**

</div>

## Ouvrir le Calendrier de disponibilité {#opening-the-availability-calendar}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers** et cliquez sur **Disponibilité**.

## Lire le calendrier {#reading-the-calendar}

Le calendrier affiche par défaut le mois en cours. Utilisez **Aujourd'hui**, **Précédent** et **Suivant** en haut pour vous déplacer, et **Mois**, **Semaine**, **Jour** ou **Agenda** pour changer d'affichage.

Chaque réservation est colorée selon son statut :

| Couleur | Signification |
|---------|---------------|
| Vert | Approuvée |
| Orange | En attente d'approbation |
| Gris | Bloquée (non disponible), affichée comme *Bloquée : motif* |

Chaque réservation affiche le titre de l'événement suivi des salles et des ressources utilisées. Passez la souris sur une réservation pour voir le texte complet. Cliquez sur une réservation pour ouvrir son événement et le modifier.

## Filtrer par salle ou ressource {#filtering-by-room-or-resource}

Utilisez la liste déroulante **Salle / Ressource** en haut à gauche pour restreindre le calendrier à une seule salle ou ressource. Sélectionnez **Toutes les salles et ressources** pour revenir à la vue complète.

## Réserver une salle ou une ressource {#booking-a-room-or-resource}

1. Cliquez sur le bouton **Réserver** en haut de la page.
2. La boîte de dialogue **Nouvel événement** s'ouvre — le même éditeur que celui utilisé sur un calendrier (voir [Ajouter et modifier des événements](./creating-calendars.md#adding-and-editing-events)). Remplissez les détails de l'événement :
   - **Groupe** *(obligatoire)* — le groupe auquel appartient l'événement. Si vous disposez de [modèles](./rooms-resources.md#event-templates), vous pouvez aussi choisir un **Modèle** pour remplir le reste.
   - **Titre** *(obligatoire)*
   - **Début** et **Fin** date/heure *(obligatoires ; la Fin doit être postérieure au Début)*
   - **Visibilité** — Publique ou Privée
   - **Salles** — sélectionnez une ou plusieurs salles à réserver
   - **Ressources** — sélectionnez une ou plusieurs ressources à réserver
3. Une fois une salle ou une ressource sélectionnée, vous pouvez définir **Préparation (min avant)** et **Rangement (min après)**. Ces durées prolongent la réservation de part et d'autre afin que l'espace soit réservé pour la préparation et le nettoyage, même si les heures de début et de fin de l'événement restent les mêmes.
4. Pour répéter la réservation, définissez d'abord le **Début**, puis cochez **Répétition** et configurez la récurrence :
   - **Intervalle** -- la fréquence de répétition (par exemple 2 avec Semaine pour toutes les 2 semaines).
   - **Fréquence** -- Jour, Semaine ou Mois. Pour une fréquence hebdomadaire, vous pouvez choisir un ou plusieurs jours précis de la semaine ; pour une fréquence mensuelle, vous pouvez choisir un jour fixe du mois ou un motif relatif comme « le deuxième mardi ».
   - **Se termine** -- **Jamais**, **Le** à une **Date de fin** précise, ou **Après** un nombre donné d'occurrences.
5. Pour définir une fenêtre de réservation personnalisée (différente du début et de la fin de l'événement), activez **Fenêtre de réservation personnalisée** et saisissez **Réserver à partir de** et **Réserver jusqu'à**. Cela remplace les minutes de préparation et de rangement. Utilisez cette option lorsqu'une salle doit être accessible en dehors des heures indiquées pour l'événement.
6. Cliquez sur **Enregistrer** pour soumettre la réservation.

:::info
Si la salle ou la ressource a un **Groupe d'approbation** configuré, la réservation apparaîtra comme **En attente** jusqu'à son approbation sur la page Approbations — sauf si vous êtes membre de ce groupe, auquel cas elle est approuvée immédiatement. Voir [Approbations du calendrier](./approvals.md) pour le processus d'approbation.
:::

:::tip
L'éditeur affiche un avertissement avant l'enregistrement si une salle ou une ressource est déjà réservée ou bloquée à ce moment-là. Si vous voyez un avertissement de conflit, ajustez vos horaires ou choisissez une autre salle.
:::

## Articles connexes {#related-articles}

- [Salles, ressources et planification](./rooms-resources.md) — configurer les espaces et l'équipement réservables
- [Approbations du calendrier](./approvals.md) — approuver ou refuser les demandes de réservation
- [Création de calendriers](./creating-calendars.md) — gérer les calendriers d'événements
