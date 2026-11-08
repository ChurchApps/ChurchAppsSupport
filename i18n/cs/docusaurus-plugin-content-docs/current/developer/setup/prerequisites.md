---
title: "Předpoklady"
description: "Nastavte Node.js, npm, Git a platformní nástroje před prací na projektech ChurchApps, jako jsou B1 Admin, Lessons.church, FreePlay nebo API, lokálně."
---

# Předpoklady

<div class="article-intro">

Nástroje, které potřebujete, závisí na tom, na kterých projektech plánujete pracovat. Tato stránka uvádí veškerý požadovaný software seřazený podle oblasti vývoje, od univerzálních požadavků až po platformně specifické nástroje.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Prohlédněte si [Přehled projektů](./project-overview.md), abyste určili, na kterých projektech chcete pracovat
- Na vašem vývojovém počítači potřebujete oprávnění správce pro instalaci softwaru

</div>

## Všechny projekty

Tyto nástroje jsou vyžadovány bez ohledu na to, na kterém projektu pracujete:

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Node.js** | 20+ | Verze 22+ je vyžadována pro B1App a LessonsApp (Next.js 16); 24+ pro Api |
| **npm** | Je součástí Node.js | Používá se jako správce balíčků ve všech projektech |
| **Git** | Nejnovější | Každý projekt je samostatný repozitář |

:::tip
K snadnému přepínání mezi verzemi Node použijte správce verzí Node, jako je [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) nebo [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Vývoj backendu API

Pokud plánujete spouštět API lokálně (namísto připojení k demo API):

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **MySQL** | 8.0+ | Každý modul API používá vlastní databázi |

Pro základní API budete potřebovat šest databází: `membership`, `attendance`, `content`, `giving`, `messaging` a `doing`. API obsahuje skripty pro inicializaci schématu – viz průvodce [lokální nastavení API](../api/local-setup.md).

## Vývoj mobilních aplikací

Pro B1Checkin, LessonsScreen nebo jiné aplikace React Native / Expo:

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Expo CLI** | Nejnovější | Globální instalace: `npm install -g expo-cli` |
| **Android Studio** | Nejnovější | Vyžadováno pro vývoj na Androidu (obsahuje Android SDK) |
| **Xcode** | Nejnovější | Vyžadováno pro vývoj na iOS (pouze macOS) |

:::info
Pro rychlé testování na fyzickém zařízení můžete použít aplikaci Expo Go bez Android Studia nebo Xcode. Sestavení produkčních binárních souborů však vyžaduje nativní nástroje.
:::

## Vývoj FreeShow (desktopová aplikace)

FreeShow má další závislosti pro nativní sestavení, protože kompiluje nativní moduly Node (například `canvas`):

### Všechny platformy

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Python** | 3.12 | Vyžadováno nástrojem `node-gyp` pro kompilaci nativních modulů |
| **setuptools** | Nejnovější | Instalace pomocí `pip install setuptools` |

### Windows

| Nástroj | Poznámky |
|------|-------|
| **Visual Studio** | Stačí edice Community |
| **Úloha „Vývoj desktopových aplikací v C++“** | Vyberte během instalace Visual Studia |
| **Windows 10 SDK** | Obsaženo v úloze C++; ujistěte se, že je zaškrtnuté |

Nástroje pro sestavení Visual Studia můžete nainstalovat z příkazového řádku:

```bash
npm install --global windows-build-tools
```

Nebo nainstalujte Visual Studio Community a během instalace vyberte úlohu „Vývoj desktopových aplikací v C++“.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Obvykle postačují nástroje příkazového řádku pro Xcode:

```bash
xcode-select --install
```

## Ověření instalace

Spuštěním těchto příkazů ověřte, že je vše nainstalováno:

```bash
node --version    # Mělo by vypsat v20.x.x nebo vyšší
npm --version     # Mělo by vypsat 10.x.x nebo vyšší
git --version     # Mělo by vypsat git version 2.x.x
mysql --version   # Potřebné pouze pro lokální vývoj API
```

## Další kroky

- **[Přehled projektů](./project-overview.md)** -- Přehled všech projektů a jejich funkcí
- **[Proměnné prostředí](./environment-variables.md)** -- Nastavení souborů `.env`
