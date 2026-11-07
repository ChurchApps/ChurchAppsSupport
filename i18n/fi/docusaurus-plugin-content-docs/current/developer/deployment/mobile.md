---
title: "Mobiilijulkaisu"
description: "Ohjeet Android- ja iOS-julkaisujen rakentamiseen B1 Mobile -sovelluksesta Expo EAS:lla, niiden lähettämiseen sovelluskauppoihin ja OTA-päivitysten julkaisuun."
---

# Mobiilijulkaisu

<div class="article-intro">

ChurchAppsin mobiilisovellukset rakennetaan ja julkaistaan **Expo EAS Build** -palvelulla ja jaetaan sovelluskauppojen kautta. Tämä sivu käsittelee sekä Android- että iOS-version rakentamista, lähettämistä ja over-the-air-päivityksten julkaisua.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Ota mobiilisovellus käyttöön paikallisesti -- katso [B1 Mobile](../mobile/b1-mobile.md)
- Asenna ja määritä [EAS CLI](https://docs.expo.dev/eas/)
- Varmista, että sinulla on pääsy Google Play Console -palveluun (Android) ja/tai Apple App Store Connect -palveluun (iOS)

</div>

## Rakentaminen

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Lähettäminen sovelluskauppoihin

### Android -- Google Play Kauppa

Onnistuneen EAS-rakennuksen jälkeen Android-binääri (AAB) lähetetään Google Play Kauppaan Play Consolen kautta.

### iOS -- Apple App Store

Lähetä iOS-rakennus suoraan EAS:n kautta:

```bash
eas submit --platform ios
```

## OTA-päivitykset

Pelkästään JavaScript-muutoksiin, jotka eivät vaadi sovelluskaupan tarkastusta, käytetään over-the-air-päivityksiä (OTA):

```bash
npm run update:production
```

Tämä käyttää EAS Updatea muutosten välittämiseen suoraan käyttäjille ilman täyttä kauppalähetystä.

:::tip
OTA-päivitykset ovat huomattavasti nopeampia kuin kauppaversiot -- muutokset voivat saavuttaa käyttäjät minuuteissa eikä päivissä. Käytä niitä virheiden korjauksiin, tekstimuutoksiin ja pieniin käyttöliittymämuutoksiin, joihin ei liity natiivikoodin muutoksia.
:::

## Versionumerot

Ennen kaupparakennuksen luomista versionumerot on päivitettävä useaan tiedostoon:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Jos versionumeroita ei päivitetä kaikkiin tiedostoihin, rakennukset epäonnistuvat tai sovelluskauppa hylkää sovelluksen. Tarkista jokainen yllä lueteltu tiedosto kahteen kertaan ennen tuotantorakennuksen aloittamista.
:::

## Aiheeseen liittyvät artikkelit

- **[B1 Mobile](../mobile/b1-mobile.md)** -- Paikallinen käyttöönotto ja kehitysopas
- **[API-julkaisu](./apis.md)** -- Taustapalveluiden julkaisu
- **[Web-sovellusten julkaisu](./web-apps.md)** -- Käyttöliittymäsovellusten julkaisu
