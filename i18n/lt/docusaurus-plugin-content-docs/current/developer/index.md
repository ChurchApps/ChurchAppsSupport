---
title: "Programuotojo dokumentacija"
description: "Raskite kelią po ChurchApps programuotojo dokumentaciją: vietinė kūrimo aplinka, API ir žiniatinklio programų vadovai, bendrosios bibliotekos, mobiliųjų programų kūrimas ir atvirojo kodo projektų diegimas."
---

# Programuotojo dokumentacija

<div class="article-intro">

ChurchApps – tai apie 20 atvirojo kodo projektų rinkinys, kuris kartu sudaro visapusišką bažnyčios valdymo platformą. Projektai apima API serverio dalį, žiniatinklio programas, mobiliąsias programas, darbalaukio programą ir bendrąsias bibliotekas – visi parašyti TypeScript kalba. Šiame skyriuje rasite viską, ko reikia norint susikurti vietinę kūrimo aplinką ir pradėti prisidėti prie projektų.

</div>

## Architektūra iš esmės

Projektai yra **nepriklausomos saugyklos** (ne monorepo). Bendras kodas skelbiamas npm registre po `@churchapps/*` vardų erdve ir naudojamas kaip įprastos priklausomybės. Tai reiškia, kad galite dirbti su vienu projektu nekopijuodami visos ekosistemos.

Pagrindinės savybės:

- **Kalba:** TypeScript visur
- **Serverio dalis:** Node.js / Express API, diegiami į AWS Lambda naudojant Serverless Framework
- **Žiniatinklis:** React 19 (Vite ir Next.js), Material-UI 7
- **Mobilieji įrenginiai:** React Native su Expo
- **Duomenų bazė:** MySQL 8.0, po vieną duomenų bazę kiekvienam API moduliui

## Ką apima šis skyrius

- **[Diegimas](./setup/index.md)** -- Vietinė kūrimo aplinka, reikalavimai ir konfigūracija
  - [Reikalavimai](./setup/prerequisites.md) -- Būtini įrankiai ir programinė įranga
  - [Projektų apžvalga](./setup/project-overview.md) -- Visi projektai vienoje vietoje
  - [Aplinkos kintamieji](./setup/environment-variables.md) -- `.env` failų konfigūravimas
- **[API](./api/index.md)** -- Pagrindinio API vietinis diegimas, duomenų bazės inicializavimas ir modulių struktūra
- **[Žiniatinklio programos](./web-apps/index.md)** -- B1Admin, B1App ir LessonsApp paleidimas vietiniame kompiuteryje
- **[Mobiliosios programos](./mobile/index.md)** -- B1Checkin ir kitų Expo programų kūrimas
- **[Bendrosios bibliotekos](./shared-libraries/index.md)** -- Darbas su Helpers, ApiHelper ir AppHelper
- **[Diegimas į serverį](./deployment/index.md)** -- API, žiniatinklio ir mobiliųjų programų diegimas
- **[FreePlay turinio teikėjas](./freeplay-content-provider.md)** -- Savo pamokų bibliotekos integravimas su FreePlay

## Bendruomenė ir ištekliai

| Išteklius | Nuoroda |
|----------|------|
| GitHub organizacija | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Klaidų sekimo sistema | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack bendruomenė | [Prisijungti prie Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Greičiausias būdas pradėti prisidėti – pasirinkti žiniatinklio programą (pavyzdžiui, B1Admin), nukreipti ją į bendrus **demonstracinius API** ir pradėti keisti priekinę dalį. Duomenų bazės ar API diegti nereikia.
:::
