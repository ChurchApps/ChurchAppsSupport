---
title: "Förutsättningar"
description: "Installera Node.js, npm, Git och plattformsspecifika verktygskedjor innan du arbetar med ChurchApps-projekt som B1 Admin, Lessons.church, FreePlay eller API:et lokalt."
---

# Förutsättningar

<div class="article-intro">

Vilka verktyg du behöver beror på vilka projekt du planerar att arbeta med. Den här sidan listar all nödvändig programvara, ordnad efter utvecklingsområde, från de krav som gäller alla till plattformsspecifika verktygskedjor.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Läs igenom [Projektöversikten](./project-overview.md) för att avgöra vilka projekt du vill arbeta med
- Ha administratörsbehörighet på din utvecklingsdator för att kunna installera programvara

</div>

## Alla projekt

Dessa krävs oavsett vilket projekt du arbetar med:

| Verktyg | Version | Anmärkningar |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ krävs för B1App och LessonsApp (Next.js 16); 24+ krävs för Api |
| **npm** | Följer med Node.js | Används som pakethanterare i alla projekt |
| **Git** | Senaste | Varje projekt är ett separat repositorium |

:::tip
Använd en versionshanterare för Node, som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), för att enkelt byta mellan Node-versioner.
:::

## Utveckling av backend-API

Om du planerar att köra API:et lokalt (i stället för att peka mot demo-API:erna):

| Verktyg | Version | Anmärkningar |
|------|---------|-------|
| **MySQL** | 8.0+ | Varje API-modul använder sin egen databas |

Du behöver sex databaser för kärn-API:et: `membership`, `attendance`, `content`, `giving`, `messaging` och `doing`. API:et innehåller skript som initierar schemat -- se guiden [Lokal installation av API](../api/local-setup.md).

## Mobilappsutveckling

För B1Checkin, LessonsScreen eller andra React Native- / Expo-appar:

| Verktyg | Version | Anmärkningar |
|------|---------|-------|
| **Expo CLI** | Senaste | Installera globalt: `npm install -g expo-cli` |
| **Android Studio** | Senaste | Krävs för Android-utveckling (innehåller Android SDK) |
| **Xcode** | Senaste | Krävs för iOS-utveckling (endast macOS) |

:::info
Du kan använda appen Expo Go på en fysisk enhet för snabb testning utan Android Studio eller Xcode. För att bygga produktionsbinärer krävs dock de inbyggda verktygskedjorna.
:::

## FreeShow (skrivbordsapp) – utveckling

FreeShow har ytterligare beroenden för native-bygge eftersom det kompilerar inbyggda Node-moduler (som `canvas`):

### Alla plattformar

| Verktyg | Version | Anmärkningar |
|------|---------|-------|
| **Python** | 3.12 | Krävs av `node-gyp` för kompilering av native-moduler |
| **setuptools** | Senaste | Installera via `pip install setuptools` |

### Windows

| Verktyg | Anmärkningar |
|------|-------|
| **Visual Studio** | Community-utgåvan räcker |
| **Arbetslast "Desktop development with C++"** | Väls under installationen av Visual Studio |
| **Windows 10 SDK** | Ingår i C++-arbetslasten; se till att den är markerad |

Du kan installera Visual Studio-byggverktygen via kommandoraden:

```bash
npm install --global windows-build-tools
```

Eller installera Visual Studio Community och välj arbetslasten "Desktop development with C++" under installationen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools räcker oftast:

```bash
xcode-select --install
```

## Verifiera installationen

Kör dessa kommandon för att bekräfta att allt är installerat:

```bash
node --version    # Ska visa v20.x.x eller högre
npm --version     # Ska visa 10.x.x eller högre
git --version     # Ska visa git version 2.x.x
mysql --version   # Behövs endast för lokal API-utveckling
```

## Nästa steg

- **[Projektöversikt](./project-overview.md)** -- Se alla projekt och vad de gör
- **[Miljövariabler](./environment-variables.md)** -- Konfigurera dina `.env`-filer
