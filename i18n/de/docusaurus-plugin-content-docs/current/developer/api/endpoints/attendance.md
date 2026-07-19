---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Campus-Standorte, Gottesdienste, Gottesdienstzeiten, Anwesenheits-Sitzungen, Besuche und Besuchssitzungen. Es stellt die Infrastruktur bereit, um nachzuverfolgen, wer an welchem Gottesdienst oder welcher Gruppenveranstaltung teilgenommen hat, unterstützt Check-in-Abläufe und bietet Anwesenheitstrend- und Zusammenfassungsberichte.

</div>

**Basispfad:** `/attendance`

## Campusse

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Stellt die Routen `getById`, `getAll`, `post` und `delete` über die CRUD-Basisklasse bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Campusse der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Campus anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Campusse erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Campus löschen |

## Gottesdienste

Basispfad: `/attendance/services`

Erweitert GenericCrudController um die CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` sind mit eigenen Implementierungen überschrieben.

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

## Gottesdienstzeiten

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController um die CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienstzeiten auflisten. Filterbar mit `?serviceId=`. `?include=groups` hinzufügen, um Gruppendaten anzuhängen |
| GET | `/:id` | JWT | — | Eine Gottesdienstzeit anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Gottesdienstzeiten nach Campus und Gottesdienst suchen |
| GET | `/public/:churchId` | Öffentlich | — | Den Baum Campus → Gottesdienst → Zeit für eine Kirche abrufen. Treibt das `serviceTimes`-Element des Website-Builders an |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit löschen |

## Gruppen-Gottesdienstzeiten

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen-Gottesdienstzeit-Zuordnungen auflisten. Mit `?groupId=` filtern, um Zuordnungen mit Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | — | Eine Gruppen-Gottesdienstzeit-Zuordnung anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Gruppen-Gottesdienstzeit-Zuordnungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gruppen-Gottesdienstzeit-Zuordnung löschen |

## Anwesenheitsdatensätze

Basispfad: `/attendance/attendancerecords`

Bietet schreibgeschützte Aggregatansichten von Anwesenheitsdaten für Berichte und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze für eine Person laden. Erfordert `?personId=` |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheitsbaum laden (Campusse, Gottesdienste, Gottesdienstzeiten, Gruppen) |
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

## Sitzungen

Basispfad: `/attendance/sessions`

Erweitert GenericCrudController um die CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind eigene Implementierungen, die es auch Gruppenleitern erlauben, Sitzungen für ihre Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Mit `?groupId=` filtern (inklusive Namen). Gruppenleiter können Sitzungen für ihre eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung anhand der ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen für ihre eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person, die an einem bestimmten Datum teilnimmt) und stellt den Check-in-Ablauf bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Mit `?personId=` filtern |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch anhand der ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Gottesdienst laden. Gibt Besuche mit Besuchssitzungen des zuletzt erfassten Datums zurück |
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

## Besuchssitzungen

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (an welcher konkreten Sitzung eine Person während eines Besuchs teilgenommen hat). Bietet außerdem einen Schnellprotokoll-Endpunkt und einen Download-/Export-Endpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Mit `?sessionId=` filtern. Gruppenleiter können Besuchssitzungen für ihre eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung anhand der ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (gibt Personennamen mit Anwesend-/Abwesend-Status zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Die Anwesenheit einer Person schnell in einer Sitzung protokollieren. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen protokollieren |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung anhand der ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung sowie den übergeordneten Besuch, falls keine Sitzungen mehr übrig sind. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen entfernen |

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

## Serien

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheitsserien für Einzelpersonen -- aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien für eine Person laden |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
