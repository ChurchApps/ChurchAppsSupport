---
title: "Voraussetzungen"
---

# Voraussetzungen

<div class="article-intro">

Welche Werkzeuge Sie benötigen, hängt davon ab, an welchen Projekten Sie arbeiten möchten. Diese Seite listet die gesamte erforderliche Software nach Entwicklungsbereich geordnet auf, von den universellen Anforderungen bis zu den plattformspezifischen Toolchains.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie den [Projektüberblick](./project-overview), um festzulegen, an welchen Projekten Sie arbeiten möchten
- Sie benötigen Administratorrechte auf Ihrem Entwicklungsrechner, um Software zu installieren

</div>

## Alle Projekte

Diese sind unabhängig davon erforderlich, an welchem Projekt Sie arbeiten:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ ist für B1App und LessonsApp (Next.js 16) erforderlich; 24+ für die Api |
| **npm** | Wird mit Node.js installiert | Dient als Paketmanager in allen Projekten |
| **Git** | Aktuell | Jedes Projekt ist ein eigenes Repository |

:::tip
Verwenden Sie einen Versionsmanager für Node wie [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oder [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), um einfach zwischen Node-Versionen zu wechseln.
:::

## Entwicklung des Backend-API

Wenn Sie die API lokal ausführen möchten (statt auf die Demo-APIs zu zeigen):

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **MySQL** | 8.0+ | Jedes API-Modul verwendet seine eigene Datenbank |

Für die Kern-API benötigen Sie sechs Datenbanken: `membership`, `attendance`, `content`, `giving`, `messaging` und `doing`. Die API enthält Skripte, um das Schema anzulegen — siehe die Anleitung [Lokale API-Einrichtung](../api/local-setup).

## Entwicklung mobiler Apps

Für B1Mobile, B1Checkin, LessonsScreen oder andere React-Native- / Expo-Apps:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Expo CLI** | Aktuell | Global installieren: `npm install -g expo-cli` |
| **Android Studio** | Aktuell | Erforderlich für die Android-Entwicklung (enthält das Android SDK) |
| **Xcode** | Aktuell | Erforderlich für die iOS-Entwicklung (nur macOS) |

:::info
Für schnelle Tests können Sie die App Expo Go auf einem physischen Gerät verwenden, ohne Android Studio oder Xcode. Zum Erstellen produktiver Binärdateien benötigen Sie jedoch die nativen Toolchains.
:::

## Entwicklung von FreeShow (Desktop-App)

FreeShow hat zusätzliche native Build-Abhängigkeiten, weil es native Node-Module (etwa `canvas`) kompiliert:

### Alle Plattformen

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Python** | 3.12 | Von `node-gyp` für die Kompilierung nativer Module benötigt |
| **setuptools** | Aktuell | Installieren über `pip install setuptools` |

### Windows

| Werkzeug | Hinweise |
|------|-------|
| **Visual Studio** | Die Community-Edition genügt |
| **Arbeitslast „Desktopentwicklung mit C++“** | Während der Installation von Visual Studio auswählen |
| **Windows 10 SDK** | Im C++-Workload enthalten; sicherstellen, dass es ausgewählt ist |

Die Build-Werkzeuge von Visual Studio können Sie über die Befehlszeile installieren:

```bash
npm install --global windows-build-tools
```

Alternativ installieren Sie Visual Studio Community und wählen während der Installation den Workload „Desktopentwicklung mit C++“.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Die Xcode Command Line Tools reichen in der Regel aus:

```bash
xcode-select --install
```

## Installation prüfen

Führen Sie diese Befehle aus, um zu bestätigen, dass alles installiert ist:

```bash
node --version    # Sollte v20.x.x oder höher ausgeben
npm --version     # Sollte 10.x.x oder höher ausgeben
git --version     # Sollte git version 2.x.x ausgeben
mysql --version   # Nur für die lokale API-Entwicklung nötig
```

## Nächste Schritte

- **[Projektüberblick](./project-overview)** -- Alle Projekte und ihre Aufgaben im Überblick
- **[Umgebungsvariablen](./environment-variables)** -- Konfigurieren Sie Ihre `.env`-Dateien
