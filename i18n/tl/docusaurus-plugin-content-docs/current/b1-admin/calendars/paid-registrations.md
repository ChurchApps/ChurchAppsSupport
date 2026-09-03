---
title: "Paid Registrations"
---

# Paid Registrations

<div class="article-intro">

Ang event registration ay maaaring lumampas sa isang simpleng head count. Maaari kang magbigay ng mga priced attendee type (tulad ng Adult at Child), mag-alok ng opsyonal na add-on na may kanilang sariling mga presyo at dami, lumikha ng mga discount code, at mangolekta ng bayad sa registration sa pamamagitan ng umiiral na giving provider ng iyong simbahan. Kapag puno ang event, isang opsyonal na waitlist ay nagpapanatili sa mga interesadong miyembro sa linya at pino-promote sila awtomatiko habang bumubukas ang mga puwang.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Una ay i-enable ang registration sa event — tingnan ang [Creating Calendars](creating-calendars#enabling-event-registration)
- Upang mangolekta ng mga bayad, ang iyong simbahan ay kailangan ng [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Ang mga libreng event ay hindi na kailangan ang giving setup.

</div>

## Pagbubukas ng Registration Settings

1. Sa B1 Admin, pumunta sa **Registrations** page at buksan ang iyong event (o buksan ang event mula sa calendar nito).
2. Ang **Registration Settings** card ay nagpapakita ng mga basics — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ibaba ng mga basics ay tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**.

## Attendee Types

Ang mga uri ng attendee ay nagpapahintulot sa iyo na mag-charge ng iba't ibang mga presyo para sa iba't ibang mga uri ng attendee — at mag-cap sa bawat isa nang hiwalay.

1. Palawakin ang **Attendee Types** accordion at i-click ang **Add Type**.
2. Magpasok ng **Name** (hal. "Adult", "Child", "Student").
3. Itakda ang **Price**. Gamitin ang 0 para sa isang libreng uri.
4. Opsyonal na itakda ang **Capacity** para lamang sa ganitong uri (hal. lamang 20 Child spots). Iwanan blangko para walang per-type limit.
5. I-click ang **Save**.

Sa panahon ng registration, bawat attendee ay pumipili ng isang uri; ang mga sold-out na uri ay ipinapakita bilang **Sold out** at hindi maaaring piliin. Ang roster ay nagpapakita ng uri ng bawat attendee at tumatakbo na per-type counts.

## Selections

Ang mga selection ay opsyonal na priced add-on — T-shirt, meal plans, activity upgrade.

1. Palawakin ang **Selections** accordion at i-click ang **Add Selection**.
2. Magpasok ng **Name**, opsyonal na **Description**, at **Price** (0 ay nagpapakita bilang "Free").
3. Opsyonal na itakda ang **Capacity** (kabuuang available sa lahat ng registrations) at **Max Qty** (ang karamihan ng isa registration ay maaaring mag-order).
4. I-click ang **Save**.

Ang mga registrant ay pumipili ng dami sa panahon ng signup, at ang mga total ay bumubuo laban sa kapasidad kaya hindi mo kailanman oversell.

## Discount Codes

1. Palawakin ang **Discount Codes** accordion at i-click ang **Add Discount Code**.
2. Magpasok ng **Code** na gagamitin ng mga registrant.
3. Pumili ng **Type** — **Percent** o **Amount** — at nito **Value**.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, isang **Min Members** (minimum na bilang ng attendees sa registration), at **Max Uses**.
5. I-click ang **Save**.

Bawat code ay nagpapakita ng **Uses** count upang makita mo kung gaano kadalas ito ay na-redeem. Ang mga registrant ay nakakakuha ng instant feedback kapag nag-apply ng isang code -- kasama ang malinaw na mga mensahe kapag ang isang code ay nag-expire, hindi pa nagsimula, o kailangan ng mas maraming attendees.

## Waitlist

I-turn on ang **Enable Waitlist** sa Registration Settings card. Kapag ang event ay umaabot sa kapasidad:

- Ang mga bagong registrant ay inaalok ng isang waitlist spot sa halip na itapon. Sila ay kumpleto ang parehong signup (ang bayad ay na-skip habang waitlisted).
- Kapag may nag-cancel, ang pinakamatandang waitlisted registration ay **pino-promote awtomatiko** at nakakatanggap ng email na ang isang puwang ay bukas. Kung sila ay may utang na balanse, ang email ay nag-link sa kanila upang kumpleto ang pagbabayad.
- Maaari mong i-promote ang isang tao nang manual sa anumang oras gamit ang **Promote** action sa isang waitlisted row — kapaki-pakinabang pagkatapos ng pagtaas ng event capacity.

:::info
Ang mga pino-promote registration ay nanatiling *pending* hanggang sa bayaran ang anumang balanse; ang pagbabayad (o walang dapat bayaran) ay nag-confirm sa kanila.
:::

## Ang Registration Roster

Buksan ang isang event mula sa Registrations page upang makita ang bawat registration. Ang tala ay nagpapakita ng **Name**, **Members**, **Type** (uri ng bawat attendee), **Paid / Total** (na may balance warning kapag ang pera ay pa rin ay utang), **Status**, at **Date**, plus per-type count chips sa itaas ng tala.

- I-click ang detalye icon ng isang row upang buksan ang **Registration Details** dialog — mga miyembro, mga selection, binayaran/balanse, at **Payments** table na naglilista ng bawat charge (halaga, pamamaraan, petsa).
- **Export CSV** ay nag-download ng buong roster na may mga column para sa mga miyembro, mga uri ng attendee, mga selection, binayaran/total/balanse, status, at isang column bawat registration question.
- **Add Attendee** ay nagbibigay-daan sa iyo pa rin na magrehistro ng offline signups nang manual.

:::info
Ang mga refund ay hindi naproseso sa loob ng B1. Kung kailangan mong ibalik ang isang kinansela na may-bayad na registration, ilabas ang refund mula sa dashboard ng iyong giving provider (hal. Stripe).
:::

## Paano Gumagana Ang Bayad

Ang mga bayad ay tumatakbo sa pamamagitan ng parehong giving gateway na ginagamit na ng iyong simbahan para sa mga donation — ang mga detalye ng card ay direktang napupunta sa provider at hindi kailanman humipo sa mga server ng B1. Ang mga presyo ay palaging kinukuwenta sa server mula sa iyong na-configure na mga uri, mga selection, at mga discount code, kaya ang isang registrant ay hindi maaaring magalabog sa kabuuan. Ang mga naka-log in na miyembro ay maaaring magbayad gamit ang salvadong card; ang mga bisita ay nagpasok ng isang card sa checkout.

## Mga Kaugnay na Artikulo

- [Creating Calendars](creating-calendars#enabling-event-registration) — i-enable ang registration at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) — i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering) — kung ano ang nakikita ng mga miyembro kapag nag-sign up
- [My Registrations](../../b1-church/events/my-registrations) — kung paano ang mga miyembro ay nagbabayad ng mga balanse at nag-edit ng mga registration
