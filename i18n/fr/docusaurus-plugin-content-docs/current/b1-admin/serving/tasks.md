---
title: "Tâches"
description: "Créez, assignez et clôturez des tâches dans B1 Admin, retrouvez-les sous Service > Mon travail et définissez des rappels pour ne rien oublier."
---

# Tâches

<div class="article-intro">

Les tâches vous permettent d'assigner des actions à des personnes ou à des groupes de votre église. Qu'il s'agisse d'une chose à faire ponctuelle ou d'une responsabilité récurrente, les tâches vous aident à suivre ce qui doit être fait et qui en est responsable, afin que rien ne soit oublié.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes ou les [groupes](../groups/creating-groups.md) auxquels vous voulez assigner des tâches existent dans B1 Admin
- Dans le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu), choisissez **Service > Mon travail** pour voir les tâches

</div>

## Consulter les tâches

Dans le menu de navigation rapide, choisissez **Service > Mon travail** (ou recherchez « Mon travail »). La liste **Tâches** affiche le titre de chaque tâche, la personne ou le groupe concerné, la personne à qui elle est assignée, la date d'ouverture et son statut. Vos [cartes de flux de travail](./workflows.md) apparaissent à côté, sous **Mes cartes**.

Utilisez les onglets au-dessus de la liste pour passer entre les tâches **Assignées à moi**, **Assignées à mes groupes** et **Demandées par moi**. Chaque onglet indique combien de tâches il contient.

:::tip
Par défaut, seules les tâches ouvertes sont affichées. Choisissez **Fermées** au-dessus de la liste pour voir plutôt les tâches terminées.
:::

## Créer une tâche

1. Sur la page **Mon travail**, cliquez sur **Ajouter une tâche**. Un formulaire **Nouvelle tâche** s'ouvre.
2. Cliquez sur la case **Concerne** et choisissez la personne concernée par la tâche.
3. Cliquez sur la case **Assigner à**. Dans la fenêtre **Sélectionner une personne ou un groupe**, recherchez sous l'onglet **Personne**, ou passez à l'onglet **Groupe** et recherchez un groupe, puis sélectionnez le résultat.
4. Saisissez un **titre** pour la tâche.
5. Choisissez facultativement une **date d'échéance**.
6. Ajoutez des **notes** avec les détails ou les instructions pour la personne assignée.
7. Cliquez sur **Enregistrer**.

La tâche apparaîtra désormais dans la liste des tâches et sera visible par la personne assignée sur son tableau de bord et dans l'application mobile.

## Gérer une tâche

Cliquez sur une tâche pour ouvrir sa page de détail. Depuis cette page, vous pouvez :

- **Fermer ou rouvrir la tâche** -- Cliquez sur **Fermer la tâche** lorsque le travail est terminé, ou sur **Rouvrir la tâche** pour la rouvrir.
- **Réassigner la tâche** -- Cliquez sur **Assigner** pour choisir une autre personne ou un autre groupe.
- **Changer la personne concernée** -- Cliquez sur **Concerne** pour choisir une autre personne.
- **Modifier la date d'échéance** -- Choisissez une date dans le champ **Échéance** ; elle s'enregistre lorsque vous cliquez ailleurs. (Les tâches créées pour une [confirmation d'affectation de service](./workflows.md#serving-assignment-confirmations) affichent leur date d'échéance, mais elle ne peut pas être modifiée ici.)
- **Ajouter des notes** -- Publiez des mises à jour ou des détails pour la personne assignée dans les notes de la tâche.
- **Définir des rappels** -- Voir [Rappels de tâche](#task-reminders) ci-dessous.

## Rappels de tâche {#task-reminders}

Une tâche qui a une date d'échéance peut rappeler à la personne assignée qu'elle arrive à échéance.

1. Sur la page de la tâche, cliquez sur **Modifier** à côté de **Rappels**.
2. Activez **Envoyer des rappels pour cette tâche**.
3. Sous **Quand les rappels doivent-ils partir ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** ou **Le jour même**.
4. Réglez l'**heure de la journée** et, facultativement, un **message**.
5. Sous **Envoyer par**, choisissez **Notification push**, **Courriel** et, si votre église a un [fournisseur de messages texte](../settings/church-settings.md#texting) connecté, **Texto**.
6. Cliquez sur **Enregistrer les rappels**.

Si la tâche n'a pas de date d'échéance, B1 vous avertit qu'aucun rappel ne sera envoyé tant qu'aucune date n'est définie dans le champ **Échéance**. Les rappels par texto n'atteignent que les personnes qui ont activé les **messages texte** dans leurs [préférences de notification](../../b1-church/getting-started/notification-preferences.md), et chaque texto peut coûter à votre église.

## Cycle de vie d'une tâche

1. Une nouvelle tâche commence avec le statut **Ouverte**.
2. La personne assignée reçoit une notification et peut consulter la tâche depuis son tableau de bord, **Service > Mon travail**, ou l'application mobile.
3. Une fois le travail terminé, la personne assignée (ou un administrateur) clique sur **Fermer la tâche**.
4. Les tâches fermées sont retirées de la vue par défaut, mais peuvent toujours être retrouvées en choisissant **Fermées** au-dessus de la liste des tâches.

:::info
B1 Admin ne crée plus de tâches récurrentes selon un calendrier. Pour un suivi répété auprès de personnes, utilisez un [flux de travail](./workflows.md) avec un [déclencheur de calendrier](./workflows.md#schedule-triggers).
:::

:::tip
Lorsque vous devez faire passer de nombreuses personnes par les mêmes étapes -- comme le suivi des nouveaux visiteurs ou un processus d'adhésion -- utilisez les [Flux de travail](./workflows.md). Les flux de travail transforment les tâches en cartes sur un tableau glisser-déposer, avec des étapes, des échéances et un acheminement.
:::

:::info
Certaines tâches sont créées automatiquement par d'autres parties de B1 et s'ouvrent sur une carte d'examen spéciale plutôt que sur la vue standard de notes et de réassignation -- les [demandes d'adhésion aux groupes](../groups/group-join-requests.md#approving-from-the-tasks-page), les [demandes de modification de profil](../profile/approving-profile-changes.md) et les [demandes de suppression de compte](../profile/account-deletion.md) fonctionnent toutes de cette façon.
:::

## Et ensuite

- Faites passer les personnes par un processus en plusieurs étapes avec les [Flux de travail](./workflows.md)
- Utilisez les [Flux de travail](./workflows.md) pour faire progresser automatiquement les personnes à travers des processus répétables
- Utilisez les tâches avec les [Plans de service](./plans.md) pour suivre les actions de préparation du service
