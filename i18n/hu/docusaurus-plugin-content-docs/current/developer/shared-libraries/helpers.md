---
title: "Segédfüggvények"
description: "A @churchapps/helpers csomag fejlesztőknek: funkciói, a használó alkalmazások, helyi build a Packages munkaterületen és changesets-alapú közzététel."
---

# Segédfüggvények

<div class="article-intro">

A `@churchapps/helpers` csomag alapvető segédfüggvényeket biztosít, amelyeket a ChurchApps projektek mind a frontend, mind a backend oldalon használnak. Nem kötődik egy adott keretrendszerhez, és olyan gyakori segédeszközöket tartalmaz, mint a `DateHelper`, az `ApiHelper` és a `CurrencyHelper`, valamint azokat a megosztott TypeScript interfészeket, amelyek az alkalmazások és az API-k közötti adatszerződést alkotják.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js**-t és a **Git**-et -- lásd: [Előfeltételek](../setup/prerequisites.md)
- Ismerkedjen meg a [Packages munkaterület](./index.md) beállításával és a kiadási folyamattal

</div>

## Kik használják

Minden ChurchApps API (a főbb Api, az AskApi és a LessonsApi), valamint minden webes frontend (B1Admin, B1App, B1Transfer, LessonsApp) közvetlenül függ ettől a csomagtól. A frontendek számos exportját (`ApiHelper`, `DateHelper`, `UserHelper` és más interfészek) a [`@churchapps/apphelper`](./app-helper.md) csomagon keresztül is megkapják újra exportálva. A többi megosztott csomag peer-függőségként deklarálja, így minden alkalmazás pontosan egy példányt használ belőle.

## Helyi fejlesztési beállítás

Ez a csomag a [Packages](https://github.com/ChurchApps/Packages) munkaterületen található, a többi megosztott könyvtár mellett:

1. Klónozza a munkaterületet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Telepítse a függőségeket a munkaterület gyökerében:

   ```bash
   cd Packages && yarn install
   ```

3. Építse fel a csomagot (a TypeScriptet `dist/` mappába fordítja):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Vagy futtassa a `yarn build` parancsot a gyökérben, hogy minden csomag a függőségi sorrendben épüljön fel.

A változtatások teszteléséhez egy felhasználó projektben használja az ideiglenes Yarn portált -- lásd: [Helyi fejlesztés egy felhasználó alkalmazással](./index.md#local-development-against-a-consuming-app).

## Közzététel

A kiadások manuális verziószám-növelés helyett changesetekön keresztül történnek:

1. Futtassa a `yarn changeset` parancsot a munkaterület gyökerében, válassza ki a `@churchapps/helpers` csomagot a megfelelő verziónövelési típussal, majd commitolja a generált changeset fájlt a módosítással együtt.
2. Amikor készen áll a kiadásra, futtassa a `yarn publish-all` parancsot a gyökérben -- ez növeli a verziókat, megírja a CHANGELOG fájlokat, függőségi sorrendben felépíti a csomagokat, és közzéteszi őket az npm-en.

Az új megosztott interfészek a `helpers/src/interfaces/` mappába kerülnek, és a csomag barrel fájlján keresztül exportálódnak újra. A weboldal-készítő elemtípus-katalógusa (`ElementTypes.ts` -- 35 típus a válaszsémáikkal) is itt található; ez az a szerződés, amelyet az apphelper megjelenítői, a B1Admin szerkesztő űrlapjai és az AI-generáló promptok osztanak meg (lásd: [Weboldal-készítő architektúra](../architecture/website-builder.md)).

:::warning
Mivel ezt a csomagot minden ChurchApps projekt használja, az itt végzett változtatásoknak széles körű hatása van. A `helpers` kiadása automatikusan megemeli az `apihelper` és az `apphelper` verzióit, hogy a függőségi tartományaik naprakészek maradjanak. Közzététel előtt legalább egy felhasználó API-ban és egy felhasználó webes alkalmazásban teszteljen Yarn portállal.
:::

## Kapcsolódó cikkek

- **[ApiHelper](./api-helper.md)** -- Szerveroldali segédeszközök, amelyek ettől a csomagtól függnek
- **[AppHelper](./app-helper.md)** -- React komponensek, amelyek ettől a csomagtól függnek
- **[Megosztott könyvtárak áttekintése](./index.md)** -- Munkaterület beállítása, kiadási folyamat és helyi linkelési munkafolyamat
