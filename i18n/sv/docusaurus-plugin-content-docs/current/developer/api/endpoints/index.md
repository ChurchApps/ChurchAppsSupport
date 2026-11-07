---
title: "Endpointreferens"
---

# Endpointreferens

<div class="article-intro">

Det här avsnittet dokumenterar alla REST-endpoints som exponeras av ChurchApps API. Varje modulsida listar alla rutter med deras HTTP-metod, sökväg, autentiseringskrav och nödvändiga behörigheter.

</div>

## Bas-URL

| Miljö | URL |
|-------------|-----|
| Lokal utveckling | `http://localhost:8084` |
| Produktion | `https://api.churchapps.org` |

## Konventioner för förfrågningar

- **Content-Type:** Alla förfrågnings- och svarskroppar använder `application/json`
- **Multitenant:** Varje autentiserad förfrågan är avgränsad till ett `churchId` som hämtas från JWT-token – du skickar inte `churchId` i URL:en
- **Batchsparning:** De flesta `POST`-endpoints tar emot en **array av objekt**. API:et skapar nya poster (utan fältet `id`) och uppdaterar befintliga (med fältet `id`) i ett enda anrop
- **ID:n:** Alla entitets-ID:n är UUID:er

### Exempel: batchsparning

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Det första objektet skapas (nytt); det andra uppdateras (har `id`).

## Svarsformat

Lyckade svar returnerar JSON – antingen ett enskilt objekt eller en array. Felsvar använder standardiserade HTTP-statuskoder:

| Kod | Betydelse |
|------|---------|
| `200` | Lyckat |
| `400` | Felaktig förfrågan (valideringsfel) |
| `401` | Obehörig (saknad eller ogiltig token, eller otillräckliga behörigheter) |
| `404` | Hittades inte |
| `500` | Serverfel |

Valideringsfel returnerar:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Så läser du endpoint-tabellerna

Varje modulsida organiserar endpoints efter controller. Tabellerna använder följande kolumner:

| Kolumn | Beskrivning |
|--------|-------------|
| **Method** | HTTP-metod (`GET`, `POST`, `DELETE`) |
| **Path** | Ruttens sökväg relativt controllerns bassökväg |
| **Auth** | **JWT** = kräver Bearer-token, **Public** = ingen autentisering krävs |
| **Permission** | Nödvändig behörighet (t.ex. `People.Edit`). `—` innebär valfri autentiserad användare |
| **Description** | Vad endpointen gör |

Controllers som ärver från standardbasklassen för CRUD tillhandahåller fyra endpoints automatiskt: `GET /` (lista alla), `GET /:id` (hämta med ID), `POST /` (skapa/uppdatera) och `DELETE /:id` (ta bort).

## Rapporteringsmodulen

Rapporteringsmodulen fungerar annorlunda än de andra modulerna. I stället för databasbaserad CRUD läser den in rapportdefinitioner från JSON-filer på disken och kör parametriserade SQL-frågor.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Läs in en rapportdefinition med nyckelnamn |
| GET | `/reporting/reports/:keyName/run` | JWT | Kör en rapport och returnera resultaten |

Rapportparametrar skickas som värden i frågesträngen (t.ex. `?startDate=2024-01-01&endDate=2024-12-31`). Parametern `churchId` läggs till automatiskt från JWT-token. Varje rapportdefinition kan ange sina egna behörighetskrav.

## Modulregister

| Modul | Bassökväg | Beskrivning |
|--------|-----------|-------------|
| [Autentisering](./authentication) | `/membership/users`, `/membership/oauth` | Inloggning, registrering, JWT-token, OAuth, behörigheter |
| [Medlemskap](./membership) | `/membership/*` | Personer, kyrkor, grupper, hushåll, roller, formulär, inställningar |
| [Närvaro](./attendance) | `/attendance/*` | Campus, gudstjänster, sessioner, besök, incheckningsposter |
| [Innehåll](./content) | `/content/*` | Sidor, predikningar, evenemang, filer, gallerier, Bibel, strömning |
| [Gåvor](./giving) | `/giving/*` | Gåvor, fonder, betalningsgateways, prenumerationer |
| [Meddelanden](./messaging) | `/messaging/*` | Konversationer, notiser, enheter, sms |
| [Doing](./doing) | `/doing/*` | Planer, uppgifter, tilldelningar, automatiseringar, schemaläggning |
