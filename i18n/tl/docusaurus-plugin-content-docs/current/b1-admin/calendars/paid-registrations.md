---
title: "Paid Registrations"
---

# Paid Registrations

<div class="article-intro">

Ang event registration ay maaaring lumampas sa isang simpleng head count. Maaari kang maglarawan ng priced attendee types (tulad ng Adult at Child), mag-alok ng optional add-ons na may sarili nilang prices at quantities, lumikha ng discount codes, at makolekta ang payment sa registration sa pamamagitan ng existing giving provider ng iyong church. Kapag ang event ay puno na, isang optional waitlist ay nagpapanatili ng interested members sa linya at nag-promote sa kanila automatically habang bumubukas ang spots.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-enable ang registration sa event muna — tingnan ang [Creating Calendars](creating-calendars#enabling-event-registration)
- Upang makolekta ang mga payments, ang iyong church ay kailangan ng [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Ang free events ay hindi kailangan ng giving setup.

</div>

## Pagbubukas ng Registration Settings

1. Sa B1 Admin, pumunta sa **Registrations** page at buksan ang iyong event (o buksan ang event mula sa calendar nito).
2. Ang **Registration Settings** card ay nagpapakita ng basics — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, at **Registration Questions**.
3. Sa ibaba ng basics ay tatlong accordions: **Attendee Types**, **Selections**, at **Discount Codes**.

## Attendee Types

Ang attendee types ay nagpapahintulot sa iyo na mag-charge ng iba't ibang prices para sa iba't ibang uri ng attendees — at mag-cap sa bawat isa nang hiwalay.

1. Palawakin ang **Attendee Types** accordion at i-click ang **Add Type**.
2. Magpasok ng **Name** (hal. "Adult", "Child", "Student").
3. Itakda ang **Price**. Gamitin ang 0 para sa free type.
4. Opsyonal na itakda ang **Capacity** para lamang sa ganitong uri (hal. 20 Child spots lamang). Iwanan ang blangko para walang per-type limit.
5. I-click ang **Save**.

Sa registration, bawat attendee ay pumipili ng isang uri; ang sold-out types ay ipinakikita bilang **Sold out** at hindi maaaring piliin. Ang roster ay nagpapakita ng bawat attendee's type at running per-type counts.

## Selections

Ang selections ay optional priced add-ons — T-shirts, meal plans, activity upgrades.

1. Palawakin ang **Selections** accordion at i-click ang **Add Selection**.
2. Magpasok ng **Name**, optional **Description**, at **Price** (0 ay nagpapakita bilang "Free").
3. Opsyonal na itakda ang **Capacity** (kabuuang available sa lahat ng registrations) at **Max Qty** (ang karamihan na isang registration ay maaaring mag-order).
4. I-click ang **Save**.

Ang mga registrants ay pumipili ng quantities sa signup, at ang totals ay bumibilang laban sa capacity kaya hindi ka kailanman nag-oversell.

## Discount Codes

1. Palawakin ang **Discount Codes** accordion at i-click ang **Add Discount Code**.
2. Magpasok ng **Code** na itypo ng mga registrants.
3. Piliin ang **Type** — **Percent** o **Amount** — at **Value** nito.
4. Opsyonal na limitahan ang code gamit ang **Start Date** / **End Date**, isang **Min Members** (minimum number ng attendees sa registration), at **Max Uses**.
5. I-click ang **Save**.

Bawat code ay nagpapakita ng **Uses** count upang makita mo kung gaano karaming beses ito ay na-redeem. Ang mga registrants ay nakakakuha ng instant feedback kapag nag-apply sila ng code — kasama ang clear messages kapag ang code ay nag-expire, hindi pa nagsimula, o kailangan pa ng mas maraming attendees.

## Waitlist

Buksan ang **Enable Waitlist** sa Registration Settings card. Kapag ang event ay umabot sa capacity:

- Ang mga bagong registrants ay inaalok ng isang waitlist spot sa halip na itapon. Natapos nila ang parehong signup (skip ang payment habang waitlisted).
- Kapag ang sinuman ay nag-cancel, ang pinakamataandang waitlisted registration ay **promoted automatically** at nakakatanggap ng email na bumubukas ang spot. Kung sila ay may balance na dapat bayaran, ang email ay nag-link sa kanila upang kumpletuhin ang payment.
- Maaari mong i-promote ang sinuman nang manu-mano anumang oras gamit ang **Promote** action sa isang waitlisted row — kapaki-pakinabang pagkatapos ng pagtaas sa event capacity.

:::info
Ang promoted registrations ay nanatiling *pending* hanggang sa ang anumang balance ay bayaran; ang pagbabayad (o walang dapat bayaran) ay nagpapatunay sa kanila.
:::

## Ang Registration Roster

Buksan ang isang event mula sa Registrations page upang makita ang bawat registration. Ang table ay nagpapakita ng **Name**, **Members**, **Type** (bawat attendee's type), **Paid / Total** (na may balance warning kapag ang pera ay hindi pa rin pinagsisihan), **Status**, at **Date**, kasama ang per-type count chips sa itaas ng table.

- I-click ang details icon ng row upang buksan ang **Registration Details** dialog — members, selections, paid/balance, at isang **Payments** table na naglilista ng bawat charge (amount, method, date).
- Ang **Export CSV** ay nag-download ng full roster na may columns para sa members, attendee types, selections, paid/total/balance, status, at isang column bawat registration question.
- Ang **Add Attendee** ay nagpapahintulot pa rin sa iyo na mag-record ng offline signups nang manu-mano.

:::info
Ang mga refunds ay hindi noproses sa loob ng B1. Kung kailangan mong ibalik ang isang cancelled paid registration, ilabas ang refund mula sa dashboard ng iyong giving provider (hal. Stripe).
:::

## Paano Gumagana ang Payment

Ang mga payments ay tumatakbo sa pamamagitan ng parehong giving gateway na ginagamit na ng iyong church para sa donations — ang card details ay napupunta direkta sa provider at hindi kailanman dumaan B1's servers. Ang prices ay laging kinakompute sa server mula sa iyong configured types, selections, at discount codes, kaya ang isang registrant ay hindi maaaring magbasag ng total. Ang mga naka-log in members ay maaaring magbayad gamit ang saved card; ang mga guests ay magpasok ng card sa checkout.

## Related Articles

- [Creating Calendars](creating-calendars#enabling-event-registration) — i-enable ang registration at ang basic settings
- [Online Giving Setup](../donations/online-giving-setup.md) — i-configure ang payment gateway na ginagamit sa checkout
- [Registering for Events](../../b1-church/events/registering) — kung ano ang nakikita ng mga members kapag nag-sign up
- [My Registrations](../../b1-church/events/my-registrations) — kung paano ang mga members ay nagbabayad ng balances at nag-edit ng registrations
