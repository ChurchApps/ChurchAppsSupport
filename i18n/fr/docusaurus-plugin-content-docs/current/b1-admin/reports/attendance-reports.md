---
title: "Rapports de présence"
---

# Rapports de présence

<div class="article-intro">

B1 Admin propose trois rapports de présence pour vous aider à comprendre comment les personnes participent à vos services et groupes. Chaque rapport offre un point de vue différent sur vos données de présence, des grandes tendances aux détails quotidiens.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que la présence est [suivie de manière régulière](../attendance/tracking-attendance.md) pour vos services et groupes
- Assurez-vous que vos [groupes](../groups/creating-groups.md) et services sont configurés dans B1 Admin
- Vous avez besoin des [autorisations](../settings/roles-permissions.md) appropriées pour accéder aux rapports

</div>

## Tendance de la présence

Le rapport Tendance de la présence montre l'évolution de la présence au fil du temps pour vos services.

1. Accédez directement à **admin.b1.church/reports/attendanceTrend** dans votre navigateur (les rapports n'ont pas d'entrée dans le menu de navigation -- ajouter l'adresse à vos favoris est le moyen le plus simple d'y revenir). Le même rapport se trouve aussi sur la page Présence : cliquez sur **Toutes les années**, puis choisissez l'onglet **Tendance de la présence**.
2. Choisissez facultativement un **campus**, un **service**, un **horaire de service** ou un **groupe** pour filtrer les résultats.
3. Définissez la **date de début** et la **date de fin**. Par défaut, le rapport couvre l'année écoulée, d'il y a un an jusqu'à aujourd'hui, et la date de fin est incluse en entier. Cliquez sur **Exécuter le rapport**.
4. Le rapport affiche un graphique à barres et un tableau du total des visites par semaine. Chaque semaine est étiquetée avec la date du dimanche de cette semaine, et la colonne **Dates de séance** du tableau énumère les dates réelles de cette semaine où il y a eu de la présence (par exemple « 9/27, 9/30 »).

Ce rapport est utile pour repérer des tendances comme les baisses saisonnières, la croissance, ou l'impact d'événements spéciaux.

## Présence par groupe {#group-attendance}

Le rapport Présence par groupe indique qui a assisté à chaque séance de groupe pendant une plage de dates.

1. Accédez directement à **admin.b1.church/reports/groupAttendance** dans votre navigateur, ou sur la page Présence cliquez sur **Toutes les années** et choisissez l'onglet **Présence par groupe**.
2. Choisissez facultativement un **campus** et un **service**.
3. Définissez la **date de début** et la **date de fin**. Par défaut, le rapport couvre du dernier dimanche jusqu'à aujourd'hui, et la date de fin est incluse en entier.
4. Cliquez sur **Exécuter le rapport**.

Les résultats sont regroupés par date de séance, puis par horaire de service, puis par groupe, avec les personnes présentes listées sous chaque groupe. Les horaires de service, les groupes et les noms sont triés par ordre alphabétique. À côté du nom de chaque personne, la colonne **Enregistré** indique l'heure à laquelle sa présence a été consignée (vide lorsqu'aucune heure n'est enregistrée) et la colonne **Statut de membre** indique son statut, par exemple Membre ou Visiteur. Les séances des groupes qui ne se réunissent pas à un horaire de service sont aussi incluses ; elles apparaissent sans horaire de service.

Pour télécharger une feuille de calcul, cliquez sur **Options de téléchargement** et choisissez **Sommaire**. Le CSV contient :

- Une ligne par membre de chaque groupe qui s'est réuni dans la plage de dates, triée par groupe puis par nom.
- Le nom de la personne et le nom du groupe dans les premières colonnes.
- Une colonne par séance datée, nommée avec le service, l'horaire de service et la date (par exemple « Dimanche - 9 h 00 (2026-09-27) »), avec chaque personne marquée **présente** ou **absente**. Une séance sans horaire de service est nommée uniquement par sa date.

Utilisez ce rapport pour comparer la présence entre les groupes et repérer les groupes qui croissent ou qui ont besoin d'attention.

## Présence quotidienne par groupe

Le rapport Présence quotidienne par groupe (intitulé **Présence par groupe, par jour**) donne le nombre de personnes présentes à un groupe, jour après jour.

1. Accédez directement à **admin.b1.church/reports/dailyGroupAttendance** dans votre navigateur.
2. Utilisez les listes déroulantes **Campus**, **Service** et **Horaire de service** pour restreindre la liste, puis choisissez le **groupe** que vous souhaitez examiner.
3. Exécutez le rapport. Il liste chaque jour où le groupe s'est réuni, du plus ancien au plus récent, avec la **date** et le nombre de **participants** enregistrés ce jour-là.

Ce rapport donne un détail précis, utile pour comprendre les variations d'une semaine à l'autre ou repérer des jours particuliers où la présence est anormalement élevée ou basse.

:::tip
Utilisez le rapport Tendance de la présence pour une vue d'ensemble, et le rapport Présence quotidienne par groupe lorsque vous avez besoin d'examiner des dates précises.
:::

## Utilisations pratiques

- **Planification** -- Utilisez les tendances de présence pour planifier les places assises, le personnel et les ressources des prochains services.
- **Rayonnement** -- Repérez tôt les baisses de présence afin de faire un suivi auprès des membres.
- **Rapports au conseil** -- Incluez les données de présence dans vos rapports réguliers aux responsables pour montrer la santé des ministères.
- **Évaluation d'événements** -- Comparez la présence avant et après les événements spéciaux pour mesurer leur impact.

:::warning
Les données de présence sont enregistrées par vos processus d'enregistrement des groupes et des services. Si la présence n'est pas suivie de manière régulière, vos rapports ne refléteront pas fidèlement la participation réelle. Consultez [Suivi de la présence](../attendance/tracking-attendance.md) pour les instructions de configuration.
:::
