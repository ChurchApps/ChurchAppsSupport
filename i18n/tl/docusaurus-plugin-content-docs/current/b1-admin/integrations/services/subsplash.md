---
title: "Subsplash"
description: "Ikonekta ang mga donasyon, bagong tao, at sagot sa form ng Subsplash sa B1 gamit ang Zapier, para awtomatikong dumating ang mga regalo at profile sa B1 Admin."
---

# Subsplash

<div class="article-intro">

Kung gumagamit ka ng Subsplash para sa app ng simbahan, giving, o mga form pero gusto mong B1 ang system of record para sa mga tao at donasyon, kaya ng Zapier app ng Subsplash na ipasa ang mga donasyon, bagong profile, at sagot sa form papasok sa B1 nang real time. Pakitandaang **trigger lang** ang Zapier app ng Subsplash sa ngayon — isang direksyon lang ang pagkakabit (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang Subsplash account sa plan na may kasamang **API + Zapier** access (tanungin ang iyong Subsplash Client Success Manager — naka-gate ito sa tier ng plan)
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

Ang lahat ng trigger sa ibaba ay mula sa Subsplash. Mula sa B1 ang mga aksyon.

| Trigger ng Subsplash | Aksyon sa B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person kung wala pa) |
| New Pledge | Add Donation (na may `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (walang direktang aksyon sa B1 — ilagay sa Google Sheet para sa manwal na pagsusuri) |
| New Form Response | Create Person + (opsyonal) Add Group Member batay sa form |

Subsplash → B1 ang tanging direksyong sinusuportahan ng app ng Subsplash sa ngayon.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

Sa B1Admin: **Settings → Developer → API Keys → New API Key**. Mga scope:

- `people:read` — para hanapin ang donor ayon sa email
- `people:write` — para gawin sila kung wala pa
- `donations:write` — para itala ang regalo
- `settings:write` — sinusuri ng Zapier ang bawat B1 key laban sa listahan ng webhook ng B1 kapag ikinonekta mo ito, kaya papalya ang koneksyon kung wala ito (kahit na ang Subsplash, hindi ang B1, ang nagmamay-ari ng trigger dito)

### 2. Ikonekta ang Subsplash sa Zapier {#2-connect-subsplash-to-zapier}

Sundin ang [gabay sa Zapier integration ng Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Naglalabas sila ng API token mula sa loob ng Subsplash Dashboard na ginagamit ng Zapier para i-authenticate ang panig ng trigger.

### 3. Buuin ang Zap na "magtala ng donasyon" {#3-build-the-record-a-donation-zap}

1. **Trigger** — Subsplash: New Donation
2. **Aksyon** — B1.church: Find Person (ayon sa email)
3. **Aksyon** — B1.church: Add Donation, gamit ang id ng tao mula sa hakbang 2. Imapa ang amount, date, fund, method = "Online", notes = transaction id ng Subsplash.

Hihinto ang *Find Person* ng B1 sa Zap na may error na "No person found" kapag walang tumutugma, kaya hindi makakapag-branch ang Filter o Path step dito. Para hawakan ang mga unang beses na donor, i-on ang error handling ng Zapier para sa Find Person step at, sa error path nito, patakbuhin ang B1.church: Create Person → B1.church: Add Donation (gamit ang id ng bagong likhang tao).

I-on ang Zap. Ang mga susunod na donasyon ng Subsplash ay papasok sa **B1Admin → Donations** sa loob ng ilang segundo.

## Karaniwang Recipe {#common-recipes}

### Magpadala ng pasasalamat kapag dumating ang unang regalo {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger** — Subsplash: New Donation
- **Aksyon** — Filter by Zapier: magpatuloy lang kung ito ang unang regalo ng donor (gumamit ng *Lookup Table* sa Donor Email laban sa Google Sheet ng mga dating nagbigay, o isang Zapier *Paths* step batay sa petsa ng paggawa ng donor)
- **Aksyon** — Mailchimp / SMTP / SendGrid: magpadala ng mensaheng pasasalamat sa unang regalo
- **Aksyon** — B1.church: Add Donation (gaya ng dati)

### Ihiwalay ang mga pledge sa regular na daloy ng pagbibigay {#filter-pledges-off-the-regular-giving-flow}

- **Trigger** — Subsplash: New Pledge
- **Aksyon** — B1.church: Add Donation na may `notes = "Pledge — Subsplash"` at pondong tinatawag na `Pledges` (hiwalay sa iyong operating fund) para maiulat mo nang hiwalay ang mga pledge sa **B1Admin → Donations → Summary**.

### I-sync ang mga bagong user ng app bilang mga tao sa B1 {#sync-new-app-users-as-b1-people}

- **Trigger** — Subsplash: New Person Created
- **Aksyon** — B1.church: Create Person, punan ang pangalan, email, telepono. I-tag sa B1 sa pamamagitan ng pagdaragdag ng bagong tao sa grupong tulad ng "Subsplash App Users".

## Mga Limitasyon at Paalala {#limits--notes}

- **Trigger lang ang Zapier app ng Subsplash.** Kung gusto mo ng mga pagbabago sa panig ng B1 (hal. dapat ding lumabas sa Subsplash ang bagong tao sa B1), kailangan mong buuin ang tulay na iyon mula sa mga trigger ng Zapier app ng B1 na tumatawag sa REST API ng Subsplash sa pamamagitan ng custom na aksyong *Webhooks by Zapier — POST*. Custom integration iyon, hindi recipe.
- **Naka-gate sa plan ang API access.** Kung pumalya ang koneksyon sa Zapier na may `403 Forbidden`, malamang na hindi kasama sa iyong plan ng Subsplash ang API access — makipag-ugnayan sa iyong Client Success Manager.
- **Manwal ang pagmamapa ng pondo.** Nagpapasa ang Subsplash ng pangalan ng campaign o kategorya; kailangan ng B1 ang isa sa sarili nitong pondo. Alinman sa piliin ang pondo mula sa dropdown na **Fund** ng Add Donation step o panatilihin ang *Lookup Table* ng Zapier na nagmamapa ng mga campaign ng Subsplash sa mga pondo ng B1.

## Troubleshooting {#troubleshooting}

- **Walang nag-fire na trigger pagkatapos ng donasyon** — tingnan sa dashboard ng Zapier ng Subsplash kung nakikita pa ring *Connected* ang koneksyon. Kung napalitan ang API token sa panig ng Subsplash, tahimik na titigil ang Zap; ikonekta muli.
- **Itinala ng B1 *Add Donation* ang regalo nang walang pondo** — walang laman ang field na **Fund** o naka-map sa halagang hindi id ng pondo ng B1. Pumili ng pondo mula sa dropdown na **Fund** ng step (nakalista roon ang mga pondo sa ilalim ng **Donations > Funds** sa B1Admin), o magmapa ng Lookup Table na naglalabas ng mga id ng pondo ng B1.
- **Dalawang beses na nagfa-fire ang unang regalo** — paminsan-minsang muling inihahatid ng Subsplash ang trigger kung hindi natanggap ng Zapier ang ack nito. Magdagdag ng *Filter by Zapier* sa donation id (nagpapadala ang Subsplash nito sa payload) para alisin ang mga duplicate.

## Tingnan Din {#see-also}

- [Donorbox](./donorbox.md) — parehong hugis ng recipe, ibang donation platform
- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Gabay sa Zapier integration ng Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (mga docs ng Subsplash)
