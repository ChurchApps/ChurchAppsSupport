---
title: "Mobile-Deployment"
---

# Mobile-Deployment

<div class="article-intro">

ChurchApps Mobile-Apps werden mit **Expo EAS Build** gebaut und über die App-Stores verteilt. Diese Seite behandelt das Bauen, Submitten und Pushen von Over-the-Air-Updates für Android und iOS.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie die Mobile-App lokal ein — siehe [B1 Mobile](../mobile/b1-mobile)
- Installieren und konfigurieren Sie die [EAS CLI](https://docs.expo.dev/eas/)
- Haben Sie Zugriff auf Google Play Console (Android) und/oder Apple App Store Connect (iOS)

</div>

## Bauen

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Submitten an App-Stores

### Android — Google Play Store

Nach erfolgreicher EAS-Build wird die Android-Binärdatei (AAB) über Play Console an den Google Play Store submitted.

### iOS — Apple App Store

Submitten Sie den iOS-Build direkt via EAS:

```bash
eas submit --platform ios
```

## OTA-Updates

Für JavaScript-Only-Änderungen, die kein App-Store-Review benötigen, nutzen Sie Over-the-Air-Updates (OTA):

```bash
npm run update:production
```

Dies nutzt EAS Update, um Änderungen direkt an Benutzer zu pushen, ohne einen vollständigen Store-Submit.

:::tip
OTA-Updates sind significantly schneller als Store-Builds — Änderungen können in Minuten statt Tagen bei Benutzern ankommen. Nutzen Sie sie für Bug-Fixes, Copy-Änderungen und Minor-UI-Updates, die keine Native-Code-Änderungen beinhalten.
:::

## Versionsnummern

Vor Erstellung eines Store-Builds müssen Versionsnummern in mehreren Dateien aktualisiert werden:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Das Vergessen, Versionsnummern in allen Dateien zu aktualisieren, verursacht Build-Fehler oder App-Store-Ablehnung. Überprüfen Sie doppelt jede oben aufgelistete Datei, bevor Sie einen Production-Build starten.
:::

## Verwandte Artikel

- **[B1 Mobile](../mobile/b1-mobile)** — Lokaler Setup- und Entwicklungsleitfaden
- **[API-Deployment](./apis)** — Backend-APIs deployen
- **[Web-App-Deployment](./web-apps)** — Frontend-Web-Anwendungen deployen
