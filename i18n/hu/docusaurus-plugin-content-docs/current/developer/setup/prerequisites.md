---
title: "Előfeltételek"
description: "Node.js, npm, Git és a platformfüggő eszközláncok telepítése a ChurchApps-projektek helyi fejlesztése előtt, például a B1 Admin, a Lessons.church, a FreePlay vagy az API esetében."
---

# Előfeltételek

<div class="article-intro">

A szükséges eszközök attól függenek, hogy mely projekteken szeretnél dolgozni. Ez az oldal fejlesztési terület szerint csoportosítva sorolja fel az összes szükséges szoftvert, az általános követelményektől a platformspecifikus eszközláncokig.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Tekintsd át a [Projektáttekintést](./project-overview.md), hogy eldöntsd, mely projekteken szeretnél dolgozni
- Legyen adminisztrátori hozzáférésed a fejlesztőgépen a szoftverek telepítéséhez

</div>

## Minden projekt

Ezek minden projekthez szükségesek, függetlenül attól, melyiken dolgozol:

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Node.js** | 20+ | A B1App és a LessonsApp (Next.js 16) esetében 22+ verzió szükséges; az Api-hoz 24+ |
| **npm** | A Node.js-szel együtt érkezik | A csomagkezelő minden projektben ezt használjuk |
| **Git** | Legújabb | Minden projekt külön tárolóban található |

:::tip
A Node-verziók egyszerű váltásához használj verziókezelőt, például [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) vagy [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) eszközt.
:::

## Backend API fejlesztés

Ha az API-t helyben szeretnéd futtatni (a demó API-k helyett):

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **MySQL** | 8.0+ | Minden API-modul saját adatbázist használ |

A alap API-hoz hat adatbázisra lesz szükséged: `membership`, `attendance`, `content`, `giving`, `messaging` és `doing`. Az API tartalmaz szkripteket a séma inicializálásához – lásd az [API helyi beállítása](../api/local-setup.md) útmutatót.

## Mobilalkalmazás-fejlesztés

A B1Checkin, a LessonsScreen vagy más React Native / Expo alkalmazások esetében:

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Expo CLI** | Legújabb | Globális telepítés: `npm install -g expo-cli` |
| **Android Studio** | Legújabb | Android-fejlesztéshez szükséges (tartalmazza az Android SDK-t) |
| **Xcode** | Legújabb | iOS-fejlesztéshez szükséges (csak macOS) |

:::info
Gyors teszteléshez fizikai eszközön használhatod az Expo Go alkalmazást Android Studio vagy Xcode nélkül. Éles bináris fájlok készítéséhez azonban a natív eszközláncok szükségesek.
:::

## FreeShow (asztali alkalmazás) fejlesztés

A FreeShow további natív build-függőségeket igényel, mert natív Node-modulokat (például a `canvas`-t) fordít:

### Minden platform

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Python** | 3.12 | A `node-gyp` natív modulok fordításához igényli |
| **setuptools** | Legújabb | Telepítés: `pip install setuptools` |

### Windows

| Eszköz | Megjegyzések |
|------|-------|
| **Visual Studio** | A Community kiadás elegendő |
| **„Desktop development with C++” munkaterhelés** | A Visual Studio telepítése közben válaszd ki |
| **Windows 10 SDK** | A C++ munkaterhelésben benne van; győződj meg róla, hogy be van jelölve |

A Visual Studio build-eszközöket parancssorból is telepítheted:

```bash
npm install --global windows-build-tools
```

Vagy telepítsd a Visual Studio Community kiadást, és telepítés közben válaszd ki a „Desktop development with C++” munkaterhelést.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Általában az Xcode parancssori eszközei elegendők:

```bash
xcode-select --install
```

## A telepítés ellenőrzése

Futtasd ezeket a parancsokat, hogy megbizonyosodj róla, minden telepítve van:

```bash
node --version    # v20.x.x vagy magasabb verziót kell kiírnia
npm --version     # 10.x.x vagy magasabb verziót kell kiírnia
git --version     # git version 2.x.x-et kell kiírnia
mysql --version   # Csak helyi API-fejlesztéshez szükséges
```

## Következő lépések

- **[Projektáttekintés](./project-overview.md)** -- Az összes projekt és azok funkcióinak áttekintése
- **[Környezeti változók](./environment-variables.md)** -- A `.env` fájlok beállítása
