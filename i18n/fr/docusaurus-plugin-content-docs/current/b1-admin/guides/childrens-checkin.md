---
title: "Guide : configurer le pointage du ministère des enfants"
description: "Configurez l'enregistrement des enfants dans B1 Admin : reliez les familles, créez des groupes par tranche d'âge, configurez les services et imprimez les étiquettes de nom pour le kiosque B1 Checkin."
---

# Configurer le pointage du ministère des enfants

<div class="article-intro">

Ce guide vous accompagne dans tout ce qu'il faut pour mettre en place un système de pointage pour enfants dans votre église -- de l'enregistrement des familles dans la base de données jusqu'à la configuration des groupes adaptés à l'âge, en passant par l'impression des étiquettes de nom le dimanche matin. Au terme de ces étapes, les parents pourront pointer leurs enfants sur une tablette-borne et recevoir une étiquette de sécurité correspondante.

</div>

## Vidéo de formation

<YouTube id="Ep9CBUcJwPI" title="Configurer le pointage des enfants dans B1" next="Enregistrer et suivre les présences dans B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez le compte de votre église sur [admin.b1.church](https://admin.b1.church)
- Assurez-vous d'avoir un accès administrateur -- voir [Rôles et autorisations](../people/roles-permissions.md) au besoin
- Facultatif : préparez un fichier CSV des familles si vous migrez depuis un autre système

</div>

## Étape 1 : ajouter les familles à votre base de données

Avant que le pointage puisse fonctionner, le système doit connaître vos familles. Chaque enfant doit être lié à un parent grâce à la fonction de foyer.

Suivez le guide [Ajouter des personnes](../people/adding-people.md) pour ajouter au moins une famille. Assurez-vous de :

- Ajouter d'abord le ou les parents
- Ajouter chaque enfant
- Les relier au même foyer grâce à l'[éditeur de foyer](../people/adding-people.md#managing-households)

:::tip
Si vous avez plus d'une poignée de familles à ajouter, utilisez l'outil [Importation CSV](../people/importing-data.md) au lieu de les ajouter une à une. Vous pouvez importer tout votre répertoire en quelques minutes.
:::

## Étape 2 : créer les groupes pour les enfants

Les groupes définissent les classes auxquelles les enfants se pointent. Vous voudrez généralement un groupe par tranche d'âge.

Suivez le guide [Créer des groupes](../groups/creating-groups.md) pour créer des groupes tels que :

- **Garderie** (0 à 2 ans)
- **Préscolaire** (3 à 5 ans)
- **Primaire** (6 à 10 ans)

Vous pouvez adapter les noms et les tranches d'âge à la structure de votre ministère.

## Étape 3 : configurer les campus et les services

Le pointage est lié à des horaires de service précis. Vous avez besoin d'au moins un campus et un service configurés.

Suivez le guide [Configuration des présences](../attendance/setup.md) pour :

1. Ajouter votre campus (par exemple « Campus principal »)
2. Ajouter un service (par exemple « Dimanche matin »)
3. Définir l'horaire de service (par exemple « 9 h 00 ») et, facultativement, un [calendrier de pointage](../attendance/setup.md#setting-a-check-in-schedule) afin que le pointage s'ouvre automatiquement avant chaque service et se ferme après celui-ci
4. Attribuer les groupes de vos enfants au service

## Étape 4 : configurer l'application de pointage

Reliez maintenant le tout en installant l'application de pointage sur une tablette.

1. Installez l'**application B1 Checkin** -- consultez l'article [Pointage](../attendance/check-in.md) pour les liens de téléchargement
2. Connectez-vous avec vos identifiants B1 Admin
3. Sélectionnez votre campus et l'horaire de service

Consultez l'article complet [Pointage](../attendance/check-in.md) pour les étapes de configuration détaillées.

## Étape 5 : se procurer le matériel

Vous avez besoin d'une tablette pour la borne et, facultativement, d'une imprimante d'étiquettes Brother pour les étiquettes de nom.

Au minimum :
- **Une tablette Android ou Amazon Fire** -- voir les [tablettes recommandées](../attendance/check-in.md#recommended-hardware)
- **Une imprimante d'étiquettes Brother** -- le QL-1110NWB est recommandé pour sa prise en charge du Bluetooth et du WiFi
- **Étiquettes Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques ne fonctionneront pas.
:::

## Étape 6 : effectuer un pointage test

Avant le dimanche matin, faites un essai :

1. Ouvrez l'application B1 Checkin sur votre tablette
2. Sélectionnez votre campus et le bon horaire de service
3. Recherchez l'une des familles que vous avez ajoutées
4. Pointez un enfant et vérifiez :
   - que la présence apparaît dans B1 Admin sous **Présences**
   - si vous utilisez une imprimante, qu'une étiquette de nom s'imprime correctement

:::tip
Formez vos bénévoles de l'accueil au processus de pointage avant le lancement. Un bref tour d'horizon de 5 minutes suffit généralement.
:::

## Vous avez terminé !

Votre pointage pour le ministère des enfants est prêt. Les parents peuvent rechercher leur famille, sélectionner leurs enfants et pointer à la borne. Les présences sont automatiquement enregistrées dans B1 Admin.

## Articles connexes

- [Ajouter des personnes](../people/adding-people.md) — ajouter d'autres familles au fil de leurs visites
- [Créer des groupes](../groups/creating-groups.md) — gérer les groupes de vos enfants
- [Configuration des présences](../attendance/setup.md) — configurer les campus et les services
- [Pointage](../attendance/check-in.md) — configuration détaillée de l'application de pointage et du matériel
- [Suivi des présences](../attendance/tracking-attendance.md) — consulter les rapports de pointage
