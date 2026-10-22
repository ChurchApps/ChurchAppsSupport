---
title: "Enregistrer la présence"
---

# Enregistrer la présence {#recording-attendance}

<div class="article-intro">

Une fois vos campus, horaires de services et groupes configurés, vous pouvez enregistrer manuellement la présence après chaque rencontre. B1 Admin organise la présence autour de **séances** -- une séance par groupe et par date de rencontre. Vous créez la séance, indiquez qui était présent, et les données alimentent directement vos rapports de présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés. Consultez [Configuration de la présence](setup.md) si ce n'est pas encore fait.
- Les groupes que vous souhaitez suivre doivent avoir l'option **Suivre la présence** activée. Consultez [Configuration de la présence](setup.md) pour plus de détails.
- Vous devez avoir la permission **Modifier la présence** pour enregistrer la présence. Les bénévoles qui n'ont que la permission **Voir uniquement les noms des personnes** peuvent tout de même prendre la présence de cette façon : ils ouvrent les classes depuis **Groupes** et voient les membres par nom seulement. Consultez [Noms des personnes seulement](../settings/roles-permissions.md#people-names-only).

</div>

## Créer une séance {#creating-a-session}

Une séance représente une occurrence de la rencontre d'un groupe -- par exemple, votre classe de la 2e à la 3e année un dimanche précis.

1. Ouvrez **B1 Admin**, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, puis cliquez sur **Groupes**.
2. Sélectionnez le groupe pour lequel vous voulez enregistrer la présence.
3. Dans la section **Séances** de la page du groupe, cliquez sur **Toutes les séances**.
4. Cliquez sur **Nouveau** pour créer une nouvelle séance.
5. Si le groupe est associé à un horaire de service, choisissez le **Horaire de service**. S'il s'agit d'un groupe non planifié, ce champ n'apparaît pas.
6. Sélectionnez la **Date de la séance** -- il peut s'agir d'aujourd'hui, d'une date passée ou d'une date future.
7. Cliquez sur **Enregistrer**.

### Ajouter des séances pour chaque classe d'un horaire de service {#adding-sessions-for-every-class-in-a-service-time}

Si d'autres groupes se réunissent au même horaire de service (par exemple, toutes vos classes pour enfants le dimanche à 9 h), vous pouvez créer leurs séances en une seule étape, sans visiter chaque groupe.

1. Suivez les étapes ci-dessus et choisissez un **Horaire de service**.
2. Cochez **Ajouter aussi pour les _N_ autres groupes de _horaire de service_**. La case indique le nombre d'autres groupes associés à cet horaire de service. Elle n'apparaît que lors de l'ajout d'une nouvelle séance et si au moins un autre groupe se réunit à ce moment.
3. Cliquez sur **Enregistrer**.

Une séance est créée pour le groupe actuel et pour chacun des autres groupes à la même date et au même horaire de service. Les groupes qui ont déjà une séance pour cette date et cet horaire sont ignorés, donc vous n'aurez pas de doublons.

:::tip
Vous pouvez créer des séances pour des dates passées afin de rattraper la présence que vous n'avez pas encore enregistrée, ou les créer à l'avance pour qu'elles soient prêtes lorsque votre groupe se réunira.
:::

## Notes de séance {#session-notes}

Chaque séance peut comporter des notes -- un résumé de ce qui a été vu, des annonces ou des demandes de prière.

1. Lorsque vous ajoutez une séance, ou après avoir cliqué sur l'icône **Modifier** (crayon) à côté d'une séance dans la liste, saisissez du texte dans la zone **Notes (ce qui a été vu, annonces, demandes de prière)** située sous la date. La barre d'outils permet d'ajouter du texte en gras, des listes et des liens.
2. Cliquez sur **Enregistrer**.

