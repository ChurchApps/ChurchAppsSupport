---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Mag-trigger ng isang [Clearstream](https://clearstream.io) text message mula sa kahit na anong B1 event — bagong tao, bagong gift, form submission, calendar update — at ibalik ang mga reply bilang B1 records. Ang Clearstream's Zapier app ay nag-expose ng parehong direksyon, kaya ang buong wiring ay isang recipe at hindi custom code.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Clearstream](https://clearstream.io) account na may hindi bababa sa isang list at isang SMS allowance
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (hal. notipikahan ang finance team) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text sa routing list (hal. prayer request team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tag gamit ang keyword na iyong tinext |

Ang Clearstream's Zapier actions: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Setup

### 1. Mag-mint ng isang B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — kinakailangan para sa B1 upang mag-register ng trigger webhook
- `people:read` — kailangan upang hanapin ang tao mula sa event (`personId` → name/phone/email)
- (Optional) `people:write` kung ang Clearstream replies ay dapat lumikha ng B1 contacts

### 2. Bumuo ng "text on new gift" Zap

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (ang donation's `personId`)
3. **Action** — Clearstream: Send Text to Number. Gamitin ang phone ng tao mula sa hakbang 2 bilang ang recipient, sumulat ng mensahe (`"Thanks for your gift, {first}! …"`).

I-on ang Zap. Ang B1 ay nag-register ng donation webhook sa activation; makikita mo ang `Zapier — donation.created` na lalabas sa **Settings → Developer → Webhooks**.

### 3. (Optional) Ibalik ang mga reply bilang B1 records

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier sa keyword — hal. magpatuloy lamang kung ang text body ay nagsisimula sa `PRAY`
3. **Action** — B1.church: Find Person (sa pamamagitan ng phone)
4. **Action** — Filter / Path — kung hindi makita, lumikha ng mga ito; sa ibang paraan, ilagay ang text body sa isang lugar (Slack, Google Sheet, o isang B1 form submission sa pamamagitan ng Webhooks by Zapier).

## Mga Karaniwang Recipes

### Volunteer team paging

- **Trigger** — B1.church: New Form Submission (filtered sa prayer-request form id)
- **Action** — Clearstream: Send Text to List, kung saan ang list ay ang iyong on-call pastoral team. Sumulat ang katawan bilang `New prayer request: {data.questions.0.answer}`.

### First-time visitor follow-up sequence

- **Trigger** — B1.church: New Person, filtered sa isang B1 person tag ng "First-time visitor"
- **Action** — Clearstream: Add Subscriber to Automated Workflow. I-map ang workflow id sa isang pre-built 7-day text drip.

### Keyword-driven group join

- **Trigger** — Clearstream: New Incoming Text (filter sa keyword `MENS`)
- **Action** — B1.church: Find Person (sa pamamagitan ng phone); fork sa not-found → Create Person
- **Action** — B1.church: Add Group Member sa Men's Ministry group

## Mga Limitasyon at Mga Tala

- **Ang Clearstream ay sinusukat ang SMS ayon sa mensahe.** Bawat Send Text action ay umuusbong ng isa o higit pang credits depende sa haba at bilang ng mga recipient — suriin ang allowance ng iyong plano.
- **Ang phone ay dapat nasa E.164 format** (hal. `+15555550199`) para sa *Send Text to Number*. Ang B1's person record ay nag-store ng anumang naitala; gamitin ang *Formatter by Zapier — Numbers → Format Phone Number* step kung hindi mo maaaasahan ang format.
- **Walang header ay kinakailangan mula sa B1's side** — ang Clearstream's auth ay nabubuhay nang buo sa loob ng iyong Zapier connection.

## Troubleshooting

- **Trigger ay hindi kailanman nag-fire** — `Settings → Developer → Webhooks` ay dapat magpakita ng `Zapier — <event>` row pagkatapos na ang Zap ay naka-on. Kung hindi, ang B1 API key ay nawawalan ng `settings:write`. Muling mag-mint at muling kumonekta.
- **Clearstream ay nagbabalik ng "Invalid phone number"** — ang recipient field ay hindi sa E.164. Magdagdag ng Format Phone Number step.
- **Send Text to List ay nabigo na may `403`** — ang Clearstream API user ay nawawalan ng permission para sa list na iyon, o ang list id ay mali. Ang list ids ay nakikita sa Clearstream list detail page.

## Makita Din

- [Text In Church](./text-in-church) — alternatibong SMS platform, katulad na wiring shape
- [Mobile Message](./mobile-message) — para sa mga churches sa labas ng US
- [Zapier (overview)](../zapier) — B1 side ng bawat Zapier recipe
- [Clearstream API docs](https://api-docs.clearstream.io/) — para sa custom integrations lampas sa Zapier app
