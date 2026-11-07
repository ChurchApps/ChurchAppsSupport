---
title: "Projektáttekintés"
description: "A ChurchApps-tárolók áttekintése kategóriánként: keretrendszerek, fejlesztői portok, adatbázisok és a @churchapps-csomagok kapcsolata."
---

# Projektáttekintés

<div class="article-intro">

A ChurchApps körülbelül 20 önálló tárolóból áll, amelyek mindegyike a [ChurchApps GitHub-szervezet](https://github.com/ChurchApps) alatt érhető el. Ez az oldal kategóriák szerint rendezve adja meg az összes projekt teljes listáját, a keretrendszerekkel, portokkal és kapcsolatokkal együtt.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a [előfeltételeket](./prerequisites.md) annak a projektkategóriának, amellyel dolgozni szeretne

</div>

## Backend API-k

Minden API Node.js, Express és TypeScript segítségével készült, és a Serverless Framework révén AWS Lambdára van telepítve.

| Projekt | Cél | Fejlesztői port | Adatbázis |
|---------|-----|-----------------|-----------|
| **[Api](https://github.com/ChurchApps/Api)** | Alapvető moduláris monolit, amely a tagságot, a jelenlétet, a tartalmat, az adakozást, az üzenetküldést és a teendőket (doing) fedi le | 8084 | Modulonként külön MySQL-adatbázis (összesen 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | A Lessons.church háttérrendszere | -- | Egyetlen `lessons` MySQL-adatbázis |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI-alapú MI-lekérdező eszköz | -- | -- |

:::info
A főbb **Api** projekt moduláris monolit. Minden modulnak (membership, attendance, content, giving, messaging, doing) saját adatbázisa van, és olyan al-útvonalon érhető el, mint a `/membership` vagy a `/giving`. Éles környezetben ezek külön Lambda-függvényekként érhetők el az API Gateway mögött.
:::

## Webalkalmazások

| Projekt | Keretrendszer | Fejlesztői port | Cél |
|---------|---------------|-----------------|-----|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Egyházi adminisztrációs irányítópult |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Nyilvános, egyháztagoknak szánt alkalmazás |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | A Lessons.church frontendje |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Adatimportáló/exportáló segédeszköz |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statikus | -- | Statikus egyházi szórólap-weboldalak |

## Mobilalkalmazások

Minden mobilalkalmazás React Native-t használ az Expo-val.

| Projekt | Cél | Fontos verziók |
|---------|-----|----------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Egyháztagok alkalmazása iOS-re és Androidra | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Bejelentkező kioszk-alkalmazás | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Leckemegjelenítő Android TV-re | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Tartalomlejátszás (beleértve a TV OS-t is) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobil távirányító a FreeShow-hoz | Expo |

## Asztali alkalmazás

| Projekt | Technológiai verem | Cél |
|---------|--------------------|-----|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Prezentációs és istentiszteleti szoftver |

## Megosztott könyvtárak

A megosztott kód npm-en a `@churchapps` névtér alatt jelenik meg, és a fenti projektek szokásos npm-függőségeként használják. Minden megosztott csomag egyetlen tárolóban található – [Packages](https://github.com/ChurchApps/Packages) –, Yarn-munkaterületként kezelve és changesetekkel kiadva.

| Csomag | Cél | Használja |
|--------|-----|-----------|
| `@churchapps/helpers` | Alapvető segédeszközök és megosztott TypeScript-interfészek (DateHelper, ApiHelper, CurrencyHelper stb.) | Minden projekt |
| `@churchapps/apihelper` | Express-szerver segédeszközök (hitelesítés, alap vezérlők, adatbázis-elérés, AWS-integrációk) | Minden API |
| `@churchapps/apphelper` | React komponenskönyvtár almodulokkal a bejelentkezéshez, adakozáshoz, űrlapokhoz, markdownhoz és weboldal-építéshez | Minden webalkalmazás |
| `@churchapps/content-providers` | Harmadik féltől származó tartalomszolgáltatók absztrakciós rétege (Lessons.church, Planning Center, Dropbox és mások) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integrációs eszközkészlet: webhookok, REST-kliens, OAuth | Külső integrációs fejlesztők |
| `@churchapps/texting` | SMS-szolgáltatók absztrakciós rétege | Api |

A munkaterület beállításáról és a kiadási folyamatról lásd: [Megosztott könyvtárak](../shared-libraries/index.md).

## Projektek közötti kapcsolatok

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Minden frontend-alkalmazás függ a @churchapps/helpers csomagtól. A webalkalmazások emellett a @churchapps/apphelper csomagoktól is függenek. Minden backend API függ mind a @churchapps/helpers, mind a @churchapps/apihelper csomagtól.

## További lépések

- **[Környezeti változók](./environment-variables.md)** – Állítsa be a `.env` fájlokat az API-khoz való csatlakozáshoz
- **[API helyi beállítása](../api/local-setup.md)** – Állítsa be a backend API-t helyben
