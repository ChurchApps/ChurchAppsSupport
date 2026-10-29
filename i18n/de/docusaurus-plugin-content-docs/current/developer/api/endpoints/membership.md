---
title: "Mitgliedschafts-Endpunkte"
---

# Mitgliedschafts-Endpunkte

<div class="article-intro">

Das Modul Membership verwaltet Personen, Kirchen, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Autorisierungsschicht für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Kirche auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person nach ID abrufen (enthält Formulareinreichungen) |
| GET | `/ids?ids=` | JWT | People.View, Member oder People.ViewNames | Mehrere Personen nach kommagetrennten IDs abrufen. Aufrufer mit People.ViewNames ohne People.View erhalten das Basismodell; Personen, die der Veröffentlichung widersprochen haben, werden ausgelassen (außer dem Aufrufer selbst) |
| GET | `/basic?ids=` | JWT | — | Basisdaten (nur Name) für mehrere Personen abrufen |
| GET | `/names?ids=` | JWT | Beliebige Kirchenberechtigung | `[{ id, name: { display, first, last }, photo }]`, sortiert nach Nachname und Vorname, für kommagetrennte IDs, die der Aufrufer bereits hat. So können Rollen ohne People.View (Spenden, Anwesenheit) Personen beschriften. Keine Suche, kein Verzeichnisfilter |
| POST | `/names` | JWT | Beliebige Kirchenberechtigung | Wie `GET /names`. Body: `{ peopleIds }` (oder `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member oder People.ViewNames | Kürzlich hinzugefügte Personen. Aufrufer mit People.ViewNames ohne People.View (auch Mitglieder mit Verzeichniszugriff) erhalten das Basismodell (`id`, `name.display`, `photo`, `membershipStatus`); Personen, die der Veröffentlichung widersprochen haben, werden ausgelassen |
| GET | `/guest-register/options?churchId=` | Öffentlich | — | Checkliste für die QR-Gastanmeldung: liefert `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, jeweils `"off"`, `"optional"` oder `"required"` (aus der öffentlichen Einstellung `guestRegistrationFields` geparst; fehlende oder fehlerhafte Werte fallen auf E-Mail/Telefon optional und den Rest aus). Erfordert `enableQRGuestRegistration`, außer die Anfrage trägt ein passendes Site-/Kirchen-Token; Ratenbegrenzung (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member oder People.ViewNames | Personen nach Name oder E-Mail suchen (bis zu 100, sortiert nach Nachname und Vorname). Aufrufer mit People.ViewNames ohne People.View erhalten bei einer Namenssuche das Basismodell; eine Suche nach `email` liefert `[]` |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmende mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer bei einer Kirche beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen anlegen oder aktualisieren (Stapel) |
| POST | `/search` | JWT | People.View, Member oder People.ViewNames | Personen suchen (POST-Variante). Body: `{ term }` oder `{ email }`; gleiche Regeln für reine Namensansicht wie `GET /search` |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, birthMonth, membershipStatus usw.). Der Body ist ein Array von Bedingungen; ein leerer Body bedeutet keine Bedingungen, jeder andere Nicht-Array-Body liefert 400 |
| POST | `/loadOrCreate` | Öffentlich | — | Eine Person per E-Mail finden oder anlegen. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Öffentlich | — | QR-Gastanmeldung. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 Mitglieder; email/phone/maritalStatus gelten nur für das erste Mitglied). Von der Kirche deaktivierte Felder werden verworfen; fehlende Pflichtfelder oder ungültige Werte liefern 400. Zuerst werden bestehende Personen wiederverwendet: Ein Mitglied passt, wenn genau eine nicht entfernte Person denselben Vornamen (ohne Berücksichtigung der Groß-/Kleinschreibung) und dieselbe E-Mail oder Telefonnummer (Ziffern; privat, geschäftlich oder mobil) hat; ein Mitglied ohne E-Mail oder Telefon passt über den Vornamen innerhalb des zugeordneten Haushalts. Zugeordnete Personen werden nie verändert. Nicht zugeordnete Mitglieder treten dem zugeordneten Haushalt bei oder bilden einen neuen Haushalt (benannt nach dem Nachnamen des ersten Mitglieds) als `membershipStatus: "Visitor"` mit der gemeinsamen `address`. Speichert `comments` als Notiz beim ersten Mitglied, fügt alle der privaten Gruppe `guestRegistrationGroupId` hinzu, falls gesetzt, und zeichnet — wenn `guestRegistrationRecordAttendance` `"true"` ist — die Anwesenheit für die geplanten Gottesdienstzeiten dieser Gruppe auf, deren Check-in-Fenster gerade offen ist. Liefert `{ householdId, people: [{ id, name }] }` und gibt die übermittelten Namen statt der gespeicherten zurück. Dieselben Regeln für Opt-in/Token und Ratenbegrenzung wie beim Optionsaufruf |
| POST | `/household/:householdId` | JWT | People.Edit | Zuordnung der Haushaltsmitglieder aktualisieren |
| POST | `/public/email` | Öffentlich | — | Eine E-Mail an eine Person senden. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Intern | — | E-Mail-Adressen von Personen nach IDs laden (Server-zu-Server, erfordert jwtSecret) |
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
| POST | `/loadOrCreate` | JWT | — | Einen Benutzer per E-Mail/userId finden oder anlegen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachname des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mind. 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Den Abmeldestatus einer Person setzen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Eine Einladung an eine Person dieser Kirche per E-Mail senden (`email`, `personName`, `contextName`). Die Schaltfläche lautet **Registrieren** für Personen ohne Konto und **Anmelden** für bestehende Benutzer. Ein Benutzer, der sich noch nie angemeldet hat, erhält stattdessen einen Link **Passwort festlegen**, der nach 7 Tagen abläuft. Eine feste Vorlage, daher zählt sie nicht auf das tägliche E-Mail-Limit der Kirche |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail durchsuchen |
| DELETE | `/` | JWT | — | Das Konto des aktuellen Benutzers löschen |

