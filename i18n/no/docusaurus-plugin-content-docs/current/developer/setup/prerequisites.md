---
title: "Forutsetninger"
description: "Sett opp Node.js, npm, Git og plattformverktøy før du arbeider lokalt med ChurchApps-prosjekter som B1 Admin, Lessons.church, FreePlay eller API-et."
---

# Forutsetninger

<div class="article-intro">

Verktøyene du trenger avhenger av hvilke prosjekter du planlegger å jobbe med. Denne siden lister all nødvendig programvare, organisert etter utviklingsområde, fra de generelle kravene til plattformspesifikke verktøykjeder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Se gjennom [Prosjektoversikten](./project-overview.md) for å finne ut hvilke prosjekter du vil jobbe med
- Ha administratortilgang på utviklingsmaskinen din for å installere programvare

</div>

## Alle prosjekter

Disse kreves uavhengig av hvilket prosjekt du jobber med:

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Node.js** | 20+ | Versjon 22+ kreves for B1App og LessonsApp (Next.js 16); 24+ kreves for Api |
| **npm** | Følger med Node.js | Brukes som pakkehåndterer på tvers av alle prosjekter |
| **Git** | Nyeste | Hvert prosjekt er et eget repositorium |

:::tip
Bruk en Node-versjonshåndterer som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) for å enkelt bytte mellom Node-versjoner.
:::

## Utvikling av backend-API

Hvis du planlegger å kjøre API-et lokalt (i stedet for å peke mot demo-API-ene):

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **MySQL** | 8.0+ | Hver API-modul bruker sin egen database |

Du trenger seks databaser for kjerne-API-et: `membership`, `attendance`, `content`, `giving`, `messaging` og `doing`. API-et inneholder skript for å initialisere skjemaet -- se veiledningen [lokalt oppsett av API](../api/local-setup.md).

## Utvikling av mobilapp

For B1Checkin, LessonsScreen eller andre React Native- / Expo-apper:

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Expo CLI** | Nyeste | Installer globalt: `npm install -g expo-cli` |
| **Android Studio** | Nyeste | Kreves for Android-utvikling (inkluderer Android SDK) |
| **Xcode** | Nyeste | Kreves for iOS-utvikling (kun macOS) |

:::info
Du kan bruke Expo Go-appen på en fysisk enhet til rask testing uten Android Studio eller Xcode. For å bygge produksjonsversjoner kreves imidlertid de native verktøykjedene.
:::

## Utvikling av FreeShow (skrivebordsapp)

FreeShow har flere native byggeavhengigheter fordi den kompilerer native Node-moduler (som `canvas`):

### Alle plattformer

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Python** | 3.12 | Kreves av `node-gyp` for kompilering av native moduler |
| **setuptools** | Nyeste | Installeres med `pip install setuptools` |

### Windows

| Verktøy | Merknader |
|------|-------|
| **Visual Studio** | Community-utgaven er tilstrekkelig |
| **Arbeidsbelastningen «Desktop development with C++»** | Velges under installasjon av Visual Studio |
| **Windows 10 SDK** | Inkludert i C++-arbeidsbelastningen; sørg for at den er avkrysset |

Du kan installere Visual Studio-byggeverktøyene via kommandolinjen:

```bash
npm install --global windows-build-tools
```

Eller installer Visual Studio Community og velg arbeidsbelastningen «Desktop development with C++» under installasjonen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools er vanligvis tilstrekkelig:

```bash
xcode-select --install
```

## Bekreft installasjonen

Kjør disse kommandoene for å bekrefte at alt er installert:

```bash
node --version    # Skal skrive ut v20.x.x eller høyere
npm --version     # Skal skrive ut 10.x.x eller høyere
git --version     # Skal skrive ut git version 2.x.x
mysql --version   # Kun nødvendig for lokal API-utvikling
```

## Neste steg

- **[Prosjektoversikt](./project-overview.md)** -- Se alle prosjekter og hva de gjør
- **[Miljøvariabler](./environment-variables.md)** -- Konfigurer dine `.env`-filer
