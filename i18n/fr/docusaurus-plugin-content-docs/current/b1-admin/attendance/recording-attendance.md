---
title: "Enregistrer les présences"
description: "Enregistrez la présence à chaque réunion de groupe dans B1 Admin : créez une séance, indiquez les participants, enregistrez des notes et imprimez les feuilles d'appel ou exportez-les vers un tableur."
---

# Enregistrer les présences

<div class="article-intro">

Une fois vos campus, horaires de services et groupes configurés, vous pouvez enregistrer manuellement les présences après chaque rassemblement. B1 Admin organise les présences autour des **séances** -- une séance par groupe et par date de rencontre. Vous créez la séance, marquez les personnes présentes, et les données alimentent directement vos rapports de présence.

</div>

## Vidéo de formation

<YouTube id="gS8h2rhyMys" title="Enregistrer et suivre les présences dans B1" next="Créer des plans et planifier les bénévoles dans B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, horaires de services et groupes doivent être configurés. Voir [Configuration des présences](setup.md) si vous ne l'avez pas encore fait.
- Les groupes que vous souhaitez suivre doivent avoir **Suivre les présences** activé. Voir [Configuration des présences](setup.md) pour plus de détails.
- Vous avez besoin de l'autorisation **Modifier les présences** pour enregistrer les présences. Les bénévoles qui ont seulement **Voir les noms des personnes uniquement** pour les personnes peuvent tout de même prendre les présences de cette façon -- ils ouvrent les classes depuis **Groupes** et voient les membres par nom seulement. Voir [Noms des personnes uniquement](../settings/roles-permissions.md#people-names-only).

</div>

## Créer une séance

Une séance représente une occurrence d'une rencontre de groupe -- par exemple, votre classe de la maternelle à la 3e année un dimanche précis.

1. Ouvrez **B1 Admin**, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Groupes**.
2. Sélectionnez le groupe pour lequel vous voulez enregistrer les présences.
3. Dans la section **Séances** de la page du groupe, cliquez sur **Toutes les séances**.
4. Cliquez sur **Nouveau** pour créer une nouvelle séance.
5. Si le groupe est associé à un horaire de service, choisissez l'**horaire de service**. S'il s'agit d'un groupe non planifié, ce champ n'apparaît pas.
6. Sélectionnez la **date de la séance** -- il peut s'agir d'aujourd'hui, d'une date passée ou d'une date future.
7. Cliquez sur **Enregistrer**.

### Ajouter des séances pour chaque classe d'un horaire de service {#adding-sessions-for-every-class-in-a-service-time}

Si d'autres groupes se réunissent au même horaire de service (par exemple, toutes les classes de vos enfants à 9 h le dimanche), vous pouvez créer leurs séances en une seule étape au lieu de visiter chaque groupe.

1. Suivez les étapes ci-dessus et choisissez un **horaire de service**.
2. Cochez **Ajouter aussi pour les autres _N_ groupes de _horaire de service_**. La case indique combien d'autres groupes sont associés à cet horaire de service. Elle n'apparaît que lors de l'ajout d'une nouvelle séance et si au moins un autre groupe se réunit à ce moment.
3. Cliquez sur **Enregistrer**.

Une séance est créée pour le groupe actuel et pour chacun des autres groupes ayant le même horaire de service à la même date. Les groupes qui ont déjà une séance pour cette date et cet horaire de service sont ignorés, afin d'éviter les doublons.

:::tip
Vous pouvez créer des séances pour des dates passées afin de rattraper les présences que vous n'avez pas encore enregistrées, ou les créer à l'avance pour qu'elles soient prêtes lorsque votre groupe se réunira.
:::

## Notes de séance {#session-notes}

Chaque séance peut comporter des notes -- un résumé de ce qui a été vu, des annonces ou des demandes de prière.

1. Lors de l'ajout d'une séance, ou après avoir cliqué sur l'icône **Modifier** (crayon) à côté d'une séance dans la liste, saisissez du texte dans la case **Notes (ce qui a été vu, annonces, demandes de prière)** sous la date. La barre d'outils vous permet d'ajouter du gras, des listes et des liens.
2. Cliquez sur **Enregistrer**.

