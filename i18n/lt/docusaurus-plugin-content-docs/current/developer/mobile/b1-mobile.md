---
title: "B1 Mobile"
description: "Vietinis B1 Mobile (React Native / Expo) programos paleidimas, API galinių taškų nustatymas ir kūrimas Android ar iOS. B1 Mobile yra pasenusi."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile yra pagrindinė mobilioji programėlė ChurchApps nariams. Ji sukurta naudojant React Native ir Expo. Ji leidžia bažnyčios nariams peržiūrėti katalogus, naudotis aukų teikimu, registruoti dalyvavimą, gauti pranešimus ir bendrauti su savo bendruomene.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **Node.js** ir **Expo CLI** -- žr. [Reikalavimus](../setup/prerequisites.md)
- Įdiekite **Android Studio** (Android emuliatoriui) arba **Xcode** (iOS simuliatoriui)
- Nustatykite API tikslą (demonstracinį arba vietinį) -- žr. [Aplinkos kintamuosius](../setup/environment-variables.md)

</div>

## Sąranka

1. Klonuokite saugyklą:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Įdiekite priklausomybes:

   ```bash
   cd B1Mobile && npm install
   ```

3. Nustatykite aplinkos kintamuosius -- nukopijuokite pavyzdinį failą ir atnaujinkite API galinius taškus:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Paleiskite Expo kūrimo serverį:

   ```bash
   npm start
   ```

:::tip
Greitam testavimui fiziniame įrenginyje galite naudoti **Expo Go** programėlę, nesidiegdami Android Studio ar Xcode.
:::

## Aplinkos kintamieji

| Kintamasis | Aprašymas |
|----------|-------------|
| `STAGE` | Aplinkos etapas (pvz., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Turinio pristatymo šakninis URL |
| `MEMBERSHIP_API` | Narystės API galinis taškas |
| `MESSAGING_API` | Žinučių API galinis taškas |
| `ATTENDANCE_API` | Dalyvavimo API galinis taškas |
| `GIVING_API` | Aukų teikimo API galinis taškas |
| `DOING_API` | Veiklų API galinis taškas |
| `CONTENT_API` | Turinio API galinis taškas |
| `LESSONS_ROOT` | Pamokų turinio šakninis URL |

## Pagrindinės komandos

| Komanda | Aprašymas |
|---------|-------------|
| `npm start` | Paleisti Expo kūrimo serverį |
| `npm run android` | Paleisti Android emuliatoriuje |
| `npm run ios` | Paleisti iOS simuliatoriuje |
| `npm run test` | Paleisti testus (Jest) |

## Produkcinės versijos

Prieš kurdami produkcinę versiją, atnaujinkite versijos numerius visuose šiuose failuose:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Tai naudoja EAS Build Android programos paketui sukurti.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA atnaujinimai

Norėdami paskelbti atnaujinimą per orą (nelaukdami programėlių parduotuvės peržiūros):

```bash
npm run update:production
```

:::info
OTA atnaujinimai tinka tik JavaScript pakeitimams. Jei keičiate natyvų kodą ar priklausomybes, turite pateikti pilną parduotuvės versiją.
:::

## Susiję straipsniai

- **[Mobilioji diegimas](../deployment/mobile.md)** -- Išsamus vadovas, kaip kurti, pateikti ir diegti mobiliąsias programėles
- **[Aplinkos kintamieji](../setup/environment-variables.md)** -- Išsamus mobiliosios aplinkos konfigūravimo žinynas
