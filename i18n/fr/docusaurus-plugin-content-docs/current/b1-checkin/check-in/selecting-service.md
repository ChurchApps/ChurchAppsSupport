---
title: "Choisir un service"
---

# Choisir un service

<div class="article-intro">

La première étape de tout enregistrement consiste à choisir le service auquel vous participez. L'écran des services apparaît juste après le chargement de l'application et détermine les créneaux de culte et les groupes disponibles pour la suite du parcours d'enregistrement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Connectez-vous](../getting-started/logging-in) à l'application B1 Church Checkin et sélectionnez votre église
- Vérifiez que votre administrateur d'église a [configuré les services et les créneaux de culte](../../b1-admin/attendance/setup.md) dans B1 Admin

</div>

## Fonctionnement

1. Après la connexion (ou après la connexion automatique lors des visites suivantes), l'application affiche l'**écran des services**.
2. Vous voyez la liste de tous les services configurés pour votre église. Chaque service apparaît sous forme de carte affichant son nom (par exemple « Culte du dimanche matin » ou « Soirée du mercredi »).
3. Appuyez sur le service auquel vous participez.

L'application charge les créneaux de culte et les groupes associés à ce service, puis vous mène à l'[écran de recherche des membres](./looking-up-members).

## Lorsque l'enregistrement n'est pas ouvert

Si votre administrateur a attribué à un créneau de culte un [calendrier d'enregistrement](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'application ne permet aux familles de choisir ce créneau que lorsque sa fenêtre d'enregistrement est ouverte. Les créneaux dont la fenêtre est fermée actuellement restent visibles sur [l'écran du foyer](./household-review), mais sont marqués **Fermé** (par exemple **Fermé · ouvre dim. 9:30**) au lieu de proposer un bouton de groupe.

Si tous les créneaux de culte du service que vous avez touché sont fermés, l'application vous indique quand l'enregistrement ouvre, par exemple **« L'enregistrement pour ce service ouvre dim. 9:30. »** (Si aucune heure d'ouverture ne peut être affichée, le message indique **« L'enregistrement n'est pas ouvert pour ce service actuellement. »**) Appuyez sur **Retour** pour revenir à la liste des services et en choisir un autre, ou attendez l'ouverture de la fenêtre et réessayez.

:::info
Les fenêtres d'enregistrement suivent le fuseau horaire du site du service. Si ce site n'a pas de fuseau horaire défini, c'est celui de votre église qui est utilisé. Si un créneau de culte semble s'ouvrir à la mauvaise heure, demandez à votre administrateur de vérifier le fuseau horaire dans les paramètres du site ou de l'église. Sur l'écran du foyer, la borne utilise également l'horloge de la tablette pour ouvrir et fermer les créneaux : assurez-vous donc que la tablette est réglée sur la bonne heure et le bon fuseau horaire.
:::

:::info
Les services sont configurés par l'administrateur de votre église dans B1 Admin, dans la section Présence. Si vous ne voyez pas le service attendu, demandez à votre administrateur de vérifier qu'il a bien été créé dans la [configuration de la présence](../../b1-admin/attendance/setup.md).
:::

## Ce qui se passe en coulisses

Lorsque vous sélectionnez un service, l'application récupère trois éléments auprès du serveur :

- les **créneaux de culte** de ce service (par exemple, un même service peut comporter un créneau à 9:00 et un autre à 11:00) ;
- les **groupes** disponibles à chaque créneau de culte (par exemple Crèche, Maternelle, Élémentaire) ;
- les **liens groupe-créneau** qui déterminent quels groupes sont disponibles à quels créneaux.

Ces données sont mises en cache localement afin que la suite du processus d'enregistrement soit rapide et réactive.

:::tip
Si votre église n'a configuré qu'un seul service, vous devez tout de même le toucher pour continuer. L'application ne sélectionne pas automatiquement un service unique.
:::

## Étape suivante

Après avoir sélectionné un service, vous [rechercherez votre famille](./looking-up-members) par numéro de téléphone ou par nom.