Les notes apparaissent en haut de la liste de présences de la séance. Ce sont aussi les notes de rencontre que les membres du groupe lisent dans la section **Rencontres** de la page du groupe sur B1.church, où les responsables de groupe peuvent aussi les rédiger et les modifier. Voir [Détails du groupe](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marquer les présences

Sélectionnez une séance pour voir sa liste de présences. Chaque membre du groupe figure dans la liste avec une case à cocher, triée par nom de famille, et les personnes déjà enregistrées comme présentes sont cochées.

1. Cochez la case à côté de chaque personne présente. Utilisez **Tout sélectionner** ou **Tout désélectionner** pour modifier tout le monde en une fois.
2. Le compteur au-dessus de la liste (par exemple, « 12 présents sur 15 ») se met à jour au fur et à mesure que vous cochez des cases.
3. Cliquez sur **Enregistrer les présences**. Rien n'est enregistré avant que vous ne sauvegardiez, et un message confirme la fin de l'enregistrement. Si vous essayez de fermer ou de recharger l'onglet du navigateur pendant qu'un enregistrement est en cours, votre navigateur vous en avertit d'abord afin que les modifications ne soient pas perdues.

Décocher une personne déjà enregistrée comme présente puis enregistrer la retire de la séance.

### Ajouter des visiteurs

Pour enregistrer une personne qui n'est pas membre du groupe, recherchez-la dans la recherche de personnes à côté de la liste de présences. Si elle n'est pas encore dans votre base de données, vous pouvez la créer depuis la recherche. Dans les deux cas, elle est ajoutée à la liste déjà cochée. Cliquez sur **Enregistrer les présences** pour l'enregistrer.

Les personnes qui ont pointé à une borne affichent une étiquette **Bénévole** ou **Visiteur**. Les personnes qui ne sont pas membres du groupe affichent une étiquette **Visiteur**.

## Vérifier les groupes qui attendent encore leurs présences

Lorsque plusieurs classes se réunissent au même horaire de service, vous pouvez voir d'un coup d'œil celles qui doivent encore avoir leurs présences saisies pour cette date.

1. Ouvrez une séance associée à un horaire de service.
2. Cliquez sur **Qui doit encore saisir les présences** en haut de la liste de présences.
3. Une boîte de dialogue affiche chaque groupe associé à cet horaire de service, avec un résumé tel que « 5 groupes sur 8 saisis » en haut.

Les groupes sans personne marquée présente pour cette date affichent une étiquette **Non saisi** et apparaissent en premier. Les groupes ayant des présences affichent **Saisi** avec le nombre de personnes présentes (par exemple, « Saisi (12) »). Cliquez sur le nom d'un groupe pour ouvrir ses séances avec la séance de la même date déjà sélectionnée, afin de saisir ses présences immédiatement. Si le groupe n'a pas encore de séance pour cette date, sa liste de séances s'ouvre pour que vous en ajoutiez une.

:::tip
Associez cette fonction à **Imprimer toutes les classes** et à [l'ajout de séances pour chaque classe d'un horaire de service](#adding-sessions-for-every-class-in-a-service-time) : créez les séances, distribuez les feuilles d'appel, puis utilisez **Qui doit encore saisir les présences** pour voir quelles feuilles n'ont pas encore été saisies.
:::

## Imprimer une feuille d'appel {#printing-a-roll-sheet}

Une feuille d'appel est une liste de classe imprimable que les enseignants peuvent marquer à la main et vous remettre pour la saisir plus tard. Chaque feuille affiche le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) avec le nom de l'église en dessous, la classe, une grande ligne **Date** sous le nom de la classe, et l'horaire de service. Les membres sont listés en deux colonnes (lecture de haut en bas dans la colonne de gauche, puis dans celle de droite) afin que davantage de noms tiennent sur une page, et chaque membre dispose de cases **Présent** et **Absent**. Des lignes vierges sont prévues pour les visiteurs ainsi qu'une zone **Enseignant / Notes**.

- **Depuis une séance** -- Cliquez sur l'icône **Imprimer la feuille d'appel** (imprimante) en haut de la liste de présences de la séance. La feuille porte la date de la séance et indique l'horaire de service de cette séance.
- **Toutes les classes d'un service** -- Si la séance a un horaire de service, cliquez sur **Imprimer toutes les classes** pour imprimer une feuille par classe associée à cet horaire de service. Chaque classe s'imprime sur sa propre page.
- **Depuis la liste des membres** -- Sur la page du groupe, cliquez sur **Tous les membres**, puis cliquez sur l'icône **Imprimer la feuille d'appel** au-dessus de la liste des membres et choisissez **Feuille de présence** pour imprimer une feuille sans date. Le même menu propose une mise en page **Liste de contacts** avec le téléphone, le courriel et l'adresse de chaque membre -- voir [Imprimer la liste des membres](../groups/group-members.md#printing-the-member-list).

La feuille s'ouvre dans un nouvel onglet et la boîte de dialogue d'impression de votre navigateur apparaît automatiquement.

## Exporter les présences vers un tableur

Vous pouvez télécharger un registre de la séance sous forme de fichier CSV pour l'utiliser dans Excel, Numbers ou Google Sheets.

1. Ouvrez la séance que vous voulez exporter.
2. Cliquez sur le bouton **Exporter** en haut de la liste de présences.
3. Ouvrez le fichier téléchargé dans votre application de tableur.

## Consulter les présences enregistrées

Après avoir enregistré des séances, les données apparaissent dans vos rapports de présence.

- **Onglet Tendance des présences** (sous **Toutes les années** sur la page Présences) -- affiche les tendances de l'église dans son ensemble au fil du temps. Voir [Suivi des présences](tracking-attendance.md).
- **Onglet Présences par groupe** -- affiche les présences ventilées par groupe. Voir [Rapports de présence](../reports/attendance-reports.md#group-attendance).

:::tip
Si une séance que vous venez de créer n'apparaît pas tout de suite dans les rapports, assurez-vous que la date de la séance se situe dans la plage de dates sélectionnée dans les filtres du rapport.
:::
