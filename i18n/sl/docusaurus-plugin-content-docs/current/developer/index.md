---
title: "Dokumentacija za razvijalce"
description: "Pregled razvijalske dokumentacije ChurchApps: lokalna namestitev, vodniki za API in spletne aplikacije, skupne knjižnice, mobilne aplikacije in namestitev."
---

# Dokumentacija za razvijalce

<div class="article-intro">

ChurchApps je zbirka približno 20 projektov odprtega kode, ki skupaj ponujajo celovito platformo za upravljanje cerkve. Projekti obsegajo zaledne API-je, spletne aplikacije, mobilne aplikacije, namizno aplikacijo in skupne knjižnice -- vse so napisane v TypeScriptu. Ta razdelek vsebuje vse, kar potrebujete za nastavitev lokalnega razvojnega okolja in začetek prispevanja.

</div>

## Pregled arhitekture

Projekti so **neodvisni repozitoriji** (ne monorepo). Skupna koda je objavljena na npm pod imenskim prostorom `@churchapps/*` in se uporablja kot običajne odvisnosti. To pomeni, da lahko delate na posameznem projektu, ne da bi klonirali celoten ekosistem.

Ključne značilnosti:

- **Jezik:** TypeScript po vsem sistemu
- **Zaledje:** API-ji na Node.js / Express, objavljeni na AWS Lambda prek Serverless Frameworka
- **Spletno:** React 19 (Vite in Next.js), Material-UI 7
- **Mobilno:** React Native z Expo
- **Podatkovna baza:** MySQL 8.0, ena podatkovna baza na modul API-ja

## Kaj zajema ta razdelek

- **[Namestitev](./setup/index.md)** -- lokalno razvojno okolje, predpogoji in konfiguracija
  - [Predpogoji](./setup/prerequisites.md) -- zahtevana orodja in programska oprema
  - [Pregled projektov](./setup/project-overview.md) -- vsi projekti na enem mestu
  - [Spremenljivke okolja](./setup/environment-variables.md) -- konfiguriranje datotek `.env`
- **[API](./api/index.md)** -- lokalna namestitev jedrnega API-ja, inicializacija podatkovne baze in struktura modulov
- **[Spletne aplikacije](./web-apps/index.md)** -- zagon B1Admin, B1App in LessonsApp lokalno
- **[Mobilne aplikacije](./mobile/index.md)** -- gradnja B1Mobile in drugih aplikacij Expo
- **[Skupne knjižnice](./shared-libraries/index.md)** -- delo s Helpers, ApiHelper in AppHelper
- **[Objava](./deployment/index.md)** -- objava API-jev, spletnih aplikacij in mobilnih aplikacij
- **[Ponudnik vsebine FreePlay](./freeplay-content-provider.md)** -- povezava vaše knjižnice lekcij s FreePlayjem

## Skupnost in viri

| Vir | Povezava |
|----------|------|
| GitHub organizacija | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sledilnik težav | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Skupnost na Slacku | [Pridruži se Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najhitrejši način za začetek prispevanja je, da izberete spletno aplikacijo (na primer B1Admin), jo usmerite na skupne **demo API-je** in začnete delati na spremembah frontenda. Podatkovna baza ali nastavitev API-ja nista potrebni.
:::
