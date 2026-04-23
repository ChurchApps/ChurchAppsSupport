---
title: "Points de terminaison Doing"
---

# Points de terminaison Doing

<div class="article-intro">

Le module Doing gère la planification des services, la programmation des bénévoles, la gestion des tâches et les automations. Il fournit des outils pour créer des plans de service avec les horaires et les postes, assigner les bénévoles, gérer les dates de blocage, créer des éléments d'ordre de service, se connecter aux fournisseurs de contenu externe et configurer les workflows automatisés avec les conditions et les actions.

</div>

**Chemin de base :** `/doing`

## Plans

Chemin de base : `/doing/plans`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les plans pour l'église |
| GET | `/:id` | JWT | — | Obtenir un plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs plans par IDs séparés par des virgules |
| GET | `/types/:planTypeId` | JWT | — | Obtenir les plans par type de plan |
| GET | `/presenter` | JWT | — | Obtenir les plans des 7 prochains jours (vue présentateur) |
| GET | `/public/current/:planTypeId` | Public | — | Obtenir le plan actuel pour un type de plan |
| POST | `/` | JWT | — | Créer ou mettre à jour les plans (accepte un objet unique ou un tableau) |
| POST | `/copy/:id` | JWT | — | Copier un plan y compris les postes, les horaires, les assignments et les éléments d'ordre de service. Le corps inclut `copyMode` ("none", "positions", "all") et `copyServiceOrder` (booléen) |
| POST | `/autofill/:id` | JWT | — | Remplissage automatique des assignments de bénévoles pour un plan. Corps : `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Supprimer un plan et tous les horaires, assignments, postes et éléments de plan connexes |

### Exemple : Copier un plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Types de plans

Chemin de base : `/doing/planTypes`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — pas de vérifications de permissions).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les types de plans |
| GET | `/:id` | JWT | — | Obtenir un type de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs types de plans par IDs séparés par des virgules |
| GET | `/ministryId/:ministryId` | JWT | — | Obtenir les types de plans pour un ministère |
| POST | `/` | JWT | — | Créer ou mettre à jour les types de plans |
| DELETE | `/:id` | JWT | — | Supprimer un type de plan |

## Éléments de plan

Chemin de base : `/doing/planItems`

Gère les éléments d'ordre de service (en-têtes, sections, chansons, etc.) organisés dans une structure d'arbre parent-enfant.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs éléments de plan par IDs séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les éléments de plan pour un plan (retourne la structure d'arbre) |
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir les éléments de plan pour la vue présentateur (retourne la structure d'arbre) |
| POST | `/` | JWT | — | Créer ou mettre à jour les éléments de plan |
| POST | `/sort` | JWT | — | Mettre à jour l'ordre de tri pour un élément de plan (retrie les frères et sœurs) |
| DELETE | `/:id` | JWT | — | Supprimer un élément de plan |

## Flux de plan

Chemin de base : `/doing/planFeed`

Fournit les flux d'éléments de plan pour le présentateur. Si aucun élément de plan n'existe, auto-remplit à partir du flux de venue Lessons.church en utilisant le `contentId` du plan.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir le flux du plan pour le présentateur (auto-remplit à partir du flux de venue si vide) |

## Postes

Chemin de base : `/doing/positions`

Étend la classe de base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — pas de vérifications de permissions).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un poste par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs postes par IDs séparés par des virgules |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les postes pour plusieurs plans par IDs de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les postes pour un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour les postes |
| DELETE | `/:id` | JWT | — | Supprimer un poste |

## Horaires

Chemin de base : `/doing/times`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/all` | JWT | — | Lister tous les horaires pour l'église |
| GET | `/:id` | JWT | — | Obtenir un horaire par ID |
| GET | `/plans?planIds=` | JWT | — | Obtenir les horaires pour plusieurs plans par IDs de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les horaires pour un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour les horaires |
| DELETE | `/:id` | JWT | — | Supprimer un horaire |

## Assignments

