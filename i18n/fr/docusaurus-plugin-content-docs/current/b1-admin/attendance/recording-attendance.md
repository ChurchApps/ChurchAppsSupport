---
title: "Enregistrer la présence"
---

# Enregistrer la présence

<div class="article-intro">

Une fois vos campus, vos horaires de services et vos groupes configurés, vous pouvez enregistrer manuellement la présence après chaque rassemblement. B1 Admin organise la présence autour des **sessions** -- une session par groupe et par date de réunion. Vous créez la session, vous indiquez qui était présent, et les données alimentent directement vos rapports de présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés. Voir [Configuration de la présence](setup.md) si vous ne l'avez pas encore fait.
- Les groupes que vous souhaitez suivre doivent avoir **Suivre la présence** activé. Voir [Configuration de la présence](setup.md) pour plus de détails.

</div>

## Créer une session

Une session représente une occurrence d'une réunion de groupe -- par exemple, votre classe de K--3e année un dimanche précis.

1. Ouvrez **B1 Admin**, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Groupes**.
2. Sélectionnez le groupe pour lequel vous souhaitez enregistrer la présence.
3. Dans la section **Sessions** de la page du groupe, cliquez sur **Toutes les sessions**.
4. Cliquez sur **Nouveau** pour créer une nouvelle session.
5. Si le groupe est associé à un horaire de service, choisissez l'**Horaire de service**. S'il s'agit d'un groupe non planifié, ce champ n'apparaît pas.
6. Sélectionnez la **Date de la session** -- ce peut être aujourd'hui, une date passée ou une date future.
7. Cliquez sur **Enregistrer**.

### Ajouter des sessions pour chaque classe d'un horaire de service

Si d'autres groupes se réunissent au même horaire de service (par exemple, toutes les classes de vos enfants le dimanche à 9 h 00), vous pouvez créer leurs sessions en une seule étape au lieu de visiter chaque groupe.

1. Suivez les étapes ci-dessus et choisissez un **Horaire de service**.
2. Cochez **Également ajouter pour les autres _N_ groupes de _horaire de service_**. La case indique combien d'autres groupes sont associés à cet horaire de service. Elle n'apparaît que lors de l'ajout d'une nouvelle session et si au moins un autre groupe se réunit à cette heure.
3. Cliquez sur **Enregistrer**.

Une session est créée pour le groupe actuel et pour chacun des autres groupes à la même date et au même horaire de service. Les groupes qui ont déjà une session pour cette date et cet horaire de service sont ignorés, vous n'aurez donc pas de doublons.

:::tip
Vous pouvez créer des sessions pour des dates passées afin de rattraper la présence que vous n'avez pas encore enregistrée, ou les créer à l'avance pour qu'elles soient prêtes lorsque votre groupe se réunit.
:::

## Marquer la présence

Sélectionnez une session pour voir sa liste de présence. Chaque membre du groupe figure dans la liste avec une case à cocher, triée par nom de famille, et les personnes déjà enregistrées comme présentes sont cochées.

1. Cochez la case à côté de chaque personne présente. Utilisez **Tout sélectionner** ou **Tout désélectionner** pour modifier tout le monde à la fois.
2. Le compteur au-dessus de la liste (par exemple, "12 sur 15 présents") se met à jour lorsque vous cochez des cases.
3. Cliquez sur **Enregistrer la présence**. Rien n'est enregistré tant que vous n'avez pas sauvegardé, et un message confirme la fin de l'enregistrement.

Décocher une personne déjà enregistrée comme présente, puis enregistrer, la retire de la session.

### Ajouter des visiteurs

Pour enregistrer une personne qui n'est pas membre du groupe, recherchez-la dans la recherche de personnes à côté de la liste de présence. Si elle n'est pas encore dans votre base de données, vous pouvez la créer depuis la recherche. Dans les deux cas, elle est ajoutée à la liste déjà cochée. Cliquez sur **Enregistrer la présence** pour l'enregistrer.

Les personnes qui se sont enregistrées sur une borne affichent une étiquette **Bénévole** ou **Invité**. Les personnes qui ne sont pas membres du groupe affichent une étiquette **Invité**.

