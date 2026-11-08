---
title: "Mobildistribution"
description: "Gennemgang af hvordan du bygger Android- og iOS-udgivelser af Expo-apps såsom B1 Checkin, indsender dem til app-butikkerne og udgiver OTA-opdateringer med EAS."
---

# Mobildistribution

<div class="article-intro">

ChurchApps' Expo-mobilapps, såsom B1 Checkin, bygges med **Expo EAS Build** eller en lokal Gradle-build og distribueres via app-butikkerne. Denne side dækker opbygning, indsendelse og udgivelse af over-the-air-opdateringer til både Android og iOS, med B1 Checkin som eksempel.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Opsæt appen lokalt -- se [Mobilapps](../mobile/index.md#local-setup)
- Installér og konfigurér [EAS CLI](https://docs.expo.dev/eas/)
- Har adgang til Google Play Console (Android) og/eller Apple App Store Connect (iOS)

</div>

## Opbygning

### Android

Android-udgivelsesbuilds køres lokalt og signeres med udgivelsesnøglen fra EAS. Hent den én gang med `npx eas-cli credentials -p android` (vælg **credentials.json: Download credentials from EAS**), og kør derefter:

```bash
yarn build:android
```

Google Play-bundlen skrives til `android/app/build/outputs/bundle/release/app-release.aab`. Vil du i stedet bygge på EAS, kører du `yarn build:android:eas`.

### iOS

iOS-builds kører altid på EAS:

```bash
yarn build:ios
```

## Indsendelse til app-butikkerne

### Android -- Google Play Store

Upload AAB-filen via Play Console, eller indsend den med EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Indsend iOS-buildet direkte via EAS:

```bash
eas submit --platform ios
```

## OTA-opdateringer

Til ændringer af kun JavaScript, som ikke kræver gennemgang i app-butikken, bruger du over-the-air-opdateringer (OTA):

```bash
yarn update
```

Dette bruger EAS Update til at sende ændringer direkte til brugerne uden en fuld indsendelse til butikken.

:::tip
OTA-opdateringer er betydeligt hurtigere end butiksbuilds -- ændringer kan nå brugerne på få minutter i stedet for dage. Brug dem til fejlrettelser, tekstændringer og mindre UI-justeringer, som ikke involverer ændringer i native kode.
:::

## Versionsnumre

Før du opretter en butiksbuild, skal versionsnumrene opdateres i flere filer:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` og `versionCode`)

iOS-buildnummeret forhøjes automatisk af EAS.

:::warning
Hvis du glemmer at opdatere versionsnumrene i alle filer, vil det medføre buildfejl eller afvisning fra app-butikken. Tjek hver fil på listen igen, før du starter en produktionsbuild.
:::

## Relaterede artikler

- **[Mobilapps](../mobile/index.md)** -- Lokal opsætning og udviklingsguide
- **[API-distribution](./apis.md)** -- Udrulning af backend-API'erne
- **[Webapp-distribution](./web-apps.md)** -- Udrulning af frontend-webapplikationerne
