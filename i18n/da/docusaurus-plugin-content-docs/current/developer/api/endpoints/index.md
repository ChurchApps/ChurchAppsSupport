---
title: "Endpoint-reference"
---

# Endpoint-reference

<div class="article-intro">

Dette afsnit dokumenterer alle REST-endpoints, der vises af ChurchApps API. Hver modulside viser hver rute med dens HTTP-metode, sti, godkendelseskrav og påkrævede tilladelser.

</div>

## Basis-URL

| Miljø | URL |
|-------------|-----|
| Lokal udvikling | `http://localhost:8084` |
| Produktion | `https://api.churchapps.org` |

## Anmodningskonventioner

- **Content-Type:** Alle anmodnings- og svarorganer bruger `application/json`
- **Multi-tenant:** Hver godkendt anmodning er begrænset til en `churchId` hentet fra JWT-tokenet — du sender ikke `churchId` i URL'en
- **Batch-save:** De fleste `POST`-endpoints accepterer et **array af objekter**. API'en indsætter nye poster (uden `id`-felt) og opdaterer eksisterende (med `id`-felt) i et enkelt kald
- **ID'er:** Alle enheds-ID'er er UUID'er

### Eksempel: Batch-gemme

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Det første objekt oprettes (nyt); det andet opdateres (har `id`).

## Svargformat

Vellykkede svar returnerer JSON — enten et enkelt objekt eller et array. Fejlsvar bruger standard HTTP-statuskoder:

| Kode | Betydning |
|------|---------|
| `200` | Succes |
| `400` | Dårlig anmodning (valideringsfejl) |
| `401` | Uautoriseret (manglende/ugyldigt token eller utilstrækkelige tilladelser) |
| `404` | Ikke fundet |
| `500` | Serverfejl |

Valideringsfejl returnerer:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Sådan læses endpoint-tabeller

Hver modulside organiserer endpoints efter controller. Tabellerne bruger disse kolonner:

| Kolonne | Beskrivelse |
|--------|-------------|
| **Method** | HTTP-metode (`GET`, `POST`, `DELETE`) |
| **Path** | Rutesti i forhold til controllerens basesti |
| **Auth** | **JWT** = kræver Bearer-token, **Public** = ingen godkendelse påkrævet |
| **Permission** | Påkrævet tilladelse (f.eks. `People.Edit`). `—` betyder enhver godkendt bruger |
| **Description** | Hvad endpoints gør |

Controllere, der udvider standard CRUD-basisklassen, leverer fire endpoints automatisk: `GET /` (list alle), `GET /:id` (hent efter ID), `POST /` (opret/opdater) og `DELETE /:id` (slet).

## Rapporteringsmodul

Rapporteringsmodulet fungerer anderledes end de andre moduler. I stedet for database-understøttet CRUD indlæser det rapportdefinitioner fra JSON-filer på disk og udfører parametriserede SQL-forespørgsler.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Indlæs en rapportdefinition efter nøglenavn |
| GET | `/reporting/reports/:keyName/run` | JWT | Udfør en rapport og returner resultater |

Rapportparameters sendes som query string-værdier (f.eks. `?startDate=2024-01-01&endDate=2024-12-31`). Parameteren `churchId` injiceres automatisk fra JWT-tokenet. Hver rapportdefinition kan angive sine egne tilladelseskrav.

## Modulindeks

| Module | Base Path | Description |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Login, registrering, JWT-tokens, OAuth, tilladelser |
| [Membership](./membership) | `/membership/*` | Mennesker, kirker, grupper, husstande, roller, formularer, indstillinger |
| [Attendance](./attendance) | `/attendance/*` | Campus, tjenester, sessioner, besøg, check-in-poster |
| [Content](./content) | `/content/*` | Sider, prædikener, begivenheder, filer, gallerier, Bibel, streaming |
| [Giving](./giving) | `/giving/*` | Donationer, fonde, betalings-gateways, abonnementer |
| [Messaging](./messaging) | `/messaging/*` | Samtaler, notifikationer, enheder, SMS |
| [Doing](./doing) | `/doing/*` | Planer, opgaver, opgaver, automatisering, planlægning |
