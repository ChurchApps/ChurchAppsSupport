---
title: "Pag-deploy ng Mobile App"
description: "Gabay sa paggawa ng Android at iOS release ng mga Expo app tulad ng B1 Checkin, pagsusumite ng mga ito sa app store, at pag-push ng OTA update gamit ang EAS."
---

# Pag-deploy ng Mobile App

<div class="article-intro">

Ang mga Expo mobile app ng ChurchApps, gaya ng B1 Checkin, ay ginagawa gamit ang **Expo EAS Build** o lokal na Gradle build at ipinamamahagi sa pamamagitan ng mga app store. Tinatalakay ng pahinang ito ang paggawa, pagsusumite, at pag-push ng over-the-air na update para sa Android at iOS, gamit ang B1 Checkin bilang halimbawa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang app nang lokal -- tingnan ang [Mga Mobile App](../mobile/index.md#local-setup)
- I-install at i-configure ang [EAS CLI](https://docs.expo.dev/eas/)
- Magkaroon ng access sa Google Play Console (Android) at/o Apple App Store Connect (iOS)

</div>

## Paggawa ng Build

### Android

Ang mga Android release build ay tumatakbo nang lokal at pinipirmahan gamit ang release keystore mula sa EAS. I-download ito nang isang beses gamit ang `npx eas-cli credentials -p android` (piliin ang **credentials.json: Download credentials from EAS**), pagkatapos ay patakbuhin ang:

```bash
yarn build:android
```

Ang Google Play bundle ay isusulat sa `android/app/build/outputs/bundle/release/app-release.aab`. Para mag-build sa EAS, patakbuhin ang `yarn build:android:eas`.

### iOS

Ang mga iOS build ay palaging tumatakbo sa EAS:

```bash
yarn build:ios
```

## Pagsusumite sa App Store

### Android -- Google Play Store

I-upload ang AAB sa pamamagitan ng Play Console, o isumite ito gamit ang EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

I-submit ang iOS build nang direkta sa pamamagitan ng EAS:

```bash
eas submit --platform ios
```

## OTA Update

Para sa mga pagbabagong JavaScript lamang na hindi nangangailangan ng pagsusuri ng app store, gamitin ang over-the-air (OTA) update:

```bash
yarn update
```

Ginagamit nito ang EAS Update para i-push ang mga pagbabago nang direkta sa mga user nang walang buong pagsusumite sa store.

:::tip
Mas mabilis ang OTA update kaysa sa store build -- maaabot ng mga pagbabago ang mga user sa loob ng ilang minuto sa halip na ilang araw. Gamitin ang mga ito para sa mga bug fix, pagbabago sa teksto, at maliliit na pagbabago sa UI na hindi kasama ang native code.
:::

## Mga Numero ng Bersyon

Bago gumawa ng store build, kailangang i-update ang mga numero ng bersyon sa maraming file:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` at `versionCode`)

Awtomatikong dinadagdagan ng EAS ang iOS build number.

:::warning
Ang pagkalimot na i-update ang mga numero ng bersyon sa lahat ng file ay magdudulot ng pagkabigo sa build o pagtanggi ng app store. Suriing mabuti ang bawat file na nakalista sa itaas bago simulan ang production build.
:::

## Mga Kaugnay na Artikulo

- **[Mga Mobile App](../mobile/index.md)** -- Gabay sa lokal na setup at development
- **[Pag-deploy ng API](./apis.md)** -- Pag-deploy ng mga backend API
- **[Pag-deploy ng Web App](./web-apps.md)** -- Pag-deploy ng mga frontend web application
