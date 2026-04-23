---
title: "Endpoint-Referenz"
---

# Endpoint-Referenz

<div class="article-intro">

Dieser Abschnitt dokumentiert alle REST-Endpoints, die von der ChurchApps API bereitgestellt werden. Jede Modulseite listet jede Route mit ihrer HTTP-Methode, ihrem Pfad, Authentifizierungsanforderungen und erforderlichen Berechtigungen auf.

</div>

## Basis-URL

| Umgebung | URL |
|-------------|-----|
| Lokale Entwicklung | `http://localhost:8084` |
| Produktion | `https://api.churchapps.org` |

## Anfrage-Konventionen

- **Content-Type:** Alle Request- und Response-Bodies verwenden `application/json`
- **Multi-Tenant:** Jede authentifizierte Anfrage wird auf einen `churchId` begrenzt, der aus dem JWT-Token extrahiert wird — Sie übergeben nicht `churchId` in der URL
- **Batch-Speichern:** Die meisten `POST`-Endpoints akzeptieren ein **Array von Objekten**. Die API wird neue Datensätze einfügen (kein `id`-Feld) und vorhandene aktualisieren (mit `id`-Feld) in einem einzigen Aufruf
- **IDs:** Alle Entity-IDs sind UUIDs

### Beispiel: Batch-Speichern

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Das erste Objekt wird erstellt (neu); das zweite wird aktualisiert (hat `id`).

## Antwortformat

Erfolgreiche Antworten geben JSON zurück — entweder ein einzelnes Objekt oder ein Array. Fehlerantworten verwenden Standard-HTTP-Status-Codes:

| Code | Bedeutung |
|------|---------|
| `200` | Erfolg |
| `400` | Ungültige Anfrage (Validierungsfehler) |
| `401` | Nicht autorisiert (fehlender/ungültiger Token oder unzureichende Berechtigungen) |
| `404` | Nicht gefunden |
| `500` | Serverfehler |

Validierungsfehler geben:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Wie man Endpoint-Tabellen liest

Jede Modulseite organisiert Endpoints nach Controller. Die Tabellen verwenden diese Spalten:

| Spalte | Beschreibung |
|--------|-------------|
| **Methode** | HTTP-Methode (`GET`, `POST`, `DELETE`) |
| **Pfad** | Route relativ zum Basis-Pfad des Controllers |
| **Auth** | **JWT** = Bearer-Token erforderlich, **Öffentlich** = keine Auth erforderlich |
| **Berechtigung** | Erforderliche Berechtigung (z.B. `People.Edit`). `—` bedeutet jeden authentifizierten Benutzer |
| **Beschreibung** | Was der Endpoint tut |

Controller, die die Standard-CRUD-Basisklasse erweitern, bieten vier Endpoints automatisch: `GET /` (alle auflisten), `GET /:id` (nach ID abrufen), `POST /` (erstellen/aktualisieren) und `DELETE /:id` (löschen).

## Reporting-Modul

Das Reporting-Modul funktioniert anders als die anderen Module. Statt datenbankgestütztem CRUD lädt es Berichtsdefinitionen von JSON-Dateien auf der Festplatte und führt parametrisierte SQL-Queries aus.

| Methode | Pfad | Auth | Beschreibung |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Berichtsdefinition nach Schlüsselnamen laden |
| GET | `/reporting/reports/:keyName/run` | JWT | Bericht ausführen und Ergebnisse zurückgeben |

Berichtsparameter werden als Query-String-Werte übergeben (z.B. `?startDate=2024-01-01&endDate=2024-12-31`). Der Parameter `churchId` wird automatisch aus dem JWT-Token injiziert. Jede Berichtsdefinition kann ihre eigenen Berechtigungsanforderungen angeben.

## Modul-Index

| Modul | Basispfad | Beschreibung |
|--------|-----------|-------------|
| [Authentifizierung](./authentication) | `/membership/users`, `/membership/oauth` | Login, Registrierung, JWT-Tokens, OAuth, Berechtigungen |
| [Membership](./membership) | `/membership/*` | Personen, Kirchen, Gruppen, Haushalte, Rollen, Formulare, Einstellungen |
| [Attendance](./attendance) | `/attendance/*` | Campus, Services, Sessions, Besuche, Check-in-Datensätze |
| [Content](./content) | `/content/*` | Seiten, Predigten, Veranstaltungen, Dateien, Galerien, Bibel, Streaming |
| [Giving](./giving) | `/giving/*` | Spenden, Fonds, Payment-Gateways, Abos |
| [Messaging](./messaging) | `/messaging/*` | Unterhaltungen, Benachrichtigungen, Geräte, SMS |
| [Doing](./doing) | `/doing/*` | Pläne, Aufgaben, Zuweisungen, Automatisierungen, Planung |
