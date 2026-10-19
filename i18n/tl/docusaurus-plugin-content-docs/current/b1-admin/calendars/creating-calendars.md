---
title: "Paggawa ng Calendar"
---

# Paggawa ng Calendar

<div class="article-intro">

Sa paggawa ng calendar sa B1 Admin, makakabuo ka ng piniling view ng mga event sa pamamagitan ng pagkonekta ng isa o higit pang grupo. Pinamamahalaan ng mga group leader ang mga event sa loob ng kanilang mga grupo, at ipinapakita ng iyong calendar ang mga event na iyon sa iisang lugar. Maaaring magdagdag o mag-edit ng event para sa anumang grupo ang mga admin na may edit access. Mga event lamang ng grupong pinamumunuan nila ang mapamamahalaan ng mga non-admin na group leader.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang mga [grupo](../groups/creating-groups.md) na gusto mong isama ang mga event sa iyong calendar
- Kailangan mo ng administrative access sa seksyong Calendars sa B1 Admin

</div>

## Paggawa ng Bagong Calendar

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Magbubukas ang bagong calendar form sa ibaba ng listahan ng calendar.
3. Maglagay ng **name** para sa iyong calendar (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Magdagdag ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang calendar na ito.
5. I-click ang **Create** para i-save ang bago mong calendar.

## Ang Detail Page ng Calendar

Pagkatapos gumawa ng calendar, i-click ang **Manage Events** sa row nito para buksan ang detail page. Dalawa ang pangunahing bahagi ng pahinang ito:

- **Kaliwang column** -- Ang pangalan ng calendar kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), kasunod ang listahang **Groups in Calendar** na nagpapakita kung aling mga grupo ang kasama sa calendar na ito. I-click ang **Remove** sa tabi ng isang grupo para alisin ito sa calendar.
- **Pangunahing bahagi** -- Ang view ng **Calendar Events** na nagpapakita ng mga event mula sa mga konektadong grupo, kasama ang mga button na **Subscribe** at **Add Group** sa itaas nito.

## Pagkonekta ng mga Grupo

Awtomatikong lumilitaw sa listahang **Groups in Calendar** sa kaliwang bahagi ng detail page ang mga grupong may event sa calendar.

1. I-click ang **Add Group** sa itaas ng calendar para iugnay ang isang grupo sa iyong calendar.
2. Piliin ang grupo mula sa dropdown.
3. Piliin kung isasama ang **all events** mula sa grupong iyon o **specific events** lamang.
4. I-click ang **Save**.

:::tip
Ang pagkonekta ng mga grupo sa iyong calendar ay isang makapangyarihang paraan para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa calendar ng buong simbahan mo nang hindi na kailangan ng dagdag na trabaho mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang calendar na kumukuha ng mga event mula sa maraming grupo sa iyong simbahan, tingnan ang [Curated Calendar](curated-calendar) para sa mas maayos na paraan.
:::

## Pagdaragdag at Pag-edit ng mga Event {#adding-and-editing-events}

