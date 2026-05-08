---
title: "Pag-setup ng Online na Pagbibigay"
---

# Pag-setup ng Online na Pagbibigay

<div class="article-intro">

Ang B1 Admin ay nagsasama ng **Stripe** at **PayPal** upang ang iyong mga miyembro ay makapagbigay online sa pamamagitan ng iyong B1.church site. Kapag na-configure na, ang online na mga donasyon ay awtomatikong lalitaw sa iyong mga rekord ng donasyon kasama ang manu-manong ipinasok na mga regalo, na pinapanatiling lahat sa isang sistema.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang iyong [donation funds](funds.md) upang ang mga nagbibigay ay makapag-designate ng kanilang mga regalo
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin ito sa test mode)
- Paghanda ang iyong B1 Admin login credentials

</div>

## Pag-setup ng Stripe

1. Gumawa ng account sa [stripe.com](https://stripe.com) kung wala ka pang isa. Siguraduhin na **i-activate ang iyong account** at alisin ito sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. I-click ang **Church** sa top navigation, pagkatapos i-click ang **Edit Church Settings**.
6. I-click ang edit icon sa tabi ng **Church Settings**.
7. I-scroll down sa **Giving** section.
8. I-set ang **Provider** sa **Stripe**.
9. I-paste ang iyong Publishable Key sa **Public Key** field.
10. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (makikita mo lang ito minsan, kaya mag-save ng backup).
11. I-paste ang Secret Key sa **Secret Key** field at i-click ang **Save**.

:::warning
Ang iyong Stripe Secret Key ay ipapakita lang minsan. Kopyahin ito sa isang secure na lokasyon bago lumayo sa Stripe dashboard. Kung mawawala mo ito, kailangan mong bumuo ng bagong key.
:::

## Pagpili ng Iyong Currency

Pagkatapos pumili ng Stripe bilang iyong provider, ang **Currency** dropdown ay lalitaw sa tabi ng iyong API keys. Pumili ng currency na tumutugma sa settlement currency ng iyong Stripe account upang ang mga donasyon ay ma-charge nang tama.

Ang mga sinusuportadong currency ay kinabibilangan ng USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, at BRL. Maaari mong kumpirmahin o baguhin ang default currency ng iyong account sa iyong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Ang currency na pipiliin mo dito ay ginagamit para sa one-time donations, recurring subscriptions, fee calculations, at donation reports. Kung magbago ka ng currency sa ibang pagkakataon, ang mga bagong donasyon at subscriptions lamang ang gagamit ng bagong currency — ang mga umiiral na recurring gifts ay patuloy na nasa currency na kanilang ginawa.
:::

:::warning
Siguraduhin na ang iyong Stripe account ay na-configure upang tumanggap ng currency na pipiliin mo. Kung ang iyong Stripe account ay hindi sumusuporta sa napiling currency, ang mga donasyon ay mabibigo sa checkout.
:::

## Pagdaragdag ng Donation Page sa Iyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang **Settings** icon.
3. I-click ang **Add Tab**.
4. Pumili ng **Donation** bilang uri.
5. Magpasok ng pangalan para sa tab (hal., "Give") at i-click ang **Save**.
6. Bilang opsyon, baguhin ang tab icon -- mag-type ng "Giv" sa icon search para sa giving-related icon.

Ang iyong donation page ay live na ngayon. Ang mga miyembro ay maaaring bisitahin ito sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link

Upang mahanap ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang **Settings** icon upang makita ang iyong subdomain. Ang iyong donation link ay sumusunod sa format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa emails, o sa iyong bulletin upang malaman ng mga miyembro kung saan magbigay online.

## Donation Notifications

Ang Stripe ay nagpapadala ng email notification sa bawat pagkakataon na natanggap ang donasyon. Upang baguhin ang notification email address, pumunta sa Stripe dashboard, i-click ang iyong profile sa top right, pumili ng **Profile**, at i-update ang iyong email address.

## Processing Fee Options

Maaari mong i-configure ang iyong giving page upang hayaang ang mga nagbibigay ay opsyonal na masaklaw ang processing fees upang ang iyong simbahan ay makatanggap ng buong donation amount. Ang setting na ito ay pinamamahalaan sa iyong church settings sa loob ng B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng maliliit na test donation upang makumpirma na gumagana ang lahat bago ibalita ang online giving sa iyong congregation.
:::

## Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) upang mahuli ang online transactions sa B1 Admin kung hindi ito automatic na nag-sync
- Suriin ang iyong [Donation Reports](donation-reports.md) upang i-verify na ang mga online donation ay lumalitaw nang tama
- Bumuo ng [Giving Statements](giving-statements.md) na nagsasama ng online at offline donations
