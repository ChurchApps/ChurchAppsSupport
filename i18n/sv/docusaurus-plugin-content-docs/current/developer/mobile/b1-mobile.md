---
title: "B1 Mobile"
description: "Installera och kör B1 Mobile React Native/Expo-appen lokalt, konfigurera API-slutpunkter och bygg för Android eller iOS. Observera att B1 Mobile är föråldrad."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile är den primära mobilappen för medlemmar i ChurchApps, byggd med React Native och Expo. Med appen kan kyrkomedlemmar visa kataloger, komma åt givande, registrera närvaro, ta emot aviseringar och interagera med sin kyrkogemenskap.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js** och **Expo CLI** -- se [Förutsättningar](../setup/prerequisites.md)
- Installera **Android Studio** (för Android-emulatorn) eller **Xcode** (för iOS-simulatorn)
- Konfigurera ditt API-mål (demo eller lokalt) -- se [Miljövariabler](../setup/environment-variables.md)

</div>

## Installation

1. Klona förrådet:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installera beroenden:

   ```bash
   cd B1Mobile && npm install
   ```

3. Konfigurera miljövariabler -- kopiera exempelfilen och uppdatera API-slutpunkterna:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Starta Expos utvecklingsserver:

   ```bash
   npm start
   ```

:::tip
Du kan använda appen **Expo Go** på en fysisk enhet för snabba tester utan att behöva installera Android Studio eller Xcode.
:::

## Miljövariabler

| Variabel | Beskrivning |
|----------|-------------|
| `STAGE` | Miljöstadie (t.ex. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Rot-URL för innehållsleverans |
| `MEMBERSHIP_API` | API-slutpunkt för medlemskap |
| `MESSAGING_API` | API-slutpunkt för meddelanden |
| `ATTENDANCE_API` | API-slutpunkt för närvaro |
| `GIVING_API` | API-slutpunkt för givande |
| `DOING_API` | API-slutpunkt för Doing |
| `CONTENT_API` | API-slutpunkt för innehåll |
| `LESSONS_ROOT` | Rot-URL för lektionsinnehåll |

## Viktiga kommandon

| Kommando | Beskrivning |
|---------|-------------|
| `npm start` | Starta Expos utvecklingsserver |
| `npm run android` | Kör på Android-emulatorn |
| `npm run ios` | Kör på iOS-simulatorn |
| `npm run test` | Kör tester (Jest) |

## Produktionsbyggen

Innan du skapar ett produktionsbygge ska du uppdatera versionsnumren i alla följande filer:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Detta använder EAS Build för att skapa Android-binärfilen.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-uppdateringar

För att skicka en uppdatering över luften (utan att gå igenom granskningen i appbutiken):

```bash
npm run update:production
```

:::info
OTA-uppdateringar passar bäst för ändringar som enbart gäller JavaScript. Om du ändrar native-kod eller beroenden måste du i stället skicka in ett fullständigt butiksbygge.
:::

## Relaterade artiklar

- **[Mobil distribution](../deployment/mobile.md)** -- Fullständig guide för att bygga, skicka in och distribuera mobilappar
- **[Miljövariabler](../setup/environment-variables.md)** -- Fullständig referens för mobilens miljökonfiguration
