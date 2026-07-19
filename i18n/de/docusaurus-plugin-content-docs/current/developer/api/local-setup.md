---
title: "Lokales API-Setup"
---

# Lokales API-Setup

<div class="article-intro">

Dieser Leitfaden führt dich durch die Einrichtung der ChurchApps API für die lokale Entwicklung. Du wirst das Repository klonen, deine Datenbankverbindungen konfigurieren, das Schema initialisieren und den Dev-Server mit Hot-Reload starten.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Installiere **Node.js 22+**, **Git** und **MySQL 8.0+** – siehe [Voraussetzungen](../setup/prerequisites)
- Erstelle einen MySQL-Benutzer mit Datenerstellungsberechtigungen
- Überprüfe die Referenz [Umgebungsvariablen](../setup/environment-variables) für die API-Konfiguration

</div>

## Schritt-für-Schritt-Setup

### 1. Klone das Repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installiere Abhängigkeiten

Das Projekt verwendet Yarn (ein Guard blockiert `npm install`):

```bash
cd Api
yarn install
```

### 3. Konfiguriere Umgebungsvariablen

```bash
cp .env.sample .env
```

Öffne `.env` und konfiguriere deine MySQL-Verbindungsstrings. Jedes Modul benötigt seine eigene Datenbankverbindung im folgenden Format:

```
mysql://root:password@localhost:3306/dbname
```

Du brauchst Verbindungsstrings für alle sechs Moduldatenbanken (Mitgliedschaft, Anwesenheit, Inhalt, Spenden, Messaging, Tun).

### 4. Initialisiere die Datenbanken

```bash
npm run initdb
```

Dies erstellt automatisch alle sechs Datenbanken und ihre Tabellen.

:::tip
Du kannst die Datenbank eines einzelnen Moduls mit `npm run initdb -- --module=membership` (oder `attendance`, `content`, `giving`, `messaging`, `doing`) initialisieren.
:::

### 5. Starte den Dev-Server

```bash
npm run dev
```

Die API startet mit Hot-Reload bei [http://localhost:8084](http://localhost:8084).

## Wichtigste Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Starte Dev-Server mit Hot-Reload (tsx watch) |
| `npm run build` | Bereinige, kompiliere TypeScript und kopiere Assets |
| `npm run test` | Führe Tests mit Jest aus (enthält Abdeckung) |
| `npm run test:watch` | Führe Tests im Watch-Modus aus |
| `npm run lint` | Führe ESLint mit Auto-Fix aus (ESLint ist der alleinige Formatter) |

## Staging-Bereitstellung

Um in der Staging-Umgebung bereitzustellen:

```bash
npm run deploy-staging
```

Dies führt einen Produktions-Build durch und stellt dann über Serverless Framework bereit.

:::warning
Stelle sicher, dass deine AWS-Anmeldedaten konfiguriert sind, bevor du den Deploy-Befehl ausführst.
:::

## Lokale Bibliotheks-Entwicklung

Wenn du eine gemeinsame Bibliothek (`@churchapps/helpers` oder `@churchapps/apihelper`) zusammen mit der API entwickeln musst, baue sie im [Packages](https://github.com/ChurchApps/Packages)-Workspace auf und füge ein temporäres Yarn-Portal in der API hinzu:

```bash
# Im Packages-Workspace
yarn build

# Im API-Verzeichnis
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

Dies ermöglicht dir, Bibliotheksänderungen gegen die API zu testen, ohne sie auf npm zu veröffentlichen. Siehe [Gemeinsame Bibliotheken](../shared-libraries/#local-development-against-a-consuming-app) für Details – und committe niemals die Portal-Auflösung, die der Link in `package.json` schreibt.

## Verwandte Artikel

- **[Datenbank](./database)** – Verständnis der Datenbank-pro-Modul-Architektur
- **[Modul-Struktur](./module-structure)** – Wie Controller, Repositories und Modelle organisiert sind
- **[Gemeinsame Bibliotheken](../shared-libraries/)** – Arbeiten mit `@churchapps/helpers` und `@churchapps/apihelper`
