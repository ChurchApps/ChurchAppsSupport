---
title: "Apžvalga"
description: "Peržiūrėkite visas ChurchApps saugyklas pagal kategorijas, su karkasais, kūrimo prievadais, duomenų bazėmis ir tuo, kaip bendrieji @churchapps paketai jas sieja, kūrėjo sąrankos dokumentacijoje."
---

# Projekto apžvalga

<div class="article-intro">

ChurchApps sudaro maždaug 20 nepriklausomų saugyklų, kiekviena paskelbta [ChurchApps GitHub organizacijoje](https://github.com/ChurchApps). Šiame puslapyje pateikiamas išsamus visų projektų sąrašas pagal kategorijas, kartu su jų karkasais, prievadais ir ryšiais.

</div>

<div class="prereqs">
<h4>Prieš pradėdami</h4>

- Įdiekite [būtinas sąlygas](./prerequisites.md) projekto kategorijai, su kuria norite dirbti

</div>

## Serverinės dalies API

Visi API sukurti naudojant Node.js, Express ir TypeScript, ir diegiami į AWS Lambda naudojant Serverless Framework.

| Projektas | Paskirtis | Kūrimo prievadas | Duomenų bazė |
|-----------|-----------|------------------|--------------|
| **[Api](https://github.com/ChurchApps/Api)** | Pagrindinis modulinis monolitas, apimantis narystę, lankomumą, turinį, aukas, žinutes ir veiklas | 8084 | Atskira MySQL duomenų bazė kiekvienam moduliui (iš viso 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church serverinė dalis | -- | Viena `lessons` MySQL duomenų bazė |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | DI užklausų įrankis, veikiantis su OpenAI | -- | -- |

:::info
Pagrindinis **Api** projektas yra modulinis monolitas. Kiekvienas modulis (narystė, lankomumas, turinys, aukos, žinutės, veiklos) turi savo duomenų bazę ir pasiekiamas per poliadresą, pavyzdžiui `/membership` arba `/giving`. Gamyboje jie pateikiami kaip atskiros Lambda funkcijos už API Gateway.
:::

## Žiniatinklio programos

| Projektas | Karkasas | Kūrimo prievadas | Paskirtis |
|-----------|----------|------------------|-----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Bažnyčios administravimo valdymo skydelis |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Viešoji bažnyčios narių programa |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church interfeisas |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Duomenų importo ir eksporto įrankis |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statinis | -- | Statinės bažnyčių informacinės svetainės |

## Mobiliosios programos

Visos mobiliosios programos naudoja React Native su Expo.

| Projektas | Paskirtis | Pagrindinės versijos |
|-----------|-----------|----------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Registracijos kioskų programa | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Pamokų rodymas Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Turinio atkūrimas (įskaitant TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobilioji nuotolinio valdymo programa FreeShow | Expo |

## Darbalaukio programos

| Projektas | Technologijos | Paskirtis |
|-----------|---------------|-----------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Pristatymų ir bažnytinių pamaldų programinė įranga |

## Bendrosios bibliotekos

Bendras kodas skelbiamas npm registre pagal `@churchapps` sritį ir yra naudojamas kaip įprastos npm priklausomybės aukščiau išvardytuose projektuose. Visi bendrieji paketai yra vienoje saugykloje – [Packages](https://github.com/ChurchApps/Packages) – kuri valdoma kaip Yarn darbo sritis ir skelbiama naudojant changesets.

| Paketas | Paskirtis | Naudoja |
|---------|-----------|---------|
| `@churchapps/helpers` | Bazinės pagalbinės funkcijos ir bendrosios TypeScript sąsajos (DateHelper, ApiHelper, CurrencyHelper ir kt.) | Visi projektai |
| `@churchapps/apihelper` | Express serverio pagalbinės funkcijos (autentifikacija, bazinės valdiklių klasės, prieiga prie duomenų bazės, AWS integracijos) | Visi API |
| `@churchapps/apphelper` | React komponentų biblioteka su poliniais moduliais prisijungimui, aukoms, formoms, markdown ir svetainių kūrimui | Visos žiniatinklio programos |
| `@churchapps/content-providers` | Trečiųjų šalių turinio teikėjų abstrakcija (Lessons.church, Planning Center, Dropbox ir kiti) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church integracijų įrankių rinkinys: webhook'ai, REST klientas, OAuth | Išorinių integracijų kūrėjai |
| `@churchapps/texting` | SMS teikėjų abstrakcija | Api |

Darbo srities sąranką ir išleidimo eigą žr. [Bendrosios bibliotekos](../shared-libraries/index.md).

## Projektų ryšiai

```
Interfeisų programos       Bendrosios bibliotekos      Serverinės dalies API
--------------------       ----------------------      ---------------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper       LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Visos priekinės programos priklauso nuo `@churchapps/helpers`. Žiniatinklio programos papildomai priklauso nuo `@churchapps/apphelper` paketų. Visos serverinės API priklauso tiek nuo `@churchapps/helpers`, tiek nuo `@churchapps/apihelper`.

## Kiti žingsniai

- **[Aplinkos kintamieji](./environment-variables.md)** -- Sukonfigūruokite `.env` failus, kad prisijungtumėte prie API
- **[API vietinė sąranka](../api/local-setup.md)** -- Vietiniu būdu nustatykite serverinę API
