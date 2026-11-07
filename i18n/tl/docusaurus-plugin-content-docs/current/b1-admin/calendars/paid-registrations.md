---
title: "Mga Bayad na Registration"
description: "I-set up ang bayad na event registration sa B1 Admin: may presyong uri ng dadalo, add-on, discount code, waitlist, at pagbabayad sa iyong giving provider."
---

# Mga Bayad na Registration

<div class="article-intro">

Maaaring higit pa sa simpleng bilang ng dadalo ang event registration. Maaari kang magtakda ng mga uri ng dadalo na may presyo (gaya ng Adult at Child), mag-alok ng opsyonal na add-on na may sariling presyo at dami, gumawa ng mga discount code, at mangolekta ng bayad sa registration sa pamamagitan ng umiiral na giving provider ng iyong simbahan. Kapag napuno ang event, pinananatili ng opsyonal na waitlist ang mga interesadong miyembro sa pila at awtomatikong pinapasok sila kapag may nagbukas na puwesto.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-enable muna ang registration sa event -- tingnan ang [Creating Calendars](./creating-calendars.md#enabling-event-registration)
- Para makolekta ang bayad online, kailangang [naka-configure ang online giving](../donations/online-giving-setup.md) ng iyong simbahan (Stripe, PayPal, o Kingdom Funding). Hindi kailangan ng giving setup ang mga libreng event. Kung walang online giving, gumagana pa rin ang mga bayad na registration, pero direktang magbabayad ang mga tao sa simbahan -- tingnan ang [Churches Without Online Giving](#churches-without-online-giving).

</div>

## Pagbubukas ng Registration Settings

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Calendars > Registrations**, at buksan ang iyong event (o buksan ang event mula sa calendar nito).
2. Ipinapakita ng **Registration Settings** card ang mga pangunahing bagay -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ilalim ng mga pangunahing setting ay tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**.

## Attendee Types

Pinapayagan ka ng attendee types na maningil ng magkakaibang presyo para sa iba't ibang uri ng dadalo -- at maglimita ng bilang ng bawat isa nang hiwalay.

1. Palawakin ang **Attendee Types** accordion at i-click ang **Add Type**.
2. Ilagay ang **Name** (halimbawa, "Adult", "Child", "Student").
3. Itakda ang **Price**. Gamitin ang 0 para sa libreng uri.
4. Opsyonal na itakda ang **Capacity** para sa uri lang na ito (halimbawa, 20 puwesto lang para sa Child). Iwanang blangko kung walang limitasyon sa bawat uri.
5. I-click ang **Save**.

Habang nagpaparehistro, pumipili ng uri ang bawat dadalo; ang mga uring ubos na ay ipinapakitang **Sold out** at hindi na mapipili. Ipinapakita ng roster ang uri ng bawat dadalo at ang tumatakbong bilang bawat uri.

## Selections

Ang selections ay opsyonal na may presyong add-on -- T-shirt, meal plan, upgrade sa aktibidad.

1. Palawakin ang **Selections** accordion at i-click ang **Add Selection**.
2. Ilagay ang **Name**, opsyonal na **Description**, at **Price** (ang 0 ay ipinapakitang "Free").
3. Opsyonal na itakda ang **Capacity** (kabuuang available sa lahat ng registration) at ang **Max Qty** (pinakamaraming maaaring i-order ng iisang registration).
4. I-click ang **Save**.

Pumipili ng dami ang mga magpaparehistro habang nag-sa-sign up, at binibilang ang kabuuan laban sa capacity para hindi kailanman lumampas sa dapat ibenta.

## Discount Codes

1. Palawakin ang **Discount Codes** accordion at i-click ang **Add Discount Code**.
2. Ilagay ang **Code** na ita-type ng mga magpaparehistro.
3. Piliin ang **Type** -- **Percent** o **Amount** -- at ang **Value** nito.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, **Min Members** (pinakamababang bilang ng dadalo sa registration), at **Max Uses**.
5. I-click ang **Save**.

Ipinapakita ng bawat code ang bilang na **Uses** para makita mo kung gaano kadalas ito nagamit. Agad na nakakatanggap ng feedback ang mga magpaparehistro kapag nag-apply sila ng code -- kasama ang malinaw na mensahe kapag nag-expire na ang code, hindi pa nagsisimula, o nangangailangan ng mas maraming dadalo.

## Waitlist {#waitlist}

I-on ang **Enable Waitlist** sa Registration Settings card. Kapag naabot ng event ang capacity:

- Ang mga bagong magpaparehistro ay iaalok ng puwesto sa waitlist sa halip na tanggihan. Kumpletuhin nila ang parehong sign-up (nilalaktawan ang bayad habang nasa waitlist).
- Kapag may nagkansela, ang pinakamatandang waitlisted na registration ay **awtomatikong i-promote** at makakatanggap ng email na may nagbukas na puwesto. Kung may utang pa silang balanse, ang email ay magli-link sa kanila sa [My Registrations](../../b1-church/events/my-registrations.md) sa B1 site ng iyong simbahan, kung saan maaari nilang kumpletuhin ang bayad.
- Maaari mong i-promote nang manual ang sinuman anumang oras gamit ang aksyong **Promote** sa waitlisted na row -- kapaki-pakinabang pagkatapos mong taasan ang capacity ng event.

:::info
Ang mga na-promote na registration ay mananatiling *pending* hanggang mabayaran ang anumang balanse; kapag nagbayad sila (o wala talagang babayaran), kukumpirmahin sila.
:::

## Ang Registration Roster {#the-registration-roster}

Buksan ang event mula sa Registrations page para makita ang bawat registration. Ipinapakita ng title ng card kung ilang registration ang may hawak na puwesto laban sa capacity (halimbawa, *Registrations (18 / 20)*). Pending at confirmed na registration lang ang binibilang; kapag may mga waitlisted, idinaragdag ng title ang bilang (halimbawa, *· 3 waitlisted*), at lumalabas din ang parehong bilang sa ilalim ng capacity bar. Ipinapakita ng table ang **Name**, **Members**, **Type** (uri ng bawat dadalo), **Paid / Total** (may babala ng balanse kapag may utang pa), **Status**, at **Date**, kasama ang mga chip ng bilang bawat uri sa itaas ng table.

- I-click ang details icon ng row para buksan ang dialog na **Registration Details** -- mga miyembro, selections, bayad/balanse, at isang table na **Payments** na naglilista ng bawat singil (halaga, paraan, petsa).
- **Export CSV** ay nagda-download ng buong roster na may column para sa mga miyembro, attendee types, selections, paid/total/balance, status, at isang column bawat tanong sa registration.
- **Add Attendee** ay nagre-record ng offline o telepono na sign-up para sa sinumang tao sa iyong simbahan. Piliin ang tao at, sa bayad na event, ang kanyang attendee type. Hindi siya sisingilin: ang bayad na registration ay sine-save bilang **pending** na may buong halaga bilang balanse. Kung may online giving ang iyong simbahan, maaaring bayaran ito ng tao mula sa [My Registrations](../../b1-church/events/my-registrations.md); kung hindi, kolektahin ito nang personal. Kailangan mo ang Registrations Edit permission para makapagdagdag ng dadalo.

:::info
Hindi pinoproseso ang refund sa loob ng B1. Kung kailangan mong i-refund ang nakanselang bayad na registration, gawin ang refund mula sa dashboard ng iyong giving provider (halimbawa, Stripe).
:::

## Paano Gumagana ang Bayad

Dumadaan ang mga bayad sa parehong giving gateway na ginagamit na ng iyong simbahan para sa mga donasyon -- diretso sa provider ang detalye ng card at hindi kailanman dumadaan sa mga server ng B1. Laging kinukuwenta sa server ang mga presyo mula sa mga naka-configure mong uri, selections, at discount code, kaya hindi mababago ng magpaparehistro ang kabuuan. Maaaring magbayad ang mga naka-log in na miyembro gamit ang naka-save na card. Ang mga bisitang walang account ay naglalagay ng card sa checkout at dapat lagyan muna ng check ang **I'm not a robot** bago magbayad.

### Mga Simbahang Walang Online Giving {#churches-without-online-giving}

Kung walang naka-set up na giving provider ang iyong simbahan, maaari pa ring tumanggap ng registration ang mga bayad na event. Sinasabi ng payment step sa mga magpaparehistro na hindi available ang online payment at maaari silang magbayad nang direkta sa simbahan, at ang butones na **Register and Pay Later** ang nagse-save ng registration. Sine-save ito bilang **pending** na may buong halaga bilang balanse, at lumalabas sa roster na may babala ng balanse. Kolektahin ang pera gaya ng karaniwang ginagawa ng iyong simbahan.

:::info
Walang paraan ang B1 para markahan ang offline na bayad bilang natanggap. Mananatili ang balanse sa roster at sa card ng [My Registrations](../../b1-church/events/my-registrations.md) ng magpaparehistro kahit makolekta mo na ito, kaya panatilihin ang sarili mong tala kung sino ang nagbayad.
:::

## Mga Kaugnay na Artikulo

- [Creating Calendars](./creating-calendars.md#enabling-event-registration) -- i-enable ang registration at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) -- i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering.md) -- ano ang nakikita ng mga miyembro kapag nagpapatala
- [My Registrations](../../b1-church/events/my-registrations.md) -- paano nagbabayad ng balanse at nag-eedit ng registration ang mga miyembro
