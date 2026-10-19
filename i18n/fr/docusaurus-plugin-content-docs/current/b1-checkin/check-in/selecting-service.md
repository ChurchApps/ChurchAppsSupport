---
title: "Choisir un service"
---

# Choisir un service

<div class="article-intro">

La première étape de chaque enregistrement à l'arrivée consiste à choisir le service auquel vous participez. L'écran des services apparaît dès que l'application a fini de charger et détermine les horaires de service et les groupes disponibles pour la suite du processus d'enregistrement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Connectez-vous](../getting-started/logging-in) à l'application B1 Church Checkin et sélectionnez votre église
- Vérifiez que l'administrateur de votre église a [configuré les services et les horaires de service](../../b1-admin/attendance/setup.md) dans B1 Admin

</div>

## Fonctionnement

1. Après la connexion (ou après la connexion automatique lors des visites suivantes), l'application affiche l'**écran des services**.
2. Vous voyez la liste de tous les services configurés pour votre église. Chaque service apparaît sous forme de carte affichant son nom (par exemple « Culte du dimanche matin » ou « Soirée du mercredi »).
3. Touchez le service auquel vous participez.

L'application charge les horaires de service et les groupes associés à ce service, puis vous amène à l'[écran de recherche de membres](./looking-up-members).

## Lorsque l'enregistrement n'est pas ouvert {#when-check-in-isnt-open}

Si votre administrateur a attribué à un horaire de service un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'application ne propose cet horaire que pendant que sa fenêtre d'enregistrement est ouverte. Les horaires dont la fenêtre est actuellement fermée sont masqués, afin que les familles ne puissent pas les choisir plus tard dans le parcours.

Si tous les horaires du service que vous avez touché sont fermés, l'application affiche le message **« L'enregistrement n'est pas ouvert pour ce service pour le moment. »** Touchez **Retour** pour revenir à la liste des services et en choisir un autre, ou attendez l'ouverture de la fenêtre puis réessayez.

:::info
Les fenêtres d'enregistrement suivent le fuseau horaire de votre église. Si votre église n'a pas de fuseau horaire défini, c'est celui de votre campus qui est utilisé. Si un horaire de service semble s'ouvrir à la mauvaise heure, demandez à votre administrateur de vérifier le fuseau horaire dans les paramètres de votre église ou de votre campus.
:::

:::info
Les services sont configurés par l'administrateur de votre église dans B1 Admin, dans la section Présences. Si vous ne voyez pas le service attendu, demandez à votre administrateur de vérifier qu'il a bien été créé dans la [configuration des présences](../../b1-admin/attendance/setup.md).
:::

## Ce qui se passe en coulisses

Lorsque vous sélectionnez un service, l'application récupère trois éléments auprès du serveur :

- Les **horaires de service** de ce service (par exemple, un même service peut comporter un créneau à 9 h et un autre à 11 h).
- Les **groupes** disponibles à chaque horaire de service (par exemple, Nurserie, Maternelle, Élémentaire).
- Les **liens groupe-horaire de service** qui déterminent quels groupes sont disponibles à quels horaires.

Ces données sont mises en cache localement afin que la suite du processus d'enregistrement soit rapide et réactive.

:::tip
Si votre église n'a qu'un seul service configuré, vous devez tout de même le toucher pour continuer. L'application ne sélectionne pas automatiquement un service unique.
:::

## Étape suivante

Après avoir choisi un service, vous [rechercherez votre famille](./looking-up-members) par numéro de téléphone ou par nom.
