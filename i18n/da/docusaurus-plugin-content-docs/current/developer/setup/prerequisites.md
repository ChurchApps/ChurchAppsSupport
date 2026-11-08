---
title: "Forudsætninger"
description: "Installer Node.js, npm, Git og platformsspecifikke værktøjer, før du arbejder med ChurchApps-projekter som B1 Admin, Lessons.church, FreePlay eller API'et lokalt."
---

# Forudsætninger

<div class="article-intro">

De værktøjer, du har brug for, afhænger af, hvilke projekter du vil arbejde på. Denne side viser al påkrævet software, opdelt efter udviklingsområde, fra de generelle krav til de platformsspecifikke værktøjer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Gennemgå [Projektoversigten](./project-overview.md) for at finde ud af, hvilke projekter du vil arbejde på
- Du skal have administratoradgang på din udviklingsmaskine for at installere software

</div>

## Alle projekter

Disse er påkrævet, uanset hvilket projekt du arbejder på:

| Værktøj | Version | Noter |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ kræves til B1App og LessonsApp (Next.js 16); 24+ kræves til Api'et |
| **npm** | Følger med Node.js | Bruges som pakkehåndtering på tværs af alle projekter |
| **Git** | Seneste | Hvert projekt er et separat repository |

:::tip
Brug en Node-versionshåndtering som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) for nemt at skifte mellem Node-versioner.
:::

## Udvikling af backend-API

Hvis du vil køre API'et lokalt (i stedet for at pege på demo-API'erne):

| Værktøj | Version | Noter |
|------|---------|-------|
| **MySQL** | 8.0+ | Hvert API-modul bruger sin egen database |

Du skal bruge seks databaser til kerne-API'et: `membership`, `attendance`, `content`, `giving`, `messaging` og `doing`. API'et indeholder scripts, der initialiserer skemaet -- se guiden [API lokal opsætning](../api/local-setup.md).

## Udvikling af mobilapp

Til B1Checkin, LessonsScreen eller andre React Native / Expo-apps:

| Værktøj | Version | Noter |
|------|---------|-------|
| **Expo CLI** | Seneste | Installer globalt: `npm install -g expo-cli` |
| **Android Studio** | Seneste | Kræves til Android-udvikling (inkluderer Android SDK) |
| **Xcode** | Seneste | Kræves til iOS-udvikling (kun macOS) |

:::info
Du kan bruge Expo Go-appen på en fysisk enhed til hurtig test uden Android Studio eller Xcode. Til at bygge produktionsbinære filer kræves dog de native værktøjskæder.
:::

## Udvikling af FreeShow (desktopapp)

FreeShow har yderligere native byggeafhængigheder, fordi det kompilerer native Node-moduler (som `canvas`):

### Alle platforme

| Værktøj | Version | Noter |
|------|---------|-------|
| **Python** | 3.12 | Kræves af `node-gyp` til kompilering af native moduler |
| **setuptools** | Seneste | Installeres via `pip install setuptools` |

### Windows

| Værktøj | Noter |
|------|-------|
| **Visual Studio** | Community-udgaven er tilstrækkelig |
| **"Desktop development with C++"-arbejdsbyrde** | Vælg under installationen af Visual Studio |
| **Windows 10 SDK** | Inkluderet i C++-arbejdsbyrden; sørg for, at den er markeret |

Du kan installere Visual Studio build tools via kommandolinjen:

```bash
npm install --global windows-build-tools
```

Eller installer Visual Studio Community og vælg arbejdsbyrden "Desktop development with C++" under installationen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools er normalt tilstrækkelige:

```bash
xcode-select --install
```

## Bekræft din installation

Kør disse kommandoer for at kontrollere, at alt er installeret:

```bash
node --version    # Bør udskrive v20.x.x eller højere
npm --version     # Bør udskrive 10.x.x eller højere
git --version     # Bør udskrive git version 2.x.x
mysql --version   # Kun nødvendig til lokal API-udvikling
```

## Næste trin

- **[Projektoversigt](./project-overview.md)** -- Se alle projekter, og hvad de gør
- **[Miljøvariabler](./environment-variables.md)** -- Konfigurer dine `.env`-filer
