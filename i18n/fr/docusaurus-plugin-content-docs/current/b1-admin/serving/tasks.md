---
title: "Tâches"
---

# Tâches

<div class="article-intro">

Les tâches vous permettent d'assigner des éléments d'action aux personnes ou aux groupes de votre église. Qu'il s'agisse d'un à-faire unique ou d'une responsabilité récurrente, les tâches vous aident à suivre ce qui doit être fait et qui en est responsable afin que rien ne soit oublié.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes ou [groupes](../groups/creating-groups.md) auxquels vous souhaitez assigner des tâches existent dans B1 Admin
- Dans le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu), choisissez **Service > Mon travail** pour voir les tâches

</div>

## Affichage des tâches

Dans le menu Sauter, choisissez **Service > Mon travail** (ou recherchez « Mon travail »). La liste **Tâches** affiche le titre de chaque tâche, la personne à laquelle elle est associée, la personne à qui elle est assignée, la date d'ouverture et le statut. Vos cartes de [workflow](./workflows.md) apparaissent à côté, sous **Mes cartes**.

Utilisez les onglets au-dessus de la liste pour passer entre les tâches **Assignées à moi**, **Assignées à mes groupes** et **Demandées par moi**. Chaque onglet indique le nombre de tâches qu'il contient.

:::tip
Par défaut, seules les tâches ouvertes sont affichées. Choisissez **Fermées** au-dessus de la liste pour voir plutôt les tâches complétées.
:::

## Création d'une tâche

1. Sur la page **Mon travail**, cliquez sur **Ajouter une tâche**. Un formulaire **Nouvelle tâche** s'ouvre.
2. Cliquez sur la boîte **Associer à** et choisissez la personne concernée par la tâche.
3. Cliquez sur la boîte **Assigner à**. Dans la fenêtre **Sélectionner une personne ou un groupe**, recherchez dans l'onglet **Personne**, ou passez à l'onglet **Groupe** et recherchez un groupe, puis sélectionnez le résultat.
4. Saisissez un **titre** pour la tâche.
5. Ajoutez des **notes** avec les détails ou instructions pour la personne assignée.
6. Cliquez sur **Enregistrer**.

La tâche apparaîtra maintenant dans la liste des tâches et sera visible pour la personne assignée sur son tableau de bord et son application mobile.

## Gestion d'une tâche

Cliquez sur n'importe quelle tâche pour ouvrir sa page de détail. De là, vous pouvez :

- **Fermer ou rouvrir la tâche** -- Cliquez sur **Fermer la tâche** lorsque le travail est terminé, ou sur **Rouvrir la tâche** pour la rouvrir.
- **Réassigner la tâche** -- Cliquez sur **Assigner** pour choisir une autre personne ou un autre groupe.
- **Changer la personne concernée** -- Cliquez sur **Associer** pour choisir une autre personne.
- **Ajouter des notes** -- Publiez des mises à jour ou des détails pour la personne assignée dans les notes de la tâche.
- **Définir des rappels** -- Voir [Rappels de tâche](#task-reminders) ci-dessous.

## Rappels de tâche {#task-reminders}

Une tâche ayant une date d'échéance peut rappeler à la personne assignée qu'elle approche.

1. Sur la page de la tâche, cliquez sur **Modifier** à côté de **Rappels**.
2. Activez **Envoyer des rappels pour cette tâche**.
3. Sous **Quand les rappels doivent-ils être envoyés ?**, choisissez jusqu'à trois moments : **7 jours avant**, **3 jours avant**, **1 jour avant** ou **Le jour même**.
4. Définissez l'**heure** et, si vous le souhaitez, un **message**.
5. Sous **Envoyer par**, choisissez **Notification push**, **E-mail** et, si votre église a connecté un [fournisseur de SMS](../settings/church-settings.md#texting), **SMS**.
6. Cliquez sur **Enregistrer les rappels**.

Si la tâche n'a pas de date d'échéance, B1 vous avertit qu'aucun rappel ne sera envoyé tant qu'une date n'est pas définie. Les rappels par SMS ne parviennent qu'aux personnes ayant activé les **Messages texte** dans leurs [Préférences de notification](../../b1-church/getting-started/notification-preferences.md), et chaque SMS peut coûter à votre église.

## Cycle de vie de la tâche

1. Une nouvelle tâche commence avec un statut **Ouvert**.
2. La personne assignée reçoit une notification et peut afficher la tâche à partir de son tableau de bord, **Service > Mon travail** ou l'application mobile.
3. Une fois le travail terminé, la personne assignée (ou un administrateur) clique sur **Fermer la tâche**.
4. Les tâches fermées sont supprimées de la vue par défaut mais peuvent toujours être retrouvées en choisissant **Fermées** au-dessus de la liste des tâches.

:::info
B1 Admin ne crée plus de tâches récurrentes selon un calendrier. Pour le suivi récurrent avec les personnes, utilisez un [workflow](./workflows.md) avec un [déclencheur de calendrier](./workflows.md#schedule-triggers).
:::

:::tip
Quand vous avez besoin de déplacer de nombreuses personnes à travers le même ensemble d'étapes -- comme le suivi des nouveaux visiteurs ou un processus d'adhésion -- utilisez [Workflows](./workflows.md). Les workflows transforment les tâches en cartes sur un tableau Kanban par glisser-déposer avec des étapes, des dates d'échéance et du routage.
:::

:::info
Certaines tâches sont créées automatiquement par d'autres parties de B1 et s'ouvrent sur une carte d'examen spéciale plutôt que sur la vue note/réassigner standard -- [demandes de rejoindre le groupe](../groups/group-join-requests.md#approving-from-the-tasks-page), [demandes de changement de profil](../profile/approving-profile-changes.md) et [demandes de suppression de compte](../profile/account-deletion.md) fonctionnent tous de cette façon.
:::

## Prochaines étapes

- Déplacez les personnes à travers un processus multi-étapes avec [Workflows](./workflows.md)
- Utilisez [Workflows](./workflows.md) pour déplacer les personnes à travers les processus répétables automatiquement
- Utilisez les tâches aux côtés de [Plans de service](./plans.md) pour suivre les éléments d'action de préparation du service
