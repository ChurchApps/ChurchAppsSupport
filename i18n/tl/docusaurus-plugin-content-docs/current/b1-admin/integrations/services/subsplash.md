---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Kung gumagamit ka ng Subsplash para sa app, giving, o forms ng iyong simbahan pero gusto mong B1 ang maging system of record para sa mga tao at donasyon, kayang ipasa ng Zapier app ng Subsplash ang mga donasyon, bagong profile, at sagot sa form papunta sa B1 nang real time. Tandaan na ang Zapier app ng Subsplash ay **triggers-only** sa ngayon — isang direksyon lamang ang koneksyon (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang Subsplash account sa plan na may kasamang **API + Zapier** access (itanong sa iyong Subsplash Client Success Manager — nakasalalay ito sa plan tier)
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Maaari Mong I-wire

Lahat ng trigger sa ibaba ay mula sa Subsplash. Mula sa B1 ang mga aksyon.

| Trigger ng Subsplash | Aksyon sa B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person kung wala pa) |
| New Pledge | Add Donation (may `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (walang direktang aksyon sa B1 — i-log sa Google Sheet para sa manu-manong pagrepaso) |
| New Form Response | Create Person + (opsyonal) Add Group Member batay sa form |

Ang Subsplash → B1 lang ang direksyong sinusuportahan ng Subsplash app sa ngayon.

## Pag-set up

### 1. Gumawa ng B1 API key

Sa B1Admin: **Settings → Developer → API Keys → New API Key**. Mga scope:

- `people:read` — para hanapin ang donor gamit ang email
- `people:write` — para gumawa ng bagong tao kung wala pa
- `donations:write` — para itala ang regalo
- (Hindi kailangan ang `settings:write` — ang Subsplash, hindi ang B1, ang nagmamay-ari ng trigger dito.)

### 2. Ikonekta ang Subsplash sa Zapier

Sundin ang [gabay sa Zapier integration ng Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Naglalabas sila ng API token mula sa loob ng Subsplash Dashboard na ginagamit ng Zapier para mag-authenticate sa panig ng trigger.

### 3. Gumawa ng Zap na "record a donation"

1. **Trigger** — Subsplash: New Donation
2. **Aksyon** — B1.church: Find Person (gamit ang email)
3. **Filter / Path** — sumanga batay sa "person found":
   - **Nahanap:** B1.church: Add Donation. I-map ang amount, date, fund, method = "Online", at notes = Subsplash transaction id.
   - **Hindi nahanap:** B1.church: Create Person → B1.church: Add Donation (gamit ang id ng bagong likhang tao).

I-on ang Zap. Ang mga susunod na donasyon sa Subsplash ay papasok sa **B1Admin → Donations** sa loob ng ilang segundo.

## Mga Karaniwang Recipe

### Magpadala ng pasasalamat kapag may unang regalo

- **Trigger** — Subsplash: New Donation
- **Aksyon** — Filter ng Zapier: magpatuloy lamang kung unang regalo ito ng donor (gumamit ng *Lookup Table* sa Donor Email laban sa Google Sheet ng mga nakaraang nagbigay, o isang Zapier *Paths* step batay sa petsa ng paglikha ng donor)
- **Aksyon** — Mailchimp / SMTP / SendGrid: magpadala ng mensahe ng pasasalamat para sa unang regalo
- **Aksyon** — B1.church: Add Donation (gaya ng dati)

### Ihiwalay ang mga pledge sa regular na daloy ng giving

- **Trigger** — Subsplash: New Pledge
- **Aksyon** — B1.church: Add Donation na may `notes = "Pledge — Subsplash"` at isang fund na tinawag na `Pledges` (hiwalay sa iyong operating fund) para maiulat mo nang hiwalay ang mga pledge sa **B1Admin → Donations → Summary**.

### I-sync ang mga bagong user ng app bilang mga tao sa B1

- **Trigger** — Subsplash: New Person Created
- **Aksyon** — B1.church: Create Person, punan ang pangalan, email, at telepono. Lagyan ng tag sa B1 sa pamamagitan ng pagdagdag ng bagong tao sa group tulad ng "Subsplash App Users".

## Mga Limitasyon at Tala

- **Triggers-only ang Zapier app ng Subsplash.** Kung gusto mong may mga pagbabagong nangyayari sa panig ng B1 (hal. ang bagong tao sa B1 ay mapunta rin sa Subsplash), kailangan mong bumuo ng tulay mula sa mga trigger ng Zapier app ng B1 na tumatawag sa REST API ng Subsplash sa pamamagitan ng custom na *Webhooks by Zapier — POST* na aksyon. Custom integration iyon, hindi isang recipe.
- **Nakabatay sa plan ang API access.** Kung nabigo ang koneksyon sa Zapier na may `403 Forbidden`, malamang na hindi kasama sa iyong Subsplash plan ang API access — makipag-ugnayan sa iyong Client Success Manager.
- **Manu-mano ang fund mapping.** Nagpapasa ang Subsplash ng pangalan ng campaign o kategorya; kailangan ng B1 ng numeric na fund id. Alinman sa i-hard-code ang fund sa Zap o magpanatili ng Zapier *Lookup Table* na nagmamapa ng mga campaign ng Subsplash sa mga fund ng B1.

## Pag-troubleshoot

- **Walang trigger na tumatakbo pagkatapos ng donasyon** — tiyakin sa Zapier dashboard ng Subsplash na nakikita pa ring *Connected* ang koneksyon. Kung pinalitan ang API token sa panig ng Subsplash, tahimik na titigil ang Zap; ikonekta muli.
- **Nabigo ang B1 *Add Donation* na may 422** — kadalasan ay nawawala o hindi kilala ang `fundId`. Ilista ang iyong mga fund sa pamamagitan ng **B1Admin → Donations → Funds** at kopyahin ang eksaktong id sa Zap step.
- **Dalawang beses na tumatakbo ang unang regalo** — paminsan-minsang muling inihahatid ng Subsplash ang trigger kapag hindi natanggap ng Zapier ang ack nito. Magdagdag ng *Filter by Zapier* sa donation id (nagpapadala ang Subsplash nito sa payload) para alisin ang mga duplicate.

## Tingnan Din

- [Donorbox](./donorbox) — parehong hugis ng recipe, iba't ibang donation platform
- [Zapier (overview)](../zapier) — panig ng B1 ng bawat recipe ng Zapier
- [Gabay sa Zapier integration ng Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (mga docs ng Subsplash)
