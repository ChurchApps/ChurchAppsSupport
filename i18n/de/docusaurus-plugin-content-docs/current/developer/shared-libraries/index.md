---
title: "Gemeinsame Bibliotheken"
---

# Gemeinsame Bibliotheken

<div class="article-intro">

Der gemeinsamer ChurchApps-Code wird unter dem Bereich `@churchapps/*` zu npm veröffentlicht. Alle gemeinsamen Pakete leben in einem einzelnen Repository – [Packages](https://github.com/ChurchApps/Packages) – verwaltet als Yarn (Berry) Arbeitsbereich und versioniert mit [Changesets](https://github.com/changesets/changesets).

</div>

## Pakete

| Paket | Beschreibung | Verwendet von |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Fundament-Ebene: Framework-freie Helferfunktionen und die gemeinsamen TypeScript-Schnittstellen, die den Cross-App-Datenvertrag bilden | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Server-seitige Express-Dienstprogramme: Auth, Basis-Controller, Datenbankzugriff, AWS und E-Mail-Integrationen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Funktionsmodule (Anmeldung, Spenden, Formulare, Markdown, Website) | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter-Content-Provider (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit zum Erstellen von B1.church-Integrationen: Webhook-Verifizierung, typisierter REST-Client, OAuth-Helfer | Externe Integrations-Entwickler |
| `@churchapps/texting` | SMS-Anbieter-Abstraktion (Text In Church, Clearstream, Mutual Ministry) | Api |

Die Abhängigkeitsrichtung ist streng abwärts: Apps hängen von `apihelper` und `apphelper` ab, die `@churchapps/helpers` als **Peer-Abhängigkeit** deklarieren, damit jede App genau eine Kopie auflöst.

## Arbeitsbereich-Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repo verwendet Yarn Berry (das Root-Feld `packageManager` ist autoritativ) mit einer einzelnen Sperrdatei. `yarn build` baut jedes Paket in Abhängigkeitsreihenfolge; `yarn test` führt alle Pakettests aus.

## Veröffentlichung mit Changesets

Jede Änderung an einem Paket wird mit einem Changeset versandt:

1. Führen Sie `yarn changeset` an der Arbeitsbereich-Root aus. Wählen Sie das Paket(s) aus, das Sie berührt haben, den Bump-Typ (Patch = Fix, Minor = Neuer Export oder Feature, Major = Breaking), und schreiben Sie eine einzeilige Zusammenfassung – sie wird zum CHANGELOG-Eintrag.
2. Committen Sie die generierte `.changeset/*.md` Datei zusammen mit Ihrer Code-Änderung. Ein Pre-Commit-Hook blockiert Commits, die die Quelle eines Pakets ändern, ohne einen gestaffelten Changeset.
3. Wenn Sie veröffentlichen können, führen Sie `yarn publish-all` an der Root aus. Dies verbraucht ausstehende Changesets (Versionsbumps, Schreiben CHANGELOGs, Synchronisieren interner Abhängigkeitsbereich), baut alles in Abhängigkeitsreihenfolge, und veröffentlicht die verstoßenen Pakete zu npm. Dann committen und drücken Sie die Versions-Bumps.

:::warning
Führen Sie niemals einen rohen `npm publish` innerhalb eines einzelnen Pakets durch – es überspringt die Build-Reihenfolge und die Versions-Buchführung, die das Release-Skript verarbeitet. Das Veröffentlichen erfordert ein npm-Konto mit Veröffentlichungsrechten für den `@churchapps` Bereich.
:::

## Lokale Entwicklung gegen eine verbrauchende App

Innerhalb des Arbeitsbereichs bauen Pakete direkt gegen ihre Geschwister – keine Verkabelung erforderlich. Zum Testen eines unveröffentlichten Paket-Builds innerhalb einer verbrauchenden App (B1Admin, B1App, usw.), fügen Sie ein temporäres Yarn-Portal in den Consumer:

```bash
# in der verbrauchenden Projekt
yarn link ../Packages/helpers
# ... Test ...
yarn unlink ../Packages/helpers && yarn install
```

Bauen Sie das Paket zuerst (`yarn build` an der Arbeitsbereich-Root) – der Consumer liest die kompilierte `dist/` Ausgabe, nicht die Quelle.

:::warning
`yarn link` schreibt ein Portal-Auflösungs in das Consumer `package.json`. Nie committen – immer `yarn unlink` und installieren Sie erneut, wenn fertig.
:::
