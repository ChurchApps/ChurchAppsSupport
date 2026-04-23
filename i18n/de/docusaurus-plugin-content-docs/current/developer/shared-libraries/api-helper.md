---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Das `@churchapps/apihelper`-Package bietet Server-seitige Utilities für alle ChurchApps Express.js-APIs. Es enthält die Basis-Controller-Klasse, JWT-Authentifizierungs-Middleware, Datenbankus- hilfen und AWS-Integrationen, die jedes API-Projekt benötigt.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [`npm link`-Workflow](./index.md) für lokale Entwicklung vertraut
- Dieses Package hängt von [`@churchapps/helpers`](./helpers) ab

</div>

## Was ist enthalten

- **CustomBaseController** — Basis-Klasse für API-Controller
- **Auth-Middleware** — JWT-Authentifizierung via `CustomAuthProvider`
- **Datenbankus- hilfen** — `DB.query`, `EnhancedPoolHelper` für MySQL-Connection-Management
- **AWS-Integrationen** — Helfer für S3, SSM Parameter Store und andere AWS-Services
- **Inversify DI-Setup** — Dependency-Injection-Container-Konfiguration

## Setup für lokale Entwicklung

1. Repository klonen:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Abhängigkeiten installieren:

   ```bash
   cd ApiHelper && npm install
   ```

3. Package bauen (kompiliert TypeScript zu `dist/`):

   ```bash
   npm run build
   ```

4. Verfügbar machen für lokales Linking:

   ```bash
   npm link
   ```

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run build` | TypeScript zu `dist/` kompilieren |
| `npm run lint` | ESLint ausführen |
| `npm run lint:fix` | ESLint mit Auto-Fix ausführen |
| `npm run format` | Code mit Prettier formatieren |

:::info
Dieses Package ist eine Abhängigkeit jeder ChurchApps-API. Bei Änderungen, nutzen Sie `npm link`, um gegen eine API lokal zu testen, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** — Das Basis-Utility-Package, das dieses Package benötigt
- **[Modulstruktur](../api/module-structure)** — Wie Controller und Auth-Middleware in API-Modulen genutzt werden
- **[Lokales API-Setup](../api/local-setup)** — API für lokale Entwicklung einrichten
