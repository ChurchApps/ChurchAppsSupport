---
title: "Předpoklady"
description: "Nastavte Node.js, npm, Git a platformové nástroje před prací na projektech ChurchApps, jako B1 Admin, Lessons.church, FreePlay nebo API, lokálně."
---

# Předpoklady

<div class="article-intro">

Nástroje, které potřebujete, závisejí na tom, na kterých projektech plánujete pracovat. Tato stránka uvádí veškerý požadovaný software seřazený podle oblasti vývoje, od univerzálních požadavků až po toolchainy specifické pro jednotlivé platformy.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Prohlédněte si [přehled projektů](./project-overview.md) a rozhodněte se, na kterých projektech chcete pracovat
- Na vašem vývojovém počítači potřebujete oprávnění správce pro instalaci softwaru

</div>

## Všechny projekty

Tyto nástroje jsou vyžadovány bez ohledu na to, na kterém projektu pracujete:

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Node.js** | 20+ | Pro B1App a LessonsApp (Next.js 16) je vyžadována verze 22+; pro Api verze 24+ |
| **npm** | Dodáván s Node.js | Používá se jako správce balíčků ve všech projektech |
| **Git** | Nejnovější | Každý projekt je samostatný repozitář |

:::tip
Pro snadné přepínání mezi verzemi Node použijte správce verzí, například [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) nebo [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Vývoj backend API

Pokud plánujete spouštět API lokálně (namísto připojení k demo API):

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **MySQL** | 8.0+ | Každý modul API používá vlastní databázi |

Pro základní API potřebujete šest databází: `membership`, `attendance`, `content`, `giving`, `messaging` a `doing`. API obsahuje skripty pro inicializaci schématu -- viz návod [lokální nastavení API](../api/local-setup.md).

## Vývoj mobilních aplikací

Pro B1Mobile, B1Checkin, LessonsScreen nebo jiné aplikace React Native / Expo:

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Expo CLI** | Nejnovější | Instalace globálně: `npm install -g expo-cli` |
| **Android Studio** | Nejnovější | Potřebné pro vývoj na Androidu (obsahuje Android SDK) |
| **Xcode** | Nejnovější | Potřebné pro vývoj na iOS (pouze macOS) |

:::info
Pro rychlé testování na fyzickém zařízení můžete použít aplikaci Expo Go bez Android Studia nebo Xcode. Sestavení produkčních binárních souborů však vyžaduje nativní toolchainy.
:::

## Vývoj FreeShow (desktopová aplikace)

FreeShow vyžaduje další nativní závislosti pro sestavení, protože kompiluje nativní moduly Node (například `canvas`):

### Všechny platformy

| Nástroj | Verze | Poznámky |
|------|---------|-------|
| **Python** | 3.12 | Vyžaduje `node-gyp` pro kompilaci nativních modulů |
| **setuptools** | Nejnovější | Instalace pomocí `pip install setuptools` |

### Windows

| Nástroj | Poznámky |
|------|-------|
| **Visual Studio** | Stačí edice Community |
| **Pracovní zátěž „Desktop development with C++“** | Vyberte během instalace Visual Studia |
| **Windows 10 SDK** | Je součástí pracovní zátěže C++; ujistěte se, že je zaškrtnutá |

Nástroje pro sestavení Visual Studia můžete nainstalovat z příkazového řádku:

```bash
npm install --global windows-build-tools
```

Nebo nainstalujte Visual Studio Community a během instalace vyberte pracovní zátěž „Desktop development with C++“.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Obvykle postačují nástroje příkazového řádku Xcode:

```bash
xcode-select --install
```

## Ověření instalace

Spusťte tyto příkazy a ověřte, že je vše nainstalováno:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Další kroky

- **[Přehled projektů](./project-overview.md)** -- Přehled všech projektů a jejich funkcí
- **[Proměnné prostředí](./environment-variables.md)** -- Nastavení souborů `.env`
