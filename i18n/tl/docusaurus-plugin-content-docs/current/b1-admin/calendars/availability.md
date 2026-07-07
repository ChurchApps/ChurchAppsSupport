---
title: "Kalendaryo ng Availability"
---

# Kalendaryo ng Availability

<div class="article-intro">

Ang Kalendaryo ng Availability ay nagbibigay sa iyo ng bird's-eye view ng lahat ng room at resource booking sa iyong simbahan. Mula dito makikita mo kung ano ang na-schedule, makikita mo ang mga conflicts bago pa ito mangyari, at maaari mong i-book ang isang kwarto o resource para sa anumang event nang direkta.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-set up ng kahit isang [kwarto o resource](rooms-resources) sa Rooms & Resources section
- Kailangan mo ng edit access sa Calendars section sa B1 Admin

</div>

## Pagbubukas ng Kalendaryo ng Availability

Sa B1 Admin, pumunta sa **Calendars** at piliin ang **Availability** mula sa sidebar.

## Pagbabasa ng Kalendaryo

Ang kalendaryo ay nagpapakita ng kasalukuyang buwan bilang default. Maaari kang mag-navigate pataas at pababa gamit ang mga arrow sa itaas, o lumipat sa pagitan ng buwan, linggo, at araw na mga view.

Bawat event ay color-coded ayon sa status ng booking:

| Kulay | Kahulugan |
|-------|-----------|
| Berde | Aprubado |
| Orange | Naghihintay ng aprubuhan |
| Kulay-abo | Blocked out (hindi available) |

Ang pag-hover sa isang event ay nagpapakita ng titulo ng event at ang kwarto o resource na nakakabit dito.

## Pag-filter ayon sa Kwarto o Resource

Gamitin ang **Filter** dropdown sa tuktok na kaliwa upang paliitin ang kalendaryo sa isang kwarto o resource. Piliin ang **All Rooms & Resources** upang bumalik sa buong view.

## Pag-book ng Kwarto o Resource

1. I-click ang **Book** button sa tuktok na kanang sulok ng pahina.
2. Sa dialog na magbubukas, i-fill in ang mga detalye ng event:
   - **Title** -- ang pangalan ng event
   - **Start** at **End** date/time
   - **Visibility** -- Public o Private
   - **Rooms** -- piliin ang isa o higit pang mga kwarto upang i-reserve
   - **Resources** -- piliin ang isa o higit pang mga resources upang i-reserve
3. Opsyonal na itakda ang **Setup** at **Teardown** times (sa minuto). Ang mga ito ay nag-pad sa booking sa parehong dulo upang ang puwesto ay na-reserve para sa setup at cleanup, kahit na ang mga oras ng simula/pagtatapos ng event ay nananatiling pareho.
4. Upang ulitin ang booking, lagyan ng tsek ang **Repeats** at i-configure ang recurrence:
   - **Repeat every** -- itakda ang interval (halimbawa, bawat 2 linggo).
   - **Frequency** -- Daily, Weekly, o Monthly. Ang Weekly ay nagbibigay-daan sa iyo na pumili ng specific na araw(s) ng linggo; ang Monthly ay nagbibigay-daan sa iyo na pumili ng nakapirm na araw ng buwan o isang relative pattern tulad ng "ang pangalawang Martes."
   - **Ends** -- Never, sa isang partikular na petsa, o pagkatapos ng isang nakatakdang bilang ng occurrences.
5. Upang magtukoy ng custom booking window (iba mula sa event start/end), i-toggle ang **Custom Booking Window** at ilagay ang window start at end times. Gamitin ito kapag ang isang kwarto ay kailangang ma-accessible sa labas ng mga oras ng event.
6. I-click ang **Save** upang ipadala ang booking.

:::info
Kung ang kwarto o resource ay may configured **Approval Group**, ang booking ay lilitaw na **Pending** hanggang sa isang lider ng grupo ang mag-apruba nito. Tingnan ang [Calendar Approvals](approvals) para sa workflow ng aprubahan.
:::

:::tip
Ang kalendaryo ay mag-highlight ng anumang conflicts bago mo i-save. Kung makakita ka ng conflict warning, ayusin ang iyong mga oras o pumili ng ibang kwarto.
:::

## Mga Kaugnay na Artikulo

- [Rooms, Resources & Scheduling](rooms-resources) -- mag-set up ng bookable spaces at equipment
- [Calendar Approvals](approvals) -- aprubahan o tanggihan ang mga request para sa booking
- [Lumilikha ng Mga Kalendaryo](creating-calendars) -- pamahalaan ang mga event calendar
