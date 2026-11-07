---
title: "Pomôcky"
description: "Balík @churchapps/helpers: čo poskytuje, ktoré aplikácie ho využívajú, lokálne zostavenie vo workspace Packages a publikovanie cez changesets."
---

# Pomôcky

<div class="article-intro">

Balík `@churchapps/helpers` poskytuje základné nástroje, ktoré používajú všetky projekty ChurchApps, či už frontendové, alebo backendové. Nie je viazaný na konkrétny framework a obsahuje bežné pomocné funkcie, ako sú `DateHelper`, `ApiHelper`, `CurrencyHelper`, a tiež spoločné rozhrania TypeScript, ktoré tvoria dátový kontrakt medzi aplikáciami a API.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte si **Node.js** a **Git** -- pozri [Požiadavky](../setup/prerequisites.md)
- Oboznámte sa s nastavením [pracovného priestoru Packages](./index.md) a postupom vydávania

</div>

## Kto ju používa

Každé API ChurchApps (hlavné Api, AskApi a LessonsApi) a každý webový frontend (B1Admin, B1App, B1Transfer, LessonsApp) priamo závisí na tomto balíku. Frontendy navyše získavajú mnohé jeho exporty (`ApiHelper`, `DateHelper`, `UserHelper` a ďalšie rozhrania) znovu exportované cez [`@churchapps/apphelper`](./app-helper.md). Ostatné zdieľané balíky ho deklarujú ako peer závislosť, aby každá aplikácia používala presne jednu kópiu.

## Nastavenie pre lokálny vývoj

Tento balík sa nachádza v pracovnom priestore [Packages](https://github.com/ChurchApps/Packages) spolu s ostatnými zdieľanými knižnicami:

1. Naklonujte pracovný priestor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainštalujte závislosti v koreňovom adresári pracovného priestoru:

   ```bash
   cd Packages && yarn install
   ```

3. Zostavte balík (skompiluje TypeScript do `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Alebo spustite `yarn build` v koreňovom adresári, čím sa zostavia všetky balíky v poradí podľa závislostí.

Na testovanie zmien v projekte, ktorý balík používa, použite dočasný Yarn portal -- pozri [Lokálny vývoj voči aplikácii, ktorá balík používa](./index.md#local-development-against-a-consuming-app).

## Vydávanie

Vydania prebiehajú cez changesety, nie cez ručné zvyšovanie verzií:

1. V koreňovom adresári pracovného priestoru spustite `yarn changeset`, vyberte `@churchapps/helpers` a zodpovedajúci typ zvýšenia verzie; vygenerovaný súbor changesetu potvrďte spolu so svojou zmenou.
2. Keď budete pripravení na vydanie, spustite v koreni `yarn publish-all` -- zvýši verzie, zapíše CHANGELOGy, zostaví balíky v poradí podľa závislostí a publikuje ich na npm.

Nové zdieľané rozhrania patria do `helpers/src/interfaces/` a sú znovu exportované cez hlavný súbor balíka. Katalóg typov prvkov stavebnice webov (`ElementTypes.ts` -- 35 typov so schémami ich odpovedí) sa tiež nachádza tu; je to kontrakt zdieľaný renderermi apphelper, formulármi editora B1Admin a promptami pre generovanie pomocou AI (pozri [Architektúra stavebnice webov](../architecture/website-builder.md)).

:::warning
Keďže tento balík používa každý projekt ChurchApps, zmeny tu majú široký dosah. Vydanie `helpers` automaticky zvýši verzie `apihelper` a `apphelper`, aby ich rozsahy závislostí zostali aktuálne. Pred publikovaním otestujte balík pomocou Yarn portalu aspoň v jednom závislom API a jednej závislej webovej aplikácii.
:::

## Súvisiace články

- **[ApiHelper](./api-helper.md)** -- Serverové pomocné funkcie, ktoré závisia na tomto balíku
- **[AppHelper](./app-helper.md)** -- React komponenty, ktoré závisia na tomto balíku
- **[Prehľad zdieľaných knižníc](./index.md)** -- Nastavenie pracovného priestoru, postup vydávania a workflow lokálneho prepojenia
