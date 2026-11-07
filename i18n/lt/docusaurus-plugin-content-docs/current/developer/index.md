---
title: "Kūrėjo dokumentacija"
description: "ChurchApps kūrėjo dokumentacija: vietinė sąranka, API ir žiniatinklio programų vadovai, bendrosios bibliotekos, mobiliųjų programų kūrimas ir diegimas."
---

# Kūrėjo dokumentacija

<div class="article-intro">

ChurchApps – tai apie 20 atvirojo kodo projektų rinkinys, kuris kartu suteikia pilną bažnyčios valdymo platformą. Projektai apima backend API, žiniatinklio programas, mobiliąsias programėles, darbalaukio programą ir bendras bibliotekas – visi parašyti TypeScript kalba. Šiame skyriuje rasite viską, ko reikia norint nustatyti vietinę kūrimo aplinką ir pradėti prisidėti.

</div>

## Architektūra vienu žvilgsniu

Projektai yra **nepriklausomos saugyklos** (ne monorepo). Bendras kodas skelbiamas npm registre pagal `@churchapps/*` sritį ir naudojamas kaip įprastos priklausomybės. Tai reiškia, kad galite dirbti su vienu projektu, nekloniuodami visos ekosistemos.

Pagrindinės savybės:

- **Kalba:** TypeScript visur
- **Backend:** Node.js / Express API, diegiami į AWS Lambda naudojant Serverless Framework
- **Žiniatinklis:** React 19 (Vite ir Next.js), Material-UI 7
- **Mobilieji:** React Native su Expo
- **Duomenų bazė:** MySQL 8.0, po vieną duomenų bazę kiekvienam API moduliui

## Ką apima šis skyrius

- **[Diegimas](./setup/index.md)** -- Vietinė kūrimo aplinka, reikalavimai ir konfigūracija
  - [Reikalavimai](./setup/prerequisites.md) -- Reikalingi įrankiai ir programinė įranga
  - [Projektų apžvalga](./setup/project-overview.md) -- Visi projektai vienoje vietoje
  - [Aplinkos kintamieji](./setup/environment-variables.md) -- `.env` failų konfigūravimas
- **[API](./api/index.md)** -- Pagrindinio API vietinis diegimas, duomenų bazės inicializavimas ir modulių struktūra
- **[Žiniatinklio programos](./web-apps/index.md)** -- B1Admin, B1App ir LessonsApp paleidimas vietoje
- **[Mobilios programos](./mobile/index.md)** -- B1Mobile ir kitų Expo programų kūrimas
- **[Bendros bibliotekos](./shared-libraries/index.md)** -- Darbas su Helpers, ApiHelper ir AppHelper
- **[Diegimas](./deployment/index.md)** -- API, žiniatinklio ir mobiliųjų programų diegimas
- **[FreePlay turinio teikėjas](./freeplay-content-provider.md)** -- Jūsų pamokų bibliotekos integravimas su FreePlay

## Bendruomenė ir ištekliai

| Išteklius | Nuoroda |
|----------|------|
| GitHub organizacija | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Problemų sekimo sistema | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack bendruomenė | [Prisijungti prie Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Greičiausias būdas pradėti prisidėti – pasirinkti žiniatinklio programą (pvz., B1Admin), nukreipti ją į bendrąsias **demonstracines API** ir pradėti keisti priekinę dalį. Duomenų bazės ar API diegti nereikia.
:::
