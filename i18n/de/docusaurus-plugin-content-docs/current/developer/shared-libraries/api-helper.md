---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Das Paket `@churchapps/apihelper` stellt serverseitige Hilfsprogramme für alle Express.js-APIs von ChurchApps bereit. Es enthält die Basis-Controller-Klasse, die JWT-Authentifizierung, Datenbank-Hilfsprogramme und AWS-Integrationen, von denen jedes API-Projekt abhängt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Aufbau und Release-Ablauf des [Packages-Workspace](./index.md) vertraut
- Dieses Paket hängt von [`@churchapps/helpers`](./helpers) ab (als Peer-Dependency) und exportiert es erneut

</div>

## Was enthalten ist

- **CustomBaseController** -- Basisklasse für API-Controller, aufgebaut auf `inversify-express-utils`
- **Auth** -- JWT-Authentifizierung über `CustomAuthProvider`, `AuthenticatedUser` und `Principal`
- **Datenbank-Hilfsprogramme** -- `DB.query` / `DB.queryOne` und die Klasse `Pool` für die Verwaltung von MySQL-Verbindungen, außerdem `MySqlHelper` und `DBCreator` für das Schema-Setup
- **AWS-Integrationen** -- `AwsHelper` für S3-Dateispeicherung und Lesevorgänge im SSM Parameter Store
- **E-Mail** -- `EmailHelper` mit Unterstützung für SES- und SMTP-Transporte
- **Konfigurationsladen** -- `EnvironmentBase` liest Verbindungszeichenfolgen und Geheimnisse aus Umgebungsvariablen oder dem Parameter Store
- **Sonstiges** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Einrichtung für die lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Workspace zusammen mit den anderen gemeinsam genutzten Bibliotheken:

1. Workspace klonen:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Abhängigkeiten im Workspace-Root installieren:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen (kompiliert TypeScript nach `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Oder führen Sie `yarn build` im Root aus, um alle Pakete in Abhängigkeitsreihenfolge zu bauen.

Um Änderungen innerhalb einer konsumierenden API zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine konsumierende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases laufen über Changesets: Führen Sie bei jeder Änderung `yarn changeset` im Workspace-Root aus, dann `yarn publish-all`, wenn Sie bereit für die Veröffentlichung sind. Den vollständigen Ablauf finden Sie unter [Übersicht der gemeinsam genutzten Bibliotheken](./index.md#releasing-with-changesets).

:::info
Dieses Paket ist eine Abhängigkeit jeder ChurchApps-API -- der Kern-Api, AskApi und LessonsApi. Testen Sie Änderungen lokal gegen eine API, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** -- Das Basis-Utility-Paket, von dem dieses Paket abhängt
- **[Modulstruktur](../api/module-structure)** -- Wie Controller und Auth-Middleware in API-Modulen verwendet werden
- **[Lokales API-Setup](../api/local-setup)** -- Einrichtung der API für die lokale Entwicklung