## Vérifier quels groupes ont encore besoin de présence

Lorsque plusieurs classes se réunissent au même horaire de service, vous pouvez voir d'un coup d'œil lesquelles ont encore besoin que leur présence soit saisie pour cette date.

1. Ouvrez une session associée à un horaire de service.
2. Cliquez sur **Qui doit encore saisir la présence** en haut de la liste de présence.
3. Une boîte de dialogue répertorie chaque groupe associé à cet horaire de service, avec un résumé tel que "5 groupes sur 8 saisis" en haut.

Les groupes sans personne marquée présente pour cette date affichent une étiquette **Non saisi** et sont listés en premier. Les groupes qui ont une présence affichent **Saisi** avec le nombre de personnes marquées présentes (par exemple, "Saisi (12)"). Cliquez sur le nom d'un groupe pour ouvrir ses sessions avec la session de la même date déjà sélectionnée, afin d'enregistrer sa présence immédiatement. Si le groupe n'a pas encore de session pour cette date, sa liste de sessions s'ouvre pour que vous puissiez en ajouter une.

:::tip
Associez cette fonction à **Imprimer toutes les classes** et [à l'ajout de sessions pour chaque classe d'un horaire de service](#adding-sessions-for-every-class-in-a-service-time) : créez les sessions, distribuez les feuilles d'appel, puis utilisez **Qui doit encore saisir la présence** pour voir quelles feuilles n'ont pas encore été saisies.
:::

## Imprimer une feuille d'appel

Une feuille d'appel est une liste de classe imprimable que les enseignants peuvent marquer à la main et vous rendre pour la saisir plus tard. Chaque feuille affiche le logo de votre église (le **Logo pour fond clair** de [Site Web > Apparence](../website/appearance.md), si vous en avez téléchargé un), avec le nom de l'église dessous, la classe, une grande ligne **Date** sous le nom de la classe, et l'horaire de service. Les membres sont listés en deux colonnes (on lit de haut en bas la colonne de gauche, puis celle de droite) afin que davantage de noms tiennent sur une page, et chaque membre dispose de cases **Présent** et **Absent**. Des lignes vides sont prévues pour les visiteurs ainsi qu'une zone **Enseignant / Notes**.

- **Depuis une session** -- Cliquez sur l'icône **Imprimer la feuille d'appel** (imprimante) en haut de la liste de présence de la session. La feuille est datée de la date de la session.
- **Toutes les classes d'un service** -- Si la session a un horaire de service, cliquez sur **Imprimer toutes les classes** pour imprimer une feuille par classe associée à cet horaire de service. Chaque classe s'imprime sur sa propre page.
- **Depuis la liste des membres** -- Sur la page du groupe, cliquez sur **Tous les membres**, puis cliquez sur l'icône **Imprimer la feuille d'appel** au-dessus de la liste des membres et choisissez **Feuille de présence** pour imprimer une feuille non datée. Le même menu propose une mise en page **Liste de contacts** avec le téléphone, l'e-mail et l'adresse de chaque membre -- voir [Imprimer la liste des membres](../groups/group-members.md#printing-the-member-list).

La feuille s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

## Exporter la présence vers un tableur

Vous pouvez télécharger un enregistrement de la session au format CSV pour l'utiliser dans Excel, Numbers ou Google Sheets.

1. Ouvrez la session que vous souhaitez exporter.
2. Cliquez sur le bouton **Exporter** en haut de la liste de présence.
3. Ouvrez le fichier téléchargé dans votre application de tableur.

## Consulter la présence enregistrée

Une fois les sessions enregistrées, les données apparaissent dans vos rapports de présence.

- **Onglet Tendance de la présence** (sous **Toutes les années** sur la page Présence) -- affiche les tendances à l'échelle de l'église au fil du temps. Voir [Suivre la présence](tracking-attendance.md).
- **Onglet Présence par groupe** -- affiche la présence ventilée par groupe. Voir [Rapports de présence](../reports/attendance-reports.md#group-attendance).

:::tip
Si une session que vous venez de créer n'apparaît pas tout de suite dans les rapports, vérifiez que la date de la session se situe dans la plage de dates sélectionnée dans les filtres du rapport.
:::
