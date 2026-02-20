---
title: "Pag-setup ng Online na Pag-aalay"
---

# Pag-setup ng Online na Pag-aalay

<div class="article-intro">

Ang B1 Admin ay naka-integrate sa **Stripe** at **PayPal** para makapag-alay online ang iyong mga miyembro sa pamamagitan ng iyong B1.church site. Kapag naka-configure na, ang mga online donation ay awtomatikong lalabas sa iyong donation record kasama ng mga manu-manong inilagay na alay, pinapanatiling ang lahat sa isang sistema.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-setup ang iyong mga [donation fund](funds.md) para ang mga donor ay makapag-designate ng kanilang mga alay
- Gumawa ng Stripe account sa [stripe.com](https://stripe.com) at i-activate ito (alisin sa test mode)
- Ihanda ang iyong B1 Admin login credential

</div>

## Pag-setup ng Stripe

1. Gumawa ng account sa [stripe.com](https://stripe.com) kung wala ka pa. Siguraduhing **i-activate ang iyong account** at alisin sa test mode.
2. Sa Stripe, pumunta sa **Developers > API Keys**.
3. Kopyahin ang iyong **Publishable Key**.
4. Mag-log in sa [B1 Admin](https://admin.b1.church/).
5. I-click ang **Church** sa itaas na navigation, pagkatapos i-click ang **Edit Church Settings**.
6. I-click ang edit icon sa tabi ng **Church Settings**.
7. Mag-scroll pababa sa **Giving** section.
8. I-set ang **Provider** sa **Stripe**.
9. I-paste ang iyong Publishable Key sa **Public Key** field.
10. Bumalik sa Stripe at ipakita ang iyong **Secret Key** (isang beses lang ito makikita, kaya mag-save ng backup).
11. I-paste ang Secret Key sa **Secret Key** field at i-click ang **Save**.

:::warning
Ang iyong Stripe Secret Key ay isang beses lang ipinapakita. Kopyahin ito sa isang ligtas na lokasyon bago mag-navigate palayo sa Stripe dashboard. Kung mawala ito sa iyo, kakailanganin mong bumuo ng bagong key.
:::

## Pagdaragdag ng Donation Page sa Iyong B1.church Site

1. Pumunta sa [b1.church](https://b1.church/) at mag-log in.
2. I-click ang **Settings** icon.
3. I-click ang **Add Tab**.
4. Piliin ang **Donation** bilang uri.
5. Maglagay ng pangalan para sa tab (hal., "Give") at i-click ang **Save**.
6. Opsyonal, palitan ang tab icon -- i-type ang "Giv" sa icon search para sa giving-related na icon.

Ang iyong donation page ay live na. Maaaring bisitahin ito ng mga miyembro sa `yoursubdomain.b1.church/donate`.

## Pagbabahagi ng Iyong Giving Link

Para hanapin ang iyong giving URL, pumunta sa **B1 Admin** at i-click ang **Settings** icon para makita ang iyong subdomain. Ang iyong donation link ay sumusunod sa format:

`https://yoursubdomain.b1.church/donate`

Ibahagi ang link na ito sa iyong website, sa mga email, o sa iyong bulletin para malaman ng mga miyembro kung saan mag-alay online.

## Mga Notification ng Donasyon

Nagpapadala ang Stripe ng email notification sa bawat pagkakataong may natatanggap na donasyon. Para baguhin ang notification email address, pumunta sa Stripe dashboard, i-click ang iyong profile sa itaas na kanan, piliin ang **Profile**, at i-update ang iyong email address.

## Mga Opsyon sa Processing Fee

Maaari mong i-configure ang iyong giving page para payagan ang mga donor na opsyonal na sakupin ang processing fee para matanggap ng iyong simbahan ang buong halaga ng donasyon. Ang setting na ito ay pinapamahalaan sa iyong church settings sa loob ng B1 Admin.

:::tip
Pagkatapos ng setup, gumawa ng maliit na test donation para kumpirmahing gumagana ang lahat bago i-announce ang online giving sa iyong kongregasyon.
:::

## Mga Susunod na Hakbang

- Gamitin ang [Stripe Import](stripe-import.md) para i-pull ang mga online transaction sa B1 Admin kung hindi sila awtomatikong nagsi-sync
- Suriin ang iyong [Mga Report ng Donasyon](donation-reports.md) para i-verify na tama ang paglabas ng mga online donation
- Bumuo ng [Mga Giving Statement](giving-statements.md) na kasama ang parehong online at offline na mga donasyon
