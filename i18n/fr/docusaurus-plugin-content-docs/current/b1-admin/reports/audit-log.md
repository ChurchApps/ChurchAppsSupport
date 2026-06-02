---
title: "Journal d'Audit"
---

# Journal d'Audit

<div class="article-intro">

Le journal d'audit suit toutes les actions et modifications importantes dans votre système de gestion d'église. Utilisez-le pour examiner l'activité de connexion, suivre qui a apporté des modifications aux dossiers des gens, surveiller les mises à jour des permissions et maintenir la responsabilité dans votre équipe.

</div>

<div class="prereqs">
<h4>Avant de Commencer</h4>

- Compte B1 Admin avec accès administrateur serveur
- Allez à **Paramètres** pour trouver le Journal d'Audit

</div>

## Afficher le Journal d'Audit

1. Allez à **Paramètres** dans B1 Admin.
2. Sélectionnez **Journal d'Audit**.
3. Le journal affiche les entrées récentes dans un tableau avec les colonnes suivantes :
   - **Date** -- Quand l'action s'est produite.
   - **Catégorie** -- Le type d'action (codée par couleur pour un balayage rapide).
   - **Action** -- Ce qui a été fait (par exemple, créer, mettre à jour, supprimer, login_success).
   - **Entité** -- Le type et l'ID de l'enregistrement qui a été affecté.
   - **Adresse IP** -- L'adresse IP de l'utilisateur qui a effectué l'action.
   - **Détails** -- Un résumé des modifications spécifiques apportées.

## Filtrer le Journal

Utilisez les filtres en haut de la page pour réduire les résultats :

- **Catégorie** -- Filtrer par type d'action :
  - **Toutes les Catégories** -- Afficher tout.
  - **Connexion** -- Succès et échecs de connexion.
  - **Gens** -- Création, mise à jour ou suppression de dossiers de personnes.
  - **Permissions** -- Octroi et révocation de permissions.
  - **Dons** -- Modifications d'enregistrements de dons.
  - **Groupes** -- Actions de gestion de groupe.
  - **Formulaires** -- Activité d'envoi de formulaire.
  - **Paramètres** -- Modifications de configuration.
- **Date de Début** -- Afficher les entrées à partir de cette date en avant.
- **Date de Fin** -- Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les Catégories

Chaque catégorie est codée par couleur pour une identification rapide :

- **Connexion** -- Puce bleue. Suit les tentatives de connexion réussies et échouées.
- **Gens** -- Puce violette. Suit les créations, mises à jour et suppressions de dossiers de personnes.
- **Permissions** -- Puce rouge. Suit quand les droits d'accès sont accordés ou révoqués.
- **Dons** -- Puce verte. Suit les modifications d'enregistrements de dons.
- **Groupes** -- Puce grise. Suit les opérations de gestion de groupe.
- **Formulaires** -- Puce orange. Suit l'activité d'envoi de formulaire.
- **Paramètres** -- Puce jaune. Suit les modifications de configuration.

## Exporter le Journal

Lorsque les entrées du journal sont affichées, un bouton **Télécharger CSV** apparaît. Cliquez dessus pour exporter les résultats filtrés actuels vers une feuille de calcul pour un examen hors ligne ou la tenue de registres.

## Pagination

Utilisez les contrôles de pagination en bas du tableau pour naviguer dans les résultats. Vous pouvez afficher 25, 50 ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont automatiquement conservées pendant un an. Les entrées plus anciennes que 365 jours sont supprimées pour maintenir le système performant.
:::

:::tip
Examinez régulièrement le journal d'audit, surtout après l'intégration de nouveaux membres de l'équipe ou après des modifications de configuration importantes. Cela aide à identifier les activités inattendues tôt.
:::

## Articles Connexes

- [Rôles et Permissions](../settings/roles-permissions) -- Gérez qui a accès à quoi
- [Sécurité des Données](../settings/data-security) -- Comprenez comment vos données sont protégées
- [Aperçu des Rapports](./index.md) -- Voir tous les rapports disponibles
