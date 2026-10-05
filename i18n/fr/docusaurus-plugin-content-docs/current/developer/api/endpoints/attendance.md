---
title: "Points de terminaison de présence"
---

# Points de terminaison de présence

<div class="article-intro">

Le module Attendance gère les emplacements du campus, les services, les heures de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure pour suivre qui a assisté à quel service ou réunion de groupe, supporte les flux de travail de check-in et offre des rapports de tendance et de résumé de présence.

</div>

**Chemin de base :** `/attendance`

## Campuses

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (étend GenericCrudController). Fournit les itinéraires `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | — | Lister tous les campus de l'église |
| GET | `/:id` | JWT | — | Obtenir un campus par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un campus |

## Services

Chemin de base : `/attendance/services`

Étend GenericCrudController avec itinéraires CRUD `getById`, `getAll`, `post` et `delete`. Les points de terminaison `getAll` (`GET /`) et `search` sont remplacés par des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | — | Lister tous les services (inclut les informations du campus) |
| GET | `/:id` | JWT | — | Obtenir un service par ID |
| GET | `/search?campusId=` | JWT | — | Rechercher des services par ID de campus |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les services |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un service |

### Exemple : Rechercher les services par campus

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

Étend GenericCrudController avec itinéraires CRUD `getById`, `post` et `delete`. Les points de terminaison `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | — | Lister toutes les heures de service. Filtrez par `?serviceId=`. Ajoutez `?include=groups` pour ajouter des données de groupe |
| GET | `/:id` | JWT | — | Obtenir une heure de service par ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Rechercher les heures de service par campus et service |
| GET | `/public/:churchId` | Public | — | Obtenir l'arborescence campus → service → heure pour une église. Alimente l'élément `serviceTimes` du générateur de site Web |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les heures de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une heure de service |

## Heures de service de groupe

Chemin de base : `/attendance/groupservicetimes`

Lie les groupes à des heures de service spécifiques.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | — | Lister toutes les associations groupe-heure-de-service. Filtrez par `?groupId=` pour obtenir les associations avec les noms de service |
| GET | `/:id` | JWT | — | Obtenir une association groupe-heure-de-service par ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour les associations groupe-heure-de-service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une association groupe-heure-de-service |

## Enregistrements de présence

Chemin de base : `/attendance/attendancerecords`

Fournit des vues d'agrégation en lecture seule des données de présence pour les rapports et l'affichage.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | Attendance.View | Charger les enregistrements de présence pour une personne. Nécessite `?personId=` |
| GET | `/tree` | JWT | — | Charger l'arborescence complète de présence (campus, services, heures de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charger les données de tendance de présence avec des filtres optionnels |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charger la présence du groupe pour un service une semaine donnée |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pour chaque groupe assigné à l'heure de service, retourner `{ groupId, sessionId, attendanceCount }` pour cette date (`date` est `YYYY-MM-DD` ; `sessionId` est null quand le groupe n'a pas de session). Alimente la boîte de dialogue **Who Still Needs Attendance** de B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Rechercher les enregistrements de présence avec des filtres (campus, service, heure de service, groupe, plage de dates) |

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

Étend GenericCrudController avec itinéraires CRUD `getById` et `delete`. Les points de terminaison `getAll` et `save` sont des implémentations personnalisées qui permettent également aux leaders de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Lister toutes les sessions. Filtrez par `?groupId=` (inclut les noms). Les leaders de groupe peuvent consulter les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session par ID |
| POST | `/` | JWT | Attendance.Edit ou Group Leader | Créer ou mettre à jour les sessions. Les leaders de groupe peuvent enregistrer les sessions de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session |

## Visites

Chemin de base : `/attendance/visits`

Gère les enregistrements de visite individuels (une personne assistant à une date spécifique) et fournit le flux de travail de check-in.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | Attendance.View | Lister toutes les visites. Filtrez par `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtenir une visite par ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charger les données de check-in pour les personnes à un service. Retourne les visites avec des sessions de visite à partir de la dernière date enregistrée |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour les visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Soumettre les données de check-in. Crée/met à jour les visites et les sessions de visite, supprime les enregistrements périmés |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une visite |

### Exemple : Flux de check-in

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

## Sessions de visite

Chemin de base : `/attendance/visitsessions`

Gère l'association entre les visites et les sessions (quelle session spécifique une personne a assistée pendant une visite). Fournit également un point de terminaison de journal rapide et un point de terminaison de téléchargement/export.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Lister les sessions de visite. Filtrez par `?sessionId=`. Les leaders de groupe peuvent consulter les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session de visite par ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharger la présence pour une session (retourne les noms de personnes avec le statut présent/absent) |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour les sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou Group Leader | Journal rapide de la présence d'une personne à une session. Crée automatiquement une visite si nécessaire. Les leaders de groupe peuvent enregistrer la présence de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session de visite par ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Group Leader | Supprimer une personne d'une session. Supprime la session de visite et la visite parent s'il n'y a plus de sessions. Les leaders de groupe peuvent supprimer la présence de leurs propres groupes |

### Exemple : Journal rapide de présence

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

### Exemple : Télécharger la présence de session

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

Suive les séries de présence pour les individus -- semaines consécutives qu'une personne a assisté. Utile pour les métriques d'engagement et la ludification.

| Méthode | Chemin | Auth | Permission | Description |
|---------|--------|------|-----------|-------------|
| GET | `/person/:personId` | JWT | — | Charger les séries de présence pour une personne |

## Pages connexes

- [Points de terminaison d'adhésion](./membership) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et autorisations](./authentication) — Flux de connexion, JWT, modèle d'autorisation
- [Structure des modules](../module-structure) — Modèles d'organisation du code
