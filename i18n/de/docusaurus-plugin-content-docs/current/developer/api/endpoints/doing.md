---
title: "Doing-Endpunkte"
description: "Endpunkt-Referenz der Doing-API hinter Dienstplänen, Ehrenamtszuweisungen, Aufgaben und Automatisierungen in B1 Admin mit Pfaden, Authentifizierung und Rechten."
---

# Doing-Endpunkte

<div class="article-intro">

Das Doing-Modul verwaltet Gottesdienstplanung, Ehrenamtsplanung, Aufgabenverwaltung und Automatisierungen. Es bietet Werkzeuge zum Erstellen von Plänen mit Zeiten und Positionen, zum Zuweisen von Ehrenamtlichen, zur Verwaltung von Sperrterminen, zum Aufbau von Gottesdienstabläufen, zur Anbindung externer Inhaltsanbieter und zur Konfiguration automatisierter Abläufe mit Bedingungen und Aktionen.

</div>

**Basispfad:** `/doing`

## Pläne

Basispfad: `/doing/plans`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Einen Plan anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne anhand kommagetrennter IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Plantyp abrufen |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + Dienstbereich bearbeiten | Vorschau der Dienstübersicht, die **Ehrenamtliche per Text** senden: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` für die Ehrenamtlichen, die im Zeitraum eingeteilt sind (eine Person pro Eintrag, abgemeldete und fehlende Nummern übersprungen, gemeinsam genutzte Nummern dedupliziert, auf 200 begrenzt) |
| GET | `/presenter` | JWT | — | Pläne der nächsten 7 Tage abrufen (Präsentatorenansicht) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Dienstbereich bearbeiten | Aktive Workflows zur Bestätigung von Dienstzuweisungen (`workflowType = "assignmentConfirmation"`), die ein Plan auswählen kann: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Den aktuellen Plan eines Plantyps abrufen |
| GET | `/public/signup/:churchId` | Öffentlich | — | Pläne, für die eine Selbstanmeldung möglich ist, zuerst die nächsten, jeweils mit ihren Selbstanmeldungs-Positionen (sortiert nach `categoryName`, dann `name`, zusätzlich `filledCount` der Zuweisungen mit Status Accepted/Unconfirmed) und Zeiten. Keine Namen von Ehrenamtlichen. Wenn die Gemeindeeinstellung `volunteerSignupNextOnly` den Wert `"true"` hat, wird pro Plantyp nur der erste Plan zurückgegeben. Jeder `plan` enthält einen berechneten `signupDeadline` (ISO-Zeitpunkt oder `null`): `signupDeadlineHours` vor der frühesten Zeit vom Typ `service` des Plans (ist keine Gottesdienstzeit vorhanden, eine beliebige Zeitangabe; hat der Plan keine Zeiten, 9:00 Uhr in der Zeitzone der Gemeinde am `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` für die Selbstanmeldungs-Positionen des Plans (Anzeigenamen der Zusagen mit Status Accepted/Unconfirmed). Gibt `[]` zurück, sofern `showVolunteerNames` des Plans nicht aktiviert ist |
| POST | `/` | JWT | — | Pläne erstellen oder aktualisieren (akzeptiert ein einzelnes Objekt oder ein Array). Setzen Sie `confirmationWorkflowId`, um den Plan für einen Bestätigungs-Workflow für Dienste zu aktivieren, oder `null`, um ihn für künftige Anfragen abzumelden. Senden Sie `signupDeadlineHours: null`, um eine Frist zu entfernen; wenn das Feld fehlt, bleibt der gespeicherte Wert erhalten |
| POST | `/copy/:id` | JWT | Dienstbereich bearbeiten | Einen Plan kopieren, einschließlich Positionen, Zeiten, Zuweisungen und Gottesdienstabauelementen. Der Body enthält `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) und `copyServiceOrder` (boolesch). Ohne `targetPlanId` wird ein neuer Plan erstellt; `notes`, `signupDeadlineHours`, `showVolunteerNames` und `autoReplaceOnDecline` werden vom Quellplan übernommen, sofern der Body keine Werte liefert. Mit `targetPlanId` wird stattdessen dieser bestehende Plan befüllt (der Aufrufer muss ihn bearbeiten dürfen). Die Option **Wöchentlich wiederholen** in B1Admin ruft diesen Endpunkt einmal pro Woche auf, wobei jeweils vom Plan der Vorwoche kopiert wird |
| POST | `/textRange` | JWT | `texting.send` + Dienstbereich bearbeiten | Jeden Ehrenamtlichen, der im Datumsbereich eingeteilt ist, über den Texting-Anbieter der Gemeinde anschreiben. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (Nachricht bis zu 1600 Zeichen; Seriendruckfelder werden pro Empfänger ersetzt). Gibt die Vorschauzahlen sowie `recipientCount`, `successCount`, `failCount` und `error` (`no_provider` oder `insufficient_credits`) zurück, wenn der Versand vorzeitig abbricht |
| POST | `/:id/issueRequests` | JWT | Plan bearbeiten | Die neuen, noch nicht benachrichtigten, unbestätigten Zuweisungen des Plans über dessen Bestätigungs-Workflow ausgeben: markiert jede als benachrichtigt und startet pro Zuweisung eine Workflow-Karte. Leerer Body; gibt `{ issued }` zurück. Schlägt fehl, wenn der Plan nicht veröffentlicht ist (`prepared`), keine aktive `confirmationWorkflowId` mit mindestens einem Schritt hat oder seine Antwortfrist abgelaufen ist |
| POST | `/autofill/:id` | JWT | — | Ehrenamtliche Zuweisungen für einen Plan automatisch ausfüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Einen Plan sowie alle zugehörigen Zeiten, Zuweisungen, Positionen und Planelemente löschen |

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

