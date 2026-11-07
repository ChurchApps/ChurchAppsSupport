---
title: "Dokumentace pro vývojáře"
description: "Orientace ve vývojářských dokumentech ChurchApps: lokální nastavení, průvodci API a webovými aplikacemi, sdílené knihovny, mobilní buildy a nasazení."
---

# Dokumentace pro vývojáře

<div class="article-intro">

ChurchApps je soubor přibližně 20 projektů s otevřeným zdrojovým kódem, které společně poskytují kompletní platformu pro správu sboru. Projekty zahrnují backendová API, webové aplikace, mobilní aplikace, desktopovou aplikaci a sdílené knihovny, to vše napsané v TypeScriptu. Tato sekce obsahuje vše, co potřebujete k nastavení lokálního vývojového prostředí a k zapojení do vývoje.

</div>

## Architektura na první pohled

Projekty jsou **nezávislé repozitáře** (nejde o monorepo). Sdílený kód je publikován na npm pod rozsahem `@churchapps/*` a používá se jako běžné závislosti. To znamená, že můžete pracovat na jediném projektu, aniž byste museli klonovat celý ekosystém.

Klíčové vlastnosti:

- **Jazyk:** TypeScript všude
- **Backend:** API na Node.js / Express nasazená na AWS Lambda pomocí Serverless Frameworku
- **Web:** React 19 (Vite a Next.js), Material-UI 7
- **Mobil:** React Native s Expo
- **Databáze:** MySQL 8.0, jedna databáze pro každý modul API

## Co tato sekce obsahuje

- **[Nastavení](./setup/index.md)** – Lokální vývojové prostředí, předpoklady a konfigurace
  - [Předpoklady](./setup/prerequisites.md) – Požadované nástroje a software
  - [Přehled projektů](./setup/project-overview.md) – Všechny projekty na jednom místě
  - [Proměnné prostředí](./setup/environment-variables.md) – Konfigurace souborů `.env`
- **[API](./api/index.md)** – Lokální nastavení hlavního API, inicializace databáze a struktura modulů
- **[Webové aplikace](./web-apps/index.md)** – Spuštění B1Admin, B1App a LessonsApp lokálně
- **[Mobilní aplikace](./mobile/index.md)** – Sestavení B1Mobile a dalších aplikací Expo
- **[Sdílené knihovny](./shared-libraries/index.md)** – Práce s Helpers, ApiHelper a AppHelper
- **[Nasazení](./deployment/index.md)** – Nasazení API, webových aplikací a mobilních aplikací
- **[Poskytovatel obsahu pro FreePlay](./freeplay-content-provider.md)** – Propojení vaší knihovny lekcí s FreePlay

## Komunita a zdroje

| Zdroj | Odkaz |
|----------|------|
| Organizace na GitHubu | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sledování chyb | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Komunita na Slacku | [Připojit se ke Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Nejrychlejší způsob, jak začít přispívat, je vybrat webovou aplikaci (například B1Admin), nasměrovat ji na sdílená **demo API** a začít dělat změny ve frontendu. Není potřeba žádná databáze ani nastavení API.
:::
