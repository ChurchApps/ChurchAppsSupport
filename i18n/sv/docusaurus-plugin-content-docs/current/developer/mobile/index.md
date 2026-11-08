---
title: "Mobilappar"
description: "Översikt över ChurchApps Expo- och React Native-appar, B1 Checkin och LessonsScreen, samt lokala installationssteg för deras gemensamma Expo-verktygskedja."
---

# Mobilappar

<div class="article-intro">

ChurchApps mobilappar är byggda med **React Native** och **Expo**, och ger native-upplevelser på Android, iOS och Android TV. Alla mobilappar delar samma Expo-baserade verktygskedja, så om du kan bygga en av dem kan du bygga alla.

</div>

## Appar

| App | Syfte | Plattform |
|-----|-------|-----------|
| B1 Checkin | Kioskapp för incheckningsstationer | Android, iOS |
| LessonsScreen | Android TV-app för att visa lektioner i klassrum | Android TV |

:::info
Appen som medlemmar använder är B1 App -- avsnittet `/mobile` i B1App, som medlemmar installerar som en Progressive Web App. Den är en webbapp, inte ett Expo-projekt; se [Webbappar](../web-apps/index.md) för att köra den lokalt.
:::

### B1 Checkin

En särskilt utformad kioskapplikation för incheckningsstationer i kyrkor. Den har ett enkelt, pekvänligt gränssnitt som gör det möjligt för medlemmar att checka in barn och registrera närvaro vid gudstjänster och evenemang.

### LessonsScreen

En Android TV-applikation som visar lektionsinnehåll i klassrum. Lärare kan skicka lektionsbilder, videor och aktiviteter till en TV-skärm, vilket gör det enkelt att presentera läroplansmaterial under lektionerna.

## Lokal installation

Alla mobilappar delar samma Expo-baserade verktygskedja och följer liknande installationsmönster. Med B1 Checkin som exempel:

1. Installera **Node.js**, Android Studio (för Android-emulatorn) och Xcode (för iOS-simulatorn, endast macOS) -- se [Förutsättningar](../setup/prerequisites.md).
2. Klona repositoryt och installera beroenden (B1 Checkin använder Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopiera `dotenv.sample.txt` till `.env` och ange vilken miljö appen ska ansluta till (`dev` för ett lokalt API) -- se [Miljövariabler](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Starta Expo-utvecklingsservern med `yarn start` och kör sedan `yarn android` eller `yarn ios` för att starta appen på en emulator eller enhet.

Se [Mobildistribution](../deployment/mobile.md) för releaseversioner och uppdateringar över luften.
