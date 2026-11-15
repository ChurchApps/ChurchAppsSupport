---
title: "Listes enregistrées"
description: "Enregistrez une recherche de personnes dans B1 Admin sous forme de liste nommée, puis rechargez-la en un clic. Les listes restent actives : les nouveaux membres correspondants apparaissent automatiquement."
---

# Listes enregistrées

<div class="article-intro">

Les **listes enregistrées** vous permettent de conserver une requête de recherche sous un nom et de la relancer en un clic à tout moment. Créez une liste une seule fois -- « Membres actifs du campus Nord », « Visiteurs des 90 derniers jours », ou n'importe quel filtre avancé -- et elle restera en haut de la page Personnes, sans que vous ayez jamais à reconstruire la requête.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Effectuez au moins une recherche dans la section Personnes afin d'avoir des résultats à enregistrer. Voir [Rechercher des personnes](./searching-people.md) ou [Recherche IA](./ai-search.md).
- Enregistrer, modifier et supprimer des listes nécessite l'autorisation **Modifier les personnes**. Voir [Attribuer des rôles](./roles-permissions.md).

</div>

## Enregistrer une recherche comme liste {#saving-a-search-as-a-list}

1. Effectuez une recherche sur la page **Personnes** -- une recherche rapide, une recherche IA ou une recherche avec filtres avancés.
2. Lorsque la recherche trouve au moins une personne, un bouton **Enregistrer comme liste** apparaît dans l'en-tête de la page Personnes.
3. Cliquez sur **Enregistrer comme liste**.
4. Saisissez un **Nom de la liste** (obligatoire).
5. Vous pouvez éventuellement saisir une **Catégorie** pour regrouper des listes apparentées (par exemple « Rayonnement » ou « Appartenance »).
6. Sous **Qui peut voir cette liste**, choisissez **Tout le personnel** ou **Moi seulement**.
7. Sous **Correspondance**, choisissez **Tous les filtres** (les personnes doivent correspondre à chaque filtre) ou **Au moins un filtre** (les personnes qui correspondent à au moins un filtre).
8. Sous **Inclure le foyer**, choisissez **Correspondances uniquement**, **Enfants des personnes correspondantes** (ajoute aussi les enfants du foyer de chaque personne correspondante) ou **Foyer entier** (ajoute toutes les personnes du foyer de chaque personne correspondante).
9. Vous pouvez éventuellement cocher **Actualiser chaque nuit** (voir [Actualisation nocturne](#nightly-refresh) ci-dessous). Lorsque cette option est cochée, vous pouvez aussi cocher **M'envoyer un courriel en cas de changement d'appartenance**.
10. Cliquez sur **Enregistrer**.

La liste est désormais enregistrée et apparaît sous forme de bouton dans la rangée des listes enregistrées en haut de la page Personnes, à côté de **Tout le monde**. Les listes marquées **Moi seulement** affichent une petite icône de cadenas.

:::info
Les listes réglées sur **Tout le personnel** sont partagées dans toute votre église : toute personne ayant accès aux Personnes peut les voir et les charger. Seul le personnel disposant de l'autorisation appropriée peut modifier ou supprimer des listes.
:::

## Charger une liste enregistrée {#loading-a-saved-list}

En haut de la page Personnes, cliquez sur le nom d'une liste. La recherche se relance instantanément avec la requête enregistrée et met à jour les résultats. Cliquez sur **Tout le monde** pour revenir à l'ensemble de votre annuaire.

Les listes sont regroupées par catégorie (si vous en avez attribué une), les listes sans catégorie apparaissant en dernier.

:::tip
Les listes sont des **requêtes actives**, et non des instantanés. Chaque fois que vous chargez une liste, la recherche s'exécute à nouveau sur vos données actuelles : les nouvelles personnes qui répondent désormais aux critères y apparaîtront.
:::

## Renommer et supprimer des listes {#renaming-and-deleting-lists}

Le personnel disposant de l'autorisation de gestion peut renommer ou supprimer n'importe quelle liste depuis la page Personnes. Commencez par charger la liste en cliquant dessus : deux icônes apparaissent alors à côté de son nom :

- Cliquez sur l'icône **Paramètres de la liste** (roue dentée) pour la renommer ou modifier sa catégorie et son partage. Les listes enregistrées avec ces options peuvent aussi modifier ici **Inclure le foyer**, **Actualiser chaque nuit** et **M'envoyer un courriel en cas de changement d'appartenance**. Le paramètre **Correspondance** ne peut plus être modifié une fois la liste enregistrée.
- Cliquez sur l'icône **Supprimer** (corbeille) pour supprimer la liste (une confirmation vous sera demandée).

## Actualisation nocturne {#nightly-refresh}

Charger une liste exécute toujours sa recherche à nouveau, que l'option **Actualiser chaque nuit** soit cochée ou non. Cette option demande en plus à B1 de relancer la liste chaque nuit et de suivre les personnes qui y entrent ou en sortent. Si vous avez coché **M'envoyer un courriel en cas de changement d'appartenance**, B1 vous envoie un courriel (à vous, qui avez enregistré la liste) après une actualisation nocturne ayant ajouté ou retiré des personnes, en indiquant combien de personnes ont été ajoutées et retirées. L'actualisation nocturne transmet aussi les changements d'appartenance à la liste vers vos [intégrations](../integrations/index.md), comme les étiquettes Mailchimp.

## Cas d'utilisation {#use-cases}

| Scénario | Comment créer la liste |
|---|---|
| Tous les visiteurs | Recherche avancée : Statut d'appartenance = Visiteur |
| Membres d'un campus précis | Recherche avancée : Campus = [votre campus] |
| Bénévoles dont la vérification d'antécédents a expiré | Recherche avancée : [Champ personnalisé](../settings/custom-fields.md) « Expiration de la vérification d'antécédents » est antérieur à aujourd'hui |
| Résultats d'une question posée à la recherche IA | Posez une question dans la recherche IA, puis enregistrez |

## Articles connexes {#related-articles}

- [Rechercher des personnes](./searching-people.md) — recherche rapide et personnalisation des colonnes
- [Recherche IA](./ai-search.md) — requêtes en langage naturel que vous pouvez enregistrer comme listes
- [Champs personnalisés](../settings/custom-fields.md) — définissez vos propres champs de personnes, puis filtrez et enregistrez des listes à partir de ceux-ci
- [Démographie](./demographics.md) — transformez un graphique démographique en filtre de la page Personnes, puis enregistrez-le comme liste
- [Modification en masse](./bulk-editing.md) — après avoir chargé une liste, mettez à jour en une fois tous ses membres
