---
title: "Doing-Endpunkte"
description: "Endpunkt-Referenz für die Doing-API hinter Gottesdienstplänen, Freiwilligeneinsätzen, Aufgaben und Automatisierungen in B1 Admin, mit Pfaden, Auth und Berechtigungen."
---

# Doing-Endpunkte {#doing-endpoints}

<div class="article-intro">

Das Doing-Modul verwaltet Gottesdienstplanung, Freiwilligenplanung, Aufgabenverwaltung und Automatisierungen. Es bietet Werkzeuge, um Gottesdienstpläne mit Zeiten und Positionen zu erstellen, Freiwillige zuzuweisen, Sperrtermine zu verwalten, Elemente der Gottesdienstordnung aufzubauen, sich mit externen Inhaltsanbietern zu verbinden und automatisierte Abläufe mit Bedingungen und Aktionen zu konfigurieren.

</div>

**Basispfad:** `/doing`

## Pläne {#plans}

Basispfad: `/doing/plans`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Plan anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne anhand durch Kommas getrennter IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Plantyp abrufen |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + Dienstbereich bearbeiten | Vorschau der Dienstübersicht, die **Ehrenamtliche per Text** senden: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` für die im Zeitraum eingeteilten Freiwilligen (eine Zählung pro Person, abgemeldete und fehlende Nummern werden übersprungen, gemeinsam genutzte Nummern dedupliziert, begrenzt auf 200) |
| GET | `/presenter` | JWT | — | Pläne der nächsten 7 Tage abrufen (Präsentationsansicht) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Dienstbereich bearbeiten | Aktive Workflows zur Bestätigung von Dienst-Einteilungen (`workflowType = "assignmentConfirmation"`), die ein Plan auswählen kann: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Den aktuellen Plan für einen Plantyp abrufen |
| GET | `/public/signup/:churchId` | Öffentlich | — | Pläne, die für die Selbstanmeldung offen sind, die nächsten zuerst, jeweils mit ihren Selbstanmeldungs-Positionen (sortiert nach `categoryName`, dann `name`, zusätzlich `filledCount` der Zuweisungen mit Status Angenommen/Unbestätigt) und Zeiten. Keine Namen von Freiwilligen. Ist die Kirchen-Einstellung `volunteerSignupNextOnly` auf `"true"` gesetzt, wird nur der erste Plan jedes Plantyps zurückgegeben. Jeder `plan` enthält einen berechneten Wert `signupDeadline` (ISO-Zeitpunkt oder `null`): `signupDeadlineHours` vor der frühesten Zeit vom Typ `service` des Plans (bei fehlender Gottesdienstzeit eine beliebige Zeitangabe; hat der Plan keine Zeiten, 9:00 Uhr in der Zeitzone der Kirche am `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` für die Selbstanmeldungs-Positionen des Plans (Anzeigenamen der Personen mit Status Angenommen/Unbestätigt). Gibt `[]` zurück, sofern `showVolunteerNames` des Plans nicht aktiviert ist |
| POST | `/` | JWT | — | Pläne erstellen oder aktualisieren (akzeptiert ein einzelnes Objekt oder ein Array). Setzen Sie `confirmationWorkflowId`, um den Plan für einen Bestätigungs-Workflow des Gottesdienstes zu aktivieren, oder `null`, um ihn für künftige Anfragen abzumelden. Senden Sie `signupDeadlineHours: null`, um eine Frist zu entfernen; fehlt das Feld, bleibt der gespeicherte Wert erhalten |
| POST | `/copy/:id` | JWT | Dienstbereich bearbeiten | Einen Plan einschließlich Positionen, Zeiten, Einteilungen und Elementen der Gottesdienstordnung kopieren. Der Body enthält `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") und `copyServiceOrder` (boolean). Ohne `targetPlanId` wird ein neuer Plan erstellt; `notes`, `signupDeadlineHours`, `showVolunteerNames` und `autoReplaceOnDecline` werden vom Quellplan übernommen, sofern der Body sie nicht angibt. Mit `targetPlanId` füllt die Kopie stattdessen diesen bestehenden Plan (der Aufrufer muss ihn bearbeiten dürfen). Die Option **Wöchentlich wiederholen** in B1Admin ruft dies einmal pro Woche auf, wobei jedes Mal aus dem Plan der Vorwoche kopiert wird |
| POST | `/textRange` | JWT | `texting.send` + Dienstbereich bearbeiten | Alle Freiwilligen, die in einem Datumsbereich eingeteilt sind, über den Textnachrichten-Anbieter der Kirche anschreiben. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (message bis 1600 Zeichen; Platzhalter werden pro Empfänger aufgelöst). Gibt die Vorschau-Zählungen sowie `recipientCount`, `successCount`, `failCount` und `error` (`no_provider` oder `insufficient_credits`) zurück, wenn der Versand vorzeitig abbricht |
| POST | `/:id/issueRequests` | JWT | Plan bearbeiten | Die neuen, noch nicht unterrichteten Einteilungen des Plans mit dem Status Unbestätigt über den Bestätigungs-Workflow ausgeben: markiert jede als benachrichtigt und startet je Einteilung eine Workflow-Karte. Leerer Body; gibt `{ issued }` zurück. Schlägt fehl, sofern der Plan nicht veröffentlicht ist (nicht `prepared`), keine aktive `confirmationWorkflowId` mit mindestens einem Schritt hat oder seine Antwortfrist abgelaufen ist |
| POST | `/autofill/:id` | JWT | — | Freiwilligeneinteilungen für einen Plan automatisch ausfüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Einen Plan sowie alle zugehörigen Zeiten, Einteilungen, Positionen und Planelemente löschen |

