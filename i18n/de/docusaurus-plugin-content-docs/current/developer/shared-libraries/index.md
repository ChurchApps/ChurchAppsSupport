---
title: "Gemeinsame Biblioteken"
---

# Gemeinsame Biblioteken

<div class="article-intro">

ChurchApps gemeinsamer Code wird zu npm unter dem `@churchapps/*`-Scope veröffentlicht. Diese Packages bieten allgemeine Utilities, Server-seitige Helfer und React-Komponenten, die von allen ChurchApps-Projekten als reguläre npm-Abhängigkeiten konsumiert werden.

</div>

## Packages

| Package | Beschreibung | Nutzen durch |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Basis-Utilities (DateHelper, ApiHelper, usw.) | Alle Projekte |
| [`@churchapps/apihelper`](./api-helper) | Server-seitige Express.js-Utilities | Alle APIs |
| [`@churchapps/apphelper`](./app-helper) | Gemeinsame React-Komponenten und Utilities | Alle Web-Apps |

## Lokale Entwicklung mit `npm link`

Bei Entwicklung einer gemeinsamen Bibliothek zusammen mit einem konsumierenden Projekt, nutzen Sie `npm link`, um Änderungen ohne Veröffentlichung zu npm zu testen:

```bash
# Build und Link der Bibliothek
cd Helpers && npm run build && npm link

# Sie in das konsumierende Projekt verlinken
cd ../Api && npm link @churchapps/helpers
```

Dies erstellt einen Symlink von den `node_modules/@churchapps/helpers`-folder des konsumierenden Projekts zu Ihrer lokalen Build-Output, sodass Änderungen nach dem Neubau sofort reflektiert werden.

:::tip
Denken Sie daran, `npm run build` im Bibliotheks-Projekt nach Änderungen auszuführen — das konsumierende Projekt liest aus dem kompilierten `dist/`-Folder, nicht den Quellen.
:::

:::warning
`npm link`-Verbindungen werden zurückgesetzt, wenn Sie `npm install` im konsumierenden Projekt ausführen. Sie müssen den `npm link @churchapps/<package>`-Befehl nach dem Installieren von Abhängigkeiten erneut ausführen.
:::
