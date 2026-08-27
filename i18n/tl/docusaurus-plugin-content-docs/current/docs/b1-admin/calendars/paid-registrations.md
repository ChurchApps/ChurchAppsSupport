---
title: "Paid Registrations"
---

# Paid Registrations

<div class="article-intro">

Ang event registration ay maaaring lumampas sa isang simpleng head count. Maaari kang magbigay ng mga priced attendee types (tulad ng Adult at Child), mag-alok ng opsyonal na add-ons na may kanilang sariling presyo at dami, lumikha ng discount codes, at kumuha ng bayad sa registration sa pamamagitan ng umiiral na giving provider ng iyong simbahan. Kapag ang isang event ay puno na, ang isang opsyonal na waitlist ay pinapanatiling interesado ang mga miyembro at kinokromote ang mga ito nang awtomatiko habang bubukas ang mga lugar.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Una ay mag-enable ng registration sa event -- tingnan ang [Creating Calendars](creating-calendars#enabling-event-registration)
- Upang kumuha ng mga pagbabayad, kailangan ng iyong simbahan ang [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Ang mga libreng event ay hindi kailangan ng giving setup.

</div>

## Opening Registration Settings

1. Sa B1 Admin, magpunta sa **Registrations** page at buksan ang iyong event (o buksan ang event mula sa calendar nito).
2. Ang **Registration Settings** card ay nagpapakita ng mga pangunahing kaalaman -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ibaba ng mga pangunahing kaalaman ay tatlong accordion: **Attendee Types**, **Selections**, at **Discount Codes**.

## Attendee Types

Ang mga attendee types ay nagpapahintulot sa iyo na mag-charge ng iba't ibang presyo para sa iba't ibang uri ng mga attendee -- at i-cap ang bawat isa nang hiwalay.

1. Palawakin ang **Attendee Types** accordion at i-click ang **Add Type**.
2. Magpasok ng isang **Name** (hal. "Adult", "Child", "Student").
3. Itakda ang isang **Price**. Gumamit ng 0 para sa isang libreng uri.
4. Opsyonal na itakda ang **Capacity** para lamang sa ganitong uri (hal. 20 Child spots lamang). Iwanan ang blank para walang per-type limit.
5. I-click ang **Save**.

Sa panahon ng registration, bawat attendee ay pumipili ng uri; ang sold-out types ay ipinapakita bilang **Sold out** at hindi maaaring piliin. Ang roster ay nagpapakita ng bawat attendee's type at tumatakbo ng per-type counts.

## Selections

Ang mga selection ay opsyonal na priced add-ons -- T-shirts, meal plans, activity upgrades.

1. Palawakin ang **Selections** accordion at i-click ang **Add Selection**.
2. Magpasok ng isang **Name**, opsyonal na **Description**, at isang **Price** (0 ay nagpapakita bilang "Free").
3. Opsyonal na itakda ang **Capacity** (kabuuang available sa lahat ng mga registration) at **Max Qty** (ang pinakamaraming isang registration na maaaring mag-order).
4. I-click ang **Save**.

Ang mga registrant ay pumipili ng dami sa panahon ng signup, at ang mga kabuuan ay sumasaklaw sa capacity upang hindi ka kailanman makabenta ng labis.

## Discount Codes

1. Palawakin ang **Discount Codes** accordion at i-click ang **Add Discount Code**.
2. Magpasok ng **Code** na tipo-type ng mga registrant.
3. Pumili ng **Type** -- **Percent** o **Amount** -- at ang **Value** nito.
4. Opsyonal na limitahan ang code na may **Start Date** / **End Date**, isang **Min Members** (minimum na bilang ng mga attendee sa registration), at **Max Uses**.
5. I-click ang **Save**.

Bawat code ay nagpapakita ng **Uses** count upang makita mo kung gaano karaming beses ito na-redeem. Ang mga registrant ay nakakakuha ng instant feedback kapag nag-apply sila ng code -- kasama ang mga malinaw na mensahe kapag ang code ay nag-expire, hindi pa nagsimula, o kailangan ng mas maraming attendee.

## Waitlist

I-turn on ang **Enable Waitlist** sa Registration Settings card. Kapag ang event ay umaabot sa capacity:

- Ang mga bagong registrant ay inaalok ng isang waitlist spot sa halip na turuan sila. Kumpleto nila ang parehong pag-sign up (ang pagbabayad ay nilalabasan habang naghihintay).
- Kapag may tumigil, ang pinakamatandang waitlisted registration ay **promoted automatically** at makakatanggap ng email na isang lugar ang bumubukas. Kung may utang sila, ang email ay nag-link sa kanila upang makumpleto ang pagbabayad.
- Maaari mong i-promote ang isang tao nang manu-mano anumang oras gamit ang **Promote** action sa isang waitlisted row -- kapaki-pakinabang pagkatapos tataas ang event capacity.

:::info
Ang mga promoted registrations ay manatiling *pending* hanggang sa magbayad ang anumang balanse; ang pagbabayad (o pagkakaroon ng walang babayaran) ay nagko-confirm sa mga ito.
:::

## The Registration Roster

Buksan ang isang event mula sa Registrations page upang makita ang bawat registration. Ang talahanayan ay nagpapakita ng **Name**, **Members**, **Type** (bawat attendee's type), **Paid / Total** (na may balance warning kapag may utang pa), **Status**, at **Date**, plus per-type count chips sa itaas ng talahanayan.

- I-click ang details icon ng isang row upang buksan ang **Registration Details** dialog -- mga miyembro, selections, paid/balance, at isang **Payments** table na naglilista sa bawat singil (halaga, paraan, petsa).
- Ang **Export CSV** ay nag-download ng buong roster na may mga column para sa mga miyembro, attendee types, selections, paid/total/balance, status, at isang column bawat registration question.
- **Add Attendee** ay nagpapahintulot pa rin sa iyo na mag-record ng offline signups nang manu-mano.

:::info
Ang mga refund ay hindi napoproseso sa loob ng B1. Kung kailangan mong magbigay ng refund sa isang nakansalong paid registration, ilagay ang refund mula sa dashboard ng iyong giving provider (hal. Stripe).
:::

## How Payment Works

Ang mga pagbabayad ay tumatakbo sa pamamagitan ng parehong giving gateway na ginagamit na ng iyong simbahan para sa mga donasyon -- ang mga detalye ng card ay direktang pumupunta sa provider at hindi kailanman naaabot ang mga server ng B1. Ang mga presyo ay palaging kinakompute sa server mula sa iyong mga configured types, selections, at discount codes, kaya ang registrant ay hindi maaaring gumambala sa total. Ang mga naka-log in na miyembro ay maaaring magbayad ng isang naka-save na card; ang mga bisita ay pumasok ng isang card sa checkout.

## Related Articles

- [Creating Calendars](creating-calendars#enabling-event-registration) -- mag-enable ng registration at ang mga pangunahing setting
- [Online Giving Setup](../donations/online-giving-setup.md) -- i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering) -- kung ano ang makikita ng mga miyembro kapag nag-sign up
- [My Registrations](../../b1-church/events/my-registrations) -- kung paano ang mga miyembro ay nagbabayad ng mga balanse at nag-edit ng mga registration
