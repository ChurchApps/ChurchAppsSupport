---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile è l'app mobile principale per i membri di ChurchApps, sviluppata con React Native ed Expo. Permette ai membri della chiesa di consultare le rubriche, accedere alle donazioni, controllare le presenze, ricevere notifiche e interagire con la propria comunità.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js** e **Expo CLI** -- consulta [Prerequisiti](../setup/prerequisites)
- Installa **Android Studio** (per l'emulatore Android) oppure **Xcode** (per il simulatore iOS)
- Configura il bersaglio dell'API (demo o locale) -- consulta [Variabili d'ambiente](../setup/environment-variables)

</div>

## Configurazione

1. Clona il repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installa le dipendenze:

   ```bash
   cd B1Mobile && npm install
   ```

3. Configura le variabili d'ambiente -- copia il file di esempio e aggiorna gli endpoint dell'API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Avvia il server di sviluppo Expo:

   ```bash
   npm start
   ```

:::tip
Puoi usare l'app **Expo Go** su un dispositivo fisico per test rapidi senza configurare Android Studio o Xcode.
:::

## Variabili d'ambiente

| Variabile | Descrizione |
|----------|-------------|
| `STAGE` | Fase dell'ambiente (ad es. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL radice per la distribuzione dei contenuti |
| `MEMBERSHIP_API` | Endpoint dell'API Membership |
| `MESSAGING_API` | Endpoint dell'API Messaging |
| `ATTENDANCE_API` | Endpoint dell'API Attendance |
| `GIVING_API` | Endpoint dell'API Giving |
| `DOING_API` | Endpoint dell'API Doing |
| `CONTENT_API` | Endpoint dell'API Content |
| `LESSONS_ROOT` | URL radice per i contenuti delle lezioni |

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo Expo |
| `npm run android` | Esegui sull'emulatore Android |
| `npm run ios` | Esegui sul simulatore iOS |
| `npm run test` | Esegui i test (Jest) |

## Build di produzione

Prima di creare una build di produzione, aggiorna i numeri di versione in tutti i seguenti file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Questo usa EAS Build per creare il binario Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Aggiornamenti OTA

Per distribuire un aggiornamento over-the-air (senza passare dalla revisione dello store delle app):

```bash
npm run update:production
```

:::info
Gli aggiornamenti OTA sono ideali per le modifiche solo JavaScript. Se modifichi codice nativo o dipendenze, devi inviare una build completa allo store.
:::

## Articoli correlati

- **[Distribuzione mobile](../deployment/mobile)** -- Guida completa alla creazione, all'invio e alla distribuzione delle app mobili
- **[Variabili d'ambiente](../setup/environment-variables)** -- Riferimento completo per la configurazione ambientale mobile
