---
title: "Razvijalska dokumentacija"
description: "Poiščite pot po razvijalski dokumentaciji ChurchApps: lokalna namestitev, vodniki za API in spletne aplikacije, skupne knjižnice, gradnje za mobilne naprave in objava za odprtokodne projekte."
---

# Razvijalska dokumentacija

<div class="article-intro">

ChurchApps je zbirka približno 20 odprtokodnih projektov, ki skupaj tvorijo popolno platformo za upravljanje cerkve. Projekti obsegajo zaledne API-je, spletne aplikacije, mobilne aplikacije, namizno aplikacijo in skupne knjižnice – vse so napisane v TypeScriptu. Ta razdelek vsebuje vse, kar potrebujete za nastavitev lokalnega razvojnega okolja in začetek sodelovanja.

</div>

## Arhitektura na prvi pogled

Projekti so **neodvisni repozitoriji** (ne monorepo). Skupna koda je objavljena v npm pod imenskim prostorom `@churchapps/*` in se uporablja kot običajne odvisnosti. To pomeni, da lahko delate na enem projektu, ne da bi klonirali celoten ekosistem.

Ključne značilnosti:

- **Jezik:** TypeScript v celoti
- **Zaledje:** API-ji na Node.js / Express, nameščeni na AWS Lambda prek Serverless Frameworka
- **Splet:** React 19 (Vite in Next.js), Material-UI 7
- **Mobilne naprave:** React Native z Expo
- **Podatkovna baza:** MySQL 8.0, ena podatkovna baza na modul API

## Kaj zajema ta razdelek

- **[Namestitev](./setup/index.md)** – Lokalno razvojno okolje, predpogoji in konfiguracija
  - [Predpogoji](./setup/prerequisites.md) – Zahtevana orodja in programska oprema
  - [Pregled projektov](./setup/project-overview.md) – Vsi projekti na prvi pogled
  - [Spremenljivke okolja](./setup/environment-variables.md) – Konfiguriranje datotek `.env`
- **[API](./api/index.md)** – Lokalna namestitev jedrnega API-ja, inicializacija podatkovne baze in struktura modulov
- **[Spletne aplikacije](./web-apps/index.md)** – Lokalni zagon B1Admin, B1App in LessonsApp
- **[Mobilne aplikacije](./mobile/index.md)** – Gradnja B1Checkin in drugih aplikacij Expo
- **[Skupne knjižnice](./shared-libraries/index.md)** – Delo s Helpers, ApiHelper in AppHelper
- **[Objava](./deployment/index.md)** – Objava API-jev, spletnih in mobilnih aplikacij
- **[Ponudnik vsebin za FreePlay](./freeplay-content-provider.md)** – Povezovanje vaše knjižnice lekcij s FreePlayem

## Skupnost in viri

| Vir | Povezava |
|----------|------|
| Organizacija na GitHubu | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Sledilnik težav | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Skupnost na Slacku | [Pridružite se Slacku](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Najhitrejši način za začetek sodelovanja je, da izberete spletno aplikacijo (na primer B1Admin), jo usmerite na skupne **demo API-je** in začnete delati na spremembah frontenda. Baza podatkov ali nastavitev API-ja nista potrebni.
:::
