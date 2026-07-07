---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

I-pipe ang mga bagong B1 people, givers, o group members sa isang Mailchimp audience upang ang susunod na welcome series, year-end appeal, o volunteer newsletter ay kumukuha mula sa isang listang palaging up to date. Ang B1 ay walang built-in na Mailchimp sync — ang wiring ay nabubuhay nang buo sa Zapier (o Make): ang B1 ay nag-fire ng event, ang Mailchimp ay nauubos ang subscriber.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may hindi bababa sa isang audience na gusto mong itulak ang B1 people
- Isang [Zapier](https://zapier.com) account (ang free tier ay sumasaklaw sa mga small churches)
- Isang B1Admin user na may **Edit Settings** permission upang makapag-mint ng API key

</div>

## Ano ang Maaari Mong I-wire Up

| Direksyon | B1 trigger | Mailchimp action |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (hal. "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag na scoped sa group na iyon |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

Ang Mailchimp side ay nag-expose ng marami pang (campaigns, segments, automations) — tingnan ang [Mailchimp's Zapier triggers](https://zapier.com/apps/mailchimp/integrations) para sa buong listahan. Anumang mappable mula sa B1 envelope ay patas na laro.

## Setup

### 1. Mag-mint ng isang B1 API key

Sa B1Admin pumunta sa **Settings → Developer → API Keys → New API Key**. Bigyan ito ng mga scopes na kailangan ng Zap:

- `settings:write` — kinakailangan para sa trigger upang mag-register ng webhook
- `people:read` — upang ang Zap ay maaaring magbasa ng first/last name, email, atbp.
- (Opsyonal) `people:write` kung plano mo ring isa pang Mailchimp → B1 direksyon

I-save at kopyahin ang `cak_…` string — ipakita lamang minsan.

### 2. Bumuo ng Zap

1. **Trigger:** `B1.church — New Person`. Sa unang paggamit, hinihiling ka ng Zapier na *Sign in to B1.church*; i-paste ang API key.
2. **Action:** `Mailchimp — Add/Update Subscriber`. I-map ang trigger output:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Opsyonal) `data.id` → isang Mailchimp merge field kung gusto mong panatilihin ang B1's person id kasama.
3. I-on ang Zap. Ang Zapier ay nag-register ng `person.created` webhook sa B1 — i-verify sa **Settings → Developer → Webhooks** na isang row na nagngangalang "Zapier — person.created" ay lumalabas.

Yan na. Magdagdag ng tao sa B1Admin upang kumpirmahin — ang bagong subscriber ay lumalabas sa Mailchimp sa loob ng ilang segundo.

## Mga Karaniwang Recipes

### I-tag ang mga givers nang awtomatiko

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (lookup sa pamamagit ng `personId`) upang makuha ang email
- **Action** — Mailchimp: Add Subscriber to Tag (tag `Gave-2026`)

### Ilagay ang group-specific na welcome series

- **Trigger** — B1: New Group Member, filtered sa pamamagit ng `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag na may pangalan ng group; mag-trigger ng iyong kasalukuyang automation sa tag na iyon

### Two-way: ang mga bagong Mailchimp signups ay nagiging B1 contacts

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (i-map ang First/Last/Email)

## Make Alternative

Ang Make's [Mailchimp app](https://www.make.com/en/integrations/mailchimp) ay sumasaklaw sa 44 modules — ang wiring ay pareho, na may B1 *Watch Events* trigger na nagpapalit sa Zapier. Tingnan ang [Make overview doc](../make) para sa B1 side.

## Mga Limitasyon at Mga Tala

- **Ang free tier ng Mailchimp ay nag-cap sa mga contacts at audiences** — isang Zap na nag-flood ng free audience na lumampas sa iyong limitasyon ay magsisimulang mag-error na may `4xx Member limit reached`. Ang Mailchimp's logs ay ginagawang halata ito.
- **Ang Mailchimp ay nag-deduplicate ayon sa email**, kaya ang pag-run ng Zap sa parehong B1 person ay nag-update sa kanila sa lugar; hindi ito lumilikha ng duplicates.
- **Ang unsubscribes mula sa Mailchimp ay hindi bumabalik sa B1.** Kung gusto mong ang Mailchimp unsubscribes ay malinisan ang B1's "Send Mail" preference, bumuo ng reverse Zap nang taos-puso.

## Troubleshooting

- **Zap ay hindi kailanman nag-fire** — suriin ang `Settings → Developer → Webhooks` para sa `Zapier — person.created` row. Kung wala, ang API key ay nawawalan ng `settings:write` kapag nag-on ang Zap. Muling mag-mint, muling kumonekta, i-toggle ang Zap off at on.
- **`Member exists` warning sa Add/Update** — lumipat ang action mula sa *Add Subscriber* hanggang *Add/Update Subscriber* (ang verb ay mahalaga). Ang upsert variant ay idempotent.
- **First name / last name ay dumarating nang walang laman** — ang B1's `data.name.first` at `data.name.last` ay napupuno lamang kung ang mga fields ay nakatakda sa tao. I-map ang `data.name.display` bilang fallback.

## Makita Din

- [Zapier (overview)](../zapier) — ang B1 side ng bawat Zapier recipe
- [Make (overview)](../make) — parehong ideya, visual builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
