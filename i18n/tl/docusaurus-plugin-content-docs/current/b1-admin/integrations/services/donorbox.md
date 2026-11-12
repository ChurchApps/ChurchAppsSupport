---
title: "Donorbox"
description: "Ikonekta ang Donorbox sa B1 Admin gamit ang Zapier para awtomatikong gumawa ng mga talaan ng donasyon at profile ng donor sa B1 ang mga online na donasyon, nang walang manwal na export."
---

# Donorbox

<div class="article-intro">

Kung tumatanggap ang iyong simbahan ng donasyon sa pamamagitan ng Donorbox pero sinusubaybayan ang mga tao at statement sa B1, puwede mong gawing awtomatikong gumawa ng katugmang talaan ng donasyon sa B1 ang mga instant Zapier trigger ng Donorbox — at gawing tao sa B1 ang donor kung wala pa siya. Walang manwal na pagtutugma, walang buwanang export.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Donorbox](https://donorbox.org) account na may kahit isang campaign
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

| Direksyon | Trigger ng Donorbox | Aksyon sa B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (paulit-ulit) | Find Person → Add Donation (gamitin ang Plan id bilang note) |

Inilalathala ng Donorbox ang mga trigger nito bilang **instant** — nagfa-fire ang mga ito sa loob ng ilang segundo mula sa tunay na donasyon. Walang polling delay.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

Sa B1Admin: **Settings → Developer → API Keys → New API Key**. Mga scope:

- `people:read` — para hanapin ang donor ayon sa email
- `people:write` — para gawin sila kung bago pa sila
- `donations:write` — para itala ang regalo

- `settings:write` — sinusuri ng Zapier ang bawat B1 key laban sa listahan ng webhook ng B1 kapag ikinonekta mo ito, kaya papalya ang koneksyon kung wala ito (kahit na ang Donorbox, hindi ang B1, ang nagmamay-ari ng trigger dito)

### 2. Buuin ang Zap na "magtala ng donasyon" {#2-build-the-record-a-donation-zap}

1. **Trigger** — Donorbox: New Donation. Ikonekta gamit ang API key ng Donorbox (sa Donorbox: *Account → Profile → API Settings*).
2. **Aksyon** — B1.church: Find Person. Imapa ang email ng donor mula sa trigger sa field na *Email*.
3. **Aksyon** — B1.church: Add Donation. Imapa:
   - Person → ang id mula sa hakbang 2
   - Amount → ang halaga ng donasyon mula sa trigger
   - Donation Date → ang petsa ng donasyon mula sa trigger
   - Fund → piliin ang pondo sa B1 na sumasalamin sa campaign ng Donorbox (puwedeng magpalit ng pondo ang Zapier batay sa filter o formatter step)
   - Method → "Online"
   - Notes → ang transaction id ng Donorbox (kapaki-pakinabang sa pagtutugma)

I-on ang Zap. Ang susunod na live na donasyon sa pamamagitan ng Donorbox ay awtomatikong lalabas sa **B1Admin → Donations**.

Hihinto ang *Find Person* ng B1 sa Zap na may error na "No person found" kapag walang taong may ganoong email, kaya hindi makakapag-branch ang Filter step dito. Para hawakan ang mga unang beses na donor, i-on ang error handling ng Zapier para sa Find Person step at, sa error path nito, patakbuhin ang B1.church: Create Person (imapa ang first/last/email) at pagkatapos ay Add Donation gamit ang id ng bagong tao. O patakbuhin ang Zap na *New Donor* → *Create Person* mula sa talahanayan sa itaas para umiral na ang mga donor sa B1 bago dumating ang kanilang regalo.

## Karaniwang Recipe {#common-recipes}

### Isang Zap bawat pondo {#one-zap-per-fund}

Kung nagpapatakbo ka ng maraming campaign ng Donorbox na tumutugma sa magkakahiwalay na pondo sa B1, ang pinakamalinis na ayos ay isang Zap bawat campaign na may filter ng *campaign* ng Donorbox sa itaas — sa ganoong paraan, nakapirmi ang mapping ng pondo at nilalaktawan mo ang hakbang ng lookup.

### Ituring na pagwawasto ang mga na-update na donasyon {#treat-updated-donations-as-corrections}

Nagfa-fire din ang *New or Updated Donation* ng Donorbox kapag may na-edit. Gumamit ng Zapier *Path* step sa `event_type` para maghati: "new" → Add Donation, "updated" → Find Donation + Update (paalala: kasalukuyang walang Update Donation action ang Zapier app ng B1 — sa ngayon, i-log ang mga event na "updated" sa isang Slack channel para sa manwal na pagsusuri).

### I-sync ang mga pagbabago sa paulit-ulit na plan sa isang Slack channel {#sync-recurring-plan-changes-to-a-slack-channel}

- **Trigger** — Donorbox: New or Updated Plan
- **Aksyon** — Slack: Send Message sa `#donations` (hal. "Nagbago ang plan — ang buwanang regalo ni Sarah ay $200 na ngayon")

## Mga Limitasyon at Paalala {#limits--notes}

- **Itugma ang mga donor ayon sa email.** Hindi ibinabahagi ng Donorbox ang person id ng B1; ang tanging matibay na susi ng pagdurugtong ay ang email. Ang mga donor na nagbibigay gamit ang ibang email ay gagawa ng bagong tao sa B1 — dapat itong hanapin sa buwanang pagtutugma mo.
- **Hindi hiwalay na nakikita ang mga refund** — naglalabas ang Donorbox ng status update sa parehong donasyon. Kasalukuyang walang *Update Donation* action ang Zapier app ng B1; ang ligtas na paraan sa ngayon ay i-log nang hiwalay ang mga refund event at manwal na isaayos ang donasyon.
- **Subukan muna sa sandbox ng Donorbox** para hindi makagawa ng pekeng regalo sa production na B1. Nagbibigay ang Donorbox ng test mode credentials na hiwalay sa live.

## Troubleshooting {#troubleshooting}

- **Mga error na "No person found"** — wala pa sa B1 ang donor (o nagbigay siya gamit ang ibang email). Idagdag ang error path na inilarawan sa itaas, at tiyaking may `people:write` ang API key para tumakbo ang *Create Person*.
- **Mukhang 100× mas malaki o mas maliit ang halaga ng donasyon** — nagpapadala ang Donorbox ng sentimo sa ilang variant ng payload at dolyar sa iba. Gumamit ng *Formatter by Zapier — Numbers* step para hatiin sa 100 kung kailangan.
- **Doble ang donasyon mula sa iisang regalo** — nagfa-fire ang Donorbox ng *New Donation* at *Updated Donation* pareho. Alinman sa i-filter sa `event_type = "donation.succeeded"` o gumawa ng dalawang Zap na may hindi nagkakapatong na filter.

## Tingnan Din {#see-also}

- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Subsplash](./subsplash.md) — isa pang donation platform na may Zapier app
- [Mailchimp](./mailchimp.md) — ikabit ang "bagong regalo" sa isang email tag
