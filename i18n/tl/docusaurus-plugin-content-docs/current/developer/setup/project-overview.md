---
title: "Pangkalahatang-ideya ng Proyekto"
description: "Ilista ang bawat repositoryo ng ChurchApps ayon sa kategorya, kasama ang mga framework, dev port, database, at kung paano nauugnay ang mga shared na @churchapps package, sa mga dokumento ng developer setup."
---

# Pangkalahatang-ideya ng Proyekto

<div class="article-intro">

Ang ChurchApps ay binubuo ng humigit-kumulang 20 independiyenteng repositoryo, na bawat isa ay nakalathala sa ilalim ng [ChurchApps GitHub organization](https://github.com/ChurchApps). Ipinapakita ng pahinang ito ang kumpletong listahan ng lahat ng proyekto ayon sa kategorya, kasama ang kanilang mga framework, port, at ugnayan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang [mga prerequisite](./prerequisites.md) para sa kategorya ng proyektong nais mong pagtrabahuhan

</div>

## Mga Backend API

Ang lahat ng API ay ginawa gamit ang Node.js, Express, at TypeScript, at dine-deploy sa AWS Lambda sa pamamagitan ng Serverless Framework.

| Proyekto | Layunin | Dev Port | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Pangunahing modular monolith na sumasaklaw sa membership, attendance, content, giving, messaging, at doing | 8084 | Hiwalay na MySQL database para sa bawat module (6 sa kabuuan) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend ng Lessons.church | -- | Iisang `lessons` MySQL database |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Tool para sa AI query na pinapagana ng OpenAI | -- | -- |

:::info
Ang pangunahing **Api** na proyekto ay isang modular monolith. Ang bawat module (membership, attendance, content, giving, messaging, doing) ay may sariling database at maa-access sa isang subpath gaya ng `/membership` o `/giving`. Sa production, ang mga ito ay inilalantad bilang hiwalay na Lambda function sa likod ng API Gateway.
:::

## Mga Web App

| Proyekto | Framework | Dev Port | Layunin |
|-----------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dashboard para sa administrasyon ng simbahan |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | App para sa mga miyembro ng simbahan na nakaharap sa publiko |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend ng Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utility para sa pag-import at pag-export ng data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Mga static na brochure website ng simbahan |

## Mga Mobile App

Ang lahat ng mobile app ay gumagamit ng React Native kasama ang Expo.

| Proyekto | Layunin | Mahahalagang Bersyon |
|---------|---------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | App ng check-in kiosk | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Pagpapakita ng aralin sa Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Pag-playback ng content (kasama ang TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile remote control para sa FreeShow | Expo |

## Desktop

| Proyekto | Stack | Layunin |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software para sa presentasyon at pagsamba |

## Mga Shared Library

Ang shared na code ay nilalathala sa npm sa ilalim ng `@churchapps` scope at ginagamit bilang karaniwang npm dependency ng mga proyektong nabanggit sa itaas. Ang lahat ng shared package ay nasa iisang repositoryo -- [Packages](https://github.com/ChurchApps/Packages) -- na pinamamahalaan bilang Yarn workspace at inilalabas gamit ang changesets.

| Package | Layunin | Ginagamit Ng |
|---------|---------|----------|
| `@churchapps/helpers` | Mga pangunahing utility at shared na TypeScript interface (DateHelper, ApiHelper, CurrencyHelper, atbp.) | Lahat ng proyekto |
| `@churchapps/apihelper` | Mga utility para sa Express server (auth, base controller, database access, AWS integration) | Lahat ng API |
| `@churchapps/apphelper` | React component library na may mga subpath module para sa login, donasyon, form, markdown, at pagbuo ng website | Lahat ng web app |
| `@churchapps/content-providers` | Abstraksyon para sa mga third-party content provider (Lessons.church, Planning Center, Dropbox, at iba pa) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Integration toolkit ng B1.church: webhook, REST client, OAuth | Mga external na developer ng integration |
| `@churchapps/texting` | Abstraksyon para sa SMS provider | Api |

Tingnan ang [Shared Libraries](../shared-libraries/index.md) para sa setup ng workspace at workflow ng paglalabas.

## Ugnayan ng Mga Proyekto

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Ang lahat ng frontend app ay umaasa sa `@churchapps/helpers`. Karagdagang umaasa ang mga web app sa mga package ng `@churchapps/apphelper`. Ang lahat ng backend API ay umaasa sa `@churchapps/helpers` at `@churchapps/apihelper`.

## Mga Susunod na Hakbang

- **[Environment Variables](./environment-variables.md)** -- I-configure ang iyong mga `.env` file para kumonekta sa mga API
- **[API Local Setup](../api/local-setup.md)** -- I-set up ang backend API nang lokal
