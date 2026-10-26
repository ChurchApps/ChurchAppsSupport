---
title: "Mga Paalala ng Event"
---

# Mga Paalala ng Event

<div class="article-intro">

Awtomatikong nagpapaalala ang mga paalala ng event sa mga tamang tao bago magsimula ang event -- halimbawa, "Huwag palampasin! Magsisimula bukas ng 9:00 AM ang healthcare workshop." Isang beses mo lang i-configure ang paalala sa event, at ipapadala ito ng B1 sa takdang oras sa pamamagitan ng push notification, email, at, kung may naka-set up na texting ang iyong simbahan, text message. Maaaring kontrolin ng mga miyembro kung aling paalala ang tatanggapin nila mula sa sarili nilang [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng event na gusto mong paalalahanan ang mga tao (tingnan ang [Creating Calendars](creating-calendars))
- Para maabot ang mga nakarehistrong dadalo, [i-enable ang registration](creating-calendars) sa event
- Para maabot ang buong grupo, tiyaking kabilang ang event sa isang [grupo](../groups/creating-groups) na may mga miyembro

</div>

## Pag-set Up ng Paalala

Ina-configure mo ang mga paalala sa seksyong **Reminders** ng event.

- Kapag **gumawa ka ng bagong event**, i-expand ang seksyong **Reminders** sa event editor bago i-save.
- Para sa **umiiral na event**, buksan ang pahinang **Registration Details** ng event (mula sa seksyong **Registrations**) para magdagdag o baguhin ang paalala nito.

1. I-on ang **Enable reminders**.
2. Piliin ang **When** ipapadala. Pumili ng hanggang tatlong timing: **7 days before**, **3 days before**, **1 day before**, at **Day of**.
3. Itakda ang **Time of day** kung kailan dapat ipadala ang paalala (ang default ay **9:00 AM**, sa [time zone](../settings/church-settings.md#time-zone) ng iyong simbahan).
4. Piliin ang **Who** ang dapat paalalahanan (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng **Message**. Iwanang blangko para gamitin ang karaniwang pananalita, o sumulat ng sarili mo -- maaari mong isama ang `{{eventTitle}}` at papalitan ito ng pangalan ng event.
6. Piliin ang **Channels**: **Push** notification, **Email**, at, kung may nakakonektang [texting provider](../settings/church-settings.md#texting) ang iyong simbahan, **Text**.
7. I-save ang event.

Habang gumagawa ka ng mga pagbabago, ipinapakita ng **live preview** ang tinatayang bilang ng taong mapapaalalahanan, ang bilang ng dadalo na hindi maaabot, at ang susunod na nakatakdang oras ng pagpapadala -- para makumpirma mong tama ang paalala bago mo i-save.

## Sino ang Pinapaalalahanan

Kinokontrol ng setting na **Who** kung kanino mapupunta ang paalala:

- **Registrants only** -- Lahat ng nakarehistro sa event na nakakonekta sa person record. Ito ang default kapag may naka-enable na registration ang event, para hindi aksidenteng mapunta sa buong grupo ang paalala ng isang maliit na nakarehistrong event.
- **Heads / registrants only** -- Isang paalala bawat registration (ang taong nagparehistro), sa halip na bawat miyembro ng pamilya sa registration.
- **Group members** -- Lahat ng nasa grupo ng event. Ito ang default kapag hindi gumagamit ng registration ang event.
- **Auto** -- Gumagamit ng mga nakarehistro kapag naka-enable ang registration, kung hindi ay ang grupo.

:::info
Ang mga panauhing idinagdag lang sa pangalan (nang walang nakakonektang person record) ay hindi makakatanggap ng paalala, dahil walang account, device, o email na mapapadalhan. Sinasabi sa iyo ng preview kung ilang dadalo ang kabilang sa grupong ito para walang masurpresa. Nilalaktawan din ang mga miyembrong nag-opt out sa komunikasyon.
:::

## Kailan Ipinapadala ang mga Paalala

- Nagpapadala ang mga paalala sa **oras ng araw na pipiliin mo**, sa lokal na time zone ng iyong simbahan, sa bawat offset na napili mo.
- Kapag binago mo ang **petsa o oras ng event**, awtomatikong ire-reschedule ang mga nakabinbing paalala -- hindi mo na kailangang i-edit ang paalala.
- Kapag **binura mo ang event** (o kinansela ang isang pag-uulit ng paulit-ulit na event), awtomatikong kakanselahin ang mga nakabinbing paalala nito.
- Awtomatikong hinahawakan ang mga paulit-ulit na event: bawat darating na pag-uulit ay may sariling paalala.

:::tip
Ipinapadala muna ang mga paalala sa **push**, at ang email ay pamalit. Kung naka-enable ang push notification ng miyembro, makakatanggap siya ng push; kung hindi, email na lang ang ipapadala. Pinipili ng mga miyembro kung aling channel ang gusto nila para sa bawat uri ng notification sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## Mga Text Reminder

Lalabas lang ang channel na **Text** kapag may nakakonektang texting provider ang iyong simbahan. Ipinapadala ang mga text sa pamamagitan ng texting provider ng iyong simbahan, at maaaring may bayaring kaakibat ang bawat text para sa iyong simbahan. Dagdag ang mga ito sa anumang push o email reminder, at ipinapadala lamang sa mga taong:

- Nag-on ng **Text messages** sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences), at
- May mobile number sa kanilang profile.

Ang bawat text ay nagsisimula sa pangalan ng iyong simbahan, nananatili sa iisang text message, at nagtatapos sa "Reply STOP to opt out." Sinumang sumagot ng STOP ay titigil na sa pagtanggap ng mga text mula sa iyong simbahan. Para maabot ng mga STOP reply ang B1, i-paste ang **Inbound (STOP) webhook URL** mula sa iyong [texting settings](../settings/church-settings.md#texting) sa inbound message webhook ng iyong provider.

## Ano ang Maaaring Kontrolin ng mga Miyembro

Palaging iginagalang ng mga paalala ang [Notification Preferences](../../b1-church/getting-started/notification-preferences) ng bawat miyembro. Maaaring:

- I-off ang **Event Reminders** para sa push, email, o text habang nananatiling on ang ibang notification.
- I-on o i-off ang mga text reminder gamit ang **Text messages**.
- Magtakda ng **quiet hours** para maghintay ang mga hindi urgenteng notification hanggang sa makatwirang oras.

Hindi mo maaaring baliktarin ang pasya ng miyembro na mag-opt out sa mga paalala ng event -- pinananatili nitong sumusunod ang B1 sa mga anti-spam rule at pinapanatiling kontrolado ng mga miyembro ang kanilang inbox.

## Mga Paalala para sa Paglilingkod

Ang mga boluntaryong naka-iskedyul sa isang plano ay tumatanggap ng hiwalay na **serving reminder** na may mga detalye ng plano at, kung hindi pa sila tumutugon, mga button na **Accept / Decline** mismo sa email. Ang mga paalalang ito ay naka-configure sa plan type at hindi sa calendar event, at maaari ring ipadala sa pamamagitan ng text -- tingnan ang [Volunteer Reminders](../serving/plans#volunteer-reminders) at [Sunday Volunteers](../guides/sunday-volunteers) para sa kung paano gumagana ang pag-iskedyul ng boluntaryo at mga paalala.

## Mga Susunod na Hakbang

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- Ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration) -- I-set up ang registration para maabot ng mga paalala ang mga dadalo
- [Creating Calendars](creating-calendars) -- Bumalik sa pag-set up ng calendar
