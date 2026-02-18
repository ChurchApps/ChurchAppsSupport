---
title: "Guide : Mettre en place l'enregistrement pour le ministère des enfants"
---

# Mettre en place l'enregistrement pour le ministère des enfants

<div class="article-intro">

Ce guide vous accompagne à travers toutes les étapes nécessaires pour mettre en place un système d'enregistrement des enfants dans votre église -- de la saisie des familles dans la base de données, à la configuration des groupes par tranche d'âge, jusqu'à l'impression des étiquettes nominatives le dimanche matin. À la fin, les parents pourront enregistrer leurs enfants sur une tablette kiosque et recevoir une étiquette de sécurité correspondante.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez le compte de votre église sur [admin.b1.church](https://admin.b1.church)
- Assurez-vous de disposer d'un accès administrateur -- consultez [Rôles et autorisations](../people/roles-permissions.md) si nécessaire
- Facultatif : Préparez un fichier CSV des familles si vous migrez depuis un autre système

</div>

## Étape 1 : Ajouter des familles à votre base de données

Avant que l'enregistrement puisse fonctionner, le système doit connaître vos familles. Chaque enfant doit être lié à un parent via la fonctionnalité de foyer.

Suivez le guide [Ajouter des personnes](../people/adding-people.md) pour ajouter au moins une famille. Assurez-vous de :

- Ajouter le(s) parent(s) en premier
- Ajouter chaque enfant
- Les lier dans le même foyer à l'aide de l'[éditeur de foyer](../people/adding-people.md#gérer-les-foyers)

:::tip
Si vous avez plus qu'une poignée de familles à ajouter, utilisez l'outil d'[import CSV](../people/importing-data.md) plutôt que de les ajouter une par une. Vous pouvez importer l'intégralité de votre répertoire en quelques minutes.
:::

## Étape 2 : Créer des groupes pour les enfants

Les groupes définissent les classes dans lesquelles les enfants s'enregistrent. Vous souhaiterez généralement un groupe par tranche d'âge.

Suivez le guide [Créer des groupes](../groups/creating-groups.md) pour créer des groupes tels que :

- **Crèche** (0-2 ans)
- **Maternelle** (3-5 ans)
- **Primaire** (6-10 ans)

Vous pouvez ajuster les noms et les tranches d'âge pour correspondre à la structure de votre ministère.

## Étape 3 : Configurer les campus et les cultes

L'enregistrement est lié à des horaires de culte spécifiques. Vous avez besoin d'au moins un campus et un culte configurés.

Suivez le guide [Configuration des présences](../attendance/setup.md) pour :

1. Ajouter votre campus (par exemple, « Campus principal »)
2. Ajouter un culte (par exemple, « Culte du dimanche matin »)
3. Définir l'horaire du culte (par exemple, « 9h00 »)
4. Affecter vos groupes d'enfants au culte

## Étape 4 : Configurer l'application d'enregistrement

Maintenant, connectez le tout en installant l'application d'enregistrement sur une tablette.

1. Installez l'**application B1 Checkin** -- consultez l'article [Enregistrement](../attendance/check-in.md) pour les liens de téléchargement
2. Connectez-vous avec vos identifiants B1 Admin
3. Sélectionnez votre campus et l'horaire du culte

Consultez l'article complet sur l'[Enregistrement](../attendance/check-in.md) pour les étapes de configuration détaillées.

## Étape 5 : Obtenir votre matériel

Vous avez besoin d'une tablette pour le kiosque et éventuellement d'une imprimante d'étiquettes Brother pour les badges nominatifs.

Au minimum :
- **Une tablette Android ou Amazon Fire** -- consultez les [tablettes recommandées](../attendance/check-in.md#matériel-recommandé)
- **Une imprimante d'étiquettes Brother** -- la QL-1110NWB est recommandée pour sa prise en charge Bluetooth et WiFi
- **Étiquettes Brother DK-1201** (29 mm x 90 mm)

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les autres marques d'imprimantes ne fonctionneront pas.
:::

## Étape 6 : Effectuer un test d'enregistrement

Avant le dimanche matin, faites un essai :

1. Ouvrez l'application B1 Checkin sur votre tablette
2. Sélectionnez votre campus et l'horaire de culte correct
3. Recherchez l'une des familles que vous avez ajoutées
4. Enregistrez un enfant et vérifiez :
   - La présence apparaît dans B1 Admin sous **Présences**
   - Si vous utilisez une imprimante, une étiquette nominative s'imprime correctement

:::tip
Formez les bénévoles de votre équipe d'accueil au processus d'enregistrement avant le lancement. Une démonstration rapide de 5 minutes suffit généralement.
:::

## C'est terminé !

L'enregistrement de votre ministère des enfants est prêt. Les parents peuvent rechercher leur famille, sélectionner leurs enfants et s'enregistrer au kiosque. Les présences sont automatiquement enregistrées dans B1 Admin.

## Articles connexes

- [Ajouter des personnes](../people/adding-people.md) — ajouter de nouvelles familles au fur et à mesure de leurs visites
- [Créer des groupes](../groups/creating-groups.md) — gérer vos groupes d'enfants
- [Configuration des présences](../attendance/setup.md) — configurer les campus et les cultes
- [Enregistrement](../attendance/check-in.md) — configuration détaillée de l'application d'enregistrement et du matériel
- [Suivi des présences](../attendance/tracking-attendance.md) — consulter les rapports d'enregistrement