Les notes apparaissent en haut de la liste de présence de la séance. Ce sont aussi les notes de rencontre que les membres du groupe lisent dans la section **Rencontres** de la page du groupe sur B1.church, où les responsables de groupe peuvent aussi les rédiger et les modifier. Consultez [Détails du groupe](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marquer la présence {#marking-attendance}

Sélectionnez une séance pour voir sa liste de présence. Chaque membre du groupe figure dans la liste avec une case à cocher, triée par nom de famille, et les personnes déjà enregistrées comme présentes sont cochées.

1. Cochez la case de chaque personne présente. Utilisez **Tout sélectionner** ou **Tout désélectionner** pour modifier tout le monde à la fois.
2. Le compteur au-dessus de la liste (par exemple, « 12 présents sur 15 ») se met à jour à mesure que vous cochez les cases.
3. Cliquez sur **Enregistrer la présence**. Rien n'est enregistré avant la sauvegarde, et un message confirme lorsque l'enregistrement est terminé.

Décocher une personne déjà enregistrée comme présente, puis enregistrer, la retire de la séance.

### Ajouter des visiteurs {#adding-visitors}

Pour enregistrer quelqu'un qui n'est pas membre du groupe, recherchez-le dans la recherche de personnes à côté de la liste de présence. S'il n'est pas encore dans votre base de données, vous pouvez le créer depuis la recherche. Dans les deux cas, il est ajouté à la liste déjà coché. Cliquez sur **Enregistrer la présence** pour l'enregistrer.

Les personnes qui se sont enregistrées à une borne affichent une étiquette **Bénévole** ou **Visiteur**. Les personnes qui ne sont pas membres du groupe affichent une étiquette **Visiteur**.

## Vérifier quels groupes ont encore besoin de la présence {#checking-which-groups-still-need-attendance}

Lorsque plusieurs classes se réunissent au même horaire de service, vous pouvez voir d'un coup d'œil lesquelles doivent encore avoir leur présence saisie pour cette date.

1. Ouvrez une séance associée à un horaire de service.
2. Cliquez sur **Qui doit encore être saisi ?** en haut de la liste de présence.
3. Une boîte de dialogue affiche chaque groupe associé à cet horaire de service, avec un résumé comme « 5 groupes sur 8 saisis » en haut.

Les groupes sans aucune personne marquée présente pour cette date affichent une étiquette **Non saisi** et apparaissent en premier. Les groupes qui ont de la présence affichent **Saisi** avec le nombre de personnes marquées présentes (par exemple, « Saisi (12) »). Cliquez sur le nom d'un groupe pour ouvrir ses séances, avec la séance de la même date déjà sélectionnée, afin d'enregistrer sa présence immédiatement. Si le groupe n'a pas encore de séance pour cette date, sa liste de séances s'ouvre pour que vous puissiez en ajouter une.

:::tip
Combinez cette fonction avec **Imprimer toutes les classes** et [l'ajout de séances pour chaque classe d'un horaire de service](#adding-sessions-for-every-class-in-a-service-time) : créez les séances, distribuez les feuilles d'appel, puis utilisez **Qui doit encore être saisi ?** pour voir lesquelles n'ont pas encore été saisies.
:::

## Imprimer une feuille d'appel {#printing-a-roll-sheet}

Une feuille d'appel est une liste de classe imprimable que les enseignants peuvent cocher à la main et vous remettre pour la saisir plus tard. Chaque feuille affiche le logo de votre église (le **logo sur fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un), avec le nom de l'église en dessous, la classe, une grande ligne **Date** sous le nom de la classe, et l'horaire de service. Les membres sont listés en deux colonnes (on lit de haut en bas la colonne de gauche, puis celle de droite) afin que davantage de noms tiennent sur une page, et chaque membre a des cases **Présent** et **Absent**. Des lignes vierges sont prévues pour les visiteurs, ainsi qu'une zone **Enseignant / Notes**.

- **Depuis une séance** -- Cliquez sur l'icône **Imprimer la feuille d'appel** (imprimante) en haut de la liste de présence de la séance. La feuille porte la date de la séance.
- **Toutes les classes d'une rencontre** -- Si la séance est associée à un horaire de service, cliquez sur **Imprimer toutes les classes** pour imprimer une feuille par classe associée à cet horaire. Chaque classe s'imprime sur sa propre page.
- **Depuis la liste des membres** -- Sur la page du groupe, cliquez sur **Tous les membres**, puis sur l'icône **Imprimer la feuille d'appel** au-dessus de la liste des membres et choisissez **Feuille de présence** pour imprimer une feuille sans date. Le même menu propose une présentation **Liste de contacts** avec le téléphone, le courriel et l'adresse de chaque membre -- voir [Imprimer la liste des membres](../groups/group-members.md#printing-the-member-list).

La feuille s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

## Exporter la présence vers un tableur {#exporting-attendance-to-a-spreadsheet}

Vous pouvez télécharger un registre de la séance au format CSV pour l'utiliser dans Excel, Numbers ou Google Sheets.

1. Ouvrez la séance que vous voulez exporter.
2. Cliquez sur le bouton **Exporter** en haut de la liste de présence.
3. Ouvrez le fichier téléchargé dans votre application de tableur.

## Consulter la présence enregistrée {#viewing-recorded-attendance}

Après avoir enregistré des séances, les données apparaissent dans vos rapports de présence.

- **Onglet Tendance de la présence** (sous **Toutes les années** sur la page Présence) -- affiche les tendances de l'ensemble de l'église au fil du temps. Consultez [Suivi de la présence](tracking-attendance.md).
- **Onglet Présence par groupe** -- affiche la présence ventilée par groupe. Consultez [Rapports de présence](../reports/attendance-reports.md#group-attendance).

:::tip
Si une séance que vous venez de créer n'apparaît pas tout de suite dans les rapports, assurez-vous que sa date se situe dans la plage de dates sélectionnée dans les filtres du rapport.
:::
