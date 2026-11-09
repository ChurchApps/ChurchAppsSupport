---
title: "Mga Pag-apruba sa Kalendaryo"
description: "Suriin ang nakabinbing kahilingan sa pag-book ng kuwarto at resource sa B1 Admin, tingnan ang mga banggaan, aprubahan o tanggihan ang mga ito, at balikan ang mga nakaraang desisyon sa ilalim ng History."
---

# Mga Pag-apruba sa Kalendaryo

<div class="article-intro">

Ang pahina ng Approvals ang lugar kung saan sinusuri at inaaksyunan ng mga administrator ang nakabinbing kahilingan sa pag-book ng kuwarto at resource, pati na ang mga calendar event na kailangang aprubahan bago mailathala.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-configure ang mga kuwarto o resource na may **Approval Group** sa [Rooms & Resources](./rooms-resources.md)
- Kailangan mo ang pahintulot na **Calendars Admin** o ang pahintulot na **content.edit**

</div>

## Pagbubukas ng Approvals

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Approvals**. Nakalista rito ang mga nakabinbing booking request at mga event na naghihintay ng pagsusuri. Gamitin ang mga button na **Pending** at **History** sa itaas para lumipat sa pagitan ng mga request na kailangan pang desisyunan at ng mga nadesisyunan na.

## Mga Booking Request

Kapag gumawa ang isang grupo ng event at humiling ng kuwarto o resource, lalabas ang request sa seksyong **Room & Resource Requests**. Ipinapakita ng bawat row ang:

- Ang pangalan ng event at petsa/oras nito
- Ang kuwarto o resource na hinihiling (kasama ang dami para sa mga resource na maraming yunit)
- **Requested by**, ang taong humiling, na naka-link sa kanyang record
- Isang status badge na nagpapakita kung may conflict ang request

### Mga Conflict Indicator

Kung may sumasapaw na ibang booking o blockout para sa parehong kuwarto o resource ang isang request, ipapakita ng status nito ang badge na **Conflicts**; i-hover ang mouse dito para makita ang mga detalye. Ang mga request na walang sumasapaw ay nagpapakita ng **No conflicts**. Suriing mabuti ang mga request na may conflict bago aprubahan ang alinman sa mga ito.

### Pag-apruba o Pagtanggi

I-click ang **Approve** o **Reject** sa anumang booking request (kailangan munang kumpirmahin ang pagtanggi). Aabisuhan ang humiling tungkol sa desisyon. Ang mga aprubadong booking ay nakalaan sa kuwarto o resource na iyon para sa event; ang mga tinanggihang booking ay nagpapalaya ng slot para sa iba.

Kapag nag-click ka ng **Approve**, magbubukas ang dialog na **Approve booking** para maipublish mo rin ang event sa parehong hakbang:

1. Lagyan ng check ang **Publish to public calendar** para gawing pampubliko ang event sa kalendaryo ng grupo nito. Iwanang walang check kung gusto mo lang aprubahan ang booking nang hindi binabago ang visibility ng event.
2. Kapag may check na ang **Publish to public calendar**, maaari mong piliin nang opsyonal ang isang curated calendar sa **Also add to calendar** para idagdag din ang event sa isa sa mga [curated calendar](./curated-calendar.md) mo. Iwanang **None** kung ayaw mo nito. (Lumalabas lang ang opsyong ito kung may pahintulot kang **content.edit**.)
3. I-click ang **Approve**.

## Mga Nakabinbing Event

Kung kailangang aprubahan muna ang mga event bago makita ng publiko, lalabas ang mga ito sa seksyong **Event Requests**. I-click ang **Approve** para ilathala ang event sa kalendaryo, o **Reject** para abisuhan ang nagsumite na kailangan ng mga pagbabago.

:::tip
Mag-set up ng Approval Group sa isang kuwarto sa [Rooms & Resources](./rooms-resources.md) para kailanganin ang pag-apruba para sa kuwartong iyon. Maaari nang humiling ng kuwarto ang mga grupong may access kapag gumagawa ng event, at dadaloy ang mga request na iyon sa pahinang ito.
:::

## History

Nananatili sa pahina ang mga inaprubahan at tinanggihang request. I-click ang **History** sa itaas ng Approvals para makita ang mga ito; i-click ang **Pending** para bumalik sa mga bukas na request.

- **Room & Resource Requests** ay naglilista ng bawat nadesisyunang booking kasama ang event, ang kuwarto o resource, **Requested by**, isang badge na **Approved** o **Rejected**, at **Decided**, na nagpapakita kung sino ang gumawa ng desisyon at sa anong petsa. Nasa itaas ang pinakabagong nadesisyunang request.
- **Event Requests** ay naglilista ng bawat nadesisyunang event kasama ang paglalarawan nito, **Requested by**, at isang badge na **Approved** o **Rejected**. Hindi naitatala kung sino ang nagdesisyon sa isang event request at kailan, kaya hindi ipinapakita ang column na iyon para sa mga event.

I-click ang pangalan sa ilalim ng **Requested by** para buksan ang record ng taong iyon.

## Mga Kaugnay na Artikulo

- [Rooms, Resources & Scheduling](./rooms-resources.md) — i-configure ang mga kuwarto at resource na maaaring i-book
- [Creating Calendars](./creating-calendars.md) — pamahalaan ang mga kalendaryo at event
