---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile is de primaire mobiele app gericht op leden voor ChurchApps, gebouwd met React Native en Expo. Het stelt kerkleden in staat om directories te bekijken, donaties toe te gaan, aanwezigheid te controleren, meldingen te ontvangen en met hun kerkkerk in contact te staan.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js** en **Expo CLI** -- zie [Prerequisites](../setup/prerequisites)
- Installeer **Android Studio** (voor Android-emulator) of **Xcode** (voor iOS-simulator)
- Configureer uw API-doel (staging of lokaal) -- zie [Environment Variables](../setup/environment-variables)

</div>

## Setup

1. Kloon de repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installeer afhankelijkheden:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configureer omgevingsvariabelen -- kopieer het voorbeeldbestand en werk de API-eindpunten bij:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Start de Expo-dev-server:

   ```bash
   npm start
   ```

:::tip
U kunt de **Expo Go**-app op een fysiek apparaat gebruiken voor snelle tests zonder Android Studio of Xcode in te stellen.
:::

## Omgevingsvariabelen

| Variable | Beschrijving |
|----------|-------------|
| `STAGE` | Omgevingsstage (bijv. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Root-URL voor inhoudslevering |
| `MEMBERSHIP_API` | API-eindpunt voor lidmaatschap |
| `MESSAGING_API` | API-eindpunt voor messaging |
| `ATTENDANCE_API` | API-eindpunt voor aanwezigheid |
| `GIVING_API` | API-eindpunt voor donaties |
| `DOING_API` | API-eindpunt voor taken |
| `CONTENT_API` | API-eindpunt voor inhoud |
| `LESSONS_ROOT` | Root-URL voor lesseninhoud |

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm start` | Launch Expo-dev-server |
| `npm run android` | Voer uit op Android-emulator |
| `npm run ios` | Voer uit op iOS-simulator |
| `npm run test` | Tests uitvoeren (Jest) |

## Productie-builds

Voordat u een productiebuild maakt, moeten versienummers in alle volgende bestanden worden bijgewerkt:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Dit gebruikt EAS Build om het Android-binaire bestand te maken.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-updates

Om een over-the-air-update te pushen (zonder app-store-beoordeling):

```bash
npm run update:production
```

:::info
OTA-updates zijn ideaal voor JavaScript-only-wijzigingen. Als u native code of afhankelijkheden aanpast, moet u in plaats daarvan een volledige store-build indienen.
:::

## Gerelateerde Artikelen

- **[Mobile Deployment](../deployment/mobile)** -- Volledige gids voor het bouwen, indienen en implementeren van mobiele apps
- **[Environment Variables](../setup/environment-variables)** -- Volledige referentie voor mobiele omgevingsconfiguratie
