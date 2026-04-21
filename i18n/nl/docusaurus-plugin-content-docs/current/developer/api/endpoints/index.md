---
title: "Endpoint Reference"
---

# Endpoint Reference

<div class="article-intro">

Deze sectie documenteert alle REST-eindpunten die door de ChurchApps API zijn blootgesteld. Elke modulepagina geeft alle routes op met de HTTP-methode, pad, verificatievereisten en vereiste machtigingen.

</div>

## Base URL

| Environment | URL |
|-------------|-----|
| Local development | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Verzoekconventies

- **Content-Type:** Alle aanvraag- en antwoordlichamen gebruiken `application/json`
- **Multi-tenant:** Elk geverifieerd verzoek is afgestemd op een `churchId` die uit het JWT-token is geëxtraheerd — u geeft `churchId` niet door in de URL
- **Batch saves:** De meeste `POST`-eindpunten accepteren een **array van objecten**. De API voegt nieuwe records in (zonder `id`-veld) en werkt bestaande bij (met `id`-veld) in één aanroep
- **IDs:** Alle entiteit-ID's zijn UUID's

### Voorbeeld: Batch Save

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Het eerste object wordt aangemaakt (nieuw); het tweede wordt bijgewerkt (heeft `id`).

## Antwoordindeling

Succesvolle antwoorden geven JSON terug — ofwel een enkel object ofwel een array. Foutantwoorden gebruiken standaard HTTP-statuscodes:

| Code | Betekenis |
|------|---------|
| `200` | Succes |
| `400` | Slechte aanvraag (validatiefouten) |
| `401` | Niet geverifieerd (ontbrekend/ongeldig token of onvoldoende machtigingen) |
| `404` | Niet gevonden |
| `500` | Serverfout |

Validatiefouten geven het volgende terug:

```json
{
  "errors": [
    { "msg": "voer een geldig e-mailadres in", "param": "email", "location": "body" }
  ]
}
```

## Hoe Eindpunttabellen Lezen

Elke modulepagina organiseert eindpunten per controller. De tabellen gebruiken deze kolommen:

| Column | Beschrijving |
|--------|-------------|
| **Method** | HTTP-methode (`GET`, `POST`, `DELETE`) |
| **Path** | Routepad ten opzichte van het basispad van de controller |
| **Auth** | **JWT** = vereist Bearer-token, **Public** = geen verificatie vereist |
| **Permission** | Vereiste machtiging (bijv. `People.Edit`). `—` betekent elke geverifieerde gebruiker |
| **Description** | Wat het eindpunt doet |

Controllers die de standaard CRUD-basisklasse uitbreiden, bieden vier eindpunten automatisch: `GET /` (alles weergeven), `GET /:id` (op ID ophalen), `POST /` (maken/bijwerken) en `DELETE /:id` (verwijderen).

## Reporting Module

De Reporting module werkt anders dan de andere modules. In plaats van databasegestuurde CRUD laadt het rapportdefinities van JSON-bestanden op schijf en voert geparameteriseerde SQL-query's uit.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Een rapportdefinitie op sluetelnaam laden |
| GET | `/reporting/reports/:keyName/run` | JWT | Een rapport uitvoeren en resultaten retourneren |

Rapportparameters worden als querystring-waarden doorgegeven (bijv. `?startDate=2024-01-01&endDate=2024-12-31`). De `churchId`-parameter wordt automatisch uit het JWT-token geïnjecteerd. Elke rapportdefinitie kan zijn eigen machtighingsvereisten opgeven.

## Module Index

| Module | Base Path | Description |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Login, registratie, JWT-tokens, OAuth, machtigingen |
| [Membership](./membership) | `/membership/*` | Personen, kerken, groepen, huishoudens, rollen, formulieren, instellingen |
| [Attendance](./attendance) | `/attendance/*` | Campussen, diensten, sessies, bezoeken, check-in-records |
| [Content](./content) | `/content/*` | Pagina's, preken, evenementen, bestanden, galerijen, Bijbel, streaming |
| [Giving](./giving) | `/giving/*` | Donaties, fondsen, betalingsgateways, abonnementen |
| [Messaging](./messaging) | `/messaging/*` | Gesprekken, meldingen, apparaten, SMS |
| [Doing](./doing) | `/doing/*` | Plannen, taken, toewijzingen, automatiseringen, planning |
