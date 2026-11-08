---
title: "Mobiilisovellukset"
description: "Yleiskatsaus ChurchAppsin Expo- ja React Native -mobiilisovelluksiin, B1 Checkiniin ja LessonsScreeniin sekä paikalliset asennusvaiheet yhteiselle Expo-työkaluketjulle."
---

# Mobiilisovellukset

<div class="article-intro">

ChurchAppsin mobiilisovellukset on rakennettu **React Nativella** ja **Expolla**, ja ne tarjoavat natiivikokemuksen Androidilla, iOS:llä ja Android TV:llä. Kaikki mobiilisovellukset käyttävät samaa Expo-pohjaista työkaluketjua, joten jos osaat rakentaa yhden, osaat rakentaa kaikki.

</div>

## Sovellukset

| Sovellus | Tarkoitus | Alusta |
|-----|---------|----------|
| B1 Checkin | Kioskisovellus tarkastuspisteille | Android, iOS |
| LessonsScreen | Android TV -sovellus oppituntien näyttämiseen luokkahuoneissa | Android TV |

:::info
Jäsenille suunnattu sovellus on B1 App -- B1Appin `/mobile`-osio, jonka jäsenet asentavat progressiivisena web-sovelluksena. Se on web-sovellus, ei Expo-projekti. Katso [Web-sovellukset](../web-apps/index.md) sen paikallista ajamista varten.
:::

### B1 Checkin

Tarkoitukseen rakennettu kioskisovellus, joka on suunniteltu seurakuntien tarkastuspisteisiin. Se tarjoaa yksinkertaisen, kosketusystävällisen käyttöliittymän, jonka avulla jäsenet voivat kirjata lapsia sisään ja merkitä läsnäolon jumalanpalveluksiin ja tapahtumiin.

### LessonsScreen

Android TV -sovellus, joka näyttää oppituntien sisältöä luokkahuoneissa. Opettajat voivat lähettää oppituntien diat, videot ja tehtävät TV-ruudulle, mikä helpottaa opetussuunnitelman materiaalin esittämistä tuntien aikana.

## Paikallinen asennus

Kaikki mobiilisovellukset käyttävät samaa Expo-pohjaista työkaluketjua ja noudattavat samankaltaisia asennusmalleja. Esimerkkinä käytetään B1 Checkinia:

1. Asenna **Node.js**, Android Studio (Android-emulaattoria varten) ja Xcode (iOS-simulaattoria varten, vain macOS). Katso [Esivaatimukset](../setup/prerequisites.md).
2. Kloonaa repositorio ja asenna riippuvuudet (B1 Checkin käyttää Yarnia):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopioi `dotenv.sample.txt` tiedostoksi `.env` ja aseta ympäristö, johon sovelluksen tulee yhdistää (`dev` paikalliselle API:lle). Katso [Ympäristömuuttujat](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Käynnistä Expo-kehityspalvelin komennolla `yarn start` ja suorita sitten `yarn android` tai `yarn ios` sovelluksen käynnistämiseksi emulaattorissa tai laitteella.

Katso [Mobiilijulkaisu](../deployment/mobile.md) julkaisuversioiden ja over-the-air-päivitysten osalta.
