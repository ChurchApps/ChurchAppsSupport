---
title: "API"
---

# API

<div class="article-intro">

Die ChurchApps API ist ein **modularer Monolith** — ein einzelner Codebase, der sechs unterschiedliche Module bedient, von denen jedes seine eigene Datenbank hat. Diese Architektur gibt Ihnen die Organisationsvorteile von Microservices (klare Grenzen, unabhängige Datenspeicher) mit der Betriebseinfachheit einer einzelnen Bereitstellung.

</div>

## Module

| Modul | Zweck |
|--------|---------|
| **Membership** | Personen, Gruppen, Haushalte, Berechtigungen |
| **Attendance** | Services, Sessions, Check-in-Datensätze |
| **Content** | Seiten, Abschnitte, Elemente, Streaming |
| **Giving** | Spenden, Fonds, Zahlungsabwicklung |
| **Messaging** | Unterhaltungen, Benachrichtigungen, E-Mail |
| **Doing** | Aufgaben, Pläne, Zuweisungen |

## Tech Stack

- **Runtime:** Node.js 22.x mit TypeScript (ES-Module)
- **Framework:** Express
- **Dependency Injection:** Inversify (Dekorator-basierte Routing)
- **Datenbank:** MySQL — eine Datenbank pro Modul, jede mit eigenem Connection Pool
- **Auth:** JWT-basierte Authentifizierung via `CustomAuthProvider`
- **Deployment:** AWS Lambda via Serverless Framework v3

## Ports

| Protokoll | Port | Beschreibung |
|----------|------|-------------|
| HTTP | `8084` | Haupt-REST-API |
| WebSocket | `8087` | Real-Time-Socket-Verbindungen |

## Lambda-Funktionen

Bei Deployment zu AWS läuft die API als vier Lambda-Funktionen:

- **`web`** — Verarbeitet alle HTTP-Anfragen
- **`socket`** — Verwaltet WebSocket-Verbindungen
- **`timer15Min`** — Läuft alle 15 Minuten für E-Mail-Benachrichtigungen
- **`timerMidnight`** — Läuft täglich für Digest-E-Mails und Wartungsaufgaben

## Gemeinsame Biblioteken

Die API hängt von zwei gemeinsamen ChurchApps-Packages ab:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** — Basis-Utilities (DateHelper, ApiHelper, usw.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** — Express-Server-Utilities inkl. Auth, Datenbankhelfer und AWS-Integrationen

:::info
Die API nutzt ES-Module (`"type": "module"` in `package.json`). Stellen Sie sicher, dass Ihre Importe die ES-Modul-Syntax verwenden.
:::

## In diesem Abschnitt

- **[Lokales Setup](./local-setup)** — API klonen, konfigurieren und lokal ausführen
- **[Datenbank](./database)** — Datenbank-pro-Modul-Architektur, Schema-Skripte und Datenzugriffsmuster
- **[Modulstruktur](./module-structure)** — Controller, Repositories, Modelle und Authentifizierung
- **[Endpoint-Referenz](./endpoints/)** — Vollständige REST-API-Dokumentation für alle Module
