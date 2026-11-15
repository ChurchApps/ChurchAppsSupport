---
title: "Gabay: Pag-set Up ng Online Giving"
description: "I-set up ang online giving sa B1 Admin sa pamamagitan ng paggawa ng mga donation fund, pagkonekta ng Stripe, at pagdaragdag ng Donate page sa iyong B1.church website para sa mga miyembro."
---

# Pag-set Up ng Online Giving

<div class="article-intro">

Sundan ang lahat ng kailangan para makatanggap ng online na donasyon ang iyong simbahan -- mula sa paggawa ng mga donation fund, hanggang sa pagkonekta ng Stripe para sa pagproseso ng bayad, hanggang sa pagbabahagi ng giving page sa iyong kongregasyon. Pagkatapos nito, makakapagbigay na online ang mga miyembro sa pamamagitan ng iyong website at mobile app.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may admin access -- tingnan ang [Roles & Permissions](../people/roles-permissions.md)
- Isang Stripe account (gumawa ng libre sa [stripe.com](https://stripe.com) kung kailangan)

</div>

## Hakbang 1: Gumawa ng Mga Donation Fund {#step-1-create-donation-funds}

Ang mga fund ang mga kategorya ng handog na maaaring pagbigyan ng mga donor. Kailangan mo ng kahit isang fund bago ka makatanggap ng donasyon.

Sundin ang gabay na [Funds](../donations/funds.md) para i-set up ang iyong mga kategorya ng giving:

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **Donations > Funds** at i-click ang **Add Fund**
2. Gumawa ng pinakakaraniwan mong mga fund (hal., "General Fund", "Building Fund", "Missions")
3. Lagyan ng check ang **Tax Deductible** sa mga fund na ang handog ay dapat lumabas sa taunang giving statement, at iwanang naka-check ang **Visible to Donors** sa mga fund na dapat mapili ng mga donor online

:::tip
Maaari kang magdagdag ng mas maraming fund anumang oras. Magsimula sa pinakakaraniwan mong kategorya ng giving.
:::

## Hakbang 2: Ikonekta ang Stripe {#step-2-connect-stripe}

Pinangangasiwaan ng Stripe ang lahat ng pagproseso ng bayad. Ikokonekta mo ang iyong Stripe account sa B1 Admin para dumaloy ang mga donasyon sa iyong bank account.

Sundin ang gabay na [Online Giving Setup](../donations/online-giving-setup.md) para ikonekta ang Stripe:

1. Mag-log in sa iyong Stripe dashboard at pumunta sa **Developers > API Keys** para mahanap ang iyong Publishable Key at Secret Key
2. Sa B1 Admin, pumunta sa **Settings**, i-click ang **Edit** sa seksyong **Giving**, at itakda ang **Provider** sa **Stripe**
3. I-paste ang Publishable Key sa **Public Key** at ang Secret Key sa **Secret Key**, suriin ang **Currency**, at i-click ang **Save**

Sinusuportahan din ng B1 ang **Kingdom Funding** at **Paystack** (para sa mga simbahan sa Africa) bilang mga giving provider -- tingnan ang [Online Giving Setup](../donations/online-giving-setup.md).

:::warning
Isang beses lamang ipinapakita ng Stripe ang iyong Secret Key. Kopyahin at i-save ito bago umalis sa Stripe dashboard. Kung mawala ito, kailangan mong gumawa ng bago.
:::

## Hakbang 3: Magdagdag ng Giving Page sa Iyong Website {#step-3-add-a-giving-page-to-your-website}

Gawing accessible ang giving sa pamamagitan ng pagdaragdag ng donation page sa iyong B1 website.

Sundin ang mga gabay na [Online Giving Setup](../donations/online-giving-setup.md) at [Managing Pages](../website/managing-pages.md) para:

1. Magdagdag ng **Donation** tab sa iyong B1.church site (o ng **Donation** element sa isang page sa website builder)
2. Ang iyong giving URL ay magiging: `https://yoursubdomain.b1.church/donate`
3. Makakapagbigay ang mga miyembro nang hindi nagla-log in (public page) o mag-log in para sa naka-save na paraan ng bayad at kasaysayan ng donasyon
4. Para dalhin ang mga donor nang diretso sa iisang fund, i-click ang **Giving Link** sa fund na iyon sa ilalim ng **Donations > Funds** para kopyahin ang link (o mag-download ng QR code) na may nakatakdang fund at halaga

## Hakbang 4: Gumawa ng Test Donation {#step-4-make-a-test-donation}

Bago ianunsyo sa iyong kongregasyon, tiyaking gumagana ang lahat.

1. Gumawa ng maliit na test donation para masiguradong gumagana ang daloy mula simula hanggang dulo
2. Tingnan kung lumalabas ang donasyon sa B1 Admin sa ilalim ng **Donations > Batches**

:::tip
Para mag-test nang walang totoong singil, maaari mo munang i-save ang test key ng Stripe, pagkatapos palitan ang mga ito ng live key sa **Settings > Giving** bago ianunsyo sa iyong kongregasyon.
:::

## Hakbang 5: Ianunsyo sa Iyong Kongregasyon {#step-5-announce-to-your-congregation}

Ipaalam sa lahat para malaman ng mga miyembro na maaari na silang magbigay online.

1. Ibahagi ang giving URL sa pamamagitan ng iyong website, email newsletter, bulletin, at social media
2. Maaari ding magbigay ang mga miyembro sa pamamagitan ng [B1 App](../../b1-church/giving/index.md) -- nakapaloob na ang feature ng giving

:::info
Maaaring mag-save ng paraan ng bayad, mag-set up ng paulit-ulit na donasyon, at tingnan ang kasaysayan ng kanilang giving ang mga miyembrong naka-log in. Gumagana rin ang anonymous giving -- hindi kailangan ng login.
:::

## Hakbang 6: Patuloy na Pamamahala {#step-6-ongoing-management}

Panatilihing updated ang iyong mga talaan ng donasyon at gumawa ng mga ulat sa buong taon.

1. Awtomatikong naitatala ang mga online na handog. Gamitin ang [Stripe Import](../donations/stripe-import.md) para mahuli ang anumang transaksyon sa Stripe na hindi nag-sync -- i-click ang **Preview** para makita kung ano ang kulang, pagkatapos ang **Import Missing**
2. [Tingnan ang mga ulat ng donasyon](../donations/donation-reports.md) sa ilalim ng **Donations > Summary** para subaybayan ang mga trend ng giving at kabuuan kada fund
3. Tingnan ang **Donations > Failed Gifts** para sa mga paulit-ulit na handog na tinanggihan ang card, at i-click ang **Retry** kapag na-update na ng donor ang kanyang paraan ng bayad
4. [Gumawa ng taunang giving statement](../donations/giving-statements.md) para sa tax record ng iyong mga donor

:::tip
Magpatakbo ng Stripe Import preview bago isara ang bawat buwan para magtugma ang iyong mga talaan sa Stripe. Tingnan ang [Year-End Reports Guide](./year-end-reports.md) para sa buong proseso ng katapusan ng taon.
:::

## Tapos Ka Na! {#youre-done}

Tumatanggap na ng online na donasyon ang iyong simbahan. Makakapagbigay ang mga miyembro sa pamamagitan ng iyong website, sa B1 App, o sa anumang device na may web browser. Awtomatikong sinusubaybayan sa B1 Admin ang lahat ng donasyon.

## Mga Kaugnay na Artikulo {#related-articles}

- [Funds](../donations/funds.md) — gumawa at mamahala ng mga kategorya ng donasyon
- [Batches](../donations/batches.md) — ayusin ang mga donasyon sa mga grupo
- [Recording Donations](../donations/recording-donations.md) — manu-manong ilagay ang cash at check na donasyon
- [Stripe Import](../donations/stripe-import.md) — ilipat ang mga online na transaksyon sa B1 Admin
- [Donation Reports](../donations/donation-reports.md) — tingnan ang mga trend at kabuuan ng giving
- [Giving Statements](../donations/giving-statements.md) — gumawa ng taunang tax statement
- [Making Donations](../../b1-church/giving/making-donations.md) — ang karanasan ng miyembro sa pagbibigay sa B1.church at sa B1 App
