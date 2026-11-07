---
title: "ApiHelper"
description: "A @churchapps/apihelper csomag referenciája (Packages munkaterület): helyi build, tesztelés Yarn-portállal és közzététel changesetekkel."
---

# ApiHelper

<div class="article-intro">

A `@churchapps/apihelper` csomag szerveroldali segédeszközöket biztosít minden ChurchApps Express.js API-hoz. Tartalmazza az alaposztály-vezérlőt, a JWT-alapú hitelesítést, az adatbázis-segédeszközöket és az AWS-integrációkat, amelyekre minden API-projekt támaszkodik.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js**-t és a **Git**-et -- lásd: [Előfeltételek](../setup/prerequisites.md)
- Ismerkedjen meg a [Packages munkaterület](./index.md) beállításával és a kiadási folyamattal
- Ez a csomag a [`@churchapps/helpers`](./helpers.md) csomagtól függ (peer dependency-ként), és újra exportálja azt

</div>

## Mit tartalmaz

- **CustomBaseController** -- az API-vezérlők alaposztálya, amely az `inversify-express-utils` csomagra épül
- **Auth** -- JWT-alapú hitelesítés a `CustomAuthProvider`, `AuthenticatedUser` és `Principal` segítségével
- **Adatbázis-segédeszközök** -- a `DB.query` / `DB.queryOne` és a `Pool` osztály a MySQL-kapcsolatok kezeléséhez, valamint a `MySqlHelper` és a `DBCreator` a sémák beállításához
- **AWS-integrációk** -- az `AwsHelper` az S3 fájltároláshoz és az SSM Parameter Store olvasásához
- **E-mail** -- az `EmailHelper`, amely az SES- és SMTP-továbbítást támogatja
- **Konfiguráció betöltése** -- az `EnvironmentBase` kapcsolati karakterláncokat és titkos adatokat olvas környezeti változókból vagy a Parameter Store-ból
- **Egyéb** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Beállítás helyi fejlesztéshez

Ez a csomag a [Packages](https://github.com/ChurchApps/Packages) munkaterületen található, a többi megosztott könyvtár mellett:

1. Klónozza a munkaterületet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Telepítse a függőségeket a munkaterület gyökerében:

   ```bash
   cd Packages && yarn install
   ```

3. Építse meg a csomagot (a TypeScriptet a `dist/` mappába fordítja):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Vagy futtassa a `yarn build` parancsot a gyökérben, hogy az összes csomag a függőségi sorrendben épüljön meg.

A változtatások teszteléséhez egy felhasználó API-ban használjon ideiglenes Yarn portált -- lásd: [Helyi fejlesztés egy felhasználó alkalmazással](./index.md#local-development-against-a-consuming-app).

## Közzététel

A kiadások changeset-eken keresztül történnek: minden változtatásnál futtassa a `yarn changeset` parancsot a munkaterület gyökerében, majd a kiadás idején a `yarn publish-all` parancsot. A teljes folyamatért lásd: [Megosztott könyvtárak áttekintése](./index.md#releasing-with-changesets).

:::info
Ez a csomag minden ChurchApps API függősége -- a core Api, az AskApi és a LessonsApi. Változtatások esetén a közzététel előtt teszteljen helyileg egy API-n.
:::

## Kapcsolódó cikkek

- **[Helpers](./helpers.md)** -- Az alapvető segédcsomag, amelytől ez a csomag függ
- **[Modulstruktúra](../api/module-structure.md)** -- Hogyan használják a vezérlők és az auth middleware az API-modulokban
- **[Helyi API-beállítás](../api/local-setup.md)** -- Az API beállítása helyi fejlesztéshez
