---
title: "Gemeinsame Bibliotheken"
---

# Gemeinsame Bibliotheken

<div class="article-intro">

ChurchApps-Freigegebener Code wird zu npm unter dem `@churchapps/*`-Bereich veröffentlicht. Alle gemeinsamen Pakete befinden sich in einem einzigen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltet als Yarn (Berry)-Arbeitsbereich und versioniert mit [Changesets](https://github.com/changesets/changesets).

</div>

## Pakete

| Paket | Beschreibung | Verwendet von |
|-------|-------------|--------------|
| [`@churchapps/helpers`](./helpers) | Grundschicht: Framework-freie Hilfsfunktionen und die gemeinsamen TypeScript-Schnittstellen, die den Cross-App-Datenvertrag bilden | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Serverseitige Express-Dienstprogramme: Auth, Basis-Controller, Datenbankzugriff, AWS und E-Mail-Integrationen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Funktionsmodule (Login, Spenden, Formulare, Markdown, Website) | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter-Inhaltsanbieter (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit zum Erstellen von B1.church-Integrationen: Webhook-Verifikation, typisierter REST-Client, OAuth-Helfer | Externe Integrationsentwickler |
| `@churchapps/texting` | SMS-Anbieter-Abstraktion (Text In Church, Clearstream, Mutual Ministry) | Api |

Die Abhängigkeitsrichtung ist streng abwärts: Apps sind abhängig von `apihelper` und `apphelper`, die `@churchapps/helpers` als **Peer-Abhängigkeit** deklarieren, damit jede App genau eine Kopie davon auflöst.

## Arbeitsbereich-Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repo verwendet Yarn Berry (das Root-Feld `packageManager` ist maßgeblich) mit einer einzigen Lockdatei. `yarn build` bauen alle Pakete in Abhängigkeitsreihenfolge; `yarn test` führt alle Paket-Tests aus.

## Mit Changesets veröffentlichen

Jede Änderung an einem Paket wird mit einem Changeset versandt:

1. Führen Sie `yarn changeset` im Arbeitsbereich-Root aus. Wählen Sie die Paket(e), die Sie berührt haben, den Bump-Typ (patch = Behebung, minor = neuer Export oder Feature, major = Breaking Change) und schreiben Sie eine einzeilige Zusammenfassung -- sie wird zum CHANGELOG-Eintrag.
2. Committen Sie die generierte `.changeset/*.md`-Datei zusammen mit Ihrer Code-Änderung. Ein Pre-Commit-Hook blockiert Commits, die ein Paket verändern, ohne ein Changeset zu stagen.
3. Wenn Sie bereit sind zu veröffentlichen, führen Sie `yarn publish-all` im Root aus. Dies verbraucht ausstehende Changesets (Bump-Versionen, schreiben CHANGELOGs, Sync-interne Abhängigkeitsbereiche), bauen alles in Abhängigkeitsreihenfolge und veröffentlichen die gestoßenen Pakete zu npm. Dann committen und pushen Sie die Versions-Bumps.

:::warning
Führen Sie nie ein rohes `npm publish` in einem einzelnen Paket aus -- es überspringt die Bauen-Reihenfolge und die Versions-Bookkeeping, die das Release-Script verarbeitet. Die Veröffentlichung erfordert ein npm-Konto mit Veröffentlichungsrechten für den `@churchapps`-Bereich.
:::

## Lokale Entwicklung gegen eine verbrauchende App

Im Arbeitsbereich bauen Pakete direkt gegen ihre Geschwister -- kein Linking erforderlich. Um einen unveröffentlichten Paket-Build in einer verbrauchenden App (B1Admin, B1App usw.) zu testen, fügen Sie ein temporäres Yarn-Portal im Verbraucher hinzu:

```bash
# in dem verbrauchenden Projekt
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bauen Sie das Paket zuerst (`yarn build` im Arbeitsbereich-Root) -- der Verbraucher liest die kompilierten `dist/`-Ausgaben, nicht die Quelle.

:::warning
`yarn link` schreibt eine Portal-Auflösung in die `package.json` des Verbrauchers. Committen Sie das nie -- führen Sie immer `yarn unlink` durch und installieren Sie neu, wenn Sie fertig sind.
:::
