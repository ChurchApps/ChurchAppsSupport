---
title: "Gabay: I-set Up ang Online na Pagbibigay"
---

# I-set Up ang Online na Pagbibigay

<div class="article-intro">

Tatalakayin ang lahat ng kailangan para tumanggap ng mga online na donasyon sa inyong simbahan — mula sa paggawa ng mga donation fund, pagkonekta ng Stripe para sa pagproseso ng bayad, hanggang sa pagbabahagi ng giving page sa inyong kongregasyon. Sa huli, makakapagbigay na ang mga miyembro online sa pamamagitan ng inyong website at mobile app.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- B1 Admin account na may admin access — tingnan ang [Mga Tungkulin at Pahintulot](../people/roles-permissions.md)
- Isang Stripe account (gumawa ng libre sa [stripe.com](https://stripe.com) kung kinakailangan)

</div>

## Hakbang 1: Gumawa ng mga Donation Fund

Ang mga fund ay ang mga kategorya kung saan makakapagbigay ang mga donor. Kailangan mo ng kahit isang fund bago ka makatanggap ng mga donasyon.

Sundin ang gabay sa [Mga Fund](../donations/funds.md) para i-set up ang inyong mga kategorya ng pagbibigay:

1. Gumawa ng mga pinakakaraniwang fund (hal., "General Fund", "Building Fund", "Missions")
2. Markahan nang naaangkop ang mga tax-deductible na fund — nakakaapekto ito sa mga year-end giving statement

:::tip
Maaari kang magdagdag ng mga fund anumang oras. Magsimula sa pinakakaraniwang mga kategorya ng pagbibigay.
:::

## Hakbang 2: Ikonekta ang Stripe

Pinoproseso ng Stripe ang lahat ng pagbabayad. Ikokonekta mo ang iyong Stripe account sa B1 Admin para dumaloy ang mga donasyon sa iyong bank account.

Sundin ang gabay sa [Pag-setup ng Online na Pagbibigay](../donations/online-giving-setup.md) para ikonekta ang Stripe:

1. Mag-log in sa iyong Stripe dashboard at kunin ang iyong Publishable Key at Secret Key
2. Sa B1 Admin, pumunta sa Settings at ilagay ang parehong key

:::warning
Ipinapakita lang ng Stripe ang iyong Secret Key nang isang beses. Kopyahin at i-save ito bago umalis sa Stripe dashboard. Kung nawala ito, kailangan mong gumawa ng bago.
:::

## Hakbang 3: Magdagdag ng Giving Page sa Inyong Website

Gawing accessible ang pagbibigay sa pamamagitan ng pagdagdag ng donation page sa inyong B1 website.

Sundin ang mga gabay sa [Pag-setup ng Online na Pagbibigay](../donations/online-giving-setup.md) at [Pamamahala ng mga Pahina](../website/managing-pages.md) para:

1. Magdagdag ng "Donate" tab sa inyong B1.church site
2. Ang inyong giving URL ay magiging: `https://yoursubdomain.b1.church/donate`
3. Maaaring magbigay ang mga miyembro nang hindi nagla-log in (pampublikong pahina) o mag-log in para sa mga naka-save na paraan ng pagbabayad at kasaysayan ng donasyon

## Hakbang 4: Gumawa ng Test Donation

Bago ibalita sa inyong kongregasyon, i-verify na gumagana ang lahat.

1. Gumawa ng maliit na test donation para i-verify na gumagana ang buong proseso
2. Tingnan kung lumabas ang donasyon sa B1 Admin sa ilalim ng Donations

:::tip
Gamitin muna ang test mode ng Stripe kung gusto mong mag-verify nang walang totoong singil, pagkatapos lumipat sa live mode bago ibalita sa inyong kongregasyon.
:::

## Hakbang 5: Ibalita sa Inyong Kongregasyon

Ikalat ang balita para malaman ng mga miyembro na maaari na silang magbigay online.

1. Ibahagi ang giving URL sa pamamagitan ng inyong website, email newsletter, bulletin, at social media
2. Maaari ring magbigay ang mga miyembro sa pamamagitan ng [B1 Mobile app](../../b1-mobile/giving/) — kasama na ang giving feature

:::info
Ang mga miyembrong naka-log in ay maaaring mag-save ng paraan ng pagbabayad, mag-set up ng paulit-ulit na donasyon, at tingnan ang kanilang kasaysayan ng pagbibigay. Gumagana rin ang anonymous na pagbibigay — hindi kailangan ng login.
:::

## Hakbang 6: Patuloy na Pamamahala

Panatilihing napapanahon ang inyong mga talaan ng donasyon at gumawa ng mga ulat sa buong taon.

1. Regular na [mag-import ng mga Stripe transaction](../donations/stripe-import.md) (lingguhan o buwanan) para panatilihing napapanahon ang inyong mga talaan
2. [Tingnan ang mga ulat ng donasyon](../donations/donation-reports.md) para subaybayan ang mga trend at kabuuan ng pagbibigay ayon sa fund
3. [Gumawa ng mga year-end giving statement](../donations/giving-statements.md) para sa mga talaan ng buwis ng inyong mga donor

:::tip
Mag-run ng Stripe import kahit isang beses sa isang buwan para manatiling napapanahon ang inyong mga talaan. Tingnan ang [Gabay sa Mga Ulat sa Katapusan ng Taon](./year-end-reports.md) para sa kumpletong proseso sa katapusan ng taon.
:::

## Tapos Ka Na!

Tumatanggap na ngayon ng online na donasyon ang inyong simbahan. Maaaring magbigay ang mga miyembro sa pamamagitan ng inyong website, ng B1 Mobile app, o anumang device na may web browser. Awtomatikong sinusubaybayan ang lahat ng donasyon sa B1 Admin.

## Mga Kaugnay na Artikulo

- [Mga Fund](../donations/funds.md) — gumawa at pamahalaan ang mga kategorya ng donasyon
- [Mga Batch](../donations/batches.md) — ayusin ang mga donasyon sa mga grupo
- [Pagtatala ng mga Donasyon](../donations/recording-donations.md) — manual na paglagay ng mga donasyong cash at tseke
- [Stripe Import](../donations/stripe-import.md) — i-pull ang mga online transaction sa B1 Admin
- [Mga Ulat ng Donasyon](../donations/donation-reports.md) — tingnan ang mga trend at kabuuan ng pagbibigay
- [Mga Giving Statement](../donations/giving-statements.md) — gumawa ng mga year-end tax statement
- [Pagbibigay ng Donasyon (Web)](../../b1-church/giving/making-donations.md) — karanasan ng miyembro sa pagbibigay
- [Pagbibigay ng Donasyon (Mobile)](../../b1-mobile/giving/making-donations.md) — pagbibigay mula sa mobile app
