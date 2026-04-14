---
title: "Journal d'audit"
---

# Journal d'audit

<div class="article-intro">

Le journal d'audit suit toutes les actions et modifications importantes dans votre système de gestion d'église. Utilisez-le pour examiner l'activité de connexion, suivre qui a apporté des modifications aux dossiers des personnes, surveiller les mises à jour de permissions et maintenir la responsabilité dans votre équipe.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Compte B1 Admin avec accès administrateur serveur
- Accédez à **Paramètres** pour trouver le journal d'audit

</div>

## Affichage du journal d'audit

1. Allez dans **Paramètres** dans B1 Admin.
2. Sélectionnez **Journal d'audit**.
3. Le journal affiche les entrées récentes dans un tableau avec les colonnes suivantes :
   - **Date** — Quand l'action s'est produite.
   - **Catégorie** — Le type d'action (codée par couleur pour un balayage rapide).
   - **Action** — Ce qui a été fait (par ex. créer, mettre à jour, supprimer, login_success).
   - **Entité** — Le type et l'ID du dossier qui a été affecté.
   - **Adresse IP** — L'adresse IP de l'utilisateur qui a effectué l'action.
   - **Détails** — Un résumé des modifications spécifiques apportées.

## Filtrage du journal

Utilisez les filtres en haut de la page pour affiner les résultats :

- **Catégorie** — Filtrer par type d'action :
  - **Toutes les catégories** — Afficher tout.
  - **Connexion** — Succès et échecs de connexion.
  - **Personnes** — Création, mise à jour ou suppression de dossiers de personnes.
  - **Permissions** — Octroi et révocation de permissions.
  - **Donations** — Changements d'enregistrement de donation.
  - **Groupes** — Actions de gestion de groupes.
  - **Formulaires** — Activité de soumission de formulaires.
  - **Paramètres** — Changements de configuration.
- **Date de début** — Afficher les entrées à partir de cette date.
- **Date de fin** — Afficher les entrées jusqu'à cette date.

Cliquez sur **Rechercher** après avoir défini vos filtres pour mettre à jour les résultats.

## Comprendre les catégories

Chaque catégorie est codée par couleur pour une identification rapide :

- **Connexion** — Puce bleue. Suit les tentatives de connexion réussies et échouées.
- **Personnes** — Puce violette. Suit la création, la mise à jour et la suppression des dossiers de personnes.
- **Permissions** — Puce rouge. Suit quand les droits d'accès sont accordés ou révoqués.
- **Donations** — Puce verte. Suit les changements d'enregistrement de donation.
- **Groupes** — Puce grise. Suit les opérations de gestion de groupes.
- **Formulaires** — Puce orange. Suit l'activité de soumission de formulaires.
- **Paramètres** — Puce jaune. Suit les changements de configuration.

## Exportation du journal

Lorsque des entrées de journal sont affichées, un bouton **Télécharger CSV** apparaît. Cliquez dessus pour exporter les résultats filtrés actuels dans une feuille de calcul pour un examen hors ligne ou un archivage.

## Pagination

Utilisez les contrôles de pagination au bas du tableau pour naviguer dans les résultats. Vous pouvez afficher 25, 50 ou 100 entrées par page.

:::info
Les entrées du journal d'audit sont automatiquement conservées pendant un an. Les entrées antérieures à 365 jours sont supprimées pour maintenir les performances du système.
:::

:::tip
Examiné le journal d'audit régulièrement, en particulier après l'intégration de nouveaux membres d'équipe ou la réalisation de changements de configuration importants. Cela aide à identifier l'activité inattendue dès le début.
:::

## Articles connexes

- [Rôles et permissions](../settings/roles-permissions) — Gérez qui a accès à quoi
- [Sécurité des données](../settings/data-security) — Comprendre comment vos données sont protégées
- [Aperçu des rapports](./index) — Voir tous les rapports disponibles
