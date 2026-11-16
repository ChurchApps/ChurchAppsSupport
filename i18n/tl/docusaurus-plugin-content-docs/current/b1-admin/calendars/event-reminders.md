---
title: "Mga Paalala ng Event"
description: "I-set up ang mga paalala ng event sa B1 Admin para sa push, email, at text, pagpili ng oras, tatanggap, at custom na mensahe para maabisuhan ang mga tao sa tamang oras."
---

# Event Reminders {#event-reminders}

<div class="article-intro">

Awtomatikong nagpapadala ng abiso ang mga paalala ng event sa mga tamang tao bago mangyari ang event -- halimbawa, "Huwag palampasin! Magsisimula bukas ng 9:00 AM ang healthcare workshop." Isang beses mo lang i-configure ang paalala sa event, at ipapadala ito ng B1 sa takdang oras sa pamamagitan ng push notification, email, at, kung may texting ang iyong simbahan, text message. Makokontrol ng mga miyembro kung aling mga paalala ang kanilang tatanggapin mula sa sarili nilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng event na gusto mong paalalahanan ang mga tao (tingnan ang [Creating Calendars](./creating-calendars.md))
- Para maabot ang mga nakarehistrong dadalo, [i-enable ang registration](./creating-calendars.md) sa event
- Para maabot ang buong grupo, siguraduhing kabilang ang event sa isang [grupo](../groups/creating-groups.md) na may mga miyembro

</div>

## Pag-set Up ng Paalala {#setting-up-a-reminder}

Ino-configure mo ang mga paalala sa seksyong **Reminders** ng event. I-expand ito para makita ang mga setting.

- Kapag **gumagawa ka ng bagong event**, i-expand ang seksyong **Reminders** sa ibaba ng **New Event** editor; ise-save ang paalala kapag na-save mo ang event.
- Para sa **umiiral nang event**, gamitin ang seksyong **Reminders** sa alinman sa mga lugar na ito, at i-click ang button na **Save** sa loob ng seksyon: ang dialog na bumubukas kapag na-click mo ang event sa calendar, ang **Edit Event** editor, o ang registration page ng event (**Calendars > Registrations**, pagkatapos ang event).

