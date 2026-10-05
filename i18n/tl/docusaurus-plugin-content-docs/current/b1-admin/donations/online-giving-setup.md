---
title: "Pag-set Up ng Online Giving"
---

# Pag-set Up ng Online Giving

<div class="article-intro">

Nakakonekta ang B1 Admin sa **Stripe**, **PayPal**, **Kingdom Funding**, at **Paystack** (para sa mga simbahan sa Africa) para makapagbigay online ang inyong mga miyembro sa pamamagitan ng inyong B1.church site. Kapag na-configure na, awtomatikong lalabas ang mga online donation sa inyong mga donation record kasama ng mga manu-manong ipinasok na handog, kaya nasa iisang sistema ang lahat.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang inyong [mga donation fund](funds.md) para matukoy ng mga nagbibigay kung saan mapupunta ang kanilang handog
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin sa test mode)
- Ihanda ang inyong B1 Admin login credentials

</div>

## Pag-set Up ng Stripe

1. Gumawa ng account sa [stripe.com](https://stripe.com) kung wala pa kayo nito. Siguraduhing **i-activate ang inyong account** at alisin ito sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang inyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. Pumunta sa **Settings** at buksan ang seksyong **Giving**.
6. I-click ang edit icon sa seksyong **Giving**.
7. Itakda ang **Provider** sa **Stripe**.
8. I-paste ang inyong Publishable Key sa field na **Public Key**.
9. Bumalik sa Stripe at ipakita ang inyong **Secret Key** (isang beses lang ito makikita, kaya mag-save ng backup).
10. I-paste ang Secret Key sa field na **Secret Key** at i-click ang **Save**.

:::warning
Isang beses lang ipinapakita ang inyong Stripe Secret Key. Kopyahin ito sa isang ligtas na lugar bago umalis sa Stripe dashboard. Kung mawala ito, kailangan ninyong gumawa ng bagong key.
:::

## Pagpili ng Inyong Currency

Pagkatapos piliin ang Stripe bilang provider, lalabas ang dropdown na **Currency** kasama ng inyong mga API key. Piliin ang currency na tugma sa settlement currency ng inyong Stripe account para tama ang singil sa mga donasyon.

Kabilang sa mga sinusuportahang currency ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari ninyong kumpirmahin o baguhin ang default currency ng inyong account sa inyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pipiliin ninyo rito ay ginagamit para sa mga one-time na donasyon, recurring na subscription, kalkulasyon ng fee, at mga donation report. Kung magpalit kayo ng currency sa susunod, ang mga bagong donasyon at subscription lang ang gagamit ng bagong currency — magpapatuloy ang mga umiiral na recurring na handog sa currency na ginamit nang likhain ang mga ito.
:::

:::warning
Siguraduhing naka-configure ang inyong Stripe account para tumanggap ng currency na pinili ninyo. Kung hindi sinusuportahan ng inyong Stripe account ang napiling currency, mabibigo ang mga donasyon sa checkout.
:::

## Apple Pay at Google Pay

Ang mga simbahang gumagamit ng Stripe ay awtomatikong magkakaroon ng mga button ng Apple Pay at Google Pay sa pampublikong giving page. Lalabas ang mga button sa itaas ng mga card field para sa mga one-time na handog kapag napili na ng nagbibigay ang fund at halaga, at kapag may naka-set up na wallet lang ang browser o device ng nagbibigay. Ang mga recurring na handog ay gumagamit pa rin ng mga card o bank field.

Hindi kailangan ng setup para sa Google Pay. Ang Apple Pay naman ay nangangailangang naka-rehistro sa Stripe ang domain ng inyong giving page; ire-rehistro ito ng B1 sa unang beses na mag-load ang giving page sa inyong domain. Kung hindi lumalabas ang Apple Pay button sa iPhone, tingnan ang **Settings > Payment method domains** sa inyong Stripe Dashboard at tiyaking nakalista at naka-verify ang inyong `yoursubdomain.b1.church` (o custom) na domain.

## Mga Anonymous na Handog

Maaaring lagyan ng check ng mga nagbibigay sa pampublikong giving page ang **Give anonymously**. Ang anonymous na handog ay itinatala nang walang nakakabit na donor, mapupunta pa rin sa fund na pinili ng nagbibigay, at lalabas bilang **Anonymous** sa inyong mga batch at report. Kailangan pa rin ang email ng nagbibigay para maipadala ang resibo, pero walang malilikhang person record. Ang mga anonymous na handog ay one-time lang at hindi lumalabas sa anumang giving statement.

## Mga Bigong Recurring na Handog

Kapag nabigo ang isang recurring na handog sa Stripe (halimbawa, expired o tinanggihang card), lalabas ang bigong singil sa **Donations > Failed Gifts** kasama ang donor, halaga, petsa, at ang dahilang ibinigay ng gateway. I-click ang **Retry** para subukang muli ang singil kapag na-update na ng nagbibigay ang kanyang payment method.

Nag-e-email din ang B1 sa nagbibigay kapag nabigo ang singil, at muli pagkalipas ng tatlo at pitong araw kung hindi pa rin ito natutuloy, na may link para i-update ang kanyang payment method sa B1.church.

:::info
Kung na-set up ng inyong simbahan ang Stripe bago pa umiral ang feature na ito, buksan ang **Settings** > **Giving**, i-click ang edit, at i-click ang **Save** nang isang beses. Ire-refresh nito ang Stripe webhook para maiulat sa B1 ang mga bigong singil.
:::

## Pagdaragdag ng Donation Page sa Inyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang icon ng **Settings**.
3. I-click ang **Add Tab**.
4. Piliin ang **Donation** bilang uri.
5. Maglagay ng pangalan para sa tab (hal., "Give") at i-click ang **Save**.
6. Opsyonal, palitan ang icon ng tab -- i-type ang "Giv" sa icon search para makahanap ng icon na may kinalaman sa pagbibigay.

Live na ang inyong donation page. Maaari itong bisitahin ng mga miyembro sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Inyong Giving Link

Para malaman ang inyong giving URL, pumunta sa **B1 Admin** at i-click ang icon ng **Settings** para makita ang inyong subdomain. Ganito ang format ng inyong donation link:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa inyong website, sa mga email, o sa inyong bulletin para malaman ng mga miyembro kung saan sila maaaring magbigay online.

### Mga Link na May Nakatakdang Fund at Halaga

Para ihatid agad ang mga nagbibigay sa isang partikular na fund, pumunta sa **Donations > Funds** at i-click ang **Giving Link** sa fund. Opsyonal na maglagay ng halaga, pagkatapos ay kopyahin ang link. Kapag binuksan ito ng nagbibigay, napili na ang fund at halaga sa giving page. Ganito ang anyo ng link:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gumagana rin ang parehong mga parameter sa elementong **Donate Link** ng website builder.

## Mga Abiso sa Donasyon

Nagpapadala ang Stripe ng email notification sa tuwing may natatanggap na donasyon. Para baguhin ang email address ng notification, pumunta sa Stripe dashboard, i-click ang inyong profile sa kanang itaas, piliin ang **Profile**, at i-update ang inyong email address.

## Mga Opsyon sa Processing Fee

Maaari ninyong i-configure ang inyong giving page para opsyonal na masagot ng mga nagbibigay ang processing fee, upang matanggap ng inyong simbahan ang buong halaga ng donasyon. Ang setting na ito ay pinamamahalaan sa mga setting ng simbahan ninyo sa B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng maliit na test donation para matiyak na gumagana ang lahat bago ianunsyo ang online giving sa inyong kongregasyon.
:::

## Pag-set Up ng Kingdom Funding

Ang Kingdom Funding ay isang Kristiyanong payment processor na sumusuporta sa mga credit/debit card at ACH bank transfer. Kung naka-enroll ang inyong simbahan sa Kingdom Funding, maaari ninyo itong ikonekta bilang inyong giving gateway.

:::info
Nasa beta pa ang integrasyon ng Kingdom Funding. Makipag-ugnayan sa inyong B1 account representative para ma-enable ito sa inyong simbahan.
:::

1. Mag-sign up o mag-log in sa [kingdomfunding.org](https://kingdomfunding.org).
2. Kunin ang inyong **Security Key** (public) at **Private Key** mula sa merchant portal ng Kingdom Funding.
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang inyong Security Key sa field na **Security Key** at ang inyong Private Key sa field na **Private Key**.
6. Itakda ang **Webhook Key** na natanggap ninyo mula sa Kingdom Funding, at kopyahin ang ipinapakitang webhook URL sa inyong Kingdom Funding merchant settings para maabisuhan ng Kingdom Funding ang B1 tungkol sa mga nakumpletong transaksyon.
7. I-save.

Kapag nakakonekta na, makikita ng mga miyembro ang card/bank toggle sa donation page at maaari silang magbigay gamit ang credit card o ACH transfer.

## Mga Button ng PayPal at Venmo

Ang mga simbahang gumagamit ng **PayPal** bilang provider ay magkakaroon ng mga button ng **PayPal** at **Venmo** sa itaas ng mga card field sa giving page para sa mga one-time na handog. Ang mga nagbibigay na mag-click sa isa ay kukumpleto ng bayad sa isang PayPal window, at itatala ang handog tulad ng anumang ibang online donation. Lalabas lang ang Venmo para sa mga nagbibigay sa United States na gumagamit ng device na itinuturing ng PayPal na eligible. Ang mga recurring na handog ay gumagamit pa rin ng mga card field.

## Pag-set Up ng Paystack (Africa)

Hindi nagbubukas ang Stripe ng account para sa mga simbahan sa Ghana, Nigeria, Kenya, South Africa, o Côte d'Ivoire. Ang [Paystack](https://paystack.com) ay nagbubukas, at tumatanggap ito ng mga lokal na card, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer, at USSD — magbabayad ang mga nagbibigay sa inyong lokal na currency (GHS, NGN, KES, ZAR, XOF).

1. Mag-rehistro sa [paystack.com](https://paystack.com) gamit ang business registration certificate ng inyong simbahan at lokal na bank account, at kumpletuhin ang activation (go-live) review ng Paystack.
2. Sa Paystack Dashboard, buksan ang **Settings → API Keys & Webhooks** at kopyahin ang **Public Key** at **Secret Key** (gamitin ang mga live key, hindi ang mga test key).
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Paystack**, i-paste ang Public Key at Secret Key, at piliin ang inyong **Currency**.
5. Kopyahin ang **webhook URL** na ipinapakita sa ilalim ng provider, bumalik sa Paystack Dashboard (**Settings → API Keys & Webhooks**) at i-paste ito sa field na **Webhook URL**. Ganito naitatala ang mga recurring na handog at mga bayad sa mobile money.
6. I-save.

Kukumpletuhin ng mga nagbibigay ang kanilang bayad sa isang ligtas na Paystack window at doon sila makakapili ng card, mobile money, o bank transfer. Mga paalala:

- Ang **mga recurring na handog** ay nangangailangan ng card; hindi awtomatikong masisingil muli ang mobile money, kaya one-time na mobile money gift lang ang pinapayagan ng Paystack.
- Ang mga recurring na handog sa Paystack ay maaaring kanselahin mula sa B1 pero hindi maaaring i-pause o i-edit — kanselahin at gumawa ng bago para baguhin ang halaga.
- Ang mga default ng **Processing Fee** ay naaayon sa mga rate ng Paystack sa lokal na card para sa inyong currency; i-edit ang mga ito kung iba ang napagkasunduan ninyong rate.

## Mga Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) para i-pull sa B1 Admin ang mga online na transaksyon kung hindi awtomatikong nagsi-sync ang mga ito
- Tingnan ang inyong [Mga Donation Report](donation-reports.md) para tiyaking tama ang paglabas ng mga online donation
- Gumawa ng [Mga Giving Statement](giving-statements.md) na kasama ang parehong online at offline na donasyon
