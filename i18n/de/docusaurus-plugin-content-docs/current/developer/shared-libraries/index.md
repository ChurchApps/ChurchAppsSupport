---
title: "Gemeinsame Bibliotheken"
---

# Gemeinsame Bibliotheken

<div class="article-intro">

Der gemeinsam genutzte ChurchApps-Code wird unter dem npm-Scope `@churchapps/*` veröffentlicht. Alle gemeinsamen Pakete liegen in einem einzigen Repository – [Packages](https://github.com/ChurchApps/Packages) – und werden als Yarn-(Berry-)Workspace verwaltet und mit [changesets](https://github.com/changesets/changesets) versioniert.

</div>

## Pakete

| Paket | Beschreibung | Verwendet von |
|-------|--------------|---------------|
| [`@churchapps/helpers`](./helpers) | Grundlagenschicht: framework-unabhängige Hilfsfunktionen und die gemeinsamen TypeScript-Schnittstellen, die den anwendungsübergreifenden Datenvertrag bilden | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Serverseitige Express-Hilfsfunktionen: Authentifizierung, Basis-Controller, Datenbankzugriff, AWS- und E-Mail-Integrationen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Funktionsmodule (Anmeldung, Spenden, Formulare, Markdown, Website) | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter für Inhalte (Lessons.church, Planning Center, Dropbox und weitere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Werkzeugkasten für den Aufbau von B1.church-Integrationen: Webhook-Verifizierung, typisierter REST-Client, OAuth-Hilfsfunktionen | Externe Integrationsentwickler |
| `@churchapps/texting` | Abstraktion für SMS-Anbieter (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Die Abhängigkeitsrichtung verläuft strikt nach unten: Apps hängen von `apihelper` und `apphelper` ab, und diese deklarieren `@churchapps/helpers` als **Peer-Abhängigkeit**, damit jede App genau eine Kopie davon auflöst.

## Einrichtung des Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repository verwendet Yarn Berry (das Feld `packageManager` im Stammverzeichnis ist maßgeblich) mit einer einzigen Lock-Datei. `yarn build` erstellt jedes Paket in der Reihenfolge seiner Abhängigkeiten; `yarn test` führt alle Paket-Tests aus.

## Veröffentlichung mit Changesets

Jede Änderung an einem Paket wird mit einem Changeset ausgeliefert:

1. Führen Sie `yarn changeset` im Stammverzeichnis des Workspace aus. Wählen Sie die betroffenen Pakete, die Art der Versionsänderung (patch = Korrektur, minor = neuer Export oder neue Funktion, major = inkompatible Änderung) und schreiben Sie eine einzeilige Zusammenfassung – sie wird zum Eintrag im CHANGELOG.
2. Committen Sie die erzeugte Datei `.changeset/*.md` zusammen mit Ihrer Codeänderung. Ein Pre-Commit-Hook blockiert Commits, die den Quellcode eines Pakets ändern, ohne ein gestaged Changeset.
3. Wenn Sie veröffentlichen möchten, führen Sie im Stammverzeichnis `yarn publish-all` aus. Dabei werden die ausstehenden Changesets verarbeitet (Versionen erhöhen, CHANGELOGs schreiben, interne Abhängigkeitsbereiche synchronisieren), alles in der Reihenfolge der Abhängigkeiten gebaut und die geänderten Pakete auf npm veröffentlicht. Anschließend committen und pushen Sie die Versionsänderungen.

:::warning
Führen Sie niemals ein direktes `npm publish` innerhalb eines einzelnen Pakets aus – es umgeht die Reihenfolge beim Bauen und die Versionsverwaltung, die das Release-Skript übernimmt. Für die Veröffentlichung benötigen Sie ein npm-Konto mit Veröffentlichungsrechten für den Scope `@churchapps`.
:::

## Lokale Entwicklung mit einer nutzenden App

Innerhalb des Workspace bauen Pakete direkt gegen ihre Nachbarn – eine Verknüpfung ist nicht nötig. Um einen nicht veröffentlichten Paketbuild innerhalb einer nutzenden App (B1Admin, B1App usw.) zu testen, fügen Sie im Verbraucherprojekt ein temporäres Yarn-Portal hinzu:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bauen Sie das Paket zuerst (`yarn build` im Stammverzeichnis des Workspace) – das verbrauchende Projekt liest die kompilierte Ausgabe in `dist/`, nicht den Quellcode.

:::warning
`yarn link` schreibt eine Portal-Auflösung in die `package.json` des Verbraucherprojekts. Committen Sie sie niemals – führen Sie nach Abschluss immer `yarn unlink` aus und installieren Sie die Abhängigkeiten erneut.
:::
