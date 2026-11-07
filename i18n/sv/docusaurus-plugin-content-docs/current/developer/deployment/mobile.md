---
title: "Mobildistribution"
description: "Steg för steg: bygga Android- och iOS-versioner av B1 Mobile-appen med Expo EAS, skicka in dem till appbutikerna och publicera OTA-uppdateringar."
---

# Mobildistribution

<div class="article-intro">

ChurchApps mobilappar byggs och distribueras med **Expo EAS Build** och levereras via appbutikerna. Den här sidan beskriver hur du bygger, skickar in och publicerar over-the-air-uppdateringar för både Android och iOS.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera mobilappen lokalt -- se [B1 Mobile](../mobile/b1-mobile.md)
- Installera och konfigurera [EAS CLI](https://docs.expo.dev/eas/)
- Ha åtkomst till Google Play Console (Android) och/eller Apple App Store Connect (iOS)

</div>

## Bygga

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Skicka till appbutikerna

### Android -- Google Play Store

När en EAS-build har lyckats skickas Android-binären (AAB) till Google Play Store via Play Console.

### iOS -- Apple App Store

Skicka iOS-bygget direkt via EAS:

```bash
eas submit --platform ios
```

## OTA-uppdateringar

För ändringar som enbart berör JavaScript och inte kräver granskning i appbutikerna använder du over-the-air-uppdateringar (OTA):

```bash
npm run update:production
```

Detta använder EAS Update för att skicka ändringar direkt till användarna utan att skicka in appen till butiken.

:::tip
OTA-uppdateringar går betydligt snabbare än butiksbygg -- ändringar kan nå användarna på minuter i stället för dagar. Använd dem för felrättningar, textändringar och mindre gränssnittsjusteringar som inte innefattar ändringar i native-kod.
:::

## Versionsnummer

Innan du skapar ett butiksbygg måste versionsnumren uppdateras i flera filer:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Om du glömmer att uppdatera versionsnumren i alla filer leder det till byggfel eller att appen avvisas av butiken. Kontrollera varje fil i listan ovan innan du startar ett produktionsbygge.
:::

## Relaterade artiklar

- **[B1 Mobile](../mobile/b1-mobile.md)** -- Lokal konfiguration och utvecklingsguide
- **[API-distribution](./apis.md)** -- Distribution av backend-API:erna
- **[Distribution av webbappar](./web-apps.md)** -- Distribution av frontend-webbapparna