### Beispiel: Einen Plan kopieren {#example-copy-a-plan}

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

## Plantypen {#plan-types}

Basispfad: `/doing/planTypes`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Plantypen auflisten |
| GET | `/:id` | JWT | — | Einen Plantyp anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plantypen anhand durch Kommas getrennter IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Plantypen eines Dienstbereichs abrufen |
| POST | `/` | JWT | — | Plantypen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Einen Plantyp löschen |

## Planelemente {#plan-items}

Basispfad: `/doing/planItems`

Verwaltet Elemente der Gottesdienstordnung (Überschriften, Abschnitte, Lieder usw.), die in einer Baumstruktur aus übergeordneten und untergeordneten Elementen organisiert sind.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Planelement anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Planelemente anhand durch Kommas getrennter IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Planelemente eines Plans abrufen (liefert die Baumstruktur zurück) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planelemente für die Präsentationsansicht abrufen (liefert die Baumstruktur zurück) |
| POST | `/` | JWT | — | Planelemente erstellen oder aktualisieren |
| POST | `/sort` | JWT | — | Sortierreihenfolge eines Planelements aktualisieren (sortiert die Geschwisterelemente neu) |
| DELETE | `/:id` | JWT | — | Ein Planelement löschen |

## Planfeed {#plan-feed}

Basispfad: `/doing/planFeed`

Stellt Feeds mit Planelementen für die Präsentation bereit. Gibt es keine Planelemente, werden sie automatisch aus dem Venue-Feed von Lessons.church anhand der `contentId` des Plans befüllt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planfeed für die Präsentation abrufen (wird bei leerem Feed automatisch aus dem Venue-Feed befüllt) |

## Positionen {#positions}

Basispfad: `/doing/positions`

Erweitert die CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Position anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen anhand durch Kommas getrennter IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen mehrerer Pläne anhand durch Kommas getrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen eines Plans abrufen |
| POST | `/` | JWT | — | Positionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Position löschen |

## Zeiten {#times}

Basispfad: `/doing/times`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Zeit anhand der ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten mehrerer Pläne anhand durch Kommas getrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten eines Plans abrufen |
| POST | `/` | JWT | — | Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Zeit löschen |

## Einteilungen {#assignments}

Basispfad: `/doing/assignments`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Einteilungen des aktuellen Benutzers abrufen |
| GET | `/my/upcoming` | JWT | — | Bis zu 20 Einteilungen des aktuellen Benutzers für Pläne ab dem gestrigen Tag (Pläne im Status „vorgemerkt“ bzw. `prepared` werden übersprungen), die nächsten zuerst: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Versorgt die Vorschau der Dienste auf der Startseite für Mitglieder |
| GET | `/:id` | JWT | — | Eine Einteilung anhand der ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Einteilungen mehrerer Pläne anhand durch Kommas getrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Einteilungen eines Plans abrufen |
| POST | `/` | JWT | — | Einteilungen erstellen oder aktualisieren (setzt den Status standardmäßig auf „Unbestätigt“) |
| POST | `/accept/:id` | JWT | — | Eine Einteilung annehmen (muss die eingeteilte Person sein) |
| POST | `/decline/:id` | JWT | — | Eine Einteilung ablehnen (muss die eingeteilte Person sein) |
| POST | `/signup` | JWT | — | Selbstanmeldung für eine Position. Body: `{ positionId }`. Die Position muss Selbstanmeldung erlauben und freie Plätze haben; es wird eine Einteilung mit dem Status Angenommen erstellt. Wird mit „Anmeldefrist abgelaufen“ abgelehnt, sobald die Anmeldefrist des Plans abgelaufen ist (zurückgerechnet ab der ersten Gottesdienstzeit, wie oben beschrieben) |
| DELETE | `/signup/:id` | JWT | — | Die eigene Selbstanmeldung entfernen. Wird nach Ablauf der Anmeldefrist des Plans mit „Frist zum Entfernen abgelaufen“ abgelehnt |
| DELETE | `/:id` | JWT | — | Eine Einteilung löschen |

### Beispiel: Eine Einteilung annehmen {#example-accept-an-assignment}

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

## Sperrtermine {#blockout-dates}

Basispfad: `/doing/blockoutDates`

