---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Das Paket `@churchapps/helpers` stellt grundlegende Hilfsprogramme bereit, die von allen ChurchApps-Projekten verwendet werden, sowohl im Frontend als auch im Backend. Es ist framework-agnostisch und enthält gängige Hilfsprogramme wie `DateHelper`, `ApiHelper`, `CurrencyHelper`, sowie die gemeinsam genutzten TypeScript-Schnittstellen, die den Datenvertrag zwischen Apps und APIs bilden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Aufbau und Release-Ablauf des [Packages-Workspace](./index.md) vertraut

</div>

## Wer dies nutzt

Jede ChurchApps-API (der Kern-Api, AskApi und LessonsApi) und jedes Web-Frontend (B1Admin, B1App, B1Transfer, LessonsApp) hängt direkt von diesem Paket ab. Frontends erhalten viele seiner Exporte (`ApiHelper`, `DateHelper`, `UserHelper` und weitere Schnittstellen) auch erneut exportiert über [`@churchapps/apphelper`](./app-helper). Die anderen gemeinsam genutzten Pakete deklarieren es als Peer-Dependency, sodass jede App genau eine Kopie davon auflöst.

## Einrichtung für die lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Workspace zusammen mit den anderen gemeinsam genutzten Bibliotheken:

1. Workspace klonen:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Abhängigkeiten im Workspace-Root installieren:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen (kompiliert TypeScript nach `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Oder führen Sie `yarn build` im Root aus, um alle Pakete in Abhängigkeitsreihenfolge zu bauen.

Um Änderungen innerhalb eines konsumierenden Projekts zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine konsumierende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases laufen über Changesets statt über manuelle Versionserhöhungen:

1. Führen Sie `yarn changeset` im Workspace-Root aus und wählen Sie `@churchapps/helpers` mit dem passenden Erhöhungstyp; committen Sie die erzeugte Changeset-Datei zusammen mit Ihrer Änderung.
2. Wenn Sie bereit für die Veröffentlichung sind, führen Sie `yarn publish-all` im Root aus -- es erhöht Versionen, schreibt CHANGELOGs, baut in Abhängigkeitsreihenfolge und veröffentlicht auf npm.

Neue gemeinsam genutzte Schnittstellen kommen in `helpers/src/interfaces/` und werden über das Paket-Barrel erneut exportiert. Der Element-Typ-Katalog des Website-Builders (`ElementTypes.ts` — 35 Typen mit ihren Antwortschemata) befindet sich ebenfalls hier; es ist der Vertrag, der von den apphelper-Renderern, den B1Admin-Editorformularen und den KI-Generierungs-Prompts gemeinsam genutzt wird (siehe [Architektur des Website-Builders](../architecture/website-builder)).

:::warning
Da dieses Paket von jedem ChurchApps-Projekt verwendet wird, haben Änderungen hier eine breite Auswirkung. Ein Release von `helpers` erhöht automatisch die Versionen von `apihelper` und `apphelper`, damit deren Abhängigkeitsbereiche aktuell bleiben. Testen Sie mit einem Yarn-Portal in mindestens einer konsumierenden API und einer konsumierenden Web-App, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[ApiHelper](./api-helper)** -- Serverseitige Hilfsprogramme, die von diesem Paket abhängen
- **[AppHelper](./app-helper)** -- React-Komponenten, die von diesem Paket abhängen
- **[Übersicht der gemeinsam genutzten Bibliotheken](./index.md)** -- Workspace-Setup, Release-Ablauf und lokaler Link-Workflow
