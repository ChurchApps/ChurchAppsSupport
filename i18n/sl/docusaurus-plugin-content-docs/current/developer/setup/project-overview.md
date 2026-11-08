---
title: "Pregled projekta"
description: "Preglejte vse repozitorije ChurchApps po kategorijah, z ogrodji, razvojnimi vrati, podatkovnimi bazami in načinom povezovanja skupnih paketov @churchapps v razvojni dokumentaciji za nastavitev."
---

# Pregled projekta

<div class="article-intro">

ChurchApps sestavlja približno 20 neodvisnih repozitorijev, od katerih je vsak objavljen v [GitHub organizaciji ChurchApps](https://github.com/ChurchApps). Ta stran ponuja popoln seznam vseh projektov, razvrščenih po kategorijah, skupaj z njihovimi ogrodji, vrati in medsebojnimi povezavami.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite [predpogoje](./prerequisites.md) za kategorijo projektov, na kateri želite delati

</div>

## Zaledni API-ji

Vsi API-ji so zgrajeni z Node.js, Express in TypeScript ter se prek Serverless Framework razmeščajo na AWS Lambda.

| Projekt | Namen | Razvojna vrata | Podatkovna baza |
|---------|-------|----------------|-----------------|
| **[Api](https://github.com/ChurchApps/Api)** | Osrednji modularni monolit, ki pokriva članstvo, obiskovanje, vsebino, darovanje, sporočanje in opravila | 8084 | Ločena baza MySQL za vsak modul (skupaj 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Zaledje za Lessons.church | -- | Ena baza MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Orodje za poizvedbe z umetno inteligenco, ki temelji na OpenAI | -- | -- |

:::info
Osrednji projekt **Api** je modularni monolit. Vsak modul (članstvo, obiskovanje, vsebina, darovanje, sporočanje, opravila) ima svojo podatkovno bazo in je dostopen na podpoti, kot sta `/membership` ali `/giving`. V produkciji so ti izpostavljeni kot ločene funkcije Lambda za API Gateway.
:::

## Spletne aplikacije

| Projekt | Ogrodje | Razvojna vrata | Namen |
|---------|---------|----------------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Nadzorna plošča za upravljanje cerkve |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Javna aplikacija za člane cerkve |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Sprednji del za Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Pripomoček za uvoz in izvoz podatkov |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statično | -- | Statične predstavitvene spletne strani cerkva |

## Mobilne aplikacije

Vse mobilne aplikacije uporabljajo React Native z Expo.

| Projekt | Namen | Ključne različice |
|---------|-------|-------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikacija za prijavo na kiosku | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Prikaz lekcij na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Predvajanje vsebine (vključno z operacijskim sistemom za TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilni daljinski upravljalnik za FreeShow | Expo |

## Namizje

| Projekt | Sklad | Namen |
|---------|-------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Programska oprema za predstavitve in bogoslužje |

## Skupne knjižnice

Skupna koda je objavljena na npm pod imenskim prostorom `@churchapps` in jo zgoraj navedeni projekti uporabljajo kot običajne odvisnosti npm. Vsi skupni paketi so v enem samem repozitoriju – [Packages](https://github.com/ChurchApps/Packages) – upravljani kot delovni prostor Yarn in objavljeni s changesets.

| Paket | Namen | Uporabljajo |
|-------|-------|-------------|
| `@churchapps/helpers` | Osnovni pripomočki in skupni vmesniki TypeScript (DateHelper, ApiHelper, CurrencyHelper itd.) | Vsi projekti |
| `@churchapps/apihelper` | Pripomočki za strežnik Express (overjanje, osnovni krmilniki, dostop do podatkovne baze, integracije z AWS) | Vsi API-ji |
| `@churchapps/apphelper` | Knjižnica komponent React s podmoduli za prijavo, darovanja, obrazce, označevanje in gradnjo spletnih strani | Vse spletne aplikacije |
| `@churchapps/content-providers` | Abstrakcija ponudnikov vsebine tretjih oseb (Lessons.church, Planning Center, Dropbox in drugi) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Orodjarna za integracije B1.church: webhooki, odjemalec REST, OAuth | Zunanji razvijalci integracij |
| `@churchapps/texting` | Abstrakcija ponudnikov SMS | Api |

Za nastavitev delovnega prostora in postopek izdaje glejte [Skupne knjižnice](../shared-libraries/index.md).

## Odnosi med projekti

```
Sprednji deli aplikacij    Skupne knjižnice          Zaledni API-ji
-----------------------    ----------------          --------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Vsi sprednji deli aplikacij so odvisni od `@churchapps/helpers`. Spletne aplikacije so dodatno odvisne od paketov `@churchapps/apphelper`. Vsi zaledni API-ji so odvisni tako od `@churchapps/helpers` kot tudi od `@churchapps/apihelper`.

## Naslednji koraki

- **[Spremenljivke okolja](./environment-variables.md)** -- Nastavite svoje datoteke `.env` za povezavo z API-ji
- **[Lokalna nastavitev API-ja](../api/local-setup.md)** -- Lokalno nastavite zaledni API
