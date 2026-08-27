---
title: "Event Reminders"
---

# Event Reminders

<div class="article-intro">

Ang mga event reminders ay awtomatikong nagbibigay-alam sa tamang mga tao bago ang isang event na mangyari -- halimbawa, "Huwag palampasin! Ang healthcare workshop ay magsisimula bukas sa 9:00 AM." Iyong i-configure ang isang reminder minsan sa event, at ang B1 ay ipinapadala ito ayon sa schedule sa pamamagitan ng push notifications at email. Ang mga miyembro ay maaaring kontrolin kung aling mga reminder ang kanilang natatanggap mula sa kanilang sariling [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Lumikha ng event na gusto mong ipagalala ang mga tao (tingnan ang [Creating Calendars](creating-calendars))
- Upang maabot ang mga registered attendee, [mag-enable ng registration](creating-calendars) sa event
- Upang maabot ang isang buong grupo, siguraduhin na ang event ay pag-aari ng isang [grupo](../groups/creating-groups) na may mga miyembro

</div>

## Setting Up a Reminder

Iyong i-configure ang mga reminder sa **Reminders** section ng event.

- Kapag **lumilikha ka ng isang bagong event**, palawakin ang **Reminders** section sa event editor bago magsave.
- Para sa isang **umiiral na event**, buksan ang event's **Registration Details** page (mula sa **Registrations** section) upang magdagdag o baguhin ang reminder nito.

1. I-turn on ang **Enable reminders**.
2. Pumili ng **When** upang magpadala. Pumili ng hanggang tatlong timing: **7 days before**, **3 days before**, **1 day before**, at **Day of**.
3. Itakda ang **Time of day** ang reminder ay dapat magpadala (default ay **9:00 AM**, sa local time zone ng iyong simbahan).
4. Pumili ng **Who** dapat ipagalala (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng isang **Message**. Iwanan ito nang blank upang gamitin ang default wording, o magsulat ng sarili mo -- maaari mong isama ang `{{eventTitle}}` at ito ay papalitan ng event's name.
6. Pumili ng **Channels**: **Push** notification, **Email**, o pareho.
7. Savihin ang event.

Habang gumagawa ng mga pagbabago, ang isang **live preview** ay nagpapakita ng higit o mas kaunting mga taong mababang alerto, kung gaano karaming mga attendee ay hindi maaabot, at ang susunod na scheduled send times -- upang maaari mong kumpirmahin ang reminder ay mukhang tama bago mo itong i-save.

## Who Gets Reminded

Ang **Who** setting ay nagkontrol kung sino ang reminder na napupunta:

- **Registrants only** -- Lahat ng nag-register para sa event na konektado sa isang person record. Ito ang default kapag ang event ay may naka-enable ang registration, kaya ang isang reminder para sa isang maliit na registered event ay hindi kailanman aksidente na napupunta sa isang buong grupo.
- **Heads / registrants only** -- Isang reminder bawat registration (ang taong nag-register), sa halip na bawat miyembro ng pamilya sa registration.
- **Group members** -- Lahat sa grupo ng event. Ito ang default kapag ang event ay hindi gumagamit ng registration.
- **Auto** -- Gumagamit ng mga registrant kapag naka-enable ang registration, kung hindi ang grupo.

:::info
Ang mga bisita na idagdag ayon sa pangalan lamang (nang walang konektadong person record) ay hindi makakatanggap ng reminder, dahil walang account, device, o email upang magpadala. Ang preview ay nagsasabi sa iyo kung gaano karaming mga attendee ang nasa grupo na ito upang walang mga sorpresa. Ang mga miyembro na nag-opt out ng komunikasyon ay linalampasan din.
:::

## When Reminders Are Sent

- Ang mga reminder ay nag-fire sa **oras ng araw na iyong pinili**, sa local time zone ng iyong simbahan, sa bawat offset na iyong pinili.
- Kung **baguhin mo ang date o time ng event**, ang mga naghihintay na reminder ay awtomatikong rescheduled -- hindi mo kailangang i-edit ang reminder.
- Kung **i-delete mo ang event** (o kanselahin ang isang solong pagkakataon ng isang recurring event), ang mga naghihintay na reminder nito ay awtomatikong nakansela.
- Ang mga recurring events ay hinahawakan nang awtomatiko: bawat paparating na pagkakataon ay makakakuha ng sariling reminder.

:::tip
Ang mga reminder ay ipinapadala **push unang, na may email bilang fallback**. Kung ang isang miyembro ay may naka-enable ang push notifications, makakatanggap sila ng push; kung hindi, makakatanggap sila ng email sa halip. Ang mga miyembro ay pumipili kung aling mga channel ang gusto nila bawat notification type sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## What Members Can Control

Ang mga reminder ay palaging sumusunod sa bawat miyembro's [Notification Preferences](../../b1-church/getting-started/notification-preferences). Ang isang miyembro ay maaaring:

- I-turn off ang **Event Reminders** para sa push o email habang pinapanatili ang ibang mga notification.
- Itakda ang **quiet hours** upang ang non-urgent notifications ay maghintay hanggang sa isang makatuwirang oras.

Hindi mo maaaring i-override ang pagpipilian ng miyembro na mag-opt out ng mga event reminder -- ito ay pinapanatili ang B1 na sumusunod sa anti-spam rules at pinapanatili ang mga miyembro na nangunguna sa kanilang inbox.

## Serving Reminders

Ang mga boluntaryo na naka-schedule sa isang plan ay makakatanggap ng isang hiwalay na **serving reminder** na may plan details at, kapag hindi pa sila nagtugon, **Accept / Decline** buttons sa email. Ang mga reminder na iyon ay ini-configure sa plan type sa halip na sa isang calendar event -- tingnan ang [Sunday Volunteers](../guides/sunday-volunteers) para sa kung paano ang volunteer scheduling at reminders ay gumagana.

## Next Steps

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- Ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration) -- I-setup ang registration upang ang mga reminder ay maaabot ang mga attendee
- [Creating Calendars](creating-calendars) -- Bumalik sa calendar setup
