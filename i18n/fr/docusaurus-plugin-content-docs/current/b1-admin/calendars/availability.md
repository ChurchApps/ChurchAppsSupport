---
title: "Calendrier de disponibilité"
---

# Calendrier de disponibilité

<div class="article-intro">

Le Calendrier de disponibilité vous donne une vue d'ensemble de toutes les réservations de salles et de ressources dans votre église. De là, vous pouvez voir ce qui est planifié, repérer les conflits avant qu'ils ne se produisent et réserver une salle ou une ressource pour n'importe quel événement directement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez au moins une [salle ou ressource](rooms-resources) dans la section Salles et ressources
- Vous avez besoin d'un accès en modification à la section Calendriers dans B1 Admin

</div>

## Ouverture du Calendrier de disponibilité

Dans B1 Admin, allez à **Calendriers** et sélectionnez **Disponibilité** dans la barre latérale.

## Lecture du calendrier

Le calendrier affiche le mois actuel par défaut. Vous pouvez naviguer d'avant en arrière avec les flèches en haut, ou basculer entre les vues mensuelles, hebdomadaires et quotidiennes.

Chaque événement est codé par couleur selon le statut de réservation :

| Couleur | Signification |
|---------|---------------|
| Vert | Approuvé |
| Orange | En attente d'approbation |
| Gris | Bloqué (non disponible) |

Le survol d'un événement affiche le titre de l'événement et la salle ou ressource à laquelle il est attaché.

## Filtrage par salle ou ressource

Utilisez la liste déroulante **Filtre** en haut à gauche pour affiner le calendrier à une seule salle ou ressource. Sélectionnez **Toutes les salles et ressources** pour revenir à la vue complète.

## Réservation d'une salle ou ressource

1. Cliquez sur le bouton **Réserver** dans le coin supérieur droit de la page.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les détails de l'événement :
   - **Titre** -- le nom de l'événement
   - **Début** et **Fin** date/heure
   - **Visibilité** -- Public ou Privé
   - **Salles** -- sélectionnez une ou plusieurs salles à réserver
   - **Ressources** -- sélectionnez une ou plusieurs ressources à réserver
3. Définissez éventuellement les temps d'**Installation** et de **Démontage** (en minutes). Ces paramètres complètent la réservation des deux côtés afin que l'espace soit réservé pour l'installation et le nettoyage, même si les heures de début/fin de l'événement restent les mêmes.
4. Pour répéter la réservation, cochez **Répétitions** et configurez la récurrence :
   - **Répéter tous les** -- définissez l'intervalle (par exemple, toutes les 2 semaines).
   - **Fréquence** -- Quotidienne, Hebdomadaire ou Mensuelle. Hebdomadaire vous permet de choisir des jour(s) spécifique(s) de la semaine ; Mensuelle vous permet de choisir un jour fixe du mois ou un motif relatif comme « le deuxième mardi ».
   - **Se termine** -- Jamais, à une date spécifique, ou après un nombre défini d'occurrences.
5. Pour spécifier une fenêtre de réservation personnalisée (différente du début/fin de l'événement), activez **Fenêtre de réservation personnalisée** et entrez l'heure de début et de fin de la fenêtre. Utilisez ceci quand une salle doit être accessible en dehors des heures énumérées de l'événement.
6. Cliquez sur **Enregistrer** pour soumettre la réservation.

:::info
Si la salle ou ressource a un **Groupe d'approbation** configuré, la réservation apparaîtra comme **En attente** jusqu'à ce qu'un leader de ce groupe l'approuve. Consultez [Approbations de calendrier](approvals) pour le flux de travail d'approbation.
:::

:::tip
Le calendrier mettra en évidence tous les conflits avant que vous n'enregistriez. Si vous voyez un avertissement de conflit, ajustez vos horaires ou choisissez une salle différente.
:::

## Articles connexes

- [Salles, ressources et planification](rooms-resources) -- configurer les espaces et l'équipement réservables
- [Approbations de calendrier](approvals) -- approuver ou refuser les demandes de réservation
- [Création de calendriers](creating-calendars) -- gérer les calendriers d'événements