Erweitert die CRUD-Basisklasse (GET `/:id`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Sperrtermin anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Sperrtermine anhand durch Kommas getrennter IDs abrufen |
| GET | `/my` | JWT | — | Sperrtermine des aktuellen Benutzers abrufen |
| GET | `/upcoming` | JWT | — | Alle kommenden Sperrtermine der Kirche abrufen |
| POST | `/` | JWT | — | Sperrtermine erstellen oder aktualisieren (setzt personId standardmäßig auf den aktuellen Benutzer, falls nicht angegeben) |
| DELETE | `/:id` | JWT | — | Einen Sperrtermin löschen |

## Aufgaben {#tasks}

Basispfad: `/doing/tasks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/:id` | JWT | — | Eine Aufgabe anhand der ID abrufen |
| GET | `/:id/contact` | JWT | Karte anzeigen | Kontaktdaten der Person, auf die sich eine Workflow-Karte bezieht: `{ personId, displayName, mobilePhone, email }`. Ermöglicht einem zugewiesenen Anrufer ohne Zugriff auf Personen, die Person zu erreichen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Zeitleistendaten für Aufgaben anhand durch Kommas getrennter Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Aufgabe zur Verzeichnisaktualisierung für eine Person abrufen |
| POST | `/` | JWT | — | Aufgaben erstellen oder aktualisieren. Fügen Sie `?type=directoryUpdate` hinzu, um Aufgaben zur Verzeichnisaktualisierung zu verarbeiten (Fotos werden automatisch hochgeladen). Ändert sich das Feld `assignedToId` einer bestehenden Aufgabe, wird ein Eintrag „Neu zugewiesen von ... an ...“ an den Verlauf in deren `data` angehängt |
| POST | `/:id/conversation` | JWT | `tasks.edit` oder Kartenbearbeiter | Die Notizen-Unterhaltung an eine Karte anhängen. Body: `{ conversationId }`. Die zuerst angehängte Unterhaltung gewinnt; spätere Aufrufe geben die Karte unverändert zurück |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |
| DELETE | `/:id` | JWT | `tasks.edit` | Eine einfache Aufgabe endgültig löschen. Gibt 400 für Workflow-Karten zurück (verwenden Sie hierfür die Karten-Endpunkte) sowie für Anträge auf Kontolöschung (diese werden über die Prüfaktion entschieden) |

## Automatisierungen {#automations}

Basispfad: `/doing/automations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Automatisierung anhand der ID abrufen |
| GET | `/check` | Öffentlich | — | Eine Prüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Automatisierung löschen |

## Aktionen {#actions}

Basispfad: `/doing/actions`

Aktionen legen fest, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Aktion anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Aktion löschen |

## Bedingungen {#conditions}

Basispfad: `/doing/conditions`

Bedingungen legen die Kriterien fest, die eine Automatisierung auslösen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Bedingung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Bedingung löschen |

## Verknüpfungen {#conjunctions}

Basispfad: `/doing/conjunctions`

Verknüpfungen fassen mehrere Bedingungen in einer Automatisierung zusammen (UND-/ODER-Logik).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verknüpfungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Verknüpfungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung löschen |

## Autorisierungen für Inhaltsanbieter {#content-provider-auths}

Basispfad: `/doing/contentProviderAuths`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

Verwaltet OAuth-Autorisierungsdatensätze für externe Inhaltsanbieter (z. B. Integrationen von Präsentationssoftware).

`accessToken` und `refreshToken` werden im gespeicherten Zustand mit `EncryptionHelper` verschlüsselt und beim Lesen entschlüsselt, sodass die API weiterhin Klartext-Tokens zurückgibt. Datensätze, die vor der Verschlüsselung gespeichert wurden, enthalten Klartext (der niemals `|` enthält); sie werden unverändert zurückgegeben und beim nächsten Speichern verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Autorisierungen für Inhaltsanbieter auflisten |
| GET | `/:id` | JWT | — | Eine Autorisierung für einen Inhaltsanbieter anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Autorisierungen für Inhaltsanbieter anhand durch Kommas getrennter IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Autorisierungen für Inhaltsanbieter eines Dienstbereichs abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Autorisierungsdatensatz für einen bestimmten Dienstbereich und Anbieter abrufen |
| POST | `/` | JWT | — | Autorisierungen für Inhaltsanbieter erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Autorisierung für einen Inhaltsanbieter löschen |

## Anbieter-Proxy {#provider-proxy}

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Inhaltsanbieter weiter (z. B. ProPresenter, EasyWorship). Erneuert Tokens automatisch, wenn sie abgelaufen sind.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Dateien des Inhaltsanbieters durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Eine Playlist von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten {#related-pages}

- [Mitgliedschafts-Endpunkte](./membership.md) — Personen, Gruppen, Rollen und Berechtigungen
- [Anwesenheits-Endpunkte](./attendance.md) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure.md) — Muster der Code-Organisation
