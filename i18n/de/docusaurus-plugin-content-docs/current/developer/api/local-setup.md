---
title: "Lokale API-Einrichtung"
---

# Lokale API-Einrichtung

<div class="article-intro">

Diese Anleitung führt Sie durch die Einrichtung der ChurchApps-API für die lokale Entwicklung. Sie klonen das Repository, konfigurieren die Datenbankverbindungen, initialisieren das Schema und starten den Entwicklungsserver mit Hot Reload.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 24+**, **Git** und **MySQL 8.0+** -- siehe [Voraussetzungen](../setup/prerequisites)
- Legen Sie einen MySQL-Benutzer mit Berechtigung zum Anlegen von Datenbanken an
- Lesen Sie die Referenz [Umgebungsvariablen](../setup/environment-variables) zur Konfiguration der API

</div>

## Schritt für Schritt

### 1. Das Repository klonen

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Abhängigkeiten installieren

Das Projekt verwendet Yarn (eine Sperre blockiert `npm install`):

```bash
cd Api
yarn install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp .env.sample .env
```

Öffnen Sie `.env` und konfigurieren Sie Ihre MySQL-Verbindungszeichenfolgen. Jedes Modul benötigt eine eigene Datenbankverbindung im folgenden Format:

```
mysql://root:password@localhost:3306/dbname
```

Sie benötigen Verbindungszeichenfolgen für alle sechs Moduldatenbanken (membership, attendance, content, giving, messaging, doing).

### 4. Die Datenbanken initialisieren

```bash
npm run initdb
```

Dies legt alle sechs Datenbanken und ihre Tabellen automatisch an.

:::tip
Sie können die Datenbank eines einzelnen Moduls mit `npm run initdb -- --module=membership` initialisieren (oder `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Den Entwicklungsserver starten

```bash
npm run dev
```

Die API startet mit Hot Reload unter [http://localhost:8084](http://localhost:8084).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Entwicklungsserver mit Hot Reload starten (tsx watch) |
| `npm run build` | Bereinigen, TypeScript kompilieren und Assets kopieren |
| `npm run test` | Tests mit Jest ausführen (inkl. Abdeckung) |
| `npm run test:watch` | Tests im Watch-Modus ausführen |
| `npm run lint` | ESLint mit automatischer Korrektur ausführen (ESLint ist der einzige Formatierer) |

## Bereitstellung

Die Staging-Umgebung wurde eingestellt. Die API wird bei jedem Push auf `main` in die Demo-Umgebung bereitgestellt und über den manuellen Workflow **Deploy Prod** in die Produktion, der außerdem ausstehende Datenbankmigrationen anwendet. Details finden Sie unter [API-Bereitstellung](../deployment/apis).

## Lokale Bibliotheksentwicklung

Müssen Sie eine gemeinsam genutzte Bibliothek (`@churchapps/helpers` oder `@churchapps/apihelper`) zusammen mit der API entwickeln, bauen Sie sie im Arbeitsbereich [Packages](https://github.com/ChurchApps/Packages) und fügen Sie in der API ein temporäres Yarn-Portal hinzu:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

So testen Sie Änderungen an der Bibliothek gegen die API, ohne sie in npm zu veröffentlichen. Siehe [Gemeinsam genutzte Bibliotheken](../shared-libraries/#local-development-against-a-consuming-app) für Details -- und committen Sie niemals die Portal-Auflösung, die der Link in `package.json` schreibt.

## Verwandte Artikel

- **[Datenbank](./database)** -- Die Architektur mit einer Datenbank pro Modul verstehen
- **[Modulstruktur](./module-structure)** -- Wie Controller, Repositories und Modelle organisiert sind
- **[Gemeinsam genutzte Bibliotheken](../shared-libraries/)** -- Mit `@churchapps/helpers` und `@churchapps/apihelper` arbeiten
