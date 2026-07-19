---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Das `@churchapps/apihelper`-Paket bietet Server-seitige Utilities für alle ChurchApps Express.js APIs. Es umfasst die Base-Controller-Klasse, JWT-Authentifizierung, Datenbank-Utilities und AWS-Integrationen, auf die jedes API-Projekt angewiesen ist.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages Workspace](./index.md) Setup vertraut
- Dieses Paket hängt von [`@churchapps/helpers`](./helpers) ab und exportiert es wieder

</div>

## Was enthalten ist

- **CustomBaseController** — Base-Klasse für API-Controller
- **Auth** — JWT-Authentifizierung via `CustomAuthProvider`
- **Database utilities** — `DB.query` / `DB.queryOne` und die `Pool`-Klasse für MySQL-Verbindungsverwaltung
- **AWS integrations** — `AwsHelper` für S3-Dateispeicher
- **Email** — `EmailHelper` unterstützt SES und SMTP Transporte
- **Config loading** — `EnvironmentBase` liest Verbindungszeichenfolgen und Geheimnisse

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Workspace:

1. Klonen Sie den Workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen Sie:

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

## Publishing

Releases gehen durch Changesets: Führen Sie `yarn changeset` aus, dann `yarn publish-all` wenn Sie bereit sind. Siehe die [Shared Libraries Overview](./index.md#releasing-with-changesets).

:::info
Dieses Paket ist eine Abhängigkeit jeder ChurchApps-API. Testen Sie gegen eine API lokal, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** — Das Basis-Utility-Paket, von dem dieses Paket abhängt
- **[Local API Setup](../api/local-setup)** — Einrichtung der API für lokale Entwicklung
