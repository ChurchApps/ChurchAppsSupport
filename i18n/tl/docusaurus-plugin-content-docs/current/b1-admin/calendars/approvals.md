---
title: "Mga Pag-apruba sa Kalendaryo"
---

# Mga Pag-apruba sa Kalendaryo

<div class="article-intro">

Ang pahinang Approvals ang lugar kung saan sinusuri at tinutugunan ng mga administrator ang mga nakabinbing kahilingan sa pag-book ng silid at resource, pati na ang mga event sa kalendaryo na nangangailangan ng pag-apruba bago mailathala.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Mag-configure ng mga silid o resource na may **Approval Group** sa [Rooms & Resources](rooms-resources)
- Kailangan ninyo ng pahintulot na **Calendars Admin** o ng pahintulot na **content.edit**

</div>

## Pagbubukas ng Approvals

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Calendars**, at i-click ang **Approvals**. Nakalista rito ang mga nakabinbing kahilingan sa pag-book at mga event na naghihintay ng pagsusuri.

## Mga Kahilingan sa Pag-book

Kapag lumikha ang isang grupo ng event at humiling ng silid o resource, lalabas ang kahilingan sa seksyong **Room & Resource Requests**. Ipinapakita ng bawat hilera ang:

- Ang pangalan at petsa/oras ng event
- Ang silid o resource na hinihiling (kasama ang dami para sa mga resource na maraming yunit)
- Badge ng status na nagpapakita kung may conflict ang kahilingan

### Mga Indikasyon ng Conflict

Kung may sumasapaw na ibang booking o blockout para sa parehong silid o resource ang isang kahilingan, ipapakita ng status nito ang badge na **Conflicts**; i-hover ang mouse dito para makita ang mga detalye. Ang mga kahilingang walang sapaw ay nagpapakita ng **No conflicts**. Maingat na suriin ang mga nagbabanggaang kahilingan bago aprubahan ang alinman sa mga ito.

### Pag-apruba o Pagtanggi

I-click ang **Approve** o **Reject** sa anumang kahilingan sa pag-book (kailangan pang kumpirmahin ang pagtanggi). Aabisuhan ang humihiling na grupo tungkol sa desisyon. Ang mga aprubadong booking ay nakakandado sa silid o resource na iyon para sa event; ang mga tinanggihang booking ay nagbibigay-laya sa slot para sa iba.

Kapag nag-click kayo ng **Approve**, magbubukas ang dialog na **Approve booking** para mailathala rin ninyo ang event sa parehong hakbang:

1. Lagyan ng check ang **Publish to public calendar** para gawing pampubliko ang event sa kalendaryo ng grupo nito. Iwanang walang check para aprubahan ang booking nang hindi binabago ang visibility ng event.
2. Kapag may check na ang **Publish to public calendar**, maaari kayong opsyonal na pumili ng curated calendar mula sa **Also add to calendar** para idagdag din ang event sa isa sa inyong [mga curated calendar](curated-calendar). Iwanang nakatakda sa **None** para laktawan ito. (Lumalabas lamang ang opsyong ito kung mayroon kayong pahintulot na **content.edit**.)
3. I-click ang **Approve**.

## Mga Nakabinbing Event

Kung nangangailangan ang workflow ng inyong kalendaryo ng pag-apruba sa event bago ito makita ng publiko, lalabas ang mga nakabinbing event sa seksyong **Event Requests**. I-click ang **Approve** para mailathala ang event sa kalendaryo, o ang **Reject** para ipaalam sa nagsumite na may mga pagbabagong kailangan.

:::tip
Mag-set up ng Approval Group sa isang silid sa [Rooms & Resources](rooms-resources) para mangailangan ng pag-apruba para sa silid na iyon. Maaari nang humiling ng silid ang mga grupong may access kapag lumilikha ng mga event, at mapupunta sa pahinang ito ang mga kahilingang iyon.
:::

## Mga Kaugnay na Artikulo

- [Mga Silid, Resource at Pag-iiskedyul](rooms-resources) — i-configure ang mga silid at resource na maaaring i-book
- [Paglikha ng mga Kalendaryo](creating-calendars) — pamahalaan ang mga kalendaryo at event
