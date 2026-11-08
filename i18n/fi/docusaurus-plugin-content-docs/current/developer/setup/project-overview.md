---
title: "Projektin yleiskatsaus"
description: "Kartoita kaikki ChurchApps-tietovarastot kategorioittain: kehykset, kehitysportit, tietokannat ja se, miten jaetut @churchapps-paketit yhdistävät ne kehittäjien asennusohjeissa."
---

# Projektin yleiskatsaus

<div class="article-intro">

ChurchApps koostuu noin 20 itsenäisestä tietovarastosta, jotka on julkaistu [ChurchApps GitHub -organisaatiossa](https://github.com/ChurchApps). Tämä sivu tarjoaa täydellisen luettelon kaikista projekteista kategorioittain sekä niiden kehyksistä, porteista ja suhteista.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna [esivaatimukset](./prerequisites.md) sille projektikategorialle, jonka parissa haluat työskennellä

</div>

## Taustapalvelujen API:t

Kaikki API:t on rakennettu Node.js:llä, Expressillä ja TypeScriptillä, ja ne julkaistaan AWS Lambdaan Serverless Frameworkin kautta.

| Projekti | Tarkoitus | Kehitysportti | Tietokanta |
|---------|----------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Ydinmoduulinen monoliitti, joka kattaa jäsenyyden, läsnäolon, sisällön, lahjoitukset, viestinnän ja toiminnan | 8084 | Erillinen MySQL-tietokanta moduulia kohden (yhteensä 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.churchin taustajärjestelmä | -- | Yksi `lessons`-MySQL-tietokanta |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI:n tekoälykyselytyökalu | -- | -- |

:::info
Ydin**Api**-projekti on moduulinen monoliitti. Jokaisella moduulilla (jäsenyys, läsnäolo, sisältö, lahjoitukset, viestintä, toiminta) on oma tietokantansa, ja siihen pääsee alipolusta, kuten `/membership` tai `/giving`. Tuotannossa nämä on julkaistu erillisinä Lambda-funktioina API Gatewayn takana.
:::

## Verkkosovellukset

| Projekti | Kehys | Kehitysportti | Tarkoitus |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Seurakunnan hallinnan hallintanäkymä |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Seurakunnan jäsenten julkinen sovellus |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.churchin käyttöliittymä |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Tietojen tuonti- ja vientityökalu |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Staattinen | -- | Staattiset seurakuntien esitteelliset verkkosivut |

## Mobiilisovellukset

Kaikki mobiilisovellukset käyttävät React Nativea ja Expoa.

| Projekti | Tarkoitus | Keskeiset versiot |
|---------|--------------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Sisäänkirjautumiskioskisovellus | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV -oppituntinäyttö | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Sisällön toisto (myös TV-käyttöjärjestelmässä) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobiilikaukosäädin FreeShow'lle | Expo |

## Työpöytä

| Projekti | Teknologiapino | Tarkoitus |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Esitys- ja jumalanpalveluksen ohjelmisto |

## Jaetut kirjastot

Jaettu koodi julkaistaan npm-pakettina `@churchapps`-nimiavaruudessa, ja yllä olevat projektit käyttävät sitä tavallisina npm-riippuvuuksina. Kaikki jaetut paketit ovat yhdessä tietovarastossa – [Packages](https://github.com/ChurchApps/Packages) – jota hallitaan Yarn-työtilana ja julkaistaan changesetsin avulla.

| Paketti | Tarkoitus | Käyttäjät |
|---------|---------|---------|
| `@churchapps/helpers` | Peruskäyttöapuohjelmat ja jaetut TypeScript-rajapinnat (DateHelper, ApiHelper, CurrencyHelper jne.) | Kaikki projektit |
| `@churchapps/apihelper` | Express-palvelimen apuohjelmat (todennus, perusohjaimet, tietokantayhteys, AWS-integraatiot) | Kaikki API:t |
| `@churchapps/apphelper` | React-komponenttikirjasto, jossa alipolkumoduulit kirjautumiseen, lahjoituksiin, lomakkeisiin, markdowniin ja verkkosivujen rakentamiseen | Kaikki verkkosovellukset |
| `@churchapps/content-providers` | Kolmannen osapuolen sisältötarjoajien abstraktio (Lessons.church, Planning Center, Dropbox ja muut) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.churchin integraatiotyökalupakki: webhookit, REST-asiakas, OAuth | Ulkoiset integraatiokehittäjät |
| `@churchapps/texting` | SMS-palveluntarjoajien abstraktio | Api |

Katso [Jaetut kirjastot](../shared-libraries/index.md) työtilan asetuksista ja julkaisuprosessista.

## Projektien väliset suhteet

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Kaikki käyttöliittymäsovellukset riippuvat `@churchapps/helpers`-paketista. Verkkosovellukset riippuvat lisäksi `@churchapps/apphelper`-paketeista. Kaikki taustajärjestelmän API:t riippuvat sekä `@churchapps/helpers`- että `@churchapps/apihelper`-paketista.

## Seuraavat vaiheet

- **[Ympäristömuuttujat](./environment-variables.md)** -- Määritä `.env`-tiedostot yhdistääksesi API:hin
- **[API:n paikallinen asennus](../api/local-setup.md)** -- Ota taustajärjestelmän API käyttöön paikallisesti
