---
title: "Paglikha ng mga Kalendaryo"
description: "Gumawa ng kalendaryo sa B1 Admin, ikonekta ang mga grupo o mag-import ng .ics file, at pamahalaan ang mga event, registration, at tala nito mula sa iisang lugar."
---

# Paglikha ng mga Kalendaryo

<div class="article-intro">

Ang paggawa ng kalendaryo sa B1 Admin ay nagbibigay-daan sa iyong bumuo ng piniling pagtingin sa mga event sa pamamagitan ng pagkonekta ng isa o higit pang grupo. Ang mga event ay pinamamahalaan ng mga group leader sa loob ng kani-kanilang grupo, at ipinapakita ng iyong kalendaryo ang mga event na iyon sa iisang lugar. Maaaring magdagdag o mag-edit ng event para sa anumang grupo ang mga admin na may edit access. Ang mga group leader na hindi admin ay maaari lamang mamahala ng mga event para sa mga grupong pinamumunuan nila.

</div>

## Training Video

<YouTube id="Ko3kgsCSLFs" title="Paglikha ng Kalendaryo, Event, at Pag-book ng Kuwarto sa B1" next="Rehistro sa Event at mga Bayad na Event sa B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang mga [grupo](../groups/creating-groups.md) na ang mga event ay gusto mong isama sa iyong kalendaryo
- Kailangan mo ng administrative access sa seksyong Calendars sa B1 Admin

</div>

## Paggawa ng Bagong Kalendaryo

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Bubukas ang bagong form ng kalendaryo sa ibaba ng listahan ng kalendaryo.
3. Ilagay ang **name** ng iyong kalendaryo (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Maglagay ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang kalendaryong ito.
5. I-click ang **Create** para i-save ang bagong kalendaryo.

## Ang Detail Page ng Kalendaryo

Pagkatapos gumawa ng kalendaryo, i-click ang **Manage Events** sa row nito para buksan ang detail page. May dalawang pangunahing bahagi ang pahinang ito:

- **Kaliwang column** -- Ang pangalan ng kalendaryo kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), kasunod ang listahang **Groups in Calendar** na nagpapakita kung aling mga grupo ang kasama sa kalendaryong ito. I-click ang **Remove** sa tabi ng isang grupo para alisin ito sa kalendaryo.
- **Pangunahing bahagi** -- Ang view na **Calendar Events** na nagpapakita ng mga event mula sa mga konektadong grupo, kasama ang mga button na **Subscribe** at **Add Group** sa itaas nito. Kulay ng grupo ang bawat event. Awtomatikong pinipili ang mga kulay, at pareho ang kulay ng isang grupo sa bawat kalendaryo.

I-click ang **Print** para sa naka-print na buwan. Nagsisimula ang printout sa light background logo ng iyong simbahan (mula sa [Appearance](../website/appearance.md), kung nagtakda ka nito), ang pangalan ng simbahan, at ang pangalan ng kalendaryo. Binabalot sa mas maraming linya ang mga pangalan ng event sa halip na putulin, at nananatili ang mga kulay ng grupo.

## Pagkonekta ng mga Grupo

Ang mga grupong may event sa kalendaryo ay awtomatikong lumalabas sa listahang **Groups in Calendar** sa kaliwang bahagi ng detail page.

1. I-click ang **Add Group** sa itaas ng kalendaryo para iugnay ang isang grupo rito.
2. Piliin ang grupo mula sa dropdown. Kasama rito ang bawat grupo sa iyong simbahan, hindi lang ang mga grupong kinabibilangan mo.
3. Piliin kung isasama ang **all events** ng grupong iyon o **specific events** lamang.
4. I-click ang **Save**.

Isang beses lang lumilitaw ang bawat event sa kalendaryo. Kapag idinagdag mo ang buong grupo, ang alinmang event ng grupong dati mo nang idinagdag nang isa-isa ay isasama sa entry ng grupo, at ang pagpili ng specific events mula sa grupong nasa kalendaryo na ay walang idinadagdag na bago. Tanging ang mga grupong idinagdag nang buo ang nakalista sa ilalim ng **Groups in Calendar**.

### Pag-import ng .ics File

I-click ang **Import .ics** para mag-import ng mga event mula sa ibang kalendaryo. Piliin ang **Group** kung saan dapat kabilang ang mga event, pagkatapos i-click ang **Choose .ics file** o i-paste ang laman ng file, at i-click ang **Import**. Gagawin ang mga event sa grupong iyon, at idadagdag ang grupo sa kalendaryong pinanggalingan ng import para agad silang makita roon.

### Pag-alis ng Event sa Kalendaryo

I-click ang isang event sa kalendaryo, pagkatapos i-click ang **Remove from Calendar**. Inaalis lang nito ang event sa kalendaryong ito -- nananatili pa rin ang event sa grupo nito. Kung nasa kalendaryo ang event dahil buong idinagdag ang grupo nito, ang pag-alis dito ay magtatanggal ng lahat ng event ng grupong iyon sa kalendaryong ito (nananatili pa rin ang mga event sa grupo). Para tuluyang burahin ang event, burahin ito mula sa [kalendaryo ng grupo](../groups/group-calendar.md).

:::tip
Mabisang paraan ang pagkonekta ng mga grupo sa iyong kalendaryo para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa kalendaryo ng buong simbahan nang walang karagdagang gawain mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang kalendaryo na kumukuha ng mga event mula sa maraming grupo sa buong simbahan, tingnan ang [Curated Calendar](./curated-calendar.md) para sa mas maayos na paraan.
:::

## Pagdaragdag at Pag-edit ng mga Event {#adding-and-editing-events}

