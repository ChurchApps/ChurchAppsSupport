---
title: "Anwesenheits-Endpunkte"
---

# Anwesenheits-Endpunkte

<div class="article-intro">

Das Anwesenheits-Modul verwaltet Campus-Standorte, Services, Service-Zeiten, Anwesenheitssitzungen, Besuche und Besuchssitzungen. Es bietet die Infrastruktur zur Verfolgung, wer welchen Service oder Gruppentreffen besucht hat, unterstützt Check-in-Workflows und bietet Anwesenheitstrend- und Zusammenfassungs-Berichterstattung.

</div>

**Basispfad:** `/attendance`

## Campusse

Basispfad: `/attendance/campuses`

Standard-CRUD-Controller (erweitert GenericCrudController). Bietet `getById`, `getAll`, `post` und `delete` Routen über die CRUD-Basisklasse.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | — | Alle Campusse für die Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Campus nach ID erhalten |
| POST | `/` | JWT | Services.Edit | Campusse erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Campus löschen |

## Services

Basispfad: `/attendance/services`

Erweitert GenericCrudController mit CRUD-Routen `getById`, `getAll`, `post` und `delete`. Die Endpunkte `getAll` (`GET /`) und `search` werden mit benutzerdefinierten Implementierungen überschrieben.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | — | Alle Services auflisten (einschließlich Campus-Info) |
| GET | `/:id` | JWT | — | Einen Service nach ID erhalten |
| GET | `/search?campusId=` | JWT | — | Services nach Campus-ID durchsuchen |
| POST | `/` | JWT | Services.Edit | Services erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Einen Service löschen |

## Service-Zeiten

Basispfad: `/attendance/servicetimes`

Erweitert GenericCrudController mit CRUD-Routen `getById`, `post` und `delete`. Die Endpunkte `getAll` und `search` sind benutzerdefinierte Implementierungen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | — | Alle Service-Zeiten auflisten. Filtern nach `?serviceId=`. Füge `?include=groups` hinzu, um Gruppendaten anzuhängen |
| GET | `/:id` | JWT | — | Eine Service-Zeit nach ID erhalten |
| GET | `/search?campusId=&serviceId=` | JWT | — | Service-Zeiten nach Campus und Service durchsuchen |
| POST | `/` | JWT | Services.Edit | Service-Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Services.Edit | Eine Service-Zeit löschen |

## Anwesenheitsdatensätze

Basispfad: `/attendance/attendancerecords`

Bietet schreibgeschützte Aggregatansichten von Anwesenheitsdaten für Berichterstattung und Anzeige.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | Attendance.View | Anwesenheitsdatensätze für eine Person laden. Erfordert `?personId=` |
| GET | `/tree` | JWT | — | Den vollständigen Anwesenheitsbaum laden (Campusse, Services, Service-Zeiten, Gruppen) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Anwesenheitstrend-Daten mit optionalen Filtern laden |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Gruppen-Anwesenheit für einen Service in einer bestimmten Woche laden |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Anwesenheitsdatensätze mit Filtern durchsuchen (Campus, Service, Service-Zeit, Gruppe, Datumsbereich) |

## Sitzungen

Basispfad: `/attendance/sessions`

Erweitert GenericCrudController mit CRUD-Routen `getById` und `delete`. Die Endpunkte `getAll` und `save` sind benutzerdefinierte Implementierungen, die es auch Gruppenleitern ermöglichen, Sitzungen für ihre Gruppen zu verwalten.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Alle Sitzungen auflisten. Filtern nach `?groupId=` (einschließlich Namen). Gruppenleiter können Sitzungen für ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Eine Sitzung nach ID erhalten |
| POST | `/` | JWT | Attendance.Edit oder Gruppenleiter | Sitzungen erstellen oder aktualisieren. Gruppenleiter können Sitzungen für ihre eigenen Gruppen speichern |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Sitzung löschen |

## Besuche

Basispfad: `/attendance/visits`

Verwaltet einzelne Besuchsdatensätze (eine Person, die an einem bestimmten Datum besucht) und bietet den Check-in-Workflow.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | Attendance.View | Alle Besuche auflisten. Filtern nach `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Einen Besuch nach ID erhalten |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View oder Attendance.Checkin | Check-in-Daten für Personen bei einem Service laden. Gibt Besuche mit Besuchssitzungen aus dem letzten protokollierten Datum zurück |
| POST | `/` | JWT | Attendance.Edit | Besuche erstellen oder aktualisieren |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit oder Attendance.Checkin | Check-in-Daten einreichen. Erstellt/aktualisiert Besuche und Besuchssitzungen, entfernt veraltete Datensätze |
| DELETE | `/:id` | JWT | Attendance.Edit | Einen Besuch löschen |

## Besuchssitzungen

Basispfad: `/attendance/visitsessions`

Verwaltet die Zuordnung zwischen Besuchen und Sitzungen (welche spezifische Sitzung eine Person während eines Besuchs besucht hat). Bietet auch einen Quick-Log-Endpunkt und einen Download-/Export-Endpunkt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/` | JWT | Attendance.View oder Gruppenleiter | Besuchssitzungen auflisten. Filtern nach `?sessionId=`. Gruppenleiter können Besuchssitzungen für ihre eigenen Gruppen anzeigen |
| GET | `/:id` | JWT | Attendance.View | Eine Besuchssitzung nach ID erhalten |
| GET | `/download/:sessionId` | JWT | Attendance.View | Anwesenheit für eine Sitzung herunterladen (gibt Personennamen mit anwesend/abwesend Status zurück) |
| POST | `/` | JWT | Attendance.Edit | Besuchssitzungen erstellen oder aktualisieren |
| POST | `/log` | JWT | Attendance.Edit oder Gruppenleiter | Schnell-Log-Anwesenheit einer Person zu einer Sitzung. Erstellt automatisch Besuch, falls erforderlich. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen protokollieren |
| DELETE | `/:id` | JWT | Attendance.Edit | Eine Besuchssitzung nach ID löschen |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit oder Gruppenleiter | Eine Person aus einer Sitzung entfernen. Löscht die Besuchssitzung und den übergeordneten Besuch, wenn keine Sitzungen verbleiben. Gruppenleiter können Anwesenheit für ihre eigenen Gruppen entfernen |

## Streaks

Basispfad: `/attendance/streaks`

Verfolgt Anwesenheits-Streaks für Einzelpersonen -- aufeinanderfolgende Wochen, in denen eine Person anwesend war. Nützlich für Engagement-Metriken und Gamifikation.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|-------------|-------------|
| GET | `/person/:personId` | JWT | — | Anwesenheits-Streaks für eine Person laden |

## Verwandte Seiten

- [Membership Endpunkte](./membership) -- Personen, Gruppen, Rollen und Kirchenverwaltung
- [Authentifizierung & Berechtigungen](./authentication) -- Anmeldungsfluss, JWT, Berechtigungsmodell
- [Modul-Struktur](../module-structure) -- Code-Organisationsmuster

