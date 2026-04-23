---
title: "Membership-Endpoints"
---

# Membership-Endpoints

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und bietet die Core-Identitäts- und Autorisierungsschicht für alle anderen Module.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen für die Kirche auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Person nach ID abrufen (enthält Formulareinreichungen) |
| GET | `/ids?ids=` | JWT | People.View oder Member | Mehrere Personen nach komma-getrennten IDs abrufen |
| GET | `/basic?ids=` | JWT | — | Grundinformationen (nur Name) für mehrere Personen abrufen |
| GET | `/recent` | JWT | People.View oder Member | Kürzlich hinzugefügte Personen |
| GET | `/search?term=&email=` | JWT | People.View oder Member | Personen nach Name oder E-Mail suchen |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen in einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen in einem Haushalt abrufen |
| GET | `/attendance` | JWT | People.Edit | Besucher mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Timeline-Daten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für Verzeichnisansicht abrufen (respektiert Sichtbarkeitspräferenzen) |
| GET | `/claim/:churchId` | JWT | — | Personendatensatz für den aktuellen Benutzer in einer Kirche einfordern |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen erstellen oder aktualisieren (Stapel) |
| POST | `/search` | JWT | People.View oder Member | Personen suchen (POST-Variante) |
| POST | `/advancedSearch` | JWT | People.View oder Member | Multi-Bedingungssuche (Alter, Geburtsmonat, Mitgliedschaftsstatus, usw.) |
| POST | `/loadOrCreate` | Öffentlich | — | Person nach E-Mail finden oder erstellen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Haushalts-Mitgliederzuweisungen aktualisieren |
| POST | `/public/email` | Öffentlich | — | E-Mail an eine Person senden. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | Person-E-Mails nach IDs laden (Server-zu-Server, benötigt jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Person löschen |

### Beispiel: Personen suchen

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

### Beispiel: Person erstellen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer

Basispfad: `/membership/users`

Siehe [Authentifizierung & Berechtigungen](./authentication) für Login-, Registrierungs- und Passwortverwaltungs-Endpoints.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT aktualisieren oder authGuid) |
| POST | `/register` | Öffentlich | — | Neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | Password-Reset-E-Mail senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort mit Auth-GUID aus E-Mail-Link setzen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort verifizieren und zugehörige Kirchen zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Benutzer nach E-Mail/userId finden oder erstellen |
| POST | `/setDisplayName` | JWT | — | Anzeigenamen des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (min 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Abmeldestatus einer Person festlegen |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail suchen |
| DELETE | `/` | JWT | — | Aktuellen Benutzerkonto löschen |

## Kirchen

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Kirchen für den aktuellen Benutzer laden |
| GET | `/:id` | JWT | — | Kirche nach ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Domain-Admin-Benutzer für eine Kirche abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Kirche nachahmen (nur Server-Admin) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Kirchen suchen (Admin) |
| GET | `/search/?name=` | Öffentlich | — | Kirchen nach Name suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Kirche nach Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Kirchendetails aktualisieren |
| POST | `/add` | JWT | — | Neue Kirche registrieren. Erforderliche Felder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Kirchen nach Name suchen (POST-Variante) |
| POST | `/select` | JWT | — | Kirche auswählen/wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Kirche archivieren oder entarchivieren |
| POST | `/byIds` | Öffentlich | — | Mehrere Kirchen nach IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kirchen löschen, die seit 7+ Tagen aufgegeben wurden |

## Gruppen

Basispfad: `/membership/groups`

Erweitert Standard CRUD (GET `/`, GET `/:id` aus Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe nach ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen nach Service-Filtern suchen |
| GET | `/my` | JWT | — | Gruppen für den aktuellen Benutzer abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers nach Tag gefiltert abrufen |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Tag abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Öffentliche Gruppe nach Kirche und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Tag abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Label abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Öffentliche Gruppe nach Slug abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen erstellen oder aktualisieren (generiert auto Slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Gruppe löschen (löscht auch untergeordnete Teams für Dienst-Gruppen) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert Standard CRUD (GET `/:id`, DELETE `/:id` aus Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied nach ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filter nach `?groupId=`, `?groupIds=` oder `?personId=`. *Auch erlaubt, wenn Benutzer in der Gruppe ist oder eigene personId abfragt |
| GET | `/my` | JWT | — | Aktuelle Gruppenmitgliedschaften des Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Grundlegende Mitgliederliste für eine Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenmitglieder abrufen (öffentlich) |
| POST | `/` | JWT | GroupMembers.Edit | Gruppenmitglieder hinzufügen oder aktualisieren |
| DELETE | `/:id` | JWT | GroupMembers.View | Gruppenmitglied entfernen |

## Haushalte

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Haushalte auflisten |
| GET | `/:id` | JWT | — | Haushalt nach ID abrufen |
| POST | `/` | JWT | People.Edit | Haushalte erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | People.Edit | Haushalt löschen |

## Rollen

Basispfad: `/membership/roles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle nach ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen für eine Kirche abrufen |
| POST | `/` | JWT | Roles.Edit | Rollen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Rolle löschen (entfernt auch ihre Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder für eine Rolle abrufen. Add `?include=users` um Benutzerdetails einzubeziehen |
| POST | `/` | JWT | Roles.Edit | Mitglieder zu einer Rolle hinzufügen (erstellt Benutzer, wenn E-Mail nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst von einer Kirche entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen für eine Rolle abrufen (nutzen Sie `null` als ID für "Everyone"-Rolle) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Admin sieht alle; Redakteure sehen zugewiesen + Nicht-Mitglieds-Formulare) |
| GET | `/:id` | JWT | Formular-Zugriff | Formular nach ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/standalone/:id?churchId=` | JWT | — | Eigenständiges Formular abrufen (eingeschränkte Formulare benötigen Auth) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Formular-Zugriff | Formular löschen |

## Formulareinreichungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Einreichungen auflisten. Filter nach `?personId=` oder `?formId=` |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Einreichung nach ID abrufen. Add `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Formular-Zugriff | Alle Einreichungen für ein Formular abrufen (enthält Formular, Fragen, Antworten) |
| POST | `/` | JWT | — | Formularantworten einreichen (behandelt eingeschränkt/nicht eingeschränkt Formulare, sendet E-Mail-Benachrichtigungen) |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Einreichung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formular-Zugriff | Fragen für ein Formular auflisten. Benötigt `?formId=` |
| GET | `/:id` | JWT | Formular-Zugriff | Frage nach ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Fragen für ein nicht eingeschränktes Formular abrufen |
| GET | `/sort/:id/up` | JWT | — | Frage in Sortierreihenfolge nach oben verschieben |
| GET | `/sort/:id/down` | JWT | — | Frage in Sortierreihenfolge nach unten verschieben |
| POST | `/` | JWT | Formular-Zugriff | Fragen erstellen oder aktualisieren (weist Sortierreihenfolge automatisch zu) |
| DELETE | `/:id?formId=` | JWT | Formular-Zugriff | Frage löschen |

## Antworten

Basispfad: `/membership/answers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten auflisten. Filter nach `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten erstellen oder aktualisieren |

## Mitgliederberechtigungen

Basispfad: `/membership/memberpermissions`

Kontrolliert Pro-Mitglied-Zugriff auf bestimmte Formulare.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formular-Zugriff | Mitgliederberechtigung nach ID abrufen |
| GET | `/member/:id` | JWT | Formular-Zugriff | Alle Formularberechtigungen für ein Mitglied abrufen |
| GET | `/form/:id` | JWT | Formular-Zugriff | Alle Mitgliederberechtigungen für ein Formular abrufen |
| GET | `/form/:id/my` | JWT | Formular-Zugriff | Berechtigungen des aktuellen Benutzers für ein Formular abrufen |
| POST | `/` | JWT | Formular-Zugriff | Mitgliederberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id?formId=` | JWT | Formular-Zugriff | Mitgliederberechtigung löschen |
| DELETE | `/member/:id?formId=` | JWT | Formular-Zugriff | Alle Berechtigungen für ein Mitglied auf einem Formular löschen |

## Einstellungen

Basispfad: `/membership/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen für die Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen für eine Kirche abrufen |
| POST | `/` | JWT | Settings.Edit | Einstellungen speichern (unterstützt Base64-Bild-Upload) |

## Domains

Basispfad: `/membership/domains`

Erweitert Standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Domains auflisten |
| GET | `/:id` | JWT | — | Domain nach ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Domain nach Name nachschlagen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Domain-Abfrage nach Name |
| GET | `/health/check` | Öffentlich | — | Gesundheitsprüfung auf nicht überprüften Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains erstellen oder aktualisieren (triggert Caddy-Update) |
| DELETE | `/:id` | JWT | Settings.Edit | Domain löschen |

## Benutzer-Kirche

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Kirchen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Kirche-Datensatz nach Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail für einen Benutzer, der mit einer Person verknüpft ist, abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Kirchen für einen Benutzer laden |
| POST | `/` | JWT | — | Benutzer-Kirche-Zuordnung erstellen |
| PATCH | `/:userId` | JWT | — | Letzte Zugriffszeit aktualisieren und Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Benutzer-Kirche-Datensatz löschen |

## Sichtbarkeitspräferenzen

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Sichtbarkeitspräferenzen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitspräferenzen speichern (Adress-, Telefon-, E-Mail-Sichtbarkeit) |

## Abfrage

Basispfad: `/membership/query`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Mitgliedersuche in natürlicher Sprache mit AI. Body: `{ text, subDomain, siteUrl }` |

## Client-Fehler

Basispfad: `/membership/clientErrors`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Client-seitigen Fehler protokollieren |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) — Login-Flow, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpoints](./attendance) — Service- und Besuchsverfolgung
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
