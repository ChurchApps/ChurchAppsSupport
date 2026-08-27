---
title: "Availability Calendar"
---

# Availability Calendar

<div class="article-intro">

Ang Availability Calendar ay nagbibigay sa iyo ng isang bird's-eye view ng lahat ng room at resource bookings sa buong iyong simbahan. Mula dito ay maaari mong makita kung ano ang scheduled, makita ang mga conflict bago sila mangyari, at mag-book ng isang room o resource para sa anumang event nang direkta.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- I-setup ang hindi bababa sa isang [room o resource](rooms-resources) sa Rooms & Resources section
- Kailangan mo ng edit access sa Calendars section sa B1 Admin

</div>

## Opening the Availability Calendar

Sa B1 Admin, buksan ang **section menu** sa tuktok na sulok ng kaliwa at piliin ang **Calendars**, pagkatapos piliin ang **Availability**.

## Reading the Calendar

Ang kalendaryo ay nagpapakita ng kasalukuyang buwan nang default. Maaari kang mag-navigate pasulong at pabalik gamit ang mga arrow sa tuktok, o magpalit sa pagitan ng month, week, at day views.

Bawat event ay may kulay na coded ayon sa booking status:

| Color | Meaning |
|-------|---------|
| Green | Approved |
| Orange | Pending approval |
| Grey | Blocked out (not available) |

Kapag nag-hover mo sa isang event ay makikita ang pangalan ng event at ang room o resource na ito ay nakakabit.

## Filtering by Room or Resource

Gamitin ang **Filter** dropdown sa tuktok na kaliwa upang paliitin ang kalendaryo sa isang solong room o resource. Piliin ang **All Rooms & Resources** upang bumalik sa buong view.

## Booking a Room or Resource

1. I-click ang **Book** button sa tuktok na kanang bahagi ng pahina.
2. Sa dialog na bubuksan, punan ang mga detalye ng event:
   - **Title** — ang pangalan ng event
   - **Start** at **End** date/time
   - **Visibility** — Public o Private
   - **Rooms** — pumili ng isa o higit pang mga room upang i-reserve
   - **Resources** — pumili ng isa o higit pang mga resource upang i-reserve
3. Ilagay nang opsyonal ang **Setup** at **Teardown** times (sa minuto). Ang mga ito ay sumasaklaw sa booking sa parehong dulo upang ang space ay naka-reserve para sa setup at cleanup, kahit na ang event start/end times ay manatiling pareho.
4. Upang ulitin ang booking, suriin ang **Repeats** at i-configure ang recurrence:
   - **Repeat every** -- itakda ang interval (halimbawa, bawat 2 linggo).
   - **Frequency** -- Araw-araw, Linggo, o Buwanan. Ang Linggo ay nagpapahintulot sa iyo na pumili ng mga partikular na araw ng linggo; Ang Buwanan ay nagpapahintulot sa iyo na pumili ng isang fixed day ng buwan o isang relative pattern tulad ng "ang pangalawang Martes."
   - **Ends** -- Hindi kailanman, sa isang partikular na petsa, o pagkatapos ng isang nakatakdang bilang ng mga pagkakataon.
5. Upang magtukoy ng isang custom booking window (naiiba mula sa event start/end), i-toggle ang **Custom Booking Window** at ilagay ang window start at end times. Gamitin ito kapag ang isang room ay dapat na accessible sa labas ng mga nakalista na oras ng event.
6. I-click ang **Save** upang ipadala ang booking.

:::info
Kung ang room o resource ay may **Approval Group** na na-configure, ang booking ay lilitaw bilang **Pending** hanggang sa mag-approve ang isang leader ng grupo. Tingnan ang [Calendar Approvals](approvals) para sa approval workflow.
:::

:::tip
Ang kalendaryo ay magha-highlight ng anumang mga conflict bago ka magsave. Kung makakita ka ng conflict warning, i-adjust ang iyong mga oras o pumili ng ibang room.
:::

## Related Articles

- [Rooms, Resources & Scheduling](rooms-resources) — i-setup ang mga bookable spaces at equipment
- [Calendar Approvals](approvals) — aprubahan o tanggihan ang mga booking request
- [Creating Calendars](creating-calendars) — pamahalaan ang mga event calendar
