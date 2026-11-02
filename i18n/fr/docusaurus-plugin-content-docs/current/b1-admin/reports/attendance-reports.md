---
title: "Rapports de présence"
---

# Rapports de présence

<div class="article-intro">

B1 Admin propose trois rapports de présence pour vous aider à comprendre comment les personnes participent à vos services et à vos groupes. Chaque rapport offre un angle différent sur vos données de présence, des grandes tendances aux détails quotidiens.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les présences sont [suivies de façon régulière](../attendance/tracking-attendance.md) pour vos services et vos groupes
- Assurez-vous que vos [groupes](../groups/creating-groups.md) et vos services sont configurés dans B1 Admin
- Vous avez besoin des [autorisations](../settings/roles-permissions.md) appropriées pour accéder aux rapports

</div>

## Tendance de présence

Le rapport Tendance de présence montre l'évolution de la fréquentation de vos services au fil du temps.

1. Accédez directement à **admin.b1.church/reports/attendanceTrend** dans votre navigateur (les rapports ne figurent pas dans le menu de navigation -- ajouter l'adresse à vos favoris est le moyen le plus simple d'y revenir). Le même rapport se trouve aussi sur la page Présences : cliquez sur **Toutes les années**, puis choisissez l'onglet **Tendance de présence**.
2. Facultativement, sélectionnez un **campus**, un **service**, un **horaire de service** ou un **groupe** pour filtrer les résultats.
3. Définissez la **date de début** et la **date de fin**. Par défaut, le rapport couvre l'année passée, d'il y a un an jusqu'à aujourd'hui, et la date de fin est incluse en entier. Cliquez sur **Générer le rapport**.
4. Le rapport affiche un graphique à barres et un tableau du total des visites par semaine. Chaque semaine est étiquetée avec la date du dimanche de cette semaine, et la colonne **Dates de séance** du tableau énumère les dates réelles de cette semaine où il y a eu des présences (par exemple « 27/9, 30/9 »).

Ce rapport est utile pour repérer des tendances comme les baisses saisonnières, la croissance ou l'effet d'événements spéciaux.

## Présences par groupe {#group-attendance}

Le rapport Présences par groupe montre qui a assisté à chaque séance de groupe pendant une plage de dates.

1. Accédez directement à **admin.b1.church/reports/groupAttendance** dans votre navigateur, ou, sur la page Présences, cliquez sur **Toutes les années** et choisissez l'onglet **Présences par groupe**.
2. Facultativement, sélectionnez un **campus** et un **service**.
3. Définissez la **date de début** et la **date de fin**. Par défaut, le rapport couvre du dernier dimanche jusqu'à aujourd'hui, et la date de fin est incluse en entier.
4. Cliquez sur **Générer le rapport**.

Les résultats sont regroupés par date de séance, puis par horaire de service, puis par groupe, avec les personnes présentes listées sous chaque groupe. Les horaires de service, les groupes et les noms sont triés par ordre alphabétique. À côté du nom de chaque personne, la colonne **Pointé** indique l'heure à laquelle sa présence a été enregistrée (vide lorsqu'aucune heure n'est au dossier) et la colonne **Statut de membre** indique son statut, comme Membre ou Visiteur. Les séances des groupes qui ne se réunissent pas à un horaire de service sont aussi incluses ; elles apparaissent sans horaire de service.

Pour télécharger une feuille de calcul, cliquez sur **Options de téléchargement** et choisissez **Sommaire**. Le CSV contient :

- Une ligne par membre de chaque groupe qui s'est réuni pendant la plage de dates, triée par groupe puis par nom.
- Le nom de la personne et le nom du groupe dans les premières colonnes.
- Une colonne par séance datée, nommée d'après le service, l'horaire de service et la date (par exemple « Dimanche - 9 h 00 (2026-09-27) »), chaque personne étant marquée **présente** ou **absente**. Une séance sans horaire de service est nommée par sa seule date.

Utilisez ce rapport pour comparer la fréquentation entre les groupes et repérer ceux qui croissent ou qui requièrent une attention particulière.

## Présences quotidiennes par groupe

Le rapport Présences quotidiennes par groupe (intitulé **Présences de groupe par jour**) donne un décompte jour par jour du nombre de personnes présentes à un groupe.

1. Accédez directement à **admin.b1.church/reports/dailyGroupAttendance** dans votre navigateur.
2. Utilisez les listes déroulantes **Campus**, **Service** et **Horaire de service** pour restreindre la liste, puis choisissez le **groupe** que vous voulez examiner.
3. Générez le rapport. Il énumère chaque jour où le groupe s'est réuni, du plus ancien au plus récent, avec la **date** et le nombre de **participants** enregistrés ce jour-là.

Ce rapport donne un détail précis, utile pour comprendre les variations d'une semaine à l'autre ou repérer des journées précises où la fréquentation est exceptionnellement élevée ou basse.

:::tip
Utilisez le rapport Tendance de présence pour une vue d'ensemble, et le rapport Présences quotidiennes par groupe lorsque vous devez examiner des dates précises.
:::

## Utilisations pratiques

- **Planification** -- Utilisez les tendances de présence pour planifier les places assises, le personnel et les ressources des prochains services.
- **Rayonnement** -- Repérez tôt les baisses de fréquentation pour pouvoir faire un suivi auprès des membres.
- **Rapports au conseil** -- Incluez les données de présence dans vos rapports de direction réguliers pour montrer la santé des ministères.
- **Évaluation d'événements** -- Comparez la fréquentation avant et après les événements spéciaux pour en mesurer l'impact.

:::warning
Les données de présence sont enregistrées par vos processus de groupe et de pointage. Si les présences ne sont pas suivies de façon régulière, vos rapports ne refléteront pas fidèlement la participation réelle. Voir [Suivi des présences](../attendance/tracking-attendance.md) pour les instructions de configuration.
:::
