---
title: "Points de terminaison de présence"
description: "Référence de l'API de présence dans B1 Admin et B1 Checkin : campus, services, horaires de service, sessions, visites, règles de pointage et points d'export."
---

# Points de terminaison de présence {#attendance-endpoints}

<div class="article-intro">

Le module Présence gère les campus, les services, les horaires de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure permettant de suivre qui a assisté à quel service ou à quelle réunion de groupe, prend en charge les flux de pointage et propose des rapports sur les tendances et les synthèses de présence.

</div>

**Chemin de base :** `/attendance`

## Campus {#campuses}

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (étend GenericCrudController). Fournit les routes `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les campus de l'église |
| GET | `/:id` | JWT | — | Obtenir un campus par son ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un campus |

## Services {#services}

Chemin de base : `/attendance/services`

Étend GenericCrudController avec les routes CRUD `getById`, `getAll`, `post` et `delete`. Les points de terminaison `getAll` (`GET /`) et `search` sont redéfinis avec des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les services (avec les informations de campus) |
| GET | `/:id` | JWT | — | Obtenir un service par son ID |
| GET | `/search?campusId=` | JWT | — | Rechercher des services par ID de campus |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des services |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un service |

### Exemple : rechercher des services par campus {#example-search-services-by-campus}

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

## Horaires de service {#service-times}

Chemin de base : `/attendance/servicetimes`

Étend GenericCrudController avec les routes CRUD `getById`, `post` et `delete`. Les points de terminaison `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les horaires de service. Filtrer avec `?serviceId=`. Ajouter `?include=groups` pour joindre les données de groupe. Chaque ligne comprend un booléen calculé `checkinOpen` (faux uniquement lorsque l'horaire de service dispose d'un calendrier de pointage dont la fenêtre est fermée à cet instant). La fenêtre est mesurée dans le fuseau horaire du campus du service, puis dans celui de l'église, puis dans celui du premier campus qui en possède un, puis `America/New_York` |
| GET | `/:id` | JWT | — | Obtenir un horaire de service par son ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Rechercher des horaires de service par campus et service |
| GET | `/public/:churchId` | Publique | — | Obtenir l'arborescence campus → service → horaire d'une église. Alimente l'élément `serviceTimes` du générateur de site web |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des horaires de service. Champs de calendrier facultatifs : `dayOfWeek` (0 = dimanche … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (avant le début), `checkinCloseMinutes` (après la fin). Le pointage n'est limité dans le temps que lorsque `dayOfWeek` et `startTime` sont tous deux renseignés |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer un horaire de service |

## Horaires de service des groupes {#group-service-times}

Chemin de base : `/attendance/groupservicetimes`

Associe des groupes à des horaires de service précis.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les associations groupe-horaire de service. Filtrer avec `?groupId=` pour obtenir les associations avec les noms de service |
| GET | `/:id` | JWT | — | Obtenir une association groupe-horaire de service par son ID |
| POST | `/` | JWT | Services.Edit | Créer ou mettre à jour des associations groupe-horaire de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprimer une association groupe-horaire de service |

## Enregistrements de présence {#attendance-records}

Chemin de base : `/attendance/attendancerecords`

