---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API er en **modulær monolitt** -- en enkelt kodebase som betjener seks distinkte moduler, hver med sin egen database. Denne arkitekturen gir deg organisasjonsfordelene ved mikrotjenester (klare grenser, uavhengige datalagreinger) med operasjonell enkelthet fra en enkelt distribusjon.

</div>

## Moduler

| Modul | Formål |
|-------|--------|
| **Medlemskap** | Personer, grupper, husstander, tillatelser |
| **Frammøte** | Tjenester, sesjoner, sjekk-inn poster |
| **Innhold** | Sider, seksjoner, elementer, streaming |
| **Gaver** | Donasjoner, fond, betalingsbehandling |
| **Meldinger** | Samtaler, varsler, e-post |
| **Oppgaver** | Oppgaver, planer, oppgaver |

## Teknologistokk

- **Runtime:** Node.js 22.x med TypeScript (ES-moduler)
- **Rammeverk:** Express
- **Avhengighetsinjeksjon:** Inversify (dekorator-basert ruting)
- **Database:** MySQL -- en database per modul, hver med sin egen tilkoblingspulje
- **Auth:** JWT-basert godkjenning via `CustomAuthProvider`
- **Distribusjon:** AWS Lambda via Serverless Framework v3

## Porter

| Protokoll | Port | Beskrivelse |
|-----------|------|-------------|
| HTTP | `8084` | Hoved-REST API |
| WebSocket | `8087` | Sanntids socket-tilkoblinger |

## Lambda-funksjoner

Når det blir distribuert til AWS, kjører API-en som fire Lambda-funksjoner:

- **`web`** -- Håndterer alle HTTP-forespørsler
- **`socket`** -- Administrerer WebSocket-tilkoblinger
- **`timer15Min`** -- Kjøres hver 15. minutt for e-postvarsler
- **`timerMidnight`** -- Kjøres daglig for sammendrag og vedlikeholdsoppgaver

## Delte biblioteker

API-en avhenger av to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grunnleggende verktøy (DateHelper, ApiHelper, osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serververktøy inkludert godkjenning, databasehjelpere og AWS-integrasjoner

:::info
API-en bruker ES-moduler (`"type": "module"` i `package.json`). Sørg for at importer bruker ES-modulsyntaksen.
:::

## I denne seksjonen

- **[Lokalt oppsett](./local-setup)** -- Klone, konfigurer og kjør API-en lokalt
- **[Database](./database)** -- Database-per-modul arkitektur, skjemaskript og dataaccessmønstre
- **[Modulstruktur](./module-structure)** -- Kontrollanter, lagre, modeller og godkjenning
- **[API-nøkler](./api-keys)** -- Personlige tilgangstoken for skript og koblinger
- **[Tilkoblede apper (OAuth)](./connected-apps)** -- Multi-leier OAuth-flyt for tredjepartsapper
- **[Webhooks](./webhooks)** -- Push-hendelsesmeldinger til eksterne systemer
- **[MCP-server](./mcp)** -- Model Context Protocol-endepunkt som eksponerer API-en til AI-assistenter
- **[Sluttpunktreferanse](./endpoints/)** -- Komplett REST API-dokumentasjon for alle moduler
