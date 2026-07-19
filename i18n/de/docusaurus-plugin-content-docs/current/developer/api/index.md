---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps API ist eine **modulare Monolith** – eine einzelne Codebasis, die sechs Datenmodule bedient, die jeweils über eine eigene Datenbank verfügen. Diese Architektur bietet dir die organisatorischen Vorteile von Mikrodiensten (klare Grenzen, unabhängige Datenspeicher) mit der betrieblichen Einfachheit einer einzigen Bereitstellung.

</div>

## Module

| Modul | Zweck |
|--------|---------|
| **Mitgliedschaft** | Personen, Gruppen, Haushalte, Berechtigungen |
| **Anwesenheit** | Gottesdienste, Sitzungen, Check-In-Datensätze |
| **Inhalt** | Seiten, Abschnitte, Elemente, Streaming |
| **Spenden** | Spenden, Fonds, Zahlungsverarbeitung |
| **Messaging** | Unterhaltungen, Benachrichtigungen, E-Mail |
| **Tun** | Aufgaben, Pläne, Zuweisungen |

## Tech Stack

- **Laufzeit:** Node.js 22.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Dependency Injection:** Inversify (Decorator-basiertes Routing)
- **Datenbank:** MySQL – eine Datenbank pro Modul, jede mit ihrem eigenen Verbindungspool
- **Auth:** JWT-basierte Authentifizierung über `CustomAuthProvider`
- **Bereitstellung:** AWS Lambda über Serverless Framework v3

## Ports

| Protokoll | Port | Beschreibung |
|----------|------|-------------|
| HTTP | `8084` | Haupt-REST-API |
| WebSocket | `8087` | Echtzeit-Socket-Verbindungen |

## Lambda-Funktionen

Wenn in AWS bereitgestellt, wird die API als sechs Lambda-Funktionen ausgeführt:

- **`web`** – Verarbeitet alle HTTP-Anfragen
- **`socket`** – Verwaltet WebSocket-Verbindungen
- **`timer15Min`** – Wird alle 30 Minuten für E-Mail-Benachrichtigungen ausgeführt (der Name ist historisch)
- **`timerMidnight`** – Wird täglich für Verdauungs-E-Mails und Wartungsaufgaben ausgeführt
- **`timerScheduledTasks`** – Wird täglich für fällige Automatisierungen und überfällige Workflow-Verarbeitung ausgeführt
- **`timerWebhooks`** – Wird jede Minute ausgeführt, um warteschlangen-basierte ausgehende Webhooks bereitzustellen

## Gemeinsame Bibliotheken

Die API hängt von zwei gemeinsamen ChurchApps-Paketen ab:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** – Basis-Dienstprogramme (DateHelper, ApiHelper usw.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** – Express-Server-Dienstprogramme einschließlich Auth, Datenbank-Helfer und AWS-Integrationen

:::info
Die API verwendet ES-Module (`"type": "module"` in `package.json`). Stelle sicher, dass deine Imports die ES-Modul-Syntax verwenden.
:::

## In diesem Bereich

- **[Lokales Setup](./local-setup)** – Klone, konfiguriere und führe die API lokal aus
- **[Datenbank](./database)** – Datenbank-pro-Modul-Architektur, Schema-Skripte und Datenzugriffsmuster
- **[Modul-Struktur](./module-structure)** – Controller, Repositories, Modelle und Authentifizierung
- **[API-Schlüssel](./api-keys)** – Persönliche Zugriffstokens für Skripte und Konnektoren
- **[Verbundene Apps (OAuth)](./connected-apps)** – Multi-Mandanten-OAuth-Fluss für Third-Party-Apps
- **[Webhooks](./webhooks)** – Schiebe Event-Benachrichtigungen zu externen Systemen
- **[MCP-Server](./mcp)** – Model Context Protocol-Endpunkt, der die API AI-Assistenten aussetzt
- **[Endpunkt-Referenz](./endpoints/)** – Vollständige REST-API-Dokumentation für alle Module
