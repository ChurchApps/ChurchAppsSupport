---
title: "Points de terminaison Présences"
---

# Points de terminaison Présences {#attendance-endpoints}

<div class="article-intro">

Le module Présences gère les sites (campus), les services, les horaires de service, les sessions de présence, les visites et les sessions de visite. Il fournit l'infrastructure permettant de suivre qui a assisté à quel service ou à quelle réunion de groupe, prend en charge les flux d'enregistrement à l'arrivée et propose des rapports de tendances et de synthèse de la présence.

</div>

**Chemin de base :** `/attendance`

## Campus {#campuses}

Chemin de base : `/attendance/campuses`

Contrôleur CRUD standard (hérite de GenericCrudController). Fournit les routes `getById`, `getAll`, `post` et `delete` via la classe de base CRUD.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les campus de l'église |
| GET | `/:id` | JWT | — | Récupère un campus par son ID |
| POST | `/` | JWT | Services.Edit | Crée ou met à jour des campus |
| DELETE | `/:id` | JWT | Services.Edit | Supprime un campus |

## Services {#services}

Chemin de base : `/attendance/services`

Hérite de GenericCrudController avec les routes CRUD `getById`, `getAll`, `post` et `delete`. Les points de terminaison `getAll` (`GET /`) et `search` sont redéfinis avec des implémentations personnalisées.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les services (inclut les informations du campus) |
| GET | `/:id` | JWT | — | Récupère un service par son ID |
| GET | `/search?campusId=` | JWT | — | Recherche des services par ID de campus |
| POST | `/` | JWT | Services.Edit | Crée ou met à jour des services |
| DELETE | `/:id` | JWT | Services.Edit | Supprime un service |

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

