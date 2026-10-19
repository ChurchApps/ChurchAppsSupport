---
title: "Enregistrer la présence"
---

# Enregistrer la présence

<div class="article-intro">

Une fois vos campus, heures de service et groupes configurés, vous pouvez saisir manuellement la présence après chaque rassemblement. B1 Admin organise la présence autour des **séances** : une séance par groupe et par date de réunion. Vous créez la séance, indiquez qui est venu, et les données alimentent directement vos rapports de présence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, heures de service et groupes doivent être configurés. Consultez [Configuration de la présence](setup.md) si vous ne l'avez pas encore fait.
- Les groupes que vous souhaitez suivre doivent avoir l'option **Suivre la présence** activée. Consultez [Configuration de la présence](setup.md) pour plus de détails.

</div>

## Créer une séance

Une séance représente une occurrence de réunion d'un groupe — par exemple, votre classe de maternelle à 3e année un dimanche précis.

1. Ouvrez **B1 Admin**, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, puis cliquez sur **Groupes**.
2. Sélectionnez le groupe pour lequel vous voulez saisir la présence.
3. Dans la section **Séances** de la page du groupe, cliquez sur **Toutes les séances**.
4. Cliquez sur **Nouveau** pour créer une nouvelle séance.
5. Si le groupe est affecté à une heure de service, choisissez l'**Heure de service**. S'il s'agit d'un groupe non planifié, ce champ n'apparaît pas.
6. Sélectionnez la **Date de la séance** — il peut s'agir d'aujourd'hui, d'une date passée ou d'une date future.
7. Cliquez sur **Enregistrer**.

### Ajouter des séances pour toutes les classes d'une heure de service {#adding-sessions-for-every-class-in-a-service-time}

Si d'autres groupes se réunissent à la même heure de service (par exemple, toutes les classes des enfants le dimanche à 9 h 00), vous pouvez créer leurs séances en une seule étape au lieu de visiter chaque groupe.

1. Suivez les étapes ci-dessus et choisissez une **Heure de service**.
2. Cochez **Également ajouter pour les _N_ autres groupes du _créneau de service_**. La case indique combien d'autres groupes sont affectés à cette heure de service. Elle n'apparaît que lors de l'ajout d'une nouvelle séance et si au moins un autre groupe se réunit à ce moment.
3. Cliquez sur **Enregistrer**.

Une séance est créée pour le groupe actuel et pour chacun des autres groupes à la même date et à la même heure de service. Les groupes qui ont déjà une séance à cette date et à cette heure sont ignorés, vous n'aurez donc pas de doublons.

:::tip
Vous pouvez créer des séances pour des dates passées afin de rattraper une présence que vous n'avez pas encore saisie, ou les créer à l'avance pour qu'elles soient prêtes lorsque votre groupe se réunira.
:::

## Notes de séance {#session-notes}

Chaque séance peut comporter des notes — un résumé de ce qui a été abordé, des annonces ou des demandes de prière.

1. Lors de l'ajout d'une séance, ou après avoir cliqué sur l'icône **Modifier** (crayon) à côté d'une séance dans la liste, saisissez votre texte dans la zone **Notes (ce qui a été abordé, annonces, demandes de prière)** sous la date. La barre d'outils permet d'ajouter du texte en gras, des listes et des liens.
2. Cliquez sur **Enregistrer**.

