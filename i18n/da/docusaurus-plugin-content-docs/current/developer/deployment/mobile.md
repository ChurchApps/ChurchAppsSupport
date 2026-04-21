---
title: "Mobilinstallation"
---

# Mobilinstallation

<div class="article-intro">

ChurchApps mobilapps bygges og implementeres ved hjælp af **Expo EAS Build** og distribueres gennem app-butikkerne. Denne side dækker byggeri, indlevering og pushing af over-the-air-opdateringer til både Android og iOS.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsætning af mobilapp lokalt -- se [B1 Mobile](../mobile/b1-mobile)
- Installer og konfigurér [EAS CLI](https://docs.expo.dev/eas/)
- Har adgang til Google Play Console (Android) og/eller Apple App Store Connect (iOS)

</div>

## Bygger

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Indsend til App Stores

### Android -- Google Play Store

Efter en vellykket EAS-build indsends Android-binæren (AAB) til Google Play Store gennem Play Console.

### iOS -- Apple App Store

Indsend iOS-bygget direkte via EAS:

```bash
eas submit --platform ios
```

## OTA-opdateringer

For JavaScript-kun-ændringer, der ikke kræver app store-gennemsyn, skal du bruge over-the-air (OTA) opdateringer:

```bash
npm run update:production
```

Dette bruger EAS Update til at skubbe ændringer direkte til brugerne uden en fuld butikindsendelse.

:::tip
OTA-opdateringer er betydeligt hurtigere end butiksbyg -- ændringer kan nå brugerne på få minutter i stedet for dage. Brug dem til fejlrettelser, kopieringsændringer og mindre brugergrænsefladeændringer, der ikke involverer native code-ændringer.
:::

## Versionsnumre

Før oprettelse af en butiksbygging skal versionsnumre opdateres i flere filer:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Hvis du glemmer at opdatere versionsnumre i alle filer, vil det forårsage bygnefejl eller afvisning af app store. Dobbeltkontroller hver fil, der er anført ovenfor, før du starter en produktionsbyg.
:::

## Relaterede artikler

- **[B1 Mobile](../mobile/b1-mobile)** -- Lokalt setup og udviklingsvejledning
- **[API-installation](./apis)** -- Installation af backend-API'erne
- **[Webapp-installation](./web-apps)** -- Installation af frontend-webapplikationer
