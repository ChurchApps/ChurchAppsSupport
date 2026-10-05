---
title: "Enregistrement de la Présence"
---

# Enregistrement de la Présence

<div class="article-intro">

Une fois que vos campus, heures de service et groupes sont configurés, vous pouvez enregistrer manuellement la présence après chaque rassemblement. B1 Admin organise la présence autour de **sessions** -- une session par groupe par date de réunion. Vous créez la session, marquez qui a assisté, et les données sont directement alimentées dans vos rapports de présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, heures de service et groupes doivent être configurés. Voir [Configuration de la Présence](setup.md) si vous ne l'avez pas encore fait.
- Les groupes que vous souhaitez suivre doivent avoir **Suivi de la Présence** activé. Voir [Configuration de la Présence](setup.md) pour les détails.

</div>

## Créer une session

Une session représente une occurrence d'une réunion de groupe -- par exemple, votre classe des maternelle à 3e année un dimanche spécifique.

1. Ouvrez **B1 Admin**, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Groupes**.
2. Sélectionnez le groupe pour lequel vous souhaitez enregistrer la présence.
3. Cliquez sur l'onglet **Sessions**.
4. Cliquez sur **Nouveau** pour créer une nouvelle session.
5. Si le groupe est assigné à une heure de service, choisissez l'**Heure de service**. Si c'est un groupe non planifié, ce champ n'apparaîtra pas.
6. Sélectionnez la **Date de la session** -- cela peut être aujourd'hui, une date passée ou une date future.
7. Cliquez sur **Enregistrer**.

### Ajouter des sessions pour chaque classe dans une heure de service

Si d'autres groupes se réunissent à la même heure de service (par exemple, tous vos cours pour enfants le dimanche à 9h00), vous pouvez créer leurs sessions en une seule étape au lieu de visiter chaque groupe.

1. Suivez les étapes ci-dessus et choisissez une **Heure de service**.
2. Cochez **Ajouter également pour les autres _N_ groupes dans _heure de service_**. La case à cocher affiche le nombre d'autres groupes assignés à cette heure de service. Elle n'apparaît que lors de l'ajout d'une nouvelle session et au moins un autre groupe se réunit à cette heure.
3. Cliquez sur **Enregistrer**.

Une session est créée pour le groupe actuel et pour chacun des autres groupes à la même date et heure de service. Les groupes qui ont déjà une session pour cette date et heure de service sont ignorés, vous n'obtiendrez donc pas de doublons.

:::tip
Vous pouvez créer des sessions pour des dates passées pour rattraper la présence que vous n'avez pas encore enregistrée, ou les créer à l'avance pour qu'elles soient prêtes quand votre groupe se réunit.
:::

## Marquer la présence (enregistrer la présence)

Sélectionnez une session pour voir sa liste de présence. Chaque membre du groupe est listé avec une case à cocher, trié par nom de famille, et toute personne déjà enregistrée comme présente est cochée.

1. Cochez la case à côté de chaque personne qui a assisté. Utilisez **Sélectionner tout** ou **Sélectionner aucun** pour changer tout le monde à la fois.
2. Le comptage au-dessus de la liste (par exemple, "12 de 15 présents") se met à jour au fur et à mesure que vous cochez les cases.
3. Cliquez sur **Enregistrer la Présence**. Rien n'est enregistré jusqu'à ce que vous enregistriez, et un message confirme lorsque l'enregistrement est effectué.

Décocher quelqu'un qui a été déjà enregistré comme présent et ensuite enregistrer le supprime de la session.

### Ajouter des visiteurs

Pour enregistrer quelqu'un qui n'est pas membre du groupe, recherchez-le dans la barre de recherche de personnes à côté de la liste de présence. S'il n'est pas encore dans votre base de données, vous pouvez le créer à partir de la recherche. Il est ajouté à la liste déjà coché. Cliquez sur **Enregistrer la Présence** pour l'enregistrer.

Les personnes qui se sont enregistrées à un kiosque affichent une puce **Bénévole** ou **Invité**. Les personnes qui ne sont pas des membres du groupe affichent une puce **Invité**.

## Vérifier quels groupes ont encore besoin de présence

Lorsque plusieurs classes se réunissent à la même heure de service, vous pouvez voir d'un coup d'œil lesquels ont encore besoin que leur présence soit entrée pour cette date.

1. Ouvrez une session qui a une heure de service.
2. Cliquez sur **Qui a encore besoin de Présence** en haut de la liste de présence.
3. Une boîte de dialogue répertorie chaque groupe assigné à cette heure de service, avec un résumé tel que "5 de 8 groupes entrés" en haut.

Les groupes sans personne marquée comme présente pour cette date affichent une puce **Non entré** et sont listés en premier. Les groupes qui ont une présence affichent **Entré** avec le nombre de personnes marquées présentes (par exemple, "Entré (12)"). Cliquez sur le nom d'un groupe pour accéder à ce groupe et enregistrer sa présence.

:::tip
Associez ceci avec **Imprimer Toutes les Classes** et [ajouter des sessions pour chaque classe dans une heure de service](#ajouter-des-sessions-pour-chaque-classe-dans-une-heure-de-service) : créez les sessions, distribuez les feuilles d'appel, puis utilisez **Qui a encore besoin de Présence** pour voir quelles feuilles n'ont pas encore été entrées.
:::

## Impression d'une feuille d'appel

Une feuille d'appel est une liste de classe imprimable que les enseignants peuvent marquer à la main et vous rendre pour l'entrer plus tard. Chaque feuille affiche le nom de l'église, la classe, l'heure du service et une ligne de date. Chaque membre a des cases **Présent** et **Absent**, et il y a des lignes vierges pour les visiteurs et une zone **Enseignant / Notes**.

- **À partir d'une session** -- Cliquez sur l'icône **Imprimer la Feuille d'Appel** (imprimante) en haut de la liste de présence de la session. La feuille est datée avec la date de la session.
- **Toutes les classes pour un service** -- Si la session a une heure de service, cliquez sur **Imprimer Toutes les Classes** pour imprimer une feuille par classe assignée à cette heure de service. Chaque classe s'imprime sur sa propre page.
- **À partir de l'onglet Membres** -- Cliquez sur l'icône **Imprimer la Feuille d'Appel** au-dessus de la liste des membres du groupe pour imprimer une feuille sans date.

La feuille s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

## Exportation de la Présence vers un Tableur

Vous pouvez télécharger un enregistrement de la session sous la forme d'un fichier CSV à utiliser dans Excel, Numbers ou Google Sheets.

1. Ouvrez la session que vous souhaitez exporter.
2. Cliquez sur le bouton **Exporter** en haut de la liste de présence.
3. Ouvrez le fichier téléchargé dans votre application de tableur.

## Affichage de la Présence Enregistrée

Après avoir enregistré les sessions, les données apparaissent dans vos rapports de présence.

- **Onglet Tendance de Présence** -- affiche les tendances à l'échelle de l'église au fil du temps. Voir [Suivi de la Présence](tracking-attendance.md).
- **Onglet Présence du Groupe** -- affiche la présence ventilée par groupe individuel. Voir [Rapports de Présence](../reports/attendance-reports.md#group-attendance).

:::tip
Si une session que vous venez de créer n'apparaît pas immédiatement dans les rapports, assurez-vous que la date de la session se situe dans la plage de dates sélectionnée dans les filtres des rapports.
:::
