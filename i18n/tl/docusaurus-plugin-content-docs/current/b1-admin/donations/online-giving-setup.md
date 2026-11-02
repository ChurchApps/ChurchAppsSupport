---
title: "Pag-set Up ng Online Giving"
---

# Pag-set Up ng Online Giving

<div class="article-intro">

Nakakonekta ang B1 Admin sa **Stripe**, **PayPal**, **Kingdom Funding**, at **Paystack** (para sa mga simbahan sa Africa) para makapagbigay ng online ang iyong mga miyembro sa pamamagitan ng iyong B1.church site. Kapag na-configure na, awtomatikong lumalabas ang mga online donasyon sa iyong mga tala ng donasyon kasama ng mga manual na naitalang regalo, kaya nasa iisang sistema ang lahat.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [mga donation fund](funds.md) para makapagtukoy ng pupuntahan ang mga regalo ng mga donor
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin sa test mode)
- Ihanda ang iyong B1 Admin login credentials

</div>

## Pag-set Up ng Stripe

1. Gumawa ng account sa [stripe.com](https://stripe.com) kung wala ka pa nito. Siguraduhing **i-activate ang iyong account** at alisin ito sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. Pumunta sa **Settings** at buksan ang seksyong **Giving**.
6. I-click ang **Edit** sa seksyong **Giving**.
7. Itakda ang **Provider** sa **Stripe**.
8. I-paste ang iyong Publishable Key sa field na **Public Key**.
9. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (isang beses lang ito makikita, kaya mag-save ng backup).
10. I-paste ang Secret Key sa field na **Secret Key** at i-click ang **Save**.

:::warning
Isang beses lang ipinapakita ang iyong Stripe Secret Key. Kopyahin ito sa ligtas na lugar bago umalis sa Stripe dashboard. Kapag nawala ito, kailangan mong gumawa ng bagong key.
:::

## Pagpili ng Iyong Currency

Pagkatapos piliin ang Stripe bilang provider, lalabas ang dropdown na **Currency** sa tabi ng iyong API keys. Piliin ang currency na tumutugma sa settlement currency ng iyong Stripe account para tama ang pagsingil sa mga donasyon.

Kabilang sa mga sinusuportahang currency ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari mong kumpirmahin o palitan ang default currency ng iyong account sa [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pipiliin mo rito ang gagamitin para sa one-time na donasyon, recurring subscription, kalkulasyon ng bayarin, at mga ulat ng donasyon. Kung magpapalit ka ng currency sa hinaharap, tanging mga bagong donasyon at subscription lang ang gagamit ng bagong currency -- ang mga umiiral nang recurring na regalo ay magpapatuloy sa currency kung saan sila ginawa.
:::

:::warning
Siguraduhing naka-configure ang iyong Stripe account para tumanggap ng currency na pipiliin mo. Kung hindi sinusuportahan ng iyong Stripe account ang napiling currency, mabibigo ang mga donasyon sa checkout.
:::

## Apple Pay at Google Pay

Ang mga simbahang gumagamit ng Stripe ay awtomatikong nakakakuha ng butones na Apple Pay at Google Pay sa pampublikong giving page. Lumalabas ang mga butones sa itaas ng card fields para sa one-time na regalo kapag napili na ng donor ang fund at halaga, at lumalabas lamang kapag may naka-set up na wallet ang browser o device ng donor. Gumagamit pa rin ng card o bank fields ang recurring na regalo.

Walang kailangang i-set up para sa Google Pay. Kailangang nakarehistro sa Stripe ang domain ng iyong giving page para sa Apple Pay; irerehistro ito ng B1 sa unang pag-load ng giving page sa iyong domain. Kung hindi lumabas ang Apple Pay button sa iPhone, tingnan ang **Settings > Payment method domains** sa iyong Stripe Dashboard at tiyaking nakalista at beripikado ang iyong `yoursubdomain.b1.church` (o custom) na domain.

## Mga Anonymous na Regalo

Maaaring lagyan ng check ng mga donor sa pampublikong giving page ang **Give anonymously**. Ang anonymous na regalo ay naitatala nang walang nakakabit na donor, napupunta pa rin sa fund na pinili ng donor, at lumalabas bilang **Anonymous** sa iyong mga batch at ulat. Kailangan pa rin ang email ng donor para maipadala ang resibo, pero walang nilikhang person record. Isang beses lang ang mga anonymous na regalo at hindi lumalabas sa anumang giving statement.

## Mga Nabigong Recurring na Regalo

Kapag nabigo ang isang recurring na regalo sa Stripe (halimbawa, dahil expired o tinanggihan ang card), lalabas ang nabigong singil sa ilalim ng **Donations > Failed Gifts** kasama ang donor, halaga, petsa, at ang dahilan na ibinigay ng gateway. I-click ang **Retry** para subukang muli ang singil kapag na-update na ng donor ang kanyang paraan ng pagbabayad.

Nagpapadala rin ang B1 ng email sa donor kapag nabigo ang singil, at muli pagkalipas ng tatlo at pitong araw kung hindi pa rin ito naipapasa, kasama ang link para i-update ang kanyang paraan ng pagbabayad sa B1.church.

:::info
Kung na-set up mo ang Stripe bago pa umiral ang feature na ito, buksan ang **Settings** > **Giving**, i-click ang edit, at i-click ang **Save** nang isang beses. Magre-refresh nito ang Stripe webhook para maiulat sa B1 ang mga nabigong singil.
:::

## Pagdaragdag ng Donation Page sa Iyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang **Settings** na icon.
3. I-click ang **Add Tab**.
4. Piliin ang **Donation** bilang uri.
5. Maglagay ng pangalan para sa tab (halimbawa, "Give") at i-click ang **Save**.
6. Opsyonal, palitan ang icon ng tab -- i-type ang "Giv" sa icon search para sa icon na may kaugnayan sa giving.

Live na ang iyong donation page. Maaaring bisitahin ito ng mga miyembro sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link

Para mahanap ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang **Settings** na icon para makita ang iyong subdomain. Ang iyong donation link ay may ganitong format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin para malaman ng mga miyembro kung saan sila maaaring mag-donate online.

### Mga Link na May Nakatakdang Fund at Halaga

Para idiretso ang mga donor sa isang partikular na fund, pumunta sa **Donations > Funds** at i-click ang **Giving Link** sa fund. Opsyonal na maglagay ng halaga, pagkatapos kopyahin ang link. Ipinapakita rin ng dialog ang QR code para sa parehong link; i-click ang **Download PNG** para i-save ito para sa bulletin, slide, o poster. Kapag binuksan ng donor ang link o na-scan ang code, nakapili na ang fund at halaga sa giving page. Ganito ang anyo ng link:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gumagana rin ang parehong parameter sa **Donate Link** element ng website builder.

## Mga Notification ng Donasyon

Nagpapadala ang Stripe ng email notification sa tuwing may natatanggap na donasyon. Para baguhin ang email address ng notification, pumunta sa Stripe dashboard, i-click ang iyong profile sa kanang itaas, piliin ang **Profile**, at i-update ang iyong email address.

## Mga Opsyon sa Processing Fee

Maaari mong i-configure ang iyong giving page para opsyonal na sagutin ng mga donor ang processing fee para buong halaga ng donasyon ang matanggap ng iyong simbahan. Pinamamahalaan ang setting na ito sa mga setting ng simbahan mo sa loob ng B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng maliit na test donation para makumpirmang gumagana ang lahat bago ianunsyo ang online giving sa iyong kongregasyon.
:::

## Pag-set Up ng Kingdom Funding

Ang Kingdom Funding ay isang Kristiyanong payment processor na sumusuporta sa credit/debit card at ACH bank transfer. Kung nakarehistro ang iyong simbahan sa Kingdom Funding, maaari mo itong ikonekta bilang iyong giving gateway.

:::info
Kasalukuyang beta pa ang integration ng Kingdom Funding. Makipag-ugnayan sa iyong B1 account representative para ma-enable ito para sa iyong simbahan.
:::

1. Mag-sign up o mag-log in sa [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Kunin ang iyong **Security Key** (public) at **Private Key** mula sa merchant portal ng Kingdom Funding.
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang iyong Security Key sa field na **Security Key** at ang iyong Private Key sa field na **Private Key**.
6. Itakda ang **Webhook Key** na natanggap mo mula sa Kingdom Funding, at kopyahin ang ipinapakitang webhook URL sa iyong merchant settings ng Kingdom Funding para maabisuhan ng Kingdom Funding ang B1 tungkol sa mga natapos na transaksyon.
7. I-save.

Kapag nakakonekta na, makikita ng mga miyembro ang card/bank toggle sa donation page at makakapagbigay sila sa pamamagitan ng credit card o ACH transfer.

## Mga Butones ng PayPal at Venmo

Ang mga simbahang gumagamit ng **PayPal** bilang provider ay nakakakuha ng butones na **PayPal** at **Venmo** sa itaas ng card fields sa giving page para sa one-time na regalo. Ang mga donor na mag-click nito ay makukumpleto ang bayad sa PayPal window, at ire-record ang regalo tulad ng anumang ibang online na donasyon. Lumalabas lang ang Venmo para sa mga donor sa Estados Unidos na gumagamit ng device na itinuturing na kwalipikado ng PayPal. Gumagamit pa rin ng card fields ang recurring na regalo.

## Pag-set Up ng Paystack (Africa)

Hindi nagbubukas ng account ang Stripe para sa mga simbahan sa Ghana, Nigeria, Kenya, South Africa, o Côte d'Ivoire. Nagbubukas ang [Paystack](https://paystack.com) ng account para sa kanila, at tumatanggap ito ng lokal na card, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer, at USSD -- nagbabayad ang mga donor sa lokal mong currency (GHS, NGN, KES, ZAR, XOF).

1. Magparehistro sa [paystack.com](https://paystack.com) gamit ang sertipiko ng business registration ng iyong simbahan at lokal na bank account, at kumpletuhin ang activation (go-live) review ng Paystack.
2. Sa Paystack Dashboard, buksan ang **Settings → API Keys & Webhooks** at kopyahin ang **Public Key** at **Secret Key** (gamitin ang live keys, hindi ang test keys).
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Paystack**, i-paste ang Public Key at Secret Key, at piliin ang iyong **Currency**.
5. Kopyahin ang **webhook URL** na nakalagay sa ilalim ng provider, bumalik sa Paystack Dashboard (**Settings → API Keys & Webhooks**) at i-paste ito sa field na **Webhook URL**. Ganito naitatala ang mga recurring na regalo at mobile money na bayad.
6. I-save.

Kinukumpleto ng mga donor ang bayad sa isang ligtas na Paystack window at maaari nilang piliin doon ang card, mobile money, o bank transfer. Mga paalala:

- **Kailangan ng card ang recurring na regalo**; hindi awtomatikong masisingil muli ang mobile money, kaya isang beses lang na mobile money na regalo ang pinapayagan ng Paystack.
- Maaaring kanselahin mula sa B1 ang mga recurring na regalo sa Paystack pero hindi ito mapapahinto o mae-edit -- kanselahin at gumawa ng bago para mabago ang halaga.
- Ang default na **Processing Fee** ay sumasalamin sa lokal na card rate ng Paystack para sa iyong currency; i-edit ang mga ito kung iba ang napagkasunduan mong rate.

## Mga Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) para hilahin ang mga online na transaksyon sa B1 Admin kung hindi ito awtomatikong nagsi-sync
- Tingnan ang iyong [Donation Reports](donation-reports.md) para i-verify na lumalabas nang tama ang mga online na donasyon
- Gumawa ng [Giving Statements](giving-statements.md) na kasama ang parehong online at offline na donasyon
