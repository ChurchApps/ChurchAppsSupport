---
title: "Demandes d'adhésion aux groupes"
description: "Examinez, approuvez ou refusez les demandes d'adhésion aux groupes dans B1 Admin, trouvez les demandes en attente en tant que responsable ou administrateur, et ajoutez un motif en cas de refus."
---

# Demandes d'adhésion aux groupes

<div class="article-intro">

Lorsqu'un groupe est configuré avec une politique d'adhésion fondée sur l'approbation, les personnes peuvent soumettre des demandes pour le rejoindre. Les responsables de groupe et les administrateurs examinent ces demandes et les approuvent ou les refusent. Cela permet à votre église de contrôler l'appartenance aux groupes tout en facilitant la démarche des personnes qui souhaitent y participer.

</div>

## Vidéo de formation {#training-video}

<YouTube id="1vj-suCiIsE" title="Demandes d'adhésion aux groupes et calendriers de groupe dans B1" next="Configurer les services et les présences dans B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation de gérer les groupes, ou être responsable du groupe concerné. Voir [Rôles et autorisations](../people/roles-permissions.md) pour plus de détails.
- Le groupe doit avoir sa politique d'adhésion réglée sur **Demande** (approbation requise). Voir [Créer des groupes](./creating-groups.md) pour savoir comment configurer les politiques d'adhésion.

</div>

## Comprendre les politiques d'adhésion {#understanding-join-policies}

Les groupes peuvent avoir trois politiques d'adhésion différentes :

- **Ouvert** -- Toute personne peut rejoindre immédiatement, sans approbation
- **Demande** -- Les personnes soumettent une demande d'adhésion qui nécessite une approbation
- **Fermé** -- Personne ne peut demander à rejoindre le groupe (les membres doivent être ajoutés manuellement)

Lorsqu'un groupe utilise la politique **Demande**, toutes les tentatives d'adhésion passent par le processus d'approbation décrit sur cette page.

## Consulter les demandes en attente {#viewing-pending-requests}

### Pour les responsables de groupe {#for-group-leaders}

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) et choisissez **Personnes > Groupes**
2. Cliquez sur le nom du groupe
3. La section **Membres** indique combien de demandes sont en attente (par exemple « 1 en attente »). Cliquez sur **Tous les membres** -- les demandes en attente pour ce groupe apparaissent sous **Demandes en attente**, en haut de la liste des membres

### Pour les administrateurs {#for-administrators}

Les administrateurs qui disposent des autorisations de gestion des groupes peuvent consulter les demandes en attente de tous les groupes :

1. Dans le menu Jump, choisissez **Personnes > Groupes**
2. Cliquez sur le bouton **demandes en attente** dans l'en-tête de la page (par exemple « 3 demandes en attente »). Il n'apparaît que lorsque des demandes attendent une réponse.
3. La page **Demandes d'adhésion en attente** liste toutes les demandes en attente de l'ensemble de l'église, avec le groupe que chaque personne souhaite rejoindre à côté de son nom. Cliquez sur **Groupes** en haut de la page pour revenir en arrière. Lorsque rien n'attend de réponse, la page affiche **Aucune demande en attente.**

## Examiner une demande d'adhésion {#reviewing-a-join-request}

Chaque demande d'adhésion affiche :

