---
title: "Distribuzione Mobile"
---

# Distribuzione Mobile

<div class="article-intro">

Le applicazioni mobile di ChurchApps vengono compilate e distribuite utilizzando **Expo EAS Build** e distribuite tramite gli app store. Questa pagina copre la compilazione, l'invio e il push degli aggiornamenti over-the-air sia per Android che per iOS.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura l'app mobile in locale -- vedi [B1 Mobile](../mobile/b1-mobile)
- Installa e configura la [EAS CLI](https://docs.expo.dev/eas/)
- Avere accesso alla Google Play Console (Android) e/o Apple App Store Connect (iOS)

</div>

## Compilazione

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Invio agli App Store

### Android -- Google Play Store

Dopo una compilazione EAS riuscita, il binario Android (AAB) viene inviato al Google Play Store tramite la Play Console.

### iOS -- Apple App Store

Invia la build iOS direttamente tramite EAS:

```bash
eas submit --platform ios
```

## Aggiornamenti OTA

Per le modifiche solo JavaScript che non richiedono la revisione dell'app store, utilizza gli aggiornamenti over-the-air (OTA):

```bash
npm run update:production
```

Questo utilizza EAS Update per inviare le modifiche direttamente agli utenti senza un invio completo allo store.

:::tip
Gli aggiornamenti OTA sono significativamente più veloci delle build per lo store -- le modifiche possono raggiungere gli utenti in minuti anziché giorni. Utilizzali per correzioni di bug, modifiche ai testi e aggiornamenti minori dell'interfaccia utente che non coinvolgono modifiche al codice nativo.
:::

## Numeri di Versione

Prima di creare una build per lo store, i numeri di versione devono essere aggiornati in più file:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Dimenticare di aggiornare i numeri di versione in tutti i file causerà errori di compilazione o il rifiuto da parte dell'app store. Controlla due volte ogni file elencato sopra prima di avviare una build di produzione.
:::

## Articoli Correlati

- **[B1 Mobile](../mobile/b1-mobile)** -- Guida alla configurazione locale e allo sviluppo
- **[Distribuzione delle API](./apis)** -- Distribuzione delle API backend
- **[Distribuzione delle Applicazioni Web](./web-apps)** -- Distribuzione delle applicazioni web frontend
