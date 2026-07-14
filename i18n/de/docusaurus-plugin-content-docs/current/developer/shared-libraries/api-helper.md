---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Das `@churchapps/apihelper`-Paket bietet serverseitige Dienstprogramme für alle ChurchApps Express.js-APIs. Es umfasst die Basis-Controller-Klasse, JWT-Authentifizierung, Datenbankdienstprogramme und AWS-Integrationen, auf die jedes API-Projekt angewiesen ist.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages-Arbeitsbereich](./index.md)-Setup und Release-Flow vertraut
- Dieses Paket ist abhängig von [`@churchapps/helpers`](./helpers) (als Peer-Abhängigkeit) und gibt es wieder aus

</div>

## Was enthalten ist

- **CustomBaseController** -- Basis-Klasse für API-Controller, aufgebaut auf `inversify-express-utils`
- **Auth** -- JWT-Authentifizierung über `CustomAuthProvider`, `AuthenticatedUser` und `Principal`
- **Datenbankdienstprogramme** -- `DB.query` / `DB.queryOne` und die `Pool`-Klasse für MySQL-Verbindungsverwaltung, plus `MySqlHelper` und `DBCreator` für Schema-Setup
- **AWS-Integrationen** -- `AwsHelper` für S3-Dateispeicherung und SSM Parameter Store-Lesevorgänge
- **E-Mail** -- `EmailHelper`, der SES- und SMTP-Transporte unterstützt
- **Config-Laden** -- `EnvironmentBase` liest Verbindungszeichenfolgen und Geheimnisse aus Umgebungsvariablen oder Parameter Store
- **Sonstiges** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Setup für lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Arbeitsbereich neben den anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten im Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen Sie (kompiliert TypeScript zu `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Oder führen Sie `yarn build` im Root aus, um jedes Paket in Abhängigkeitsreihenfolge zu bauen.

Um Änderungen in einer verbrauchenden API zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases erfolgen durch Changesets: Führen Sie `yarn changeset` im Arbeitsbereich-Root mit jeder Änderung aus, dann `yarn publish-all`, wenn Sie bereit sind zu veröffentlichen. Siehe die [Übersicht der gemeinsamen Bibliotheken](./index.md#releasing-with-changesets) für den vollständigen Flow.

:::info
Dieses Paket ist eine Abhängigkeit jeder ChurchApps-API -- der Core-Api, AskApi und LessonsApi. Testen Sie Änderungen vor der Veröffentlichung lokal gegen eine API.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** -- Das Basisdienstprogramm-Paket, von dem dieses Paket abhängt
- **[Modulstruktur](../api/module-structure)** -- Wie Controller und Auth-Middleware in API-Modulen verwendet werden
- **[Lokales API-Setup](../api/local-setup)** -- Richten Sie die API für lokale Entwicklung ein
