---
title: "Vodnik: Nastavitev spletnega darovanja"
description: "Nastavite spletno darovanje v B1 Admin: ustvarite sklade za darove, povežite Stripe in dodajte stran Doniraj na spletno mesto B1.church za člane."
---

# Nastavitev spletnega darovanja

<div class="article-intro">

Preglejte vse, kar potrebujete za sprejemanje spletnih donacij v svoji cerkvi: od ustvarjanja skladov za donacije, prek povezave s Stripe za obdelavo plačil, do delitve strani za darovanje s svojo skupnostjo. Ko boste končali, bodo lahko člani darovali prek vaše spletne strani in mobilne aplikacije.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin z dostopom skrbnika — glejte [Vloge in dovoljenja](../people/roles-permissions.md)
- Račun Stripe (če ga še nimate, ga lahko brezplačno ustvarite na [stripe.com](https://stripe.com))

</div>

## Korak 1: Ustvarite sklade za donacije

Skladi so kategorije, v katere lahko donatorji darujejo. Preden lahko sprejemate donacije, potrebujete vsaj en sklad.

Sledite vodniku [Skladi](../donations/funds.md), da nastavite kategorije darovanja:

1. Ustvarite svoje najpogostejše sklade (npr. „Splošni sklad“, „Sklad za gradnjo“, „Misijonarstvo“)
2. Ustrezno označite sklade, ki so davčno odbitni; to vpliva na letna potrdila o darovanju

:::tip
Sklade lahko dodate kadarkoli. Začnite z najpogostejšimi kategorijami darovanja.
:::

## Korak 2: Povežite Stripe

Stripe obdeluje vsa plačila. Svoj račun Stripe boste povezali z B1 Admin, da bodo donacije tekle na vaš bančni račun.

Sledite vodniku [Nastavitev spletnega darovanja](../donations/online-giving-setup.md), da povežete Stripe:

1. Prijavite se v nadzorno ploščo Stripe in pridobite svoj javni ključ (Publishable Key) ter tajni ključ (Secret Key)
2. V B1 Admin pojdite v Nastavitve in vnesite oba ključa

:::warning
Stripe vam tajni ključ prikaže samo enkrat. Preden zapustite nadzorno ploščo Stripe, ga kopirajte in shranite. Če ga izgubite, boste morali ustvariti novega.
:::

## Korak 3: Dodajte stran za darovanje na svojo spletno stran

Omogočite enostaven dostop do darovanja tako, da na svojo spletno stran B1 dodate stran za donacije.

Sledite vodnikoma [Nastavitev spletnega darovanja](../donations/online-giving-setup.md) in [Upravljanje strani](../website/managing-pages.md), da:

1. Na spletno mesto B1.church dodate zavihek „Doniraj“
2. Vaš naslov URL za darovanje bo: `https://yoursubdomain.b1.church/donate`
3. Člani lahko darujejo brez prijave (javna stran) ali se prijavijo, da shranijo načine plačila in si ogledajo zgodovino donacij

## Korak 4: Opravite testno donacijo

Preden o tem obvestite svojo skupnost, preverite, ali vse deluje.

1. Opravite majhno testno donacijo, da preverite, ali celoten postopek deluje od začetka do konca
2. Preverite, ali se donacija prikaže v B1 Admin pod Donacije

:::tip
Če želite preveriti brez pravih bremenitev, najprej uporabite testni način Stripe, nato pa pred obvestilom skupnosti preklopite na produkcijski (živi) način.
:::

## Korak 5: Obvestite svojo skupnost

Sporočite članom, da lahko darujejo na spletu.

1. Delite naslov URL za darovanje prek svoje spletne strani, e-poštnih glasil, biltenov in družbenih omrežij
2. Člani lahko darujejo tudi prek [aplikacije B1 Mobile](../../b1-mobile/giving/index.md); funkcija darovanja je vgrajena

:::info
Člani, ki se prijavijo, lahko shranijo načine plačila, nastavijo ponavljajoče se donacije in si ogledajo zgodovino darovanja. Anonimno darovanje prav tako deluje, prijava ni potrebna.
:::

## Korak 6: Tekoče upravljanje

Redno posodabljajte evidence donacij in skozi vse leto ustvarjajte poročila.

1. [Uvozite transakcije Stripe](../donations/stripe-import.md) redno (tedensko ali mesečno), da bodo vaše evidence ažurne
2. [Oglejte si poročila o donacijah](../donations/donation-reports.md), da spremljate trende darovanja ter skupne zneske po skladih
3. [Ustvarite letna potrdila o darovanju](../donations/giving-statements.md) za davčne evidence vaših donatorjev

:::tip
Uvoze Stripe izvajajte vsaj mesečno, da bodo vaše evidence ažurne. Za celoten letni postopek glejte [Vodnik za letna poročila](./year-end-reports.md).
:::

## Zaključili ste!

Vaša cerkev zdaj sprejema spletne donacije. Člani lahko darujejo prek vaše spletne strani, aplikacije B1 Mobile ali katere koli naprave z spletnim brskalnikom. Vse donacije se samodejno beležijo v B1 Admin.

## Sorodni članki

- [Skladi](../donations/funds.md): ustvarjanje in upravljanje kategorij donacij
- [Serije](../donations/batches.md): razvrščanje donacij v skupine
- [Beleženje donacij](../donations/recording-donations.md): ročni vnos gotovine in donacij s čekom
- [Uvoz Stripe](../donations/stripe-import.md): prenos spletnih transakcij v B1 Admin
- [Poročila o donacijah](../donations/donation-reports.md): ogled trendov darovanja in skupnih zneskov
- [Potrdila o darovanju](../donations/giving-statements.md): ustvarjanje letnih davčnih potrdil
- [Darovanje (spletno)](../../b1-church/giving/making-donations.md): izkušnja darovanja za člane
- [Darovanje (mobilno)](../../b1-mobile/giving/making-donations.md): darovanje iz mobilne aplikacije
