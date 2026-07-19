---
title: "Terminaisons de présence"
---

# Terminaisons de présence

<div class="article-intro">

Le module Attendance gère les emplacements de campus, les services, les heures de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure pour suivre qui a assisté à quel service ou réunion de groupe, prend en charge les flux de travail de vérification et offre les rapports de tendance et de résumé de présence.

</div>

**Chemin de base :** `/attendance`

## Campuses

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (étend GenericCrudController). Fournit les itinéraires `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les campus de l'église |
| GET | `/:id` | JWT | — | Obtenir un campus par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un campus |

## Services

Chemin de base : `/attendance/services`

Étend GenericCrudController avec les itinéraires CRUD `getById`, `getAll`, `post` et `delete`. Les terminaisons `getAll` (`GET /`) et `search` sont remplacées par des implémentations personnalisées.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les services (inclut les informations de campus) |
| GET | `/:id` | JWT | — | Obtenir un service par ID |
| GET | `/search?campusId=` | JWT | — | Rechercher des services par ID de campus |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les services |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un service |

### Exemple : Rechercher des services par campus

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Heures de service

Chemin de base : `/attendance/servicetimes`

Étend GenericCrudController avec les itinéraires CRUD `getById`, `post` et `delete`. Les terminaisons `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les heures de service. Filtrer par `?serviceId=`. Ajouter `?include=groups` pour ajouter les données de groupe |
| GET | `/:id` | JWT | — | Obtenir une heure de service par ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Rechercher les heures de service par campus et service |
| GET | `/public/:churchId` | Public | — | Obtenir l'arborescence campus → service → heure pour une église. Puissance l'élément `serviceTimes` du générateur de sites web |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les heures de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une heure de service |

## Heures de service de groupe

Chemin de base : `/attendance/groupservicetimes`

Lie les groupes aux heures de service spécifiques.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les associations groupe-service-heure. Filtrer par `?groupId=` pour obtenir les associations avec les noms de service |
| GET | `/:id` | JWT | — | Obtenir une association groupe-service-heure par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les associations groupe-service-heure |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une association groupe-service-heure |

## Enregistrements de présence

Chemin de base : `/attendance/attendancerecords`

Fournit des vues d'agrégation en lecture seule des données de présence pour les rapports et l'affichage.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Charger les dossiers de présence pour une personne. Nécessite `?personId=` |
| GET | `/tree` | JWT | — | Charger l'arborescence complète de la présence (campus, services, heures de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charger les données de tendance de présence avec filtres optionnels |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charger la présence du groupe pour un service sur une semaine donnée |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Rechercher les dossiers de présence avec filtres (campus, service, heure de service, groupe, plage de dates) |

### Exemple : Tendance de présence

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sessions

Chemin de base : `/attendance/sessions`

Étend GenericCrudController avec les itinéraires CRUD `getById` et `delete`. Les terminaisons `getAll` et `save` sont des implémentations personnalisées qui permettent également aux responsables de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Lister toutes les sessions. Filtrer par `?groupId=` (inclut les noms). Les responsables de groupe peuvent consulter les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session par ID |
| POST | `/` | JWT | Attendance.Edit ou Group Leader | Créer ou mettre à jour les sessions. Les responsables de groupe peuvent enregistrer les sessions de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session |

## Visites

Chemin de base : `/attendance/visits`

Gère les enregistrements de visites individuelles (une personne assistant à une date spécifique) et fournit le flux de travail de vérification.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Lister toutes les visites. Filtrer par `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtenir une visite par ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charger les données d'enregistrement pour les personnes à un service. Retourne les visites avec des sessions de visite à partir de la dernière date enregistrée |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour les visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Soumettre les données d'enregistrement. Crée/met à jour les visites et les sessions de visite, supprime les enregistrements périmés |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une visite |

### Exemple : Flux d'enregistrement

**Étape 1 -- Charger les données d'enregistrement existantes :**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Étape 2 -- Soumettre l'enregistrement :**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

## Sessions de visite

Chemin de base : `/attendance/visitsessions`

Gère l'association entre les visites et les sessions (quelle session spécifique une personne a suivi lors d'une visite). Fournit également un point de terminaison de journal rapide et un point de terminaison de téléchargement/export.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Sessions de visite de liste. Filtrer par `?sessionId=`. Les responsables de groupe peuvent consulter les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session de visite par ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharger la présence pour une session (retourne les noms de personnes avec le statut présent/absent) |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour les sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou Group Leader | Journal rapide de la présence d'une personne à une session. Crée automatiquement une visite si nécessaire. Les responsables de groupe peuvent enregistrer la présence de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session de visite par ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Group Leader | Retirer une personne d'une session. Supprime la session de visite et la visite parente s'il n'y a pas d'autres sessions. Les responsables de groupe peuvent supprimer la présence de leurs propres groupes |

### Exemple : Présence du journal rapide

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Exemple : Télécharger la présence de la session

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Séries

Chemin de base : `/attendance/streaks`

Suit les séries de présence pour les individus : les semaines consécutives qu'une personne a assisté. Utile pour les métriques d'engagement et la ludification.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Charger les séries de présence pour une personne |

## Pages connexes

- [Terminaisons d'adhésion](./membership) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et permissions](./authentication) — Flux de connexion, JWT, modèle de permission
- [Structure du module](../module-structure) — Motifs d'organisation du code