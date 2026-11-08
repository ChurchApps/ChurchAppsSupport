---
title: "Mobiele deployment"
description: "Doorloop het bouwen van Android- en iOS-releases van Expo-apps zoals B1 Checkin, het indienen daarvan bij de app-stores en het publiceren van OTA-updates met EAS."
---

# Mobiele deployment

<div class="article-intro">

De Expo-mobiele apps van ChurchApps, zoals B1 Checkin, worden gebouwd met **Expo EAS Build** of een lokale Gradle-build en via de app-stores verspreid. Deze pagina behandelt het bouwen, indienen en publiceren van over-the-air-updates voor zowel Android als iOS, met B1 Checkin als voorbeeld.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Stel de app lokaal in -- zie [Mobiele apps](../mobile/index.md#local-setup)
- Installeer en configureer de [EAS CLI](https://docs.expo.dev/eas/)
- Zorg dat je toegang hebt tot de Google Play Console (Android) en/of Apple App Store Connect (iOS)

</div>

## Bouwen

### Android

Android-releasebuilds worden lokaal uitgevoerd en ondertekend met de releasekeystore van EAS. Download deze eenmalig met `npx eas-cli credentials -p android` (kies **credentials.json: Download credentials from EAS**) en voer daarna uit:

```bash
yarn build:android
```

De Google Play-bundel wordt geschreven naar `android/app/build/outputs/bundle/release/app-release.aab`. Wil je in plaats daarvan op EAS bouwen, voer dan `yarn build:android:eas` uit.

### iOS

iOS-builds worden altijd op EAS uitgevoerd:

```bash
yarn build:ios
```

## Indienen bij app-stores

### Android -- Google Play Store

Upload de AAB via de Play Console, of dien hem in met EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Dien de iOS-build rechtstreeks in via EAS:

```bash
eas submit --platform ios
```

## OTA-updates

Gebruik voor wijzigingen die alleen JavaScript betreffen en geen beoordeling door de app-store vereisen over-the-air (OTA)-updates:

```bash
yarn update
```

Dit gebruikt EAS Update om wijzigingen zonder volledige store-indiening direct naar gebruikers te sturen.

:::tip
OTA-updates zijn aanzienlijk sneller dan store-builds -- wijzigingen kunnen gebruikers binnen minuten bereiken in plaats van dagen. Gebruik ze voor bugfixes, tekstwijzigingen en kleine UI-aanpassingen die geen native code-wijzigingen vereisen.
:::

## Versienummers

Voordat je een store-build maakt, moeten de versienummers in meerdere bestanden worden bijgewerkt:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` en `versionCode`)

Het iOS-buildnummer wordt automatisch door EAS verhoogd.

:::warning
Als je de versienummers in alle bestanden niet bijwerkt, leidt dit tot buildfouten of afwijzing door de app-store. Controleer elk van de hierboven genoemde bestanden nogmaals voordat je een productiebuild start.
:::

## Gerelateerde artikelen

- **[Mobiele apps](../mobile/index.md)** -- Handleiding voor lokale installatie en ontwikkeling
- **[API-deployment](./apis.md)** -- De backend-API's uitrollen
- **[Webapp-deployment](./web-apps.md)** -- De frontend-webapplicaties uitrollen
