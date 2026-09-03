---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Das Paket `@churchapps/apihelper` bietet Server-seitige Dienstprogramme für alle ChurchApps Express.js APIs. Es beinhaltet die Basis-Controller-Klasse, JWT-Authentifizierung, Datenbankdienstprogramme und AWS-Integrationen, auf die sich jedes API-Projekt verlässt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Setup und dem Release-Fluss des [Packages-Arbeitsbereichs](./index.md) vertraut
- Dieses Paket hängt von [`@churchapps/helpers`](./helpers) (als Peer-Abhängigkeit) ab und exportiert es erneut

</div>

## Was ist enthalten

- **CustomBaseController** -- Basis-Klasse für API-Controller, auf `inversify-express-utils` gebaut
- **Auth** -- JWT-Authentifizierung über `CustomAuthProvider`, `AuthenticatedUser` und `Principal`
- **Datenbankdienstprogramme** -- `DB.query` / `DB.queryOne` und die Klasse `Pool` für MySQL-Verbindungsverwaltung, plus `MySqlHelper` und `DBCreator` für Schema-Setup
- **AWS-Integrationen** -- `AwsHelper` für S3-Dateispeicherung und SSM-Parameter Store-Lesevorgänge
- **E-Mail** -- `EmailHelper` unterstützt SES und SMTP-Transporte
- **Konfiguration laden** -- `EnvironmentBase` liest Verbindungszeichenfolgen und Geheimnisse aus Umgebungsvariablen oder Parameter Store
- **Sonstiges** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Arbeitsbereich neben anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten an der Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen (kompiliert TypeScript zu `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Oder führen Sie `yarn build` an der Root aus, um jedes Paket in Abhängigkeitsreihenfolge zu bauen.

Zum Testen von Änderungen innerhalb einer verbrauchenden API verwenden Sie ein temporäres Yarn-Portal – siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases gehen durch Changesets: Führen Sie `yarn changeset` an der Arbeitsbereich-Root mit jeder Änderung durch, dann `yarn publish-all`, wenn Sie bereit sind zu veröffentlichen. Siehe [Shared Libraries Overview](./index.md#releasing-with-changesets) für den vollständigen Fluss.

:::info
Dieses Paket ist eine Abhängigkeit jeder ChurchApps API – die Core Api, AskApi und LessonsApi. Testen Sie vor dem Veröffentlichen gegen eine API lokal.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** – Das Basis-Utility-Paket, von dem dieses Paket abhängt
- **[Modulstruktur](../api/module-structure)** – Wie Controller und Auth-Middleware in API-Modulen verwendet werden
- **[Lokales API-Setup](../api/local-setup)** – Setup der API für lokale Entwicklung
