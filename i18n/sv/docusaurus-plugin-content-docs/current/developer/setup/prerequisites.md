---
title: "Förutsättningar"
---

# Förutsättningar

<div class="article-intro">

Vilka verktyg du behöver beror på vilka projekt du planerar att arbeta med. Den här sidan listar all nödvändig programvara, ordnad efter utvecklingsområde, från de gemensamma kraven till plattformsspecifika verktygskedjor.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Läs igenom [Projektöversikten](./project-overview) för att avgöra vilka projekt du vill arbeta med
- Ha administratörsbehörighet på din utvecklingsdator för att kunna installera programvara

</div>

## Alla projekt

Dessa krävs oavsett vilket projekt du arbetar med:

| Verktyg | Version | Anteckningar |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ krävs för B1App och LessonsApp (Next.js 16); 24+ krävs för Api:et |
| **npm** | Följer med Node.js | Används som pakethanterare i alla projekt |
| **Git** | Senaste | Varje projekt är ett separat repositorium |

:::tip
Använd en versionshanterare för Node, som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), för att enkelt byta mellan Node-versioner.
:::

## Utveckling av backend-API

Om du planerar att köra API:et lokalt (i stället för att peka mot demo-API:erna):

| Verktyg | Version | Anteckningar |
|------|---------|-------|
| **MySQL** | 8.0+ | Varje API-modul använder sin egen databas |

Du behöver sex databaser för kärn-API:et: `membership`, `attendance`, `content`, `giving`, `messaging` och `doing`. API:et innehåller skript för att initiera schemat -- se guiden [API lokal installation](../api/local-setup).

## Utveckling av mobilappar

För B1Mobile, B1Checkin, LessonsScreen eller andra React Native- / Expo-appar:

| Verktyg | Version | Anteckningar |
|------|---------|-------|
| **Expo CLI** | Senaste | Installera globalt: `npm install -g expo-cli` |
| **Android Studio** | Senaste | Krävs för Android-utveckling (inkluderar Android SDK) |
| **Xcode** | Senaste | Krävs för iOS-utveckling (endast macOS) |

:::info
Du kan använda appen Expo Go på en fysisk enhet för snabb testning utan Android Studio eller Xcode. För att bygga produktionsbinärer krävs dock de inbyggda verktygskedjorna.
:::

## Utveckling av FreeShow (skrivbordsapp)

FreeShow har ytterligare beroenden för native-byggen eftersom det kompilerar native Node-moduler (som `canvas`):

### Alla plattformar

| Verktyg | Version | Anteckningar |
|------|---------|-------|
| **Python** | 3.12 | Krävs av `node-gyp` för kompilering av native-moduler |
| **setuptools** | Senaste | Installera via `pip install setuptools` |

### Windows

| Verktyg | Anteckningar |
|------|-------|
| **Visual Studio** | Community-utgåvan räcker |
| **Arbetsbelastningen "Skrivbordsutveckling med C++"** | Välj under installationen av Visual Studio |
| **Windows 10 SDK** | Ingår i C++-arbetsbelastningen; se till att den är markerad |

Du kan installera Visual Studio-byggverktygen via kommandoraden:

```bash
npm install --global windows-build-tools
```

Eller installera Visual Studio Community och välj arbetsbelastningen "Skrivbordsutveckling med C++" under installationen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcodes kommandoradsverktyg räcker vanligtvis:

```bash
xcode-select --install
```

## Verifiera din installation

Kör dessa kommandon för att bekräfta att allt är installerat:

```bash
node --version    # Ska skriva ut v20.x.x eller högre
npm --version     # Ska skriva ut 10.x.x eller högre
git --version     # Ska skriva ut git version 2.x.x
mysql --version   # Behövs endast för lokal API-utveckling
```

## Nästa steg

- **[Projektöversikt](./project-overview)** -- Se alla projekt och vad de gör
- **[Miljövariabler](./environment-variables)** -- Konfigurera dina `.env`-filer
