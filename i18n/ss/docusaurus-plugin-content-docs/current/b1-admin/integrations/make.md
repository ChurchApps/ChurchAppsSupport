---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (lebekutiwa yi-Integromat) yinkhundla yekwenta ngco umsebenti lobonakalako — efana ngelidloti ne-Zapier, kepha inelogic lenetintsandvo letinyenti kanye netindleko letishibhile nangabe kukhula. I-app yasemtsetfweni ye-B1.church ye-Make ikuvumela kwakha "ema-scenario" laphendvula ngekushesha kumicimbi ye-B1 futsi abhale emarekhodi abuyisele ku-B1.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Make](https://www.make.com) (ibanga lelimahhala lihlanganisa imisebenti lemincane)
- Umphatsi welibandla lonemvumo ye-**Edit Settings** ku-B1Admin
- Umbono lomncane wesento lofuna kusakha

</div>

## Ema-Module

| Luhlobo | Yini | Umcimbi we-B1 / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | nome ngumuphi umcimbi we-B1 lobhalisiwe (`person.created`, `donation.created`, …) |
| **Action** | Create Person | wengeta umuntfu lomusha |
| **Action** | Add Donation | ubhala umnikelo |
| **Action** | Add Group Member | wengeta umuntfu kucembu |
| **Search** | Search People | utfola bantfu ngeligama nome imeyili |

I-instant trigger ikuvumela kukhetsa umcimbi lofuna kuwulalela — i-module yentrigger yinye nge-scenario ngayinye, lehlelwe ngemcimbi.

## Kulungiselela

### 1. Yakha ikhiya ye-B1 API

1. Ku-B1Admin hamba uye ku **Settings → Developer → API Keys**.
2. Chofota **New API Key**, uyicalise ngekutsi "Make", bese unika emkhawulo lowadzingako.
3. **Hlanganisa `settings:write`** nangabe nome ngusiphi sesento sakho sisebentisa i-instant trigger — i-Make ibhalisa i-webhook esikhundleni sakho nangabe scenario icaliswe.
4. Nika futsi emkhawulo lawadzingako ema-module we-action (sibonelo `donations:write` ye-module ye-Add Donation).
5. Gcina bese ukhopisha ikhiya `cak_…`.

### 2. Faka luxhumano

1. Ku-Make, yakha scenario lensha bese udonsela i-module ye-trigger ye-**B1.church** ku-canvas.
2. Nangabe kubuteka, **Create a connection**. Faka ikhiya ye-API endzaweni ye-*API Key* bese ushiya i-*API Base URL* njenge `https://api.churchapps.org` (ngaphandle kwekutsi uhlola nge-staging).
3. Chofota **Save** — i-Make ihlola ikhiya ngekufunda iphrofayela yelibandla lakho.

Luxhumano lugcinwa ku-akhawunti yakho ye-Make futsi lusetjentiswa kuwo onkhe ema-scenario.

### 3. Hlela i-trigger

1. Vula titfo te-module ye-**Watch Events**.
2. Khetsa umcimbi lowufunako — sibonelo `donation.created`.
3. Gcina. I-Make yakha i-URL ye-webhook leyingcile bese uyigcina ngekhatsi.

### 4. Ngeta ema-module langentasi

Donsela nome ngayiphi yalamakhulu ema-module e-app e-Make etulu kwe-canvas — Mailchimp, Google Sheets, Slack, HubSpot, indzawo yakho ye-HTTP, njalonjalo. Bhekisa lokuphuma kwe-trigger (`event`, `churchId`, `data.id`, `data.amount`, …) emafildini awo elokungena. Ema-module e-Make wekwendlala / iterator / router / aggregator akuvumela kwakha imigudvu lehlukanako neyahambisana leyayoba lukhuni ku-Zapier.

### 5. Vula scenario

Vula-vala **Active** kuhloko yescenario. I-Make ibita i-`POST /membership/webhooks` ye-B1 kubhalisa i-URL. Kusukela ngaleso sikhatsi, wonkhe umcimbi we-B1 lofanako ugeleta ku-scenario ngesikhatsi lesingiso.

Kuvala scenario kubita i-`DELETE /membership/webhooks/{id}` kuze kungabi khona kubhaliswa lokusele ngekungadzingekile.

## Tindlela Letivamile

### Kusinkronisa iminikelo kusipredishithi se-Google kuze kuhlolwe tetimali

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row. Bhekisa `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` emakholomini eshidi.

### Sati se-Slack lesibekwe simo ngenani leminikelo

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Luhlangotsi A — Filter: `data.amount >= 1000` → Slack: tfumela ku `#major-gifts`
  - Luhlangotsi B — lokwehlako — Slack: tfumela ku `#donations`

### Umuntfu lomusha → CRM + imeyili yekwemukela + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: Yatisa `#new-people` (ngekufanako — sebentisa i-router ye-Make)

## Kutsi I-Instant Trigger Isebenta Njani

I-instant trigger isekelwe yi-webhook, hhayi kuhlolwa njalonjalo — nangabe icaliswe, i-Make ibita i-`POST /membership/webhooks` nge-URL layakhile kanye nemcimbi lowuyikhetsile. Nangabe umcimbi wenteka ku-B1, i-B1 iyatfumela umthwalo ku-URL ye-Make bese scenario yakho isebenta ngekhatsi kwemasekhondi lambalwa. Kuyivala i-scenario kususa i-webhook.

I-trigger ivele kuphela kumicimbi leyenteka **ngesikhatsi scenario isasebenta**. Akukho kubuyela emuva.

## Imikhawulo Netinsatiso

- **Umcimbi munye nge-module ye-Watch Events.** Kuze ulalele imicimbi lemanyenti ku-scenario yinye, donsela ema-module etrigger lamanyenti kuma-scenario lahlukene (nome usebentise i-module yinye lenaluhlu lwemicimbi lohlanganisiwe — bona ngentasi).
- **Kuhlolwa kwesignature akukhonjiswa** — i-Make ayidluliseli i-`X-B1-Signature` ku-scenario; umkhawulo wekuciniseka yi-URL ye-webhook ye-scenario ngayinye lengesabekiko ye-Make. Loku kujwayelekile ku-Make. Nangabe udzinga kuhlolwa kwesignature ngco, wakha kuhlanganiswa kwakho ngco nge-[SDK](/docs/developer/api/webhooks#sdk-support) esikhundleni.
- **Inani letento** — konkhe kubitwa kwe-API kusuka ku-module ye-action kubalwa kubanga lakho lwe-Make operations, hhayi kulutfo kuhlangotsi lwe-B1.

## Kulungisa Tinkinga

- **Kuhlola luxhumano kuyehluleka** — imvamisa kuba yiphutsa ekubhaleni ikhiya ye-API. Yikhopishe kabusha kusuka ku-B1Admin (ikhiya lephelele likhonjiswa kanye kuphela; nangabe ulahlekelwe yiyo, yakha ikhiya lensha).
- **I-Module yetrigger ayicaliswa** — hlola **Settings → Developer → Webhooks** ku-B1Admin. Nangabe ungaboni umugca lotsi "Make — &lt;event&gt;" ngemuva kwekucalisa scenario, ikhiya alina `settings:write`. Hlela ikhiya bese ucalisa kabusha.
- **I-action ibuyisa `403 Forbidden`** — ikhiya ye-API ayinawo umkhawulo waleyo endpoint. Sibonelo, i-Add Donation idzinga `donations:write`. Hlela ikhiya ku-B1Admin bese uhlola kabusha.

## Kushintja i-App

I-app ye-B1.church ye-Make ivulekile emtfombeni — imininingwane ye-JSON ihlala ku-repo ye `B1Integrations/Make/`. Nangabe udzinga i-module lengekho (sibonelo, i-action lensha ye-endpoint lesingakayihlanganisi), vula issue nome PR lapho.

## Bona Nako

- [Zapier](./zapier) — indlela lefanako nge-UI lelula kanye neluhlu lwetinhlelo lolukhulu
- [Slack & Discord](./slack-discord) — sati senkulumo-mpendvulwano lesakhelwe ngekhatsi ngaphandle kwe-Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
