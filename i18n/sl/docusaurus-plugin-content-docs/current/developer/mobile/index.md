---
title: "Mobilne aplikacije"
description: "Pregled mobilnih aplikacij ChurchApps, ki temeljijo na Expo in React Native, B1 Checkin in LessonsScreen, ter lokalni koraki namestitve za njuno skupno orodje Expo."
---

# Mobilne aplikacije

<div class="article-intro">

Mobilne aplikacije ChurchApps so zgrajene z **React Native** in **Expo** ter ponujajo nativno izkušnjo na Androidu, iOS-u in Android TV. Vse mobilne aplikacije uporabljajo isto orodje, ki temelji na Expo, zato če znate zgraditi eno, znate zgraditi vse.

</div>

## Aplikacije

| Aplikacija | Namen | Platforma |
|-----|---------|----------|
| B1 Checkin | Samostojna aplikacija (kiosk) za prijavne postaje | Android, iOS |
| LessonsScreen | Aplikacija za Android TV za prikaz lekcij v učilnicah | Android TV |

:::info
Aplikacija za člane je B1 App -- razdelek `/mobile` v B1App, ki ga člani namestijo kot Progressive Web App (PWA). Gre za spletno aplikacijo, ne za projekt Expo; za lokalni zagon glejte [Spletne aplikacije](../web-apps/index.md).
:::

### B1 Checkin

Namensko zasnovana aplikacija za samostojno prijavo (kiosk) na prijavnih postajah v cerkvah. Ponuja preprost vmesnik, prilagojen dotiku, ki članom omogoča prijavo otrok in beleženje udeležbe na bogoslužjih in dogodkih.

### LessonsScreen

Aplikacija za Android TV, ki prikazuje vsebino lekcij v učilnicah. Učitelji lahko na zaslon televizorja pošljejo diapozitive lekcij, videoposnetke in aktivnosti, kar omogoča enostavno predstavitev učnega gradiva med urami.

## Lokalna namestitev

Vse mobilne aplikacije uporabljajo isto orodje, ki temelji na Expo, in sledijo podobnim vzorcem namestitve. Na primeru B1 Checkin:

1. Namestite **Node.js**, Android Studio (za emulator Androida) in Xcode (za simulator iOS-a, samo na macOS-u) -- glejte [Predpogoji](../setup/prerequisites.md).
2. Klonirajte repozitorij in namestite odvisnosti (B1 Checkin uporablja Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Skopirajte `dotenv.sample.txt` v `.env` in nastavite okolje (stage), s katerim naj se aplikacija poveže (`dev` za lokalni API) -- glejte [Spremenljivke okolja](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Zaženite razvojni strežnik Expo z ukazom `yarn start`, nato pa z ukazom `yarn android` ali `yarn ios` zaženite aplikacijo na emulatorju ali napravi.

Za izdaje (release builds) in posodobitve prek zraka (OTA) glejte [Namestitev mobilnih aplikacij](../deployment/mobile.md).
