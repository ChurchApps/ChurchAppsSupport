---
title: "Nasadenie mobilnej aplikácie"
---

# Nasadenie mobilnej aplikácie

<div class="article-intro">

Mobilné aplikácie ChurchApps sa zostavujú a nasadzujú pomocou **Expo EAS Build** a distribuujú sa cez obchody s aplikáciami. Táto stránka popisuje zostavovanie, odosielanie a vydávanie aktualizácií OTA (over-the-air) pre Android aj iOS.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Nastavte mobilnú aplikáciu lokálne – pozri [B1 Mobile](../mobile/b1-mobile)
- Nainštalujte a nakonfigurujte [EAS CLI](https://docs.expo.dev/eas/)
- Mať prístup ku Google Play Console (Android) a/alebo Apple App Store Connect (iOS)

</div>

## Zostavovanie

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Odosielanie do obchodov s aplikáciami

### Android – Google Play Store

Po úspešnom zostavení v EAS sa binárny súbor pre Android (AAB) odošle do Google Play Store cez Play Console.

### iOS – Apple App Store

Zostavenie pre iOS odošlite priamo cez EAS:

```bash
eas submit --platform ios
```

## Aktualizácie OTA

Pre zmeny, ktoré obsahujú iba JavaScript a nevyžadujú kontrolu v obchode s aplikáciami, použite aktualizácie OTA (over-the-air):

```bash
npm run update:production
```

Týmto sa pomocou EAS Update odošlú zmeny priamo používateľom bez úplného odoslania do obchodu.

:::tip
Aktualizácie OTA sú výrazne rýchlejšie ako zostavenia pre obchod – zmeny sa môžu k používateľom dostať za minúty namiesto dní. Používajte ich na opravy chýb, zmeny textov a menšie úpravy používateľského rozhrania, ktoré nezasahujú do natívneho kódu.
:::

## Čísla verzií

Pred vytvorením zostavenia pre obchod je potrebné aktualizovať čísla verzií vo viacerých súboroch:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Ak zabudnete aktualizovať čísla verzií vo všetkých súboroch, zostavenie zlyhá alebo aplikáciu zamietne App Store. Pred spustením produkčného zostavenia si dôkladne skontrolujte každý súbor uvedený vyššie.
:::

## Súvisiace články

- **[B1 Mobile](../mobile/b1-mobile)** – Miestny návod na nastavenie a vývoj
- **[Nasadenie API](./apis)** – Nasadenie backendových API
- **[Nasadenie webových aplikácií](./web-apps)** – Nasadenie frontendových webových aplikácií
