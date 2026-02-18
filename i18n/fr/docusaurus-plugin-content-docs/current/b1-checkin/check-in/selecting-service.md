---
title: "Sélection d'un culte"
---

# Sélection d'un culte

<div class="article-intro">

La première étape de chaque enregistrement consiste à choisir le culte auquel vous assistez. L'écran des cultes apparaît juste après le chargement de l'application et détermine quels horaires de culte et groupes sont disponibles pour la suite du processus d'enregistrement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Connectez-vous](../getting-started/logging-in) à l'application B1 Church Checkin et sélectionnez votre église
- Assurez-vous que l'administrateur de votre église a [configuré les cultes et les horaires de culte](../../b1-admin/attendance/setup.md) dans B1 Admin

</div>

## Comment ça fonctionne

1. Après la connexion (ou après la connexion automatique lors des visites suivantes), l'application affiche l'**écran des cultes**.
2. Vous verrez une liste de tous les cultes configurés pour votre église. Chaque culte apparaît sous forme de carte affichant le nom du culte (par exemple, « Dimanche matin » ou « Mercredi soir »).
3. Appuyez sur le culte auquel vous assistez.

L'application charge les horaires de culte et les groupes associés à ce culte, puis vous amène à l'[écran de recherche de membres](./looking-up-members).

:::info
Les cultes sont configurés par l'administrateur de votre église dans B1 Admin dans la section Présence. Si vous ne voyez pas le culte attendu, demandez à votre administrateur de vérifier qu'il a été créé dans la [configuration de la présence](../../b1-admin/attendance/setup.md).
:::

## Ce qui se passe en coulisses

Lorsque vous sélectionnez un culte, l'application récupère trois éléments depuis le serveur :

- Les **horaires de culte** pour ce culte (par exemple, un même culte peut avoir un créneau à 9h00 et un autre à 11h00).
- Les **groupes** disponibles à chaque horaire de culte (par exemple, Nurserie, Maternelle, Primaire).
- Les **liens groupe-horaire de culte** qui déterminent quels groupes sont disponibles à quels horaires.

Ces données sont mises en cache localement afin que le reste du processus d'enregistrement soit rapide et réactif.

:::tip
Si votre église n'a qu'un seul culte configuré, vous devez tout de même appuyer dessus pour continuer. L'application ne sélectionne pas automatiquement un culte unique.
:::

## Prochaine étape

Après avoir sélectionné un culte, vous allez [rechercher votre famille](./looking-up-members) par numéro de téléphone ou par nom.
