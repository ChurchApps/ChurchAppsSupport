---
title: "Vývojárska dokumentácia"
description: "Nájdite cestu v dokumentácii pre vývojárov ChurchApps: lokálne nastavenie, sprievodcovia pre API a webové aplikácie, zdieľané knižnice, zostavenie mobilných aplikácií a nasadenie open-source projektov."
---

# Vývojárska dokumentácia

<div class="article-intro">

ChurchApps je zbierka približne 20 open-source projektov, ktoré spolu poskytujú kompletnú platformu na správu cirkvi. Projekty zahŕňajú backendové API, webové aplikácie, mobilné aplikácie, desktopovú aplikáciu a zdieľané knižnice -- všetky napísané v TypeScripte. Táto sekcia obsahuje všetko, čo potrebujete na nastavenie lokálneho vývojového prostredia a na začiatok prispievania.

</div>

## Architektúra na prvý pohľad

Projekty sú **nezávislé repozitáre** (nie monorepo). Zdieľaný kód sa publikuje na npm pod rozsahom `@churchapps/*` a používa sa ako bežné závislosti. To znamená, že môžete pracovať na jednom projekte bez klonovania celého ekosystému.

Kľúčové vlastnosti:

- **Jazyk:** TypeScript všade
- **Backend:** API na Node.js / Express nasadené na AWS Lambda pomocou Serverless Framework
- **Web:** React 19 (Vite a Next.js), Material-UI 7
- **Mobil:** React Native s Expo
- **Databáza:** MySQL 8.0, jedna databáza pre každý modul API

## Čo táto sekcia obsahuje

- **[Nastavenie](./setup/index.md)** -- Lokálne vývojové prostredie, predpoklady a konfigurácia
  - [Predpoklady](./setup/prerequisites.md) -- Požadované nástroje a softvér
  - [Prehľad projektov](./setup/project-overview.md) -- Všetky projekty na jednom mieste
  - [Premenné prostredia](./setup/environment-variables.md) -- Konfigurácia súborov `.env`
- **[API](./api/index.md)** -- Lokálne nastavenie hlavného API, inicializácia databázy a štruktúra modulov
- **[Webové aplikácie](./web-apps/index.md)** -- Spúšťanie B1Admin, B1App a LessonsApp lokálne
- **[Mobilné aplikácie](./mobile/index.md)** -- Zostavenie B1Checkin a ďalších aplikácií Expo
- **[Zdieľané knižnice](./shared-libraries/index.md)** -- Práca s Helpers, ApiHelper a AppHelper
- **[Nasadenie](./deployment/index.md)** -- Nasadenie API, webových aplikácií a mobilných aplikácií
- **[Poskytovateľ obsahu FreePlay](./freeplay-content-provider.md)** -- Integrácia vašej knižnice lekcií s FreePlay

## Komunita a zdroje

| Zdroj | Odkaz |
|----------|------|
| GitHub organizácia | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sledovanie problémov | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Komunita na Slacku | [Pripojiť sa na Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najrýchlejší spôsob, ako začať prispievať, je vybrať webovú aplikáciu (napríklad B1Admin), nasmerovať ju na zdieľané **demo API** a začať robiť zmeny vo frontende. Nie je potrebné nastavovať databázu ani API.
:::
