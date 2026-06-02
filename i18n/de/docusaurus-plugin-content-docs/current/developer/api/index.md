---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps API ist ein **Modularmonolith** -- eine einzelne Codebasis, die sechs verschiedene Module bedient, jedes mit seiner eigenen Datenbank. Diese Architektur bietet Ihnen die organisatorischen Vorteile von Microservices (klare Grenzen, unabhängige Datenspeicher) mit der operativen Einfachheit einer einzelnen Bereitstellung.

</div>

## Module

| Modul | Zweck |
|-------|-------|
| **Mitgliedschaft** | Personen, Gruppen, Haushalte, Berechtigungen |
| **Teilnahme** | Gottesdienste, Sitzungen, Check-in-Aufzeichnungen |
| **Inhalte** | Seiten, Abschnitte, Elemente, Streaming |
| **Geben** | Spenden, Fonds, Zahlungsabwicklung |
| **Nachrichten** | Gespräche, Benachrichtigungen, E-Mail |
| **Aufgaben** | Aufgaben, Pläne, Zuordnungen |

## Tech Stack

- **Laufzeit:** Node.js 22.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Abhängigkeitsinjektion:** Inversify (dekorator-basiertes Routing)
- **Datenbank:** MySQL -- eine Datenbank pro Modul, jede mit ihrem eigenen Verbindungspool
- **Auth:** JWT-basierte Authentifizierung über `CustomAuthProvider`
- **Bereitstellung:** AWS Lambda über Serverless Framework v3

## Ports

| Protokoll | Port | Beschreibung |
|-----------|------|-------------|
| HTTP | `8084` | Haupt-REST-API |
| WebSocket | `8087` | WebSocket-Echtzeit-Verbindungen |

## Lambda-Funktionen

Bei der Bereitstellung auf AWS wird die API als vier Lambda-Funktionen ausgeführt:

- **`web`** -- Verarbeitet alle HTTP-Anfragen
- **`socket`** -- Verwaltet WebSocket-Verbindungen
- **`timer15Min`** -- Wird alle 15 Minuten für E-Mail-Benachrichtigungen ausgeführt
- **`timerMidnight`** -- Wird täglich für Digest-E-Mails und Wartungsaufgaben ausgeführt

## Freigegebene Bibliotheken

Die API hängt von zwei freigegebenen ChurchApps-Paketen ab:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Basis-Utilities (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-Server-Utilities einschließlich Auth, Datenbankhelper und AWS-Integrationen

:::info
Die API verwendet ES-Module (`"type": "module"` in `package.json`). Stellen Sie sicher, dass Ihre Importe die ES-Modul-Syntax verwenden.
:::

## In diesem Abschnitt

- **[Lokales Setup](./local-setup)** -- Klonen, konfigurieren und führen Sie die API lokal aus
- **[Datenbank](./database)** -- Datenbankarchitektur pro Modul, Schemaskripte und Datenzugriffsmuster
- **[Modulstruktur](./module-structure)** -- Controller, Repositories, Modelle und Authentifizierung
- **[API-Schlüssel](./api-keys)** -- Persönliche Zugriffstoken für Skripte und Konnektoren
- **[Connected Apps (OAuth)](./connected-apps)** -- Multi-Tenant-OAuth-Fluss für Drittanbieter-Apps
- **[Webhooks](./webhooks)** -- Event-Benachrichtigungen an externe Systeme pushen
- **[MCP-Server](./mcp)** -- Model Context Protocol-Endpunkt, der die API für KI-Assistenten verfügbar macht
- **[Endpunkt-Referenz](./endpoints/)** -- Vollständige REST-API-Dokumentation für alle Module
