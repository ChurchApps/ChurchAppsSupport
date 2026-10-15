---
title: "Doing-Endpunkte"
---

# Doing-Endpunkte

<div class="article-intro">

Das Modul Doing verwaltet Dienstplanung, Einteilung von Freiwilligen, Aufgabenverwaltung und Automatisierungen. Es bietet Werkzeuge zum Anlegen von Dienstplänen mit Zeiten und Positionen, zum Zuweisen von Freiwilligen, zur Verwaltung von Sperrterminen, zum Aufbau von Gottesdienstablaufpunkten, zur Anbindung externer Inhaltsanbieter und zur Konfiguration automatisierter Workflows mit Bedingungen und Aktionen.

</div>

**Basispfad:** `/doing`

## Pläne

Basispfad: `/doing/plans`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Einen Plan anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne anhand kommagetrennter IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Planart abrufen |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + Bearbeitung des Dienstbereichs | Vorschau der Empfängerzahlen für **Freiwillige anschreiben** in der Dienstübersicht: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` für die Freiwilligen, die im Zeitraum eingeplant sind (eine Nachricht pro Person, abgemeldete und fehlende Nummern werden übersprungen, gemeinsam genutzte Nummern dedupliziert, auf 200 begrenzt) |
| GET | `/presenter` | JWT | — | Pläne der nächsten 7 Tage abrufen (Präsentationsansicht) |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Aktuellen Plan einer Planart abrufen |
| GET | `/public/signup/:churchId` | Öffentlich | — | Für die Selbsteintragung geöffnete Pläne, der früheste zuerst, jeweils mit ihren Positionen für die Selbsteintragung (sortiert nach `categoryName`, dann `name`, zusätzlich `filledCount` der Zuweisungen mit Status Accepted/Unconfirmed) und Zeiten. Keine Namen von Freiwilligen. Ist die Gemeindeeinstellung `volunteerSignupNextOnly` auf `"true"` gesetzt, wird nur der erste Plan jeder Planart zurückgegeben |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` für die Positionen des Plans zur Selbsteintragung (Anzeigenamen der Zugewiesenen mit Status Accepted/Unconfirmed). Gibt `[]` zurück, solange `showVolunteerNames` des Plans nicht aktiviert ist |
| POST | `/` | JWT | — | Pläne anlegen oder aktualisieren (akzeptiert ein einzelnes Objekt oder ein Array) |
| POST | `/copy/:id` | JWT | Bearbeitung des Dienstbereichs | Einen Plan kopieren, einschließlich Positionen, Zeiten, Zuweisungen und Gottesdienstablaufpunkten. Der Body enthält `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) und `copyServiceOrder` (boolesch). Ohne `targetPlanId` wird ein neuer Plan angelegt; `notes`, `signupDeadlineHours`, `showVolunteerNames` und `autoReplaceOnDecline` werden aus dem Quellplan übernommen, sofern der Body keine Werte vorgibt. Mit `targetPlanId` wird stattdessen dieser bestehende Plan befüllt (der Aufrufer muss ihn bearbeiten dürfen). Die Option **Wöchentlich wiederholen** in B1Admin ruft dies einmal pro Woche auf, wobei jeweils aus dem Plan der Vorwoche kopiert wird |
| POST | `/textRange` | JWT | `texting.send` + Bearbeitung des Dienstbereichs | Jeden Freiwilligen, der in einem Datumsbereich eingeplant ist, über den Textnachrichten-Anbieter der Gemeinde anschreiben. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (Nachricht bis zu 1600 Zeichen; Platzhalter werden pro Empfänger aufgelöst). Gibt die Vorschau-Zahlen sowie `recipientCount`, `successCount`, `failCount` und `error` zurück (`no_provider` oder `insufficient_credits`), wenn der Versand vorzeitig abbricht |
| POST | `/autofill/:id` | JWT | — | Freiwilligenzuweisungen für einen Plan automatisch befüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Einen Plan sowie alle zugehörigen Zeiten, Zuweisungen, Positionen und Planpunkte löschen |

### Beispiel: Einen Plan kopieren

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

## Planarten

Basispfad: `/doing/planTypes`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Planarten auflisten |
| GET | `/:id` | JWT | — | Eine Planart anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Planarten anhand kommagetrennter IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Planarten eines Dienstbereichs abrufen |
| POST | `/` | JWT | — | Planarten anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Planart löschen |

## Planpunkte

Basispfad: `/doing/planItems`

Verwaltet Gottesdienstablaufpunkte (Überschriften, Abschnitte, Lieder usw.), die in einer Eltern-Kind-Baumstruktur organisiert sind.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Planpunkt anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Planpunkte anhand kommagetrennter IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Planpunkte eines Plans abrufen (liefert eine Baumstruktur) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planpunkte für die Präsentationsansicht abrufen (liefert eine Baumstruktur) |
| POST | `/` | JWT | — | Planpunkte anlegen oder aktualisieren |
| POST | `/sort` | JWT | — | Sortierreihenfolge eines Planpunkts aktualisieren (sortiert die Geschwisterelemente neu) |
| DELETE | `/:id` | JWT | — | Einen Planpunkt löschen |

## Planfeed

Basispfad: `/doing/planFeed`

Stellt Planpunkt-Feeds für die Präsentation bereit. Sind keine Planpunkte vorhanden, werden sie automatisch aus dem Venue-Feed von Lessons.church anhand der `contentId` des Plans befüllt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planfeed für die Präsentation abrufen (wird bei leerem Feed automatisch aus dem Venue-Feed befüllt) |

## Positionen

Basispfad: `/doing/positions`

Erweitert die CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Position anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen anhand kommagetrennter IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen eines Plans abrufen |
| POST | `/` | JWT | — | Positionen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Position löschen |

## Zeiten

Basispfad: `/doing/times`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Eine Zeit anhand der ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten eines Plans abrufen |
| POST | `/` | JWT | — | Zeiten anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Zeit löschen |

## Zuweisungen

Basispfad: `/doing/assignments`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zuweisungen des aktuellen Benutzers abrufen |
| GET | `/my/upcoming` | JWT | — | Bis zu 20 Zuweisungen des aktuellen Benutzers für Pläne ab gestern, der früheste zuerst (Pläne im Status „penciled-in“ oder `prepared` werden übersprungen): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Wird für die Dienstvorschau auf der Startseite des Mitglieds verwendet |
| GET | `/:id` | JWT | — | Eine Zuweisung anhand der ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Zuweisungen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zuweisungen eines Plans abrufen |
| POST | `/` | JWT | — | Zuweisungen anlegen oder aktualisieren (Status ist standardmäßig „Unconfirmed“) |
| POST | `/accept/:id` | JWT | — | Eine Zuweisung annehmen (muss die zugewiesene Person sein) |
| POST | `/decline/:id` | JWT | — | Eine Zuweisung ablehnen (muss die zugewiesene Person sein) |
| DELETE | `/:id` | JWT | — | Eine Zuweisung löschen |

### Beispiel: Eine Zuweisung annehmen

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

## Sperrtermine

Basispfad: `/doing/blockoutDates`

Erweitert die CRUD-Basisklasse (GET `/:id`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Sperrtermin anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Sperrtermine anhand kommagetrennter IDs abrufen |
| GET | `/my` | JWT | — | Sperrtermine des aktuellen Benutzers abrufen |
| GET | `/upcoming` | JWT | — | Alle kommenden Sperrtermine der Gemeinde abrufen |
| POST | `/` | JWT | — | Sperrtermine anlegen oder aktualisieren (setzt `personId` standardmäßig auf den aktuellen Benutzer, falls nicht angegeben) |
| DELETE | `/:id` | JWT | — | Einen Sperrtermin löschen |

## Aufgaben

Basispfad: `/doing/tasks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/:id` | JWT | — | Eine Aufgabe anhand der ID abrufen |
| GET | `/:id/contact` | JWT | Kann die Karte einsehen | Kontaktdaten der Person, auf die sich eine Workflow-Karte bezieht: `{ personId, displayName, mobilePhone, email }`. Ermöglicht einem zugewiesenen Anrufer ohne Zugriff auf Personen, die Person zu erreichen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Zeitleistendaten für Aufgaben anhand kommagetrennter Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Aufgabe zur Verzeichnisaktualisierung für eine Person abrufen |
| POST | `/` | JWT | — | Aufgaben anlegen oder aktualisieren. Mit `?type=directoryUpdate` werden Aufgaben zur Verzeichnisaktualisierung verarbeitet (Fotos werden automatisch hochgeladen) |
| POST | `/:id/conversation` | JWT | `tasks.edit` oder Bearbeiter der Karte | Die Notizunterhaltung einer Karte zuordnen. Body: `{ conversationId }`. Die zuerst zugeordnete Unterhaltung bleibt erhalten; spätere Aufrufe geben die Karte unverändert zurück |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |

## Automatisierungen

Basispfad: `/doing/automations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Eine Automatisierung anhand der ID abrufen |
| GET | `/check` | Öffentlich | — | Eine Prüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Automatisierung löschen |

