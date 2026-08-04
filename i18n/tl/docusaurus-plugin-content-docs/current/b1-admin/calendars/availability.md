---
title: "Availability Calendar"
---

# Availability Calendar

<div class="article-intro">

Ibinibigay ng Availability Calendar ang malawak na pananaw sa lahat ng booking ng silid at resource sa buong simbahan mo. Mula rito, makikita mo kung ano ang naka-iskedyul, matutukoy ang mga conflict bago pa man ito mangyari, at direktang maka-book ng silid o resource para sa anumang event.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-set up ng kahit isang [silid o resource](rooms-resources) sa seksyong Rooms & Resources
- Kailangan mo ng edit access sa seksyong Calendars sa B1 Admin

</div>

## Pagbukas ng Availability Calendar

Sa B1 Admin, pumunta sa **Calendars** at piliin ang **Availability** mula sa sidebar.

## Pagbasa sa Calendar

Ipinapakita ng calendar ang kasalukuyang buwan bilang default. Puwede kang mag-navigate pasulong at paatras gamit ang mga arrow sa itaas, o lumipat sa pagitan ng month, week, at day views.

Bawat event ay may color-code ayon sa status ng booking:

| Kulay | Kahulugan |
|-------|---------|
| Berde | Aprubado |
| Kahel | Naghihintay ng approval |
| Kulay-abo | Naka-block (hindi available) |

Kapag hinover ang isang event, makikita ang title ng event at ang silid o resource na kaugnay nito.

## Pag-filter ayon sa Silid o Resource

Gamitin ang **Filter** dropdown sa kaliwang itaas para paliitin ang calendar sa isang partikular na silid o resource. Piliin ang **All Rooms & Resources** para bumalik sa buong view.

## Pag-book ng Silid o Resource

1. I-click ang button na **Book** sa kanang itaas na sulok ng page.
2. Sa dialog na magbubukas, punan ang mga detalye ng event:
   - **Title** — ang pangalan ng event
   - **Start** at **End** na petsa/oras
   - **Visibility** — Public o Private
   - **Rooms** — piliin ang isa o higit pang silid na irereserba
   - **Resources** — piliin ang isa o higit pang resource na irereserba
3. Opsyonal na itakda ang mga oras ng **Setup** at **Teardown** (sa minuto). Nagbibigay ito ng dagdag na oras sa dalawang dulo ng booking para nakalaan ang espasyo para sa setup at paglilinis, kahit na hindi nagbabago ang start/end time ng event.
4. Para ulitin ang booking, i-check ang **Repeats** at i-configure ang recurrence:
   - **Repeat every** -- itakda ang interval (halimbawa, tuwing 2 linggo).
   - **Frequency** -- Daily, Weekly, o Monthly. Sa Weekly, makakapili ka ng partikular na araw(-araw) ng linggo; sa Monthly, makakapili ka ng fixed na araw ng buwan o relative pattern tulad ng "ikalawang Martes."
   - **Ends** -- Never, sa isang partikular na petsa, o pagkatapos ng itinakdang bilang ng pagkakataon.
5. Para magtakda ng custom booking window (naiiba sa start/end ng event), i-toggle ang **Custom Booking Window** at ilagay ang start at end time ng window. Gamitin ito kapag kailangang ma-access ang isang silid sa labas ng nakalistang oras ng event.
6. I-click ang **Save** para isumite ang booking.

:::info
Kung ang silid o resource ay may naka-configure na **Approval Group**, lalabas ang booking bilang **Pending** hanggang aprubahan ito ng isang leader ng grupong iyon. Tingnan ang [Calendar Approvals](approvals) para sa approval workflow.
:::

:::tip
Ihi-highlight ng calendar ang anumang conflict bago ka mag-save. Kung may makita kang conflict warning, ayusin ang iyong oras o pumili ng ibang silid.
:::

## Kaugnay na Artikulo

- [Rooms, Resources & Scheduling](rooms-resources) — mag-set up ng mga booking na espasyo at kagamitan
- [Calendar Approvals](approvals) — aprubahan o tanggihan ang mga booking request
- [Creating Calendars](creating-calendars) — pamahalaan ang mga event calendar
