---
title: "Pregled projekta"
---

# Pregled projekta

<div class="article-intro">

ChurchApps sestavlja približno 20 neodvisnih repozitorijev, vsak objavljen pod [ChurchApps GitHub organizacijo](https://github.com/ChurchApps). Ta stran ponuja popoln seznam vseh projektov, razvrščenih po kategorijah, skupaj z njihovimi ogrodji, vrati in odnosi.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite [predpogoje](./prerequisites) za kategorijo projektov, na kateri želite delati

</div>

## Zaledni API-ji

Vsi API-ji so zgrajeni z Node.js, Express in TypeScript ter so preko Serverless Framework nameščeni na AWS Lambda.

| Projekt | Namen | Razvojna vrata | Podatkovna baza |
|---------|-------|----------------|-----------------|
| **[Api](https://github.com/ChurchApps/Api)** | Osrednji modularni monolit, ki pokriva članstvo, udeležbo, vsebino, darovanja, sporočanje in opravila | 8084 | Ločena baza MySQL za vsak modul (skupaj 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Zaledje za Lessons.church | -- | Ena baza MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Orodje za poizvedbe z umetno inteligenco, ki temelji na OpenAI | -- | -- |

:::info
Osrednji projekt **Api** je modularni monolit. Vsak modul (članstvo, udeležba, vsebina, darovanja, sporočanje, opravila) ima svojo bazo podatkov in je dostopen na podpoti, na primer `/membership` ali `/giving`. V produkciji so ti izpostavljeni kot ločene Lambda funkcije za API Gateway.
:::

## Spletne aplikacije

| Projekt | Ogrodje | Razvojna vrata | Namen |
|---------|---------|----------------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Nadzorna plošča za upravljanje cerkve |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Javno dostopna aplikacija za člane cerkve |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Sprednji del Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Pripomoček za uvoz in izvoz podatkov |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statično | -- | Statična predstavitvena spletna mesta za cerkve |

## Mobilne aplikacije

Vse mobilne aplikacije uporabljajo React Native z Expo.

| Projekt | Namen | Ključne različice |
|---------|-------|-------------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplikacija za člane cerkve za iOS in Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikacija za prijavo na kiosku | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Prikaz lekcij na Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Predvajanje vsebine (vključno z operacijskim sistemom TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilni daljinski upravljalnik za FreeShow | Expo |

## Namizje

| Projekt | Sklad | Namen |
|---------|-------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Programska oprema za predstavitve in bogoslužje |

## Skupne knjižnice

Skupna koda je objavljena na npm pod področjem `@churchapps` in jo zgornji projekti uporabljajo kot običajne npm odvisnosti. Vsi skupni paketi so v enem repozitoriju -- [Packages](https://github.com/ChurchApps/Packages) -- ki je upravljan kot Yarn workspace in izdan z changesets.

| Paket | Namen | Uporabljajo |
|-------|-------|-------------|
| `@churchapps/helpers` | Osnovni pripomočki in skupni TypeScript vmesniki (DateHelper, ApiHelper, CurrencyHelper itd.) | Vsi projekti |
| `@churchapps/apihelper` | Pripomočki za Express strežnik (avtentikacija, osnovni kontrolerji, dostop do baze, integracije z AWS) | Vsi API-ji |
| `@churchapps/apphelper` | Knjižnica React komponent s podmoduli za prijavo, darovanja, obrazce, markdown in gradnjo spletnih strani | Vse spletne aplikacije |
| `@churchapps/content-providers` | Abstrakcija ponudnikov vsebine tretjih oseb (Lessons.church, Planning Center, Dropbox in drugi) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Orodjarna za integracije B1.church: webhooki, REST odjemalec, OAuth | Zunanji razvijalci integracij |
| `@churchapps/texting` | Abstrakcija ponudnika SMS | Api |

Glejte [Skupne knjižnice](../shared-libraries/) za nastavitev delovnega prostora in postopek izdaje.

## Odnosi med projekti

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Vse frontend aplikacije so odvisne od `@churchapps/helpers`. Spletne aplikacije so dodatno odvisne od paketov `@churchapps/apphelper`. Vsi zaledni API-ji so odvisni od `@churchapps/helpers` in `@churchapps/apihelper`.

## Naslednji koraki

- **[Spremenljivke okolja](./environment-variables)** -- Nastavite svoje `.env` datoteke za povezavo z API-ji
- **[Lokalna namestitev API-ja](../api/local-setup)** -- Nastavite zaledni API lokalno
