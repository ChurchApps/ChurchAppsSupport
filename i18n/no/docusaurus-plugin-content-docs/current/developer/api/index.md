---
title: "API"
---

# API

<div class="article-intro">

ChurchApps-API-et er en **modulær monolitt** -- en enkelt kodebase som betjener seks datamoduler, hver med sin egen database. Denne arkitekturen gir deg de organisatoriske fordelene til mikrotjenester (klare grenser, uavhengige datalagre) med den operasjonelle enkelheten til en enkelt distribusjon.

</div>

## Moduler

| Modul | Formål |
|--------|---------|
| **Membership** | Personer, grupper, husholdninger, tillatelser |
| **Attendance** | Gudstjenester, økter, innsjekkingsregistreringer |
| **Content** | Sider, seksjoner, elementer, strømming |
| **Giving** | Donasjoner, fond, betalingsbehandling |
| **Messaging** | Samtaler, varsler, e-post |
| **Doing** | Oppgaver, planer, tildelinger |

## Teknologistack

- **Kjøretid:** Node.js 22.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Dependency Injection:** Inversify (dekoratørbasert ruting)
- **Database:** MySQL -- én database per modul, hver med sin egen tilkoblingspool
- **Autentisering:** JWT-basert autentisering via `CustomAuthProvider`
- **Distribusjon:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|----------|------|-------------|
| HTTP | `8084` | Hoved-REST-API |
| WebSocket | `8087` | Sanntids socket-tilkoblinger |

## Lambda-funksjoner

Når API-et distribueres til AWS, kjører det som seks Lambda-funksjoner:

- **`web`** -- Håndterer alle HTTP-forespørsler
- **`socket`** -- Administrerer WebSocket-tilkoblinger
- **`timer15Min`** -- Kjører hvert 30. minutt for e-postvarsler (navnet er historisk)
- **`timerMidnight`** -- Kjører daglig for sammendrags-e-poster og vedlikeholdsoppgaver
- **`timerScheduledTasks`** -- Kjører daglig for forfalte automatiseringer og behandling av forsinkede arbeidsflyter
- **`timerWebhooks`** -- Kjører hvert minutt for å levere utgående webhooks i kø

## Delte biblioteker

API-et er avhengig av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grunnleggende verktøy (DateHelper, ApiHelper, osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serververktøy inkludert autentisering, databasehjelpere og AWS-integrasjoner

:::info
API-et bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importene dine bruker ES-modulsyntaks.
:::

## I denne seksjonen

- **[Lokalt oppsett](./local-setup)** -- Klon, konfigurer og kjør API-et lokalt
- **[Database](./database)** -- Database-per-modul-arkitektur, skjemaskript og datatilgangsmønstre
- **[Modulstruktur](./module-structure)** -- Kontrollere, repositorier, modeller og autentisering
- **[API-nøkler](./api-keys)** -- Personlige tilgangstokener for skript og koblinger
- **[Tilkoblede apper (OAuth)](./connected-apps)** -- Flerleietaker-OAuth-flyt for tredjepartsapper
- **[Webhooks](./webhooks)** -- Push varselhendelser til eksterne systemer
- **[MCP-server](./mcp)** -- Model Context Protocol-endepunkt som eksponerer API-et for AI-assistenter
- **[Endepunktreferanse](./endpoints/)** -- Fullstendig REST-API-dokumentasjon for alle moduler
