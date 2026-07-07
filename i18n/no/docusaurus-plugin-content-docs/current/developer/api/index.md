---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API er en **modulær monolitt** -- en enkelt kodebasis som betjener seks datamoduler, hver med sin egen database. Denne arkitekturen gir deg organisatoriske fordeler av mikrotjenester (klare grenser, uavhengige datalagre) med operativ enkelhet ved en enkelt distribusjon.

</div>

## Moduler

| Modul | Formål |
|--------|---------|
| **Medlemskap** | Personer, grupper, husstander, tillatelser |
| **Oppmøte** | Tjenester, økter, sjekkinnposter |
| **Innhold** | Sider, seksjoner, elementer, streaming |
| **Giver** | Donasjoner, midler, betalingsbehandling |
| **Meldinger** | Samtaler, varsler, e-post |
| **Gjøremål** | Oppgaver, planer, oppgaver |

## Teknologistabel

- **Runtime:** Node.js 22.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Avhengighetsinjeksjon:** Inversify (dekoratørbasert ruting)
- **Database:** MySQL -- en database per modul, hver med sin egen tilkoblingspulje
- **Auth:** JWT-basert autentisering via `CustomAuthProvider`
- **Distribusjon:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|----------|------|-------------|
| HTTP | `8084` | Hoved-REST API |
| WebSocket | `8087` | Sanntids-socketforbindelser |

## Lambda-funksjoner

Når de distribueres til AWS, kjører API-en som seks Lambda-funksjoner:

- **`web`** -- Håndterer alle HTTP-forespørsler
- **`socket`** -- Administrerer WebSocket-forbindelser
- **`timer15Min`** -- Kjøres hver 30. minutt for e-postvarslinger (navnet er historisk)
- **`timerMidnight`** -- Kjøres daglig for digesteposte og vedlikeholdsoppgaver
- **`timerScheduledTasks`** -- Kjøres daglig for forfallne automatiseringer og overdue arbeidsflytbehandling
- **`timerWebhooks`** -- Kjøres hvert minutt for å levere køede utgående webhooks

## Delte biblioteker

API-en er avhengig av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grunnleggende verktøy (DateHelper, ApiHelper, osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serververktøy inkludert auth, databasehjelpere og AWS-integrasjoner

:::info
API-en bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importene dine bruker ES-modulsyntaksen.
:::

## I denne seksjonen

- **[Lokal oppsett](./local-setup)** -- Klon, konfigurer og kjør API-en lokalt
- **[Database](./database)** -- Database-per-modul-arkitektur, schemaskript og dataaccessmønstre
- **[Modulstruktur](./module-structure)** -- Kontrollere, repositorier, modeller og autentisering
- **[API-nøkler](./api-keys)** -- Personlige tilgangstokens for skript og koblinger
- **[Tilkoblede apper (OAuth)](./connected-apps)** -- Fleirtenants OAuth-flyt for tredjeparts-apper
- **[Webhooks](./webhooks)** -- Skyv hendelsesvarslinger til eksterne systemer
- **[MCP-server](./mcp)** -- Model Context Protocol-endepunkt som eksponerer API-en til AI-assistenter
- **[Sluttendepunkt-referanse](./endpoints/)** -- Komplett REST API-dokumentasjon for alle moduler
