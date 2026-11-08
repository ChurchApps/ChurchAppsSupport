---
title: "Mobildistribution"
description: "Steg för steg genom att bygga Android- och iOS-versioner av Expo-appar som B1 Checkin, skicka in dem till appbutikerna och publicera OTA-uppdateringar med EAS."
---

# Mobildistribution

<div class="article-intro">

ChurchApps Expo-mobilappar, till exempel B1 Checkin, byggs med **Expo EAS Build** eller en lokal Gradle-build och distribueras via appbutikerna. Den här sidan beskriver hur du bygger, skickar in och publicerar över-the-air-uppdateringar (OTA) för både Android och iOS, med B1 Checkin som exempel.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera appen lokalt -- se [Mobilappar](../mobile/index.md#local-setup)
- Installera och konfigurera [EAS CLI](https://docs.expo.dev/eas/)
- Ha åtkomst till Google Play Console (Android) och/eller Apple App Store Connect (iOS)

</div>

## Bygga

### Android

Android-releaseversioner byggs lokalt och signeras med releasenyckelfilen från EAS. Ladda ner den en gång med `npx eas-cli credentials -p android` (välj **credentials.json: Download credentials from EAS**) och kör sedan:

```bash
yarn build:android
```

Google Play-paketet skrivs till `android/app/build/outputs/bundle/release/app-release.aab`. Vill du i stället bygga på EAS kör du `yarn build:android:eas`.

### iOS

iOS-versioner byggs alltid på EAS:

```bash
yarn build:ios
```

## Skicka in till appbutikerna

### Android -- Google Play Store

Ladda upp AAB-filen via Play Console, eller skicka in den med EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Skicka iOS-versionen direkt via EAS:

```bash
eas submit --platform ios
```

## OTA-uppdateringar

För ändringar som enbart gäller JavaScript och inte kräver granskning i appbutiken använder du över-the-air-uppdateringar (OTA):

```bash
yarn update
```

Detta använder EAS Update för att skicka ändringarna direkt till användarna utan en fullständig inlämning till butiken.

:::tip
OTA-uppdateringar är betydligt snabbare än butiksversioner -- ändringarna kan nå användarna på några minuter i stället för dagar. Använd dem för felrättningar, textändringar och mindre UI-justeringar som inte innefattar ändringar i native-kod.
:::

## Versionsnummer

Innan du skapar en butiksversion måste versionsnumren uppdateras i flera filer:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` och `versionCode`)

iOS-byggnumret ökas automatiskt av EAS.

:::warning
Om du glömmer att uppdatera versionsnumren i alla filer riskerar du byggfel eller att appen underkänns av appbutiken. Kontrollera varje fil i listan ovan innan du startar en produktionsbuild.
:::

## Relaterade artiklar

- **[Mobilappar](../mobile/index.md)** -- Lokal konfiguration och utvecklingsguide
- **[API-distribution](./apis.md)** -- Distribuera backend-API:erna
- **[Webbappsdistribution](./web-apps.md)** -- Distribuera frontend-webbapplikationerna
