---
title: "Dokumentácia pre vývojárov"
description: "Vývojárska dokumentácia ChurchApps: lokálne nastavenie, API, webové aplikácie, zdieľané knižnice, mobilné zostavenia a nasadenie open-source projektov."
---

# Dokumentácia pre vývojárov

<div class="article-intro">

ChurchApps je zbierka približne 20 projektov s otvoreným zdrojovým kódom, ktoré spolu poskytujú kompletnú platformu na správu cirkvi. Projekty zahŕňajú backendové API, webové aplikácie, mobilné aplikácie, desktopovú aplikáciu a zdieľané knižnice -- všetko napísané v TypeScripte. Táto sekcia obsahuje všetko, čo potrebujete na nastavenie lokálneho vývojového prostredia a na začatie prispievania.

</div>

## Architektúra na prvý pohľad

Projekty sú **nezávislé repozitáre** (nie monorepo). Zdieľaný kód sa publikuje na npm pod rozsahom `@churchapps/*` a používa sa ako bežné závislosti. To znamená, že môžete pracovať na jednom projekte bez klonovania celého ekosystému.

Kľúčové vlastnosti:

- **Jazyk:** TypeScript v celom projekte
- **Backend:** API na Node.js / Express nasadené na AWS Lambda pomocou Serverless Framework
- **Web:** React 19 (Vite a Next.js), Material-UI 7
- **Mobil:** React Native s Expo
- **Databáza:** MySQL 8.0, jedna databáza pre každý modul API

## Čo táto sekcia obsahuje

- **[Setup](./setup/index.md)** -- Lokálne vývojové prostredie, predpoklady a konfigurácia
  - [Prerequisites](./setup/prerequisites.md) -- Požadované nástroje a softvér
  - [Project Overview](./setup/project-overview.md) -- Prehľad všetkých projektov
  - [Environment Variables](./setup/environment-variables.md) -- Konfigurácia súborov `.env`
- **[API](./api/index.md)** -- Lokálne nastavenie hlavného API, inicializácia databázy a štruktúra modulov
- **[Web Apps](./web-apps/index.md)** -- Spustenie B1Admin, B1App a LessonsApp lokálne
- **[Mobile Apps](./mobile/index.md)** -- Zostavovanie B1Mobile a ďalších aplikácií Expo
- **[Shared Libraries](./shared-libraries/index.md)** -- Práca s Helpers, ApiHelper a AppHelper
- **[Deployment](./deployment/index.md)** -- Nasadenie API, webových aplikácií a mobilných aplikácií
- **[FreePlay Content Provider](./freeplay-content-provider.md)** -- Integrácia vašej knižnice lekcií s FreePlay

## Komunita a zdroje

| Zdroj | Odkaz |
|----------|------|
| GitHub Organization | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sledovanie problémov | [ChurchAppsSupport: problémy](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Komunita na Slacku | [Pripojiť sa na Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najrýchlejší spôsob, ako začať prispievať, je vybrať si webovú aplikáciu (napríklad B1Admin), nasmerovať ju na zdieľané **demo API** a začať robiť zmeny vo frontende. Nie je potrebné nastavovať databázu ani API.
:::
