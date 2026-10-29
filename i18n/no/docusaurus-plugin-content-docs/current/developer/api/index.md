---
title: "API"
---

# API

<div class="article-intro">

ChurchApps-API-et er en **modulær monolitt** — en enkelt kodebase som betjener seks datamoduler, der hver har sin egen database. Denne arkitekturen gir de organisatoriske fordelene ved mikrotjenester (tydelige grenser, uavhengige datalagre) med den operasjonelle enkelheten til én enkelt utrulling.

</div>

## Moduler

| Modul | Formål |
|--------|---------|
| **Membership** | Personer, grupper, husstander, tillatelser |
| **Attendance** | Gudstjenester, økter, innsjekkingsposter |
| **Content** | Sider, seksjoner, elementer, direktesending |
| **Giving** | Gaver, fond, betalingsbehandling |
| **Messaging** | Samtaler, varsler, e-post |
| **Doing** | Oppgaver, planer, tildelinger |

## Teknologistakk

- **Kjøretid:** Node.js 24.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Dependency injection:** Inversify (dekoratorbasert ruting)
- **Database:** MySQL — én database per modul, hver med sin egen tilkoblingspool
- **Autentisering:** JWT-basert autentisering via `CustomAuthProvider`
- **Utrulling:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|----------|------|-------------|
| HTTP | `8084` | Hoved-REST-API |
| WebSocket | `8087` | Sanntids socket-tilkoblinger |

## Lambda-funksjoner

Når API-et rulles ut til AWS, kjører det som seks Lambda-funksjoner:

- **`web`** — håndterer alle HTTP-forespørsler
- **`socket`** — administrerer WebSocket-tilkoblinger
- **`timer15Min`** — kjører hvert 30. minutt for e-postvarsler (navnet er historisk)
- **`timerMidnight`** — kjører daglig for sammendragsmeldinger og vedlikeholdsoppgaver
- **`timerScheduledTasks`** — kjører daglig for forfalte automatiseringer og forfalte arbeidsflytprosesser
- **`timerWebhooks`** — kjører hvert minutt for å levere køede utgående webhooks

## Delte biblioteker

API-et er avhengig av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** — grunnleggende verktøy (DateHelper, ApiHelper osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** — Express-serververktøy inkludert autentisering, databasehjelpere og AWS-integrasjoner

:::info
API-et bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importene dine bruker ES-modulsyntaksen.
:::

## I denne seksjonen

- **[Lokalt oppsett](./local-setup)** — klon, konfigurer og kjør API-et lokalt
- **[Database](./database)** — arkitektur med database per modul, skjemaskript og datatilgangsmønstre
- **[Modulstruktur](./module-structure)** — kontrollere, repositorier, modeller og autentisering
- **[API-nøkler](./api-keys)** — personlige tilgangstokener for skript og koblinger
- **[Tilkoblede apper (OAuth)](./connected-apps)** — flerleietaker OAuth-flyt for tredjepartsapper
- **[Webhooks](./webhooks)** — send hendelsesvarsler til eksterne systemer
- **[MCP-server](./mcp)** — Model Context Protocol-endepunkt som eksponerer API-et for KI-assistenter
- **[Endepunktreferanse](./endpoints/)** — fullstendig REST-API-dokumentasjon for alle moduler
