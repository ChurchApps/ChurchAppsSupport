---
title: "Doing-Endpunkte"
---

# Doing-Endpunkte

<div class="article-intro">

Das Modul Doing verwaltet Gottesdienstplanung, Ehrenamtseinteilung, Aufgabenverwaltung und Automatisierungen. Es bietet Werkzeuge zum Erstellen von Dienstplänen mit Zeiten und Positionen, zum Zuweisen von Ehrenamtlichen, zum Verwalten von Sperrterminen, zum Aufbauen von Gottesdienstablauf-Elementen, zur Anbindung externer Inhaltsanbieter und zum Konfigurieren automatisierter Workflows mit Bedingungen und Aktionen.

</div>

**Basispfad:** `/doing`

## Pläne

Basispfad: `/doing/plans`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Pläne der Kirche auflisten |
| GET | `/:id` | JWT | — | Einen Plan nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Pläne nach kommagetrennten IDs abrufen |
| GET | `/types/:planTypeId` | JWT | — | Pläne nach Plantyp abrufen |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + Bearbeitung des Dienstbereichs | Vorschau der Empfängerzahlen für **Ehrenamtliche per SMS** in der Dienstübersicht: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` für die im Zeitraum eingeteilten Ehrenamtlichen (eine Person pro Eintrag, abgemeldete und fehlende Nummern übersprungen, geteilte Nummern dedupliziert, auf 200 begrenzt) |
| GET | `/presenter` | JWT | — | Pläne der nächsten 7 Tage abrufen (Präsentationsansicht) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Bearbeitung des Dienstbereichs | Aktive Workflows zur Bestätigung von Dienstzuweisungen (`workflowType = "assignmentConfirmation"`), die ein Plan auswählen kann: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Öffentlich | — | Den aktuellen Plan für einen Plantyp abrufen |
| GET | `/public/signup/:churchId` | Öffentlich | — | Pläne, für die sich Personen selbst eintragen können, die nächsten zuerst, jeweils mit ihren Selbsteintragungs-Positionen (sortiert nach `categoryName`, dann `name`, plus `filledCount` der Zusagen/unbestätigten Zuweisungen) und Zeiten. Keine Namen der Ehrenamtlichen. Ist die Kircheneinstellung `volunteerSignupNextOnly` auf `"true"` gesetzt, wird nur der erste Plan jedes Plantyps zurückgegeben. Jeder `plan` enthält eine berechnete `signupDeadline` (ISO-Zeitstempel oder `null`): `signupDeadlineHours` vor der frühesten Zeit vom Typ `service` des Plans (bei fehlender Gottesdienstzeit eine beliebige Zeitangabe; sonst 9:00 Uhr in der Zeitzone der Kirche am `serviceDate`, wenn der Plan keine Zeiten hat) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` für die Selbsteintragungs-Positionen des Plans (Anzeigenamen der Zusagen/unbestätigten Zuweisungen). Liefert `[]`, solange `showVolunteerNames` des Plans nicht aktiviert ist |
| POST | `/` | JWT | — | Pläne anlegen oder aktualisieren (akzeptiert ein einzelnes Objekt oder ein Array). Setzen Sie `confirmationWorkflowId`, um den Plan einem Bestätigungs-Workflow für Dienste zuzuordnen, oder `null`, um ihn für künftige Anfragen abzumelden. Senden Sie `signupDeadlineHours: null`, um eine Frist zu entfernen; fehlt das Feld, bleibt der gespeicherte Wert erhalten |
| POST | `/copy/:id` | JWT | Bearbeitung des Dienstbereichs | Einen Plan einschließlich Positionen, Zeiten, Zuweisungen und Gottesdienstablauf-Elementen kopieren. Der Body enthält `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") und `copyServiceOrder` (boolesch). Ohne `targetPlanId` wird ein neuer Plan angelegt; `notes`, `signupDeadlineHours`, `showVolunteerNames` und `autoReplaceOnDecline` werden aus dem Quellplan übernommen, sofern der Body keine eigenen Werte liefert. Mit `targetPlanId` füllt die Kopie stattdessen diesen bestehenden Plan (der Aufrufer muss ihn bearbeiten dürfen). Die Option **Wöchentlich wiederholen** in B1Admin ruft dies einmal pro Woche auf, jeweils aus dem Plan der Vorwoche kopierend |
| POST | `/textRange` | JWT | `texting.send` + Bearbeitung des Dienstbereichs | Jede im Zeitraum eingeteilte Ehrenamtliche Person über den SMS-Anbieter der Kirche anschreiben. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (Nachricht bis 1600 Zeichen; Platzhalter werden pro Empfänger aufgelöst). Liefert die Vorschauzahlen plus `recipientCount`, `successCount`, `failCount` und `error` (`no_provider` oder `insufficient_credits`), wenn der Versand vorzeitig abbricht |
| POST | `/:id/issueRequests` | JWT | Bearbeitung des Plans | Die neuen, unbestätigten und noch nicht benachrichtigten Zuweisungen des Plans über seinen Bestätigungs-Workflow ausgeben: markiert jede als benachrichtigt und startet pro Zuweisung eine Workflow-Karte. Leerer Body; liefert `{ issued }`. Schlägt fehl, solange der Plan nicht veröffentlicht ist (nicht `prepared`), keinen aktiven `confirmationWorkflowId` mit mindestens einem Schritt hat oder seine Antwortfrist bereits abgelaufen ist |
| POST | `/autofill/:id` | JWT | — | Ehrenamtliche Zuweisungen für einen Plan automatisch ausfüllen. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Einen Plan und alle zugehörigen Zeiten, Zuweisungen, Positionen und Plan-Elemente löschen |

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

Erbt von der CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Plantypen auflisten |
| GET | `/:id` | JWT | — | Einen Plantyp nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plantypen nach kommagetrennten IDs abrufen |
| GET | `/ministryId/:ministryId` | JWT | — | Plantypen eines Dienstbereichs abrufen |
| POST | `/` | JWT | — | Plantypen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Einen Plantyp löschen |

## Plan-Elemente

Basispfad: `/doing/planItems`

Verwaltet die Elemente des Gottesdienstablaufs (Überschriften, Abschnitte, Lieder usw.), organisiert in einer Eltern-Kind-Baumstruktur.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Ein Plan-Element nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Plan-Elemente nach kommagetrennten IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Plan-Elemente eines Plans abrufen (liefert eine Baumstruktur) |
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Elemente für die Präsentationsansicht abrufen (liefert eine Baumstruktur) |
| POST | `/` | JWT | — | Plan-Elemente anlegen oder aktualisieren |
| POST | `/sort` | JWT | — | Reihenfolge eines Plan-Elements aktualisieren (sortiert die Geschwister neu) |
| DELETE | `/:id` | JWT | — | Ein Plan-Element löschen |

## Plan-Feed

Basispfad: `/doing/planFeed`

Stellt Plan-Element-Feeds für die Präsentation bereit. Gibt es noch keine Plan-Elemente, werden sie automatisch aus dem Venue-Feed von Lessons.church anhand der `contentId` des Plans gefüllt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Öffentlich | — | Plan-Feed für die Präsentation abrufen (füllt sich automatisch aus dem Venue-Feed, wenn leer) |

## Positionen

Basispfad: `/doing/positions`

Erbt von der CRUD-Basisklasse (GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Position nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Positionen nach kommagetrennten IDs abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Positionen mehrerer Pläne nach kommagetrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Positionen eines Plans abrufen |
| POST | `/` | JWT | — | Positionen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Position löschen |

## Zeiten

Basispfad: `/doing/times`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Alle Zeiten der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Zeit nach ID abrufen |
| GET | `/plans?planIds=` | JWT | — | Zeiten mehrerer Pläne nach kommagetrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zeiten eines Plans abrufen |
| POST | `/` | JWT | — | Zeiten anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Zeit löschen |

## Zuweisungen

Basispfad: `/doing/assignments`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Zuweisungen des aktuellen Benutzers abrufen |
| GET | `/my/upcoming` | JWT | — | Bis zu 20 Zuweisungen des aktuellen Benutzers auf Plänen ab gestern (Pläne mit Vormerkung oder `prepared` werden übersprungen), die nächsten zuerst: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Speist die Dienstvorschau auf der Startseite des Mitgliedsbereichs |
| GET | `/:id` | JWT | — | Eine Zuweisung nach ID abrufen |
| GET | `/plan/ids?planIds=` | JWT | — | Zuweisungen mehrerer Pläne nach kommagetrennten Plan-IDs abrufen |
| GET | `/plan/:planId` | JWT | — | Alle Zuweisungen eines Plans abrufen |
| POST | `/` | JWT | — | Zuweisungen anlegen oder aktualisieren (Status ist standardmäßig "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Eine Zuweisung annehmen (muss die zugewiesene Person sein) |
| POST | `/decline/:id` | JWT | — | Eine Zuweisung ablehnen (muss die zugewiesene Person sein) |
| POST | `/signup` | JWT | — | Sich selbst für eine Position eintragen. Body: `{ positionId }`. Die Position muss die Selbsteintragung erlauben und Platz haben; es entsteht eine Zuweisung mit Status Accepted. Wird mit "Signup deadline has passed" abgelehnt, sobald die Anmeldefrist des Plans abgelaufen ist (gerechnet ab seiner ersten Gottesdienstzeit, wie oben) |
| DELETE | `/signup/:id` | JWT | — | Die eigene Selbsteintragung entfernen. Wird nach der Anmeldefrist des Plans mit "Removal deadline has passed" abgelehnt |
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

Erbt von der CRUD-Basisklasse (GET `/:id`, DELETE `/:id` — ohne Berechtigungsprüfungen).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Einen Sperrtermin nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Sperrtermine nach kommagetrennten IDs abrufen |
| GET | `/my` | JWT | — | Sperrtermine des aktuellen Benutzers abrufen |
| GET | `/upcoming` | JWT | — | Alle kommenden Sperrtermine der Kirche abrufen |
| POST | `/` | JWT | — | Sperrtermine anlegen oder aktualisieren (setzt personId standardmäßig auf den aktuellen Benutzer, wenn nicht angegeben) |
| DELETE | `/:id` | JWT | — | Einen Sperrtermin löschen |

## Aufgaben

Basispfad: `/doing/tasks`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Offene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/:id` | JWT | — | Eine Aufgabe nach ID abrufen |
| GET | `/:id/contact` | JWT | Karte darf angesehen werden | Kontaktdaten der Person, auf die sich eine Workflow-Karte bezieht: `{ personId, displayName, mobilePhone, email }`. Ermöglicht einem zugewiesenen Anrufer ohne Zugriff auf Personen, die Person zu erreichen |
| GET | `/closed` | JWT | — | Abgeschlossene Aufgaben des aktuellen Benutzers abrufen |
| GET | `/timeline?taskIds=` | JWT | — | Zeitleistendaten für Aufgaben nach kommagetrennten Aufgaben-IDs abrufen |
| GET | `/directoryUpdate/:personId` | JWT | — | Aufgabe zur Verzeichnisaktualisierung für eine Person abrufen |
| POST | `/` | JWT | — | Aufgaben anlegen oder aktualisieren. Mit `?type=directoryUpdate` werden Aufgaben zur Verzeichnisaktualisierung verarbeitet (Fotos werden automatisch hochgeladen) |
| POST | `/:id/conversation` | JWT | `tasks.edit` oder Zuständige Person der Karte | Die Notizunterhaltung an eine Karte anhängen. Body: `{ conversationId }`. Die zuerst angehängte Unterhaltung gewinnt; spätere Aufrufe liefern die Karte unverändert zurück |
| POST | `/loadForGroups` | JWT | — | Aufgaben für bestimmte Gruppen laden. Body: `{ groupIds: [], status: "Open" }` |

