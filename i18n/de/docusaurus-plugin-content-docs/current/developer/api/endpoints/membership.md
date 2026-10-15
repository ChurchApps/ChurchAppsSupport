---
title: "Membership-Endpunkte"
---

# Membership-Endpunkte

<div class="article-intro">

Das Modul Membership verwaltet Personen, Gemeinden, Gruppen, Haushalte, Rollen, Berechtigungen, Formulare und Einstellungen. Es ist das größte Modul und stellt die zentrale Identitäts- und Autorisierungsebene für alle anderen Module bereit.

</div>

**Basispfad:** `/membership`

## Personen

Basispfad: `/membership/people`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View oder Member | Alle Personen der Gemeinde auflisten |
| GET | `/:id` | JWT | People.View oder eigener Datensatz | Eine Person anhand der ID abrufen (enthält Formulareinsendungen) |
| GET | `/ids?ids=` | JWT | People.View oder Member | Mehrere Personen anhand kommagetrennter IDs abrufen |
| GET | `/basic?ids=` | JWT | — | Grundinformationen (nur Name) für mehrere Personen abrufen |
| GET | `/names?ids=` | JWT | Beliebige Gemeindeberechtigung | `[{ id, name: { display }, photo }]` für kommagetrennte IDs, auf die der Aufrufer bereits Zugriff hat, damit Rollen ohne People.View (Spenden, Anwesenheit) Personen benennen können. Keine Suche, kein Verzeichnisfilter |
| POST | `/names` | JWT | Beliebige Gemeindeberechtigung | Wie `GET /names`. Body: `{ peopleIds }` (oder `{ ids }`) |
| GET | `/recent` | JWT | People.View oder Member | Kürzlich hinzugefügte Personen |
| GET | `/search?term=&email=` | JWT | People.View oder Member | Personen nach Name oder E-Mail-Adresse suchen |
| GET | `/search/phone?number=` | JWT | People.View oder Member | Nach Telefonnummer suchen |
| GET | `/search/group?groupId=` | JWT | People.View oder Member | Personen einer bestimmten Gruppe abrufen |
| GET | `/household/:householdId` | JWT | — | Alle Personen eines Haushalts abrufen |
| GET | `/attendance` | JWT | People.Edit | Teilnehmende mit Filtern laden (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Zeitleistendaten für Personen und Gruppen laden |
| GET | `/directory/:id` | JWT | — | Person für die Verzeichnisansicht abrufen (berücksichtigt die Sichtbarkeitseinstellungen) |
| GET | `/claim/:churchId` | JWT | — | Einen Personendatensatz für den aktuellen Benutzer in einer Gemeinde beanspruchen |
| POST | `/` | JWT | People.Edit oder EditSelf | Personen (als Bündel) anlegen oder aktualisieren |
| POST | `/search` | JWT | People.View oder Member | Personen suchen (POST-Variante) |
| POST | `/advancedSearch` | JWT | People.View oder Member | Suche mit mehreren Bedingungen (Alter, birthMonth, membershipStatus usw.) |
| POST | `/loadOrCreate` | Öffentlich | — | Eine Person anhand der E-Mail-Adresse finden oder anlegen. Body: `{ churchId, email, firstName, lastName }` |
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

### Beispiel: Eine Person anlegen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Benutzer

Basispfad: `/membership/users`

Informationen zu Endpunkten für Anmeldung, Registrierung und Passwortverwaltung finden Sie unter [Authentifizierung & Berechtigungen](./authentication).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/login` | Öffentlich | — | Anmelden (E-Mail/Passwort, JWT-Erneuerung oder authGuid) |
| POST | `/register` | Öffentlich | — | Einen neuen Benutzer registrieren |
| POST | `/forgot` | Öffentlich | — | E-Mail zum Zurücksetzen des Passworts senden |
| POST | `/setPasswordGuid` | Öffentlich | — | Passwort mithilfe der Auth-GUID aus dem E-Mail-Link setzen |
| POST | `/verifyCredentials` | Öffentlich | — | E-Mail/Passwort prüfen und die zugehörigen Gemeinden zurückgeben |
| POST | `/loadOrCreate` | JWT | — | Einen Benutzer anhand von E-Mail/userId finden oder anlegen |
| POST | `/setDisplayName` | JWT | — | Vor- und Nachnamen des Benutzers aktualisieren |
| POST | `/updateEmail` | JWT | — | E-Mail-Adresse des Benutzers ändern |
| POST | `/updatePassword` | JWT | — | Passwort des Benutzers ändern (mindestens 6 Zeichen) |
| POST | `/updateOptedOut` | JWT | — | Den Abmeldestatus einer Person setzen |
| POST | `/sendInviteEmail` | JWT | People.Edit | Eine Einladung per E-Mail an eine Person dieser Gemeinde senden (`email`, `personName`, `contextName`). Die Schaltfläche lautet **Registrieren** für Personen ohne Konto und **Anmelden** für bestehende Benutzer. Ein Benutzer, der sich noch nie angemeldet hat, erhält stattdessen einen Link **Passwort festlegen**, der nach 7 Tagen abläuft. Zählt zum täglichen E-Mail-Limit der Gemeinde (`429`, wenn es erreicht ist) |
| GET | `/search?term=` | JWT | Server.Admin | Alle Benutzer nach Name/E-Mail-Adresse durchsuchen |
| DELETE | `/` | JWT | — | Das Konto des aktuellen Benutzers löschen |

## Gemeinden

Basispfad: `/membership/churches`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gemeinden des aktuellen Benutzers laden |
| GET | `/:id` | JWT | — | Gemeinde anhand der ID abrufen |
| GET | `/:id/getDomainAdmin` | JWT | — | Den Domain-Administrator einer Gemeinde abrufen |
| GET | `/:id/impersonate` | JWT | Server.Admin | Eine Gemeinde übernehmen (nur Server-Administratoren) |
| GET | `/all?term=` | JWT | Server.Admin | Alle Gemeinden durchsuchen (Administration) |
| GET | `/search/?name=` | Öffentlich | — | Gemeinden nach Name suchen |
| GET | `/lookup/?subDomain=&id=` | Öffentlich | — | Eine Gemeinde anhand der Subdomain oder ID nachschlagen |
| POST | `/` | JWT | Settings.Edit | Gemeindedetails aktualisieren |
| POST | `/add` | JWT | — | Eine neue Gemeinde registrieren. Pflichtfelder: name, address1, city, state, zip, country |
| POST | `/search` | Öffentlich | — | Gemeinden nach Name suchen (POST-Variante) |
| POST | `/select` | JWT | — | Eine Gemeinde auswählen bzw. wechseln. Body: `{ churchId }` oder `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Eine Gemeinde archivieren oder die Archivierung aufheben |
| POST | `/byIds` | Öffentlich | — | Mehrere Gemeinden anhand von IDs laden |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Gemeinden löschen, die seit mindestens 7 Tagen verwaist sind |

## Gruppen

Basispfad: `/membership/groups`

Erweitert das Standard-CRUD (GET `/`, GET `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Alle Gruppen auflisten |
| GET | `/:id` | JWT | — | Gruppe anhand der ID abrufen |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Gruppen anhand von Gottesdienstfiltern suchen |
| GET | `/my` | JWT | — | Gruppen des aktuellen Benutzers abrufen |
| GET | `/my/:tag` | JWT | — | Gruppen des aktuellen Benutzers nach Schlagwort gefiltert abrufen |
| GET | `/tag/:tag` | JWT | — | Alle Gruppen mit einem bestimmten Schlagwort abrufen |
| GET | `/public/:churchId/:id` | Öffentlich | — | Eine öffentliche Gruppe anhand von Gemeinde und ID abrufen |
| GET | `/public/:churchId/tag/:tag` | Öffentlich | — | Öffentliche Gruppen nach Schlagwort abrufen |
| GET | `/public/:churchId/label?label=` | Öffentlich | — | Öffentliche Gruppen nach Bezeichnung abrufen |
| GET | `/public/:churchId/slug/:slug` | Öffentlich | — | Eine öffentliche Gruppe anhand des Slugs abrufen |
| POST | `/` | JWT | Groups.Edit | Gruppen anlegen oder aktualisieren (erzeugt den Slug automatisch) |
| DELETE | `/:id` | JWT | Groups.Edit | Eine Gruppe löschen (löscht bei Dienstbereichsgruppen auch die untergeordneten Teams) |

## Gruppenmitglieder

Basispfad: `/membership/groupmembers`

Erweitert das Standard-CRUD (GET `/:id`, DELETE `/:id` aus der Basisklasse).

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gruppenmitglied anhand der ID abrufen |
| GET | `/` | JWT | GroupMembers.View* | Gruppenmitglieder auflisten. Filter über `?groupId=`, `?groupIds=` oder `?personId=`. *Ebenfalls erlaubt, wenn der Benutzer der Gruppe angehört oder die eigene personId abfragt |
| GET | `/my` | JWT | — | Gruppenmitgliedschaften des aktuellen Benutzers abrufen |
| GET | `/basic/:groupId` | JWT | — | Grundlegende Mitgliederliste einer Gruppe abrufen |
| GET | `/public/leaders/:churchId/:groupId` | Öffentlich | — | Gruppenleitungen abrufen (öffentlich) |
| GET | `/public/:churchId/:groupId` | Öffentlich | — | Die öffentliche Mitgliederliste einer Gruppe abrufen (minimale Felder: `personId`, `displayName`, `leader`, Foto). Nur wenn die Gruppe über `publicRoster` zustimmt; versorgt das Element `staffGrid` des Website-Editors |
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
| GET | `/church/:churchId` | JWT | Roles.View | Alle Rollen einer Gemeinde abrufen |
| POST | `/` | JWT | Roles.Edit | Rollen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rolle löschen (entfernt auch deren Berechtigungen und Mitglieder) |

## Rollenmitglieder

Basispfad: `/membership/rolemembers`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Mitglieder einer Rolle abrufen. Mit `?include=users` werden die Benutzerdetails mitgeliefert |
| POST | `/` | JWT | Roles.Edit | Mitglieder einer Rolle hinzufügen (legt den Benutzer an, falls die E-Mail-Adresse noch nicht existiert) |
| DELETE | `/:id` | JWT | Roles.View | Ein Rollenmitglied entfernen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Sich selbst aus einer Gemeinde entfernen |

## Rollenberechtigungen

Basispfad: `/membership/rolepermissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Berechtigungen einer Rolle abrufen (als ID `null` für die Rolle „Everyone“ verwenden) |
| POST | `/` | JWT | Roles.Edit | Rollenberechtigungen anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Roles.Edit | Eine Rollenberechtigung löschen |

## Berechtigungen

Basispfad: `/membership/permissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Die vollständige Liste der verfügbaren Berechtigungen abrufen |

## Formulare

Basispfad: `/membership/forms`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Alle Formulare auflisten (Administratoren sehen alle; Bearbeitende sehen zugewiesene sowie Formulare ohne Mitgliederbezug) |
| GET | `/:id` | JWT | Formularzugriff | Formular anhand der ID abrufen |
| GET | `/archived` | JWT | Forms.Admin oder Forms.Edit | Archivierte Formulare auflisten |
| GET | `/standalone/:id?churchId=` | JWT | — | Ein eigenständiges Formular abrufen (eingeschränkte Formulare erfordern Authentifizierung) |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Formulare anlegen oder aktualisieren |
| DELETE | `/:id` | JWT | Formularzugriff | Ein Formular löschen |

## Formulareinsendungen

Basispfad: `/membership/formsubmissions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Einsendungen auflisten. Filter über `?personId=` oder `?formId=` |
| GET | `/:id` | JWT | Forms.Admin oder Forms.Edit | Einsendung anhand der ID abrufen. Mit `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Formularzugriff | Alle Einsendungen eines Formulars abrufen (enthält Formular, Fragen und Antworten) |
| POST | `/` | JWT | — | Formularantworten einreichen (verarbeitet eingeschränkte und nicht eingeschränkte Formulare und sendet E-Mail-Benachrichtigungen). Ist für das Formular `autoCreatePerson` gesetzt, wird anhand der E-Mail-Adresse ein Gast gesucht bzw. angelegt und die Einsendung verknüpft. Sind `followUpSubject`/`followUpBody` gesetzt, wird dem Einsender eine vorlagenbasierte Nachfass-E-Mail gesendet |
| DELETE | `/:id` | JWT | Forms.Admin oder Forms.Edit | Eine Einsendung und ihre Antworten löschen |

## Fragen

Basispfad: `/membership/questions`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formularzugriff | Fragen eines Formulars auflisten. Erfordert `?formId=` |
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
| GET | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten auflisten. Filter über `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin oder Forms.Edit | Antworten anlegen oder aktualisieren |

## Mitgliederberechtigungen

Basispfad: `/membership/memberpermissions`

Steuert den Zugriff einzelner Mitglieder auf bestimmte Formulare.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formularzugriff | Eine Mitgliederberechtigung anhand der ID abrufen |
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
| GET | `/` | JWT | Settings.Edit | Alle Einstellungen der Gemeinde abrufen |
| GET | `/public/:churchId` | Öffentlich | — | Öffentliche Einstellungen einer Gemeinde abrufen |
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
| GET | `/health/check` | Öffentlich | — | Health-Check für nicht geprüfte Domains ausführen |
| POST | `/` | JWT | Settings.Edit | Domains anlegen oder aktualisieren (löst eine Aktualisierung von Caddy aus) |
| DELETE | `/:id` | JWT | Settings.Edit | Eine Domain löschen |

## Benutzer-Gemeinde-Zuordnung

Basispfad: `/membership/userchurch`

Verwaltet die Zuordnung zwischen Benutzern und Gemeinden.

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Benutzer-Gemeinde-Datensatz anhand der Benutzer-ID abrufen |
| GET | `/personid/:personId` | JWT | — | E-Mail-Adresse des mit einer Person verknüpften Benutzers abrufen |
| GET | `/user/:userId` | JWT | Server.Admin | Alle Gemeinden eines Benutzers laden |
| POST | `/` | JWT | — | Eine Benutzer-Gemeinde-Zuordnung anlegen |
| PATCH | `/:userId` | JWT | — | Zeitpunkt des letzten Zugriffs aktualisieren und den Zugriff protokollieren |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Einen Benutzer-Gemeinde-Datensatz löschen |

## Sichtbarkeitseinstellungen

Basispfad: `/membership/visibilityPreferences`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Die Sichtbarkeitseinstellungen des aktuellen Benutzers abrufen |
| POST | `/` | JWT | — | Sichtbarkeitseinstellungen speichern (Sichtbarkeit von Anschrift, Telefon und E-Mail) |

## Abfrage

Basispfad: `/membership/query`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Mitgliedersuche in natürlicher Sprache mithilfe von KI. Body: `{ text, subDomain, siteUrl }` |

## Client-Fehler

Basispfad: `/membership/clientErrors`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Einen clientseitigen Fehler protokollieren |

## Verwandte Seiten

- [Authentifizierung & Berechtigungen](./authentication) — Anmeldung, JWT, OAuth, Berechtigungsmodell
- [Attendance-Endpunkte](./attendance) — Erfassung von Gottesdiensten und Besuchen
- [Modulstruktur](../module-structure) — Muster zur Code-Organisation
