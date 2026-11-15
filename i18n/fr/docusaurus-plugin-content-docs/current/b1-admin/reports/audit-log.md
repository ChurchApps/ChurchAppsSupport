---
title: "Journal d'audit"
description: "Consultez le journal d'audit dans B1 Admin pour voir qui s'est connecté, qui a modifié des fiches de personnes ou des autorisations, et exportez les entrées filtrées en CSV."
---

# Journal d'audit

<div class="article-intro">

Le journal d'audit enregistre toutes les actions et modifications importantes de votre système de gestion d'église. Utilisez-le pour consulter l'activité de connexion, suivre qui a apporté des modifications aux fiches de personnes, surveiller les mises à jour des autorisations et maintenir la responsabilité au sein de votre équipe.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un rôle disposant de l'autorisation **Modifier les paramètres de l'église** (dans la section **Contenu** des autorisations d'un rôle ; la même autorisation qui ouvre **Paramètres**). Voir [Rôles et autorisations](../settings/roles-permissions.md).

</div>

## Consulter le journal d'audit {#viewing-the-audit-log}

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Journal d'audit**.
3. Le journal affiche les entrées récentes dans un tableau comportant les colonnes suivantes :
   - **Date** -- Le moment où l'action a eu lieu.
   - **Module** -- La partie de B1 dans laquelle la modification a été effectuée (par exemple, les membres ou les dons).
   - **Catégorie** -- Le type d'enregistrement ou d'action (codé par couleur pour une lecture rapide).
   - **Action** -- Ce qui a été fait (par exemple, Don enregistré, Connexion réussie, Note mise à jour).
   - **Entité** -- Le type et l'identifiant de l'enregistrement touché.
   - **Adresse IP** -- L'adresse IP de l'utilisateur qui a effectué l'action.
4. Cliquez sur la flèche au début d'une ligne pour voir ses détails : un tableau de chaque champ modifié avec son **Ancienne valeur** et sa **Nouvelle valeur**, ou l'**Enregistrement supprimé** dans le cas d'une suppression.

## Filtrer le journal {#filtering-the-log}

Utilisez les filtres en haut de la page pour restreindre les résultats :

- **Module** -- Filtrer par domaine : **Tous les modules**, **Personnes**, **Dons**, **Présences**, **Messagerie**, **Contenu**, **Services**, ou **Leçons**.
- **Catégorie** -- Filtrer par type d'action :
  - **Toutes les catégories** -- Afficher tout.
  - **Connexion** -- Connexions réussies et échouées.
  - **Personnes** -- Création, mise à jour ou suppression de fiches de personnes.
  - **Autorisations** -- Attributions et révocations d'autorisations.
  - **Dons** -- Modifications des enregistrements de dons.
  - **Groupes** -- Actions de gestion des groupes.
  - **Formulaires** -- Activité de soumission de formulaires.
  - **Paramètres** -- Modifications de configuration.
- **Date de début** -- Afficher les entrées à partir de cette date.
- **Date de fin** -- Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les catégories {#understanding-categories}

La catégorie de chaque entrée s'affiche sous forme d'étiquette, codée par couleur pour une identification rapide :

- **login** -- Étiquette bleue. Suit les tentatives de connexion réussies et échouées.
- **person** -- Étiquette bleue. Suit la création, la modification et la suppression des fiches de personnes.
- **permission** -- Étiquette rouge. Suit l'attribution ou la révocation des droits d'accès.
- **donation** -- Étiquette verte. Suit les modifications des enregistrements de dons.
- **form** -- Étiquette orange. Suit l'activité de soumission de formulaires.
- **group**, **settings** et les autres catégories (comme **userchurch**) -- Étiquette grise.

## Historique des notes sur les personnes et les groupes {#note-history-on-people-and-groups}

Si vous pouvez ouvrir le journal d'audit, vous voyez aussi une trace des notes modifiées directement là où les notes se trouvent, dans l'onglet **Notes** d'une personne ou d'un groupe :

1. Une note modifiée affiche **(modifiée · voir l'historique)** à côté de sa date. Cliquez dessus pour ouvrir le journal d'audit filtré sur l'historique des notes de cette personne ou de ce groupe.
2. Une note supprimée laisse à sa place un repère grisé **Note supprimée** indiquant qui l'a rédigée, quand elle a été publiée et quand elle a été supprimée. Cliquez sur **Voir l'historique** pour ouvrir le même journal filtré.
3. Dans le journal filtré, développez une entrée **Note mise à jour** ou **Note supprimée** pour voir l'ancien texte et le compte qui a effectué la modification. Cliquez sur **Tout afficher** pour retirer le filtre.
4. Dans la colonne **Entité**, l'identifiant d'une note de personne ou de groupe renvoie vers les notes de cette personne ou de ce groupe.

Le personnel qui ne peut pas ouvrir le journal d'audit voit la liste des notes sans ces repères.

## Exporter le journal {#exporting-the-log}

Lorsque des entrées du journal sont affichées, un bouton **Exporter en CSV** apparaît en haut de la page. Cliquez dessus pour exporter les résultats filtrés actuels dans une feuille de calcul, pour une consultation hors ligne ou une tenue de registres.

## Pagination {#pagination}

Utilisez les commandes de pagination en bas du tableau pour parcourir les résultats. Vous pouvez afficher 25, 50 (par défaut) ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont conservées automatiquement pendant un an. Les entrées de plus de 365 jours sont supprimées pour préserver les performances du système.
:::

:::tip
Consultez le journal d'audit régulièrement, en particulier après l'intégration de nouveaux membres d'équipe ou la réalisation de modifications importantes de configuration. Cela permet de repérer tôt toute activité inattendue.
:::

## Articles connexes {#related-articles}

- [Rôles et autorisations](../settings/roles-permissions.md) -- Gérer qui a accès à quoi
- [Sécurité des données](../settings/data-security.md) -- Comprendre comment vos données sont protégées
- [Vue d'ensemble des rapports](./index.md) -- Voir tous les rapports disponibles
