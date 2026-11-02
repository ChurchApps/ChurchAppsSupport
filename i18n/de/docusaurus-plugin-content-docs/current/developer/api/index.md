---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps-API ist ein **modularer Monolith** — eine einzige Codebasis, die sechs Datenmodule bedient, wobei jedes Modul seine eigene Datenbank hat. Diese Architektur bietet die organisatorischen Vorteile von Microservices (klare Grenzen, unabhängige Datenspeicher) bei der betrieblichen Einfachheit einer einzigen Bereitstellung.

</div>

## Module

| Modul | Zweck |
|--------|---------|
| **Membership** | Personen, Gruppen, Haushalte, Berechtigungen |
| **Attendance** | Gottesdienste, Sitzungen, Check-in-Datensätze |
| **Content** | Seiten, Abschnitte, Elemente, Streaming |
| **Giving** | Spenden, Fonds, Zahlungsabwicklung |
| **Messaging** | Unterhaltungen, Benachrichtigungen, E-Mail |
| **Doing** | Aufgaben, Pläne, Zuweisungen |

## Technologie-Stack

- **Laufzeitumgebung:** Node.js 24.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Dependency Injection:** Inversify (decoratorbasiertes Routing)
- **Datenbank:** MySQL — eine Datenbank pro Modul, jede mit eigenem Verbindungspool
- **Authentifizierung:** JWT-basierte Authentifizierung über `CustomAuthProvider`
- **Bereitstellung:** AWS Lambda über das Serverless Framework v3

## Ports

| Protokoll | Port | Beschreibung |
|----------|------|-------------|
| HTTP | `8084` | Haupt-REST-API |
| WebSocket | `8087` | Echtzeit-Socketverbindungen |

## Lambda-Funktionen

Bei der Bereitstellung in AWS läuft die API als sechs Lambda-Funktionen:

- **`web`** -- Verarbeitet alle HTTP-Anfragen
- **`socket`** -- Verwaltet WebSocket-Verbindungen
- **`timer15Min`** -- Läuft alle 30 Minuten für E-Mail-Benachrichtigungen (der Name ist historisch bedingt)
- **`timerMidnight`** -- Läuft täglich für Digest-E-Mails und Wartungsaufgaben
- **`timerScheduledTasks`** -- Läuft täglich für fällige Automatisierungen und die Verarbeitung überfälliger Workflows
- **`timerWebhooks`** -- Läuft jede Minute, um wartende ausgehende Webhooks zuzustellen

## Gemeinsam genutzte Bibliotheken

Die API hängt von zwei gemeinsamen ChurchApps-Paketen ab:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Grundlegende Hilfsfunktionen (DateHelper, ApiHelper usw.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Hilfsfunktionen für den Express-Server, einschließlich Authentifizierung, Datenbankhilfen und AWS-Integrationen

:::info
Die API verwendet ES-Module (`"type": "module"` in `package.json`). Achten Sie darauf, dass Ihre Importe die ES-Modul-Syntax verwenden.
:::

## In diesem Abschnitt

- **[Lokale Einrichtung](./local-setup)** -- Klonen, konfigurieren und die API lokal ausführen
- **[Datenbank](./database)** -- Architektur mit einer Datenbank pro Modul, Schema-Skripte und Muster für den Datenzugriff
- **[Modulstruktur](./module-structure)** -- Controller, Repositories, Modelle und Authentifizierung
- **[API-Schlüssel](./api-keys)** -- Persönliche Zugriffstoken für Skripte und Connectors
- **[Connected Apps (OAuth)](./connected-apps)** -- Mandantenfähiger OAuth-Ablauf für Apps von Drittanbietern
- **[Webhooks](./webhooks)** -- Ereignisbenachrichtigungen an externe Systeme senden
- **[MCP-Server](./mcp)** -- Model-Context-Protocol-Endpunkt, der die API für KI-Assistenten bereitstellt
- **[Endpunkt-Referenz](./endpoints/)** -- Vollständige REST-API-Dokumentation für alle Module
