---
title: "Sakhiwo"
description: "Tinkhathi letinkhulu temasistimu letikhombisa kutsi kunikwa, kuhlola kutfola, tisaziso kanye nemawebhusayithi asebenta kanjani kulo lonkhe i-B1 Admin, i-B1.church, kanye ne-Api ngaphambi kutsi utishintse."
---

# Sakhiwo

<div class="article-intro">

Lamakhasi ngemamephu etinkhathi letinkhulu temasistimu: achaza kutsi sistimu yeChurchApps lebalulekile isebenta kanjani kusukela kuleliphelile kuye kwelinye, kulo lonkhe ema-app, emamodyuli e-API, kanye netilabhulari letitsatselwako, kunekutsi achaze kutsi liphrojekthi lilinye lilungiswa kanjani. Lifundze ngaphambi kutsi ushintse indlela sistimu lesebenta ngayo; futsi lifundze [Setup](../setup/index.md) kuze uvule liphrojekthi, kanye nalo [Sigaba se-API](../api/index.md) kuze utfole tinhlobo temaendpoint.

</div>

## Lisistimu ngekubuka kwekucala

I-ChurchApps ine-~20 yema-repo lazimele (hhayi i-monorepo). Ema-client apps akhuluma nesetfu lesincane lama-API asekelwe ngaku-HTTPS ne-WebSocket, futsi abelane ikhodi ngetinhlelo te-npm letikhishwe ngaphansi kwe-scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Imitfetfo lemibili yakha konkhe lokubhalwe kuleligceke:

1. **Emamodyuli ayahlukaniswa.** Imodyuli ngayinye ye-Api inedatabase yayo netitebulo tayo; emanye emamodyuli nema-app atfola kudatha yayo kuphela ngema-endpoint e-REST. Bheka [Module Structure](../api/module-structure.md).
2. **Ikhodi yekwabelana itfunyelwa njengetinhlelo te-npm.** Ema-app awukaze angenise ikhodi yemunye. Lokuphindvwa kwelinye lichapha emakhasi e-repo ngetulu kwe-`@churchapps/helpers`, `@churchapps/apphelper`, noma `@churchapps/apihelper`. Bheka [Shared Libraries](../shared-libraries/index.md).

## Tinkhathi temasistimu

