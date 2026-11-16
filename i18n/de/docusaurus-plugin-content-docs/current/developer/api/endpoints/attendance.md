---
title: "Anwesenheits-Endpunkte"
description: "Referenz für die Anwesenheits-API in B1 Admin und B1 Checkin: Standorte, Gottesdienste, Gottesdienstzeiten, Sitzungen, Besuche, Check-in-Regeln und Export-Endpunkte."
---

# Anwesenheits-Endpunkte {#attendance-endpoints}

<div class="article-intro">

Das Anwesenheitsmodul verwaltet Standorte, Gottesdienste, Gottesdienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es stellt die Infrastruktur bereit, um zu erfassen, wer an welchem Gottesdienst oder Gruppentreffen teilgenommen hat, unterstützt Check-in-Abläufe und bietet Auswertungen zu Anwesenheitstrends und Zusammenfassungen.

</div>

**Basispfad:** `/attendance`

## Standorte {#campuses}

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Stellt über die CRUD-Basisklasse die Routen `getById`, `getAll`, `post` und `delete` bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Standorte der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Standort anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Standorte erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Standort löschen |

## Gottesdienste {#services}

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` werden durch eigene Implementierungen überschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienste auflisten (inklusive Standortinformationen) |
| GET | `/:id` | JWT | — | Einen Gottesdienst anhand der ID abrufen |
| GET | `/search?campusId=` | JWT | — | Gottesdienste anhand der Standort-ID suchen |
| POST | `/` | JWT | Services.Edit | Gottesdienste erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Gottesdienst löschen |

### Beispiel: Gottesdienste nach Standort suchen {#example-search-services-by-campus}

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

## Gottesdienstzeiten {#service-times}

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController mit den CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienstzeiten auflisten. Mit `?serviceId=` filtern. Mit `?include=groups` werden Gruppendaten angehängt. Jede Zeile enthält einen berechneten Wert `checkinOpen` (Boolean, nur `false`, wenn die Gottesdienstzeit einen Check-in-Zeitplan hat, dessen Fenster gerade geschlossen ist). Das Fenster wird in der Zeitzone des Standorts des Gottesdienstes gemessen, danach in der Zeitzone der Kirche, dann in der des ersten Standorts mit einer Zeitzone und zuletzt in `America/New_York` |
| GET | `/:id` | JWT | — | Eine Gottesdienstzeit anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Gottesdienstzeiten nach Standort und Gottesdienst suchen |
| GET | `/public/:churchId` | Öffentlich | — | Die Baumstruktur Standort → Gottesdienst → Zeit für eine Kirche abrufen. Versorgt das Element `serviceTimes` des Website-Builders |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren. Optionale Zeitplanfelder: `dayOfWeek` (0 = Sonntag … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (vor Beginn), `checkinCloseMinutes` (nach Ende). Der Check-in ist nur zeitlich begrenzt, wenn sowohl `dayOfWeek` als auch `startTime` gesetzt sind |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit löschen |

## Gruppen-Gottesdienstzeiten {#group-service-times}

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Zuordnungen von Gruppe zu Gottesdienstzeit auflisten. Mit `?groupId=` filtern, um Zuordnungen mit Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | — | Eine Zuordnung von Gruppe zu Gottesdienstzeit anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Zuordnungen von Gruppe zu Gottesdienstzeit erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Zuordnung von Gruppe zu Gottesdienstzeit löschen |

## Anwesenheitsdatensätze {#attendance-records}

Basispfad: `/attendance/attendancerecords`

Stellt schreibgeschützte Gesamtansichten der Anwesenheitsdaten für Auswertungen und Anzeigen bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze einer Person laden. Erfordert `?personId=` |
| GET | `/my` | JWT | — | Nur eigene Daten: die Anwesenheitsdatensätze des angemeldeten Mitglieds aus den letzten 12 Monaten, neueste zuerst. Gibt `401` zurück, wenn der Benutzer keiner Person zugeordnet ist. Versorgt den Bereich **Meine Anwesenheit** auf der B1-Me-Seite |
| GET | `/tree` | JWT | — | Die vollständige Anwesenheitsstruktur laden (Standorte, Gottesdienste, Gottesdienstzeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Daten zum Anwesenheitstrend mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit für einen Gottesdienst in einer bestimmten Woche laden |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Gibt für jede Gruppe, die der Gottesdienstzeit zugewiesen ist, `{ groupId, sessionId, attendanceCount }` für das angegebene Datum zurück (`date` im Format `YYYY-MM-DD`; `sessionId` ist null, wenn die Gruppe keine Sitzung hat). Versorgt den Dialog **Wer braucht noch Anwesenheit?** in B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern durchsuchen (Standort, Gottesdienst, Gottesdienstzeit, Gruppe, Zeitraum) |

### Beispiel: Anwesenheitstrend {#example-attendance-trend}

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

## Sitzungen {#sessions}

Basispfad: `/attendance/sessions`

Erweitert GenericCrudController mit den CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind eigene Implementierungen, die außerdem Gruppenleitern erlauben, Sitzungen ihrer Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Mit `?groupId=` filtern (enthält Namen). Gruppenleiter können Sitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung anhand der ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen ihrer eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche {#visits}

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person nimmt an einem bestimmten Datum teil) und stellt den Check-in-Ablauf bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Mit `?personId=` filtern |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch anhand der ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Gottesdienst laden. Gibt Besuche mit Besuchssitzungen ab dem zuletzt erfassten Datum zurück |
| GET | `/active?peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Heutige Besuche der aufgelisteten Personen, die noch nicht ausgecheckt sind, mit befüllten Besuchssitzungen und Sitzungen. `peopleIds` (durch Kommas getrennt) ist erforderlich; ohne diesen Parameter 400. Wird vom Check-out per Name in B1Checkin verwendet |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten übermitteln. Erstellt oder aktualisiert Besuche und Besuchssitzungen und entfernt veraltete Datensätze |
| DELETE | `/:id` | JWT | Attendance.Edit | Einen Besuch löschen |

