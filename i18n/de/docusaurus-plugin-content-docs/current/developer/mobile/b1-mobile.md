---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile ist die primäre Mitglieder-seitige Mobile-App für ChurchApps, gebaut mit React Native und Expo. Es ermöglicht Gemeindeglieder, Verzeichnisse anzuzeigen, auf Spenden zuzugreifen, Anwesenheit zu überprüfen, Benachrichtigungen zu empfangen und mit ihrer Gemeinde-Gemeinschaft zu interagieren.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js** und **Expo CLI** — siehe [Voraussetzungen](../setup/prerequisites)
- Installieren Sie **Android Studio** (für Android-Emulator) oder **Xcode** (für iOS-Simulator)
- Konfigurieren Sie Ihr API-Ziel (Staging oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Setup

1. Repository klonen:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Abhängigkeiten installieren:

   ```bash
   cd B1Mobile && npm install
   ```

3. Umgebungsvariablen konfigurieren — Sample-Datei kopieren und API-Endpoints aktualisieren:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Expo Dev-Server starten:

   ```bash
   npm start
   ```

:::tip
Sie können die **Expo Go**-App auf einem physischen Gerät für schnelle Tests nutzen, ohne Android Studio oder Xcode einzurichten.
:::

## Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `STAGE` | Umgebungsstadium (z.B., `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | Root-URL für Content-Lieferung |
| `MEMBERSHIP_API` | Membership-API-Endpoint |
| `MESSAGING_API` | Messaging-API-Endpoint |
| `ATTENDANCE_API` | Attendance-API-Endpoint |
| `GIVING_API` | Giving-API-Endpoint |
| `DOING_API` | Doing-API-Endpoint |
| `CONTENT_API` | Content-API-Endpoint |
| `LESSONS_ROOT` | Root-URL für Lessons-Content |

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm start` | Expo Dev-Server starten |
| `npm run android` | Auf Android-Emulator ausführen |
| `npm run ios` | Auf iOS-Simulator ausführen |
| `npm run test` | Tests ausführen (Jest) |

## Production-Builds

Vor Erstellung eines Production-Builds müssen Versionsnummern in allen folgenden Dateien aktualisiert werden:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Dies nutzt EAS Build, um die Android-Binärdatei zu erstellen.

### iOS

```bash
eas build --platform ios --profile production
```

### OTA-Updates

Um ein Over-the-Air-Update zu pushen (ohne App-Store-Review):

```bash
npm run update:production
```

:::info
OTA-Updates sind ideal für JavaScript-Only-Änderungen. Wenn Sie Native-Code oder Abhängigkeiten modifizieren, müssen Sie stattdessen einen vollständigen Store-Build submitten.
:::

## Verwandte Artikel

- **[Mobile-Deployment](../deployment/mobile)** — Vollständiger Leitfaden zum Bauen, Submitten und Deployen von Mobile-Apps
- **[Umgebungsvariablen](../setup/environment-variables)** — Vollständige Referenz für Mobile-Umgebungskonfiguration
