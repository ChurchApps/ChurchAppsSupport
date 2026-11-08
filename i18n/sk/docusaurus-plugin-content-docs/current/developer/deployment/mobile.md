---
title: "Nasadenie mobilnej aplikácie"
description: "Sprevádza vás zostavením verzií Android a iOS aplikácií Expo, ako je B1 Checkin, ich odoslaním do obchodov s aplikáciami a odosielaním aktualizácií OTA pomocou EAS."
---

# Nasadenie mobilnej aplikácie

<div class="article-intro">

Mobilné aplikácie ChurchApps postavené na Expo, ako napríklad B1 Checkin, sa zostavujú pomocou **Expo EAS Build** alebo lokálneho zostavenia Gradle a distribuujú sa cez obchody s aplikáciami. Táto stránka popisuje zostavovanie, odosielanie a odosielanie aktualizácií cez vzduch (OTA) pre Android aj iOS na príklade B1 Checkin.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nastavte aplikáciu lokálne – pozrite si [Mobilné aplikácie](../mobile/index.md#local-setup)
- Nainštalujte a nakonfigurujte [EAS CLI](https://docs.expo.dev/eas/)
- Majte prístup ku Google Play Console (Android) a/alebo Apple App Store Connect (iOS)

</div>

## Zostavovanie

### Android

Lokálne verzie pre Android sa zostavujú lokálne a podpisujú sa vydávacím kľúčom z EAS. Stiahnite si ho raz príkazom `npx eas-cli credentials -p android` (zvoľte **credentials.json: Download credentials from EAS**), potom spustite:

```bash
yarn build:android
```

Balík pre Google Play sa zapíše do `android/app/build/outputs/bundle/release/app-release.aab`. Ak chcete zostaviť na EAS, spustite `yarn build:android:eas`.

### iOS

Zostavenia pre iOS sa vždy spúšťajú na EAS:

```bash
yarn build:ios
```

## Odoslanie do obchodov s aplikáciami

### Android – Obchod Google Play

Nahrajte AAB cez Play Console alebo ho odošlite pomocou EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS – Apple App Store

Zostavenie pre iOS odošlite priamo cez EAS:

```bash
eas submit --platform ios
```

## Aktualizácie OTA

Pri zmenách len v JavaScripte, ktoré nevyžadujú kontrolu v obchode s aplikáciami, použite aktualizácie cez vzduch (OTA):

```bash
yarn update
```

Tento príkaz používa EAS Update na odoslanie zmien priamo používateľom bez úplného odoslania do obchodu.

:::tip
Aktualizácie OTA sú výrazne rýchlejšie ako zostavenia pre obchody – zmeny sa môžu dostať k používateľom za niekoľko minút namiesto dní. Používajte ich na opravy chýb, zmeny textov a menšie úpravy používateľského rozhrania, ktoré nezahŕňajú zmeny natívneho kódu.
:::

## Čísla verzií

Pred vytvorením zostavenia pre obchod je potrebné aktualizovať čísla verzií vo viacerých súboroch:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` a `versionCode`)

Číslo zostavenia pre iOS zvyšuje EAS automaticky.

:::warning
Ak zabudnete aktualizovať čísla verzií vo všetkých súboroch, zostavenie zlyhá alebo aplikáciu obchod zamietne. Pred spustením produkčného zostavenia si dôkladne skontrolujte každý súbor uvedený vyššie.
:::

## Súvisiace články

- **[Mobilné aplikácie](../mobile/index.md)** – Lokálne nastavenie a príručka pre vývoj
- **[Nasadenie API](./apis.md)** – Nasadenie backendových API
- **[Nasadenie webových aplikácií](./web-apps.md)** – Nasadenie frontendových webových aplikácií
