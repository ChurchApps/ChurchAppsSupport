---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Campus-Standorte, Services, Service-Zeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es bietet die Infrastruktur für die Verfolgung, wer welchen Service oder Gruppentreffen besucht hat, unterstützt Check-in-Arbeitsabläufe und bietet Anwesenheitstrends und Zusammenfassungsberichte.

</div>

**Basispfad:** `/attendance`

## Campusse

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Stellt `getById`, `getAll`, `post` und `delete` Routen über die CRUD-Basisklasse bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Campusse für die Kirche auflisten |
| GET | `/:id` | JWT | — | Campus nach ID abrufen |
| POST | `/` | JWT | Services.Edit | Campusse erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Campus löschen |

## Services

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` werden durch benutzerdefinierte Implementierungen überschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Services auflisten (mit Campus-Info) |
| GET | `/:id` | JWT | — | Service nach ID abrufen |
| GET | `/search?campusId=` | JWT | — | Services nach Campus-ID suchen |
| POST | `/` | JWT | Services.Edit | Services erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Service löschen |

### Beispiel: Services nach Campus durchsuchen

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

## Service-Zeiten

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController mit CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind benutzerdefinierte Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Service-Zeiten auflisten. Filtern nach `?serviceId=`. Fügen Sie `?include=groups` hinzu, um Gruppendaten hinzuzufügen |
| GET | `/:id` | JWT | — | Service-Zeit nach ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Service-Zeiten nach Campus und Service durchsuchen |
| GET | `/public/:churchId` | Public | — | Das Campus → Service → Zeit-Baum für eine Kirche abrufen. Wird vom Website-Builder-Element `serviceTimes` verwendet |
| POST | `/` | JWT | Services.Edit | Service-Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Service-Zeit löschen |

## Gruppen-Service-Zeiten

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Service-Zeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen-Service-Zeit-Zuordnungen auflisten. Filtern nach `?groupId=`, um Zuordnungen mit Service-Namen zu erhalten |
| GET | `/:id` | JWT | — | Gruppen-Service-Zeit-Zuordnung nach ID abrufen |
| POST | `/` | JWT | Services.Edit | Gruppen-Service-Zeit-Zuordnungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Gruppen-Service-Zeit-Zuordnung löschen |

## Anwesenheitsdatensätze

Basispfad: `/attendance/attendancerecords`

Bietet aggregierte Anwesenheitsdatenansichten für Berichte und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze für eine Person laden. Erfordert `?personId=` |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheits-Baum laden (Campusse, Services, Service-Zeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Anwesenheitstrenddaten mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit für einen Service in einer bestimmten Woche laden |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Für jede Gruppe, die der Service-Zeit zugeordnet ist, `{ groupId, sessionId, attendanceCount }` für dieses Datum zurückgeben (`date` ist `YYYY-MM-DD`; `sessionId` ist null, wenn die Gruppe keine Sitzung hat). Unterstützt den Dialog **Wer benötigt noch Anwesenheit** von B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern (Campus, Service, Service-Zeit, Gruppe, Datumsbereich) durchsuchen |

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

Erweitert GenericCrudController mit CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind benutzerdefinierte Implementierungen, die auch Gruppenleitern ermöglichen, Sitzungen für ihre Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Filtern nach `?groupId=` (enthält Namen). Gruppenleiter können Sitzungen für ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Sitzung nach ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen für ihre eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Sitzung löschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person am bestimmten Datum anwesend) und bietet den Check-in-Arbeitsablauf.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Filtern nach `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Besuch nach ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Service laden. Gibt Besuche mit Besuchssitzungen vom letzten angemeldeten Datum zurück |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten einreichen. Erstellt/aktualisiert Besuche und Besuchssitzungen, entfernt veraltete Datensätze |
| DELETE | `/:id` | JWT | Attendance.Edit | Besuch löschen |

### Beispiel: Check-in-Arbeitsablauf

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

**Schritt 2 -- Check-in einreichen:**

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

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (welche spezifische Sitzung eine Person während eines Besuchs besucht hat). Bietet auch einen Quick-Log-Endpunkt und einen Download-/Export-Endpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Filtern nach `?sessionId=`. Gruppenleiter können Besuchssitzungen für ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Besuchssitzung nach ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (gibt Personnamen mit anwesend/abwesend-Status zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Schnell-Log einer Personenanwesenheit zu einer Sitzung. Erstellt Besuch automatisch, falls nötig. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen protokollieren |
| DELETE | `/:id` | JWT | Attendance.Edit | Besuchssitzung nach ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Person von einer Sitzung entfernen. Löscht die Besuchssitzung und den übergeordneten Besuch, wenn keine Sitzungen verbleiben. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen entfernen |

### Beispiel: Schnell-Log-Anwesenheit

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

## Streaks

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheitsserien für Einzelpersonen -- aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Metriken und Gamifizierung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|--------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien für eine Person laden |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) -- Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmelde-Arbeitsablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) -- Code-Organisationsmuster
