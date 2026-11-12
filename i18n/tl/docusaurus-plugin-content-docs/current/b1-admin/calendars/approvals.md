---
title: "Mga Approval sa Calendar"
description: "Suriin ang mga nakabinbing kahilingan sa pag-book ng kuwarto at resource sa B1 Admin, tingnan ang mga conflict, i-approve o i-reject ang mga ito, at balikan ang mga nakaraang desisyon sa ilalim ng History."
---

# Mga Approval sa Calendar

<div class="article-intro">

Ang Approvals page ang lugar kung saan sinusuri at inaaksyunan ng mga administrator ang mga nakabinbing kahilingan sa pag-book ng kuwarto at resource, pati na ang mga calendar event na kailangan ng approval bago mailathala.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-configure ang mga kuwarto o resource na may **Approval Group** sa [Rooms & Resources](./rooms-resources.md)
- Kailangan mo ang **Edit Content** permission, o ang **Resolve Calendar Conflicts & Approvals** (parehong nasa **Content** section ng [Roles & Permissions](../settings/roles-permissions.md)). Kung walang **Edit Content**, hindi ipinapakita ang menu na **Calendars** -- buksan na lamang ang Approvals mula sa link ng mga nakabinbing approval sa **Dashboard** o sa approval email.

</div>

## Pagbubukas ng Approvals {#opening-approvals}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Approvals**. Nakalista rito ang mga nakabinbing kahilingan sa pag-book at mga event na naghihintay ng pagrepaso. Gamitin ang mga button na **Pending** at **History** sa itaas para magpalipat-lipat sa pagitan ng mga kahilingang kailangan pa ng desisyon at ng mga nadesisyunan na.

## Mga Kahilingan sa Pag-book {#booking-requests}

Kapag may nag-book ng kuwarto o resource na may **Approval Group**, at hindi siya miyembro ng grupong iyon, lalabas ang kahilingan sa seksyong **Room & Resource Requests**. (Awtomatikong naaaprubahan ang mga booking ng mga miyembro ng Approval Group.) Nakakatanggap din ng email ang mga miyembro ng Approval Group na naglilista ng mga bagong nakabinbing kahilingan, kasama ang link sa pahinang ito. Ipinapakita ng bawat row ang:

- Ang pangalan ng event at petsa/oras
- Ang kuwarto o resource na hinihiling (kasama ang dami para sa mga multi-unit na resource)
- **Requested by**, ang taong humiling, naka-link sa kanyang record
- Status badge na nagpapakita kung may conflict ang kahilingan

### Mga Indicator ng Conflict {#conflict-indicators}

Kung nagko-overlap ang isang kahilingan sa ibang booking o blockout para sa parehong kuwarto o resource, magpapakita ang status nito ng **Conflicts** badge; i-hover ito para makita ang mga detalye. Ang mga kahilingang walang overlap ay nagpapakita ng **No conflicts**. Maingat na suriin ang mga kahilingang may conflict bago i-approve ang alinman sa mga ito.

### Pag-approve o Pag-reject {#approving-or-rejecting}

I-hover ang isang kahilingan sa booking at i-click ang **Approve** o **Reject** (kailangan munang kumpirmahin ang pag-reject). Aabisuhan ang humiling tungkol sa desisyon. Ang mga naaprubahang booking ay naka-lock sa kuwarto o resource na iyon para sa event; ang mga na-reject na booking ay nagpapalaya ng slot para sa iba.

Kapag na-click mo ang **Approve**, magbubukas ang dialog na **Approve booking** para maipublish mo rin ang event sa parehong hakbang:

1. Lagyan ng check ang **Publish to public calendar** para gawing pampubliko ang event sa calendar ng grupo nito. Iwanang walang check para i-approve ang booking nang hindi binabago ang visibility ng event.
2. Kapag may check na ang **Publish to public calendar**, maaari kang opsyonal na pumili ng curated calendar mula sa **Also add to calendar** para idagdag din ang event sa isa sa iyong [curated calendars](./curated-calendar.md). Iwanan sa **None** para laktawan ito. (Lumalabas lamang ang opsyong ito kung mayroon kang **content.edit** permission.)
3. I-click ang **Approve**.

## Mga Nakabinbing Event {#pending-events}

Ang mga event na hinihiling ng mga miyembro (halimbawa, mula sa **My Requests** sa B1 app) ay lumalabas sa seksyong **Event Requests** kasama ang petsa, **Description**, at **Requested by**. I-click ang **Approve** para ipublish ang event sa calendar, o **Reject** para abisuhan ang nagsumite na kailangan ng mga pagbabago. I-click ang **Edit** para ayusin ang detalye ng kahilingan bago magdesisyon, o **Delete** para alisin ito.

:::tip
Mag-set up ng Approval Group sa isang kuwarto sa [Rooms & Resources](./rooms-resources.md) para mangailangan ng approval para sa kuwartong iyon. Maaaring humiling ng kuwarto ang mga grupong may access kapag gumagawa ng event, at dumadaloy ang mga kahilingang iyon sa pahinang ito.
:::

## History {#history}

Nananatili sa pahina ang mga naaprubahan at na-reject na kahilingan. I-click ang **History** sa itaas ng Approvals para makita ang mga ito; i-click ang **Pending** para bumalik sa mga bukas na kahilingan.

- Inililista ng **Room & Resource Requests** ang bawat nadesisyunang booking kasama ang event, kuwarto o resource, **Requested by**, badge na **Approved** o **Rejected**, at **Decided**, na nagpapakita kung sino ang nagdesisyon at kailan. Unang nakalista ang pinakabagong nadesisyunan.
- Inililista ng **Event Requests** ang bawat nadesisyunang event kasama ang description nito, **Requested by**, badge na **Approved** o **Rejected**, at **Decided**, na nagpapakita kung sino ang nagdesisyon at kailan. Ang mas lumang event request, na nadesisyunan bago pa magsimulang itala ito ng B1, ay nagpapakita ng gitling sa halip.

Maaari mong baguhin ang iyong desisyon mula sa History: ang naaprubahang kahilingan ay may aksyong **Reject**, at ang na-reject na kahilingan ay may aksyong **Approve**. Ang pag-reject sa event request na naaprubahan mo na ay aalisin ito sa pampublikong calendar. Maaari ring i-edit o burahin dito ang mga event request.

I-click ang pangalan sa ilalim ng **Requested by** para buksan ang record ng taong iyon.

## Mga Kaugnay na Artikulo {#related-articles}

- [Rooms, Resources & Scheduling](./rooms-resources.md) — i-configure ang mga kuwarto at resource na maaaring i-book
- [Creating Calendars](./creating-calendars.md) — pamahalaan ang mga calendar at event