- **Nom et photo de la personne** -- La personne qui demande à rejoindre (et, sur la page de l'ensemble de l'église, le groupe)
- **Message facultatif** -- Un message personnel expliquant pourquoi la personne souhaite rejoindre le groupe (s'il a été fourni)
- **Date de la demande** -- Le moment où la demande a été soumise

Pour examiner une demande :

1. Lisez le message de la personne si elle en a fourni un
2. Cliquez sur le nom de la personne pour ouvrir son profil, si nécessaire
3. Décidez d'approuver ou de refuser

## Approuver une demande {#approving-a-request}

1. Cliquez sur **Approuver** pour la demande d'adhésion
2. La personne est immédiatement ajoutée au groupe comme membre, et la demande disparaît de la liste
3. Le demandeur reçoit une notification confirmant que sa demande a été approuvée
4. La demande est marquée comme approuvée dans le système

:::tip
Lorsque vous approuvez une demande, la personne devient un membre ordinaire du groupe. Vous pourrez ensuite la promouvoir responsable de groupe si nécessaire depuis la page [Membres du groupe](./group-members.md).
:::

## Refuser une demande {#declining-a-request}

1. Cliquez sur **Refuser** pour la demande d'adhésion
2. Dans la boîte de dialogue **Refuser la demande**, saisissez facultativement un **Motif (facultatif)** (jusqu'à 500 caractères)
3. Cliquez sur **Refuser**
4. Le demandeur reçoit une notification contenant votre motif de refus (s'il en a fourni un)
5. La demande est marquée comme refusée

:::info
Indiquer un motif de refus aide la personne à comprendre pourquoi sa demande n'a pas été approuvée, et peut l'encourager à réessayer plus tard ou à explorer d'autres groupes.
:::

## Approuver depuis la page des tâches {#approving-from-the-tasks-page}

Chaque demande d'adhésion crée aussi une tâche sous **Service &rarr; Mon travail**, intitulée « *Personne* a demandé à rejoindre *Groupe* ». Elle est assignée aux responsables du groupe. Si le groupe n'a pas encore de responsable, elle est transmise à tout membre du personnel disposant de l'autorisation **Membres du groupe &gt; Modifier**, ou aux administrateurs de domaine de votre église si personne ne dispose de cette autorisation. Le personnel et les administrateurs qui reçoivent la tâche de cette façon reçoivent aussi une notification qui mène directement à celle-ci.

L'ouverture de la tâche affiche le nom du demandeur, le groupe et son message facultatif, avec les boutons **Approuver** et **Refuser** directement sur la carte de la tâche (Refuser ouvre le même champ de motif facultatif décrit plus haut). Cela offre aux responsables un second moyen, fondé sur les notifications, de traiter une demande sans ouvrir la liste des membres du groupe.

Traiter une demande depuis l'un ou l'autre de ces endroits -- la liste des membres du groupe ou la carte des tâches -- la clôt partout, de sorte que les responsables ne voient jamais une tâche périmée pour une demande déjà traitée.

## Notifications {#notifications}

Le système de demandes d'adhésion envoie automatiquement des notifications :

- **Lorsqu'une demande est soumise** -- Tous les responsables du groupe reçoivent une notification. Si le groupe n'a pas de responsable, le personnel ou les administrateurs à qui la tâche est assignée sont notifiés à la place (voir ci-dessus).
- **Lorsqu'une demande est approuvée** -- Le demandeur reçoit une confirmation
- **Lorsqu'une demande est refusée** -- Le demandeur reçoit une notification avec le motif du refus, le cas échéant

Les notifications apparaissent dans le centre de notifications de l'utilisateur sur B1.church et dans l'application mobile. Dans la cloche de notifications de B1 Admin, cliquer sur une notification de demande d'adhésion (ou sur son **Voir les détails**) ouvre le groupe sur le site B1.church de votre église dans un nouvel onglet.

## Gérer les demandes depuis le côté des membres {#managing-requests-from-the-member-side}

Les personnes peuvent gérer leurs propres demandes d'adhésion depuis B1.church :

- Consulter l'état de leurs demandes en attente sur la page de détail du groupe
- Annuler une demande en attente si elles changent d'avis
- Voir si leur demande a été approuvée ou refusée

## Bonnes pratiques {#best-practices}

- **Répondez rapidement** -- Essayez d'examiner les demandes dans un délai de 24 à 48 heures afin que les personnes n'attendent pas trop longtemps
- **Soyez clair dans vos motifs de refus** -- Aidez les personnes à comprendre les prochaines étapes ou les autres options
- **Consultez les profils** -- Examinez le profil de la personne pour voir si elle convient bien au groupe
- **Communiquez les attentes** -- Assurez-vous que la description de votre groupe indique clairement à qui il s'adresse

## Articles connexes {#related-articles}

- [Créer des groupes](./creating-groups.md) -- Apprenez à configurer les groupes et leurs politiques d'adhésion
- [Membres du groupe](./group-members.md) -- Gérer les membres existants du groupe
- [Calendrier du groupe](./group-calendar.md) -- Planifier les réunions et événements du groupe
