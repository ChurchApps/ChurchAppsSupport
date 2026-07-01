---
title: "Mga Reminder ng Kaganapan"
---

# Mga Reminder ng Kaganapan

<div class="article-intro">

Ang mga reminder ng kaganapan ay awtomatikong nagbibigay ng mensahe sa tamang mga tao bago ang isang kaganapan — halimbawa, "Huwag palampasin ito! Ang healthcare workshop ay magsisimula bukas sa 9:00 AM." I-configure mo ang isang reminder nang isang beses sa kaganapan, at ang B1 ay ipinapadala ito ayon sa iskedyul sa pamamagitan ng push notifications at email. Ang mga miyembro ay maaaring kontrolin kung aling mga reminder ang kanilang natatanggap mula sa kanilang sariling [Notification Preferences](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Lumikha ng kaganapan na gusto mong i-remind ang mga tao tungkol dito (tingnan ang [Paglikha ng Mga Kalendaryo](creating-calendars))
- Upang maabot ang mga naka-register na dumalo, [i-enable ang registration](creating-calendars) sa kaganapan
- Upang maabot ang buong grupo, tiyakin na ang kaganapan ay nabibilang sa [grupo](../groups/creating-groups) na may mga miyembro

</div>

## Pag-set Up ng Reminder

I-configure mo ang mga reminder sa **Reminders** section ng kaganapan.

- Kapag **lumikha ng bagong kaganapan**, palawakin ang **Reminders** section sa event editor bago mag-save.
- Para sa isang **umiiral na kaganapan**, buksan ang **Registration Details** page ng kaganapan (mula sa **Registrations** section) upang magdagdag o baguhin ang nito reminder.

1. I-turn on ang **Enable reminders**.
2. Piliin ang **When** upang magpadala. Pumili ng hanggang tatlong timings: **7 days before**, **3 days before**, **1 day before**, at **Day of**.
3. Itakda ang **Time of day** na dapat mapadala ang reminder (default ay **9:00 AM**, sa iyong church's local time zone).
4. Piliin ang **Who** dapat na i-remind (tingnan ang [Who Gets Reminded](#who-gets-reminded) sa ibaba).
5. Opsyonal na magdagdag ng **Message**. Iwanan itong blangko upang gamitin ang default wording, o isulat ang iyong sarili — maaari mong isama ang `{{eventTitle}}` at ito ay papalitan ng pangalan ng kaganapan.
6. Piliin ang **Channels**: **Push** notification, **Email**, o pareho.
7. I-save ang kaganapan.

Habang gumagawa ng mga pagbabago, ang **live preview** ay nagpapakita ng humigit-kumulang kung gaano karaming tao ang mire-remind, gaano karaming dumalo ang hindi maabot, at ang susunod na scheduled send times — upang maaari mong kumpirmahin na ang reminder ay tumitingin ng tama bago mo ito i-save.

## Sino ang Makakakuha ng Reminder

Ang **Who** setting ay kumukontrola sa sino ang reminder ay napupunta sa:

- **Registrants only** — Lahat ng naka-register para sa kaganapan na naka-link sa isang tala ng tao. Ito ang default kapag ang kaganapan ay may registration na enabled, kaya ang reminder para sa isang maliit na naka-register na kaganapan ay hindi kailanman aksidentalyang napupunta sa buong grupo.
- **Heads / registrants only** — Isang reminder sa bawat registration (ang taong nag-register), sa halip na sa bawat miyembro ng pamilya sa registration.
- **Group members** — Lahat sa grupo ng kaganapan. Ito ang default kapag ang kaganapan ay hindi gumagamit ng registration.
- **Auto** — Gumagamit ng mga registrant kapag ang registration ay enabled, kung hindi man ang grupo.

:::info
Ang mga bisita na idinagdag ayon sa pangalan lamang (nang walang naka-link na tala ng tao) ay hindi maaaring makatanggap ng reminder, dahil walang account, device, o email upang magpadala. Ang preview ay nagsasabi sa iyo kung gaano karaming dumalo ang nahuhulog sa grupo na ito upang walang mga sorpresa. Ang mga miyembro na nag-opt out ng komunikasyon ay linalabas din.
:::

## Kailan Ipinapadala ang mga Reminder

- Ang mga reminder ay gumagana sa **oras ng araw na iyong pinili**, sa iyong church's local time zone, sa bawat isa sa mga offset na iyong pinili.
- Kung **babaguhin mo ang petsa o oras ng kaganapan**, ang mga naghihintay na reminder ay awtomatikong naka-reschedule — hindi mo kailangang i-edit ang reminder.
- Kung **buburahin mo ang kaganapan** (o itapon ang isang solong paglalakbay ng isang recurring event), ang mga naghihintay na reminder ay awtomatikong kinansela.
- Ang mga recurring event ay hinawakan nang awtomatiko: bawat paparating na paglalakbay ay nakakakuha ng sariling reminder.

:::tip
Ang mga reminder ay ipinapadala **push una, na may email bilang fallback**. Kung ang isang miyembro ay may push notifications na enabled, makakakuha sila ng push; kung hindi, makakakuha sila ng email sa halip. Ang mga miyembro ay pumipili kung aling mga channel ang gusto nila sa bawat uri ng notification sa kanilang [Notification Preferences](../../b1-church/getting-started/notification-preferences).
:::

## Ano ang Maaaring Kontrolin ng mga Miyembro

Ang mga reminder ay laging gumagalang sa bawat miyembro's [Notification Preferences](../../b1-church/getting-started/notification-preferences). Ang isang miyembro ay maaaring:

- I-turn **Event Reminders** off para sa push o email habang pinapanatili ang iba pang mga notification sa.
- Itakda ang **quiet hours** upang ang mga hindi urgent na notification ay maghintay hanggang sa isang makatwirang oras.

Hindi mo maaaring i-override ang pagpipilian ng isang miyembro na mag-opt out ng mga reminder ng kaganapan — ito ay pinapanatili ang B1 compliant sa mga anti-spam rule at pinapanatili ang mga miyembro sa kontrol ng kanilang inbox.

## Pagsisilbi ng mga Reminder

Ang mga volunteer na naka-schedule sa isang plano ay nakakatanggap ng hiwalay na **serving reminder** na may detalye ng plano at, kapag hindi pa sila tumugon, **Accept / Decline** buttons sa tamang email. Ang mga reminder na ito ay na-configure sa uri ng plano sa halip na sa isang kaganapan sa kalendaryo — tingnan ang [Sunday Volunteers](../guides/sunday-volunteers) kung paano gumagana ang volunteer scheduling at mga reminder.

## Mga Susunod na Hakbang

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) — Ano ang maaaring kontrolin ng mga miyembro
- [Event Registration Guide](../guides/event-registration) — I-set up ang registration upang ang mga reminder ay maabot ang mga dumalo
- [Paglikha ng Mga Kalendaryo](creating-calendars) — Bumalik sa calendar setup
