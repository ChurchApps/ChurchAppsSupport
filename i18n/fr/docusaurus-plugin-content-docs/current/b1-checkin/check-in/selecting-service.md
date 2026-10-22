---
title: "Sélectionner un service"
---

# Sélectionner un service {#selecting-a-service}

<div class="article-intro">

La première étape de chaque enregistrement consiste à choisir le service auquel vous assistez. L'écran des services apparaît juste après que l'application a fini de se charger et détermine quelles heures de service et quels groupes sont disponibles pour la suite du parcours d'enregistrement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Connectez-vous](../getting-started/logging-in) à l'application B1 Church Checkin et sélectionnez votre église
- Assurez-vous que votre administrateur d'église a [configuré les services et les heures de service](../../b1-admin/attendance/setup.md) dans B1 Admin

</div>

## Fonctionnement {#how-it-works}

1. Après la connexion (ou après la connexion automatique lors des visites suivantes), l'application affiche l'**écran des services**.
2. Vous verrez la liste de tous les services configurés pour votre église. Chaque service apparaît sous forme de carte affichant son nom (par exemple « Dimanche matin » ou « Mercredi soir »).
3. Touchez le service auquel vous assistez.

L'application charge les heures de service et les groupes associés à ce service, puis vous mène à l'[écran de recherche de membre](./looking-up-members).

## Lorsque l'enregistrement n'est pas ouvert {#when-check-in-isnt-open}

Si votre administrateur a attribué à une heure de service un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'application ne permet aux familles de choisir cette heure de service que lorsque sa fenêtre d'enregistrement est ouverte. Les heures de service dont la fenêtre est fermée en ce moment apparaissent toujours sur [l'écran du foyer](./household-review), mais elles sont marquées **Fermé** (par exemple **Fermé · ouvre dim 9 h 30**) au lieu de proposer un bouton de groupe.

Si toutes les heures de service du service que vous avez touché sont fermées, l'application vous indique quand l'enregistrement ouvre -- par exemple **« L'enregistrement pour ce service ouvre dim 9 h 30. »** (Si aucune heure d'ouverture ne peut être affichée, le message indique **« L'enregistrement n'est pas ouvert pour ce service en ce moment. »**) Touchez **Retour** pour revenir à la liste des services et en choisir un autre, ou attendez l'ouverture de la fenêtre pour réessayer.

:::info
Les fenêtres d'enregistrement suivent le fuseau horaire du campus du service. Si ce campus n'a pas de fuseau horaire défini, c'est celui de votre église qui est utilisé. Si une heure de service semble s'ouvrir à la mauvaise heure, demandez à votre administrateur de vérifier le fuseau horaire dans les paramètres du campus ou de l'église. Sur l'écran du foyer, la borne utilise aussi l'horloge de la tablette pour ouvrir et fermer les heures de service; assurez-vous donc que la tablette est réglée à la bonne heure et au bon fuseau horaire.
:::

:::info
Les services sont configurés par votre administrateur d'église dans B1 Admin, sous la section Présences. Si vous ne voyez pas le service attendu, demandez à votre administrateur de vérifier qu'il a été créé dans la [configuration des présences](../../b1-admin/attendance/setup.md).
:::

## Ce qui se passe en coulisses {#what-happens-behind-the-scenes}

Lorsque vous sélectionnez un service, l'application récupère trois éléments auprès du serveur :

- Les **heures de service** de ce service (par exemple, un même service peut avoir un créneau à 9 h et un créneau à 11 h).
- Les **groupes** disponibles à chaque heure de service (par exemple, Garderie, Préscolaire, Élémentaire).
- Les **liens groupe-heure de service** qui déterminent quels groupes sont disponibles à quelles heures.

Ces données sont mises en cache localement afin que le reste du processus d'enregistrement soit rapide et réactif.

:::tip
Si votre église n'a configuré qu'un seul service, vous devez tout de même le toucher pour continuer. L'application ne sélectionne pas automatiquement un service unique.
:::

## Étape suivante {#next-step}

Après avoir sélectionné un service, vous [recherchez votre famille](./looking-up-members) par numéro de téléphone ou par nom.
