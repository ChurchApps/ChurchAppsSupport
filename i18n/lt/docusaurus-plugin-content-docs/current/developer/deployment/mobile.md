---
title: "Mobiliųjų programėlių diegimas"
description: "Vadovas, kaip sukurti Android ir iOS versijas Expo programėlėms, tokioms kaip B1 Checkin, pateikti jas programėlių parduotuvėms ir skelbti OTA atnaujinimus naudojant EAS."
---

# Mobiliųjų programėlių diegimas

<div class="article-intro">

ChurchApps Expo mobiliosios programėlės, pavyzdžiui B1 Checkin, kuriamos naudojant **Expo EAS Build** arba vietinį Gradle kūrimą, o platinamos per programėlių parduotuves. Šiame puslapyje aprašoma, kaip kurti, pateikti ir skelbti oro (OTA) atnaujinimus tiek Android, tiek iOS platformoms, pavyzdžiui naudojant B1 Checkin.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite programėlę vietiniame kompiuteryje – žr. [Mobiliosios programėlės](../mobile/index.md#local-setup)
- Įdiekite ir sukonfigūruokite [EAS CLI](https://docs.expo.dev/eas/)
- Turėkite prieigą prie Google Play Console (Android) ir (arba) Apple App Store Connect (iOS)

</div>

## Kūrimas

### Android

Android išleidimo versijos kuriamos vietiniame kompiuteryje ir pasirašomos išleidimo raktų saugykla iš EAS. Ją atsisiųskite vieną kartą naudodami `npx eas-cli credentials -p android` (pasirinkite **credentials.json: Download credentials from EAS**), tada paleiskite:

```bash
yarn build:android
```

Google Play paketas įrašomas į `android/app/build/outputs/bundle/release/app-release.aab`. Norėdami kurti per EAS, vietoj to paleiskite `yarn build:android:eas`.

### iOS

iOS versijos visada kuriamos EAS platformoje:

```bash
yarn build:ios
```

## Pateikimas programėlių parduotuvėms

### Android -- Google Play Store

Įkelkite AAB failą per Play Console arba pateikite jį naudodami EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Pateikite iOS versiją tiesiogiai per EAS:

```bash
eas submit --platform ios
```

## OTA atnaujinimai

Pakeitimams, kurie susiję tik su JavaScript ir nereikalauja programėlių parduotuvės peržiūros, naudokite oro (OTA) atnaujinimus:

```bash
yarn update
```

Tam naudojamas EAS Update, kuris pakeitimus tiesiogiai pateikia naudotojams be pilno pateikimo programėlių parduotuvei.

:::tip
OTA atnaujinimai žymiai greitesni nei parduotuvės versijos – pakeitimai gali pasiekti naudotojus per kelias minutes, o ne per dienas. Naudokite juos klaidų taisymams, teksto pakeitimams ir nedideliems sąsajos atnaujinimams, kurie nekeičia vietinio kodo.
:::

## Versijų numeriai

Prieš kuriant parduotuvės versiją, versijų numeriai turi būti atnaujinti keliuose failuose:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` ir `versionCode`)

iOS versijos numerį EAS padidina automatiškai.

:::warning
Jei pamiršite atnaujinti versijų numerius visuose failuose, kūrimas nepavyks arba programėlę gali atmesti parduotuvė. Prieš kurdami gamybinę versiją dar kartą patikrinkite kiekvieną aukščiau nurodytą failą.
:::

## Susiję straipsniai

- **[Mobiliosios programėlės](../mobile/index.md)** -- Vietinio nustatymo ir kūrimo vadovas
- **[API diegimas](./apis.md)** -- Backend API diegimas
- **[Interneto programėlių diegimas](./web-apps.md)** -- Frontend interneto programėlių diegimas
