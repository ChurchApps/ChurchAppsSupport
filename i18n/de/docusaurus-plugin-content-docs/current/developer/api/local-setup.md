---
title: "Lokales API-Setup"
---

# Lokales API-Setup

<div class="article-intro">

Diese Anleitung führt Sie durch das Setup der ChurchApps API für lokale Entwicklung. Sie werden das Repository klonen, Ihre Datenbankverbindungen konfigurieren, das Schema initialisieren und den Dev-Server mit Hot Reload starten.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js 22+**, **Git** und **MySQL 8.0+** — siehe [Voraussetzungen](../setup/prerequisites)
- Erstellen Sie einen MySQL-Benutzer mit Datenbankzugriff
- Überprüfen Sie die [Umgebungsvariablen](../setup/environment-variables)-Referenz für API-Konfiguration

</div>

## Schritt-für-Schritt-Setup

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Abhängigkeiten installieren

```bash
cd Api
npm install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp .env.sample .env
```

Öffnen Sie `.env` und konfigurieren Sie Ihre MySQL-Verbindungszeichenfolgen. Jedes Modul benötigt seine eigene Datenbankverbindung im folgenden Format:

```
mysql://root:password@localhost:3306/dbname
```

Sie benötigen Verbindungszeichenfolgen für alle sechs Modul-Datenbanken (membership, attendance, content, giving, messaging, doing).

### 4. Datenbanken initialisieren

```bash
npm run initdb
```

Dies erstellt alle sechs Datenbanken und deren Tabellen automatisch.

:::tip
Sie können die Datenbank eines einzelnen Moduls mit `npm run initdb:membership` initialisieren (oder `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Dev-Server starten

```bash
npm run dev
```

Die API startet mit Hot Reload bei [http://localhost:8084](http://localhost:8084).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Dev-Server mit Hot Reload starten (tsx watch) |
| `npm run build` | TypeScript bereinigen, kompilieren und Assets kopieren |
| `npm run test` | Tests mit Jest ausführen (enthält Coverage) |
| `npm run test:watch` | Tests im Watch-Modus ausführen |
| `npm run lint` | Prettier und ESLint mit Auto-Fix ausführen |

## Staging-Deployment

Um zur Staging-Umgebung zu deployen:

```bash
npm run deploy-staging
```

Dies führt einen Production-Build durch und dann Deployment via Serverless Framework.

:::warning
Stellen Sie sicher, dass Ihre AWS-Anmeldedaten konfiguriert sind, bevor Sie den Deploy-Befehl ausführen.
:::

## Lokale Bibliotheksentwicklung

Wenn Sie eine gemeinsame Bibliothek (`@churchapps/helpers` oder `@churchapps/apihelper`) zusammen mit der API entwickeln müssen, nutzen Sie `npm link`:

```bash
# Im Bibliotheksverzeichnis
cd Helpers
npm run build
npm link

# Im API-Verzeichnis
cd ../Api
npm link @churchapps/helpers
```

Dies ermöglicht es Ihnen, Bibliotheksänderungen gegen die API zu testen, ohne in npm zu veröffentlichen.

## Verwandte Artikel

- **[Datenbank](./database)** — Die Datenbank-pro-Modul-Architektur verstehen
- **[Modulstruktur](./module-structure)** — Wie Controller, Repositories und Modelle organisiert sind
- **[Gemeinsame Biblioteken](../shared-libraries/)** — Arbeiten mit `@churchapps/helpers` und `@churchapps/apihelper`
