---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile je glavna mobilna aplikacija ChurchApps za člane skupnosti, zgrajena z React Native in Expo. Članom cerkve omogoča ogled imenikov, dostop do darovanj, beleženje prisotnosti, prejemanje obvestil in sodelovanje s cerkveno skupnostjo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js** in **Expo CLI** -- glejte [Predpogoji](../setup/prerequisites)
- Namestite **Android Studio** (za Android emulator) ali **Xcode** (za iOS simulator)
- Nastavite svoj API cilj (demo ali lokalni) -- glejte [Okoljske spremenljivke](../setup/environment-variables)

</div>

## Nastavitev

1. Klonirajte repozitorij:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Namestite odvisnosti:

   ```bash
   cd B1Mobile && npm install
   ```

3. Nastavite okoljske spremenljivke -- kopirajte vzorčno datoteko in posodobite API naslove:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Zaženite razvojni strežnik Expo:

   ```bash
   npm start
   ```

:::tip
Za hitro testiranje na fizični napravi lahko uporabite aplikacijo **Expo Go**, ne da bi morali nastaviti Android Studio ali Xcode.
:::

## Okoljske spremenljivke

| Spremenljivka | Opis |
|----------|-------------|
| `STAGE` | Stopnja okolja (npr. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Korenski URL za dostavo vsebine |
| `MEMBERSHIP_API` | API naslov za članstvo |
| `MESSAGING_API` | API naslov za sporočanje |
| `ATTENDANCE_API` | API naslov za prisotnost |
| `GIVING_API` | API naslov za darovanja |
| `DOING_API` | API naslov za opravila |
| `CONTENT_API` | API naslov za vsebino |
| `LESSONS_ROOT` | Korenski URL za vsebino lekcij |

## Ključni ukazi

| Ukaz | Opis |
|---------|-------------|
| `npm start` | Zaženi razvojni strežnik Expo |
| `npm run android` | Zaženi na Android emulatorju |
| `npm run ios` | Zaženi na iOS simulatorju |
| `npm run test` | Zaženi teste (Jest) |

## Produkcijske gradnje

Preden ustvarite produkcijsko gradnjo, posodobite številke različic v vseh naslednjih datotekah:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Ta ukaz uporabi EAS Build za ustvarjanje binarne datoteke za Android.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA posodobitve

Za objavo posodobitve prek zraka (brez pregleda v trgovini z aplikacijami):

```bash
npm run update:production
```

:::info
OTA posodobitve so idealne za spremembe samo v JavaScriptu. Če spremenite nativno kodo ali odvisnosti, morate namesto tega oddati popolno gradnjo v trgovini.
:::

## Sorodni članki

- **[Objava mobilnih aplikacij](../deployment/mobile)** -- Celoten vodnik za gradnjo, oddajo in objavo mobilnih aplikacij
- **[Okoljske spremenljivke](../setup/environment-variables)** -- Popolna referenca za konfiguracijo okolja mobilne aplikacije
