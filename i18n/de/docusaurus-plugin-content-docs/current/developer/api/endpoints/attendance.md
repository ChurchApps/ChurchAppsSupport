---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Attendance-Modul verwaltet Standorte (Campuses), Gottesdienste, Gottesdienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es stellt die Infrastruktur bereit, um zu verfolgen, wer an welchem Gottesdienst oder Gruppentreffen teilgenommen hat, unterstützt Check-in-Workflows und bietet Berichte zu Anwesenheitstrends und -zusammenfassungen.

</div>

**Basispfad:** `/attendance`

## Campuses

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Bietet die Routen `getById`, `getAll`, `post` und `delete` über die CRUD-Basisklasse.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Campuses der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Campus anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Campuses erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Campus löschen |

## Gottesdienste (Services)

Basispfad: `/attendance/services`

Erweitert GenericCrudController um die CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` werden durch benutzerdefinierte Implementierungen überschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienste auflisten (inklusive Campus-Informationen) |
| GET | `/:id` | JWT | — | Einen Gottesdienst anhand der ID abrufen |
| GET | `/search?campusId=` | JWT | — | Gottesdienste nach Campus-ID suchen |
| POST | `/` | JWT | Services.Edit | Gottesdienste erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Gottesdienst löschen |

### Beispiel: Gottesdienste nach Campus suchen

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

## Gottesdienstzeiten (Service Times)

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController um die CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind benutzerdefinierte Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienstzeiten auflisten. Filterbar über `?serviceId=`. Mit `?include=groups` werden zusätzlich Gruppendaten angehängt |
| GET | `/:id` | JWT | — | Eine Gottesdienstzeit anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Gottesdienstzeiten nach Campus und Gottesdienst suchen |
| GET | `/public/:churchId` | Öffentlich | — | Den Campus-→-Gottesdienst-→-Zeit-Baum einer Kirche abrufen. Treibt das `serviceTimes`-Element des Website-Builders an |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit löschen |

## Gruppen-Gottesdienstzeiten

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppe-Gottesdienstzeit-Zuordnungen auflisten. Filterbar über `?groupId=`, um Zuordnungen inklusive Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | — | Eine Gruppe-Gottesdienstzeit-Zuordnung anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Gruppe-Gottesdienstzeit-Zuordnungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gruppe-Gottesdienstzeit-Zuordnung löschen |

## Anwesenheitsdatensätze (Attendance Records)

Basispfad: `/attendance/attendancerecords`

Bietet schreibgeschützte Aggregatansichten von Anwesenheitsdaten für Berichte und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze für eine Person laden. Erfordert `?personId=` |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheitsbaum laden (Campuses, Gottesdienste, Gottesdienstzeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Anwesenheitstrenddaten mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit für einen Gottesdienst in einer bestimmten Woche laden |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern durchsuchen (Campus, Gottesdienst, Gottesdienstzeit, Gruppe, Datumsbereich) |

### Beispiel: Anwesenheitstrend

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

## Sitzungen (Sessions)

Basispfad: `/attendance/sessions`

Erweitert GenericCrudController um die CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind benutzerdefinierte Implementierungen, die es auch Gruppenleitern erlauben, Sitzungen für ihre Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Filterbar über `?groupId=` (inklusive Namen). Gruppenleiter können Sitzungen für ihre eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung anhand der ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen für ihre eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche (Visits)

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person, die an einem bestimmten Datum teilnimmt) und stellt den Check-in-Workflow bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Filterbar über `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch anhand der ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Gottesdienst laden. Liefert Besuche mit Besuchssitzungen seit dem letzten protokollierten Datum |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten übermitteln. Erstellt/aktualisiert Besuche und Besuchssitzungen, entfernt veraltete Datensätze |
| DELETE | `/:id` | JWT | Attendance.Edit | Einen Besuch löschen |

### Beispiel: Check-in-Ablauf

**Schritt 1 -- Vorhandene Check-in-Daten laden:**

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

**Schritt 2 -- Check-in übermitteln:**

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

## Besuchssitzungen (Visit Sessions)

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (an welcher konkreten Sitzung eine Person während eines Besuchs teilgenommen hat). Bietet außerdem einen Schnellprotokollierungs-Endpunkt sowie einen Download-/Export-Endpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Filterbar über `?sessionId=`. Gruppenleiter können Besuchssitzungen für ihre eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung anhand der ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (liefert Personennamen mit Anwesend/Abwesend-Status) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Anwesenheit einer Person für eine Sitzung schnell protokollieren. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen protokollieren |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung anhand der ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung sowie den übergeordneten Besuch, falls keine Sitzungen mehr verbleiben. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen entfernen |

### Beispiel: Anwesenheit schnell protokollieren

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

### Beispiel: Sitzungsanwesenheit herunterladen

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

## Serien (Streaks)

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheitsserien für Einzelpersonen -- aufeinanderfolgende Wochen, in denen eine Person teilgenommen hat. Nützlich für Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien für eine Person laden |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
