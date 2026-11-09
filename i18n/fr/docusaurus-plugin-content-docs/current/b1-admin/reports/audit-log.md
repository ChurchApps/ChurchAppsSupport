---
title: "Journal d'audit"
description: "Consultez le journal d'audit dans B1 Admin pour voir qui s'est connecté, qui a modifié des fiches de personnes ou changé des autorisations, et exportez les entrées filtrées en CSV."
---

# Journal d'audit

<div class="article-intro">

Le journal d'audit enregistre toutes les actions et modifications importantes de votre système de gestion d'église. Utilisez-le pour examiner l'activité de connexion, suivre qui a modifié les fiches de personnes, surveiller les changements d'autorisations et maintenir la responsabilité au sein de votre équipe.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur serveur
- Accédez à **Paramètres** pour trouver le journal d'audit

</div>

## Afficher le journal d'audit

1. Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Journal d'audit**.
3. Le journal affiche les entrées récentes dans un tableau comportant les colonnes suivantes :
   - **Date** -- Le moment où l'action a eu lieu.
   - **Catégorie** -- Le type d'action (avec un code couleur pour une lecture rapide).
   - **Action** -- Ce qui a été fait (par exemple, create, update, delete, login_success).
   - **Entité** -- Le type et l'identifiant de l'enregistrement concerné.
   - **Adresse IP** -- L'adresse IP de l'utilisateur qui a effectué l'action.
   - **Détails** -- Un résumé des modifications apportées.

## Filtrer le journal

Utilisez les filtres en haut de la page pour affiner les résultats :

- **Catégorie** -- Filtrer par type d'action :
  - **Toutes les catégories** -- Tout afficher.
  - **Connexion** -- Les connexions réussies et échouées.
  - **Personnes** -- La création, la modification ou la suppression de fiches de personnes.
  - **Autorisations** -- L'octroi et la révocation d'autorisations.
  - **Dons** -- Les modifications des enregistrements de dons.
  - **Groupes** -- Les actions de gestion des groupes.
  - **Formulaires** -- L'activité de soumission de formulaires.
  - **Paramètres** -- Les modifications de configuration.
- **Date de début** -- Afficher les entrées à partir de cette date.
- **Date de fin** -- Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les catégories

Chaque catégorie a un code couleur pour une identification rapide :

- **Connexion** -- Puce bleue. Suit les tentatives de connexion réussies et échouées.
- **Personnes** -- Puce violette. Suit la création, la modification et la suppression de fiches de personnes.
- **Autorisations** -- Puce rouge. Suit les moments où des droits d'accès sont accordés ou révoqués.
- **Dons** -- Puce verte. Suit les modifications des enregistrements de dons.
- **Groupes** -- Puce grise. Suit les opérations de gestion des groupes.
- **Formulaires** -- Puce orange. Suit l'activité de soumission de formulaires.
- **Paramètres** -- Puce jaune. Suit les modifications de configuration.

## Historique des notes sur les personnes et les groupes

Si vous pouvez ouvrir le journal d'audit, vous voyez aussi une trace des notes modifiées directement là où elles se trouvent, dans l'onglet **Notes** d'une personne ou d'un groupe :

1. Une note modifiée affiche **(modifiée · voir l'historique)** à côté de sa date. Cliquez dessus pour ouvrir le journal d'audit filtré sur l'historique des notes de cette personne ou de ce groupe.
2. Une note supprimée laisse à sa place un repère grisé **Note supprimée**, qui indique qui l'a écrite, quand elle a été publiée et quand elle a été supprimée. Cliquez sur **Voir l'historique** pour ouvrir le même journal filtré.
3. Dans le journal filtré, développez une entrée **Note mise à jour** ou **Note supprimée** pour voir l'ancien texte et le compte qui a fait la modification. Cliquez sur **Tout afficher** pour retirer le filtre.
4. Dans la colonne **Entité**, l'identifiant d'une note de personne ou de groupe renvoie aux notes de cette personne ou de ce groupe.

Le personnel qui ne peut pas ouvrir le journal d'audit voit la liste des notes sans ces repères.

## Exporter le journal

Lorsque des entrées du journal sont affichées, un bouton **Télécharger le CSV** apparaît. Cliquez dessus pour exporter les résultats filtrés actuels vers un tableur, pour une consultation hors ligne ou pour la tenue de dossiers.

## Pagination

Utilisez les contrôles de pagination en bas du tableau pour naviguer dans les résultats. Vous pouvez afficher 25, 50 ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont conservées automatiquement pendant un an. Les entrées de plus de 365 jours sont supprimées afin de maintenir le système performant.
:::

:::tip
Consultez le journal d'audit régulièrement, surtout après l'intégration de nouveaux membres de l'équipe ou après des modifications importantes de configuration. Cela permet de repérer tôt toute activité inattendue.
:::

## Articles connexes

- [Rôles et autorisations](../settings/roles-permissions.md) -- gérer qui a accès à quoi
- [Sécurité des données](../settings/data-security.md) -- comprendre comment vos données sont protégées
- [Vue d'ensemble des rapports](./index.md) -- voir tous les rapports disponibles