Fournit des vues agrégées en lecture seule des données de présence, pour les rapports et l'affichage.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Charger les enregistrements de présence d'une personne. `?personId=` est requis |
| GET | `/my` | JWT | — | Accès limité au membre connecté : ses propres enregistrements de présence des 12 derniers mois, du plus récent au plus ancien. Renvoie `401` si l'utilisateur n'est lié à aucune personne. Alimente la section **Mes présences** de la page Moi de B1App |
| GET | `/tree` | JWT | — | Charger l'arborescence complète de présence (campus, services, horaires de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charger les données de tendance de présence avec des filtres facultatifs |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charger la présence des groupes pour un service à une semaine donnée |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pour chaque groupe affecté à l'horaire de service, renvoyer `{ groupId, sessionId, attendanceCount }` pour cette date (`date` au format `YYYY-MM-DD` ; `sessionId` vaut null lorsque le groupe n'a pas de session). Alimente la boîte de dialogue **Qui doit encore saisir la présence** de B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Rechercher des enregistrements de présence avec des filtres (campus, service, horaire de service, groupe, plage de dates) |

### Exemple : tendance de présence {#example-attendance-trend}

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

## Sessions {#sessions}

Chemin de base : `/attendance/sessions`

Étend GenericCrudController avec les routes CRUD `getById` et `delete`. Les points de terminaison `getAll` et `save` sont des implémentations personnalisées qui permettent aussi aux responsables de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Lister toutes les sessions. Filtrer avec `?groupId=` (inclut les noms). Les responsables de groupe peuvent consulter les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session par son ID |
| POST | `/` | JWT | Attendance.Edit ou responsable de groupe | Créer ou mettre à jour des sessions. Les responsables de groupe peuvent enregistrer des sessions pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session |

## Visites {#visits}

Chemin de base : `/attendance/visits`

Gère les enregistrements de visite individuels (une personne présente à une date donnée) et fournit le flux de pointage.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Lister toutes les visites. Filtrer avec `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obtenir une visite par son ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charger les données de pointage des personnes à un service. Renvoie les visites avec leurs sessions de visite, à partir de la dernière date enregistrée |
| GET | `/active?peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Visites du jour des personnes listées qui ne sont pas encore sorties, avec leurs sessions de visite et leurs sessions remplies. `peopleIds` (séparés par des virgules) est requis ; 400 sinon. Utilisé par le départ par nom de B1Checkin |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Envoyer les données de pointage. Crée ou met à jour les visites et les sessions de visite, et supprime les enregistrements obsolètes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une visite |

### Exemple : flux de pointage {#example-check-in-flow}

**Étape 1 -- Charger les données de pointage existantes :**

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

**Étape 2 -- Envoyer le pointage :**

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

Si un horaire de service visé dispose d'un calendrier de pointage et que sa fenêtre est fermée (mesurée selon le même ordre de fuseaux horaires, en commençant par le campus, que `checkinOpen`), rien n'est enregistré et la réponse est `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Les dépassements de capacité et de ratio de bénévoles renvoient également un 409 (`error: "capacity"` ou `"ratio"`). Les sessions qu'une personne détient déjà aujourd'hui (renvoyées à chaque pointage) ne sont pas soumises au contrôle de fenêtre ; un foyer peut donc ajouter un horaire de service ouvert après la fermeture de la fenêtre d'un horaire précédent.

## Sessions de visite {#visit-sessions}

Chemin de base : `/attendance/visitsessions`

Gère l'association entre les visites et les sessions (quelle session précise une personne a suivie pendant une visite). Fournit aussi un point de terminaison d'enregistrement rapide et un point de téléchargement ou d'export.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Lister les sessions de visite. Filtrer avec `?sessionId=`. Les responsables de groupe peuvent consulter les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Obtenir une session de visite par son ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharger la présence d'une session (renvoie les noms des personnes avec leur statut présent ou absent) |
| POST | `/` | JWT | Attendance.Edit | Créer ou mettre à jour des sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou responsable de groupe | Enregistrer rapidement la présence d'une personne à une session. Crée automatiquement la visite si nécessaire. Les responsables de groupe peuvent enregistrer la présence pour leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprimer une session de visite par son ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou responsable de groupe | Retirer une personne d'une session. Supprime la session de visite et la visite parente si aucune session ne subsiste. Les responsables de groupe peuvent retirer la présence de leurs propres groupes |

### Exemple : enregistrement rapide de présence {#example-quick-log-attendance}

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

### Exemple : télécharger la présence d'une session {#example-download-session-attendance}

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

## Séries {#streaks}

Chemin de base : `/attendance/streaks`

Suit les séries de présence des personnes, c'est-à-dire les semaines consécutives pendant lesquelles une personne a assisté. Utile pour les indicateurs d'engagement et la gamification.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Charger les séries de présence d'une personne |

## Pages connexes {#related-pages}

- [Points de terminaison Membership](./membership.md) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et permissions](./authentication.md) — Flux de connexion, JWT, modèle de permissions
- [Structure des modules](../module-structure.md) — Organisation du code
