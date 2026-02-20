---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile è l'applicazione mobile principale rivolta ai membri di ChurchApps, costruita con React Native ed Expo. Permette ai membri della chiesa di visualizzare le directory, accedere alle donazioni, verificare le presenze, ricevere notifiche e interagire con la loro comunità ecclesiale.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Expo CLI** -- vedi [Prerequisiti](../setup/prerequisites)
- Installa **Android Studio** (per l'emulatore Android) o **Xcode** (per il simulatore iOS)
- Configura il target API (staging o locale) -- vedi [Variabili di Ambiente](../setup/environment-variables)

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

3. Configura le variabili di ambiente -- copia il file di esempio e aggiorna gli endpoint API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Avvia il server di sviluppo Expo:

   ```bash
   npm start
   ```

:::tip
Puoi utilizzare l'app **Expo Go** su un dispositivo fisico per test rapidi senza configurare Android Studio o Xcode.
:::

## Variabili di Ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `STAGE` | Stage dell'ambiente (es. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL radice per la distribuzione dei contenuti |
| `MEMBERSHIP_API` | Endpoint API Membership |
| `MESSAGING_API` | Endpoint API Messaging |
| `ATTENDANCE_API` | Endpoint API Attendance |
| `GIVING_API` | Endpoint API Giving |
| `DOING_API` | Endpoint API Doing |
| `CONTENT_API` | Endpoint API Content |
| `LESSONS_ROOT` | URL radice per i contenuti delle lezioni |

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo Expo |
| `npm run android` | Esegui sull'emulatore Android |
| `npm run ios` | Esegui sul simulatore iOS |
| `npm run test` | Esegui i test (Jest) |

## Build di Produzione

Prima di creare una build di produzione, aggiorna i numeri di versione in tutti i seguenti file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Questo utilizza EAS Build per creare il binario Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Aggiornamenti OTA

Per inviare un aggiornamento over-the-air (senza passare dalla revisione dell'app store):

```bash
npm run update:production
```

:::info
Gli aggiornamenti OTA sono ideali per le modifiche solo JavaScript. Se modifichi codice nativo o dipendenze, devi inviare una build completa allo store.
:::

## Articoli Correlati

- **[Distribuzione Mobile](../deployment/mobile)** -- Guida completa alla compilazione, invio e distribuzione delle applicazioni mobile
- **[Variabili di Ambiente](../setup/environment-variables)** -- Riferimento completo per la configurazione dell'ambiente mobile
