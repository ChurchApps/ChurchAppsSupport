---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile er den primære mobilappen for medlemmer i ChurchApps, bygget med React Native og Expo. Den lar kirkemedlemmer se kataloger, få tilgang til gaver, registrere oppmøte, motta varsler og delta i kirkefellesskapet sitt.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Expo CLI** -- se [Forutsetninger](../setup/prerequisites)
- Installer **Android Studio** (for Android-emulatoren) eller **Xcode** (for iOS-simulatoren)
- Konfigurer API-målet ditt (demo eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Oppsett

1. Klon repositoryet:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installer avhengigheter:

   ```bash
   cd B1Mobile && npm install
   ```

3. Konfigurer miljøvariabler -- kopier eksempelfilen og oppdater API-endepunktene:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Start Expo-utviklingsserveren:

   ```bash
   npm start
   ```

:::tip
Du kan bruke **Expo Go**-appen på en fysisk enhet for rask testing uten å sette opp Android Studio eller Xcode.
:::

## Miljøvariabler

| Variabel | Beskrivelse |
|----------|-------------|
| `STAGE` | Miljøtrinn (f.eks. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Rot-URL for innholdslevering |
| `MEMBERSHIP_API` | Membership-API-endepunkt |
| `MESSAGING_API` | Messaging-API-endepunkt |
| `ATTENDANCE_API` | Attendance-API-endepunkt |
| `GIVING_API` | Giving-API-endepunkt |
| `DOING_API` | Doing-API-endepunkt |
| `CONTENT_API` | Content-API-endepunkt |
| `LESSONS_ROOT` | Rot-URL for leksjonsinnhold |

## Viktige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm start` | Start Expo-utviklingsserveren |
| `npm run android` | Kjør på Android-emulator |
| `npm run ios` | Kjør på iOS-simulator |
| `npm run test` | Kjør tester (Jest) |

## Produksjonsbygg

Før du oppretter et produksjonsbygg, oppdater versjonsnumrene i alle disse filene:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Dette bruker EAS Build til å lage Android-binærfilen.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-oppdateringer

For å sende en OTA-oppdatering (over the air, uten å gå gjennom gjennomgang i appbutikken):

```bash
npm run update:production
```

:::info
OTA-oppdateringer er ideelle for endringer som kun gjelder JavaScript. Hvis du endrer native kode eller avhengigheter, må du sende inn et fullstendig butikkbygg i stedet.
:::

## Relaterte artikler

- **[Mobildistribusjon](../deployment/mobile)** -- Full veiledning for bygging, innsending og distribusjon av mobilapper
- **[Miljøvariabler](../setup/environment-variables)** -- Fullstendig referanse for mobilmiljøkonfigurasjon
