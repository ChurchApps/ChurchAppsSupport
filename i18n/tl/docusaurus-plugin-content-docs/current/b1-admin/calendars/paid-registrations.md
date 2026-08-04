---
title: "Bayad na Pagpapatala"
---

# Bayad na Pagpapatala

<div class="article-intro">

Ang pagpaparehistro sa event ay maaaring lumampas sa simpleng bilang ng ulo. Maaari kang magtakda ng mga presyong uri ng attendee (tulad ng Adult at Child), mag-alok ng mga opsyonal na add-on na may sariling presyo at dami, gumawa ng mga discount code, at mangolekta ng bayad sa registration sa pamamagitan ng umiiral nang giving provider ng iyong simbahan. Kapag napuno na ang isang event, ang isang opsyonal na waitlist ay pinananatiling interesado ang mga miyembro sa hanay at awtomatikong pinoprumote sila habang bumubukas ang mga puwesto.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-enable muna ang registration sa event -- tingnan ang [Creating Calendars](creating-calendars#enabling-event-registration)
- Para mangolekta ng bayad, kailangang [naka-configure ang online giving](../donations/online-giving-setup.md) ng iyong simbahan (Stripe, PayPal, o Kingdom Funding). Hindi na kailangan ng giving setup ang mga libreng event.

</div>

## Pagbubukas ng Registration Settings

1. Sa B1 Admin, pumunta sa pahinang **Registrations** at buksan ang iyong event (o buksan ang event mula sa calendar nito).
2. Ipinapakita ng **Registration Settings** card ang mga pangunahing bagay -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ilalim ng mga pangunahing bagay ay may tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**.

## Attendee Types

Nagbibigay-daan ang attendee types na maningil ng iba't ibang presyo para sa iba't ibang uri ng attendee -- at limitahan ang bawat isa nang hiwalay.

1. I-expand ang accordion na **Attendee Types** at i-click ang **Add Type**.
2. Ilagay ang isang **Name** (hal. "Adult", "Child", "Student").
3. I-set ang isang **Price**. Gamitin ang 0 para sa libreng uri.
4. Opsyonal na i-set ang isang **Capacity** para sa uri lamang na ito (hal. 20 puwesto lang para sa Child). Iwanang blangko kung walang limitasyon kada-uri.
5. I-click ang **Save**.

Sa panahon ng registration, pipili ang bawat attendee ng uri; ang mga uri na nabenta na ay ipinapakita bilang **Sold out** at hindi na maaaring piliin. Ipinapakita ng roster ang uri ng bawat attendee at ang patuloy na bilang kada-uri.

## Selections

Ang mga selection ay mga opsyonal na priced add-on -- T-shirt, meal plan, activity upgrade.

1. I-expand ang accordion na **Selections** at i-click ang **Add Selection**.
2. Ilagay ang isang **Name**, opsyonal na **Description**, at isang **Price** (ang 0 ay ipinapakita bilang "Free").
3. Opsyonal na i-set ang isang **Capacity** (kabuuang available sa lahat ng registration) at isang **Max Qty** (ang pinakamarami na maaaring iutos ng isang registration).
4. I-click ang **Save**.

Pumipili ang mga rehistrado ng dami habang nagpapatala, at ang mga kabuuan ay ibinabawas sa capacity para hindi ka kailanman malampasan sa benta.

## Discount Codes

1. I-expand ang accordion na **Discount Codes** at i-click ang **Add Discount Code**.
2. Ilagay ang **Code** na i-tta-type ng mga rehistrado.
3. Piliin ang **Type** -- **Percent** o **Amount** -- at ang **Value** nito.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, isang **Min Members** (pinakamababang bilang ng attendee sa registration), at **Max Uses**.
5. I-click ang **Save**.

Ipinapakita ng bawat code ang bilang ng **Uses** para makita mo kung gaano na ito kadalas nagamit. Agad na nakakatanggap ang mga rehistrado ng feedback kapag nag-apply sila ng code -- kasama ang malinaw na mensahe kapag nag-expire na ang code, hindi pa nagsisimula, o kailangan pa ng mas maraming attendee.

## Waitlist

I-on ang **Enable Waitlist** sa Registration Settings card. Kapag naabot na ng event ang capacity nito:

- Aalukin ang mga bagong rehistrado ng puwesto sa waitlist sa halip na tanggihan. Kanilang kinukumpleto ang parehong signup (nilalaktawan ang bayad habang naka-waitlist).
- Kapag may kumansela, ang pinakamatagal nang naka-waitlist na registration ay **awtomatikong pinoprumote** at makakatanggap ng email na may bumukas na puwesto. Kung may utang na balanse, nililink sila ng email para kumpletuhin ang bayad.
- Maaari kang manu-manong mag-promote ng isang tao anumang oras gamit ang aksyong **Promote** sa isang waitlisted na row -- kapaki-pakinabang pagkatapos itaas ang capacity ng event.

:::info
Ang mga pino-promote na registration ay nananatiling *pending* hanggang mabayaran ang anumang balanse; ang pagbabayad (o walang dapat bayaran) ay nagkukumpirma sa kanila.
:::

## Ang Registration Roster

Buksan ang isang event mula sa pahinang Registrations para makita ang bawat registration. Ipinapakita ng table ang **Name**, **Members**, **Type** (uri ng bawat attendee), **Paid / Total** (may babala sa balanse kapag may utang pang bayad), **Status**, at **Date**, kasama ang mga chip ng bilang kada-uri sa itaas ng table.

- I-click ang icon ng detalye ng isang row para buksan ang dialog na **Registration Details** -- mga miyembro, selection, paid/balance, at isang table ng **Payments** na naglilista ng bawat singil (halaga, paraan, petsa).
- Ang **Export CSV** ay nagda-download ng buong roster na may mga column para sa mga miyembro, uri ng attendee, selection, paid/total/balance, status, at isang column para sa bawat tanong sa registration.
- Pinapayagan pa rin ng **Add Attendee** na manu-manong itala ang mga offline na signup.

:::info
Hindi pinoproseso ang mga refund sa loob ng B1. Kung kailangan mong i-refund ang isang kinanselang bayad na registration, ilabas ang refund mula sa dashboard ng iyong giving provider (hal. Stripe).
:::

## Paano Gumagana ang Pagbabayad

Dumadaan ang mga bayad sa parehong giving gateway na ginagamit na ng iyong simbahan para sa mga donasyon -- direktang napupunta ang detalye ng card sa provider at hindi kailanman humihipo sa mga server ng B1. Palaging kinakalkula sa server ang mga presyo batay sa iyong mga naka-configure na uri, selection, at discount code, kaya hindi maaaring baguhin ng isang rehistrado ang kabuuan. Maaaring magbayad ang mga naka-log-in na miyembro gamit ang naka-save na card; naglalagay ang mga bisita ng card sa checkout.

## Kaugnay na mga Artikulo

- [Creating Calendars](creating-calendars#enabling-event-registration) — i-enable ang registration at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) — i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering) — kung ano ang nakikita ng mga miyembro kapag nagpapatala sila
- [My Registrations](../../b1-church/events/my-registrations) — kung paano nagbabayad ng balanse at nag-e-edit ng registration ang mga miyembro
