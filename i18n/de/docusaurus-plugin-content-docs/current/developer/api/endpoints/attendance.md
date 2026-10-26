---
title: "Anwesenheit-Endpunkte"
---

# Anwesenheit-Endpunkte

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Campus-Standorte, Gottesdienste, Gottesdienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es stellt die Infrastruktur bereit, um zu erfassen, wer an welchem Gottesdienst oder Gruppentreffen teilgenommen hat, unterstützt Check-in-Abläufe und bietet Auswertungen zu Anwesenheitstrends und Zusammenfassungen.

</div>

**Basispfad:** `/attendance`

## Campus

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Stellt die Routen `getById`, `getAll`, `post` und `delete` über die CRUD-Basisklasse bereit.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Campus der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Campus anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Campus erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Campus löschen |

## Gottesdienste

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` sind durch eigene Implementierungen ersetzt.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
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
    "name": "Sonntagmorgen"
  }
]
```

## Gottesdienstzeiten

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController mit den CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind eigene Implementierungen.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienstzeiten auflisten. Mit `?serviceId=` filtern. Mit `?include=groups` werden Gruppendaten angehängt. Jede Zeile enthält einen berechneten Wert `checkinOpen` (Boolean; nur `false`, wenn die Gottesdienstzeit einen Check-in-Zeitplan hat, dessen Fenster gerade geschlossen ist). Das Fenster wird in der Zeitzone des Campus des Gottesdienstes gemessen, dann in der Zeitzone der Kirche, dann in der Zeitzone des ersten Campus, der eine hat, und schließlich in `America/New_York` |
| GET | `/:id` | JWT | — | Eine Gottesdienstzeit anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Gottesdienstzeiten nach Campus und Gottesdienst suchen |
| GET | `/public/:churchId` | Öffentlich | — | Den Baum aus Campus, Gottesdienst und Zeit für eine Kirche abrufen. Speist das Element `serviceTimes` des Website-Builders |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren. Optionale Zeitplanfelder: `dayOfWeek` (0 = Sonntag … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (vor Beginn), `checkinCloseMinutes` (nach Ende). Der Check-in ist nur dann zeitlich begrenzt, wenn sowohl `dayOfWeek` als auch `startTime` gesetzt sind |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit löschen |

## Gruppen-Gottesdienstzeiten

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Zuordnungen von Gruppe zu Gottesdienstzeit auflisten. Mit `?groupId=` filtern, um Zuordnungen mit Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | — | Eine Zuordnung von Gruppe zu Gottesdienstzeit anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Zuordnungen von Gruppe zu Gottesdienstzeit erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Zuordnung von Gruppe zu Gottesdienstzeit löschen |

## Anwesenheitsdatensätze

Basispfad: `/attendance/attendancerecords`

Stellt schreibgeschützte, aggregierte Ansichten der Anwesenheitsdaten für Auswertungen und Anzeige bereit.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze einer Person laden. `?personId=` ist erforderlich |
| GET | `/my` | JWT | — | Nur für den eigenen Bereich: die Anwesenheitsdatensätze des angemeldeten Mitglieds aus den letzten 12 Monaten, neueste zuerst. Gibt `401` zurück, wenn der Benutzer keiner Person zugeordnet ist. Speist den Abschnitt **Meine Anwesenheit** auf der B1-Me-Seite |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheitsbaum laden (Campus, Gottesdienste, Gottesdienstzeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Daten zum Anwesenheitstrend mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit für einen Gottesdienst in einer bestimmten Woche laden |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Für jede Gruppe, die der Gottesdienstzeit zugewiesen ist, `{ groupId, sessionId, attendanceCount }` für das Datum zurückgeben (`date` im Format `YYYY-MM-DD`; `sessionId` ist null, wenn die Gruppe keine Sitzung hat). Speist den Dialog **Wer braucht noch Anwesenheit?** in B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern suchen (Campus, Gottesdienst, Gottesdienstzeit, Gruppe, Datumsbereich) |

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

Erweitert GenericCrudController mit den CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind eigene Implementierungen, die außerdem Gruppenleitern erlauben, Sitzungen für ihre Gruppen zu verwalten.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Mit `?groupId=` filtern (inklusive Namen). Gruppenleiter können Sitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung anhand der ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen ihrer eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person nimmt an einem bestimmten Datum teil) und stellt den Check-in-Ablauf bereit.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Mit `?personId=` filtern |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch anhand der ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Gottesdienst laden. Gibt Besuche mit Besuchssitzungen vom zuletzt erfassten Datum zurück |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten übermitteln. Erstellt bzw. aktualisiert Besuche und Besuchssitzungen und entfernt veraltete Datensätze |
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

Wenn eine angefragte Gottesdienstzeit einen Check-in-Zeitplan hat und dessen Fenster geschlossen ist (gemessen in derselben Reihenfolge der Zeitzonen, die bei `checkinOpen` gilt, zuerst Campus), wird nichts gespeichert und die Antwort lautet `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Verstöße gegen Kapazität und Betreuungsschlüssel führen ebenfalls zu 409 (`error: "capacity"` oder `"ratio"`). Sitzungen, die eine Person bereits heute hat (bei jedem Check-in erneut übermittelt), überspringen die Fensterprüfung. So kann ein Haushalt eine offene Gottesdienstzeit hinzufügen, nachdem das Fenster einer früheren Zeit bereits geschlossen ist.

## Besuchssitzungen

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (welche konkrete Sitzung eine Person bei einem Besuch besucht hat). Stellt außerdem einen Schnell-Erfassungsendpunkt und einen Download-/Exportendpunkt bereit.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Mit `?sessionId=` filtern. Gruppenleiter können Besuchssitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung anhand der ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (gibt Namen der Personen mit Status „anwesend“/„abwesend“ zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Die Anwesenheit einer Person schnell für eine Sitzung erfassen. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen erfassen |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung anhand der ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung und den übergeordneten Besuch, wenn keine Sitzungen mehr übrig sind. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen entfernen |

### Beispiel: Anwesenheit schnell erfassen

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

### Beispiel: Anwesenheit einer Sitzung herunterladen

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

Verfolgt Anwesenheitsserien einzelner Personen -- aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien einer Person laden |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung und Berechtigungen](./authentication) — Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) — Muster der Code-Organisation
