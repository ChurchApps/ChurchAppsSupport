---
title: "Suivi des présences"
description: "Consultez les tendances de présence, filtrez les rapports par campus, service ou groupe, et exportez les présences par groupe depuis la page Présences dans B1 Admin."
---

# Suivi des présences

<div class="article-intro">

Une fois vos campus, horaires de service et groupes configurés, B1 Admin vous permet de consulter facilement les données de présence et de repérer les tendances. La page Présences s'ouvre sur un résumé des présences de la semaine, et ses rapports **Toutes les années** offrent deux vues principales — l'onglet **Tendance des présences** pour les tendances à l'échelle de l'église et l'onglet **Présences par groupe** pour le détail par groupe —, ainsi qu'un onglet **Tendance du nombre de participants** pour les [totaux de participants](headcount-entry.md). Utilisez ces outils pour comprendre les schémas de croissance, repérer un engagement en baisse et prendre des décisions fondées sur les données pour votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Votre structure de présences doit être configurée avec au moins un campus et un horaire de service. Voir [Configuration des présences](setup.md) si vous ne l'avez pas encore fait.
- Des données de présence doivent être enregistrées avant que les rapports n'affichent des résultats. Les données peuvent provenir d'une [saisie manuelle](recording-attendance.md) ou de l'[enregistrement en libre-service](check-in.md).

</div>

## Consulter les tendances de présence {#viewing-attendance-trends}

1. Ouvrez **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes** et cliquez sur **Présences**.
2. Cliquez sur **Toutes les années** dans la colonne de gauche. L'onglet **Tendance des présences** est sélectionné par défaut.
3. Le rapport s'exécute automatiquement à l'ouverture de l'onglet et affiche le total des présences pour chaque semaine.

:::tip
Pour un aperçu rapide de la semaine en cours, la page principale des Présences indique combien de personnes sont dans la salle cette semaine, une répartition par salle (groupe), les visiteurs éventuels et un graphique à barres de 13 semaines des enregistrements — aucun rapport nécessaire.
:::

## Filtrer vos données {#filtering-your-data}

Utilisez les filtres de la zone **Filtrer le rapport** pour restreindre les résultats, puis cliquez sur **Exécuter le rapport** :

- **Campus** -- sélectionnez un campus pour ne voir que les présences de ce lieu.
- **Service** -- limitez le rapport à un seul service.
- **Horaire de service** -- choisissez un horaire de service pour examiner un rassemblement en particulier.
- **Groupe** -- affichez les présences d'un seul groupe.
- **Date de début** et **Date de fin** -- la période à inclure. Par défaut, le rapport couvre l'année écoulée, d'il y a un an jusqu'à aujourd'hui, et la date de fin est incluse en totalité.

Le rapport affiche un graphique à barres et un tableau du total des visites par semaine. Utilisez l'icône d'impression pour l'imprimer, ou **Options de téléchargement** pour enregistrer les données. Chaque semaine est étiquetée avec la date du dimanche de cette semaine. Le tableau comprend aussi une colonne **Dates des séances** qui liste les dates réelles de cette semaine ayant des présences (par exemple « 27/9, 30/9 »), afin que vous puissiez voir quand un rassemblement de mi-semaine est compté dans la même semaine que le dimanche.

:::info
Les rapports s'exécutent automatiquement chaque fois que vous ouvrez l'onglet Tendance des présences ; vous voyez donc toujours des chiffres à jour sans avoir à cliquer sur un bouton d'actualisation.
:::

## Présences par groupe {#group-attendance}

L'onglet **Présences par groupe** indique qui a participé à chaque séance de groupe. C'est utile lorsque vous voulez suivre une classe, une équipe de ministère ou un petit groupe précis, plutôt que de regarder les chiffres globaux des services.

1. Dans les rapports **Toutes les années**, sélectionnez l'onglet **Présences par groupe**.
2. Choisissez éventuellement un **Campus** et un **Service**.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre du dimanche précédent jusqu'à aujourd'hui.
4. Cliquez sur **Exécuter le rapport**.

Les résultats sont regroupés par date de séance, puis par horaire de service et par groupe, avec les personnes ayant participé listées sous chaque groupe. Les horaires de service, les groupes et les noms sont triés par ordre alphabétique afin que chaque en-tête n'apparaisse qu'une fois. La ligne de chaque personne affiche aussi une colonne **Enregistré** avec l'heure à laquelle sa présence a été consignée (vide lorsqu'aucune heure n'est enregistrée) et une colonne **Statut de membre** (par exemple Membre ou Visiteur), afin que vous puissiez repérer les visiteurs d'un coup d'œil.

Pour télécharger les données, cliquez sur **Options de téléchargement** et choisissez **Résumé**. Le fichier CSV comporte une ligne par membre du groupe, triée par groupe puis par nom, et une colonne pour chaque séance datée de la période (par exemple « Dimanche - 9 h 00 (2026-09-27) ») marquée **présent** ou **absent**.

:::tip
Les présences par groupe sont particulièrement utiles pour les responsables de [petits groupes](../groups/creating-groups.md) qui veulent suivre l'engagement au sein de leur groupe dans le temps.
:::

## Conseils pour exploiter les données de présence {#tips-for-using-attendance-data}

- Consultez les tendances chaque mois pour repérer tôt les schémas saisonniers.
- Comparez les données par campus pour comprendre quels lieux sont en croissance.
- Utilisez les rapports par groupe pour faire un suivi auprès des [groupes](../groups/group-members.md) dont la présence diminue.
- Combinez les analyses de présence avec l'outil [Recherche IA](../people/ai-search.md) pour trouver les personnes qui ne sont pas venues récemment.

## Pages connexes {#related-pages}

- [Enregistrement des présences](recording-attendance.md) -- saisir manuellement les présences d'une séance de groupe
- [Saisie du nombre de participants et tendance](headcount-entry.md) -- une alternative plus simple basée sur un total, avec son propre graphique de tendance hebdomadaire
- [Enregistrement](check-in.md) -- configurer l'enregistrement en libre-service pour que les présences soient consignées automatiquement
