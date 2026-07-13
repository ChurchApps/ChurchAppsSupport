---
title: "Kufakwa Kwetinhlelo Teselula"
---

# Kufakwa Kwetinhlelo Teselula

<div class="article-intro">

Tinhlelo teselula te-ChurchApps takhiwa futsi tifakwa kusetjentiswa i-**Expo EAS Build** futsi tisatjalaliswe ngetitolo tetinhlelo. Lelikhasi likhuluma ngekwakha, ngekutfumela (submitting), kanye nekutfumela ema-update la-over-the-air ku-Android nase-iOS.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Hlela uhlelo lweselula ngasekhaya -- bona [B1 Mobile](../mobile/b1-mobile)
- Faka futsi uhlele i-[EAS CLI](https://docs.expo.dev/eas/)
- Yiba nemfinyelelo ku-Google Play Console (Android) kanye/nome i-Apple App Store Connect (iOS)

</div>

## Kwakha

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Kutfumela Etitolo Tetinhlelo

### Android -- I-Google Play Store

Ngemuva kwekwakha lokuphumelele kwe-EAS, i-binary ye-Android (AAB) itfunyelwa ku-Google Play Store ngeluhambo lwe-Play Console.

### iOS -- I-Apple App Store

Tfumela lokwakhiwe kwe-iOS ngco ngeluhambo lwe-EAS:

```bash
eas submit --platform ios
```

## Ema-Update la-OTA

Kutishintjo letiyi-JavaScript kuphela letingadzingi kubuywa (review) yitolo lelinhlelo, sebentisa ema-update la-over-the-air (OTA):

```bash
npm run update:production
```

Loku kusebentisa i-EAS Update kutfumela shintjo ngco kubasebentisi ngaphandle kwekutfumela lokugcwele kwitolo.

:::tip
Ema-update la-OTA asheshe kakhulu kunelokwakhiwa kwitolo -- lushintjo lungafinyelela kubasebentisi ngemaminithi esikhundleni semalanga. Asebentise ekulungiseni tibhagi (bugs), kushintja kwembhalo, kanye nekushintja lokuncane kwe-UI lokungahlanganisi kushintjwa kwe-code yendabuko.
:::

## Tinombolo Tevasyini

Ngaphambi kwekwakha lokutakwitolo, tinombolo tevasyini kufanele tibuyekwetwe emafayeleni lamanyenti:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Kukhohlwa kubuyeketa tinombolo tevasyini kuwo onkhe emafayela kutokwenta kwehluleke kwakha kumbe kwaliwe yitolo lelinhlelo. Chaka kabili onkhe emafayela lakhonjiswe ngetulu ngaphambi kwekucala kwakha kwe-production.
:::

## Emahloko Lahlobene

- **[B1 Mobile](../mobile/b1-mobile)** -- Umhlahlandlela wekuhlelwa nekutfutfukiswa kwasekhaya
- **[Kufakwa Kwe-API](./apis)** -- Kufaka ema-backend API
- **[Kufakwa Kwe-Web App](./web-apps)** -- Kufaka tinhlelo te-frontend te-web
