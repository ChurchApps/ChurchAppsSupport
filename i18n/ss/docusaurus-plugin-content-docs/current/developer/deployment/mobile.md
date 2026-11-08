---
title: "Kusetfwa Kwetinhlelo Tefoni"
description: "Ichaza kwakhiwa kwetifakelo te-Android ne-iOS te-Expo apps njenge-B1 Checkin, kutfumelwa kwato ku-app stores, nekutfumela tibuyekezo te-OTA nge-EAS."
---

# Kusetfwa Kwetinhlelo Tefoni

<div class="article-intro">

Tinhlelo te-Expo te-ChurchApps, njenge-B1 Checkin, takhiwa nge-**Expo EAS Build** noma nge-Gradle lekwakhiwa endzaweni, futsi tifinyelela basebenzisi ngetitolo tetinhlelo. Leli tsatfu lichaza kwakhiwa, kutfumelwa, nekutfumela tibuyekezo te-over-the-air (OTA) ku-Android ne-iOS, kusebentisa B1 Checkin njengesibonelo.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- Setha app endzaweni -- bona [Tinhlelo Tefoni](../mobile/index.md#local-setup)
- Faka futsi ulungise i-[EAS CLI](https://docs.expo.dev/eas/)
- Ube nemvume ye-Google Play Console (Android) and/or Apple App Store Connect (iOS)

</div>

## Kwakha

### Android

Tifakelo te-Android letikhiwa endzaweni tisayinwa ngekhiye lekuphepha le-release leliphuma ku-EAS. Liwunilode kanye nga `npx eas-cli credentials -p android` (khetsa **credentials.json: Download credentials from EAS**), bese uyasebentisa:

```bash
yarn build:android
```

Igciwo le-Google Play libhalwa ku-`android/app/build/outputs/bundle/release/app-release.aab`. Kuze wakhe ku-EAS, sebentisa `yarn build:android:eas`.

### iOS

Takhiwo te-iOS tihamba njalo ku-EAS:

```bash
yarn build:ios
```

## Kutfumelwa Ku-App Stores

### Android -- Google Play Store

Layisha i-AAB ngaku-Play Console, noma utfumele nge-EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Tfumela kakhulu kwakha kwe-iOS nge-EAS:

```bash
eas submit --platform ios
```

## Tibuyekezo te-OTA

Ku-tinguquko te-JavaScript kuphela letingadzingi kubuyekezwa kwesitolo se-app, sebentisa tibuyekezo te-over-the-air (OTA):

```bash
yarn update
```

Lokhu kusebentisa i-EAS Update kutfumela tinguquko ngqo kubasebenzisi ngaphandle kwekutfumela ku-store ngakhatsi.

:::tip
Tibuyekezo te-OTA tisheshe kakhulu kunetakhiwo te-store -- tinguquko tingafinyelela basebenzisi emaminithini kunasemalanga. Tisebentise tibuyekezo te-kulungisa tiphazamiso, tinguquko temagama, nemashintsho amancane e-UI langadzingi tinguquko te-native code.
:::

## Tinombolo Tekuguquka

Ngaphambi kokwakha ibhilidi ye-store, tinombolo tekuguquka kufanele tibuyekezwe kuwo wonkhe emafayela:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` ne `versionCode`)

Inombolo yebhilidi ye-iOS ikhuphuka ngekuzenta nga-EAS.

:::warning
Kukhohlwa kubuyekeza tinombolo tekuguquka kuwo wonkhe emafayela kuyobangela kwahluleka kwebhilidi noma kwenqatfwa kwe-app ku-store. Hlola kabili yonkhe imafayela ledzandzisiwe ngenhla ngaphambi kokuqala ibhilidi yekukhiqiza.
:::

## Tindzatjana Letihlobene

- **[Tinhlelo Tefoni](../mobile/index.md)** -- Kusetfwa endzaweni nemhlahlandlela wekuthuthukisa
- **[Kusetfwa Kwe-API](./apis.md)** -- Kusetfwa kwetinsita te-backend
- **[Kusetfwa Kwetinhlelo Tewebhu](./web-apps.md)** -- Kusetfwa kwetinhlelo tewebhu letingemuva
