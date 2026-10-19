---
title: "Forutsetninger"
---

# Forutsetninger

<div class="article-intro">

Verktøyene du trenger avhenger av hvilke prosjekter du planlegger å jobbe med. Denne siden lister all nødvendig programvare, organisert etter utviklingsområde, fra de universelle kravene til plattformspesifikke verktøykjeder.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Gjennomgå [Prosjektoversikt](./project-overview) for å finne ut hvilke prosjekter du vil jobbe med
- Ha administratortilgang på utviklingsmaskinen din for å installere programvare

</div>

## Alle prosjekter

Disse kreves uavhengig av hvilket prosjekt du jobber med:

| Verktøy | Versjon | Merknader |
|---------|---------|-----------|
| **Node.js** | 20+ | Versjon 22+ kreves for B1App og LessonsApp (Next.js 16) |
| **npm** | Følger med Node.js | Brukes som pakkehåndterer på tvers av alle prosjekter |
| **Git** | Nyeste | Hvert prosjekt er et eget repository |

:::tip
Bruk en Node-versjonshåndterer som [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) eller [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) for å bytte mellom Node-versjoner enkelt.
:::

## Utvikling av backend-API

Hvis du planlegger å kjøre API-et lokalt (i stedet for å peke mot demo-API-ene):

| Verktøy | Versjon | Merknader |
|---------|---------|-----------|
| **MySQL** | 8.0+ | Hver API-modul bruker sin egen database |

Du trenger seks databaser for kjerne-API-et: `membership`, `attendance`, `content`, `giving`, `messaging` og `doing`. API-et inkluderer skript for å initialisere skjemaet — se veiledningen [Lokalt API-oppsett](../api/local-setup).

## Utvikling av mobilapper

For B1Mobile, B1Checkin, LessonsScreen eller andre React Native / Expo-apper:

| Verktøy | Versjon | Merknader |
|---------|---------|-----------|
| **Expo CLI** | Nyeste | Installer globalt: `npm install -g expo-cli` |
| **Android Studio** | Nyeste | Kreves for Android-utvikling (inkluderer Android SDK) |
| **Xcode** | Nyeste | Kreves for iOS-utvikling (kun macOS) |

:::info
Du kan bruke Expo Go-appen på en fysisk enhet for rask testing uten Android Studio eller Xcode. Men for å bygge produksjonsbinærfiler kreves de native verktøykjedene.
:::

## FreeShow (skrivebordsapp) utvikling

FreeShow har flere native byggeavhengigheter fordi det kompilerer native Node-moduler (som `canvas`):

### Alle plattformer

| Verktøy | Versjon | Merknader |
|---------|---------|-----------|
| **Python** | 3.12 | Kreves av `node-gyp` for kompilering av native moduler |
| **setuptools** | Nyeste | Installer med `pip install setuptools` |

### Windows

| Verktøy | Merknader |
|---------|-----------|
| **Visual Studio** | Community-utgaven er tilstrekkelig |
| **«Desktop development with C++»-arbeidslasten** | Velg under installasjonen av Visual Studio |
| **Windows 10 SDK** | Inkludert i C++-arbeidslasten; sørg for at den er avkrysset |

Du kan installere Visual Studio build tools via kommandolinjen:

```bash
npm install --global windows-build-tools
```

Eller installer Visual Studio Community og velg arbeidslasten «Desktop development with C++» under installasjonen.

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

- **[Prosjektoversikt](./project-overview)** -- Se alle prosjektene og hva de gjør
- **[Miljøvariabler](./environment-variables)** -- Konfigurer `.env`-filene dine
