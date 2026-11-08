---
title: "Paglikha ng mga Kalendaryo"
description: "Gumawa ng kalendaryo sa B1 Admin, ikonekta ang mga grupo o mag-import ng .ics na file, at pamahalaan ang mga event, rehistro, at tala nito mula sa iisang lugar."
---

# Paglikha ng mga Kalendaryo

<div class="article-intro">

Ang paggawa ng kalendaryo sa B1 Admin ay nagbibigay-daan sa iyo na bumuo ng piniling pagtingin sa mga event sa pamamagitan ng pagkonekta ng isa o higit pang grupo. Ang mga event ay pinamamahalaan ng mga lider ng grupo sa loob ng kanilang mga grupo, at ipinapakita ng iyong kalendaryo ang mga event na iyon sa iisang lugar. Maaaring magdagdag o mag-edit ng mga event para sa anumang grupo ang mga admin na may access sa pag-edit. Ang mga lider ng grupo na hindi admin ay maaari lamang mamahala ng mga event para sa mga grupong pinamumunuan nila.

</div>

## Video ng Pagsasanay

<YouTube id="Ko3kgsCSLFs" title="Paglikha ng Kalendaryo, Event, at Pag-book ng Kuwarto sa B1" next="Rehistro sa Event at mga Bayad na Event sa B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang [mga grupo](../groups/creating-groups.md) na ang mga event ay nais mong isama sa iyong kalendaryo
- Kailangan mo ng administrative access sa seksyong Calendars sa B1 Admin

</div>

## Paglikha ng Bagong Kalendaryo

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Bumubukas ang bagong form ng kalendaryo sa ibaba ng listahan ng mga kalendaryo.
3. Ilagay ang **name** ng iyong kalendaryo (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Maglagay ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang kalendaryong ito.
5. I-click ang **Create** para i-save ang iyong bagong kalendaryo.

## Ang Detail Page ng Kalendaryo

Pagkatapos gumawa ng kalendaryo, i-click ang **Manage Events** sa row nito para buksan ang detail page. May dalawang pangunahing bahagi ang pahinang ito:

- **Kaliwang column** -- Ang pangalan ng kalendaryo kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), kasunod ang listahan ng **Groups in Calendar** na nagpapakita kung aling mga grupo ang kasama sa kalendaryong ito. I-click ang **Remove** sa tabi ng isang grupo para alisin ito sa kalendaryo.
- **Pangunahing bahagi** -- Ang view ng **Calendar Events** na nagpapakita ng mga event mula sa mga konektadong grupo, na may mga button na **Subscribe** at **Add Group** sa itaas nito.

## Pagkonekta ng mga Grupo

Ang mga grupong may event sa kalendaryo ay awtomatikong lumalabas sa listahan ng **Groups in Calendar** sa kaliwang bahagi ng detail page.

1. I-click ang **Add Group** sa itaas ng kalendaryo para iugnay ang isang grupo sa iyong kalendaryo.
2. Piliin ang grupo mula sa dropdown. Kasama sa listahan ang bawat grupo sa iyong simbahan, hindi lamang ang mga grupong kinabibilangan mo.
3. Piliin kung isasama ang **all events** mula sa grupong iyon o **specific events** lamang.
4. I-click ang **Save**.

Bawat event ay lumalabas sa kalendaryo nang isang beses lamang. Kapag nagdagdag ka ng buong grupo, ang alinmang event nito na dati mo nang naidagdag nang isa-isa ay isasama sa entry ng grupo, at ang pagpili ng mga partikular na event mula sa grupong nasa kalendaryo na ay walang idinadagdag na bago. Ang mga grupong idinagdag nang buo lamang ang nakalista sa ilalim ng **Groups in Calendar**.

### Pag-import ng .ics File

I-click ang **Import .ics** para mag-import ng mga event mula sa ibang kalendaryo. Piliin ang **Group** kung saan dapat kabilang ang mga event, pagkatapos i-click ang **Choose .ics file** o i-paste ang nilalaman ng file, at i-click ang **Import**. Ang mga event ay gagawin sa grupong iyon, at idadagdag ang grupo sa kalendaryong pinanggalingan ng import, kaya agad silang lilitaw doon.

### Pag-alis ng Event sa Kalendaryo

I-click ang isang event sa kalendaryo, pagkatapos i-click ang **Remove from Calendar**. Inaalis lamang nito ang event sa kalendaryong ito -- nananatili ang event mismo sa grupo nito. Kung nasa kalendaryo ang event dahil naidagdag ang buong grupo nito, ang pag-alis dito ay mag-aalis ng lahat ng event ng grupong iyon sa kalendaryong ito (mananatili pa rin ang mga event sa grupo). Para tuluyang burahin ang isang event, burahin ito mula sa [kalendaryo ng grupo](../groups/group-calendar.md).

:::tip
Ang pagkonekta ng mga grupo sa iyong kalendaryo ay mabisang paraan para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa kalendaryo ng buong simbahan nang walang karagdagang gawain mula sa iyo.
:::

:::info
Kung nais mong gumawa ng iisang kalendaryo na kumukuha ng mga event mula sa maraming grupo sa iyong simbahan, tingnan ang [Curated Calendar](./curated-calendar.md) para sa mas maayos na paraan.
:::

## Pagdaragdag at Pag-edit ng mga Event {#adding-and-editing-events}

