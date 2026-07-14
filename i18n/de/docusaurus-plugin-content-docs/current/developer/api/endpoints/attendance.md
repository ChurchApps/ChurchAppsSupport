---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Campusstandorte, Gottesdienste, Gottesdienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es bietet die Infrastruktur zur Verfolgung, wer an welchem Gottesdienst oder Gruppentreffen teilgenommen hat, unterstuetzt Check-in-Ablaeufe und bietet Anwesenheitstrend- und Zusammenfassungsberichte.

</div>

**Basispfad:** `/attendance`

## Campusse

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Bietet `getById`, `getAll`, `post` und `delete`-Routen ueber die CRUD-Basisklasse.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | -- | Alle Campusse der Kirche auflisten |
| GET | `/:id` | JWT | -- | Einen Campus nach ID abrufen |
| POST | `/` | JWT | Services.Edit | Campusse erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Campus loeschen |

## Gottesdienste

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit den CRUD-Routen getById, getAll, post und delete. Die Endpunkte getAll (GET /) und search sind mit benutzerdefinierten Implementierungen ueberschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | -- | Alle Gottesdienste auflisten (enthaelt Campus-Informationen) |
| GET | `/:id` | JWT | -- | Einen Gottesdienst nach ID abrufen |
| GET | `/search?campusId=` | JWT | -- | Gottesdienste nach Campus-ID suchen |
| POST | `/` | JWT | Services.Edit | Gottesdienste erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Gottesdienst loeschen |

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

Erweitert GenericCrudController mit den CRUD-Routen getById, post und delete. Die Endpunkte getAll und search sind benutzerdefinierte Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | -- | Alle Gottesdienstzeiten auflisten. Filtern mit `?serviceId=`. `?include=groups` hinzufuegen, um Gruppendaten anzuhaengen |
| GET | `/:id` | JWT | -- | Eine Gottesdienstzeit nach ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | -- | Gottesdienstzeiten nach Campus und Gottesdienst suchen |
| GET | `/public/:churchId` | Oeffentlich | -- | Den Campus-Gottesdienst-Zeit-Baum fuer eine Kirche abrufen. Treibt das serviceTimes-Element des Website-Builders an |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit loeschen |

## Gruppen-Gottesdienstzeiten

Basispfad: `/attendance/groupservicetimes`

Verknuepft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | -- | Alle Gruppen-Gottesdienstzeit-Zuordnungen auflisten. Mit `?groupId=` filtern, um Zuordnungen mit Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | -- | Eine Gruppen-Gottesdienstzeit-Zuordnung nach ID abrufen |
| POST | `/` | JWT | Services.Edit | Gruppen-Gottesdienstzeit-Zuordnungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gruppen-Gottesdienstzeit-Zuordnung loeschen |

## Anwesenheitsdatensaetze

Basispfad: `/attendance/attendancerecords`

Bietet schreibgeschuetzte Aggregatansichten von Anwesenheitsdaten fuer Berichte und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensaetze fuer eine Person laden. Erfordert `?personId=` |
| GET | `/tree` | JWT | -- | Den vollstaendigen Anwesenheitsbaum laden (Campusse, Gottesdienste, Gottesdienstzeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Anwesenheitstrenddaten mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit fuer einen Gottesdienst in einer bestimmten Woche laden |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensaetze mit Filtern durchsuchen (Campus, Gottesdienst, Gottesdienstzeit, Gruppe, Datumsbereich) |

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

Erweitert GenericCrudController mit den CRUD-Routen getById und delete. Die Endpunkte getAll und save sind benutzerdefinierte Implementierungen, die es auch Gruppenleitern erlauben, Sitzungen fuer ihre Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Mit `?groupId=` filtern (enthaelt Namen). Gruppenleiter koennen Sitzungen fuer ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung nach ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter koennen Sitzungen fuer ihre eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung loeschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensaetze (eine Person, die an einem bestimmten Datum anwesend ist) und bietet den Check-in-Ablauf.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Mit `?personId=` filtern |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch nach ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten fuer Personen bei einem Gottesdienst laden. Gibt Besuche mit Besuchssitzungen des letzten erfassten Datums zurueck |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten uebermitteln. Erstellt/aktualisiert Besuche und Besuchssitzungen, entfernt veraltete Datensaetze |
| DELETE | `/:id` | JWT | Attendance.Edit | Einen Besuch loeschen |

### Beispiel: Check-in-Ablauf

**Schritt 1 -- Bestehende Check-in-Daten laden:**

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

**Schritt 2 -- Check-in uebermitteln:**

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

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (an welcher bestimmten Sitzung eine Person waehrend eines Besuchs teilgenommen hat). Bietet ausserdem einen Schnellprotokoll-Endpunkt und einen Download-/Export-Endpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Mit `?sessionId=` filtern. Gruppenleiter koennen Besuchssitzungen fuer ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung nach ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit fuer eine Sitzung herunterladen (gibt Personennamen mit Anwesend-/Abwesend-Status zurueck) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Die Anwesenheit einer Person schnell in einer Sitzung protokollieren. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleiter koennen die Anwesenheit fuer ihre eigenen Gruppen protokollieren |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung nach ID loeschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Loescht die Besuchssitzung und den uebergeordneten Besuch, falls keine Sitzungen verbleiben. Gruppenleiter koennen die Anwesenheit fuer ihre eigenen Gruppen entfernen |

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

## Streaks

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheitsserien fuer Einzelpersonen -- aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nuetzlich fuer Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | -- | Anwesenheitsserien fuer eine Person laden |

## Verwandte Seiten

- Mitgliedschafts-Endpunkte -- Personen, Gruppen, Rollen und Kirchenverwaltung
- Authentifizierung & Berechtigungen -- Anmeldeablauf, JWT, Berechtigungsmodell
- Modulstruktur -- Code-Organisationsmuster
