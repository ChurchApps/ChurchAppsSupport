---
title: "Mobile Bereitstellung"
description: "Anleitung zum Erstellen von Android- und iOS-Releases von Expo-Apps wie B1 Checkin, zum Einreichen in die App Stores und zum Veröffentlichen von OTA-Updates mit EAS."
---

# Mobile Bereitstellung

<div class="article-intro">

Die Expo-Mobil-Apps von ChurchApps, etwa B1 Checkin, werden mit **Expo EAS Build** oder einem lokalen Gradle-Build erstellt und über die App Stores verteilt. Diese Seite beschreibt am Beispiel von B1 Checkin das Erstellen, Einreichen und Veröffentlichen von Over-the-Air-Updates (OTA) für Android und iOS.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die App lokal ein -- siehe [Mobile Apps](../mobile/index.md#local-setup)
- Installieren und konfigurieren Sie die [EAS CLI](https://docs.expo.dev/eas/)
- Stellen Sie sicher, dass Sie Zugriff auf die Google Play Console (Android) und/oder App Store Connect von Apple (iOS) haben

</div>

## Erstellen

### Android

Android-Release-Builds laufen lokal und werden mit dem Release-Keystore aus EAS signiert. Laden Sie ihn einmalig mit `npx eas-cli credentials -p android` herunter (wählen Sie **credentials.json: Download credentials from EAS**) und führen Sie anschließend aus:

```bash
yarn build:android
```

Das Google-Play-Bundle wird unter `android/app/build/outputs/bundle/release/app-release.aab` abgelegt. Um stattdessen auf EAS zu bauen, führen Sie `yarn build:android:eas` aus.

### iOS

iOS-Builds laufen immer auf EAS:

```bash
yarn build:ios
```

## Einreichen in den App Stores

### Android -- Google Play Store

Laden Sie die AAB-Datei über die Play Console hoch oder reichen Sie sie mit EAS ein:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Reichen Sie den iOS-Build direkt über EAS ein:

```bash
eas submit --platform ios
```

## OTA-Updates

Für rein JavaScript-basierte Änderungen, die keine Prüfung im App Store erfordern, verwenden Sie Over-the-Air-Updates (OTA):

```bash
yarn update
```

Dabei veröffentlicht EAS Update die Änderungen direkt für die Nutzer, ohne dass eine vollständige Einreichung im Store nötig ist.

:::tip
OTA-Updates sind deutlich schneller als Store-Builds -- Änderungen erreichen die Nutzer in Minuten statt in Tagen. Verwenden Sie sie für Fehlerbehebungen, Textänderungen und kleinere UI-Anpassungen, die keine nativen Code-Änderungen umfassen.
:::

## Versionsnummern

Vor dem Erstellen eines Store-Builds müssen die Versionsnummern in mehreren Dateien aktualisiert werden:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` und `versionCode`)

Die iOS-Build-Nummer wird von EAS automatisch erhöht.

:::warning
Wenn Sie die Versionsnummern nicht in allen Dateien aktualisieren, kommt es zu Build-Fehlern oder zur Ablehnung durch den App Store. Prüfen Sie jede oben aufgeführte Datei noch einmal, bevor Sie einen Produktions-Build starten.
:::

## Verwandte Artikel

- **[Mobile Apps](../mobile/index.md)** -- Anleitung zur lokalen Einrichtung und Entwicklung
- **[API-Bereitstellung](./apis.md)** -- Bereitstellung der Backend-APIs
- **[Web-App-Bereitstellung](./web-apps.md)** -- Bereitstellung der Frontend-Webanwendungen
