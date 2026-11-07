---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile on ChurchApps-yhteisön jäsenille suunnattu pääasiallinen mobiilisovellus. Se on rakennettu React Nativella ja Expo-kehyksellä. Sovelluksen avulla kirkon jäsenet voivat selata hakemistoja, käyttää lahjoitustoimintoja, merkitä osallistumisen, vastaanottaa ilmoituksia ja olla vuorovaikutuksessa oman seurakuntayhteisönsä kanssa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js** ja **Expo CLI** -- katso [Esivaatimukset](../setup/prerequisites)
- Asenna **Android Studio** (Android-emulaattoria varten) tai **Xcode** (iOS-simulaattoria varten)
- Määritä API-kohde (demo tai paikallinen) -- katso [Ympäristömuuttujat](../setup/environment-variables)

</div>

## Asennus

1. Kloonaa repositorio:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Asenna riippuvuudet:

   ```bash
   cd B1Mobile && npm install
   ```

3. Määritä ympäristömuuttujat -- kopioi esimerkkitiedosto ja päivitä API-päätepisteet:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Käynnistä Expo-kehityspalvelin:

   ```bash
   npm start
   ```

:::tip
Voit käyttää **Expo Go** -sovellusta fyysisellä laitteella nopeaan testaamiseen ilman Android Studion tai Xcoden asentamista.
:::

## Ympäristömuuttujat

| Muuttuja | Kuvaus |
|----------|-------------|
| `STAGE` | Ympäristön vaihe (esim. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Sisällön jakelun juури-URL |
| `MEMBERSHIP_API` | Jäsenyys-API:n päätepiste |
| `MESSAGING_API` | Viestintä-API:n päätepiste |
| `ATTENDANCE_API` | Osallistumis-API:n päätepiste |
| `GIVING_API` | Lahjoitus-API:n päätepiste |
| `DOING_API` | Doing-API:n päätepiste |
| `CONTENT_API` | Sisältö-API:n päätepiste |
| `LESSONS_ROOT` | Opetussisällön juури-URL |

## Tärkeimmät komennot

| Komento | Kuvaus |
|---------|-------------|
| `npm start` | Käynnistä Expo-kehityspalvelin |
| `npm run android` | Suorita Android-emulaattorissa |
| `npm run ios` | Suorita iOS-simulaattorissa |
| `npm run test` | Suorita testit (Jest) |

## Tuotantoversiot

Ennen tuotantoversion luomista päivitä versionumerot kaikkiin seuraaviin tiedostoihin:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Tämä käyttää EAS Buildia Android-binäärin luomiseen.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-päivitykset

Ilmaisen päivityksen (ilman sovelluskaupan tarkistusta) julkaisemiseksi:

```bash
npm run update:production
```

:::info
OTA-päivitykset soveltuvat parhaiten pelkkiin JavaScript-muutoksiin. Jos muokkaat natiivikoodia tai riippuvuuksia, sinun on lähetettävä täysi kauppaversio.
:::

## Liittyvät artikkelit

- **[Mobiilijulkaisu](../deployment/mobile)** -- Kattava opas mobiilisovellusten rakentamiseen, lähettämiseen ja julkaisuun
- **[Ympäristömuuttujat](../setup/environment-variables)** -- Täydellinen viite mobiilisovelluksen ympäristön määrityksiin
