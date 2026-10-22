---
title: "Membership-Endpunkte"
---

# Membership-Endpunkte

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Berechtigungsschicht für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Kirche auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person anhand der ID abrufen (enthält Formularübermittlungen) |
| GET | `/ids?ids=` | JWT | People.View, Member oder People.ViewNames | Mehrere Personen anhand kommagetrennter IDs abrufen. Aufrufer mit People.ViewNames ohne People.View erhalten das Basismodell; Personen, die sich von der Sichtbarkeit abgemeldet haben, werden ausgelassen (außer dem Aufrufer selbst) |
| GET | `/basic?ids=` | JWT | — | Grundinformationen (nur Name) für mehrere Personen abrufen |
| GET | `/names?ids=` | JWT | Beliebige Berechtigung der Kirche | `[{ id, name: { display, first, last }, photo }]`, sortiert nach Nachname und Vorname, für kommagetrennte IDs, die der Aufrufer bereits sehen darf. So können Rollen ohne People.View (Spenden, Anwesenheit) Personen beschriften. Keine Suche, kein Verzeichnisfilter |
| POST | `/names` | JWT | Beliebige Berechtigung der Kirche | Wie `GET /names`. Body: `{ peopleIds }` (oder `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member oder People.ViewNames | Kürzlich hinzugefügte Personen. Aufrufer mit People.ViewNames ohne People.View (auch Mitglieder mit Verzeichniszugang) erhalten das Basismodell (`id`, `name.display`, `photo`, `membershipStatus`); Personen, die sich abgemeldet haben, werden ausgelassen |
| GET | `/search?term=&email=` | JWT | People.View, Member oder People.ViewNames | Personen nach Name oder E-Mail-Adresse suchen (bis zu 100, sortiert nach Nachname und Vorname). Aufrufer mit People.ViewNames ohne People.View (auch Mitglieder mit Verzeichniszugang) erhalten bei einer Namenssuche das Basismodell; eine Suche nach `email` liefert `[]` |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmende mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt die Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer in einer Kirche beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen erstellen oder aktualisieren (Stapel) |
| POST | `/search` | JWT | People.View, Member oder People.ViewNames | Personen suchen (POST-Variante). Body: `{ term }` oder `{ email }`; gleiche Regeln für reine Namensansicht wie bei `GET /search` |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, birthMonth, membershipStatus usw.) |
| POST | `/loadOrCreate` | Öffentlich | — | Eine Person anhand der E-Mail-Adresse finden oder anlegen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Zuordnung der Haushaltsmitglieder aktualisieren |
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

### Beispiel: Eine Person anlegen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer

Basispfad: `/membership/users`

Informationen zu Anmeldung, Registrierung und Passwortverwaltung finden Sie unter [Authentifizierung & Berechtigungen](./authentication).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT-Erneuerung oder authGuid) |
| POST | `/register` | Öffentlich | — | Einen neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort mit der Auth-GUID aus dem E-Mail-Link setzen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort prüfen und die zugehörigen Kirchen zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Einen Benutzer anhand von E-Mail-Adresse/Benutzer-ID finden oder anlegen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachnamen des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mindestens 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Den Abmeldestatus einer Person setzen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Eine Einladung an eine Person dieser Kirche senden (`email`, `personName`, `contextName`). Die Schaltfläche lautet **Registrieren** für Personen ohne Konto und **Anmelden** für bestehende Benutzer. Ein Benutzer, der sich noch nie angemeldet hat, erhält stattdessen einen Link **Passwort festlegen**, der nach 7 Tagen abläuft. Da es sich um eine feste Vorlage handelt, zählt sie nicht zum täglichen E-Mail-Limit der Kirche |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail-Adresse durchsuchen |
| DELETE | `/` | JWT | — | Das Konto des aktuellen Benutzers löschen |

## Kirchen

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Kirchen des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Kirche anhand der ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domänenadministrator einer Kirche abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Kirche imitieren (nur Serveradministratoren) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Kirchen durchsuchen (Administration) |
| GET | `/search/?name=` | Öffentlich | — | Kirchen nach Name suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Kirche anhand der Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Kirchendetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Kirche registrieren. Pflichtfelder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Kirchen nach Name suchen (POST-Variante) |
| POST | `/select` | JWT | — | Eine Kirche auswählen bzw. wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Kirche archivieren bzw. die Archivierung aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Kirchen anhand von IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kirchen löschen, die seit mindestens 7 Tagen verlassen wurden |

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
| POST | `/` | JWT | Groups.Edit | Gruppen erstellen oder aktualisieren (erzeugt den Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Dienstbereichen auch die untergeordneten Teams) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert das Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied anhand der ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filtern mit `?groupId=`, `?groupIds=` oder `?personId=`. *Auch erlaubt, wenn der Benutzer in der Gruppe ist oder die eigene personId abfragt, sowie für `?groupId=` jeder nicht vertraulichen Gruppe, wenn der Benutzer Attendance.View oder Attendance.Edit besitzt (Mitglieder unter 13 Jahren sind dann eingeschlossen) |
| GET | `/my` | JWT | — | Gruppenmitgliedschaften des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Einfache Mitgliederliste einer Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Leitende einer Gruppe abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Öffentliche Mitgliederliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur wenn die Gruppe über `publicRoster` zustimmt; speist das Element `staffGrid` des Website-Baukastens |
| POST | `/` | JWT | GroupMembers.Edit | Gruppenmitglieder hinzufügen oder aktualisieren |
| DELETE | `/:id` | JWT | GroupMembers.View | Ein Gruppenmitglied entfernen |

## Haushalte

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Haushalte auflisten |
| GET | `/:id` | JWT | — | Haushalt anhand der ID abrufen |
| POST | `/` | JWT | People.Edit | Haushalte erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | People.Edit | Einen Haushalt löschen |

## Rollen

Basispfad: `/membership/roles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle anhand der ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Kirche abrufen |
| POST | `/` | JWT | Roles.Edit | Rollen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch ihre Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden auch Benutzerdetails einbezogen |
| POST | `/` | JWT | Roles.Edit | Mitglieder zu einer Rolle hinzufügen (legt einen Benutzer an, falls die E-Mail-Adresse noch nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Kirche entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (als ID `null` für die Rolle „Alle“ verwenden) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

Jeder Eintrag enthält `apiName`, `section` (Inhaltstyp), `action` sowie die Anzeigebezeichnungen `displaySection` / `displayAction`, die der Rollen-Editor von B1 Admin anzeigt. Neuere Ergänzungen sind `MembershipApi` / `People` / `View Names` (**Nur Namen von Personen anzeigen**, unter Personen und Gruppen) und `GivingApi` / `Donations` / `Enter` (**Spenden erfassen**, unter Spenden; siehe [Spendenstapel](./giving.md#donation-batches)).

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Administration sieht alle; Bearbeitende sehen zugewiesene und Formulare ohne Mitgliederbezug) |
| GET | `/:id` | JWT | Formularzugriff | Ein Formular anhand der ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Anmeldung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formularübermittlungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Übermittlungen auflisten. Filtern mit `?personId=` oder `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Selbstbezogen: bis zu 50 eigenständige Formularübermittlungen (keine Personenformulare) des angemeldeten Mitglieds, neueste zuerst, jeweils mit `form.name`. `include` fügt die Fragen jedes Formulars und die Antworten der Übermittlung hinzu. Gibt `401` zurück, wenn der Benutzer keiner Person zugeordnet ist. Speist den Abschnitt **Meine Formulare** der Seite Ich im B1-Mitgliederportal |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Übermittlung anhand der ID abrufen. Mit `?include=form,questions,answers` ergänzen |
| GET | `/formId/:formId` | JWT | Formularzugriff | Alle Übermittlungen eines Formulars abrufen (enthält Formular, Fragen, Antworten) |
| POST | `/` | JWT | — | Formularantworten übermitteln (verarbeitet eingeschränkte und nicht eingeschränkte Formulare, sendet E-Mail-Benachrichtigungen). Hat das Formular `autoCreatePerson`, wird eine Gastperson anhand der E-Mail-Adresse gesucht oder angelegt und die Übermittlung verknüpft; sind `followUpSubject`/`followUpBody` gesetzt, wird eine Nachfass-E-Mail mit Vorlage an den Absender gesendet. Sofern der Aufrufer das Formular nicht verwalten darf, wird `submittedBy` immer auf die Person des angemeldeten Mitglieds gesetzt (oder bei anonymen Übermittlungen leer gelassen) |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Übermittlung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. Erforderlich: `?formId=` |
| GET | `/:id` | JWT | Formularzugriff | Eine Frage anhand der ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Fragen eines nicht eingeschränkten Formulars abrufen |
| GET | `/sort/:id/up` | JWT | — | Eine Frage in der Sortierreihenfolge nach oben verschieben |
| GET | `/sort/:id/down` | JWT | — | Eine Frage in der Sortierreihenfolge nach unten verschieben |
| POST | `/` | JWT | Formularzugriff | Fragen erstellen oder aktualisieren (vergibt die Sortierreihenfolge automatisch) |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Frage löschen |

## Antworten

Basispfad: `/membership/answers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten auflisten. Filtern mit `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten erstellen oder aktualisieren |

## Berechtigungen einzelner Mitglieder

Basispfad: `/membership/memberpermissions`

Steuert den Zugriff einzelner Mitglieder auf bestimmte Formulare.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formularzugriff | Eine Mitgliedsberechtigung anhand der ID abrufen |
| GET | `/member/:id` | JWT | Formularzugriff | Alle Formularberechtigungen eines Mitglieds abrufen |
| GET | `/form/:id` | JWT | Formularzugriff | Alle Mitgliedsberechtigungen eines Formulars abrufen |
| GET | `/form/:id/my` | JWT | Formularzugriff | Die Berechtigung des aktuellen Benutzers für ein Formular abrufen |
| POST | `/` | JWT | Formularzugriff | Mitgliedsberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id?formId=` | JWT | Formularzugriff | Eine Mitgliedsberechtigung löschen |
| DELETE | `/member/:id?formId=` | JWT | Formularzugriff | Alle Berechtigungen eines Mitglieds für ein Formular löschen |

## Einstellungen

Basispfad: `/membership/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Kirche abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Kirche abrufen |
| POST | `/` | JWT | Settings.Edit | Einstellungen speichern (unterstützt Base64-Bildupload) |

## Domänen

Basispfad: `/membership/domains`

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Domänen auflisten |
| GET | `/:id` | JWT | — | Domäne anhand der ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Eine Domäne anhand des Namens nachschlagen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Domänensuche anhand des Namens |
| GET | `/health/check` | Öffentlich | — | Gesundheitsprüfung für noch nicht geprüfte Domänen ausführen |
| POST | `/` | JWT | Settings.Edit | Domänen erstellen oder aktualisieren (löst eine Aktualisierung von Caddy aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domäne löschen |

## Benutzer-Kirche-Zuordnung

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Kirchen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Datensatz Benutzer–Kirche anhand der Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail-Adresse des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Kirchen eines Benutzers laden |
| POST | `/` | JWT | — | Eine Zuordnung Benutzer–Kirche erstellen |
| PATCH | `/:userId` | JWT | — | Zeitpunkt des letzten Zugriffs aktualisieren und den Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Datensatz Benutzer–Kirche löschen |

## Sichtbarkeitseinstellungen

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Die Sichtbarkeitseinstellungen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitseinstellungen speichern (Sichtbarkeit von Adresse, Telefon und E-Mail) |

## Abfrage

Basispfad: `/membership/query`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Mitgliedersuche in natürlicher Sprache mit KI. Body: `{ text, subDomain, siteUrl }` |

## Clientfehler

Basispfad: `/membership/clientErrors`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Einen clientseitigen Fehler protokollieren |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) – Anmeldung, JWT, OAuth, Berechtigungsmodell
- [Anwesenheit-Endpunkte](./attendance) – Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) – Organisation des Codes