I-click ang **New Event** sa detail page ng kalendaryo para magdagdag ng event, o i-click ang isang event sa kalendaryo at pagkatapos ay i-click ang **Edit** para baguhin ito. May mga sumusunod na field ang form na **New Event** / **Edit Event**:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may mga event template ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang lamang kahon ng larawan) para pumili o mag-upload ng larawan, na ginugupitan sa malapad na 16:9 na hugis. I-click ang **Change Photo** para palitan ito. Ipinapakita ang larawan sa itaas ng pahina ng event sa iyong website at bilang tile nito kapag ipinapakita ng isang elemento ng Calendar ang **Upcoming events** (tingnan ang [Pagpapakita ng mga Event sa Iyong Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa pahina ng event sa iyong website. Suportado ang bold na teksto, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, gaya ng `youth, students`. Maaaring itakda ang isang Calendar element sa iyong website na magpakita lamang ng mga event na may isang partikular na tag. Ito rin ang field na **Tags** na makikita sa mga setting ng registration ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang makakabasa at makakapagdagdag sa mga tala ng event (tingnan ang [Mga Tala ng Event](#event-notes)). Piliin ang **Staff only** (ang default), **Group leaders** (mga leader ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga leader nito).
- **Rooms** at **Resources** -- Mag-reserve ng espasyo at kagamitan para sa event. Tingnan ang [Rooms, Resources & Scheduling](./rooms-resources.md).

I-click ang **Save**. Kung umuulit ang event, hihingi ng kumpirmasyon ang B1 dahil ina-update ng pag-save ang bawat occurrence sa serye.

### Mga Tala ng Event {#event-notes}

May sariling thread ng tala ang bawat event para sa pagpaplano at follow-up. I-click ang isang event sa detail page ng kalendaryo; ipinapakita ng dialog ang mga detalye ng event, ang mga paalala nito, at ang **Notes** sa ibaba. I-type ang tala at i-post ito para idagdag sa thread.

Ang mga staff na may pahintulot na mag-edit ng content o mag-administer ng mga kalendaryo ay laging nakakabasa at nakakapag-post ng mga tala ng event. Ang mga setting na **Who can view notes** at **Who can post notes** ng event ang nagpapasya kung makakagawa rin nito ang mga leader o miyembro ng grupo ng event.

### Pagpapakita ng mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang kalendaryo sa iyong website, magdagdag ng **Calendar** element sa isang pahina at piliin ang kalendaryong ito. Maaaring magpakita ang element ng buwanang kalendaryo o grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may isang tag. Kapag nag-click ang mga bisita ng isang event, bubukas ang sarili nitong pahina ng event. Tingnan ang [Paggamit ng Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pag-e-enable ng Event Registration {#enabling-event-registration}

Maaari mong i-enable ang registration para sa anumang event sa kalendaryo para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para i-enable ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng magpaparehistro. Iwanang blangko para walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") para matulungan ang pag-uuri ng mga event na maaaring paglahukan.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para sagutin ng mga magpaparehistro ang karagdagang tanong (mga paghihigpit sa pagkain, laki ng T-shirt, emergency contact, atbp.) habang nagsa-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag napuno ang event, papayagan ang mga karagdagang magpaparehistro na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Waitlist](./paid-registrations.md#waitlist).
4. I-save ang event.

Para sa mga bayad na event, makikita rin sa parehong settings page ang pagtatakda ng may-presyong **Attendee Types**, opsyonal na **Selections** (mga add-on), at **Discount Codes**, na may bayad na kinokolekta sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](./paid-registrations.md) para sa buong gabay.

Kapag naka-enable na ang registration, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1.church o sa B1 App](../../b1-church/events/registering.md). Kung may nakalakip kang form, makakakita ng hakbang na **Questions** ang mga magpaparehistro habang nagpaparehistro, at ise-save kasama ng kanilang registration ang kanilang mga sagot.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Awtomatikong nilalaktawan ang restricted na form habang nagpaparehistro sa halip na ipakita, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa event.
:::

### Pamamahala ng mga Registration

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang talahanayan ng lahat ng event na naka-enable ang registration, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng registration laban sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga registration, kasama ang mga pangalan, bilang ng miyembro, attendee type, status ng bayad, at petsa ng registration.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong irehistro ang taong nag-sign up offline o sa telepono.
   - **Cancel** ng mga indibidwal na registration
   - **Delete** ng mga registration nang permanente
   - **Promote** ng mga waitlisted na registration kapag may nagbukas na puwesto
   - **Export CSV** -- I-download ang lahat ng registration, kasama ang attendee type, mga selection, halaga ng bayad, at mga sagot sa tanong

Kung may nakalakip na Registration Questions ang event, may filter din sa detail page na **Unanswered questions only** para mabilis na mahanap ang mga magpaparehistrong hindi pa nagsusumite ng sagot, at may button na **View Answers** sa bawat nasagutang registration para makita ang kanilang mga tugon. Nagdaragdag ang mga bayad na event ng column na **Type**, column na **Paid / Total**, bilang bawat uri, at dialog ng detalye ng bayad -- tingnan ang [Ang Registration Roster](./paid-registrations.md#the-registration-roster).

:::tip
Gamitin ang progress bar ng capacity para subaybayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag ang event ay nasa o lampas na sa capacity.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](./curated-calendar.md) -- Gumawa ng kalendaryong kumukuha mula sa maraming grupo
- [Paid Registrations](./paid-registrations.md) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Event Registration Guide](../guides/event-registration.md) -- Hakbang-hakbang na gabay sa pag-set up ng event registration
- [Calendars Overview](./index.md) -- Bumalik sa pangkalahatang-ideya ng mga kalendaryo
