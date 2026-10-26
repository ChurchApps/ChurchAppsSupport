---
title: "Doing-Endpunkte"
---

# Doing-Endpunkte

<div class="article-intro">

Das Doing-Modul verwaltet Gottesdienstplanung, Ehrenamtseinsatzplanung, Aufgabenverwaltung und Automatisierungen. Es stellt Werkzeuge bereit, um Dienstpläne mit Zeiten und Positionen zu erstellen, Ehrenamtliche einzuteilen, Sperrtermine zu verwalten, Elemente der Gottesdienstreihenfolge aufzubauen, externe Inhaltsanbieter anzubinden und automatisierte Abläufe mit Bedingungen und Aktionen zu konfigurieren.

</div>

**Basispfad:** `/doing`

## Pläne

Basispfad: `/doing/plans`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Plan anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne anhand kommagetrennter IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Plantyp abrufen |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + Bearbeitungsrecht für den Dienstbereich | Vorschau der Übersicht des Dienstes, die **Ehrenamtliche anschreiben** versendet: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` für die Ehrenamtlichen, die im Zeitraum eingeteilt sind (eine Person je Eintrag; Personen, die sich abgemeldet haben, und fehlende Nummern werden übersprungen; gemeinsam genutzte Nummern werden zusammengeführt; maximal 200) |
| GET | `/presenter` | JWT | — | Pläne der nächsten 7 Tage abrufen (Präsentatorenansicht) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Bearbeitungsrecht für den Dienstbereich | Aktive Workflows zur Bestätigung von Dienstzuweisungen (`workflowType = "assignmentConfirmation"`), die ein Plan auswählen kann: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Den aktuellen Plan eines Plantyps abrufen |
| GET | `/public/signup/:churchId` | Öffentlich | — | Pläne, für die sich Personen selbst eintragen können, die nächsten zuerst, jeweils mit ihren Selbsteintragungs-Positionen (sortiert nach `categoryName`, dann `name`, zusätzlich `filledCount` der Zuweisungen mit Status Accepted/Unconfirmed) und Zeiten. Keine Namen von Ehrenamtlichen. Ist die Kircheneinstellung `volunteerSignupNextOnly` auf `"true"` gesetzt, wird nur der erste Plan jedes Plantyps zurückgegeben. Jeder `plan` enthält eine berechnete `signupDeadline` (ISO-Zeitpunkt oder `null`): `signupDeadlineHours` vor der frühesten `service`-Zeit des Plans (ist keine Gottesdienstzeit vorhanden, eine beliebige zeitgebundene Angabe; hat der Plan keine Zeiten, 9:00 Uhr in der Zeitzone der Kirche am `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` für die Selbsteintragungs-Positionen des Plans (Anzeigenamen der Zuweisungen mit Status Accepted/Unconfirmed). Gibt `[]` zurück, sofern `showVolunteerNames` des Plans nicht aktiviert ist |
| POST | `/` | JWT | — | Pläne erstellen oder aktualisieren (akzeptiert ein einzelnes Objekt oder ein Array). Setzen Sie `confirmationWorkflowId`, um den Plan für einen Bestätigungs-Workflow für Dienste anzumelden, oder `null`, um sich für künftige Anfragen abzumelden. Senden Sie `signupDeadlineHours: null`, um eine Frist zu entfernen; wird das Feld weggelassen, bleibt der gespeicherte Wert erhalten |
| POST | `/copy/:id` | JWT | Bearbeitungsrecht für den Dienstbereich | Einen Plan einschließlich Positionen, Zeiten, Zuweisungen und Elementen der Gottesdienstreihenfolge kopieren. Der Body enthält `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") und `copyServiceOrder` (boolesch). Ohne `targetPlanId` wird ein neuer Plan erstellt; `notes`, `signupDeadlineHours`, `showVolunteerNames` und `autoReplaceOnDecline` werden vom Quellplan übernommen, sofern der Body keine Werte angibt. Mit `targetPlanId` füllt die Kopie stattdessen diesen vorhandenen Plan (der Aufrufer muss ihn bearbeiten dürfen). Die Option **Wöchentlich wiederholen** in B1Admin ruft dies einmal pro Woche auf, wobei jeweils aus dem Plan kopiert wird, der in der Woche zuvor erstellt wurde |
| POST | `/textRange` | JWT | `texting.send` + Bearbeitungsrecht für den Dienstbereich | Jede Ehrenamtliche Person, die in einem Datumsbereich eingeteilt ist, über den Textnachrichten-Anbieter der Kirche anschreiben. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (Nachricht bis zu 1600 Zeichen; Seriendruckfelder werden je Empfänger aufgelöst). Gibt die Vorschau-Zählwerte sowie `recipientCount`, `successCount`, `failCount` und `error` (`no_provider` oder `insufficient_credits`) zurück, wenn der Versand vorzeitig abbricht |
| POST | `/:id/issueRequests` | JWT | Bearbeitungsrecht für den Plan | Die neuen, noch nicht benachrichtigten Zuweisungen des Plans mit Status Unconfirmed über seinen Bestätigungs-Workflow versenden: markiert jede Zuweisung als benachrichtigt und startet pro Zuweisung eine Workflow-Karte. Leerer Body; gibt `{ issued }` zurück. Schlägt fehl, sofern der Plan nicht veröffentlicht ist (nicht `prepared`), keine aktive `confirmationWorkflowId` mit mindestens einem Schritt hat oder seine Antwortfrist bereits abgelaufen ist |
| POST | `/autofill/:id` | JWT | — | Ehrenamtliche Zuweisungen für einen Plan automatisch ausfüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Einen Plan sowie alle zugehörigen Zeiten, Zuweisungen, Positionen und Planelemente löschen |

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

