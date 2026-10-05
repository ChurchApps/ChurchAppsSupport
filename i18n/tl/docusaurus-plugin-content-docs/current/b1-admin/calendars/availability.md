---
title: "Availability Calendar"
---

# Availability Calendar

<div class="article-intro">

Ang Availability Calendar ay nagbibigay sa inyo ng malawak na tanaw sa lahat ng booking ng silid at resource sa buong simbahan ninyo. Dito ay makikita ninyo kung ano ang naka-iskedyul, mapapansin ang mga conflict bago pa mangyari, at makakapag-book ng silid o resource para sa anumang event nang direkta.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Mag-set up ng kahit isang [silid o resource](rooms-resources) sa seksyong Rooms & Resources
- Kailangan ninyo ng edit access sa seksyong Calendars sa B1 Admin

</div>

## Pagbubukas ng Availability Calendar

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Availability**.

## Pagbabasa ng Kalendaryo

Ipinapakita ng kalendaryo ang kasalukuyang buwan bilang default. Maaari kayong lumipat pasulong at paatras gamit ang mga arrow sa itaas, o magpalit sa pagitan ng view na buwan, linggo, at araw.

May kulay ang bawat event ayon sa status ng booking:

| Kulay | Kahulugan |
|-------|---------|
| Berde | Aprubado |
| Kahel | Naghihintay ng pag-apruba |
| Abo | Naka-block (hindi available) |

Kapag itinapat ang cursor sa isang event, makikita ang pamagat ng event at ang silid o resource na nakakabit dito.

## Pag-filter ayon sa Silid o Resource

Gamitin ang dropdown na **Filter** sa kaliwang itaas para paliitin ang kalendaryo sa isang silid o resource lamang. Piliin ang **All Rooms & Resources** para bumalik sa buong view.

## Pag-book ng Silid o Resource

1. I-click ang button na **Book** sa kanang itaas na sulok ng pahina.
2. Sa dialog na magbubukas, punan ang mga detalye ng event:
   - **Title** — ang pangalan ng event
   - **Start** at **End** na petsa/oras
   - **Visibility** — Public o Private
   - **Rooms** — pumili ng isa o higit pang silid na ire-reserve
   - **Resources** — pumili ng isa o higit pang resource na ire-reserve
3. Opsyonal na itakda ang mga oras ng **Setup** at **Teardown** (sa minuto). Dinaragdagan nito ang booking sa magkabilang dulo para nakareserba ang espasyo para sa paghahanda at paglilinis, kahit hindi nagbabago ang oras ng simula/pagtatapos ng event.
4. Para ulitin ang booking, lagyan ng check ang **Repeats** at i-configure ang pag-uulit:
   - **Repeat every** -- itakda ang agwat (halimbawa, tuwing 2 linggo).
   - **Frequency** -- Daily, Weekly, o Monthly. Sa Weekly, makakapili kayo ng partikular na araw ng linggo; sa Monthly, makakapili kayo ng nakapirming araw ng buwan o relatibong pattern tulad ng "ikalawang Martes."
   - **Ends** -- Never, sa isang partikular na petsa, o pagkatapos ng takdang bilang ng pag-uulit.
5. Para tumukoy ng custom na booking window (iba sa simula/pagtatapos ng event), i-toggle ang **Custom Booking Window** at ilagay ang oras ng simula at pagtatapos ng window. Gamitin ito kapag kailangang ma-access ang silid sa labas ng nakalistang oras ng event.
6. I-click ang **Save** para isumite ang booking.

:::info
Kung may naka-configure na **Approval Group** ang silid o resource, lalabas ang booking bilang **Pending** hanggang maaprubahan ito ng isang lider ng grupong iyon. Tingnan ang [Mga Pag-apruba sa Kalendaryo](approvals) para sa workflow ng pag-apruba.
:::

:::tip
Ihahighlight ng kalendaryo ang anumang conflict bago kayo mag-save. Kung makakita kayo ng babala ng conflict, ayusin ang inyong mga oras o pumili ng ibang silid.
:::

## Mga Kaugnay na Artikulo

- [Mga Silid, Resource at Pag-iiskedyul](rooms-resources) — mag-set up ng mga espasyo at kagamitang maaaring i-book
- [Mga Pag-apruba sa Kalendaryo](approvals) — aprubahan o tanggihan ang mga kahilingan sa pag-book
- [Paglikha ng mga Kalendaryo](creating-calendars) — pamahalaan ang mga kalendaryo ng event
