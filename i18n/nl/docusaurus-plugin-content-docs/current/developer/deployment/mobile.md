---
title: "Mobile Deployment"
---

# Mobile Deployment

<div class="article-intro">

ChurchApps mobiele apps worden gebouwd en geïmplementeerd met behulp van **Expo EAS Build** en verdeeld via de app-stores. Deze pagina behandelt het bouwen, indienen en pushen van over-the-air-updates voor zowel Android als iOS.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel de mobiele app lokaal in -- zie [B1 Mobile](../mobile/b1-mobile)
- Installeer en configureer de [EAS CLI](https://docs.expo.dev/eas/)
- Hebben toegang tot Google Play Console (Android) en/of Apple App Store Connect (iOS)

</div>

## Bouwen

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Indienen bij App-Stores

### Android -- Google Play Store

Na een succesvolle EAS-build wordt het Android-binaire bestand (AAB) via de Play Console ingediend in Google Play Store.

### iOS -- Apple App Store

Dien de iOS-build rechtstreeks in via EAS:

```bash
eas submit --platform ios
```

## OTA-updates

Voor JavaScript-only-wijzigingen waarvoor geen app-store-beoordeling vereist is, gebruikt u over-the-air (OTA)-updates:

```bash
npm run update:production
```

Dit gebruikt EAS Update om wijzigingen rechtstreeks naar gebruikers te pushen zonder volledige store-indiening.

:::tip
OTA-updates zijn aanzienlijk sneller dan store-builds -- wijzigingen kunnen gebruikers in minuten bereiken in plaats van dagen. Gebruik ze voor bugfixes, kopiewijzigingen en kleine UI-updates die geen wijzigingen in native code inhouden.
:::

## Versienummers

Voordat u een store-build maakt, moeten versienummers in meerdere bestanden worden bijgewerkt:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Het vergeten om versienummers in alle bestanden bij te werken, veroorzaakt bouwfouten of afwijzing door app-store. Controleer voordien elk bovenstaand bestand voordat u een productiebuild start.
:::

## Gerelateerde Artikelen

- **[B1 Mobile](../mobile/b1-mobile)** -- Lokale setup- en ontwikkelingsgids
- **[API Deployment](./apis)** -- De backend-API's implementeren
- **[Web App Deployment](./web-apps)** -- De frontend web-applicaties implementeren
