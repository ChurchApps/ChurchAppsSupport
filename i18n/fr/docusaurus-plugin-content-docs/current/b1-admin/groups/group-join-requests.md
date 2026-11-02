---
title: "Demandes d'adhésion aux groupes"
---

# Demandes d'adhésion aux groupes

<div class="article-intro">

Lorsqu'un groupe est configuré avec une politique d'adhésion sur approbation, les personnes peuvent soumettre des demandes pour le rejoindre. Les responsables de groupe et les administrateurs examinent ces demandes et les approuvent ou les refusent. Cela donne à votre église le contrôle de l'appartenance aux groupes, tout en facilitant la démarche des personnes qui souhaitent les rejoindre.

</div>

## Vidéo de formation

<YouTube id="1vj-suCiIsE" title="Demandes d'adhésion aux groupes et calendriers de groupe dans B1" next="Configurer les services et les présences dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir l'autorisation de gérer les groupes, ou être responsable du groupe concerné. Voir [Rôles et autorisations](../people/roles-permissions.md) pour plus de détails.
- Le groupe doit avoir sa politique d'adhésion réglée sur **Sur demande** (approbation requise). Voir [Créer des groupes](./creating-groups.md) pour savoir comment configurer les politiques d'adhésion.

</div>

## Comprendre les politiques d'adhésion

Les groupes peuvent avoir trois politiques d'adhésion différentes :

- **Ouvert** -- Tout le monde peut rejoindre immédiatement, sans approbation
- **Sur demande** -- Les personnes soumettent une demande d'adhésion qui doit être approuvée
- **Fermé** -- Personne ne peut demander à rejoindre (les membres doivent être ajoutés manuellement)

Lorsqu'un groupe utilise la politique **Sur demande**, toutes les tentatives d'adhésion passent par le processus d'approbation décrit sur cette page.

## Consulter les demandes en attente

### Pour les responsables de groupe

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) et choisissez **Personnes > Groupes**
2. Cliquez sur le nom du groupe
3. La section **Membres** indique combien de demandes sont en attente. Cliquez sur **Tous les membres** -- les demandes en attente pour ce groupe apparaissent en haut de la liste des membres

### Pour les administrateurs

Les administrateurs disposant des autorisations de gestion des groupes peuvent consulter les demandes en attente de tous les groupes :

1. Dans le menu de navigation rapide, choisissez **Personnes > Groupes**
2. Cliquez sur le bouton **demandes en attente** dans l'en-tête de la page (par exemple « 3 demandes en attente »). Il n'apparaît que lorsque des demandes attendent une réponse.
3. Examinez toutes les demandes en attente de l'église

## Examiner une demande d'adhésion

Chaque demande d'adhésion affiche :

- **Nom et photo de la personne** -- La personne qui demande à rejoindre le groupe
- **Message facultatif** -- Un message personnel expliquant pourquoi la personne souhaite se joindre au groupe (s'il a été fourni)
- **Date de la demande** -- Date à laquelle la demande a été soumise

Pour examiner une demande :

1. Lisez le message de la personne si elle en a fourni un
2. Cliquez sur le nom de la personne pour consulter son profil si nécessaire
3. Décidez d'approuver ou de refuser

## Approuver une demande

1. Cliquez sur **Approuver** pour la demande d'adhésion
2. La personne est immédiatement ajoutée au groupe comme membre
3. Le demandeur reçoit une notification indiquant que sa demande a été approuvée
4. La demande est marquée comme approuvée dans le système

:::tip
Lorsque vous approuvez une demande, la personne devient un membre ordinaire du groupe. Vous pourrez plus tard la promouvoir responsable de groupe depuis la page [Membres du groupe](./group-members.md), si nécessaire.
:::

## Refuser une demande

1. Cliquez sur **Refuser** pour la demande d'adhésion
2. Indiquez facultativement une raison du refus (jusqu'à 500 caractères)
3. Cliquez sur **Confirmer**
4. Le demandeur reçoit une notification avec la raison du refus (si vous en avez indiqué une)
5. La demande est marquée comme refusée

:::info
Indiquer une raison du refus aide la personne à comprendre pourquoi sa demande n'a pas été approuvée, et peut l'encourager à réessayer plus tard ou à explorer d'autres groupes.
:::

## Approuver depuis la page des tâches {#approving-from-the-tasks-page}

Chaque demande d'adhésion crée aussi une tâche sous **Service &rarr; Mon travail**, intitulée « *Personne* a demandé à rejoindre *Groupe* ». Elle est attribuée aux responsables du groupe. Si le groupe n'a pas encore de responsable, elle est transmise à tout membre du personnel disposant de l'autorisation **Membres du groupe &gt; Modifier**, ou aux administrateurs de domaine de votre église si personne n'a cette autorisation. Le personnel et les administrateurs qui reçoivent la tâche de cette façon reçoivent aussi une notification qui mène directement à celle-ci.

Ouvrir la tâche affiche le nom du demandeur, le groupe et son message facultatif, avec les boutons **Approuver** et **Refuser** directement sur la carte de tâche (Refuser ouvre le même champ facultatif de raison décrit ci-dessus). Les responsables disposent ainsi d'une seconde façon, pilotée par les notifications, de traiter une demande sans ouvrir la liste des membres du groupe.

Décider d'une demande depuis l'un ou l'autre endroit -- la liste des membres du groupe ou sa carte de tâche -- la ferme partout, afin que les responsables ne voient jamais une tâche périmée pour une demande déjà traitée.

## Notifications

Le système de demandes d'adhésion envoie automatiquement des notifications :

- **Lorsqu'une demande est soumise** -- Tous les responsables du groupe reçoivent une notification. Si le groupe n'a pas de responsable, le personnel ou les administrateurs assignés à la tâche sont notifiés à la place (voir ci-dessus).
- **Lorsqu'une demande est approuvée** -- Le demandeur reçoit une confirmation
- **Lorsqu'une demande est refusée** -- Le demandeur reçoit une notification avec la raison du refus, le cas échéant

Les notifications apparaissent dans le centre de notifications de l'utilisateur sur B1.church et dans l'application mobile. Dans la cloche de notifications de B1 Admin, cliquer sur une notification de demande d'adhésion (ou sur son bouton **Voir les détails**) ouvre le groupe sur le site B1.church de votre église dans un nouvel onglet.

## Gérer les demandes depuis le côté membre

Les personnes peuvent gérer leurs propres demandes d'adhésion depuis B1.church :

- Consulter l'état de leurs demandes en attente sur la page de détail du groupe
- Annuler une demande en attente si elles changent d'avis
- Voir si leur demande a été approuvée ou refusée

## Bonnes pratiques

- **Répondez rapidement** -- Essayez d'examiner les demandes dans les 24 à 48 heures pour que les personnes ne restent pas dans l'attente
- **Soyez clair dans les raisons de refus** -- Aidez les personnes à comprendre les étapes suivantes ou les autres options
- **Vérifiez les profils** -- Consultez le profil de la personne pour voir si elle convient au groupe
- **Communiquez les attentes** -- Assurez-vous que la description de votre groupe indique clairement à qui il est destiné

## Articles connexes

- [Créer des groupes](./creating-groups.md) -- Apprenez à créer des groupes et à configurer les politiques d'adhésion
- [Membres du groupe](./group-members.md) -- Gérer les membres existants d'un groupe
- [Calendrier du groupe](./group-calendar.md) -- Planifier les rencontres et événements du groupe
