---
title: "Availability Calendar"
description: "I-set up ang mga kuwarto at kagamitang maaaring i-book sa B1 Admin, pagkatapos i-book ang mga ito sa calendar, magdagdag ng setup/teardown buffer, at humawak ng mga paulit-ulit o booking na kailangan ng approval."
---

# Availability Calendar

<div class="article-intro">

Binibigyan ka ng Availability Calendar ng malawakang pagtingin sa lahat ng booking ng kuwarto at resource sa iyong simbahan. Mula rito, makikita mo kung ano ang nakaiskedyul, matutukoy ang mga conflict bago pa mangyari ang mga ito, at makapag-book ng kuwarto o resource para sa anumang event nang direkta.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-set up ng kahit isang [kuwarto o resource](./rooms-resources.md) sa Rooms & Resources section
- Kailangan mo ang **Edit Content** permission

</div>

## Pagbubukas ng Availability Calendar {#opening-the-availability-calendar}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Availability**.

## Pagbasa ng Calendar {#reading-the-calendar}

Ipinapakita ng calendar ang kasalukuyang buwan bilang default. Gamitin ang **Today**, **Back**, at **Next** sa itaas para lumipat-lipat, at ang **Month**, **Week**, **Day**, o **Agenda** para baguhin ang view.

Kulay-kodigo ang bawat booking ayon sa status nito:

| Kulay | Kahulugan |
|-------|-----------|
| Berde | Approved |
| Orange | Naghihintay ng approval |
| Kulay abo | Naka-blockout (hindi available), ipinapakita bilang *Blocked: reason* |

Ang bawat booking ay binabasa bilang pamagat ng event kasunod ang mga kuwarto at resource na ginagamit nito. I-hover ang booking para makita ang buong teksto. I-click ang booking para buksan ang event at i-edit ito.

## Pag-filter ayon sa Kuwarto o Resource {#filtering-by-room-or-resource}

Gamitin ang **Room / Resource** dropdown sa kaliwang itaas para paliitin ang calendar sa iisang kuwarto o resource. Piliin ang **All rooms & resources** para bumalik sa buong view.

## Pag-book ng Kuwarto o Resource {#booking-a-room-or-resource}

1. I-click ang **Book** button sa itaas ng pahina.
2. Magbubukas ang dialog na **New Event** -- ang parehong editor na ginagamit sa calendar (tingnan ang [Adding and Editing Events](./creating-calendars.md#adding-and-editing-events)). Punan ang mga detalye ng event:
   - **Group** *(kinakailangan)* — ang grupong kinabibilangan ng event. Kung mayroon kang [templates](./rooms-resources.md#event-templates), maaari ka ring pumili ng **Template** para punan ang iba pa.
   - **Title** *(kinakailangan)*
   - **Start** at **End** na petsa/oras *(kinakailangan; dapat mas huli ang End kaysa sa Start)*
   - **Visibility** — Public o Private
   - **Rooms** — pumili ng isa o higit pang kuwarto na ire-reserve
   - **Resources** — pumili ng isa o higit pang resource na ire-reserve
3. Kapag napili na ang kuwarto o resource, maaari mong itakda ang **Setup (min before)** at **Teardown (min after)**. Pinapalawak ng mga ito ang booking sa magkabilang dulo para mai-reserve ang espasyo para sa setup at paglilinis, kahit hindi nagbabago ang start/end time ng event.
4. Para ulitin ang booking, itakda muna ang **Start**, pagkatapos lagyan ng check ang **Repeats** at i-configure ang recurrence:
   - **Interval** -- gaano kadalas ito inuulit (halimbawa, 2 kasama ang Week para tuwing 2 linggo).
   - **Frequency** -- Day, Week, o Month. Ang Weekly ay nagpapahintulot na pumili ng partikular na araw ng linggo; ang Monthly ay nagpapahintulot na pumili ng nakapirming araw ng buwan o relatibong pattern gaya ng "ang ikalawang Martes."
   - **Ends** -- **Never**, **On** na may partikular na **End Date**, o **After** ng itinakdang bilang ng beses.
5. Para magtakda ng custom na booking window (iba sa start/end ng event), i-on ang **Custom reservation window** at ilagay ang **Reserve from** at **Reserve until**. Pinapalitan nito ang setup at teardown minutes. Gamitin ito kapag kailangang ma-access ang kuwarto sa labas ng nakalistang oras ng event.
6. I-click ang **Save** para isumite ang booking.

:::info
Kung may naka-configure na **Approval Group** ang kuwarto o resource, lalabas ang booking bilang **Pending** hanggang maaprubahan ito sa Approvals page -- maliban kung miyembro ka ng grupong iyon, kung saan agad itong maaaprubahan. Tingnan ang [Calendar Approvals](./approvals.md) para sa workflow ng approval.
:::

:::tip
Magpapakita ang editor ng babala bago ka mag-save kung nakabook na o naka-blockout ang kuwarto o resource sa oras na iyon. Kung makita mo ang babala ng conflict, baguhin ang oras o pumili ng ibang kuwarto.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Rooms, Resources & Scheduling](./rooms-resources.md) — mag-set up ng mga espasyo at kagamitang maaaring i-book
- [Calendar Approvals](./approvals.md) — i-approve o tanggihan ang mga kahilingan sa booking
- [Creating Calendars](./creating-calendars.md) — pamahalaan ang mga calendar ng event
