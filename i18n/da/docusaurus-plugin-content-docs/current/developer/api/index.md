---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API er en **modulariseret monolith** -- en enkelt kodebase, der serverer seks tilsvarende moduler, hver med sin egen database. Denne arkitektur giver dig organisationsfordelene ved mikroservices (klare grænser, uafhængige datamagasiner) med den operationelle enkelthed for en enkelt installation.

</div>

## Moduler

| Module | Formål |
|--------|---------|
| **Membership** | Mennesker, grupper, husstande, tilladelser |
| **Attendance** | Tjenester, sessioner, check-in-poster |
| **Content** | Sider, afsnit, elementer, streaming |
| **Giving** | Donationer, fonde, betalingsbehandling |
| **Messaging** | Samtaler, meddelelser, e-mail |
| **Doing** | Opgaver, planer, opgaver |

## Tech Stack

- **Runtime:** Node.js 22.x med TypeScript (ES-moduler)
- **Framework:** Express
- **Dependency Injection:** Inversify (dekorator-baseret routing)
- **Database:** MySQL -- en database pr. modul, hver med sin egen forbindelsespulje
- **Auth:** JWT-baseret godkendelse via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Porte

| Protokol | Port | Beskrivelse |
|----------|------|-------------|
| HTTP | `8084` | Hoved REST API |
| WebSocket | `8087` | Realtids-socket forbindelser |

## Lambda-funktioner

Når der implementeres på AWS, kører API'en som fire Lambda-funktioner:

- **`web`** -- Håndterer alle HTTP-anmodninger
- **`socket`** -- Administrerer WebSocket-forbindelser
- **`timer15Min`** -- Kører hver 15. minut til e-mail-meddelelser
- **`timerMidnight`** -- Kører dagligt til sammendrag af e-mail og vedligeholdelsesopgaver

## Delte biblioteker

API'en afhænger af to delte ChurchApps-pakker:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grundlæggende værktøjer (DateHelper, ApiHelper osv.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-serverværktøjer inkluderet godkendelse, databasehjælpere og AWS-integrationer

:::info
API'en bruger ES-moduler (`"type": "module"` i `package.json`). Sørg for, at dine importer bruger ES-modulsyntaks.
:::

## I dette afsnit

- **[Lokalt Setup](./local-setup)** -- Klon, konfigurér og kør API'en lokalt
- **[Database](./database)** -- Database-per-modul arkitektur, skemascripter og dataadgangsmønstre
- **[Modulstruktur](./module-structure)** -- Controllere, repositories, modeller og godkendelse
- **[Endpoint-reference](./endpoints/)** -- Komplette REST API-dokumentation for alle moduler
