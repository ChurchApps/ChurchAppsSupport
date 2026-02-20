---
title: "Mobildistribusjon"
---

# Mobildistribusjon

<div class="article-intro">

ChurchApps mobilapper bygges og distribueres ved hjelp av **Expo EAS Build** og distribueres gjennom appbutikkene. Denne siden dekker bygging, innsending og utsending av trådløse oppdateringer for både Android og iOS.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp mobilappen lokalt -- se [B1 Mobile](../mobile/b1-mobile)
- Installer og konfigurer [EAS CLI](https://docs.expo.dev/eas/)
- Ha tilgang til Google Play Console (Android) og/eller Apple App Store Connect (iOS)

</div>

## Bygging

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Sende inn til appbutikker

### Android -- Google Play Store

Etter en vellykket EAS-bygging sendes Android-binæren (AAB) inn til Google Play Store gjennom Play Console.

### iOS -- Apple App Store

Send inn iOS-byggingen direkte via EAS:

```bash
eas submit --platform ios
```

## OTA-oppdateringer

For endringer som kun gjelder JavaScript og ikke krever gjennomgang i appbutikken, bruk trådløse (OTA) oppdateringer:

```bash
npm run update:production
```

Dette bruker EAS Update for å sende endringer direkte til brukerne uten en full butikkinnsending.

:::tip
OTA-oppdateringer er betydelig raskere enn butikkbygginger -- endringer kan nå brukerne i løpet av minutter i stedet for dager. Bruk dem til feilrettinger, tekstendringer og mindre UI-oppdateringer som ikke involverer endringer i native kode.
:::

## Versjonsnumre

Før du oppretter en butikkbygging, må versjonsnumre oppdateres i flere filer:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Å glemme å oppdatere versjonsnumre i alle filer vil føre til byggefeil eller avvisning fra appbutikken. Dobbeltsjekk hver fil som er listet ovenfor før du starter en produksjonsbygging.
:::

## Relaterte artikler

- **[B1 Mobile](../mobile/b1-mobile)** -- Lokalt oppsett og utviklingsguide
- **[API-distribusjon](./apis)** -- Distribuere backend-API-ene
- **[Webappdistribusjon](./web-apps)** -- Distribuere frontend-webapplikasjonene
