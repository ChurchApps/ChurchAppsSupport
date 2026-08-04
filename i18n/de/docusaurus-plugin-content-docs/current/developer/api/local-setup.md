---
title: "Lokale API-Einrichtung"
---

# Lokale API-Einrichtung

<div class="article-intro">

Diese Anleitung führt Sie durch die Einrichtung der ChurchApps-API für die lokale Entwicklung. Sie klonen das Repository, konfigurieren Ihre Datenbankverbindungen, initialisieren das Schema und starten den Entwicklungsserver mit Hot Reload.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 22+**, **Git** und **MySQL 8.0+** -- siehe [Voraussetzungen](../setup/prerequisites)
- Erstellen Sie einen MySQL-Benutzer mit Berechtigungen zum Anlegen von Datenbanken
- Lesen Sie die Referenz [Umgebungsvariablen](../setup/environment-variables) für die API-Konfiguration

</div>

## Schrittweise Einrichtung

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Abhängigkeiten installieren

Das Projekt verwendet Yarn (eine Schutzmaßnahme blockiert `npm install`):

```bash
cd Api
yarn install
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

Dadurch werden alle sechs Datenbanken und ihre Tabellen automatisch erstellt.

:::tip
Sie können die Datenbank eines einzelnen Moduls mit `npm run initdb -- --module=membership` initialisieren (oder `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Entwicklungsserver starten

```bash
npm run dev
```

Die API startet mit Hot Reload unter [http://localhost:8084](http://localhost:8084).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Entwicklungsserver mit Hot Reload starten (tsx watch) |
| `npm run build` | Bereinigen, TypeScript kompilieren und Assets kopieren |
| `npm run test` | Tests mit Jest ausführen (inklusive Coverage) |
| `npm run test:watch` | Tests im Watch-Modus ausführen |
| `npm run lint` | ESLint mit automatischer Korrektur ausführen (ESLint ist der einzige Formatierer) |

## Staging-Deployment

Um in die Staging-Umgebung zu deployen:

```bash
npm run deploy-staging
```

Dies führt einen Produktions-Build durch und deployt anschließend über das Serverless Framework.

:::warning
Stellen Sie sicher, dass Ihre AWS-Zugangsdaten konfiguriert sind, bevor Sie den Deploy-Befehl ausführen.
:::

## Lokale Bibliotheksentwicklung

Wenn Sie eine gemeinsam genutzte Bibliothek (`@churchapps/helpers` oder `@churchapps/apihelper`) parallel zur API entwickeln müssen, erstellen Sie sie im [Packages](https://github.com/ChurchApps/Packages)-Workspace und fügen Sie in der API ein temporäres Yarn-Portal hinzu:

```bash
# Im Packages-Workspace
yarn build

# Im API-Verzeichnis
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

So können Sie Bibliotheksänderungen gegen die API testen, ohne sie auf npm zu veröffentlichen. Details finden Sie unter [Gemeinsam genutzte Bibliotheken](../shared-libraries/#local-development-against-a-consuming-app) -- und committen Sie niemals die Portal-Auflösung, die der Link in `package.json` schreibt.

## Verwandte Artikel

- **[Datenbank](./database)** -- Die Architektur einer Datenbank pro Modul verstehen
- **[Modulstruktur](./module-structure)** -- Wie Controller, Repositories und Modelle organisiert sind
- **[Gemeinsam genutzte Bibliotheken](../shared-libraries/)** -- Arbeiten mit `@churchapps/helpers` und `@churchapps/apihelper`
