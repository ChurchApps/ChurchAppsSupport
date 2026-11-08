---
title: "Voraussetzungen"
description: "Richten Sie Node.js, npm, Git und die plattformspezifischen Toolchains ein, bevor Sie an ChurchApps-Projekten wie B1 Admin, Lessons.church, FreePlay oder der API lokal arbeiten."
---

# Voraussetzungen

<div class="article-intro">

Welche Werkzeuge Sie benötigen, hängt davon ab, an welchen Projekten Sie arbeiten möchten. Diese Seite listet die gesamte erforderliche Software nach Entwicklungsbereich auf, von den universellen Anforderungen bis zu den plattformspezifischen Toolchains.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie die [Projektübersicht](./project-overview.md), um festzulegen, an welchen Projekten Sie arbeiten möchten
- Sie benötigen Administratorrechte auf Ihrem Entwicklungsrechner, um Software zu installieren

</div>

## Alle Projekte

Diese Anforderungen gelten unabhängig davon, an welchem Projekt Sie arbeiten:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ ist für B1App und LessonsApp (Next.js 16) erforderlich; 24+ für die Api |
| **npm** | Wird mit Node.js installiert | Wird in allen Projekten als Paketmanager verwendet |
| **Git** | Neueste Version | Jedes Projekt ist ein eigenes Repository |

:::tip
Verwenden Sie einen Node-Versionsmanager wie [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oder [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), um einfach zwischen Node-Versionen zu wechseln.
:::

## Backend-API-Entwicklung

Wenn Sie die API lokal ausführen möchten (anstatt auf die Demo-APIs zu verweisen):

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **MySQL** | 8.0+ | Jedes API-Modul verwendet eine eigene Datenbank |

Für die Kern-API benötigen Sie sechs Datenbanken: `membership`, `attendance`, `content`, `giving`, `messaging` und `doing`. Die API enthält Skripte zur Initialisierung des Schemas -- siehe die Anleitung [API lokale Einrichtung](../api/local-setup.md).

## Mobile-App-Entwicklung

Für B1Checkin, LessonsScreen oder andere React-Native- / Expo-Apps:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Expo CLI** | Neueste Version | Global installieren: `npm install -g expo-cli` |
| **Android Studio** | Neueste Version | Erforderlich für die Android-Entwicklung (enthält das Android SDK) |
| **Xcode** | Neueste Version | Erforderlich für die iOS-Entwicklung (nur macOS) |

:::info
Für schnelle Tests auf einem physischen Gerät können Sie die Expo-Go-App verwenden, ohne Android Studio oder Xcode zu benötigen. Zum Erstellen von Produktionsbinärdateien sind jedoch die nativen Toolchains erforderlich.
:::

## FreeShow (Desktop-App) Entwicklung

FreeShow benötigt zusätzliche native Build-Abhängigkeiten, da native Node-Module (wie `canvas`) kompiliert werden:

### Alle Plattformen

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Python** | 3.12 | Wird von `node-gyp` zur Kompilierung nativer Module benötigt |
| **setuptools** | Neueste Version | Installation über `pip install setuptools` |

### Windows

| Werkzeug | Hinweise |
|------|-------|
| **Visual Studio** | Die Community-Edition reicht aus |
| **Workload „Desktopentwicklung mit C++“** | Während der Visual-Studio-Installation auswählen |
| **Windows 10 SDK** | Im C++-Workload enthalten; stellen Sie sicher, dass es ausgewählt ist |

Die Visual-Studio-Build-Tools können Sie über die Kommandozeile installieren:

```bash
npm install --global windows-build-tools
```

Alternativ installieren Sie Visual Studio Community und wählen während der Installation den Workload „Desktopentwicklung mit C++“ aus.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Die Xcode Command Line Tools reichen in der Regel aus:

```bash
xcode-select --install
```

## Installation überprüfen

Führen Sie diese Befehle aus, um zu prüfen, ob alles installiert ist:

```bash
node --version    # Sollte v20.x.x oder höher ausgeben
npm --version     # Sollte 10.x.x oder höher ausgeben
git --version     # Sollte git version 2.x.x ausgeben
mysql --version   # Nur für die lokale API-Entwicklung erforderlich
```

## Nächste Schritte

- **[Projektübersicht](./project-overview.md)** -- Alle Projekte und ihre Funktionen im Überblick
- **[Umgebungsvariablen](./environment-variables.md)** -- Konfigurieren Sie Ihre `.env`-Dateien
