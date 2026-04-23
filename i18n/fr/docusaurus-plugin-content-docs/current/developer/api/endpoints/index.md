---
title: "Référence des points de terminaison"
---

# Référence des points de terminaison

<div class="article-intro">

Cette section documente tous les points de terminaison REST exposés par l'API ChurchApps. Chaque page de module répertorie tous les parcours avec sa méthode HTTP, son chemin, ses exigences d'authentification et ses permissions requises.

</div>

## URL de base

| Environnement | URL |
|-------------|-----|
| Développement local | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Conventions de requête

- **Content-Type :** Tous les corps de requête et de réponse utilisent `application/json`
- **Multi-tenant :** Chaque requête authentifiée est limitée à un `churchId` extrait du jeton JWT — vous ne passez pas `churchId` dans l'URL
- **Enregistrements par lot :** La plupart des endpoints `POST` acceptent un **tableau d'objets**. L'API insérera les nouveaux enregistrements (sans champ `id`) et mettra à jour les enregistrements existants (avec champ `id`) en un seul appel
- **IDs :** Tous les IDs d'entité sont des UUID

### Exemple : Enregistrement par lot

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Le premier objet est créé (nouveau) ; le deuxième est mis à jour (a `id`).

## Format de réponse

Les réponses réussies retournent du JSON — soit un objet unique, soit un tableau. Les réponses d'erreur utilisent les codes de statut HTTP standard :

| Code | Signification |
|------|---------|
| `200` | Succès |
| `400` | Mauvaise requête (erreurs de validation) |
| `401` | Non autorisé (jeton manquant/invalide ou permissions insuffisantes) |
| `404` | Non trouvé |
| `500` | Erreur serveur |

Les erreurs de validation retournent :

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Comment lire les tableaux de points de terminaison

Chaque page de module organise les points de terminaison par contrôleur. Les tableaux utilisent ces colonnes :

| Colonne | Description |
|--------|-------------|
| **Method** | Méthode HTTP (`GET`, `POST`, `DELETE`) |
| **Path** | Chemin d'accès relatif au chemin de base du contrôleur |
| **Auth** | **JWT** = nécessite un jeton Bearer, **Public** = aucune authentification requise |
| **Permission** | Permission requise (par exemple `People.Edit`). `—` signifie tout utilisateur authentifié |
| **Description** | Ce que fait le point de terminaison |

Les contrôleurs qui étendent la classe de base CRUD standard fournissent automatiquement quatre points de terminaison : `GET /` (lister tout), `GET /:id` (obtenir par ID), `POST /` (créer/mettre à jour), et `DELETE /:id` (supprimer).

## Module Reporting

Le module Reporting fonctionne différemment des autres modules. Au lieu d'un CRUD sauvegardé par base de données, il charge les définitions de rapport à partir des fichiers JSON sur le disque et exécute les requêtes SQL paramétrées.

| Méthode | Chemin | Authentification | Description |
|---------|--------|------------------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Charger une définition de rapport par nom de clé |
| GET | `/reporting/reports/:keyName/run` | JWT | Exécuter un rapport et retourner les résultats |

Les paramètres du rapport sont passés en tant que valeurs de chaîne de requête (par exemple `?startDate=2024-01-01&endDate=2024-12-31`). Le paramètre `churchId` est injecté automatiquement à partir du jeton JWT. Chaque définition de rapport peut spécifier ses propres exigences de permissions.

## Index des modules

| Module | Chemin de base | Description |
|--------|-----------|-------------|
| [Authentification](./authentication) | `/membership/users`, `/membership/oauth` | Connexion, enregistrement, jetons JWT, OAuth, permissions |
| [Membership](./membership) | `/membership/*` | Personnes, églises, groupes, ménages, rôles, formulaires, paramètres |
| [Attendance](./attendance) | `/attendance/*` | Campus, services, sessions, visites, enregistrements de check-in |
| [Content](./content) | `/content/*` | Pages, sermons, événements, fichiers, galeries, Bible, streaming |
| [Giving](./giving) | `/giving/*` | Donations, fonds, passerelles de paiement, abonnements |
| [Messaging](./messaging) | `/messaging/*` | Conversations, notifications, appareils, SMS |
| [Doing](./doing) | `/doing/*` | Plans, tâches, assignments, automations, planification |
