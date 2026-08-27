---
title: "Online Giving Setup"
---

# Online Giving Setup

<div class="article-intro">

Ang B1 Admin ay integrated sa **Stripe**, **PayPal**, **Kingdom Funding**, at **Paystack** (para sa mga simbahan sa Africa) upang ang iyong mga miyembro ay maaaring magbigay online sa pamamagitan ng iyong B1.church site. Kapag na-configure na, ang mga online donations ay awtomatikong lumilitaw sa iyong mga donation records kasama ang manu-manong ipinakilalang mga regalo, pinapanatiling lahat sa isang sistema.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- I-setup ang iyong [donation funds](funds.md) upang ang mga donor ay maaaring magtukoy ng kanilang mga regalo
- Lumikha ng isang Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (ilabas ito mula sa test mode)
- Magkaroon ng handa ang iyong B1 Admin login credentials

</div>

## Setting Up Stripe

1. Lumikha ng account sa [stripe.com](https://stripe.com) kung wala ka nang isa. Siguraduhin na **i-activate ang iyong account** at ilabas ito mula sa test mode.
2. Sa Stripe, magpunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. I-click ang **Church** sa tuktok na navigation, pagkatapos i-click ang **Edit Church Settings**.
6. I-click ang edit icon sa tabi ng **Church Settings**.
7. Mag-scroll pababa sa **Giving** section.
8. Itakda ang **Provider** sa **Stripe**.
9. I-paste ang iyong Publishable Key sa **Public Key** field.
10. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (maaari mo lamang tingnan ito minsan, kaya mag-save ng backup).
11. I-paste ang Secret Key sa **Secret Key** field at i-click ang **Save**.

:::warning
Ang iyong Stripe Secret Key ay ipinakita lamang minsan. Kopyahin ito sa isang ligtas na lokasyon bago mag-navigate sa malayo mula sa Stripe dashboard. Kung mawawala mo ito, kailangan mong lumikha ng isang bagong key.
:::

## Choosing Your Currency

Pagkatapos piliin ang Stripe bilang iyong provider, lumilitaw ang isang **Currency** dropdown sa tabi ng iyong API keys. Pumili ng currency na tumutugma sa settlement currency ng iyong Stripe account upang ang mga donasyon ay ma-charge nang tama.

Ang mga sinusuportadong currency ay kasama ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari mong kumpirmahin o baguhin ang default currency ng iyong account sa iyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na iyong pinili dito ay ginagamit para sa one-time donations, recurring subscriptions, fee calculations, at donation reports. Kung magpalit ka ng currency mamaya, lamang ang mga bagong donations at subscriptions ay gagamit ng bagong currency -- ang mga umiiral na recurring gifts ay patuloy sa currency na ginawa nila.
:::

:::warning
Siguraduhin na ang iyong Stripe account ay configured na tumanggap ng currency na iyong pinili. Kung ang iyong Stripe account ay hindi sumusuporta sa napiling currency, ang mga donasyon ay mabibigo sa checkout.
:::

## Adding a Donation Page to Your B1.church Site

1. Magpunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang **Settings** icon.
3. I-click ang **Add Tab**.
4. Pumili ng **Donation** bilang uri.
5. Magpasok ng isang pangalan para sa tab (hal., "Give") at i-click ang **Save**.
6. Opsyonal, baguhin ang tab icon -- mag-type ng "Giv" sa icon search para sa isang giving-related icon.

Ang iyong donation page ay live na ngayon. Ang mga miyembro ay maaaring bisitahin ito sa `yoursubdomain.b1.church/donate`.

## Sharing Your Giving Link

Upang mahanap ang iyong giving URL, magpunta sa **B1 Admin** at i-click ang **Settings** icon upang makita ang iyong subdomain. Ang iyong donation link ay sumusunod sa format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin upang malaman ng mga miyembro kung nasaan dapat mag-donate online.

## Donation Notifications

Ang Stripe ay nagpapadala ng email notification sa bawat panahon na nakatanggap ng isang donasyon. Upang baguhin ang notification email address, magpunta sa Stripe dashboard, i-click ang iyong profile sa tuktok na kanang bahagi, pumili ng **Profile**, at i-update ang iyong email address.

## Processing Fee Options

Maaari mong i-configure ang iyong giving page upang hayaan ang mga donor na opsyonal na suportahan ang mga processing fee upang ang iyong simbahan ay makatanggap ng buong halaga ng donasyon. Ang setting na ito ay pinamamahalaan sa iyong church settings sa loob ng B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng isang maliit na test donation upang kumpirmahin na ang lahat ay gumagana bago ipahayag ang online giving sa iyong congregasyon.
:::

## Setting Up Kingdom Funding

Ang Kingdom Funding ay isang Christian payment processor na sumusuporta sa credit/debit cards at ACH bank transfers. Kung ang iyong simbahan ay naka-enroll sa Kingdom Funding, maaari mo itong ikonekta bilang iyong giving gateway.

:::info
Ang Kingdom Funding integration ay kasalukuyang nasa beta. Makipag-ugnayan sa iyong B1 account representative upang i-enable ito para sa iyong simbahan.
:::

1. Mag-sign up o mag-log in sa [kingdomfunding.org](https://kingdomfunding.org).
2. Kunin ang iyong **Security Key** (pampublikong) at **Private Key** mula sa Kingdom Funding merchant portal.
3. Sa B1 Admin, magpunta sa **Settings** at buksan ang **Church Settings**.
4. Sa **Giving** section, itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang iyong Security Key sa **Security Key** field at ang iyong Private Key sa **Private Key** field.
6. Itakda ang **Webhook Key** na natanggap mo mula sa Kingdom Funding, at kopyahin ang displayed webhook URL sa iyong Kingdom Funding merchant settings upang makapagsimula ang Kingdom Funding upang notipahan ang B1 ng mga nakompletong transaksyon.
7. I-save.

Kapag nakonekta na, ang mga miyembro ay makikita ang isang card/bank toggle sa donation page at maaaring magbigay sa pamamagitan ng credit card o ACH transfer.

## Setting Up Paystack (Africa)

Ang Stripe ay hindi bumubukas ng mga account para sa mga simbahan sa Ghana, Nigeria, Kenya, South Africa o Côte d'Ivoire. Ang [Paystack](https://paystack.com) ay bumubukas, at tumatanggap ng local cards, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer at USSD -- ang mga donor ay nagbabayad sa iyong lokal na currency (GHS, NGN, KES, ZAR, XOF).

1. Mag-register sa [paystack.com](https://paystack.com) gamit ang business registration certificate at lokal na bank account ng iyong simbahan, at kumpleto ang Paystack's activation (go-live) review.
2. Sa Paystack Dashboard buksan ang **Settings → API Keys & Webhooks** at kopyahin ang **Public Key** at **Secret Key** (gamitin ang live keys, hindi ang test keys).
3. Sa B1 Admin, magpunta sa **Settings**, buksan ang **Giving** section at i-click ang edit.
4. Itakda ang **Provider** sa **Paystack**, i-paste ang Public Key at Secret Key, at piliin ang iyong **Currency**.
5. Kopyahin ang **webhook URL** na ipinakita sa ibaba ng provider, bumalik sa Paystack Dashboard (**Settings → API Keys & Webhooks**) at i-paste ito sa **Webhook URL** field. Ito ay kung paano ang mga recurring gifts at mobile money payments ay nare-record.
6. I-save.

Ang mga donor ay kumpleto ang kanilang pagbabayad sa isang secure Paystack window at maaaring pumili ng card, mobile money o bank transfer doon. Mga tala:

- Ang **Recurring gifts** ay kailangan ng isang card; ang mobile money ay hindi maaaring i-charge nang muli nang awtomatiko, kaya ang Paystack ay nagbibigay-daan lamang sa one-time mobile money gifts.
- Ang Paystack recurring gifts ay maaaring ikansela mula sa B1 ngunit hindi ma-pause o ma-edit -- ikansela at lumikha ng isang bagong upang baguhin ang halaga.
- Ang **Processing Fee** defaults ay sumasalamin sa Paystack's local-card rates para sa iyong currency; i-edit ang mga ito kung ang iyong negotiated rates ay naiiba.

## Next Steps

- Gamitin ang [Stripe Import](stripe-import.md) upang i-pull ang online transactions sa B1 Admin kung ang mga ito ay hindi automatic na nag-sync
- Suriin ang iyong [Donation Reports](donation-reports.md) upang i-verify na ang online donations ay lumilitaw nang tama
- Lumikha ng [Giving Statements](giving-statements.md) na kasama ang parehong online at offline donations
