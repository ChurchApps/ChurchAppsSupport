---
title: "Pomocné nástroje"
description: "Popis balíčku @churchapps/helpers: co nabízí, které aplikace ho používají, lokální build v pracovním prostoru Packages a publikování přes changesets."
---

# Pomocné nástroje

<div class="article-intro">

Balíček `@churchapps/helpers` poskytuje základní nástroje, které používají všechny projekty ChurchApps, jak frontendové, tak backendové. Není vázaný na žádný framework a obsahuje běžné pomocné funkce, jako `DateHelper`, `ApiHelper` a `CurrencyHelper`, a také sdílená TypeScript rozhraní, která tvoří datový kontrakt mezi aplikacemi a API.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte si **Node.js** a **Git** -- viz [Předpoklady](../setup/prerequisites.md)
- Seznamte se s nastavením pracovního prostoru [Packages](./index.md) a postupem vydávání

</div>

## Kdo to používá

Každé API ChurchApps (hlavní Api, AskApi a LessonsApi) i každý webový frontend (B1Admin, B1App, B1Transfer, LessonsApp) na tomto balíčku přímo závisí. Frontendy navíc získávají mnoho jeho exportů (`ApiHelper`, `DateHelper`, `UserHelper` a další rozhraní) znovu exportovaných přes [`@churchapps/apphelper`](./app-helper.md). Ostatní sdílené balíčky ho deklarují jako peer dependency, aby každá aplikace používala přesně jednu kopii.

## Nastavení pro lokální vývoj

Tento balíček je součástí pracovního prostoru [Packages](https://github.com/ChurchApps/Packages) spolu s dalšími sdílenými knihovnami:

1. Naklonujte pracovní prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainstalujte závislosti v kořenovém adresáři pracovního prostoru:

   ```bash
   cd Packages && yarn install
   ```

3. Sestavte balíček (zkompiluje TypeScript do `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Nebo spusťte v kořenovém adresáři `yarn build`, který sestaví všechny balíčky v pořadí podle závislostí.

Chcete-li změny otestovat uvnitř projektu, který balíček používá, použijte dočasný Yarn portál -- viz [Lokální vývoj proti aplikaci, která balíček používá](./index.md#local-development-against-a-consuming-app).

## Publikování

Vydání probíhají přes changesety, nikoli ruční zvyšování verzí:

1. V kořenovém adresáři pracovního prostoru spusťte `yarn changeset`, vyberte `@churchapps/helpers` s odpovídajícím typem zvýšení verze a vygenerovaný soubor changesetu commitněte spolu se svou změnou.
2. Až budete připraveni vydat, spusťte v kořenovém adresáři `yarn publish-all` -- zvýší verze, zapíše CHANGELOGy, sestaví balíčky v pořadí podle závislostí a publikuje je na npm.

Nová sdílená rozhraní patří do `helpers/src/interfaces/` a jsou znovu exportována přes hlavní soubor balíčku (barrel). Katalog typů prvků tvorby webových stránek (`ElementTypes.ts` — 35 typů se schématy jejich odpovědí) je také zde; je to kontrakt sdílený renderery apphelper, formuláři editoru B1Admin a prompty pro generování pomocí AI (viz [Architektura tvorby webových stránek](../architecture/website-builder.md)).

:::warning
Protože tento balíček používá každý projekt ChurchApps, mají změny zde velký dopad. Vydání `helpers` automaticky zvýší verze `apihelper` a `apphelper`, aby jejich rozsahy závislostí zůstaly aktuální. Před publikováním otestujte změny přes Yarn portál alespoň v jednom využívajícím API a jedné využívající webové aplikaci.
:::

## Související články

- **[ApiHelper](./api-helper.md)** -- Serverové nástroje, které závisí na tomto balíčku
- **[AppHelper](./app-helper.md)** -- React komponenty, které závisí na tomto balíčku
- **[Přehled sdílených knihoven](./index.md)** -- Nastavení pracovního prostoru, postup vydávání a práce s lokálními odkazy
