---
title: "Paggawa ng Calendar"
description: "Gumawa ng calendar sa B1 Admin, ikonekta ang mga grupo o mag-import ng .ics file, at pamahalaan ang mga event, registration, at tala mula sa iisang lugar."
---

# Paggawa ng Calendar

<div class="article-intro">

Sa paggawa ng calendar sa B1 Admin, makakabuo ka ng piniling tanaw ng mga event sa pamamagitan ng pagkonekta sa isa o higit pang grupo. Pinamamahalaan ng mga group leader ang mga event sa loob ng kanilang mga grupo, at ipinapakita ng iyong calendar ang mga event na iyon sa iisang lugar. Maaaring magdagdag o mag-edit ng event para sa anumang grupo ang mga admin na may edit access. Ang mga group leader na hindi admin ay makakapamahala lang ng event para sa mga grupong pinamumunuan nila.

</div>

## Training Video

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang mga [grupo](../groups/creating-groups.md) na gusto mong isama ang mga event sa iyong calendar
- Kailangan mo ng administrative access sa seksyong Calendars sa B1 Admin

</div>

## Paggawa ng Bagong Calendar

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Bubukas ang bagong calendar form sa ilalim ng listahan ng calendar.
3. Ilagay ang **name** ng iyong calendar (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Magdagdag ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang calendar na ito.
5. I-click ang **Create** para i-save ang bago mong calendar.

## Ang Calendar Detail Page

Pagkatapos gumawa ng calendar, i-click ang **Manage Events** sa row nito para buksan ang detail page. May dalawang pangunahing bahagi ang pahinang ito:

- **Kaliwang column** -- Ang pangalan ng calendar kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), kasunod ng listahang **Groups in Calendar** na nagpapakita kung aling mga grupo ang kasama sa calendar na ito. I-click ang **Remove** sa tabi ng grupo para alisin ito sa calendar.
- **Pangunahing bahagi** -- Ang view na **Calendar Events** na nagpapakita ng mga event mula sa mga konektadong grupo, kasama ang mga button na **Subscribe** at **Add Group** sa itaas nito.

## Pagkonekta ng Mga Grupo

Ang mga grupong may event sa calendar ay awtomatikong lumalabas sa listahang **Groups in Calendar** sa kaliwang bahagi ng detail page.

1. I-click ang **Add Group** sa itaas ng calendar para iugnay ang grupo sa iyong calendar.
2. Piliin ang grupo mula sa dropdown. Kasama rito ang bawat grupo sa iyong simbahan, hindi lang ang mga grupong kinabibilangan mo.
3. Piliin kung isasama ang **all events** mula sa grupong iyon o **specific events** lang.
4. I-click ang **Save**.

Lumalabas sa calendar nang isang beses lang ang bawat event. Kapag nagdagdag ka ng buong grupo, anumang event nito na naidagdag mo na nang isa-isa ay isasama sa entry ng grupo, at ang pagpili ng specific events mula sa grupong nasa calendar na ay walang idaragdag na bago. Ang mga grupong idinagdag nang buo lang ang nakalista sa ilalim ng **Groups in Calendar**.

### Pag-import ng .ics File

I-click ang **Import .ics** para mag-angkat ng mga event mula sa ibang calendar. Piliin ang **Group** kung saan dapat mapunta ang mga event, pagkatapos i-click ang **Choose .ics file** o i-paste ang nilalaman ng file, at i-click ang **Import**. Gagawin ang mga event sa grupong iyon, at idadagdag ang grupo sa calendar na pinanggalingan ng import, kaya agad lalabas doon ang mga event.

### Pag-alis ng Event sa Calendar

I-click ang isang event sa calendar, pagkatapos i-click ang **Remove from Calendar**. Tinatanggal lang nito ang event sa calendar na ito -- nananatili pa rin ang event sa grupo nito. Kung nasa calendar ang event dahil idinagdag ang buong grupo, tinatanggal ng pag-alis nito ang lahat ng event ng grupong iyon sa calendar na ito (nananatili pa rin ang mga event sa grupo). Para tuluyang burahin ang event, burahin ito mula sa [calendar ng grupo](../groups/group-calendar.md).

:::tip
Ang pagkonekta ng mga grupo sa iyong calendar ay makapangyarihang paraan para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa calendar ng buong simbahan nang walang dagdag na trabaho mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang calendar na kumukuha ng mga event mula sa maraming grupo sa buong simbahan, tingnan ang [Curated Calendar](./curated-calendar.md) para sa mas simpleng paraan.
:::

## Pagdaragdag at Pag-edit ng Mga Event {#adding-and-editing-events}

