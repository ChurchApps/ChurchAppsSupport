---
title: "Journal d'audit"
---

# Journal d'audit

<div class="article-intro">

Le journal d'audit suit toutes les actions et modifications importantes dans votre système de gestion d'église. Utilisez-le pour examiner l'activité de connexion, suivre qui a apporté des modifications aux dossiers de personnes, surveiller les mises à jour d'autorisations et maintenir la responsabilité au sein de votre équipe.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur serveur
- Naviguez vers **Paramètres** pour trouver le journal d'audit

</div>

## Consultation du journal d'audit

1. Allez dans **Paramètres** dans B1 Admin.
2. Sélectionnez **Journal d'audit**.
3. Le journal affiche les entrées récentes dans un tableau avec les colonnes suivantes :
   - **Date** -- Quand l'action s'est produite.
   - **Catégorie** -- Le type d'action (code couleur pour un scan rapide).
   - **Action** -- Ce qui a été fait (par exemple, créer, mettre à jour, supprimer, login_success).
   - **Entité** -- Le type et l'ID de l'enregistrement qui a été affecté.
   - **Adresse IP** -- L'adresse IP de l'utilisateur qui a effectué l'action.
   - **Détails** -- Un résumé des modifications spécifiques apportées.

## Filtrage du journal

Utilisez les filtres en haut de la page pour affiner les résultats :

- **Catégorie** -- Filtrer par type d'action :
  - **Toutes les catégories** -- Tout afficher.
  - **Connexion** -- Réussites et échecs de connexion.
  - **Personnes** -- Création, mise à jour ou suppression d'enregistrements de personnes.
  - **Autorisations** -- Octrois et révocations d'autorisations.
  - **Dons** -- Modifications d'enregistrements de dons.
  - **Groupes** -- Actions de gestion de groupes.
  - **Formulaires** -- Activité de soumission de formulaires.
  - **Paramètres** -- Modifications de configuration.
- **Date de début** -- Afficher les entrées à partir de cette date.
- **Date de fin** -- Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les catégories

Chaque catégorie est codée par couleur pour une identification rapide :

- **Connexion** -- Puce bleue. Suit les tentatives de connexion réussies et échouées.
- **Personnes** -- Puce violette. Suit les créations, mises à jour et suppressions d'enregistrements de personnes.
- **Autorisations** -- Puce rouge. Suit quand les droits d'accès sont accordés ou révoqués.
- **Dons** -- Puce verte. Suit les modifications d'enregistrements de dons.
- **Groupes** -- Puce grise. Suit les opérations de gestion de groupes.
- **Formulaires** -- Puce orange. Suit l'activité de soumission de formulaires.
- **Paramètres** -- Puce jaune. Suit les modifications de configuration.

## Exportation du journal

Lorsque des entrées de journal sont affichées, un bouton de **téléchargement CSV** apparaît. Cliquez dessus pour exporter les résultats filtrés actuels vers une feuille de calcul pour examen hors ligne ou archivage.

## Pagination

Utilisez les contrôles de pagination en bas du tableau pour naviguer dans les résultats. Vous pouvez afficher 25, 50 ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont automatiquement conservées pendant un an. Les entrées de plus de 365 jours sont supprimées pour maintenir les performances du système.
:::

:::tip
Examinez le journal d'audit régulièrement, en particulier après l'intégration de nouveaux membres de l'équipe ou après avoir effectué des modifications de configuration importantes. Cela aide à identifier tôt toute activité inattendue.
:::

## Articles connexes

- [Rôles et autorisations](../settings/roles-permissions) -- Gérez qui a accès à quoi
- [Sécurité des données](../settings/data-security) -- Comprenez comment vos données sont protégées
- [Présentation des rapports](./index.md) -- Voir tous les rapports disponibles