## Plantypen

Basispfad: `/doing/planTypes`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Plantypen auflisten |
| GET | `/:id` | JWT | — | Einen Plantyp anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plantypen anhand kommagetrennter IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Plantypen eines Dienstbereichs abrufen |
| POST | `/` | JWT | — | Plantypen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Einen Plantyp löschen |

## Planelemente

Basispfad: `/doing/planItems`

Verwaltet Elemente der Gottesdienstreihenfolge (Überschriften, Abschnitte, Lieder usw.), die in einer Baumstruktur aus übergeordneten und untergeordneten Elementen organisiert sind.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Planelement anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Planelemente anhand kommagetrennter IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Planelemente eines Plans abrufen (liefert eine Baumstruktur) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planelemente für die Präsentatorenansicht abrufen (liefert eine Baumstruktur) |
| POST | `/` | JWT | — | Planelemente erstellen oder aktualisieren |
| POST | `/sort` | JWT | — | Sortierreihenfolge eines Planelements aktualisieren (sortiert Geschwisterelemente neu) |
| DELETE | `/:id` | JWT | — | Ein Planelement löschen |

## Plan-Feed

Basispfad: `/doing/planFeed`

Stellt Feeds mit Planelementen für die Präsentatorenansicht bereit. Sind keine Planelemente vorhanden, werden sie automatisch aus dem Venue-Feed von Lessons.church anhand der `contentId` des Plans befüllt.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Feed für die Präsentatorenansicht abrufen (wird aus dem Venue-Feed befüllt, wenn leer) |

## Positionen

Basispfad: `/doing/positions`

Erweitert die CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Position anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen anhand kommagetrennter IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen eines Plans abrufen |
| POST | `/` | JWT | — | Positionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Position löschen |

## Zeiten

Basispfad: `/doing/times`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Zeit anhand der ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten eines Plans abrufen |
| POST | `/` | JWT | — | Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Zeit löschen |

## Zuweisungen

