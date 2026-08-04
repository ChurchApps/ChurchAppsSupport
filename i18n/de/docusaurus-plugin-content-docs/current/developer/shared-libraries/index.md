---
title: "Gemeinsam genutzte Bibliotheken"
---

# Gemeinsam genutzte Bibliotheken

<div class="article-intro">

Gemeinsam genutzter Code von ChurchApps wird unter dem Scope `@churchapps/*` auf npm veröffentlicht. Alle gemeinsam genutzten Pakete befinden sich in einem einzigen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- das als Yarn-(Berry-)Workspace verwaltet und mit [Changesets](https://github.com/changesets/changesets) versioniert wird.

</div>

## Pakete

| Paket | Beschreibung | Genutzt von |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Fundamentschicht: framework-freie Hilfsfunktionen und die gemeinsam genutzten TypeScript-Schnittstellen, die den app-übergreifenden Datenvertrag bilden | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Serverseitige Express-Hilfsprogramme: Auth, Basis-Controller, Datenbankzugriff, AWS- und E-Mail-Integrationen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsam genutzte React-Komponenten und Feature-Module (Login, Spenden, Formulare, Markdown, Website) | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktionsschicht über Drittanbieter-Content-Provider (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit zum Erstellen von B1.church-Integrationen: Webhook-Verifizierung, typisierter REST-Client, OAuth-Hilfsprogramme | Externe Integrationsentwickler |
| `@churchapps/texting` | SMS-Provider-Abstraktion (Text In Church, Clearstream, Mutual Ministry) | Api |

Die Abhängigkeitsrichtung verläuft strikt abwärts: Apps hängen von `apihelper` und `apphelper` ab, die `@churchapps/helpers` als **Peer-Dependency** deklarieren, sodass jede App genau eine Kopie davon auflöst.

## Workspace-Einrichtung

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repository verwendet Yarn Berry (das `packageManager`-Feld im Root ist maßgeblich) mit einer einzigen Lockfile. `yarn build` baut alle Pakete in Abhängigkeitsreihenfolge; `yarn test` führt alle Paket-Tests aus.

## Veröffentlichen mit Changesets

Jede Änderung an einem Paket wird mit einem Changeset ausgeliefert:

1. Führen Sie `yarn changeset` im Workspace-Root aus. Wählen Sie das/die betroffene(n) Paket(e), den Erhöhungstyp (patch = Fix, minor = neuer Export oder Feature, major = Breaking Change) und schreiben Sie eine einzeilige Zusammenfassung -- sie wird zum CHANGELOG-Eintrag.
2. Committen Sie die erzeugte `.changeset/*.md`-Datei zusammen mit Ihrer Codeänderung. Ein Pre-Commit-Hook blockiert Commits, die den Quellcode eines Pakets ändern, ohne dass ein Changeset gestaged ist.
3. Wenn Sie bereit zur Veröffentlichung sind, führen Sie `yarn publish-all` im Root aus. Dies verarbeitet ausstehende Changesets (erhöht Versionen, schreibt CHANGELOGs, synchronisiert interne Abhängigkeitsbereiche), baut alles in Abhängigkeitsreihenfolge und veröffentlicht die erhöhten Pakete auf npm. Committen und pushen Sie anschließend die Versionserhöhungen.

:::warning
Führen Sie niemals ein rohes `npm publish` innerhalb eines einzelnen Pakets aus -- es überspringt die Build-Reihenfolge und die Versionsbuchhaltung, die das Release-Skript übernimmt. Die Veröffentlichung erfordert ein npm-Konto mit Veröffentlichungsrechten für den Scope `@churchapps`.
:::

## Lokale Entwicklung gegen eine konsumierende App

Innerhalb des Workspace bauen Pakete direkt gegen ihre Geschwisterpakete -- kein Verlinken nötig. Um einen unveröffentlichten Paket-Build innerhalb einer konsumierenden App (B1Admin, B1App usw.) zu testen, fügen Sie ein temporäres Yarn-Portal im Konsumenten hinzu:

```bash
# im konsumierenden Projekt
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

Bauen Sie das Paket zuerst (`yarn build` im Workspace-Root) -- der Konsument liest die kompilierte `dist/`-Ausgabe, nicht den Quellcode.

:::warning
`yarn link` schreibt eine Portal-Auflösung in die `package.json` des Konsumenten. Committen Sie dies niemals -- führen Sie nach Abschluss immer `yarn unlink` aus und installieren Sie neu.
:::
