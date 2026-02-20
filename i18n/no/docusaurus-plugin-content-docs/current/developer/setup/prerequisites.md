---
title: "Forutsetninger"
---

# Forutsetninger

<div class="article-intro">

Verktøyene du trenger avhenger av hvilke prosjekter du planlegger å jobbe med. Denne siden lister all nødvendig programvare organisert etter utviklingsområde, fra universelle krav til plattformspesifikke verktøykjeder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Gjennomgå [Prosjektoversikten](./project-overview) for å avgjøre hvilke prosjekter du vil jobbe med
- Ha administratortilgang på utviklingsmaskinen din for å installere programvare

</div>

## Alle prosjekter

Disse kreves uansett hvilket prosjekt du jobber med:

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Node.js** | 20+ | Versjon 22+ kreves for B1App og LessonsApp (Next.js 16) |
| **npm** | Følger med Node.js | Brukes som pakkebehandler på tvers av alle prosjekter |
| **Git** | Nyeste | Hvert prosjekt er et separat repository |

:::tip
Bruk en Node-versjonsbehandler som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) for å enkelt bytte mellom Node-versjoner.
:::

## Backend API-utvikling

Hvis du planlegger å kjøre API-et lokalt (i stedet for å peke mot staging):

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **MySQL** | 8.0+ | Hver API-modul bruker sin egen database |

Du trenger seks databaser for kjerne-API-et: `membership`, `attendance`, `content`, `giving`, `messaging` og `doing`. API-et inkluderer script for å initialisere skjemaet -- se guiden [Lokalt API-oppsett](../api/local-setup).

## Mobilapputvikling

For B1Mobile, B1Checkin, LessonsScreen eller andre React Native / Expo-apper:

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Expo CLI** | Nyeste | Installer globalt: `npm install -g expo-cli` |
| **Android Studio** | Nyeste | Kreves for Android-utvikling (inkluderer Android SDK) |
| **Xcode** | Nyeste | Kreves for iOS-utvikling (kun macOS) |

:::info
Du kan bruke Expo Go-appen på en fysisk enhet for rask testing uten Android Studio eller Xcode. Men bygging av produksjonsbinærfiler krever de native verktøykjedene.
:::

## FreeShow (skrivebordsapp) utvikling

FreeShow har ekstra native byggeavhengigheter fordi den kompilerer native Node-moduler (som `canvas`):

### Alle plattformer

| Verktøy | Versjon | Merknader |
|------|---------|-------|
| **Python** | 3.12 | Kreves av `node-gyp` for kompilering av native moduler |
| **setuptools** | Nyeste | Installer via `pip install setuptools` |

### Windows

| Verktøy | Merknader |
|------|-------|
| **Visual Studio** | Community-utgaven er tilstrekkelig |
| **"Desktop development with C++"-arbeidslast** | Velg under Visual Studio-installasjon |
| **Windows 10 SDK** | Inkludert i C++-arbeidslasten; sørg for at den er valgt |

Du kan installere Visual Studio-byggverktøyene via kommandolinjen:

```bash
npm install --global windows-build-tools
```

Eller installer Visual Studio Community og velg "Desktop development with C++"-arbeidslasten under installasjonen.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools er vanligvis tilstrekkelig:

```bash
xcode-select --install
```

## Verifiser installasjonen

Kjør disse kommandoene for å bekrefte at alt er installert:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Neste steg

- **[Prosjektoversikt](./project-overview)** -- Se alle prosjekter og hva de gjør
- **[Miljøvariabler](./environment-variables)** -- Konfigurer `.env`-filene dine
