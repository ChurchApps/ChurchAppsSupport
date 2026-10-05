---
title: "Approbations de Calendrier"
---

# Approbations de Calendrier

<div class="article-intro">

La page Approbations est l'endroit où les administrateurs examinent et agissent sur les demandes de réservation de salles et de ressources en attente, ainsi que les événements de calendrier qui nécessitent une approbation avant d'être publiés.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les salles ou ressources avec un **Groupe d'Approbation** dans [Salles et Ressources](rooms-resources)
- Vous avez besoin de la permission **Calendars Admin** ou de la permission **content.edit**

</div>

## Ouverture des Approbations

Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, et cliquez sur **Approbations**. Les demandes de réservation en attente et les événements en attente d'examen sont énumérés ici.

## Demandes de Réservation

Lorsqu'un groupe crée un événement et demande une salle ou une ressource, la demande apparaît dans le panneau **Demandes de Salle et Ressource**. Chaque ligne affiche :

- La salle ou la ressource demandée
- Le nom de l'événement et la date/heure
- Le groupe demandeur

### Indicateurs de Conflit

Si deux demandes se chevauchent pour la même salle ou ressource, une icône d'avertissement de conflit apparaît. Examinez attentivement les demandes en conflit avant d'approuver l'une d'elles.

### Approbation ou Rejet

Cliquez sur l'icône **✓** (approuver) ou **✗** (rejeter) sur n'importe quelle demande de réservation. Le groupe demandeur est notifié de la décision. Les réservations approuvées sont verrouillées à cette salle ou ressource pour l'événement; les réservations rejetées libèrent l'emplacement pour les autres.

Lorsque vous cliquez sur approuver, une boîte de dialogue **Approuver la réservation** s'ouvre pour que vous puissiez également publier l'événement en même temps :

1. Cochez **Publier sur le calendrier public** pour rendre l'événement public sur le calendrier de son groupe. Laissez-le non coché pour approuver la réservation sans modifier la visibilité de l'événement.
2. Une fois que **Publier sur le calendrier public** est coché, vous pouvez optionnellement choisir un calendrier curé à partir de **Ajouter également au calendrier** pour ajouter l'événement à l'un de vos [calendriers curés](curated-calendar) aussi. Laissez-le défini sur **Aucun** pour ignorer ceci. (Cette option n'apparaît que si vous avez la permission **content.edit**.)
3. Cliquez sur **Approuver**.

## Événements en Attente

Si votre flux de travail de calendrier nécessite l'approbation des événements avant qu'ils ne deviennent visibles au public, les événements en attente apparaissent dans le panneau **Événements en Attente**. Approuvez un événement pour le publier au calendrier, ou rejetez-le pour notifier le soumetteur que des modifications sont nécessaires.

:::tip
Configurez un Groupe d'Approbation sur une salle dans [Salles et Ressources](rooms-resources) pour exiger l'approbation pour cette salle. Les groupes avec accès peuvent ensuite demander la salle lors de la création d'événements, et ces demandes circulent vers cette page.
:::

## Articles Connexes

- [Salles, Ressources et Planification](rooms-resources) — configurer les salles et ressources réservables
- [Création de Calendriers](creating-calendars) — gérer les calendriers et les événements
