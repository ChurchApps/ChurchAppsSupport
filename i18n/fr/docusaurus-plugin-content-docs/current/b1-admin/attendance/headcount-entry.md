---
title: "Saisie du nombre de participants et tendance"
description: "Saisissez un nombre total de participants pour un service ou un groupe dans B1 Admin sans liste nominative, puis suivez ces totaux semaine après semaine dans le rapport Tendance du nombre de participants."
---

# Saisie du nombre de participants et tendance

<div class="article-intro">

Le nombre de participants vous permet d'enregistrer un simple total de présences — pour un service, un horaire de service ou un groupe — sans vérifier une liste nominative. Utilisez-le lorsque vous avez seulement besoin de savoir « combien de personnes étaient là », et associez-le au rapport Tendance du nombre de participants pour suivre ce chiffre dans le temps.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vos campus, services et horaires de service doivent être configurés. Voir [Configuration des présences](setup.md).
- La saisie d'un nombre de participants nécessite l'autorisation **Présences &gt; Modifier** ; la consultation du rapport de tendance nécessite **Présences &gt; Consulter**. Voir [Rôles et autorisations](../settings/roles-permissions.md).

</div>

:::info
Le nombre de participants est une alternative globale à [l'enregistrement des présences](recording-attendance.md). Si vous devez savoir **qui** a participé — par exemple pour faire un suivi auprès des personnes qui ne sont pas revenues —, continuez d'utiliser les présences nominatives par séance dans les Séances d'un groupe. Les nombres de participants ne stockent qu'un chiffre.
:::

## Enregistrer un nombre de participants {#recording-a-headcount}

1. Ouvrez **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Personnes** et cliquez sur **Présences**.
2. Cliquez sur **Saisir un nombre de participants** dans la colonne de gauche.
3. Remplissez le formulaire :
   - **Service** *(obligatoire)*
   - **Horaire de service** — laissez sur **Tous les horaires de service** pour enregistrer un total pour l'ensemble des horaires du service
   - **Groupe** — facultatif ; seuls les groupes dont le suivi des présences est activé sont listés. Laissez vide pour « Aucun groupe (service entier) ».
   - **Date**
   - **Nombre de participants** — le nombre total de personnes présentes (un nombre entier, 0 ou plus)
4. Cliquez sur **Enregistrer**.

Le tableau **Nombres de participants récents**, à côté du formulaire, liste vos dernières saisies avec leur date, leur service, leur horaire de service, leur groupe et leur total. Cliquez sur une ligne pour la recharger dans le formulaire si vous devez la corriger ou la supprimer.

## Rapport Tendance du nombre de participants {#headcount-trend-report}

1. Depuis la même page **Présences**, cliquez sur **Toutes les années** dans la colonne de gauche, puis sélectionnez l'onglet **Tendance du nombre de participants**.
2. Le rapport s'exécute à l'ouverture de l'onglet. Pour le restreindre, choisissez un **Campus**, un **Service**, un **Horaire de service** ou un **Groupe**, puis cliquez sur **Exécuter le rapport**. Il n'y a pas de filtre de dates — le rapport couvre chaque semaine comportant un nombre de participants.

Le rapport affiche les nombres de participants que vous avez enregistrés, additionnés par semaine, sous forme de graphique linéaire et de tableau — dans le même style que les onglets [Tendance des présences et Présences par groupe](tracking-attendance.md). Les nombres de participants saisis pour la semaine en cours apparaissent aussi sous **Nombres de participants cette semaine** sur la page principale des Présences.

## Pages connexes {#related-pages}

- [Enregistrement des présences](recording-attendance.md) — présences nominatives par séance, personne par personne
- [Suivi des présences](tracking-attendance.md) — rapports de présences et de tendance par groupe
- [Configuration des présences](setup.md) — configurer les campus, les services et les horaires de service