## Plantypen

Basispfad: `/doing/planTypes`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Plantypen auflisten |
| GET | `/:id` | JWT | — | Einen Plantyp anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plantypen anhand kommagetrennter IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Plantypen eines Dienstbereichs abrufen |
| POST | `/` | JWT | — | Plantypen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Einen Plantyp löschen |

## Planelemente

Basispfad: `/doing/planItems`

Verwaltet Elemente des Gottesdienstablaufs (Überschriften, Abschnitte, Lieder usw.), die in einer Baumstruktur aus Eltern- und Kindelementen organisiert sind.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Planelement anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Planelemente anhand kommagetrennter IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Planelemente eines Plans abrufen (gibt eine Baumstruktur zurück) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Planelemente für die Präsentatorenansicht abrufen (gibt eine Baumstruktur zurück) |
| POST | `/` | JWT | — | Planelemente erstellen oder aktualisieren |
| POST | `/sort` | JWT | — | Sortierreihenfolge eines Planelements aktualisieren (sortiert Geschwisterelemente neu) |
| DELETE | `/:id` | JWT | — | Ein Planelement löschen |

## Plan-Feed

Basispfad: `/doing/planFeed`

Stellt Planelement-Feeds für den Präsentator bereit. Sind keine Planelemente vorhanden, werden sie automatisch aus dem Venue-Feed von Lessons.church anhand der `contentId` des Plans befüllt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Feed für den Präsentator abrufen (wird bei leerem Feed automatisch aus dem Venue-Feed befüllt) |

## Positionen

Basispfad: `/doing/positions`

Erweitert die CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Position anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen anhand kommagetrennter IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen eines Plans abrufen |
| POST | `/` | JWT | — | Positionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Position löschen |

## Zeiten

Basispfad: `/doing/times`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Eine Zeit anhand der ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten eines Plans abrufen |
| POST | `/` | JWT | — | Zeiten erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Zeit löschen |

## Zuweisungen

Basispfad: `/doing/assignments`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zuweisungen des aktuellen Benutzers abrufen |
| GET | `/my/upcoming` | JWT | — | Bis zu 20 Zuweisungen des aktuellen Benutzers aus Plänen ab gestern (Pläne im Status „vorgemerkt“ bzw. `prepared` werden übersprungen), die nächsten zuerst: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Liefert die Daten für vorschau der Dienste auf der Startseite der Mitglieder |
| GET | `/:id` | JWT | — | Eine Zuweisung anhand der ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Zuweisungen mehrerer Pläne anhand kommagetrennter Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zuweisungen eines Plans abrufen |
| POST | `/` | JWT | — | Zuweisungen erstellen oder aktualisieren (setzt den Status standardmäßig auf „Unconfirmed“) |
| POST | `/accept/:id` | JWT | — | Eine Zuweisung annehmen (muss die zugewiesene Person sein) |
| POST | `/decline/:id` | JWT | — | Eine Zuweisung ablehnen (muss die zugewiesene Person sein) |
| POST | `/signup` | JWT | — | Selbstanmeldung für eine Position. Body: `{ positionId }`. Die Position muss Selbstanmeldung erlauben und freie Plätze haben; es wird eine Zuweisung mit Status Accepted erstellt. Wird mit „Signup deadline has passed“ abgelehnt, sobald die Anmeldefrist des Plans abgelaufen ist (zurückgerechnet ab der ersten Gottesdienstzeit, wie oben beschrieben) |
| DELETE | `/signup/:id` | JWT | — | Eigene Selbstanmeldung entfernen. Wird nach der Anmeldefrist des Plans mit „Removal deadline has passed“ abgelehnt |
| DELETE | `/:id` | JWT | — | Eine Zuweisung löschen |

