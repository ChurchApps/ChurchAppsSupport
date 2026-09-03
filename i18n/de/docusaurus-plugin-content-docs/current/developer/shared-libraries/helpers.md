---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Das Paket `@churchapps/helpers` bietet Basis-Dienstprogramme, die von allen ChurchApps-Projekten verwendet werden, sowohl Frontend als auch Backend. Es ist Framework-agnostisch und beinhaltet häufige Helfer wie `DateHelper`, `ApiHelper`, `CurrencyHelper`, plus die gemeinsamen TypeScript-Schnittstellen, die den Datenvertrag zwischen Apps und APIs bilden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Setup und dem Release-Fluss des [Packages-Arbeitsbereichs](./index.md) vertraut

</div>

## Wer verbraucht dieses

Jede ChurchApps API (die Core Api, AskApi und LessonsApi) und jedes Web-Frontend (B1Admin, B1App, B1Transfer, LessonsApp) hängt direkt von diesem Paket ab. Frontends erhalten auch viele seiner Exporte (`ApiHelper`, `DateHelper`, `UserHelper` und andere Schnittstellen) re-exported durch [`@churchapps/apphelper`](./app-helper). Die anderen gemeinsamen Pakete deklarieren es als Peer-Abhängigkeit, so dass jede App genau eine Kopie auflöst.

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Arbeitsbereich neben anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten an der Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen (kompiliert TypeScript zu `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Oder führen Sie `yarn build` an der Root aus, um jedes Paket in Abhängigkeitsreihenfolge zu bauen.

Zum Testen von Änderungen innerhalb eines verbrauchenden Projekts verwenden Sie ein temporäres Yarn-Portal – siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases gehen durch Changesets, anstatt manuelle Versions-Bumps:

1. Führen Sie `yarn changeset` an der Arbeitsbereich-Root durch und wählen Sie `@churchapps/helpers` mit dem entsprechenden Bump-Typ aus; committen Sie die generierte Changeset-Datei zusammen mit Ihrer Änderung.
2. Wenn Sie bereit sind zu veröffentlichen, führen Sie `yarn publish-all` an der Root durch – es baut alles in Abhängigkeitsreihenfolge und veröffentlicht die Bumped-Pakete zu npm.

Neue gemeinsame Schnittstellen gehen in `helpers/src/interfaces/` und werden durch die Paket-Barrel exportiert. Der Element-Typ-Katalog des Website-Builders (`ElementTypes.ts` – 35 Typen mit ihren Antwort-Schemas) lebt auch hier; er ist der Vertrag, der durch die AppHelper-Renderer, die B1Admin-Editor-Formulare und die AI-Generierungs-Eingabeaufforderungen geteilt wird (siehe [Website Builder Architecture](../architecture/website-builder)).

:::warning
Da dieses Paket von jedem ChurchApps-Projekt verwendet wird, haben Änderungen hier breite Auswirkungen. Eine Veröffentlichung von `helpers` bummert automatisch `apihelper` und `apphelper`, so dass ihre Abhängigkeitsbereiche aktuell bleiben. Testen Sie mit einem Yarn-Portal in mindestens einer verbrauchenden API und einer verbrauchenden Web-App, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[ApiHelper](./api-helper)** – Server-seitige Dienstprogramme, die von diesem Paket abhängen
- **[AppHelper](./app-helper)** – React-Komponenten, die von diesem Paket abhängen
- **[Shared Libraries Overview](./index.md)** – Arbeitsbereich-Setup, Release-Fluss und lokales Link-Workflow
