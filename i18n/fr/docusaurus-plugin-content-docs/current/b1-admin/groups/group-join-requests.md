---
title: "Demandes d'adhésion aux groupes"
---

# Demandes d'adhésion aux groupes

<div class="article-intro">

Quand un groupe est configuré avec une politique d'adhésion basée sur l'approbation, les gens peuvent soumettre des demandes pour rejoindre. Les leaders de groupe et les administrateurs examinent ces demandes et les approuvent ou les refusent. Cela donne à votre église le contrôle sur l'adhésion au groupe tout en facilisant pour les gens d'exprimer leur intérêt à rejoindre.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer les groupes, ou vous devez être un leader du groupe spécifique. Voir [Roles & Permissions](../people/roles-permissions.md) pour plus de détails.
- Le groupe doit avoir sa politique d'adhésion définie sur **Request** (approbation requise). Voir [Creating Groups](./creating-groups.md) pour savoir comment configurer les politiques d'adhésion.

</div>

## Comprendre les politiques d'adhésion

Les groupes peuvent avoir trois politiques d'adhésion différentes :

- **Open** -- N'importe qui peut rejoindre immédiatement sans approbation
- **Request** -- Les gens soumettent une demande d'adhésion qui nécessite approbation
- **Closed** -- Personne ne peut demander à rejoindre (les membres doivent être ajoutés manuellement)

Quand un groupe utilise la politique **Request**, toutes les tentatives d'adhésion passent par le flux de travail d'approbation décrit sur cette page.

## Voir les demandes en attente

### Pour les leaders de groupe

1. Dans B1 Admin, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) et choisissez **People > Groups**
2. Cliquez sur le nom du groupe
3. Les demandes en attente pour ce groupe apparaissent en haut de l'onglet **Members**

### Pour les administrateurs

Les administrateurs avec les permissions de gestion de groupe peuvent consulter les demandes en attente dans tous les groupes :

1. Dans le menu de saut, choisissez **People > Groups**
2. Cliquez sur le bouton **pending requests** dans l'en-tête de la page (par exemple, « 3 pending requests »). Il n'apparaît que s'il y a des demandes en attente.
3. Examinez toutes les demandes en attente à l'échelle de l'église

## Examiner une demande d'adhésion

Chaque demande d'adhésion affiche :

- **Nom et photo de la personne** -- La personne qui demande à rejoindre
- **Message optionnel** -- Un message personnel expliquant pourquoi elle veut rejoindre (s'il est fourni)
- **Date de demande** -- Quand la demande a été soumise

Pour examiner une demande :

1. Lisez le message de la personne s'il y en a un
2. Cliquez sur le nom de la personne pour consulter son profil si nécessaire
3. Décidez d'approuver ou de refuser

## Approuver une demande

1. Cliquez sur **Approve** dans la demande d'adhésion
2. La personne est immédiatement ajoutée au groupe en tant que membre
3. La personne qui demande reçoit une notification que sa demande a été approuvée
4. La demande est marquée comme approuvée dans le système

:::tip
Quand vous approuvez une demande, la personne devient un membre régulier du groupe. Vous pouvez ultérieurement la promouvoir en leader de groupe si nécessaire à partir de la page [Group Members](./group-members.md).
:::

## Refuser une demande

1. Cliquez sur **Decline** dans la demande d'adhésion
2. Fournissez optionnellement une raison pour refuser (jusqu'à 500 caractères)
3. Cliquez sur **Confirm**
4. La personne qui demande reçoit une notification avec votre raison de refus (s'il y en a une)
5. La demande est marquée comme refusée

:::info
Fournir une raison de refus aide la personne à comprendre pourquoi sa demande n'a pas été approuvée et peut l'encourager à réessayer plus tard ou à explorer d'autres groupes.
:::

## Approuver à partir de la page Tâches

Chaque demande d'adhésion crée également une tâche sous **Serving → My Work**, intitulée « *Person* requested to join *Group*. » Elle est assignée aux leaders du groupe. Si le groupe n'a pas encore de leader, elle va à n'importe quel membre du personnel ayant la permission **Group Members > Edit**, ou aux administrateurs du domaine de votre église s'il y a personne avec cette permission. Le personnel et les administrateurs qui reçoivent la tâche de cette façon reçoivent également une notification qui les relie directement à elle.

Ouvrir la tâche affiche le nom de la personne qui demande, le groupe et son message optionnel, avec des boutons **Approve** et **Decline** directement sur la carte de tâche (Decline ouvre le même champ de raison optionnel décrit ci-dessus). Ceci donne aux leaders un deuxième moyen piloté par notification d'agir sur une demande sans naviguer jusqu'à l'onglet Join Requests du groupe.

Décider une demande de l'un ou l'autre endroit -- l'onglet Join Requests du groupe ou sa carte de tâches -- la ferme partout, pour que les leaders ne voient jamais une tâche obsolète pour une demande que quelqu'un a déjà traitée.

## Notifications

Le système de demande d'adhésion envoie automatiquement des notifications :

- **Quand une demande est soumise** -- Tous les leaders de groupe reçoivent une notification. Si le groupe n'a pas de leader, le personnel ou les administrateurs assignés à la tâche sont notifiés à la place (voir ci-dessus).
- **Quand une demande est approuvée** -- La personne qui demande reçoit une confirmation
- **Quand une demande est refusée** -- La personne qui demande reçoit une notification avec n'importe quelle raison de refus

Les notifications apparaissent dans le centre de notification de l'utilisateur sur B1.church et dans l'application mobile.

## Gérer les demandes du côté du membre

Les gens peuvent gérer leurs propres demandes d'adhésion depuis B1.church :

- Consulter le statut de leurs demandes en attente sur la page de détail du groupe
- Annuler une demande en attente s'ils changent d'avis
- Voir si leur demande a été approuvée ou refusée

## Meilleures pratiques

- **Répondre rapidement** -- Essayez de consulter les demandes dans les 24-48 heures pour que les gens ne restent pas en attente
- **Être clairs dans les raisons de refus** -- Aidez les gens à comprendre les prochaines étapes ou les options alternatives
- **Vérifier les profils** -- Examinez le profil de la personne pour voir s'ils conviendraient bien au groupe
- **Communiquer les attentes** -- Assurez-vous que votre description de groupe énonce clairement qui le groupe est pour

## Articles connexes

- [Creating Groups](./creating-groups.md) -- Apprenez comment configurer les groupes et les politiques d'adhésion
- [Group Members](./group-members.md) -- Gérez les membres de groupe existants
- [Group Calendar](./group-calendar.md) -- Planifiez les réunions et événements de groupe