## Kirchen

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Kirchen des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Kirche nach ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domänenadministrator einer Kirche abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Kirche imitieren (nur Serveradministrator) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Kirchen durchsuchen (Administration) |
| GET | `/search/?name=` | Öffentlich | — | Kirchen nach Name suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Kirche nach Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Kirchendetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Kirche registrieren. Pflichtfelder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Kirchen nach Name suchen (POST-Variante) |
| POST | `/select` | JWT | — | Eine Kirche auswählen/wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Kirche archivieren oder die Archivierung aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Kirchen nach IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Kirchen löschen, die seit mindestens 7 Tagen verlassen wurden |

## Gruppen

Basispfad: `/membership/groups`

Erweitert das Standard-CRUD (GET `/`, GET `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe nach ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen nach Gottesdienstfiltern suchen |
| GET | `/my` | JWT | — | Gruppen des aktuellen Benutzers abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers nach Schlagwort gefiltert abrufen |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Schlagwort abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine öffentliche Gruppe nach Kirche und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Schlagwort abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Label abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Eine öffentliche Gruppe nach Slug abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen anlegen oder aktualisieren (erzeugt den Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Dienstbereichs-Gruppen auch die untergeordneten Teams) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert das Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied nach ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filtern mit `?groupId=`, `?groupIds=` oder `?personId=`. *Ebenso erlaubt, wenn der Benutzer in der Gruppe ist oder die eigene personId abfragt, sowie für `?groupId=` jeder nicht vertraulichen Gruppe, wenn der Benutzer Attendance.View oder Attendance.Edit hat (Mitglieder unter 13 Jahren sind dann enthalten) |
| GET | `/my` | JWT | — | Gruppenmitgliedschaften des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Grundlegende Mitgliederliste einer Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenleitungen abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Öffentliche Mitgliederliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur wenn die Gruppe über `publicRoster` zustimmt; speist das Website-Builder-Element `staffGrid` |
| POST | `/` | JWT | GroupMembers.Edit | Gruppenmitglieder hinzufügen oder aktualisieren |
| DELETE | `/:id` | JWT | GroupMembers.View | Ein Gruppenmitglied entfernen |

## Haushalte

Basispfad: `/membership/households`

Standard-CRUD-Controller.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Haushalte auflisten |
| GET | `/:id` | JWT | — | Haushalt nach ID abrufen |
| POST | `/` | JWT | People.Edit | Haushalte anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | People.Edit | Einen Haushalt löschen |

## Rollen

Basispfad: `/membership/roles`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Rolle nach ID abrufen |
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Kirche abrufen. Jede Rolle enthält `memberCount`, die Anzahl der verschiedenen Benutzer in ihr |
| POST | `/` | JWT | Roles.Edit | Rollen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch ihre Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden die Benutzerdetails mitgeliefert |
| POST | `/` | JWT | Roles.Edit | Mitglieder einer Rolle hinzufügen (legt den Benutzer an, wenn die E-Mail nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Kirche entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (als ID `null` für die Rolle "Alle" verwenden) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

Jeder Eintrag hat `apiName`, `section` (Inhaltstyp), `action` sowie die Bezeichnungen `displaySection` / `displayAction`, die der Rollen-Editor von B1Admin anzeigt. Neue Ergänzungen: `MembershipApi` / `People` / `View Names` (**Nur Namen von Personen anzeigen**, unter Personen und Gruppen) und `GivingApi` / `Donations` / `Enter` (**Spenden erfassen**, unter Spenden; siehe [Spendenstapel](./giving.md#donation-batches)).

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Administratoren sehen alle; Bearbeiter sehen zugewiesene und nicht personenbezogene Formulare) |
| GET | `/:id` | JWT | Formularzugriff | Ein Formular nach ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/group/:groupId` | JWT | Gruppenmitglied, Gruppenleitung oder Forms.Admin | Eigenständige Formulare, die mit der Gruppe verknüpft sind (`forms.groupId`), ohne archivierte, nach Name sortiert. Liefert `id`, `name`, `description` und `open` (innerhalb des Verfügbarkeitszeitraums). Mitglieder erhalten nur offene Formulare; Leitungen und Formularadministratoren erhalten auch geschlossene. Speist die verknüpften Formulare auf der Gruppenseite |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Anmeldung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare anlegen oder aktualisieren. Eigenständige Formulare akzeptieren optional `photoUrl` (Kopfbild über dem Formular) und `groupId` (verknüpfte Gruppe) |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formulareinreichungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Einreichungen auflisten. Filtern mit `?personId=` oder `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Nur eigene Daten: bis zu 50 eigenständige Formulareinreichungen (keine Personenformulare), die der angemeldete Benutzer abgegeben hat oder die mit seiner Person verknüpft sind (`contentType` `person`, `contentId` = seine Personen-ID — etwa nach einer Änderung der Person durch einen Administrator), neueste zuerst, jeweils mit `form.name`. `include` hängt die Fragen jedes Formulars und die Antworten der Einreichung an. Liefert `401`, wenn der Benutzer mit keiner Person verknüpft ist. Speist den Bereich **Meine Formulare** auf der Seite Ich von B1 |
| GET | `/group/:groupId` | JWT | Leitung der Gruppe | Antworten für die Leitungen der Gruppe: ein Eintrag pro verknüpftem Formular und pro Gruppenveranstaltung mit Anmeldeformular, jeweils mit `form`, `event` (`id`, `title`, `start`; nur bei Veranstaltungseinträgen), `questions` und `submissions` (mit `answers` und `personName`, `null` bei anonymen Einreichungen) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit oder Ansichtszugriff | Einreichung nach ID abrufen. Mit `?include=form,questions,answers` ergänzen. Leitungen der mit dem Formular verknüpften Gruppe sowie Leitungen der Gruppe, zu der eine Veranstaltungsanmeldung gehört, können sie ebenfalls lesen |
| GET | `/formId/:formId` | JWT | Formularzugriff (Ansicht) | Alle Einreichungen eines Formulars abrufen (mit Formular, Fragen, Antworten). Leitungen der mit dem Formular verknüpften Gruppe haben Ansichtszugriff |
| POST | `/` | JWT | — | Formularantworten einreichen (behandelt eingeschränkte und nicht eingeschränkte Formulare, versendet E-Mail-Benachrichtigungen). Hat das Formular `autoCreatePerson`, wird eine Gastperson über die E-Mail gesucht oder angelegt und die Einreichung verknüpft; hat es außerdem eine `groupId`, wird die Person dieser Gruppe hinzugefügt; sind `followUpSubject`/`followUpBody` gesetzt, wird dem Absender eine vorlagenbasierte Nachfass-E-Mail gesendet. Sofern der Aufrufer das Formular nicht verwalten darf, wird `submittedBy` immer auf die Person des angemeldeten Mitglieds gesetzt (bei anonymen Einreichungen leer) |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Einreichung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. Erfordert `?formId=` |
| GET | `/:id` | JWT | Formularzugriff | Eine Frage nach ID abrufen |
| GET | `/unrestricted?formId=` | JWT | — | Fragen eines nicht eingeschränkten Formulars abrufen |
| GET | `/sort/:id/up` | JWT | — | Eine Frage in der Reihenfolge nach oben verschieben |
| GET | `/sort/:id/down` | JWT | — | Eine Frage in der Reihenfolge nach unten verschieben |
| POST | `/` | JWT | Formularzugriff | Fragen anlegen oder aktualisieren (vergibt die Reihenfolge automatisch) |
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
| GET | `/:id` | JWT | Formularzugriff | Eine Mitgliederberechtigung nach ID abrufen |
| GET | `/member/:id` | JWT | Formularzugriff | Alle Formularberechtigungen eines Mitglieds abrufen |
| GET | `/form/:id` | JWT | Formularzugriff | Alle Mitgliederberechtigungen eines Formulars abrufen |
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
| GET | `/:id` | JWT | — | Domain nach ID abrufen |
| GET | `/lookup/:domainName` | JWT | — | Eine Domain nach Name nachschlagen |
| GET | `/public/lookup/:domainName` | Öffentlich | — | Öffentliche Domain-Suche nach Name |
| GET | `/health/check` | Öffentlich | — | Gesundheitsprüfung für nicht geprüfte Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains anlegen oder aktualisieren (löst ein Caddy-Update aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domain löschen |

## Benutzer-Kirche

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Kirchen.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Kirchen-Datensatz nach Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Kirchen eines Benutzers laden |
| POST | `/` | JWT | — | Eine Benutzer-Kirchen-Zuordnung anlegen |
| PATCH | `/:userId` | JWT | — | Letzte Zugriffszeit aktualisieren und den Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Benutzer-Kirchen-Datensatz löschen |

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

- [Authentifizierung & Berechtigungen](./authentication) — Anmeldeablauf, JWT, OAuth, Berechtigungsmodell
- [Anwesenheits-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Muster der Code-Organisation
