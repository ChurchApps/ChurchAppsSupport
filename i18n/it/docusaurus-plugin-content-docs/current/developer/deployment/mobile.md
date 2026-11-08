---
title: "Distribuzione dell'app mobile"
description: "Guida alla creazione delle versioni Android e iOS delle app Expo come B1 Checkin, alla loro pubblicazione negli store e all'invio di aggiornamenti OTA con EAS."
---

# Distribuzione dell'app mobile

<div class="article-intro">

Le app mobile Expo di ChurchApps, come B1 Checkin, vengono compilate con **Expo EAS Build** oppure con una build Gradle locale e distribuite tramite gli store delle app. Questa pagina spiega come compilare, inviare e pubblicare aggiornamenti over-the-air sia per Android sia per iOS, usando B1 Checkin come esempio.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura l'app in locale -- vedi [App mobile](../mobile/index.md#local-setup)
- Installa e configura la [EAS CLI](https://docs.expo.dev/eas/)
- Assicurati di avere accesso a Google Play Console (Android) e/o App Store Connect di Apple (iOS)

</div>

## Creazione della build

### Android

Le build di rilascio per Android vengono eseguite in locale e firmate con il keystore di rilascio fornito da EAS. Scaricalo una sola volta con `npx eas-cli credentials -p android` (scegli **credentials.json: Download credentials from EAS**), quindi esegui:

```bash
yarn build:android
```

Il bundle per Google Play viene salvato in `android/app/build/outputs/bundle/release/app-release.aab`. Per creare la build su EAS, esegui invece `yarn build:android:eas`.

### iOS

Le build iOS vengono sempre eseguite su EAS:

```bash
yarn build:ios
```

## Invio agli store delle app

### Android -- Google Play Store

Carica il file AAB tramite Play Console oppure invialo con EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Invia direttamente la build iOS tramite EAS:

```bash
eas submit --platform ios
```

## Aggiornamenti OTA

Per le modifiche che riguardano solo JavaScript e non richiedono la revisione dello store, usa gli aggiornamenti over-the-air (OTA):

```bash
yarn update
```

Questo comando usa EAS Update per inviare le modifiche direttamente agli utenti, senza un invio completo allo store.

:::tip
Gli aggiornamenti OTA sono molto più rapidi delle build per gli store: le modifiche possono raggiungere gli utenti in pochi minuti anziché in giorni. Usali per correzioni di bug, modifiche al testo e piccoli interventi sull'interfaccia che non coinvolgono codice nativo.
:::

## Numeri di versione

Prima di creare una build per lo store, i numeri di versione devono essere aggiornati in più file:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` e `versionCode`)

Il numero di build iOS viene incrementato automaticamente da EAS.

:::warning
Dimenticare di aggiornare i numeri di versione in tutti i file causerà errori di build o il rifiuto dell'app da parte dello store. Controlla attentamente ogni file elencato sopra prima di avviare una build di produzione.
:::

## Articoli correlati

- **[App mobile](../mobile/index.md)** -- Guida alla configurazione locale e allo sviluppo
- **[Distribuzione delle API](./apis.md)** -- Distribuzione delle API di backend
- **[Distribuzione delle app web](./web-apps.md)** -- Distribuzione delle applicazioni web frontend
