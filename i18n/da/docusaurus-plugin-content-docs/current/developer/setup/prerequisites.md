---
title: "Forudsætninger"
---

# Forudsætninger

<div class="article-intro">

De værktøjer, du har brug for, afhænger af, hvilke projekter du planlægger at arbejde på. Denne side viser alle påkrævede software organiseret efter udviklingsfelt, fra universelle krav til platform-specifikke værktøjskæder.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Gennemgå [Projektoversigt](./project-overview) for at bestemme, hvilke projekter du vil arbejde på
- Har administratoradgang på din udviklingsmaskine til installation af software

</div>

## Alle projekter

Disse er påkrævede uanset, hvilket projekt du arbejder på:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ påkrævet for B1App og LessonsApp (Next.js 16) |
| **npm** | Kommer med Node.js | Bruges som package manager på tværs af alle projekter |
| **Git** | Seneste | Hvert projekt er et separat lager |

:::tip
Brug en Node version manager som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) til let at skifte mellem Node-versioner.
:::

## Backend API-udvikling

Hvis du planlægger at køre API'en lokalt (i stedet for at pege på staging):

| Tool | Version | Notes |
|------|---------|-------|
| **MySQL** | 8.0+ | Hvert API-modul bruger sin egen database |

Du får brug for seks databaser for kerne-API'en: `membership`, `attendance`, `content`, `giving`, `messaging` og `doing`. API'en indeholder scripter til initialisering af skemaet -- se vejledningen [Lokalt API Setup](../api/local-setup).

## Mobil-app udvikling

For B1Mobile, B1Checkin, LessonsScreen eller andre React Native / Expo-apps:

| Tool | Version | Notes |
|------|---------|-------|
| **Expo CLI** | Seneste | Installer globalt: `npm install -g expo-cli` |
| **Android Studio** | Seneste | Påkrævet til Android-udvikling (inkluderer Android SDK) |
| **Xcode** | Seneste | Påkrævet til iOS-udvikling (kun macOS) |

:::info
Du kan bruge Expo Go-appen på en fysisk enhed til hurtig test uden Android Studio eller Xcode. Dog kræver byggeri af produktionsbinære filer de oprindelige værktøjskæder.
:::

## FreeShow (Desktop App) Udvikling

FreeShow har yderligere native build-afhængigheder, fordi den kompilerer native Node-moduler (som `canvas`):

### Alle platforme

| Tool | Version | Notes |
|------|---------|-------|
| **Python** | 3.12 | Påkrævet af `node-gyp` til kompilering af native moduler |
| **setuptools** | Seneste | Installer via `pip install setuptools` |

### Windows

| Tool | Notes |
|------|-------|
| **Visual Studio** | Community edition er tilstrækkelig |
| **"Skrivebordudvikling med C++"-arbejdsbelastning** | Vælg under Visual Studio-installation |
| **Windows 10 SDK** | Inkluderet i C++-arbejdsbelastningen; sørg for, at den er markeret |

Du kan installere Visual Studio build tools via kommandolinjen:

```bash
npm install --global windows-build-tools
```

Eller installer Visual Studio Community og vælg "Skrivebordudvikling med C++"-arbejdsbelastningen under installationen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools er typisk tilstrækkelig:

```bash
xcode-select --install
```

## Bekræft din installation

Kør disse kommandoer for at bekræfte, at alt er installeret:

```bash
node --version    # Bør udskrive v20.x.x eller højere
npm --version     # Bør udskrive 10.x.x eller højere
git --version     # Bør udskrive git version 2.x.x
mysql --version   # Kun påkrævet til lokal API-udvikling
```

## Næste trin

- **[Projektoversigt](./project-overview)** -- Se alle projekter og hvad de gør
- **[Miljøvariabler](./environment-variables)** -- Konfigurér dine `.env`-filer