I-click ang **New Event** sa calendar detail page para magdagdag ng event, o i-click ang isang event sa calendar at pagkatapos i-click ang **Edit** para baguhin ito. May mga sumusunod na field ang form na **New Event** / **Edit Event**:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may mga event template ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang laman na kahon ng larawan) para pumili o mag-upload ng larawan, na ginugupit sa malapad na 16:9 na hugis. I-click ang **Change Photo** para palitan ito. Ipinapakita ang larawan sa itaas ng pahina ng event sa iyong website at bilang tile nito kapag ipinapakita ng Calendar element ang **Upcoming events** (tingnan ang [Showing Events on Your Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa pahina ng event sa iyong website. Suportado ang bold na teksto, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, gaya ng `youth, students`. Maaaring itakda ang Calendar element sa iyong website na magpakita lang ng mga event na may partikular na tag. Ito ang parehong field na **Tags** na makikita sa mga setting ng registration ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang makakabasa at makakadagdag sa mga note ng event (tingnan ang [Event Notes](#event-notes)). Piliin ang **Staff only** (ang default), **Group leaders** (mga leader ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga leader nito).
- **Rooms** at **Resources** -- Magreserba ng espasyo at kagamitan para sa event. Tingnan ang [Rooms, Resources & Scheduling](./rooms-resources.md).

I-click ang **Save**. Kung umuulit ang event, hihingi ng kumpirmasyon ang B1, dahil ina-update ng pag-save ang bawat pag-ulit sa serye.

### Mga Note ng Event {#event-notes}

Bawat event ay may sariling thread ng mga note para sa pagpaplano at follow-up. I-click ang isang event sa calendar detail page; ipinapakita ng dialog ang mga detalye ng event, ang mga reminder nito, at ang **Notes** nito sa ibaba. Mag-type ng note at i-post ito para idagdag sa thread.

Ang mga staff na may permiso sa pag-edit ng content o pag-administer ng calendar ay laging nakakabasa at nakakapag-post ng event notes. Ang mga setting na **Who can view notes** at **Who can post notes** sa event ang nagpapasya kung makakagawa rin nito ang mga leader o miyembro ng grupo ng event.

### Pagpapakita ng Mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang calendar sa iyong website, magdagdag ng **Calendar** element sa isang pahina at piliin ang calendar na ito. Maaaring magpakita ang element ng buwanang calendar o grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may iisang tag. Ang mga bisitang mag-click sa isang event ay bubukas sa sarili nitong pahina ng event. Tingnan ang [Using the Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pag-enable ng Event Registration {#enabling-event-registration}

Maaari mong i-enable ang registration para sa anumang event sa calendar para makapagpatala ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang isang umiiral nang event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para i-enable ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng registration. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (halimbawa, "youth, retreat, vbs") para matulungan ang pagkakategorya ng mga event na maaaring i-register.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para masagot ng mga magpaparehistro ang karagdagang tanong (dietary restrictions, laki ng T-shirt, emergency contact, atbp.) bilang bahagi ng pagpapatala. Piliin ang **None** para lumaktaw sa mga tanong.
   - **Enable Waitlist** -- Kapag napuno na ang event, papayagan ang mga karagdagang magpaparehistro na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Paid Registrations](./paid-registrations.md#waitlist).
4. I-save ang event.

Para sa mga bayad na event, sa parehong settings page maaari mong tukuyin ang mga **Attendee Types** na may presyo, opsyonal na **Selections** (mga add-on), at **Discount Codes**, kung saan kokolektahin ang bayad sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](./paid-registrations.md) para sa kumpletong gabay.

Kapag na-enable na ang registration, makikita ng mga miyembro ang butones na **Register for this Event** kapag tiningnan nila ang event sa [B1 website](../../b1-church/events/registering.md) o [B1 Mobile app](../../b1-church/events/registering.md). Kung may nakalakip kang form, makikita ng mga magpaparehistro ang hakbang na **Questions** habang nagpaparehistro, at ise-save ang kanilang mga sagot kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lang sa mga form na **hindi** minarkahang Restricted. Awtomatikong nilalaktawan ang restricted na form habang nagpaparehistro sa halip na ipakita, kaya gumamit ng unrestricted na form kapag maglalakip ng mga tanong sa isang event.
:::

### Pamamahala ng Mga Registration

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang isang table ng lahat ng event na may naka-enable na registration, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng registration kumpara sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga registration, kasama ang mga pangalan, bilang ng miyembro, attendee types, status ng bayad, at petsa ng registration.
4. Mula sa detail page, maaari mo:
   - **Add Attendee** -- Manual na iparehistro ang isang taong nagpatala offline o sa telepono.
   - **Cancel** ang mga indibidwal na registration
   - **Delete** ang mga registration nang tuluyan
   - **Promote** ang mga waitlisted na registration kapag may bakanteng puwesto
   - **Export CSV** -- I-download ang lahat ng registration, kasama ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

Kung may nakalakip na Registration Questions ang event, nagpapakita rin ang detail page ng filter na **Unanswered questions only** para mabilis na mahanap ang mga magpaparehistrong hindi pa nagsusumite ng sagot, at butones na **View Answers** sa bawat naisagot na registration para makita ang kanilang mga tugon. Ang mga bayad na event ay nagdaragdag ng column na **Type**, column na **Paid / Total**, bilang bawat uri, at dialog ng detalye ng bayad -- tingnan ang [Paid Registrations](./paid-registrations.md#the-registration-roster).

:::tip
Gamitin ang progress bar ng capacity para subaybayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag nasa o lampas na sa capacity ang event.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](./curated-calendar.md) -- Gumawa ng calendar na kumukuha mula sa maraming grupo
- [Paid Registrations](./paid-registrations.md) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Event Registration Guide](../guides/event-registration.md) -- Hakbang-hakbang na gabay sa pag-set up ng event registration
- [Calendars Overview](./index.md) -- Bumalik sa pangkalahatang-tanaw ng calendars
