---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API er en **modulær monolitt** -- en enkelt kodebase som betjener seks distinkte moduler, hver med sin egen database. Denne arkitekturen gir deg de organisatoriske fordelene ved mikrotjenester (klare grenser, uavhengige datalager) med den operasjonelle enkelheten til en enkelt distribusjon.

</div>

## Moduler

| Modul | Formål |
|-------|--------|
| **Membership** | Personer, grupper, husstander, tillatelser |
| **Attendance** | Gudstjenester, økter, innsjekking |
| **Content** | Sider, seksjoner, elementer, strømming |
| **Giving** | Gaver, fond, betalingsbehandling |
| **Messaging** | Samtaler, varsler, e-post |
| **Doing** | Oppgaver, planer, tildelinger |

## Teknologistabel

- **Kjøretid:** Node.js 22.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Avhengighetsinjeksjon:** Inversify (dekoratørbasert ruting)
- **Database:** MySQL -- én database per modul, hver med sin egen tilkoblingspool
- **Autentisering:** JWT-basert autentisering via `CustomAuthProvider`
- **Distribusjon:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|-----------|------|-------------|
| HTTP | `8084` | Hoved-REST-API |
| WebSocket | `8087` | Sanntids socket-tilkoblinger |

## Lambda-funksjoner

Når API-et distribueres til AWS, kjører det som fire Lambda-funksjoner:

- **`web`** -- Håndterer alle HTTP-forespørsler
- **`socket`** -- Administrerer WebSocket-tilkoblinger
- **`timer15Min`** -- Kjøres hvert 15. minutt for e-postvarsler
- **`timerMidnight`** -- Kjøres daglig for oppsummeringse-poster og vedlikeholdsoppgaver

## Delte biblioteker

API-et avhenger av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Basisverktøy (DateHelper, ApiHelper osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serververktøy inkludert autentisering, databasehjelpere og AWS-integrasjoner

:::info
API-et bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importene dine bruker ES-modulsyntaks.
:::

## I denne seksjonen

- **[Lokalt oppsett](./local-setup)** -- Klon, konfigurer og kjør API-et lokalt
- **[Database](./database)** -- Database-per-modul-arkitektur, skjemaskript og datatilgangsmønstre
- **[Modulstruktur](./module-structure)** -- Kontrollere, repositories, modeller og autentisering
- **[Endepunktreferanse](./endpoints/)** -- Komplett REST API-dokumentasjon for alle moduler
