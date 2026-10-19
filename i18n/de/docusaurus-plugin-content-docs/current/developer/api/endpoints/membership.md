---
title: "Membership-Endpunkte"
---

# Membership-Endpunkte

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Autorisierungsschicht für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Kirche auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person anhand der ID abrufen (inklusive Formulareinreichungen) |
| GET | `/ids?ids=` | JWT | People.View oder Member | Mehrere Personen anhand kommagetrennter IDs abrufen |
| GET | `/basic?ids=` | JWT | — | Grundinformationen (nur Name) für mehrere Personen abrufen |
| GET | `/names?ids=` | JWT | Beliebige Kirchenberechtigung | `[{ id, name: { display, first, last }, photo }]`, sortiert nach Nachname und dann Vorname, für kommagetrennte IDs, die der Aufrufer bereits kennt, sodass Rollen ohne People.View (Spenden, Anwesenheit) Personen beschriften können. Keine Suche, kein Verzeichnisfilter |
| POST | `/names` | JWT | Beliebige Kirchenberechtigung | Wie `GET /names`. Body: `{ peopleIds }` (oder `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member oder People.ViewNames | Kürzlich hinzugefügte Personen. Aufrufer mit nur People.ViewNames erhalten das Basismodell (`id`, `name.display`, `photo`, `membershipStatus`), wobei Personen, die sich abgemeldet haben, ausgelassen werden |
| GET | `/search?term=&email=` | JWT | People.View, Member oder People.ViewNames | Personen nach Name oder E-Mail suchen (bis zu 100, sortiert nach Nachname und dann Vorname). Aufrufer mit nur People.ViewNames erhalten eine Namenssuche mit dem Basismodell; eine `email`-Suche gibt `[]` zurück |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmer mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer in einer Kirche beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen anlegen oder aktualisieren (Stapelverarbeitung) |
| POST | `/search` | JWT | People.View, Member oder People.ViewNames | Personen suchen (POST-Variante). Body: `{ term }` oder `{ email }`; gleiche Regeln für reine Namenssuche wie bei `GET /search` |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, birthMonth, membershipStatus usw.) |
| POST | `/loadOrCreate` | Öffentlich | — | Person anhand der E-Mail-Adresse finden oder anlegen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Haushaltsmitglieder-Zuordnungen aktualisieren |
| POST | `/public/email` | Öffentlich | — | Eine E-Mail an eine Person senden. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | E-Mails von Personen anhand von IDs laden (Server-zu-Server, erfordert jwtSecret) |
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

### Beispiel: Eine Person anlegen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer {#users}

Basispfad: `/membership/users`

Informationen zu Anmelde-, Registrierungs- und Passwortverwaltung finden Sie unter [Authentifizierung & Berechtigungen](./authentication).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT-Aktualisierung oder authGuid) |
| POST | `/register` | Öffentlich | — | Einen neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort mithilfe der Auth-GUID aus dem E-Mail-Link festlegen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort prüfen und die zugehörigen Kirchen zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Benutzer anhand von E-Mail/userId finden oder anlegen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachname des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mind. 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Den Abmeldestatus einer Person festlegen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Eine Einladung per E-Mail an eine Person in dieser Kirche senden (`email`, `personName`, `contextName`). Die Schaltfläche lautet **Registrieren** für Personen ohne Konto und **Anmelden** für bestehende Benutzer. Ein Benutzer, der sich noch nie angemeldet hat, erhält stattdessen einen Link **Passwort festlegen**, der nach 7 Tagen abläuft. Wird auf das tägliche E-Mail-Limit der Kirche angerechnet (`429`, wenn es erreicht ist) |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail durchsuchen |
| DELETE | `/` | JWT | — | Das aktuelle Benutzerkonto löschen |

## Kirchen

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Kirchen des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Kirche anhand der ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domain-Administrator einer Kirche abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Kirche imitieren (nur Server-Administratoren) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Kirchen durchsuchen (Administration) |
| GET | `/search/?name=` | Öffentlich | — | Kirchen nach Name suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Kirche anhand der Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Kirchendetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Kirche registrieren. Pflichtfelder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Kirchen nach Name suchen (POST-Variante) |
| POST | `/select` | JWT | — | Eine Kirche auswählen/wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Kirche archivieren oder die Archivierung aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Kirchen anhand von IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kirchen löschen, die seit mindestens 7 Tagen verwaist sind |

## Gruppen

Basispfad: `/membership/groups`

Erweitert das Standard-CRUD (GET `/`, GET `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen nach Gottesdienst-Filtern suchen |
| GET | `/my` | JWT | — | Gruppen des aktuellen Benutzers abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers nach Schlagwort filtern |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Schlagwort abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine öffentliche Gruppe anhand von Kirche und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Schlagwort abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Bezeichnung abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Eine öffentliche Gruppe anhand des Slugs abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen anlegen oder aktualisieren (erzeugt den Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Dienstgruppen auch die untergeordneten Teams) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert das Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied anhand der ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filtern mit `?groupId=`, `?groupIds=` oder `?personId=`. *Auch erlaubt, wenn der Benutzer in der Gruppe ist oder die eigene personId abfragt |
| GET | `/my` | JWT | — | Gruppenzugehörigkeiten des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Einfache Mitgliederliste einer Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenleitung abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Die öffentliche Teilnehmerliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur wenn die Gruppe über `publicRoster` zustimmt; ermöglicht das Element `staffGrid` des Website-Builders |
| POST | `/` | JWT | GroupMembers.Edit | Gruppenmitglieder hinzufügen oder aktualisieren |
| DELETE | `/:id` | JWT | GroupMembers.View | Ein Gruppenmitglied entfernen |

## Haushalte

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Haushalte auflisten |
| GET | `/:id` | JWT | — | Haushalt anhand der ID abrufen |
| POST | `/` | JWT | People.Edit | Haushalte anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | People.Edit | Einen Haushalt löschen |

## Rollen

Basispfad: `/membership/roles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle anhand der ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Kirche abrufen |
| POST | `/` | JWT | Roles.Edit | Rollen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch ihre Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden die Benutzerdetails mitgeliefert |
| POST | `/` | JWT | Roles.Edit | Mitglieder einer Rolle hinzufügen (legt einen Benutzer an, wenn die E-Mail-Adresse noch nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Kirche entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (`null` als ID verwenden für die Rolle „Everyone“) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

Jeder Eintrag enthält `apiName`, `section` (Inhaltstyp), `action` sowie die Bezeichnungen `displaySection` / `displayAction`, die der Rollen-Editor in B1Admin anzeigt. Neuere Ergänzungen: `MembershipApi` / `People` / `View Names` (**Nur Personennamen anzeigen**, unter People and Groups) und `GivingApi` / `Donations` / `Enter` (**Spenden erfassen**, unter Donations; siehe [Spendenstapel](./giving.md#donation-batches)).

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Administratoren sehen alle; Bearbeiter sehen zugewiesene Formulare und Formulare ohne Mitgliederbezug) |
| GET | `/:id` | JWT | Formularzugriff | Ein Formular anhand der ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Authentifizierung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formulareinreichungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Einreichungen auflisten. Filtern mit `?personId=` oder `?formId=` |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Einreichung anhand der ID abrufen. Mit `?include=form,questions,answers` ergänzen |
| GET | `/formId/:formId` | JWT | Formularzugriff | Alle Einreichungen eines Formulars abrufen (inklusive Formular, Fragen, Antworten) |
| POST | `/` | JWT | — | Formularantworten einreichen (verarbeitet eingeschränkte und nicht eingeschränkte Formulare, versendet E-Mail-Benachrichtigungen). Wenn das Formular `autoCreatePerson` hat, wird anhand der E-Mail eine Gastperson gesucht oder angelegt und die Einreichung verknüpft; sind `followUpSubject`/`followUpBody` gesetzt, wird dem Absender eine vorlagenbasierte Nachfass-E-Mail gesendet |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Einreichung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. `?formId=` ist erforderlich |
| GET | `/:id` | JWT | Formularzugriff | Eine Frage anhand der ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Fragen eines nicht eingeschränkten Formulars abrufen |
| GET | `/sort/:id/up` | JWT | — | Eine Frage in der Sortierreihenfolge nach oben verschieben |
| GET | `/sort/:id/down` | JWT | — | Eine Frage in der Sortierreihenfolge nach unten verschieben |
| POST | `/` | JWT | Formularzugriff | Fragen anlegen oder aktualisieren (vergibt die Sortierreihenfolge automatisch) |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Frage löschen |

## Antworten

Basispfad: `/membership/answers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten auflisten. Filtern mit `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten anlegen oder aktualisieren |

## Mitgliederberechtigungen

Basispfad: `/membership/memberpermissions`

Steuert den Zugriff einzelner Mitglieder auf bestimmte Formulare.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formularzugriff | Eine Mitgliederberechtigung anhand der ID abrufen |
| GET | `/member/:id` | JWT | Formularzugriff | Alle Formularberechtigungen eines Mitglieds abrufen |
| GET | `/form/:id` | JWT | Formularzugriff | Alle Mitgliederberechtigungen für ein Formular abrufen |
| GET | `/form/:id/my` | JWT | Formularzugriff | Die Berechtigung des aktuellen Benutzers für ein Formular abrufen |
| POST | `/` | JWT | Formularzugriff | Mitgliederberechtigungen anlegen oder aktualisieren |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Mitgliederberechtigung löschen |
| DELETE | `/member/:id?formId=` | JWT | Formularzugriff | Alle Berechtigungen eines Mitglieds für ein Formular löschen |

## Einstellungen

Basispfad: `/membership/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen |
| POST | `/` | JWT | Settings.Edit | Einstellungen speichern (unterstützt Bild-Upload als Base64) |

## Domains

Basispfad: `/membership/domains`

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Domains auflisten |
| GET | `/:id` | JWT | — | Domain anhand der ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Eine Domain anhand des Namens nachschlagen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Domain-Suche anhand des Namens |
| GET | `/health/check` | Öffentlich | — | Systemprüfung für nicht geprüfte Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains anlegen oder aktualisieren (löst eine Caddy-Aktualisierung aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domain löschen |

## Benutzer-Kirche

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Kirchen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Kirche-Datensatz anhand der Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail-Adresse des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Kirchen eines Benutzers laden |
| POST | `/` | JWT | — | Eine Zuordnung zwischen Benutzer und Kirche anlegen |
| PATCH | `/:userId` | JWT | — | Zeitpunkt des letzten Zugriffs aktualisieren und den Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Benutzer-Kirche-Datensatz löschen |

## Sichtbarkeitseinstellungen

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Sichtbarkeitseinstellungen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitseinstellungen speichern (Sichtbarkeit von Adresse, Telefon, E-Mail) |

## Abfrage

Basispfad: `/membership/query`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Mitgliedersuche in natürlicher Sprache mit KI. Body: `{ text, subDomain, siteUrl }` |

## Client-Fehler

Basispfad: `/membership/clientErrors`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Einen clientseitigen Fehler protokollieren |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) — Anmeldevorgang, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Organisationsmuster des Codes