Les notes apparaissent en haut de la liste de présence de la séance. Ce sont aussi les notes de réunion que les membres du groupe lisent dans la section **Réunions** de la page du groupe sur B1.church, où les responsables de groupe peuvent également les rédiger et les modifier. Consultez [Détails du groupe](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Saisir la présence

Sélectionnez une séance pour afficher sa liste de présence. Chaque membre du groupe figure avec une case à cocher, trié par nom de famille, et toute personne déjà enregistrée comme présente est cochée.

1. Cochez la case de chaque personne présente. Utilisez **Tout sélectionner** ou **Tout désélectionner** pour modifier tout le monde en une fois.
2. Le compteur au-dessus de la liste (par exemple, « 12 présents sur 15 ») se met à jour à mesure que vous cochez les cases.
3. Cliquez sur **Enregistrer la présence**. Rien n'est enregistré tant que vous n'avez pas sauvegardé, et un message confirme la fin de l'enregistrement.

Décocher une personne déjà enregistrée comme présente puis enregistrer la retire de la séance.

### Ajouter des visiteurs

Pour enregistrer une personne qui n'est pas membre du groupe, recherchez-la dans la recherche de personnes à côté de la liste de présence. Si elle n'est pas encore dans votre base de données, vous pouvez la créer depuis la recherche. Dans les deux cas, elle est ajoutée à la liste déjà cochée. Cliquez sur **Enregistrer la présence** pour l'enregistrer.

Les personnes qui se sont enregistrées sur une borne affichent une étiquette **Bénévole** ou **Invité**. Les personnes qui ne sont pas membres du groupe affichent une étiquette **Invité**.

## Vérifier quels groupes doivent encore saisir la présence

Lorsque plusieurs classes se réunissent à la même heure de service, vous pouvez voir d'un coup d'œil lesquelles doivent encore faire saisir leur présence pour cette date.

1. Ouvrez une séance qui a une heure de service.
2. Cliquez sur **Qui doit encore saisir la présence** en haut de la liste de présence.
3. Une boîte de dialogue affiche chaque groupe affecté à cette heure de service, avec un résumé tel que « 5 groupes sur 8 saisis » en haut.

Les groupes sans personne marquée présente à cette date affichent une étiquette **Non saisi** et sont listés en premier. Les groupes ayant une présence affichent **Saisi** avec le nombre de personnes marquées présentes (par exemple, « Saisi (12) »). Cliquez sur le nom d'un groupe pour ouvrir ses séances avec la séance de la même date déjà sélectionnée, afin de saisir sa présence immédiatement. Si le groupe n'a pas encore de séance à cette date, sa liste de séances s'ouvre pour que vous puissiez en ajouter une.

:::tip
Associez cette fonction à **Imprimer toutes les classes** et à [l'ajout de séances pour toutes les classes d'une heure de service](#adding-sessions-for-every-class-in-a-service-time) : créez les séances, distribuez les feuilles d'appel, puis utilisez **Qui doit encore saisir la présence** pour voir quelles feuilles n'ont pas encore été saisies.
:::

## Imprimer une feuille d'appel {#printing-a-roll-sheet}

Une feuille d'appel est une liste de classe imprimable que les enseignants peuvent cocher à la main et vous rendre pour la saisir plus tard. Chaque feuille affiche le logo de votre église (le **Logo pour fond clair** défini dans [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de l'église en dessous, le nom de la classe, une ligne **Date** bien visible sous le nom de la classe, et l'heure de service. Les membres sont listés en deux colonnes (on lit d'abord la colonne de gauche, puis celle de droite) afin que davantage de noms tiennent sur une page, et chaque membre dispose des cases **Présent** et **Absent**. Des lignes vierges sont prévues pour les visiteurs, ainsi qu'une zone **Enseignant / Notes**.

- **Depuis une séance** — Cliquez sur l'icône d'imprimante **Imprimer la feuille d'appel** en haut de la liste de présence de la séance. La feuille est datée de la date de la séance.
- **Toutes les classes d'un service** — Si la séance a une heure de service, cliquez sur **Imprimer toutes les classes** pour imprimer une feuille par classe affectée à cette heure de service. Chaque classe s'imprime sur sa propre page.
- **Depuis la liste des membres** — Sur la page du groupe, cliquez sur **Tous les membres**, puis sur l'icône **Imprimer la feuille d'appel** au-dessus de la liste des membres et choisissez **Feuille de présence** pour imprimer une feuille sans date. Le même menu propose une mise en page **Liste de contacts** avec le téléphone, l'e-mail et l'adresse de chaque membre — voir [Impression de la liste des membres](../groups/group-members.md#printing-the-member-list).

La feuille s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

## Exporter la présence vers un tableur

Vous pouvez télécharger un enregistrement de la séance sous forme de fichier CSV pour l'utiliser dans Excel, Numbers ou Google Sheets.

1. Ouvrez la séance que vous voulez exporter.
2. Cliquez sur le bouton **Exporter** en haut de la liste de présence.
3. Ouvrez le fichier téléchargé dans votre application de tableur.

## Consulter la présence enregistrée

Après avoir enregistré des séances, les données apparaissent dans vos rapports de présence.

- **Onglet Tendance de présence** (sous **Toutes les années** sur la page Présence) — affiche les tendances à l'échelle de l'église au fil du temps. Consultez [Suivi de la présence](tracking-attendance.md).
- **Onglet Présence par groupe** — affiche la présence ventilée par groupe. Consultez [Rapports de présence](../reports/attendance-reports.md#group-attendance).

:::tip
Si une séance que vous venez de créer n'apparaît pas tout de suite dans les rapports, vérifiez que la date de la séance se situe dans la plage de dates sélectionnée dans les filtres du rapport.
:::
