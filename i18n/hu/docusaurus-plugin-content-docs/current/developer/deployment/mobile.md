---
title: "Mobilalkalmazás-telepítés"
description: "Végigvezet az Expo-alkalmazások, például a B1 Checkin Android- és iOS-kiadásainak elkészítésén, az áruházakba történő feltöltésen, valamint az EAS-szal végzett OTA-frissítések közzétételén."
---

# Mobilalkalmazás-telepítés

<div class="article-intro">

A ChurchApps Expo alapú mobilalkalmazásait, például a B1 Checkint, **Expo EAS Build** segítségével vagy helyi Gradle-buildgel készítjük, és alkalmazásáruházakon keresztül terjesztjük. Ez az oldal az Android- és iOS-építés, a beküldés és az over-the-air (OTA) frissítések közzétételének lépéseit mutatja be, a B1 Checkint használva példaként.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be az alkalmazást helyileg -- lásd: [Mobilalkalmazások](../mobile/index.md#local-setup)
- Telepítse és konfigurálja az [EAS CLI-t](https://docs.expo.dev/eas/)
- Legyen hozzáférése a Google Play Console-hoz (Android) és/vagy az Apple App Store Connect-hez (iOS)

</div>

## Építés

### Android

Az Android kiadási buildek helyben futnak, és az EAS-ból letöltött kiadási kulcstárolóval vannak aláírva. Töltse le egyszer a `npx eas-cli credentials -p android` paranccsal (válassza a **credentials.json: Download credentials from EAS** lehetőséget), majd futtassa:

```bash
yarn build:android
```

A Google Play-csomag az `android/app/build/outputs/bundle/release/app-release.aab` helyre kerül. Ha inkább az EAS-on szeretne buildelni, futtassa a `yarn build:android:eas` parancsot.

### iOS

Az iOS-buildek mindig az EAS-on futnak:

```bash
yarn build:ios
```

## Beküldés az alkalmazásáruházakba

### Android -- Google Play Áruház

Töltse fel az AAB-fájlt a Play Console-on keresztül, vagy küldje be az EAS-szal:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Küldje be közvetlenül az iOS-buildet az EAS-on keresztül:

```bash
eas submit --platform ios
```

## OTA-frissítések

Csak JavaScript-változások esetén, amelyekhez nincs szükség áruházi felülvizsgálatra, használja az over-the-air (OTA) frissítéseket:

```bash
yarn update
```

Ez az EAS Update segítségével teljes áruházi beküldés nélkül juttatja el a változásokat a felhasználókhoz.

:::tip
Az OTA-frissítések lényegesen gyorsabbak az áruházi buildeknél -- a változások percek alatt eljuthatnak a felhasználókhoz, nem napok alatt. Használja őket hibajavításokhoz, szövegmódosításokhoz és kisebb felületi változtatásokhoz, amelyek nem érintik a natív kódot.
:::

## Verziószámok

Mielőtt áruházi buildet hozna létre, a verziószámokat több fájlban is frissíteni kell:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` és `versionCode`)

Az iOS-buildszámot az EAS automatikusan növeli.

:::warning
Ha bármelyik fenti fájlban elfelejti frissíteni a verziószámot, a build meghiúsulhat, vagy az alkalmazást elutasíthatja az áruház. Éles build indítása előtt ellenőrizze kétszer a felsorolt fájlok mindegyikét.
:::

## Kapcsolódó cikkek

- **[Mobilalkalmazások](../mobile/index.md)** -- Helyi telepítés és fejlesztési útmutató
- **[API-telepítés](./apis.md)** -- A háttérszolgáltatások (API-k) telepítése
- **[Webalkalmazás-telepítés](./web-apps.md)** -- A frontend webalkalmazások telepítése
