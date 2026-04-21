---
title: "Prerequisites"
---

# Prerequisites

<div class="article-intro">

De tools die u nodig hebt, zijn afhankelijk van welke projecten u wilt gebruiken. Deze pagina bevat alle vereiste software ingedeeld op ontwikkelinggebied, van de universele vereisten tot platform-specifieke toolchains.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Lees het [Project Overview](./project-overview) om te bepalen welke projecten u wilt gebruiken
- Hebt u beheerdersrechten op uw ontwikkelmachine voor softwareinstallatie

</div>

## Alle Projecten

Dit is vereist, ongeacht welk project u gebruikt:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | Versie 22+ vereist voor B1App en LessonsApp (Next.js 16) |
| **npm** | Comes with Node.js | Gebruikt als pakketbeheerder in alle projecten |
| **Git** | Latest | Elk project is een aparte repository |

:::tip
Gebruik een Node versie-manager als [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) of [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) om gemakkelijk tussen Node-versies te schakelen.
:::

## Backend API-Ontwikkeling

Als u van plan bent om de API lokaal uit te voeren (in plaats van naar staging te wijzen):

| Tool | Version | Notes |
|------|---------|-------|
| **MySQL** | 8.0+ | Elke API-module gebruikt zijn eigen database |

U hebt zes databases nodig voor de kern-API: `membership`, `attendance`, `content`, `giving`, `messaging` en `doing`. De API bevat scripts om het schema te initialiseren -- zie de [API lokale setup](../api/local-setup)-gids.

## Mobiele App-Ontwikkeling

Voor B1Mobile, B1Checkin, LessonsScreen of andere React Native / Expo-apps:

| Tool | Version | Notes |
|------|---------|-------|
| **Expo CLI** | Latest | Installeer globaal: `npm install -g expo-cli` |
| **Android Studio** | Latest | Vereist voor Android-ontwikkeling (inclusief Android SDK) |
| **Xcode** | Latest | Vereist voor iOS-ontwikkeling (alleen macOS) |

:::info
U kunt de Expo Go-app op een fysiek apparaat gebruiken voor snelle tests zonder Android Studio of Xcode. Het bouwen van productie-binaries vereist echter native toolchains.
:::

## FreeShow (Desktop App)-Ontwikkeling

FreeShow heeft aanvullende native build-afhankelijkheden omdat het native Node-modules compileert (zoals `canvas`):

### Alle Platforms

| Tool | Version | Notes |
|------|---------|-------|
| **Python** | 3.12 | Vereist door `node-gyp` voor native module-compilatie |
| **setuptools** | Latest | Installeer via `pip install setuptools` |

### Windows

| Tool | Notes |
|------|-------|
| **Visual Studio** | Community-editie is voldoende |
| **"Desktop development with C++" workload** | Selecteer tijdens Visual Studio-installatie |
| **Windows 10 SDK** | Opgenomen in C++ workload; zorg dat dit is ingeschakeld |

U kunt de Visual Studio build-tools installeren via de commandoregel:

```bash
npm install --global windows-build-tools
```

Of installeer Visual Studio Community en selecteer de "Desktop development with C++"-workload tijdens installatie.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools zijn meestal voldoende:

```bash
xcode-select --install
```

## Controleer Uw Installatie

Voer deze commando's uit om alles in te stellen:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Volgende Stappen

- **[Project Overview](./project-overview)** -- Bekijk alle projecten en wat ze doen
- **[Environment Variables](./environment-variables)** -- Configureer uw `.env`-bestanden
