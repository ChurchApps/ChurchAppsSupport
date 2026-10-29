---
title: "Demandes d'adhésion aux groupes"
---

# Demandes d'adhésion aux groupes

<div class="article-intro">

Lorsqu'un groupe est configuré avec une politique d'adhésion nécessitant une approbation, les personnes peuvent soumettre des demandes pour rejoindre le groupe. Les responsables de groupe et les administrateurs examinent ces demandes et les approuvent ou les refusent. Cela donne à votre église le contrôle de l'adhésion aux groupes, tout en facilitant l'expression d'intérêt des personnes.

</div>

## Vidéo de formation

<YouTube id="1vj-suCiIsE" title="Demandes d'adhésion aux groupes et calendriers de groupe dans B1" next="Configurer les services et la présence dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir l'autorisation de gérer les groupes, ou être responsable du groupe concerné. Consultez [Rôles et autorisations](../people/roles-permissions.md) pour plus de détails.
- Le groupe doit avoir sa politique d'adhésion réglée sur **Demande** (approbation requise). Consultez [Créer des groupes](./creating-groups.md) pour savoir comment configurer les politiques d'adhésion.

</div>

## Comprendre les politiques d'adhésion

Les groupes peuvent avoir trois politiques d'adhésion différentes :

- **Ouvert** -- Toute personne peut rejoindre immédiatement, sans approbation
- **Demande** -- Les personnes soumettent une demande d'adhésion qui nécessite une approbation
- **Fermé** -- Personne ne peut demander à rejoindre (les membres doivent être ajoutés manuellement)

Lorsqu'un groupe utilise la politique **Demande**, toutes les tentatives d'adhésion passent par le processus d'approbation décrit sur cette page.

## Consulter les demandes en attente

### Pour les responsables de groupe

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) et choisissez **Personnes > Groupes**
2. Cliquez sur le nom du groupe
3. La section **Membres** indique le nombre de demandes en attente. Cliquez sur **Tous les membres** -- les demandes en attente de ce groupe apparaissent en haut de la liste des membres

### Pour les administrateurs

Les administrateurs disposant des autorisations de gestion des groupes peuvent consulter les demandes en attente de tous les groupes :

1. Dans le menu Accès rapide, choisissez **Personnes > Groupes**
2. Cliquez sur le bouton **demandes en attente** dans l'en-tête de la page (par exemple « 3 demandes en attente »). Il n'apparaît que lorsque des demandes attendent une réponse.
3. Examinez toutes les demandes en attente à l'échelle de l'église

## Examiner une demande d'adhésion

Chaque demande d'adhésion affiche :

- **Nom et photo de la personne** -- La personne qui demande à rejoindre le groupe
- **Message facultatif** -- Un message personnel expliquant pourquoi la personne souhaite rejoindre le groupe (s'il a été fourni)
- **Date de la demande** -- Le moment où la demande a été soumise

Pour examiner une demande :

1. Lisez le message de la personne si elle en a fourni un
2. Cliquez sur le nom de la personne pour voir son profil, au besoin
3. Décidez d'approuver ou de refuser la demande

## Approuver une demande

1. Cliquez sur **Approuver** sur la demande d'adhésion
2. La personne est immédiatement ajoutée au groupe en tant que membre
3. Le demandeur reçoit une notification indiquant que sa demande a été approuvée
4. La demande est marquée comme approuvée dans le système

:::tip
Lorsque vous approuvez une demande, la personne devient un membre ordinaire du groupe. Vous pourrez plus tard la promouvoir au rôle de responsable de groupe si nécessaire, depuis la page [Membres du groupe](./group-members.md).
:::

## Refuser une demande

1. Cliquez sur **Refuser** sur la demande d'adhésion
2. Indiquez facultativement une raison du refus (jusqu'à 500 caractères)
3. Cliquez sur **Confirmer**
4. Le demandeur reçoit une notification avec votre raison de refus (si vous en avez fourni une)
5. La demande est marquée comme refusée

:::info
Indiquer une raison de refus aide la personne à comprendre pourquoi sa demande n'a pas été approuvée et peut l'encourager à réessayer plus tard ou à explorer d'autres groupes.
:::

## Approuver depuis la page des tâches {#approving-from-the-tasks-page}

Chaque demande d'adhésion crée aussi une tâche sous **Service &rarr; Mon travail**, intitulée « *Personne* a demandé à rejoindre *Groupe* ». Elle est assignée aux responsables du groupe. Si le groupe n'a pas encore de responsable, elle est assignée à tout membre du personnel disposant de l'autorisation **Membres du groupe &gt; Modifier**, ou aux administrateurs de domaine de votre église si personne n'a cette autorisation. Le personnel et les administrateurs qui reçoivent la tâche de cette façon reçoivent aussi une notification qui mène directement à celle-ci.

En ouvrant la tâche, vous voyez le nom du demandeur, le groupe et son message facultatif, avec les boutons **Approuver** et **Refuser** directement sur la carte de la tâche (Refuser ouvre le même champ facultatif de raison décrit ci-dessus). Les responsables disposent ainsi d'une deuxième façon, pilotée par les notifications, de traiter une demande sans ouvrir la liste des membres du groupe.

Décider d'une demande depuis l'un ou l'autre endroit -- la liste des membres du groupe ou la carte de tâche -- la ferme partout, afin que les responsables ne voient jamais une tâche périmée pour une demande déjà traitée.

## Notifications

Le système de demandes d'adhésion envoie automatiquement des notifications :

- **Lorsqu'une demande est soumise** -- Tous les responsables du groupe reçoivent une notification. Si le groupe n'a pas de responsable, le personnel ou les administrateurs assignés à la tâche sont notifiés à la place (voir ci-dessus).
- **Lorsqu'une demande est approuvée** -- Le demandeur reçoit une confirmation
- **Lorsqu'une demande est refusée** -- Le demandeur reçoit une notification avec la raison du refus, le cas échéant

Les notifications apparaissent dans le centre de notifications de l'utilisateur sur B1.church et dans l'application mobile. Dans la cloche de notifications de B1 Admin, cliquer sur une notification de demande d'adhésion (ou sur son bouton **Voir les détails**) ouvre le groupe sur le site B1.church de votre église, dans un nouvel onglet.

## Gérer ses demandes depuis le côté membre

Les personnes peuvent gérer leurs propres demandes d'adhésion depuis B1.church :

- Consulter l'état de leurs demandes en attente sur la page de détails du groupe
- Annuler une demande en attente si elles changent d'avis
- Voir si leur demande a été approuvée ou refusée

## Bonnes pratiques

- **Répondez rapidement** -- Essayez d'examiner les demandes dans les 24 à 48 heures afin que les personnes ne restent pas en attente
- **Soyez clair dans les raisons de refus** -- Aidez les personnes à comprendre les prochaines étapes ou les autres options
- **Vérifiez les profils** -- Consultez le profil de la personne pour voir si elle convient bien au groupe
- **Communiquez les attentes** -- Assurez-vous que la description de votre groupe indique clairement à qui il s'adresse

## Articles connexes

- [Créer des groupes](./creating-groups.md) -- Apprenez à créer des groupes et à configurer les politiques d'adhésion
- [Membres du groupe](./group-members.md) -- Gérer les membres existants d'un groupe
- [Calendrier du groupe](./group-calendar.md) -- Planifier les réunions et événements du groupe
