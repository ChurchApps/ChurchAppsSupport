---
title: "Mga Bayad na Registration"
description: "I-set up ang mga bayad na registration ng event sa B1 Admin: mga may presyong uri ng dadalo, add-on, discount code, waitlist, at pagkolekta ng bayad sa pamamagitan ng iyong giving provider."
---

# Mga Bayad na Registration

<div class="article-intro">

Maaaring lumampas ang event registration sa simpleng bilang ng dadalo. Maaari kang magtakda ng mga may presyong uri ng dadalo (gaya ng Adult at Child), mag-alok ng opsyonal na add-on na may sariling presyo at dami, gumawa ng discount code, at mangolekta ng bayad sa oras ng registration sa pamamagitan ng umiiral na giving provider ng iyong simbahan. Kapag napuno ang isang event, pinananatili ng opsyonal na waitlist ang mga interesadong miyembro sa pila at awtomatikong ipinapasok sila habang may nabakanteng puwesto.

</div>

## Training Video {#training-video}

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-enable muna ang registration sa event -- tingnan ang [Creating Calendars](./creating-calendars.md#enabling-event-registration)
- Para makakolekta ng bayad online, kailangang [naka-configure ang online giving](../donations/online-giving-setup.md) ng iyong simbahan (Stripe, PayPal, o Kingdom Funding). Hindi kailangan ng giving setup ang mga libreng event. Kung walang online giving, gumagana pa rin ang mga bayad na registration, pero direktang magbabayad ang mga tao sa simbahan -- tingnan ang [Mga Simbahang Walang Online Giving](#churches-without-online-giving).

</div>

## Pagbubukas ng Registration Settings {#opening-registration-settings}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Calendars > Registrations**, at i-click ang iyong event (o i-click ang event sa calendar nito at piliin ang **Manage Registrations**).
2. I-click ang **Edit settings**. Ipinapakita ng **Registration Settings** card ang mga pangunahing setting -- **Enable Registration**, **Capacity**, **Enable Waitlist**, **Registration Opens/Closes**, **Tags**, at **Registration Questions** -- kasama ang button na **Save Settings**.
3. Sa ibaba ng mga pangunahing setting ay may tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**. May kanya-kanyang button na **Save** ang bawat isa, hiwalay sa **Save Settings**; magbababala ang B1 kung susubukan mong umalis nang may hindi pa nase-save na pagbabago. I-click ang **Back to Registrations** para bumalik sa roster.

## Attendee Types {#attendee-types}

Pinapahintulutan ka ng attendee types na maningil ng iba't ibang presyo para sa iba't ibang uri ng dadalo -- at maglagay ng hiwalay na limitasyon sa bawat isa.

1. I-expand ang **Attendee Types** accordion at i-click ang **Add Type**.
2. Ilagay ang **Name** (hal. "Adult", "Child", "Student").
3. Itakda ang **Price**. Gamitin ang 0 para sa libreng uri.
4. Opsyonal na itakda ang **Capacity** para sa uring ito lamang (hal. 20 puwesto lamang para sa Child). Iwanang blangko para walang limitasyon kada uri.
5. Opsyonal na itakda ang **Sort** para kontrolin ang pagkakasunod-sunod ng mga uri sa listahan.
6. I-click ang **Save**.

Para alisin ang na-save na uri, i-click ang delete icon nito at kumpirmahin; agad itong made-delete. Ganoon din ang pag-alis ng selections at discount codes.

Sa panahon ng registration, pumipili ang bawat dadalo ng uri; ang mga uring ubos na ay ipinapakitang **Sold out** at hindi na mapipili. Ipinapakita ng roster ang uri ng bawat dadalo at ang tumatakbong bilang kada uri.

## Selections {#selections}

Ang selections ay opsyonal na may presyong add-on -- mga T-shirt, meal plan, upgrade sa aktibidad.

1. I-expand ang **Selections** accordion at i-click ang **Add Selection**.
2. Ilagay ang **Name**, opsyonal na **Description**, at **Price** (ang 0 ay lalabas bilang "Free").
3. Opsyonal na itakda ang **Capacity** (kabuuang available sa lahat ng registration) at **Max Qty** (pinakamaraming maaaring i-order ng isang registration).
4. I-click ang **Save**.

Pumipili ng dami ang mga nagpapatala sa panahon ng sign-up, at binibilang ang mga kabuuan laban sa capacity para hindi kailanman maoversell.

## Discount Codes {#discount-codes}

1. I-expand ang **Discount Codes** accordion at i-click ang **Add Discount Code**.
2. Ilagay ang **Code** na ita-type ng mga nagpapatala.
3. Piliin ang **Type** -- **Percent** o **Amount** -- at ang **Value** nito.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, **Min Members** (pinakamababang bilang ng dadalo sa registration), at **Max Uses**.
5. I-click ang **Save**.

Nagpapakita ang bawat code ng bilang na **Uses** para makita mo kung gaano kadalas ito nagamit. Agad na nakakatanggap ng feedback ang mga nagpapatala kapag naglagay sila ng code -- kasama ang malinaw na mensahe kapag nag-expire na ang code, hindi pa nagsisimula, o nangangailangan ng mas maraming dadalo.

## Waitlist {#waitlist}

I-on ang **Enable Waitlist** sa Registration Settings card. Kapag naabot ng event ang capacity:

- Ang mga bagong nagpapatala ay binibigyan ng puwesto sa waitlist sa halip na tanggihan. Kinukumpleto nila ang parehong sign-up (nilalaktawan ang bayad habang nasa waitlist).
- Kapag may nagkansela, ang pinakamatandang nasa waitlist na registration ay **awtomatikong ipinapasok** at tumatanggap ng email na may nabakanteng puwesto. Kung may utang pa silang balanse, ang email ay magli-link sa kanila sa [My Registrations](../../b1-church/events/my-registrations.md) sa B1 site ng iyong simbahan, kung saan maaari nilang kumpletuhin ang bayad.
- Maaari mong manu-manong ipasok ang sinuman anumang oras gamit ang aksyong **Promote** sa row na nasa waitlist -- kapaki-pakinabang pagkatapos mong dagdagan ang capacity ng event.

:::info
Ang mga naipasok na registration ay mananatiling *pending* hanggang mabayaran ang anumang balanse; kapag nabayaran (o walang babayaran), kukumpirmahin sila.
:::

## Ang Listahan ng Mga Nakarehistro {#the-registration-roster}

Buksan ang isang event mula sa Registrations page para makita ang bawat registration. Ipinapakita ng title ng card kung ilang registration ang may hawak ng puwesto laban sa capacity (halimbawa, *Registrations (18 / 20)*). Ang mga pending at confirmed na registration lamang ang binibilang; kapag may nasa waitlist, dinadagdagan ng bilang ang title (halimbawa, *· 3 waitlisted*), at lumalabas din ang parehong bilang sa ilalim ng capacity bar. Ang mas malaking numerong nasa itaas ng capacity bar ay nagbibilang ng **tao** sa halip na registration -- lahat ng nasa bawat pending o confirmed na registration -- kaya ang pamilyang apat ang tao ay binibilang na apat. Ang limitasyon ng capacity mismo ay nagbibilang pa rin ng registration. Ipinapakita ng table ang **Name**, **Members**, **Type** (uri ng bawat dadalo), **Paid / Total** (may babala ng balanse kapag may utang pa), **Status**, at **Date**, kasama ang mga count chip kada uri sa itaas ng table.

- I-click ang details icon ng isang row para buksan ang dialog na **Registration Details** -- mga miyembro, selections, bayad/balanse, at **Payments** table na naglilista ng bawat singil (halaga, paraan, petsa).
- Dina-download ng **Export CSV** ang kumpletong roster na may mga column para sa mga miyembro, uri ng dadalo, selections, bayad/kabuuan/balanse, status, at isang column para sa bawat registration question.
- Itinatala ng **Add Attendee** ang sign-up na offline o sa telepono para sa sinumang tao sa iyong simbahan. Piliin ang tao at, sa bayad na event, ang kanyang uri ng dadalo. Hindi siya sisingilin: ang bayad na registration ay nise-save bilang **pending** na may buong halaga bilang balanseng dapat bayaran. Kung may online giving ang iyong simbahan, maaaring bayaran ito ng tao mula sa [My Registrations](../../b1-church/events/my-registrations.md); kung hindi, kolektahin ito nang personal. Kailangan mo ng Registrations Edit permission para makapagdagdag ng dadalo.

:::info
Hindi pinoproseso ang refund sa loob ng B1. Kung kailangan mong i-refund ang kanselang bayad na registration, magsagawa ng refund mula sa dashboard ng iyong giving provider (hal. Stripe).
:::

## Paano Gumagana ang Bayad {#how-payment-works}

Dumadaan ang mga bayad sa parehong giving gateway na ginagamit na ng iyong simbahan para sa mga donasyon -- dumidiretso ang detalye ng card sa provider at hindi dumadaan sa mga server ng B1. Palaging kinakalkula sa server ang mga presyo mula sa iyong naka-configure na mga uri, selections, at discount code, kaya hindi maaaring baguhin ng nagpapatala ang kabuuan. Maaaring magbayad ang mga naka-log in na miyembro gamit ang naka-save na card. Naglalagay ng card ang mga bisita sa checkout at kailangang lagyan ng check ang **I'm not a robot** bago magbayad.

### Mga Simbahang Walang Online Giving {#churches-without-online-giving}

Kung walang nakatakdang giving provider ang iyong simbahan, maaari pa ring tumanggap ng registration ang mga bayad na event. Sinasabi ng hakbang ng bayad sa mga nagpapatala na hindi available ang online payment at maaari silang magbayad nang direkta sa simbahan, at may button na **Register and Pay Later** na nagse-save ng registration. Ise-save ito bilang **pending** na may buong halaga bilang balanseng dapat bayaran, at lalabas ito sa roster na may babala ng balanse. Kolektahin ang pera sa paraang karaniwang ginagawa ng iyong simbahan.

:::info
Walang paraan ang B1 para markahang natanggap na ang offline na bayad. Mananatili ang balanseng dapat bayaran sa roster at sa card ng nagpapatala sa kanilang [My Registrations](../../b1-church/events/my-registrations.md) kahit nakolekta mo na ito, kaya panatilihin ang sarili mong talaan kung sino ang nagbayad.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Creating Calendars](./creating-calendars.md#enabling-event-registration) — i-enable ang registration at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) — i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering.md) — ang nakikita ng mga miyembro kapag nag-sign up sila
- [My Registrations](../../b1-church/events/my-registrations.md) — paano nagbabayad ng balanse ang mga miyembro at nag-e-edit ng registration
