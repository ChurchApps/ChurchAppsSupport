---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Das `@churchapps/helpers`-Paket bietet Basisdienstprogramme, die von allen ChurchApps-Projekten verwendet werden, sowohl Frontend als auch Backend. Es ist Framework-agnostisch und enthält allgemeine Helfer wie `DateHelper`, `ApiHelper`, `CurrencyHelper`, plus die gemeinsamen TypeScript-Schnittstellen, die den Datenvertrag zwischen Apps und APIs bilden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages-Arbeitsbereich](./index.md)-Setup und Release-Flow vertraut

</div>

## Wer verbraucht das

Jede ChurchApps-API (die Core-Api, AskApi und LessonsApi) und jedes Web-Frontend (B1Admin, B1App, B1Transfer, LessonsApp) ist direkt von diesem Paket abhängig. Frontends erhalten viele seiner Exporte (`ApiHelper`, `DateHelper`, `UserHelper` und andere Schnittstellen) auch wieder exportiert durch [`@churchapps/apphelper`](./app-helper). Die anderen gemeinsamen Pakete deklarieren es als Peer-Abhängigkeit, daher löst jede App genau eine Kopie auf.

## Setup für lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Arbeitsbereich neben den anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten im Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Bauen Sie (kompiliert TypeScript zu `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Oder führen Sie `yarn build` im Root aus, um jedes Paket in Abhängigkeitsreihenfolge zu bauen.

Um Änderungen in einem verbrauchenden Projekt zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

## Veröffentlichung

Releases erfolgen durch Changesets statt manueller Versionsstöße:

1. Führen Sie `yarn changeset` im Arbeitsbereich-Root aus und wählen Sie `@churchapps/helpers` mit dem entsprechenden Bump-Typ; committen Sie die generierte Changeset-Datei mit Ihrer Änderung.
2. Wenn Sie bereit sind zu veröffentlichen, führen Sie `yarn publish-all` im Root aus -- es stößt Versionen an, schreibt CHANGELOGs, bauen in Abhängigkeitsreihenfolge und veröffentlicht zu npm.

Neue gemeinsame Schnittstellen werden in `helpers/src/interfaces/` abgelegt und durch das Paketfass wieder exportiert. Der Katalog der Website-Builder-Element-Typen (`ElementTypes.ts` -- 35 Typen mit ihren Antwort-Schemas) befindet sich auch hier; es ist der Vertrag, der von den AppHelper-Renderern, den B1Admin-Editor-Formularen und den KI-Generierungs-Prompts gemeinsam genutzt wird (siehe [Website-Builder-Architektur](../architecture/website-builder)).

:::warning
Da dieses Paket von jedem ChurchApps-Projekt verwendet wird, haben Änderungen eine breite Auswirkung. Eine Veröffentlichung von `helpers` stößt automatisch `apihelper` und `apphelper` an, damit ihre Abhängigkeitsbereiche aktuell bleiben. Testen Sie mit einem Yarn-Portal in mindestens einer verbrauchenden API und einer verbrauchenden Web-App, bevor Sie veröffentlichen.
:::

## Verwandte Artikel

- **[ApiHelper](./api-helper)** -- Serverseitige Dienstprogramme, die von diesem Paket abhängen
- **[AppHelper](./app-helper)** -- React-Komponenten, die von diesem Paket abhängen
- **[Übersicht der gemeinsamen Bibliotheken](./index.md)** -- Arbeitsbereich-Setup, Release-Flow und Local-Link-Workflow
