---
title: "Gemeinsame Bibliotheken"
---

# Gemeinsame Bibliotheken

<div class="article-intro">

ChurchApps gemeinsame Codes wird zu npm unter dem `@churchapps/*`-Scope veröffentlicht. Alle gemeinsamen Pakete leben in einem einzelnen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltung als Yarn (Berry)-Workspace und versioniert mit [changesets](https://github.com/changesets/changesets).

</div>

## Pakete

| Paket | Beschreibung | Verwendet von |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grundschicht: Framework-freie Hilfsfunktionen und die gemeinsame TypeScript-Schnittstellen, die den Daten-Vertrag zwischen Apps bilden | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Server-seitige Express-Dienstprogramme: Auth, Basis-Controller, Datenbankzugriff, AWS und E-Mail-Integrationen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Feature-Module (Login, Spenden, Formulare, Markdown, Website) | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter-Content-Provider (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit zum Erstellen von B1.church-Integrationen: Webhook-Verifikation, typisierter REST-Client, OAuth-Helper | Externe Integrations-Entwickler |
| `@churchapps/texting` | SMS-Provider-Abstraktion (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

Die Abhängigkeitsrichtung ist streng abwärts: Apps hängen von `apihelper` und `apphelper` ab, die `@churchapps/helpers` als **Peer-Abhängigkeit** deklarieren, damit jede App genau eine Kopie auflöst.

## Workspace-Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repo verwendet Yarn Berry (das Root-`packageManager`-Feld ist autoritativ) mit einer einzelnen Lockfile. `yarn build` erstellt jedes Paket in Abhängigkeitsreihenfolge; `yarn test` führt alle Paket-Tests aus.

## Veröffentlichung mit Changesets

Jede Änderung an einem Paket versendet mit einem Changeset:

1. Führen Sie `yarn changeset` im Workspace-Root aus. Wählen Sie die Paket(e), die Sie berührt haben, den Bump-Typ (patch = fix, minor = neue Exportierung oder Feature, major = Breaking), und schreiben Sie eine Zusammenfassung in einer Zeile – sie wird zum CHANGELOG-Eintrag.
2. Commiten Sie die generierte `.changeset/*.md`-Datei zusammen mit Ihrer Code-Änderung. Ein Pre-Commit-Hook blockiert Commits, die ein Paket's Quelle ändern, ohne einen gesammelten Changeset.
3. Wenn Sie bereit sind zu veröffentlichen, führen Sie `yarn publish-all` am Root aus. Dies verbraucht ausstehende Changesets (Bump-Versionen, Schreib-CHANGELOGs, Sync-internen Abhängigkeitsbereiche), erstellt alles in Abhängigkeitsreihenfolge und veröffentlicht die gebumpten Pakete zu npm. Dann commiten und pushen Sie die Versions-Bumps.

:::warning
Führen Sie nie einen rohen `npm publish` innerhalb eines einzelnen Pakets aus – es überspringt die Build-Reihenfolge und die Versions-Buchführung, die das Release-Skript bewältigt. Das Veröffentlichen erfordert ein npm-Konto mit Veröffentlichungsrechten zum `@churchapps`-Scope.
:::

## Lokale Entwicklung gegen eine konsumierende App

Innerhalb des Workspace erstellen Pakete direkt gegen ihre Geschwister – keine Verknüpfung notwendig. Um eine unveröffentlichte Paket-Build innerhalb einer konsumierenden App (B1Admin, B1App usw.) zu testen, fügen Sie ein temporäres Yarn-Portal im Konsumenten ein:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Erstellen Sie zuerst das Paket (`yarn build` am Workspace-Root) – der Konsument liest die kompilierte `dist/`-Ausgabe, nicht die Quelle.

:::warning
`yarn link` schreibt eine Portal-Auflösung in die `package.json` des Konsumenten. Commiten Sie sie nie – heben Sie immer das Link auf `yarn unlink` und installieren Sie neu, wenn Sie fertig sind.
:::
