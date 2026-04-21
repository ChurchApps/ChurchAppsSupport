---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile er den primære medlems-vendte mobilapp for ChurchApps, bygget med React Native og Expo. Det tillader kirkmedlemmer at se mappeoplysninger, få adgang til giver, kontrollere tilstedeværelse, modtage meddelelser og interagere med deres kirkfællesskab.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js** og **Expo CLI** -- se [Forudsætninger](../setup/prerequisites)
- Installer **Android Studio** (til Android-emulator) eller **Xcode** (til iOS-simulator)
- Konfigurér dit API-mål (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Setup

1. Klon lageret:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installer afhængigheder:

   ```bash
   cd B1Mobile && npm install
   ```

3. Konfigurér miljøvariabler -- kopier sampelfilen og opdater API-endpoints:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Start Expo dev-serveren:

   ```bash
   npm start
   ```

:::tip
Du kan bruge **Expo Go**-appen på en fysisk enhed til hurtig test uden Android Studio eller Xcode.
:::

## Miljøvariabler

| Variable | Beskrivelse |
|----------|-------------|
| `STAGE` | Miljøscene (f.eks. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Rod-URL til indholdslevering |
| `MEMBERSHIP_API` | Medlemskabs-API-endpoint |
| `MESSAGING_API` | Messaging-API-endpoint |
| `ATTENDANCE_API` | Deltagelses-API-endpoint |
| `GIVING_API` | Giving API-endpoint |
| `DOING_API` | Doing API-endpoint |
| `CONTENT_API` | Indhold API-endpoint |
| `LESSONS_ROOT` | Rod-URL til lektionsindhold |

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm start` | Start Expo dev-server |
| `npm run android` | Kør på Android-emulator |
| `npm run ios` | Kør på iOS-simulator |
| `npm run test` | Kør test (Jest) |

## Produktionsbyggerier

Før oprettelse af en produktionsbygning skal versionsnumre opdateres i alle følgende filer:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Dette bruger EAS Build til at oprette Android-binæren.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-opdateringer

For at skubbe en over-the-air-opdatering (uden app store-gennemsyn):

```bash
npm run update:production
```

:::info
OTA-opdateringer er ideelle til JavaScript-kun-ændringer. Hvis du ændrer native code eller afhængigheder, skal du i stedet indsende en fuldt butiksbyg.
:::

## Relaterede artikler

- **[Mobilinstallation](../deployment/mobile)** -- Fuld vejledning til byggeri, indlevering og installation af mobilapps
- **[Miljøvariabler](../setup/environment-variables)** -- Fuldstændig reference til mobil miljøkonfiguration
