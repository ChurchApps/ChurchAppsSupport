---
title: "Sakhiwo"
---

# Sakhiwo

<div class="article-intro">

Lamakhasi ayimephu yeluhlelo lendlula ema-repository lamanyenti: achaza indlela luhlelo lolusemcoka lwe-ChurchApps lusebenta ngayo kusukela ekucaleni kuze kuyewufika ekugcineni — kuwo onkhe ema-app, ema-module e-API, kanye netincwadzi letabelwana ngato — kunekutsi achaze indlela lolunye luhlungu lulungiselelwa ngayo. Fundza lamakhasi ngembi kwekushintja kutiphatsa kweluhlelo; fundza [Kulungiselela](../setup/) kute utfole luhlungu luchubeka nekusebenta kanye [nengxenye ye-API](../api/) kutfola imininingwane leyengcile yema-endpoint.

</div>

## Luhlelo lonkhe ngekubuka kokukhulu

ChurchApps yinhlanganisela yema-repository lacishe abe ngu-20 latiphetse (akusiwo i-monorepo). Ema-app etisebenti akhuluma nelicembu lelincane lwema-backend API ngeHTTPS ne-WebSocket, futsi abelane ngekhodi ngema-package e-npm laphumelela ngaphasi kwesikhala se-`@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Imitsetfo lemibili yesakhiwo ibumba konkhe lokubhaliwe kulesigaba:

1. **Ema-module ahlukene ngakodvwana.** Nguleyo naleyo module ye-Api inematimba wayo we-database kanye netindzawo tayo; letinye tema-module nema-app afinyelela kuloludzaba kuphela ngendlela yema-endpoint e-REST awo. Bona [Sakhiwo se-Module](../api/module-structure).
2. **Ikhodi lebelwanako ihanjiswa njengema-package e-npm.** Ema-app akangeni ekhodini lawelinye; nome ngabe yini lesetjentiswa kabili idlula emkhawulweni wema-repository nga`@churchapps/helpers`, `@churchapps/apphelper`, nome `@churchapps/apihelper`. Bona [Tincwadzi Letabelwanako](../shared-libraries/).

## Timephu teluhlelo

| Likhasi | Loku lakumbombayo | Lokusakateka kuko |
|------|----------------|-------|
| [Tatiso Netikhumbuto](./notifications) | Indlela nome ngabe yini letjela umuntfu ngalokutsite: iminyango lemibili yekutfumela, luketjani lwekwenyusa kumakenali, kanye nesento sesikhumbuto | Api (messaging), B1Admin, B1App |
| [Sakhiwo Se-Realtime](../realtime) | Luhlelo lwekuhambisa lolusetjentiswa yi-WebSocket lolusemuva kwengxoxo, kubonakala kutsi umuntfu ukhona, kanye nekuhanjiswa kwelwati ngekhatsi kwe-app | Api (messaging), onkhe ema-web app |
| [Ticelo Te-Push Kuwebhu](../web-push) | Umakenali we-push webhusayithi: emakhiya e-VAPID, kubekwa kwekubhalisela, kuhanjiswa | Api (messaging), onkhe ema-web app |
| [Kuniketa](./giving) | Bahlinzeki bekukhokha nema-gateway, tinhlelo tekunikela, tinhlobo/emabhentji, ne-webhook tema-gateway | Api (giving), apphelper, B1App, B1Admin |
| [Kubhalisa Kwemicimbi](./registrations) | Simo semabhizinisi wekubhalisa: tinhlobo tebantfu labatakuya, kukhetfwa, emakhodi ekwehlisa intengo, kukhokha ngendlela ye-gateway yekuniketa, kanye nelulu lwekulinda | Api (content + giving), B1App, B1Admin |
| [Kungena/Kuphuma](./check-ins) | Kungena ngekutimela ne-kiosk, imodeli yelwati lekuya, kucondzisa emakamelo, luhlu lwekuvikela bantfwana, kucindzetela ema-label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Sakhi Sewebhusayithi](./website-builder) | Sihlahla samakhasi/tigaba/tincenye, sivumelwano setinhlobo tencenye kanye netisebenti letitibonakalisako, ibhulogi, emakhasi lavikelekile, i-SEO, kanye nekwakha nge-AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Kucondzisa Kwewebhusayithi Ne-Multi-Site](./websites) | Indlela sicelo lesifika kubandla nesayithi lelitsite kucondziswa ngayo, imodeli yelwati ye-multi-site `siteId`, kanye ne-Caddy edge yendzawo letitsite | B1App, Api (membership + content), B1Admin |
| [Kuhlanganiswa](./integrations) | Indzawo yekwenaba: OAuth, emakhiya e-API, ema-webhook, bahlinzeki belwati, ne-MCP | Api, tincwadzi letabelwanako, ema-app langaphandle |
| [Luhlu Lwekuhlolwa Netibatje Letingasakateki](./audit-log) | Kuhlola lokusukela ekucaleni kwaso sonkhe sichinto lesishintjako endzaweni yekulawula kwe-controller, kanye nendzawo yesibatje leyenta ekungeniseni nemitsetfo leminyenti kubuye kwentiwe emuva | Api (onkhe ema-module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Insita lekhokhelwako yekugcina lwati ne-credit yema-message: buchwepheshe bekutivela nge-JWT lebelwanako, i-service-key S2S, tindzawo tekuhlinzekwa kwema-message nekugcina, kukhokha nge-Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), tincwadzi te-texting/apihelper, B1Admin |

:::tip
Nangabe kunenshintjo lokushintja indlela lolunye lwaletinhlelo lusebenta ngayo — hhayi nje likhasi elilodvwa ngekhatsi kwelinye i-app — imephu lefanako yeluhlelo lapha kufanele ibuyekezwe kulomsebenti lawufananako. Loko kugcina lesigaba sitsembekile njengesikhundla sekucala sebafaki mtimba labasha.
:::
