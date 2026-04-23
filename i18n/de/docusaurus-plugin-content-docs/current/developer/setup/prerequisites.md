---
title: "Voraussetzungen"
---

# Voraussetzungen

<div class="article-intro">

Die Werkzeuge, die Sie benötigen, hängen ab, welche Projekte Sie bearbeiten möchten. Diese Seite listet alle erforderliche Software auf, organisiert nach Entwicklungsbereich, von universellen Anforderungen bis zu plattformspezifischen Toolchains.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Überprüfen Sie die [Projekt-Übersicht](./project-overview), um zu bestimmen, welche Projekte Sie bearbeiten möchten
- Haben Sie Administrator-Zugriff auf Ihrer Entwicklungs-Maschine zum Installieren von Software

</div>

## Alle Projekte

Diese sind erforderlich, unabhängig davon, an welchem Projekt Sie arbeiten:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ erforderlich für B1App und LessonsApp (Next.js 16) |
| **npm** | Kommt mit Node.js | Nutzt als Package Manager über alle Projekte |
| **Git** | Aktuellste | Jedes Projekt ist ein separates Repository |

:::tip
Nutzen Sie einen Node-Version-Manager wie [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oder [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), um leicht zwischen Node-Versionen zu wechseln.
:::

## Backend-API-Entwicklung

Wenn Sie die API lokal ausführen möchten (statt zu Staging zu zeigen):

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **MySQL** | 8.0+ | Jedes API-Modul nutzt seine eigene Datenbank |

Sie benötigen sechs Datenbanken für die Core-API: `membership`, `attendance`, `content`, `giving`, `messaging` und `doing`. Die API enthält Skripte zum Initialisieren des Schemas — siehe [API lokales Setup](../api/local-setup)-Leitfaden.

## Mobile-App-Entwicklung

Für B1Mobile, B1Checkin, LessonsScreen oder andere React Native / Expo-Apps:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Expo CLI** | Aktuellste | Installieren Sie global: `npm install -g expo-cli` |
| **Android Studio** | Aktuellste | Erforderlich für Android-Entwicklung (enthält Android SDK) |
| **Xcode** | Aktuellste | Erforderlich für iOS-Entwicklung (nur macOS) |

:::info
Sie können die Expo Go-App auf einem physischen Gerät für schnelle Tests ohne Android Studio oder Xcode nutzen. Jedoch erfordert das Bauen von Production-Binärdateien die nativen Toolchains.
:::

## FreeShow (Desktop-App) Entwicklung

FreeShow hat zusätzliche Native-Build-Abhängigkeiten, da es native Node-Module kompiliert (wie `canvas`):

### Alle Plattformen

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Python** | 3.12 | Erforderlich von `node-gyp` für Native-Modul-Kompilierung |
| **setuptools** | Aktuellste | Installieren via `pip install setuptools` |

### Windows

| Werkzeug | Hinweise |
|------|-------|
| **Visual Studio** | Community-Edition ist ausreichend |
| **"Desktop development with C++" workload** | Während Visual Studio-Installation auswählen |
| **Windows 10 SDK** | Im C++-Workload enthalten; stellen Sie sicher, es ist ausgewählt |

Sie können Visual Studio-Build-Werkzeuge via Kommandozeile installieren:

```bash
npm install --global windows-build-tools
```

Oder installieren Sie Visual Studio Community und wählen Sie "Desktop development with C++"-Workload während der Installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools sind typischerweise ausreichend:

```bash
xcode-select --install
```

## Installation verifizieren

Führen Sie diese Befehle aus, um zu bestätigen, dass alles installiert ist:

```bash
node --version    # Sollte v20.x.x oder höher ausgeben
npm --version     # Sollte 10.x.x oder höher ausgeben
git --version     # Sollte git version 2.x.x ausgeben
mysql --version   # Nur für lokale API-Entwicklung erforderlich
```

## Nächste Schritte

- **[Projekt-Übersicht](./project-overview)** — Siehe alle Projekte und was sie tun
- **[Umgebungsvariablen](./environment-variables)** — Konfigurieren Sie Ihre `.env`-Dateien
