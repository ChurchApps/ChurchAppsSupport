---
title: "Mobildistribusjon"
description: "Gjennomgår hvordan du bygger Android- og iOS-utgaver av Expo-apper som B1 Checkin, sender dem til appbutikkene og publiserer OTA-oppdateringer med EAS."
---

# Mobildistribusjon

<div class="article-intro">

ChurchApps' Expo-mobilapper, som B1 Checkin, bygges med **Expo EAS Build** eller et lokalt Gradle-bygg og distribueres gjennom appbutikkene. Denne siden dekker bygging, innsending og publisering av over-the-air (OTA)-oppdateringer for både Android og iOS, med B1 Checkin som eksempel.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp appen lokalt – se [Mobilapper](../mobile/index.md#local-setup)
- Installer og konfigurer [EAS CLI](https://docs.expo.dev/eas/)
- Ha tilgang til Google Play Console (Android) og/eller Apple App Store Connect (iOS)

</div>

## Bygging

### Android

Android-utgaver bygges lokalt og signeres med utgivelsesnøkkelen fra EAS. Last ned nøkkelen én gang med `npx eas-cli credentials -p android` (velg **credentials.json: Download credentials from EAS**), og kjør deretter:

```bash
yarn build:android
```

Google Play-pakken skrives til `android/app/build/outputs/bundle/release/app-release.aab`. For å bygge på EAS i stedet, kjør `yarn build:android:eas`.

### iOS

iOS-bygg kjøres alltid på EAS:

```bash
yarn build:ios
```

## Innsending til appbutikkene

### Android – Google Play Store

Last opp AAB-filen via Play Console, eller send den inn med EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS – Apple App Store

Send iOS-bygget direkte via EAS:

```bash
eas submit --platform ios
```

## OTA-oppdateringer

For endringer som kun gjelder JavaScript, og som ikke krever gjennomgang i appbutikken, bruk over-the-air (OTA)-oppdateringer:

```bash
yarn update
```

Dette bruker EAS Update til å sende endringer direkte til brukere uten en fullstendig innsending til butikken.

:::tip
OTA-oppdateringer er betydelig raskere enn butikkbygg – endringer kan nå brukerne på minutter i stedet for dager. Bruk dem til feilrettinger, tekstendringer og mindre UI-oppdateringer som ikke innebærer endringer i native kode.
:::

## Versjonsnumre

Før du lager et butikkbygg, må versjonsnumrene oppdateres i flere filer:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` og `versionCode`)

Build-nummeret for iOS økes automatisk av EAS.

:::warning
Hvis du glemmer å oppdatere versjonsnumrene i alle filene, vil det føre til byggefeil eller avvisning fra appbutikken. Kontroller hver fil i listen over grundig før du starter et produksjonsbygg.
:::

## Relaterte artikler

- **[Mobilapper](../mobile/index.md)** – Oppsett lokalt og utviklingsveiledning
- **[API-distribusjon](./apis.md)** – Distribusjon av backend-API-ene
- **[Distribusjon av webapper](./web-apps.md)** – Distribusjon av frontend-webapplikasjonene
