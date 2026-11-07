---
title: "Előfeltételek"
---

# Előfeltételek

<div class="article-intro">

A szükséges eszközök attól függnek, hogy mely projekteken szeretne dolgozni. Ez az oldal fejlesztési területek szerint csoportosítva sorolja fel az összes szükséges szoftvert, az általános követelményektől a platformspecifikus eszközláncokig.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Tekintse át a [Projekt áttekintést](./project-overview), hogy eldöntse, mely projekteken szeretne dolgozni
- Legyen rendszergazdai hozzáférése a fejlesztői gépén a szoftverek telepítéséhez

</div>

## Összes projekt

Ezek minden projektnél szükségesek, függetlenül attól, hogy melyiken dolgozik:

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Node.js** | 20+ | A 22+ verzió szükséges a B1App és a LessonsApp (Next.js 16) számára; a 24+ verzió szükséges az Api-hoz |
| **npm** | A Node.js-szel együtt érkezik | Csomagkezelőként használatos minden projektben |
| **Git** | Legújabb | Minden projekt külön tárolóban található |

:::tip
Használjon Node-verziókezelőt, például [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) vagy [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) eszközt, hogy könnyen válthasson a Node-verziók között.
:::

## Backend API fejlesztés

Ha az API-t helyben szeretné futtatni (ahelyett, hogy a demó API-kra mutatna):

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **MySQL** | 8.0+ | Minden API-modul saját adatbázist használ |

Az alapvető API-hoz hat adatbázisra van szüksége: `membership`, `attendance`, `content`, `giving`, `messaging` és `doing`. Az API tartalmaz szkripteket a séma inicializálásához – lásd az [API helyi beállítása](../api/local-setup) útmutatót.

## Mobilalkalmazás fejlesztés

B1Mobile, B1Checkin, LessonsScreen vagy más React Native / Expo alkalmazások esetén:

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Expo CLI** | Legújabb | Globális telepítés: `npm install -g expo-cli` |
| **Android Studio** | Legújabb | Android-fejlesztéshez szükséges (tartalmazza az Android SDK-t) |
| **Xcode** | Legújabb | iOS-fejlesztéshez szükséges (csak macOS) |

:::info
Fizikai eszközön gyors teszteléshez használhatja az Expo Go alkalmazást Android Studio vagy Xcode nélkül. Az éles bináris fájlok építéséhez azonban a natív eszközláncok szükségesek.
:::

## FreeShow (asztali alkalmazás) fejlesztés

A FreeShow további natív build-függőségekkel rendelkezik, mert natív Node-modulokat (például `canvas`) fordít:

### Minden platform

| Eszköz | Verzió | Megjegyzések |
|------|---------|-------|
| **Python** | 3.12 | A `node-gyp` igényli a natív modulok fordításához |
| **setuptools** | Legújabb | Telepítés: `pip install setuptools` |

### Windows

| Eszköz | Megjegyzések |
|------|-------|
| **Visual Studio** | A Community kiadás elegendő |
| **"Desktop development with C++" munkaterhelés** | A Visual Studio telepítése során válassza ki |
| **Windows 10 SDK** | A C++ munkaterhelésben található; győződjön meg róla, hogy be van jelölve |

A Visual Studio build-eszközöket parancssorból is telepítheti:

```bash
npm install --global windows-build-tools
```

Vagy telepítse a Visual Studio Community kiadását, és a telepítés során válassza ki a "Desktop development with C++" munkaterhelést.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Az Xcode parancssori eszközei általában elegendők:

```bash
xcode-select --install
```

## Telepítés ellenőrzése

Futtassa ezeket a parancsokat annak megerősítéséhez, hogy minden telepítve van:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Következő lépések

- **[Projekt áttekintés](./project-overview)** -- Tekintse meg az összes projektet és azok funkcióit
- **[Környezeti változók](./environment-variables)** -- Konfigurálja a `.env` fájljait
