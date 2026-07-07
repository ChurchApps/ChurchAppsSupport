---
title: "Lokale API-Einrichtung"
---

# Lokale API-Einrichtung

Dieser Leitfaden führt Sie durch die Einrichtung der ChurchApps API für die lokale Entwicklung.

## Schrittweise Einrichtung

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Abhängigkeiten installieren

Das Projekt verwendet Yarn:

```bash
cd Api
yarn install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp .env.sample .env
```

Öffnen Sie `.env` und konfigurieren Sie Ihre MySQL-Verbindungszeichenfolgen:

```
mysql://root:password@localhost:3306/dbname
```

Sie benötigen Verbindungszeichenfolgen für alle sechs Moduldatenbanken (membership, attendance, content, giving, messaging, doing).

### 4. Initialisieren Sie die Datenbanken

```bash
npm run initdb
```

Dies erstellt automatisch alle sechs Datenbanken und ihre Tabellen.

:::tip
Sie können die Datenbank eines einzelnen Moduls mit `npm run initdb -- --module=membership` initialisieren.
:::

### 5. Starten Sie den Dev-Server

```bash
npm run dev
```

Die API startet mit Hot-Reload auf http://localhost:8084.

## Wichtige Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Dev-Server mit Hot-Reload |
| `npm run build` | TypeScript kompilieren |
| `npm run test` | Tests mit Jest ausführen |
| `npm run lint` | ESLint ausführen |

## Bereitstellung in der Staging-Umgebung

```bash
npm run deploy-staging
```

Dies führt einen Produktions-Build durch und stellt über das Serverless Framework bereit.

## Lokale Bibliotheksentwicklung

Bauen Sie Bibliotheken im Arbeitsbereich Packages und fügen Sie ein temporäres Yarn-Portal in die API ein:

```bash
yarn link ../Packages/helpers
yarn unlink ../Packages/helpers && yarn install
```
