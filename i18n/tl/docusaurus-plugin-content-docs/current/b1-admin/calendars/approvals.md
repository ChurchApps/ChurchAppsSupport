---
title: "Calendar Approvals"
---

# Calendar Approvals

<div class="article-intro">

Ang Approvals page ay kung saan ang mga administrator ay sinusuri at kumikilos sa pending room at resource booking requests, pati na rin ang mga calendar event na nangangailangan ng approval bago ang pag-publish.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-configure ang mga kwarto o resource na may **Approval Group** sa [Rooms & Resources](rooms-resources)
- Kailangan mo ang **Calendars Admin** permission o ang **content.edit** permission

</div>

## Pagbubukas ng Approvals

Sa B1 Admin, pumunta sa **Calendars** at piliin ang **Approvals**. Ang mga pending booking request at mga event na naghihintay ng review ay nakalista dito.

## Booking Requests

Kapag ang isang group ay lumilikha ng isang event at nagsisikap ng isang kwarto o resource, ang request ay lumilitaw sa **Booking Requests** panel. Bawat row ay nagpapakita ng:

- Ang kwarto o resource na ine-request
- Ang event name at date/time
- Ang requesting group

### Conflict Indicators

Kung ang dalawang request ay magkasalubong para sa parehong kwarto o resource, isang conflict warning icon ay lumalabas. Sinusuri nang mabuti ang mga conflicting request bago aprubahan ang kahit alin.

### Aprubahan o Tanggihan

I-click ang **✓** (aprubahan) o **✗** (tanggihan) icon sa anumang booking request. Ang requesting group ay nabe-notify ng desisyon. Ang mga aprubadong booking ay naka-lock sa kwartong iyon o resource para sa event; ang mga tinanggihang booking ay nagbabakod ng slot para sa iba.

## Pending Events

Kung ang iyong calendar workflow ay nangangailangan ng event approval bago ang mga event ay nagiging makikita sa publiko, ang pending event ay lumilitaw sa **Pending Events** panel. Aprubahan ang isang event upang i-publish ito sa calendar, o tanggihan ito upang mag-notify sa submitter na kailangan ng mga pagbabago.

:::tip
I-setup ang isang Approval Group sa isang kwarto sa [Rooms & Resources](rooms-resources) upang magsikap ng approval para sa kwartong iyon. Ang mga group na may access ay maaaring magsikap ng kwarto kapag lumilikha ng mga event, at ang mga request na ito ay dumadaloy sa pahinang ito.
:::

## Mga Kaugnay na Artikulo

- [Rooms, Resources & Scheduling](rooms-resources) — i-configure ang mga bookable rooms at resources
- [Creating Calendars](creating-calendars) — pamahalaan ang mga calendar at event
