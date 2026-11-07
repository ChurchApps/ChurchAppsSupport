---
title: "Megosztott könyvtárak"
---

# Megosztott könyvtárak

<div class="article-intro">

A ChurchApps megosztott kódja npm-en érhető el a `@churchapps/*` névtér alatt. Az összes megosztott csomag egyetlen tárolóban van – [Packages](https://github.com/ChurchApps/Packages) –, amelyet Yarn (Berry) munkaterületként kezelünk, verziózását pedig a [changesets](https://github.com/changesets/changesets) végzi.

</div>

## Csomagok

| Csomag | Leírás | Használja |
|--------|--------|-----------|
| [`@churchapps/helpers`](./helpers) | Alapréteg: keretrendszertől független segédfüggvények és azok a megosztott TypeScript interfészek, amelyek az alkalmazások közötti adatszerződést alkotják | Minden projekt |
| [`@churchapps/apihelper`](./api-helper) | Szerveroldali Express segédeszközök: hitelesítés, alapvezérlők, adatbázis-hozzáférés, AWS- és e-mail-integrációk | Minden API |
| [`@churchapps/apphelper`](./app-helper) | Megosztott React-komponensek és funkciómodulok (bejelentkezés, adományok, űrlapok, markdown, weboldal) | Minden webalkalmazás |
| `@churchapps/content-providers` | Absztrakció harmadik fél tartalomszolgáltatói felett (Lessons.church, Planning Center, Dropbox és mások) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Eszközkészlet B1.church integrációk építéséhez: webhook-ellenőrzés, típusos REST-kliens, OAuth-segédek | Külső integrációfejlesztők |
| `@churchapps/texting` | SMS-szolgáltatók absztrakciója (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

A függőségi irány szigorúan lefelé mutat: az alkalmazások az `apihelper`-től és az `apphelper`-től függenek, amelyek a `@churchapps/helpers`-t **peer dependency**-ként (társfüggőségként) deklarálják, így minden alkalmazás pontosan egy példányt használ belőle.

## Munkaterület beállítása

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

A tároló Yarn Berry-t használ (a gyökér `packageManager` mezője az irányadó), egyetlen zárolófájllal (lockfile). A `yarn build` a függőségi sorrendnek megfelelően építi fel az összes csomagot; a `yarn test` az összes csomag tesztjeit futtatja.

## Kiadás a changesets segítségével

A csomagok minden változtatása egy changeset-tel együtt kerül kiadásra:

1. Futtasd a `yarn changeset` parancsot a munkaterület gyökerében. Válaszd ki az érintett csomag(oka)t, a verziónövelés típusát (patch = javítás, minor = új export vagy funkció, major = törő változtatás), és írj egy egysoros összefoglalót – ez lesz a CHANGELOG bejegyzés.
2. A generált `.changeset/*.md` fájlt commitold a kódmódosítással együtt. Egy pre-commit hook blokkolja azokat a commitokat, amelyek egy csomag forráskódját módosítják anélkül, hogy lenne hozzájuk staged changeset.
3. Amikor készen állsz a publikálásra, futtasd a `yarn publish-all` parancsot a gyökérben. Ez feldolgozza a függőben lévő changeseteket (megemeli a verziókat, megírja a CHANGELOG-okat, szinkronizálja a belső függőségi tartományokat), a függőségi sorrendben buildeli az összes csomagot, majd npm-re publikálja a verziónövelt csomagokat. Ezután commitold és pushold a verziónövelést.

:::warning
Soha ne futtass nyers `npm publish` parancsot egy csomag könyvtárában – az kihagyja a build-sorrendet és a verziókezelést, amelyet a kiadó szkript elvégez. A publikáláshoz olyan npm-fiókra van szükség, amelynek van publikálási joga a `@churchapps` névtérhez.
:::

## Helyi fejlesztés egy csomagot használó alkalmazással

A munkaterületen belül a csomagok közvetlenül a testvércsomagjaikra épülnek – nincs szükség linkelésre. Egy még nem publikált csomag build-jének teszteléséhez egy használó alkalmazásban (B1Admin, B1App stb.) adj hozzá ideiglenes Yarn portalt a fogyasztó projektben:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Előbb buildeld a csomagot (`yarn build` a munkaterület gyökerében) – a fogyasztó a lefordított `dist/` kimenetet olvassa, nem a forráskódot.

:::warning
A `yarn link` portal feloldást ír a fogyasztó `package.json` fájljába. Soha ne commitold – a munka végén mindig futtasd a `yarn unlink` parancsot, majd telepítsd újra a függőségeket.
:::
