---
title: "Pag-set Up ng Online Giving"
description: "Ikonekta ang Stripe, Kingdom Funding, o Paystack sa B1 Admin para makapagbigay online ang mga miyembro sa iyong B1.church site at maisi-sync ang mga handog sa iyong mga talaan."
---

# Pag-set Up ng Online Giving

<div class="article-intro">

Nakakonekta ang B1 Admin sa **Stripe**, **Kingdom Funding**, at **Paystack** (para sa mga simbahan sa Africa) para makapagbigay online ang iyong mga miyembro sa pamamagitan ng iyong B1.church site. Kapag na-configure na, awtomatikong lumilitaw sa iyong mga talaan ng donasyon ang mga online na donasyon kasama ng mga manu-manong inilagay na handog, kaya nasa iisang sistema ang lahat.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [mga donation fund](funds.md) para maitakda ng mga donor kung saan mapupunta ang kanilang handog
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin sa test mode)
- Ihanda ang iyong login credentials sa B1 Admin

</div>

## Pag-set Up ng Stripe {#setting-up-stripe}

1. Gumawa ng account sa [stripe.com](https://stripe.com) kung wala ka pang account. Siguraduhing **i-activate ang iyong account** at alisin ito sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. Pumunta sa **Settings** at buksan ang seksyong **Giving**.
6. I-click ang **Edit** sa seksyong **Giving**.
7. Itakda ang **Provider** sa **Stripe**.
8. I-paste ang iyong Publishable Key sa **Public Key** field.
9. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (isang beses lamang ito makikita, kaya mag-save ng backup).
10. I-paste ang Secret Key sa **Secret Key** field at i-click ang **Save**.

:::warning
Isang beses lamang ipinapakita ang iyong Stripe Secret Key. Kopyahin ito sa ligtas na lugar bago umalis sa Stripe dashboard. Kung mawala ito, kailangan mong gumawa ng bagong key.
:::

## Pagpili ng Iyong Currency {#choosing-your-currency}

Pagkatapos piliin ang Stripe bilang provider, lalabas ang **Currency** dropdown sa tabi ng iyong API key. Piliin ang currency na tumutugma sa settlement currency ng iyong Stripe account para tama ang pagsingil sa mga donasyon.

Kung wala ka pang naka-save na currency, nagsisimula ang dropdown sa currency ng bansa ng iyong simbahan mula sa sign-up sa halip na US dollars. Tiyaking tumutugma ito sa iyong Stripe account bago mag-save.

Kung hindi tumatanggap ng online na handog ang iyong simbahan, iwanang nakatakda sa **None** ang **Provider** at pumili pa rin ng **Currency** -- kasama na sa listahan ang lahat ng currency, na may note na "The currency your church records gifts in." Ang mga handog na manu-manong inilagay sa mga batch ay itatala sa currency na iyon, at ipapakita rin doon ang mga kabuuan ng giving.

Kabilang sa mga suportadong currency ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL, at PHP. Maaari mong kumpirmahin o palitan ang default na currency ng iyong account sa iyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pipiliin mo rito ay ginagamit sa isang beses na donasyon, recurring subscription, kalkulasyon ng bayarin, at mga ulat ng donasyon. Kung palitan mo ang currency sa hinaharap, tanging ang mga bagong donasyon at subscription ang gagamit ng bagong currency -- ang mga umiiral nang recurring gift ay magpapatuloy sa currency kung saan sila ginawa.
:::

:::warning
Siguraduhing naka-configure ang iyong Stripe account para tumanggap ng currency na pipiliin mo. Kung hindi sinusuportahan ng iyong Stripe account ang napiling currency, mabibigo ang mga donasyon sa checkout.
:::

## Apple Pay at Google Pay {#apple-pay-and-google-pay}

Ang mga simbahang nasa Stripe ay awtomatikong nakakakuha ng mga button na Apple Pay at Google Pay sa pampublikong giving page. Lumilitaw ang mga button sa itaas ng card field para sa isang beses na handog kapag napili na ng donor ang fund at halaga, at lumilitaw lamang kapag may naka-set up na wallet ang browser o device ng donor. Gumagamit pa rin ng card o bank field ang mga recurring gift.

Hindi nangangailangan ng anumang setup ang Google Pay. Kailangang nakarehistro sa Stripe ang domain ng iyong giving page para sa Apple Pay; nirerehistro ito ng B1 sa unang beses na mabuksan ang giving page sa iyong domain. Kung hindi lumitaw ang Apple Pay button sa iPhone, tingnan ang **Settings > Payment method domains** sa iyong Stripe Dashboard at kumpirmahing nakalista at na-verify ang iyong `yoursubdomain.b1.church` (o custom) na domain.

## Mga Anonymous na Handog {#anonymous-gifts}

Maaaring lagyan ng check ng mga donor sa pampublikong giving page ang **Give anonymously**. Ang anonymous na handog ay naitatala nang walang nakakabit na donor, napupunta pa rin sa fund na pinili ng donor, at lumalabas bilang **Anonymous** sa iyong mga batch at ulat. Kailangan pa rin ang email ng donor para maipadala ang resibo, pero walang person record na nalilikha. Ang anonymous na handog ay para lamang sa isang beses at hindi lumalabas sa anumang giving statement.

## Mga Nabigong Recurring Gift {#failed-recurring-gifts}

Kapag nabigo ang isang recurring gift sa Stripe (halimbawa, dahil expired o tinanggihan ang card), lalabas ang nabigong singil sa ilalim ng **Donations > Failed Gifts** kasama ang donor, halaga, petsa, at dahilan na ibinigay ng gateway. I-click ang **Retry** para subukang singilin muli kapag na-update na ng donor ang kanyang paraan ng pagbabayad.

Nagpapadala rin ang B1 ng email sa donor kapag nabigo ang singil, at muli pagkalipas ng tatlo at pitong araw kung hindi pa ito nakakalusot, kasama ang link para i-update ang kanyang paraan ng pagbabayad sa B1.church.

:::info
Kung na-set up ng iyong simbahan ang Stripe bago pa umiral ang feature na ito, buksan ang **Settings** > **Giving**, i-click ang edit, at i-click ang **Save** nang isang beses. Magre-refresh nito ang Stripe webhook para maiulat sa B1 ang mga nabigong singil.
:::

## Pagdaragdag ng Donation Page sa Iyong B1.church Site {#adding-a-donation-page-to-your-b1church-site}

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang **Settings** icon.
3. I-click ang **Add Tab**.
4. Piliin ang **Donation** bilang uri.
5. Maglagay ng pangalan para sa tab (hal., "Give") at i-click ang **Save**.
6. Opsyonal, palitan ang icon ng tab -- i-type ang "Giv" sa icon search para sa icon na may kinalaman sa giving.

Live na ang iyong donation page. Makakabisita rito ang mga miyembro sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link {#sharing-your-giving-link}

Para mahanap ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang **Settings** icon para makita ang iyong subdomain. Sumusunod ang iyong donation link sa ganitong format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin para malaman ng mga miyembro kung saan sila maaaring magbigay online.

### Mga Link na May Nakatakdang Fund at Halaga {#links-with-a-preset-fund-and-amount}

Para dalhin ang mga donor nang direkta sa partikular na fund, pumunta sa **Donations > Funds** at i-click ang **Giving Link** sa fund. Opsyonal na maglagay ng halaga, pagkatapos kopyahin ang link. Nagpapakita rin ang dialog ng QR code para sa parehong link; i-click ang **Download PNG** para i-save ito para sa bulletin, slide, o poster. Kapag binuksan ng donor ang link o na-scan ang code, napili na ang fund at halaga sa giving page. Ganito ang anyo ng link:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gumagana rin ang parehong parameter sa **Donate Link** element ng website builder.

## Mga Notification ng Donasyon {#donation-notifications}

Nagpapadala ang Stripe ng email notification sa tuwing may natatanggap na donasyon. Para palitan ang email address para sa notification, pumunta sa Stripe dashboard, i-click ang iyong profile sa kanang itaas, piliin ang **Profile**, at i-update ang iyong email address.

## Mga Opsyon sa Processing Fee {#processing-fee-options}

Maaari mong payagan ang mga donor na opsyonal na sagutin ang processing fee para makuha ng iyong simbahan ang buong halaga ng donasyon. Sa **Settings > Giving**, i-click ang edit at i-on ang **Transaction Fee** switch sa tabi ng iyong mga key. Nasa ilalim ng **Fees & statements** ang mga rate na ginagamit sa pagkuwenta ng bayarin: **Flat Rate** at **Transaction Fee** para sa card, at para sa Stripe bank (ACH) na handog, isang porsyento at **Hard limit**. Nagsisimula ang mga ito sa karaniwang rate ng iyong provider; palitan ang mga ito kung iba ang napagkasunduan mong rate, pagkatapos i-click ang **Save**.

:::tip
Pagkatapos ng setup, gumawa ng maliit na test donation para makumpirmang gumagana ang lahat bago ianunsyo ang online giving sa iyong kongregasyon.
:::

## Pag-set Up ng Kingdom Funding {#setting-up-kingdom-funding}

Ang Kingdom Funding ay isang Kristiyanong payment processor na sumusuporta sa credit/debit card at ACH bank transfer. Kung nakarehistro ang iyong simbahan sa Kingdom Funding, maaari mo itong ikonekta bilang iyong giving gateway.

:::info
Nasa beta pa ang integrasyon ng Kingdom Funding. Makipag-ugnayan sa iyong B1 account representative para ito ma-enable para sa iyong simbahan.
:::

1. Mag-sign up o mag-log in sa [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Kunin ang iyong **Tokenization Key** at **Source Key** mula sa Kingdom Funding dashboard.
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang mga key sa **Tokenization Key** at **Source Key** field.
6. Ilagay ang **Webhook Key** (ang webhook signing secret mula sa Kingdom Funding control panel), at kopyahin ang webhook URL na nakalagay sa ilalim ng provider papunta sa iyong Kingdom Funding settings para maipaalam ng Kingdom Funding sa B1 ang mga natapos na transaksyon.
7. I-click ang **Save**.

Kapag nakakonekta na, makikita ng mga miyembro ang card/bank toggle sa donation page at makakapagbigay sila sa pamamagitan ng credit card o ACH transfer.

## Mga Button ng PayPal at Venmo {#paypal-and-venmo-buttons}

Hindi na iniaalok ang PayPal sa listahan ng **Provider** para sa mga bagong setup. Ang mga simbahang nakakonekta na sa **PayPal** ay nakakakuha ng mga button na **PayPal** at **Venmo** sa itaas ng card field sa giving page para sa isang beses na handog. Kapag nag-click ang donor ng isa rito, tatapusin nila ang bayad sa PayPal window, at itatala ang handog gaya ng anumang ibang online na donasyon. Lumilitaw ang Venmo para lamang sa mga donor sa United States na nasa device na itinuturing na karapat-dapat ng PayPal. Gumagamit pa rin ng card field ang mga recurring gift.

## Pag-set Up ng Paystack (Africa) {#setting-up-paystack-africa}

Hindi nagbubukas ng account ang Stripe para sa mga simbahan sa Ghana, Nigeria, Kenya, South Africa, o Côte d'Ivoire. Nagbubukas ang [Paystack](https://paystack.com) ng account para sa kanila, at tumatanggap ito ng lokal na card, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer, at USSD -- nagbabayad ang mga donor sa lokal mong currency (GHS, NGN, KES, ZAR, XOF).

1. Magparehistro sa [paystack.com](https://paystack.com) gamit ang sertipiko ng pagpaparehistro ng negosyo ng iyong simbahan at lokal na bank account, at kumpletuhin ang activation (go-live) review ng Paystack.
2. Sa Paystack Dashboard, buksan ang **Settings → API Keys & Webhooks** at kopyahin ang **Public Key** at **Secret Key** (gamitin ang live key, hindi ang test key).
3. Sa B1 Admin, pumunta sa **Settings**, buksan ang seksyong **Giving** at i-click ang edit.
4. Itakda ang **Provider** sa **Paystack**, i-paste ang Public Key at Secret Key, at piliin ang iyong **Currency**.
5. Kopyahin ang **webhook URL** na nakalagay sa ilalim ng provider, bumalik sa Paystack Dashboard (**Settings → API Keys & Webhooks**) at i-paste ito sa **Webhook URL** field. Ganito naitatala ang mga recurring gift at mobile money payment.
6. I-save.

Kinukumpleto ng mga donor ang bayad sa isang ligtas na Paystack window at maaaring pumili doon ng card, mobile money, o bank transfer. Mga tala:

- **Kailangan ng card ang mga recurring gift**; hindi awtomatikong masisingil muli ang mobile money, kaya isang beses na mobile money gift lamang ang pinapayagan ng Paystack.
- Maaaring kanselahin mula sa B1 ang mga recurring gift sa Paystack pero hindi mapapause o ma-edit -- kanselahin at gumawa ng bago kung babaguhin ang halaga.
- Ang mga default ng **Processing Fee** ay nagpapakita ng lokal na card rate ng Paystack para sa iyong currency; palitan ang mga ito kung iba ang napagkasunduan mong rate.

## Mga Susunod na Hakbang {#next-steps}

- Gamitin ang [Stripe Import](stripe-import.md) para hilahin ang mga online na transaksyon papunta sa B1 Admin kung hindi awtomatikong nagsi-sync ang mga ito
- Tingnan ang iyong [Donation Reports](donation-reports.md) para i-verify na lumalabas nang tama ang mga online na donasyon
- Gumawa ng [Giving Statements](giving-statements.md) na kasama ang parehong online at offline na donasyon
