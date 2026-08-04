---
title: "Membership-Endpunkte"
---

# Membership-Endpunkte

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Autorisierungsschicht für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen (People)

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Kirche auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person anhand der ID abrufen (inklusive Formularübermittlungen) |
| GET | `/ids?ids=` | JWT | People.View oder Member | Mehrere Personen anhand kommagetrennter IDs abrufen |
| GET | `/basic?ids=` | JWT | — | Grundlegende Informationen (nur Name) für mehrere Personen abrufen |
| GET | `/recent` | JWT | People.View oder Member | Kürzlich hinzugefügte Personen |
| GET | `/search?term=&email=` | JWT | People.View oder Member | Personen nach Name oder E-Mail suchen |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen in einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmer mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer bei einer Kirche beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen erstellen oder aktualisieren (Batch) |
| POST | `/search` | JWT | People.View oder Member | Personen suchen (POST-Variante) |
| POST | `/advancedSearch` | JWT | People.View oder Member | Mehrbedingungssuche (Alter, birthMonth, membershipStatus usw.) |
| POST | `/loadOrCreate` | Öffentlich | — | Eine Person anhand der E-Mail finden oder erstellen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Zuweisungen von Haushaltsmitgliedern aktualisieren |
| POST | `/public/email` | Öffentlich | — | Eine E-Mail an eine Person senden. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | E-Mail-Adressen von Personen anhand von IDs laden (Server-zu-Server, erfordert jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Eine Person löschen |

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

### Beispiel: Eine Person erstellen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer (Users)

Basispfad: `/membership/users`

Siehe [Authentifizierung & Berechtigungen](./authentication) für Endpunkte zu Anmeldung, Registrierung und Passwortverwaltung.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT-Refresh oder authGuid) |
| POST | `/register` | Öffentlich | — | Einen neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort mittels Auth-GUID aus dem E-Mail-Link festlegen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort verifizieren und zugehörige Kirchen zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Einen Benutzer anhand von E-Mail/userId finden oder erstellen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachnamen des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mind. 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Opt-out-Status einer Person festlegen |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail durchsuchen |
| DELETE | `/` | JWT | — | Das aktuelle Benutzerkonto löschen |

## Kirchen (Churches)

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Kirchen des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Kirche anhand der ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domain-Administrator einer Kirche abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Kirche imitieren (nur Server-Administratoren) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Kirchen durchsuchen (Administration) |
| GET | `/search/?name=` | Öffentlich | — | Kirchen nach Namen suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Kirche anhand von Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Kirchendetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Kirche registrieren. Erforderliche Felder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Kirchen nach Namen suchen (POST-Variante) |
| POST | `/select` | JWT | — | Zu einer Kirche wechseln/sie auswählen. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Kirche archivieren oder die Archivierung aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Kirchen anhand von IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Seit 7+ Tagen verwaiste Kirchen löschen |

## Gruppen (Groups)

Basispfad: `/membership/groups`

Erweitert Standard-CRUD (GET `/`, GET `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen nach Gottesdienstfiltern suchen |
| GET | `/my` | JWT | — | Gruppen des aktuellen Benutzers abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers, gefiltert nach Tag |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Tag abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine öffentliche Gruppe anhand von Kirche und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Tag abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Label abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Eine öffentliche Gruppe anhand des Slugs abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen erstellen oder aktualisieren (generiert Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Ministry-Gruppen auch untergeordnete Teams) |

## Gruppenmitglieder (Group Members)

Basispfad: `/membership/groupmembers`

Erweitert Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied anhand der ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filterbar über `?groupId=`, `?groupIds=` oder `?personId=`. *Auch erlaubt, wenn der Benutzer Mitglied der Gruppe ist oder nach der eigenen personId sucht |
| GET | `/my` | JWT | — | Gruppenmitgliedschaften des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Einfache Mitgliederliste für eine Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenleiter abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Öffentliche Mitgliederliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur, wenn die Gruppe dies über `publicRoster` zulässt; treibt das `staffGrid`-Element des Website-Builders an |
| POST | `/` | JWT | GroupMembers.Edit | Gruppenmitglieder hinzufügen oder aktualisieren |
| DELETE | `/:id` | JWT | GroupMembers.View | Ein Gruppenmitglied entfernen |

## Haushalte (Households)

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Haushalte auflisten |
| GET | `/:id` | JWT | — | Haushalt anhand der ID abrufen |
| POST | `/` | JWT | People.Edit | Haushalte erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | People.Edit | Einen Haushalt löschen |

## Rollen (Roles)

Basispfad: `/membership/roles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle anhand der ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Kirche abrufen |
| POST | `/` | JWT | Roles.Edit | Rollen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch deren Berechtigungen und Mitglieder) |