### Beispiel: Zuweisung annehmen

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
| GET | `/upcoming` | JWT | — | Alle bevorstehenden Sperrtermine der Gemeinde abrufen |
| POST | `/` | JWT | — | Sperrtermine erstellen oder aktualisieren (setzt `personId` standardmäßig auf den aktuellen Benutzer, wenn nichts angegeben ist) |
| DELETE | `/:id` | JWT | — | Einen Sperrtermin löschen |

## Aufgaben

Basispfad: `/doing/tasks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/:id` | JWT | — | Eine Aufgabe anhand der ID abrufen |
| GET | `/:id/contact` | JWT | Karte anzeigen | Kontaktdaten der Person, auf die sich eine Workflow-Karte bezieht: `{ personId, displayName, mobilePhone, email }`. Ermöglicht einem zugewiesenen Anrufer ohne Zugriff auf Personen, die Person zu erreichen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Zeitleistendaten für Aufgaben anhand kommagetrennter Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Aufgabe zur Verzeichnisaktualisierung für eine Person abrufen |
| POST | `/` | JWT | — | Aufgaben erstellen oder aktualisieren. Fügen Sie `?type=directoryUpdate` hinzu, um Aufgaben zur Verzeichnisaktualisierung zu verarbeiten (Fotos werden automatisch hochgeladen) |
| POST | `/:id/conversation` | JWT | `tasks.edit` oder Kartenbearbeiter | Die Notizen-Unterhaltung an eine Karte anhängen. Body: `{ conversationId }`. Die zuerst angehängte Unterhaltung gewinnt; spätere Aufrufe geben die Karte unverändert zurück |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |

## Automatisierungen

Basispfad: `/doing/automations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen der Gemeinde auflisten |
| GET | `/:id` | JWT | — | Eine Automatisierung anhand der ID abrufen |
| GET | `/check` | Öffentlich | — | Eine Prüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Automatisierung löschen |

## Aktionen

Basispfad: `/doing/actions`

Aktionen legen fest, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Aktion anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Aktion löschen |

## Bedingungen

Basispfad: `/doing/conditions`

Bedingungen definieren die Kriterien, die eine Automatisierung auslösen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Bedingung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Bedingung löschen |

## Verknüpfungen

Basispfad: `/doing/conjunctions`

Verknüpfungen verbinden mehrere Bedingungen innerhalb einer Automatisierung (UND-/ODER-Logik).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung anhand der ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verknüpfungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Verknüpfungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung löschen |

## Authentifizierungen für Inhaltsanbieter

Basispfad: `/doing/contentProviderAuths`

Erweitert die CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

Verwaltet OAuth-Authentifizierungsdatensätze für externe Inhaltsanbieter (z. B. Integrationen mit Präsentationssoftware).

`accessToken` und `refreshToken` werden im Ruhezustand mit `EncryptionHelper` verschlüsselt und beim Lesen wieder entschlüsselt, sodass die API weiterhin Klartext-Token zurückgibt. Vor der Verschlüsselung gespeicherte Datensätze enthalten Klartext (der nie `|` enthält); sie werden unverändert zurückgegeben und beim nächsten Speichern verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Authentifizierungen für Inhaltsanbieter auflisten |
| GET | `/:id` | JWT | — | Eine Authentifizierung für Inhaltsanbieter anhand der ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Authentifizierungen für Inhaltsanbieter anhand kommagetrennter IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Authentifizierungen für Inhaltsanbieter eines Dienstbereichs abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Authentifizierungsdatensatz für einen bestimmten Dienstbereich und Anbieter abrufen |
| POST | `/` | JWT | — | Authentifizierungen für Inhaltsanbieter erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Authentifizierung für Inhaltsanbieter löschen |

## Provider-Proxy

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Inhaltsanbieter weiter (z. B. ProPresenter, EasyWorship). Erneuert Token automatisch, wenn sie abgelaufen sind.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Dateien des Inhaltsanbieters durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Eine Playlist von einem Inhaltsanbieter abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen für ein Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten

- [Membership-Endpunkte](./membership.md) — Personen, Gruppen, Rollen und Berechtigungen
- [Attendance-Endpunkte](./attendance.md) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure.md) — Muster der Code-Organisation
