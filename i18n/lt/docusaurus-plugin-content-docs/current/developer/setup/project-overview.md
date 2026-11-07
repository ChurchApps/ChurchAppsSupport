---
title: "Projekto apžvalga"
description: "ChurchApps saugyklų apžvalga pagal kategorijas: karkasai, kūrimo prievadai, duomenų bazės ir kaip bendri @churchapps paketai jas susieja."
---

# Projekto apžvalga

<div class="article-intro">

ChurchApps sudaro maždaug 20 nepriklausomų saugyklų, kiekviena paskelbta [ChurchApps GitHub organizacijoje](https://github.com/ChurchApps). Šiame puslapyje pateikiamas visų projektų sąrašas, suskirstytas pagal kategorijas, su jų karkasais, prievadais ir ryšiais.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite [būtinąsias sąlygas](./prerequisites.md) projekto kategorijai, su kuria norite dirbti

</div>

## Backend API

Visi API sukurti naudojant Node.js, Express ir TypeScript ir diegiami į AWS Lambda naudojant Serverless Framework.

| Projektas | Paskirtis | Kūrimo prievadas | Duomenų bazė |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Pagrindinis modulinis monolitas, apimantis narystę, lankomumą, turinį, aukas, žinutes ir veiklas | 8084 | Atskira MySQL duomenų bazė kiekvienam moduliui (iš viso 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church backend | -- | Viena `lessons` MySQL duomenų bazė |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | DI užklausų įrankis, veikiantis su OpenAI | -- | -- |

:::info
Pagrindinis **Api** projektas yra modulinis monolitas. Kiekvienas modulis (narystė, lankomumas, turinys, aukos, žinutės, veiklos) turi savo duomenų bazę ir pasiekiamas pagal poaplankį, pavyzdžiui `/membership` arba `/giving`. Gamyboje jie veikia kaip atskiros Lambda funkcijos už API Gateway.
:::

## Žiniatinklio programos

| Projektas | Karkasas | Kūrimo prievadas | Paskirtis |
|-----------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Bažnyčios administravimo skydelis |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Viešoji bažnyčios narių programa |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Duomenų importavimo ir eksportavimo įrankis |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statinės | -- | Statinės bažnyčių brošiūrų svetainės |

## Mobiliosios programos

Visos mobiliosios programos naudoja React Native su Expo.

| Projektas | Paskirtis | Pagrindinės versijos |
|---------|-----------|----------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Bažnyčios narių programa iOS ir Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Registracijos kioskų programa | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Pamokų rodymas Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Turinio atkūrimas (įskaitant TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilusis nuotolinis valdymas FreeShow | Expo |

## Darbalaukis

| Projektas | Technologijų rinkinys | Paskirtis |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Pristatymų ir pamaldų programinė įranga |

## Bendrosios bibliotekos

Bendras kodas skelbiamas npm registre `@churchapps` srityje ir yra naudojamas kaip įprastos npm priklausomybės aukščiau išvardytuose projektuose. Visi bendrieji paketai yra vienoje saugykloje – [Packages](https://github.com/ChurchApps/Packages) – valdomoje kaip Yarn darbo sritis ir leidžiamoje su changesets.

| Paketas | Paskirtis | Naudoja |
|---------|-----------|---------|
| `@churchapps/helpers` | Pagrindiniai įrankiai ir bendros TypeScript sąsajos (DateHelper, ApiHelper, CurrencyHelper ir kt.) | Visi projektai |
| `@churchapps/apihelper` | Express serverio įrankiai (autentifikavimas, pagrindiniai valdikliai, prieiga prie duomenų bazės, AWS integracijos) | Visi API |
| `@churchapps/apphelper` | React komponentų biblioteka su poaplankių moduliais prisijungimui, aukoms, formoms, markdown ir svetainių kūrimui | Visos žiniatinklio programos |
| `@churchapps/content-providers` | Trečiųjų šalių turinio tiekėjų abstrakcija (Lessons.church, Planning Center, Dropbox ir kiti) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integracijų įrankinė: webhook, REST klientas, OAuth | Išorinių integracijų kūrėjai |
| `@churchapps/texting` | SMS tiekėjų abstrakcija | Api |

Darbo srities sąranką ir leidimo eigą žr. [Bendrosios bibliotekos](../shared-libraries/index.md).

## Projektų ryšiai

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Visos frontend programos priklauso nuo `@churchapps/helpers`. Žiniatinklio programos papildomai priklauso nuo `@churchapps/apphelper` paketų. Visi backend API priklauso nuo `@churchapps/helpers` ir `@churchapps/apihelper`.

## Kiti žingsniai

- **[Aplinkos kintamieji](./environment-variables.md)** -- Sukonfigūruokite `.env` failus, kad prisijungtumėte prie API
- **[API vietinė sąranka](../api/local-setup.md)** -- Nustatykite backend API vietiniame kompiuteryje
