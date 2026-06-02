---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Kung ang iyong church ay kumukuha ng mga donation sa pamamagitan ng Donorbox ngunit sinusubaybayan ang mga tao at mga statement sa B1, maaari mong ipahintulot ang Donorbox's instant Zapier triggers na lumikha ng tugmaang donation records sa loob ng B1 — at lumikha ng ang donor bilang isang B1 person kung wala pang akma. Walang manual reconciliation, walang monthly export.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Donorbox](https://donorbox.org) account na may hindi bababa sa isang campaign
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

| Direction | Donorbox trigger | B1 action |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurring) | Find Person → Add Donation (gamitin ang Plan id bilang note) |

Ang Donorbox ay nag-publish ng iyong mga trigger bilang **instant** — sila ay nag-fire sa loob ng ilang segundo ng isang tunay na donation. Walang polling delay.

## Setup

### 1. Mag-mint ng isang B1 API key

Sa B1Admin: **Settings → Developer → API Keys → New API Key**. Mga scopes:

- `people:read` — upang hanapin ang donor ayon sa email
- `people:write` — upang lumikha ng mga ito kung sila ay bago
- `donations:write` — upang mag-record ng gift

Ang mga trigger sa direksyong ito ay mga Donorbox, hindi B1, kaya hindi mo kailangan ang `settings:write` dito.

### 2. Bumuo ng "record a donation" Zap

1. **Trigger** — Donorbox: New Donation. Kumonekta gamit ang Donorbox's API key (sa Donorbox: *Account → Profile → API Settings*).
2. **Action** — B1.church: Find Person. I-map ang email ng donor mula sa trigger sa *Email* search field.
3. **Action** — Filter by Zapier (optional): magpatuloy lamang kung ang donor ay hindi makita, pagkatapos…
4. **Action** — B1.church: Create Person. I-map ang first/last/email upang ang donor ay lumanding bilang isang member, hindi lamang isang gift record.
5. **Action** — B1.church: Add Donation. I-map:
   - Amount → `data.amount`
   - Donation Date → trigger's donation date
   - Fund → piliin ang B1 fund na sumasalamin sa Donorbox campaign (Ang Zapier ay nagbibigay-daan sa iyo na magswitch ng funds batay sa isang filter o formatter step)
   - Method → "Online"
   - Notes → Donorbox transaction id (maginhawang kapag nag-reconcile)

I-on ang Zap. Ang susunod na live donation sa pamamagitan ng Donorbox ay lumalopad sa **B1Admin → Donations** nang awtomatiko.

## Mga Karaniwang Recipes

### Isang Zap bawat fund

Kung ikaw ay gumagawa ng maraming Donorbox campaigns na tumutugma sa hiwalay na B1 funds, ang cleanest layout ay isang Zap bawat campaign na may Donorbox *campaign* filter sa itaas — sa ganitong paraan ang fund mapping ay hard-coded at iyong na-skip ang lookup step.

### I-treat ang mga updated donations bilang corrections

Ang Donorbox's *New or Updated Donation* ay nag-fire sa mga edit din. Gamitin ang Zapier *Path* step sa `event_type` upang mag-fork: "new" → Add Donation, "updated" → Find Donation + Update (tala: ang B1's Zapier app ay walang kapalit na Update Donation action — para ngayon, mag-log ng "updated" events sa isang Slack channel para sa manual review).

### I-sync ang recurring plan changes sa isang Slack channel

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message sa `#donations` (hal. "Plan changed — Sarah's monthly gift ay $200 na")

## Mga Limitasyon at Mga Tala

- **I-match ang mga donor ayon sa email.** Ang Donorbox ay hindi nagbabahagi ng B1's person id; ang tanging durable join key ay email. Ang mga donor na nagbibigay sa ibang email ay maglikha ng bagong B1 person — ang iyong monthly reconciliation ay dapat hanapin ang mga ito.
- **Ang mga refunds ay hindi hiwalay na exposed** — Ang Donorbox ay naglalabas ng status update sa parehong donation. Ang B1's Zapier app ay walang kapalit na *Update Donation* action ngayon; ang safe pattern ngayon ay mag-log ng refund events out-of-band at manu-manong i-adjust ang donation.
- **I-test sa Donorbox's sandbox una** upang maiwasan ang paglikha ng fake gifts sa production B1. Ang Donorbox ay nagbibigay ng test mode credentials na hiwalay mula sa live.

## Troubleshooting

- **"Person not found" warning bawat run** — ok yan kung nag-order ka ng mga hakbang upang ang *Create Person* ay tumatakbo sa not-found branch. Kung ang Create Person step ay hindi kailanman tumatakbo, doble-check ang API key ay may `people:write`.
- **Ang donation amount ay mukhang 100× masyadong malaki o maliit** — Ang Donorbox ay nagpapadala ng cents sa ilang payload variants at dollars sa iba. Gamitin ang *Formatter by Zapier — Numbers* step upang hatiin ng 100 kung kailangan.
- **Duplicate donations mula sa isang solong gift** — Ang Donorbox ay nag-fire ng parehong *New Donation* at *Updated Donation*. I-filter ang `event_type = "donation.succeeded"` o bumuo ng dalawang Zaps na may non-overlapping filters.

## Makita Din

- [Zapier (overview)](../zapier) — ang B1 side ng bawat Zapier recipe
- [Subsplash](./subsplash) — ibang donation platform na may Zapier app
- [Mailchimp](./mailchimp) — chain "new gift" sa isang email tag
