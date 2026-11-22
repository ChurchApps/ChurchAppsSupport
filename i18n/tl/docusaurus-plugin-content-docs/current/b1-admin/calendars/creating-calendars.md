---
title: "Paggawa ng Calendar"
description: "Gumawa ng calendar sa B1 Admin, ikonekta ang mga grupo o mag-import ng .ics file, at pamahalaan ang mga event, registration, at notes nito mula sa iisang lugar."
---

# Paggawa ng Calendar

<div class="article-intro">

Ang paggawa ng calendar sa B1 Admin ay nagbibigay-daan sa iyo na bumuo ng curated na pagtingin sa mga event sa pamamagitan ng pagkonekta ng isa o higit pang grupo. Pinamamahalaan ng mga group leader ang mga event sa loob ng kanilang mga grupo, at ipinapakita ng iyong calendar ang mga event na iyon sa iisang lugar. Maaaring magdagdag o mag-edit ng event para sa anumang grupo ang mga admin na may edit access. Ang mga group leader na hindi admin ay mga event lamang ng grupong pinamumunuan nila ang maaaring pamahalaan.

</div>

## Training Video {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang [mga grupo](../groups/creating-groups.md) na ang mga event ay gusto mong isama sa iyong calendar
- Kailangan mo ang **Edit Content** permission

</div>

## Paggawa ng Bagong Calendar {#creating-a-new-calendar}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Bubukas ang bagong calendar form sa ibaba ng listahan ng calendar.
3. Ilagay ang **Calendar Name** (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. I-click ang **Create** para i-save ang bagong calendar.

Para palitan ang pangalan o burahin ang calendar sa susunod, i-hover ang row nito sa Calendars page at i-click ang **Edit** (o i-click ang **Edit** sa detail page ng calendar).

## Ang Calendar Detail Page {#the-calendar-detail-page}

Pagkatapos gumawa ng calendar, i-click ang pangalan nito (o i-hover ang row nito at i-click ang **Manage Events**) para buksan ang detail page. May dalawang pangunahing bahagi ang pahinang ito:

- **Kaliwang column** -- Ang pangalan ng calendar kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), isang link sa anumang nakabinbing approval, at ang listahan ng **Groups in Calendar** na nagpapakita kung aling mga grupo ang kasama sa calendar na ito. I-click ang **Remove** sa tabi ng grupo para alisin ito sa calendar.
- **Pangunahing bahagi** -- Ang **Calendar Events** view na nagpapakita ng mga event mula sa mga konektadong grupo, kasama ang **Subscribe** at **Add Group** na buttons sa itaas nito. Gamitin ang **Today**, **Back**, **Next**, at ang mga view na **Month**, **Week**, **Day**, at **Agenda** para lumipat-lipat. Ginuguhit ang bawat event sa kulay ng grupo nito. Awtomatikong pinipili ang mga kulay, at pinananatili ng grupo ang parehong kulay sa bawat calendar.

I-click ang **Print** para sa printable na buwan. Nagsisimula ang printout sa light background logo ng iyong simbahan (mula sa [Appearance](../website/appearance.md), kung nagtakda ka nito), ang pangalan ng simbahan, at ang pangalan ng calendar. Bumababa sa mas maraming linya ang mga pangalan ng event sa halip na putulin, at pinananatili ang mga kulay ng grupo.

## Pagkonekta ng Mga Grupo {#connecting-groups}

Ang mga grupong may event sa calendar ay awtomatikong lumalabas sa listahan ng **Groups in Calendar** sa kaliwang bahagi ng detail page.

1. I-click ang **Add Group** sa itaas ng calendar para iugnay ang isang grupo sa iyong calendar.
2. Piliin ang grupo sa **Select a Group**. Kasama sa listahan ang bawat grupo sa iyong simbahan, hindi lamang ang mga grupong kinabibilangan mo.
3. Piliin ang **Add all the events of the group**, o ang **Add specific events** at i-click ang bawat event na gusto mo sa maliit na calendar na lumilitaw.
4. I-click ang **Save**.

