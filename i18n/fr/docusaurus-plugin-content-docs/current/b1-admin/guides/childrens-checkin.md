---
title: "Guide : Configurer l'enregistrement du ministère des enfants"
---

# Configurer l'enregistrement du ministère des enfants

<div class="article-intro">

Ce guide vous accompagne dans toutes les étapes nécessaires pour mettre en place un système d'enregistrement pour les enfants dans votre église -- de la saisie des familles dans la base de données, à la configuration de groupes adaptés à chaque tranche d'âge, jusqu'à l'impression des badges le dimanche matin. Au terme de ce guide, les parents pourront enregistrer leurs enfants sur une tablette-borne et recevoir une étiquette de sécurité correspondante.

</div>

## Vidéo de formation

<YouTube id="Ep9CBUcJwPI" title="Configurer l'enregistrement des enfants dans B1" next="Enregistrer et suivre la présence dans B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez le compte de votre église à [admin.b1.church](https://admin.b1.church)
- Assurez-vous de disposer d'un accès administrateur -- consultez [Rôles et autorisations](../people/roles-permissions.md) si nécessaire
- Facultatif : préparez un fichier CSV des familles si vous migrez depuis un autre système

</div>

## Étape 1 : Ajouter les familles à votre base de données

Avant que l'enregistrement puisse fonctionner, le système doit connaître vos familles. Chaque enfant doit être relié à un parent grâce à la fonction de foyer.

Suivez le guide [Ajouter des personnes](../people/adding-people.md) pour ajouter au moins une famille. Assurez-vous de :

- Ajouter d'abord le ou les parents
- Ajouter chaque enfant
- Les relier dans le même foyer à l'aide de [l'éditeur de foyers](../people/adding-people.md#managing-households)

:::tip
Si vous avez plus d'une poignée de familles à ajouter, utilisez l'outil [Importation CSV](../people/importing-data.md) au lieu de les ajouter une par une. Vous pouvez importer tout votre répertoire en quelques minutes.
:::

## Étape 2 : Créer les groupes pour les enfants

Les groupes définissent les classes dans lesquelles les enfants s'enregistrent. Vous voudrez généralement un groupe par tranche d'âge.

Suivez le guide [Créer des groupes](../groups/creating-groups.md) pour créer des groupes comme :

- **Pouponnière** (0 à 2 ans)
- **Préscolaire** (3 à 5 ans)
- **Primaire** (6 à 10 ans)

Vous pouvez modifier les noms et les tranches d'âge pour les adapter à la structure de votre ministère.

## Étape 3 : Configurer les campus et les services

L'enregistrement est lié à des horaires de service précis. Vous devez configurer au moins un campus et un service.

Suivez le guide [Configuration de la présence](../attendance/setup.md) pour :

1. Ajouter votre campus (par exemple « Campus principal »)
2. Ajouter un service (par exemple « Dimanche matin »)
3. Définir l'horaire de service (par exemple « 9 h 00 ») et, facultativement, un [calendrier d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) pour que l'enregistrement s'ouvre automatiquement avant chaque service et se ferme après celui-ci
4. Associer les groupes de vos enfants au service

## Étape 4 : Configurer l'application d'enregistrement

Connectez maintenant tous les éléments en installant l'application d'enregistrement sur une tablette.

1. Installez l'application **B1 Checkin** -- consultez l'article [Enregistrement](../attendance/check-in.md) pour les liens de téléchargement
2. Connectez-vous avec vos identifiants B1 Admin
3. Sélectionnez votre campus et l'horaire de service

Consultez l'article complet [Enregistrement](../attendance/check-in.md) pour les étapes détaillées de configuration.

## Étape 5 : Se procurer le matériel

Vous avez besoin d'une tablette pour la borne et, facultativement, d'une imprimante d'étiquettes Brother pour les badges.

Au minimum :
- **Une tablette Android ou Amazon Fire** -- consultez les [tablettes recommandées](../attendance/check-in.md#recommended-hardware)
- **Une imprimante d'étiquettes Brother** -- la QL-1110NWB est recommandée pour sa prise en charge du Bluetooth et du Wi-Fi
- **Étiquettes Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques ne fonctionneront pas.
:::

## Étape 6 : Effectuer un essai d'enregistrement

Avant le dimanche matin, faites un essai :

1. Ouvrez l'application B1 Checkin sur votre tablette
2. Sélectionnez votre campus et le bon horaire de service
3. Recherchez l'une des familles que vous avez ajoutées
4. Enregistrez un enfant et vérifiez :
   - que la présence apparaît dans B1 Admin sous **Présence**
   - si vous utilisez une imprimante, qu'un badge s'imprime correctement

:::tip
Formez les bénévoles de votre équipe d'accueil au processus d'enregistrement avant le lancement. Une présentation rapide de 5 minutes suffit généralement.
:::

## Vous avez terminé !

L'enregistrement de votre ministère des enfants est prêt. Les parents peuvent rechercher leur famille, sélectionner leurs enfants et s'enregistrer à la borne. La présence est automatiquement enregistrée dans B1 Admin.

## Articles connexes

- [Ajouter des personnes](../people/adding-people.md) -- ajoutez d'autres familles à mesure qu'elles visitent
- [Créer des groupes](../groups/creating-groups.md) -- gérez les groupes de vos enfants
- [Configuration de la présence](../attendance/setup.md) -- configurez les campus et les services
- [Enregistrement](../attendance/check-in.md) -- configuration détaillée de l'application d'enregistrement et du matériel
- [Suivi de la présence](../attendance/tracking-attendance.md) -- consultez les rapports d'enregistrement
