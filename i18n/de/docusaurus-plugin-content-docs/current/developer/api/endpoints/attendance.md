---
title: "Anwesenheit-Endpunkte"
---

# Anwesenheit-Endpunkte

<div class="article-intro">

Das Anwesenheit-Modul verwaltet Standorte, Gottesdienste, Gottesdienstzeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es bildet die Grundlage, um zu erfassen, wer an welchem Gottesdienst oder Gruppentreffen teilgenommen hat, unterstützt Check-in-Abläufe und bietet Auswertungen zu Trends und Zusammenfassungen der Anwesenheit.

</div>

**Basispfad:** `/attendance`

## Standorte

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erbt von GenericCrudController). Stellt die Routen `getById`, `getAll`, `post` und `delete` über die CRUD-Basisklasse bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Standorte der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Standort anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Standorte erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Standort löschen |

## Gottesdienste

Basispfad: `/attendance/services`

Erbt von GenericCrudController mit den CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` sind durch eigene Implementierungen überschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienste auflisten (einschließlich Standortinformationen) |
| GET | `/:id` | JWT | — | Einen Gottesdienst anhand der ID abrufen |
| GET | `/search?campusId=` | JWT | — | Gottesdienste nach Standort-ID suchen |
| POST | `/` | JWT | Services.Edit | Gottesdienste erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Gottesdienst löschen |

### Beispiel: Gottesdienste nach Standort suchen

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

Erbt von GenericCrudController mit den CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind eigene Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gottesdienstzeiten auflisten. Filtern mit `?serviceId=`. Mit `?include=groups` werden Gruppendaten angehängt. Jede Zeile enthält einen berechneten booleschen Wert `checkinOpen` (nur dann `false`, wenn die Gottesdienstzeit einen Check-in-Zeitplan hat und dessen Fenster gerade geschlossen ist). Das Fenster wird in der Zeitzone des Standorts des Gottesdienstes berechnet, dann in der Zeitzone der Kirche, dann in der Zeitzone des ersten Standorts mit einer Zeitzone und schließlich in `America/New_York` |
| GET | `/:id` | JWT | — | Eine Gottesdienstzeit anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=` | JWT | — | Gottesdienstzeiten nach Standort und Gottesdienst suchen |
| GET | `/public/:churchId` | Öffentlich | — | Den Baum aus Standort → Gottesdienst → Zeit für eine Kirche abrufen. Speist das Element `serviceTimes` des Website-Baukastens |
| POST | `/` | JWT | Services.Edit | Gottesdienstzeiten erstellen oder aktualisieren. Optionale Zeitplanfelder: `dayOfWeek` (0 = Sonntag … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (vor Beginn), `checkinCloseMinutes` (nach Ende). Der Check-in ist nur dann zeitlich begrenzt, wenn `dayOfWeek` und `startTime` beide gesetzt sind |
| DELETE | `/:id` | JWT | Services.Edit | Eine Gottesdienstzeit löschen |

## Gruppen-Gottesdienstzeiten

Basispfad: `/attendance/groupservicetimes`

Verknüpft Gruppen mit bestimmten Gottesdienstzeiten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Zuordnungen von Gruppe zu Gottesdienstzeit auflisten. Mit `?groupId=` filtern, um Zuordnungen mit Gottesdienstnamen zu erhalten |
| GET | `/:id` | JWT | — | Eine Zuordnung von Gruppe zu Gottesdienstzeit anhand der ID abrufen |
| POST | `/` | JWT | Services.Edit | Zuordnungen von Gruppe zu Gottesdienstzeit erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Zuordnung von Gruppe zu Gottesdienstzeit löschen |

## Anwesenheitsdatensätze

Basispfad: `/attendance/attendancerecords`

Bietet schreibgeschützte Gesamtansichten der Anwesenheitsdaten für Auswertungen und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze einer Person laden. Erforderlich: `?personId=` |
| GET | `/my` | JWT | — | Selbstbezogen: die eigenen Anwesenheitsdatensätze des angemeldeten Mitglieds aus den letzten 12 Monaten, neueste zuerst. Gibt `401` zurück, wenn der Benutzer keiner Person zugeordnet ist. Speist den Abschnitt **Meine Anwesenheit** der Seite Ich im B1-Mitgliederportal |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheitsbaum laden (Standorte, Gottesdienste, Gottesdienstzeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Anwesenheitstrends mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppenanwesenheit für einen Gottesdienst in einer bestimmten Woche laden |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Gibt für jede Gruppe, die der Gottesdienstzeit zugeordnet ist, `{ groupId, sessionId, attendanceCount }` für dieses Datum zurück (`date` im Format `YYYY-MM-DD`; `sessionId` ist null, wenn die Gruppe keine Sitzung hat). Speist den Dialog **Wer noch Anwesenheit braucht** in B1 Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern durchsuchen (Standort, Gottesdienst, Gottesdienstzeit, Gruppe, Datumsbereich) |

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

Erbt von GenericCrudController mit den CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind eigene Implementierungen, die auch Gruppenleitenden erlauben, Sitzungen ihrer Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleitung | Alle Sitzungen auflisten. Mit `?groupId=` filtern (enthält Namen). Gruppenleitende können Sitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung anhand der ID abrufen |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleitung | Sitzungen erstellen oder aktualisieren. Gruppenleitende können Sitzungen ihrer eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person nimmt an einem bestimmten Datum teil) und stellt den Check-in-Ablauf bereit.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Mit `?personId=` filtern |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch anhand der ID abrufen |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Gottesdienst laden. Gibt Besuche mit Besuchssitzungen aus dem zuletzt erfassten Datum zurück |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten übermitteln. Erstellt bzw. aktualisiert Besuche und Besuchssitzungen und entfernt veraltete Datensätze |
| DELETE | `/:id` | JWT | Attendance.Edit | Einen Besuch löschen |

### Beispiel: Check-in-Ablauf

**Schritt 1 – Vorhandene Check-in-Daten laden:**

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

**Schritt 2 – Check-in übermitteln:**

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

Ist für eine angesteuerte Gottesdienstzeit ein Check-in-Zeitplan hinterlegt und ihr Fenster geschlossen (berechnet in derselben standortbezogenen Reihenfolge der Zeitzonen wie `checkinOpen`), wird nichts gespeichert, und die Antwort lautet `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Verstöße gegen Kapazität und Betreuungsschlüssel führen ebenfalls zu 409 (`error: "capacity"` oder `"ratio"`). Sitzungen, die eine Person heute bereits hält (und bei jedem Check-in erneut gesendet werden), überspringen die Fensterprüfung. So kann ein Haushalt eine geöffnete Gottesdienstzeit hinzufügen, nachdem das Fenster einer früheren Zeit geschlossen ist.

## Besuchssitzungen

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (welcher bestimmten Sitzung eine Person während eines Besuchs beigewohnt hat). Bietet außerdem einen Schnellerfassungs-Endpunkt und einen Download-/Exportendpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleitung | Besuchssitzungen auflisten. Mit `?sessionId=` filtern. Gruppenleitende können Besuchssitzungen ihrer eigenen Gruppen einsehen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung anhand der ID abrufen |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit einer Sitzung herunterladen (gibt Personennamen mit Status „anwesend“/„abwesend“ zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleitung | Anwesenheit einer Person schnell in einer Sitzung erfassen. Erstellt bei Bedarf automatisch einen Besuch. Gruppenleitende können die Anwesenheit ihrer eigenen Gruppen erfassen |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung anhand der ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleitung | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung und den übergeordneten Besuch, wenn keine Sitzungen mehr übrig sind. Gruppenleitende können die Anwesenheit ihrer eigenen Gruppen entfernen |

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

Verfolgt Anwesenheitsserien einzelner Personen – aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Kennzahlen und Gamification.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheitsserien einer Person laden |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) – Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) – Anmeldeablauf, JWT, Berechtigungsmodell
- [Modulstruktur](../module-structure) – Organisation des Codes
