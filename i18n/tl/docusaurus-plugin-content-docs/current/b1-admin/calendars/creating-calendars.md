---
title: "Paggawa ng Calendar"
---

# Paggawa ng Calendar

<div class="article-intro">

Ang paggawa ng calendar sa B1 Admin ay nagbibigay-daan sa iyong bumuo ng curated na pagtingin sa mga event sa pamamagitan ng pag-uugnay ng isa o higit pang grupo. Ang mga event ay pinamamahalaan ng mga group leader sa loob ng kanilang mga grupo, at ipinapakita ng iyong calendar ang mga event na iyon sa iisang lugar. Ang mga admin na may edit access ay maaaring magdagdag o mag-edit ng event para sa kahit anong grupo. Ang mga group leader na hindi admin ay maaari lang mamahala ng event para sa mga grupong pinamumunuan nila.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang mga [grupo](../groups/creating-groups.md) na gusto mong isama ang mga event sa iyong calendar
- Kailangan mo ng administrative access sa Calendars section ng B1 Admin

</div>

## Paggawa ng Bagong Calendar

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), i-expand ang **Calendars**, at i-click ang **Calendars**.
2. I-click ang **Add Calendar** sa itaas ng pahina. Magbubukas ang bagong calendar form sa ilalim ng listahan ng calendar.
3. Maglagay ng **name** para sa iyong calendar (halimbawa, "Youth Ministry Events" o "Main Church Calendar").
4. Maglagay ng opsyonal na **description** para matulungan ang iyong team na maunawaan kung para saan ang calendar na ito.
5. I-click ang **Create** para i-save ang bago mong calendar.

## Ang Calendar Detail Page

Pagkatapos gumawa ng calendar, i-click ang **Manage Events** sa row nito para buksan ang detail page. May dalawang pangunahing bahagi ang pahinang ito:

- **Kaliwang column** -- Ang pangalan ng calendar kasama ang mga aksyon nito (**New Event**, **Edit**, **Import .ics**, at **Print**), sinusundan ng listahang **Groups in Calendar** na nagpapakita ng mga grupong kasama sa calendar na ito. I-click ang **Remove** sa tabi ng grupo para alisin ito sa calendar.
- **Pangunahing bahagi** -- Ang **Calendar Events** view na nagpapakita ng mga event mula sa mga konektadong grupo, kasama ang mga button na **Subscribe** at **Add Group** sa itaas nito.

## Pag-uugnay ng mga Grupo

Ang mga grupong may event sa calendar ay awtomatikong lumalabas sa listahang **Groups in Calendar** sa kaliwang bahagi ng detail page.

1. I-click ang **Add Group** sa itaas ng calendar para iugnay ang isang grupo sa iyong calendar.
2. Piliin ang grupo mula sa dropdown. Kasama sa listahan ang bawat grupo sa iyong simbahan, hindi lang ang mga grupong kinabibilangan mo.
3. Piliin kung isasama ang **lahat ng event** mula sa grupong iyon o **mga partikular na event** lamang.
4. I-click ang **Save**.

Lumalabas ang bawat event sa calendar nang isang beses lang. Kung idinagdag mo ang buong grupo, ang alinmang event nito na dati mo nang naidagdag isa-isa ay isasama na sa entry ng grupo, at ang pagpili ng partikular na event mula sa grupong nasa calendar na ay walang madadagdag na bago. Ang mga grupong idinagdag nang buo lang ang nakalista sa ilalim ng **Groups in Calendar**.

### Pag-import ng .ics File

I-click ang **Import .ics** para mag-import ng mga event mula sa ibang calendar. Piliin ang **Group** kung saan dapat mapunta ang mga event, pagkatapos i-click ang **Choose .ics file** o i-paste ang laman ng file, at i-click ang **Import**. Gagawin ang mga event sa grupong iyon, at idadagdag ang grupo sa calendar na pinanggalingan ng import, kaya agad lumalabas doon ang mga event.

### Pag-alis ng Event sa Calendar

I-click ang isang event sa calendar, pagkatapos i-click ang **Remove from Calendar**. Inaalis lang nito ang event sa calendar na ito -- nananatili ang event sa sarili nitong grupo. Kung nasa calendar ang event dahil idinagdag ang buong grupo, ang pag-alis nito ay mag-aalis ng lahat ng event ng grupong iyon sa calendar na ito (nananatili pa rin sa grupo ang mga event). Para tuluyang burahin ang event, burahin ito mula sa [calendar ng grupo](../groups/group-calendar.md).

