---
title: "Rapports de présence"
---

# Rapports de présence

<div class="article-intro">

B1 Admin propose trois rapports de présence pour vous aider à comprendre comment les personnes participent à vos services et à vos groupes. Chaque rapport offre un point de vue différent sur vos données de présence, des tendances générales aux détails quotidiens.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que la présence est [suivie de manière régulière](../attendance/tracking-attendance.md) pour vos services et vos groupes
- Vérifiez que vos [groupes](../groups/creating-groups.md) et vos services sont configurés dans B1 Admin
- Vous devez disposer des [autorisations](../settings/roles-permissions.md) nécessaires pour accéder aux rapports

</div>

## Tendance de présence

Le rapport Tendance de présence indique l'évolution de la fréquentation de vos services dans le temps.

1. Rendez-vous directement à l'adresse **admin.b1.church/reports/attendanceTrend** dans votre navigateur (les rapports n'ont pas d'entrée dans le menu de navigation : il est plus simple de mettre l'adresse en favori pour y revenir). Le même rapport est aussi disponible sur la page Présence : cliquez sur **Toutes les années**, puis choisissez l'onglet **Tendance de présence**.
2. Vous pouvez éventuellement sélectionner un **Campus**, un **Service**, un **Horaire de service** ou un **Groupe** pour filtrer les résultats.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre l'année écoulée, depuis il y a un an jusqu'à aujourd'hui, et la date de fin est incluse en totalité. Cliquez sur **Générer le rapport**.
4. Le rapport affiche un histogramme et un tableau du nombre total de visites par semaine. Chaque semaine est identifiée par la date du dimanche de cette semaine, et la colonne **Dates de session** du tableau répertorie les dates réelles de cette semaine où une présence a été enregistrée (par exemple « 27/09, 30/09 »).

Ce rapport est utile pour repérer des tendances telles que les baisses saisonnières, la croissance ou l'impact d'événements spéciaux.

## Présence par groupe

Le rapport Présence par groupe indique qui a participé à chaque séance de groupe sur une période donnée.

1. Rendez-vous directement à l'adresse **admin.b1.church/reports/groupAttendance** dans votre navigateur, ou sur la page Présence cliquez sur **Toutes les années** et choisissez l'onglet **Présence par groupe**.
2. Vous pouvez éventuellement sélectionner un **Campus** et un **Service**.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre du dernier dimanche jusqu'à aujourd'hui, et la date de fin est incluse en totalité.
4. Cliquez sur **Générer le rapport**.

Les résultats sont regroupés par date de séance, puis par horaire de service, puis par groupe, avec les personnes présentes listées sous chaque groupe. Les horaires de service, les groupes et les noms sont triés par ordre alphabétique. À côté du nom de chaque personne, la colonne **Pointé** indique l'heure à laquelle sa présence a été enregistrée (vide lorsqu'aucune heure n'est disponible), et la colonne **Statut d'adhésion** indique son statut, par exemple Membre ou Visiteur.

Pour télécharger un tableur, cliquez sur **Options de téléchargement** et choisissez **Synthèse**. Le fichier CSV contient :

- Une ligne par membre de chaque groupe ayant tenu une séance sur la période, triée par groupe puis par nom.
- Le nom de la personne et le nom du groupe dans les premières colonnes.
- Une colonne par séance datée, nommée avec le service, l'horaire et la date (par exemple « Dimanche - 9h00 (2026-09-27) »), chaque personne étant marquée **présent** ou **absent**.

Utilisez ce rapport pour comparer la présence entre les groupes et repérer ceux qui se développent ou qui ont besoin d'attention.

## Présence quotidienne par groupe

Le rapport Présence quotidienne par groupe (intitulé **Présence par groupe et par jour**) donne le nombre de personnes présentes chaque jour dans un groupe donné.

1. Rendez-vous directement à l'adresse **admin.b1.church/reports/dailyGroupAttendance** dans votre navigateur.
2. Utilisez les listes déroulantes **Campus**, **Service** et **Horaire de service** pour affiner la liste, puis choisissez le **Groupe** à examiner.
3. Générez le rapport. Il répertorie chaque jour où le groupe s'est réuni, du plus ancien au plus récent, avec la **Date** et le nombre de **Participants** enregistrés ce jour-là.

Ce rapport offre un niveau de détail précis, utile pour comprendre les variations d'une semaine à l'autre ou repérer des jours particuliers où la fréquentation est exceptionnellement haute ou basse.

:::tip
Utilisez le rapport Tendance de présence pour une vue d'ensemble, et le rapport Présence quotidienne par groupe lorsque vous avez besoin d'examiner des dates précises.
:::

## Utilisations pratiques

- **Planification** : utilisez les tendances de présence pour prévoir l'installation des sièges, les effectifs et les ressources des prochains services.
- **Sensibilisation** : repérez tôt les baisses de fréquentation afin de relancer les membres concernés.
- **Rapports au conseil** : intégrez les données de présence à vos rapports réguliers à la direction pour montrer la vitalité du ministère.
- **Évaluation d'événements** : comparez la présence avant et après les événements spéciaux pour en mesurer l'impact.

:::warning
Les données de présence sont enregistrées via vos processus de pointage des groupes et des services. Si la présence n'est pas suivie de manière régulière, vos rapports ne refléteront pas fidèlement la participation réelle. Consultez [Suivi de la présence](../attendance/tracking-attendance.md) pour les instructions de configuration.
:::
