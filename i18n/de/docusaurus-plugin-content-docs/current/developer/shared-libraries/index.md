---
title: "Freigegebene Bibliotheken"
---

# Freigegebene Bibliotheken

ChurchApps-Code wird auf npm unter dem Scope `@churchapps/*` veröffentlicht. Alle freigegebenen Pakete leben in einem einzelnen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltet als ein Yarn-Arbeitsbereich und versioniert mit Changesets.

## Pakete

| Paket | Beschreibung | Verwendet von |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Fundament-Ebene: Framework-freie Hilfsfunktionen und freigegebene TypeScript-Schnittstellen | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Server-seitige Express-Hilfsfunktionen | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Freigegebene React-Komponenten und Feature-Module | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion über Drittanbieter-Content-Provider | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit für B1.church-Integrationen | Externe Entwickler |
| `@churchapps/texting` | SMS-Provider-Abstraktion | Api |

Die Abhängigkeitsrichtung ist streng abwärts.

## Arbeitsbereich-Einrichtung

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Das Repo verwendet Yarn Berry mit einer einzelnen Lockdatei.

## Mit Changesets veröffentlichen

Jede Änderung an einem Paket wird mit einem Changeset versandt:

1. Führen Sie `yarn changeset` aus und wählen Sie das Paket, den Bump-Typ und schreiben Sie eine einzeilige Zusammenfassung
2. Commiten Sie die generierte `.changeset/*.md`-Datei zusammen mit Ihrem Code-Änderung
3. Wenn bereit zu veröffentlichen, führen Sie `yarn publish-all` aus

:::warning
Führen Sie niemals ein rohes `npm publish` innerhalb eines einzelnen Pakets aus -- es überspringt die Versionsverwaltung.
:::

## Lokale Entwicklung gegen eine verbrauchende App

Fügen Sie ein temporäres Yarn-Portal hinzu:

```bash
yarn link ../Packages/helpers
# ... testen ...
yarn unlink ../Packages/helpers && yarn install
```

:::warning
`yarn link` schreibt eine Portal-Resolution in die `package.json` des Verbrauchers. Commiten Sie es niemals.
:::