I-click ang **New Event** sa detail page ng calendar para magdagdag ng event, o i-click ang isang event sa calendar at pagkatapos ay i-click ang **Edit** para baguhin ito. May mga sumusunod na field ang form na **New Event** / **Edit Event**:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may mga event template ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang laman na kahon ng litrato) para pumili o mag-upload ng larawan, na pinuputol sa malapad na 16:9 na hugis. I-click ang **Change Photo** para palitan ito. Ipinapakita ang litrato sa itaas ng pahina ng event sa iyong website, at bilang tile nito kapag ipinapakita ng Calendar element ang **Upcoming events** (tingnan ang [Pagpapakita ng mga Event sa Iyong Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa pahina ng event sa iyong website. Sinusuportahan ang bold na teksto, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, gaya ng `youth, students`. Maaaring itakda ang Calendar element sa iyong website na magpakita lamang ng mga event na may partikular na tag. Ito ang parehong field na **Tags** na makikita sa mga setting ng registration ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang maaaring magbasa at magdagdag sa mga note ng event (tingnan ang [Mga Note ng Event](#event-notes)). Piliin ang **Staff only** (ang default), **Group leaders** (mga lider ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga lider nito).
- **Rooms** at **Resources** -- Magreserba ng espasyo at kagamitan para sa event. Tingnan ang [Rooms, Resources & Scheduling](rooms-resources).

I-click ang **Save**. Kung umuulit ang event, hihilingin ng B1 na kumpirmahin mo, dahil ina-update ng pag-save ang bawat occurrence sa serye.

### Mga Note ng Event {#event-notes}

May sariling thread ng note ang bawat event para sa pagpaplano at follow-up. I-click ang event sa detail page ng calendar; ipinapakita ng dialog ang mga detalye ng event, mga paalala nito, at ang **Notes** nito sa ibaba. I-type ang isang note at i-post ito para idagdag sa thread.

Palaging nakakabasa at nakakapag-post ng mga note ng event ang mga staff na may permiso na mag-edit ng nilalaman o mangasiwa ng mga calendar. Tinutukoy ng mga setting na **Who can view notes** at **Who can post notes** sa event kung makakagawa rin ito ng mga lider o miyembro ng grupo ng event.

### Pagpapakita ng mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang calendar sa iyong website, magdagdag ng **Calendar** element sa isang pahina at piliin ang calendar na ito. Maaaring magpakita ang element ng buwanang calendar o isang grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may isang tag. Kapag nag-click ang mga bisita sa isang event, bubukas ang sarili nitong pahina ng event. Tingnan ang [Paggamit ng Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pagpapagana ng Event Registration {#enabling-event-registration}

Maaari mong paganahin ang registration para sa anumang event sa calendar para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para paganahin ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng registration. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") para matulungang i-categorize ang mga event na maaaring i-register.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para masagot ng mga nagpapatala ang mga dagdag na tanong (dietary restrictions, laki ng T-shirt, emergency contact, atbp.) bilang bahagi ng pag-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag napuno ang event, papayagan ang mga dagdag na nagpapatala na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Mga Bayad na Registration](paid-registrations#waitlist).
4. I-save ang event.

Para sa mga bayad na event, sa parehong pahina ng settings maaari mong tukuyin ang mga may presyong **Attendee Types**, opsyonal na **Selections** (mga add-on), at **Discount Codes**, na may bayad na kinokolekta sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Mga Bayad na Registration](paid-registrations) para sa buong gabay.

Kapag napagana na ang registration, makikita ng mga miyembro ang isang button na **Register for this Event** kapag tiningnan nila ang event sa [B1 website](../../b1-church/events/registering) o [B1 Mobile app](../../b1-mobile/events/registering). Kung naglakip ka ng form, makakakita ang mga nagpapatala ng hakbang na **Questions** habang nagpapatala, at mase-save ang kanilang mga sagot kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Nilalaktawan ang restricted na form habang nagpapatala sa halip na ipakita ito, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa isang event.
:::

### Pamamahala ng mga Registration

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang isang talahanayan ng lahat ng event na may pinagaganang registration, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng registration laban sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga registration, kabilang ang mga pangalan, bilang ng miyembro, attendee types, status ng bayad, at petsa ng registration.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong i-register ang isang taong nag-sign up offline o sa telepono.
   - **Cancel** ang indibidwal na mga registration
   - **Delete** ang mga registration nang permanente
   - **Promote** ang mga nasa waitlist na registration kapag may nabakanteng puwesto
   - **Export CSV** -- I-download ang lahat ng registration, kasama ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

Kung may nakakabit na Registration Questions ang event, ipinapakita rin ng detail page ang filter na **Unanswered questions only** para mabilis na mahanap ang mga nagpapatalang hindi pa nagsusumite ng sagot, at button na **View Answers** sa bawat nasagutang registration para makita ang kanilang mga tugon. Nagdaragdag ang mga bayad na event ng column na **Type**, column na **Paid / Total**, bilang bawat uri, at dialog ng detalye ng bayad -- tingnan ang [Mga Bayad na Registration](paid-registrations#the-registration-roster).

:::tip
Gamitin ang progress bar ng capacity para bantayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag ang event ay nasa o higit pa sa capacity.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](curated-calendar) -- Gumawa ng calendar na kumukuha mula sa maraming grupo
- [Mga Bayad na Registration](paid-registrations) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Gabay sa Event Registration](../guides/event-registration) -- Hakbang-hakbang na gabay sa pag-set up ng event registration
- [Calendars Overview](./) -- Bumalik sa pangkalahatang-tanaw ng mga calendar
