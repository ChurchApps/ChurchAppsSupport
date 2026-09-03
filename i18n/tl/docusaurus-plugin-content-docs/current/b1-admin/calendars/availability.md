---
title: "Availability Calendar"
---

# Availability Calendar

<div class="article-intro">

Ang Availability Calendar ay nagbibigay sa iyo ng bird's-eye view ng lahat ng room at resource bookings sa buong iyong simbahan. Mula dito maaari mong makita kung ano ang naka-schedule, makita ang mga conflict bago sila mangyari, at mag-book ng isang kwarto o resource para sa anumang event nang direkta.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-setup ang hindi bababa sa isang [room o resource](rooms-resources) sa Rooms & Resources section
- Kailangan mo ng edit access sa Calendars section sa B1 Admin

</div>

## Pagbubukas ng Availability Calendar

Sa B1 Admin, buksan ang **section menu** sa top-left corner at piliin ang **Calendars**, pagkatapos ay piliin ang **Availability**.

## Pagbabasa ng Calendar

Ang calendar ay nagpapakita ng kasalukuyang buwan bilang default. Maaari kang mag-navigate pasulong at pabalik gamit ang mga arrow sa itaas, o lumipat sa pagitan ng buwan, linggo, at araw na mga view.

Bawat event ay kulay-coded ng booking status:

| Kulay | Kahulugan |
|-------|---------|
| Luntian | Aprubado |
| Orange | Naghihintay ng approval |
| Kulay-abo | Blocked out (hindi available) |

Ang pag-hover sa isang event ay nagpapakita ng event title at ang kwarto o resource na ito ay nakadikit.

## Pag-filter ng Room o Resource

Gamitin ang **Filter** dropdown sa tuktok na kaliwa upang maipitpit ang calendar sa isang kwarto o resource. Piliin ang **All Rooms & Resources** upang bumalik sa buong view.

## Pag-book ng Kwarto o Resource

1. I-click ang **Book** button sa tuktok na kanang sulok ng pahina.
2. Sa dialog na bumubukas, punan ang mga detalye ng event:
   - **Title** — ang pangalan ng event
   - **Start** at **End** date/time
   - **Visibility** — Public o Private
   - **Rooms** — piliin ang isa o maraming kwarto upang i-reserve
   - **Resources** — piliin ang isa o maraming resources upang i-reserve
3. Opsyonal na itakda ang **Setup** at **Teardown** na mga oras (sa mga minuto). Ang mga ito ay nag-pad sa booking sa parehong dulo kaya ang puwang ay nakalaan para sa setup at cleanup, kahit na ang event start/end times ay manatiling pareho.
4. Upang ulitin ang booking, suriin ang **Repeats** at i-configure ang recurrence:
   - **Repeat every** -- itakda ang interval (halimbawa, bawat 2 linggo).
   - **Frequency** -- Daily, Weekly, o Monthly. Ang Weekly ay nagpapahintulot sa iyo na pumili ng specific na araw(s) ng linggo; Ang Monthly ay nagpapahintulot sa iyo na pumili ng fixed day ng buwan o isang relative pattern tulad ng "ang pangalawang Martes."
   - **Ends** -- Hindi kailanman, sa isang specific na date, o pagkatapos ng isang itinakdang bilang ng occurrences.
5. Upang tukuyin ang isang custom booking window (iba sa event start/end), i-toggle ang **Custom Booking Window** at pasingahin ang window start at end times. Gamitin ito kapag ang isang kwarto ay kailangang maging accessible sa labas ng event's listed hours.
6. I-click ang **Save** upang ipadala ang booking.

:::info
Kung ang kwarto o resource ay may na-configure na **Approval Group**, ang booking ay lilitaw bilang **Pending** hanggang sa ang isang lider ng gruong iyon ay aprubahan ito. Tingnan ang [Calendar Approvals](approvals) para sa approval workflow.
:::

:::tip
Ang calendar ay mag-highlight ng anumang mga conflict bago mo i-save. Kung makikita mo ang isang conflict warning, i-adjust ang iyong mga oras o pumili ng ibang kwarto.
:::

## Mga Kaugnay na Artikulo

- [Rooms, Resources & Scheduling](rooms-resources) — i-setup ang mga bookable spaces at equipment
- [Calendar Approvals](approvals) — aprubahan o tanggihan ang mga booking request
- [Creating Calendars](creating-calendars) — pamahalaan ang mga calendar ng event
