---
title: "Zapier"
---

# Zapier

<div class="article-intro">

I-app yasemtsetfweni ye-B1.church ku-Zapier ivumela i-Zap kuphendvula kumicimbi yelibandla lakho (umuntfu lomusha, umnikelo lomusha, lilungu lelisha lecembu, …) bese ibhala emarekhodi abuyisele ku-B1. Akukho kubhalwa kwekhodi, akukho sakhiwo lesidzingekile — uyixhuma ku-editor ye-Zapier ye-drag-and-drop, ufake ikhiya ye-API, bese uvula i-Zap.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Zapier](https://zapier.com) (ibanga lelimahhala lianele emaZap lambalwa)
- Umphatsi welibandla lonemvumo ye-**Edit Settings** ku-B1Admin (utakwakha ikhiya ye-API)
- Umbono waloko lofuna kukwenta — sibonelo "nangabe umuntfu wengetwa ku-B1, mengete kuluhlu lwami lwe-Mailchimp"

</div>

## Tento Netinyatselo

| Luhlobo | Yini | Umcimbi we-B1 / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | wengeta umuntfu lomusha |
| **Action** | Add Donation | ubhala umnikelo |
| **Action** | Add Group Member | wengeta umuntfu kucembu |
| **Search** | Find Person | utfola umuntfu ngeligama nome imeyili |

Hlanganisa loku ngekukhululeka nanoma yiluphi lwaletinhlelo letingetulu kwa-7,000+ letisekelwa yi-Zapier.

## Kulungiselela

### 1. Yakha ikhiya ye-B1 API

1. Ku-B1Admin hamba uye ku **Settings → Developer → API Keys**.
2. Chofota **New API Key**, uyinike ligama njenge "Zapier", bese ukhetsa emkhawulo lawadzingako i-Zap.
3. **Kubalulekile:** ema-trigger e-Zapier abhalisa i-webhook esikhundleni sakho nangabe i-Zap icaliswe, lokudzinga umkhawulo we-**`settings:write`**. Njalo hlanganisa `settings:write` nangabe nome ngiliphi lelinye lemaZap akho lisebentisa i-trigger ye-B1.
4. Nika futsi emkhawulo lawadzingako ema-action — sibonelo, i-action ye-"Add Donation" idzinga `donations:write`, "Create Person" idzinga `people:write`.
5. Gcina. Ikhiya lephelele `cak_…` likhonjiswa **kanye kuphela** — uyikhopishe.

### 2. Xhuma i-Zapier ku-B1

1. Ku-Zapier, yakha i-Zap lensha.
2. Nangabe ukhetsa i-trigger nome i-action ye-B1 kwekucala, i-Zapier iyakubuta kutsi **Sign in to B1.church**.
3. Faka ikhiya ye-API kusuka esinyatselweni 1 bese uchofote **Yes, Continue**. I-Zapier iyayihlola imelene nelibandla lakho.

Luxhumano lugcinwa ku-Zapier futsi lusetjentiswa kuwo onkhe emaZap ku-akhawunti yakho.

### 3. Yakha i-Zap

Khetsa i-trigger, bese ungeta sinyatselo lesinye nome letinyenti te-action. Tibonelo ngentasi.

## Tindlela Letivamile

### Ngeta bantfu labasha be-B1 ku-Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. Bhekisa `name__first`, `name__last`, `contactInfo__email` ye-B1 emafildini e-Mailchimp e-First Name / Last Name / Email.

### Tfumela iminikelo kusigceme se-Slack ngeekhadi lenetintfo letinyenti kunaleletsakhelwe ngekhatsi

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Yakha nome nguluphi luhlelo — tinkhinobho, tinamatselo, njalonjalo — lokungakwatiwa yi-[Slack connector](./slack-discord) leyakhelwe ngekhatsi.

### Ngeta emalungu lamasha ecembu ku-Google Group

- **Trigger** — B1: New Group Member (lihlungwe kuya ku-`groupId` lelitsite)
- **Action** — Filter by Zapier: chubeka kuphela nangabe licembu le-B1 lelo lolikhatsalelako
- **Action** — B1: Find Person (sebentisa i-`personId` yetrigger kutfola imeyili)
- **Action** — Google Groups: Add Member

### Dlulisela kutfunyelwa kwemafomu kumshuki wemaphrojekthi

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## Kutsi Ema-Trigger Asebenta Njani Ngasese

Ema-trigger yi-**REST hooks**, hhayi kuhlolwa njalonjalo — i-Zapier ayibiti i-B1 njalo ngemaminithi lali-15. Nangabe uvula i-Zap, i-Zapier icela i-B1 ibhalise i-webhook lekhomba ku-URL yangasese ye-Zapier; nangabe umcimbi wenteka, i-B1 itfumela umthwalo ku-Zapier bese i-Zap yakho isebenta **ngekhatsi kwemasekhondi lambalwa**. Vala i-Zap bese i-Zapier icela i-B1 isule i-webhook — akukho kubhaliswa lokusele.

Loku kusho kutsi i-trigger ivela kuphela kumicimbi leyenteka **ngemuva** kwekuvulwa kwe-Zap. Akukho kubuyela emuva — kuvula i-Zap akubuyeli iminikelo yayizolo.

## Imikhawulo Netinsatiso

- **EmaZap lamanyenti lanetrigger lefanako** ngayinye ibhalisa i-webhook yayo ye-B1 — akukho kungahambisani, kepha kuhle kwati nangabe uhlola **Settings → Developer → Webhooks** futsi uzibuta kutsi kungani kunemigca lelitsatfu lefanako letsi `Zapier — donation.created`.
- **Imininingwane yekuhlola ku-Zap setup** — nangabe wakha i-Zap, i-Zapier icela imininingwane yesibonelo kubhekisa emafildini. Iyakhipha umcimbi longco lofanako losanda kwenteka kusuka ku-B1 nangabe ukhona; nangabe akukho iyasebentisa sibonelo lesakhelwe kusuka encazelweni ye-app.
- **Kwehluleka kwe-action kuvela njengemaphutsa e-Zap** kumlandvo wemisebenti we-Zapier. Imbangela levamile: ikhiya ye-API lengenawo umkhawulo lofanele (sibonelo, i-action ye-"Add Donation" idzinga `donations:write`). Yakhe kabusha ikhiya nge-mkhawulo lofanele bese uxhume kabusha ku-Zapier.
- **Imikhawulo yekubitwa kwe-API lephumako** — konkhe kubitwa kwe-B1 API kusuka ku-action kubalwa kubanga lwakho lwe-Zapier task, hhayi kulutfo kuhlangotsi lwe-B1.

## Kulungisa Tinkinga

- **"Authentication failed"** nangabe uxhuma — ikhiya ye-API ayilungi, isusiwe, nome ishoda ngemkhawulo lowudzingwa yi-Zap. Yakhe kabusha ku-B1Admin nge `settings:write` kanye nemkhawulo wemitfombo lowutsintswa yi-Zap, bese uhlela luxhumano.
- **I-Trigger ayikaze ivele** — cinisekisa kutsi i-webhook ibhalisiwe ngempela: ku-B1Admin, **Settings → Developer → Webhooks** kufanele manje ikhombise umugca lonelibito "Zapier — &lt;event&gt;". Nangabe ungekho, ikhiya ye-API ngalokunengiko beyingenawo `settings:write` ngesikhatsi uvula i-Zap. Lungisa ikhiya, vala-vula i-Zap.
- **I-Trigger ivela kabili** — i-Zapier ngalesinye sikhatsi iyaphindza kuletsa nangabe kucinisekiswa kwayo kulahlekile. Sebentisa sinyatselo se-"Filter by Zapier" ku-ID leyodwana (sibonelo, i-`id` yemuntfu) nangabe udzinga kungabi khona kuphindza lokucinile.

## Bona Nako

- [Make](./make) — indlela lefanako, inkhundla lehlukile
- [Slack & Discord](./slack-discord) — sati senkulumo-mpendvulwano lelula ngaphandle kwe-Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
