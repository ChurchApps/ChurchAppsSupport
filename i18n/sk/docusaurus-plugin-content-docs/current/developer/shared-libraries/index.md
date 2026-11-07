---
title: "Zdieľané knižnice"
description: "Dokumentácia npm balíkov @churchapps zdieľaných aplikáciami B1 Admin, B1.church a API, nastavenie workspace Packages a vydávanie verzií cez changesets."
---

# Zdieľané knižnice

<div class="article-intro">

Zdieľaný kód ChurchApps sa publikuje na npm v rozsahu `@churchapps/*`. Všetky zdieľané balíky sa nachádzajú v jedinom repozitári -- [Packages](https://github.com/ChurchApps/Packages). Spravujú sa ako pracovný priestor Yarn (Berry) a verzie sa riadia pomocou [changesets](https://github.com/changesets/changesets).

</div>

## Balíky

| Balík | Popis | Používa |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers.md) | Základná vrstva: pomocné funkcie nezávislé od frameworku a zdieľané rozhrania TypeScript, ktoré tvoria spoločný dátový kontrakt medzi aplikáciami | Všetky projekty |
| [`@churchapps/apihelper`](./api-helper.md) | Serverové pomocné nástroje pre Express: autentifikácia, základné kontroléry, prístup k databáze, integrácie s AWS a e-mailom | Všetky API |
| [`@churchapps/apphelper`](./app-helper.md) | Zdieľané komponenty React a funkčné moduly (prihlásenie, dary, formuláre, markdown, webová stránka) | Všetky webové aplikácie |
| `@churchapps/content-providers` | Abstrakcia nad poskytovateľmi obsahu tretích strán (Lessons.church, Planning Center, Dropbox a ďalší) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Nástroje na vytváranie integrácií pre B1.church: overovanie webhookov, typovaný REST klient, pomocné funkcie pre OAuth | Externí vývojári integrácií |
| `@churchapps/texting` | Abstrakcia poskytovateľov SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Smer závislostí je prísne smerom nadol: aplikácie závisia od `apihelper` a `apphelper`, ktoré deklarujú `@churchapps/helpers` ako **peer dependency**, aby každá aplikácia používala presne jednu kópiu tohto balíka.

## Nastavenie pracovného priestoru

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repozitár používa Yarn Berry (rozhodujúce je pole `packageManager` v koreňovom adresári) a jeden súbor so zámkami. `yarn build` zostaví každý balík v poradí podľa závislostí; `yarn test` spustí testy všetkých balíkov.

## Vydávanie pomocou Changesets

Každá zmena balíka sa dodáva s changesetom:

1. V koreňovom adresári pracovného priestoru spustite `yarn changeset`. Vyberte balík alebo balíky, ktorých sa zmena týka, typ zvýšenia verzie (patch = oprava, minor = nový export alebo funkcia, major = zmena nekompatibilná so spätnou kompatibilitou) a napíšte jednoriadkové zhrnutie -- stane sa záznamom v CHANGELOG.
2. Vygenerovaný súbor `.changeset/*.md` potvrďte (commit) spolu so zmenou kódu. Predcommitový hook zablokuje commity, ktoré menia zdrojový kód balíka bez pripraveného changesetu.
3. Keď ste pripravení na publikovanie, spustite v koreni príkaz `yarn publish-all`. Ten spracuje čakajúce changesety (zvýši verzie, zapíše CHANGELOG, zosúladí rozsahy interných závislostí), zostaví všetko v poradí podľa závislostí a publikuje zvýšené balíky na npm. Potom potvrďte (commit) a odošlite (push) zmeny verzií.

:::warning
Nikdy nespúšťajte priamy príkaz `npm publish` v rámci jedného balíka. Preskočí sa tým poradie zostavovania a správa verzií, ktorú rieši vydávací skript. Na publikovanie je potrebný účet npm s oprávneniami na publikovanie v rozsahu `@churchapps`.
:::

## Lokálny vývoj voči aplikácii, ktorá balík používa

V rámci pracovného priestoru balíky zostavujú priamo voči svojim susedným balíkom -- prepojenie nie je potrebné. Ak chcete otestovať nepublikovaný balík v používajúcej aplikácii (B1Admin, B1App a pod.), pridajte do tejto aplikácie dočasný portál Yarn:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Najprv zostavte balík (`yarn build` v koreni pracovného priestoru) -- používajúca aplikácia číta skompilovaný výstup `dist/`, nie zdrojový kód.

:::warning
Príkaz `yarn link` zapíše do `package.json` používajúcej aplikácie preklad závislosti na portál. Nikdy ho nepotvrdzujte (necommitujte) -- po dokončení vždy spustite `yarn unlink` a znovu nainštalujte závislosti.
:::
