---
title: "Pagtatakda ng Online na Pamimigay"
---

# Pagtatakda ng Online na Pamimigay

<div class="article-intro">

Ang B1 Admin ay sumasama sa **Stripe**, **PayPal**, at **Kingdom Funding** upang ang iyong mga miyembro ay makapagbigay online sa pamamagitan ng iyong B1.church site. Kapag naiayos na, ang mga online na donasyon ay awtomatikong lumalabas sa iyong mga rekord ng donasyon kasama ang manu-manulong na idinagdag na mga regalo, na pinapanatili ang lahat sa isang sistema.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Magtakda ng iyong [donation funds](funds.md) upang ang mga nagbibigay ay makabuo ng kanilang mga regalo
- Lumikha ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin mula sa test mode)
- Magkaroon ng handa na ang iyong B1 Admin login credentials

</div>

## Pagtatakda ng Stripe

1. Lumikha ng account sa [stripe.com](https://stripe.com) kung hindi ka pa mayroon. Siguraduhing **i-activate ang iyong account** at alisin mula sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-login sa [B1 Admin](https://admin.b1.church/).
5. Mag-click sa **Church** sa tuktok na navigation, pagkatapos ay mag-click sa **Edit Church Settings**.
6. I-click ang edit icon sa tabi ng **Church Settings**.
7. I-scroll down hanggang sa **Giving** section.
8. Itakda ang **Provider** sa **Stripe**.
9. I-paste ang iyong Publishable Key sa **Public Key** field.
10. Bumalik sa Stripe at buksan ang iyong **Secret Key** (makikita mo lang ito minsan, kaya mag-save ng backup).
11. I-paste ang Secret Key sa **Secret Key** field at i-click ang **Save**.

:::warning
Ang iyong Stripe Secret Key ay ipinakikita lamang minsan. Kopyahin ito sa isang ligtas na lokasyon bago umalis sa Stripe dashboard. Kung mawawalan ka nito, kailangan mong lumikha ng bagong key.
:::

## Pagpili ng Iyong Currency

Pagkatapos pumili ng Stripe bilang iyong provider, may **Currency** dropdown na lumalabas sa tabi ng iyong API keys. Pumili ng currency na tumutugma sa iyong Stripe account's settlement currency upang ang mga donasyon ay masingil ng tama.

Ang mga suportadong currencies ay kasama ang USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari mong kumpirmahin o baguhin ang default currency ng iyong account sa iyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pinili mo dito ay ginagamit para sa one-time donations, recurring subscriptions, fee calculations, at donation reports. Kung magbago ka ng currencies mamaya, ang mga bagong donasyon at subscriptions lamang ang gagamit ng bagong currency — ang mga umiiral na recurring gifts ay patuloy na umiiral sa currency kung saan sila nilikha.
:::

:::warning
Siguraduhing ang iyong Stripe account ay nako-configure upang tanggapin ang currency na iyong pinili. Kung ang iyong Stripe account ay hindi sumusuporta sa napiling currency, ang mga donasyon ay mabibigo sa checkout.
:::

## Pagdagdag ng Donation Page sa Iyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-login.
2. I-click ang **Settings** icon.
3. I-click ang **Add Tab**.
4. Pumili ng **Donation** bilang uri.
5. Magpasok ng pangalan para sa tab (halimbawa, "Give") at i-click ang **Save**.
6. Opsyonal, baguhin ang tab icon -- i-type ang "Giv" sa icon search para sa isang giving-related icon.

Ang iyong donation page ay live na ngayon. Ang mga miyembro ay maaaring bumalik dito sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link

Upang mahanap ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang **Settings** icon upang makita ang iyong subdomain. Ang iyong donation link ay sumusunod sa format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin upang malaman ng mga miyembro kung saan magbigay ng online.

## Donation Notifications

Ang Stripe ay nagpapadala ng email notification sa bawat oras na makatanggap ng donasyon. Upang baguhin ang notification email address, pumunta sa Stripe dashboard, i-click ang iyong profile sa tuktok na kanan, pumili ng **Profile**, at i-update ang iyong email address.

## Processing Fee Options

Maaari mong i-configure ang iyong giving page upang hayaan ang mga nagbibigay na optional na tukuyin ang processing fees upang ang iyong simbahan ay makatanggap ng buong halaga ng donasyon. Ang setting na ito ay pinamamahalaan sa iyong church settings sa loob ng B1 Admin.

:::tip
Pagkatapos ng pagtatakda, gumawa ng maliit na test donation upang kumpirmahin na ang lahat ay gumagana bago ipahayag ang online giving sa iyong congregation.
:::

## Pagtatakda ng Kingdom Funding

Ang Kingdom Funding ay isang Christian payment processor na sumusuporta sa credit/debit cards at ACH bank transfers. Kung ang iyong simbahan ay na-enroll sa Kingdom Funding, maaari mong ikonekta ito bilang iyong giving gateway.

:::info
Ang Kingdom Funding integration ay kasalukuyang nasa beta. Makipag-ugnayan sa iyong B1 account representative upang i-enable ito para sa iyong simbahan.
:::

1. Mag-sign up o mag-login sa [kingdomfunding.org](https://kingdomfunding.org).
2. Kunin ang iyong **Security Key** (public) at **Private Key** mula sa Kingdom Funding merchant portal.
3. Sa B1 Admin, pumunta sa **Settings** at buksan ang **Church Settings**.
4. Sa **Giving** section, itakda ang **Provider** sa **Kingdom Funding**.
5. I-paste ang iyong Security Key sa **Security Key** field at ang iyong Private Key sa **Private Key** field.
6. Itakda ang **Webhook Key** na natanggap mo mula sa Kingdom Funding, at kopyahin ang ipinakitang webhook URL sa iyong Kingdom Funding merchant settings upang ang Kingdom Funding ay makakapagpadala ng notification sa B1 ng mga nakompletong transaksyon.
7. I-save.

Kapag nakonekta na, ang mga miyembro ay makikita ang card/bank toggle sa donation page at maaaring magbigay sa pamamagitan ng credit card o ACH transfer.

## Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) upang hilahin ang mga online transactions sa B1 Admin kung hindi sila awtomatikong nag-sync
- Suriin ang iyong [Donation Reports](donation-reports.md) upang i-verify na ang mga online donations ay nagpapakita ng tama
- Lumikha ng [Giving Statements](giving-statements.md) na kasama ang parehong online at offline donations
