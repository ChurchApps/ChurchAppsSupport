---
title: "Mobilna namestitev"
---

# Mobilna namestitev

<div class="article-intro">

Mobilne aplikacije ChurchApps se gradijo in namestijo z uporabo **Expo EAS Build** ter se distribuirajo prek trgovin z aplikacijami. Ta stran opisuje gradnjo, oddajo in potiskanje posodobitev OTA (over-the-air) za Android in iOS.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Lokalno nastavite mobilno aplikacijo -- glejte [B1 Mobile](../mobile/b1-mobile)
- Namestite in nastavite [EAS CLI](https://docs.expo.dev/eas/)
- Imejte dostop do Google Play Console (Android) in/ali Apple App Store Connect (iOS)

</div>

## Gradnja

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Oddaja v trgovine z aplikacijami

### Android -- Google Play Store

Po uspešni gradnji EAS se binarna datoteka za Android (AAB) odda v Google Play Store prek Play Console.

### iOS -- Apple App Store

Gradnjo za iOS oddajte neposredno prek EAS:

```bash
eas submit --platform ios
```

## Posodobitve OTA

Za spremembe, ki vsebujejo samo JavaScript in ne zahtevajo pregleda v trgovini z aplikacijami, uporabite posodobitve OTA (over-the-air):

```bash
npm run update:production
```

To uporablja EAS Update za neposredno potiskanje sprememb uporabnikom brez celotne oddaje v trgovino.

:::tip
Posodobitve OTA so bistveno hitrejše od gradenj za trgovine -- spremembe lahko dosežejo uporabnike v nekaj minutah namesto v nekaj dneh. Uporabite jih za popravke napak, spremembe besedil in manjše spremembe uporabniškega vmesnika, ki ne vključujejo sprememb nativne kode.
:::

## Številke različic

Pred ustvarjanjem gradnje za trgovino morate številke različic posodobiti v več datotekah:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Če pozabite posodobiti številke različic v vseh datotekah, bo prišlo do napak pri gradnji ali zavrnitve v trgovini z aplikacijami. Pred začetkom produkcijske gradnje dvakrat preverite vsako zgoraj naštето datoteko.
:::

## Sorodni članki

- **[B1 Mobile](../mobile/b1-mobile)** -- Lokalna nastavitev in vodnik za razvoj
- **[API Deployment](./apis)** -- Namestitev zaledniških API-jev
- **[Web App Deployment](./web-apps)** -- Namestitev spletnih aplikacij na sprednjem delu
