---
title: "Approbations du calendrier"
description: "Examinez les demandes de réservation de salles et de ressources en attente dans B1 Admin, vérifiez les conflits, approuvez ou refusez-les, et consultez les décisions passées dans l'historique."
---

# Approbations du calendrier

<div class="article-intro">

La page Approbations est l'endroit où les administrateurs examinent les demandes de réservation de salles et de ressources en attente, ainsi que les événements du calendrier qui doivent être approuvés avant d'être publiés.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez des salles ou des ressources avec un **Groupe d'approbation** dans [Salles et ressources](./rooms-resources.md)
- Vous devez disposer de l'autorisation **Modifier le contenu**, ou de **Résoudre les conflits et approbations du calendrier** (les deux se trouvent dans la section **Contenu** de [Rôles et autorisations](../settings/roles-permissions.md)). Sans **Modifier le contenu**, le menu **Calendriers** n'est pas affiché — ouvrez alors Approbations depuis le lien des approbations en attente du **Tableau de bord** ou depuis le courriel d'approbation.

</div>

## Ouvrir les approbations {#opening-approvals}

Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Calendriers** et cliquez sur **Approbations**. Les demandes de réservation en attente et les événements en attente d'examen sont listés ici. Utilisez les boutons **En attente** et **Historique** en haut pour passer des demandes qui nécessitent encore une décision à celles qui ont déjà été tranchées.

## Demandes de réservation {#booking-requests}

Lorsqu'une personne réserve une salle ou une ressource qui possède un **Groupe d'approbation**, et qu'elle ne fait pas partie de ce groupe, la demande apparaît dans la section **Demandes de salles et ressources**. (Les réservations faites par les membres du Groupe d'approbation sont approuvées automatiquement.) Les membres du Groupe d'approbation reçoivent aussi un courriel listant les nouvelles demandes en attente, avec un lien vers cette page. Chaque ligne affiche :

- Le nom et la date/heure de l'événement
- La salle ou la ressource demandée (avec la quantité pour les ressources à plusieurs unités)
- **Demandé par**, la personne qui l'a demandée, avec un lien vers sa fiche
- Un badge de statut indiquant si la demande comporte des conflits

### Indicateurs de conflit {#conflict-indicators}

Si une demande chevauche une autre réservation ou un blocage pour la même salle ou la même ressource, son statut affiche un badge **Conflits** ; passez la souris dessus pour voir les détails. Les demandes sans chevauchement affichent **Aucun conflit**. Examinez attentivement les demandes en conflit avant d'en approuver une.

### Approuver ou refuser {#approving-or-rejecting}

Passez la souris sur une demande de réservation et cliquez sur **Approuver** ou **Refuser** (le refus vous demande d'abord une confirmation). Le demandeur est informé de la décision. Les réservations approuvées bloquent la salle ou la ressource pour l'événement ; les réservations refusées libèrent le créneau pour d'autres.

Lorsque vous cliquez sur **Approuver**, une boîte de dialogue **Approuver la réservation** s'ouvre afin que vous puissiez aussi publier l'événement à la même étape :

1. Cochez **Publier dans le calendrier public** pour rendre l'événement public sur le calendrier de son groupe. Laissez la case décochée pour approuver la réservation sans modifier la visibilité de l'événement.
2. Une fois **Publier dans le calendrier public** coché, vous pouvez éventuellement choisir un calendrier organisé dans **Ajouter aussi au calendrier** pour ajouter l'événement à l'un de vos [calendriers organisés](./curated-calendar.md). Laissez sur **Aucun** pour ignorer cette étape. (Cette option n'apparaît que si vous disposez de l'autorisation **content.edit**.)
3. Cliquez sur **Approuver**.

## Événements en attente {#pending-events}

Les événements demandés par les membres (par exemple depuis **Mes demandes** dans l'application B1) apparaissent dans la section **Demandes d'événements** avec leur date, leur **Description** et **Demandé par**. Cliquez sur **Approuver** pour publier un événement dans le calendrier, ou sur **Refuser** pour informer l'auteur que des modifications sont nécessaires. Cliquez sur **Modifier** pour corriger les détails de la demande avant de décider, ou sur **Supprimer** pour la retirer.

:::tip
Configurez un Groupe d'approbation sur une salle dans [Salles et ressources](./rooms-resources.md) pour exiger une approbation pour cette salle. Les groupes qui y ont accès peuvent alors demander la salle lors de la création d'événements, et ces demandes arrivent sur cette page.
:::

## Changer le demandeur d'une demande {#changing-who-a-request-is-for}

Si vous avez saisi une demande au nom d'un membre, par exemple lorsqu'il a appelé le bureau, elle est listée à votre nom. Cliquez sur l'icône d'échange à côté du nom sous **Demandé par** (dans l'une ou l'autre section, sur **En attente** ou **Historique**), recherchez le membre et cliquez sur **Déplacer vers cette personne**. La demande entière est déplacée : la demande d'événement et chaque réservation de salle et de ressource qui s'y rattache. Le membre reçoit alors la notification d'approbation ou de refus, voit la demande sous **Mes demandes** dans l'application B1, et elle apparaît dans la section des demandes de sa fiche personne. Déplacer une demande ne change pas son statut d'approbation.

## Historique {#history}

Les demandes approuvées et refusées restent sur la page. Cliquez sur **Historique** en haut des Approbations pour les voir ; cliquez sur **En attente** pour revenir aux demandes ouvertes.

- **Demandes de salles et ressources** liste chaque réservation tranchée avec l'événement, la salle ou la ressource, **Demandé par**, un badge **Approuvé** ou **Refusé**, et **Décidé**, qui indique qui a pris la décision et à quelle date. Les demandes tranchées le plus récemment sont listées en premier.
- **Demandes d'événements** liste chaque événement tranché avec sa description, **Demandé par**, un badge **Approuvé** ou **Refusé**, et **Décidé**, qui indique qui a pris la décision et à quelle date. Les anciennes demandes d'événements, tranchées avant que B1 ne commence à l'enregistrer, affichent un tiret à la place.

Vous pouvez changer d'avis depuis l'historique : une demande approuvée comporte une action **Refuser** et une demande refusée comporte une action **Approuver**. Refuser une demande d'événement que vous aviez approuvée la retire du calendrier public. Les demandes d'événements peuvent aussi être modifiées ou supprimées ici.

Cliquez sur un nom sous **Demandé par** pour ouvrir la fiche de cette personne.

## Articles connexes {#related-articles}

- [Salles, ressources et planification](./rooms-resources.md) — configurer les salles et ressources réservables
- [Création de calendriers](./creating-calendars.md) — gérer les calendriers et les événements