Isang beses lamang lumilitaw sa calendar ang bawat event. Kung idinagdag mo ang buong grupo, anumang event nito na naidagdag mo na nang isa-isa ay isasama sa entry ng grupo, at ang pagpili ng partikular na event mula sa grupong nasa calendar na ay walang idadagdag na bago. Tanging ang mga grupong idinagdag nang buo ang nakalista sa ilalim ng **Groups in Calendar**.

### Pag-import ng .ics File {#importing-an-ics-file}

I-click ang **Import .ics** para kumuha ng mga event mula sa ibang calendar. Piliin ang **Group** kung saan dapat kabilang ang mga event, pagkatapos i-click ang **Choose .ics file** o i-paste ang nilalaman ng file, at i-click ang **Import**. Gagawin ang mga event sa grupong iyon, at idadagdag ang grupo sa calendar kung saan ka nag-import, kaya agad na lilitaw doon ang mga event.

### Pag-alis ng Event sa Calendar {#removing-an-event-from-the-calendar}

I-click ang isang event sa calendar, pagkatapos i-click ang **Remove from Calendar**. Tanging aalisin nito ang event sa calendar na ito -- mananatili ang mismong event sa grupo nito. Kung nasa calendar ang event dahil idinagdag ang buong grupo, ang pag-alis nito ay mag-aalis ng lahat ng event ng grupong iyon sa calendar na ito (mananatili pa rin sa grupo ang mga event). Para permanenteng burahin ang event, burahin ito mula sa [calendar ng grupo](../groups/group-calendar.md).

:::tip
Malakas na paraan ang pagkonekta ng mga grupo sa iyong calendar para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa calendar ng buong simbahan nang walang karagdagang gawain mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang calendar na kumukuha ng mga event mula sa maraming grupo sa buong simbahan, tingnan ang [Curated Calendar](./curated-calendar.md) para sa mas maayos na paraan.
:::

## Pagdaragdag at Pag-edit ng Mga Event {#adding-and-editing-events}

