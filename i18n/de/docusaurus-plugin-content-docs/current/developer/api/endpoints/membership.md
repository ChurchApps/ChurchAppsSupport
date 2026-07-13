---
title: "Membership-Endpunkte"
---

# Membership-Endpunkte

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und bietet die Kern-Identitäts- und Autorisierungsebene für alle anderen Module.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | People.View oder Member | Auflisten aller Personen für die Kirche |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person nach ID abrufen (einschließlich Formulareinreichungen) |
| GET | `/ids?ids=` | JWT | People.View oder Member | Abrufen mehrerer Personen nach komma-getrennten IDs |
| GET | `/basic?ids=` | JWT | — | Abrufen von Basisinformationen (nur Name) für mehrere Personen |
| GET | `/recent` | JWT | People.View oder Member | Kürzlich hinzugefügte Personen |
| GET | `/search?term=&email=` | JWT | People.View oder Member | Suchen Sie Personen nach Name oder E-Mail |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Suchen nach Telefonnummer |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Abrufen von Personen in einer bestimmten Gruppe |
| GET | `/household/:householdId` | JWT | — | Abrufen aller Personen in einem Haushalt |
| GET | `/attendance` | JWT | People.Edit | Laden Sie Anwesende mit Filtern (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Laden Sie Zeitdaten für Personen und Gruppen |
| GET | `/directory/:id` | JWT | — | Abrufen einer Person für die Verzeichnisansicht (respektiert Sichtbarkeitspräferenzen) |
| GET | `/claim/:churchId` | JWT | — | Beanspruchen Sie einen Personendatensatz für den aktuellen Benutzer in einer Kirche |
| POST | / | JWT | People.Edit oder EditSelf | Erstellen oder aktualisieren Sie Personen (Batch) |
| POST | `/search` | JWT | People.View oder Member | Suchen Sie Personen (POST-Variante) |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, Geburtsmonat, Mitgliedschaftsstatus, etc.) |
| POST | `/loadOrCreate` | Public | — | Finden oder erstellen Sie eine Person nach E-Mail. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Aktualisieren Sie Haushaltsmitglied-Zuweisungen |
| POST | `/public/email` | Public | — | Senden Sie eine E-Mail an eine Person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Laden Sie Personen-E-Mails nach IDs (Server-zu-Server, erfordert jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Löschen Sie eine Person |

### Beispiel: Suchen Sie nach Personen

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Beispiel: Erstellen Sie eine Person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer

Basispfad: `/membership/users`

Siehe [Authentifizierung & Berechtigungen](./authentication) für Anmeldung-, Registrierungs- und Passwortverwaltungsendpunkte.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Anmelden (E-Mail/Passwort, JWT-Aktualisierung oder authGuid) |
| POST | `/register` | Public | — | Neuen Benutzer registrieren |
| POST | `/forgot` | Public | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Public | — | Passwort mit Auth-GUID aus E-Mail-Link festlegen |
| POST | `/verifyCredentials` | Public | — | Überprüfen Sie E-Mail/Passwort und geben Sie verknüpfte Kirchen zurück |
| POST | `/loadOrCreate` | JWT | — | Finden oder erstellen Sie einen Benutzer nach E-Mail/userId |
| POST | `/setDisplayName` | JWT | — | Aktualisieren Sie den Vor- und Nachnamen des Benutzers |
| POST | `/updateEmail` | JWT | — | Ändern Sie die E-Mail-Adresse des Benutzers |
| POST | `/updatePassword` | JWT | — | Ändern Sie das Passwort des Benutzers (min. 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Legen Sie den Opt-Out-Status einer Person fest |
| GET | `/search?term=` | JWT | Server.Admin | Suchen Sie alle Benutzer nach Name/E-Mail |
| DELETE | / | JWT | — | Löschen Sie das Konto des aktuellen Benutzers |

## Kirchen

Basispfad: `/membership/churches`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Laden Sie alle Kirchen für den aktuellen Benutzer |
| GET | `/:id` | JWT | — | Kirche nach ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Abrufen des Domain-Admin-Benutzers für eine Kirche |
| GET | `/:id/impersonate` | JWT | Server.Admin | Annehmen Sie eine Kirche an (nur Server-Admin) |
| GET | `/all?term=` | JWT | Server.Admin | Suchen Sie alle Kirchen (Admin) |
| GET | `/search/?name=` | Public | — | Suchen Sie Kirchen nach Name |
| GET | `/lookup/?subDomain=&id=` | Public | — | Suchen Sie eine Kirche nach Subdomain oder ID |
| POST | / | JWT | Settings.Edit | Aktualisieren Sie Kirchendetails |
| POST | `/add` | JWT | — | Registrieren Sie eine neue Kirche. Erforderliche Felder: Name, Adresse1, Stadt, Bundesland, PLZ, Land |
| POST | `/search` | Public | — | Suchen Sie Kirchen nach Name (POST-Variante) |
| POST | `/select` | JWT | — | Wählen/wechseln Sie zu einer Kirche. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archivieren oder enfernen Sie das Archiv aus einer Kirche |
| POST | `/byIds` | Public | — | Laden Sie mehrere Kirchen nach IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Löschen Sie Kirchen, die 7+ Tage verlassen wurden |

## Gruppen

Basispfad: `/membership/groups`

Erweitert Standard-CRUD (GET /, GET `/:id` aus der Basisklasse).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Auflisten aller Gruppen |
| GET | `/:id` | JWT | — | Gruppe nach ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Suchen Sie Gruppen nach Servicefiltern |
| GET | `/my` | JWT | — | Abrufen von Gruppen für den aktuellen Benutzer |
| GET | `/my/:tag` | JWT | — | Abrufen der Gruppen des aktuellen Benutzers gefiltert nach Tag |
| GET | `/tag/:tag` | JWT | — | Abrufen aller Gruppen mit einem bestimmten Tag |
| GET | `/public/:churchId/:id` | Public | — | Abrufen einer öffentlichen Gruppe nach Kirche und ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Abrufen öffentlicher Gruppen nach Tag |
| GET | `/public/:churchId/label?label=` | Public | — | Abrufen öffentlicher Gruppen nach Label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Abrufen einer öffentlichen Gruppe nach Slug |
| POST | / | JWT | Groups.Edit | Erstellen oder aktualisieren Sie Gruppen (auto-generiert Slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Löschen Sie eine Gruppe (löscht auch untergeordnete Teams für Ministeriums-Gruppen) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied nach ID abrufen |
| GET | / | JWT | GroupMembers.View* | Auflisten von Gruppenmitgliedern. Filter nach `?groupId=`, `?groupIds=` oder `?personId=`. *Auch zulässig, wenn der Benutzer in der Gruppe ist oder eigene `personId` abfragt |
| GET | `/my` | JWT | — | Abrufen der Gruppenmitgliedschaften des aktuellen Benutzers |
| GET | `/basic/:groupId` | JWT | — | Abrufen der Basismitgliederliste für eine Gruppe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Abrufen von Gruppenführern (öffentlich) |
| GET | `/public/:churchId/:groupId` | Public | — | Abrufen einer öffentlichen Gruppen-Rostertabelle (minimale Felder: `personId`, `displayName`, `leader`, Photo). Nur wenn die Gruppe sich über `publicRoster` anmeldet; betreibt das Element `staffGrid` des Website-Builders |
| POST | / | JWT | GroupMembers.Edit | Hinzufügen oder Aktualisieren von Gruppenmitgliedern |
| DELETE | `/:id` | JWT | GroupMembers.View | Entfernen Sie ein Gruppenmitglied |

## Haushalte

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Auflisten aller Haushalte |
| GET | `/:id` | JWT | — | Haushalt nach ID abrufen |
| POST | / | JWT | People.Edit | Erstellen oder aktualisieren Sie Haushalte |
| DELETE | `/:id` | JWT | People.Edit | Löschen Sie einen Haushalt |

## Rollen

Basispfad: `/membership/roles`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle nach ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Abrufen aller Rollen für eine Kirche |
| POST | / | JWT | Roles.Edit | Erstellen oder aktualisieren Sie Rollen |
| DELETE | `/:id` | JWT | Roles.Edit | Löschen Sie eine Rolle (entfernt auch ihre Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Abrufen von Mitgliedern für eine Rolle. Hinzufügen `?include=users` um Benutzerdetails einzuschließen |
| POST | / | JWT | Roles.Edit | Hinzufügen von Mitgliedern zu einer Rolle (erstellt Benutzer, wenn E-Mail nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Entfernen Sie ein Rollenmitglied |
| DELETE | `/self/:churchId/:userId` | JWT | — | Entfernen Sie sich selbst aus einer Kirche |

## Rollen-Berechtigungen

Basispfad: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Abrufen von Berechtigungen für eine Rolle (verwenden Sie 
ull als ID für die Rolle \"Everyone\") |
| POST | / | JWT | Roles.Edit | Erstellen oder aktualisieren Sie Rollen-Berechtigungen |
| DELETE | `/:id` | JWT | Roles.Edit | Löschen Sie eine Rollen-Berechtigung |

## Berechtigungen

Basispfad: `/membership/permissions`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Abrufen der vollständigen Liste verfügbarer Berechtigungen |

## Formulare

Basispfad: `/membership/forms`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Forms.Admin oder Forms.Edit | Auflisten aller Formulare (Admin sieht alle; Editoren sehen zugewiesen + nicht-Mitgliederformulare) |
| GET | `/:id` | JWT | Formular-Zugriff | Formular nach ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Auflisten archivierter Formulare |
| GET | `/standalone/:id?churchId=` | JWT | — | Abrufen eines Standalone-Formulars (begrenzte Formulare erfordern Authentifizierung) |
| POST | / | JWT | Forms.Admin oder Forms.Edit | Erstellen oder aktualisieren Sie Formulare |
| DELETE | `/:id` | JWT | Formular-Zugriff | Löschen Sie ein Formular |

## Formulareinreichungen

Basispfad: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Forms.Admin oder Forms.Edit | Auflisten von Einreichungen. Filter nach `?personId=` oder `?formId=` |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Einreichung nach ID abrufen. Hinzufügen `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Formular-Zugriff | Abrufen aller Einreichungen für ein Formular (einschließlich Formular, Fragen, Antworten) |
| POST | / | JWT | — | Formularantworten einreichen (verarbeitet begrenzte/unbegrenzte Formulare, sendet E-Mail-Benachrichtigungen). Wenn das Formular `autoCreatePerson` hat, findet oder erstellt einen Gasteintrag nach E-Mail und verknüpft die Einreichung; wenn `followUpSubject`/`followUpBody` gesetzt sind, sendet eine vorlagengesteuerte Nachfolge-E-Mail an die einreichende Person |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Löschen Sie eine Einreichung und ihre Antworten |

## Fragen

Basispfad: `/membership/questions`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Formular-Zugriff | Auflisten von Fragen für ein Formular. Erfordert `?formId=` |
| GET | `/:id` | JWT | Formular-Zugriff | Frage nach ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Abrufen von Fragen für ein uneingeschränktes Formular |
| GET | `/sort/:id/up` | JWT | — | Verschieben Sie eine Frage in der Sortierreihenfolge nach oben |
| GET | `/sort/:id/down` | JWT | — | Verschieben Sie eine Frage in der Sortierreihenfolge nach unten |
| POST | / | JWT | Formular-Zugriff | Erstellen oder aktualisieren Sie Fragen (auto-weist Sortierreihenfolge zu) |
| DELETE | `/:id?formId=` | JWT | Formular-Zugriff | Löschen Sie eine Frage |

## Antworten

Basispfad: `/membership/answers`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Forms.Admin oder Forms.Edit | Auflisten von Antworten. Filter nach `?formSubmissionId=` |
| POST | / | JWT | Forms.Admin oder Forms.Edit | Erstellen oder aktualisieren Sie Antworten |

## Mitglied-Berechtigungen

Basispfad: `/membership/memberpermissions`

Kontrolliert den Pro-Mitglied-Zugriff auf bestimmte Formulare.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formular-Zugriff | Mitglied-Berechtigung nach ID abrufen |
| GET | `/member/:id` | JWT | Formular-Zugriff | Abrufen aller Formular-Berechtigungen für ein Mitglied |
| GET | `/form/:id` | JWT | Formular-Zugriff | Abrufen aller Mitglied-Berechtigungen für ein Formular |
| GET | `/form/:id/my` | JWT | Formular-Zugriff | Abrufen Ihrer Berechtigung für ein Formular |
| POST | / | JWT | Formular-Zugriff | Erstellen oder aktualisieren Sie Mitglied-Berechtigungen |
| DELETE | `/:id?formId=` | JWT | Formular-Zugriff | Löschen Sie eine Mitglied-Berechtigung |
| DELETE | `/member/:id?formId=` | JWT | Formular-Zugriff | Löschen Sie alle Berechtigungen für ein Mitglied auf einem Formular |

## Einstellungen

Basispfad: `/membership/settings`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | Settings.Edit | Abrufen aller Einstellungen für die Kirche |
| GET | `/public/:churchId` | Public | — | Abrufen öffentlicher Einstellungen für eine Kirche |
| POST | / | JWT | Settings.Edit | Speichern Sie Einstellungen (unterstützt Base64-Bild-Upload) |

## Domänen

Basispfad: `/membership/domains`

Erweitert Standard-CRUD (GET `/:id`, GET /, DELETE `/:id` aus der Basisklasse).

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | / | JWT | — | Auflisten aller Domänen |
| GET | `/:id` | JWT | — | Domäne nach ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Suchen Sie eine Domäne nach Name |
| GET | `/public/lookup/:domainName` | Public | — | Öffentliche Domänen-Suche nach Name |
| GET | `/health/check` | Public | — | Führen Sie eine Integritätsprüfung auf nicht überprüften Domänen durch |
| POST | / | JWT | Settings.Edit | Erstellen oder aktualisieren Sie Domänen (löst Caddy-Update aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Löschen Sie eine Domäne |

## Benutzer-Kirche

Basispfad: `/membership/userchurch`

Verwaltet die Verbindung zwischen Benutzern und Kirchen.

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Abrufen des Benutzer-Kirchen-Datensatzes nach Benutzer-ID |
| GET | `/personid/:personId` | JWT | — | Abrufen der E-Mail für den verknüpften Benutzer einer Person |
| GET | `/user/:userId` | JWT | Server.Admin | Laden Sie alle Kirchen für einen Benutzer |
| POST | / | JWT | — | Erstellen Sie eine Benutzer-Kirchen-Verbindung |
| PATCH | `/:userId` | JWT | — | Aktualisieren Sie die zuletzt besuchte Zeit und protokollieren Sie den Zugriff |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Löschen Sie einen Benutzer-Kirchen-Datensatz |

## Sichtbarkeitspräferenzen

Basispfad: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Abrufen Ihrer Sichtbarkeitspräferenzen |
| POST | / | JWT | — | Speichern Sie Sichtbarkeitspräferenzen (Sichtbarkeit von Adresse, Telefon, E-Mail) |

## Abfrage

Basispfad: `/membership/query`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natürlichsprachige Mitgliedersuche mit KI. Body: `{ text, subDomain, siteUrl }` |

## Client-Fehler

Basispfad: `/membership/clientErrors`

| Method | Path | Auth | Permission | Beschreibung |
|--------|------|------|------------|-------------|
| POST | / | JWT | — | Protokollieren Sie einen clientseitigen Fehler |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) — Anmeldefluss, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpunkte](.`/attendance`) — Dienst- und Besuchsverfolgung
- [Modulstruktur](../module-structure) — Codeorganisationsmuster
