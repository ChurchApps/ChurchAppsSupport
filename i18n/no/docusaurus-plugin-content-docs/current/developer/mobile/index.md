---
title: "Mobilapper"
description: "Oversikt over ChurchApps' Expo- og React Native-mobilapper, B1 Checkin og LessonsScreen, samt lokale oppsettstrinn for deres felles Expo-verktøykjede."
---

# Mobilapper

<div class="article-intro">

ChurchApps-mobilappene er bygget med **React Native** og **Expo**, og gir native opplevelser på Android, iOS og Android TV. Alle mobilappene deler den samme Expo-baserte verktøykjeden, så hvis du kan bygge én, kan du bygge dem alle.

</div>

## Apper

| App | Formål | Plattform |
|-----|--------|-----------|
| B1 Checkin | Kioskapp for innsjekkingsstasjoner | Android, iOS |
| LessonsScreen | Android TV-app for visning av leksjoner i klasserom | Android TV |

:::info
Medlemsappen er B1 App – `/mobile`-delen av B1App, som medlemmene installerer som en progressiv webapp. Den er en webapp, ikke et Expo-prosjekt. Se [Webapper](../web-apps/index.md) for å kjøre den lokalt.
:::

### B1 Checkin

En spesialbygd kioskapplikasjon for innsjekkingsstasjoner i kirker. Den gir et enkelt, berøringsvennlig grensesnitt der medlemmer kan sjekke inn barn og registrere oppmøte på gudstjenester og arrangementer.

### LessonsScreen

En Android TV-applikasjon som viser leksjonsinnhold i klasserom. Lærere kan sende leksjonslysbilder, videoer og aktiviteter til en TV-skjerm, slik at det blir enkelt å presentere undervisningsmateriell i timene.

## Lokalt oppsett

Alle mobilappene deler den samme Expo-baserte verktøykjeden og følger lignende oppsettmønstre. Med B1 Checkin som eksempel:

1. Installer **Node.js**, Android Studio (for Android-emulatoren) og Xcode (for iOS-simulatoren, kun macOS). Se [Forutsetninger](../setup/prerequisites.md).
2. Klon repositoriet og installer avhengigheter (B1 Checkin bruker Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopier `dotenv.sample.txt` til `.env` og angi miljøet appen skal koble til (`dev` for en lokal API). Se [Miljøvariabler](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Start Expo-utviklingsserveren med `yarn start`, og kjør deretter `yarn android` eller `yarn ios` for å starte appen på en emulator eller enhet.

Se [Mobil distribusjon](../deployment/mobile.md) for utgivelsesbygg og oppdateringer over lufta (over-the-air).