I-click ang **New Event** sa calendar detail page para magdagdag ng event, o i-click ang isang event sa calendar at pagkatapos i-click ang **Edit** para baguhin ito. May mga field na ito ang **New Event** / **Edit Event** form:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may event templates ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang laman na photo box) para pumili o mag-upload ng larawan, na ginupit sa malapad na hugis na 16:9. I-click ang **Change Photo** para palitan ito. Ipinapakita ang larawan sa itaas ng page ng event sa iyong website at bilang tile nito kapag ipinakita ng Calendar element ang **Upcoming events** (tingnan ang [Showing Events on Your Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa page ng event sa iyong website. Sinusuportahan ang bold na teksto, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, gaya ng `youth, students`. Maaaring itakda ang Calendar element sa iyong website na magpakita lamang ng mga event na may partikular na tag. Ito ang parehong **Tags** field na makikita sa registration settings ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang makakabasa at makakadagdag sa notes ng event (tingnan ang [Event Notes](#event-notes)). Piliin ang **Staff only** (default), **Group leaders** (mga lider ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga lider nito).
- **Rooms** at **Resources** -- Mag-reserve ng espasyo at kagamitan para sa event. Tingnan ang [Rooms, Resources & Scheduling](./rooms-resources.md). Kapag napili na ang isa, maaari ka ring magdagdag ng setup at teardown time o custom reservation window -- tingnan ang [Booking a Room or Resource](./availability.md#booking-a-room-or-resource).
- **Reminders** -- I-expand ang seksyong ito para magpadala ng paalala bago ang event. Tingnan ang [Event Reminders](./event-reminders.md).

Kinakailangan ang **Group**, **Title**, **Start**, at **End**, at dapat mas huli ang end kaysa sa start. I-click ang **Save**. Para burahin ang event, buksan ito sa editor at i-click ang **Delete**.

### Pagbabago ng Isang Petsa ng Umuulit na Event {#changing-one-date-of-a-recurring-event}

Kapag nag-click ka ng petsa ng umuulit na event sa calendar at pagkatapos ay **Edit**, magtatanong ang pag-save o pagbura kung aling mga petsa ang babaguhin:

- **Just this date** -- Ang petsang na-click mo lamang. Sa pag-save, ang petsang iyon ay magiging sarili nitong one-time event na may iyong mga pagbabago, at mananatili ang natitirang bahagi ng serye gaya ng dati. Sa pagbura, ang petsang iyon lamang ang aalisin.
- **This and all following dates** -- Magtatapos ang serye sa araw bago ang petsang na-click mo. Sa pag-save, ang iyong mga pagbabago ay magsisimula ng bagong serye mula sa petsang iyon; sa pagbura, aalisin ang natitirang mga petsa.
- **All dates** -- Ang buong serye, gaya ng dati.

Ipinapakita ng form ang unang petsa ng serye, ngunit inililipat ng **Just this date** at **This and all following dates** ang iyong mga pagbabago sa oras papunta sa petsang na-click mo. Ang petsang nahiwalay ay nananatili sa mga kuwarto at resource ng serye, nagkakaroon ng sarili nitong mga booking, at hindi kinokopya ang mga reminder ng serye. Kung magbubukas ka ng umuulit na event nang hindi pumipili ng petsa (halimbawa, mula sa **Approvals**), magtatanong muna ang B1 para kumpirmahin, dahil ina-update ng pag-save ang bawat petsa sa serye.

### Event Notes {#event-notes}

May sariling notes thread ang bawat event para sa pagpaplano at follow-up. I-click ang event sa calendar detail page; ipinapakita ng dialog ang mga detalye ng event, mga reminder nito, at ang **Notes** nito sa ibaba, kasama ang mga button na **Edit**, **Manage Registrations**, at **Remove from Calendar**. Mag-type ng note at i-post ito para idagdag sa thread.

Palaging nababasa at nakakapag-post ng event notes ang staff na may permission na mag-edit ng content o mag-administer ng calendar. Tinutukoy ng mga setting na **Who can view notes** at **Who can post notes** sa event kung makakagawa rin ito ang mga lider o miyembro ng grupo ng event.

### Pagpapakita ng Mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang calendar sa iyong website, magdagdag ng **Calendar** element sa isang page at piliin ang calendar na ito. Maaaring magpakita ang element ng buwanang calendar o grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may isang tag. Kapag nag-click ang mga bisita ng event, bubukas ang sarili nitong event page. Tingnan ang [Using the Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pagpapagana ng Event Registration {#enabling-event-registration}

Maaari mong paganahin ang registration para sa anumang event sa calendar para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang umiiral na event sa calendar (gawin muna ito kung kailangan) at i-click ang **Manage Registrations**. Bubukas ang registration page ng event. (Dinadala ka ng button na **Turn on registration** sa pahina ng **Registrations** sa iyong mga calendar para pumili ng event.)
2. I-click ang **Edit settings**, pagkatapos i-on ang **Enable Registration** sa **Registration Settings** card.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng registration. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal., "youth, retreat, vbs") para makatulong i-kategorya ang mga event na maaaring i-register.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para sagutin ng mga nagpapatala ang dagdag na tanong (dietary restrictions, laki ng T-shirt, emergency contact, atbp.) bilang bahagi ng pag-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag napuno ang event, hahayaan ang mga karagdagang nagpapatala na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Paid Registrations](./paid-registrations.md#waitlist).
4. I-click ang **Save Settings**.

Para sa mga bayad na event, pinapayagan ka ng parehong settings page na magtakda ng may presyong **Attendee Types**, opsyonal na **Selections** (mga add-on), at **Discount Codes**, na may bayad na kokolektahin sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](./paid-registrations.md) para sa kumpletong gabay.

Kapag naka-enable na ang registration, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1.church o sa B1 App](../../b1-church/events/registering.md). Kung naglakip ka ng form, makakakita ang mga nagpapatala ng hakbang na **Questions** habang nagpapatala, at ise-save ang kanilang mga sagot kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Awtomatikong nilalaktawan ang restricted na form habang nagpapatala sa halip na ipakita, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa event.
:::

### Pagbabahagi ng Link ng Event {#sharing-an-event-link}

Para mag-imbita ng mga taong wala sa database ng iyong simbahan, ibahagi ang sariling page ng event. I-click ang event sa calendar at i-click ang **Share**, o i-click ang **Share** sa registration page ng event. Ipinapakita ng dialog ang link ng event at isang QR code: i-click ang copy icon para kopyahin ang link, o i-click ang **Download PNG** para i-save ang QR code para sa flyer o slide. Ang sinumang may link ay makakakita ng event, maidadagdag ito sa kanilang calendar, at, kapag naka-on ang registration, makakapagpatala bilang bisita gamit lamang ang pangalan at email.

Ang **Private** na event ay nananatiling wala sa site calendar mo ngunit maibabahagi pa rin kapag naka-on na ang registration. Ang private na event na walang registration ay walang public page, kaya walang button na **Share** dito.

Sa B1 App, ang mga event sa calendar ng grupo ay may link na **Share** na nagbubukas ng share sheet ng telepono na may parehong link.

### Pamamahala ng Registrations {#managing-registrations}

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang table ng lahat ng event na may naka-enable na registration, na nagpapakita ng title ng event, petsa, kasalukuyang bilang ng registration kumpara sa capacity, at mga tag. Mag-type sa **Search events** para i-filter ito.
3. I-click ang pangalan ng event para makita ang kumpletong listahan ng mga registration, kasama ang mga column na **Name**, **Members**, **Type**, **Paid / Total**, **Status**, at **Date**.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong irehistro ang isang taong nag-sign up offline o sa telepono.
   - **Cancel Registration** sa indibidwal na mga registration (hihingi ng kumpirmasyon)
   - **Delete** ang mga registration nang permanente (hihingi ng kumpirmasyon)
   - **Promote** ang mga nasa waitlist na registration kapag may nabakanteng puwesto
   - **Export CSV** -- I-download ang lahat ng registration, kabilang ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

   Ang mga row action na ito ay mga icon sa dulo ng bawat row; i-hover ang icon para makita ang pangalan nito.

Kung may nakalakip na Registration Questions ang event, nagpapakita rin ang detail page ng filter na **Unanswered questions only** para mabilis na mahanap ang mga nagpapatalang hindi pa nagsusumite ng sagot, at button na **View Answers** sa bawat registration na may sagot para makita ang kanilang tugon. Nagpapakita rin ng bilang kada uri sa itaas ng table ang mga event na may attendee types, at may dialog na **Registration Details** ang bawat row na may mga bayad -- tingnan ang [Paid Registrations](./paid-registrations.md#the-registration-roster).

Sa kaliwang bahagi ng detail page, makikita kung ilang tao ang nakarehistro (ang nagpapatala at ang lahat ng nasa kanilang registration), kasama ang capacity bar, bilang ng waitlist kung mayroon, mga tag ng event, at ang **Reminders** nito. Ang pamagat ng card na **Registrations** ay nagbibilang ng registration sa halip, na siyang nililimitahan ng capacity -- kaya ang isang pamilyang apat ang tao ay isang registration ngunit apat na tao.

:::tip
Gamitin ang capacity progress bar sa Registrations page para bantayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag nasa o higit pa sa capacity ang event.
:::

## Mga Susunod na Hakbang {#next-steps}

- [Curated Calendar](./curated-calendar.md) -- Gumawa ng calendar na kumukuha mula sa maraming grupo
- [Paid Registrations](./paid-registrations.md) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Event Registration Guide](../guides/event-registration.md) -- Gabay na hakbang-hakbang sa pag-set up ng event registration
- [Calendars Overview](./index.md) -- Bumalik sa pangkalahatang-tanaw ng calendars
