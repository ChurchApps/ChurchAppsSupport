---
title: "Imibhalo Yabathuthukisi"
description: "Thola indlela yakho ku-imibhalo yabathuthukisi ye-ChurchApps: kusetfwa kwendzawo yasekhaya, tihlahlandlela te-API netinhlelo tewebhu, emalabhulalela lokwabelwanako, kwakhiwa kwetinhlelo tafoni, nekulandvwa kwemaphrojekthi avulekile."
---

# Imibhalo Yabathuthukisi

<div class="article-intro">

ChurchApps ngeliqoqo lemaphrojekthi lacishe abe ngu-20 avulekile lahlanganisa sitfombe sekulawula libandla lesiphelele. Lamaphrojekthi ahlanganisa ema-API langemuva, tinhlelo tewebhu, tinhlelo tafoni, sicelo sedeskithophu, nemalabhulalelaalabelwanako -- konkhe kubhalwe nge-TypeScript. Lesigaba sinika konkhe lokudzingekako kutsi usete indzawo yasekhaya yekuthuthukisa futsi uqale kuniketa.

</div>

## Kubukwa Kwesakhiwo Ngekushesha

Emaphrojekthi ngema-repository lamancane ayo (hhayi i-monorepo). Likhodi lelabelwanako lishicilelwa ku-npm ngaphansi kwesikhala se-`@churchapps/*` futsi lisetfwa njengetincike letivamile. Lokusho kutsi ungasebenta kuphrojekthi yinye ngaphandle kwekutsi ukhiphe lonkhe lumndeni wemaphrojekthi.

Timfanelo letibalulekile:

- **Lulwimi:** TypeScript kuyo yonkhe
- **Lubhekene:** Node.js / Express APIs ilandvwa ku-AWS Lambda ngeServerless Framework
- **Webhu:** React 19 (Vite ne-Next.js), Material-UI 7
- **Tinhlelo letihamba:** React Native ne-Expo
- **Sisekelo sedatha:** MySQL 8.0, sisekelo sedatha simbe nye ngemodyuli ngayinye ye-API

## Lesigaba Lesihlanganisa

- **[Kusetfwa](./setup/index.md)** -- Indzawo yasekhaya yekuthuthukisa, tintfo letidzingekako ngaphambili, nekumisa
  - [Tintfo Letidzingekako Ngaphambili](./setup/prerequisites.md) -- Emathulusi nemasofthiwe adzingekako
  - [Kubukwa Kweprojekthi](./setup/project-overview.md) -- Emaphrojekthi wonkhe ngekushesha
  - [Tinguquko Temvelo](./setup/environment-variables.md) -- Kumisa emafayela e-`.env`
- **[API](./api/index.md)** -- Kusetfwa kwe-API yasekhaya lenkhulu, kuqalisa sisekelo sedatha, nesakhiwo semodyuli
- **[Tinhlelo Tewebhu](./web-apps/index.md)** -- Kusebenta i-B1Admin, i-B1App ne-LessonsApp endzaweni yasekhaya
- **[Tinhlelo Tafoni](./mobile/index.md)** -- Kwakha i-B1Checkin netinye tinhlelo te-Expo
- **[Emalabhulalela Alabelwanako](./shared-libraries/index.md)** -- Kusebenta ne-Helpers, ApiHelper, ne-AppHelper
- **[Kufakwa Esevele](./deployment/index.md)** -- Kufaka ema-API, tinhlelo tewebhu, netinhlelo tafoni
- **[Umhlinzeki Wemkhiqizo we-FreePlay](./freeplay-content-provider.md)** -- Kuhlanganisa leliqoqo lakho letifundvo ne-FreePlay

## Umphakatsi Nemitfombo

| Umtfombo | Lixhumanisi |
|----------|-------------|
| Inhlangano ye-GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Lilunga Lemacondzana | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Umphakatsi we-Slack | [Joyina ku-Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Indlela lenhle kakhulu yekuqala kunikela kutsi ukhetse tinhlelo tewebhu (njenge-B1Admin), uyicondzise kuma-**API lakhombisa** lakwabelwanako, bese uqala kwenta tintfo letishintjako ngekuhlolwa kwesitfombe lesibonakalako. Akudzingeki sisekelo sedatha noma kusetfwa kwe-API.
:::
