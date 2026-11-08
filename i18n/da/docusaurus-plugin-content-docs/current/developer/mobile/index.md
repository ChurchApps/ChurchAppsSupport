---
title: "Mobilapper"
description: "Oversigt over ChurchApps' Expo- og React Native-mobilapper, B1 Checkin og LessonsScreen, samt lokale opsætningstrin for deres fælles Expo-værktøjskæde."
---

# Mobilapper

<div class="article-intro">

ChurchApps-mobilapper er bygget med **React Native** og **Expo** og giver native oplevelser på Android, iOS og Android TV. Alle mobilapps deler den samme Expo-baserede værktøjskæde, så hvis du kan bygge én, kan du bygge dem alle.

</div>

## Apps

| App | Formål | Platform |
|-----|--------|----------|
| B1 Checkin | Kioskapp til check-in-stationer | Android, iOS |
| LessonsScreen | Android TV-app til visning af lektioner i klasselokaler | Android TV |

:::info
Medlemsappen er B1 App -- `/mobile`-sektionen i B1App, som medlemmer installerer som en Progressive Web App. Den er en webapp, ikke et Expo-projekt; se [Webapps](../web-apps/index.md) for at køre den lokalt.
:::

### B1 Checkin

En specialbygget kioskapplikation designet til check-in-stationer i kirker. Den giver medlemmer en enkel, berøringsvenlig grænseflade til at checke børn ind og registrere fremmøde til gudstjenester og arrangementer.

### LessonsScreen

En Android TV-applikation, der viser lektionsindhold i klasselokaler. Lærere kan sende lektionsslides, videoer og aktiviteter til en tv-skærm, hvilket gør det nemt at præsentere undervisningsmateriale under timerne.

## Lokal opsætning

Alle mobilapps deler den samme Expo-baserede værktøjskæde og følger lignende opsætningsmønstre. Med B1 Checkin som eksempel:

1. Installer **Node.js**, Android Studio (til Android-emulatoren) og Xcode (til iOS-simulatoren, kun macOS) -- se [Forudsætninger](../setup/prerequisites.md).
2. Klon repositoryet og installer afhængigheder (B1 Checkin bruger Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopiér `dotenv.sample.txt` til `.env` og angiv det miljø appen skal forbinde til (`dev` for en lokal API) -- se [Miljøvariabler](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Start Expo-udviklingsserveren med `yarn start`, og kør derefter `yarn android` eller `yarn ios` for at starte appen på en emulator eller enhed.

Se [Mobil-udrulning](../deployment/mobile.md) for udgivelsesbuilds og over-the-air-opdateringer.
