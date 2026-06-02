---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Kung gumagamit ka ng Subsplash para sa iyong church app, giving, o forms ngunit nais ang B1 bilang ang system of record para sa mga tao at donation, ang Zapier app ng Subsplash ay maaaring mag-pipe ng donations, bagong profiles, at form responses sa B1 sa real time. Tandaan na ang Zapier app ng Subsplash ay kasalukuyang **triggers-only** — ang wiring ay one-way (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang Subsplash account sa isang plan na kasama ang **API + Zapier** access (makipag-ugnayan sa iyong Subsplash Client Success Manager — ang mga ito ay nag-gate sa likod ng plan tier)
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

Ang lahat ng triggers sa ibaba ay ng Subsplash. Ang mga actions ay B1's.

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (Create Person kung nawawala) |
| New Pledge | Add Donation (na may `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (walang direktang B1 action — mag-log sa isang Google Sheet para sa manual review) |
| New Form Response | Create Person + (optionally) Add Group Member batay sa form |

Ang Subsplash → B1 ay ang tanging direksyon na sinusuportahan ng Subsplash's app ngayon.

## Setup

### 1. Mag-mint ng isang B1 API key

Sa B1Admin: **Settings → Developer → API Keys → New API Key**. Mga scopes:

- `people:read` — upang hanapin ang donor ayon sa email
- `people:write` — upang lumikha ng mga ito kung wala pang akma
- `donations:write` — upang mag-record ng gift
- (Walang `settings:write` na kailangan — Subsplash, hindi B1, ang nagmamay-ari ng trigger dito.)

### 2. Konektahan ang Subsplash sa Zapier

Sundin ang [Subsplash's Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration). Nag-issue sila ng isang API token mula sa loob ng Subsplash Dashboard na ginagamit ng Zapier upang mag-authenticate ng trigger side.

### 3. Bumuo ng "record a donation" Zap

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (ayon sa email)
3. **Filter / Path** — i-branch sa "person found":
   - **Found:** B1.church: Add Donation. I-map ang amount, date, fund, method = "Online", notes = Subsplash transaction id.
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (gamit ang bagong created person's id).

I-on ang Zap. Ang mga susunod na Subsplash donations ay dumaloy sa **B1Admin → Donations** sa loob ng ilang segundo.

## Mga Karaniwang Recipes

### Magpadala ng thank-you kapag ang unang gift ay lumanding

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: magpatuloy lamang kung ito ang unang gift ng donor (gamitin ang *Lookup Table* sa Donor Email laban sa isang Google Sheet ng nakaraang givers, o isang Zapier *Paths* step sa donor created date)
- **Action** — Mailchimp / SMTP / SendGrid: magpadala ng first-gift thank-you message
- **Action** — B1.church: Add Donation (tulad ng dati)

### I-filter ang mga pledge sa regular na giving flow

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation na may `notes = "Pledge — Subsplash"` at isang fund na tinatawag `Pledges` (hiwalay mula sa iyong operating fund) upang makagawa ng ulat sa mga pledge nang independyente sa **B1Admin → Donations → Reports**.

### Sync ng mga bagong app users bilang B1 people

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, populating name, email, phone. Tag sa B1 sa pamamagitan ng pagdadagdag ng bagong tao sa isang group tulad ng "Subsplash App Users".

## Mga Limitasyon at Mga Tala

- **Ang Zapier app ng Subsplash ay triggers-only.** Kung gusto mo ang B1-side changes (hal. isang bagong B1 person upang lumanding sa Subsplash din), kailangan mong bumuo ng bridge mula sa B1's Zapier app triggers na tumatawag sa Subsplash's REST API sa pamamagitan ng isang custom *Webhooks by Zapier — POST* action. Yan ay isang custom integration, hindi isang recipe.
- **Ang API access ay plan-gated.** Kung ang Zapier connection ay nabigo na may `403 Forbidden`, ang iyong Subsplash plan ay malamang na hindi kasama ang API access — makipag-ugnayan sa iyong Client Success Manager.
- **Ang fund mapping ay manual.** Ang Subsplash ay nagpapasa ng isang campaign o category name; kailangan ng B1 ng numeric fund id. Alinman hard-code ang fund sa Zap o mapanatili ang Zapier *Lookup Table* na nag-map sa Subsplash campaigns sa B1 funds.

## Troubleshooting

- **Walang trigger fires pagkatapos ng donation** — i-verify sa Subsplash's Zapier dashboard na ang connection ay nagpapakita pa rin ng *Connected*. Kung ang API token ay ino-rotate sa Subsplash side, ang Zap ay silent na tumitigil; muling kumonekta.
- **B1 *Add Donation* ay nabigo na may 422** — karamihan ay nawawalang o di-recognize na `fundId`. I-list ang iyong mga fund sa **B1Admin → Donations → Funds** at kopyahin ang exact id sa Zap step.
- **Ang unang gift ay nag-trigger ng dalawang beses** — Ang Subsplash ay minsan muling nagde-deliver ng trigger kung ang Zapier ay nawala ang ack. Magdagdag ng *Filter by Zapier* sa donation id (ang Subsplash ay nagpapadala ng isa sa payload) upang ilagay ang duplicates.

## Makita Din

- [Donorbox](./donorbox) — parehong recipe shape, ibang donation platform
- [Zapier (overview)](../zapier) — B1 side ng bawat Zapier recipe
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash's docs)