## Rollenmitglieder (Role Members)

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden Benutzerdetails eingeschlossen |
| POST | `/` | JWT | Roles.Edit | Mitglieder zu einer Rolle hinzufügen (erstellt einen Benutzer, falls die E-Mail nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Kirche entfernen |

## Rollenberechtigungen (Role Permissions)

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (verwenden Sie `null` als ID für die Rolle "Everyone") |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen (Permissions)

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

## Formulare (Forms)

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Administratoren sehen alle; Bearbeiter sehen zugewiesene sowie nicht-mitgliederbezogene Formulare) |
| GET | `/:id` | JWT | Formularzugriff | Ein Formular anhand der ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Authentifizierung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formularübermittlungen (Form Submissions)

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Übermittlungen auflisten. Filterbar über `?personId=` oder `?formId=` |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Übermittlung anhand der ID abrufen. Mit `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Formularzugriff | Alle Übermittlungen für ein Formular abrufen (inklusive Formular, Fragen, Antworten) |
| POST | `/` | JWT | — | Formularantworten übermitteln (behandelt eingeschränkte/uneingeschränkte Formulare, sendet E-Mail-Benachrichtigungen). Wenn das Formular `autoCreatePerson` gesetzt hat, wird anhand der E-Mail eine Gast-Person gefunden oder erstellt und mit der Übermittlung verknüpft; sind `followUpSubject`/`followUpBody` gesetzt, wird eine vorlagenbasierte Follow-up-E-Mail an den Absender gesendet |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Übermittlung und ihre Antworten löschen |

## Fragen (Questions)

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. Erfordert `?formId=` |
| GET | `/:id` | JWT | Formularzugriff | Eine Frage anhand der ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Fragen für ein uneingeschränktes Formular abrufen |
| GET | `/sort/:id/up` | JWT | — | Eine Frage in der Sortierreihenfolge nach oben verschieben |
| GET | `/sort/:id/down` | JWT | — | Eine Frage in der Sortierreihenfolge nach unten verschieben |
| POST | `/` | JWT | Formularzugriff | Fragen erstellen oder aktualisieren (weist die Sortierreihenfolge automatisch zu) |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Frage löschen |

## Antworten (Answers)

Basispfad: `/membership/answers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten auflisten. Filterbar über `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten erstellen oder aktualisieren |

## Mitgliederberechtigungen (Member Permissions)

Basispfad: `/membership/memberpermissions`

Steuert den Zugriff einzelner Mitglieder auf bestimmte Formulare.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formularzugriff | Eine Mitgliederberechtigung anhand der ID abrufen |
| GET | `/member/:id` | JWT | Formularzugriff | Alle Formularberechtigungen eines Mitglieds abrufen |
| GET | `/form/:id` | JWT | Formularzugriff | Alle Mitgliederberechtigungen eines Formulars abrufen |
| GET | `/form/:id/my` | JWT | Formularzugriff | Berechtigung des aktuellen Benutzers für ein Formular abrufen |
| POST | `/` | JWT | Formularzugriff | Mitgliederberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Mitgliederberechtigung löschen |
| DELETE | `/member/:id?formId=` | JWT | Formularzugriff | Alle Berechtigungen eines Mitglieds für ein Formular löschen |

## Einstellungen (Settings)

Basispfad: `/membership/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen |
| POST | `/` | JWT | Settings.Edit | Einstellungen speichern (unterstützt Base64-Bild-Upload) |

## Domains

Basispfad: `/membership/domains`

Erweitert Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Domains auflisten |
| GET | `/:id` | JWT | — | Domain anhand der ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Eine Domain anhand des Namens nachschlagen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Domain-Suche anhand des Namens |
| GET | `/health/check` | Öffentlich | — | Gesundheitsprüfung für ungeprüfte Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains erstellen oder aktualisieren (löst eine Caddy-Aktualisierung aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domain löschen |

## Benutzer-Kirche (User Church)

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Kirchen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Kirche-Datensatz anhand der Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail-Adresse des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Kirchen eines Benutzers laden |
| POST | `/` | JWT | — | Eine Benutzer-Kirche-Zuordnung erstellen |
| PATCH | `/:userId` | JWT | — | Letzten Zugriffszeitpunkt aktualisieren und Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Benutzer-Kirche-Datensatz löschen |

## Sichtbarkeitseinstellungen (Visibility Preferences)

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Sichtbarkeitseinstellungen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitseinstellungen speichern (Sichtbarkeit von Adresse, Telefon, E-Mail) |

## Abfrage (Query)

Basispfad: `/membership/query`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natürlichsprachliche Mitgliedersuche mittels KI. Body: `{ text, subDomain, siteUrl }` |

## Client-Fehler (Client Errors)

Basispfad: `/membership/clientErrors`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Einen clientseitigen Fehler protokollieren |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpunkte](./attendance) — Gottesdienst- und Besuchsverfolgung
- [Modulstruktur](../module-structure) — Code-Organisationsmuster
