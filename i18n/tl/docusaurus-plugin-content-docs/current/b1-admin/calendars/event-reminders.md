---
title: "Mga Paalala ng Event"
description: "I-set up ang mga paalala ng event sa B1 Admin para sa push, email, at text, pagpili ng oras, tatanggap, at custom na mensahe para maabisuhan ang mga tao sa tamang oras."
---

# Mga Paalala ng Event

<div class="article-intro">

Awtomatikong nagpapadala ng abiso ang mga paalala ng event sa mga tamang tao bago mangyari ang event -- halimbawa, "Huwag palampasin! Magsisimula bukas ng 9:00 AM ang healthcare workshop." Isang beses mo lamang i-configure ang paalala sa event, at ipapadala ito ng B1 sa takdang oras sa pamamagitan ng push notification, email, at, kung may texting ang iyong simbahan, text message. Maaaring kontrolin ng mga miyembro kung aling mga paalala ang kanilang tatanggapin mula sa sarili nilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gawin ang event na gusto mong paalalahanan ang mga tao (tingnan ang [Creating Calendars](./creating-calendars.md))
- Para maabot ang mga nakarehistrong dadalo, [paganahin ang registration](./creating-calendars.md) sa event
- Para maabot ang buong grupo, siguraduhing kabilang ang event sa isang [grupo](../groups/creating-groups.md) na may mga miyembro

</div>

## Pag-set Up ng Paalala {#setting-up-a-reminder}

Ina-configure mo ang mga paalala sa seksyong **Reminders** ng event. I-expand ito para makita ang mga setting.

- Kapag **gumawa ka ng bagong event**, i-expand ang seksyong **Reminders** sa ilalim ng **New Event** editor; ise-save ang paalala kapag na-save mo ang event.
- Para sa **umiiral nang event**, gamitin ang seksyong **Reminders** sa alinman sa mga lugar na ito, at i-click ang button na **Save** sa loob ng seksyon: ang dialog na bumubukas kapag na-click mo ang event sa calendar, ang **Edit Event** editor, o ang registration page ng event (**Calendars > Registrations**, pagkatapos ang event).

1. I-on ang **Enable reminders**.
2. Piliin ang **When (up to 3)** na ipapadala: **7 days before**, **3 days before**, **1 day before**, at **Day of**. Kapag tatlo na ang napili, made-disable ang iba hanggang may alisin ka.
3. Itakda ang **Time of day** kung kailan dapat ipadala ang paalala (ang default ay **9:00 AM**, sa [time zone](../settings/church-settings.md#time-zone) ng iyong simbahan).
4. Piliin kung **sino** ang dapat paalalahanan (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng **Message (optional)**. Iwanang blangko para gamitin ang default na pananalita, o sumulat ng sarili mo -- maaari mong isama ang `{{eventTitle}}` at papalitan ito ng pangalan ng event.
6. Piliin ang **Channels**: **Push** notification at **Email** (parehong naka-on bilang default), at, kung may nakakonektang [texting provider](../settings/church-settings.md#texting) ang iyong simbahan, **Text**.
7. I-click ang **Save** (o i-save ang bagong event).

Para ihinto ang mga paalala ng isang event, i-off ang **Enable reminders** at i-save.

Sa event na naka-save na, ipinapakita ng **live preview** ang tinatayang bilang ng taong mapapaalalahanan, kung ilang dadalo ang hindi maaabot, at ang susunod na nakaiskedyul na oras ng pagpapadala habang gumagawa ka ng mga pagbabago -- para makumpirmang tama ang paalala bago mo i-save. Ang bagong event ay walang preview hanggang ma-save ito.

## Sino ang Pinapaalalahanan {#who-gets-reminded}

Kinokontrol ng setting na **Who** kung sino ang makakatanggap ng paalala:

- **Registrants only** -- Lahat ng nakarehistro sa event na naka-link sa isang person record. Ito ang default kapag naka-enable ang registration ng event, para hindi kailanman aksidenteng mapunta sa buong grupo ang paalala ng isang maliit na nakarehistrong event.
- **Heads / registrants only** -- Isang paalala kada registration (ang taong nagpatala), sa halip na bawat miyembro ng pamilya sa registration.
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
Ang mga paalala ay **push muna, at email bilang alternatibo**. Kung naka-enable ang push notification ng miyembro, makakatanggap siya ng push; kung hindi, email ang ipapadala. Pinipili ng mga miyembro kung aling channel ang gusto nila kada uri ng notification sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md).
:::

## Mga Text na Paalala {#text-reminders}

Lumalabas lamang ang channel na **Text** kapag may nakakonektang texting provider ang iyong simbahan. Dumadaan ang mga text sa texting provider ng iyong simbahan, at maaaring may bayad ang bawat text para sa iyong simbahan. Ipinapadala ang mga ito bukod pa sa anumang push o email na paalala, at sa mga taong:

- Nag-on ng **Text messages** sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), at
- May mobile number sa kanilang profile.

Maaaring i-on ng staff na may permission magpadala ng text ang **Text reminders** para sa isang tao mula sa [record](../people/adding-people.md#text-reminders) ng taong iyon, sa linya sa ilalim ng kanyang mobile number. Kapag nag-click ka ng **Send now** sa paalalang may kasamang **Text**, ipinapakita ng B1 kung ilang tao ang na-text at kung ilan ang nilaktawan, halimbawa *Sent to 2 people · 1 texted, 1 skipped*.

Nagsisimula ang bawat text sa pangalan ng iyong simbahan, pinananatiling iisang text message, at nagtatapos sa "Reply STOP to opt out." Ang sinumang sumagot ng STOP ay titigil sa pagtanggap ng text mula sa iyong simbahan. Para maabot ng mga sagot na STOP ang B1, i-paste ang **Inbound (STOP) webhook URL** mula sa iyong [texting settings](../settings/church-settings.md#texting) sa inbound message webhook ng iyong provider.

## Ano ang Maaaring Kontrolin ng mga Miyembro {#what-members-can-control}

Palaging iginagalang ng mga paalala ang [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) ng bawat miyembro. Maaaring:

- I-off ang **Event Reminders** para sa push, email, o text habang nananatiling naka-on ang ibang notification.
- I-on o i-off ang text reminders gamit ang **Text messages**.
- Magtakda ng **quiet hours** para maghintay hanggang sa makatwirang oras ang mga hindi urgenteng notification.

Hindi mo maaaring baliktarin ang pasya ng miyembrong mag-opt out sa event reminders -- pinananatili nitong sumusunod ang B1 sa mga anti-spam rule at kontrolado ng mga miyembro ang kanilang inbox.

## Mga Paalala sa Paglilingkod {#serving-reminders}

Ang mga boluntaryong nakaiskedyul sa isang plan ay tumatanggap ng hiwalay na **serving reminder** na may mga detalye ng plan at, kapag hindi pa sila sumasagot, mga button na **Accept / Decline** mismo sa email. Ang mga paalalang ito ay naka-configure sa plan type at hindi sa calendar event, at maaari ring ipadala sa pamamagitan ng text -- tingnan ang [Volunteer Reminders](../serving/plans.md#volunteer-reminders) at [Sunday Volunteers](../guides/sunday-volunteers.md) para sa kung paano gumagana ang pag-iiskedyul at paalala ng mga boluntaryo.

## Mga Susunod na Hakbang {#next-steps}

- [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) -- Ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration.md) -- I-set up ang registration para maabot ng mga paalala ang mga dadalo
- [Creating Calendars](./creating-calendars.md) -- Bumalik sa pag-set up ng calendar
