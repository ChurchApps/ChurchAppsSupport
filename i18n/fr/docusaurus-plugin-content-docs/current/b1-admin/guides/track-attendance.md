---
title: "Guide : Suivre la fréquentation de l'église"
description: "Suivez la fréquentation de l'église dans B1 Admin en configurant les campus et les horaires de culte, en l'enregistrant manuellement ou par pointage en libre-service, puis en consultant les rapports."
---

# Suivre la fréquentation de l'église

<div class="article-intro">

Configurez le suivi de la fréquentation de vos cultes et de vos groupes : de la configuration des campus et des horaires de culte, à l'enregistrement manuel ou par la borne de pointage en libre-service, jusqu'à la consultation des tendances dans les rapports. Au terme de ce guide, vous aurez une vue complète de qui participe et à quel moment.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte B1 Admin avec un accès administrateur
- [Personnes ajoutées à votre annuaire](../people/adding-people.md)
- [Groupes créés](../groups/creating-groups.md) pour les ministères que vous souhaitez suivre

</div>

## Étape 1 : Configurer les campus et les cultes {#step-1-configure-campuses--services}

Définissez où et quand votre église se réunit.

Suivez le guide [Configuration de la fréquentation](../attendance/setup.md) pour :

1. Dans le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu), choisir **Personnes > Fréquentation**, puis cliquer sur **Configuration**
2. Ajouter votre campus (par exemple « Campus principal ») et ses cultes
3. Ajouter les horaires des cultes (par exemple « Dimanche 9 h 00 », « Dimanche 11 h 00 », « Mercredi 19 h 00 »)

## Étape 2 : Activer le suivi de fréquentation des groupes {#step-2-enable-group-attendance-tracking}

Activez le suivi de la fréquentation pour les groupes que vous souhaitez surveiller.

Suivez le guide [Créer des groupes](../groups/creating-groups.md) pour :

1. Ouvrir chaque groupe à suivre, cliquer sur **Modifier**, puis définir **Suivre la fréquentation** sur **Oui**
2. Si le groupe se réunit pendant un culte, choisir l'heure dans **Ajouter un horaire de culte** et cliquer sur le bouton plus afin que la fréquentation soit enregistrée pour le bon culte, puis cliquer sur **Enregistrer**

:::info
Tous les groupes n'ont pas besoin d'un suivi de la fréquentation. Activez-le pour les groupes dont vous souhaitez suivre la participation : cours pour enfants, petits groupes, école du dimanche, etc.
:::

## Étape 3 : Enregistrer la fréquentation manuellement {#step-3-record-attendance-manually}

Cochez les personnes présentes à chaque culte et dans chaque groupe.

Suivez le guide [Enregistrer la fréquentation](../attendance/recording-attendance.md) pour :

1. Ouvrir un groupe, cliquer sur **Toutes les séances** dans la section **Séances**, cliquer sur **Nouveau**, puis choisir l'**Horaire de culte** et la **Date de la séance**. Cochez **Ajouter aussi pour les autres _N_ groupes dans _horaire de culte_** pour créer en une seule fois les séances de tous les cours à cet horaire de culte.
2. Cochez les personnes présentes, puis cliquez sur **Enregistrer la fréquentation**

Si vous n'avez besoin que d'un total et non des noms (par exemple, pour le culte principal), cliquez plutôt sur **Saisir le nombre de présents** sur la page **Fréquentation** — voir [Saisie du nombre de présents](../attendance/headcount-entry.md).

:::tip
Le suivi manuel convient parfaitement aux cultes pour adultes, aux petits groupes et à toute situation où une borne de pointage n'est pas pratique.
:::

## Étape 4 : Configurer le pointage en libre-service (facultatif) {#step-4-set-up-self-check-in-optional}

Permettez aux membres de pointer eux-mêmes à l'aide d'une borne tactile.

Suivez le guide [Pointage](../attendance/check-in.md) pour :

1. Installer l'application B1 Checkin sur une tablette pour le pointage en libre-service
2. Les membres recherchent leur nom et se pointent eux-mêmes ainsi que leur famille
3. Les présences enregistrées par pointage apparaissent avec celles saisies manuellement — les données sont identiques

:::info
Pour une configuration complète du ministère des enfants, y compris le matériel et l'imprimante, consultez le [Guide du pointage des enfants](./childrens-checkin.md).
:::

## Étape 5 : Consulter les rapports de fréquentation {#step-5-view-attendance-reports}

Obtenez une vue d'ensemble de la participation dans votre église.

Suivez le guide [Rapports de fréquentation](../reports/attendance-reports.md). Sur la page **Fréquentation**, cliquez sur **Toutes les années** pour retrouver ces rapports sous forme d'onglets :

1. **Tendance de fréquentation** — suivez l'évolution de la fréquentation dans le temps pour repérer une croissance ou un recul
2. **Tendance du nombre de présents** — représentez graphiquement les totaux de présents que vous avez saisis manuellement
3. **Fréquentation des groupes** — consultez qui a participé à chaque séance de groupe sur une période donnée, avec un téléchargement CSV

Pour un décompte jour par jour pour un groupe, ouvrez le rapport **Fréquentation quotidienne des groupes** à l'adresse **admin.b1.church/reports/dailyGroupAttendance**.

:::info
Les rapports de fréquentation combinent les présences enregistrées manuellement et celles du pointage en libre-service. Les données s'affichent de la même façon : les deux méthodes alimentent les mêmes rapports.
:::

## C'est terminé ! {#youre-done}

Votre suivi de la fréquentation est configuré. Que vous enregistriez la présence manuellement, que vous utilisiez l'application de pointage ou les deux, toutes les données alimentent les mêmes rapports afin que vous ayez une vision claire de la participation dans votre église.

## Articles connexes {#related-articles}

- [Configuration de la fréquentation](../attendance/setup.md) — configurer les campus et les cultes
- [Saisie du nombre de présents](../attendance/headcount-entry.md) — enregistrer des totaux sans les noms
- [Enregistrer la fréquentation](../attendance/recording-attendance.md) — enregistrer la présence manuellement
- [Suivre la fréquentation](../attendance/tracking-attendance.md) — consulter les tendances de fréquentation
- [Pointage](../attendance/check-in.md) — l'application de pointage en libre-service
- [Créer des groupes](../groups/creating-groups.md) — créer des groupes avec suivi de la fréquentation
- [Rapports de fréquentation](../reports/attendance-reports.md) — consulter les tendances de fréquentation
- [Guide du pointage des enfants](./childrens-checkin.md) — configuration complète du pointage pour le ministère des enfants
