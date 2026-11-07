---
title: "Mobilalkalmazás telepítése"
description: "Végigvezet a B1 Mobile alkalmazás Android- és iOS-kiadásainak elkészítésén az Expo EAS-szel, az áruházakba való beküldésen és az OTA-frissítések közzétételén."
---

# Mobilalkalmazás telepítése

<div class="article-intro">

A ChurchApps mobilalkalmazásait az **Expo EAS Build** segítségével építjük és telepítjük, az alkalmazásboltokon keresztül terjesztjük. Ez az oldal az Android és iOS verziók építésével, beküldésével és az over-the-air (OTA) frissítések közzétételével foglalkozik.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be a mobilalkalmazást helyileg – lásd: [B1 Mobile](../mobile/b1-mobile.md)
- Telepítse és állítsa be az [EAS CLI](https://docs.expo.dev/eas/) eszközt
- Legyen hozzáférése a Google Play Console-hoz (Android) és/vagy az Apple App Store Connect-hez (iOS)

</div>

## Építés

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Beküldés az alkalmazásboltokba

### Android – Google Play Store

Sikeres EAS-építés után az Android bináris fájl (AAB) a Play Console-on keresztül kerül beküldésre a Google Play Store-ba.

### iOS – Apple App Store

Az iOS-építést közvetlenül az EAS-en keresztül küldje be:

```bash
eas submit --platform ios
```

## OTA-frissítések

Olyan, csak JavaScriptet érintő módosításokhoz, amelyekhez nincs szükség az alkalmazásbolti áttekintésre, használja az over-the-air (OTA) frissítéseket:

```bash
npm run update:production
```

Ez az EAS Update segítségével közvetlenül juttatja el a módosításokat a felhasználókhoz, teljes alkalmazásbolti beküldés nélkül.

:::tip
Az OTA-frissítések lényegesen gyorsabbak, mint az alkalmazásbolti építések – a módosítások percek alatt eljuthatnak a felhasználókhoz, nem napok alatt. Használja őket hibajavításokhoz, szövegmódosításokhoz és kisebb felületi változtatásokhoz, amelyek nem érintenek natív kódot.
:::

## Verziószámok

Az éles építés létrehozása előtt több fájlban is frissíteni kell a verziószámokat:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Ha nem frissíti a verziószámokat az összes fájlban, az építés hibára fut, vagy az alkalmazást visszautasítja az alkalmazásbolt. Az éles építés megkezdése előtt ellenőrizze kétszer a fent felsorolt összes fájlt.
:::

## Kapcsolódó cikkek

- **[B1 Mobile](../mobile/b1-mobile.md)** – Helyi beállítás és fejlesztési útmutató
- **[API-telepítés](./apis.md)** – A háttérrendszeri API-k telepítése
- **[Webalkalmazás-telepítés](./web-apps.md)** – A frontend webalkalmazások telepítése
