---
title: "Vereisten"
description: "Installeer Node.js, npm, Git en de platformspecifieke toolchains voordat je lokaal werkt aan ChurchApps-projecten zoals B1 Admin, Lessons.church, FreePlay of de API."
---

# Vereisten

<div class="article-intro">

Welke tools je nodig hebt, hangt af van de projecten waaraan je wilt werken. Deze pagina somt alle benodigde software op, gegroepeerd per ontwikkelgebied, van de algemene vereisten tot de platformspecifieke toolchains.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Bekijk het [Projectoverzicht](./project-overview.md) om te bepalen aan welke projecten je wilt werken
- Zorg dat je beheerdersrechten hebt op je ontwikkelmachine om software te kunnen installeren

</div>

## Alle projecten

Deze zijn vereist, ongeacht aan welk project je werkt:

| Tool | Versie | Opmerkingen |
|------|---------|-------|
| **Node.js** | 20+ | Versie 22+ vereist voor B1App en LessonsApp (Next.js 16); 24+ vereist voor de Api |
| **npm** | Wordt meegeleverd met Node.js | Wordt als pakketbeheerder gebruikt voor alle projecten |
| **Git** | Nieuwste | Elk project is een afzonderlijke repository |

:::tip
Gebruik een Node-versiebeheertool zoals [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) of [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) om eenvoudig tussen Node-versies te wisselen.
:::

## Backend-API-ontwikkeling

Als je de API lokaal wilt draaien (in plaats van naar de demo-API's te verwijzen):

| Tool | Versie | Opmerkingen |
|------|---------|-------|
| **MySQL** | 8.0+ | Elke API-module gebruikt een eigen database |

Voor de kern-API heb je zes databases nodig: `membership`, `attendance`, `content`, `giving`, `messaging` en `doing`. De API bevat scripts om het schema te initialiseren -- zie de handleiding [API lokale installatie](../api/local-setup.md).

## Mobiele app-ontwikkeling

Voor B1Checkin, LessonsScreen of andere React Native- / Expo-apps:

| Tool | Versie | Opmerkingen |
|------|---------|-------|
| **Expo CLI** | Nieuwste | Installeer globaal: `npm install -g expo-cli` |
| **Android Studio** | Nieuwste | Vereist voor Android-ontwikkeling (bevat de Android SDK) |
| **Xcode** | Nieuwste | Vereist voor iOS-ontwikkeling (alleen macOS) |

:::info
Je kunt de Expo Go-app op een fysiek apparaat gebruiken voor snelle tests zonder Android Studio of Xcode. Het bouwen van productiebinaries vereist echter de native toolchains.
:::

## FreeShow (desktopapp)-ontwikkeling

FreeShow heeft extra native build-afhankelijkheden, omdat het native Node-modules (zoals `canvas`) compileert:

### Alle platforms

| Tool | Versie | Opmerkingen |
|------|---------|-------|
| **Python** | 3.12 | Vereist door `node-gyp` voor het compileren van native modules |
| **setuptools** | Nieuwste | Installeer via `pip install setuptools` |

### Windows

| Tool | Opmerkingen |
|------|-------|
| **Visual Studio** | De Community-editie is voldoende |
| **Workload "Desktopontwikkeling met C++"** | Selecteer dit tijdens de installatie van Visual Studio |
| **Windows 10 SDK** | Inbegrepen in de C++-workload; zorg dat deze is aangevinkt |

Je kunt de Visual Studio-buildtools via de opdrachtregel installeren:

```bash
npm install --global windows-build-tools
```

Of installeer Visual Studio Community en selecteer tijdens de installatie de workload "Desktopontwikkeling met C++".

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

De Xcode Command Line Tools zijn doorgaans voldoende:

```bash
xcode-select --install
```

## Controleer je installatie

Voer deze opdrachten uit om te controleren of alles is geïnstalleerd:

```bash
node --version    # Zou v20.x.x of hoger moeten tonen
npm --version     # Zou 10.x.x of hoger moeten tonen
git --version     # Zou git version 2.x.x moeten tonen
mysql --version   # Alleen nodig voor lokale API-ontwikkeling
```

## Volgende stappen

- **[Projectoverzicht](./project-overview.md)** -- Bekijk alle projecten en wat ze doen
- **[Omgevingsvariabelen](./environment-variables.md)** -- Configureer je `.env`-bestanden
