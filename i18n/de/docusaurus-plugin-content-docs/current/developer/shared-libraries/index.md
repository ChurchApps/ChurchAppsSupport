---
title: "Gemeinsame Bibliotheken"
---

# Gemeinsame Bibliotheken

<div class="article-intro">

ChurchApps gemeinsamer Code wird zu npm unter dem `@churchapps/*` Umfang veröffentlicht. Alle gemeinsamen Pakete leben in einem einzelnen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltet als Yarn (Berry) Workspace und versioniert mit [changesets](https://github.com/changesets/changesets).

</div>

## Pakete

| Paket | Beschreibung | Verwendet von |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grundlagen-Schicht: Framework-freie Helferfunktionen und gemeinsame TypeScript-Schnittstellen | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Server-seitige Express-Utilities | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Feature-Module | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter-Content-Provider | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit für den Aufbau von B1.church Integrationen | Externe Integration Entwickler |
| `@churchapps/texting` | SMS-Provider-Abstraktion | Api |

Die Abhängigkeits-Richtung ist streng nach unten: Apps hängen von `apihelper` und `apphelper` ab, die `@churchapps/helpers` als **Peer-Abhängigkeit** deklarieren.

## Workspace-Setup

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

## Releasing mit Changesets

Jede Änderung an einem Paket wird mit einem Changeset versandt:

1. Führen Sie `yarn changeset` im Workspace-Root aus. Wählen Sie die Pakete aus, die Sie berührt haben, den Bump-Typ (patch = fix, minor = neue Exportierung oder Funktion, major = breaking) und schreiben Sie eine einzeilige Zusammenfassung.
2. Committen Sie die generierte `.changeset/*.md`-Datei zusammen mit Ihrer Code-Änderung.
3. Wenn Sie bereit sind zu veröffentlichen, führen Sie `yarn publish-all` im Root aus.

:::warning
Führen Sie niemals ein rohes `npm publish` in einem einzelnen Paket aus — es überspringt Build-Reihenfolge und Versions-Bookkeeping. Publishing erfordert ein npm-Konto mit Publikationsrechten zum `@churchapps`-Umfang.
:::

## Lokale Entwicklung gegen eine konsumierende App

Fügen Sie ein temporäres Yarn-Portal in der Consumer hinzu:

```bash
# in dem konsumierenden Projekt
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

Bauen Sie das Paket zuerst (`yarn build` im Workspace-Root) — der Consumer liest die kompilierten `dist/` Outputs, nicht die Quelle.

:::warning
`yarn link` schreibt eine Portal-Auflösung in die `package.json` des Consumers. Commiten Sie dies niemals — immer `yarn unlink` und neu installieren, wenn fertig.
:::
