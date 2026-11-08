---
title: "Gabay: I-set Up ang Online Giving"
description: "I-set up ang online giving sa B1 Admin sa pamamagitan ng paggawa ng donation funds, pagkonekta ng Stripe, at pagdaragdag ng Donate page sa iyong B1.church website para sa mga miyembro."
---

# I-set Up ang Online Giving

<div class="article-intro">

Gabayan ka sa lahat ng kailangan para makatanggap ng online na donasyon sa iyong simbahan, mula sa paggawa ng donation funds, hanggang sa pagkonekta ng Stripe para sa payment processing, hanggang sa pagbabahagi ng giving page sa iyong kongregasyon. Pagkatapos nito, makakapagbigay na ang mga miyembro online sa pamamagitan ng iyong website at mobile app.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may admin access. Tingnan ang [Roles & Permissions](../people/roles-permissions.md)
- Isang Stripe account (gumawa ng libre sa [stripe.com](https://stripe.com) kung kailangan)

</div>

## Hakbang 1: Gumawa ng Donation Funds

Ang funds ay ang mga kategorya kung saan maaaring magbigay ang mga donor. Kailangan mo ng kahit isang fund bago ka makatanggap ng donasyon.

Sundin ang gabay na [Funds](../donations/funds.md) para i-set up ang iyong mga kategorya ng pagbibigay:

1. Gumawa ng iyong pinakakaraniwang funds (hal., "General Fund", "Building Fund", "Missions")
2. Markahan nang naaayon ang mga fund na tax-deductible. Nakakaapekto ito sa year-end giving statements

:::tip
Maaari kang magdagdag ng mas maraming fund anumang oras. Magsimula sa iyong pinakakaraniwang kategorya ng pagbibigay.
:::

## Hakbang 2: Ikonekta ang Stripe

Ang Stripe ang humahawak sa lahat ng payment processing. Ikokonekta mo ang iyong Stripe account sa B1 Admin para dumaloy ang mga donasyon sa iyong bank account.

Sundin ang gabay na [Online Giving Setup](../donations/online-giving-setup.md) para ikonekta ang Stripe:

1. Mag-log in sa iyong Stripe dashboard at kunin ang iyong Publishable Key at Secret Key
2. Sa B1 Admin, pumunta sa Settings at ilagay ang dalawang key

:::warning
Ipinapakita ng Stripe ang iyong Secret Key nang isang beses lang. Kopyahin at i-save ito bago umalis sa Stripe dashboard. Kung mawala ito, kailangan mong gumawa ng bago.
:::

## Hakbang 3: Magdagdag ng Giving Page sa Iyong Website

Gawing madaling ma-access ang pagbibigay sa pamamagitan ng pagdaragdag ng donation page sa iyong B1 website.

Sundin ang mga gabay na [Online Giving Setup](../donations/online-giving-setup.md) at [Managing Pages](../website/managing-pages.md) para:

1. Magdagdag ng "Donate" tab sa iyong B1.church site
2. Ang iyong giving URL ay magiging: `https://yoursubdomain.b1.church/donate`
3. Maaaring magbigay ang mga miyembro nang hindi nagla-log in (public page), o mag-log in para magamit ang mga naka-save na paraan ng pagbabayad at makita ang kasaysayan ng donasyon

## Hakbang 4: Gumawa ng Test Donation

Bago mo ipahayag sa iyong kongregasyon, siguraduhing gumagana ang lahat.

1. Gumawa ng maliit na test donation para masiguradong gumagana ang buong daloy
2. Tingnan kung lumalabas ang donasyon sa B1 Admin sa ilalim ng Donations

:::tip
Gamitin muna ang test mode ng Stripe kung gusto mong subukan nang walang totoong singil, pagkatapos ay lumipat sa live mode bago ipahayag sa iyong kongregasyon.
:::

## Hakbang 5: Ipahayag sa Iyong Kongregasyon

Ipaalam sa lahat para malaman ng mga miyembro na maaari na silang magbigay online.

1. Ibahagi ang giving URL sa pamamagitan ng iyong website, email newsletter, bulletin, at social media
2. Maaari ring magbigay ang mga miyembro sa pamamagitan ng [B1 App](../../b1-church/giving/index.md). Built in na ang feature ng pagbibigay

:::info
Ang mga miyembrong nakalog in ay maaaring mag-save ng paraan ng pagbabayad, mag-set up ng paulit-ulit na donasyon, at makita ang kanilang kasaysayan ng pagbibigay. Gumagana rin ang anonymous giving, at hindi kailangan ng login.
:::

## Hakbang 6: Pangmatagalang Pamamahala

Panatilihing updated ang iyong mga talaan ng donasyon at gumawa ng mga ulat sa buong taon.

1. [I-import ang Stripe transactions](../donations/stripe-import.md) nang regular (lingguhan o buwanan) para manatiling updated ang iyong mga talaan
2. [Tingnan ang donation reports](../donations/donation-reports.md) para masubaybayan ang mga trend ng pagbibigay at kabuuan ayon sa fund
3. [Gumawa ng year-end giving statements](../donations/giving-statements.md) para sa tax records ng iyong mga donor

:::tip
Magpatakbo ng Stripe import kahit buwan-buwan para manatiling updated ang iyong mga talaan. Tingnan ang [Year-End Reports Guide](./year-end-reports.md) para sa kumpletong proseso ng year-end.
:::

## Tapos Ka Na!

Tumatanggap na ng online na donasyon ang iyong simbahan. Maaaring magbigay ang mga miyembro sa pamamagitan ng iyong website, ng B1 App, o anumang device na may web browser. Awtomatikong naitatala sa B1 Admin ang lahat ng donasyon.

## Mga Kaugnay na Artikulo

- [Funds](../donations/funds.md): gumawa at mamahala ng mga kategorya ng donasyon
- [Batches](../donations/batches.md): ayusin ang mga donasyon sa mga grupo
- [Recording Donations](../donations/recording-donations.md): manu-manong magtala ng cash at check na donasyon
- [Stripe Import](../donations/stripe-import.md): kunin ang mga online transaction papunta sa B1 Admin
- [Donation Reports](../donations/donation-reports.md): tingnan ang mga trend at kabuuan ng pagbibigay
- [Giving Statements](../donations/giving-statements.md): gumawa ng year-end tax statements
- [Making Donations](../../b1-church/giving/making-donations.md): ang karanasan ng miyembro sa pagbibigay sa B1.church at sa B1 App
