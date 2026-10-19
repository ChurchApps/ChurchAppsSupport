---
title: "Voraussetzungen"
---

# Voraussetzungen

<div class="article-intro">

Welche Werkzeuge Sie benötigen, hängt davon ab, an welchen Projekten Sie arbeiten möchten. Diese Seite listet die gesamte erforderliche Software nach Entwicklungsbereich geordnet auf, von den universellen Anforderungen bis zu den plattformspezifischen Toolchains.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie den [Projektüberblick](./project-overview), um festzustellen, an welchen Projekten Sie arbeiten möchten
- Sie benötigen Administratorrechte auf Ihrem Entwicklungsrechner, um Software zu installieren

</div>

## Alle Projekte

Diese werden unabhängig davon benötigt, an welchem Projekt Sie arbeiten:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ ist für B1App und LessonsApp (Next.js 16) erforderlich |
| **npm** | Wird mit Node.js mitgeliefert | Wird in allen Projekten als Paketmanager verwendet |
| **Git** | Aktuell | Jedes Projekt ist ein eigenes Repository |

:::tip
Verwenden Sie einen Node-Versionsmanager wie [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oder [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), um einfach zwischen Node-Versionen zu wechseln.
:::

## Backend-API-Entwicklung

Wenn Sie die API lokal ausführen möchten (statt auf die Demo-APIs zu zeigen):

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **MySQL** | 8.0+ | Jedes API-Modul verwendet eine eigene Datenbank |

Für die Kern-API benötigen Sie sechs Datenbanken: `membership`, `attendance`, `content`, `giving`, `messaging` und `doing`. Die API enthält Skripte zur Initialisierung des Schemas — siehe die Anleitung [Lokale API-Einrichtung](../api/local-setup).

## Entwicklung der mobilen App

Für B1Mobile, B1Checkin, LessonsScreen oder andere React-Native- / Expo-Apps:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Expo CLI** | Aktuell | Global installieren: `npm install -g expo-cli` |
| **Android Studio** | Aktuell | Für die Android-Entwicklung erforderlich (enthält das Android SDK) |
| **Xcode** | Aktuell | Für die iOS-Entwicklung erforderlich (nur macOS) |

:::info
Für schnelle Tests können Sie die App Expo Go auf einem physischen Gerät verwenden, ohne Android Studio oder Xcode. Für die Erstellung produktiver Binärdateien benötigen Sie jedoch die nativen Toolchains.
:::

## FreeShow (Desktop-App) Entwicklung

FreeShow benötigt zusätzliche native Build-Abhängigkeiten, da es native Node-Module (wie `canvas`) kompiliert:

### Alle Plattformen

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Python** | 3.12 | Wird von `node-gyp` zur Kompilierung nativer Module benötigt |
| **setuptools** | Aktuell | Installation über `pip install setuptools` |

### Windows

| Werkzeug | Hinweise |
|------|-------|
| **Visual Studio** | Die Community-Edition genügt |
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

Führen Sie diese Befehle aus, um zu bestätigen, dass alles installiert ist:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Nächste Schritte

- **[Projektüberblick](./project-overview)** — Alle Projekte und ihre Aufgaben anzeigen
- **[Umgebungsvariablen](./environment-variables)** — Ihre `.env`-Dateien konfigurieren
