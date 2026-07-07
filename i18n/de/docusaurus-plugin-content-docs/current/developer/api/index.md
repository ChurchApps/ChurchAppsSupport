---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps API ist ein **modulares Monolith** -- eine einzelne Codebasis, die sechs Datenmodule bedient, jedes mit seiner eigenen Datenbank. Diese Architektur gibt Ihnen die organisatorischen Vorteile von Microservices (klare Grenzen, unabhängige Datenspeicher) mit der operativen Einfachheit einer einzelnen Bereitstellung.

</div>

## Module

| Module | Zweck |
|--------|---------|
| **Membership** | Personen, Gruppen, Haushalte, Berechtigungen |
| **Attendance** | Services, Sessions, Check-In-Datensätze |
| **Content** | Seiten, Abschnitte, Elemente, Streaming |
| **Giving** | Spenden, Fonds, Zahlungsabwicklung |
| **Messaging** | Gespräche, Benachrichtigungen, E-Mail |
| **Doing** | Aufgaben, Pläne, Zuweisungen |

## Tech-Stack

- **Runtime:** Node.js 22.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Dependency Injection:** Inversify (dekorator-basiertes Routing)
- **Datenbank:** MySQL -- eine Datenbank pro Modul, jede mit ihrem eigenen Verbindungspool
- **Auth:** JWT-basierte Authentifizierung über CustomAuthProvider
- **Bereitstellung:** AWS Lambda über Serverless Framework v3

## Ports

| Protocol | Port | Beschreibung |
|----------|------|-------------|
| HTTP | 8084 | Haupt-REST-API |
| WebSocket | 8087 | Echtzeitocket-Verbindungen |

## Lambda-Funktionen

Bei der Bereitstellung auf AWS läuft die API als sechs Lambda-Funktionen:

- **web** -- Verarbeitet alle HTTP-Anfragen
- **socket** -- Verwaltet WebSocket-Verbindungen
- **	imer15Min** -- Läuft alle 30 Minuten für E-Mail-Benachrichtigungen (der Name ist historisch)
- **	imerMidnight** -- Läuft täglich für Verdauungs-E-Mails und Wartungsaufgaben
- **	imerScheduledTasks** -- Läuft täglich für Automationen und übergeordnete Workflow-Verarbeitung
- **	imerWebhooks** -- Läuft jede Minute, um ausstehende ausgehende Webhooks zu liefern

## Freigegebene Bibliotheken

Die API hängt von zwei freigegebenen ChurchApps-Paketen ab:

- **[@churchapps/helpers](../shared-libraries/helpers)** -- Basis-Hilfsfunktionen (DateHelper, ApiHelper, etc.)
- **[@churchapps/apihelper](../shared-libraries/api-helper)** -- Express-Server-Hilfsfunktionen einschließlich Auth, Datenbank-Helfer und AWS-Integrationen

:::info
Die API verwendet ES-Module (\"type\": \"module\" in package.json). Stellen Sie sicher, dass Ihre Importe die ES-Modul-Syntax verwenden.
:::

## In diesem Abschnitt

- **[Lokale Einrichtung](./local-setup)** -- Klonen, Konfigurieren und Ausführen der API lokal
- **[Datenbank](./database)** -- Datenbankarchitektur pro Modul, Schemaskripte und Datenzugriffsmuster
- **[Modulstruktur](./module-structure)** -- Controller, Repositories, Modelle und Authentifizierung
- **[API-Schlüssel](./api-keys)** -- Persönliche Zugriffstokens für Skripte und Connectoren
- **[Verbundene Apps (OAuth)](./connected-apps)** -- Multi-Tenant-OAuth-Fluss für Drittanbieter-Apps
- **[Webhooks](./webhooks)** -- Senden Sie Ereignisbenachrichtigungen an externe Systeme
- **[MCP-Server](./mcp)** -- Model Context Protocol Endpunkt, der die API für KI-Assistenten verfügbar macht
- **[Endpunkt-Referenz](./endpoints/)** -- Komplette REST-API-Dokumentation für alle Module
