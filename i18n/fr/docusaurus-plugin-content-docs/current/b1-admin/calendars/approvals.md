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

Lorsqu'un groupe crée un événement et demande une salle ou une ressource, la demande apparaît dans la section **Demandes de salle et de ressource**. Chaque ligne affiche :

- Le nom de l'événement et la date/heure
- La salle ou la ressource demandée (avec la quantité pour les ressources à plusieurs unités)
- Un badge d'état indiquant si la demande présente des conflits

### Indicateurs de conflit

Si une demande chevauche une autre réservation ou un blocage pour la même salle ou ressource, son état affiche un badge **Conflits** ; passez la souris dessus pour voir les détails. Les demandes sans chevauchement affichent **Aucun conflit**. Examinez attentivement les demandes en conflit avant d'en approuver une.

### Approbation ou rejet

Cliquez sur **Approuver** ou **Rejeter** sur n'importe quelle demande de réservation (le rejet demande d'abord une confirmation). Le groupe demandeur est notifié de la décision. Les réservations approuvées sont verrouillées à cette salle ou ressource pour l'événement ; les réservations rejetées libèrent le créneau pour d'autres.

Lorsque vous cliquez sur **Approuver**, une boîte de dialogue **Approuver la réservation** s'ouvre pour vous permettre de publier aussi l'événement à la même étape :

1. Cochez **Publier sur le calendrier public** pour rendre l'événement public sur le calendrier de son groupe. Laissez la case décochée pour approuver la réservation sans modifier la visibilité de l'événement.
2. Une fois **Publier sur le calendrier public** coché, vous pouvez éventuellement choisir un calendrier curé dans **Également ajouter au calendrier** pour y ajouter l'événement. Laissez **Aucun** pour ignorer cette étape. (Cette option n'apparaît que si vous avez la permission **content.edit**.)
3. Cliquez sur **Approuver**.

## Événements en Attente

Si votre flux de travail de calendrier nécessite l'approbation des événements avant qu'ils ne deviennent visibles au public, les événements en attente apparaissent dans la section **Demandes d'événement**. Cliquez sur **Approuver** pour publier un événement au calendrier, ou sur **Rejeter** pour notifier le soumetteur que des modifications sont nécessaires.

:::tip
Configurez un Groupe d'Approbation sur une salle dans [Salles et Ressources](rooms-resources) pour exiger l'approbation pour cette salle. Les groupes avec accès peuvent ensuite demander la salle lors de la création d'événements, et ces demandes circulent vers cette page.
:::

## Articles Connexes

- [Salles, Ressources et Planification](rooms-resources) — configurer les salles et ressources réservables
- [Création de Calendriers](creating-calendars) — gérer les calendriers et les événements
