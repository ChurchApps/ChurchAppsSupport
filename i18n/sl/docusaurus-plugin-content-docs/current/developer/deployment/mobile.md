---
title: "Objava mobilnih aplikacij"
description: "Vodnik za izdelavo izdaj za Android in iOS za Expo aplikacije, kot je B1 Checkin, za oddajo v trgovine z aplikacijami in za pošiljanje posodobitev OTA z EAS."
---

# Objava mobilnih aplikacij

<div class="article-intro">

Expo mobilne aplikacije podjetja ChurchApps, na primer B1 Checkin, so zgrajene z **Expo EAS Build** ali lokalno gradnjo z Gradle in se distribuirajo prek trgovin z aplikacijami. Ta stran opisuje izdelavo, oddajo in pošiljanje posodobitev OTA (over-the-air) za Android in iOS, pri čemer je za primer uporabljen B1 Checkin.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Lokalno nastavite aplikacijo -- glejte [Mobilne aplikacije](../mobile/index.md#local-setup)
- Namestite in konfigurirajte [EAS CLI](https://docs.expo.dev/eas/)
- Imejte dostop do Google Play Console (Android) in/ali Apple App Store Connect (iOS)

</div>

## Izdelava

### Android

Izdaje za Android se izvajajo lokalno in so podpisane z izdajnim ključnikom (keystore) iz EAS. Prenesite ga enkrat z ukazom `npx eas-cli credentials -p android` (izberite **credentials.json: Prenesi poverilnice iz EAS**), nato zaženite:

```bash
yarn build:android
```

Paket za Google Play je zapisan v `android/app/build/outputs/bundle/release/app-release.aab`. Za gradnjo na EAS namesto tega zaženite `yarn build:android:eas`.

### iOS

Gradnje za iOS se vedno izvajajo na EAS:

```bash
yarn build:ios
```

## Oddaja v trgovine z aplikacijami

### Android -- Google Play Store

Naložite AAB prek Play Console ali ga oddajte z EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Gradnjo za iOS oddajte neposredno prek EAS:

```bash
eas submit --platform ios
```

## Posodobitve OTA

Za spremembe samo v JavaScriptu, ki ne zahtevajo pregleda v trgovini z aplikacijami, uporabite posodobitve OTA (over-the-air):

```bash
yarn update
```

To prek EAS Update pošlje spremembe neposredno uporabnikom brez celotne oddaje v trgovino.

:::tip
Posodobitve OTA so bistveno hitrejše od gradenj za trgovine -- spremembe lahko dosežejo uporabnike v nekaj minutah namesto v dneh. Uporabite jih za popravke napak, spremembe besedil in manjše spremembe uporabniškega vmesnika, ki ne vključujejo sprememb nativne kode.
:::

## Številke različic

Pred ustvarjenjem gradnje za trgovino je treba številke različic posodobiti v več datotekah:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` in `versionCode`)

Številko gradnje za iOS samodejno poveča EAS.

:::warning
Če pozabite posodobiti številke različic v vseh datotekah, bo to povzročilo napake pri gradnji ali zavrnitev v trgovini z aplikacijami. Pred začetkom produkcijske gradnje dvakrat preverite vsako zgoraj navedeno datoteko.
:::

## Sorodni članki

- **[Mobilne aplikacije](../mobile/index.md)** -- Lokalna nastavitev in vodnik za razvoj
- **[Objava API](./apis.md)** -- Objava zalednih API-jev
- **[Objava spletnih aplikacij](./web-apps.md)** -- Objava spletnih aplikacij za uporabniški vmesnik (frontend)
