---
title: "Helyi API beállítása"
---

# Helyi API beállítása

<div class="article-intro">

Ez az útmutató végigvezet a ChurchApps API helyi fejlesztési környezetének beállításán. Klónozni fogod a tárolót, beállítod az adatbázis-kapcsolatokat, inicializálod a sémát, és elindítod a fejlesztői szervert újratöltéssel (hot reload).

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js 24+**, a **Git** és a **MySQL 8.0+** szoftvert -- lásd: [Előfeltételek](../setup/prerequisites)
- Hozzon létre egy MySQL-felhasználót, amelynek van adatbázis-létrehozási jogosultsága
- Tekintse át a [Környezeti változók](../setup/environment-variables) leírását az API konfigurációjához

</div>

## Lépésről lépésre

### 1. Klónozza a tárolót

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Telepítse a függőségeket

A projekt a Yarn csomagkezelőt használja (egy védelem blokkolja az `npm install` parancsot):

```bash
cd Api
yarn install
```

### 3. Állítsa be a környezeti változókat

```bash
cp .env.sample .env
```

Nyissa meg a `.env` fájlt, és állítsa be a MySQL-kapcsolati karakterláncokat. Minden modulnak saját adatbázis-kapcsolatra van szüksége a következő formátumban:

```
mysql://root:password@localhost:3306/dbname
```

Mind a hat modul adatbázisához (membership, attendance, content, giving, messaging, doing) kapcsolati karakterláncra lesz szüksége.

### 4. Inicializálja az adatbázisokat

```bash
npm run initdb
```

Ez automatikusan létrehozza mind a hat adatbázist és a hozzájuk tartozó táblákat.

:::tip
Egyetlen modul adatbázisát is inicializálhatja a `npm run initdb -- --module=membership` paranccsal (vagy `attendance`, `content`, `giving`, `messaging`, `doing` értékkel).
:::

### 5. Indítsa el a fejlesztői szervert

```bash
npm run dev
```

Az API újratöltéssel indul a [http://localhost:8084](http://localhost:8084) címen.

## Fontos parancsok

| Parancs | Leírás |
|---------|--------|
| `npm run dev` | Fejlesztői szerver indítása újratöltéssel (tsx watch) |
| `npm run build` | Tisztítás, TypeScript fordítás és az erőforrások másolása |
| `npm run test` | Tesztek futtatása Jesttel (lefedettség-méréssel) |
| `npm run test:watch` | Tesztek futtatása figyelő módban |
| `npm run lint` | ESLint futtatása automatikus javítással (az ESLint az egyetlen formázó) |

## Telepítés

A staging környezet megszűnt. Az API minden `main` ágra történő push után a demo környezetbe települ, az éles környezetbe pedig a kézi **Deploy Prod** munkafolyamattal, amely a függőben lévő adatbázis-migrációkat is alkalmazza. Részletekért lásd: [API telepítés](../deployment/apis).

## Helyi könyvtárfejlesztés

Ha egy megosztott könyvtárat (`@churchapps/helpers` vagy `@churchapps/apihelper`) kell az API-val párhuzamosan fejlesztenie, építse azt a [Packages](https://github.com/ChurchApps/Packages) munkaterületen, és adjon hozzá egy ideiglenes Yarn portált az API-hoz:

```bash
# A Packages munkaterületen
yarn build

# Az API könyvtárban
yarn link ../Packages/helpers
# ... tesztelés ...
yarn unlink ../Packages/helpers && yarn install
```

Így a könyvtármódosításokat az API-val tesztelheti anélkül, hogy npm-re publikálná őket. Részletekért lásd: [Megosztott könyvtárak](../shared-libraries/#local-development-against-a-consuming-app) -- és soha ne commitolja a `package.json` fájlba a link által írt portál-feloldást.

## Kapcsolódó cikkek

- **[Adatbázis](./database)** -- Az adatbázis modulonkénti felépítésének megértése
- **[Modulszerkezet](./module-structure)** -- Hogyan szerveződnek a vezérlők, tárolók és modellek
- **[Megosztott könyvtárak](../shared-libraries/)** -- A `@churchapps/helpers` és `@churchapps/apihelper` használata
