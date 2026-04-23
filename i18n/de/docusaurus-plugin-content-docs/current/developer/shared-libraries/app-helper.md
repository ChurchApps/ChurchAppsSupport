---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Die `@churchapps/apphelper*`-Packages bieten gemeinsame React-Komponenten und Utilities für alle ChurchApps-Web-Anwendungen. AppHelper ist als Monorepo-Workspace mit sechs Packages strukturiert, die Core-Komponenten, Authentifizierung, Spenden, Formulare, Markdown und Website/CMS-Funktionalität abdecken.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [`npm link`-Workflow](./index.md) für lokale Entwicklung vertraut

</div>

## Packages

| Package | Beschreibung |
|---------|-------------|
| `@churchapps/apphelper` | Core-Komponenten und Utilities |
| `@churchapps/apphelper-login` | Login- und Registrierungs-UI |
| `@churchapps/apphelper-donations` | Spenden- und Donations-Komponenten |
| `@churchapps/apphelper-forms` | Form-Builder-Komponenten |
| `@churchapps/apphelper-markdown` | Markdown-Editor und -Renderer |
| `@churchapps/apphelper-website` | Website- und CMS-Komponenten |

## Setup für lokale Entwicklung

1. Repository klonen:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Abhängigkeiten installieren:

   ```bash
   cd AppHelper && npm install
   ```

3. Alle Packages bauen und Vite-Playground starten:

   ```bash
   npm run playground:reload
   ```

   Dies baut jedes Package im Workspace und startet dann den Playground-Dev-Server bei **http://localhost:3001**.

:::tip
Der Playground ist der schnellste Weg zur Entwicklung und zum Testen von AppHelper-Komponenten. Er hot-reloaded den Vite-Dev-Server, sodass Sie Änderungen in Echtzeit sehen können.
:::

## Veröffentlichung

Ein einzelnes Package veröffentlichen:

```bash
npm run publish:apphelper
```

Alle Packages veröffentlichen:

```bash
npm run publish:all
```

:::warning
Beim Veröffentlichen, stellen Sie sicher, die Versionsnummer in der relevanten `package.json`-Datei(en) vor dem Ausführen des Publish-Befehls zu aktualisieren. Alle Packages, die ein geändertes Package abhängen, sollten auch aktualisiert werden.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** — Das Basis-Utility-Package, das zusammen mit AppHelper genutzt wird
- **[Web-Apps](../web-apps/)** — Die Web-Anwendungen, die diese Packages konsumieren
- **[Gemeinsame Biblioteken-Übersicht](./index.md)** — `npm link`-Workflow und Package-Übersicht
