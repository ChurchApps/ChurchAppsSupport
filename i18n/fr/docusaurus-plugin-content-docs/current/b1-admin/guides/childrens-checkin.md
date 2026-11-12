---
title: "Guide : Configurer l'enregistrement du ministère des enfants"
description: "Configurez l'enregistrement des enfants dans B1 Admin : associez les familles, créez des groupes par tranche d'âge, configurez les services et imprimez les badges pour la borne B1 Checkin."
---

# Configurer l'enregistrement du ministère des enfants

<div class="article-intro">

Ce guide vous accompagne dans tout ce qu'il faut pour mettre en place un système d'enregistrement des enfants dans votre église -- de la saisie des familles dans la base de données jusqu'à l'impression des badges le dimanche matin, en passant par la configuration de groupes adaptés à l'âge. Au terme de ce guide, les parents pourront enregistrer leurs enfants sur une tablette-borne et recevoir une étiquette de sécurité correspondante.

</div>

## Vidéo de formation {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Configurer l'enregistrement des enfants dans B1" next="Enregistrer et suivre les présences dans B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez le compte de votre église sur [admin.b1.church](https://admin.b1.church)
- Assurez-vous d'avoir un accès administrateur -- consultez [Rôles et autorisations](../people/roles-permissions.md) si nécessaire
- Facultatif : préparez un fichier CSV des familles si vous migrez depuis un autre système

</div>

## Étape 1 : Ajouter les familles à votre base de données {#step-1-add-families-to-your-database}

Avant que l'enregistrement puisse fonctionner, le système doit connaître vos familles. Chaque enfant doit être relié à un parent par la fonction de foyer.

Suivez le guide [Ajouter des personnes](../people/adding-people.md) pour ajouter au moins une famille. Assurez-vous de :

- Ajouter d'abord le ou les parents
- Ajouter chaque enfant
- Les relier dans le même foyer à l'aide de l'[éditeur de foyers](../people/adding-people.md#managing-households)

:::tip
Si vous avez plus d'une poignée de familles à ajouter, utilisez plutôt l'outil [Importation CSV](../people/importing-data.md) au lieu de les ajouter une par une. Vous pouvez importer tout votre répertoire en quelques minutes.
:::

## Étape 2 : Créer les groupes pour les enfants {#step-2-create-childrens-groups}

Les groupes définissent les classes dans lesquelles les enfants s'enregistrent. Vous voudrez généralement un groupe par tranche d'âge.

Suivez le guide [Créer des groupes](../groups/creating-groups.md) pour créer des groupes comme :

- **Garderie** (0 à 2 ans)
- **Préscolaire** (3 à 5 ans)
- **Élémentaire** (6 à 10 ans)

Vous pouvez ajuster les noms et les tranches d'âge selon la structure de votre ministère. Ensuite, ouvrez les paramètres de chaque groupe (cliquez sur **Modifier** sur la page du groupe) et :

- Réglez **Suivre les présences** sur **Oui** afin que le groupe puisse accueillir des enregistrements
- Activez **Imprimer l'étiquette de nom** (et **Remise aux parents** si vous imprimez des étiquettes de remise)
- Facultativement, définissez les limites **Âge et niveau scolaire** afin que la borne suggère la bonne salle -- voir [Sécurité de l'enregistrement](../attendance/checkin-safety.md)

## Étape 3 : Configurer les campus et les services {#step-3-configure-campuses-and-services}

L'enregistrement est lié à des horaires de service précis. Vous devez avoir au moins un campus et un service configurés.

Suivez le guide [Configuration des présences](../attendance/setup.md) pour :

1. Aller dans **Personnes > Présences** et cliquer sur **Configuration**
2. Ajouter votre campus (par exemple « Campus principal »)
3. Ajouter un service (par exemple « Dimanche matin »)
4. Ajouter l'horaire de service (par exemple « 9 h 00 ») et, facultativement, un [calendrier d'enregistrement](../attendance/setup.md#setting-a-check-in-schedule) afin que l'enregistrement s'ouvre automatiquement avant chaque service et se ferme après celui-ci
5. Relier chaque groupe pour enfants à l'horaire de service : ouvrez le groupe, cliquez sur **Modifier**, choisissez l'horaire dans **Ajouter un horaire de service**, puis cliquez sur le bouton plus

## Étape 4 : Configurer l'application d'enregistrement {#step-4-set-up-the-check-in-app}

Connectez maintenant le tout en installant l'application d'enregistrement sur une tablette.

1. Installez l'**application B1 Checkin** -- consultez l'article [Enregistrement](../attendance/check-in.md) pour les liens de téléchargement
2. Connectez-vous avec un compte disposant de l'autorisation de présence **Checkin** (ou **Modifier les présences**) -- voir [Comptes kiosque d'enregistrement](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Sélectionnez votre campus et votre horaire de service

Consultez l'article complet [Enregistrement](../attendance/check-in.md) pour les étapes de configuration détaillées.

## Étape 5 : Se procurer le matériel {#step-5-get-your-hardware}

Vous avez besoin d'une tablette pour la borne et, facultativement, d'une imprimante d'étiquettes Brother pour les badges.

Au minimum :
- **Une tablette iPad, Android ou Amazon Fire** -- voir les [tablettes recommandées](../attendance/check-in.md#recommended-hardware)
- **Une imprimante d'étiquettes Brother** -- la QL-1110NWB est recommandée pour sa prise en charge du Bluetooth et du Wi-Fi
- **Des étiquettes Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Seules les imprimantes d'étiquettes Brother sont compatibles avec l'application B1 Checkin. Les imprimantes d'autres marques ne fonctionneront pas.
:::

## Étape 6 : Effectuer un enregistrement test {#step-6-run-a-test-check-in}

Avant le dimanche matin, faites un essai :

1. Ouvrez l'application B1 Checkin sur votre tablette
2. Sélectionnez votre campus et le bon horaire de service
3. Recherchez l'une des familles que vous avez ajoutées
4. Enregistrez un enfant et vérifiez :
   - que la présence apparaît dans B1 Admin sous **Personnes > Présences**
   - si vous utilisez une imprimante, qu'un badge s'imprime correctement

:::tip
Formez vos bénévoles de l'accueil au processus d'enregistrement avant le lancement. Une présentation rapide de 5 minutes suffit généralement.
:::

## Terminé ! {#youre-done}

Votre enregistrement du ministère des enfants est prêt. Les parents peuvent rechercher leur famille, sélectionner leurs enfants et s'enregistrer à la borne. Les présences sont enregistrées automatiquement dans B1 Admin.

## Articles connexes {#related-articles}

- [Ajouter des personnes](../people/adding-people.md) — ajoutez d'autres familles au fil de leurs visites
- [Créer des groupes](../groups/creating-groups.md) — gérez les groupes de vos enfants
- [Configuration des présences](../attendance/setup.md) — configurez les campus et les services
- [Enregistrement](../attendance/check-in.md) — configuration détaillée de l'application d'enregistrement et du matériel
- [Suivi des présences](../attendance/tracking-attendance.md) — consultez les rapports d'enregistrement
