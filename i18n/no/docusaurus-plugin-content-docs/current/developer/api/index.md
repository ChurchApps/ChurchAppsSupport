---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API er en **modulær monolitt** -- en enkelt kodebase som betjener seks datamoduler, der hver har sin egen database. Denne arkitekturen gir de organisatoriske fordelene ved mikrotjenester (tydelige grenser, uavhengige datalagre) med den driftsmessige enkelheten til én enkelt utrulling.

</div>

## Moduler

| Modul | Formål |
|--------|---------|
| **Membership** | Personer, grupper, husstander, tillatelser |
| **Attendance** | Gudstjenester, økter, innsjekkingsregistreringer |
| **Content** | Sider, seksjoner, elementer, direktesending |
| **Giving** | Gaver, fond, betalingsbehandling |
| **Messaging** | Samtaler, varsler, e-post |
| **Doing** | Oppgaver, planer, tildelinger |

## Teknologistakk

- **Kjøretid:** Node.js 24.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Avhengighetsinjeksjon:** Inversify (dekoratorbasert ruting)
- **Database:** MySQL -- én database per modul, hver med sin egen tilkoblingspool
- **Autentisering:** JWT-basert autentisering via `CustomAuthProvider`
- **Utrulling:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|----------|------|-------------|
| HTTP | `8084` | Hoved-REST-API |
| WebSocket | `8087` | Sanntids socket-tilkoblinger |

## Lambda-funksjoner

Når API-et rulles ut til AWS, kjører det som seks Lambda-funksjoner:

- **`web`** -- Håndterer alle HTTP-forespørsler
- **`socket`** -- Administrerer WebSocket-tilkoblinger
- **`timer15Min`** -- Kjører hvert 30. minutt for e-postvarsler (navnet er historisk)
- **`timerMidnight`** -- Kjører daglig for sammendragsepost og vedlikeholdsoppgaver
- **`timerScheduledTasks`** -- Kjører daglig for forfalne automatiseringer og forfalte arbeidsflyter
- **`timerWebhooks`** -- Kjører hvert minutt for å levere køede utgående webhooks

## Delte biblioteker

API-et er avhengig av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grunnleggende verktøy (DateHelper, ApiHelper osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serververktøy inkludert autentisering, databasehjelpere og AWS-integrasjoner

:::info
API-et bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importene dine bruker ES-modulsyntaksen.
:::

## I denne delen

- **[Lokalt oppsett](./local-setup)** -- Klon, konfigurer og kjør API-et lokalt
- **[Database](./database)** -- Database-per-modul-arkitektur, skriptfiler for skjema og datatilgangsmønstre
- **[Modulstruktur](./module-structure)** -- Kontrollere, repositorier, modeller og autentisering
- **[API-nøkler](./api-keys)** -- Personlige tilgangstokener for skript og tilkoblinger
- **[Tilkoblede apper (OAuth)](./connected-apps)** -- Flerleie OAuth-flyt for tredjepartsapper
- **[Webhooks](./webhooks)** -- Send push-varsler om hendelser til eksterne systemer
- **[MCP-server](./mcp)** -- Model Context Protocol-endepunkt som eksponerer API-et for KI-assistenter
- **[Endepunktreferanse](./endpoints/)** -- Fullstendig REST API-dokumentasjon for alle moduler
