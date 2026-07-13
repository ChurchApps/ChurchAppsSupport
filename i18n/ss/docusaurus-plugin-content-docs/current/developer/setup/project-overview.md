---
title: "Simo Sonkhe Semaphrojekthi"
---

# Simo Sonkhe Semaphrojekthi

<div class="article-intro">

I-ChurchApps yakheke nga-emaphrojekthi lacishe abe ngu-20 latimele, ngamunye ushicilelwe ngaphansi kwe-[ChurchApps GitHub organization](https://github.com/ChurchApps). Lelikhasi linika luhla lolugcwele lwawo onkhe emaphrojekthi, ahlelwe ngesigaba, kanye netinsimbi (frameworks), ema-port, kanye nebudlelwane bawo.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Faka [tidzingo tekucala](./prerequisites) tesigaba seliphrojekthi lofuna kusebenta kulo

</div>

## Ema-Backend API

Onkhe ema-API akheke nge-Node.js, Express, ne-TypeScript, futsi afakwa ku-AWS Lambda ngendlela ye-Serverless Framework.

| Liphrojekthi | Injongo | I-Dev Port | I-Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | I-modular monolith lesemcatjini lembatako i-membership, attendance, content, giving, messaging, ne-doing | 8084 | I-database ye-MySQL lehlukene kuya nga-module (tisitfupha sonkhe) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | I-backend ye-Lessons.church | -- | I-database yinye ye-MySQL, i-`lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Insimbi yembuto (query tool) lesebentisa i-AI, legcwetjwa yi-OpenAI | -- | -- |

:::info
Liphrojekthi le-core **Api** ngu-modular monolith. Ngamunye we-module (membership, attendance, content, giving, messaging, doing) unayo i-database yakhe futsi iyatfolakala endleleni encane (subpath) njenge-`/membership` kumbe `/giving`. Ku-production, letimodyuli tembulwa njengemisebenti yeLambda lehlukene ngemuva kwe-API Gateway.
:::

## Tinhlelo Te-Web

| Liphrojekthi | Insimbi (Framework) | I-Dev Port | Injongo |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Ideshibhodi yekuphatsa libandla |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Uhlelo lwelibandla lolubukelwa ngemalungu emphakatsi |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | I-frontend ye-Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Insimbi yekungenisa/kukhipha imininingwane |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Lemile (Static) | -- | Ema-website emancane ebandla lamile |

## Tinhlelo Teselula

Tonkhe tinhlelo teselula tisebentisa i-React Native ne-Expo.

| Liphrojekthi | Injongo | Tivasyini Letibalulekile |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Uhlelo lwemalungu ebandla kuma-iOS ne-Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Uhlelo lwe-kiosk yekungena (check-in) | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Kubonisa tifundvo ku-Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Kudlala kwekucuketfwe (content playback) (kuhlanganisa ne-TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Kulawula i-FreeShow ngeselula | Expo |

## Desktop

| Liphrojekthi | Situlo (Stack) | Injongo |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software yekwetfulwa (presentation) nekukhonta |

## Emaraybhulari Lasabelwanako

I-code lesabelwanako ishicilelwa ku-npm ngaphansi kwe-scope ye-`@churchapps` futsi isetjentiswa njengetincumo (dependencies) tejwayelekile te-npm ngemaphrojekthi langetulu. Onkhe emaphakheji lasabelwanako ahlala ku-repository yinye -- [Packages](https://github.com/ChurchApps/Packages) -- lephatfwa njenge-Yarn workspace futsi ikhishwa nge-changesets.

| Liphakheji | Injongo | Isetjentiswa Ngu- |
|---------|---------|---------|
| `@churchapps/helpers` | Tinsimbi tesisekelo kanye netincazelo (interfaces) te-TypeScript letisabelwanako (DateHelper, ApiHelper, CurrencyHelper, njll.) | Onkhe emaphrojekthi |
| `@churchapps/apihelper` | Tinsimbi te-Express server (auth, base controllers, kufinyelela ku-database, kuhlanganiswa ne-AWS) | Onkhe ema-API |
| `@churchapps/apphelper` | Layibrali yeti-component te-React lenema-subpath module ekungena (login), tipho, ema-fomu, i-markdown, nekwakha website | Tonkhe tinhlelo te-web |
| `@churchapps/content-providers` | Kucedvwa kwekuniketa kucuketfwe kwesitsatfu (Lessons.church, Planning Center, Dropbox, nalokunye) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Insimbi yekuhlanganisa ye-B1.church: ema-webhook, i-REST client, i-OAuth | Bantfu labatfutfukisa kuhlanganiswa kwangaphandle |
| `@churchapps/texting` | Kucedvwa kweniketi we-SMS | Api |

Bona [Emaraybhulari Lasabelwanako](../shared-libraries/) kute utfole kuhlelwa kwe-workspace kanye nendlela yekukhishwa (release workflow).

## Bubudlelwane Bemaphrojekthi

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Tonkhe tinhlelo te-frontend titincike ku-`@churchapps/helpers`. Tinhlelo te-web tengeta ngekutincika ku-`@churchapps/apphelper` emaphakheji. Onkhe ema-backend API atincike kubo bobabili `@churchapps/helpers` ne-`@churchapps/apihelper`.

## Tinyatselo Letilandzelako

- **[Emavariyebuli Endzawo](./environment-variables)** -- Hlela emafayela akho e-`.env` kute uxhume ku-ema-API
- **[API Local Setup](../api/local-setup)** -- Hlela i-backend API ngasekhaya
