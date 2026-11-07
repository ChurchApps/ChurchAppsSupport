---
title: "Odobritve koledarja"
description: "Pregledujte zahteve za rezervacijo sob in virov v B1 Admin, preverite morebitne konflikte ter jih odobrite ali zavrnite, po želji tudi objavite dogodek."
---

# Odobritve koledarja

<div class="article-intro">

Stran Odobritve je mesto, kjer skrbniki pregledajo in obdelajo čakajoče zahteve za rezervacijo prostorov in virov ter dogodke koledarja, ki morajo biti pred objavo odobreni.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Prostore ali vire z **skupino za odobritve** nastavite v razdelku [Prostori in viri](./rooms-resources.md)
- Potrebujete dovoljenje **Skrbnik koledarjev** ali dovoljenje **content.edit**

</div>

## Odpiranje odobritev

V B1 Admin odprite [meni za hitro iskanje](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na zgornji levi strani), razširite **Koledarji** in kliknite **Odobritve**. Tukaj so navedene čakajoče zahteve za rezervacije in dogodki, ki čakajo na pregled.

## Zahteve za rezervacije

Ko skupina ustvari dogodek in zahteva prostor ali vir, se zahteva prikaže v razdelku **Zahteve za prostore in vire**. Vsaka vrstica prikazuje:

- Ime dogodka in datum/čas
- Prostor ali vir, ki je zahtevan (pri virih z več enotami tudi količino)
- Oznako stanja, ki prikazuje, ali zahteva povzroča konflikte

### Oznake konfliktov

Če zahteva prekriva drugo rezervacijo ali blokado za isti prostor ali vir, ima njeno stanje oznako **Konflikti**; za podrobnosti jo premaknite z miško čezenj. Zahteve brez prekrivanj prikazujejo **Brez konfliktov**. Pred odobritvijo katere koli od konfliktnih zahtev jih previdno preglejte.

### Odobritev ali zavrnitev

Kliknite **Odobri** ali **Zavrni** pri kateri koli zahtevi za rezervacijo (pri zavrnitvi vas sistem najprej prosi za potrditev). Skupina, ki je zahtevo oddala, je obveščena o odločitvi. Odobrene rezervacije so za dogodek zaklenjene na ta prostor ali vir; zavrnjene rezervacije sprostijo termin za druge.

Ko kliknete **Odobri**, se odpre pogovorno okno **Odobri rezervacijo**, v katerem lahko dogodek v istem koraku tudi objavite:

1. Označite **Objavi v javnem koledarju**, da bo dogodek viden v koledarju njegove skupine. Če polja ne označite, rezervacijo odobrite brez spreminjanja vidnosti dogodka.
2. Ko je označeno **Objavi v javnem koledarju**, lahko v polju **Dodaj tudi v koledar** izberete kurirani koledar, da dogodek dodate tudi v enega od vaših [kuriranih koledarjev](./curated-calendar.md). Če želite to preskočiti, pustite nastavitev na **Nobeden**. (Ta možnost se prikaže le, če imate dovoljenje **content.edit**.)
3. Kliknite **Odobri**.

## Dogodki na čakanju

Če vaš potek dela v koledarju zahteva odobritev dogodkov, preden so ti javno vidni, se dogodki na čakanju prikažejo v razdelku **Zahteve za dogodke**. Kliknite **Odobri**, da dogodek objavite v koledarju, ali **Zavrni**, da pošiljatelja obvestite, da so potrebne spremembe.

:::tip
Skupino za odobritve nastavite za prostor v razdelku [Prostori in viri](./rooms-resources.md), če želite za ta prostor zahtevati odobritev. Skupine z dostopom lahko nato prostor zahtevajo pri ustvarjanju dogodkov, te zahteve pa se prikažejo na tej strani.
:::

## Sorodni članki

- [Prostori, viri in načrtovanje](./rooms-resources.md) — nastavitev rezerviranih prostorov in virov
- [Ustvarjanje koledarjev](./creating-calendars.md) — upravljanje koledarjev in dogodkov
