---
title: "API"
---

# API

<div class="article-intro">

API ChurchApps je **modulární monolit** -- jediná kódová základna, která obsluhuje šest datových modulů, z nichž každý má vlastní databázi. Tato architektura vám přináší organizační výhody mikroslužeb (jasné hranice, nezávislá datová úložiště) spolu s provozní jednoduchostí jediného nasazení.

</div>

## Moduly

| Modul | Účel |
|--------|---------|
| **Členství** | Osoby, skupiny, domácnosti, oprávnění |
| **Docházka** | Bohoslužby, relace, záznamy o příchodu |
| **Obsah** | Stránky, sekce, prvky, streamování |
| **Dary** | Dary, fondy, zpracování plateb |
| **Zprávy** | Konverzace, oznámení, e-mail |
| **Úkoly** | Úkoly, plány, přiřazení |

## Technologie

- **Běhové prostředí:** Node.js 24.x s TypeScriptem (ES moduly)
- **Framework:** Express
- **Injekce závislostí:** Inversify (směrování založené na dekorátorech)
- **Databáze:** MySQL -- jedna databáze na modul, každá s vlastním poolem připojení
- **Autentizace:** ověřování pomocí JWT prostřednictvím `CustomAuthProvider`
- **Nasazení:** AWS Lambda prostřednictvím Serverless Framework v3

## Porty

| Protokol | Port | Popis |
|----------|------|-------------|
| HTTP | `8084` | Hlavní REST API |
| WebSocket | `8087` | Spojení socketů v reálném čase |

## Funkce Lambda

Po nasazení do AWS běží API jako šest funkcí Lambda:

- **`web`** -- vyřizuje všechny HTTP požadavky
- **`socket`** -- spravuje spojení WebSocket
- **`timer15Min`** -- běží každých 30 minut a odesílá e-mailová oznámení (název je historický)
- **`timerMidnight`** -- běží denně a odesílá souhrnné e-maily a provádí údržbové úlohy
- **`timerScheduledTasks`** -- běží denně a zpracovává splatné automatizace a opožděné pracovní postupy
- **`timerWebhooks`** -- běží každou minutu a odesílá čekající odchozí webhooky

## Sdílené knihovny

API závisí na dvou sdílených balíčcích ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- základní nástroje (DateHelper, ApiHelper atd.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- pomocné nástroje pro server Express, včetně autentizace, databázových pomocných funkcí a integrací AWS

:::info
API používá ES moduly (`"type": "module"` v `package.json`). Ujistěte se, že vaše importy používají syntaxi ES modulů.
:::

## V této sekci

- **[Místní nastavení](./local-setup)** -- naklonujte, nakonfigurujte a spusťte API lokálně
- **[Databáze](./database)** -- architektura databáze pro jednotlivé moduly, schémata a vzory přístupu k datům
- **[Struktura modulu](./module-structure)** -- kontrolery, repozitáře, modely a autentizace
- **[Klíče API](./api-keys)** -- osobní přístupové tokeny pro skripty a konektory
- **[Propojené aplikace (OAuth)](./connected-apps)** -- vícenájemcový tok OAuth pro aplikace třetích stran
- **[Webhooky](./webhooks)** -- odesílání oznámení o událostech externím systémům
- **[Server MCP](./mcp)** -- koncový bod Model Context Protocol, který zpřístupňuje API asistentům AI
- **[Referenční příručka koncových bodů](./endpoints/)** -- kompletní dokumentace REST API pro všechny moduly
