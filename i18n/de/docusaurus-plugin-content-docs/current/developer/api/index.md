---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps-API ist ein **modularer Monolith** -- eine einzige Codebasis, die sechs Datenmodule bereitstellt, jedes mit einer eigenen Datenbank. Diese Architektur bietet die organisatorischen Vorteile von Microservices (klare Grenzen, unabhängige Datenspeicher) bei der operativen Einfachheit eines einzigen Deployments.

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

- **Laufzeitumgebung:** Node.js 22.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Dependency Injection:** Inversify (dekoratorbasiertes Routing)
- **Datenbank:** MySQL -- eine Datenbank pro Modul, jede mit eigenem Connection Pool
- **Authentifizierung:** JWT-basierte Authentifizierung über `CustomAuthProvider`
- **Deployment:** AWS Lambda über das Serverless Framework v3

## Ports

| Protokoll | Port | Beschreibung |
|----------|------|-------------|
| HTTP | `8084` | Haupt-REST-API |
| WebSocket | `8087` | Echtzeit-Socket-Verbindungen |

## Lambda-Funktionen

Im Deployment auf AWS läuft die API als sechs Lambda-Funktionen:

- **`web`** -- Verarbeitet alle HTTP-Anfragen
- **`socket`** -- Verwaltet WebSocket-Verbindungen
- **`timer15Min`** -- Läuft alle 30 Minuten für E-Mail-Benachrichtigungen (der Name ist historisch bedingt)
- **`timerMidnight`** -- Läuft täglich für Digest-E-Mails und Wartungsaufgaben
- **`timerScheduledTasks`** -- Läuft täglich für fällige Automatisierungen und die Verarbeitung überfälliger Workflows
- **`timerWebhooks`** -- Läuft jede Minute, um wartende ausgehende Webhooks zuzustellen

## Gemeinsam genutzte Bibliotheken

Die API ist von zwei gemeinsam genutzten ChurchApps-Paketen abhängig:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Basisdienstprogramme (DateHelper, ApiHelper usw.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express-Server-Dienstprogramme einschließlich Authentifizierung, Datenbank-Helfern und AWS-Integrationen

:::info
Die API verwendet ES-Module (`"type": "module"` in `package.json`). Stellen Sie sicher, dass Ihre Imports die ES-Modul-Syntax verwenden.
:::

## In diesem Abschnitt

- **[Lokale Einrichtung](./local-setup)** -- API klonen, konfigurieren und lokal ausführen
- **[Datenbank](./database)** -- Architektur einer Datenbank pro Modul, Schema-Skripte und Datenzugriffsmuster
- **[Modulstruktur](./module-structure)** -- Controller, Repositories, Modelle und Authentifizierung
- **[API-Schlüssel](./api-keys)** -- Persönliche Zugriffstoken für Skripte und Connectoren
- **[Verbundene Apps (OAuth)](./connected-apps)** -- Mandantenfähiger OAuth-Flow für Drittanbieter-Apps
- **[Webhooks](./webhooks)** -- Ereignisbenachrichtigungen an externe Systeme senden
- **[MCP-Server](./mcp)** -- Model-Context-Protocol-Endpunkt, der die API für KI-Assistenten bereitstellt
- **[Endpunktreferenz](./endpoints/)** -- Vollständige REST-API-Dokumentation für alle Module
