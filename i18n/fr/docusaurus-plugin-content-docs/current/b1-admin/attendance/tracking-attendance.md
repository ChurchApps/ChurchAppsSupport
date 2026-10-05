---
title: "Suivi de la Présence"
---

# Suivi de la Présence

<div class="article-intro">

Une fois que vos campus, heures de service et groupes sont configurés, B1 Admin facilite l'examen des données de présence et l'identification des tendances. La page Présence fournit deux vues de rapport -- l'onglet **Tendance de Présence** pour les tendances à l'échelle de l'église et l'onglet **Présence du Groupe** pour les détails au niveau du groupe. Utilisez ces outils pour comprendre les modèles de croissance, identifier l'engagement en déclin et prendre des décisions fondées sur les données pour votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Votre structure de présence doit être configurée avec au moins un campus et une heure de service. Voir [Configuration de la Présence](setup.md) si vous ne l'avez pas encore fait.
- Les données de présence doivent être enregistrées avant que les rapports ne montrent les résultats. Les données peuvent provenir de l'[entrée manuelle](recording-attendance.md) ou de l'[enregistrement automatique](check-in.md).

</div>

## Affichage des tendances de présence

1. Ouvrez **B1 Admin**, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes**, et cliquez sur **Présence**.
2. Cliquez sur l'onglet **Tendance de Présence**.
3. Le rapport s'exécute automatiquement à l'ouverture de l'onglet, montrant la présence totale pour chaque semaine.

## Filtrage de vos données

Utilisez les filtres dans la boîte **Filtrer le rapport** pour affiner les résultats, puis cliquez sur **Exécuter le rapport** :

- **Campus** -- sélectionnez un campus pour voir la présence pour cet emplacement uniquement.
- **Service** -- limitez le rapport à un service.
- **Heure de service** -- choisissez une heure de service pour approfondir un rassemblement particulier.
- **Groupe** -- affichage la présence pour un seul groupe.
- **Date de début** et **Date de fin** -- la plage de dates à inclure. Par défaut, le rapport couvre l'année passée, d'il y a un an jusqu'à aujourd'hui, et la date de fin est incluse en totalité.

Le rapport affiche un graphique à barres et un tableau des visites totales par semaine. Chaque semaine est étiquetée avec la date du dimanche de cette semaine. Le tableau a également une colonne **Dates de session** listant les dates réelles de cette semaine qui avaient une présence (par exemple, « 27/9, 30/9 »), afin que vous puissiez voir quand un rassemblement entre-semaine est compté dans la même semaine que le dimanche.

:::info
Les rapports s'exécutent automatiquement chaque fois que vous ouvrez l'onglet Tendance de Présence, afin que vous voyiez toujours les chiffres à jour sans avoir besoin de cliquer sur un bouton d'actualisation.
:::

## Présence du Groupe

L'onglet **Présence du Groupe** affiche qui a assisté à chaque session de groupe. Ceci est utile lorsque vous souhaitez surveiller une classe spécifique, une équipe de ministère ou un petit groupe plutôt que de regarder les chiffres de service globaux.

1. Sélectionnez l'onglet **Présence du Groupe**.
2. Optionnellement choisissez un **Campus** et un **Service**.
3. Définissez la **Date de début** et la **Date de fin**. Par défaut, le rapport couvre le dimanche dernier jusqu'à aujourd'hui.
4. Cliquez sur **Exécuter le rapport**.

Les résultats sont groupés par date de session, puis par heure de service et groupe, avec les personnes qui ont assisté listées sous chaque groupe. Les heures de service, les groupes et les noms sont triés alphabétiquement afin que chaque titre n'apparaisse qu'une seule fois. La ligne de chaque personne affiche également une colonne **Enregistré** avec l'heure d'enregistrement de sa présence (vide si aucune heure n'est en dossier) et une colonne **Statut d'adhésion** (par exemple, Membre ou Visiteur), pour que vous puissiez repérer les visiteurs d'un coup d'œil.

Pour télécharger les données, cliquez sur **Options de téléchargement** et choisissez **Résumé**. Le fichier CSV a une ligne par membre du groupe, trié par groupe puis par nom, et une colonne pour chaque session datée dans la plage (par exemple, « Dimanche - 9h00 (27/09/2026) ») marquée **présent** ou **absent**.

:::tip
La présence du groupe est particulièrement précieuse pour les responsables de [petits groupes](../groups/creating-groups.md) qui souhaitent suivre l'engagement au sein de leur groupe au fil du temps.
:::

## Conseils pour l'utilisation des données de présence

- Examinez les tendances mensuellement pour repérer les modèles saisonniers tôt.
- Comparez les données au niveau des campus pour comprendre quels emplacements se développent.
- Utilisez des rapports au niveau des groupes pour assurer le suivi des [groupes](../groups/group-members.md) qui montrent une présence en déclin.
- Combinez les informations de présence avec l'outil [Recherche IA](../people/ai-search.md) pour trouver les personnes qui n'ont pas assisté récemment.

## Pages connexes

- [Enregistrement de la Présence](recording-attendance.md) -- entrez manuellement la présence pour une session de groupe
- [Entrée et Tendance des Comptages](headcount-entry.md) -- une alternative de comptage total plus simple, avec son propre graphique de tendance hebdomadaire
- [Enregistrement](check-in.md) -- configurez l'enregistrement automatique pour que la présence soit enregistrée automatiquement
