---
title: "ApiHelper"
---

# ApiHelper

Das Paket `@churchapps/apihelper` bietet Server-seitige Hilfsfunktionen für alle ChurchApps Express.js APIs. Es umfasst die Basis-Controller-Klasse, JWT-Authentifizierung, Datenbank-Hilfsfunktionen und AWS-Integrationen, auf die jedes API-Projekt angewiesen ist.

## Was ist enthalten

- **CustomBaseController** -- Basis-Klasse für API-Controller
- **Auth** -- JWT-Authentifizierung über `CustomAuthProvider`
- **Datenbank-Hilfsfunktionen** -- `DB.query` / `DB.queryOne` und die `Pool`-Klasse
- **AWS-Integrationen** -- `AwsHelper` für S3-Dateispeicherung
- **E-Mail** -- `EmailHelper` mit SES- und SMTP-Transporten
- **Config-Laden** -- `EnvironmentBase` liest Verbindungszeichenfolgen und Geheimnisse
- **Sonstiges** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`

## Lokale Entwicklung

Dieses Paket lebt im Arbeitsbereich [Packages](https://github.com/ChurchApps/Packages):

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
yarn workspace @churchapps/apihelper build
```

Um Änderungen in einer verbrauchenden API zu testen, verwenden Sie ein temporäres Yarn-Portal.

## Veröffentlichung

Releases verwenden Changesets: Führen Sie `yarn changeset` aus, wenn Sie bereit zum Veröffentlichen sind. Lesen Sie die Übersicht [Freigegebene Bibliotheken](./index.md) für den vollständigen Fluss.

:::info
Dieses Paket ist eine Abhängigkeit jeder ChurchApps API -- testen Sie gegen eine API lokal, bevor Sie veröffentlichen.
:::
