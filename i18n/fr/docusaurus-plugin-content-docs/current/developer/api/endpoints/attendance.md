---
title: "Points de terminaison de présence"
---

# Points de terminaison de présence

<div class="article-intro">

Le module Présence gère les campus, les services, les horaires de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure permettant de suivre qui a assisté à quel service ou à quelle réunion de groupe, prend en charge les flux d'enregistrement à l'arrivée et propose des rapports sur les tendances et les synthèses de présence.

</div>

**Chemin de base :** `/attendance`

## Campus

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (hérite de GenericCrudController). Fournit les routes `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les campus de l'église |
| GET | `/:id` | JWT | — | Obtenir un campus par son ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un campus |

## Services

Chemin de base : `/attendance/services`

Hérite de GenericCrudController avec les routes CRUD `getById`, `getAll`, `post` et `delete`. Les endpoints `getAll` (`GET /`) et `search` sont remplacés par des implémentations personnalisées.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les services (avec les informations de campus) |
| GET | `/:id` | JWT | — | Obtenir un service par son ID |
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

## Horaires de service

Chemin de base : `/attendance/servicetimes`

Hérite de GenericCrudController avec les routes CRUD `getById`, `post` et `delete`. Les endpoints `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les horaires de service. Filtrer avec `?serviceId=`. Ajouter `?include=groups` pour inclure les données de groupe. Chaque ligne comprend un booléen calculé `checkinOpen` (faux uniquement lorsque l'horaire de service dispose d'un calendrier d'enregistrement dont la fenêtre est actuellement fermée). La fenêtre est mesurée dans le fuseau horaire du campus du service, puis dans celui de l'église, puis dans celui du premier campus qui en dispose, et enfin `America/New_York` |
| GET | `/:id` | JWT | — | Obtenir un horaire de service par son ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Rechercher des horaires de service par campus et par service |
| GET | `/public/:churchId` | Public | — | Obtenir l'arborescence campus → service → horaire pour une église. Alimente l'élément `serviceTimes` du générateur de sites web |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des horaires de service. Champs de planning facultatifs : `dayOfWeek` (0 = dimanche … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (avant le début), `checkinCloseMinutes` (après la fin). L'enregistrement n'est limité dans le temps que lorsque `dayOfWeek` et `startTime` sont tous deux définis |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un horaire de service |

## Horaires de service des groupes

Chemin de base : `/attendance/groupservicetimes`

Associe des groupes à des horaires de service spécifiques.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les associations groupe-horaire de service. Filtrer avec `?groupId=` pour obtenir les associations avec les noms des services |
| GET | `/:id` | JWT | — | Obtenir une association groupe-horaire de service par son ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des associations groupe-horaire de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une association groupe-horaire de service |

## Enregistrements de présence

Chemin de base : `/attendance/attendancerecords`

Fournit des vues agrégées en lecture seule des données de présence, pour les rapports et l'affichage.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Charger les enregistrements de présence d'une personne. `?personId=` est requis |
| GET | `/my` | JWT | — | Limité à l'utilisateur : les enregistrements de présence du membre connecté pour les 12 derniers mois, les plus récents en premier. Renvoie `401` si l'utilisateur n'est pas lié à une personne. Alimente la section **Ma présence** de la page B1 Me |
| GET | `/tree` | JWT | — | Charger l'arborescence complète de présence (campus, services, horaires de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charger les données de tendance de présence avec des filtres facultatifs |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charger la présence des groupes pour un service, une semaine donnée |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pour chaque groupe affecté à l'horaire de service, renvoie `{ groupId, sessionId, attendanceCount }` pour cette date (`date` au format `YYYY-MM-DD` ; `sessionId` vaut null lorsque le groupe n'a pas de session). Alimente la boîte de dialogue **Qui doit encore saisir la présence** de B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Rechercher des enregistrements de présence avec des filtres (campus, service, horaire de service, groupe, plage de dates) |

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

Hérite de GenericCrudController avec les routes CRUD `getById` et `delete`. Les endpoints `getAll` et `save` sont des implémentations personnalisées qui permettent aussi aux chefs de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou chef de groupe | Lister toutes les sessions. Filtrer avec `?groupId=` (inclut les noms). Les chefs de groupe peuvent consulter les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session par son ID |
| POST | `/` | JWT | Attendance.Edit ou chef de groupe | Créer ou mettre à jour des sessions. Les chefs de groupe peuvent enregistrer des sessions pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session |

## Visites

Chemin de base : `/attendance/visits`

Gère les enregistrements de visite individuels (une personne présente à une date précise) et fournit le flux d'enregistrement à l'arrivée.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Lister toutes les visites. Filtrer avec `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtenir une visite par son ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charger les données d'enregistrement de personnes à un service. Renvoie les visites avec leurs sessions de visite, à partir de la dernière date enregistrée |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Envoyer les données d'enregistrement. Crée ou met à jour les visites et les sessions de visite, et supprime les enregistrements obsolètes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une visite |

### Exemple : flux d'enregistrement

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

**Étape 2 -- Envoyer l'enregistrement :**

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

Si un horaire de service ciblé dispose d'un calendrier d'enregistrement et que sa fenêtre est fermée (mesurée dans le même ordre de fuseaux horaires, en privilégiant le campus, que pour `checkinOpen`), rien n'est enregistré et la réponse est `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Les dépassements de capacité et de ratio de bénévoles renvoient également un 409 (`error: "capacity"` ou `"ratio"`). Les sessions qu'une personne détient déjà aujourd'hui (renvoyées à chaque enregistrement) ne sont pas soumises au contrôle de fenêtre, ce qui permet à un foyer d'ajouter un horaire de service encore ouvert alors que la fenêtre d'un horaire précédent est fermée.

## Sessions de visite

Chemin de base : `/attendance/visitsessions`

Gère l'association entre les visites et les sessions (la session précise qu'une personne a fréquentée pendant une visite). Fournit aussi un point d'enregistrement rapide et un point de téléchargement ou d'export.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou chef de groupe | Lister les sessions de visite. Filtrer avec `?sessionId=`. Les chefs de groupe peuvent consulter les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session de visite par son ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharger la présence pour une session (renvoie les noms des personnes avec leur statut présent ou absent) |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou chef de groupe | Enregistrer rapidement la présence d'une personne à une session. Crée automatiquement la visite si nécessaire. Les chefs de groupe peuvent enregistrer la présence pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session de visite par son ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou chef de groupe | Retirer une personne d'une session. Supprime la session de visite et la visite parente si aucune session ne reste. Les chefs de groupe peuvent retirer la présence pour leurs propres groupes |

### Exemple : enregistrement rapide de présence

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

### Exemple : télécharger la présence d'une session

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

Suit les séries de présence des personnes, c'est-à-dire le nombre de semaines consécutives où une personne a assisté. Utile pour les indicateurs d'engagement et la gamification.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Charger les séries de présence d'une personne |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et autorisations](./authentication) — Flux de connexion, JWT, modèle d'autorisations
- [Structure du module](../module-structure) — Organisation du code
