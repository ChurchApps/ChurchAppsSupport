---
title: "Doing-Endpoints"
---

# Doing-Endpoints

<div class="article-intro">

Das Doing-Modul verwaltet Serviceplanung, Freiwilligeneinsatzplanung, Aufgabenverwaltung und Automatisierungen. Es bietet Werkzeuge zum Erstellen von Serviceplänen mit Zeiten und Positionen, zum Zuweisen von Freiwilligen, zum Verwalten von Sperrfristen, zum Erstellen von Service-Order-Elementen, zum Verbinden mit externen Content-Anbietern und zum Konfigurieren automatisierter Workflows mit Bedingungen und Aktionen.

</div>

**Basispfad:** `/doing`

## Pläne

Basispfad: `/doing/plans`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne für die Kirche auflisten |
| GET | `/:id` | JWT | — | Plan nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne nach komma-getrennten IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Plan-Typ abrufen |
| GET | `/presenter` | JWT | — | Pläne für die nächsten 7 Tage (Präsentatoransicht) |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Aktuellen Plan für einen Plan-Typ abrufen |
| POST | `/` | JWT | — | Pläne erstellen oder aktualisieren (akzeptiert einzelnes Objekt oder Array) |
| POST | `/copy/:id` | JWT | — | Einen Plan einschließlich Positionen, Zeiten, Zuweisungen und Service-Order-Elementen kopieren. Body enthält `copyMode` ("none", "positions", "all") und `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Freiwilligenaufgaben für einen Plan automatisch ausfüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Plan und alle zugehörigen Zeiten, Zuweisungen, Positionen und Planelemente löschen |

### Beispiel: Plan kopieren

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plan-Typen

Basispfad: `/doing/planTypes`

Erweitert CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — keine Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Plan-Typen auflisten |
| GET | `/:id` | JWT | — | Plan-Typ nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plan-Typen nach komma-getrennten IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Plan-Typen für einen Dienst abrufen |
| POST | `/` | JWT | — | Plan-Typen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Plan-Typ löschen |

## Plan-Elemente

Basispfad: `/doing/planItems`

Verwaltet Service-Order-Elemente (Überschriften, Abschnitte, Lieder, etc.) organisiert in einer Eltern-Kind-Baumstruktur.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Plan-Element nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plan-Elemente nach komma-getrennten IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Plan-Elemente für einen Plan abrufen (gibt Baumstruktur zurück) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Elemente für Präsentatoransicht abrufen (gibt Baumstruktur zurück) |
| POST | `/` | JWT | — | Plan-Elemente erstellen oder aktualisieren |
| POST | `/sort` | JWT | — | Sortierreihenfolge für ein Plan-Element aktualisieren (sortiert Geschwister neu) |
| DELETE | `/:id` | JWT | — | Plan-Element löschen |

## Plan-Feed

Basispfad: `/doing/planFeed`

Bietet Plan-Element-Feeds für den Präsentator. Falls keine Plan-Elemente existieren, wird automatisch aus dem Lessons.church-Venue-Feed mit der Plan-`contentId` des Plans gefüllt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Feed für Präsentator abrufen (füllt automatisch aus Venue-Feed, wenn leer) |

## Positionen

Basispfad: `/doing/positions`

Erweitert CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — keine Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Position nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen nach komma-getrennten IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen für mehrere Pläne nach komma-getrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen für einen Plan abrufen |
| POST | `/` | JWT | — | Positionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Position löschen |

## Zeiten

Basispfad: `/doing/times`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten für die Kirche auflisten |
| GET | `/:id` | JWT | — | Zeit nach ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten für mehrere Pläne nach komma-getrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten für einen Plan abrufen |
| POST | `/` | JWT | — | Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Zeit löschen |

## Zuweisungen

Basispfad: `/doing/assignments`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zuweisungen für den aktuellen Benutzer abrufen |
| GET | `/:id` | JWT | — | Zuweisung nach ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Zuweisungen für mehrere Pläne nach komma-getrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zuweisungen für einen Plan abrufen |
| POST | `/` | JWT | — | Zuweisungen erstellen oder aktualisieren (setzt Status standardmäßig auf "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Zuweisung akzeptieren (muss die zugewiesene Person sein) |
| POST | `/decline/:id` | JWT | — | Zuweisung ablehnen (muss die zugewiesene Person sein) |
| DELETE | `/:id` | JWT | — | Zuweisung löschen |

### Beispiel: Zuweisung akzeptieren

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Sperrfristen

Basispfad: `/doing/blockoutDates`

Erweitert CRUD-Basisklasse (GET `/:id`, DELETE `/:id` — keine Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Sperrfrist nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Sperrfristen nach komma-getrennten IDs abrufen |
| GET | `/my` | JWT | — | Sperrfristen für den aktuellen Benutzer abrufen |
| GET | `/upcoming` | JWT | — | Alle bevorstehenden Sperrfristen für die Kirche abrufen |
| POST | `/` | JWT | — | Sperrfristen erstellen oder aktualisieren (setzt personId standardmäßig auf aktuellen Benutzer, falls nicht angegeben) |
| DELETE | `/:id` | JWT | — | Sperrfrist löschen |

## Aufgaben

Basispfad: `/doing/tasks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben für den aktuellen Benutzer abrufen |
| GET | `/:id` | JWT | — | Aufgabe nach ID abrufen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben für den aktuellen Benutzer abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Timeline-Daten für Aufgaben nach komma-getrennten Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Verzeichnis-Update-Aufgabe für eine Person abrufen |
| POST | `/` | JWT | — | Aufgaben erstellen oder aktualisieren. Fügen Sie `?type=directoryUpdate` hinzu, um Verzeichnis-Update-Aufgaben zu verarbeiten (lädt Fotos automatisch hoch) |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |

## Automatisierungen

Basispfad: `/doing/automations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen für die Kirche auflisten |
| GET | `/:id` | JWT | — | Automatisierung nach ID abrufen |
| GET | `/check` | Öffentlich | — | Überprüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Automatisierung löschen |

## Aktionen

Basispfad: `/doing/actions`

Aktionen definieren, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Aktion nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen für eine Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Aktion löschen |

## Bedingungen

Basispfad: `/doing/conditions`

Bedingungen definieren die Kriterien, die eine Automatisierung auslösen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Bedingung nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen für eine Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Bedingung löschen |

## Verbindungen

Basispfad: `/doing/conjunctions`

Verbindungen verknüpfen mehrere Bedingungen in einer Automatisierung (AND/OR-Logik).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Verbindung nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verbindungen für eine Automatisierung abrufen |
| POST | `/` | JWT | — | Verbindungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Verbindung löschen |

## Content-Provider-Authentifizierungen

Basispfad: `/doing/contentProviderAuths`

Erweitert CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — keine Berechtigungsprüfungen).

Verwaltet OAuth-Authentifizierungsdatensätze für externe Content-Provider (z.B. Präsentationssoftware-Integrationen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Content-Provider-Auths auflisten |
| GET | `/:id` | JWT | — | Content-Provider-Auth nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Content-Provider-Auths nach komma-getrennten IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Content-Provider-Auths für einen Dienst abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Auth-Datensatz für einen bestimmten Dienst und Provider abrufen |
| POST | `/` | JWT | — | Content-Provider-Auths erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Content-Provider-Auth löschen |

## Provider-Proxy

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Content-Provider weiter (z.B. ProPresenter, EasyWorship). Handhabt Token-Aktualisierung automatisch, wenn Tokens ablaufen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Content-Provider-Dateien durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen von Content-Provider abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Playlist von Content-Provider abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen für ein Content-Element abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen für ein Content-Element abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten

- [Membership-Endpoints](./membership) — Personen, Gruppen, Rollen und Berechtigungen
- [Attendance-Endpoints](./attendance) — Service- und Besuchsverfolgung
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