| Likhasi | Lokuhlanganisa | Lihlanganisa |
|------|----------------|-------|
| [Tisaziso Netikhumbuzo](./notifications.md) | Kutsi kukhona lokutsatsa umuntfu umtjela kantsi: tindlela letimbili tekuphume lemilayeto, kanye nekuhamba kwemakhanali kuya ekhatsimu, kanye nenjini yetikhumbuzo | Api (messaging), B1Admin, B1App |
| [Sakhiwo Sesikhatsi Sangempela](../realtime.md) | Luhlelo lwekuletfwa kwe-WebSocket lolusekela i-chat, kubonakala kwemuntfu lokhona, kanye nekulethwa kwesicelo ngaphakathi kwe-app | Api (messaging), tonkhe ema-web apps |
| [Tisaziso Te-Web Push](../web-push.md) | Likhalo lesiphequluli lelithumela tisaziso: tikhiyi te-VAPID, kugcinwa kwemabhalisi, kulethwa | Api (messaging), tonkhe ema-web apps |
| [Kupha](./giving.md) | Bahlinzeki bekukhokha kanye nemagatsi, tinkambo tekupha, emafundo/emaqoqo, kanye ne-webhooks yemagatsi | Api (giving), apphelper, B1App, B1Admin |
| [Kubhalisa Emicimbi](./registrations.md) | Imodeli yekubhalisa lokukhokhelwako: tinhlobo tabahlanganyeli, tikhetho, makhodi wekuncishiswa, tikhokhelo ngemagatsi ekupheni, kanye nelucwecwe lolulindzele | Api (content + giving), B1App, B1Admin |
| [Ukuchekwa](./check-ins.md) | Ikhiyosk nokuchekwa ngekwakho, imodeli yekutfola, kuhlelwa kwemakamelo, lisendvo lekuvikela bantfwana, kushicilelwa kwemalebula | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Umakhi Wewebhusayithi](./website-builder.md) | Sihlahla sekhasi/sigaba/sakhiwo, sivumelwano sematiko ekuhlanganisa kanye nemarenderer, i-blog, emakhasi lafinyelelwa ngekuvunyelwa, SEO, kanye nekukhiqizwa nge-AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Kuhamba Kwewebhusayithi & Emasayithi Amanyenti](./websites.md) | Indlela kucelo lufika ngayo kubandla nakusayithi lelitsite, imodeli yedatha ye-`siteId` yemasayithi amanyenti, kanye ne-edge ye-Caddy yetidomeyini letikhethekile | B1App, Api (membership + content), B1Admin |
| [Ukuhlanganiswa](./integrations.md) | Indzawo yekunwetsa: OAuth, timkhiyo te-API, ama-webhook, bahlinzeki bekuqukethwa, MCP | Api, tilabhulari letitsatselwako, ema-app langaphandle |
| [Lilogi Yekuhlolwa & Emaqoqo Langahlehliswa](./audit-log.md) | Kuhlolwa lokuvulekile kwenguquko yonkhe esikhungweni se-controller, kanye nelucwecwe lemaqoqo lenta kutsi kungenisa nemisebenti lemikhulu ihlehliseke | Api (tonkhe emamodyuli), B1Admin, B1Transfer |
| [I-MinistryStuff](./ministrystuff.md) | Inkhonzo lekhokhelwako yekugcina kanye nemakhredithi wemilayeto: kubonakala nge-JWT lelabelwanako, service-key ye-S2S, tindlela tebahlinzeki bemilayeto kanye nekugcinwa, kukhokhelwa nge-Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), tiphakheji te-texting/apihelper, B1Admin |
| [Gcina Ngesitoreji Sakho](./byos-storage.md) | Emabandla axhuma i-Google Drive, Dropbox, OneDrive noma i-bucket leshaywa ye-S3 kuze alayishe lukhulu ngaphaya kwe-100MB lemahhala: kuxhuma nge-OAuth, tindlela tekulayisha ngamunye womhlinzeki, kanye nekuphendvulwa kwekulanda lokuvulekile | Api (content + membership), tiphakheji te-helpers/apphelper, B1Admin, B1App |
| [Ikhomoni Yekuqukethwa](./commons.md) | Umphakamo wetimphahla kanye nemasiko ekuthumela lokusekelwe kuqukethwa lokukhiqizwa ngabasebenzisi emikhakheni leminyene, kanye nelucwecwe lolulodwa lekuhlola lolulawulwa ngabasebenti kuphela kuServer Admin ye-B1Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Lapho kushintsha kuchamtsa indlela sistimu lenye yalesi isebenta ngayo, hhayi nje ikhasi lelilodvwa ngaphakathi kwe-app, imephu yalesistimu lefanelekile lapha kufanele ivuselelwe ngesikhatsi sinye nalelo tshintsho. Lokho kugcina lesigaba sithembeka njengendzawo yekucala yabantfu labasha labaphatsene nalokwakhiwa.
:::

## Tinhlongo

Lamadokhumenti achaza umsebenti lohlongotelwe lokuhlolwa, hhayi umtsamo lesetfulo lesikhona.

| Inhlongo | Lokuhlanganisa |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | I-akhawunti lenikwe ibandla, emakhiye, inkhonzo kanye nenombolo yelucingo; kubanga kwemsebenti, kuvuma, kulethwa, kulinganisa, kanye nekuhlolwa kwekukhishwa |
| [Umhlahlandlela wekungenisa ibandla le-Twilio](./twilio-byok-onboarding-draft.md) | Tisetelo letiphakanyisiwe tefomu lekubhalisa le-B1, tibonelo tetikhankaso letichaza ibandla, kanye nemashekhi wekuvuma nekusebenta |
