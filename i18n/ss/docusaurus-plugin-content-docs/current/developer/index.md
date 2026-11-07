---
title: "Imibhalo Yebatfutfukisi"
description: "Hamba ngalokufanele emakhasini wemaphepha wabentfi be-ChurchApps: kusetfwa lokwendzeni, tincwadzi zeAPI nama-app eweb, tilabhulari letikhona, tindlela tekwakha mobile, nekufakwa kwemaprojekthi."
---

# Imibhalo Yebatfutfukisi

<div class="article-intro">

ChurchApps liyicembu lemaphrojekthi langaba ema-20 la-open-source lahlanganyela kuniketa i-platform lephelele yekuphatsa libandla. Emaphrojekthi lawa afaka ema-backend API, ti-application te-web, ti-app teselula, i-application ye-desktop, kanye netincwadzi letabelwene -- konkhe kubhalwe nge-TypeScript. Lesigaba siniketa konkhe lokudzingekako kute usungule simo sakho sekutfutfukisa sasekhaya bese ucala kufaka sandla.

</div>

## Sakhiwo Ngekubuka Nje

Emaphrojekthi **ayimitfombo lehlukene** (akusiyo i-monorepo). Ikhodi lehlanganyelwako iyashicilelwa ku-npm ngaphansi kwesigaba se-`@churchapps/*` bese isetjentiswa njengetibopho letijwayelekile. Loku kusho kutsi ungasebenta kuphrojekthi linye ngaphandle kwekukopisha simo lonkhe sekusebenta.

Timphawu letibalulekile:

- **Lulwimi:** TypeScript kuko konkhe
- **Backend:** ema-API e-Node.js / Express lafakwa ku-AWS Lambda ngeSakhiwo se-Serverless
- **Web:** React 19 (Vite ne-Next.js), Material-UI 7
- **Selula:** React Native ne-Expo
- **Lidatabase:** MySQL 8.0, lidatabase linye ngamunye we-module ye-API

## Loko Lokumbandzakanywa Sesi Sigaba

- **[Kusungula](./setup/index.md)** -- Simo sekutfutfukisa sasekhaya, tidzingo tekucala, kanye nekuhlelwa
  - [Tidzingo Tekucala](./setup/prerequisites.md) -- Emathulusi kanye ne-software lokudzingekako
  - [Sibuko Semaphrojekthi](./setup/project-overview.md) -- Onkhe emaphrojekthi ngekubuka nje
  - [Tintfo Letishintjashintjako Tesimo](./setup/environment-variables.md) -- Kuhlela emafayela e-`.env`
- **[API](./api/index.md)** -- Kusungula kwesekhaya kwe-API lesisiseko, kucalisa lidatabase, kanye nesakhiwo se-module
- **[Ti-App Te-Web](./web-apps/index.md)** -- Kusebentisa i-B1Admin, i-B1App, ne-LessonsApp ekhaya
- **[Ti-App Teselula](./mobile/index.md)** -- Kwakha i-B1Mobile kanye naletinye ti-app te-Expo
- **[Tincwadzi Letabelwene](./shared-libraries/index.md)** -- Kusebenta ne-Helpers, i-ApiHelper, kanye ne-AppHelper
- **[Kufakwa](./deployment/index.md)** -- Kufaka ema-API, ti-app te-web, kanye neti-app teselula
- **[Umniniyo Wekucuketfwe kwe-FreePlay](./freeplay-content-provider.md)** -- Kuhlanganisa incwadzi yakho yetifundvo ne-FreePlay

## Umphakatsi Kanye Netinsita

| Insita | Sixibelo |
|----------|------|
| Inhlangano ye-GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Silandzeli Setinkinga | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Umphakatsi we-Slack | [Ngena ku-Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Indlela lesheshako yekucala kufaka sandla wukukhetsa i-app ye-web (njenge-B1Admin), uyicondzise kuma-**staging API**, bese ucala kwenta shintjo ku-frontend. Akukho lidatabase nobe kusungulwa kwe-API lokudzingekako.
:::
