---
title: "Mobile-apps"
description: "Overzicht van de Expo- en React Native-mobiele apps van ChurchApps, B1 Checkin en LessonsScreen, plus lokale installatiestappen voor hun gedeelde Expo-toolchain."
---

# Mobile-apps

<div class="article-intro">

De mobiele apps van ChurchApps zijn gebouwd met **React Native** en **Expo** en bieden native ervaringen op Android, iOS en Android TV. Alle mobiele apps delen dezelfde Expo-gebaseerde toolchain, dus als je er één kunt bouwen, kun je ze allemaal bouwen.

</div>

## Apps

| App | Doel | Platform |
|-----|---------|----------|
| B1 Checkin | Kioskapp voor incheckstations | Android, iOS |
| LessonsScreen | Android TV-app voor het weergeven van lessen in klaslokalen | Android TV |

:::info
De app voor leden is de B1 App -- de sectie `/mobile` van B1App, die leden installeren als Progressive Web App. Het is een webapp, geen Expo-project; zie [Webapps](../web-apps/index.md) om deze lokaal uit te voeren.
:::

### B1 Checkin

Een speciaal ontworpen kioskapplicatie voor incheckstations in kerken. Het biedt een eenvoudige, aanraakvriendelijke interface waarmee leden kinderen kunnen inchecken en aanwezigheid bij diensten en evenementen kunnen registreren.

### LessonsScreen

Een Android TV-applicatie die lesinhoud in klaslokalen weergeeft. Docenten kunnen lesdia's, video's en activiteiten naar een tv-scherm sturen, waardoor het eenvoudig is om lesmateriaal tijdens lessen te presenteren.

## Lokale installatie

Alle mobiele apps delen dezelfde Expo-gebaseerde toolchain en volgen vergelijkbare installatiepatronen. Met B1 Checkin als voorbeeld:

1. Installeer **Node.js**, Android Studio (voor de Android-emulator) en Xcode (voor de iOS-simulator, alleen macOS) -- zie [Vereisten](../setup/prerequisites.md).
2. Kloon de repository en installeer de afhankelijkheden (B1 Checkin gebruikt Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Kopieer `dotenv.sample.txt` naar `.env` en stel de omgeving in waarmee de app verbinding moet maken (`dev` voor een lokale API) -- zie [Omgevingsvariabelen](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Start de Expo-ontwikkelserver met `yarn start` en voer vervolgens `yarn android` of `yarn ios` uit om de app op een emulator of apparaat te starten.

Zie [Mobiele implementatie](../deployment/mobile.md) voor releasebuilds en over-the-air-updates.
