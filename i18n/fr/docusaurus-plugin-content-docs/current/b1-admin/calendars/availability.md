---
title: "Calendrier de disponibilité"
---

# Calendrier de disponibilité

<div class="article-intro">

Le calendrier de disponibilité vous offre une vue d'ensemble de toutes les réservations de salles et de ressources dans votre église. De là, vous pouvez voir ce qui est programmé, détecter les conflits avant qu'ils ne se produisent et réserver une salle ou une ressource pour n'importe quel événement directement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez au moins une [salle ou ressource](rooms-resources) dans la section Salles et ressources
- Vous avez besoin d'accès à l'édition de la section Calendriers dans B1 Admin

</div>

## Ouverture du calendrier de disponibilité

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Calendriers**, puis sélectionnez **Disponibilité**.

## Lecture du calendrier

Le calendrier affiche le mois actuel par défaut. Vous pouvez naviguer vers l'avant et vers l'arrière avec les flèches en haut, ou passer entre les vues mois, semaine et jour.

Chaque événement est codé par couleur selon l'état de la réservation :

| Couleur | Signification |
|--------|---------|
| Vert | Approuvé |
| Orange | En attente d'approbation |
| Gris | Bloqué (non disponible) |

Le survol d'un événement affiche le titre de l'événement et la salle ou la ressource auquel il est attaché.

## Filtrage par salle ou ressource

Utilisez la liste déroulante **Filtre** en haut à gauche pour restreindre le calendrier à une seule salle ou ressource. Sélectionnez **Toutes les salles et ressources** pour revenir à la vue complète.

## Réservation d'une salle ou ressource

1. Cliquez sur le bouton **Réserver** dans le coin supérieur droit de la page.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les détails de l'événement :
   - **Titre** -- le nom de l'événement
   - **Début** et **Fin** date/heure
   - **Visibilité** -- Public ou Privé
   - **Salles** -- sélectionnez une ou plusieurs salles à réserver
   - **Ressources** -- sélectionnez une ou plusieurs ressources à réserver
3. Définissez éventuellement les heures de **Configuration** et **Démontage** (en minutes). Celles-ci complètent la réservation aux deux extrémités pour que l'espace soit réservé pour la configuration et le nettoyage, même si les heures de début/fin de l'événement restent les mêmes.
4. Pour répéter la réservation, cochez **Répète** et configurez la récurrence :
   - **Répète tous les** -- définissez l'intervalle (par exemple, tous les 2 semaines).
   - **Fréquence** -- Quotidien, Hebdomadaire ou Mensuel. Hebdomadaire vous permet de choisir des jours spécifiques de la semaine ; Mensuel vous permet de choisir un jour fixe du mois ou un motif relatif comme « le deuxième mardi ».
   - **Fin** -- Jamais, à une date spécifique ou après un nombre défini d'occurrences.
5. Pour spécifier une fenêtre de réservation personnalisée (différente du début/fin de l'événement), basculez **Fenêtre de réservation personnalisée** et entrez les heures de début et de fin de la fenêtre. Utilisez ceci quand une salle doit être accessible en dehors des heures listées de l'événement.
6. Cliquez sur **Enregistrer** pour soumettre la réservation.

:::info
Si la salle ou la ressource a un **Groupe d'approbation** configuré, la réservation apparaîtra comme **En attente** jusqu'à ce qu'un chef de ce groupe l'approuve. Consultez [Approbations du calendrier](approvals) pour le flux de travail d'approbation.
:::

:::tip
Le calendrier mettra en surbrillance tous les conflits avant que vous n'enregistriez. Si vous voyez un avertissement de conflit, ajustez vos heures ou choisissez une salle différente.
:::

## Articles connexes

- [Salles, ressources et planification](rooms-resources) -- configurer les espaces et les équipements réservables
- [Approbations du calendrier](approvals) -- approuver ou rejeter les demandes de réservation
- [Création de calendriers](creating-calendars) -- gérer les calendriers d'événements
