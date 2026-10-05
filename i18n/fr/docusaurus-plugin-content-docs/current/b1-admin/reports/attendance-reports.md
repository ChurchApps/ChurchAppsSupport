---
title: "Rapports de participation"
---

# Rapports de participation

<div class="article-intro">

B1 Admin fournit trois rapports de participation pour vous aider à comprendre comment les personnes s'engagent avec vos services et groupes. Chaque rapport offre une perspective différente sur vos données de participation, des tendances générales aux répartitions quotidiennes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que la participation est [suivie régulièrement](../attendance/tracking-attendance.md) pour vos services et groupes
- Assurez-vous que vos [groupes](../groups/creating-groups.md) et services sont configurés dans B1 Admin
- Vous avez besoin des [permissions](../settings/roles-permissions.md) appropriées pour accéder aux rapports

</div>

## Tendance de la participation

Le rapport Tendance de la participation montre comment la participation change au fil du temps pour vos services.

1. Allez directement à **admin.b1.church/reports/attendanceTrend** dans votre navigateur (les rapports n'ont pas d'entrée dans le menu de navigation -- ajouter l'adresse en favori est le moyen le plus facile de revenir). Le même rapport est également dans l'onglet **Tendance de la participation** de la page Participation.
2. Optionnellement sélectionnez un **Campus**, **Service**, **Heure de service** ou **Groupe** pour filtrer les résultats.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre l'année passée, d'il y a un an jusqu'à aujourd'hui, et la date de fin est incluse complètement. Cliquez sur **Exécuter le rapport**.
4. Le rapport affiche un graphique en barres et un tableau du nombre total de visites par semaine. Chaque semaine est étiquetée avec la date du dimanche de cette semaine, et la colonne **Dates de la session** du tableau énumère les dates réelles de cette semaine qui ont eu une participation (par exemple, « 27/9, 30/9 »).

Ce rapport est utile pour identifier des modèles tels que les baisses saisonnières, les tendances de croissance ou l'impact d'événements spéciaux.

## Participation au groupe

Le rapport Participation au groupe montre qui a assisté à chaque session de groupe dans une plage de dates.

1. Allez directement à **admin.b1.church/reports/groupAttendance** dans votre navigateur, ou ouvrez l'onglet **Participation au groupe** de la page Participation.
2. Optionnellement sélectionnez un **Campus** et **Service**.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre le dernier dimanche à aujourd'hui, et la date de fin est incluse complètement.
4. Cliquez sur **Exécuter le rapport**.

Les résultats sont regroupés par date de session, puis heure de service, puis groupe, avec les personnes qui ont participé listées sous chaque groupe. Les heures de service, les groupes et les noms sont triés alphabétiquement. À côté du nom de chaque personne, la colonne **Enregistré** affiche l'heure à laquelle leur participation a été enregistrée (vide quand aucune heure n'est disponible) et la colonne **Statut d'adhésion** affiche leur statut, comme Membre ou Visiteur.

Pour télécharger une feuille de calcul, cliquez sur **Options de téléchargement** et choisissez **Résumé**. Le fichier CSV contient :

- Une ligne par membre de chaque groupe qui s'est réuni dans la plage de dates, triée par groupe puis par nom.
- Le nom de la personne et le nom du groupe dans les premières colonnes.
- Une colonne par session datée, nommée avec le service, l'heure de service et la date (par exemple, « Dimanche - 9:00 (27/09/2026) »), avec chaque personne marquée comme **présente** ou **absente**.

Utilisez ce rapport pour comparer la participation entre les groupes et identifier les groupes qui se développent ou qui ont besoin d'attention.

## Participation quotidienne aux groupes

Le rapport Participation quotidienne aux groupes fournit une ventilation jour par jour des données de participation pour vos groupes.

1. Allez directement à **admin.b1.church/reports/dailyGroupAttendance** dans votre navigateur.
2. Définissez la **plage de dates** pour le rapport.
3. Sélectionnez le ou les **groupe(s)** que vous souhaitez examiner.
4. Le rapport affiche les chiffres de participation pour chaque jour individuel dans la plage.

Ce rapport vous donne des détails granulaires, ce qui est utile pour comprendre la variation d'une semaine à l'autre ou pour identifier les jours spécifiques avec une participation inhabituellement élevée ou faible.

:::tip
Utilisez le rapport Tendance de la participation pour un aperçu général et le rapport Participation quotidienne aux groupes lorsque vous avez besoin d'explorer des dates spécifiques.
:::

## Utilisations pratiques

- **Planification** -- Utilisez les tendances de participation pour planifier les sièges, le personnel et les ressources pour les services à venir.
- **Sensibilisation** -- Identifiez les modèles de participation déclinante dès le début afin de pouvoir suivre avec les membres.
- **Rapports de direction** -- Incluez les données de participation dans vos rapports de direction réguliers pour afficher la santé du ministère.
- **Évaluation d'événements** -- Comparez la participation avant et après des événements spéciaux pour mesurer leur impact.

:::warning
Les données de participation sont enregistrées via vos processus d'enregistrement de groupe et de service. Si la participation n'est pas suivie régulièrement, vos rapports ne refléteront pas avec précision la participation réelle. Voir [Suivi de la participation](../attendance/tracking-attendance.md) pour les instructions de configuration.
:::
