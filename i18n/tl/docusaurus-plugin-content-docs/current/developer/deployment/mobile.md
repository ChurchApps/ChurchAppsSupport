---
title: "Pag-deploy ng Mobile"
---

# Pag-deploy ng Mobile

<div class="article-intro">

Ang mga ChurchApps mobile app ay binubuo at dine-deploy gamit ang **Expo EAS Build** at ipinamamahagi sa pamamagitan ng mga app store. Sinasaklaw ng pahinang ito ang pagbuo, pagsusumite, at pag-push ng mga over-the-air na update para sa parehong Android at iOS.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang mobile app nang lokal -- tingnan ang [B1 Mobile](../mobile/b1-mobile)
- Mag-install at i-configure ang [EAS CLI](https://docs.expo.dev/eas/)
- Magkaroon ng access sa Google Play Console (Android) at/o Apple App Store Connect (iOS)

</div>

## Pagbuo

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Pagsusumite sa mga App Store

### Android -- Google Play Store

Pagkatapos ng matagumpay na EAS build, ang Android binary (AAB) ay isinusumite sa Google Play Store sa pamamagitan ng Play Console.

### iOS -- Apple App Store

Isumite ang iOS build nang direkta sa pamamagitan ng EAS:

```bash
eas submit --platform ios
```

## Mga OTA Update

Para sa mga pagbabagong JavaScript lamang na hindi nangangailangan ng pagsusuri ng app store, gamitin ang mga over-the-air (OTA) na update:

```bash
npm run update:production
```

Gumagamit ito ng EAS Update upang i-push ang mga pagbabago nang direkta sa mga gumagamit nang hindi nangangailangan ng buong pagsusumite sa store.

:::tip
Ang mga OTA update ay mas mabilis kaysa sa mga store build -- ang mga pagbabago ay maaaring makarating sa mga gumagamit sa loob ng mga minuto sa halip na mga araw. Gamitin ang mga ito para sa mga bug fix, pagbabago sa teksto, at maliliit na update sa UI na hindi kinasasangkutan ng mga pagbabago sa native code.
:::

## Mga Numero ng Bersyon

Bago lumikha ng store build, kailangang i-update ang mga numero ng bersyon sa maraming file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Ang pagkalimot na mag-update ng mga numero ng bersyon sa lahat ng file ay magdudulot ng pagkabigo sa build o pagtanggi ng app store. I-double check ang bawat file na nakalista sa itaas bago magsimula ng production build.
:::

## Mga Kaugnay na Artikulo

- **[B1 Mobile](../mobile/b1-mobile)** -- Gabay sa lokal na pag-setup at development
- **[Pag-deploy ng API](./apis)** -- Pag-deploy ng mga backend API
- **[Pag-deploy ng Web App](./web-apps)** -- Pag-deploy ng mga frontend na web application