## Aktionen

Basispfad: `/doing/actions`

Aktionen legen fest, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Aktion anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Aktion löschen |

## Bedingungen

Basispfad: `/doing/conditions`

Bedingungen legen die Kriterien fest, die eine Automatisierung auslösen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Bedingung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Bedingung löschen |

## Verknüpfungen

Basispfad: `/doing/conjunctions`

Verknüpfungen verbinden mehrere Bedingungen innerhalb einer Automatisierung (UND-/ODER-Logik).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verknüpfungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Verknüpfungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung löschen |

## Authentifizierungen von Inhaltsanbietern

Basispfad: `/doing/contentProviderAuths`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

Verwaltet OAuth-Authentifizierungsdaten für externe Inhaltsanbieter (z. B. Integrationen mit Präsentationssoftware).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Authentifizierungen von Inhaltsanbietern auflisten |
| GET | `/:id` | JWT | — | Eine Authentifizierung eines Inhaltsanbieters anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Authentifizierungen anhand kommagetrennter IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Authentifizierungen von Inhaltsanbietern eines Dienstbereichs abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Authentifizierungsdaten für einen bestimmten Dienstbereich und Anbieter abrufen |
| POST | `/` | JWT | — | Authentifizierungen von Inhaltsanbietern anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Authentifizierung eines Inhaltsanbieters löschen |

## Provider-Proxy

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Inhaltsanbieter weiter (z. B. ProPresenter, EasyWorship). Läuft ein Token ab, wird es automatisch erneuert.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Dateien des Inhaltsanbieters durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Eine Playlist von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Gruppen, Rollen und Berechtigungen
- [Attendance-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Muster zur Code-Organisation
