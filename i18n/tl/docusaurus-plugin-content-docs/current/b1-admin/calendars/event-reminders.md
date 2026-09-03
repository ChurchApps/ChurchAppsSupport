---
title: "Event Reminders"
---

# Event Reminders

<div class="article-intro">

Ang mga event reminder ay awtomatikong nagbibigay ng abiso sa tamang mga tao bago ang isang event ay mangyari -- halimbawa, "Huwag palampasin! Ang healthcare workshop ay magsisimula bukas sa 9:00 AM." Isa kang nag-configure ng reminder sa event, at ang B1 ay ipinapadala ito ayon sa iskedyul sa pamamagitan ng push notification at email. Ang mga miyembro ay maaaring kontrolin kung aling mga reminder ang kanilang natatanggap mula sa kanilang sariling [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Lumikha ng event na gusto mong ipaalala sa mga tao (tingnan ang [Creating Calendars](creating-calendars))
- Upang maabot ang mga naka-register na dumalo, [i-enable ang registration](creating-calendars) sa event
- Upang maabot ang isang buong grupo, siguraduhin na ang event ay kabilang sa [group](../groups/creating-groups) na may mga miyembro

</div>

## Pag-setup ng isang Reminder

Nag-configure ka ng mga reminder sa **Reminders** section ng event.

- Kapag **lumikha ng isang bagong event**, palawakin ang **Reminders** section sa event editor bago i-save.
- Para sa **isang umiiral na event**, buksan ang **Registration Details** page ng event (mula sa **Registrations** section) upang magdagdag o baguhin ang reminder nito.

1. I-turn on ang **Enable reminders**.
2. Pumili ng **When** upang magpadala. Pumili ng hanggang tatlong timing: **7 days before**, **3 days before**, **1 day before**, at **Day of**.
3. Itakda ang **Time of day** na dapat ang reminder ay lumabas (default ay **9:00 AM**, sa local time zone ng iyong simbahan).
4. Pumili ng **Who** dapat na ma-remind (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng **Message**. Iwanan itong blangko upang gamitin ang default na pagpapahayag, o isulat ang iyong sarili -- maaari kang magsama ng `{{eventTitle}}` at ito ay papalitan ng pangalan ng event.
6. Pumili ng **Channels**: **Push** notification, **Email**, o pareho.
7. I-save ang event.

Habang gumagawa ka ng mga pagbabago, isang **live preview** ay nagpapakita ng humigit-kumulang kung gaano karaming tao ang mare-remind, gaano karaming attendees ang hindi maaabot, at ang susunod na naka-schedule na send times -- upang maaari mong kumpirmahin ang reminder ay mukhang tama bago mo i-save.

## Sino Ang Makakakuha ng Reminder

Ang **Who** setting ay kumokontrol sa sino ang reminder ay napupunta:

- **Registrants only** -- Lahat ng naka-register para sa event na naka-link sa isang person record. Ito ang default kapag ang event ay may enabled registration, kaya ang reminder para sa isang maliit na naka-register na event ay hindi kailanman pagkakamali ay napupunta sa isang buong grupo.
- **Heads / registrants only** -- Isang reminder bawat registration (ang taong nag-register), sa halip na bawat miyembro ng pamilya sa registration.
- **Group members** -- Lahat sa grupo ng event. Ito ang default kapag ang event ay hindi gumagamit ng registration.
- **Auto** -- Gumagamit ng mga registrant kapag ang registration ay enabled, kung hindi man ang grupo.

:::info
Ang mga bisita na idinagdag ayon sa pangalan lamang (nang walang linked na person record) ay hindi maaaring makatanggap ng reminder, dahil walang account, device, o email upang magpadala. Ang preview ay nagsasabi sa iyo kung gaano karaming attendees ang nahuhulog sa grupo na ito upang walang mga sorpresa. Ang mga miyembro na nag-opt out ng komunikasyon ay na-skip din.
:::

## Kailan Ipinapadala Ang Mga Reminder

- Ang mga reminder ay tumutunog sa **oras ng araw na iyong pinili**, sa local time zone ng iyong simbahan, sa bawat offset na iyong pinili.
- Kung **baguhin mo ang date o oras ng event**, ang pending reminder ay awtomatikong na-reschedule -- hindi mo kailangang baguhin ang reminder.
- Kung **tanggalin mo ang event** (o kanselahin ang isang solong paglalaro ng isang recurring event), ang pending reminder nito ay awtomatikong kinansela.
- Ang mga recurring event ay pinangangasiwaan awtomatiko: bawat darating na paglalaro ay makakakuha ng sarili nitong reminder.

:::tip
Ang mga reminder ay ipinadala **push una, na may email bilang fallback**. Kung ang isang miyembro ay may enabled na push notification, makakakuha sila ng push; kung hindi, makakakuha sila ng email sa halip. Ang mga miyembro ay pumipili kung aling mga channel ang gusto nila bawat notification type sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## Kung Ano Ang Maaaring Kontrolin ng Mga Miyembro

Ang mga reminder ay palaging nirerespeto ang [Notification Preferences](../../b1-church/getting-started/notification-preferences) ng bawat miyembro. Ang isang miyembro ay maaaring:

- I-turn ang **Event Reminders** off para sa push o email habang pinapanatili ang ibang mga notification sa on.
- Itakda ang **quiet hours** upang ang mga non-urgent notification ay maghintay hanggang sa isang maaasahang oras.

Hindi mo maaaring i-override ang pagpili ng isang miyembro na mag-opt out ng mga event reminder -- ito ay nagpapanatili ng B1 compliant sa mga anti-spam na panuntunan at nagpapanatili sa mga miyembro sa kontrol ng kanilang inbox.

## Serving Reminders

Ang mga volunteer na na-schedule sa isang plan ay makakatanggap ng isang hiwalay na **serving reminder** na may detalye ng plan at, kapag hindi pa sila tumugon, **Accept / Decline** buttons nang direkta sa email. Ang mga reminder na ito ay na-configure sa uri ng plan sa halip na sa isang calendar event -- tingnan ang [Sunday Volunteers](../guides/sunday-volunteers) para sa kung paano gumagana ang volunteer scheduling at mga reminder.

## Susunod na Mga Hakbang

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- Kung ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration) -- I-setup ang registration upang ang mga reminder ay maaaring maabot ang mga attendee
- [Creating Calendars](creating-calendars) -- Bumalik sa calendar setup