:::tip
Ang pag-uugnay ng mga grupo sa iyong calendar ay makapangyarihang paraan para awtomatikong pagsamahin ang mga event. Kapag nagdagdag ang isang group leader ng event sa kanilang [grupo](../groups/creating-groups.md), maaari itong dumaloy sa calendar ng buong simbahan nang walang dagdag na trabaho mula sa iyo.
:::

:::info
Kung gusto mong gumawa ng iisang calendar na kumukuha ng mga event mula sa maraming grupo sa buong simbahan, tingnan ang [Curated Calendar](curated-calendar) para sa mas maayos na paraan.
:::

## Pagdagdag at Pag-edit ng mga Event {#adding-and-editing-events}

I-click ang **New Event** sa calendar detail page para magdagdag ng event, o i-click ang isang event sa calendar at pagkatapos i-click ang **Edit** para baguhin ito. May mga sumusunod na field ang **New Event** / **Edit Event** form:

- **Group** -- Ang grupong kinabibilangan ng event. Kung may mga event template ang iyong simbahan, maaari ka ring pumili ng **Template** para punan ang form.
- **Title**
- **Event photo** -- I-click ang **Add Photo** (o ang walang laman na kahon ng larawan) para pumili o mag-upload ng larawan, ginupitan sa malapad na 16:9 na hugis. I-click ang **Change Photo** para palitan ito. Ipinapakita ang larawan sa itaas ng pahina ng event sa iyong website at bilang tile nito kapag ipinapakita ng Calendar element ang **Upcoming events** (tingnan ang [Showing Events on Your Website](#showing-events-on-your-website)).
- **Description** -- Ipinapakita sa pahina ng event sa iyong website. Sinusuportahan ang bold text, listahan, at link.
- **Start** at **End**, **Repeats**, at **Visibility** (**Public** o **Private**).
- **Tags** -- Mga label na pinaghihiwalay ng kuwit, gaya ng `youth, students`. Maaaring itakda ang Calendar element sa iyong website na magpakita lamang ng mga event na may partikular na tag. Ito ang parehong field na **Tags** na makikita sa registration settings ng event.
- **Who can view notes** at **Who can post notes** -- Sino ang maaaring magbasa at magdagdag sa mga tala ng event (tingnan ang [Event Notes](#event-notes)). Piliin ang **Staff only** (ang default), **Group leaders** (mga lider ng grupo ng event), o **Group members** (lahat ng nasa grupo ng event, kasama ang mga lider nito).
- **Rooms** at **Resources** -- Magreserba ng espasyo at kagamitan para sa event. Tingnan ang [Rooms, Resources & Scheduling](rooms-resources).

I-click ang **Save**. Kung paulit-ulit ang event, magtatanong ang B1 para kumpirmahin, dahil ina-update ng pag-save ang bawat pag-uulit sa serye.

### Mga Tala ng Event {#event-notes}

Bawat event ay may sariling thread ng tala para sa pagpaplano at pag-follow up. I-click ang event sa calendar detail page; ipapakita ng dialog ang mga detalye ng event, mga reminder nito, at ang **Notes** nito sa ibaba. I-type ang tala at i-post ito para idagdag sa thread.

Maaaring magbasa at magpost ng tala ng event palagi ang mga staff na may permiso na mag-edit ng content o mag-administer ng mga calendar. Nagpapasya ang mga setting na **Who can view notes** at **Who can post notes** sa event kung makakagawa rin ito ng mga lider o miyembro ng grupo ng event.

### Pagpapakita ng mga Event sa Iyong Website {#showing-events-on-your-website}

Para ilagay ang calendar sa iyong website, magdagdag ng **Calendar** element sa isang pahina at piliin ang calendar na ito. Maaaring magpakita ang element ng buwanang calendar o grid ng mga tile ng paparating na event, at maaaring limitahan sa mga event na may isang tag. Kapag nag-click ang mga bisita sa isang event, mabubuksan nila ang sarili nitong pahina ng event. Tingnan ang [Using the Calendar element](../website/page-editor.md#using-the-calendar-element).

## Pag-enable ng Event Registration {#enabling-event-registration}

Maaari mong i-enable ang registration para sa anumang event sa calendar para makapag-sign up ang mga miyembro sa pamamagitan ng B1 website o mobile app.

1. I-click ang umiiral na event o gumawa ng bago.
2. Sa event editor, i-toggle ang **Registration** para i-enable ito.
3. I-configure ang mga setting ng registration:
   - **Capacity** (opsyonal) -- Magtakda ng pinakamataas na bilang ng registration. Iwanang blangko para sa walang limitasyon.
   - **Registration Opens** -- Ang petsa at oras kung kailan magiging available ang registration.
   - **Registration Closes** -- Ang petsa at oras kung kailan magsasara ang registration.
   - **Tags** -- Mga label na pinaghihiwalay ng kuwit (hal. "youth, retreat, vbs") para matulungang ikategorya ang mga event na maaaring i-register.
   - **Registration Questions** -- Opsyonal na maglakip ng [form](../forms/creating-forms.md) para masagot ng mga nagpaparehistro ang mga karagdagang tanong (dietary restrictions, laki ng T-shirt, emergency contact, atbp.) habang nagsa-sign up. Piliin ang **None** para laktawan ang mga tanong.
   - **Enable Waitlist** -- Kapag puno na ang event, papayagan ang mga karagdagang nagpaparehistro na sumali sa waitlist sa halip na tanggihan. Tingnan ang [Paid Registrations](paid-registrations#waitlist).
4. I-save ang event.

Para sa mga bayad na event, pinapayagan ka rin ng parehong settings page na magtakda ng mga may-presyong **Attendee Types**, opsyonal na **Selections** (mga add-on), at **Discount Codes**, na may bayad na kinokolekta sa pamamagitan ng giving provider ng iyong simbahan. Tingnan ang [Paid Registrations](paid-registrations) para sa buong gabay.

Kapag na-enable na ang registration, makikita ng mga miyembro ang button na **Register for this Event** kapag tiningnan nila ang event sa [B1 website](../../b1-church/events/registering) o [B1 Mobile app](../../b1-mobile/events/registering). Kung naglakip ka ng form, makikita ng mga nagpaparehistro ang hakbang na **Questions** habang nagpaparehistro, at ise-save ang kanilang mga sagot kasama ng kanilang registration.

:::info
Ang Registration Questions ay gumagana lamang sa mga form na **hindi** minarkahang Restricted. Ang restricted na form ay awtomatikong nilalaktawan habang nagpaparehistro sa halip na ipakita, kaya gumamit ng unrestricted na form kapag naglalakip ng mga tanong sa event.
:::

### Pamamahala ng mga Registration

Para tingnan at pamahalaan ang mga registration para sa iyong mga event:

1. Sa Jump menu, piliin ang **Calendars > Registrations**.
2. Makikita mo ang table ng lahat ng event na may naka-enable na registration, na nagpapakita ng pamagat ng event, petsa, kasalukuyang bilang ng registration laban sa capacity, at mga tag.
3. I-click ang isang event para makita ang buong listahan ng mga registration, kasama ang mga pangalan, bilang ng miyembro, attendee types, status ng bayad, at petsa ng registration.
4. Mula sa detail page, maaari mong:
   - **Add Attendee** -- Manu-manong irehistro ang taong nag-sign up nang offline o sa telepono.
   - **Cancel** ang indibidwal na registration
   - **Delete** ang mga registration nang permanente
   - **Promote** ang mga nasa waitlist na registration kapag may bakanteng puwesto
   - **Export CSV** -- I-download ang lahat ng registration, kasama ang attendee types, selections, halaga ng bayad, at mga sagot sa tanong

Kung may nakalakip na Registration Questions ang event, may ipapakita ring filter na **Unanswered questions only** ang detail page para mabilis na mahanap ang mga nagpaparehistrong hindi pa nagsusumite ng sagot, at button na **View Answers** sa bawat registration na may sagot para makita ang kanilang mga tugon. Para sa mga bayad na event, may dagdag na column na **Type**, column na **Paid / Total**, bilang bawat uri, at dialog ng detalye ng bayad -- tingnan ang [Paid Registrations](paid-registrations#the-registration-roster).

:::tip
Gamitin ang progress bar ng capacity para bantayan kung gaano kabilis napupuno ang mga event. Nagiging pula ang bar kapag puno na o lampas na sa capacity ang event.
:::

## Mga Susunod na Hakbang

- [Curated Calendar](curated-calendar) -- Gumawa ng calendar na kumukuha mula sa maraming grupo
- [Paid Registrations](paid-registrations) -- Attendee types, add-on selections, discount codes, bayad, at waitlist
- [Event Registration Guide](../guides/event-registration) -- Hakbang-hakbang na gabay para sa pag-set up ng event registration
- [Calendars Overview](./) -- Bumalik sa pangkalahatang-tanaw ng mga calendar
