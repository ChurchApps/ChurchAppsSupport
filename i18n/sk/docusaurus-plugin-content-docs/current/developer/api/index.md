---
title: "API"
description: "Vysvetľuje modulárny monolitický dizajn API ChurchApps, jeho šesť dátových modulov, technologický zásobník, porty a funkcie Lambda, s odkazmi na nastavenie, databázu, autentifikáciu a dokumentáciu koncových bodov pre vývojárov."
---

# API

<div class="article-intro">

API ChurchApps je **modulárny monolit** -- jedna kódová základňa, ktorá obsluhuje šesť dátových modulov, pričom každý má vlastnú databázu. Táto architektúra prináša organizačné výhody mikroslužieb (jasné hranice, nezávislé dátové úložiská) s prevádzkovou jednoduchosťou jediného nasadenia.

</div>

## Moduly

| Modul | Účel |
|--------|---------|
| **Membership** | Osoby, skupiny, domácnosti, oprávnenia |
| **Attendance** | Služby, relácie, záznamy o prihlásení |
| **Content** | Stránky, sekcie, prvky, streamovanie |
| **Giving** | Dary, fondy, spracovanie platieb |
| **Messaging** | Konverzácie, oznámenia, e-mail |
| **Doing** | Úlohy, plány, priradenia |

## Technologický základ

- **Runtime:** Node.js 24.x s TypeScript (moduly ES)
- **Framework:** Express
- **Injekcia závislostí:** Inversify (smerovanie založené na dekorátoroch)
- **Databáza:** MySQL -- jedna databáza na modul, každá s vlastným poolom pripojení
- **Autentifikácia:** Autentifikácia založená na JWT cez `CustomAuthProvider`
- **Nasadenie:** AWS Lambda pomocou Serverless Framework v3

## Porty

| Protokol | Port | Popis |
|----------|------|-------------|
| HTTP | `8084` | Hlavné REST API |
| WebSocket | `8087` | Pripojenia v reálnom čase cez socket |

## Funkcie Lambda

Keď je API nasadené v AWS, beží ako šesť funkcií Lambda:

- **`web`** -- Spracúva všetky požiadavky HTTP
- **`socket`** -- Spravuje pripojenia WebSocket
- **`timer15Min`** -- Spúšťa sa každých 30 minút na odosielanie e-mailových oznámení (názov je historický)
- **`timerMidnight`** -- Spúšťa sa denne na súhrnné e-maily a úlohy údržby
- **`timerScheduledTasks`** -- Spúšťa sa denne na splatné automatizácie a spracovanie zmeškaných pracovných postupov
- **`timerWebhooks`** -- Spúšťa sa každú minútu na doručovanie čakajúcich odchádzajúcich webhookov

## Zdieľané knižnice

API závisí od dvoch zdieľaných balíkov ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Základné pomocné funkcie (DateHelper, ApiHelper a ďalšie)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Pomocné funkcie servera Express vrátane autentifikácie, pomocných funkcií databázy a integrácií s AWS

:::info
API používa moduly ES (`"type": "module"` v `package.json`). Uistite sa, že vaše importy používajú syntax modulov ES.
:::

## V tejto sekcii

- **[Lokálna inštalácia](./local-setup.md)** -- Klonovanie, konfigurácia a spustenie API lokálne
- **[Databáza](./database.md)** -- Architektúra databázy pre každý modul, skripty schémy a vzory prístupu k údajom
- **[Štruktúra modulu](./module-structure.md)** -- Kontroléry, repozitáre, modely a autentifikácia
- **[Kľúče API](./api-keys.md)** -- Osobné prístupové tokeny pre skripty a konektory
- **[Pripojené aplikácie (OAuth)](./connected-apps.md)** -- Viacnájomcový tok OAuth pre aplikácie tretích strán
- **[Webhooky](./webhooks.md)** -- Odosielanie upozornení o udalostiach externým systémom
- **[Server MCP](./mcp.md)** -- Koncový bod Model Context Protocol, ktorý sprístupňuje API AI asistentom
- **[Referencia koncových bodov](./endpoints/index.md)** -- Úplná dokumentácia REST API pre všetky moduly
