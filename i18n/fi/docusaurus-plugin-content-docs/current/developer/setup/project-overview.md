---
title: "Projektin yleiskatsaus"
---

# Projektin yleiskatsaus

<div class="article-intro">

ChurchAppsiin kuuluu noin 20 itsenäistä repositoriota, joista jokainen on julkaistu [ChurchApps GitHub -organisaatiossa](https://github.com/ChurchApps). Tämä sivu tarjoaa täydellisen luettelon kaikista projekteista kategorioittain sekä niiden kehyksistä, porteista ja keskinäisistä suhteista.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna sen projektikategorian [esivaatimukset](./prerequisites), jonka parissa haluat työskennellä

</div>

## Taustapalvelun API:t

Kaikki API:t on rakennettu Node.js:llä, Expressillä ja TypeScriptillä, ja ne julkaistaan AWS Lambdaan Serverless Frameworkin kautta.

| Projekti | Tarkoitus | Kehitysportti | Tietokanta |
|---------|-----------|---------------|------------|
| **[Api](https://github.com/ChurchApps/Api)** | Ydin modulaarinen monoliitti, joka kattaa jäsenyyden, läsnäolon, sisällön, lahjoitukset, viestinnän ja toiminnot (doing) | 8084 | Erillinen MySQL-tietokanta moduulia kohden (yhteensä 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church-taustapalvelu | -- | Yksi `lessons`-MySQL-tietokanta |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI:n tehoama tekoälykyselytyökalu | -- | -- |

:::info
Ydin **Api**-projekti on modulaarinen monoliitti. Jokainen moduuli (membership, attendance, content, giving, messaging, doing) on omalla tietokannallaan, ja siihen pääsee alipolun kautta, kuten `/membership` tai `/giving`. Tuotannossa nämä on julkaistu erillisinä Lambda-funktioina API Gatewayn takana.
:::

## Verkkosovellukset

| Projekti | Kehys | Kehitysportti | Tarkoitus |
|---------|-------|---------------|-----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Seurakunnan hallinnan kojelauta |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Seurakunnan jäsenten julkinen sovellus |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church-käyttöliittymä |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Tietojen tuonti- ja vientityökalu |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Staattinen | -- | Seurakuntien staattiset esitteet verkkosivuina |

## Mobiilisovellukset

Kaikki mobiilisovellukset käyttävät React Nativea ja Expoa.

| Projekti | Tarkoitus | Tärkeimmät versiot |
|---------|-----------|--------------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Seurakunnan jäsenten sovellus iOS- ja Android-laitteille | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Sisäänkirjautumiskioskin sovellus | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV -opetusnäyttö | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Sisällön toisto (mukaan lukien TV-käyttöjärjestelmät) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobiilikaukosäädin FreeShow-ohjelmalle | Expo |

## Työpöytä

| Projekti | Teknologiapino | Tarkoitus |
|---------|----------------|-----------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Esitys- ja jumalanpalveluksen ohjelmisto |

## Jaetut kirjastot

Jaettu koodi julkaistaan npm:ään `@churchapps`-nimiavaruudessa, ja yllä olevat projektit käyttävät sitä tavallisina npm-riippuvuuksina. Kaikki jaetut paketit sijaitsevat yhdessä repositoriossa – [Packages](https://github.com/ChurchApps/Packages) – jota hallitaan Yarn-työtilana ja julkaistaan changesetsin avulla.

| Paketti | Tarkoitus | Käyttäjät |
|---------|-----------|-----------|
| `@churchapps/helpers` | Perustyökalut ja jaetut TypeScript-rajapinnat (DateHelper, ApiHelper, CurrencyHelper jne.) | Kaikki projektit |
| `@churchapps/apihelper` | Express-palvelimen apuvälineet (todennus, perusohjaimet, tietokantayhteys, AWS-integraatiot) | Kaikki API:t |
| `@churchapps/apphelper` | React-komponenttikirjasto, jossa on alipolkumoduulit kirjautumiseen, lahjoituksiin, lomakkeisiin, Markdowniin ja verkkosivujen rakentamiseen | Kaikki verkkosovellukset |
| `@churchapps/content-providers` | Kolmannen osapuolen sisältölähteiden abstraktio (Lessons.church, Planning Center, Dropbox ja muut) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church-integraatiotyökalupakki: webhookit, REST-asiakas, OAuth | Ulkoiset integraatiokehittäjät |
| `@churchapps/texting` | SMS-palveluntarjoajan abstraktio | Api |

Katso [Jaetut kirjastot](../shared-libraries/) työtilan asetuksista ja julkaisuprosessista.

## Projektien väliset suhteet

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Kaikki käyttöliittymäsovellukset riippuvat paketista `@churchapps/helpers`. Verkkosovellukset riippuvat lisäksi `@churchapps/apphelper`-paketeista. Kaikki taustapalvelun API:t riippuvat sekä paketista `@churchapps/helpers` että paketista `@churchapps/apihelper`.

## Seuraavat vaiheet

- **[Ympäristömuuttujat](./environment-variables)** -- Määritä `.env`-tiedostosi yhdistääksesi API:hin
- **[API:n paikallinen asennus](../api/local-setup)** -- Asenna taustapalvelun API paikallisesti
