---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Das `@churchapps/helpers`-Paket bietet Basis-Utilities, die von allen ChurchApps-Projekten verwendet werden, sowohl Frontend als auch Backend. Es ist Framework-agnostisch und enthält häufige Helfer wie `DateHelper`, `ApiHelper`, `CurrencyHelper`, plus die gemeinsamen TypeScript-Schnittstellen, die den Datenvertrag zwischen Apps und APIs bilden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages Workspace](./index.md) Setup und Release-Workflow vertraut

</div>

## Wer konsumiert dies

Jede ChurchApps-API (die Kern-Api, AskApi und LessonsApi) und jedes Web-Frontend (B1Admin, B1App, B1Transfer, LessonsApp) hängt direkt von diesem Paket ab. Frontends erhalten auch viele seiner Exporte (`ApiHelper`, `DateHelper`, `UserHelper` und andere Schnittstellen), die durch [`@churchapps/apphelper`](./app-helper) neu exportiert werden. Die anderen gemeinsamen Pakete deklarieren es als eine Peer-Abhängigkeit, daher jede App löst sich genau eine Kopie auf.

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Workspace neben den anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten im Workspace-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen Sie (kompiliert TypeScript zu `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

## Publishing

Releases gehen durch Changesets: Führen Sie `yarn changeset` im Workspace-Root aus, dann `yarn publish-all` wenn Sie bereit sind, zu veröffentlichen. Siehe die [Shared Libraries Overview](./index.md#releasing-with-changesets) für den vollständigen Flow.

:::warning
Da dieses Paket von jedem ChurchApps-Projekt verwendet wird, haben Änderungen hier eine breite Auswirkung. Testen Sie mit einem Yarn-Portal in mindestens einer konsumierenden API und einer konsumierenden Web-App vor der Veröffentlichung.
:::

## Verwandte Artikel

- **[ApiHelper](./api-helper)** — Server-seitige Utilities, die von diesem Paket abhängen
- **[AppHelper](./app-helper)** — React-Komponenten, die von diesem Paket abhängen
- **[Shared Libraries Overview](./index.md)** — Workspace-Setup, Release-Flow und Local-Link-Workflow
