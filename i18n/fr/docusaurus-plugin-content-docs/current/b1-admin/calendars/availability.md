---
title: "Calendrier de Disponibilité"
---

# Calendrier de Disponibilité

<div class="article-intro">

Le Calendrier de Disponibilité vous donne une vue d'ensemble de toutes les réservations de salles et de ressources dans votre église. De là, vous pouvez voir ce qui est prévu, repérer les conflits avant qu'ils ne se produisent, et réserver une salle ou une ressource pour n'importe quel événement directement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez au moins une [salle ou ressource](rooms-resources) dans la section Salles et Ressources
- Vous avez besoin d'un accès de modification à la section Calendriers dans B1 Admin

</div>

## Ouverture du Calendrier de Disponibilité

Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche et choisissez **Calendriers**, puis sélectionnez **Disponibilité**.

## Lecture du Calendrier

Le calendrier affiche le mois actuel par défaut. Vous pouvez naviguer vers l'avant et vers l'arrière avec les flèches en haut, ou basculer entre les vues mois, semaine et jour.

Chaque événement est codé par couleur selon l'état de la réservation :

| Couleur | Signification |
|--------|---------|
| Vert | Approuvée |
| Orange | En attente d'approbation |
| Gris | Bloquée (non disponible) |

Le survol d'un événement affiche le titre de l'événement et la salle ou la ressource à laquelle il est attaché.

## Filtrage par Salle ou Ressource

Utilisez la liste déroulante **Filtrer** en haut à gauche pour réduire le calendrier à une seule salle ou ressource. Sélectionnez **Toutes les Salles et Ressources** pour revenir à la vue complète.

## Réservation d'une Salle ou Ressource

1. Cliquez sur le bouton **Réserver** dans le coin supérieur droit de la page.
2. Dans la boîte de dialogue qui s'ouvre, remplissez les détails de l'événement :
   - **Titre** — le nom de l'événement
   - **Début** et **Fin** date/heure
   - **Visibilité** — Publique ou Privée
   - **Salles** — sélectionnez une ou plusieurs salles à réserver
   - **Ressources** — sélectionnez une ou plusieurs ressources à réserver
3. Définissez éventuellement les heures de **Configuration** et **Démontage** (en minutes). Celles-ci complètent la réservation des deux côtés pour que l'espace soit réservé pour la configuration et le nettoyage, même si les heures de début/fin de l'événement restent les mêmes.
4. Pour répéter la réservation, cochez **Répète** et configurez la récurrence :
   - **Répète chaque** -- définissez l'intervalle (par exemple, tous les 2 semaines).
   - **Fréquence** -- Quotidien, Hebdomadaire ou Mensuel. Hebdomadaire vous permet de choisir des jours spécifiques de la semaine ; Mensuel vous permet de choisir un jour fixe du mois ou un motif relatif comme "le deuxième mardi".
   - **Se termine** -- Jamais, à une date spécifique, ou après un nombre défini d'occurrences.
5. Pour spécifier une fenêtre de réservation personnalisée (différente du début/fin de l'événement), basculez **Fenêtre de Réservation Personnalisée** et entrez les heures de début et de fin de la fenêtre. Utilisez ceci lorsqu'une salle doit être accessible en dehors des heures indiquées de l'événement.
6. Cliquez sur **Enregistrer** pour soumettre la réservation.

:::info
Si la salle ou la ressource a un **Groupe d'Approbation** configuré, la réservation apparaîtra comme **En Attente** jusqu'à ce qu'un leader de ce groupe l'approuve. Voir [Approbations de Calendrier](approvals) pour le flux d'approbation.
:::

:::tip
Le calendrier mettra en évidence tous les conflits avant que vous ne sauviez. Si vous voyez un avertissement de conflit, ajustez vos heures ou choisissez une salle différente.
:::

## Articles Connexes

- [Salles, Ressources et Planification](rooms-resources) — configurer les espaces et l'équipement réservables
- [Approbations de Calendrier](approvals) — approuver ou refuser les demandes de réservation
- [Création de Calendriers](creating-calendars) — gérer les calendriers d'événements
