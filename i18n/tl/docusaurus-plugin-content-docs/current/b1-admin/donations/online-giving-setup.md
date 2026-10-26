---
title: "Pag-set Up ng Online Giving"
---

# Pag-set Up ng Online Giving

<div class="article-intro">

Nakakonekta ang B1 Admin sa **Stripe**, **PayPal**, **Kingdom Funding**, at **Paystack** (para sa mga simbahan sa Africa) para makapagbigay online ang iyong mga miyembro sa pamamagitan ng iyong B1.church site. Kapag na-configure na, awtomatikong lumalabas ang mga online na donasyon sa iyong mga talaan ng donasyon kasama ng mga regalong manu-manong inilagay, kaya nananatili ang lahat sa iisang sistema.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [mga pondo ng donasyon](funds.md) para mapili ng mga donor ang paglalaanan ng kanilang regalo
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin sa test mode)
- Ihanda ang iyong login credentials sa B1 Admin

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
9. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (isang beses lang ito makikita, kaya i-save ang backup).
10. I-paste ang Secret Key sa field na **Secret Key** at i-click ang **Save**.

:::warning
Isang beses lang ipinapakita ang iyong Stripe Secret Key. Kopyahin ito sa ligtas na lugar bago umalis sa Stripe dashboard. Kapag nawala ito, kailangan mong gumawa ng bagong key.
:::

## Pagpili ng Iyong Currency

Pagkatapos piliin ang Stripe bilang provider, lalabas ang dropdown na **Currency** sa tabi ng iyong API keys. Piliin ang currency na tumutugma sa settlement currency ng iyong Stripe account para tama ang pagsingil sa mga donasyon.

Kabilang sa mga sinusuportahang currency ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari mong kumpirmahin o palitan ang default na currency ng iyong account sa iyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pipiliin mo rito ay gagamitin para sa one-time na donasyon, paulit-ulit na subscription, kalkulasyon ng bayarin, at mga ulat ng donasyon. Kung palitan mo ang currency sa hinaharap, ang mga bagong donasyon at subscription lamang ang gagamit ng bagong currency -- ang mga umiiral nang paulit-ulit na regalo ay magpapatuloy sa currency kung saan sila ginawa.
:::

:::warning
Siguraduhing naka-configure ang iyong Stripe account para tumanggap ng currency na pipiliin mo. Kung hindi sinusuportahan ng iyong Stripe account ang napiling currency, mabibigo ang mga donasyon sa checkout.
:::

## Apple Pay at Google Pay

Ang mga simbahang gumagamit ng Stripe ay awtomatikong makakakuha ng mga button ng Apple Pay at Google Pay sa pampublikong giving page. Lumalabas ang mga button sa itaas ng mga card field para sa one-time na regalo kapag napili na ng donor ang pondo at halaga, at lumalabas lamang kapag may naka-set up na wallet ang browser o device ng donor. Gumagamit pa rin ng card o bank field ang mga paulit-ulit na regalo.

Hindi kailangan ng setup ang Google Pay. Kailangang nakarehistro sa Stripe ang domain ng iyong giving page para sa Apple Pay; irerehistro ito ng B1 sa unang beses na mabuksan ang giving page sa iyong domain. Kung hindi lumabas ang Apple Pay button sa iPhone, tingnan ang **Settings > Payment method domains** sa iyong Stripe Dashboard at kumpirmahing nakalista at beripikado ang iyong `yoursubdomain.b1.church` (o custom) na domain.

## Mga Anonymous na Regalo

Maaaring lagyan ng check ng mga donor sa pampublikong giving page ang **Give anonymously**. Ang anonymous na regalo ay naitatala nang walang nakakabit na donor, napupunta pa rin sa pondong pinili ng donor, at lumalabas bilang **Anonymous** sa iyong mga batch at ulat. Kailangan pa rin ang email ng donor para maipadala ang resibo, pero walang nalikhang person record. Ang mga anonymous na regalo ay one-time lamang at hindi lumalabas sa anumang giving statement.

## Mga Nabigong Paulit-ulit na Regalo

Kapag nabigo ang paulit-ulit na regalo sa Stripe (halimbawa, dahil expired o tinanggihan ang card), lalabas ang nabigong singil sa ilalim ng **Donations > Failed Gifts** kasama ang donor, halaga, petsa, at ang dahilang ibinigay ng gateway. I-click ang **Retry** para subukang muli ang singil kapag na-update na ng donor ang kanyang paraan ng pagbabayad.

Nagpapadala rin ang B1 ng email sa donor kapag nabigo ang singil, at muli pagkatapos ng tatlo at pitong araw kung hindi pa rin ito naipapasa, kasama ang link para i-update ang kanyang paraan ng pagbabayad sa B1.church.

:::info
Kung na-set up ng iyong simbahan ang Stripe bago pa umiral ang feature na ito, buksan ang **Settings** > **Giving**, i-click ang edit, at i-click ang **Save** nang isang beses. Nire-refresh nito ang Stripe webhook para maiulat sa B1 ang mga nabigong singil.
:::

## Pagdagdag ng Donation Page sa Iyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang icon na **Settings**.
3. I-click ang **Add Tab**.
4. Piliin ang **Donation** bilang uri.
5. Maglagay ng pangalan para sa tab (hal. "Give") at i-click ang **Save**.
6. Opsyonal, palitan ang icon ng tab -- i-type ang "Giv" sa icon search para sa icon na may kinalaman sa pagbibigay.

Live na ang iyong donation page. Maaaring bisitahin ito ng mga miyembro sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link

Para mahanap ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang icon na **Settings** para makita ang iyong subdomain. Sumusunod ang iyong donation link sa format na ito:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin para malaman ng mga miyembro kung saan sila maaaring magbigay online.

