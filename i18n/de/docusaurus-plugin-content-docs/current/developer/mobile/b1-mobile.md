---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile ist die wichtigste mobile App für Mitglieder von ChurchApps, entwickelt mit React Native und Expo. Mit ihr können Kirchenmitglieder Verzeichnisse einsehen, auf Spenden zugreifen, die Anwesenheit prüfen, Benachrichtigungen erhalten und mit ihrer Kirchengemeinde in Kontakt treten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und die **Expo CLI** — siehe [Voraussetzungen](../setup/prerequisites)
- Installieren Sie **Android Studio** (für den Android-Emulator) oder **Xcode** (für den iOS-Simulator)
- Konfigurieren Sie Ihr API-Ziel (Demo oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Einrichtung

1. Klonen Sie das Repository:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Installieren Sie die Abhängigkeiten:

   ```bash
   cd B1Mobile && npm install
   ```

3. Konfigurieren Sie die Umgebungsvariablen — kopieren Sie die Beispieldatei und aktualisieren Sie die API-Endpunkte:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Starten Sie den Expo-Entwicklungsserver:

   ```bash
   npm start
   ```

:::tip
Für schnelle Tests auf einem physischen Gerät können Sie die App **Expo Go** verwenden, ohne Android Studio oder Xcode einzurichten.
:::

## Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `STAGE` | Umgebungsstufe (z. B. `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Basis-URL für die Auslieferung von Inhalten |
| `MEMBERSHIP_API` | Endpunkt der Membership-API |
| `MESSAGING_API` | Endpunkt der Messaging-API |
| `ATTENDANCE_API` | Endpunkt der Attendance-API |
| `GIVING_API` | Endpunkt der Giving-API |
| `DOING_API` | Endpunkt der Doing-API |
| `CONTENT_API` | Endpunkt der Content-API |
| `LESSONS_ROOT` | Basis-URL für Lektionsinhalte |

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm start` | Expo-Entwicklungsserver starten |
| `npm run android` | Auf dem Android-Emulator ausführen |
| `npm run ios` | Auf dem iOS-Simulator ausführen |
| `npm run test` | Tests ausführen (Jest) |

## Produktions-Builds

Bevor Sie einen Produktions-Build erstellen, aktualisieren Sie die Versionsnummern in all diesen Dateien:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Dies verwendet EAS Build, um die Android-Binärdatei zu erstellen.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-Updates

Um ein Over-the-Air-Update zu veröffentlichen (ohne Prüfung durch den App Store):

```bash
npm run update:production
```

:::info
OTA-Updates eignen sich ideal für reine JavaScript-Änderungen. Wenn Sie nativen Code oder Abhängigkeiten ändern, müssen Sie stattdessen einen vollständigen Store-Build einreichen.
:::

## Verwandte Artikel

- **[Mobile Bereitstellung](../deployment/mobile)** — Vollständige Anleitung zum Erstellen, Einreichen und Veröffentlichen mobiler Apps
- **[Umgebungsvariablen](../setup/environment-variables)** — Vollständige Referenz zur Konfiguration der mobilen Umgebung