I-click ang **New Event** sa detail page ng kalendaryo para magdagdag ng event, o i-click ang isang event sa kalendaryo at pagkatapos ay i-click ang **Edit** para baguhin ito. May mga sumusunod na field ang form na **New Event** / **Edit Event**:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may mga event template ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang laman na kahon ng larawan) para pumili o mag-upload ng larawan, na i-crop sa malapad na hugis na 16:9. I-click ang **Change Photo** para palitan ito. Ipinapakita ang larawan sa itaas ng pahina ng event sa iyong website at bilang tile nito kapag ipinapakita ng elemento ng Calendar ang **Upcoming events** (tingnan ang [Pagpapakita ng mga Event sa Iyong Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa pahina ng event sa iyong website. Suportado ang bold na teksto, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, tulad ng `youth, students`. Maaaring itakda ang elemento ng Calendar sa iyong website na magpakita lamang ng mga event na may partikular na tag. Ito ang parehong field na **Tags** na makikita sa mga setting ng rehistro ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang maaaring magbasa at magdagdag sa mga tala ng event (tingnan ang [Mga Tala ng Event](#event-notes)). Piliin ang **Staff only** (ang default), **Group leaders** (mga lider ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga lider nito).
- **Rooms** at **Resources** -- Mag-reserba ng espasyo at kagamitan para sa event. Tingnan ang [Mga Kuwarto, Resources & Scheduling](./rooms-resources.md).

I-click ang **Save**. Kung umuulit ang event, hihingi ng kumpirmasyon ang B1, dahil ang pag-save ay mag-a-update sa bawat occurrence sa serye.

### Mga Tala ng Event {#event-notes}

Bawat event ay may sariling thread ng tala para sa pagpaplano at follow-up. I-click ang event sa detail page ng kalendaryo; ipinapakita ng dialog ang mga detalye ng event, ang mga paalala nito, at ang **Notes** nito sa ibaba. I-type ang tala at i-post ito para idagdag sa thread.

Ang mga staff na may pahintulot na mag-edit ng nilalaman o mag-administer ng mga kalendaryo ay palaging nakakabasa at nakakapag-post ng mga tala ng event. Ang mga setting na **Who can view notes** at **Who can post notes** sa event ang nagpapasya kung maaari rin itong gawin ng mga lider o miyembro ng grupo ng event.

### Pagpapakita ng mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang kalendaryo sa iyong website, magdagdag ng elemento ng **Calendar** sa isang pahina at piliin ang kalendaryong ito. Maaaring ipakita ng elemento ang buwanang kalendaryo o grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may isang tag. Kapag nag-click ang mga bisita sa isang event, bubukas ang sarili nitong pahina ng event. Tingnan ang [Paggamit ng Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pagpapagana ng Rehistro sa Event {#enabling-event-registration}

Maaari mong paganahin ang rehistro para sa anumang event sa kalendaryo para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para paganahin ito.
3. I-configure ang mga setting ng rehistro:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng mga rehistro. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang rehistro.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang rehistro.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") para makatulong sa pag-uuri ng mga event na maaaring pagparehistruhan.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para masagot ng mga magpaparehistro ang karagdagang tanong (mga paghihigpit sa pagkain, laki ng T-shirt, emergency contact, atbp.) habang nagsa-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag napuno ang event, pinapayagan ang mga karagdagang magpaparehistro na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Mga Bayad na Rehistro](./paid-registrations.md#waitlist).
4. I-save ang event.

Para sa mga bayad na event, pinapayagan ka ng parehong pahina ng settings na magtakda ng may-presyong **Attendee Types**, opsyonal na **Selections** (mga add-on), at **Discount Codes**, na may bayad na kinokolekta sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Mga Bayad na Rehistro](./paid-registrations.md) para sa buong gabay.

Kapag naka-enable na ang rehistro, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1.church o sa B1 App](../../b1-church/events/registering.md). Kung naglakip ka ng form, makikita ng mga magpaparehistro ang hakbang na **Questions** habang nagpaparehistro, at ang kanilang mga sagot ay sine-save kasama ng kanilang rehistro.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Nilalaktawan nang awtomatiko ang restricted na form habang nagpaparehistro sa halip na ipakita, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa event.
:::

### Pamamahala ng mga Rehistro

Para tingnan at pamahalaan ang mga rehistro para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang isang talahanayan ng lahat ng event na naka-enable ang rehistro, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng rehistro kumpara sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga rehistro, kabilang ang mga pangalan, bilang ng miyembro, attendee types, katayuan ng bayad, at petsa ng rehistro.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong irehistro ang isang taong nag-sign up offline o sa telepono.
   - **Cancel** ng indibidwal na rehistro
   - **Delete** ng mga rehistro nang tuluyan
   - **Promote** ng mga rehistrong nasa waitlist kapag nagkaroon ng bakanteng puwesto
   - **Export CSV** -- I-download ang lahat ng rehistro, kabilang ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

Kung may nakalakip na Registration Questions ang event, nagpapakita rin ang detail page ng filter na **Unanswered questions only** para mabilis na mahanap ang mga magpaparehistrong hindi pa nagsusumite ng sagot, at button na **View Answers** sa bawat nasagutang rehistro para makita ang kanilang mga tugon. Nagdaragdag ang mga bayad na event ng column na **Type**, column na **Paid / Total**, mga bilang ayon sa uri, at dialog ng detalye ng bayad -- tingnan ang [Mga Bayad na Rehistro](./paid-registrations.md#the-registration-roster).

:::tip
Gamitin ang progress bar ng capacity para subaybayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag ang event ay nasa o lumampas sa capacity.
:::

## Susunod na Hakbang

- [Curated Calendar](./curated-calendar.md) -- Gumawa ng kalendaryong kumukuha mula sa maraming grupo
- [Mga Bayad na Rehistro](./paid-registrations.md) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Gabay sa Rehistro ng Event](../guides/event-registration.md) -- Hakbang-hakbang na gabay sa pag-set up ng rehistro ng event
- [Pangkalahatang-tanaw ng Calendars](./index.md) -- Bumalik sa pangkalahatang-tanaw ng mga kalendaryo
