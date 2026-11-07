---
title: "Mobiliosios programėlės diegimas"
---

# Mobiliosios programėlės diegimas

<div class="article-intro">

ChurchApps mobiliosios programėlės kuriamos ir diegiamos naudojant **Expo EAS Build** ir platinamos per programėlių parduotuves. Šiame puslapyje aprašoma, kaip kurti, pateikti ir siųsti per orą (OTA) atnaujinimus tiek Android, tiek iOS platformoms.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite mobiliąją programėlę vietiniame kompiuteryje -- žr. [B1 Mobile](../mobile/b1-mobile)
- Įdiekite ir sukonfigūruokite [EAS CLI](https://docs.expo.dev/eas/)
- Turėkite prieigą prie Google Play Console (Android) ir (arba) Apple App Store Connect (iOS)

</div>

## Kūrimas

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Pateikimas programėlių parduotuvėms

### Android -- Google Play Store

Po sėkmingo EAS kūrimo Android dvejetainis failas (AAB) pateikiamas Google Play parduotuvei per Play Console.

### iOS -- Apple App Store

Pateikite iOS versiją tiesiogiai per EAS:

```bash
eas submit --platform ios
```

## OTA atnaujinimai

Pakeitimams, kurie apima tik JavaScript ir nereikalauja programėlių parduotuvės peržiūros, naudokite per orą (OTA) atnaujinimus:

```bash
npm run update:production
```

Tai naudoja EAS Update, kad pakeitimai būtų perduoti naudotojams tiesiogiai, be pilno pateikimo parduotuvei.

:::tip
OTA atnaujinimai yra gerokai greitesni nei parduotuvės versijos -- pakeitimai gali pasiekti naudotojus per kelias minutes, o ne per dienas. Naudokite juos klaidoms taisyti, tekstams keisti ir nedideliems sąsajos pakeitimams, kurie nekeičia vietinio kodo.
:::

## Versijų numeriai

Prieš kuriant parduotuvės versiją, versijų numeriai turi būti atnaujinti keliuose failuose:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Jei neatnaujinsite versijų numerių visuose failuose, kūrimas nepavyks arba programėlė bus atmesta parduotuvėje. Prieš pradėdami gamybinį kūrimą, dar kartą patikrinkite kiekvieną aukščiau išvardytą failą.
:::

## Susiję straipsniai

- **[B1 Mobile](../mobile/b1-mobile)** -- Vietinio nustatymo ir kūrimo vadovas
- **[API diegimas](./apis)** -- Backend API diegimas
- **[Žiniatinklio programėlių diegimas](./web-apps)** -- Frontend žiniatinklio programėlių diegimas
