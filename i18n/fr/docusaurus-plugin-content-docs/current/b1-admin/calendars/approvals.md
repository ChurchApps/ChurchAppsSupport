---
title: "Approbations du calendrier"
description: "Examinez les demandes de réservation de salles et de ressources en attente dans B1 Admin, vérifiez les conflits, approuvez ou refusez-les, et consultez les décisions passées sous Historique."
---

# Approbations du calendrier

<div class="article-intro">

La page Approbations permet aux administrateurs d'examiner et de traiter les demandes de réservation de salles et de ressources en attente, ainsi que les événements du calendrier qui doivent être approuvés avant d'être publiés.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez les salles ou ressources avec un **groupe d'approbation** dans [Salles et ressources](./rooms-resources.md)
- Vous avez besoin de la permission **Administration des calendriers** ou de la permission **content.edit**

</div>

## Ouvrir les approbations

Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers**, puis cliquez sur **Approbations**. Les demandes de réservation en attente et les événements à examiner y sont listés. Utilisez les boutons **En attente** et **Historique** en haut de la page pour passer des demandes qui exigent encore une décision à celles qui ont déjà été tranchées.

## Demandes de réservation

Lorsqu'un groupe crée un événement et demande une salle ou une ressource, la demande apparaît dans la section **Demandes de salles et de ressources**. Chaque ligne affiche :

- Le nom de l'événement ainsi que sa date et son heure
- La salle ou la ressource demandée (avec la quantité pour les ressources à plusieurs unités)
- **Demandé par**, la personne qui a fait la demande, avec un lien vers sa fiche
- Un badge d'état indiquant si la demande présente des conflits

### Indicateurs de conflit

Si une demande chevauche une autre réservation ou un blocage pour la même salle ou ressource, son état affiche un badge **Conflits** ; survolez-le pour voir les détails. Les demandes sans chevauchement affichent **Aucun conflit**. Examinez attentivement les demandes en conflit avant d'en approuver une.

### Approuver ou refuser

Cliquez sur **Approuver** ou **Refuser** pour n'importe quelle demande de réservation (le refus demande d'abord une confirmation). La personne qui a fait la demande est informée de la décision. Les réservations approuvées bloquent la salle ou la ressource pour l'événement ; les réservations refusées libèrent le créneau pour d'autres.

Lorsque vous cliquez sur **Approuver**, une boîte de dialogue **Approuver la réservation** s'ouvre. Elle vous permet de publier l'événement à la même étape :

1. Cochez **Publier sur le calendrier public** pour rendre l'événement public sur le calendrier de son groupe. Laissez la case décochée pour approuver la réservation sans modifier la visibilité de l'événement.
2. Une fois **Publier sur le calendrier public** coché, vous pouvez choisir facultativement un [calendrier personnalisé](./curated-calendar.md) dans **Ajouter aussi au calendrier** pour y ajouter l'événement. Laissez **Aucun** pour ignorer cette étape. (Cette option n'apparaît que si vous avez la permission **content.edit**.)
3. Cliquez sur **Approuver**.

## Événements en attente

Si votre flux de travail de calendrier exige l'approbation des événements avant qu'ils ne soient visibles du public, les événements en attente apparaissent dans la section **Demandes d'événements**. Cliquez sur **Approuver** pour publier un événement au calendrier, ou sur **Refuser** pour informer l'auteur que des modifications sont nécessaires.

:::tip
Configurez un groupe d'approbation sur une salle dans [Salles et ressources](./rooms-resources.md) pour exiger une approbation pour cette salle. Les groupes qui y ont accès peuvent alors demander la salle lors de la création d'événements, et ces demandes apparaissent sur cette page.
:::

## Historique

Les demandes approuvées et refusées restent sur la page. Cliquez sur **Historique** en haut d'Approbations pour les voir ; cliquez sur **En attente** pour revenir aux demandes ouvertes.

- **Demandes de salles et de ressources** liste chaque réservation tranchée avec l'événement, la salle ou la ressource, **Demandé par**, un badge **Approuvée** ou **Refusée**, et **Décidée**, qui indique qui a pris la décision et à quelle date. Les demandes les plus récemment tranchées apparaissent en premier.
- **Demandes d'événements** liste chaque événement tranché avec sa description, **Demandé par** et un badge **Approuvé** ou **Refusé**. La personne qui a tranché une demande d'événement, ainsi que la date de la décision, ne sont pas enregistrées ; cette colonne n'est donc pas affichée pour les événements.

Cliquez sur un nom sous **Demandé par** pour ouvrir la fiche de cette personne.

## Articles connexes

- [Salles, ressources et planification](./rooms-resources.md) — configurer les salles et ressources réservables
- [Créer des calendriers](./creating-calendars.md) — gérer les calendriers et les événements
