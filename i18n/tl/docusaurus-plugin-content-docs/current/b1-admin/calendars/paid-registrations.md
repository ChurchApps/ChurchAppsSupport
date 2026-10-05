---
title: "Mga Bayad na Rehistrasyon"
---

# Mga Bayad na Rehistrasyon

<div class="article-intro">

Ang pagpaparehistro sa event ay hindi lang basta bilang ng mga tao. Maaari kang magtakda ng mga uri ng dadalo na may presyo (tulad ng Adult at Child), mag-alok ng mga opsyonal na add-on na may sariling presyo at dami, gumawa ng mga discount code, at mangolekta ng bayad sa pagpaparehistro sa pamamagitan ng kasalukuyang giving provider ng simbahan mo. Kapag napuno na ang event, pinapanatili ng opsyonal na waitlist ang mga interesadong miyembro sa pila at awtomatiko silang ina-promote kapag may nabakanteng puwesto.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-enable muna ang pagpaparehistro sa event — tingnan ang [Paggawa ng mga Kalendaryo](creating-calendars#enabling-event-registration)
- Para makakolekta ng mga bayad, kailangang naka-configure ang [online giving](../donations/online-giving-setup.md) ng simbahan mo (Stripe, PayPal, o Kingdom Funding). Hindi kailangan ng giving setup para sa mga libreng event.

</div>

## Pagbubukas ng mga Setting ng Pagpaparehistro

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Calendars > Registrations**, at buksan ang iyong event (o buksan ang event mula sa kalendaryo nito).
2. Ipinapakita ng card na **Registration Settings** ang mga pangunahing setting — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ibaba ng mga pangunahing setting ay may tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**.

## Mga Uri ng Dadalo (Attendee Types)

Pinapahintulutan ka ng mga attendee type na maningil ng iba't ibang presyo para sa iba't ibang uri ng dadalo — at magtakda ng hiwalay na limitasyon para sa bawat isa.

1. Palawakin ang accordion na **Attendee Types** at i-click ang **Add Type**.
2. Maglagay ng **Name** (hal. "Adult", "Child", "Student").
3. Magtakda ng **Price**. Gamitin ang 0 para sa libreng uri.
4. Opsyonal na magtakda ng **Capacity** para sa uri lamang na ito (hal. 20 puwesto lang para sa Child). Iwanang blangko kung walang limitasyon kada uri.
5. I-click ang **Save**.

Sa pagpaparehistro, pipili ng uri ang bawat dadalo; ang mga uring ubos na ay ipinapakitang **Sold out** at hindi na mapipili. Ipinapakita ng roster ang uri ng bawat dadalo at ang tumatakbong bilang kada uri.

## Mga Selection

Ang mga selection ay mga opsyonal na add-on na may presyo — mga T-shirt, meal plan, upgrade sa aktibidad.

1. Palawakin ang accordion na **Selections** at i-click ang **Add Selection**.
2. Maglagay ng **Name**, opsyonal na **Description**, at **Price** (ang 0 ay lalabas bilang "Free").
3. Opsyonal na magtakda ng **Capacity** (kabuuang available sa lahat ng rehistrasyon) at **Max Qty** (pinakamaraming maaaring i-order ng isang rehistrasyon).
4. I-click ang **Save**.

Pipili ang mga magpaparehistro ng dami habang nag-sign up, at ang mga kabuuan ay binibilang laban sa capacity para hindi ka makapagbenta nang sobra.

## Mga Discount Code

1. Palawakin ang accordion na **Discount Codes** at i-click ang **Add Discount Code**.
2. Ilagay ang **Code** na ita-type ng mga magpaparehistro.
3. Piliin ang **Type** — **Percent** o **Amount** — at ang **Value** nito.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, **Min Members** (pinakamababang bilang ng dadalo sa rehistrasyon), at **Max Uses**.
5. I-click ang **Save**.

Ipinapakita ng bawat code ang bilang ng **Uses** para makita mo kung ilang beses na itong nagamit. Agad na nakakakuha ng feedback ang mga magpaparehistro kapag naglagay sila ng code — kasama ang malinaw na mensahe kapag ang code ay expired na, hindi pa nagsisimula, o nangangailangan ng mas maraming dadalo.

## Waitlist

I-on ang **Enable Waitlist** sa card ng Registration Settings. Kapag naabot na ng event ang capacity:

- Ino-offer sa mga bagong magpaparehistro ang puwesto sa waitlist sa halip na tanggihan sila. Kukumpletuhin nila ang parehong pag-sign up (nilalaktawan ang bayad habang nasa waitlist).
- Kapag may nag-cancel, ang pinakamatagal nang nasa waitlist na rehistrasyon ay **awtomatikong ipo-promote** at makakatanggap ng email na may nabakanteng puwesto. Kung may balanseng babayaran, ang email ay may link para makumpleto nila ang bayad.
- Maaari mong i-promote ang isang tao nang manu-mano anumang oras gamit ang aksyong **Promote** sa row na nasa waitlist — kapaki-pakinabang pagkatapos dagdagan ang capacity ng event.

:::info
Nananatiling *pending* ang mga na-promote na rehistrasyon hanggang mabayaran ang anumang balanse; kapag nabayaran (o kung wala namang babayaran), makukumpirma na ang mga ito.
:::

## Ang Registration Roster

Buksan ang isang event mula sa pahina ng Registrations para makita ang bawat rehistrasyon. Ipinapakita ng talahanayan ang **Name**, **Members**, **Type** (ang uri ng bawat dadalo), **Paid / Total** (na may babala sa balanse kapag may utang pa), **Status**, at **Date**, kasama ang mga count chip kada uri sa itaas ng talahanayan.

- I-click ang details icon ng isang row para buksan ang dialog na **Registration Details** — mga miyembro, mga selection, bayad/balanse, at talahanayan ng **Payments** na naglilista ng bawat singil (halaga, paraan, petsa).
- Dina-download ng **Export CSV** ang buong roster na may mga column para sa mga miyembro, uri ng dadalo, mga selection, bayad/kabuuan/balanse, status, at isang column kada tanong sa pagpaparehistro.
- Ang **Add Attendee** ay nagbibigay pa rin ng paraan para manu-manong irehistro ang mga nag-sign up nang offline.

:::info
Hindi pinoproseso sa loob ng B1 ang mga refund. Kung kailangan mong i-refund ang kanseladong bayad na rehistrasyon, gawin ang refund mula sa dashboard ng giving provider mo (hal. Stripe).
:::

## Paano Gumagana ang Pagbabayad

Ang mga bayad ay dumadaan sa parehong giving gateway na ginagamit na ng simbahan mo para sa mga donasyon — ang detalye ng card ay direktang napupunta sa provider at hindi kailanman dumadaan sa mga server ng B1. Ang mga presyo ay laging kinakalkula sa server mula sa mga naka-configure mong uri, selection, at discount code, kaya hindi mababago ng magpaparehistro ang kabuuan. Ang mga naka-log in na miyembro ay maaaring magbayad gamit ang naka-save na card; ang mga bisita ay maglalagay ng card sa checkout.

## Mga Kaugnay na Artikulo

- [Creating Calendars](creating-calendars#enabling-event-registration) — i-enable ang pagpaparehistro at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) — i-configure ang payment gateway na gagamitin sa checkout
- [Registering for Events](../../b1-church/events/registering) — ang makikita ng mga miyembro kapag nag-sign up sila
- [My Registrations](../../b1-church/events/my-registrations) — kung paano nagbabayad ng balanse at nag-eedit ng rehistrasyon ang mga miyembro
