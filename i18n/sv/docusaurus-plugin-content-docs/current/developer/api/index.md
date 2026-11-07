---
title: "API"
description: "Förklarar ChurchApps API:ets modulära monolitdesign, dess sex datamoduler, teknikstack, portar och Lambda-funktioner, med länkar till installations-, databas-, autentiserings- och endpoint-dokumentation för utvecklare."
---

# API

<div class="article-intro">

ChurchApps API är en **modulär monolit** -- en enda kodbas som betjänar sex datamoduler, där varje modul har sin egen databas. Den här arkitekturen ger dig de organisatoriska fördelarna med mikrotjänster (tydliga gränser, oberoende datalager) och den driftmässiga enkelheten i en enda distribution.

</div>

## Moduler

| Modul | Syfte |
|--------|---------|
| **Medlemskap** | Personer, grupper, hushåll, behörigheter |
| **Närvaro** | Gudstjänster, sessioner, incheckningsposter |
| **Innehåll** | Sidor, sektioner, element, strömning |
| **Gåvor** | Donationer, fonder, betalningshantering |
| **Meddelanden** | Konversationer, aviseringar, e-post |
| **Uppgifter** | Uppgifter, planer, tilldelningar |

## Teknikstack

- **Körmiljö:** Node.js 24.x med TypeScript (ES-moduler)
- **Ramverk:** Express
- **Beroendeinjektion:** Inversify (decoratorbaserad routing)
- **Databas:** MySQL -- en databas per modul, var och en med sin egen anslutningspool
- **Autentisering:** JWT-baserad autentisering via `CustomAuthProvider`
- **Distribution:** AWS Lambda via Serverless Framework v3

## Portar

| Protokoll | Port | Beskrivning |
|----------|------|-------------|
| HTTP | `8084` | Huvudsakligt REST-API |
| WebSocket | `8087` | Anslutningar för realtidskommunikation via socket |

## Lambda-funktioner

När API:et distribueras till AWS körs det som sex Lambda-funktioner:

- **`web`** -- Hanterar alla HTTP-förfrågningar
- **`socket`** -- Hanterar WebSocket-anslutningar
- **`timer15Min`** -- Körs var 30:e minut för e-postaviseringar (namnet är historiskt betingat)
- **`timerMidnight`** -- Körs dagligen för sammanfattningsmejl och underhållsuppgifter
- **`timerScheduledTasks`** -- Körs dagligen för förfallna automatiseringar och bearbetning av försenade arbetsflöden
- **`timerWebhooks`** -- Körs varje minut för att leverera köade utgående webhooks

## Delade bibliotek

API:et är beroende av två delade ChurchApps-paket:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Grundläggande verktyg (DateHelper, ApiHelper m.fl.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Verktyg för Express-servern, inklusive autentisering, databashjälpare och AWS-integrationer

:::info
API:et använder ES-moduler (`"type": "module"` i `package.json`). Se till att dina importer använder ES-modulsyntax.
:::

## I det här avsnittet

- **[Lokal installation](./local-setup.md)** -- Klona, konfigurera och kör API:et lokalt
- **[Databas](./database.md)** -- Arkitektur med en databas per modul, schemaskript och mönster för dataåtkomst
- **[Modulstruktur](./module-structure.md)** -- Controllers, repositories, modeller och autentisering
- **[API-nycklar](./api-keys.md)** -- Personliga åtkomsttokens för skript och kopplingar
- **[Anslutna appar (OAuth)](./connected-apps.md)** -- Flöde för OAuth med flera klienter för appar från tredje part
- **[Webhooks](./webhooks.md)** -- Skicka händelseaviseringar till externa system
- **[MCP-server](./mcp.md)** -- Model Context Protocol-slutpunkt som exponerar API:et för AI-assistenter
- **[Slutpunktsreferens](./endpoints/index.md)** -- Fullständig REST API-dokumentation för alla moduler