### Beispiel: Check-in-Ablauf {#example-check-in-flow}

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

Wenn eine angesteuerte Gottesdienstzeit einen Check-in-Zeitplan hat und dessen Fenster geschlossen ist (gemessen in derselben Reihenfolge der Zeitzonen wie bei `checkinOpen`, Standort zuerst), wird nichts gespeichert, und die Antwort lautet `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Überschreitungen von Kapazität und Betreuungsschlüssel (Freiwillige je Kinder) führen ebenfalls zu 409 (`error: "capacity"` oder `"ratio"`). Sitzungen, die eine Person bereits heute hat (wird bei jedem Check-in erneut übermittelt), überspringen die Fensterprüfung. So kann ein Haushalt eine später liegende Gottesdienstzeit hinzufügen, auch wenn das Fenster einer früheren Gottesdienstzeit bereits geschlossen ist.

## Besuchssitzungen {#visit-sessions}

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (welche konkrete Sitzung eine Person während eines Besuchs besucht hat). Außerdem gibt es einen Endpunkt für die schnelle Erfassung und einen Endpunkt zum Herunterladen bzw. Exportieren.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Mit `?sessionId=` filtern. Gruppenleiter können Besuchssitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung anhand der ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (gibt Personennamen mit Status anwesend/abwesend zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Anwesenheit einer Person schnell für eine Sitzung erfassen. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen erfassen |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung anhand der ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung und den übergeordneten Besuch, wenn keine Sitzungen mehr übrig sind. Gruppenleiter können die Anwesenheit für ihre eigenen Gruppen entfernen |

### Beispiel: Anwesenheit schnell erfassen {#example-quick-log-attendance}

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

### Beispiel: Anwesenheit einer Sitzung herunterladen {#example-download-session-attendance}

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

## Serien {#streaks}

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheitsserien einzelner Personen, also aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien einer Person laden |

## Verwandte Seiten {#related-pages}

- [Mitgliedschafts-Endpunkte](./membership.md) — Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung und Berechtigungen](./authentication.md) — Anmeldung, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure.md) — Muster der Code-Organisation
