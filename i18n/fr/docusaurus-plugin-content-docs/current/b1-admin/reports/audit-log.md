---
title: "Journal d'audit"
---

# Journal d'audit

<div class="article-intro">

Le journal d'audit suit toutes les actions et modifications importantes dans votre système de gestion d'église. Utilisez-le pour examiner l'activité de connexion, suivre qui a effectué des modifications sur les dossiers de personnes, surveiller les mises à jour de permissions et maintenir la responsabilité au sein de votre équipe.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur serveur
- Accédez à **Paramètres** pour trouver le Journal d'audit

</div>

## Affichage du journal d'audit

1. Ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin) et développez **Paramètres**.
2. Cliquez sur **Journal d'audit**.
3. Le journal affiche les entrées récentes dans un tableau avec les colonnes suivantes :
   - **Date** -- Quand l'action s'est produite.
   - **Catégorie** -- Le type d'action (code couleur pour un balayage rapide).
   - **Action** -- Ce qui a été fait (par exemple, créer, mettre à jour, supprimer, succès_connexion).
   - **Entité** -- Le type et l'identifiant de l'enregistrement affecté.
   - **Adresse IP** -- L'adresse IP de l'utilisateur qui a effectué l'action.
   - **Détails** -- Un résumé des modifications spécifiques apportées.

## Filtrage du journal

Utilisez les filtres en haut de la page pour affiner les résultats :

- **Catégorie** -- Filtrer par type d'action :
  - **Toutes les catégories** -- Afficher tout.
  - **Connexion** -- Les réussites et les échecs de connexion.
  - **Personnes** -- Création, mise à jour ou suppression de dossiers de personnes.
  - **Permissions** -- Octroi et révocation de permissions.
  - **Dons** -- Modifications de dossiers de dons.
  - **Groupes** -- Actions de gestion des groupes.
  - **Formulaires** -- Activité de soumission de formulaires.
  - **Paramètres** -- Modifications de configuration.
- **Date de début** -- Afficher les entrées à partir de cette date en avant.
- **Date de fin** -- Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les catégories

Chaque catégorie est code couleur pour une identification rapide :

- **Connexion** -- Puce bleue. Suit les tentatives de connexion réussies et échouées.
- **Personnes** -- Puce violette. Suit les créations, mises à jour et suppressions de dossiers de personnes.
- **Permissions** -- Puce rouge. Suit quand les droits d'accès sont accordés ou révoqués.
- **Dons** -- Puce verte. Suit les modifications de dossiers de dons.
- **Groupes** -- Puce grise. Suit les opérations de gestion des groupes.
- **Formulaires** -- Puce orange. Suit l'activité de soumission de formulaires.
- **Paramètres** -- Puce jaune. Suit les modifications de configuration.

## Export du journal

Lorsque les entrées du journal sont affichées, un bouton **Télécharger CSV** apparaît. Cliquez dessus pour exporter les résultats filtrés actuels vers une feuille de calcul pour examen hors ligne ou conservation des dossiers.

## Pagination

Utilisez les contrôles de pagination en bas du tableau pour naviguer dans les résultats. Vous pouvez afficher 25, 50 ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont automatiquement conservées pendant un an. Les entrées antérieures à 365 jours sont supprimées pour maintenir le système performant.
:::

:::tip
Examinez régulièrement le journal d'audit, surtout après l'intégration de nouveaux membres de l'équipe ou après des modifications importantes de configuration. Cela aide à identifier rapidement les activités inattendues.
:::

## Articles connexes

- [Rôles et permissions](../settings/roles-permissions) -- Gérez qui a accès à quoi
- [Sécurité des données](../settings/data-security) -- Comprenez comment vos données sont protégées
- [Aperçu des rapports](./index.md) -- Voir tous les rapports disponibles
