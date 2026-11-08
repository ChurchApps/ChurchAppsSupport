---
title: "Projektáttekintés"
description: "Mutassa be a ChurchApps összes tárolóját kategóriánként, a keretrendszerekkel, a fejlesztési portokkal, az adatbázisokkal és azzal, hogyan kapcsolódnak a megosztott @churchapps csomagok a fejlesztői telepítési dokumentációban."
---

# Projektáttekintés

<div class="article-intro">

A ChurchApps körülbelül 20 önálló tárolóból (repository) áll, amelyek mindegyike a [ChurchApps GitHub szervezet](https://github.com/ChurchApps) alatt érhető el. Ez az oldal kategóriák szerint rendezve tartalmazza az összes projekt teljes leltárát, valamint azok keretrendszereit, portjait és kapcsolatait.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Telepítse a [előfeltételeket](./prerequisites.md)ahhoz a projektkategóriához, amellyel dolgozni szeretne

</div>

## Backend API-k

Minden API Node.js, Express és TypeScript segítségével készült, és a Serverless Framework révén AWS Lambdára van telepítve.

| Projekt | Cél | Fejlesztési port | Adatbázis |
|---------|-----|------------------|-----------|
| **[Api](https://github.com/ChurchApps/Api)** | Moduláris monolit alapú főrendszer, amely a tagságot, a jelenlétet, a tartalmat, az adományozást, az üzenetküldést és a feladatokat (doing) fedi le | 8084 | Modulonként külön MySQL-adatbázis (összesen 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church háttérrendszer | -- | Egyetlen `lessons` MySQL-adatbázis |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | MI-alapú lekérdezőeszköz, amelyet az OpenAI működtet | -- | -- |

:::info
A fő **Api** projekt moduláris monolit. Minden modulnak (tagság, jelenlét, tartalom, adományozás, üzenetküldés, feladatok) saját adatbázisa van, és olyan almappán érhető el, mint például `/membership` vagy `/giving`. Éles környezetben ezek külön Lambda-függvényekként jelennek meg az API Gateway mögött.
:::

## Webalkalmazások

| Projekt | Keretrendszer | Fejlesztési port | Cél |
|---------|---------------|------------------|-----|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Gyülekezeti adminisztrációs felület |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Nyilvános, gyülekezeti tagoknak szóló alkalmazás |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church felhasználói felület |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Adatimport/-export segédeszköz |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statikus | -- | Statikus gyülekezeti szórólap-weboldalak |

## Mobilalkalmazások

Minden mobilalkalmazás React Native-t használ Expo-val.

| Projekt | Cél | Fontos verziók |
|---------|-----|----------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Bejelentkező (check-in) kioszk alkalmazás | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-s leckemegjelenítő | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Tartalomlejátszás (TV operációs rendszeren is) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil távirányító a FreeShow-hoz | Expo |

## Asztali alkalmazás

| Projekt | Technológiai háttér | Cél |
|---------|---------------------|-----|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Prezentációs és istentiszteleti szoftver |

## Megosztott könyvtárak

A megosztott kód az `@churchapps` névtér alatt került közzétételre az npm-en, és a fenti projektek szokásos npm-függőségként használják. Minden megosztott csomag egyetlen tárolóban található -- [Packages](https://github.com/ChurchApps/Packages) --, amelyet Yarn-munkaterületként kezelnek és changesetekkel adnak ki.

| Csomag | Cél | Használja |
|--------|-----|-----------|
| `@churchapps/helpers` | Alapvető segédfüggvények és megosztott TypeScript-interfészek (DateHelper, ApiHelper, CurrencyHelper stb.) | Minden projekt |
| `@churchapps/apihelper` | Express-szerver segédeszközök (hitelesítés, alap vezérlők, adatbázis-hozzáférés, AWS-integrációk) | Minden API |
| `@churchapps/apphelper` | React-komponenskönyvtár almodulokkal a bejelentkezéshez, adományozáshoz, űrlapokhoz, markdownhoz és weboldal-készítéshez | Minden webalkalmazás |
| `@churchapps/content-providers` | Harmadik féltől származó tartalomszolgáltatók absztrakciója (Lessons.church, Planning Center, Dropbox és mások) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integrációs eszközkészlet: webhookok, REST-kliens, OAuth | Külső integrációfejlesztők |
| `@churchapps/texting` | SMS-szolgáltatók absztrakciója | Api |

A munkaterület beállításáért és a kiadási folyamatért lásd: [Megosztott könyvtárak](../shared-libraries/index.md).

## Projektek közötti kapcsolatok

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Minden frontend alkalmazás függ a `@churchapps/helpers` csomagtól. A webalkalmazások emellett az `@churchapps/apphelper` csomagoktól is függnek. Minden backend API mind a `@churchapps/helpers`, mind a `@churchapps/apihelper` csomagtól függ.

## Következő lépések

- **[Környezeti változók](./environment-variables.md)** -- Állítsa be a `.env` fájljait az API-khoz való kapcsolódáshoz
- **[API helyi beállítása](../api/local-setup.md)** -- Állítsa be a backend API-t helyben