Chemin de base : `/doing/assignments`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les assignments pour l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir un assignment par ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les assignments pour plusieurs plans par IDs de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les assignments pour un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour les assignments (le statut par défaut est "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accepter un assignment (doit être la personne assignée) |
| POST | `/decline/:id` | JWT | — | Refuser un assignment (doit être la personne assignée) |
| DELETE | `/:id` | JWT | — | Supprimer un assignment |

### Exemple : Accepter un assignment

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Dates de blocage

Chemin de base : `/doing/blockoutDates`

Étend la classe de base CRUD (GET `/:id`, DELETE `/:id` — pas de vérifications de permissions).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une date de blocage par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs dates de blocage par IDs séparés par des virgules |
| GET | `/my` | JWT | — | Obtenir les dates de blocage pour l'utilisateur actuel |
| GET | `/upcoming` | JWT | — | Obtenir toutes les dates de blocage à venir pour l'église |
| POST | `/` | JWT | — | Créer ou mettre à jour les dates de blocage (le personId par défaut est l'utilisateur actuel s'il n'est pas fourni) |
| DELETE | `/:id` | JWT | — | Supprimer une date de blocage |

## Tâches

Chemin de base : `/doing/tasks`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Obtenir les tâches ouvertes pour l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une tâche par ID |
| GET | `/closed` | JWT | — | Obtenir les tâches fermées pour l'utilisateur actuel |
| GET | `/timeline?taskIds=` | JWT | — | Obtenir les données de chronologie pour les tâches par IDs de tâche séparés par des virgules |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtenir la tâche de mise à jour du répertoire pour une personne |
| POST | `/` | JWT | — | Créer ou mettre à jour les tâches. Ajouter `?type=directoryUpdate` pour gérer les tâches de mise à jour du répertoire (télécharge automatiquement les photos) |
| POST | `/loadForGroups` | JWT | — | Charger les tâches pour des groupes spécifiques. Corps : `{ groupIds: [], status: "Open" }` |

## Automations

Chemin de base : `/doing/automations`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les automations pour l'église |
| GET | `/:id` | JWT | — | Obtenir une automation par ID |
| GET | `/check` | Public | — | Déclencher une vérification de toutes les automations |
| POST | `/` | JWT | — | Créer ou mettre à jour les automations |
| DELETE | `/:id` | JWT | — | Supprimer une automation |

## Actions

Chemin de base : `/doing/actions`

Les actions définissent ce qui se passe lorsqu'une automation est déclenchée.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une action par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les actions pour une automation |
| POST | `/` | JWT | — | Créer ou mettre à jour les actions |
| DELETE | `/:id` | JWT | — | Supprimer une action |

## Conditions

Chemin de base : `/doing/conditions`

Les conditions définissent les critères qui déclenchent une automation.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une condition par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conditions pour une automation |
| POST | `/` | JWT | — | Créer ou mettre à jour les conditions |
| DELETE | `/:id` | JWT | — | Supprimer une condition |

## Conjonctions

Chemin de base : `/doing/conjunctions`

Les conjonctions relient plusieurs conditions ensemble dans une automation (logique AND/OR).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une conjonction par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conjonctions pour une automation |
| POST | `/` | JWT | — | Créer ou mettre à jour les conjonctions |
| DELETE | `/:id` | JWT | — | Supprimer une conjonction |

## Authentifications du fournisseur de contenu

Chemin de base : `/doing/contentProviderAuths`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — pas de vérifications de permissions).

Gère les enregistrements d'authentification OAuth pour les fournisseurs de contenu externe (par exemple, les intégrations de logiciels de présentation).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les authentifications du fournisseur de contenu |
| GET | `/:id` | JWT | — | Obtenir une authentification du fournisseur de contenu par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs authentifications du fournisseur de contenu par IDs séparés par des virgules |
| GET | `/ministry/:ministryId` | JWT | — | Obtenir toutes les authentifications du fournisseur de contenu pour un ministère |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtenir l'enregistrement d'authentification pour un ministère et un fournisseur spécifiques |
| POST | `/` | JWT | — | Créer ou mettre à jour les authentifications du fournisseur de contenu |
| DELETE | `/:id` | JWT | — | Supprimer une authentification du fournisseur de contenu |

## Proxy du fournisseur

Chemin de base : `/doing/providerProxy`

Proxy les requêtes aux fournisseurs de contenu externe (par exemple, ProPresenter, EasyWorship). Gère automatiquement l'actualisation des jetons quand les jetons expirent.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| POST | `/browse` | JWT | — | Parcourir les fichiers du fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtenir les présentations d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtenir une liste de lecture d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtenir les instructions pour un élément de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtenir les instructions élargies pour un élément de contenu. Corps : `{ ministryId, providerId, path }` |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Modèles d'organisation du code