Hérite de GenericCrudController avec les routes CRUD `getById`, `post` et `delete`. Les points de terminaison `getAll` et `search` sont des implémentations personnalisées.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les horaires de service. Filtrer avec `?serviceId=`. Ajoutez `?include=groups` pour inclure les données de groupe. Chaque ligne comprend un booléen calculé `checkinOpen` (faux uniquement lorsque l'horaire de service dispose d'un calendrier d'enregistrement dont la fenêtre est fermée à cet instant). La fenêtre est mesurée dans le fuseau horaire du campus du service, puis celui de l'église, puis du premier campus qui en possède un, et enfin `America/New_York` |
| GET | `/:id` | JWT | — | Récupère un horaire de service par son ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Recherche des horaires de service par campus et par service |
| GET | `/public/:churchId` | Public | — | Récupère l'arborescence campus → service → horaire pour une église. Alimente l'élément `serviceTimes` du créateur de site Web |
| POST | `/` | JWT | Services.Edit | Crée ou met à jour des horaires de service. Champs de calendrier facultatifs : `dayOfWeek` (0 = dimanche … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (avant le début), `checkinCloseMinutes` (après la fin). L'enregistrement n'est limité dans le temps que si `dayOfWeek` et `startTime` sont tous deux définis |
| DELETE | `/:id` | JWT | Services.Edit | Supprime un horaire de service |

## Horaires de service des groupes {#group-service-times}

Chemin de base : `/attendance/groupservicetimes`

Associe les groupes à des horaires de service spécifiques.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste toutes les associations groupe-horaire de service. Filtrer avec `?groupId=` pour obtenir les associations avec les noms de service |
| GET | `/:id` | JWT | — | Récupère une association groupe-horaire de service par son ID |
| POST | `/` | JWT | Services.Edit | Crée ou met à jour des associations groupe-horaire de service |
| DELETE | `/:id` | JWT | Services.Edit | Supprime une association groupe-horaire de service |

## Enregistrements de présence {#attendance-records}

Chemin de base : `/attendance/attendancerecords`

Fournit des vues agrégées en lecture seule des données de présence, pour les rapports et l'affichage.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Charge les enregistrements de présence d'une personne. Requiert `?personId=` |
| GET | `/my` | JWT | — | Limité à soi-même : les enregistrements de présence du membre connecté sur les 12 derniers mois, du plus récent au plus ancien. Renvoie `401` si l'utilisateur n'est pas lié à une personne. Alimente la section **Ma présence** de la page Moi de B1 |
| GET | `/tree` | JWT | — | Charge l'arborescence complète des présences (campus, services, horaires de service, groupes) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Charge les données de tendance de présence avec des filtres facultatifs |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Charge la présence des groupes pour un service sur une semaine donnée |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Pour chaque groupe affecté à l'horaire de service, renvoie `{ groupId, sessionId, attendanceCount }` pour cette date (`date` au format `YYYY-MM-DD` ; `sessionId` vaut null lorsque le groupe n'a pas de session). Alimente la boîte de dialogue **Qui doit encore saisir la présence** de B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Recherche des enregistrements de présence avec des filtres (campus, service, horaire de service, groupe, plage de dates) |

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

Hérite de GenericCrudController avec les routes CRUD `getById` et `delete`. Les points de terminaison `getAll` et `save` sont des implémentations personnalisées qui permettent également aux responsables de groupe de gérer les sessions de leurs groupes.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Liste toutes les sessions. Filtrer avec `?groupId=` (inclut les noms). Les responsables de groupe peuvent consulter les sessions de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Récupère une session par son ID |
| POST | `/` | JWT | Attendance.Edit ou responsable de groupe | Crée ou met à jour des sessions. Les responsables de groupe peuvent enregistrer les sessions de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprime une session |

## Visites {#visits}

Chemin de base : `/attendance/visits`

Gère les enregistrements de visite individuels (une personne présente à une date précise) et fournit le flux d'enregistrement à l'arrivée.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Liste toutes les visites. Filtrer avec `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Récupère une visite par son ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Charge les données d'enregistrement des personnes pour un service. Renvoie les visites avec leurs sessions de visite à partir de la dernière date enregistrée |
| POST | `/` | JWT | Attendance.Edit | Crée ou met à jour des visites |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Envoie les données d'enregistrement. Crée/met à jour les visites et les sessions de visite, supprime les enregistrements obsolètes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprime une visite |

### Exemple : flux d'enregistrement {#example-check-in-flow}

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

Si un horaire de service ciblé dispose d'un calendrier d'enregistrement et que sa fenêtre est fermée (mesurée selon le même ordre de fuseaux horaires, privilégiant le campus, que `checkinOpen`), rien n'est enregistré et la réponse est `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Les dépassements de capacité et de ratio de bénévoles renvoient également un 409 (`error: "capacity"` ou `"ratio"`). Les sessions qu'une personne détient déjà aujourd'hui (renvoyées à chaque enregistrement) ignorent la vérification de la fenêtre, afin qu'un foyer puisse ajouter un horaire de service encore ouvert après la fermeture de la fenêtre d'un horaire précédent.

## Sessions de visite {#visit-sessions}

Chemin de base : `/attendance/visitsessions`

Gère l'association entre les visites et les sessions (la session précise à laquelle une personne a participé lors d'une visite). Fournit également un point de terminaison de journalisation rapide et un point de terminaison de téléchargement/export.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou responsable de groupe | Liste les sessions de visite. Filtrer avec `?sessionId=`. Les responsables de groupe peuvent consulter les sessions de visite de leurs propres groupes |
| GET | `/:id` | JWT | Attendance.View | Récupère une session de visite par son ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Télécharge la présence d'une session (renvoie les noms des personnes avec leur statut présent/absent) |
| POST | `/` | JWT | Attendance.Edit | Crée ou met à jour des sessions de visite |
| POST | `/log` | JWT | Attendance.Edit ou responsable de groupe | Journalise rapidement la présence d'une personne à une session. Crée automatiquement la visite si nécessaire. Les responsables de groupe peuvent journaliser la présence de leurs propres groupes |
| DELETE | `/:id` | JWT | Attendance.Edit | Supprime une session de visite par son ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou responsable de groupe | Retire une personne d'une session. Supprime la session de visite et la visite parente si aucune session ne subsiste. Les responsables de groupe peuvent retirer la présence de leurs propres groupes |

### Exemple : journalisation rapide de la présence {#example-quick-log-attendance}

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

## Séries de présence {#streaks}

Chemin de base : `/attendance/streaks`

Suit les séries de présence des personnes, c'est-à-dire le nombre de semaines consécutives pendant lesquelles une personne a assisté. Utile pour les indicateurs d'engagement et la ludification.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Charge les séries de présence d'une personne |

## Pages connexes {#related-pages}

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et gestion de l'église
- [Authentification et autorisations](./authentication) — Flux de connexion, JWT, modèle d'autorisations
- [Structure du module](../module-structure) — Organisation du code
