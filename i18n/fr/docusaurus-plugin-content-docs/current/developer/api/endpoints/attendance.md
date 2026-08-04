---
title: "Points de terminaison Attendance"
---

# Points de terminaison Attendance

<div class="article-intro">

Le module Attendance gère les campus, les services, les horaires de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure pour suivre qui a assisté à quel service ou à quelle réunion de groupe, prend en charge les flux de travail de check-in, et propose des rapports de tendance et de synthèse de présence.

</div>

**Chemin de base :** `/attendance`

## Campuses

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (étend GenericCrudController). Fournit les routes `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les campus de l'église |
| GET | `/:id` | JWT | — | Obtenir un campus par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un campus |

## Services

Chemin de base : `/attendance/services`

Étend GenericCrudController avec les routes CRUD `getById`, `getAll`, `post` et `delete`. Les points de terminaison `getAll` (`GET /`) et `search` sont remplacés par des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les services (inclut les informations de campus) |
| GET | `/:id` | JWT | — | Obtenir un service par ID |
| GET | `/search?campusId=` | JWT | — | Rechercher des services par ID de campus |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des services |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un service |

### Exemple : rechercher des services par campus

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

## Service Times

Chemin de base : `/attendance/servicetimes`

Étend GenericCrudController avec les routes CRUD `getById`, `post` et `delete`. Les points de terminaison `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les horaires de service. Filtrer par `?serviceId=`. Ajouter `?include=groups` pour inclure les données de groupe |
| GET | `/:id` | JWT | — | Obtenir un horaire de service par ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Rechercher des horaires de service par campus et par service |
| GET | `/public/:churchId` | Public | — | Obtenir l'arborescence campus → service → horaire pour une église. Alimente l'élément `serviceTimes` du générateur de site web |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des horaires de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un horaire de service |

## Group Service Times

Chemin de base : `/attendance/groupservicetimes`

Relie des groupes à des horaires de service spécifiques.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les associations groupe-horaire de service. Filtrer par `?groupId=` pour obtenir les associations avec les noms de service |
| GET | `/:id` | JWT | — | Obtenir une association groupe-horaire de service par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des associations groupe-horaire de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une association groupe-horaire de service |

## Attendance Records

Chemin de base : `/attendance/attendancerecords`

Fournit des vues agrégées en lecture seule des données de présence pour les rapports et l'affichage.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Charger les enregistrements de présence d'une personne. Nécessite `?personId=` |
| GET | `/tree` | JWT | — | Charger l'arborescence complète de présence (campus, services, horaires de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charger les données de tendance de présence avec filtres optionnels |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charger la présence par groupe pour un service, sur une semaine donnée |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Rechercher des enregistrements de présence avec filtres (campus, service, horaire de service, groupe, plage de dates) |

### Exemple : tendance de présence

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

Étend GenericCrudController avec les routes CRUD `getById` et `delete`. Les points de terminaison `getAll` et `save` sont des implémentations personnalisées qui permettent aussi aux responsables de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Lister toutes les sessions. Filtrer par `?groupId=` (inclut les noms). Les responsables de groupe peuvent voir les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session par ID |
| POST | `/` | JWT | Attendance.Edit ou responsable de groupe | Créer ou mettre à jour des sessions. Les responsables de groupe peuvent enregistrer des sessions pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session |

## Visits

Chemin de base : `/attendance/visits`

Gère les enregistrements de visite individuels (une personne présente à une date donnée) et fournit le flux de travail de check-in.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Lister toutes les visites. Filtrer par `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtenir une visite par ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charger les données de check-in pour des personnes à un service. Renvoie les visites avec les sessions de visite depuis la dernière date enregistrée |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Soumettre des données de check-in. Crée/met à jour les visites et sessions de visite, supprime les enregistrements obsolètes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une visite |

### Exemple : flux de check-in

**Étape 1 -- Charger les données de check-in existantes :**

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

**Étape 2 -- Soumettre le check-in :**

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

## Visit Sessions

Chemin de base : `/attendance/visitsessions`

Gère l'association entre visites et sessions (quelle session spécifique une personne a suivie lors d'une visite). Fournit aussi un point de terminaison de journalisation rapide et un point de terminaison de téléchargement/export.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Lister les sessions de visite. Filtrer par `?sessionId=`. Les responsables de groupe peuvent voir les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session de visite par ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharger la présence d'une session (renvoie les noms des personnes avec statut présent/absent) |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou responsable de groupe | Journaliser rapidement la présence d'une personne à une session. Crée automatiquement une visite si nécessaire. Les responsables de groupe peuvent journaliser la présence pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session de visite par ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou responsable de groupe | Retirer une personne d'une session. Supprime la session de visite et la visite parente s'il ne reste plus de sessions. Les responsables de groupe peuvent retirer la présence pour leurs propres groupes |

### Exemple : journalisation rapide de la présence

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

### Exemple : téléchargement de la présence d'une session

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

## Streaks

Chemin de base : `/attendance/streaks`

Suit les séries de présence (streaks) des individus -- le nombre de semaines consécutives où une personne a assisté. Utile pour les métriques d'engagement et la gamification.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Charger les séries de présence d'une personne |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et permissions](./authentication) — Flux de connexion, JWT, modèle de permissions
- [Structure des modules](../module-structure) — Motifs d'organisation du code