## Automatisierungen

Basispfad: `/doing/automations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Automatisierungen der Kirche auflisten |
| GET | `/:id` | JWT | — | Eine Automatisierung nach ID abrufen |
| GET | `/check` | Öffentlich | — | Eine Prüfung aller Automatisierungen auslösen |
| POST | `/` | JWT | — | Automatisierungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Automatisierung löschen |

## Aktionen

Basispfad: `/doing/actions`

Aktionen legen fest, was geschieht, wenn eine Automatisierung ausgelöst wird.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Aktion nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Aktionen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Aktionen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Aktion löschen |

## Bedingungen

Basispfad: `/doing/conditions`

Bedingungen legen die Kriterien fest, die eine Automatisierung auslösen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Bedingung nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Bedingungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Bedingungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Bedingung löschen |

## Verknüpfungen

Basispfad: `/doing/conjunctions`

Verknüpfungen verbinden mehrere Bedingungen in einer Automatisierung (UND-/ODER-Logik).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Eine Verknüpfung nach ID abrufen |
| GET | `/automation/:id` | JWT | — | Alle Verknüpfungen einer Automatisierung abrufen |
| POST | `/` | JWT | — | Verknüpfungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Verknüpfung löschen |

## Authentifizierungen von Inhaltsanbietern

Basispfad: `/doing/contentProviderAuths`

Erbt von der CRUD-Basisklasse (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ohne Berechtigungsprüfungen).

Verwaltet die OAuth-Authentifizierungsdatensätze für externe Inhaltsanbieter (z. B. Integrationen von Präsentationssoftware).

`accessToken` und `refreshToken` werden im Ruhezustand mit `EncryptionHelper` verschlüsselt und beim Lesen entschlüsselt, sodass die API weiterhin Klartext-Tokens zurückgibt. Vor der Verschlüsselung gespeicherte Datensätze enthalten Klartext (der nie `|` enthält); sie werden unverändert zurückgegeben und beim nächsten Speichern verschlüsselt.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Authentifizierungen von Inhaltsanbietern auflisten |
| GET | `/:id` | JWT | — | Eine Authentifizierung eines Inhaltsanbieters nach ID abrufen |
| GET | `/ids?ids=` | JWT | — | Mehrere Authentifizierungen nach kommagetrennten IDs abrufen |
| GET | `/ministry/:ministryId` | JWT | — | Alle Authentifizierungen eines Dienstbereichs abrufen |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Authentifizierungsdatensatz für einen bestimmten Dienstbereich und Anbieter abrufen |
| POST | `/` | JWT | — | Authentifizierungen von Inhaltsanbietern anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | — | Eine Authentifizierung eines Inhaltsanbieters löschen |

## Anbieter-Proxy

Basispfad: `/doing/providerProxy`

Leitet Anfragen an externe Inhaltsanbieter weiter (z. B. ProPresenter, EasyWorship). Die Token werden automatisch erneuert, sobald sie ablaufen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Dateien eines Inhaltsanbieters durchsuchen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Präsentationen eines Inhaltsanbieters abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Eine Playlist eines Inhaltsanbieters abrufen. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Anweisungen zu einem Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Erweiterte Anweisungen zu einem Inhaltselement abrufen. Body: `{ ministryId, providerId, path }` |

## Verwandte Seiten

- [Mitgliedschafts-Endpunkte](./membership) — Personen, Gruppen, Rollen und Berechtigungen
- [Anwesenheits-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Muster der Code-Organisation
