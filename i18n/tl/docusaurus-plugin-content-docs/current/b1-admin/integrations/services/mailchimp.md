---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

I-pipe ang mga bagong tao, tagabigay, o miyembro ng grupo ng B1 papunta sa isang audience ng Mailchimp para ang susunod na welcome series, year-end appeal, o volunteer newsletter ay kukuha mula sa isang listahang laging updated. Walang built-in na Mailchimp sync ang B1 — ganap na nasa Zapier (o Make) ang koneksyon: pinapaputok ng B1 ang event, kinukuha ng Mailchimp ang subscriber.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may kahit isang audience na gusto mong pagpasukin ng mga tao mula sa B1
- Isang [Zapier](https://zapier.com) account (sapat na ang free tier para sa maliliit na simbahan)
- Isang user ng B1Admin na may permisong **Edit Settings** para makagawa ka ng API key

</div>

## Ano ang Puwede Mong Ikonekta

| Direksyon | B1 trigger | Aksyon sa Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (hal. "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag na naka-scope sa grupong iyon |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Marami pang inilalantad ang bahagi ng Mailchimp (campaigns, segments, automations) — tingnan ang [Zapier triggers ng Mailchimp](https://zapier.com/apps/mailchimp/integrations) para sa kumpletong listahan. Kahit ano na puwedeng i-map mula sa B1 envelope ay puwede.

## Setup

### 1. Gumawa ng B1 API key

Sa B1Admin, pumunta sa **Settings → Developer → API Keys → New API Key**. Bigyan ito ng mga scope na kailangan ng Zap:

- `settings:write` — kailangan para makarehistro ng webhook ang trigger
- `people:read` — para mabasa ng Zap ang unang/huling pangalan, email, atbp.
- (Opsyonal) `people:write` kung planong gumawa rin ng direksyon na Mailchimp → B1

I-save at kopyahin ang string na `cak_…` — ipapakita lang ito nang isang beses.

### 2. Buuin ang Zap

1. **Trigger:** `B1.church — New Person`. Sa unang paggamit, hihilingin ng Zapier na *Sign in to B1.church*; i-paste ang API key.
2. **Action:** `Mailchimp — Add/Update Subscriber`. I-map ang output ng trigger:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Opsyonal) `data.id` → isang merge field ng Mailchimp kung gusto mong panatilihin ang person id ng B1 kasabay nito.
3. I-on ang Zap. Nagrerehistro ang Zapier ng `person.created` webhook sa B1 — i-verify sa **Settings → Developer → Webhooks** na may lumalabas na row na "Zapier — person.created".

Iyon na. Magdagdag ng tao sa B1Admin para kumpirmahin — lalabas ang bagong subscriber sa Mailchimp sa loob ng ilang segundo.

## Mga Karaniwang Recipe

### Awtomatikong i-tag ang mga tagabigay

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (hanapin ayon sa `personId`) para makuha ang email
- **Action** — Mailchimp: Add Subscriber to Tag (tag na `Gave-2026`)

### Magpadala ng welcome series na partikular sa isang grupo

- **Trigger** — B1: New Group Member, naka-filter ayon sa `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag na pinangalanan ayon sa grupo; i-trigger ang iyong umiiral na automation base sa tag na iyon

### Dalawang-direksyon: ang mga bagong sign-up sa Mailchimp ay nagiging contact ng B1

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (i-map ang First/Last/Email)

## Alternatibong Make

Sinasaklaw ng [Mailchimp app](https://www.make.com/en/integrations/mailchimp) ng Make ang 44 module — magkatulad ang koneksyon, kung saan papalitan ng *Watch Events* trigger ng B1 ang sa Zapier. Tingnan ang [Make overview doc](../make) para sa bahagi ng B1.

## Mga Limitasyon at Paalala

- **Ang free tier ng Mailchimp ay may limitasyon sa mga contact at audience** — ang isang Zap na magpapaapaw sa isang free audience nang lampas sa limitasyon nito ay magsisimulang mag-error nang `4xx Member limit reached`. Malinaw itong makikita sa logs ng Mailchimp.
- **Ang Mailchimp ay nag-dededuplicate ayon sa email**, kaya ang muling pagpapatakbo ng Zap sa parehong tao mula sa B1 ay nag-a-update lamang dito; hindi ito gumagawa ng mga duplicate.
- **Ang mga unsubscribe mula sa Mailchimp ay hindi bumabalik sa B1.** Kung gusto mong burahin ng mga unsubscribe sa Mailchimp ang preference na "Send Mail" sa B1, gumawa ng reverse Zap nang tahasan.

## Pag-troubleshoot

- **Hindi kailanman pumuputok ang Zap** — tingnan ang `Settings → Developer → Webhooks` para sa row na `Zapier — person.created`. Kung wala, kulang ang API key ng `settings:write` noong in-on ang Zap. Muling gumawa, muling ikonekta, i-toggle ang Zap nang naka-off at pabalik sa on.
- **Babala na `Member exists` sa Add/Update** — palitan ang action mula sa *Add Subscriber* papuntang *Add/Update Subscriber* (mahalaga ang verb). Idempotent ang upsert na variant.
- **Blangko ang unang pangalan / huling pangalan** — ang `data.name.first` at `data.name.last` ng B1 ay napupunan lamang kung nakatakda ang mga field na iyon sa tao. I-map ang `data.name.display` bilang fallback.

## Tingnan Din

- [Zapier (overview)](../zapier) — bahagi ng B1 sa bawat Zapier recipe
- [Make (overview)](../make) — parehong ideya, visual builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