1. I-on ang **Enable reminders**.
2. Piliin ang **When (up to 3)** na ipapadala: **7 days before**, **3 days before**, **1 day before**, at **Day of**. Kapag tatlo na ang napili, made-disable ang iba hanggang may alisin ka.
3. Itakda ang **Time of day** kung kailan dapat ipadala ang paalala (ang default ay **9:00 AM**, sa [time zone](../settings/church-settings.md#time-zone) ng iyong simbahan).
4. Piliin kung **sino** ang dapat paalalahanan (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng **Message (optional)**. Iwanang blangko para gamitin ang default na pananalita, o sumulat ng sarili mo -- maaari mong isama ang `{{eventTitle}}` at papalitan ito ng pangalan ng event.
6. Piliin ang **Channels**: **Push** notification at **Email** (parehong naka-on bilang default), at, kung may nakakonektang [texting provider](../settings/church-settings.md#texting) ang iyong simbahan, **Text**.
7. I-click ang **Save** (o i-save ang bagong event).

Para ihinto ang mga paalala ng isang event, i-off ang **Enable reminders** at i-save.

### Pagpapadala ng Paalala Ngayon {#sending-a-reminder-now}

Sa event na naka-save na, i-click ang **Send now** sa tabi ng **Save** para ipadala agad ang paalala -- halimbawa, pagkatapos ng huling-sandaling pagbabago. Gagamitin nito ang naka-save na setting at pupunta sa parehong mga tao, para sa susunod na paparating na petsa ng event. Ipinapakita ng B1 pagkatapos kung ilang tao ang naabot, gaya ng **Sent to 12 people**. Itutuloy pa rin ang mga nakaiskedyul na paalala ayon sa plano.

Available lamang ang **Send now** kapag naka-on at naka-save na ang mga paalala, kaya i-save muna ang anumang pagbabago. Kung kasama sa paalala ang **Text**, kailangan mo rin ng permission na magpadala ng text.

Sa event na naka-save na, ipinapakita ng **live preview** ang tinatayang bilang ng taong mapapaalalahanan, ilan sa mga dadalo ang hindi maaabot, at ang susunod na nakaiskedyul na pagpapadala habang gumagawa ka ng mga pagbabago -- para makumpirmang tama ang itsura ng paalala bago mo i-save. Walang preview ang bagong event hanggang ma-save ito.

## Sino ang Pinapaalalahanan {#who-gets-reminded}

Kinokontrol ng setting na **Who** kung kanino mapupunta ang paalala:

- **Registrants only** -- Lahat ng nakarehistro sa event na naka-link sa isang person record. Ito ang default kapag naka-enable ang registration ng event, para hindi kailanman aksidenteng mapunta sa buong grupo ang paalala ng maliit na nakarehistrong event.
- **Heads / registrants only** -- Isang paalala kada registration (ang taong nagparehistro), sa halip na bawat miyembro ng pamilya sa registration.
- **Group members** -- Lahat ng nasa grupo ng event. Ito ang default kapag hindi gumagamit ng registration ang event.
- **Auto** -- Gumagamit ng registrants kapag naka-enable ang registration, kung hindi ay ang grupo.

:::info
Ang mga bisitang idinagdag lamang sa pangalan (nang walang naka-link na person record) ay hindi makakatanggap ng paalala, dahil walang account, device, o email na mapagpapadalhan. Ipinapakita ng preview kung ilang dadalo ang kabilang sa grupong ito para walang maging sorpresa. Nilalaktawan din ang mga miyembrong nag-opt out sa komunikasyon.
:::

## Kailan Ipinapadala ang Mga Paalala {#when-reminders-are-sent}

- Nagfi-fire ang mga paalala sa **oras ng araw na pipiliin mo**, sa lokal na time zone ng iyong simbahan, sa bawat offset na pinili mo.
- Kapag **binago mo ang petsa o oras ng event**, awtomatikong ire-reschedule ang mga nakabinbing paalala -- hindi mo na kailangang i-edit ang paalala.
- Kapag **binura mo ang event** (o kinansela ang isang occurrence ng paulit-ulit na event), awtomatikong kakanselahin ang mga nakabinbing paalala nito.
- Awtomatikong hinahawakan ang mga paulit-ulit na event: bawat paparating na occurrence ay may sariling paalala.

:::tip
Ipinapadala muna ang mga paalala sa **push, at email bilang alternatibo**. Kung naka-enable ang push notification ng miyembro, makakatanggap siya ng push; kung hindi, email ang ipapadala sa kanya. Pinipili ng mga miyembro kung aling channel ang gusto nila para sa bawat uri ng notification sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md).
:::

## Mga Text Reminder {#text-reminders}

Lumalabas lamang ang channel na **Text** kapag may nakakonektang texting provider ang iyong simbahan. Dumadaan ang mga text sa texting provider ng iyong simbahan, at maaaring may bayad ang bawat text para sa iyong simbahan. Ipinapadala ang mga ito bukod pa sa anumang push o email na paalala, at sa mga taong:

- Nag-on ng **Text messages** sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), at
- May mobile number sa kanilang profile.

Nagsisimula ang bawat text sa pangalan ng iyong simbahan, pinananatiling iisang text message, at nagtatapos sa "Reply STOP to opt out." Ang sinumang sumagot ng STOP ay titigil sa pagtanggap ng text mula sa iyong simbahan. Para maabot ng mga sagot na STOP ang B1, i-paste ang **Inbound (STOP) webhook URL** mula sa iyong [texting settings](../settings/church-settings.md#texting) sa inbound message webhook ng iyong provider.

## Ano ang Maaaring Kontrolin ng mga Miyembro {#what-members-can-control}

Palaging iginagalang ng mga paalala ang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) ng bawat miyembro. Maaaring:

- I-off ang **Event Reminders** para sa push, email, o text habang nananatiling naka-on ang ibang notification.
- I-on o i-off ang text reminders gamit ang **Text messages**.
- Magtakda ng **quiet hours** para maghintay hanggang sa makatwirang oras ang mga hindi urgenteng notification.

Hindi mo maaaring baliktarin ang pasya ng miyembrong mag-opt out sa event reminders -- pinananatili nitong sumusunod ang B1 sa mga anti-spam rule at kontrolado ng mga miyembro ang kanilang inbox.

## Mga Serving Reminder {#serving-reminders}

Ang mga boluntaryong nakaiskedyul sa isang plan ay tumatanggap ng hiwalay na **serving reminder** na may mga detalye ng plan at, kapag hindi pa sila sumasagot, mga button na **Accept / Decline** mismo sa email. Naka-configure ang mga paalalang ito sa plan type at hindi sa calendar event, at maaari ring ipadala sa pamamagitan ng text -- tingnan ang [Volunteer Reminders](../serving/plans.md#volunteer-reminders) at [Sunday Volunteers](../guides/sunday-volunteers.md) para sa kung paano gumagana ang pag-iiskedyul at mga paalala ng boluntaryo.

## Mga Susunod na Hakbang {#next-steps}

- [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) -- Ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration.md) -- I-set up ang registration para maabot ng mga paalala ang mga dadalo
- [Creating Calendars](./creating-calendars.md) -- Bumalik sa pag-set up ng calendar
