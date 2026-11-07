---
title: "Membership-Endpunkte"
description: "Endpunkt-Referenz der ChurchApps-Membership-API: Personen, Haushalte, Gruppen, Rollen, Formulare und Einstellungen mit Auth- und Berechtigungsregeln."
---

# Membership-Endpunkte

<div class="article-intro">

Das Membership-Modul verwaltet Personen, Gemeinden, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Autorisierungsschicht für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Gemeinde auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person anhand der ID abrufen (enthält Formularübermittlungen) |
| GET | `/ids?ids=` | JWT | People.View, Member oder People.ViewNames | Mehrere Personen anhand kommagetrennter IDs abrufen. Aufrufer mit People.ViewNames ohne People.View erhalten das Basismodell; Personen, die dem Verzeichnis widersprochen haben, werden ausgelassen (außer dem Aufrufer selbst) |
| GET | `/basic?ids=` | JWT | — | Basisinformationen (nur Name) für mehrere Personen abrufen |
| GET | `/names?ids=` | JWT | Beliebige Gemeindeberechtigung | `[{ id, name: { display, first, last }, photo }]`, sortiert nach Nachname und dann Vorname, für kommagetrennte IDs, die der Aufrufer bereits kennt. So können Rollen ohne People.View (Spenden, Anwesenheit) Personen beschriften. Keine Suche, kein Verzeichnisfilter |
| POST | `/names` | JWT | Beliebige Gemeindeberechtigung | Wie `GET /names`. Body: `{ peopleIds }` (oder `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member oder People.ViewNames | Kürzlich hinzugefügte Personen. Aufrufer mit People.ViewNames ohne People.View (auch Mitglieder mit Verzeichniszugriff) erhalten das Basismodell (`id`, `name.display`, `photo`, `membershipStatus`); Personen, die dem Verzeichnis widersprochen haben, werden ausgelassen |
| GET | `/guest-register/options?churchId=` | Öffentlich | — | Checkliste für die Gästeanmeldung per QR-Code: gibt `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` zurück, jeweils `"off"`, `"optional"` oder `"required"` (aus der öffentlichen Einstellung `guestRegistrationFields` ausgelesen; fehlende oder fehlerhafte Werte fallen auf E-Mail/Telefon optional, der Rest aus). Erfordert `enableQRGuestRegistration`, sofern die Anfrage kein passendes Site- oder Gemeinde-Token mitsendet; ratenbegrenzt (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member oder People.ViewNames | Personen nach Name oder E-Mail suchen (bis zu 100, sortiert nach Nachname und dann Vorname). Aufrufer mit People.ViewNames ohne People.View (auch Mitglieder mit Verzeichniszugriff) erhalten bei einer Namenssuche das Basismodell; eine Suche nach `email` liefert `[]` |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmer mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt die Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer in einer Gemeinde beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen erstellen oder aktualisieren (als Stapel) |
| POST | `/search` | JWT | People.View, Member oder People.ViewNames | Personen durchsuchen (POST-Variante). Body: `{ term }` oder `{ email }`; gleiche Regeln für reine Namenssuche wie bei `GET /search` |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, birthMonth, membershipStatus usw.). Der Body ist ein Array von Bedingungen; ein leerer Body bedeutet keine Bedingungen, jeder andere Nicht-Array-Body liefert 400 |
| POST | `/loadOrCreate` | Öffentlich | — | Eine Person anhand der E-Mail finden oder anlegen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Öffentlich | — | Gästeanmeldung per QR-Code. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 Mitglieder; email/phone/maritalStatus gelten nur für das erste Mitglied). Von der Gemeinde deaktivierte Felder werden verworfen; fehlende Pflichtfelder oder ungültige Werte liefern 400. Zuerst werden bestehende Personen wiederverwendet: Ein Mitglied passt, wenn genau eine nicht entfernte Person denselben Vornamen (ohne Berücksichtigung der Groß-/Kleinschreibung) und dieselbe E-Mail oder dieselben Telefonziffern (privat, geschäftlich oder mobil) hat; ein Mitglied ohne E-Mail oder Telefon passt über den Vornamen innerhalb des zugeordneten Haushalts. Passende Personen werden nie verändert. Nicht zugeordnete Mitglieder treten dem passenden Haushalt bei, andernfalls wird ein neuer Haushalt angelegt (benannt nach dem Nachnamen des ersten Mitglieds), als `membershipStatus: "Visitor"` mit der gemeinsamen `address`. `comments` wird als Notiz beim ersten Mitglied gespeichert; alle werden, falls gesetzt, der privaten Gruppe `guestRegistrationGroupId` hinzugefügt. Ist `guestRegistrationRecordAttendance` auf `"true"` gesetzt, wird außerdem die Anwesenheit für die planmäßigen Gottesdienstzeiten dieser Gruppe erfasst, deren Check-in-Fenster gerade geöffnet ist. Gibt `{ householdId, people: [{ id, name }] }` zurück und spiegelt die übermittelten statt der gespeicherten Namen wider. Gleiche Regeln zu Opt-in/Token und Ratenbegrenzung wie beim Options-Aufruf |
| POST | `/household/:householdId` | JWT | People.Edit | Haushaltszuordnungen der Mitglieder aktualisieren |
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

### Beispiel: Person anlegen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer {#users}

Basispfad: `/membership/users`

Informationen zu den Endpunkten für Anmeldung, Registrierung und Passwortverwaltung finden Sie unter [Authentifizierung und Berechtigungen](./authentication.md).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT-Erneuerung oder authGuid) |
| POST | `/register` | Öffentlich | — | Einen neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort über die Auth-GUID aus dem E-Mail-Link setzen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort prüfen und zugehörige Gemeinden zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Einen Benutzer anhand von E-Mail/Benutzer-ID finden oder anlegen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachname des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mind. 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Den Status „Verzeichnis widersprochen“ einer Person setzen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Eine Einladung per E-Mail an eine Person in dieser Gemeinde senden (`email`, `personName`, `contextName`). Die Schaltfläche lautet **Sign Up** für Personen ohne Konto und **Log In** für bestehende Benutzer. Ein Benutzer, der sich noch nie angemeldet hat, erhält stattdessen einen Link **Set Your Password**, der nach 7 Tagen abläuft. Es handelt sich um eine feste Vorlage, daher zählt sie nicht zum täglichen E-Mail-Limit der Gemeinde |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail durchsuchen |
| DELETE | `/` | JWT | — | Das Konto des aktuellen Benutzers löschen |

## Gemeinden

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gemeinden des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Gemeinde anhand der ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domain-Admin-Benutzer einer Gemeinde abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Gemeinde imitieren (nur Server-Admin) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Gemeinden durchsuchen (Admin) |
| GET | `/search/?name=` | Öffentlich | — | Gemeinden nach Name durchsuchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Gemeinde anhand der Subdomain oder ID suchen |
| POST | `/` | JWT | Settings.Edit | Gemeindedetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Gemeinde registrieren. Pflichtfelder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Gemeinden nach Name durchsuchen (POST-Variante) |
| POST | `/select` | JWT | — | Eine Gemeinde auswählen/wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Gemeinde archivieren oder das Archiv aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Gemeinden anhand von IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Gemeinden löschen, die seit 7 oder mehr Tagen verlassen wurden |

## Gruppen

Basispfad: `/membership/groups`

Erweitert das Standard-CRUD (GET `/`, GET `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen nach Gottesdienstfiltern durchsuchen |
| GET | `/my` | JWT | — | Gruppen des aktuellen Benutzers abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers nach Schlagwort gefiltert abrufen |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Schlagwort abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine öffentliche Gruppe anhand von Gemeinde und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Schlagwort abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Bezeichnung abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Eine öffentliche Gruppe anhand des Slugs abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen erstellen oder aktualisieren (generiert den Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Dienstbereichsgruppen auch die untergeordneten Teams) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert das Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied anhand der ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filtern mit `?groupId=`, `?groupIds=` oder `?personId=`. *Ebenfalls erlaubt, wenn der Benutzer in der Gruppe ist oder die eigene personId abfragt, sowie für `?groupId=` jeder nicht vertraulichen Gruppe, wenn der Benutzer Attendance.View oder Attendance.Edit besitzt (Mitglieder unter 13 Jahren werden dann einbezogen) |
| GET | `/my` | JWT | — | Gruppenmitgliedschaften des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Einfache Mitgliederliste einer Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenleitungen abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Die öffentliche Teilnehmerliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur wenn die Gruppe über `publicRoster` zustimmt; versorgt das Element `staffGrid` des Website-Builders |
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
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Gemeinde abrufen. Jede Rolle enthält `memberCount`, die Anzahl unterschiedlicher Benutzer in ihr |
| POST | `/` | JWT | Roles.Edit | Rollen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch deren Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden die Benutzerdetails mitgeliefert |
| POST | `/` | JWT | Roles.Edit | Mitglieder einer Rolle hinzufügen (legt einen Benutzer an, falls die E-Mail noch nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Gemeinde entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (`null` als ID für die Rolle „Everyone“ verwenden) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen erstellen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

Jeder Eintrag enthält `apiName`, `section` (Inhaltstyp), `action` sowie die Bezeichnungen `displaySection` / `displayAction`, die der Rollen-Editor von B1Admin anzeigt. Neuere Ergänzungen sind `MembershipApi` / `People` / `View Names` (**View People Names Only**, unter Personen und Gruppen) und `GivingApi` / `Donations` / `Enter` (**Enter Donations**, unter Spenden; siehe [Spendenstapel](./giving.md#donation-batches)).

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Admins sehen alle; Bearbeiter sehen zugewiesene und Nicht-Mitgliederformulare) |
| GET | `/:id` | JWT | Formularzugriff | Ein Formular anhand der ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/group/:groupId` | JWT | Gruppenmitglied, Gruppenleitung oder Forms.Admin | Eigenständige Formulare, die mit der Gruppe verknüpft sind (`forms.groupId`), ohne archivierte, sortiert nach Name. Gibt `id`, `name`, `description` und `open` (innerhalb des Verfügbarkeitszeitraums) zurück. Mitglieder erhalten nur geöffnete Formulare; Leitungen und Formularadministratoren erhalten auch geschlossene. Versorgt die verknüpften Formulare auf der Gruppenseite |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Anmeldung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare erstellen oder aktualisieren. Eigenständige Formulare akzeptieren ein optionales `photoUrl` (Kopfzeilenfoto über dem Formular) und `groupId` (verknüpfte Gruppe) |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formularübermittlungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Übermittlungen auflisten. Filtern mit `?personId=` oder `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Nur eigene Daten: bis zu 50 eigenständige Formularübermittlungen (keine Personenformulare), die der angemeldete Benutzer abgesendet hat oder die mit seiner Person verknüpft sind (`contentType` `person`, `contentId` = seine Personen-ID — etwa nach einer Änderung durch einen Admin), die neuesten zuerst, jeweils mit `form.name`. `include` hängt die Fragen jedes Formulars und die Antworten der Übermittlung an. Gibt `401` zurück, wenn der Benutzer keiner Person zugeordnet ist. Versorgt den Bereich **My Forms** der Seite B1 Me |
| GET | `/group/:groupId` | JWT | Leitung der Gruppe | Antworten für die Gruppenleitungen: ein Eintrag pro verknüpftem Formular und pro Gruppenereignis mit Anmeldeformular, jeweils mit `form`, `event` (`id`, `title`, `start`; nur bei Ereigniseinträgen), `questions` und `submissions` (mit `answers` und `personName`, `null` bei anonymen Übermittlungen) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit oder Ansichtszugriff | Übermittlung anhand der ID abrufen. Mit `?include=form,questions,answers` werden Formular, Fragen und Antworten mitgeliefert. Leitungen der verknüpften Gruppe des Formulars sowie Leitungen der Gruppe, zu der eine Ereignisanmeldung gehört, können sie ebenfalls lesen |
| GET | `/formId/:formId` | JWT | Formularzugriff (Ansicht) | Alle Übermittlungen eines Formulars abrufen (mit Formular, Fragen und Antworten). Leitungen der verknüpften Gruppe des Formulars haben Ansichtszugriff |
| POST | `/` | JWT | — | Formularantworten übermitteln (verarbeitet eingeschränkte und nicht eingeschränkte Formulare, versendet E-Mail-Benachrichtigungen). Wenn das Formular `autoCreatePerson` hat, wird anhand der E-Mail eine Gastperson gesucht oder angelegt und die Übermittlung verknüpft; wenn das Formular außerdem eine `groupId` hat, wird die Person der Gruppe hinzugefügt; sind `followUpSubject`/`followUpBody` gesetzt, wird dem Absender eine vorlagenbasierte Nachfass-E-Mail gesendet. Sofern der Aufrufer das Formular nicht verwalten kann, wird `submittedBy` immer auf die Person des angemeldeten Mitglieds gesetzt (bei anonymen Übermittlungen leer) |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Übermittlung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. Erfordert `?formId=` |
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

## Mitgliederberechtigungen

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

## Einstellungen

Basispfad: `/membership/settings`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Gemeinde abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Gemeinde abrufen |
| POST | `/` | JWT | Settings.Edit | Einstellungen speichern (unterstützt den Upload von Bildern als Base64) |

## Domains

Basispfad: `/membership/domains`

Erweitert das Standard-CRUD (GET `/:id`, GET `/`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Domains auflisten |
| GET | `/:id` | JWT | — | Domain anhand der ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Eine Domain anhand des Namens suchen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Suche einer Domain anhand des Namens |
| GET | `/health/check` | Öffentlich | — | Zustandsprüfung für nicht geprüfte Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains erstellen oder aktualisieren (löst eine Aktualisierung von Caddy aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domain löschen |

## Benutzer-Gemeinde-Zuordnung

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Gemeinden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Gemeinde-Datensatz anhand der Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Gemeinden eines Benutzers laden |
| POST | `/` | JWT | — | Eine Benutzer-Gemeinde-Zuordnung erstellen |
| PATCH | `/:userId` | JWT | — | Zeitpunkt des letzten Zugriffs aktualisieren und den Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Benutzer-Gemeinde-Datensatz löschen |

## Sichtbarkeitseinstellungen

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Sichtbarkeitseinstellungen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitseinstellungen speichern (Sichtbarkeit von Adresse, Telefon und E-Mail) |

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

- [Authentifizierung und Berechtigungen](./authentication.md) — Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpunkte](./attendance.md) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure.md) — Muster der Code-Organisation
