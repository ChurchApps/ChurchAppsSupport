---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile yi-app yeselula lesemcoka lebhekene nemalunga e-ChurchApps, leyakhiwe nge-React Native ne-Expo. Ivumela emalunga ebandla kutsi abukele tincwadzi tebantfu, afinyelele ekuphaneni, ahlole kubakhona, atfole tatiso, futsi asebentisane nemphakatsi webandla labo.

</div>

<div class="prereqs">
<h4>Ngaphambi Kutsi Ucale</h4>

- Faka **Node.js** ne-**Expo CLI** -- bona [Tidzingo Tekucala](../setup/prerequisites)
- Faka **Android Studio** (yekulinganisa i-Android) nobe **Xcode** (yekulinganisa i-iOS)
- Hlela umgomo wakho we-API (staging nobe wasekhaya) -- bona [Tintfo Letishintjashintjako Tesimo](../setup/environment-variables)

</div>

## Kusungula

1. Kopisha umtfombo:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Faka tibopho:

   ```bash
   cd B1Mobile && npm install
   ```

3. Hlela tintfo letishintjashintjako tesimo -- kopisha fayela lesibonelo bese uyabuyeketa ema-endpoint e-API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Cala i-server ye-Expo yekutfutfukisa:

   ```bash
   npm start
   ```

:::tip
Ungasebentisa i-app ye-**Expo Go** kudivayisi langempela kute uhlole ngekushesha ngaphandle kwekusungula i-Android Studio nobe i-Xcode.
:::

## Tintfo Letishintjashintjako Tesimo

| Intfo Leshintjashintjako | Sichasiso |
|----------|-------------|
| `STAGE` | Sigaba sesimo (sib., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | I-URL lesisekelo yekulethwa kwekucuketfwe |
| `MEMBERSHIP_API` | I-endpoint ye-API yebulunga |
| `MESSAGING_API` | I-endpoint ye-API yemilayeto |
| `ATTENDANCE_API` | I-endpoint ye-API yekubakhona |
| `GIVING_API` | I-endpoint ye-API yekupha |
| `DOING_API` | I-endpoint ye-API ye-Doing |
| `CONTENT_API` | I-endpoint ye-API yekucuketfwe |
| `LESSONS_ROOT` | I-URL lesisekelo yekucuketfwe kwetifundvo |

## Imiyalo Lesemcoka

| Umyalo | Sichasiso |
|---------|-------------|
| `npm start` | Cala i-server ye-Expo yekutfutfukisa |
| `npm run android` | Sebenta ku-emulator ye-Android |
| `npm run ios` | Sebenta ku-simulator ye-iOS |
| `npm run test` | Sebentisa tivivinyo (Jest) |

## Kwakhiwa Kwe-Production

Ngaphambi kwekwakha i-production, buyeketa tinombolo tefakazi kuto tonkhe emafayela lalandzelako:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Loku kusebentisa i-EAS Build kwakha i-binary ye-Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Tibuyeketo te-OTA

Kute uphushe sibuyeketo se-over-the-air (ngaphandle kwekudlula ekuhlolweni kwe-app store):

```bash
npm run update:production
```

:::info
Tibuyeketo te-OTA tilungele kakhulu tishintjo te-JavaScript kuphela. Nangabe ushintja ikhodi ye-native nobe tibopho, kufanele wetfule i-build lephelele ye-store kunaloko.
:::

## Tihloko Letihambelanako

- **[Kufakwa Kweselula](../deployment/mobile)** -- Sicondziso lesiphelele sekwakha, kwetfula, nekufaka ti-app teselula
- **[Tintfo Letishintjashintjako Tesimo](../setup/environment-variables)** -- Sibuyeketi lesiphelele sekuhlelwa kwesimo seselula
