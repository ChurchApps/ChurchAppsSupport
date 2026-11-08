---
title: "Vodnik: nastavitev spletnega darovanja"
description: "Nastavite spletno darovanje v B1 Admin tako, da ustvarite sklade za darovanje, povežete Stripe in dodate stran za darovanje na svojo spletno stran B1.church za člane."
---

# Nastavitev spletnega darovanja

<div class="article-intro">

Preglejte vse, kar je potrebno za sprejemanje spletnih donacij v vaši cerkvi – od ustvarjanja skladov za darovanje, do povezave s Stripe za obdelavo plačil, do deljenja strani za darovanje z vašo skupnostjo. Ko boste končali, bodo lahko člani darovali prek vaše spletne strani in mobilne aplikacije.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin s skrbniškim dostopom – glejte [Vloge in dovoljenja](../people/roles-permissions.md)
- Račun Stripe (če ga še nimate, ga brezplačno ustvarite na [stripe.com](https://stripe.com))

</div>

## 1. korak: Ustvarite sklade za darovanje

Skladi so kategorije, v katere lahko donatorji darujejo. Preden lahko sprejemate donacije, potrebujete vsaj en sklad.

Sledite vodniku [Skladi](../donations/funds.md), da nastavite kategorije darovanja:

1. Ustvarite svoje najpogostejše sklade (npr. »Splošni sklad«, »Sklad za gradnjo«, »Misijoni«)
2. Ustrezno označite sklade, ki so namenjeni davčni olajšavi – to vpliva na letna potrdila o darovanju

:::tip
Sklade lahko dodate kadarkoli. Začnite z najpogostejšimi kategorijami darovanja.
:::

## 2. korak: Povežite Stripe

Stripe obdeluje vsa plačila. Svoj račun Stripe povežete z B1 Admin, da donacije tečejo na vaš bančni račun.

Sledite vodniku [Nastavitev spletnega darovanja](../donations/online-giving-setup.md), da povežete Stripe:

1. Prijavite se v nadzorno ploščo Stripe in pridobite javni ključ (Publishable Key) ter tajni ključ (Secret Key)
2. V B1 Admin pojdite v Nastavitve in vnesite oba ključa

:::warning
Stripe tajni ključ prikaže samo enkrat. Preden zapustite nadzorno ploščo Stripe, ga kopirajte in shranite. Če ga izgubite, boste morali ustvariti novega.
:::

## 3. korak: Dodajte stran za darovanje na svojo spletno stran

Poskrbite, da bo darovanje dostopno, tako da na svojo spletno stran B1 dodate stran za donacije.

Sledite vodnikoma [Nastavitev spletnega darovanja](../donations/online-giving-setup.md) in [Upravljanje strani](../website/managing-pages.md), da:

1. Na svojo stran B1.church dodate zavihek »Daruj«
2. Vaš naslov URL za darovanje bo: `https://yoursubdomain.b1.church/donate`
3. Člani lahko darujejo brez prijave (javna stran) ali se prijavijo, da shranijo načine plačila in zgodovino donacij

## 4. korak: Opravite testno donacijo

Preden to objavite svoji skupnosti, preverite, ali vse deluje.

1. Opravite majhno testno donacijo, da preverite celoten potek
2. Preverite, ali se donacija prikaže v B1 Admin pod Donacije

:::tip
Če želite preveriti brez pravih bremenitev, najprej uporabite testni način v Stripe, nato pa pred objavo skupnosti preklopite na način za resnično uporabo.
:::

## 5. korak: Objavite skupnosti

Sporočite članom, da lahko darujejo tudi spletno.

1. Naslov URL za darovanje delite prek svoje spletne strani, e-poštnih glasil, biltenov in družbenih omrežij
2. Člani lahko darujejo tudi prek [aplikacije B1](../../b1-church/giving/index.md) – funkcija darovanja je vgrajena

:::info
Člani, ki se prijavijo, lahko shranijo načine plačila, nastavijo ponavljajoče se donacije in pregledajo zgodovino darovanja. Deluje tudi anonimno darovanje – prijava ni potrebna.
:::

## 6. korak: Tekoče upravljanje

Redno posodabljajte evidence donacij in skozi vse leto ustvarjajte poročila.

1. [Uvozite transakcije Stripe](../donations/stripe-import.md) redno (tedensko ali mesečno), da bodo vaše evidence ažurne
2. [Oglejte si poročila o donacijah](../donations/donation-reports.md), da spremljate trende darovanja in skupne zneske po skladih
3. [Ustvarite letna potrdila o darovanju](../donations/giving-statements.md) za davčne evidence vaših donatorjev

:::tip
Uvoz iz Stripe izvajajte vsaj mesečno, da bodo vaše evidence ažurne. Celoten postopek za konec leta najdete v [Vodniku za letna poročila](./year-end-reports.md).
:::

## Hura, končano!

Vaša cerkev zdaj sprejema spletne donacije. Člani lahko darujejo prek vaše spletne strani, aplikacije B1 ali katere koli naprave z spletnim brskalnikom. Vse donacije se samodejno beležijo v B1 Admin.

## Sorodni članki

- [Skladi](../donations/funds.md) – ustvarjanje in upravljanje kategorij darovanja
- [Serije](../donations/batches.md) – razvrščanje donacij v skupine
- [Beleženje donacij](../donations/recording-donations.md) – ročni vnos gotovine in donacij s čeki
- [Uvoz iz Stripe](../donations/stripe-import.md) – prenos spletnih transakcij v B1 Admin
- [Poročila o donacijah](../donations/donation-reports.md) – ogled trendov darovanja in skupnih zneskov
- [Potrdila o darovanju](../donations/giving-statements.md) – ustvarjanje letnih davčnih potrdil
- [Darovanje](../../b1-church/giving/making-donations.md) – izkušnja darovanja za člane na B1.church in v aplikaciji B1
