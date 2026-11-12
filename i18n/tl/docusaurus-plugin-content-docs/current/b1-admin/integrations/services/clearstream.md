---
title: "Clearstream"
description: "Ikonekta ang Clearstream SMS sa B1 Admin sa pamamagitan ng Zapier: magpadala ng text sa mga bagong regalo o form submission, at ibalik bilang mga tao ang mga papasok na sagot."
---

# Clearstream

<div class="article-intro">

Mag-trigger ng text message ng [Clearstream](https://clearstream.io) mula sa alinmang event ng B1 — bagong tao, bagong regalo, form submission, pagbabago sa kalendaryo — at ibalik ang mga sagot bilang mga record ng B1. Sakop ng Zapier app ng Clearstream ang parehong direksyon, kaya ang buong pagkakabit ay recipe at hindi custom code.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Clearstream](https://clearstream.io) account na may kahit isang list at SMS allowance
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

| Direksyon | Trigger | Aksyon |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (hal. ipaalam sa finance team) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (hal. prayer request team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; i-tag ng keyword na ipinadala nila sa text |

Mga aksyon ng Clearstream sa Zapier: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — kailangan para ikonekta ang key sa Zapier at para marehistro ng B1 ang webhook ng trigger
- `people:read` — kailangan para hanapin ang tao mula sa event (`personId` → pangalan/telepono/email)
- (Opsyonal) `people:write` kung dapat gumawa ng B1 contact ang mga sagot sa Clearstream

### 2. Buuin ang Zap na "mag-text sa bagong regalo" {#2-build-the-text-on-new-gift-zap}

1. **Trigger** — B1.church: New Donation
2. **Aksyon** — B1.church: Find Person (ang `personId` ng donasyon)
3. **Aksyon** — Clearstream: Send Text to Number. Gamitin ang telepono ng tao mula sa hakbang 2 bilang tatanggap, buuin ang mensahe (`"Thanks for your gift, {first}! …"`).

I-on ang Zap. Nagrerehistro ang B1 ng webhook ng donasyon kapag na-activate; makikita mo ang `Zapier — donation.created` sa **Settings → Developer → Webhooks**.

### 3. (Opsyonal) Ibalik ang mga sagot bilang mga record ng B1 {#3-optional-pull-replies-back-as-b1-records}

1. **Trigger** — Clearstream: New Incoming Text
2. **Aksyon** — Filter sa Zapier ayon sa keyword — hal. magpatuloy lang kung ang laman ng text ay nagsisimula sa `PRAY`
3. **Aksyon** — ilagay ang laman ng text sa lugar na makikita ng iyong team (Slack, Google Sheet, o task sa B1). Naghahanap ang *Find Person* ng B1 ng tao ayon sa id, email, o pangalan lang, hindi ayon sa telepono, kaya itugma nang manwal ang sagot sa isang tao sa B1 (o magdagdag ng Webhooks by Zapier GET sa endpoint ng B1 na `/membership/people/search/phone?number=…`).

## Karaniwang Recipe {#common-recipes}

### Pag-page sa volunteer team {#volunteer-team-paging}

- **Trigger** — B1.church: New Form Submission (sinala ayon sa id ng prayer-request form)
- **Aksyon** — Clearstream: Send Text to List, kung saan ang list ay ang iyong on-call na pastoral team. Buuin ang laman bilang `New prayer request: {data.questions.0.answer}`.

### Pagsunod sa unang beses na bisita {#first-time-visitor-follow-up-sequence}

- **Trigger** — B1.church: New Person, sinala ayon sa membership status ng tao (halimbawa, *Visitor*)
- **Aksyon** — Clearstream: Add Subscriber to Automated Workflow. I-map ang workflow id sa isang nakahandang 7-araw na text drip.

### Pagsali sa grupo sa pamamagitan ng keyword {#keyword-driven-group-join}

- **Trigger** — Clearstream: New Incoming Text (i-filter sa keyword na `MENS`)
- **Aksyon** — B1.church: Create Person mula sa pangalan at telepono ng nag-text (hindi makakahanap ng tao ang *Find Person* ng B1 ayon sa telepono, kaya tingnan ang mga duplicate sa **People** pagkatapos)
- **Aksyon** — B1.church: Add Group Member sa Men's Ministry group

## Mga Limitasyon at Paalala {#limits--notes}

- **Sinusukat ng Clearstream ang SMS kada mensahe.** Bawat Send Text action ay kumokonsumo ng isa o higit pang credit depende sa haba at bilang ng tatanggap — suriin ang allowance ng iyong plan.
- **Dapat nasa E.164 format ang telepono** (hal. `+15555550199`) para sa *Send Text to Number*. Anuman ang inilagay ang iniimbak ng record ng tao sa B1; gamitin ang hakbang na *Formatter by Zapier — Numbers → Format Phone Number* kung hindi mo matitiyak ang format.
- **Walang header na kailangan mula sa panig ng B1** — nasa loob ng Zapier connection ng Clearstream nang buo ang auth nito.

## Troubleshooting {#troubleshooting}

- **Hindi nag-fire ang trigger** — dapat magpakita ang `Settings → Developer → Webhooks` ng hilerang `Zapier — <event>` pagkatapos i-on ang Zap. Kung wala, kulang sa `settings:write` ang B1 API key. Gumawa muli ng key at muling ikonekta.
- **Nagbabalik ang Clearstream ng "Invalid phone number"** — hindi nasa E.164 ang field ng tatanggap. Magdagdag ng hakbang na Format Phone Number.
- **Pumapalya ang Send Text to List na may `403`** — walang pahintulot ang Clearstream API user sa list na iyon, o mali ang list id. Nakikita ang mga list id sa pahina ng detalye ng list sa Clearstream.

## Tingnan Din {#see-also}

- [Text In Church](./text-in-church.md) — alternatibong SMS platform, katulad na pagkakabit
- [Mobile Message](./mobile-message.md) — para sa mga simbahang nasa labas ng US
- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Clearstream API docs](https://api-docs.clearstream.io/) — para sa custom integration na lampas sa Zapier app
