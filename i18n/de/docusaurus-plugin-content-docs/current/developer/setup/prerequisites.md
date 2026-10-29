---
title: "Voraussetzungen"
---

# Voraussetzungen

<div class="article-intro">

Welche Werkzeuge Sie benötigen, hängt davon ab, an welchen Projekten Sie arbeiten möchten. Diese Seite listet die gesamte benötigte Software nach Entwicklungsbereich, von den universellen Anforderungen bis zu den plattformspezifischen Toolchains.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Lesen Sie die [Projektübersicht](./project-overview), um festzulegen, an welchen Projekten Sie arbeiten möchten
- Sie benötigen Administratorrechte auf Ihrem Entwicklungsrechner, um Software zu installieren

</div>

## Alle Projekte

Diese Anforderungen gelten unabhängig davon, an welchem Projekt Sie arbeiten:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ wird für B1App und LessonsApp (Next.js 16) benötigt; 24+ für die Api |
| **npm** | Wird mit Node.js installiert | Wird in allen Projekten als Paketverwaltung verwendet |
| **Git** | Aktuell | Jedes Projekt ist ein eigenes Repository |

:::tip
Verwenden Sie einen Versionsverwalter für Node wie [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oder [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), um zwischen Node-Versionen einfach zu wechseln.
:::

## Entwicklung der Backend-API

Wenn Sie die API lokal ausführen möchten (statt auf die Demo-APIs zu verweisen):

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **MySQL** | 8.0+ | Jedes API-Modul verwendet seine eigene Datenbank |

Für die Kern-API benötigen Sie sechs Datenbanken: `membership`, `attendance`, `content`, `giving`, `messaging` und `doing`. Die API enthält Skripte, um das Schema zu initialisieren -- siehe die Anleitung [Lokale API-Einrichtung](../api/local-setup).

## Entwicklung mobiler Apps

Für B1Mobile, B1Checkin, LessonsScreen oder andere React-Native-/Expo-Apps:

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Expo CLI** | Aktuell | Global installieren: `npm install -g expo-cli` |
| **Android Studio** | Aktuell | Für die Android-Entwicklung erforderlich (enthält das Android SDK) |
| **Xcode** | Aktuell | Für die iOS-Entwicklung erforderlich (nur macOS) |

:::info
Für schnelle Tests können Sie die App Expo Go auf einem physischen Gerät verwenden, ohne Android Studio oder Xcode. Produktive Binärdateien zu erstellen erfordert jedoch die nativen Toolchains.
:::

## Entwicklung von FreeShow (Desktop-App)

FreeShow hat zusätzliche native Abhängigkeiten für den Build, weil es native Node-Module kompiliert (etwa `canvas`):

### Alle Plattformen

| Werkzeug | Version | Hinweise |
|------|---------|-------|
| **Python** | 3.12 | Von `node-gyp` für das Kompilieren nativer Module benötigt |
| **setuptools** | Aktuell | Installation über `pip install setuptools` |

### Windows

| Werkzeug | Hinweise |
|------|-------|
| **Visual Studio** | Die Community-Edition genügt |
| **Arbeitslast "Desktopentwicklung mit C++"** | Während der Installation von Visual Studio auswählen |
| **Windows 10 SDK** | Im Paket C++ enthalten; stellen Sie sicher, dass es ausgewählt ist |

Die Build-Werkzeuge für Visual Studio können Sie über die Kommandozeile installieren:

```bash
npm install --global windows-build-tools
```

Alternativ installieren Sie Visual Studio Community und wählen während der Installation die Arbeitslast "Desktopentwicklung mit C++".

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Die Xcode Command Line Tools genügen in der Regel:

```bash
xcode-select --install
```

## Installation prüfen

Führen Sie diese Befehle aus, um zu bestätigen, dass alles installiert ist:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Nächste Schritte

- **[Projektübersicht](./project-overview)** -- Alle Projekte und ihre Aufgaben ansehen
- **[Umgebungsvariablen](./environment-variables)** -- Ihre `.env`-Dateien konfigurieren
