---
title: "Endepunktreferanse"
---

# Endepunktreferanse

<div class="article-intro">

Denne seksjonen dokumenterer alle REST-endepunkter som eksponeres av ChurchApps API. Hver modulsside lister opp alle ruter med HTTP-metode, sti, autentiseringskrav og nødvendige tillatelser.

</div>

## Basis-URL

| Miljø | URL |
|-------|-----|
| Lokal utvikling | `http://localhost:8084` |
| Produksjon | `https://api.churchapps.org` |

## Forespørselskonvensjoner

- **Content-Type:** Alle forespørsels- og responslegemer bruker `application/json`
- **Flerleietaker:** Hver autentisert forespørsel er avgrenset til en `churchId` hentet fra JWT-tokenet -- du sender ikke `churchId` i URL-en
- **Masselagring:** De fleste `POST`-endepunkter aksepterer en **liste med objekter**. API-et vil sette inn nye oppføringer (uten `id`-felt) og oppdatere eksisterende (med `id`-felt) i ett enkelt kall
- **ID-er:** Alle enhets-ID-er er UUID-er

### Eksempel: Masselagring

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Det første objektet opprettes (nytt); det andre oppdateres (har `id`).

## Responsformat

Vellykkede responser returnerer JSON -- enten et enkelt objekt eller en liste. Feilresponser bruker standard HTTP-statuskoder:

| Kode | Betydning |
|------|-----------|
| `200` | Suksess |
| `400` | Ugyldig forespørsel (valideringsfeil) |
| `401` | Uautorisert (manglende/ugyldig token eller utilstrekkelige tillatelser) |
| `404` | Ikke funnet |
| `500` | Serverfeil |

Valideringsfeil returnerer:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Hvordan lese endepunkttabeller

Hver modulsside organiserer endepunkter etter kontroller. Tabellene bruker disse kolonnene:

| Kolonne | Beskrivelse |
|---------|-------------|
| **Method** | HTTP-metode (`GET`, `POST`, `DELETE`) |
| **Path** | Rutesti relativ til kontrollerens basissti |
| **Auth** | **JWT** = krever Bearer-token, **Public** = ingen autentisering kreves |
| **Permission** | Nødvendig tillatelse (f.eks. `People.Edit`). `—` betyr enhver autentisert bruker |
| **Description** | Hva endepunktet gjør |

Kontrollere som utvider standard CRUD-baseklassen gir fire endepunkter automatisk: `GET /` (list alle), `GET /:id` (hent etter ID), `POST /` (opprett/oppdater) og `DELETE /:id` (slett).

## Rapportmodul

Rapportmodulen fungerer annerledes enn de andre modulene. I stedet for databasebasert CRUD, laster den rapportdefinisjoner fra JSON-filer på disk og kjører parametriserte SQL-spørringer.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Last en rapportdefinisjon etter nøkkelnavn |
| GET | `/reporting/reports/:keyName/run` | JWT | Kjør en rapport og returner resultater |

Rapportparametere sendes som spørringsstrengverdier (f.eks. `?startDate=2024-01-01&endDate=2024-12-31`). `churchId`-parameteren injiseres automatisk fra JWT-tokenet. Hver rapportdefinisjon kan spesifisere sine egne tillatelseskrav.

## Moduloversikt

| Modul | Basissti | Beskrivelse |
|-------|----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Innlogging, registrering, JWT-tokens, OAuth, tillatelser |
| [Membership](./membership) | `/membership/*` | Personer, kirker, grupper, husstander, roller, skjemaer, innstillinger |
| [Attendance](./attendance) | `/attendance/*` | Campus, gudstjenester, økter, besøk, innsjekkingsregistreringer |
| [Content](./content) | `/content/*` | Sider, prekener, hendelser, filer, gallerier, Bibel, strømming |
| [Giving](./giving) | `/giving/*` | Gaver, fond, betalingsportaler, abonnementer |
| [Messaging](./messaging) | `/messaging/*` | Samtaler, varsler, enheter, SMS |
| [Doing](./doing) | `/doing/*` | Planer, oppgaver, tildelinger, automatiseringer, planlegging |
