---
title: "Mobilna wdrożenie"
description: "Przewodnik po tworzeniu wydań Android i iOS aplikacji Expo, takich jak B1 Checkin, przesyłaniu ich do sklepów z aplikacjami i wysyłaniu aktualizacji OTA za pomocą EAS."
---

Wait, I need to correct myself. You asked for Finnish, not Polish. Here is the translation in Finnish:

---
title: "Mobiilijulkaisu"
description: "Opastaa Expo-sovellusten, kuten B1 Checkinin, Android- ja iOS-julkaisujen rakentamisessa, niiden lähettämisessä sovelluskauppoihin sekä OTA-päivitysten julkaisemisessa EAS:n avulla."
---

# Mobiilijulkaisu

<div class="article-intro">

ChurchAppsin Expo-mobiilisovellukset, kuten B1 Checkin, rakennetaan **Expo EAS Buildilla** tai paikallisella Gradle-buildilla, ja ne jaetaan sovelluskauppojen kautta. Tämä sivu käsittelee rakentamista, lähettämistä ja over-the-air-päivitysten (OTA) julkaisemista sekä Androidille että iOS:lle esimerkkinä B1 Checkin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Ota sovellus käyttöön paikallisesti – katso [Mobiilisovellukset](../mobile/index.md#local-setup)
- Asenna ja määritä [EAS CLI](https://docs.expo.dev/eas/)
- Varmista, että sinulla on pääsy Google Play Consoleen (Android) ja/tai Apple App Store Connectiin (iOS)

</div>

## Rakentaminen

### Android

Android-julkaisubuildit ajetaan paikallisesti ja allekirjoitetaan EAS:n julkaisuavaimistolla. Lataa avaimisto kerran komennolla `npx eas-cli credentials -p android` (valitse **credentials.json: Download credentials from EAS**), ja aja sitten:

```bash
yarn build:android
```

Google Play -paketti kirjoitetaan tiedostoon `android/app/build/outputs/bundle/release/app-release.aab`. Jos haluat rakentaa EAS:llä, aja `yarn build:android:eas`.

### iOS

iOS-buildit ajetaan aina EAS:llä:

```bash
yarn build:ios
```

## Lähettäminen sovelluskauppoihin

### Android – Google Play Store

Lataa AAB-tiedosto Play Consolen kautta tai lähetä se EAS:llä:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS – Apple App Store

Lähetä iOS-build suoraan EAS:n kautta:

```bash
eas submit --platform ios
```

## OTA-päivitykset

JavaScript-only-muutoksiin, jotka eivät vaadi sovelluskaupan tarkastusta, käytä over-the-air-päivityksiä (OTA):

```bash
yarn update
```

Tämä käyttää EAS Updatea muutosten työntämiseen suoraan käyttäjille ilman täyttä kauppalähetystä.

:::tip
OTA-päivitykset ovat huomattavasti nopeampia kuin kauppabuildit – muutokset voivat saavuttaa käyttäjät minuuteissa päivien sijaan. Käytä niitä virhekorjauksiin, tekstimuutoksiin ja pieniin käyttöliittymämuutoksiin, joihin ei liity natiivikoodin muutoksia.
:::

## Versionumerot

Ennen kauppabuildin luomista versionumerot on päivitettävä useaan tiedostoon:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` ja `versionCode`)

iOS-buildinumeron kasvattaa automaattisesti EAS.

:::warning
Jos versionumeroita ei päivitetä kaikkiin tiedostoihin, seurauksena voi olla buildien epäonnistuminen tai sovelluskaupan hylkäys. Tarkista jokainen yllä lueteltu tiedosto huolellisesti ennen tuotantobuildin aloittamista.
:::

## Aiheeseen liittyvät artikkelit

- **[Mobiilisovellukset](../mobile/index.md)** – Paikallinen asennus ja kehitysopas
- **[API-julkaisu](./apis.md)** – Taustajärjestelmän API-rajapintojen julkaisu
- **[Web-sovellusten julkaisu](./web-apps.md)** – Frontend-web-sovellusten julkaisu