### Mga Link na May Nakatakdang Pondo at Halaga

Para idiretso ang mga donor sa partikular na pondo, pumunta sa **Donations > Funds** at i-click ang **Giving Link** sa pondo. Opsyonal na maglagay ng halaga, pagkatapos kopyahin ang link. Kapag binuksan ito ng donor, napili na ang pondo at halaga sa giving page. Ganito ang anyo ng link:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gumagana rin ang parehong parameter sa **Donate Link** element ng website builder.

## Mga Abiso sa Donasyon

Nagpapadala ang Stripe ng email na abiso sa tuwing may natatanggap na donasyon. Para baguhin ang email address ng abiso, pumunta sa Stripe dashboard, i-click ang iyong profile sa kanang itaas, piliin ang **Profile**, at i-update ang iyong email address.

## Mga Opsyon sa Processing Fee

Maaari mong i-configure ang iyong giving page para payagan ang mga donor na opsyonal na sagutin ang mga processing fee para makatanggap ang iyong simbahan ng buong halaga ng donasyon. Ang setting na ito ay pinamamahalaan sa mga setting ng simbahan mo sa loob ng B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng maliit na test donation para kumpirmahing gumagana ang lahat bago ianunsyo ang online giving sa iyong kongregasyon.
:::

## Pag-set Up ng Kingdom Funding

Ang Kingdom Funding ay isang Kristiyanong payment processor na sumusuporta sa credit/debit card at ACH bank transfer. Kung nakarehistro ang iyong simbahan sa Kingdom Funding, maaari mo itong ikonekta bilang iyong giving gateway.

:::info
Kasalukuyang nasa beta ang integrasyon ng Kingdom Funding. Makipag-ugnayan sa iyong B1 account representative para ito ma-enable para sa iyong simbahan.
:::

1. Mag-sign up o mag-log in sa [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Kunin ang iyong **Security Key** (public) at **Private Key** mula sa Kingdom Funding merchant portal.
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang iyong Security Key sa field na **Security Key** at ang iyong Private Key sa field na **Private Key**.
6. Itakda ang **Webhook Key** na natanggap mo mula sa Kingdom Funding, at kopyahin ang ipinapakitang webhook URL sa iyong Kingdom Funding merchant settings para maabisuhan ng Kingdom Funding ang B1 tungkol sa mga natapos na transaksyon.
7. I-save.

Kapag nakakonekta na, makikita ng mga miyembro ang toggle na card/bank sa donation page at maaaring magbigay sa pamamagitan ng credit card o ACH transfer.

## PayPal at Venmo Buttons

Ang mga simbahang gumagamit ng **PayPal** bilang provider ay nagkakaroon ng mga button na **PayPal** at **Venmo** sa itaas ng mga card field sa giving page para sa one-time na regalo. Ang mga donor na mag-click sa isa ay makukumpleto ang bayad sa isang PayPal window, at maitatala ang regalo tulad ng anumang ibang online na donasyon. Lumalabas ang Venmo para lamang sa mga donor sa Estados Unidos na gumagamit ng device na itinuturing na karapat-dapat ng PayPal. Gumagamit pa rin ng card field ang mga paulit-ulit na regalo.

## Pag-set Up ng Paystack (Africa)

Hindi nagbubukas ng account ang Stripe para sa mga simbahan sa Ghana, Nigeria, Kenya, South Africa, o Côte d'Ivoire. Nagbubukas ang [Paystack](https://paystack.com) ng account para sa kanila, at tumatanggap ito ng lokal na card, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer, at USSD -- nagbabayad ang mga donor sa lokal na currency (GHS, NGN, KES, ZAR, XOF).

1. Magparehistro sa [paystack.com](https://paystack.com) gamit ang sertipiko ng pagpaparehistro ng negosyo ng iyong simbahan at lokal na bank account, at kumpletuhin ang activation (go-live) review ng Paystack.
2. Sa Paystack Dashboard, buksan ang **Settings → API Keys & Webhooks** at kopyahin ang **Public Key** at **Secret Key** (gamitin ang live keys, hindi ang test keys).
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Paystack**, i-paste ang Public Key at Secret Key, at piliin ang iyong **Currency**.
5. Kopyahin ang **webhook URL** na nakalagay sa ilalim ng provider, bumalik sa Paystack Dashboard (**Settings → API Keys & Webhooks**), at i-paste ito sa field na **Webhook URL**. Ito ang paraan para maitala ang mga paulit-ulit na regalo at mobile money payment.
6. I-save.

Nakukumpleto ng mga donor ang kanilang bayad sa isang ligtas na Paystack window at maaaring pumili ng card, mobile money, o bank transfer doon. Mga tala:

- **Kailangan ng card ang mga paulit-ulit na regalo**; hindi awtomatikong maisisingil muli ang mobile money, kaya isang beses lang na mobile money gift ang pinapayagan ng Paystack.
- Maaaring kanselahin mula sa B1 ang mga paulit-ulit na regalo sa Paystack, pero hindi ito mapapahinto o mababago -- kanselahin at gumawa ng bago para baguhin ang halaga.
- Ang mga default na **Processing Fee** ay sumasalamin sa lokal na card rate ng Paystack para sa iyong currency; i-edit ang mga ito kung iba ang napagkasunduan mong rate.

## Mga Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) para hilahin ang mga online na transaksyon papunta sa B1 Admin kung hindi awtomatikong nagsi-sync ang mga ito
- Tingnan ang iyong [Donation Reports](donation-reports.md) para i-verify na tama ang paglabas ng mga online na donasyon
- Gumawa ng [Giving Statements](giving-statements.md) na kasama ang parehong online at offline na donasyon
