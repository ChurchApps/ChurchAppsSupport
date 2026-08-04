---
title: "Calendrier de disponibilité"
---

# Calendrier de disponibilité

<div class="article-intro">

Le Calendrier de disponibilité vous donne une vue d'ensemble de toutes les réservations de salles et de ressources à travers votre église. Depuis cet endroit, vous pouvez voir ce qui est planifié, repérer les conflits avant qu'ils ne surviennent, et réserver directement une salle ou une ressource pour n'importe quel événement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez au moins une [salle ou ressource](rooms-resources) dans la section Salles et ressources
- Vous devez disposer d'un accès en modification à la section Calendriers dans B1 Admin

</div>

## Ouvrir le Calendrier de disponibilité

Dans B1 Admin, allez dans **Calendriers** et sélectionnez **Disponibilité** dans la barre latérale.

## Lire le calendrier

Le calendrier affiche le mois en cours par défaut. Vous pouvez naviguer en avant et en arrière avec les flèches en haut, ou basculer entre les vues mois, semaine et jour.

Chaque événement est codé par couleur selon son statut de réservation :

| Couleur | Signification |
|-------|---------|
| Vert | Approuvé |
| Orange | En attente d'approbation |
| Gris | Bloqué (non disponible) |

En survolant un événement, vous voyez le titre de l'événement et la salle ou la ressource à laquelle il est rattaché.

## Filtrer par salle ou ressource

Utilisez le menu déroulant **Filtre** en haut à gauche pour restreindre le calendrier à une seule salle ou ressource. Sélectionnez **Toutes les salles et ressources** pour revenir à la vue complète.

## Réserver une salle ou une ressource

1. Cliquez sur le bouton **Réserver** en haut à droite de la page.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les détails de l'événement :
   - **Titre** — le nom de l'événement
   - **Début** et **Fin** — date/heure
   - **Visibilité** — Public ou Privé
   - **Salles** — sélectionnez une ou plusieurs salles à réserver
   - **Ressources** — sélectionnez une ou plusieurs ressources à réserver
3. Vous pouvez éventuellement définir des durées de **Préparation** et de **Rangement** (en minutes). Celles-ci ajoutent une marge à la réservation des deux côtés afin que l'espace soit réservé pour la préparation et le rangement, même si les heures de début/fin de l'événement restent inchangées.
4. Pour répéter la réservation, cochez **Répète** et configurez la récurrence :
   - **Répéter tous les** -- définissez l'intervalle (par exemple, toutes les 2 semaines).
   - **Fréquence** -- Quotidienne, Hebdomadaire ou Mensuelle. Hebdomadaire vous permet de choisir des jours spécifiques de la semaine ; Mensuelle vous permet de choisir un jour fixe du mois ou un schéma relatif comme « le deuxième mardi ».
   - **Fin** -- Jamais, à une date précise, ou après un nombre défini d'occurrences.
5. Pour indiquer une plage horaire de réservation personnalisée (différente du début/fin de l'événement), activez **Plage de réservation personnalisée** et saisissez les heures de début et de fin de la plage. Utilisez cette option lorsqu'une salle doit être accessible en dehors des horaires indiqués pour l'événement.
6. Cliquez sur **Enregistrer** pour soumettre la réservation.

:::info
Si la salle ou la ressource dispose d'un **Groupe d'approbation** configuré, la réservation apparaîtra comme **En attente** jusqu'à ce qu'un responsable de ce groupe l'approuve. Consultez [Approbations de calendrier](approvals) pour le processus d'approbation.
:::

:::tip
Le calendrier met en évidence tout conflit avant l'enregistrement. Si vous voyez un avertissement de conflit, ajustez vos horaires ou choisissez une autre salle.
:::

## Articles connexes

- [Salles, ressources et planification](rooms-resources) — configurer les espaces et équipements réservables
- [Approbations de calendrier](approvals) — approuver ou refuser des demandes de réservation
- [Créer des calendriers](creating-calendars) — gérer les calendriers d'événements