Basispfad: `/doing/assignments`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zuweisungen des aktuellen Benutzers abrufen |
| GET | `/my/upcoming` | JWT | — | Bis zu 20 Zuweisungen des aktuellen Benutzers für Pläne ab gestern (Pläne im Status „vorgemerkt“ bzw. `prepared` werden übersprungen), die nächsten zuerst: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Speist die Dienstvorschau auf der Startseite für Mitglieder |
| GET | `/:id` | JWT | — | Eine Zuweisung anhand der ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Zuweisungen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zuweisungen eines Plans abrufen |
| POST | `/` | JWT | — | Zuweisungen erstellen oder aktualisieren (setzt den Status standardmäßig auf „Unconfirmed“) |
| POST | `/accept/:id` | JWT | — | Eine Zuweisung annehmen (muss die zugewiesene Person sein) |
| POST | `/decline/:id` | JWT | — | Eine Zuweisung ablehnen (muss die zugewiesene Person sein) |
| POST | `/signup` | JWT | — | Sich selbst für eine Position eintragen. Body: `{ positionId }`. Die Position muss Selbsteintragung erlauben und Platz haben; es wird eine Zuweisung mit Status Accepted erstellt. Wird mit „Signup deadline has passed“ abgelehnt, sobald die Eintragungsfrist des Plans abgelaufen ist (vom ersten Gottesdienst-Termin aus zurückgerechnet, wie oben) |
| DELETE | `/signup/:id` | JWT | — | Die eigene Selbsteintragung entfernen. Wird mit „Removal deadline has passed“ abgelehnt, nachdem die Eintragungsfrist des Plans abgelaufen ist |
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

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Sperrtermin anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Sperrtermine anhand kommagetrennter IDs abrufen |
| GET | `/my` | JWT | — | Sperrtermine des aktuellen Benutzers abrufen |
| GET | `/upcoming` | JWT | — | Alle kommenden Sperrtermine der Kirche abrufen |
| POST | `/` | JWT | — | Sperrtermine erstellen oder aktualisieren (setzt personId standardmäßig auf den aktuellen Benutzer, wenn nicht angegeben) |
| DELETE | `/:id` | JWT | — | Einen Sperrtermin löschen |

## Aufgaben

Basispfad: `/doing/tasks`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/:id` | JWT | — | Eine Aufgabe anhand der ID abrufen |
| GET | `/:id/contact` | JWT | Kann die Karte einsehen | Kontaktdaten der Person, um die es in einer Workflow-Karte geht: `{ personId, displayName, mobilePhone, email }`. Ermöglicht einem zugewiesenen Anrufer ohne Zugriff auf Personen, die Person zu erreichen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Zeitleistendaten für Aufgaben anhand kommagetrennter Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Aufgabe zur Verzeichnisaktualisierung einer Person abrufen |
| POST | `/` | JWT | — | Aufgaben erstellen oder aktualisieren. Mit `?type=directoryUpdate` werden Aufgaben zur Verzeichnisaktualisierung verarbeitet (Fotos werden automatisch hochgeladen) |
| POST | `/:id/conversation` | JWT | `tasks.edit` oder zugewiesene Person der Karte | Die Notizen-Unterhaltung an eine Karte anhängen. Body: `{ conversationId }`. Die zuerst angehängte Unterhaltung gilt; spätere Aufrufe geben die Karte unverändert zurück |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |

## Automatisierungen

Basispfad: `/doing/automations`

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Automatisierung anhand der ID abrufen |
| GET | `/check` | Öffentlich | — | Eine Prüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Automatisierung löschen |

## Aktionen

Basispfad: `/doing/actions`

Aktionen legen fest, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Aktion anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Aktion löschen |

## Bedingungen

Basispfad: `/doing/conditions`

Bedingungen legen die Kriterien fest, die eine Automatisierung auslösen.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Bedingung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Bedingung löschen |

## Verknüpfungen

Basispfad: `/doing/conjunctions`

Verknüpfungen verbinden mehrere Bedingungen in einer Automatisierung miteinander (UND-/ODER-Logik).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verknüpfungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Verknüpfungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung löschen |

## Authentifizierungen für Inhaltsanbieter

Basispfad: `/doing/contentProviderAuths`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

Verwaltet OAuth-Authentifizierungsdatensätze für externe Inhaltsanbieter (z. B. Integrationen von Präsentationssoftware).

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Authentifizierungen für Inhaltsanbieter auflisten |
| GET | `/:id` | JWT | — | Eine Authentifizierung für Inhaltsanbieter anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Authentifizierungen für Inhaltsanbieter anhand kommagetrennter IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Authentifizierungen für Inhaltsanbieter eines Dienstbereichs abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Authentifizierungsdatensatz für einen bestimmten Dienstbereich und Anbieter abrufen |
| POST | `/` | JWT | — | Authentifizierungen für Inhaltsanbieter erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Authentifizierung für Inhaltsanbieter löschen |

## Anbieter-Proxy

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Inhaltsanbieter weiter (z. B. ProPresenter, EasyWorship). Erneuert Token automatisch, wenn sie abgelaufen sind.

| Methode | Pfad | Authentifizierung | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Dateien des Inhaltsanbieters durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Eine Wiedergabeliste von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Gruppen, Rollen und Berechtigungen
- [Anwesenheit-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Muster der Code-Organisation
