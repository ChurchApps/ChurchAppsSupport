---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Das `@churchapps/apphelper`-Paket bietet gemeinsame React-Komponenten und Utilities für alle ChurchApps Web-Anwendungen. Es ist ein einzelnes veröffentlichtes Paket, das Feature-Module durch Subpath-Einstiegspunkte exponiert — Login, Donations, Forms, Markdown und Website/CMS-Funktionalität — neben einem Kernsatz gemeinsamer Komponenten und Helfer.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages Workspace](./index.md) Setup vertraut

</div>

## Einstiegspunkte

Das Paket definiert Subpath-Exporte in seiner `package.json`, daher ist jedes Feature-Modul auf sich selbst importierbar:

| Einstiegspunkt | Inhalte |
|-------------|----------|
| `@churchapps/apphelper` | Kern-Komponenten, Helfer und Hooks |
| `@churchapps/apphelper/login` | Login und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Giving und Donations-Komponenten |
| `@churchapps/apphelper/forms` | Formular-Einreichungs-Komponenten |
| `@churchapps/apphelper/markdown` | Markdown und HTML Editoren und Renderer |
| `@churchapps/apphelper/website` | Website-Builder und CMS-Komponenten |

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Workspace:

1. Klonen Sie den Workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten:

   ```bash
   cd Packages && yarn install
   ```

3. Starten Sie den Vite Playground:

   ```bash
   cd apphelper && yarn dev
   ```

   Der Playground-Dev-Server startet bei **http://localhost:3001**.

## Publishing

Releases gehen durch Changesets: Führen Sie `yarn changeset` aus, dann `yarn publish-all`. Siehe die [Shared Libraries Overview](./index.md#releasing-with-changesets).

:::warning
Entfernen Sie oder benennen Sie niemals einen Export um, bis die Ersetzung veröffentlicht und jeder Consumer migriert wurde.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** — Das Basis-Utility-Paket
- **[Web Apps](../web-apps/)** — Die Web-Anwendungen, die dieses Paket konsumieren
- **[Shared Libraries Overview](./index.md)** — Workspace-Setup und Release-Flow
