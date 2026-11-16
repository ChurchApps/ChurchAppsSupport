---
title: "Demander des événements et des salles"
description: "Demandez la réservation d'une salle ou d'un équipement pour un événement depuis le portail des membres de B1.church, suivez son statut dans Mes demandes et annulez-la tant qu'elle est en attente."
---

# Demander des événements et des salles {#requesting-events--rooms}

<div class="article-intro">

Si votre église gère des salles et des ressources réservables, vous pouvez demander un événement — avec les salles et le matériel dont il a besoin — directement depuis le portail des membres. Les conflits avec les réservations existantes sont signalés au fur et à mesure de vos choix, votre demande est transmise à l'église pour approbation, et vous pouvez la suivre ou l'annuler depuis Mes demandes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](../getting-started/logging-in.md) au portail des membres
- Votre église doit avoir configuré des salles ou des ressources dans B1 Admin — les liens de demande n'apparaissent qu'à cette condition

</div>

## Soumettre une demande {#submitting-a-request}

1. Ouvrez la page **Moi** du portail des membres et appuyez sur **Demander un événement** dans la section **Demandes et inscriptions**.
   En haut de la page, vous lisez *« Le personnel approuve chaque salle et chaque élément. »*, sauf si votre église a rédigé ses propres instructions -- par exemple des règles de réservation ou le préavis à respecter -- auquel cas vous voyez celles-ci (voir [Page de demande d'événement](../../b1-admin/settings/mobile-app.md#event-request-page)).
2. Renseignez les informations de base de l'événement : **Titre de l'événement**, une **Description** facultative, ainsi que les heures de **Début** et de **Fin**. Activez **Toute la journée** pour ne choisir que des dates.
3. Choisissez les **Salles** et les **Ressources** dont vous avez besoin (vous pouvez en sélectionner plusieurs de chaque). Une fois un élément choisi, vous pouvez ajouter des minutes de **Installation (min avant)** et de **Rangement (min après)**, ou activer **Fenêtre de réservation personnalisée** et définir vous-même **Réserver à partir de** et **Réserver jusqu'à**.
4. Faites attention aux avertissements de conflit — si votre horaire chevauche une réservation existante pour une salle ou une ressource, vous verrez le message *« Certaines sélections sont peut-être déjà réservées à cette heure. »* Vous pouvez modifier votre horaire ou choisir autre chose.
5. Si l'événement a lieu plus d'une fois, activez **Répétitions** et définissez la récurrence.
6. Appuyez sur **Envoyer la demande**. Le bouton reste grisé tant que vous n'avez pas saisi de titre pour l'événement. Appuyez sur **Annuler** pour quitter sans envoyer.

Après l'envoi, un récapitulatif **Demande envoyée** indique le statut de chaque salle et ressource demandée (appuyez sur **Mes demandes** pour accéder à votre liste) :

- **Approuvée** -- Réservée immédiatement (la salle ou la ressource n'a pas de groupe d'approbation).
- **En attente d'approbation** -- Une personne de l'église doit d'abord la valider.

## Suivre vos demandes {#tracking-your-requests}

Ouvrez **Mes demandes** depuis la page Moi. Les demandes sont réparties entre **À venir** et **Passées** selon la date de l'événement (appuyez sur **Toutes les passées** pour voir les anciennes). Chaque demande affiche le titre de l'événement et son heure de début, la description que vous avez saisie, le statut de chaque salle et ressource demandée, ainsi qu'un badge de statut :

- **En attente** -- En attente d'une décision
- **Approuvée** -- Votre réservation est confirmée
- **Refusée** -- La demande a été refusée

Si le personnel a indiqué une raison lors du refus de la demande, ou de l'une de ses salles ou ressources, celle-ci apparaît en rouge sous la demande -- par exemple, *Refusée : le gymnase est réservé ce week-end-là.* La même raison figure dans la notification que vous recevez au sujet de la décision.

Tant qu'une demande est en attente, vous pouvez la retirer avec **Annuler la demande**. Une confirmation demande « Annuler cette demande ? Cette action est irréversible. » — appuyez sur **Annuler la demande** pour confirmer, ou sur **Conserver** pour la laisser telle quelle.

Vous pouvez aussi lancer une nouvelle demande avec le bouton **Demander un événement** en haut de Mes demandes.

:::info
Les demandes sont examinées par le personnel de l'église sur la [page des approbations](../../b1-admin/calendars/approvals.md) de B1 Admin. Il appartient à votre église de déterminer quelles salles et ressources nécessitent une approbation — voir [Salles et ressources](../../b1-admin/calendars/rooms-resources.md).
:::

## Articles connexes {#related-articles}

- [La page Moi](../getting-started/me-page.md) -- Où se trouvent les liens de demande
- [Approbations du calendrier (B1 Admin)](../../b1-admin/calendars/approvals.md) -- Comment le personnel examine les demandes
- [Salles et ressources (B1 Admin)](../../b1-admin/calendars/rooms-resources.md) -- Comment les églises configurent les espaces réservables
